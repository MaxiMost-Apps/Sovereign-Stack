import React, { useState, useEffect } from 'react';
import { ShieldAlert, Biohazard, Hourglass, Lock, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getApiUrl } from '../config';

// --- TYPES ---
type Category = 'lie' | 'poison' | 'drift';

interface MirrorState {
  attempts: number;
  isLocked: boolean;
  history: string[];
}

// --- COMPONENT ---
// Build Timestamp: 1769568172
export default function TriptychMirror() {
  const [state, setState] = useState<MirrorState>({
    attempts: 3,
    isLocked: false,
    history: []
  });

  const [loading, setLoading] = useState<Category | null>(null);
  const [roast, setRoast] = useState<{ category: Category; text: string } | null>(null);

  // Load state from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('mirror_state');
    if (saved) setState(JSON.parse(saved));
  }, []);

  // Save state on change
  useEffect(() => {
    localStorage.setItem('mirror_state', JSON.stringify(state));
  }, [state]);

  const handleStrike = async (category: Category, input: string) => {
    if (state.attempts <= 0) return;

    setLoading(category);

    try {
        const response = await fetch(getApiUrl('/api/mirror/roast'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ category, text: input })
        });
        const data = await response.json();

        // Short delay for "Glitch" effect perception
        setTimeout(() => {
            const newAttempts = state.attempts - 1;
            setState(prev => ({
                ...prev,
                attempts: newAttempts,
                isLocked: newAttempts === 0,
                history: [...prev.history, input]
            }));

            setRoast({
                category,
                text: data.roast || "Silence. The void stares back."
            });
            setLoading(null);
        }, 800);

    } catch (e) {
        console.error(e);
        setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 p-4 md:p-8 font-mono selection:bg-red-900 selection:text-white">

      {/* HEADER */}
      <header className="max-w-7xl mx-auto mb-12 text-center space-y-4 pt-8">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white glitch-text">
          THE MIRROR
        </h1>
        <div className="flex items-center justify-center gap-4 text-sm md:text-base">
          <span className="text-zinc-500 uppercase tracking-widest">Attempts Remaining:</span>
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className={`w-3 h-3 rounded-sm ${i < state.attempts ? 'bg-red-600 animate-pulse' : 'bg-zinc-800'}`} />
            ))}
          </div>
        </div>
      </header>

      {/* THE TRIPTYCH GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 relative">

        {/* ZONE A: THE LIE */}
        <MirrorCard
          category="lie"
          title="THE LIE"
          icon={ShieldAlert}
          prompt="Why didn't you do the work?"
          placeholder="I'm too tired... I'm too busy..."
          btnText="DESTROY EXCUSE"
          accent="border-zinc-700 hover:border-red-500/50"
          onSubmit={handleStrike}
          loading={loading === 'lie'}
          roast={roast?.category === 'lie' ? roast.text : null}
          locked={state.isLocked}
        />

        {/* ZONE B: THE POISON */}
        <MirrorCard
          category="poison"
          title="THE POISON"
          icon={Biohazard}
          prompt="How do you numb the pain?"
          placeholder="Scrolling... Gaming... Porn..."
          btnText="PURGE POISON"
          accent="border-zinc-700 hover:border-emerald-500/50"
          onSubmit={handleStrike}
          loading={loading === 'poison'}
          roast={roast?.category === 'poison' ? roast.text : null}
          locked={state.isLocked}
        />

        {/* ZONE C: THE DRIFT */}
        <MirrorCard
          category="drift"
          title="THE DRIFT"
          icon={Hourglass}
          prompt="Where do you lose time?"
          placeholder="Snoozing... Daydreaming..."
          btnText="CORRECT DRIFT"
          accent="border-zinc-700 hover:border-amber-500/50"
          onSubmit={handleStrike}
          loading={loading === 'drift'}
          roast={roast?.category === 'drift' ? roast.text : null}
          locked={state.isLocked}
        />

        {/* THE LOCKOUT OVERLAY (CTA) */}
        {state.isLocked && (
          <div className="absolute inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 animate-in fade-in duration-1000">
            <Lock className="w-16 h-16 text-red-600 mb-6" />
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-4">
              SOUL EXPOSED
            </h2>
            <p className="text-zinc-400 max-w-lg mb-8 text-lg">
              You have exhausted your excuses. The Mirror has seen enough.
              It is time to stop typing and start executing.
            </p>
            <a href="/login" className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest text-lg transition-all hover:scale-105 shadow-[0_0_30px_rgba(220,38,38,0.5)]">
              JOIN THE ORDER
            </a>
            <button className="mt-6 text-zinc-500 hover:text-white text-xs uppercase tracking-widest underline underline-offset-4">
              Share My Roast to Reddit
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

// --- SUB-COMPONENT: THE CARD ---
const MirrorCard = ({ category, title, icon: Icon, prompt, placeholder, btnText, accent, onSubmit, loading, roast, locked }: any) => {
  const [input, setInput] = useState('');

  return (
    <div className={`relative bg-zinc-950 border ${accent} p-6 md:p-8 flex flex-col h-[500px] transition-all duration-300 group`}>

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6 opacity-50 group-hover:opacity-100 transition-opacity">
        <Icon className="w-6 h-6" />
        <h3 className="font-black text-xl tracking-widest">{title}</h3>
      </div>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col">
        {roast ? (
          <div className="flex-1 flex items-center justify-center animate-in zoom-in duration-300">
            <p className="text-lg md:text-xl font-bold text-white leading-relaxed border-l-2 border-white/20 pl-4">
              "{roast}"
            </p>
          </div>
        ) : (
          <>
            <label className="text-xs font-bold text-zinc-500 uppercase mb-2 block">{prompt}</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={placeholder}
              disabled={loading || locked}
              className="w-full bg-transparent border-b border-zinc-800 text-white text-lg p-2 focus:outline-none focus:border-white transition-colors resize-none h-32 placeholder-zinc-800"
            />
          </>
        )}
      </div>

      {/* FOOTER ACTION */}
      {!roast && (
        <button
          onClick={() => onSubmit(category, input)}
          disabled={!input || loading || locked}
          className="mt-auto w-full py-4 border border-zinc-800 bg-zinc-900/50 hover:bg-white hover:text-black text-zinc-400 font-bold uppercase tracking-widest text-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? <Zap className="w-4 h-4 animate-spin" /> : btnText}
        </button>
      )}
    </div>
  );
};
