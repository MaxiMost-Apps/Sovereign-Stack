import React, { useState } from 'react';

const GOGGINS_DB = {
  tired: "You're not tired; you're just bored of your own mediocrity. Tired is the mind telling you to quit. The body has another full gearbox. Shift up.",
  pain: "Good. Pain is the only thing that's real. It unlocks the secret doorway in your mind. If it doesn't suck, we don't do it.",
  time: "You have time to scroll, you have time to suffer. Prioritize the mission or admit you don't want it.",
  default: "That is a biological safety mechanism, not a valid reason. Your ancestors hunted mammoths in the snow; you are complaining about air conditioning."
};

export default function AccountabilityMirror() {
  const [excuse, setExcuse] = useState('');
  const [reflection, setReflection] = useState<string | null>(null);

  const shatterExcuse = () => {
    const lower = excuse.toLowerCase();
    let response = GOGGINS_DB.default;
    if (lower.includes('tired') || lower.includes('sleep')) response = GOGGINS_DB.tired;
    if (lower.includes('pain') || lower.includes('hurt')) response = GOGGINS_DB.pain;
    if (lower.includes('time') || lower.includes('busy')) response = GOGGINS_DB.time;
    setReflection(response);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 font-mono">
      <h1 className="text-4xl font-black uppercase tracking-tighter mb-8 text-red-600">The Mirror</h1>

      {!reflection ? (
        <div className="w-full max-w-xl space-y-6">
          <textarea
            className="w-full bg-zinc-900 border border-zinc-800 p-6 text-lg focus:border-red-600 outline-none min-h-[200px]"
            placeholder="State your excuse..."
            onChange={(e) => setExcuse(e.target.value)}
          />
          <button
            onClick={shatterExcuse}
            className="w-full py-4 bg-white text-black font-black uppercase tracking-widest hover:bg-zinc-200 transition-colors"
          >
            Shatter It
          </button>
        </div>
      ) : (
        <div className="max-w-xl text-center animate-in fade-in zoom-in duration-300">
          <div className="border-l-4 border-red-600 pl-6 py-2 mb-8 text-left">
            <p className="text-xl leading-relaxed text-zinc-300">"{reflection}"</p>
          </div>
          <a href="/" className="text-sm text-red-500 hover:text-red-400 uppercase tracking-widest underline underline-offset-4">
            Initialize Protocol (Enter App)
          </a>
          <button onClick={() => setReflection(null)} className="block mx-auto mt-8 text-xs text-zinc-600 hover:text-white">
            [ RESET MIRROR ]
          </button>
        </div>
      )}
    </div>
  );
}
