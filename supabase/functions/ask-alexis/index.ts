import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight automatically
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // 1. Initialize Clients
    // We expect GEMINI_API_KEY to be set in Supabase Secrets later
    const geminiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiKey) throw new Error("Missing GEMINI_API_KEY");

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    const genAI = new GoogleGenerativeAI(geminiKey)
    // Use the Flash model for speed/cost balance
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })

    // 2. Parse Input
    const { query, health_snapshot, use_memory } = await req.json()

    // 3. RAG (Recall) Logic
    let memoryContext = ""
    if (use_memory) {
      const embeddingModel = genAI.getGenerativeModel({ model: "text-embedding-004" });
      const embeddingResult = await embeddingModel.embedContent(query);

      const { data: memories, error: searchError } = await supabase.rpc('match_memories', {
        query_embedding: embeddingResult.embedding.values,
        match_threshold: 0.6,
        match_count: 5
      })

      if (!searchError && memories && memories.length > 0) {
        memoryContext = `RELEVANT MEMORIES:\n${memories.map((m: any) => `- ${m.content}`).join('\n')}\n`
      }
    }

    // 4. Construct Prompt
    const systemPrompt = `
      You are Alexis, the Sovereign Intelligence for the Maximost stack.
      Your goal is compliance, defense, and optimization.

      LIVE BIO-DATA:
      - Glucose: ${health_snapshot?.glucose ?? 'N/A'}
      - Steps: ${health_snapshot?.steps ?? 'N/A'}

      ${memoryContext}

      USER QUERY: "${query}"

      Directives:
      1. Be concise. No fluff.
      2. If bio-data shows drift (Glucose > 140 or Steps < 5k), mention it.
      3. Use the memories to detect patterns if applicable.
    `

    // 5. Generate Response
    const result = await model.generateContent(systemPrompt)
    const responseText = result.response.text()

    return new Response(JSON.stringify({ reply: responseText }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
