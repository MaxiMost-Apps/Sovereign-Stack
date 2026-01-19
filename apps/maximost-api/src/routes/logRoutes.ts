import { Hono } from 'hono';
import { createClient } from '@supabase/supabase-js';
import { syncService } from '../services/syncService';
import type { AppEnv } from '../hono';

const logRoutes = new Hono<AppEnv>();

// POST /api/habit_logs - Log or Update a habit completion
logRoutes.post('/', async (c) => {
    const user = c.get('user');
    const supabase = c.get('supabase');
    const body = await c.req.json();
    const { habit_id, completed_at, value, note } = body;

    if (!habit_id || !completed_at || value === undefined) {
        return c.json({ error: 'Missing required fields: habit_id, completed_at, value' }, 400);
    }

    // Upsert Protocol
    // We rely on the unique constraint (user_id, habit_id, completed_at) to handle updates
    const { data, error } = await supabase
        .from('habit_logs')
        .upsert({
            user_id: user.id,
            habit_id: habit_id,
            completed_at: completed_at, // Ensure YYYY-MM-DD format from frontend
            value: value,
            note: note
        }, { onConflict: 'user_id, habit_id, completed_at' })
        .select()
        .single();

    if (error) {
        console.error('Error logging habit:', error);
        return c.json({ error: 'Failed to log habit' }, 500);
    }

    // Vault Sync (Air-Gap Roadmap)
    // Fire and forget - handled by SyncService
    syncService.syncLedgerToVault(user.id, data).catch(err => console.error('Vault Sync Error:', err));

    return c.json({ message: 'Habit logged successfully', log: data });
});

// GET /api/habit_logs/feed - Unified Ledger Feed (Welltory-Style)
logRoutes.get('/feed', async (c) => {
    const user = c.get('user');
    const supabase = c.get('supabase');
    const limitParam = c.req.query('limit');
    const limit = limitParam ? parseInt(limitParam) : 50;
    const before = c.req.query('before'); // Timestamp offset for Load More

    // 1. Fetch Habit Logs (Completions)
    let habitQuery = supabase
        .from('habit_logs')
        .select(`
            id, completed_at, value, note,
            habits:habit_id (title, slug, metadata, base_color, icon)
        `)
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false })
        .limit(limit);

    if (before) {
        habitQuery = habitQuery.lt('completed_at', before);
    }

    const { data: habits } = await habitQuery;

    // 2. Fetch Telemetry Logs (Spikes)
    // Graceful fallback if table missing
    let telemetry: any[] = [];
    try {
        const { data, error } = await supabase
            .from('telemetry_logs')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(Math.min(limit, 20)); // Cap telemetry for density

        if (!error && data) telemetry = data;
    } catch (e) {
        // Ignore table missing error
    }

    // 3. Fetch Field Notes (Journal)
    const { data: journals } = await supabase
        .from('journal_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false })
        .limit(Math.min(limit, 20));

    // 4. Merge & Sort
    const feed: any[] = [];

    // Map Habits
    habits?.forEach((h: any) => {
        feed.push({
            id: h.id,
            timestamp: h.completed_at,
            type: 'habit_completion',
            content: {
                title: h.habits?.title || 'Unknown Habit',
                mission: h.habits?.metadata?.logic || h.habits?.description,
                // Pass full perspectives for Lens-aware rendering on frontend
                perspectives: h.habits?.metadata?.perspectives,
                narrative: h.note, // User note takes precedence, else frontend uses perspective
                color: h.habits?.base_color || h.habits?.metadata?.base_color || '#10B981',
                icon: h.habits?.icon
            }
        });
    });

    // Map Telemetry
    telemetry.forEach((t: any) => {
        feed.push({
            id: t.id,
            timestamp: t.created_at,
            type: 'telemetry',
            content: {
                title: t.source ? `Telemetry: ${t.source}` : 'Telemetry Spike',
                data: t.payload,
                color: '#3B82F6' // Blue
            }
        });
    });

    // Map Journals
    journals?.forEach((j: any) => {
        feed.push({
            id: j.id,
            timestamp: j.date,
            type: 'field_note',
            content: {
                title: 'Field Note',
                preview: j.content ? j.content.substring(0, 60) + '...' : 'Encrypted Content',
                color: '#9CA3AF', // Slate
                is_encrypted: !j.content
            }
        });
    });

    // Sort Descending
    feed.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return c.json({ feed });
});

export default logRoutes;
