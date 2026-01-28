import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DailyHabitRow } from '@/components/habits/DailyHabitRow';
import { WeeklyMatrix } from '@/components/dashboard/WeeklyMatrix';
import { HabitLibrary } from '@/components/library/HabitLibrary';
import { HabitDetailModal } from '@/components/habits/HabitDetailModal';
import { useLibrary } from '@/hooks/useLibrary';
import { useHabits } from '@/hooks/useHabits';
import { LayoutGrid, Calendar, BarChart3, Shield, Activity, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DashboardSingularity() {
  const [view, setView] = useState<'day' | 'week' | 'month'>('day');
  const [selectedHabit, setSelectedHabit] = useState<any>(null);

  const { library } = useLibrary();
  const { habits: userHabits, toggleHabit, updateHabitConfig } = useHabits();

  const activeHabits = library.map(master => {
    const userState = userHabits.find(h => h.habit_id === master.id);
    if (!userState || userState.status === 'archived') return null;
    return { ...master, ...userState, status: userState.status || 'active', is_completed: userState.status === 'completed' };
  }).filter(Boolean);

  const absoluteHabits = activeHabits.filter(h => h.default_config.frequency_type === 'ABSOLUTE');
  const frequencyHabits = activeHabits.filter(h => h.default_config.frequency_type === 'FREQUENCY');

  return (
    <div className="min-h-screen bg-[#0B1221] pb-32">
      <div className="sticky top-0 z-40 glass-panel border-b-0 px-4 py-4 mb-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black tracking-[0.2em] uppercase text-white">Mission Control</h1>
            <p className="text-[10px] text-blue-400 font-bold tracking-widest uppercase">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </p>
          </div>
          <Link to="/preferences" className="p-2 text-slate-500 hover:text-white transition-colors">
            <Menu size={24} />
          </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-4">
        <div className="flex bg-[#131B2C] p-1 rounded-xl border border-white/5 shadow-inner mb-8 relative">
          {[{ id: 'day', icon: LayoutGrid, label: 'DAY' }, { id: 'week', icon: Calendar, label: 'WEEK' }, { id: 'month', icon: BarChart3, label: 'MONTH' }].map(tab => (
            <button
              key={tab.id}
              onClick={() => setView(tab.id as any)}
              className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-3 text-[10px] font-black tracking-widest transition-colors ${view === tab.id ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
            >
              {view === tab.id && (
                <motion.div layoutId="activeTab" className="absolute inset-0 bg-slate-700/80 rounded-lg shadow-lg" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
              )}
              <span className="relative z-10 flex items-center gap-2"><tab.icon size={14} /> {tab.label}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode='wait'>
          {view === 'day' && (
            <motion.div key="day" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.2 }} className="space-y-8">
               {absoluteHabits.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 ml-2 opacity-80"><Shield size={14} className="text-red-500" /><span className="text-[10px] font-black tracking-[0.2em] text-red-500 uppercase text-glow-red">Absolute Habits</span></div>
                  {absoluteHabits.map((habit: any, i: number) => <DailyHabitRow key={habit.id} habit={habit} index={i} onToggle={toggleHabit} onOpenInfo={() => setSelectedHabit(habit)} />)}
                </div>
              )}
              {frequencyHabits.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 ml-2 opacity-80"><Activity size={14} className="text-blue-500" /><span className="text-[10px] font-black tracking-[0.2em] text-blue-500 uppercase text-glow-blue">Frequency Targets</span></div>
                  {frequencyHabits.map((habit: any, i: number) => <DailyHabitRow key={habit.id} habit={habit} index={i} onToggle={toggleHabit} onOpenInfo={() => setSelectedHabit(habit)} />)}
                </div>
              )}
              {activeHabits.length === 0 && <div className="p-12 text-center border border-dashed border-white/10 rounded-2xl bg-slate-900/20"><p className="text-xs text-slate-500">No active atoms. Deploy from Archive.</p></div>}
            </motion.div>
          )}
          {view === 'week' && <motion.div key="week" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}><WeeklyMatrix habits={activeHabits} /></motion.div>}
          {view === 'month' && <motion.div key="month" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="glass-panel rounded-2xl p-12 text-center"><BarChart3 className="w-12 h-12 text-slate-700 mx-auto mb-4" /><h3 className="text-white font-bold tracking-widest uppercase">Macro Analysis</h3><p className="text-slate-500 text-xs mt-2">Aggregating Q1 Data...</p></motion.div>}
        </AnimatePresence>

        <div className="mt-20 border-t border-white/5 pt-10"><HabitLibrary /></div>
      </div>

      <AnimatePresence>
        {selectedHabit && (
          <HabitDetailModal habit={selectedHabit} onClose={() => setSelectedHabit(null)} onSave={(updates: any) => {
              updateHabitConfig(selectedHabit.id, { frequency_type: updates.default_config.frequency_type, target_days: updates.default_config.target_days, visuals: updates.visuals });
              setSelectedHabit(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
