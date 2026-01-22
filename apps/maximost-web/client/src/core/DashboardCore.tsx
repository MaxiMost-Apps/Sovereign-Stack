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
import { Lock, Unlock, ArrowUpDown, Plus } from 'lucide-react'; // Removed Zap, Layers
import CreateHabitModal from './components/CreateHabitModal';
import ConsoleOverlay from './components/ConsoleOverlay';
import { calculateStreak } from './utils/streakLogic';
import { useToast } from './components/Toast';
import { HabitArchive } from './components/HabitArchive';
import { getApiUrl } from '../config'; 
import { Inspector } from './components/Inspector';

export default function DashboardCore() {
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  // CORE STATE (Habits Only)
  const [habits, setHabits] = useState<any[]>([]);
  const [logs, setLogs] = useState<any>(() => JSON.parse(localStorage.getItem('habit_logs_cache') || '{}'));
  const [weeklyProgress, setWeeklyProgress] = useState<any>({});
  const [loading, setLoading] = useState(false);
  
  // UI STATE
  const [viewMode, setViewMode] = useState('daily');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);
  const [initialForm, setInitialForm] = useState({});
  const [isSystemLocked, setIsSystemLocked] = useState(() => localStorage.getItem('isSystemLocked') === 'true');
  const [isSortMode, setIsSortMode] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
      localStorage.setItem('isSystemLocked', String(isSystemLocked));
  }, [isSystemLocked]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 }, disabled: !isSortMode }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 }, disabled: !isSortMode })
  );

  if (authLoading) return <div className="bg-[#0B1121] h-screen text-white flex items-center justify-center">Loading OS...</div>;

  const fetchData = async () => {
    if (!user) return;
    
    // 1. SAFE FETCH (Defensive)
    const { data: h, error: hError } = await supabase.from('habits').select('*').order('sort_order');
    const { data: l } = await supabase.from('habit_logs').select('*').eq('user_id', user.id);
    const { data: p } = await supabase.from('profiles').select('*').eq('id', user.id).maybeSingle();
    
    if (hError) console.error("Habit Fetch Error:", hError);
    setUserProfile(p);

    const rawHabits = h || []; // Crash prevention
    const rawLogs = l || [];

    const logMap: any = {};
    const weekStart = startOfWeek(new Date(), { weekStartsOn: p?.start_of_week === 'SUNDAY' ? 0 : 1 });
    const weekEnd = endOfWeek(new Date(), { weekStartsOn: p?.start_of_week === 'SUNDAY' ? 0 : 1 });
    const weeklyMap: any = {};

    rawLogs.forEach((log: any) => {
      const dateStr = log.completed_at ? log.completed_at.split('T')[0] : '';
      if (!dateStr) return;
      logMap[`${log.habit_id}_${dateStr}`] = log;
      if (isWithinInterval(new Date(dateStr), { start: weekStart, end: weekEnd }) && log.value > 0) {
          weeklyMap[log.habit_id] = (weeklyMap[log.habit_id] || 0) + 1;
      }
    });

    setLogs(logMap);
    setWeeklyProgress(weeklyMap);
    localStorage.setItem('habit_logs_cache', JSON.stringify(logMap));

    const habitsWithStreak = rawHabits.map((habit: any) => ({
       ...habit,
       streak: calculateStreak(habit, logMap)
    }));

    setHabits(habitsWithStreak.filter((x: any) => x && x.id));
  };

  useEffect(() => {
      fetchData();
      // NOTE: Removed Telemetry/Feed fetch calls to stabilize dashboard
  }, [user]);

  const handleLoadDemo = async () => {
     if (loading) return;
     setLoading(true);
     const coreSlugs = ['morning_sun', 'deep_work', 'fasted_walk', 'shadow_audit', 'digital_sunset'];
     try {
         const response = await fetch(getApiUrl('/api/habits/adopt'), {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
                 'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
             },
             body: JSON.stringify({ slugs: coreSlugs })
         });
         if (!response.ok) throw new Error('Bulk Adoption Failed');
         toast.success("Core Protocols Deployed");
         window.location.reload();
     } catch (error: any) {
         toast.error(error.message);
         setLoading(false);
     }
  };

  const handleSaveHabit = async (formData: any) => {
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
       const { data } = await supabase.from('habits').insert([finalPayload]).select().single();
       habitId = data?.id;
       toast.success("Habit Created");
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

     let newVal = 1;
     if (valOverride !== null) newVal = valOverride;
     else if (currentEntry) newVal = 0;

     const prevLogs = { ...logs };
     const newLogs = { ...logs };
     if (newVal === 0) delete newLogs[key];
     else newLogs[key] = { habit_id: habitId, completed_at: dateStr, value: newVal };

     setLogs(newLogs);
     localStorage.setItem('habit_logs_cache', JSON.stringify(newLogs));

     try {
        const payload = { habit_id: habitId, target_date: dateStr, value: newVal };
        await fetch(getApiUrl('/api/completions/toggle'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
            },
            body: JSON.stringify(payload)
        });
     } catch (error: any) {
        toast.error(`Sync Failed: ${error.message}`);
        setLogs(prevLogs);
     }
  };

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setHabits((items) => {
      const oldIndex = items.findIndex((i: any) => i.id === active.id);
      const newIndex = items.findIndex((i: any) => i.id === over.id);
      const newOrder = arrayMove(items, oldIndex, newIndex);
      const updates = newOrder.map((h: any, index: number) => ({ id: h.id, sort_order: index }));
      updates.forEach((u: any) => supabase.from('habits').update({ sort_order: u.sort_order }).eq('id', u.id).then());
      return newOrder;
    });
  };

  const handleDateChange = (amount: number) => {
     if (viewMode === 'monthly') setSelectedDate(d => amount > 0 ? addMonths(d, 1) : subMonths(d, 1));
     else {
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

  if (!habits && !loading) return <div className="bg-[#0B1121] h-screen text-white flex items-center justify-center animate-pulse">INITIALIZING NEURAL BRIDGE...</div>;

  const safeHabits = (habits || []).filter((h: any) => h && h.id && h.is_active !== false);
  const todayLabel = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
  const adjustedToday = subHours(new Date(), userProfile?.day_end_offset || 0);

  const AbsoluteHabits = safeHabits.filter((h: any) => !h.frequency_type || h.frequency_type.toLowerCase() === 'daily');
  const FrequencyHabits = safeHabits.filter((h: any) => h.frequency_type && h.frequency_type.toLowerCase() !== 'daily');

  return (
    <Inspector>
      <div className="flex flex-col gap-4 pb-[120px] relative">
        {/* HEADER */}
        <div className="flex justify-between items-center py-2">
           <div className="flex flex-col">
              <span className="text-[9px] font-black text-blue-500 uppercase tracking-[0.2em]">Mission Control</span>
              <h1 className="text-xl font-black text-white tracking-tight">{todayLabel}</h1>
           </div>
           <div className="flex gap-4 items-center">
              <div className="flex gap-2">
                 {viewMode === 'daily' && (
                     <button onClick={() => setIsSortMode(!isSortMode)} className={`p-2 rounded-lg border transition-all ${isSortMode ? 'bg-blue-600/20 border-blue-500 text-blue-400' : 'bg-gray-800 border-gray-700 text-slate-400'}`}>
                        <ArrowUpDown size={20} />
                     </button>
                 )}
                 {(viewMode === 'daily' || viewMode === 'weekly') && (
                     <button onClick={() => setIsSystemLocked(!isSystemLocked)} className={`p-2 rounded-lg border transition-all ${isSystemLocked ? 'bg-red-900/20 border-red-900 text-red-500 shadow-red-500/50' : 'bg-gray-800 border-gray-700 text-slate-400'}`}>
                       {isSystemLocked ? <Lock size={20} /> : <Unlock size={20} />}
                     </button>
                 )}
              </div>
           </div>
        </div>

        {/* --- INTEL BRIEF REMOVED FOR STABILITY --- */}

        {/* ALIGNED STICKY TOGGLES */}
        <div className="sticky top-0 z-20 flex flex-row justify-between items-center bg-[#0b0c10]/95 backdrop-blur p-2 rounded-lg border border-white/10 gap-2 mb-4 shadow-xl">
           <div className="flex gap-1">
              {['daily', 'weekly', 'monthly'].map(m => (
                 <button key={m} onClick={() => setViewMode(m)} className={`px-3 py-1.5 rounded-md uppercase text-xs font-bold tracking-wider transition-all ${viewMode === m ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}>{m}</button>
              ))}
           </div>
           <div className="flex items-center gap-2 px-2 border-l border-gray-700">
              <button onClick={() => handleDateChange(-1)} className="text-gray-400 hover:text-white p-1 hover:bg-gray-800 rounded">←</button>
              <span className="text-xs font-bold text-white min-w-[100px] text-center">{getNavText()}</span>
              <button onClick={() => handleDateChange(1)} className="text-gray-400 hover:text-white p-1 hover:bg-gray-800 rounded">→</button>
           </div>
        </div>

        {safeHabits.length === 0 && !authLoading ? (
            <div className="max-w-4xl mx-auto mt-12 px-4 text-center">
                <h2 className="text-3xl font-black text-blue-500 uppercase tracking-tighter mb-4">SYSTEM STANDBY</h2>
                <button onClick={handleLoadDemo} className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-xs uppercase tracking-widest">[ DEPLOY STARTERS ]</button>
            </div>
        ) : (
          <>
            {isSortMode ? (
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    {viewMode === 'daily' && (
                        <div className="space-y-4">
                            <SortableContext items={safeHabits} strategy={verticalListSortingStrategy}>
                                {AbsoluteHabits.map((h: any) => (
                                    <SortableHabitRow key={h.id} id={h.id} disabled={!isSortMode}>
                                        <DailyHabitRow habit={h} isSystemLocked={isSystemLocked} isSortMode={isSortMode} isCompleted={!!logs[`${h.id}_${toISODate(selectedDate)}`]} logEntry={logs[`${h.id}_${toISODate(selectedDate)}`]} onToggle={(id: string, d: any, v: any) => toggleCheck(id, selectedDate, v)} onEdit={() => handleEdit(h)} onDelete={handleDelete} />
                                    </SortableHabitRow>
                                ))}
                                {FrequencyHabits.length > 0 && <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-8 pl-1">Frequency</h3>}
                                {FrequencyHabits.map((h: any) => (
                                    <SortableHabitRow key={h.id} id={h.id} disabled={!isSortMode}>
                                        <DailyHabitRow habit={h} isSystemLocked={isSystemLocked} isSortMode={isSortMode} isCompleted={!!logs[`${h.id}_${toISODate(selectedDate)}`]} logEntry={logs[`${h.id}_${toISODate(selectedDate)}`]} onToggle={(id: string, d: any, v: any) => toggleCheck(id, selectedDate, v)} onEdit={() => handleEdit(h)} onDelete={handleDelete} />
                                    </SortableHabitRow>
                                ))}
                            </SortableContext>
                        </div>
                    )}
                </DndContext>
            ) : (
                <>
                    {viewMode === 'daily' && (
                        <div className="space-y-4">
                            {AbsoluteHabits.map((h: any) => (
                                <DailyHabitRow key={h.id} habit={h} isSystemLocked={isSystemLocked} isSortMode={isSortMode} isCompleted={!!logs[`${h.id}_${toISODate(selectedDate)}`]} logEntry={logs[`${h.id}_${toISODate(selectedDate)}`]} onToggle={(id: string, d: any, v: any) => toggleCheck(id, selectedDate, v)} onEdit={() => handleEdit(h)} onDelete={handleDelete} />
                            ))}
                            {FrequencyHabits.length > 0 && <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-8 pl-1">Frequency</h3>}
                            {FrequencyHabits.map((h: any) => (
                                <DailyHabitRow key={h.id} habit={h} isSystemLocked={isSystemLocked} isSortMode={isSortMode} isCompleted={!!logs[`${h.id}_${toISODate(selectedDate)}`]} logEntry={logs[`${h.id}_${toISODate(selectedDate)}`]} onToggle={(id: string, d: any, v: any) => toggleCheck(id, selectedDate, v)} onEdit={() => handleEdit(h)} onDelete={handleDelete} />
                            ))}
                        </div>
                    )}
                    {viewMode === 'weekly' && <WeeklyMatrix habits={safeHabits} currentDate={selectedDate} logs={logs} onToggle={toggleCheck} onEdit={handleEdit} onDelete={handleDelete} isSystemLocked={isSystemLocked} isSortMode={isSortMode} startOfWeek={0} adjustedToday={adjustedToday} />}
                    {viewMode === 'monthly' && <MonthlyCalendar habits={safeHabits} currentDate={selectedDate} logs={logs} />}
                </>
            )}

            {/* CONTROLS */}
            {viewMode === 'daily' && (
               <div className="mt-12 pt-8 border-t border-gray-800">
                   <div className="flex justify-between items-center mb-6">
                       <h2 className="text-xl font-bold text-white uppercase tracking-widest">MISSION CONTROL</h2>
                       <div className="flex items-center gap-4">
                           <button onClick={() => { setEditingHabit(null); setInitialForm({}); setIsModalOpen(true); }} className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white rounded border border-blue-500/30 text-[10px] font-bold uppercase tracking-widest transition-all">
                               <Plus className="w-3 h-3" /> Create Habit
                           </button>
                       </div>
                   </div>
               </div>
            )}
            
            {/* HABIT LIBRARY AT BOTTOM */}
            {viewMode === 'daily' && (
                <div className="mt-12 border-t border-white/5 pt-12">
                     <h2 className="text-xl font-black text-slate-700 uppercase tracking-widest mb-6 flex items-center gap-4">
                         <span className="w-2 h-2 rounded-full bg-slate-700"></span>
                         HABIT LIBRARY
                     </h2>
                     <HabitArchive />
                </div>
            )}
          </>
        )}

        {isModalOpen && (
           <ConsoleOverlay isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditingHabit(null); }} title={editingHabit ? "EDIT PROTOCOL" : "INITIALIZE PROTOCOL"}>
               <HabitForm initialData={initialForm} onSubmit={handleSaveHabit} onCancel={() => { setIsModalOpen(false); setEditingHabit(null); }} mode={editingHabit ? 'edit' : 'create'} />
           </ConsoleOverlay>
        )}
      </div>
    </Inspector>
  );
}