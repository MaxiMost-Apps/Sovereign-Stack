// @ts-nocheck
import { Hono } from 'hono';
import { createClient } from '@supabase/supabase-js';

const router = new Hono();

// Stub for AI Generation (Token Cost Simulation)
const generateGeminiRoast = async (text: string, category: string) => {
    // In a real scenario, this calls Google Gemini API.
    // For now, we return a generic "AI" response.
    return `[AI SIMULATION] You said "${text}" in category ${category}. My analysis: You are weak. Fix it.`;
};

// Helper to extract keywords (Naive implementation)
const extractKeywords = (text: string) => {
    return text.toLowerCase().split(/\s+/).filter(w => w.length > 3);
};

// POST /roast
router.post('/roast', async (c) => {
    try {
        const body = await c.req.json();
        const { category, text } = body;

        if (!text || !category) {
            return c.json({ error: 'Missing text or category' }, 400);
        }

        // Initialize Supabase (Admin Client to bypass RLS for public read/write if needed, or use service role)
        // Ideally we use the client from context or create one.
        // Assuming env vars are present.
        const supabaseUrl = process.env.SUPABASE_URL || '';
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY || '';
        const supabase = createClient(supabaseUrl, supabaseKey);

        const normalizedInput = text.toLowerCase();

        // 1. CACHE CHECK (The Gatekeeper)
        // We want to find a roast where 'input_keywords' array contains words found in user input?
        // OR the user input contains one of the keywords in the DB array?
        // The prompt says: "We look for a roast where the input contains one of the stored keywords".
        // DB has `input_keywords` column (array of text).
        // Example DB: ['tired', 'sleepy']
        // User Input: "I am tired"
        // Match condition: Input contains 'tired'.

        // Supabase `contains` works if the column is an array and we pass a value that is contained?
        // No, `contains` on an array column checks if the column contains the passed array.
        // We want the reverse or an overlap.
        // `overlaps` operator: `&&`.
        // Let's extract words from input and check overlap with `input_keywords`.
        const userWords = normalizedInput.split(/\s+/);

        // This query checks if `input_keywords` overlaps with `userWords`
        const { data: cachedRoast, error } = await supabase
            .from('public_roasts')
            .select('*')
            .overlaps('input_keywords', userWords)
            .eq('category', category)
            .limit(1)
            .maybeSingle();

        if (cachedRoast) {
            // Async hit count increment
            // supabase.rpc('increment_roast_hit', { row_id: cachedRoast.id });

            return c.json({
                roast: cachedRoast.roast_text,
                source: 'VAULT'
            });
        }

        // 2. CACHE MISS -> AI GENERATION
        const aiResponse = await generateGeminiRoast(text, category);

        // 3. SAVE TO VAULT
        const newKeywords = extractKeywords(text);
        if (newKeywords.length > 0) {
             await supabase.from('public_roasts').insert({
                category,
                input_keywords: newKeywords,
                roast_text: aiResponse,
                is_verified: false
            });
        }

        return c.json({
            roast: aiResponse,
            source: 'AI'
        });

    } catch (err: any) {
        console.error("Roast Error:", err);
        return c.json({ error: err.message }, 500);
    }
});

export default router;
