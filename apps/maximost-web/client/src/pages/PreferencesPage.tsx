import React from 'react';
import { Settings, Sliders, Shield } from 'lucide-react';

export default function PreferencesPage() {
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
       <div>
         <h1 className="text-2xl font-black tracking-widest uppercase text-white mb-2">System Config</h1>
         <p className="text-slate-500 font-mono text-xs uppercase tracking-wider">Global settings & Lenses.</p>
       </div>

       <div className="p-12 border border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center text-slate-600 space-y-4">
          <Settings size={48} className="opacity-20" />
          <p className="text-sm font-mono uppercase">Preferences Module Offline</p>
       </div>
    </div>
  );
}
