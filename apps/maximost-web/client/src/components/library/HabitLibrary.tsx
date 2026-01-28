import React, { useState } from 'react';
import { Plus, Check, Info } from 'lucide-react';
import { useLibrary } from '@/hooks/useLibrary';
import { useHabits } from '@/hooks/useHabits';
import { ICON_MAP } from '@/data/sovereign_library';
import { HabitEditModal as HabitDetailModal } from '@/components/habits/HabitEditModal';

export const HabitLibrary = () => {
  const { library } = useLibrary();
  const { habits: userHabits, toggleHabit } = useHabits();
  const [selectedHabit, setSelectedHabit] = useState<any>(null);

  const isAdopted = (id: string) => userHabits.some(h => h.habit_id === id && h.status === 'active');

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-black tracking-widest uppercase text-white mb-6">Archive Access</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {library.map(habit => {
          const Icon = ICON_MAP[habit.visuals.icon] || Info;
          const active = isAdopted(habit.id);

          return (
            <div key={habit.id} className="group relative flex items-center gap-4 p-4 bg-[#0B1221] border border-white/5 rounded-2xl hover:border-white/20 transition-all">

              {/* ICON */}
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${habit.visuals.color} text-white shadow-lg`}>
                <Icon size={20} strokeWidth={2.5} />
              </div>

              {/* TEXT */}
              <div className="flex-1">
                <h3 className="text-sm font-bold text-white tracking-wide">{habit.title}</h3>
                <p className="text-[10px] text-slate-500 line-clamp-1">{habit.description}</p>
              </div>

              {/* ACTIONS */}
              <div className="flex items-center gap-2">
                 <button
                  onClick={() => setSelectedHabit(habit)}
                  className="p-2 text-slate-600 hover:text-blue-400 hover:bg-white/5 rounded-full transition-colors"
                >
                  <Info size={18} />
                </button>

                <button
                  onClick={() => toggleHabit(habit.id)}
                  className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                    active
                      ? 'bg-slate-800 text-slate-400 border border-white/5'
                      : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20'
                  }`}
                >
                  {active ? 'Active' : 'Deploy'}
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {selectedHabit && (
        <HabitDetailModal
          habit={selectedHabit}
          onClose={() => setSelectedHabit(null)}
          onSave={() => setSelectedHabit(null)}
        />
      )}
    </div>
  );
};
