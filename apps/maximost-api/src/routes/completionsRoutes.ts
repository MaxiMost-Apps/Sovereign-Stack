import { Hono } from 'hono';
import { AppEnv } from '../hono';

const completionsRoutes = new Hono<AppEnv>();

// POST /api/completions/toggle - Immediate Upsert
completionsRoutes.post('/toggle', async (c) => {
    const user = c.get('user');
    const supabase = c.get('supabase');
    const { habit_id, target_date, status, value } = await c.req.json();

    if (!habit_id || !target_date) {
        return c.json({ error: 'Missing habit_id or target_date' }, 400);
    }

    // Determine value: 'value' overrides 'status' (boolean)
    // If deleted (value === 0), we delete.
    const finalValue = value !== undefined ? value : (status ? 1 : 0);

    let data, error;

    if (finalValue === 0) {
        // DELETE
        const result = await supabase
            .from('habit_logs')
            .delete()
            .eq('user_id', user.id)
            .eq('habit_id', habit_id)
            .eq('completed_at', target_date);
        error = result.error;
        data = null;
    } else {
        // UPSERT
        const result = await supabase
            .from('habit_logs')
            .upsert({
                user_id: user.id,
                habit_id: habit_id,
                completed_at: target_date, // Mapped to 'completed_at'
                value: finalValue
            }, { onConflict: 'user_id, habit_id, completed_at' })
            .select()
            .single();
        data = result.data;
        error = result.error;
    }

    if (error) {
        console.error('Toggle Error:', error);
        return c.json({ error: 'Persistence Failure' }, 500);
    }

    return c.json(data || { success: true });
});

// GET /api/completions/sync - Hydrate State
// Accepts ?date=YYYY-MM-DD
completionsRoutes.get('/sync', async (c) => {
    const user = c.get('user');
    const supabase = c.get('supabase');
    const date = c.req.query('date');

    if (!date) return c.json({ error: 'Date required' }, 400);

    const { data, error } = await supabase
        .from('habit_logs')
        .select('habit_id, value')
        .eq('user_id', user.id)
        .eq('completed_at', date);

    if (error) return c.json({ error: 'Hydration Failed' }, 500);

    // Transform to map for O(1) lookups on frontend
    const completions: Record<string, boolean> = {};
    data.forEach((row: any) => {
        completions[row.habit_id] = row.value > 0;
    });

    return c.json(completions);
});

// GET /api/completions/today - Timezone-Aware Fetch
// Calculates "Today" based on user's profile timezone to prevent Midnight Wipe
completionsRoutes.get('/today', async (c) => {
    const user = c.get('user');
    const supabase = c.get('supabase');

    try {
        // 1. Fetch Timezone
        const { data: profile } = await supabase
            .from('profiles')
            .select('timezone')
            .eq('id', user.id)
            .single();

        const userTz = profile?.timezone || 'America/New_York';

        // 2. Calculate Today relative to User
        const today = new Date().toLocaleDateString('en-CA', { timeZone: userTz }); // YYYY-MM-DD

        // 3. Fetch Completions
        const { data: completions } = await supabase
            .from('habit_logs')
            .select('habit_id, value')
            .eq('user_id', user.id)
            .eq('completed_at', today);

        // Transform
        const completionMap: Record<string, boolean> = {};
        completions?.forEach((row: any) => {
            completionMap[row.habit_id] = row.value > 0;
        });

        return c.json({ date: today, timezone: userTz, completions: completionMap });

    } catch (error) {
        console.error('Sync Failed:', error);
        return c.json({ error: "Sync Failed" }, 500);
    }
});

export default completionsRoutes;
