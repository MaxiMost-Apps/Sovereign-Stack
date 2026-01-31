import React, { useState } from 'react';
import { Plus, Check, Search } from 'lucide-react';
import { SOVEREIGN_LIBRARY, ICON_MAP } from '@/data/sovereign_library';
import { useHabits } from '@/hooks/useHabits';

interface HabitLibraryProps {
  onDeploy?: (habit: any) => void; // Optional if we handle it internally, but sticking to spec
}

export const HabitLibrary: React.FC<HabitLibraryProps> = ({ onDeploy }) => {
  const { habits, toggleHabit } = useHabits();
  const [searchTerm, setSearchTerm] = useState('');

  // Helper to check if habit is active
  const isHabitActive = (libraryId: string) => {
    const userHabit = habits.find(h => h.habit_id === libraryId);
    return userHabit && userHabit.status !== 'archived';
  };

  const filteredLibrary = SOVEREIGN_LIBRARY.filter(h =>
    h.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = (habit: any) => {
    if (onDeploy) {
      onDeploy(habit);
    } else {
      toggleHabit(habit.id);
    }
  };

  return (
    <div className="p-8 space-y-8 max-w-6xl mx-auto">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">Habit Library</h1>
          <p className="text-gray-500 font-mono text-xs uppercase tracking-widest mt-2">Inventory of high-fidelity protocols</p>
        </div>
        <div className="relative group w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors" size={16} />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-[#0A0F1C] border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-all w-full md:w-64"
            placeholder="Search Protocols..."
          />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLibrary.map((habit) => {
          const active = isHabitActive(habit.id);
          const IconComponent = ICON_MAP[habit.visuals.icon] || Plus;
          const colorClass = habit.visuals.color || 'bg-gray-500';

          return (
            <div
              key={habit.id}
              className={`relative group bg-[#0A0F1C] border border-white/5 rounded-2xl p-6 transition-all duration-500 ${
                active ? 'opacity-50' : 'hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]'
              }`}
            >
              <div className="flex items-start justify-between">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500 ${colorClass} bg-opacity-10 text-white`}
                >
                   <IconComponent size={24} />
                </div>

                {active ? (
                  <div className="bg-green-500/20 text-green-500 p-2 rounded-full border border-green-500/20">
                    <Check size={16} />
                  </div>
                ) : (
                  <button
                    onClick={() => handleAdd(habit)}
                    className="bg-white/5 hover:bg-blue-600 text-white p-2 rounded-full border border-white/10 transition-all"
                  >
                    <Plus size={16} />
                  </button>
                )}
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{habit.title}</h3>
                <p className="text-gray-500 text-xs mt-1 font-mono tracking-tight leading-relaxed">
                  {habit.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
