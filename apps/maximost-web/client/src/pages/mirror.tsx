import React, { useState, useEffect } from 'react';
import { ShieldAlert, Biohazard, Hourglass, Lock, Zap, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- ASSETS ---
const CRACK_OVERLAY = `data:image/svg+xml,%3Csvg width='100%25' height='100%25' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50L20 20M50 50L80 20M50 50L20 80M50 50L80 80M50 50L50 10M50 50L50 90' stroke='white' stroke-width='0.5' stroke-opacity='0.3'/%3E%3Cpath d='M45 45L30 10M55 45L70 10M45 55L30 90M55 55L70 90' stroke='white' stroke-width='0.2' stroke-opacity='0.2'/%3E%3C/svg%3E`;

// --- THE SAVAGE VAULT (Long Form) ---
const ROAST_DB = {
  lie: [
    "Tired is a ghost. It isn't real. You are bored because you have no mission. The enemy is training while you negotiate with your pillow. You are prioritizing comfort over your own life. Wake the f*ck up. Tired is just your brain trying to save calories for a famine that isn't coming.",
    "You have the exact same 24 hours as the Titans who built the world. You don't lack time; you lack priority. You are 'busy' being average. Stop letting the world steal your time and start stealing the morning. 0500 belongs to the Sovereign.",
    "Pain is information. It tells you that you are alive. If you treat every ache like a stop sign, you will park your life in the driveway of mediocrity. Duct tape it. Ice it. Move around it. But do not stop. Adapt or decay."
  ],
  poison: [
    "You are grinding for XP in a fake world while your real life character is Level 1. You are trading your legacy for pixels. You feel accomplished because the game gave you a badge, but outside that screen, you haven't built sh*t.",
    "You are donating your soul to an algorithm. Every swipe is a vote for mediocrity. You are consuming other men's lives instead of architecting your own. You are a spectator in the arena. Turn it off. Face the void.",
    "You are borrowing happiness from tomorrow with high interest. You are literally drinking poison to escape the reality you built. If you hate your life enough to numb it, change the life. Don't drown it."
  ],
  drift: [
    "The first decision you made today was a lie. You broke a contract with yourself before your feet hit the floor. You started the day with a defeat. If you can't beat a plastic clock, how do you expect to beat the world?",
    "You are waiting for the 'perfect time.' It doesn't exist. Chaos is the standard. You are sitting on the sidelines waiting for a clear path while the savages are hacking through the jungle. Move.",
    "Your environment is a reflection of your mind. You live in chaos because you think in chaos. Clean your damn room. You cannot order the world if you cannot order your own perimeter."
  ]
};

type Category = 'lie' | 'poison' | 'drift';

export default function TitanMirror() {
  const [attempts, setAttempts] = useState(3);
  const [isLocked, setIsLocked] = useState(false);
  const [loading, setLoading] = useState<Category | null>(null);
  const [activeRoast, setActiveRoast] = useState<{ category: Category; text: string } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('mirror_attempts');
    if (saved) {
      const count = parseInt(saved);
      setAttempts(count);
      if (count <= 0) setIsLocked(true);
    }
  }, []);

  const handleStrike = (category: Category, input: string) => {
    if (attempts <= 0 || !input.trim()) return;

    setLoading(category);

    setTimeout(() => {
      const newAttempts = attempts - 1;
      setAttempts(newAttempts);
      localStorage.setItem('mirror_attempts', newAttempts.toString());

      const roasts = ROAST_DB[category];
      const randomRoast = roasts[Math.floor(Math.random() * roasts.length)];

      setActiveRoast({ category, text: randomRoast });
      setLoading(null);

      if (newAttempts === 0) {
        // DELAY LOCKOUT TO 8 SECONDS (Long enough to read paragraph)
        setTimeout(() => setIsLocked(true), 8000);
      }
    }, 1500);
  };

  const resetMirror = () => {
    setActiveRoast(null);
  };

  return (
    <div className="min-h-screen bg-[#050a14] text-zinc-100 p-4 md:p-8 font-mono relative overflow-hidden selection:bg-red-900 selection:text-white">

      {/* BACKGROUND FX */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 pointer-events-none bg-[length:100%_2px,3px_100%]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80 z-0 pointer-events-none" />

      {/* HEADER */}
      <header className="relative z-10 max-w-7xl mx-auto mb-12 text-center space-y-4 pt-8">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white glitch-text">
          THE MIRROR
        </h1>
        <div className="flex items-center justify-center gap-4 text-sm font-bold tracking-widest">
          <span className="text-zinc-500">ATTEMPTS REMAINING:</span>
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 1 }}
                animate={{ scale: i < attempts ? 1 : 0.8, opacity: i < attempts ? 1 : 0.3 }}
                className={`w-3 h-3 rounded-sm ${i < attempts ? 'bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.8)]' : 'bg-zinc-800'}`}
              />
            ))}
          </div>
        </div>
      </header>

      {/* THE TRIPTYCH GRID */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

        <MirrorCard
          category="lie"
          title="THE LIE"
          icon={ShieldAlert}
          prompt="Why didn't you do the work?"
          placeholder="I'm too tired... I'm too busy..."
          accent="border-zinc-800 hover:border-red-500/30"
          glow="group-hover:shadow-[0_0_30px_rgba(239,68,68,0.1)]"
          onSubmit={handleStrike}
          loading={loading === 'lie'}
          roast={activeRoast?.category === 'lie' ? activeRoast.text : null}
          onReset={resetMirror}
        />

        <MirrorCard
          category="poison"
          title="THE POISON"
          icon={Biohazard}
          prompt="How do you numb the pain?"
          placeholder="Scrolling... Gaming... Porn..."
          accent="border-zinc-800 hover:border-emerald-500/30"
          glow="group-hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]"
          onSubmit={handleStrike}
          loading={loading === 'poison'}
          roast={activeRoast?.category === 'poison' ? activeRoast.text : null}
          onReset={resetMirror}
        />

        <MirrorCard
          category="drift"
          title="THE DRIFT"
          icon={Hourglass}
          prompt="Where do you lose time?"
          placeholder="Snoozing... Daydreaming..."
          accent="border-zinc-800 hover:border-amber-500/30"
          glow="group-hover:shadow-[0_0_30px_rgba(245,158,11,0.1)]"
          onSubmit={handleStrike}
          loading={loading === 'drift'}
          roast={activeRoast?.category === 'drift' ? activeRoast.text : null}
          onReset={resetMirror}
        />

      </div>

      {/* LOCKOUT OVERLAY (FIXED POSITION) */}
      <AnimatePresence>
        {isLocked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl"
          >
            <div className="max-w-lg w-full border-y-2 border-red-600 bg-zinc-950/50 p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-red-500/5 animate-pulse pointer-events-none" />

              {/* CRACK EFFECT ON LOCKOUT */}
              <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url("${CRACK_OVERLAY}")`, backgroundSize: 'cover' }} />

              <Lock className="w-20 h-20 text-red-600 mx-auto mb-8" />
              <h2 className="text-5xl font-black uppercase tracking-tighter text-white mb-6">SOUL EXPOSED</h2>
              <p className="text-red-400 font-mono text-sm mb-10 leading-relaxed">
                SYSTEM LOCKDOWN INITIATED.<br/>
                You have exhausted your excuses. The Mirror has seen enough.
              </p>
              <button className="w-full py-5 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-[0.2em] text-lg transition-all hover:scale-[1.02] shadow-[0_0_30px_rgba(220,38,38,0.4)]">
                ACCESS COMMAND
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- SUB-COMPONENT ---
const MirrorCard = ({ category, title, icon: Icon, prompt, placeholder, accent, glow, onSubmit, loading, roast, onReset }: any) => {
  const [input, setInput] = useState('');

  return (
    <div className={`relative bg-[#0B1221]/50 backdrop-blur-sm border ${accent} p-8 flex flex-col h-[600px] transition-all duration-500 group ${glow}`}>

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-8 opacity-60 group-hover:opacity-100 transition-opacity">
        <div className="p-3 bg-white/5 rounded-lg border border-white/10">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="font-black text-2xl tracking-widest text-white">{title}</h3>
      </div>

      {/* CONTENT AREA */}
      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          {roast ? (
            <motion.div
              key="roast"
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col justify-center"
            >
              <div className="border-l-4 border-white/20 pl-6 py-4 bg-white/5 rounded-r-lg">
                <p className="text-base md:text-lg font-bold text-white leading-relaxed font-mono">
                  "{roast}"
                </p>
              </div>
              <button onClick={onReset} className="mt-8 text-xs text-zinc-500 hover:text-white uppercase tracking-widest underline underline-offset-4 text-left pl-7">
                [ RESET TERMINAL ]
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="input"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col"
            >
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4 block">{prompt}</label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={placeholder}
                disabled={loading}
                className="w-full bg-transparent border-b border-zinc-800 text-white text-xl p-2 focus:outline-none focus:border-white/50 transition-colors resize-none h-40 placeholder-zinc-800 font-mono"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* FOOTER ACTION */}
      {!roast && (
        <button
          onClick={() => onSubmit(category, input)}
          disabled={!input || loading}
          className="mt-auto w-full py-4 border border-white/10 bg-white/5 hover:bg-white hover:text-black text-zinc-400 font-black uppercase tracking-widest text-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group-hover:border-white/20"
        >
          {loading ? (
            <>
              <Terminal className="w-4 h-4 animate-spin" />
              <span>ANALYZING...</span>
            </>
          ) : (
            <>
              <span>SHATTER EXCUSE</span>
              <Zap className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </>
          )}
        </button>
      )}
    </div>
  );
};
