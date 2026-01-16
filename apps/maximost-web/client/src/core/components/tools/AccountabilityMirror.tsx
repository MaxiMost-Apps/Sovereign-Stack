import React, { useState } from 'react';
import { AlertTriangle, Flame } from 'lucide-react';

export const AccountabilityMirror = () => {
  const [excuse, setExcuse] = useState('');
  const [truth, setTruth] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFaceTheTruth = async () => {
      if (!excuse) return;
      setLoading(true);
      // MOCK MODE: Immediate feedback for UI testing
      setTimeout(() => {
          setTruth("You are tired because you stayed up late scrolling. It is not 'burnout', it is lack of discipline.");
          setLoading(false);
      }, 1500);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* THE EXCUSE */}
      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg">
        <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Your Excuse</label>
        <textarea
          value={excuse}
          onChange={(e) => setExcuse(e.target.value)}
          placeholder="Why didn't you execute today?"
          className="w-full bg-black border border-zinc-700 text-white min-h-[150px] p-4 rounded focus:border-red-500 outline-none"
        />
        <button
          onClick={handleFaceTheTruth}
          disabled={loading || !excuse}
          className="w-full mt-4 py-3 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-widest rounded transition-all"
        >
          {loading ? "Analyzing Weakness..." : "Face The Truth"}
        </button>
      </div>
      {/* THE TRUTH */}
      <div className={`bg-zinc-900 border border-zinc-800 p-6 rounded-lg flex flex-col justify-center items-center text-center transition-all duration-500 ${truth ? 'opacity-100' : 'opacity-50 grayscale'}`}>
        {!truth ? (
          <div className="text-zinc-600">
            <AlertTriangle className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p className="font-mono text-sm">AWAITING INPUT...</p>
          </div>
        ) : (
          <div className="animate-in fade-in zoom-in duration-300">
            <Flame className="w-12 h-12 mx-auto mb-4 text-orange-500" />
            <h3 className="text-lg font-bold text-white mb-2">THE REALITY</h3>
            <p className="text-xl font-mono text-red-400 leading-relaxed">"{truth}"</p>
          </div>
        )}
      </div>
    </div>
  );
};
