import React, { useState } from 'react';
import { Plus, Check, Search, Layers, Activity } from 'lucide-react';
import { SOVEREIGN_LIBRARY, ICON_MAP, PROTOCOL_STACKS } from '@/data/sovereign_library';
import { useHabits } from '@/hooks/useHabits';

interface HabitLibraryProps {
  onDeploy?: (habit: any) => void;
}

export const HabitLibrary: React.FC<HabitLibraryProps> = ({ onDeploy }) => {
  const { habits, toggleHabit } = useHabits();
  const [activeTab, setActiveTab] = useState<'ATOMS' | 'STACKS'>('ATOMS');
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

  const filteredStacks = PROTOCOL_STACKS.filter(s =>
     s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     s.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = (habitId: string) => {
      // Find the def
      const def = SOVEREIGN_LIBRARY.find(h => h.id === habitId);
      if (!def) return;

      toggleHabit(habitId);
  };

  const handleDeployStack = (stack: any) => {
      // Deploy all habits in stack
      stack.habit_ids.forEach((hid: string) => {
          if (!isHabitActive(hid)) {
              toggleHabit(hid);
          }
      });
  };

  return (
    <div className="p-8 space-y-8 max-w-6xl mx-auto pb-32">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">The Archive</h1>
          <p className="text-gray-500 font-mono text-xs uppercase tracking-widest mt-2">Protocol Database // V1.6</p>
        </div>

        {/* TABS */}
        <div className="flex bg-[#0A0F1C] p-1 rounded-lg border border-white/5">
            <button
                onClick={() => setActiveTab('ATOMS')}
                className={`px-6 py-2 text-xs font-bold tracking-widest uppercase rounded-md transition-all flex items-center gap-2 ${activeTab === 'ATOMS' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-white'}`}
            >
                <Activity size={14} /> Atoms
            </button>
            <button
                onClick={() => setActiveTab('STACKS')}
                className={`px-6 py-2 text-xs font-bold tracking-widest uppercase rounded-md transition-all flex items-center gap-2 ${activeTab === 'STACKS' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-white'}`}
            >
                <Layers size={14} /> Stacks
            </button>
        </div>

        <div className="relative group w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors" size={16} />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-[#0A0F1C] border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-all w-full md:w-64"
            placeholder="Search Database..."
          />
        </div>
      </header>

      {/* CONTENT GRID */}
      {activeTab === 'ATOMS' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {filteredLibrary.map((habit) => {
              const active = isHabitActive(habit.id);
              const IconComponent = ICON_MAP[habit.visuals.icon] || Plus;
              const colorClass = habit.visuals.color || 'bg-gray-500';

              return (
                <div
                  key={habit.id}
                  className={`relative group bg-[#0B1221] border border-white/5 rounded-2xl p-6 transition-all duration-300 ${
                    active ? 'opacity-50 grayscale-[0.5]' : 'hover:border-blue-500/50 hover:bg-[#0F1729]'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 duration-300 ${colorClass} bg-opacity-10 text-white`}
                    >
                       <IconComponent size={24} />
                    </div>

                    {active ? (
                      <div className="bg-green-500/20 text-green-500 p-2 rounded-full border border-green-500/20">
                        <Check size={16} />
                      </div>
                    ) : (
                      <button
                        onClick={() => handleAdd(habit.id)}
                        className="bg-white/5 hover:bg-blue-600 text-white p-2 rounded-full border border-white/10 transition-all group-hover:scale-110"
                      >
                        <Plus size={16} />
                      </button>
                    )}
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-bold text-white tracking-tight">{habit.title}</h3>
                    <p className="text-gray-500 text-xs mt-1 font-mono tracking-tight leading-relaxed">
                      {habit.description}
                    </p>
                  </div>

                  {/* Category Tag */}
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[9px] font-black text-gray-700 uppercase tracking-widest border border-gray-800 px-2 py-1 rounded">
                          {habit.category}
                      </span>
                  </div>
                </div>
              );
            })}
          </div>
      ) : (
          /* STACKS GRID */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {filteredStacks.map((stack) => (
                   <div
                    key={stack.id}
                    className="group relative bg-[#0B1221] border border-white/5 rounded-2xl p-8 hover:border-blue-500/50 hover:bg-[#0F1729] transition-all"
                   >
                       <div className="flex items-center justify-between mb-6">
                           <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg">
                               <Layers size={24} />
                           </div>
                           <button
                             onClick={() => handleDeployStack(stack)}
                             className="px-4 py-2 bg-white/5 hover:bg-blue-600 text-white text-xs font-bold uppercase tracking-widest rounded transition-all"
                           >
                               Deploy Stack
                           </button>
                       </div>

                       <h3 className="text-2xl font-black italic uppercase text-white tracking-tighter">{stack.title}</h3>
                       <p className="text-gray-500 text-sm mt-2">{stack.description}</p>

                       <div className="mt-8 border-t border-white/5 pt-6">
                           <div className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-3">Contains Protocols:</div>
                           <div className="flex flex-wrap gap-2">
                               {stack.habit_ids.map(hid => {
                                   const h = SOVEREIGN_LIBRARY.find(lib => lib.id === hid);
                                   return h ? (
                                       <span key={hid} className="px-2 py-1 bg-black/40 border border-white/10 rounded text-[10px] text-gray-400">
                                           {h.title}
                                       </span>
                                   ) : null;
                               })}
                           </div>
                       </div>
                   </div>
              ))}
          </div>
      )}
    </div>
  );
};
