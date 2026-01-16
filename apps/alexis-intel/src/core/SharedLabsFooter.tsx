import React from 'react';
import { Shield, Brain, Activity, Heart } from 'lucide-react';

export const SharedLabsFooter: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-white/10 bg-surface/50 backdrop-blur-md py-6">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          {/* LABS SWITCHER */}
          <div className="flex items-center gap-6 text-sm font-medium tracking-wide">
            <a href="#" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors">
              <Shield className="w-4 h-4" />
              <span>COMMAND</span>
            </a>

            <a href="#" className="flex items-center gap-2 text-amethyst drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]">
              <Brain className="w-4 h-4" />
              <span>INTEL</span>
            </a>

            <a href="#" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors">
              <Activity className="w-4 h-4" />
              <span>DEFENSE</span>
            </a>

            <a href="#" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors">
              <Heart className="w-4 h-4" />
              <span>SOUL</span>
            </a>
          </div>

          {/* LEGAL */}
          <div className="text-right text-xs text-white/30 space-y-1">
            <p>MAXIMOST LLC</p>
            <p>PO Box 123, Painesville, OH 44077</p>
          </div>

        </div>
      </div>
    </footer>
  );
};
