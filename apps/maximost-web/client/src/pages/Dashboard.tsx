import React, { useState } from 'react';
import { Lock, Unlock, ArrowUpDown, LayoutGrid, Calendar as CalendarIcon, BarChart3, Plus } from 'lucide-react';
import { DailyHabitRow } from '@/components/habits/DailyHabitRow';
import { HabitMasterDrawer } from '@/components/habits/HabitMasterDrawer';
import { useHabits } from '@/hooks/useHabits';
import { motion, AnimatePresence } from 'framer-motion';

export const Dashboard: React.FC = () => {
  const { habits, loading, toggleHabit, updateHabitConfig, deleteHabit } = useHabits();
  const [isLocked, setIsLocked] = useState(true);
  const [view, setView] = useState<'day' | 'week' | 'month'>('day');

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
    setDrawerState({ isOpen: true, habit, tab });
  };

  return (
    <div className="min-h-screen bg-[#020408] text-white pb-32">
      {/* 1. HEADER */}
      <header className="sticky top-0 z-40 bg-[#020408]/80 backdrop-blur-md border-b border-white/5 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
            {/* View Toggle (Center-ish) */}
            <div className="flex bg-[#0A0F1C] p-1 rounded-lg border border-white/5">
                {[
                  { id: 'day', icon: LayoutGrid, label: 'DAY' },
                  { id: 'week', icon: CalendarIcon, label: 'WEEK' },
                  { id: 'month', icon: BarChart3, label: 'MONTH' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setView(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-2 text-[10px] font-bold tracking-widest rounded-md transition-all ${
                      view === tab.id ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    <tab.icon size={12} /> {tab.label}
                  </button>
                ))}
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-2">
                 <button className="p-2 text-gray-600 hover:text-white transition-colors">
                     <ArrowUpDown size={18} />
                 </button>
                 <button
                    onClick={() => setIsLocked(!isLocked)}
                    className={`p-2 rounded-lg transition-colors ${isLocked ? 'text-blue-500 bg-blue-500/10' : 'text-gray-500 hover:text-white'}`}
                 >
                    {isLocked ? <Lock size={18} /> : <Unlock size={18} />}
                 </button>
            </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6 space-y-12">
        {loading && <div className="text-center text-gray-500 font-mono animate-pulse">Initializing Command Link...</div>}

        {/* SECTION 1: ABSOLUTE HABITS */}
        {view === 'day' && (
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-3 mb-4">
                    <div className="h-px bg-white/10 flex-1" />
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Daily Non-Negotiables</span>
                    <div className="h-px bg-white/10 flex-1" />
                </div>
                <div className="space-y-3">
                    {absoluteHabits.length === 0 ? (
                        <div className="text-center py-8 text-gray-600 text-xs font-mono">No absolute protocols active.</div>
                    ) : (
                        absoluteHabits.map(habit => (
                            <DailyHabitRow
                                key={habit.id}
                                habit={habit}
                                isLocked={isLocked}
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
                <div className="flex items-center gap-3 mb-4">
                     <div className="h-px bg-white/10 flex-1" />
                     <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Frequency Targets</span>
                     <div className="h-px bg-white/10 flex-1" />
                </div>
                <div className="space-y-3">
                     {frequencyHabits.length === 0 ? (
                        <div className="text-center py-8 text-gray-600 text-xs font-mono">No frequency targets active.</div>
                    ) : (
                        frequencyHabits.map(habit => (
                            <DailyHabitRow
                                key={habit.id}
                                habit={habit}
                                isLocked={isLocked}
                                onOpenInfo={(h) => handleOpenDrawer(h, 'HQ')}
                                onOpenConfig={(h) => handleOpenDrawer(h, 'CONFIG')}
                                onToggle={(id, val) => toggleHabit(id, val)}
                            />
                        ))
                    )}
                </div>
            </section>
        )}

        {/* SECTION 3: ATOM LEDGER (Reserves) */}
        {view === 'day' && (
             <section className="pt-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                 <div className="flex items-center gap-3 mb-6 opacity-50">
                     <div className="h-px bg-white/5 flex-1" />
                     <span className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em]">Atom Ledger (Reserves)</span>
                     <div className="h-px bg-white/5 flex-1" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                     {inactiveHabits.map(habit => (
                        <DailyHabitRow
                            key={habit.id}
                            habit={habit}
                            isLocked={true} // Always locked in ledger
                            isLedgerMode={true}
                            onOpenInfo={() => {}}
                            onOpenConfig={() => {}}
                            onToggle={(id) => toggleHabit(id)} // Equip
                        />
                     ))}
                </div>

                {/* FOOTER ACTION */}
                <div className="mt-8">
                    <button className="w-full py-4 rounded-xl border border-blue-500/30 text-blue-500 hover:bg-blue-500/10 transition-all flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest">
                        <Plus size={16} /> Initialize New Habit
                    </button>
                </div>
             </section>
        )}

        {/* Placeholder for Week/Month */}
        {view !== 'day' && (
             <div className="py-20 text-center text-gray-500 font-mono text-sm">
                 Macro Analysis Module Loading...
             </div>
        )}

      </div>

      {/* Master Drawer Integration */}
      <HabitMasterDrawer
        isOpen={drawerState.isOpen}
        habit={drawerState.habit}
        initialTab={drawerState.tab}
        onClose={() => setDrawerState({ ...drawerState, isOpen: false })}
        onUpdate={(data) => {
            if (drawerState.habit) {
                updateHabitConfig(drawerState.habit.habit_id, data);
                // Optimistically update drawer local state if needed
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
