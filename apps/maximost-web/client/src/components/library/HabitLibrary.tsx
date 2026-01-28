import React, { useState } from 'react';
import { Info, Plus, Check } from 'lucide-react';
import { useHabits } from '@/hooks/useHabits';
import { useLibrary } from '@/hooks/useLibrary'; // Uses our new static hook
import { ICON_MAP } from '@/data/sovereign_library';
import { HabitEditModal as HabitDetailModal } from '@/components/habits/HabitEditModal';

export const HabitLibrary = () => {
  const { library } = useLibrary(); // This now returns 60 items instantly
  const { habits: userHabits, toggleHabit } = useHabits();
  const [selectedHabit, setSelectedHabit] = useState<any>(null);

  // Helper to check if a habit is active in the user's DB
  const isAdopted = (id: string) => userHabits.some(h => h.habit_id === id && h.status === 'active');

  return (
    <div className="space-y-6 animate-in fade-in duration-700">

      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <h2 className="text-xl font-black tracking-[0.2em] uppercase text-white">
          Atom Archive <span className="text-blue-500 text-sm align-top">{library.length}</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {library.map(habit => {
          const Icon = ICON_MAP[habit.visuals.icon] || Info;
          const active = isAdopted(habit.id);
          const isFreq = habit.default_config.frequency_type === 'FREQUENCY';

          return (
            <div
              key={habit.id}
              className={`group relative flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                active
                  ? 'bg-slate-900/50 border-blue-500/30'
                  : 'bg-[#0B1221] border-white/5 hover:border-white/20'
              }`}
            >

              {/* ICON */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${habit.visuals.color} text-white shadow-lg`}>
                <Icon size={18} strokeWidth={2.5} />
              </div>

              {/* TEXT */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className={`text-xs font-bold truncate ${active ? 'text-blue-200' : 'text-white'}`}>
                    {habit.title}
                  </h3>
                  <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded ${isFreq ? 'bg-blue-900/30 text-blue-400' : 'bg-red-900/30 text-red-400'}`}>
                    {isFreq ? 'FREQ' : 'ABS'}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                  {habit.description}
                </p>
              </div>

              {/* ACTIONS */}
              <div className="flex items-center gap-2">
                 <button
                  onClick={() => setSelectedHabit(habit)}
                  className="text-slate-600 hover:text-white transition-colors"
                >
                  <Info size={16} />
                </button>

                <button
                  onClick={() => toggleHabit(habit.id)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                    active
                      ? 'bg-blue-600 text-white shadow-[0_0_10px_rgba(37,99,235,0.5)]'
                      : 'bg-slate-800 text-slate-500 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {active ? <Check size={14} strokeWidth={4} /> : <Plus size={16} />}
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
