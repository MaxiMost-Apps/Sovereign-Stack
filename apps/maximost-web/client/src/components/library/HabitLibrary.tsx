import React, { useState } from 'react';
import { Plus, Info, Check, Search } from 'lucide-react';
import * as Icons from 'lucide-react';
import { SOVEREIGN_LIBRARY } from '@/data/sovereign_library';
import { EditHabitModal } from '@/components/habits/EditHabitModal';
import { useHabits } from '@/hooks/useHabits';

// Mocking the import for safety if cross-package import fails in your setup
const LIBRARY = SOVEREIGN_LIBRARY || [];

export const HabitLibrary = () => {
  const { habits, toggleHabit } = useHabits(); // In this context, toggleHabit serves as "Save" for new habits if we implemented full sync
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHabit, setSelectedHabit] = useState<any | null>(null);

  const activeHabitIds = habits.map(h => h.habit_id || h.id);

  const filteredLibrary = LIBRARY.filter(h =>
    h.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClick = (habit: any) => {
    // Open modal with this habit's defaults
    setSelectedHabit(habit);
  };

  const handleSaveHabit = (habitData: any) => {
    // For now, we will use the toggleHabit logic which effectively adds it if it doesn't exist.
    // In a real V2 implementation, we would pass the custom config (habitData) to a createHabit function.
    // But per instructions "toggleHabit" logic in useHabits currently handles "Create New" if missing.
    // We will assume toggleHabit can accept an ID.
    // Ideally we update useHabits to accept config, but for V2.1 "Visual Restoration" we want the interaction flow.

    // We will trigger the toggle (add) and then close.
    // TODO: Pass custom config to toggleHabit/createHabit if useHabits supports it.
    toggleHabit(habitData.id);
    setSelectedHabit(null);
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black tracking-widest uppercase text-white">HABIT LIBRARY</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
            <input
              type="text"
              placeholder="SEARCH PROTOCOLS..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#0A0F1C] border border-white/10 rounded-full pl-9 pr-4 py-2 text-xs text-white focus:border-blue-500 outline-none w-48"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLibrary.map((habit) => {
            const isActive = activeHabitIds.includes(habit.id);
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
                    <div className="flex gap-1">
                      <button className="p-1.5 text-slate-500 hover:text-white transition-colors" title="Info">
                         <Info size={16} />
                      </button>
                      <button
                        onClick={() => handleAddClick(habit)}
                        className="p-1.5 bg-white text-black rounded hover:bg-blue-400 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
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

      <EditHabitModal
        habit={selectedHabit}
        isOpen={!!selectedHabit}
        onClose={() => setSelectedHabit(null)}
        onSave={handleSaveHabit}
      />
    </>
  );
};
