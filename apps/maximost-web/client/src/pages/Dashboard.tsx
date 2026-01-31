import React, { useState, useEffect } from 'react';
import { Lock, Unlock, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addDays, startOfWeek, endOfWeek, isSameDay, subDays } from 'date-fns';
import { supabase } from '@/services/supabase';
import { DailyHabitRow } from '@/components/habits/DailyHabitRow';
import { WeeklyHabitMatrix } from '@/components/habits/WeeklyHabitMatrix';
import { EditHabitPanel } from '@/components/habits/EditHabitPanel';
import { motion, AnimatePresence } from 'framer-motion';

export default function Dashboard() {
  const [view, setView] = useState<'DAILY' | 'WEEKLY' | 'MONTHLY'>('DAILY');
  const [isLocked, setIsLocked] = useState(() => {
    const saved = localStorage.getItem('dashboard_locked');
    return saved ? JSON.parse(saved) : true;
  });

  // State for Preferences & Date
  const [resetOffset, setResetOffset] = useState(4); // Default 4 AM
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date()); // Initial placeholder
  const [isDateInitialized, setIsDateInitialized] = useState(false);

  const [habits, setHabits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingHabit, setEditingHabit] = useState<any>(null);

  // Persistence for Lock State
  useEffect(() => {
    localStorage.setItem('dashboard_locked', JSON.stringify(isLocked));
  }, [isLocked]);

  // Load Preferences & Initialize "Operational Date"
  useEffect(() => {
    const init = async () => {
        let offset = 4; // Default
        let anim = true;

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data } = await supabase
                    .from('user_preferences')
                    .select('settings')
                    .eq('user_id', user.id)
                    .maybeSingle();

                if (data?.settings) {
                    if (typeof data.settings.reset_time === 'number') offset = data.settings.reset_time;
                    if (typeof data.settings.animations === 'boolean') anim = data.settings.animations;
                }
            }
        } catch (e) {
            console.warn('Prefs load error', e);
        }

        setResetOffset(offset);
        setAnimationsEnabled(anim);

        // Calculate Sovereign Clock
        const now = new Date();
        const hour = now.getHours();
        if (hour < offset) {
            setSelectedDate(subDays(now, 1));
        } else {
            setSelectedDate(now);
        }
        setIsDateInitialized(true);
    };

    init();
  }, []);

  // Data Fetching (Only after date is ready)
  useEffect(() => {
    if (isDateInitialized) fetchHabits();
  }, [isDateInitialized, selectedDate]); // Refetch when date changes

  async function fetchHabits() {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      const userId = user?.id || '00000000-0000-0000-0000-000000000000';

      // QUERY FIX: Explicitly select habit_id
      const { data, error } = await supabase
        .from('habits')
        .select(`*, habit_id, habit_logs(date, status, value)`)
        .eq('user_id', userId)
        .order('created_at', { ascending: true });

      if (error) throw error;

      // Map to standardize ID usage
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
      const d = new Date(selectedDate);
      d.setMonth(d.getMonth() + amount);
      setSelectedDate(d);
    }
  };

  const getContextLabel = () => {
    if (view === 'DAILY') {
      // Format: < Saturday, Jan 31 >
      return format(selectedDate, 'EEEE, MMM d');
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

  const toggleHabit = async (habitId: string, date?: number) => {
    const targetDate = date ? new Date(date) : selectedDate;
    const dateStr = format(targetDate, 'yyyy-MM-dd');

    // 1. Optimistic Update
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

    // 2. Supabase Update
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const existingLog = habits.find(h => h.id === habitId)?.habit_logs?.find((l: any) => l.date === dateStr);
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

  if (!isDateInitialized) return <div className="min-h-screen bg-[#020408]" />; // Flash preventer

  return (
    <div className="min-h-screen bg-[#020408] pb-20 font-sans text-white relative overscroll-contain">
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-[#0A0F1C]/95 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/50">

        {/* Row 1: Lock & Tabs */}
        <div className="flex items-center justify-between p-3">
           <button onClick={() => setIsLocked(!isLocked)} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
            {isLocked ? <Lock size={18} className="text-slate-500" /> : <Unlock size={18} className="text-amber-500" />}
           </button>

           <div className="flex bg-[#020408] rounded-lg p-0.5 border border-white/10">
              {['DAILY', 'WEEKLY', 'MONTHLY'].map(t => (
                <button
                  key={t}
                  onClick={() => setView(t as any)}
                  className={`px-4 py-1.5 text-[10px] font-bold rounded-md transition-all uppercase tracking-wider ${view === t ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                >
                  {t}
                </button>
              ))}
           </div>

           <div className="w-8" />
        </div>

        {/* Row 2: Date Navigator (One-Line) */}
        <div className="px-3 pb-3">
           <div className="flex items-center justify-between bg-[#020408] border border-white/5 rounded-xl p-2">
              <button onClick={() => changeDate(-1)} className="p-2 text-slate-500 hover:text-white hover:bg-white/5 rounded-lg"><ChevronLeft size={16}/></button>
              <span className="text-xs font-mono font-bold text-blue-400 tracking-[0.2em] uppercase">
                {getContextLabel()}
              </span>
              <button onClick={() => changeDate(1)} className="p-2 text-slate-500 hover:text-white hover:bg-white/5 rounded-lg"><ChevronRight size={16}/></button>
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
              transition={{ duration: animationsEnabled ? 0.2 : 0 }} // Performance Mode check
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
                    animationsEnabled={animationsEnabled}
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
                     animationsEnabled={animationsEnabled}
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
             initial={{ opacity: 0, x: 10 }}
             animate={{ opacity: 1, x: 0 }}
             exit={{ opacity: 0, x: -10 }}
             transition={{ duration: animationsEnabled ? 0.2 : 0 }}
           >
             <WeeklyHabitMatrix habits={habits} selectedDate={selectedDate} animationsEnabled={animationsEnabled} />
           </motion.div>
          )}

          {/* MONTHLY VIEW */}
          {view === 'MONTHLY' && (
            <motion.div
            key="monthly"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: animationsEnabled ? 0.2 : 0 }}
            className="flex flex-col items-center justify-center space-y-4"
          >
             <div className="w-full bg-[#0A0F1C] border border-white/5 rounded-2xl p-6 min-h-[300px] flex items-center justify-center">
                 <div className="text-center space-y-2">
                    <div className="grid grid-cols-7 gap-2 opacity-30">
                        {Array.from({length: 28}).map((_, i) => (
                            <div key={i} className={`w-3 h-3 rounded-full ${i % 5 === 0 ? 'bg-blue-500' : 'bg-white/10'}`} />
                        ))}
                    </div>
                    <p className="text-[10px] text-slate-500 font-mono mt-4">MACRO CYCLE DENSITY</p>
                 </div>
             </div>
          </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* EDIT SLIDE-IN */}
      <EditHabitPanel
        habit={editingHabit}
        isOpen={!!editingHabit}
        onClose={() => setEditingHabit(null)}
        onSave={() => {
          fetchHabits();
          setEditingHabit(null);
        }}
        animationsEnabled={animationsEnabled}
      />

    </div>
  );
}
