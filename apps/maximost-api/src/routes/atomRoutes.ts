import { Hono } from 'hono';
import { createClient } from '@supabase/supabase-js';
import { config } from '../config';
import type { AppEnv } from '../hono';

const atomRoutes = new Hono<AppEnv>();

// GET /api/atoms - Public Lexicon Access
atomRoutes.get('/', async (c) => {
    console.log('⚛️ Public Atoms Request');
    try {
        const supabaseAdmin = createClient(config.SUPABASE_URL, config.SUPABASE_SERVICE_ROLE_KEY);

        const { data, error } = await supabaseAdmin
            .from('library_habits')
            .select('*')
            .order('title');

        if (error) {
            console.error('Atoms Fetch Error:', error.message);
            return c.json({ error: 'Failed to fetch atoms' }, 500);
        }

        return c.json(data);
    } catch (err: any) {
        console.error("Atoms Route Error:", err);
        return c.json({ error: "Internal Server Error" }, 500);
    }
});

export default atomRoutes;
