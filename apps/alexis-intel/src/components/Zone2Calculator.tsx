import React, { useState } from 'react';
import { Activity, Heart, Info } from 'lucide-react';

export function Zone2Calculator() {
  const [age, setAge] = useState<number | ''>('');
  const [rhr, setRhr] = useState<number | ''>('');
  const [result, setResult] = useState<{ lower: number; upper: number; max: number } | null>(null);

  const calculate = () => {
    if (!age) return;

    const maxHR = 220 - (Number(age)); // Simplified formula
    // For more precision, we could use Tanaka: 208 - (0.7 * age)

    let lower, upper;

    if (rhr) {
      // Karvonen Formula
      // Target HR = ((Max HR − Resting HR) × %Intensity) + Resting HR
      const hrReserve = maxHR - Number(rhr);
      lower = Math.round((hrReserve * 0.60) + Number(rhr));
      upper = Math.round((hrReserve * 0.70) + Number(rhr));
    } else {
      // Standard % of Max HR
      lower = Math.round(maxHR * 0.60);
      upper = Math.round(maxHR * 0.70);
    }

    setResult({ lower, upper, max: maxHR });
  };

  return (
    <div className="bg-secondary/50 border border-white/10 rounded-lg p-8 max-w-xl mx-auto shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary/20 p-3 rounded-full">
          <Activity className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-serif text-white">Zone 2 Calculator</h2>
          <p className="text-gray-400 text-sm">Optimize your mitochondrial function.</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="w-full bg-background border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
            placeholder="Enter your age"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Resting Heart Rate (Optional)
            <span className="ml-2 text-xs text-gray-500">(For Karvonen Method precision)</span>
          </label>
          <div className="relative">
            <Heart className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
            <input
              type="number"
              value={rhr}
              onChange={(e) => setRhr(Number(e.target.value))}
              className="w-full bg-background border border-white/10 rounded-md pl-10 pr-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
              placeholder="e.g. 60"
            />
          </div>
        </div>

        <button
          onClick={calculate}
          className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-md transition-all transform hover:scale-[1.02]"
        >
          Calculate Zones
        </button>

        {result && (
          <div className="mt-8 p-6 bg-background/80 rounded-lg border border-primary/30 animate-in fade-in slide-in-from-bottom-4">
            <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-primary" />
              Your Zone 2 Target
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-secondary/30 rounded-md">
                <span className="block text-sm text-gray-400 uppercase tracking-wider">Lower Limit</span>
                <span className="block text-3xl font-bold text-white mt-1">{result.lower} <span className="text-sm font-normal text-gray-500">BPM</span></span>
              </div>
              <div className="text-center p-4 bg-secondary/30 rounded-md">
                <span className="block text-sm text-gray-400 uppercase tracking-wider">Upper Limit</span>
                <span className="block text-3xl font-bold text-white mt-1">{result.upper} <span className="text-sm font-normal text-gray-500">BPM</span></span>
              </div>
            </div>
            <p className="mt-4 text-xs text-center text-gray-500">
              Based on Max HR of {result.max} BPM.
              {rhr ? " Using Karvonen formula." : " Using standard percentage."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
