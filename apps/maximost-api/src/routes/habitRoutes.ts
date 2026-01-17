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

// GET /api/habits/library - REMOVED (Handled in index.ts)

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

// POST /api/habits/adopt - Adopt a habit (Single or Bulk)
habitRoutes.post('/adopt', async (c) => {
    const user = c.get('user');
    const body = await c.req.json();
    const supabase = c.get('supabase');

    // Handle Bulk (slugs array) or Single (slug string)
    const slugs = body.slugs || (body.slug ? [body.slug] : []);

    if (slugs.length === 0) return c.json({ error: 'Slug(s) required' }, 400);

    // Dynamic Import for Service Role Client (Bypassing RLS for Library Read)
    const { createClient } = await import('@supabase/supabase-js');
    const { config } = await import('../config');
    const supabaseAdmin = createClient(config.SUPABASE_URL, config.SUPABASE_SERVICE_ROLE_KEY);

    // 1. Fetch from Library
    const { data: libHabits, error: libError } = await supabaseAdmin
        .from('maximost_library_habits')
        .select('*')
        .in('slug', slugs);

    if (libError || !libHabits || libHabits.length === 0) {
        return c.json({ error: 'Habits not found in library' }, 404);
    }

    // 2. Prepare Inserts
    const habitsToInsert = libHabits.map((libHabit: any) => ({
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
        type: (libHabit.type === 'metric' || libHabit.type === 'duration') ? 'unit' : 'absolute',
        target_value: libHabit.target_value || 1,
        unit: libHabit.unit,
        category: libHabit.category,
        frequency: libHabit.frequency || 'daily'
    }));

    // 3. Insert into User Habits
    const { error: insertError } = await supabase
        .from('habits')
        .insert(habitsToInsert);

    if (insertError) {
        console.error('Adopt Habit Error:', insertError);
        return c.json({ error: 'Failed to adopt habits', details: insertError.message }, 500);
    }

    return c.json({ message: `Successfully adopted ${habitsToInsert.length} habits` });
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
