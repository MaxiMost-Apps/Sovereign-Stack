import React, { useState } from 'react';
import { Info, Plus, Check } from 'lucide-react';
import { useHabits } from '@/hooks/useHabits';
import { SOVEREIGN_LIBRARY, PROTOCOL_STACKS, ICON_MAP } from '@/data/sovereign_library';
import { HabitInfoDrawer } from '@/components/habits/HabitInfoDrawer';

export const HabitLibrary = ({ onDeploy }: { onDeploy: (h: any) => void }) => {
  const [activeTab, setActiveTab] = useState<'habits' | 'stacks'>('habits');
  const { habits: userHabits, toggleHabit } = useHabits();
  const [infoHabit, setInfoHabit] = useState<any>(null);

  const isAdopted = (id: string) => userHabits.some(h => h.habit_id === id && h.status === 'active');

  return (
    <div className="space-y-8 animate-in fade-in duration-700">

      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div>
          <h2 className="text-xl font-black tracking-[0.2em] uppercase text-white">Habit Library</h2>
          <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mt-1">The Armory. Equip Habits.</p>
        </div>
        <div className="flex bg-[#0A0F1C] p-1 rounded-lg border border-white/5">
          <button onClick={() => setActiveTab('habits')} className={`px-4 py-2 rounded text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'habits' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-white'}`}>Habits</button>
          <button onClick={() => setActiveTab('stacks')} className={`px-4 py-2 rounded text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'stacks' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-white'}`}>Stacks</button>
        </div>
      </div>

      {/* HABITS GRID */}
      {activeTab === 'habits' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {SOVEREIGN_LIBRARY.map(habit => {
            const Icon = ICON_MAP[habit.visuals.icon] || Info;
            const active = isAdopted(habit.id);
            // BLUE THEME: Unselected = Blue border/text. Selected = Faded.
            const libColor = active ? habit.visuals.color : 'bg-blue-900/20 text-blue-400';
            const borderColor = active ? 'border-white/5 opacity-50' : 'border-blue-500/20 hover:border-blue-500/50';

            return (
              <div key={habit.id} className={`group relative flex items-start gap-4 p-4 rounded-xl border bg-[#0A0F1C] transition-all ${borderColor}`}>
                <div className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${libColor} shadow-lg mt-1`}>
                  <Icon size={18} strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs font-bold text-white truncate mb-1">{habit.title}</h3>
                  <p className="text-[10px] text-slate-500 leading-relaxed line-clamp-2 h-8">{habit.description}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <button onClick={() => setInfoHabit(habit)} className="text-slate-600 hover:text-white"><Info size={16} /></button>
                  <button onClick={() => !active && onDeploy(habit)} className={`rounded-lg ${active ? 'text-slate-700 cursor-default' : 'text-blue-500 hover:text-white'}`}>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PROTOCOL_STACKS.map(stack => (
            <div key={stack.id} className="p-6 bg-[#0A0F1C] border border-white/5 rounded-2xl hover:border-blue-500/30 transition-all flex flex-col justify-between min-h-[12rem] group">
               <div>
                 <h3 className="text-xs font-black text-white uppercase tracking-widest mb-2">{stack.title}</h3>
                 <p className="text-[10px] text-slate-500 leading-relaxed">{stack.description}</p>
                 <div className="flex gap-1.5 mt-4 flex-wrap">
                    {stack.habit_ids.slice(0, 5).map(id => {
                        const h = SOVEREIGN_LIBRARY.find(lib => lib.id === id);
                        return h ? <div key={id} className={`w-2 h-2 rounded-full ${h.visuals.color} opacity-80`} /> : null;
                    })}
                 </div>
               </div>
               <button onClick={() => stack.habit_ids.forEach(id => toggleHabit(id))} className="w-full py-3 bg-blue-600/10 border border-blue-500/50 text-blue-400 text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-blue-600 hover:text-white transition-all opacity-0 group-hover:opacity-100 mt-4">
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
