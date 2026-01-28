// @ts-nocheck
import express from 'express';
import { supabase } from '../supabaseClient'; // Ensure this client exists and is configured

const router = express.Router();

// POST /api/public/roast
router.post('/roast', async (req, res) => {
  const { category, input } = req.body;

  // 1. TRY TO MATCH KEYWORDS FROM DB
  // This query finds a roast where the input_keywords array overlaps with the user's input
  // Note: Using textSearch with simple input for now as per snippet.
  const { data, error } = await supabase
    .from('public_roasts')
    .select('roast_text')
    .eq('category', category)
    .textSearch('input_keywords', input) // Simplified logic
    .limit(1)
    .single();

  if (data) {
    return res.json({ roast: data.roast_text });
  }

  // 2. FALLBACK TO AI (If no keyword match)
  // For now, return a generic fallback if AI isn't hooked up yet, or a specific "AI Simulation" response.
  // In a real implementation, we would call OpenAI/Gemini here.

  const FALLBACKS: Record<string, string[]> = {
      lie: ["You are lying to yourself. The truth is you just don't want it bad enough.", "Excuses are the nails in the coffin of your potential."],
      poison: ["Numbing the pain only makes the awakening more brutal.", "You are feeding the very thing that is killing your spirit."],
      drift: ["Time is not refundable. You are spending it like you have an infinite supply.", "Focus is a muscle. Yours is atrophied."]
  };

  const fallbacks = FALLBACKS[category] || ["Silence is also an answer. Look inward."];
  const randomFallback = fallbacks[Math.floor(Math.random() * fallbacks.length)];

  return res.json({ roast: randomFallback });
});

export default router;
