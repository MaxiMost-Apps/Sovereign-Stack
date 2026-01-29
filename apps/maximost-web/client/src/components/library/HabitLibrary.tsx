import React, { useState } from 'react';
import { Info, Plus, Check, Layers, Atom } from 'lucide-react';
import { useHabits } from '@/hooks/useHabits';
import { SOVEREIGN_LIBRARY, PROTOCOL_STACKS, ICON_MAP } from '@/data/sovereign_library';
import { HabitInfoDrawer } from '@/components/habits/HabitInfoDrawer';

interface HabitLibraryProps {
  onDeploy: (habit: any) => void;
}

export const HabitLibrary: React.FC<HabitLibraryProps> = ({ onDeploy }) => {
  const [activeTab, setActiveTab] = useState<'atoms' | 'stacks'>('atoms');
  const { habits: userHabits, toggleHabit } = useHabits(); // Destructure toggleHabit
  const [infoHabit, setInfoHabit] = useState<any>(null);

  const isAdopted = (id: string) => userHabits.some(h => h.habit_id === id && h.status === 'active');

  return (
    <div className="space-y-8 animate-in fade-in duration-700">

      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div>
          <h2 className="text-xl font-black tracking-[0.2em] uppercase text-white">Atom Ledger</h2>
          <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">The Armory. Equip habits and load stacks.</p>
        </div>
        <div className="flex bg-[#0B1221] p-1 rounded-lg border border-white/5">
          <button onClick={() => setActiveTab('atoms')} className={`px-4 py-2 rounded text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'atoms' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-white'}`}>Atoms</button>
          <button onClick={() => setActiveTab('stacks')} className={`px-4 py-2 rounded text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'stacks' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-white'}`}>Stacks</button>
        </div>
      </div>

      {/* ATOMS */}
      {activeTab === 'atoms' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {SOVEREIGN_LIBRARY.map(habit => {
            const Icon = ICON_MAP[habit.visuals.icon] || Info;
            const active = isAdopted(habit.id);
            // REVERSED LOGIC: Bold if NOT active, Faded if Active
            const opacityClass = active ? 'opacity-40 grayscale' : 'opacity-100 hover:border-blue-500/50';

            return (
              <div key={habit.id} className={`group relative flex items-center gap-4 p-3 rounded-xl border bg-[#0B1221] border-white/5 transition-all ${opacityClass}`}>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${habit.visuals.color} text-white shadow-lg`}>
                  <Icon size={18} strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs font-bold text-white truncate">{habit.title}</h3>
                  <p className="text-[10px] text-slate-500 line-clamp-1">{habit.description}</p>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => setInfoHabit(habit)} className="p-2 text-slate-600 hover:text-white"><Info size={16} /></button>
                  <button onClick={() => !active && onDeploy(habit)} className={`p-2 rounded-lg ${active ? 'text-slate-700 cursor-default' : 'text-blue-500 hover:bg-blue-500/10'}`}>
                    {active ? <Check size={16} /> : <Plus size={16} />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* STACKS */}
      {activeTab === 'stacks' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PROTOCOL_STACKS.map(stack => (
            <div key={stack.id} className="p-6 bg-[#0B1221] border border-white/5 rounded-2xl hover:border-blue-500/30 transition-all flex flex-col justify-between h-48 group">
               <div>
                 <h3 className="text-xs font-black text-white uppercase tracking-widest mb-2">{stack.title}</h3>
                 <p className="text-[10px] text-slate-500 leading-relaxed">{stack.description}</p>
                 <div className="flex gap-1 mt-4 flex-wrap">
                    {stack.habit_ids.slice(0, 4).map(id => <div key={id} className="w-1.5 h-1.5 rounded-full bg-slate-600" />)}
                 </div>
               </div>
               <button
                 onClick={() => stack.habit_ids.forEach(id => toggleHabit(id))}
                 className="w-full py-3 bg-blue-600/10 border border-blue-500/50 text-blue-400 text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-blue-600 hover:text-white transition-all opacity-0 group-hover:opacity-100"
               >
                 Deploy Stack
               </button>
            </div>
          ))}
        </div>
      )}

      {infoHabit && <HabitInfoDrawer habit={infoHabit} onClose={() => setInfoHabit(null)} />}
    </div>
  );
};
