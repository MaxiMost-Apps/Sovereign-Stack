import { useState, useEffect } from 'react';
// ✅ CORRECTED IMPORTS (Changed ../../ to ../)
import { supabase } from '../supabase'; 
import { useAuth } from '../AuthSystem';
import { getApiUrl } from '../config';
import { calculateStreak } from '../utils/streakLogic';
import { toISODate, isFuture } from '../utils/dateUtils';
import DailyHabitRow from '../components/DailyHabitRow';
import WeeklyMatrix from '../components/WeeklyMatrix';
import MonthlyCalendar from '../components/MonthlyCalendar';
import HabitForm from '../components/HabitForm';
import CreateHabitModal from '../components/CreateHabitModal';
import ConsoleOverlay from '../components/ConsoleOverlay';
import { HabitArchive } from '../components/HabitArchive';
import { Inspector } from '../components/Inspector';
import { useToast } from '../components/Toast';
import { Lock, Unlock, ArrowUpDown, Plus } from 'lucide-react';
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor, TouchSensor } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import SortableHabitRow from '../components/SortableHabitRow';
import { startOfWeek, endOfWeek, isWithinInterval, subHours, addMonths, subMonths, addDays, subDays, format, isSameDay } from 'date-fns';

export default function DashboardCore() {
  console.log("🚀 SAFE DASHBOARD CORE LOADED - PATHS FIXED"); 
  
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();
  
  // STATE
  const [habits, setHabits] = useState<any[]>([]);
  const [logs, setLogs] = useState<any>(() => JSON.parse(localStorage.getItem('habit_logs_cache') || '{}'));
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('daily');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);
  const [initialForm, setInitialForm] = useState({});
  const [isSystemLocked, setIsSystemLocked] = useState(() => localStorage.getItem('isSystemLocked') === 'true');
  const [isSortMode, setIsSortMode] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => { localStorage.setItem('isSystemLocked', String(isSystemLocked)); }, [isSystemLocked]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 }, disabled: !isSortMode }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 }, disabled: !isSortMode })
  );

  if (authLoading) return <div className="bg-black h-screen text-white flex items-center justify-center">LOADING SAFE MODE...</div>;

  const fetchData = async () => {
    if (!user) return;
    
    // SAFE FETCH (No Telemetry)
    const { data: h } = await supabase.from('habits').select('*').order('sort_order');
    const { data: l } = await supabase.from('habit_logs').select('*').eq('user_id', user.id);
    const { data: p } = await supabase.from('profiles').select('*').eq('id', user.id).maybeSingle();
    setUserProfile(p);

    const rawHabits = h || [];
    const rawLogs = l || [];

    const logMap: any = {};
    rawLogs.forEach((log: any) => {
      const dateStr = log.completed_at ? log.completed_at.split('T')[0] : '';
      if (dateStr) logMap[`${log.habit_id}_${dateStr}`] = log;
    });
    setLogs(logMap);

    const habitsWithStreak = rawHabits.map((habit: any) => ({
       ...habit,
       streak: calculateStreak(habit, logMap)
    }));
    setHabits(habitsWithStreak.filter((x: any) => x && x.id));
  };

  useEffect(() => { fetchData(); }, [user]);

  // HANDLERS
  const handleEdit = (habit: any) => { setEditingHabit(habit); setInitialForm(habit); setIsModalOpen(true); };
  const handleDelete = async () => { await fetchData(); };
  
  const toggleCheck = async (habitId: string, dateInput: any, valOverride: any = null) => {
     const dateStr = typeof dateInput === 'string' ? dateInput : toISODate(dateInput);
     const key = `${habitId}_${dateStr}`;
     const currentEntry = logs[key];
     let newVal = valOverride !== null ? valOverride : (currentEntry ? 0 : 1);

     const newLogs = { ...logs };
     if (newVal === 0) delete newLogs[key];
     else newLogs[key] = { habit_id: habitId, completed_at: dateStr, value: newVal };
     setLogs(newLogs);

     await fetch(getApiUrl('/api/completions/toggle'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}` },
        body: JSON.stringify({ habit_id: habitId, target_date: dateStr, value: newVal })
     }).catch(() => toast.error("Sync Failed"));
  };

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setHabits((items) => {
      const oldIndex = items.findIndex((i: any) => i.id === active.id);
      const newIndex = items.findIndex((i: any) => i.id === over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
  };

  const handleDateChange = (amount: number) => {
     if (viewMode === 'monthly') setSelectedDate(d => amount > 0 ? addMonths(d, 1) : subMonths(d, 1));
     else setSelectedDate(d => amount > 0 ? addDays(d, viewMode === 'weekly' ? 7 : 1) : subDays(d, viewMode === 'weekly' ? 7 : 1));
  };

  const getNavText = () => {
    if (viewMode === 'weekly') return `${format(subDays(selectedDate, 3), 'MMM d')} - ${format(addDays(selectedDate, 3), 'MMM d')}`;
    if (viewMode === 'monthly') return format(selectedDate, 'MMMM yyyy');
    return isSameDay(selectedDate, new Date()) ? 'Today' : format(selectedDate, 'MMM d');
  };

  const safeHabits = habits.filter((h: any) => h && h.id && h.is_active !== false);
  const AbsoluteHabits = safeHabits.filter((h: any) => !h.frequency_type || h.frequency_type === 'daily');
  const FrequencyHabits = safeHabits.filter((h: any) => h.frequency_type && h.frequency_type !== 'daily');

  return (
    <Inspector>
      <div className="flex flex-col gap-4 pb-[120px] relative">
        <div className="flex justify-between items-center py-2">
           <h1 className="text-xl font-black text-white tracking-tight">Mission Control</h1>
           <div className="flex gap-2">
              <button onClick={() => setIsSortMode(!isSortMode)} className="p-2 bg-gray-800 rounded border border-gray-700 text-slate-400"><ArrowUpDown size={20} /></button>
              <button onClick={() => setIsSystemLocked(!isSystemLocked)} className="p-2 bg-gray-800 rounded border border-gray-700 text-slate-400">{isSystemLocked ? <Lock size={20} /> : <Unlock size={20} />}</button>
           </div>
        </div>

        {/* DATE NAV */}
        <div className="sticky top-0 z-20 flex justify-between items-center bg-[#0b0c10]/95 backdrop-blur p-2 rounded-lg border border-white/10 mb-4">
           <div className="flex gap-1">
              {['daily', 'weekly', 'monthly'].map(m => (
                 <button key={m} onClick={() => setViewMode(m)} className={`px-3 py-1 text-xs font-bold uppercase ${viewMode === m ? 'bg-blue-600 text-white' : 'text-slate-500'}`}>{m}</button>
              ))}
           </div>
           <div className="flex items-center gap-2">
              <button onClick={() => handleDateChange(-1)} className="text-white">←</button>
              <span className="text-xs font-bold text-white w-24 text-center">{getNavText()}</span>
              <button onClick={() => handleDateChange(1)} className="text-white">→</button>
           </div>
        </div>

        {/* HABIT LIST */}
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            {viewMode === 'daily' && (
                <div className="space-y-4">
                    <SortableContext items={safeHabits} strategy={verticalListSortingStrategy}>
                        {AbsoluteHabits.map((h: any) => (
                            <SortableHabitRow key={h.id} id={h.id} disabled={!isSortMode}>
                                <DailyHabitRow habit={h} isSystemLocked={isSystemLocked} isSortMode={isSortMode} isCompleted={!!logs[`${h.id}_${toISODate(selectedDate)}`]} logEntry={logs[`${h.id}_${toISODate(selectedDate)}`]} onToggle={(id: string, d: any, v: any) => toggleCheck(id, selectedDate, v)} onEdit={() => handleEdit(h)} onDelete={handleDelete} />
                            </SortableHabitRow>
                        ))}
                         {FrequencyHabits.length > 0 && <h3 className="text-xs font-bold text-gray-500 uppercase mt-4">Frequency</h3>}
                        {FrequencyHabits.map((h: any) => (
                            <SortableHabitRow key={h.id} id={h.id} disabled={!isSortMode}>
                                <DailyHabitRow habit={h} isSystemLocked={isSystemLocked} isSortMode={isSortMode} isCompleted={!!logs[`${