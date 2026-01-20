import { Hono } from 'hono';
import { AppEnv } from '../hono';
import { syncService } from '../services/syncService';

const logRoutes = new Hono<AppEnv>();

// OPTIONS Preflight for Toggle
logRoutes.options('/toggle', (c) => c.text('OK', 200));

// POST /toggle - Habit Completion Toggle (Unified Logic)
logRoutes.post('/toggle', async (c) => {
    const user = c.get('user');
    const supabase = c.get('supabase');
    const { habit_id, target_date, status, value, metadata } = await c.req.json();

    if (!habit_id || !target_date) {
        return c.json({ error: 'Missing habit_id or target_date' }, 400);
    }

    // Determine value: 'value' overrides 'status' (boolean)
    // If value is explicitly provided (0 or 1+), use it. Otherwise use status (true=1, false=0).
    const finalValue = value !== undefined ? value : (status ? 1 : 0);

    let data, error;

    if (finalValue === 0) {
        // DELETE logic for un-completing
        // We match user_id, habit_id, and completed_at
        const result = await supabase
            .from('habit_logs')
            .delete()
            .eq('user_id', user.id)
            .eq('habit_id', habit_id)
            .eq('completed_at', target_date);

        error = result.error;
        data = null; // Data is null on delete
    } else {
        // UPSERT logic for completing
        const result = await supabase
            .from('habit_logs')
            .upsert({
                user_id: user.id,
                habit_id: habit_id,
                completed_at: target_date,
                value: finalValue,
                metadata: metadata
            }, { onConflict: 'user_id, habit_id, completed_at' })
            .select()
            .single();

        data = result.data;
        error = result.error;
    }

    if (error) {
        console.error('Toggle Error:', error);
        return c.json({ error: 'Persistence Failure', details: error.message }, 500);
    }

    // Vault Sync (Fire and forget)
    if (data) {
        syncService.syncLedgerToVault(user.id, data).catch(err => console.error('Vault Sync Error:', err));
    }

    // Return success
    return c.json(data || { success: true, operation: 'delete' });
});

// POST / - Log Note (Legacy /api/habit_logs base endpoint)
logRoutes.post('/', async (c) => {
    const user = c.get('user');
    const supabase = c.get('supabase');
    const body = await c.req.json();
    const { habit_id, completed_at, value, note } = body;

    if (!habit_id || !completed_at || value === undefined) {
        return c.json({ error: 'Missing required fields: habit_id, completed_at, value' }, 400);
    }

    // Upsert Protocol
    const { data, error } = await supabase
        .from('habit_logs')
        .upsert({
            user_id: user.id,
            habit_id: habit_id,
            completed_at: completed_at,
            value: value,
            note: note
        }, { onConflict: 'user_id, habit_id, completed_at' })
        .select()
        .single();

    if (error) {
        console.error('Error logging habit:', error);
        return c.json({ error: 'Failed to log habit' }, 500);
    }

    syncService.syncLedgerToVault(user.id, data).catch(err => console.error('Vault Sync Error:', err));

    return c.json({ message: 'Habit logged successfully', log: data });
});

export default logRoutes;
