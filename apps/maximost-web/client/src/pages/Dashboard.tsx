import React, { useState, useEffect } from 'react';
import { Lock, Unlock, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addDays, isSameDay } from 'date-fns';
import { supabase } from '@/services/supabase';
import { DailyHabitRow } from '@/components/habits/DailyHabitRow';
import { WeeklyHabitMatrix } from '@/components/habits/WeeklyHabitMatrix';
import { motion, AnimatePresence } from 'framer-motion';

export default function Dashboard() {
  const [view, setView] = useState<'DAILY' | 'WEEKLY' | 'MONTHLY'>('DAILY');
  const [isLocked, setIsLocked] = useState(() => {
    const saved = localStorage.getItem('dashboard_locked');
    return saved ? JSON.parse(saved) : true;
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [habits, setHabits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Persistence for Lock State
  useEffect(() => {
    localStorage.setItem('dashboard_locked', JSON.stringify(isLocked));
  }, [isLocked]);

  // Data Fetching
  useEffect(() => {
    fetchHabits();
  }, []);

  async function fetchHabits() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch habits AND their logs
      // We fetch ALL logs for the weekly view to work correctly
      const { data, error } = await supabase
        .from('habits')
        .select(`*, habit_logs(date, status, value)`)
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });

      if (error) throw error;

      // Transform data to ensure compatibility
      const transformed = (data || []).map(h => ({
        ...h,
        id: h.habit_id || h.id, // Handle potential ID drift
        // Calculate 'completed' status for the SELECTED date for the UI
        // This will be re-calculated in render or we can do it here,
        // but since selectedDate changes, we'll do derivation in render or helper.
      }));

      setHabits(transformed);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  }

  const changeDate = (days: number) => {
    const newDate = addDays(selectedDate, days);
    setSelectedDate(newDate);
  };

  const toggleHabit = async (habitId: string, date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');

    // 1. Optimistic Update
    setHabits(prev => prev.map(h => {
      if (h.id === habitId) {
        const existingLog = h.habit_logs?.find((l: any) => l.date === dateStr);
        const isCompleted = existingLog?.status === 'completed';
        const newStatus = isCompleted ? 'pending' : 'completed';

        // Create new logs array
        const newLogs = h.habit_logs ? [...h.habit_logs] : [];
        const logIndex = newLogs.findIndex((l: any) => l.date === dateStr);

        if (logIndex >= 0) {
          newLogs[logIndex] = { ...newLogs[logIndex], status: newStatus };
        } else {
          newLogs.push({ date: dateStr, status: newStatus, habit_id: habitId });
        }

        return { ...h, habit_logs: newLogs };
      }
      return h;
    }));

    // 2. Supabase Update
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Find current status to toggle
      const habit = habits.find(h => h.id === habitId);
      const existingLog = habit?.habit_logs?.find((l: any) => l.date === dateStr);
      const newStatus = existingLog?.status === 'completed' ? 'pending' : 'completed';

      const { error } = await supabase
        .from('habit_logs')
        .upsert({
          habit_id: habitId,
          user_id: user.id, // Ensure user_id is set if RLS requires it
          date: dateStr,
          status: newStatus
        }, { onConflict: 'habit_id, date' });

      if (error) throw error;
    } catch (err) {
      console.error('Toggle failed:', err);
      fetchHabits(); // Revert on error
    }
  };

  // Filter & Prepare Habits for Render
  const absoluteHabits = habits.filter(h => h.habit_type !== 'FREQUENCY');
  const frequencyHabits = habits.filter(h => h.habit_type === 'FREQUENCY');

  // Helper to inject 'completed' prop based on selectedDate
  const prepareForRender = (list: any[]) => list.map(h => ({
    ...h,
    completed: h.habit_logs?.some((l: any) => l.date === format(selectedDate, 'yyyy-MM-dd') && l.status === 'completed')
  }));

  return (
    <div className="min-h-screen bg-[#020408] pb-20 font-sans text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0A0F1C]/90 backdrop-blur-md border-b border-white/5 p-4 space-y-4">
        <div className="flex items-center justify-between">
          <button onClick={() => setIsLocked(!isLocked)} className="text-slate-400 p-2 hover:bg-white/5 rounded-lg transition-colors">
            {isLocked ? <Lock size={20} /> : <Unlock size={20} className="text-amber-500" />}
          </button>
          <h1 className="text-sm font-black tracking-[0.3em] uppercase text-white text-center flex-1">Mission Control</h1>
          <div className="w-9" /> {/* Spacer for centering */}
        </div>

        {/* Tab Switcher */}
        <div className="bg-[#020408] p-1 rounded-lg grid grid-cols-3 gap-1 border border-white/10">
          {['DAILY', 'WEEKLY', 'MONTHLY'].map((tab) => (
            <button
              key={tab}
              onClick={() => setView(tab as any)}
              className={`py-1.5 text-[10px] font-bold tracking-widest rounded-md transition-all ${
                view === tab
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Date Navigator */}
        <div className="flex items-center justify-center gap-6 text-xs font-mono text-blue-400 bg-[#020408]/50 p-2 rounded-xl border border-white/5">
          <button onClick={() => changeDate(-1)} className="p-1 hover:bg-white/10 rounded"><ChevronLeft size={18} /></button>
          <span className="uppercase tracking-[0.2em] font-bold min-w-[120px] text-center">
            {isSameDay(selectedDate, new Date())
              ? 'Today'
              : format(selectedDate, 'MMM d, yyyy')}
          </span>
          <button onClick={() => changeDate(1)} className="p-1 hover:bg-white/10 rounded"><ChevronRight size={18} /></button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-xl mx-auto p-4 space-y-6">
        <AnimatePresence mode="wait">

          {/* DAILY VIEW */}
          {view === 'DAILY' && (
            <motion.div
              key="daily"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="space-y-8"
            >
              {/* Section 1: Absolute */}
              <section className="space-y-3">
                <h2 className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] pl-1">Absolute Habits</h2>
                {prepareForRender(absoluteHabits).map(habit => (
                  <DailyHabitRow
                    key={habit.id}
                    habit={habit}
                    isLocked={isLocked}
                    date={selectedDate}
                    onToggle={toggleHabit}
                  />
                ))}
                {absoluteHabits.length === 0 && !loading && (
                  <div className="text-center p-8 text-slate-600 text-xs font-mono">NO ABSOLUTE HABITS FOUND</div>
                )}
              </section>

              {/* Section 2: Frequency */}
              {frequencyHabits.length > 0 && (
                <section className="space-y-3">
                  <h2 className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] pl-1">Frequency Targets</h2>
                  {prepareForRender(frequencyHabits).map(habit => (
                     <DailyHabitRow
                     key={habit.id}
                     habit={habit}
                     isLocked={isLocked}
                     date={selectedDate}
                     onToggle={toggleHabit}
                   />
                  ))}
                </section>
              )}
            </motion.div>
          )}

          {/* WEEKLY VIEW */}
          {view === 'WEEKLY' && (
             <motion.div
             key="weekly"
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             exit={{ opacity: 0, x: -20 }}
             transition={{ duration: 0.2 }}
           >
             <WeeklyHabitMatrix habits={habits} selectedDate={selectedDate} />
             <div className="mt-4 text-center text-[10px] text-slate-600 font-mono">
               WEEKLY VIEW IS LOCKED • REVIEW ONLY
             </div>
           </motion.div>
          )}

          {/* MONTHLY VIEW */}
          {view === 'MONTHLY' && (
            <motion.div
            key="monthly"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center h-64 border border-dashed border-white/10 rounded-2xl bg-white/5"
          >
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Macro Cycle View</p>
            <span className="text-[10px] text-blue-500 mt-2 font-mono">COMING SOON</span>
          </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}
