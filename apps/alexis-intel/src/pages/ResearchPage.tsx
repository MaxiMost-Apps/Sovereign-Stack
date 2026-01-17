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

      <div className="mt-12 grid gap-6 w-full max-w-2xl text-left">
        <a href="/research/whoop-vs-oura" className="group block glass-panel p-6 rounded-xl hover:bg-white/5 transition-all">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-mono text-amethyst tracking-widest">REPORT 2026-A</span>
            <span className="text-xs text-white/30 group-hover:text-white transition-colors">Read Now →</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-teal transition-colors">Whoop vs. Oura: The 2026 Sleep Accuracy Report</h3>
          <p className="text-sm text-white/50">
            A 90-day concurrent telemetry stream analysis of the two leading biometric sensors.
          </p>
        </a>
      </div>
    </div>
  );
};
