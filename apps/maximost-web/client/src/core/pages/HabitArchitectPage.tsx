import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Zap, Ban, Fingerprint, Loader2, Sparkles, AlertTriangle, XCircle } from 'lucide-react';


// --- UPGRADED API CALL (Gemini 2.0 Flash) ---
const callAI = async (prompt: string) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing API Key. Check Vercel Environment Variables.");
  }

  // UPDATED MODEL: gemini-2.0-flash-exp
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }]
    })
  });

  if (!response.ok) {
    const errData = await response.json();
    throw new Error(errData.error?.message || `API Error: ${response.status}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "Error generating strategy.";
};

export default function HabitArchitectPage() {
  const [activeTab, setActiveTab] = useState<'build' | 'break' | 'identity'>('build');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!input) return;
    setLoading(true);
    setResult(null);
    setErrorMsg(null);

    try {
      let prompt = "";
      // PROMPT ENGINEERING FOR GEMINI 2.0
      if (activeTab === 'build') {
        prompt = `You are a behavioral engineer. User Goal: INSTALL habit "${input}".
        Output: valid JSON only. No markdown formatting.
        Schema: { "obvious": ["string"], "attractive": ["string"], "easy": ["string"], "satisfying": ["string"] }.
        Keep advice punchy and tactical.`;
      }
      else if (activeTab === 'break') {
        prompt = `You are a behavioral engineer. User Goal: BREAK habit "${input}".
        Output: valid JSON only. No markdown formatting.
        Schema: { "invisible": ["string"], "unattractive": ["string"], "difficult": ["string"], "unsatisfying": ["string"] }.
        Use Inversion of 4 Laws.`;
      }
      else if (activeTab === 'identity') {
        prompt = `User Goal: BECOME "${input}".
        Output: valid JSON only. No markdown formatting.
        Schema: { "habits": ["string"] } (3 items).`;
      }

      const rawText = await callAI(prompt);
      // Clean potential markdown just in case
      const jsonStr = rawText.replace(/```json|```/g, '').trim();
      setResult(JSON.parse(jsonStr));
    } catch (error: any) {
      console.error("Gemini 2.0 Error:", error);
      setErrorMsg(error.message || "Connection failed.");
    }
    setLoading(false);
  };

  // --- UI THEME CONFIG ---
  const theme = {
    build: { color: 'text-teal-400', border: 'border-teal-500/30', bg: 'bg-teal-500', hover: 'hover:bg-teal-400', shadow: 'shadow-teal-900/20' },
    break: { color: 'text-red-400', border: 'border-red-500/30', bg: 'bg-red-600', hover: 'hover:bg-red-500', shadow: 'shadow-red-900/20' },
    identity: { color: 'text-blue-400', border: 'border-blue-500/30', bg: 'bg-blue-500', hover: 'hover:bg-blue-400', shadow: 'shadow-blue-900/20' },
  }[activeTab];

  return (

      <div className="p-6 max-w-4xl mx-auto space-y-8 pb-24">
        {/* Header */}
        <div className="space-y-2 text-center md:text-left">
          <h1 className="text-3xl font-bold text-slate-100 flex items-center justify-center md:justify-start gap-3">
            <Brain className="w-8 h-8 text-amber-500" />
            Behavioral Engineering
          </h1>
          <p className="text-slate-400">Re-write your operating system.</p>
        </div>

        {/* Error Banner */}
        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/50 p-4 rounded-xl flex items-center gap-3 text-red-200">
            <XCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm">{errorMsg}</p>
            <button onClick={() => setErrorMsg(null)} className="ml-auto hover:text-white">Dismiss</button>
          </div>
        )}

        {/* Tabs */}
        <div className="flex p-1 bg-slate-900 rounded-xl border border-white/10 overflow-x-auto">
          {[
            { id: 'build', label: 'Habit Architect', icon: Zap },
            { id: 'break', label: 'Habit Breaker', icon: Ban },
            { id: 'identity', label: 'Identity Shaper', icon: Fingerprint },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id as any); setResult(null); setInput(''); setErrorMsg(null); }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-bold rounded-lg transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-slate-800 text-white shadow-lg border border-white/5'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? theme.color : ''}`} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Input Card */}
        <div className={`bg-slate-900 border ${theme.border} p-6 rounded-2xl shadow-xl transition-all duration-300`}>
           <div className="text-center space-y-3 mb-6">
              <h2 className={`text-2xl font-bold ${theme.color} flex items-center justify-center gap-2`}>
                  <Sparkles className="w-6 h-6" />
                  {activeTab === 'build' && "Your Personal Habit Architect"}
                  {activeTab === 'break' && "The Bad Habit Breaker"}
                  {activeTab === 'identity' && "Discover Your Identity Habits"}
              </h2>
              <p className="text-slate-400 text-sm max-w-xl mx-auto">
                  {activeTab === 'build' && "Design a system based on the 4 Laws of Behavior Change."}
                  {activeTab === 'break' && "Dismantle bad habits using Inversion Theory."}
                  {activeTab === 'identity' && "Cast votes for the person you wish to become."}
              </p>
           </div>

           <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={activeTab === 'build' ? "e.g., 'Cold Plunge'" : activeTab === 'break' ? "e.g., 'Doomscrolling'" : "e.g., 'A Stoic'"}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-slate-600 transition-colors"
                  onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                />
                <button
                  onClick={handleAnalyze}
                  disabled={loading || !input}
                  className={`${theme.bg} ${theme.hover} text-white px-8 py-3 rounded-lg font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2`}
                >
                  {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Analyze"}
                </button>
          </div>
        </div>

        {/* Results */}
        <AnimatePresence mode='wait'>
          {result && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid gap-6 md:grid-cols-2">
               {activeTab === 'build' && (
                <>
                  <ResultCard title="1. Signal" desc={result.obvious} color="teal" />
                  <ResultCard title="2. Desire" desc={result.attractive} color="teal" />
                  <ResultCard title="3. Friction" desc={result.easy} color="teal" />
                  <ResultCard title="4. Reward" desc={result.satisfying} color="teal" />
                </>
              )}
               {activeTab === 'break' && (
                <>
                  <ResultCard title="1. Signal" desc={result.invisible} color="red" />
                  <ResultCard title="2. Desire" desc={result.unattractive} color="red" />
                  <ResultCard title="3. Friction" desc={result.difficult} color="red" />
                  <ResultCard title="4. Reward" desc={result.unsatisfying} color="red" />
                </>
              )}
               {activeTab === 'identity' && result.habits && (
                  <div className="md:col-span-2 bg-slate-800/30 border border-blue-500/20 p-8 rounded-2xl">
                      <h3 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
                          <Fingerprint className="text-blue-500"/> Evidence Required
                      </h3>
                      <div className="space-y-4">
                          {result.habits.map((h: string, i: number) => (
                              <div key={i} className="flex gap-4 p-4 bg-slate-900 border border-white/5 rounded-xl text-slate-300">
                                  <span className="font-bold text-blue-500">0{i+1}</span> {h}
                              </div>
                          ))}
                      </div>
                  </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

  );
}

function ResultCard({ title, desc, color }: { title: string, desc: string | string[], color: 'teal' | 'red' }) {
  const styles = {
    teal: "border-l-teal-500 text-teal-400",
    red: "border-l-red-500 text-red-400",
  };
  return (
    <div className={`bg-slate-900 p-6 rounded-r-xl border-l-4 ${styles[color]} shadow-lg`}>
      <h3 className="font-bold text-lg mb-2 opacity-90">{title}</h3>
      <div className="text-slate-400 leading-relaxed text-sm">
        {Array.isArray(desc) ? (
            <ul className="list-disc pl-4 space-y-1">
                {desc.map((d, i) => <li key={i}>{d}</li>)}
            </ul>
        ) : (
            <p>{desc}</p>
        )}
      </div>
    </div>
  );
}
