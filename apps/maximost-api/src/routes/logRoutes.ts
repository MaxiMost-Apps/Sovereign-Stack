import { Hono } from 'hono';
import { createClient } from '@supabase/supabase-js';
import { config } from '../config';
import { AppEnv } from '../hono';

const router = new Hono<AppEnv>();

// ⚡️ GOD MODE CLIENT
const supabaseAdmin = createClient(config.SUPABASE_URL, config.SUPABASE_SERVICE_ROLE_KEY);

router.post('/toggle', async (c) => {
  try {
    const user = c.get('user');
    const body: any = await c.req.json();
    console.log('✅ TOGGLE:', body);

    // ADAPTATION: Handle Frontend Payload (target_date, value) OR User Payload (date, user_id)
    const habit_id = body.habit_id;
    const user_id = user?.id || body.user_id; // Prefer Auth Context
    const dateStr = body.target_date || body.date || new Date().toISOString();
    const value = body.value; // Optional explicit value

    if (!habit_id || !user_id) return c.json({ error: 'Missing Info' }, 400);

    // DEFINE "TODAY"
    const checkDate = new Date(dateStr);
    const startOfDay = checkDate.toISOString().split('T')[0] + ' 00:00:00';
    const endOfDay = checkDate.toISOString().split('T')[0] + ' 23:59:59';

    // 1. CHECK EXISTING (Admin Mode)
    const { data: existing } = await supabaseAdmin
      .from('habit_logs')
      .select('id')
      .eq('habit_id', habit_id)
      .eq('user_id', user_id)
      .gte('completed_at', startOfDay)
      .lte('completed_at', endOfDay);

    const exists = existing && existing.length > 0;

    // LOGIC: Explicit Value OR Toggle
    let shouldDelete = false;
    if (value !== undefined) {
       shouldDelete = (value === 0);
    } else {
       shouldDelete = exists; // Toggle behavior
    }

    // 2. TOGGLE LOGIC
    if (shouldDelete) {
      // DELETE (Uncheck)
      if (exists) {
          await supabaseAdmin.from('habit_logs').delete().eq('id', existing[0].id);
      }
      return c.json({ status: 'uncompleted', id: existing?.[0]?.id }, 200);
    } else {
      // INSERT (Check)
      if (!exists) {
          const { data: newLog, error } = await supabaseAdmin
            .from('habit_logs')
            .insert({
              habit_id,
              user_id,
              completed_at: checkDate.toISOString(),
              value: value !== undefined && value > 0 ? value : 1
            })
            .select()
            .single();

          if (error) {
            console.error('❌ Log Insert Error:', error);
            return c.json({ error: error.message }, 500);
          }
          return c.json({ status: 'completed', log: newLog }, 200);
      } else {
          return c.json({ status: 'completed', log: existing[0] }, 200);
      }
    }

  } catch (e) {
    console.error('🔥 TOGGLE FATAL:', e);
    return c.json({ error: 'Server Error' }, 500);
  }
});

// SAFETY ROUTES (Prevent 404s)
router.get('/feed', (c) => c.json([], 200));
router.get('/stats', (c) => c.json({}, 200));
router.get('/', (c) => c.json([], 200));

// Options for CORS
router.options('*', (c) => c.text('OK', 200));

export default router;
