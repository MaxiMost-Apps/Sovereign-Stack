import React, { useState, useEffect } from 'react';
import { Ghost, Copy, Hammer, Brain, Flame, Shield, Activity, Lock } from 'lucide-react';
import { useAuth } from '../AuthSystem';

// --- UTILITIES ---
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

// --- ASSETS & DATA ---

// Inline SVG for the crack effect so no external file is needed
const CRACK_OVERLAY = `data:image/svg+xml,%3Csvg width='100%25' height='100%25' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50L20 20M50 50L80 20M50 50L20 80M50 50L80 80M50 50L50 10M50 50L50 90' stroke='white' stroke-width='0.5' stroke-opacity='0.3'/%3E%3Cpath d='M45 45L30 10M55 45L70 10M45 55L30 90M55 55L70 90' stroke='white' stroke-width='0.2' stroke-opacity='0.2'/%3E%3C/svg%3E`;

const SCHEMA_PAYLOAD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "What is the AI Accountability Mirror?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "The Accountability Mirror is a tactical psychological tool. Unlike standard journaling, it acts as a digital drill sergeant, using Stoic logic and 'Iron Mind' protocols to aggressively challenge your excuses in real-time."
    }
  }, {
    "@type": "Question",
    "name": "How is this different from ChatGPT?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Standard AI is trained to be polite and agreeable. The Mirror is designed to be objective, ruthless, and tactically demanding. It prioritizes your potential over your feelings."
    }
  }]
};

const MOCK_ROASTS = [
    "Your fatigue is a lie told by your limbic system to save energy. You are not tired; you are unconditioned. Dopamine is earned. Lace up now.",
    "Fear is just unauthorized norepinephrine. You are protecting an ego that hasn't built anything yet. Seneca teaches us we suffer more in imagination than reality. Launch it.",
    "That excuse is comfortable. Comfort is the enemy of sovereignty. Do not negotiate with weakness. Execute the standard.",
    "You are negotiating with yourself because you know the right choice is the hard one. The easy path leads to a hard life. The hard path leads to a life of command.",
    "Nobody cares about your circumstances; they only care about your results. Stop auditing your pain and start auditing your actions.",
    "The version of you that achieves this goal is watching you right now, and they are embarrassed by this hesitation. Move."
];

// --- SUB-COMPONENTS ---

const ProtocolCard = ({ icon: Icon, accent, title, source, quote }: any) => {
    const accentColors: any = {
        orange: "text-orange-500 bg-orange-500/10 border-orange-500/20",
        blue: "text-blue-500 bg-blue-500/10 border-blue-500/20"
    };
    const colors = accentColors[accent] || accentColors.orange;

    return (
        <div className={`p-4 border rounded-lg ${colors.split(' ')[2]} ${colors.split(' ')[1]} transition-all hover:border-opacity-50 hover:scale-[1.02] duration-300`}>
            <div className="flex items-center gap-2 mb-2">
                <Icon className={`w-4 h-4 ${colors.split(' ')[0]}`} />
                <h3 className="font-bold uppercase text-xs tracking-wider text-white">{title}</h3>
            </div>
            <p className="text-sm font-mono text-zinc-300 italic mb-2">"{quote}"</p>
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 text-right">— {source}</p>
        </div>
    );
};

const BiometricGauge = ({ icon: Icon, accent, title, status, value, reversed = false }: any) => {
     const accentColors: any = {
        purple: "text-purple-500 from-purple-500 to-purple-900",
        red: "text-red-500 from-red-500 to-red-900"
    };
    const colors = accentColors[accent];
    const displayValue = reversed ? 100 - value : value;

    return (
        <div className="p-4 border border-zinc-800 bg-zinc-900/30 rounded-lg space-y-3 relative overflow-hidden group">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${colors.split(' ')[0]}`} />
                    <h3 className="font-bold uppercase text-xs tracking-wider text-zinc-300">{title}</h3>
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${colors.split(' ')[0]} animate-pulse`}>{status}</span>
            </div>

            <div className="h-2 w-full bg-black rounded-full overflow-hidden border border-zinc-800 relative">
                <div
                    className={`h-full bg-gradient-to-r ${colors.split(' ')[1]} ${colors.split(' ')[2]} transition-all duration-1000 relative`}
                    style={{ width: `${displayValue}%` }}
                >
                    <div className="absolute right-0 top-0 h-full w-1 bg-white animate-ping opacity-50" />
                </div>
            </div>
             <div className="flex justify-between text-[10px] text-zinc-600 font-mono">
                <span>0%</span><span>{displayValue}% Load</span><span>100%</span>
            </div>
        </div>
    );
};

// --- MAIN COMPONENT ---

export default function TheMirror() {
  const { user } = useAuth();
  const [excuse, setExcuse] = useState('');
  const [roast, setRoast] = useState('');
  const [loading, setLoading] = useState(false);
  const [roastCount, setRoastCount] = useState(0);
  const [sessionCount, setSessionCount] = useState(0); // Track guest session limit
  const [showSignupGate, setShowSignupGate] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isCracked, setIsCracked] = useState(false);

  useEffect(() => {
    const count = parseInt(localStorage.getItem('maximost_mirror_count') || '0');
    setRoastCount(count);

    // GUEST LOGIC: Check session limit
    const sess = parseInt(sessionStorage.getItem('mirror_session_count') || '0');
    setSessionCount(sess);

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(SCHEMA_PAYLOAD);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleRoast = async () => {
    if (!excuse.trim()) return;

    // 3-STRIKE RULE
    if (!user && sessionCount >= 3) {
        setShowSignupGate(true);
        return;
    }

    setLoading(true);
    setRoast('');
    setIsCracked(false);

    // SIMULATE API CALL & "CRACKING" EFFECT
    setTimeout(() => {
        setIsCracked(true);
        const randomRoast = MOCK_ROASTS[Math.floor(Math.random() * MOCK_ROASTS.length)];
        setRoast(randomRoast);
        setLoading(false);

        const newCount = roastCount + 1;
        setRoastCount(newCount);
        localStorage.setItem('maximost_mirror_count', newCount.toString());

        // Increment Session Count
        const newSess = sessionCount + 1;
        setSessionCount(newSess);
        sessionStorage.setItem('mirror_session_count', newSess.toString());
    }, 1500);
  };

  const handleCopy = () => {
    const viralText = `> ${roast}\n\n**Shattered by Maximost.com/Mirror**`;
    // Fallback for iframe environments if clipboard API is restricted, though standard method usually works in modern browsers
    try {
        navigator.clipboard.writeText(viralText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    } catch (e) {
        // Fallback or silent fail
    }
  };

  const resetMirror = () => {
      setExcuse('');
      setRoast('');
      setIsCracked(false);
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 p-4 md:p-8 flex flex-col items-center font-sans selection:bg-zinc-800 selection:text-white">
      {/* Custom Styles for animations not in standard Tailwind */}
      <style>{`
        @keyframes shine {
            0% { background-position: 200% center; }
            100% { background-position: -200% center; }
        }
        .animate-shine {
            animation: shine 8s linear infinite;
        }
        .animate-in {
            animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="max-w-6xl w-full space-y-12">

        {/* HEADER */}
        <div className="text-center space-y-4 pt-8">
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter flex items-center justify-center gap-4">
                <Ghost className="w-10 h-10 text-zinc-500" />
                <span>The Accountability <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-zinc-400 to-zinc-100">Mirror</span></span>
            </h1>
            <p className="text-zinc-500 text-lg max-w-xl mx-auto tracking-wide">
                Face the raw truth. Shatter the excuse.
            </p>
        </div>

        {/* MAIN TACTICAL GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* LEFT FLANK: PROTOCOL CARDS */}
            <div className="lg:col-span-3 space-y-4">
                <ProtocolCard
                    icon={Flame} accent="orange" title="Iron Mind Protocol" source="David Goggins"
                    quote="The 40% Rule Applies. You are not done when you are tired; you are done when you are finished."
                />
                <ProtocolCard
                    icon={Shield} accent="blue" title="Stoic Regulator" source="Marcus Aurelius"
                    quote="You have power over your mind - not outside events. Realize this, and you will find strength."
                />
            </div>

            {/* CENTER: THE MIRROR (INTERACTIVE) */}
            <div className="lg:col-span-6">
                {/* SIGNUP GATE */}
                {showSignupGate && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm rounded-2xl">
                        <div className="bg-zinc-900 border border-zinc-700 p-8 rounded-xl max-w-md text-center shadow-2xl animate-in">
                            <Lock className="w-12 h-12 mx-auto text-blue-500 mb-4" />
                            <h2 className="text-2xl font-black uppercase text-white mb-2">Protocol Locked</h2>
                            <p className="text-zinc-400 mb-6">
                                You have exhausted your guest clearance (3 Roasts). To continue shattering excuses, you must initialize your full operator profile.
                            </p>
                            <button onClick={() => window.location.href='/signup'} className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase tracking-widest rounded-lg transition-all">
                                Initialize Profile
                            </button>
                            <button onClick={() => setShowSignupGate(false)} className="mt-4 text-xs text-zinc-500 hover:text-white uppercase tracking-wider">
                                Return to Observation
                            </button>
                        </div>
                    </div>
                )}

                <div className={cn(
                    "relative bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border-2 border-zinc-800 p-1 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-500",
                    isCracked && "border-zinc-700 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                )}>
                    {/* Reflective Overlay & Crack Effect */}
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:250%_250%] animate-shine opacity-50 pointer-events-none" />

                    {/* The Visual Crack Layer */}
                    {isCracked && (
                        <div
                            className="absolute inset-0 z-10 opacity-40 mix-blend-overlay pointer-events-none animate-in"
                            style={{ backgroundImage: `url("${CRACK_OVERLAY}")`, backgroundSize: 'cover' }}
                        />
                    )}

                    <div className="relative z-20 p-6 md:p-10 bg-black/80 backdrop-blur-md rounded-xl min-h-[400px] flex flex-col justify-center">
                        {!roast ? (
                            /* INPUT STATE */
                            <div className="space-y-6 animate-in">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">State Your Obstacle</label>
                                    <textarea
                                        value={excuse}
                                        onChange={(e) => setExcuse(e.target.value)}
                                        placeholder="I didn't workout today because..."
                                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 text-xl text-white placeholder-zinc-700 focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/20 transition-all min-h-[150px] resize-none font-mono"
                                    />
                                </div>
                                <button
                                    onClick={handleRoast}
                                    disabled={loading || !excuse}
                                    className={cn(
                                        "w-full py-4 rounded-lg font-black uppercase tracking-widest text-sm transition-all relative overflow-hidden group bg-white text-black hover:bg-zinc-200 active:scale-[0.98]",
                                        loading && "opacity-50 cursor-wait"
                                    )}
                                >
                                    <span className="flex items-center justify-center gap-2 relative z-10">
                                        {loading ? <Activity className="w-5 h-5 animate-spin" /> : <Hammer className="w-5 h-5" />}
                                        {loading ? "Analyzing Weakness..." : "Shatter The Excuse"}
                                    </span>
                                    {/* Button Glint Effect */}
                                    <div className="absolute inset-0 h-full w-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left bg-gradient-to-r from-transparent via-zinc-400/30 to-transparent" />
                                </button>
                            </div>
                        ) : (
                            /* OUTPUT STATE (THE ETCHED TRUTH) */
                            <div className="space-y-6 animate-in">
                                <div className="relative">
                                    <h3 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <Brain className="w-4 h-4" /> The Raw Truth
                                    </h3>
                                    <p className="font-mono text-xl md:text-2xl leading-relaxed text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-400 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] border-l-2 border-white/20 pl-6 py-2">
                                        "{roast}"
                                    </p>
                                </div>

                                <div className="flex flex-col md:flex-row gap-4 pt-6 border-t border-zinc-800/50">
                                     <button
                                        onClick={resetMirror}
                                        className="flex-1 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white hover:border-white/50 transition-all"
                                    >
                                        Face Another
                                    </button>
                                    <button
                                        onClick={handleCopy}
                                        className="flex-1 py-3 bg-white text-black rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-all flex items-center justify-center gap-2"
                                    >
                                        {copied ? <span className="text-emerald-700 flex items-center gap-1">Copied <Activity className="w-3 h-3"/></span> : <span>Copy Result <Copy className="w-3 h-3"/></span>}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* RIGHT FLANK: BIOMETRIC REGULATORS */}
            <div className="lg:col-span-3 space-y-4">
                <BiometricGauge
                    icon={Brain} accent="purple" title="Limbic Regulator"
                    status={loading ? "SURGING" : isCracked ? "OVERRIDDEN" : "STABLE"}
                    value={loading ? 85 : isCracked ? 10 : 40}
                />
                 <BiometricGauge
                    icon={Activity} accent="red" title="Governor Status"
                    status={loading ? "DISENGAGING..." : isCracked ? "OFFLINE" : "ACTIVE"}
                    value={loading ? 30 : isCracked ? 0 : 75}
                    reversed
                />

                {/* Session Stats */}
                <div className="p-4 border border-zinc-800 bg-zinc-900/30 rounded-lg mt-4">
                    <div className="flex justify-between items-center text-xs text-zinc-500 uppercase tracking-widest mb-2">
                        <span>Total Shattered</span>
                        <Ghost className="w-3 h-3" />
                    </div>
                    <div className="text-3xl font-black text-white font-mono">
                        {roastCount.toString().padStart(3, '0')}
                    </div>
                </div>
            </div>

        </div>

        {/* --- FOOTER CONTENT (SEO & COMPARISON) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 border-t border-zinc-900 pt-12 pb-12">
             {/* Vs ChatGPT */}
            <div className="p-6 border border-zinc-800 rounded-lg bg-zinc-900/20 relative overflow-hidden group transition-all hover:bg-zinc-900/40">
                <div className="absolute top-0 left-0 w-1 h-full bg-white transition-all group-hover:w-full group-hover:opacity-5" />
                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" /> Vs. Standard AI
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                    Standard AI is trained to be a polite assistant that validates your feelings. The Mirror is trained as a wartime consigliere operating on the <strong>Iron Mind Protocol</strong>. It prioritizes your Duty over your comfort.
                </p>
            </div>

            {/* SEO Text */}
            <div className="prose prose-invert max-w-none text-zinc-500 text-sm flex flex-col justify-center">
                <h2 className="text-zinc-300 uppercase tracking-widest text-xs font-bold mb-2">About This Tool</h2>
                <p>
                    The Accountability Mirror is a tactical psychological tool inspired by Stoic Philosophy and modern behavioral science. It is designed to interrupt negative thought loops and reframe obstacles as necessary friction for growth.
                </p>
            </div>
        </div>

      </div>
    </div>
  );
}
