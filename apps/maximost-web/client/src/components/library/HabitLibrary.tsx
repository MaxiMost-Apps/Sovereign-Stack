import React, { useState } from 'react';
import { Plus, Check, Search, Layers, Activity, X, Info } from 'lucide-react';
import { SOVEREIGN_LIBRARY, ICON_MAP } from '@/data/sovereign_library';
import { SOVEREIGN_STACKS } from '@/data/sovereign_stacks';
import { useHabits } from '@/hooks/useHabits';

interface HabitLibraryProps {
  onDeploy?: (habit: any) => void;
}

export const HabitLibrary: React.FC<HabitLibraryProps> = ({ onDeploy }) => {
  const { habits, toggleHabit } = useHabits();
  const [activeTab, setActiveTab] = useState<'HABITS' | 'STACKS'>('HABITS');
  const [searchTerm, setSearchTerm] = useState('');

  // Stack Selection State
  const [selectedStack, setSelectedStack] = useState<any>(null);
  const [selectedStackHabits, setSelectedStackHabits] = useState<string[]>([]);

  // Helper to check if habit is active
  const isHabitActive = (libraryId: string) => {
    const userHabit = habits.find(h => h.habit_id === libraryId);
    return userHabit && userHabit.status !== 'archived';
  };

  const filteredLibrary = SOVEREIGN_LIBRARY.filter(h =>
    h.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredStacks = SOVEREIGN_STACKS.filter(s =>
     s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     s.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = (habitId: string) => {
      toggleHabit(habitId);
  };

  const openStackModal = (stack: any) => {
      setSelectedStack(stack);
      setSelectedStackHabits(stack.habits); // Default all selected
  };

  const toggleStackHabitSelection = (hid: string) => {
      if (selectedStackHabits.includes(hid)) {
          setSelectedStackHabits(prev => prev.filter(id => id !== hid));
      } else {
          setSelectedStackHabits(prev => [...prev, hid]);
      }
  };

  const deployStack = () => {
      selectedStackHabits.forEach(hid => {
          if (!isHabitActive(hid)) {
              toggleHabit(hid);
          }
      });
      setSelectedStack(null);
  };

  return (
    <div className="p-8 space-y-8 max-w-6xl mx-auto pb-32">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">The Archive</h1>
          <p className="text-gray-500 font-mono text-[10px] uppercase tracking-widest mt-2">Protocol Database // V1.8</p>
        </div>

        {/* TABS */}
        <div className="flex bg-[#0A0F1C] p-1 rounded-lg border border-white/5">
            <button
                onClick={() => setActiveTab('HABITS')}
                className={`px-6 py-2 text-[10px] font-bold tracking-widest uppercase rounded-md transition-all flex items-center gap-2 ${activeTab === 'HABITS' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-white'}`}
            >
                <Activity size={14} /> Habits
            </button>
            <button
                onClick={() => setActiveTab('STACKS')}
                className={`px-6 py-2 text-[10px] font-bold tracking-widest uppercase rounded-md transition-all flex items-center gap-2 ${activeTab === 'STACKS' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-white'}`}
            >
                <Layers size={14} /> Protocol Stacks
            </button>
        </div>

        <div className="relative group w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors" size={14} />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-[#0A0F1C] border border-white/10 rounded-full pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-blue-500 transition-all w-full md:w-64"
            placeholder="Search Database..."
          />
        </div>
      </header>

      {/* CONTENT GRID */}
      {activeTab === 'HABITS' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {filteredLibrary.map((habit) => {
              const active = isHabitActive(habit.id);
              const IconComponent = ICON_MAP[habit.visuals.icon] || Plus;
              const colorClass = habit.visuals.color || 'bg-gray-500';

              return (
                <div
                  key={habit.id}
                  className={`relative group bg-[#0B1221] border border-white/5 rounded-xl p-5 transition-all duration-300 ${
                    active ? 'opacity-50 grayscale-[0.5]' : 'hover:border-blue-500/50 hover:bg-[#0F1729]'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105 duration-300 ${colorClass} bg-opacity-10 text-white`}
                    >
                       <IconComponent size={20} />
                    </div>

                    <div className="flex gap-2">
                        {/* Info Button in Corner as requested */}
                        <button className="text-gray-600 hover:text-blue-400 transition-colors">
                            <Info size={14} />
                        </button>
                        {active ? (
                        <div className="bg-green-500/20 text-green-500 p-1.5 rounded-md border border-green-500/20">
                            <Check size={14} />
                        </div>
                        ) : (
                        <button
                            onClick={() => handleAdd(habit.id)}
                            className="bg-white/5 hover:bg-blue-600 text-white p-1.5 rounded-md border border-white/10 transition-all"
                        >
                            <Plus size={14} />
                        </button>
                        )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-sm font-bold text-white tracking-tight">{habit.title}</h3>
                    <p className="text-gray-500 text-[10px] mt-1 font-mono tracking-tight leading-relaxed">
                      {habit.description}
                    </p>
                  </div>

                  {/* Category Tag */}
                  <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {filteredStacks.map((stack) => {
                   const Icon = stack.icon || Layers;
                   return (
                   <div
                    key={stack.id}
                    className="group relative bg-[#0B1221] border border-white/5 rounded-xl p-8 hover:border-blue-500/50 hover:bg-[#0F1729] transition-all cursor-pointer h-full flex flex-col"
                    onClick={() => openStackModal(stack)}
                   >
                       <div className="flex items-center justify-between mb-6">
                           <div className={`p-3 rounded-lg bg-white/5 text-${stack.theme_override ? 'white' : 'blue-400'}`}>
                               <Icon size={24} />
                           </div>
                           <button
                             className="px-4 py-2 bg-white/5 group-hover:bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest rounded transition-all"
                           >
                               Select Stack
                           </button>
                       </div>

                       <h3 className="text-2xl font-black italic uppercase text-white tracking-tighter">{stack.title}</h3>
                       <p className="text-blue-500 text-[10px] font-bold uppercase tracking-widest mt-1 mb-2">{stack.expert_voice}</p>
                       <p className="text-gray-500 text-xs">{stack.description}</p>

                       <div className="mt-auto pt-6 border-t border-white/5">
                           <div className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-3">Core Protocols:</div>
                           <div className="flex flex-wrap gap-2">
                               {stack.habits.slice(0, 4).map((hid: string) => {
                                   const h = SOVEREIGN_LIBRARY.find(lib => lib.id === hid);
                                   return h ? (
                                       <span key={hid} className="px-2 py-1 bg-black/40 border border-white/10 rounded text-[10px] text-gray-400">
                                           {h.title}
                                       </span>
                                   ) : null;
                               })}
                               {stack.habits.length > 4 && (
                                   <span className="px-2 py-1 bg-black/40 border border-white/10 rounded text-[10px] text-gray-400">
                                       +{stack.habits.length - 4} more
                                   </span>
                               )}
                           </div>
                       </div>
                   </div>
                   );
              })}
          </div>
      )}

      {/* STACK SELECTION MODAL */}
      {selectedStack && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedStack(null)} />
            <div className="relative w-full max-w-xl bg-[#0B1221] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
                <div className="p-6 border-b border-white/5 flex items-center justify-between bg-[#050A14]">
                    <div>
                        <span className="text-blue-500 text-[10px] font-bold uppercase tracking-widest">Protocol Stack Deployment</span>
                        <h2 className="text-xl font-black italic text-white mt-1 uppercase">{selectedStack.title}</h2>
                    </div>
                    <button onClick={() => setSelectedStack(null)} className="p-2 hover:bg-white/5 rounded-full text-gray-400 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 max-h-[60vh] overflow-y-auto">
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">Select Habits to Add:</div>
                    <div className="space-y-2">
                        {selectedStack.habits.map((hid: string) => {
                            const habit = SOVEREIGN_LIBRARY.find(h => h.id === hid);
                            if (!habit) return null;
                            const isSelected = selectedStackHabits.includes(hid);
                            const isActiveAlready = isHabitActive(hid);

                            return (
                                <div
                                    key={hid}
                                    onClick={() => !isActiveAlready && toggleStackHabitSelection(hid)}
                                    className={`flex items-center gap-4 p-3 rounded-lg border transition-all cursor-pointer ${
                                        isActiveAlready
                                        ? 'bg-blue-500/5 border-blue-500/20 opacity-50 cursor-default'
                                        : isSelected
                                            ? 'bg-blue-600/10 border-blue-500/50'
                                            : 'bg-white/5 border-white/5 hover:border-white/10'
                                    }`}
                                >
                                    <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${
                                        isActiveAlready || isSelected
                                        ? 'bg-blue-500 border-blue-500 text-white'
                                        : 'border-gray-600 bg-transparent'
                                    }`}>
                                        {(isActiveAlready || isSelected) && <Check size={12} />}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-bold text-white text-xs">{habit.title}</h4>
                                            {isActiveAlready && <span className="text-[9px] text-blue-400 font-mono uppercase">Active</span>}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="p-6 border-t border-white/5 bg-[#050A14] flex justify-end gap-3">
                    <button
                        onClick={() => setSelectedStack(null)}
                        className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={deployStack}
                        disabled={selectedStackHabits.length === 0}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg shadow-lg shadow-blue-900/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        ADD TO DASH ({selectedStackHabits.length})
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};
