import { Hono } from 'hono';
import { createClient } from '@supabase/supabase-js'; // Import CreateClient
import { config } from '../config'; // Import Config
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

// GET /api/habits/library - Fetch all habits from the archive
habitRoutes.get('/library', async (c) => {
    // REPAIR ORDER: Use Service Role to bypass RLS
    const supabaseAdmin = createClient(config.SUPABASE_URL, config.SUPABASE_SERVICE_ROLE_KEY);

    // REPAIR ORDER: Query maximost_library_habits instead of library_habits
    const { data, error } = await supabaseAdmin
        .from('maximost_library_habits')
        .select('*')
        .order('title');

    if (error) {
        console.error('Error fetching library habits:', error.message);
        return c.json({ error: 'Failed to fetch library habits' }, 500);
    }

    return c.json(data);
});

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
