import { Hono } from 'hono';
import { createClient } from '@supabase/supabase-js';
import { config } from '../config';
import { AppEnv } from '../hono';

const router = new Hono<AppEnv>();

// Initialize Supabase Admin Client (Bypass RLS)
const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_SERVICE_ROLE_KEY);

router.post('/adopt', async (c) => {
  try {
    // 1. BYPASS TYPESCRIPT STRICTNESS
    // This 'any' cast fixes the "Property slugs does not exist" build error.
    const body: any = await c.req.json();
    console.log('✅ ADOPT ROUTE HIT. Payload:', body);

    // Support both single 'slug' and array 'slugs'
    const slugs = body.slugs || (body.slug ? [body.slug] : []);

    // CRITICAL FIX: Frontend does NOT send user_id in body, it's in the Auth Context
    const user = c.get('user');
    const user_id = user?.id;

    if (!user_id || slugs.length === 0) {
      console.error('❌ Missing user_id or slugs. Auth:', !!user);
      return c.json({ error: 'Missing user_id or slugs' }, 400);
    }

    const results = [];
    const errors = [];

    // 2. ITERATE SLUGS (Now supported by DB)
    for (const slug of slugs) {
        // Fetch Template
        const { data: template, error: findError } = await supabase
            .from('habits')
            .select('*')
            .eq('slug', slug) // This works now because you ran the SQL!
            .single();

        if (findError || !template) {
            console.warn(`⚠️ Template missing for slug: ${slug}`);
            errors.push({ slug, error: 'Template not found' });
            continue;
        }

        // Create User Copy
        const { data: newHabit, error: insertError } = await supabase
            .from('habits')
            .insert({
                user_id: user_id,
                title: template.title,
                description: template.description,
                frequency: template.frequency,
                target_count: template.target_count,
                // SAFETY: Commented out to prevent "Column does not exist" crash
                // category: template.category,
                // tier: template.tier
            })
            .select()
            .single();

        if (insertError) {
             console.error(`❌ Failed to insert ${slug}:`, insertError);
             errors.push({ slug, error: insertError.message });
        } else {
             results.push(newHabit);
        }
    }

    return c.json({ adopted: results, errors }, 200);

  } catch (error) {
    console.error('🔥 FATAL ADOPT ERROR:', error);
    return c.json({ error: 'Internal Server Error' }, 500);
  }
});

// Keep GET route for health checks
// RESTORED: Full list for Dashboard
router.get('/', async (c) => {
  const user = c.get('user');
  const supabaseUser = c.get('supabase');

  const { data, error } = await supabaseUser
    .from('habits')
    .select('*')
    .eq('user_id', user.id);

  if (error) return c.json({ error: 'Failed' }, 500);

  // Handshake Bridge: Ensure frontend receives 'is_absolute' derived from 'type'
  // And ensure metadata is an object (Supabase JS usually handles this, but we enforce safe fallback)
  const enrichedData = (data || []).map((h: any) => {
      const metadata = typeof h.metadata === 'string' ? JSON.parse(h.metadata) : (h.metadata || {});
      return {
          ...h,
          metadata: {
              ...metadata,
              // CRITICAL FIX: Fallback to ["General"] if null to prevent Frontend crash
              stacks: metadata.stacks || h.linked_stacks || ["General"]
          },
          is_absolute: h.type === 'absolute'
      };
  });

  return c.json(enrichedData, 200);
});

export default router;
