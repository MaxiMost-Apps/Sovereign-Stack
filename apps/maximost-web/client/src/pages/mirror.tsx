import React, { useState, useEffect } from 'react';
import { Ghost, Copy, Hammer, Brain, Flame, Shield, Activity, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

// --- ASSETS & DATA ---
const CRACK_OVERLAY = `data:image/svg+xml,%3Csvg width='100%25' height='100%25' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50L20 20M50 50L80 20M50 50L20 80M50 50L80 80M50 50L50 10M50 50L50 90' stroke='white' stroke-width='0.5' stroke-opacity='0.3'/%3E%3Cpath d='M45 45L30 10M55 45L70 10M45 55L30 90M55 55L70 90' stroke='white' stroke-width='0.2' stroke-opacity='0.2'/%3E%3C/svg%3E`;

// --- THE GOGGINS ENGINE ---
const getRoast = (input: string) => {
  const lower = input.toLowerCase();
  if (lower.includes('tired') || lower.includes('sleep') || lower.includes('exhausted')) {
    return "You're tired? Good. That means the weak part of your brain is finally shutting up. Your limbic system is begging for a warm blanket and a participation trophy. You are operating at 40% capacity. The other 60% is locked behind a wall of pain you're too soft to climb. Lace up your shoes. We are taking souls today.";
  }
  if (lower.includes('scroll') || lower.includes('phone') || lower.includes('game') || lower.includes('porn')) {
    return "Doom scrolling? You are trading your finite human life for pixels. You are a dopamine addict hooked to a glowing rectangle while your legacy rots. The algorithm owns your mind. Put the phone in a drawer, drop and give me 50, and reclaim your sovereignty. Stay hard.";
  }
  if (lower.includes('time') || lower.includes('busy') || lower.includes('work')) {
    return "Busy is a myth. Busy is what civilians say when they can't manage their own minds. You have the same 24 hours as the people building empires. You're not out of time, you're out of discipline. Audit your day, cut the fat, and execute.";
  }
  return "That is a biological safety mechanism, not a valid reason. Your ancestors hunted mammoths in the snow; you are complaining about air conditioning. Discomfort is the price of admission to a meaningful life. Do it anyway.";
};

// --- MAIN COMPONENT ---
export default function AccountabilityMirror() {
  const [excuse, setExcuse] = useState('');
  const [roast, setRoast] = useState('');
  const [loading, setLoading] = useState(false);
  const [isCracked, setIsCracked] = useState(false);

  // 3-STRIKE STATE
  const [attempts, setAttempts] = useState(3);
  const [isLocked, setIsLocked] = useState(false);

  // Load state
  useEffect(() => {
    const savedAttempts = localStorage.getItem('mirror_attempts');
    if (savedAttempts) {
      const count = parseInt(savedAttempts);
      setAttempts(count);
      if (count <= 0) setIsLocked(true);
    }
  }, []);

  const handleRoast = async () => {
    if (!excuse.trim() || attempts <= 0) return;
    setLoading(true);
    setRoast('');
    setIsCracked(false);

    // SIMULATE API & CRACK
    setTimeout(() => {
      setIsCracked(true);
      setRoast(getRoast(excuse));
      setLoading(false);

      const newAttempts = attempts - 1;
      setAttempts(newAttempts);
      localStorage.setItem('mirror_attempts', newAttempts.toString());

      // TRIGGER LOCKOUT AFTER DELAY
      if (newAttempts === 0) {
        setTimeout(() => setIsLocked(true), 5000); // 5 seconds to read the final roast
      }
    }, 1500);
  };

  const resetMirror = () => {
    setExcuse('');
    setRoast('');
    setIsCracked(false);
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 p-4 md:p-8 flex flex-col items-center font-sans selection:bg-red-900 selection:text-white relative">

      {/* THE LOCKOUT OVERLAY */}
      {isLocked && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in duration-1000">
          <div className="max-w-lg w-full bg-zinc-950 border-2 border-red-600 p-8 text-center shadow-[0_0_50px_rgba(220,38,38,0.3)] relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(255,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none" />
            <Lock className="w-16 h-16 text-red-600 mx-auto mb-6 animate-pulse" />
            <h2 className="text-4xl font-black uppercase tracking-tighter text-white mb-4">SOUL EXPOSED</h2>
            <p className="text-red-200 font-mono text-sm mb-8 leading-relaxed">
              SYSTEM LOCKDOWN INITIATED.<br/>
              You have exhausted your excuses. The Mirror has seen enough.
            </p>
            <button className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest text-lg transition-all hover:scale-105 shadow-lg">
              JOIN THE ORDER
            </button>
          </div>
        </div>
      )}

      <div className="max-w-6xl w-full space-y-12">
        {/* HEADER */}
        <div className="text-center space-y-4 pt-8">
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter flex items-center justify-center gap-4">
                <Ghost className="w-10 h-10 text-zinc-500" />
                <span>The Accountability <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-zinc-400 to-zinc-100">Mirror</span></span>
            </h1>
            <div className="flex items-center justify-center gap-2 text-sm font-mono text-zinc-500">
              <span>ATTEMPTS REMAINING:</span>
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className={`w-3 h-3 rounded-sm ${i < attempts ? 'bg-red-600' : 'bg-zinc-800'}`} />
                ))}
              </div>
            </div>
        </div>

        {/* MAIN TACTICAL GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* LEFT FLANK: PROTOCOL CARDS */}
            <div className="lg:col-span-3 space-y-4">
                <ProtocolCard icon={Flame} accent="orange" title="Iron Mind Protocol" source="David Goggins" quote="The 40% Rule Applies. You are not done when you are tired; you are done when you are finished." />
                <ProtocolCard icon={Shield} accent="blue" title="Stoic Regulator" source="Marcus Aurelius" quote="You have power over your mind - not outside events. Realize this, and you will find strength." />
            </div>

            {/* CENTER: THE MIRROR (INTERACTIVE) */}
            <div className="lg:col-span-6">
                <div className={cn(
                    "relative bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border-2 border-zinc-800 p-1 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-500",
                    isCracked && "border-zinc-700 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                )}>
                    {isCracked && (
                        <div className="absolute inset-0 z-10 opacity-40 mix-blend-overlay pointer-events-none animate-in" style={{ backgroundImage: `url("${CRACK_OVERLAY}")`, backgroundSize: 'cover' }} />
                    )}

                    <div className="relative z-20 p-6 md:p-10 bg-black/80 backdrop-blur-md rounded-xl min-h-[400px] flex flex-col justify-center">
                        {!roast ? (
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
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-6 animate-in">
                                <div className="relative">
                                    <h3 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <Brain className="w-4 h-4" /> The Raw Truth
                                    </h3>
                                    <p className="font-mono text-lg leading-relaxed text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-400 border-l-2 border-white/20 pl-6 py-2">
                                        "{roast}"
                                    </p>
                                </div>
                                <div className="flex gap-4 pt-6 border-t border-zinc-800/50">
                                     <button onClick={resetMirror} className="flex-1 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-all">Face Another</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* RIGHT FLANK: BIOMETRIC REGULATORS */}
            <div className="lg:col-span-3 space-y-4">
                <BiometricGauge icon={Brain} accent="purple" title="Limbic Regulator" status={loading ? "SURGING" : isCracked ? "OVERRIDDEN" : "STABLE"} value={loading ? 85 : isCracked ? 10 : 40} />
                <BiometricGauge icon={Activity} accent="red" title="Governor Status" status={loading ? "DISENGAGING..." : isCracked ? "OFFLINE" : "ACTIVE"} value={loading ? 30 : isCracked ? 0 : 75} reversed />
            </div>
        </div>
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---
const ProtocolCard = ({ icon: Icon, accent, title, source, quote }: any) => {
    const colors = accent === 'orange' ? "text-orange-500 bg-orange-500/10 border-orange-500/20" : "text-blue-500 bg-blue-500/10 border-blue-500/20";
    return (
        <div className={`p-4 border rounded-lg ${colors.split(' ')[2]} ${colors.split(' ')[1]} transition-all`}>
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
     const colors = accent === 'purple' ? "text-purple-500 from-purple-500 to-purple-900" : "text-red-500 from-red-500 to-red-900";
    const displayValue = reversed ? 100 - value : value;
    return (
        <div className="p-4 border border-zinc-800 bg-zinc-900/30 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${colors.split(' ')[0]}`} />
                    <h3 className="font-bold uppercase text-xs tracking-wider text-zinc-300">{title}</h3>
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${colors.split(' ')[0]} animate-pulse`}>{status}</span>
            </div>
            <div className="h-2 w-full bg-black rounded-full overflow-hidden border border-zinc-800">
                <div className={`h-full bg-gradient-to-r ${colors.split(' ')[1]} ${colors.split(' ')[2]} transition-all duration-1000`} style={{ width: `${displayValue}%` }} />
            </div>
        </div>
    );
};
