import React from 'react';
import { Plus, Check, Search } from 'lucide-react';
import * as Icons from 'lucide-react';
import { SOVEREIGN_LIBRARY } from '@/data/sovereign_library';

// Mocking the import for safety if cross-package import fails in your setup
const LIBRARY = SOVEREIGN_LIBRARY || [];

export const HabitLibrary = () => {
  // Mock user habits for visual logic
  const userHabitIds = ['BIO_01', 'PHYS_01'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-black tracking-widest uppercase text-white">The Armory</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
          <input
            type="text"
            placeholder="SEARCH PROTOCOLS..."
            className="bg-[#0A0F1C] border border-white/10 rounded-full pl-9 pr-4 py-2 text-xs text-white focus:border-blue-500 outline-none w-48"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {LIBRARY.map((habit) => {
          const isActive = userHabitIds.includes(habit.id);
          const IconComponent = (Icons as any)[habit.visuals.icon] || Icons.Activity;

          return (
            <div
              key={habit.id}
              className={`
                relative p-5 rounded-xl border transition-all
                ${isActive
                  ? 'bg-[#0A0F1C]/50 border-white/5 opacity-50'
                  : 'bg-[#0A0F1C] border-white/10 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-900/10'}
              `}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                  <IconComponent size={20} />
                </div>
                {isActive ? (
                  <div className="text-emerald-500"><Check size={18} /></div>
                ) : (
                  <button className="p-1.5 bg-white text-black rounded hover:bg-blue-400 transition-colors">
                    <Plus size={16} />
                  </button>
                )}
              </div>

              <h3 className="text-sm font-bold text-white mb-1">{habit.title}</h3>
              <p className="text-[10px] text-slate-500 leading-relaxed">{habit.description}</p>

              <div className="mt-4 flex items-center gap-2">
                <span className="text-[9px] font-mono uppercase bg-white/5 px-2 py-1 rounded text-slate-400">
                  {habit.category}
                </span>
                <span className="text-[9px] font-mono uppercase bg-white/5 px-2 py-1 rounded text-slate-400">
                  {habit.default_config.frequency_type}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
