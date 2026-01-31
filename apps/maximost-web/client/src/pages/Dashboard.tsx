import React, { useState } from 'react';
import { Lock, Unlock, ArrowUpDown, Plus, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { DailyHabitRow } from '@/components/habits/DailyHabitRow';
import { HabitMasterDrawer } from '@/components/habits/HabitMasterDrawer';
import { useHabits } from '@/hooks/useHabits';
import { useLens } from '@/context/LensContext';
import { SOVEREIGN_LIBRARY_DATA } from '@/data/sovereign_library';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { habits, loading, toggleHabit, updateHabitConfig, deleteHabit } = useHabits();
  const { activeLens } = useLens();
  const [isLocked, setIsLocked] = useState(true);
  const [isReordering, setIsReordering] = useState(false);
  const [view, setView] = useState<'day' | 'week' | 'month'>('day');
  const [showReserves, setShowReserves] = useState(false);

  // Drawer State
  const [drawerState, setDrawerState] = useState<{
    isOpen: boolean;
    habit: any;
    tab: 'HQ' | 'CONFIG';
  }>({
    isOpen: false,
    habit: null,
    tab: 'HQ'
  });

  // Filter Data
  const activeHabits = habits.filter(h => h.status !== 'archived');
  const inactiveHabits = habits.filter(h => h.status === 'archived');

  const absoluteHabits = activeHabits.filter(h => {
     const type = h.metadata?.config?.frequency_type || h.default_config?.frequency_type;
     return type === 'ABSOLUTE';
  });

  const frequencyHabits = activeHabits.filter(h => {
     const type = h.metadata?.config?.frequency_type || h.default_config?.frequency_type;
     return type === 'FREQUENCY';
  });

  const handleOpenDrawer = (habit: any, tab: 'HQ' | 'CONFIG') => {
    // Lookup lens text
    const lensText = SOVEREIGN_LIBRARY_DATA[habit.habit_id]?.[activeLens] || habit.description;

    // Pass enriched habit object to drawer
    setDrawerState({
        isOpen: true,
        habit: { ...habit, description: lensText }, // Override description with lens text for display
        tab
    });
  };

  // Date Logic (Mock for now)
  const currentDate = new Date();
  const dateString = currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  return (
    <div className="min-h-screen bg-[#020408] text-white pb-32">
      {/* 1. HEADER */}
      <header className="sticky top-0 z-40 bg-[#020408]/90 backdrop-blur-md border-b border-white/5 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
            {/* Date Nav */}
            <div className="flex items-center gap-4 w-1/3">
                <button className="p-1 text-gray-600 hover:text-white transition-colors"><ChevronLeft size={16} /></button>
                <span className="text-xs font-bold uppercase tracking-widest text-white">{dateString}</span>
                <button className="p-1 text-gray-600 hover:text-white transition-colors"><ChevronRight size={16} /></button>
            </div>

            {/* View Toggle (Center) */}
            <div className="flex bg-[#0A0F1C] p-1 rounded-lg border border-white/5">
                {[
                  { id: 'day', label: 'DAY' },
                  { id: 'week', label: 'WEEK' },
                  { id: 'month', label: 'MONTH' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                        setView(tab.id as any);
                        if (tab.id !== 'day') setIsReordering(false);
                    }}
                    className={`px-4 py-1.5 text-[10px] font-bold tracking-widest rounded-md transition-all ${
                      view === tab.id ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
            </div>

            {/* Controls (Right) */}
            <div className="flex items-center justify-end gap-2 w-1/3">
                 {view === 'day' && (
                     <button
                        onClick={() => setIsReordering(!isReordering)}
                        className={`p-2 rounded-lg transition-colors ${isReordering ? 'text-blue-500 bg-blue-500/10' : 'text-gray-500 hover:text-white'}`}
                        title="Reorder"
                     >
                         <ArrowUpDown size={16} />
                     </button>
                 )}
                 <button
                    onClick={() => setIsLocked(!isLocked)}
                    className={`p-2 rounded-lg transition-colors ${isLocked ? 'text-blue-500 bg-blue-500/10' : 'text-gray-500 hover:text-white'}`}
                    title={isLocked ? "Unlock" : "Lock"}
                 >
                    {isLocked ? <Lock size={16} /> : <Unlock size={16} />}
                 </button>
            </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6 space-y-10">
        {loading && <div className="text-center text-gray-500 font-mono animate-pulse text-xs">SYNCING...</div>}

        {/* SECTION 1: ABSOLUTE HABITS */}
        {view === 'day' && (
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-3 mb-4 pl-2">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">ABSOLUTE HABITS</span>
                </div>
                <div className="space-y-2">
                    {absoluteHabits.length === 0 ? (
                        <div className="py-8 border border-dashed border-white/5 rounded-xl flex items-center justify-center text-gray-600 text-xs font-mono">No daily protocols.</div>
                    ) : (
                        absoluteHabits.map(habit => (
                            <DailyHabitRow
                                key={habit.id}
                                habit={habit}
                                isLocked={isLocked}
                                isReordering={isReordering}
                                onOpenInfo={(h) => handleOpenDrawer(h, 'HQ')}
                                onOpenConfig={(h) => handleOpenDrawer(h, 'CONFIG')}
                                onToggle={(id) => toggleHabit(id)}
                            />
                        ))
                    )}
                </div>
            </section>
        )}

        {/* SECTION 2: FREQUENCY TARGETS */}
        {view === 'day' && (
            <section className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="flex items-center gap-3 mb-4 pl-2 border-t border-white/5 pt-8">
                     <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">FREQUENCY TARGETS</span>
                </div>
                <div className="space-y-2">
                     {frequencyHabits.length === 0 ? (
                        <div className="py-8 border border-dashed border-white/5 rounded-xl flex items-center justify-center text-gray-600 text-xs font-mono">No frequency targets.</div>
                    ) : (
                        frequencyHabits.map(habit => (
                            <DailyHabitRow
                                key={habit.id}
                                habit={habit}
                                isLocked={isLocked}
                                isReordering={isReordering}
                                onOpenInfo={(h) => handleOpenDrawer(h, 'HQ')}
                                onOpenConfig={(h) => handleOpenDrawer(h, 'CONFIG')}
                                onToggle={(id, val) => toggleHabit(id, val)}
                            />
                        ))
                    )}
                </div>
            </section>
        )}

        {/* SECTION 3: FOOTER CREATE BUTTON */}
        {view === 'day' && (
            <div className="pt-8 flex justify-center">
                 <Link
                    to="/archive"
                    className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 transition-all"
                 >
                     <Plus size={16} /> Create New Habit
                 </Link>
            </div>
        )}

        {/* SECTION 4: RESERVES (Collapsible) */}
        {view === 'day' && inactiveHabits.length > 0 && (
             <section className="pt-8 border-t border-white/5">
                 <button
                    onClick={() => setShowReserves(!showReserves)}
                    className="flex items-center justify-between w-full text-gray-500 hover:text-white transition-colors mb-4 group"
                 >
                     <span className="text-[10px] font-black uppercase tracking-[0.2em]">RESERVES ({inactiveHabits.length})</span>
                     {showReserves ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                 </button>

                 {showReserves && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                         {inactiveHabits.map(habit => (
                            <DailyHabitRow
                                key={habit.id}
                                habit={habit}
                                isLocked={true}
                                isLedgerMode={true}
                                onOpenInfo={() => {}}
                                onOpenConfig={() => {}}
                                onToggle={(id) => toggleHabit(id)}
                            />
                         ))}
                    </div>
                 )}
             </section>
        )}

        {/* Placeholder for Week/Month */}
        {view !== 'day' && (
             <div className="py-20 text-center text-gray-500 font-mono text-sm">
                 Macro Analysis Module Loading...
             </div>
        )}

      </div>

      {/* Master Drawer */}
      <HabitMasterDrawer
        isOpen={drawerState.isOpen}
        habit={drawerState.habit}
        initialTab={drawerState.tab}
        onClose={() => setDrawerState({ ...drawerState, isOpen: false })}
        onUpdate={(data) => {
            if (drawerState.habit) {
                updateHabitConfig(drawerState.habit.habit_id, data);
                setDrawerState(prev => ({ ...prev, habit: { ...prev.habit, ...data } }));
            }
        }}
        onArchive={(id) => {
             deleteHabit(id);
             setDrawerState({ ...drawerState, isOpen: false });
        }}
      />
    </div>
  );
};
