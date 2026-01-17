import React from 'react';
import { Microscope } from 'lucide-react';

export const ResearchPage: React.FC = () => {
  return (
    <div className="h-[70vh] flex flex-col items-center justify-center text-center">
      <div className="w-20 h-20 rounded-full bg-amethyst/10 flex items-center justify-center border border-amethyst/20 mb-6 animate-pulse-glow">
        <Microscope className="w-10 h-10 text-amethyst" />
      </div>
      <h2 className="text-3xl font-light text-white mb-3">Clinical <span className="font-bold text-amethyst">Research</span></h2>
      <p className="text-white/40 max-w-md">
        Deep dive studies into physiological optimization, telemetry standards, and longevity protocols.
      </p>
      <div className="mt-8 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-white/50">
        MODULE UNDER CONSTRUCTION
      </div>
    </div>
  );
};
