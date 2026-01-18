import React, { useState } from 'react';
import { Activity, ArrowRight } from 'lucide-react';

export const ZoneTwoCalculator: React.FC = () => {
  const [age, setAge] = useState<string>('');
  const [, setMaxHR] = useState<number | null>(null);
  const [zone2, setZone2] = useState<{ min: number; max: number } | null>(null);

  const calculate = () => {
    const ageNum = parseInt(age);
    if (isNaN(ageNum)) return;

    // Simple Haskell & Fox formula for Max HR (220 - age)
    // In a real app, we might use Tanaka (208 - 0.7 * age) for better accuracy
    const calculatedMax = 220 - ageNum;
    setMaxHR(calculatedMax);

    // Zone 2 is typically 60-70% of Max HR
    setZone2({
      min: Math.round(calculatedMax * 0.6),
      max: Math.round(calculatedMax * 0.7)
    });
  };

  return (
    <div className="max-w-xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-light text-white mb-2">Zone 2 <span className="font-bold text-amethyst">Calculator</span></h2>
        <p className="text-white/40">
          Determine your optimal aerobic base building heart rate zone.
        </p>
      </div>

      <div className="glass-panel p-8 rounded-2xl space-y-6">
        <div>
          <label className="block text-xs font-mono text-white/50 mb-2 uppercase tracking-wider">Your Age</label>
          <div className="flex gap-4">
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="30"
              className="flex-1 bg-black/40 border border-white/10 rounded-lg py-3 px-4 text-white placeholder:text-white/20 focus:outline-none focus:border-amethyst/50 focus:ring-1 focus:ring-amethyst/20 font-mono"
            />
            <button
              onClick={calculate}
              className="px-6 py-3 bg-amethyst hover:bg-amethyst/90 text-white font-bold rounded-lg transition-colors flex items-center gap-2"
            >
              CALCULATE <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {zone2 && (
          <div className="mt-8 pt-8 border-t border-white/10 animate-enter">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 text-center">
                <div className="text-xs text-white/40 mb-1">Lower Limit (60%)</div>
                <div className="text-2xl font-mono font-bold text-neon-teal">{zone2.min} <span className="text-sm font-normal text-white/30">bpm</span></div>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 text-center">
                <div className="text-xs text-white/40 mb-1">Upper Limit (70%)</div>
                <div className="text-2xl font-mono font-bold text-neon-teal">{zone2.max} <span className="text-sm font-normal text-white/30">bpm</span></div>
              </div>
            </div>

            <div className="mt-6 flex items-start gap-3 p-4 bg-amethyst/10 rounded-lg border border-amethyst/20">
              <Activity className="w-5 h-5 text-amethyst mt-0.5" />
              <div className="text-sm text-white/80">
                <span className="font-bold text-amethyst">Tactical Advice:</span> Maintain this heart rate for 45-90 minutes, 3-4 times per week to build mitochondrial efficiency.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
