import React, { useState } from 'react';
import { Shield, Brain, Smartphone } from 'lucide-react';

export function DopamineDetoxCalculator() {
  const [screenTime, setScreenTime] = useState<number | ''>('');
  const [socialMedia, setSocialMedia] = useState<number | ''>('');
  const [deepWork, setDeepWork] = useState<number | ''>('');
  const [result, setResult] = useState<{ level: number; title: string; description: string } | null>(null);

  const calculate = () => {
    const st = Number(screenTime) || 0;
    const sm = Number(socialMedia) || 0;
    const dw = Number(deepWork) || 0;

    let level = 1;
    let title = "Maintenance";
    let description = "Your baseline is healthy. Maintain current protocols.";

    if (st > 6 || sm > 3) {
      level = 5;
      title = "Nuclear Option";
      description = "Critical failure imminent. Immediate digital severance required. 72-hour fast.";
    } else if (st > 4 || sm > 2) {
      level = 4;
      title = "Hard Reset";
      description = "Dopamine receptors downregulated. Implement grayscale mode and app blockers.";
    } else if (dw < 1) {
      level = 3;
      title = "Re-calibration";
      description = "Focus integrity compromised. Prioritize deep work blocks before noon.";
    } else if (st > 2) {
      level = 2;
      title = "Sentinel";
      description = "Minor deviations detected. Tighten notification settings.";
    }

    setResult({ level, title, description });
  };

  return (
    <div className="bg-secondary/50 border border-primary/20 rounded-lg p-8 max-w-xl mx-auto shadow-2xl shadow-primary/5">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary/20 p-3 rounded-full">
          <Brain className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-serif text-white">Dopamine Detox Calculator</h2>
          <p className="text-gray-400 text-sm">Assess your neurochemical dependency.</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Daily Screen Time (Hours)</label>
          <div className="relative">
            <Smartphone className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
            <input
              type="number"
              value={screenTime}
              onChange={(e) => setScreenTime(Number(e.target.value))}
              className="w-full bg-background border border-primary/20 rounded-md pl-10 pr-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
              placeholder="e.g. 6"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Social Media Usage (Hours)</label>
          <input
            type="number"
            value={socialMedia}
            onChange={(e) => setSocialMedia(Number(e.target.value))}
            className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
            placeholder="e.g. 2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Deep Work Capacity (Hours)</label>
          <input
            type="number"
            value={deepWork}
            onChange={(e) => setDeepWork(Number(e.target.value))}
            className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
            placeholder="e.g. 4"
          />
        </div>

        <button
          onClick={calculate}
          className="w-full bg-primary hover:bg-primary/90 text-black font-bold py-3 rounded-md transition-all transform hover:scale-[1.02]"
        >
          Analyze Protocol
        </button>

        {result && (
          <div className={`mt-8 p-6 rounded-lg border animate-in fade-in slide-in-from-bottom-4 ${
            result.level >= 4 ? 'bg-red-900/20 border-red-500/30' : 'bg-primary/10 border-primary/30'
          }`}>
            <h3 className={`text-lg font-bold mb-2 flex items-center gap-2 ${
               result.level >= 4 ? 'text-red-400' : 'text-primary'
            }`}>
              <Shield className="w-5 h-5" />
              Level {result.level}: {result.title}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {result.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
