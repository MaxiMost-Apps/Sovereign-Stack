import React from 'react';
import { useLens, LensType } from '@/context/LensContext';
import { Crosshair, Beaker, Crown, Heart } from 'lucide-react';
import { toast } from 'sonner';

export default function Preferences() {
  const { activeLens, setLens } = useLens();

  const handleLensChange = (lens: LensType) => {
    setLens(lens);
    toast.success(`System Lens Updated: ${lens.toUpperCase()}`);
  };

  const LENSES = [
    {
      id: 'operator',
      title: 'OPERATOR',
      subtitle: 'FORTITUDE',
      icon: Crosshair,
      desc: "Military precision. Short, punchy commands. Do the work.",
      borderColor: 'border-red-500',
      textColor: 'text-red-500',
      bgColor: 'bg-red-500/10'
    },
    {
      id: 'scientist',
      title: 'SCIENTIST',
      subtitle: 'ANALYTICAL',
      icon: Beaker,
      desc: "Biological mechanisms. Neurochemistry. Why it works.",
      borderColor: 'border-cyan-500',
      textColor: 'text-cyan-500',
      bgColor: 'bg-cyan-500/10'
    },
    {
      id: 'ceo',
      title: 'VISIONARY', // Mapping CEO to Visionary title for UI
      subtitle: 'STRATEGIC',
      icon: Crown,
      desc: "High-level strategy. ROI. Building the legacy.",
      borderColor: 'border-amber-500',
      textColor: 'text-amber-500',
      bgColor: 'bg-amber-500/10'
    },
    {
      id: 'human',
      title: 'HUMAN',
      subtitle: 'REASON',
      icon: Heart,
      desc: "Balance and sustainability. The rationale for a good life.",
      borderColor: 'border-emerald-500',
      textColor: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10'
    }
  ];

  return (
    <div className="min-h-screen bg-[#020408] text-white p-8 pb-32">
      <div className="max-w-5xl mx-auto space-y-12">
        <header className="border-b border-white/5 pb-8">
          <h1 className="text-3xl font-black italic tracking-tighter uppercase">System Preferences</h1>
          <p className="text-gray-500 font-mono text-[10px] uppercase tracking-widest mt-2">Identity Matrix Configuration</p>
        </header>

        <section>
          <div className="flex items-center gap-4 mb-8">
             <div className="h-px bg-white/10 flex-1" />
             <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Select Active Lens</span>
             <div className="h-px bg-white/10 flex-1" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {LENSES.map((lens) => {
              const isActive = activeLens === lens.id;
              const Icon = lens.icon;

              return (
                <button
                  key={lens.id}
                  onClick={() => handleLensChange(lens.id as LensType)}
                  className={`relative p-8 rounded-2xl border-2 transition-all duration-300 text-left group hover:scale-[1.02] ${
                    isActive
                      ? `${lens.borderColor} ${lens.bgColor} shadow-[0_0_30px_-5px_rgba(0,0,0,0.5)]`
                      : 'border-white/5 bg-[#0B1221] hover:border-white/10'
                  }`}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-4 rounded-xl ${isActive ? 'bg-black/20' : 'bg-white/5'} transition-colors`}>
                      <Icon size={32} className={isActive ? lens.textColor : 'text-gray-500'} />
                    </div>
                    {isActive && (
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${lens.borderColor} ${lens.textColor}`}>
                        Active
                      </span>
                    )}
                  </div>

                  <div>
                    <span className={`text-[10px] font-bold uppercase tracking-widest mb-1 block ${isActive ? lens.textColor : 'text-gray-600'}`}>
                      {lens.subtitle}
                    </span>
                    <h3 className="text-2xl font-black italic uppercase tracking-tight text-white mb-3">
                      {lens.title}
                    </h3>
                    <p className={`text-sm font-mono leading-relaxed ${isActive ? 'text-gray-300' : 'text-gray-500'}`}>
                      {lens.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
