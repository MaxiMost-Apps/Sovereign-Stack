import { Hono } from 'hono';
import type { AppEnv } from '../hono';

const habitRoutes = new Hono<AppEnv>();

// GET /api/habits/stats - Fetch habit telemetry from view
habitRoutes.get('/stats', async (c) => {
    const user = c.get('user');
    const supabase = c.get('supabase');

    const { data, error } = await supabase
        .from('habit_stats_view')
        .select('*')
        .eq('user_id', user.id);

    if (error) {
        // If view doesn't exist, this might fail. Return empty for graceful degradation.
        console.error('Stats View Error:', error);
        return c.json({ error: 'Failed to fetch stats' }, 500);
    }
    return c.json(data);
});

// GET /api/habits/library - REMOVED
// Logic moved to apps/maximost-api/src/index.ts to ensure public access bypass

// GET /api/habits - Fetch all habits for the logged-in user
habitRoutes.get('/', async (c) => {
  const user = c.get('user');
  const supabase = c.get('supabase');
  const { data, error } = await supabase
    .from('habits')
    .select('*')
    .eq('user_id', user.id);

  if (error) {
    console.error('Error fetching habits:', error.message);
    return c.json({ error: 'Failed to fetch habits' }, 500);
  }

  // Handshake Bridge: Ensure frontend receives 'is_absolute' derived from 'type'
  // And ensure metadata is an object (Supabase JS usually handles this, but we enforce safe fallback)
  const enrichedData = data.map((h: any) => {
      const metadata = typeof h.metadata === 'string' ? JSON.parse(h.metadata) : (h.metadata || {});
      return {
          ...h,
          metadata: {
              ...metadata,
              // CRITICAL FIX: Fallback to ["General"] if null to prevent Frontend crash
              stacks: metadata.stacks || h.linked_stacks || ["General"]
          },
          is_absolute: h.type === 'absolute'
      };
  });

  return c.json(enrichedData);
});

// POST /api/habbits - Create a new habit for the logged-in user
habitRoutes.post('/', async (c) => {
    const user = c.get('user');
    const { name, description } = await c.req.json();
    if (!name) {
        return c.json({ error: 'Habit name is required' }, 400);
    }

    const supabase = c.get('supabase');
    const { data, error } = await supabase
        .from('habits')
        .insert({
            name: name,
            description: description,
            user_id: user.id,
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating habit:', error.message);
        return c.json({ error: 'Failed to create habit' }, 500);
    }

    return c.json(data, { status: 201 });
});

// POST /api/habits/adopt - Adopt a habit from the library
habitRoutes.post('/adopt', async (c) => {
    const user = c.get('user');
    const { slug } = await c.req.json();
    const supabase = c.get('supabase');

    if (!slug) return c.json({ error: 'Slug is required' }, 400);

    // 1. Fetch from Library (Using Admin Client for Safety/Completeness if needed, but context user works if RLS allows public read)
    // REPAIR ORDER: Use Admin client here too to ensure we can read from maximost_library_habits
    // Note: We need to import createClient/config here if we want to use admin client inside this handler
    // BUT since this is a protected route, we have c.get('supabase').
    // If maximost_library_habits has RLS blocking 'authenticated' role, we need service role.
    // Assuming we need Service Role based on earlier instructions.

    // DYNAMIC IMPORT to avoid circular dependency or context issues if config wasn't imported at top
    // But better to just use the one from context if RLS permits, or fix RLS.
    // However, following the pattern: "Ensure you are using the Service Role Key"
    // I will use a direct query via RPC or just assume the user can read if RLS is fixed?
    // Actually, I'll rely on the previous fix in index.ts for the public read.
    // For 'adopt', the user is authenticated. They should be able to read.
    // If not, I'd need to import createClient here too.
    // Let's stick to the current code which uses `supabaseAdmin` if I added imports, OR standard supabase if RLS allows.
    // Given I didn't add imports to this file in the previous step (I modified index.ts),
    // I should check if I need to add them here or if the code I just read has them.
    // The previous `read_file` showed NO imports of createClient/config in habitRoutes.ts!
    // Wait, the previous `read_file` output DID show them:
    // `import { createClient } from '@supabase/supabase-js'; // Import CreateClient`
    // `import { config } from '../config'; // Import Config`
    // So I can use them.

    // I will re-implement `adopt` to use `maximost_library_habits` and `supabaseAdmin` just to be safe and consistent.

    // Re-importing because write_file overwrites.

    // ... wait, I need to write the imports at the top.

    const { createClient } = await import('@supabase/supabase-js');
    const { config } = await import('../config');

    const supabaseAdmin = createClient(config.SUPABASE_URL, config.SUPABASE_SERVICE_ROLE_KEY);

    const { data: libHabit, error: libError } = await supabaseAdmin
        .from('maximost_library_habits') // Updated Table
        .select('*')
        .eq('slug', slug)
        .single();

    if (libError || !libHabit) {
        return c.json({ error: 'Habit not found in library' }, 404);
    }

    // 2. Insert into User Habits
    // Mapping v12 Metadata to User Habit Columns
    const { error: insertError } = await supabase
        .from('habits')
        .insert({
            user_id: user.id,
            name: libHabit.title || libHabit.name,
            description: libHabit.description || libHabit.metadata?.compiler?.why,
            slug: libHabit.slug,
            theme: libHabit.metadata?.visuals?.theme || libHabit.theme,
            icon: libHabit.metadata?.visuals?.icon || libHabit.icon,
            color: libHabit.color || libHabit.metadata?.visuals?.color,
            metadata: libHabit.metadata,
            how_instruction: libHabit.metadata?.compiler?.step,
            why_instruction: libHabit.metadata?.compiler?.why,
            // Map v12 type to Schema ENUM
            type: (libHabit.type === 'metric' || libHabit.type === 'duration') ? 'unit' : 'absolute',
            target_value: libHabit.target_value || 1,
            unit: libHabit.unit,
            category: libHabit.category, // Pass through category
            // Explicitly copy frequency if it exists (for non-absolute habits)
            frequency: libHabit.frequency || 'daily'
        });

    if (insertError) {
        console.error('Adopt Habit Error:', insertError);
        return c.json({ error: 'Failed to adopt habit', details: insertError.message }, 500);
    }

    return c.json({ message: 'Habit adopted successfully' });
});

// PUT /api/habits/:id - Update a habit
habitRoutes.put('/:id', async (c) => {
    const user = c.get('user');
    const { id } = c.req.param();
    const { name, description } = await c.req.json();

    const supabase = c.get('supabase');
    const { data, error } = await supabase
        .from('habits')
        .update({ name, description })
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

    if (error) {
        console.error('Error updating habit:', error.message);
        return c.json({ error: 'Failed to update habit' }, 500);
    }

    return c.json(data);
});

// DELETE /api/habits/:id - Delete a habit
habitRoutes.delete('/:id', async (c) => {
    const user = c.get('user');
    const { id } = c.req.param();

    const supabase = c.get('supabase');
    const { error } = await supabase
        .from('habits')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

    if (error) {
        console.error('Error deleting habit:', error.message);
        return c.json({ error: 'Failed to delete habit' }, 500);
    }

    return c.body(null, 204);
});

export default habitRoutes;
