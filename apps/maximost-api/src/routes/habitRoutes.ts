// @ts-nocheck
import { Hono } from 'hono';
import { createClient } from '@supabase/supabase-js';
import { config } from '../config';
import { AppEnv } from '../hono';

const router = new Hono<AppEnv>();

// ⚡️ INITIALIZE GOD MODE CLIENT (Bypasses ALL RLS/Permissions)
const supabaseAdmin = createClient(config.SUPABASE_URL, config.SUPABASE_SERVICE_ROLE_KEY);

// --- 1. GET ALL HABITS (The "Dashboard" View) ---
router.get('/', async (c) => {
  const user = c.get('user');
  const user_id = user?.id || c.req.query('user_id');

  if (!user_id) return c.json({ error: 'Missing User ID' }, 400);

  // FETCH EVERYTHING (No permissions check)
  const { data, error } = await supabaseAdmin
    .from('habits')
    .select('*')
    .eq('user_id', user_id) // Filter by user_id
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('❌ GET Habits Error:', error);
    return c.json({ error: error.message }, 500);
  }

  // Handshake Bridge: Ensure frontend receives 'is_absolute' derived from 'type'
  const enrichedData = (data || []).map((h: any) => {
      const metadata = typeof h.metadata === 'string' ? JSON.parse(h.metadata) : (h.metadata || {});
      return {
          ...h,
          metadata: {
              ...metadata,
              stacks: metadata.stacks || h.linked_stacks || ["General"]
          },
          is_absolute: h.type === 'absolute'
      };
  });

  return c.json(enrichedData, 200);
});

// --- 2. ADOPT HABIT (The "Quick Start" Button) ---
router.post('/adopt', async (c) => {
  try {
    const user = c.get('user');
    const body: any = await c.req.json();
    const slugs = body.slugs || (body.slug ? [body.slug] : []);
    const user_id = user?.id || body.user_id;

    if (!user_id || slugs.length === 0) return c.json({ error: 'Missing Data' }, 400);

    const results = [];

    for (const slug of slugs) {
      // Find Template (Using Admin)
      const { data: template } = await supabaseAdmin.from('habits').select('*').eq('slug', slug).single();

      if (template) {
        // ✅ Check if user already has this habit (by title)
        const { data: existing } = await supabaseAdmin
            .from('habits')
            .select('id')
            .eq('user_id', user_id)
            .eq('title', template.title)
            .maybeSingle();

        if (existing) {
            console.log(`Skipping duplicate adoption for ${template.title}`);
            results.push(existing);
            continue;
        }

        // Clone it
        const { data: newHabit, error } = await supabaseAdmin
          .from('habits')
          .insert({
             user_id,
             title: template.title,
             description: template.description,
             slug: `${template.slug}-${Date.now()}`, // Ensure unique slug for the copy
             // Copy known fields safely
             frequency_type: template.frequency_type || 'daily',
             target_value: template.target_value || 1,
             color: template.color || '#3B82F6',
             icon: template.icon || 'activity'
          })
          .select()
          .single();

        if (!error) results.push(newHabit);
        else console.error(`❌ Insert Error (${slug}):`, error);
      }
    }
    return c.json({ adopted: results }, 200);
  } catch (e) { return c.json({ error: 'Server Error' }, 500); }
});

// --- 3. UPDATE HABIT (THE MISSING "EDIT" ROUTE) ---
router.put('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const body: any = await c.req.json();
    console.log(`📝 UPDATING HABIT ${id}:`, body);

    // CLEAN THE BODY: Remove fields that break Supabase (like 'id', 'created_at')
    const { id: _, created_at, ...updates } = body;

    // EXECUTE UPDATE (Using Admin)
    const { data, error } = await supabaseAdmin
      .from('habits')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('❌ Update Failed:', error);
      // If error is "Column not found", we should ideally ignore it,
      // but Supabase is strict. We rely on the SQL patch having fixed the columns.
      return c.json({ error: error.message }, 400);
    }

    return c.json(data, 200);

  } catch (error) {
    console.error('🔥 UPDATE FATAL:', error);
    return c.json({ error: 'Internal Error' }, 500);
  }
});

// Options for CORS
router.options('*', (c) => c.text('OK', 200));

export default router;
