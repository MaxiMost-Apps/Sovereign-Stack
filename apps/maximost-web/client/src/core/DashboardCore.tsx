import { useState, useEffect } from 'react';
import { supabase } from './supabase'; 
import { useAuth } from './AuthSystem';
import { getApiUrl } from '../config';
import { calculateStreak } from './utils/streakLogic';
import { toISODate } from './utils/dateUtils';
import DailyHabitRow from './components/DailyHabitRow';
import WeeklyMatrix from './components/WeeklyMatrix';
import MonthlyCalendar from './components/MonthlyCalendar';
import HabitForm from './components/HabitForm';
import ConsoleOverlay from './components/ConsoleOverlay';
import { HabitArchive } from './components/HabitArchive';
import { Inspector } from './components/Inspector';
import { useToast } from './components/Toast';
import { Lock, Unlock, ArrowUpDown, Plus } from 'lucide-react';
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor, TouchSensor } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import SortableHabitRow from './components/SortableHabitRow';
import { subHours, addMonths, subMonths, addDays, subDays, format, isSameDay } from 'date-fns';

export default function DashboardCore() {
  // ✅ VERSION CHECK: If you don't see this, the deploy failed.
  console.log("🚀 MAXIMOST GOLD STANDARD V2.0 - ACTIVE");
  
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();
  
  const [habits, setHabits] = useState<any[]>([]);
  const [logs, setLogs] = useState<any>(() => JSON.parse(localStorage.getItem('habit_logs_cache') || '{}'));
  const [viewMode, setViewMode] = useState('daily');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);
  const [initialForm, setInitialForm] = useState({});
  const [isSystemLocked, setIsSystemLocked] = useState(() => localStorage.getItem('isSystemLocked') === 'true');
  const [isSortMode, setIsSortMode] = useState(false);

  useEffect(() => { localStorage.setItem('isSystemLocked', String(isSystemLocked)); }, [isSystemLocked]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 }, disabled: !isSortMode }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 }, disabled: !isSortMode })
  );

  if (authLoading) return <div className="bg-black h-screen text-white flex items-center justify-center">LOADING...</div>;

  const fetchData = async () => {
    if (!user) return;
    const { data: h } = await supabase.from('habits').select('*').order('sort_order');
    const { data: l } = await supabase.from('habit_logs').select('*').eq('user_id', user.id);

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

     try {
        const payload = {
            habit_id: habitId,
            date: dateStr,
            value: parseInt(String(newVal))
        };
        await fetch(getApiUrl('/api/completions/toggle'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}` },
            body: JSON.stringify(payload)
        });
     } catch (error) {
        console.error("Sync Error", error);
     }
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
        <div className="flex justify-between items-center py-4">
           <h1 className="text-2xl font-black text-white tracking-tighter uppercase">Mission Control</h1>
           <div className="flex gap-2">
              <button onClick={() => setIsSortMode(!isSortMode)} className={`p-3 rounded-xl border transition-all ${isSortMode ? 'bg-blue-600 border-blue-500 text-white' : 'bg-[#1a1d24] border-white/10 text-slate-400'}`}><ArrowUpDown size={20} /></button>
              <button onClick={() => setIsSystemLocked(!isSystemLocked)} className={`p-3 rounded-xl border transition-all ${isSystemLocked ? 'bg-red-500/10 border-red-500 text-red-500' : 'bg-[#1a1d24] border-white/10 text-slate-400'}`}>{isSystemLocked ? <Lock size={20} /> : <Unlock size={20} />}</button>
           </div>
        </div>

        {/* DATE NAV */}
        <div className="sticky top-0 z-20 flex justify-between items-center bg-[#0b0c10]/95 backdrop-blur-md p-2 rounded-xl border border-white/10 mb-4 shadow-xl">
           <div className="flex gap-1 bg-black/20 p-1 rounded-lg">
              {['daily', 'weekly', 'monthly'].map(m => (
                 <button key={m} onClick={() => setViewMode(m)} className={`px-4 py-1.5 text-[10px] font-black uppercase rounded-md transition-all ${viewMode === m ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-slate-300'}`}>{m}</button>
              ))}
           </div>
           <div className="flex items-center gap-4 pr-2">
              <button onClick={() => handleDateChange(-1)} className="text-slate-400">←</button>
              <span className="text-xs font-bold text-white w-24 text-center tracking-wider">{getNavText()}</span>
              <button onClick={() => handleDateChange(1)} className="text-slate-400">→</button>
           </div>
        </div>

        {/* HABIT LIST */}
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            {viewMode === 'daily' && (
                <div className="space-y-3">
                    <SortableContext items={safeHabits} strategy={verticalListSortingStrategy}>
                        {AbsoluteHabits.map((h: any) => (
                            <SortableHabitRow key={h.id} id={h.id} disabled={!isSortMode}>
                                <DailyHabitRow habit={h} isSystemLocked={isSystemLocked} isSortMode={isSortMode} isCompleted={!!logs[`${h.id}_${toISODate(selectedDate)}`]} logEntry={logs[`${h.id}_${toISODate(selectedDate)}`]} onToggle={(id: string, d: any, v: any) => toggleCheck(id, selectedDate, v)} onEdit={() => handleEdit(h)} onDelete={handleDelete} date={toISODate(selectedDate)} isFuture={false} />
                            </SortableHabitRow>
                        ))}
                        {FrequencyHabits.length > 0 && <h3 className="text-[10px] font-bold text-slate-600 uppercase mt-6 mb-2 tracking-widest pl-2">Frequency Protocols</h3>}
                        {FrequencyHabits.map((h: any) => (
                            <SortableHabitRow key={h.id} id={h.id} disabled={!isSortMode}>
                                <DailyHabitRow habit={h} isSystemLocked={isSystemLocked} isSortMode={isSortMode} isCompleted={!!logs[`${h.id}_${toISODate(selectedDate)}`]} logEntry={logs[`${h.id}_${toISODate(selectedDate)}`]} onToggle={(id: string, d: any, v: any) => toggleCheck(id, selectedDate, v)} onEdit={() => handleEdit(h)} onDelete={handleDelete} date={toISODate(selectedDate)} isFuture={false} />
                            </SortableHabitRow>
                        ))}
                    </SortableContext>
                </div>
            )}
            {viewMode === 'weekly' && <WeeklyMatrix habits={safeHabits} currentDate={selectedDate} logs={logs} onToggle={toggleCheck} onEdit={handleEdit} onDelete={handleDelete} isSystemLocked={isSystemLocked} isSortMode={isSortMode} startOfWeek={0} adjustedToday={subHours(new Date(), 0)} />}
            {viewMode === 'monthly' && <MonthlyCalendar habits={safeHabits} currentDate={selectedDate} logs={logs} />}
        </DndContext>

        <div className="mt-8 pt-4 border-t border-gray-800 flex justify-between">
            <button onClick={() => { setEditingHabit(null); setInitialForm({}); setIsModalOpen(true); }} className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 text-blue-400 rounded text-[10px] font-bold uppercase"><Plus className="w-3 h-3" /> Create Habit</button>
        </div>

        {/* LIBRARY */}
        <div className="mt-12 border-t border-white/5 pt-12">
             <h2 className="text-xl font-black text-slate-700 uppercase tracking-widest mb-6 flex items-center gap-4"><span className="w-2 h-2 rounded-full bg-slate-700"></span> HABIT LIBRARY</h2>
             <HabitArchive onAdopt={(template: any) => handleEdit(template)} />
        </div>

        {isModalOpen && (
           <ConsoleOverlay isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingHabit ? "EDIT" : "NEW"}>
               <HabitForm initialData={initialForm} onSubmit={async (data) => { setIsModalOpen(false); await supabase.from('habits').upsert(data); fetchData(); }} onCancel={() => setIsModalOpen(false)} mode={editingHabit ? 'edit' : 'create'} />
           </ConsoleOverlay>
        )}
      </div>
    </Inspector>
  );
}
