import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { supabase } from './supabase';
import { useAuth } from './AuthSystem';
import { addDays, subDays, format, isSameDay, addMonths, subMonths, subHours, startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';
import { toISODate, isFuture } from './utils/dateUtils';
import WeeklyMatrix from './components/WeeklyMatrix';
import MonthlyCalendar from './components/MonthlyCalendar';
import DailyHabitRow from './components/DailyHabitRow';
import HabitForm from './components/HabitForm';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor, TouchSensor } from '@dnd-kit/core';
import SortableHabitRow from './components/SortableHabitRow';
import { Settings, Lock, Unlock, Zap, Layers, Plus, ArrowUpDown, Shield, Target } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { getThemeStyles } from './config/themeConfig';
import { DEMO_HABITS } from './config/demoData';
import CreateHabitModal from './components/CreateHabitModal';
import ConsoleOverlay from './components/ConsoleOverlay';
import { calculateStreak } from './utils/streakLogic';
import { useToast } from './components/Toast';
import { HabitCard } from './components/HabitCard'; // Import new HabitCard
import { HabitArchive } from './components/HabitArchive'; // Import new HabitArchive
import { CouncilGhost } from '@/features/ghost/CouncilGhost';
import { AscensionOverlay } from '@/components/AscensionOverlay';

export default function DashboardCore() {
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [habits, setHabits] = useState<any[]>([]);
  const [logs, setLogs] = useState<any>(() => JSON.parse(localStorage.getItem('habit_logs_cache') || '{}'));
  const [weeklyProgress, setWeeklyProgress] = useState<any>({});
  const [decommissionedRigs, setDecommissionedRigs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('daily');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);
  const [initialForm, setInitialForm] = useState({});
  const [isSystemLocked, setIsSystemLocked] = useState(() => localStorage.getItem('isSystemLocked') === 'true');
  const [isSortMode, setIsSortMode] = useState(false); // Phase 2: Sort Mode Toggle
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
      localStorage.setItem('isSystemLocked', String(isSystemLocked));
  }, [isSystemLocked]);

  // DRAG SENSORS (Only active in Sort Mode to prevent Ghost Dragging)
  const sensors = useSensors(
    useSensor(PointerSensor, {
        activationConstraint: { distance: 8 },
        disabled: !isSortMode
    }),
    useSensor(TouchSensor, {
        activationConstraint: { delay: 250, tolerance: 5 },
        disabled: !isSortMode
    })
  );

  // 1.1 Loading Gate
  if (authLoading) return <div className="bg-[#0B1121] h-screen text-white flex items-center justify-center">Loading OS...</div>;

  const fetchData = async () => {
    if (!user) return;
    const { data: h } = await supabase.from('habits').select('*').order('sort_order');
    const { data: l } = await supabase.from('habit_logs').select('*').eq('user_id', user.id);

    // Fetch Profile for Settings
    const { data: p } = await supabase.from('profiles').select('*').eq('id', user.id).single();
    setUserProfile(p);

    const logMap: any = {};
    const weekStart = startOfWeek(new Date(), { weekStartsOn: userProfile?.start_of_week === 'SUNDAY' ? 0 : 1 });
    const weekEnd = endOfWeek(new Date(), { weekStartsOn: userProfile?.start_of_week === 'SUNDAY' ? 0 : 1 });
    const weeklyMap: any = {};

    l?.forEach((log: any) => {
      const dateStr = log.completed_at;
      logMap[`${log.habit_id}_${dateStr}`] = log;

      // Weekly Calculation
      if (isWithinInterval(new Date(dateStr), { start: weekStart, end: weekEnd }) && log.value > 0) {
          weeklyMap[log.habit_id] = (weeklyMap[log.habit_id] || 0) + 1; // Count days (or value?) - For frequency, usually count *sessions* (days done)
      }
    });

    setLogs(logMap);
    setWeeklyProgress(weeklyMap);
    localStorage.setItem('habit_logs_cache', JSON.stringify(logMap));

    const habitsWithStreak = (h || []).map((habit: any) => ({
       ...habit,
       streak: calculateStreak(habit, logMap)
    }));

    // Split Active vs Inactive
    setHabits(habitsWithStreak.filter((x: any) => x && x.id && x.is_active !== false));
    setDecommissionedRigs(habitsWithStreak.filter((x: any) => x && x.id && x.is_active === false));
  };

  useEffect(() => { fetchData(); }, [user]);

  const handleLoadDemo = async () => {
     setLoading(true);

     // REPAIR ORDER: Bulk Adoption of 5 Core Habits
     // 1. Morning Sun (morning_sun)
     // 2. Deep Work (deep_work)
     // 3. Fasted Walk (fasted_walk) - Replacing Cardio for core stack
     // 4. Shadow Audit (shadow_audit)
     // 5. Digital Sunset (digital_sunset)
     const coreSlugs = ['morning_sun', 'deep_work', 'fasted_walk', 'shadow_audit', 'digital_sunset'];

     try {
         const response = await fetch('https://sovereign-stack.onrender.com/api/habits/adopt', {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ slugs: coreSlugs })
         });

         if (!response.ok) throw new Error('Bulk Adoption Failed');

         toast.success("Core Protocols Deployed");
         fetchData(); // Refresh UI
     } catch (error: any) {
         toast.error(error.message);
     } finally {
         setLoading(false);
     }
  };

  const handleDeployReserve = async (habit: any) => {
      // Simple toggle to active state
      const { error } = await supabase.from('habits').update({ is_active: true }).eq('id', habit.id);

      if (error) {
          toast.error("Failed to deploy: " + error.message);
          return;
      }

      toast.success("Protocol Deployed");
      fetchData();
  };

  const handleSaveHabit = async (formData: any) => {
    // FIX: Explicitly strip IDs and Metadata
    const { addJournal, journalNote, id, created_at, user_id, ...cleanData } = formData;

    const finalPayload = {
      ...cleanData,
      user_id: user.id,
      target_count: parseInt(cleanData.target_count) || 3,
      daily_goal: parseInt(cleanData.daily_goal) || 1,
    };

    let habitId = editingHabit?.id;

    if (habitId) {
       await supabase.from('habits').update(finalPayload).eq('id', habitId);
       toast.success("Habit Updated");
    } else {
       // Insert New
       const { data, error } = await supabase.from('habits').insert([finalPayload]).select().single();
       if (error) { toast.error("Error: " + error.message); return; }
       habitId = data?.id;
       toast.success("Habit Created");
    }

    if (addJournal && habitId) {
       const todayStr = format(new Date(), 'yyyy-MM-dd');

       // 1. Fetch existing journal entry for today to append
       const { data: existingJournal } = await supabase
          .from('journal_entries')
          .select('system_log') // Only need system_log for appending
          .eq('user_id', user.id)
          .eq('date', todayStr)
          .maybeSingle();

       // 2. Construct the "Identity Shift" log message
       const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
       const newLogLine = `[${timestamp}] ⚠️ PROTOCOL INITIATION: I have committed to [${finalPayload.title}] starting today. Identity Shift initialized.`;

       const currentLogs = existingJournal?.system_log || '';
       const updatedSystemLog = currentLogs ? `${currentLogs}\n${newLogLine}` : newLogLine;

       // 3. Upsert into journal_entries (system_log column)
       await supabase.from('journal_entries').upsert({
          user_id: user.id,
          date: todayStr,
          system_log: updatedSystemLog
       }, { onConflict: 'user_id, date' });
    }

    setIsModalOpen(false);
    setEditingHabit(null);
    fetchData();
  };

  const handleEdit = (habit: any) => {
    setEditingHabit(habit);
    setInitialForm(habit);
    setIsModalOpen(true);
  };

  const handleDelete = async () => { await fetchData(); };

  const toggleCheck = async (habitId: string, dateInput: any, valOverride: any = null) => {
     const dateStr = typeof dateInput === 'string' ? dateInput : toISODate(dateInput);
     const key = `${habitId}_${dateStr}`;
     const currentEntry = logs[key];

     // 1. Calculate New State
     let newVal = 1;
     if (valOverride !== null) newVal = valOverride;
     else if (currentEntry) newVal = 0;

     // 2. Snapshot Previous State (for Rollback)
     const prevLogs = { ...logs };

     // 3. Optimistic Update
     const newLogs = { ...logs };
     if (newVal === 0) delete newLogs[key];
     else newLogs[key] = { habit_id: habitId, completed_at: dateStr, value: newVal };

     setLogs(newLogs);
     localStorage.setItem('habit_logs_cache', JSON.stringify(newLogs));

     // PERSISTENCE: Unified API Logic
     try {
        const payload = {
            habit_id: habitId,
            target_date: dateStr,
            value: newVal // Send explicit value (0 = delete, 1 = completed)
        };

        const response = await fetch('/api/completions/toggle', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error('API Toggle Failed');

        // Success - Visual Spark handled by UI component based on state change

     } catch (error: any) {
        console.error("Persistence Failure:", error.message);
        toast.error(`Sync Failed: ${error.message}`);
        // Rollback
        setLogs(prevLogs);
        localStorage.setItem('habit_logs_cache', JSON.stringify(prevLogs));
     }
  };

  const handleLibraryClick = (template: any) => {
    // REPAIR ORDER: This opens the slide-in drawer for "Deep Edits"
    // We reuse the existing modal logic but pre-fill from template
    setEditingHabit(null); // It's a new habit based on template
    setInitialForm({
      title: template.title,
      icon: template.icon,
      color: template.theme || template.color || 'maximost_blue',
      frequency_type: template.type === 'absolute' ? 'absolute' : 'frequency',
      target_count: template.target_value || 3,
      daily_goal: 1,
      unit: template.unit || '',
      how_instruction: template.metadata?.compiler?.step || '',
      why_instruction: template.metadata?.compiler?.why || '',
      category: template.category || ''
    });
    setIsModalOpen(true);
  };

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setHabits((items) => {
      const oldIndex = items.findIndex((i: any) => i.id === active.id);
      const newIndex = items.findIndex((i: any) => i.id === over.id);
      const newOrder = arrayMove(items, oldIndex, newIndex);

      // 2. Save to DB (Async Batch Logic)
      const updates = newOrder.map((h: any, index: number) => ({ id: h.id, sort_order: index }));
      updates.forEach((u: any) => {
          supabase.from('habits').update({ sort_order: u.sort_order }).eq('id', u.id).then();
      });

      return newOrder;
    });
  };

  // Date Nav Logic
  const handleDateChange = (amount: number) => {
     if (viewMode === 'monthly') {
        setSelectedDate(d => amount > 0 ? addMonths(d, 1) : subMonths(d, 1));
     } else {
        const jump = viewMode === 'weekly' ? 7 : 1;
        setSelectedDate(d => amount > 0 ? addDays(d, jump) : subDays(d, jump));
     }
  };

  const getNavText = () => {
    if (viewMode === 'weekly') {
       const start = subDays(selectedDate, 3);
       const end = addDays(selectedDate, 3);
       return `${format(start, 'MMM d')} - ${format(end, 'MMM d')}`;
    }
    if (viewMode === 'monthly') return format(selectedDate, 'MMMM yyyy');
    return isSameDay(selectedDate, new Date()) ? 'Today' : format(selectedDate, 'MMM d');
  };

  // 1.1 Guard Clause: Wait for habits to load to prevent crashes
  if (!habits && !loading) return <div className="bg-[#0B1121] h-screen text-white flex items-center justify-center animate-pulse">INITIALIZING NEURAL BRIDGE...</div>;

  const safeHabits = (habits || []).filter((h: any) => h && h.id);

  const todayLabel = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  const startOfWeekVal = (userProfile?.start_of_week === 'SUNDAY') ? 0 : 1;
  const dayOffsetVal = userProfile?.day_end_offset || 0;
  const adjustedToday = subHours(new Date(), dayOffsetVal);

  const AbsoluteHabits = safeHabits.filter((h: any) =>
      !h.frequency_type ||
      h.frequency_type.toLowerCase() === 'daily' ||
      h.frequency_type.toLowerCase() === 'absolute'
  );

  const FrequencyHabits = safeHabits.filter((h: any) =>
      h.frequency_type &&
      h.frequency_type.toLowerCase() !== 'daily' &&
      h.frequency_type.toLowerCase() !== 'absolute'
  );

  return (

      <div className="flex flex-col gap-6 pb-20 relative">
        {/* HEADER */}
        <div className="flex justify-between items-center">
           <div className="flex flex-col">
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] mb-1">Today's Mission</span>
              <h1 className="text-2xl font-black text-white tracking-tight">{todayLabel}</h1>
           </div>
           <div className="flex gap-4 items-center">
              <div className="flex gap-2">
                 {/* SORT TOGGLE: Daily Only */}
                 {viewMode === 'daily' && (
                     <button
                        onClick={() => {
                            // Mobile Centering Fix: Preserve Scroll
                            const scrollY = window.scrollY;
                            setIsSortMode(!isSortMode);
                            requestAnimationFrame(() => window.scrollTo(0, scrollY));
                        }}
                        className={`p-2 rounded-lg border transition-all ${isSortMode ? 'bg-blue-600/20 border-blue-500 text-blue-400' : 'bg-gray-800 border-gray-700 text-slate-400'}`}
                        title="Toggle Sort Mode"
                        disabled={isSystemLocked}
                     >
                        <ArrowUpDown size={20} />
                     </button>
                 )}
                 {/* LOCK TOGGLE: Daily AND Weekly */}
                 {(viewMode === 'daily' || viewMode === 'weekly') && (
                     <button
                        onClick={() => setIsSystemLocked(!isSystemLocked)}
                        className={`p-2 rounded-lg border transition-all ${isSystemLocked ? 'bg-red-900/20 border-red-900 text-red-500 shadow-red-500/50' : 'bg-gray-800 border-gray-700 text-slate-400'}`}
                        title={isSystemLocked ? "COMBAT MODE (Locked)" : "ARCHITECT MODE (Unlocked)"}
                     >
                       {isSystemLocked ? <Lock size={20} /> : <Unlock size={20} />}
                     </button>
                 )}
              </div>
           </div>
        </div>


        <div className="flex flex-col md:flex-row justify-between items-center bg-[#0b0c10] p-1 rounded-lg border border-white/10 gap-4 md:gap-0">
           <div className="flex gap-1 w-full md:w-auto">
              {['daily', 'weekly', 'monthly'].map(m => (
                 <button key={m} onClick={() => setViewMode(m)} className={`w-24 py-1.5 rounded-md uppercase text-xs font-bold tracking-wider transition-all ${viewMode === m ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}>{m}</button>
              ))}
           </div>
           <div className="flex items-center gap-4 px-4 border-l border-gray-700 w-full md:w-auto justify-between md:justify-end">
              <button onClick={() => handleDateChange(-1)} className="text-gray-400 hover:text-white p-2 hover:bg-gray-800 rounded-lg">←</button>
              <span className="text-sm font-bold text-white min-w-[150px] text-center">{getNavText()}</span>
              <button onClick={() => handleDateChange(1)} className="text-gray-400 hover:text-white p-2 hover:bg-gray-800 rounded-lg">→</button>
           </div>
        </div>

        {safeHabits.length === 0 && !authLoading ? (
            <div className="max-w-4xl mx-auto mt-12 px-4">

                <div className="text-center mb-12">
                    <h2 className="text-3xl font-black text-blue-500 uppercase tracking-tighter mb-4">SYSTEM STANDBY</h2>
                    <p className="text-slate-400">Awaiting Operator Input. Initialize Protocol.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">

                    {/* OPTION 1: THE GOLDEN SET (Quick Start) */}
                    <div className="bg-[#0b0c10] border border-white/10 p-8 rounded-2xl hover:border-blue-500/50 transition-all group relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Zap className="w-24 h-24 text-blue-500" />
                        </div>
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6">
                                <Zap className="w-6 h-6 text-blue-400" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Quick Start - 5 Starters</h3>
                            <p className="text-xs text-slate-400 leading-relaxed mb-6 max-w-[240px]">
                                Deploys 5 starter habits to your Dashboard. These can be edited or deleted at any point.
                            </p>
                            <button
                                onClick={handleLoadDemo}
                                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-xs uppercase tracking-widest transition-all hover:shadow-[0_0_15px_rgba(37,99,235,0.5)] border border-transparent hover:border-blue-400"
                            >
                                [ DEPLOY STARTERS ]
                            </button>
                        </div>
                    </div>

                    {/* OPTION 2: PROTOCOLS (Stacks) */}
                    <div className="bg-[#0b0c10] border border-white/10 p-8 rounded-2xl hover:border-emerald-500/50 transition-all group relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Layers className="w-24 h-24 text-emerald-500" />
                        </div>
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-6">
                                <Layers className="w-6 h-6 text-emerald-400" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Specialized Stacks</h3>
                            <p className="text-xs text-slate-400 leading-relaxed mb-6 max-w-[240px]">
                                Browse systems from Huberman, Jocko, and Goggins. Tailored for specific outcomes.
                            </p>
                            <button
                                onClick={() => navigate('/archive?tab=protocols')} // REPAIR ORDER: Direct Link
                                className="w-full py-3 bg-emerald-600/10 border border-emerald-500/50 text-emerald-400 hover:bg-emerald-600 hover:text-white rounded-lg font-bold text-xs uppercase tracking-widest transition-all hover:shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                            >
                                [ BROWSE STACKS ]
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        ) : (
          <>
            {/* CONDITIONAL RENDER: Split Logic for Sort Mode Stability */}
            {isSortMode ? (
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    {viewMode === 'daily' && (
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-4 pl-1">Absolute Habits</h3>
                            <SortableContext items={safeHabits} strategy={verticalListSortingStrategy}>
                                {AbsoluteHabits.map((h: any) => (
                                    <SortableHabitRow key={h.id} id={h.id} disabled={!isSortMode}>
                                        <DailyHabitRow
                                            habit={h} isSystemLocked={isSystemLocked}
                                            isSortMode={isSortMode}
                                            isCompleted={!!logs[`${h.id}_${toISODate(selectedDate)}`]}
                                            logEntry={logs[`${h.id}_${toISODate(selectedDate)}`]}
                                            allLogs={logs}
                                            date={toISODate(selectedDate)}
                                            isFuture={isFuture(toISODate(selectedDate))}
                                            weeklyProgress={weeklyProgress[h.id] || 0}
                                            onToggle={(id: string, d: any, v: any) => toggleCheck(id, selectedDate, v)}
                                            onEdit={() => handleEdit(h)} onDelete={handleDelete}
                                        />
                                    </SortableHabitRow>
                                ))}
                            </SortableContext>

                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-8 pl-1">Frequency Habits</h3>
                            <SortableContext items={safeHabits} strategy={verticalListSortingStrategy}>
                                {FrequencyHabits.map((h: any) => (
                                    <SortableHabitRow key={h.id} id={h.id} disabled={!isSortMode}>
                                        <DailyHabitRow
                                            habit={h} isSystemLocked={isSystemLocked}
                                            isSortMode={isSortMode}
                                            isCompleted={!!logs[`${h.id}_${toISODate(selectedDate)}`]}
                                            logEntry={logs[`${h.id}_${toISODate(selectedDate)}`]}
                                            allLogs={logs}
                                            date={toISODate(selectedDate)}
                                            isFuture={isFuture(toISODate(selectedDate))}
                                            onToggle={(id: string, d: any, v: any) => toggleCheck(id, selectedDate, v)}
                                            onEdit={() => handleEdit(h)} onDelete={handleDelete}
                                        />
                                    </SortableHabitRow>
                                ))}
                            </SortableContext>
                        </div>
                    )}

                    {/* Weekly Matrix needs DndContext to be present if it supports DnD, but it's not sortable usually */}
                    {/* However, since DndContext wraps everything, it's fine. */}
                    {viewMode === 'weekly' && (
                        <div className="relative">
                             {/* GARNISH PROTOCOL: Blur for Initiates - REMOVED GATING */}
                             <WeeklyMatrix
                               habits={safeHabits} currentDate={selectedDate} logs={logs}
                               onToggle={toggleCheck} onEdit={handleEdit} onDelete={handleDelete}
                               isSystemLocked={isSystemLocked}
                               isSortMode={isSortMode}
                               startOfWeek={startOfWeekVal}
                               adjustedToday={adjustedToday}
                             />
                        </div>
                    )}
                     {viewMode === 'monthly' && (
                        <div className="relative">
                             {/* GARNISH PROTOCOL: Blur for Initiates - REMOVED GATING */}
                             <MonthlyCalendar habits={safeHabits} currentDate={selectedDate} logs={logs} />
                        </div>
                     )}
                </DndContext>
            ) : (
                /* STATIC MODE: Direct Render without DnD Context (Prevents "DragHandle in uninitialized Draggable" crash) */
                <>
                    {viewMode === 'daily' && (
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-4 pl-1">Absolute Habits</h3>
                            {AbsoluteHabits.map((h: any) => (
                                <DailyHabitRow
                                    key={h.id}
                                    habit={h} isSystemLocked={isSystemLocked}
                                    isSortMode={isSortMode} // false
                                    isCompleted={!!logs[`${h.id}_${toISODate(selectedDate)}`]}
                                    logEntry={logs[`${h.id}_${toISODate(selectedDate)}`]}
                                    allLogs={logs}
                                    date={toISODate(selectedDate)}
                                    isFuture={isFuture(toISODate(selectedDate))}
                                    onToggle={(id: string, d: any, v: any) => toggleCheck(id, selectedDate, v)}
                                    onEdit={() => handleEdit(h)} onDelete={handleDelete}
                                />
                            ))}

                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-8 pl-1">Frequency Habits</h3>
                            {FrequencyHabits.map((h: any) => (
                                <DailyHabitRow
                                    key={h.id}
                                    habit={h} isSystemLocked={isSystemLocked}
                                    isSortMode={isSortMode} // false
                                    isCompleted={!!logs[`${h.id}_${toISODate(selectedDate)}`]}
                                    logEntry={logs[`${h.id}_${toISODate(selectedDate)}`]}
                                    allLogs={logs}
                                    date={toISODate(selectedDate)}
                                    isFuture={isFuture(toISODate(selectedDate))}
                                    onToggle={(id: string, d: any, v: any) => toggleCheck(id, selectedDate, v)}
                                    onEdit={() => handleEdit(h)} onDelete={handleDelete}
                                />
                            ))}
                        </div>
                    )}

                    {viewMode === 'weekly' && (
                        <div className="relative">
                             {/* GARNISH PROTOCOL: Blur for Initiates - REMOVED GATING */}
                             <WeeklyMatrix
                               habits={safeHabits} currentDate={selectedDate} logs={logs}
                               onToggle={toggleCheck} onEdit={handleEdit} onDelete={handleDelete}
                               isSystemLocked={isSystemLocked}
                               isSortMode={isSortMode}
                               startOfWeek={startOfWeekVal}
                               adjustedToday={adjustedToday}
                             />
                        </div>
                    )}
                     {viewMode === 'monthly' && (
                        <div className="relative">
                             {/* GARNISH PROTOCOL: Blur for Initiates - REMOVED GATING */}
                             <MonthlyCalendar habits={safeHabits} currentDate={selectedDate} logs={logs} />
                        </div>
                     )}
                </>
            )}

            {viewMode === 'daily' && (
               <div className="w-full flex justify-center py-6">
                 <button
                   onClick={() => setIsModalOpen(true)}
                   className="flex items-center gap-2 px-6 py-3 border border-slate-700 hover:border-blue-500 rounded-lg text-slate-400 hover:text-blue-400 transition-all text-sm font-bold tracking-widest uppercase bg-slate-900/50"
                 >
                   <Plus className="w-4 h-4" />
                   <span>Initialize New Habit</span>
                 </button>
               </div>
            )}
          </>
        )}

        {/* HABIT RESERVES SECTION (Moved from LibraryPage) */}
        {viewMode === 'daily' && decommissionedRigs.length > 0 && (
            <div className="mt-12 border-t border-white/5 pt-12">
                <h2 className="text-xl font-black text-slate-700 uppercase tracking-widest mb-6 flex items-center gap-4">
                    <span className="w-2 h-2 rounded-full bg-slate-700"></span>
                    RESERVE ROSTER
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {decommissionedRigs.map((h) => {
                         const theme = getThemeStyles(h.metadata?.visuals?.theme ?? h.color);
                         const iconName = h.metadata?.visuals?.icon ?? h.icon ?? 'Activity';
                         const Icon = (LucideIcons as any)[iconName] || LucideIcons.Activity;
                         return (
                             <div
                                key={h.id}
                                onClick={() => handleEdit(h)}
                                className="p-4 bg-black border border-white/5 rounded-lg flex items-center justify-between group opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all cursor-pointer hover:border-blue-500/30"
                             >
                                 <div className="flex items-center gap-3">
                                     <div className={`w-8 h-8 rounded flex items-center justify-center bg-white/5 text-slate-500`}>
                                         <Icon className="w-4 h-4" />
                                     </div>
                                     <span className="text-sm font-bold text-slate-500 group-hover:text-white transition-colors">
                                         {h.title}
                                     </span>
                                 </div>
                                 <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeployReserve(h);
                                    }}
                                    className="text-[10px] font-bold uppercase text-slate-600 border border-slate-800 px-2 py-1 rounded group-hover:border-blue-500 group-hover:text-blue-400 transition-all"
                                 >
                                     Deploy
                                 </button>
                             </div>
                         );
                    })}
                </div>
            </div>
        )}

        {viewMode === 'daily' && (
           <div className="mt-12 pt-8 border-t border-gray-800">
               {/* REPLACED: Old direct fetch rendering with new HabitArchive component */}
               <HabitArchive
                    onImport={(habit) => handleLibraryClick(habit)} // REPAIR ORDER: Opens slide-in edit
                    userHabits={safeHabits}
                    onEdit={(habit) => handleLibraryClick(habit)} // Dual bind for clarity
               />
           </div>
        )}

        {isModalOpen && (
           <ConsoleOverlay
             isOpen={isModalOpen}
             onClose={() => setIsModalOpen(false)}
             title={editingHabit ? "EDIT PROTOCOL" : "INITIALIZE PROTOCOL"}
           >
               <HabitForm
                   initialData={initialForm}
                   onSubmit={handleSaveHabit}
                   onCancel={() => setIsModalOpen(false)}
                   mode={editingHabit ? 'edit' : 'create'}
               />
           </ConsoleOverlay>
        )}

      </div>

  );
}
