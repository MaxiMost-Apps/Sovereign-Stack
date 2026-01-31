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
  // V1.9: Do not filter by status in SQL, handle visibility here.
  // absoluteHabits = Frequency Type ABSOLUTE & Active
  // frequencyHabits = Frequency Type FREQUENCY & Active
  // reserves = Inactive (Paused or Archived)

  const isHabitActive = (h: any) => !h.is_paused && h.status !== 'archived';

  const absoluteHabits = habits.filter(h => {
     const type = h.metadata?.config?.frequency_type || h.default_config?.frequency_type;
     return type === 'ABSOLUTE' && isHabitActive(h);
  });

  const frequencyHabits = habits.filter(h => {
     const type = h.metadata?.config?.frequency_type || h.default_config?.frequency_type;
     return type === 'FREQUENCY' && isHabitActive(h);
  });

  const reserveHabits = habits.filter(h => !isHabitActive(h));

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
      {/* 1. HEADER (Titan V1.9 Polish) */}
      <header className="sticky top-0 z-40 bg-[#020408]/95 backdrop-blur-xl border-b border-white/5 px-6 py-6 transition-all duration-300">
        <div className="max-w-4xl mx-auto flex items-center justify-between relative">

            {/* Left: Empty / Breadcrumb */}
            <div className="w-1/3 hidden md:block">
                 {/* Placeholder for Back button if needed */}
            </div>

            {/* Center: App-Like Controller */}
            <div className="flex flex-col items-center gap-3 w-full md:w-1/3">
                 {/* Date Navigation */}
                 <div className="flex items-center gap-6">
                    <button className="p-2 text-gray-500 hover:text-white transition-colors hover:bg-white/5 rounded-full">
                        <ChevronLeft size={18} />
                    </button>
                    <span className="text-sm font-black uppercase tracking-widest text-white whitespace-nowrap">{dateString}</span>
                    <button className="p-2 text-gray-500 hover:text-white transition-colors hover:bg-white/5 rounded-full">
                        <ChevronRight size={18} />
                    </button>
                 </div>

                 {/* Segmented Toggle */}
                 <div className="flex bg-[#0A0F1C] p-1 rounded-lg border border-white/5 shadow-inner shadow-black/50">
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
                        className={`px-6 py-1.5 text-[10px] font-bold tracking-[0.2em] rounded-md transition-all duration-300 ${
                          view === tab.id
                          ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)]'
                          : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                </div>
            </div>

            {/* Right: Controls */}
            <div className="flex items-center justify-end gap-3 w-1/3 absolute right-0 top-1/2 -translate-y-1/2 md:static md:transform-none">
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
        {view === 'day' && reserveHabits.length > 0 && (
             <section className="pt-8 border-t border-white/5">
                 <button
                    onClick={() => setShowReserves(!showReserves)}
                    className="flex items-center justify-between w-full text-gray-500 hover:text-white transition-colors mb-4 group"
                 >
                     <span className="text-[10px] font-black uppercase tracking-[0.2em]">RESERVES ({reserveHabits.length})</span>
                     {showReserves ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                 </button>

                 {showReserves && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                         {reserveHabits.map(habit => (
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
