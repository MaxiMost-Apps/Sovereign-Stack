import { Hono } from 'hono';
import { AppEnv } from '../hono';

const statsRoutes = new Hono<AppEnv>();

// GET /api/stats/vanguard-count
// Returns the count of users who are Vanguards (is_vanguard = true)
statsRoutes.get('/vanguard-count', async (c) => {
    const supabase = c.get('supabase');

    // We use count: 'exact', head: true to get just the count without fetching rows
    const { count, error } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('is_vanguard', true);

    if (error) {
        console.error('Error fetching vanguard count:', error.message);
        return c.json({ count: 0 }); // Fail gracefully to 0
    }

    return c.json({ count: count });
});

export default statsRoutes;
