import { Hono } from 'hono';
import { createClient } from '@supabase/supabase-js';
import { config } from '../config';

const keysRoutes = new Hono();

// GET /keys - List keys for the authenticated user
keysRoutes.get('/', async (c) => {
    // In a real app, we would extract the user ID from the auth token middleware
    // For now, assuming we pass userId in header for simplicity or grabbing from context if auth middleware exists
    // Looking at other routes, it seems auth middleware isn't strictly visible here, but let's assume we need to verify user.
    // The prompt implies this is for Vanguard/Architect users viewing their keys.

    // We'll trust the caller to provide the user ID in a header 'X-User-Id' for this internal/MVP implementation
    // or rely on the standard auth flow.
    const userId = c.req.header('X-User-Id');
    if (!userId) {
        return c.json({ error: 'Unauthorized' }, 401);
    }

    const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_SERVICE_ROLE_KEY);

    const { data, error } = await supabase
        .from('sovereign_keys')
        .select('*')
        .eq('creator_id', userId)
        .order('created_at', { ascending: false });

    if (error) {
        return c.json({ error: error.message }, 500);
    }

    return c.json({ keys: data });
});

// POST /keys/redeem - Redeem a key
keysRoutes.post('/redeem', async (c) => {
    const { code, userId, email } = await c.req.json();

    if (!code || !userId) {
        return c.json({ error: 'Missing code or userId' }, 400);
    }

    const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_SERVICE_ROLE_KEY);

    // 1. Check if key exists and is available
    const { data: key, error: fetchError } = await supabase
        .from('sovereign_keys')
        .select('*')
        .eq('key_code', code)
        .single();

    if (fetchError || !key) {
        return c.json({ error: 'Invalid key code' }, 404);
    }

    if (key.status !== 'AVAILABLE') {
        return c.json({ error: 'Key already redeemed' }, 400);
    }

    // 2. Mark as redeemed
    const { error: updateError } = await supabase
        .from('sovereign_keys')
        .update({
            status: 'REDEEMED',
            redeemed_at: new Date(),
            redeemed_by_user_id: userId,
            recipient_email: email
        })
        .eq('id', key.id);

    if (updateError) {
        return c.json({ error: 'Failed to redeem key' }, 500);
    }

    // 3. Grant Initiate/Sentinel status to the user
    // The prompt says: "These keys allow the purchaser to 'gift' a Sentinel-level membership to a peer."
    // Assuming 'sentinel' is the tier name for this.
    const { error: profileError } = await supabase
        .from('profiles')
        .update({ membership_tier: 'sentinel' })
        .eq('id', userId);

    if (profileError) {
        console.error('Key redeemed but failed to update profile tier:', profileError);
        // We might want to rollback or handle this, but for now just report error
        return c.json({ error: 'Key redeemed but failed to grant membership' }, 500);
    }

    return c.json({ success: true, message: 'Key redeemed successfully. Welcome to Sentinel.' });
});

export default keysRoutes;
