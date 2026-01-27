// @ts-nocheck
import { Hono } from 'hono';
import { createClient } from '@supabase/supabase-js';

const router = new Hono();

// ⚡️ GOD MODE CLIENT
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

router.post('/toggle', async (c) => {
  try {
    const body: any = await c.req.json();
    const { habit_id, user_id, date } = body;

    // 1. SAFEGUARD: Ensure Value is a Number (Fixes the 50oz input)
    // If body.value exists, parse it. If not, default to 1.
    const inputValue = body.value ? parseInt(String(body.value)) : 1;
    const finalValue = isNaN(inputValue) ? 1 : inputValue;

    if (!habit_id || !user_id) return c.json({ error: 'Missing Info' }, 400);

    // Define "Today" boundaries
    const checkDate = date ? new Date(date) : new Date();
    const startOfDay = checkDate.toISOString().split('T')[0] + ' 00:00:00';
    const endOfDay = checkDate.toISOString().split('T')[0] + ' 23:59:59';

    // 2. CHECK EXISTING (Admin Mode + Type Bypass)
    // We use .from<any, any> to tell TypeScript to stop checking against old schemas
    const { data: existing } = await supabaseAdmin
      .from<any, any>('habit_logs')
      .select('id, value')
      .eq('habit_id', habit_id)
      .eq('user_id', user_id)
      .gte('completed_at', startOfDay)
      .lte('completed_at', endOfDay);

    // 3. TOGGLE LOGIC
    if (existing && existing.length > 0) {
      // DELETE (Uncheck)
      // If the new value is 0, we delete. 
      // OR if it's a simple toggle (value 1) and it exists, we delete.
      // BUT for quantified (50oz), we might want to update instead? 
      // For now, let's stick to the core logic: if it exists, we nuke it to toggle off, 
      // UNLESS we are explicitly updating a count.
      
      // LOGIC UPGRADE: If value is 0, delete. If value > 0, update/upsert.
      if (finalValue === 0) {
          await supabaseAdmin.from<any, any>('habit_logs').delete().eq('id', existing[0].id);
          return c.json({ status: 'uncompleted' }, 200);
      } else {
          // UPDATE existing log with new value (e.g. 49 -> 50)
          const { data: updatedLog } = await supabaseAdmin
            .from<any, any>('habit_logs')
            .update({ value: finalValue })
            .eq('id', existing[0].id)
            .select()
            .single();
          return c.json({ status: 'updated', log: updatedLog }, 200);
      }

    } else {
      // INSERT (Check)
      if (finalValue === 0) return c.json({ status: 'ignored' }, 200); // Don't create a 0 log

      const { data: newLog, error } = await supabaseAdmin
        .from<any, any>('habit_logs')
        .insert({
          habit_id,
          user_id,
          completed_at: checkDate.toISOString(),
          value: finalValue
        })
        .select()
        .single();
      
      if (error) {
        console.error('❌ Log Insert Error:', error);
        return c.json({ error: error.message }, 500);
      }
      return c.json({ status: 'completed', log: newLog }, 200);
    }

  } catch (e) {
    console.error('🔥 TOGGLE FATAL:', e);
    return c.json({ error: 'Server Error' }, 500);
  }
});

// Prevent 404s on stats calls
router.get('/feed', (c) => c.json([], 200));
router.get('/', (c) => c.json([], 200));

export default router;