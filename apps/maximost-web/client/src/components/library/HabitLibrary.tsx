import React, { useState } from 'react';
import { Info, Plus, Check, Layers, Atom } from 'lucide-react';
import { useHabits } from '@/hooks/useHabits';
import { SOVEREIGN_LIBRARY, PROTOCOL_STACKS, ICON_MAP } from '@/data/sovereign_library';
import { HabitDetailModal } from '@/components/habits/HabitDetailModal';

export const HabitLibrary = () => {
  const [activeTab, setActiveTab] = useState<'atoms' | 'stacks'>('atoms');
  const { habits: userHabits, toggleHabit } = useHabits();
  const [selectedHabit, setSelectedHabit] = useState<any>(null);

  const isAdopted = (id: string) => userHabits.some(h => h.habit_id === id && h.status === 'active');

  return (
    <div className="space-y-6 animate-in fade-in duration-700">

      {/* TABS HEADER */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <h2 className="text-xl font-black tracking-[0.2em] uppercase text-white">
          Armory
        </h2>
        <div className="flex bg-slate-900/50 p-1 rounded-lg border border-white/5">
          <button
            onClick={() => setActiveTab('atoms')}
            className={`flex items-center gap-2 px-4 py-2 rounded text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'atoms' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
          >
            <Atom size={14} /> Atoms ({SOVEREIGN_LIBRARY.length})
          </button>
          <button
            onClick={() => setActiveTab('stacks')}
            className={`flex items-center gap-2 px-4 py-2 rounded text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'stacks' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
          >
            <Layers size={14} /> Stacks ({PROTOCOL_STACKS.length})
          </button>
        </div>
      </div>

      {/* ATOMS GRID */}
      {activeTab === 'atoms' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {SOVEREIGN_LIBRARY.map(habit => {
            const Icon = ICON_MAP[habit.visuals.icon] || Info;
            const active = isAdopted(habit.id);
            // Defaulting to "Slate" style colors for cleaner look if not active
            const colorClass = active ? habit.visuals.color : 'bg-slate-800';

            return (
              <div
                key={habit.id}
                className={`group relative flex items-center gap-4 p-3 rounded-xl border transition-all ${
                  active
                    ? 'bg-[#0B1221] border-blue-500/30'
                    : 'bg-[#0B1221] border-white/5 hover:border-white/10 opacity-60 hover:opacity-100'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClass} text-white shadow-inner`}>
                  <Icon size={18} strokeWidth={2} />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className={`text-xs font-bold truncate ${active ? 'text-white' : 'text-slate-400'}`}>
                    {habit.title}
                  </h3>
                  <p className="text-[10px] text-slate-600 line-clamp-1 mt-0.5">
                    {habit.description}
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <button onClick={() => setSelectedHabit(habit)} className="p-2 text-slate-600 hover:text-white transition-colors">
                    <Info size={16} />
                  </button>
                  <button onClick={() => toggleHabit(habit.id)} className={`p-2 rounded-lg transition-all ${active ? 'text-blue-400' : 'text-slate-600 hover:text-white'}`}>
                    {active ? <Check size={16} /> : <Plus size={16} />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* STACKS GRID */}
      {activeTab === 'stacks' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PROTOCOL_STACKS.map(stack => (
            <div key={stack.id} className="p-6 bg-slate-900/20 border border-white/5 rounded-2xl hover:border-blue-500/30 transition-all group">
               <div className="flex justify-between items-start mb-4">
                 <div>
                   <h3 className="text-sm font-black text-white uppercase tracking-widest">{stack.title}</h3>
                   <p className="text-xs text-slate-500 mt-1">{stack.description}</p>
                 </div>
                 <Layers className="text-slate-700 group-hover:text-blue-500 transition-colors" size={20} />
               </div>
               <div className="flex flex-wrap gap-2 mb-6">
                 {stack.habit_ids.slice(0, 4).map(hid => {
                    const h = SOVEREIGN_LIBRARY.find(lib => lib.id === hid);
                    return h ? (
                      <span key={hid} className="text-[9px] font-bold bg-white/5 px-2 py-1 rounded text-slate-400 border border-white/5">{h.title}</span>
                    ) : null;
                 })}
                 {stack.habit_ids.length > 4 && <span className="text-[9px] text-slate-600 px-2 py-1">+{stack.habit_ids.length - 4} more</span>}
               </div>
               <button
                 onClick={() => stack.habit_ids.forEach(id => toggleHabit(id))}
                 className="w-full py-3 bg-blue-600/10 border border-blue-500/50 text-blue-400 text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-blue-600 hover:text-white transition-all"
               >
                 Deploy Protocol
               </button>
            </div>
          ))}
        </div>
      )}

      {selectedHabit && <HabitDetailModal habit={selectedHabit} onClose={() => setSelectedHabit(null)} onSave={() => {}} />}
    </div>
  );
};
