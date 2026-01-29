import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DailyHabitRow } from '@/components/habits/DailyHabitRow';
import { WeeklyMatrix } from '@/components/dashboard/WeeklyMatrix';
import { HabitLibrary } from '@/components/library/HabitLibrary';
import { HabitInfoDrawer } from '@/components/habits/HabitInfoDrawer';
import { EditHabitModal } from '@/components/habits/EditHabitModal';
import { useLibrary } from '@/hooks/useLibrary';
import { useHabits } from '@/hooks/useHabits';
import { LayoutGrid, Calendar, BarChart3, Lock, Unlock, ArrowUpDown, ChevronLeft, ChevronRight, Plus, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DashboardSingularity() {
  const [view, setView] = useState<'day' | 'week' | 'month'>('day');
  const [isLocked, setIsLocked] = useState(false);
  const [isReordering, setIsReordering] = useState(false);
  const [drawerHabit, setDrawerHabit] = useState<any>(null);
  const [slideOver, setSlideOver] = useState<{ habit: any, mode: 'EDIT' | 'CREATE' } | null>(null);

  const { library } = useLibrary();
  const { habits: userHabits, toggleHabit, deleteHabit, updateHabitConfig } = useHabits();

  const activeHabits = library.map(master => {
    const userState = userHabits.find(h => h.habit_id === master.id);
    if (!userState || userState.status === 'archived') return null;
    return { ...master, ...userState, status: userState.status || 'active', is_completed: userState.status === 'completed' };
  }).filter(Boolean);

  const absoluteHabits = activeHabits.filter(h => h.default_config.frequency_type === 'ABSOLUTE');
  const frequencyHabits = activeHabits.filter(h => h.default_config.frequency_type === 'FREQUENCY');

  return (
    <div className="min-h-screen bg-deep-space pb-32">
      {/* HEADER */}
      <div className="sticky top-0 z-40 bg-[#050A14]/90 backdrop-blur-md border-b border-white/5 px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black tracking-[0.2em] uppercase text-white">Mission Control</h1>
            <div className="flex items-center gap-3 mt-1">
               <button className="text-slate-600 hover:text-white p-1 rounded hover:bg-white/5"><ChevronLeft size={16}/></button>
               <p className="text-[10px] text-blue-500 font-bold tracking-widest uppercase">
                 {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
               </p>
               <button className="text-slate-600 hover:text-white p-1 rounded hover:bg-white/5"><ChevronRight size={16}/></button>
            </div>
          </div>

          <div className="flex gap-2 items-center">
             {view === 'day' && (
               <button onClick={() => setIsReordering(!isReordering)} className={`p-2 rounded-lg transition-colors ${isReordering ? 'text-blue-400 bg-blue-500/10' : 'text-slate-600 hover:text-white'}`}>
                 <ArrowUpDown size={20} />
               </button>
             )}
             <button onClick={() => setIsLocked(!isLocked)} className={`p-2 rounded-lg transition-colors ${isLocked ? 'text-red-500 bg-red-500/10' : 'text-slate-600 hover:text-white'}`}>
               {isLocked ? <Lock size={20} /> : <Unlock size={20} />}
             </button>
             {/* MENU */}
             <Link to="/preferences" className="p-2 text-slate-500 hover:text-white transition-colors">
                <Menu size={24} />
             </Link>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-4 mt-4">
        {/* TABS */}
        <div className="flex bg-[#0B1221] p-1 rounded-xl border border-white/5 mb-8 relative">
           {[
            { id: 'day', icon: LayoutGrid, label: 'DAY' },
            { id: 'week', icon: Calendar, label: 'WEEK' },
            { id: 'month', icon: BarChart3, label: 'MONTH' }
           ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setView(tab.id as any)}
              className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-3 text-[10px] font-black tracking-widest transition-colors ${
                view === tab.id ? 'bg-slate-700 text-white rounded-lg shadow-lg' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {view === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-slate-700/80 rounded-lg shadow-lg"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <tab.icon size={14} /> {tab.label}
              </span>
            </button>
           ))}
        </div>

        {/* DAY VIEW */}
        {view === 'day' && (
          <div className="space-y-4 animate-in fade-in">
            {/* ABSOLUTE */}
            <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2 pl-2">
                   <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Absolute Habits</span>
                </div>
                {absoluteHabits.map((h, i) => (
                  <DailyHabitRow
                    key={h.id}
                    habit={h}
                    index={i}
                    isReordering={isReordering} isLocked={isLocked}
                    onToggle={toggleHabit}
                    onOpenInfo={() => setDrawerHabit(h)}
                    onOpenEdit={() => setSlideOver({ habit: h, mode: 'EDIT' })}
                  />
                ))}
            </div>

            {/* FREQUENCY */}
            <div className="space-y-3 pt-6">
                 <div className="flex items-center gap-2 mb-2 pl-2 border-t border-white/5 pt-6">
                   <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Frequency Habits</span>
                </div>
                {frequencyHabits.map((h, i) => (
                  <DailyHabitRow
                    key={h.id}
                    habit={h}
                    index={i}
                    isReordering={isReordering} isLocked={isLocked}
                    onToggle={toggleHabit}
                    onOpenInfo={() => setDrawerHabit(h)}
                    onOpenEdit={() => setSlideOver({ habit: h, mode: 'EDIT' })}
                  />
                ))}
            </div>

            {/* CREATE BTN */}
            <div className="pt-8">
              <button
                onClick={() => setSlideOver({ habit: { title: '', visuals: { color: 'bg-blue-500', icon: 'Zap' }, default_config: {} }, mode: 'CREATE' })}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl flex items-center justify-center gap-2 text-white font-bold uppercase tracking-widest transition-all shadow-lg shadow-blue-900/20"
              >
                <Plus size={16} /> Initialize New Habit
              </button>
            </div>

            {/* LIBRARY (Day Only) */}
            <div className="mt-20 border-t border-white/5 pt-10">
              <HabitLibrary onDeploy={(habit) => setSlideOver({ habit, mode: 'CREATE' })} />
            </div>
          </div>
        )}

        {view === 'week' && <WeeklyMatrix habits={activeHabits} isLocked={isLocked} />}

        {/* MONTH VIEW */}
        {view === 'month' && (
            <motion.div
              key="month"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-12 text-center border border-white/5 rounded-2xl bg-[#0B1221]"
            >
              <BarChart3 className="w-12 h-12 text-slate-700 mx-auto mb-4" />
              <h3 className="text-white font-bold tracking-widest uppercase">Macro Analysis</h3>
              <p className="text-slate-500 text-xs mt-2">Aggregating Q1 Data...</p>
            </motion.div>
        )}
      </div>

      {/* OVERLAYS */}
      <AnimatePresence>
        {drawerHabit && <HabitInfoDrawer habit={drawerHabit} onClose={() => setDrawerHabit(null)} />}
        {slideOver && (
          <EditHabitModal
            habit={slideOver.habit}
            onClose={() => setSlideOver(null)}
            onSave={(data: any) => {
               if (slideOver.mode === 'EDIT' && slideOver.habit.id) {
                   // Update existing
                   updateHabitConfig(slideOver.habit.id, {
                       title: data.title,
                       visuals: data.visuals,
                       default_config: data.default_config,
                       is_paused: data.is_paused,
                       start_date: data.start_date
                   });
               } else {
                   // Create/Deploy new (handled via toggleHabit in hook usually, or add logic)
                   toggleHabit(data.id || slideOver.habit.id);
               }
               setSlideOver(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
