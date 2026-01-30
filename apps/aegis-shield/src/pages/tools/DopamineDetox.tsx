import React, { useState } from 'react';
import { AlertTriangle, Zap } from 'lucide-react';

export const DopamineDetox: React.FC = () => {
  const [screenTime, setScreenTime] = useState('');
  const [level, setLevel] = useState<'LOW' | 'MED' | 'HIGH' | null>(null);

  const calculate = () => {
    const hours = parseFloat(screenTime);
    if (hours < 3) setLevel('LOW');
    else if (hours < 6) setLevel('MED');
    else setLevel('HIGH');
  };

  return (
    <div className="max-w-2xl mx-auto border-cyber p-8 rounded bg-black/50">
      <div className="flex items-center gap-3 mb-6 text-accent">
        <AlertTriangle className="w-8 h-8" />
        <h2 className="text-2xl font-bold tracking-tighter">DOPAMINE DETOX CALCULATOR</h2>
      </div>

      <p className="mb-6 text-white/60">
        Input average daily screen time to calculate neuro-receptor overload status.
      </p>

      <div className="flex gap-4 mb-8">
        <input
          type="number"
          value={screenTime}
          onChange={(e) => setScreenTime(e.target.value)}
          placeholder="Daily Hours (e.g. 6.5)"
          className="bg-black border border-primary/50 p-3 text-primary w-full focus:outline-none focus:border-primary"
        />
        <button onClick={calculate} className="bg-primary/20 border border-primary text-primary px-6 hover:bg-primary/40 transition-colors font-bold">
          ANALYZE
        </button>
      </div>

      {level && (
        <div className="border border-white/10 p-6 bg-white/5">
          <div className="text-sm text-white/40 mb-2">THREAT LEVEL ASSESSED:</div>
          <div className={`text-4xl font-bold mb-4 ${
            level === 'HIGH' ? 'text-red-500' : level === 'MED' ? 'text-accent' : 'text-primary'
          }`}>
            {level} EXPOSURE
          </div>

          <div className="flex items-start gap-4 text-sm text-white/80">
            <Zap className="w-5 h-5 text-accent shrink-0" />
            <p>
              {level === 'HIGH' ?
                "CRITICAL: Immediate 24h digital fast required. Neural pathways are fried. Engage 'Monk Mode' protocol immediately." :
                level === 'MED' ?
                "WARNING: Taper required. Restrict social media usage to 30m windows. Use Aegis blocker." :
                "OPTIMAL: Baseline accepted. Maintain perimeter defense."
              }
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
