import { Hono } from 'hono';
import { createClient } from '@supabase/supabase-js';
import { config } from '../config';
import { AppEnv } from '../hono';

const router = new Hono<AppEnv>();

// Initialize Supabase Admin Client
const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_SERVICE_ROLE_KEY);

// --- THE TOGGLE ENGINE ---
router.post('/toggle', async (c) => {
  try {
    const user = c.get('user'); // Get user from Auth Middleware
    const body: any = await c.req.json();
    console.log('✅ TOGGLE HIT:', body);

    // ADAPTATION: Handle Frontend Payload (target_date, value) OR User Payload (date, user_id)
    const habit_id = body.habit_id;
    const user_id = user?.id || body.user_id; // Prefer Auth Context
    const dateStr = body.target_date || body.date || new Date().toISOString();
    const value = body.value; // Optional explicit value

    if (!habit_id || !user_id) {
      console.error('❌ Missing habit_id or user_id');
      return c.json({ error: 'Missing habit_id or user_id' }, 400);
    }

    // 1. CHECK: Did we already do this today?
    // We look for a log for this habit, this user, on this date.
    const startOfDay = new Date(dateStr).toISOString().split('T')[0] + ' 00:00:00';
    const endOfDay = new Date(dateStr).toISOString().split('T')[0] + ' 23:59:59';

    const { data: existingLogs, error: fetchError } = await supabase
      .from('habit_logs')
      .select('id')
      .eq('habit_id', habit_id)
      .eq('user_id', user_id)
      .gte('completed_at', startOfDay)
      .lte('completed_at', endOfDay);

    if (fetchError) {
      console.error('⚠️ DB Error checking logs:', fetchError);
      throw fetchError;
    }

    let result;
    const exists = existingLogs && existingLogs.length > 0;

    // LOGIC: Explicit Value OR Toggle
    let shouldDelete = false;
    if (value !== undefined) {
       shouldDelete = (value === 0);
    } else {
       shouldDelete = exists; // Toggle behavior
    }

    if (shouldDelete) {
      // 2. TOGGLE OFF (Delete)
      if (exists) {
          const { error: delError } = await supabase
            .from('habit_logs')
            .delete()
            .eq('id', existingLogs[0].id);

          if (delError) throw delError;
      }
      result = { status: 'uncompleted', id: existingLogs[0]?.id };

    } else {
      // 3. TOGGLE ON (Insert/Update)
      if (!exists) {
          const { data: newLog, error: insError } = await supabase
            .from('habit_logs')
            .insert({
              habit_id,
              user_id,
              completed_at: new Date(dateStr).toISOString(),
              value: value !== undefined && value > 0 ? value : 1
            })
            .select()
            .single();

          if (insError) throw insError;
          result = { status: 'completed', log: newLog };
      } else {
          // Already exists
          result = { status: 'completed', log: existingLogs[0] };
      }
    }

    return c.json(result, 200);

  } catch (error) {
    console.error('🔥 TOGGLE FATAL ERROR:', error);
    return c.json({ error: 'Failed to toggle' }, 500);
  }
});

// --- RESTORED FEED/STATS ROUTES (To prevent 404s) ---
router.get('/feed', (c) => c.json([], 200));
router.get('/stats', (c) => c.json({}, 200));
router.get('/', (c) => c.json([], 200));

export default router;
