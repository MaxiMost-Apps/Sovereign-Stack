import React, { useState, useEffect } from 'react';
import { Lock, Unlock, ChevronLeft, ChevronRight, Activity } from 'lucide-react';
import { format, addDays, startOfWeek, endOfWeek, isSameDay } from 'date-fns';
import { supabase } from '@/services/supabase';
import { DailyHabitRow } from '@/components/habits/DailyHabitRow';
import { WeeklyHabitMatrix } from '@/components/habits/WeeklyHabitMatrix';
import { HabitEditSheet } from '@/components/habits/HabitEditSheet';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
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
  const [editingHabit, setEditingHabit] = useState<any>(null);

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
      const userId = user?.id || '00000000-0000-0000-0000-000000000000';

      const { data, error } = await supabase
        .from('habits')
        .select(`*, habit_logs(date, status, value)`)
        .eq('user_id', userId)
        .order('created_at', { ascending: true });

      if (error) throw error;

      const transformed = (data || []).map(h => ({
        ...h,
        id: h.habit_id || h.id,
      }));

      setHabits(transformed);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  }

  const changeDate = (amount: number) => {
    if (view === 'DAILY') {
      setSelectedDate(addDays(selectedDate, amount));
    } else if (view === 'WEEKLY') {
      setSelectedDate(addDays(selectedDate, amount * 7));
    } else if (view === 'MONTHLY') {
      // Simple month jump logic could be added here
      const d = new Date(selectedDate);
      d.setMonth(d.getMonth() + amount);
      setSelectedDate(d);
    }
  };

  const getContextLabel = () => {
    if (view === 'DAILY') {
      return isSameDay(selectedDate, new Date()) ? 'Today' : format(selectedDate, 'MMM d');
    }
    if (view === 'WEEKLY') {
      const start = startOfWeek(selectedDate, { weekStartsOn: 1 });
      const end = endOfWeek(selectedDate, { weekStartsOn: 1 });
      return `${format(start, 'MMM d')} - ${format(end, 'MMM d')}`;
    }
    if (view === 'MONTHLY') {
      return format(selectedDate, 'MMMM yyyy');
    }
    return '';
  };

  const toggleHabit = async (habitId: string, date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');

    setHabits(prev => prev.map(h => {
      if (h.id === habitId) {
        const existingLog = h.habit_logs?.find((l: any) => l.date === dateStr);
        const isCompleted = existingLog?.status === 'completed';
        const newStatus = isCompleted ? 'pending' : 'completed';

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

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const habit = habits.find(h => h.id === habitId);
      const existingLog = habit?.habit_logs?.find((l: any) => l.date === dateStr);
      const newStatus = existingLog?.status === 'completed' ? 'pending' : 'completed';

      const { error } = await supabase
        .from('habit_logs')
        .upsert({
          habit_id: habitId,
          user_id: user.id,
          date: dateStr,
          status: newStatus
        }, { onConflict: 'habit_id, date' });

      if (error) throw error;
    } catch (err) {
      console.error('Toggle failed:', err);
      fetchHabits();
    }
  };

  const absoluteHabits = habits.filter(h => h.habit_type !== 'FREQUENCY');
  const frequencyHabits = habits.filter(h => h.habit_type === 'FREQUENCY');

  const prepareForRender = (list: any[]) => list.map(h => ({
    ...h,
    completed: h.habit_logs?.some((l: any) => l.date === format(selectedDate, 'yyyy-MM-dd') && l.status === 'completed')
  }));

  return (
    <div className="min-h-screen bg-[#020408] pb-20 font-sans text-white relative">
      {/* 1. STICKY HEADER WITH UNIFIED NAV */}
      <header className="sticky top-0 z-40 bg-[#0A0F1C]/95 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/50">

        {/* Top Bar */}
        <div className="flex items-center justify-between p-4 pb-2">
           <button onClick={() => setIsLocked(!isLocked)} className="text-slate-400 p-2 hover:bg-white/5 rounded-lg transition-colors">
            {isLocked ? <Lock size={18} /> : <Unlock size={18} className="text-amber-500" />}
          </button>
          <span className="text-[10px] font-black tracking-[0.4em] text-blue-500 uppercase">Mission Control</span>
          <div className="w-9" />
        </div>

        {/* Unified Navigator */}
        <div className="px-4 pb-4">
          <div className="flex items-center bg-[#020408] rounded-xl border border-white/10 p-1">
             {/* Tab Switcher (Segmented) */}
             <div className="flex bg-[#0A0F1C] rounded-lg p-0.5 border border-white/5 mr-2">
                {['DAILY', 'WEEKLY', 'MONTHLY'].map(t => (
                  <button
                    key={t}
                    onClick={() => setView(t as any)}
                    className={`px-3 py-1.5 text-[9px] font-bold rounded-md transition-all ${view === t ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                  >
                    {t[0]}
                  </button>
                ))}
             </div>

             {/* Date Scroller */}
             <div className="flex-1 flex items-center justify-between px-2">
                <button onClick={() => changeDate(-1)} className="text-slate-500 hover:text-white"><ChevronLeft size={16}/></button>
                <span className="text-xs font-mono font-bold text-white tracking-widest uppercase truncate mx-2">
                  {getContextLabel()}
                </span>
                <button onClick={() => changeDate(1)} className="text-slate-500 hover:text-white"><ChevronRight size={16}/></button>
             </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-xl mx-auto p-4 space-y-8">
        <AnimatePresence mode="wait">

          {/* DAILY VIEW */}
          {view === 'DAILY' && (
            <motion.div
              key="daily"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              className="space-y-8"
            >
              <section className="space-y-3">
                <h2 className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] pl-1">Absolute Habits</h2>
                {prepareForRender(absoluteHabits).map(habit => (
                  <DailyHabitRow
                    key={habit.id}
                    habit={habit}
                    isLocked={isLocked}
                    date={selectedDate}
                    onToggle={toggleHabit}
                    onOpenConfig={() => setEditingHabit(habit)}
                  />
                ))}
                 {absoluteHabits.length === 0 && !loading && (
                  <div className="text-center p-8 border border-dashed border-white/10 rounded-xl">
                    <p className="text-slate-600 text-xs font-mono">NO PROTOCOLS FOUND</p>
                  </div>
                )}
              </section>

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
                     onOpenConfig={() => setEditingHabit(habit)}
                   />
                  ))}
                </section>
              )}

              {/* THE LEDGER DEPLOYMENT */}
              <section className="pt-8 border-t border-white/5">
                 <div className="flex items-center gap-2 mb-4">
                    <Activity size={14} className="text-blue-500" />
                    <h2 className="text-[10px] text-blue-500 font-bold uppercase tracking-[0.2em]">Live Ledger</h2>
                 </div>
                 <ActivityFeed limit={5} />
              </section>

            </motion.div>
          )}

          {/* WEEKLY VIEW */}
          {view === 'WEEKLY' && (
             <motion.div
             key="weekly"
             initial={{ opacity: 0, x: 10 }}
             animate={{ opacity: 1, x: 0 }}
             exit={{ opacity: 0, x: -10 }}
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

      {/* SLIDE-IN EDIT SHEET */}
      <AnimatePresence>
        {editingHabit && (
          <HabitEditSheet
            habit={editingHabit}
            onClose={() => setEditingHabit(null)}
            onSave={() => {
              fetchHabits();
              setEditingHabit(null);
            }}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
