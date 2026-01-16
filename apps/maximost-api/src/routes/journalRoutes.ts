import { Hono } from 'hono';
import type { AppEnv } from '../hono';

const journalRoutes = new Hono<AppEnv>();

// GET /api/journal - Fetch all journal entries for the logged-in user
journalRoutes.get('/', async (c) => {
  const user = c.get('user');
  const supabase = c.get('supabase');

  // Garnish Protocol: If not Vanguard, limit history to 7 days
  // Fix: Check 'tier_name' or legacy 'membership_tier' and handle potential missing 'is_vanguard' in type
  const profile = user.profile as any; // Cast to any to avoid strict type error during build if interface outdated
  const isVanguard = profile.is_vanguard === true ||
                     ['VANGUARD', 'SOVEREIGN', 'ARCHITECT'].includes(profile.tier_name?.toUpperCase()) ||
                     ['vanguard', 'sovereign'].includes(profile.membership_tier);

  let query = supabase
    .from('journal_entries')
    .select('*')
    .eq('user_id', user.id);

  if (!isVanguard) {
      // 7 Day Rolling Window Logic
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      query = query.gte('date', sevenDaysAgo.toISOString().split('T')[0]);
      // Assuming 'date' column is YYYY-MM-DD or ISO timestamp.
      // If 'date' is just the date string, we compare string format.
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching journal entries:', error.message);
    return c.json({ error: 'Failed to fetch journal entries' }, 500);
  }

  return c.json(data);
});

// POST /api/journal - Create a new journal entry for the logged-in user
journalRoutes.post('/', async (c) => {
    const user = c.get('user');
    const { date, content, mood, tags, encrypted_blob, iv } = await c.req.json();

    // Support Zero-Knowledge: Allow encrypted_blob OR content
    if (!content && !encrypted_blob) {
        return c.json({ error: 'Journal entry content or encrypted blob is required' }, 400);
    }

    const supabase = c.get('supabase');
    const { data, error } = await supabase
        .from('journal_entries')
        .insert({
            date: date,
            content: content,
            mood: mood,
            tags: tags,
            user_id: user.id,
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating journal entry:', error.message);
        return c.json({ error: 'Failed to create journal entry' }, 500);
    }

    return c.json(data, { status: 201 });
});

// PUT (update) a journal entry
journalRoutes.put('/:entryId', async (c) => {
    const user = c.get('user');
    const { entryId } = c.req.param();
    const { date, content, mood, tags } = await c.req.json();

    const supabase = c.get('supabase');
    const { data, error } = await supabase
        .from('journal_entries')
        .update({ date, content, mood, tags })
        .eq('id', entryId)
        .eq('user_id', user.id)
        .select()
        .single();

    if (error) {
        console.error('Error updating journal entry:', error.message);
        return c.json({ error: 'Failed to update journal entry' }, 500);
    }

    return c.json(data);
});

// DELETE a journal entry
journalRoutes.delete('/:entryId', async (c) => {
    const user = c.get('user');
    const { entryId } = c.req.param();

    const supabase = c.get('supabase');
    const { error } = await supabase
        .from('journal_entries')
        .delete()
        .eq('id', entryId)
        .eq('user_id', user.id);

    if (error) {
        console.error('Error deleting journal entry:', error.message);
        return c.json({ error: 'Failed to delete journal entry' }, 500);
    }

    return c.body(null, 204);
});


export default journalRoutes;
