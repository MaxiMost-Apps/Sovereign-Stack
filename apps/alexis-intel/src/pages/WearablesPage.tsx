import React from 'react';
import { Watch } from 'lucide-react';

export const WearablesPage: React.FC = () => {
  return (
    <div className="h-[70vh] flex flex-col items-center justify-center text-center">
      <div className="w-20 h-20 rounded-full bg-neon-teal/10 flex items-center justify-center border border-neon-teal/20 mb-6 animate-pulse-glow">
        <Watch className="w-10 h-10 text-neon-teal" />
      </div>
      <h2 className="text-3xl font-light text-white mb-3">Device <span className="font-bold text-neon-teal">Integration</span></h2>
      <p className="text-white/40 max-w-md">
        Connect and calibrate external biometric sensors. Supported: Oura, Whoop, Apple Watch, Garmin.
      </p>
      <div className="mt-8 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-white/50">
        MODULE UNDER CONSTRUCTION
      </div>
    </div>
  );
};
