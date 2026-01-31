import React, { useState } from 'react';
import { Shield, Flame, Brain, Zap, Bell, Activity, Moon, Ruler } from 'lucide-react';
import { motion } from 'framer-motion';

const LENS_OPTIONS = [
  {
    id: 'stoic',
    name: 'STOIC',
    description: 'Internal regulation. Logical detachment. Focus on what is controllable. Endure and prevail.',
    icon: Shield,
    color: 'text-slate-400'
  },
  {
    id: 'operator',
    name: 'OPERATOR',
    description: 'Military precision. Radical ownership. Short, punchy execution. No excuses.',
    icon: Flame,
    color: 'text-red-500'
  },
  {
    id: 'scientist',
    name: 'SCIENTIST',
    description: 'Biological mechanisms and neurochemistry. Optimization through data and physiological leverage.',
    icon: Brain,
    color: 'text-blue-400'
  },
  {
    id: 'visionary',
    name: 'VISIONARY',
    description: 'System-wide scaling. High-level ROI. Building the legacy and the long-term future.',
    icon: Zap,
    color: 'text-purple-400'
  }
];

export default function Preferences() {
  const [activeLens, setActiveLens] = useState('stoic');
  const [bioUplink, setBioUplink] = useState(true);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="min-h-screen bg-[#020408] text-white p-6 pb-24 font-sans max-w-xl mx-auto">
      <header className="mb-8">
        <h1 className="text-sm font-black tracking-[0.3em] uppercase text-slate-500 mb-2">System Config</h1>
        <h2 className="text-2xl font-bold">Preferences</h2>
      </header>

      <div className="space-y-10">

        {/* IDENTITY MATRIX */}
        <section className="space-y-4">
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500">Active Identity Lens</h2>
          <div className="grid gap-3">
            {LENS_OPTIONS.map((lens) => (
              <button
                key={lens.id}
                onClick={() => setActiveLens(lens.id)}
                className={`flex flex-col p-4 rounded-2xl border transition-all text-left group ${
                  activeLens === lens.id ? 'border-blue-500 bg-blue-500/10' : 'border-white/5 bg-[#0A0F1C] hover:border-white/10'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <lens.icon size={16} className={lens.color} />
                  <span className={`font-bold text-sm tracking-tight ${activeLens === lens.id ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>
                    {lens.name}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed pl-6">{lens.description}</p>
              </button>
            ))}
          </div>
        </section>

        {/* SYSTEM TOGGLES */}
        <section className="space-y-4 pt-6 border-t border-white/5">
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">System Core</h2>

            <div className="bg-[#0A0F1C] border border-white/5 rounded-2xl divide-y divide-white/5">

                {/* Bio-Uplink */}
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                        <Activity size={18} className="text-emerald-500" />
                        <div>
                            <h3 className="text-xs font-bold text-white">Bio-Uplink</h3>
                            <p className="text-[10px] text-slate-500">Sync Health Data (Apple/Google)</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setBioUplink(!bioUplink)}
                        className={`w-10 h-5 rounded-full transition-colors relative ${bioUplink ? 'bg-emerald-500' : 'bg-slate-700'}`}
                    >
                        <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${bioUplink ? 'left-6' : 'left-1'}`} />
                    </button>
                </div>

                {/* Notifications */}
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                        <Bell size={18} className="text-amber-500" />
                        <div>
                            <h3 className="text-xs font-bold text-white">Notifications</h3>
                            <p className="text-[10px] text-slate-500">Protocol reminders</p>
                        </div>
                    </div>
                    <button
                         onClick={() => setNotifications(!notifications)}
                        className={`w-10 h-5 rounded-full transition-colors relative ${notifications ? 'bg-blue-600' : 'bg-slate-700'}`}
                    >
                        <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${notifications ? 'left-6' : 'left-1'}`} />
                    </button>
                </div>

                 {/* Dark Mode (Static) */}
                 <div className="flex items-center justify-between p-4 opacity-50 cursor-not-allowed">
                    <div className="flex items-center gap-3">
                        <Moon size={18} className="text-slate-400" />
                        <div>
                            <h3 className="text-xs font-bold text-white">Theme</h3>
                            <p className="text-[10px] text-slate-500">Locked to Titan Mode (Dark)</p>
                        </div>
                    </div>
                </div>

            </div>
        </section>

         {/* UNITS */}
         <section className="space-y-4 pt-6 border-t border-white/5">
             <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Measurement</h2>
             <div className="bg-[#0A0F1C] border border-white/5 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Ruler size={18} className="text-blue-400" />
                    <div>
                        <h3 className="text-xs font-bold text-white">Units</h3>
                        <p className="text-[10px] text-slate-500">Metric vs Imperial</p>
                    </div>
                </div>
                <div className="flex bg-black/40 rounded-lg p-1">
                    <button className="px-3 py-1 text-[10px] font-bold bg-white/10 text-white rounded">METRIC</button>
                    <button className="px-3 py-1 text-[10px] font-bold text-slate-500">IMPERIAL</button>
                </div>
             </div>
         </section>

         <div className="pt-8 text-center">
            <p className="text-[9px] text-slate-600 font-mono">MAXIMOST TITAN OS V19.3</p>
         </div>

      </div>
    </div>
  );
}
