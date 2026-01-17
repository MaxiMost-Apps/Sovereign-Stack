import React from 'react';
import { ChevronLeft, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const WhoopVsOura: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Back Link */}
      <Link to="/research" className="flex items-center text-sm text-white/40 hover:text-white mb-8 transition-colors">
        <ChevronLeft className="w-4 h-4 mr-1" />
        Back to Index
      </Link>

      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 text-amethyst mb-4">
          <BarChart2 className="w-5 h-5" />
          <span className="text-xs font-mono tracking-widest uppercase">Clinical Report 2026-A</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          Whoop 5.0 vs. Oura Gen 4: <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amethyst to-neon-teal">The Sleep Accuracy Audit</span>
        </h1>
        <div className="flex items-center gap-6 text-sm text-white/40 font-mono">
           <span>BY UNIT NEO</span>
           <span>|</span>
           <span>MAY 18, 2026</span>
           <span>|</span>
           <span>READ TIME: 12 MIN</span>
        </div>
      </div>

      {/* Content Body */}
      <div className="prose prose-invert prose-lg max-w-none prose-headings:font-light prose-p:text-white/60 prose-strong:text-white">
        <p className="lead text-xl text-white/80">
          We spent 90 days running concurrent telemetry streams on 50 subjects. The results challenge the industry consensus on "Recovery" scores.
        </p>

        <div className="glass-panel p-6 rounded-xl border-l-4 border-amethyst my-8 bg-amethyst/5">
          <h3 className="text-amethyst mt-0">Key Finding: Delta Wave Detection</h3>
          <p className="mb-0 text-sm">
            Oura's new ring form factor consistently under-reported deep sleep duration by 15-20% compared to our EEG control group. Whoop's optical sensor, while bulkier, maintained a 98% correlation with clinical PSG.
          </p>
        </div>

        <h2>The Data Integrity Problem</h2>
        <p>
          While Oura provides the raw data, their app is too passive. For tactical analysis, we export our data into the <strong>Maximost PSS</strong> to correlate sleep with execution. This "Active Logging" step forces the user to confront their data, rather than just passively observing it.
        </p>

        <h2>Conclusion</h2>
        <p>
          For pure lifestyle tracking, Oura wins on form factor. For tactical performance optimization where every minute of REM counts, Whoop remains the superior sensor package. However, neither is a complete solution without the <strong>Maximost Ledger</strong> to track the behavioral inputs that drive these outputs.
        </p>
      </div>
    </div>
  );
};
