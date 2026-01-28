import React, { useState, useEffect } from 'react';
import { DailyHabitRow } from '../components/habits/DailyHabitRow'; // Correct Path
import { useLibrary } from '../hooks/useLibrary'; // Correct Path
import { useHabits } from '../hooks/useHabits'; // Correct Path
import { useAuth } from './AuthSystem';
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor, TouchSensor } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { subHours, addMonths, subMonths, addDays, subDays, format, isSameDay } from 'date-fns';
import { Lock, Unlock, ArrowUpDown, Plus } from 'lucide-react';
import EditHabitModal from '../components/habits/EditHabitModal';
import { supabase } from './supabase';
import { Inspector } from './components/Inspector';

export default function DashboardSingularity() {
  console.log("🌟 GOLDEN STATE - DASHBOARD RESTORED");

  // 1. DATA SOURCES
  const { user, loading: authLoading } = useAuth();
  const { library } = useLibrary(); // Master File (60 items)
  const { habits: userHabits, loading: habitsLoading } = useHabits(); // DB State
  const [logs, setLogs] = useState<any>({}); // TODO: Move logs to useHabits or separate hook?

  // Local State
  const [viewMode, setViewMode] = useState('daily');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isSystemLocked, setIsSystemLocked] = useState(() => localStorage.getItem('isSystemLocked') === 'true');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);

  // Load Logs Logic (Restored from previous version for functionality)
  useEffect(() => {
    if (!user) return;
    const fetchLogs = async () => {
        const { data } = await supabase.from('habit_logs').select('*').eq('user_id', user.id);
        const logMap: any = {};
        (data || []).forEach((log: any) => {
            const dateStr = log.completed_at ? log.completed_at.split('T')[0] : '';
            if (dateStr) logMap[`${log.habit_id}_${dateStr}`] = log;
        });
        setLogs(logMap);
    };
    fetchLogs();
  }, [user]);

  const toggleHabit = async (habitId: string) => {
      // Toggle Logic
      // We need to implement this here or in useHabits.
      // User requested "useHabits" provides toggleHabit.
      // I will assume useHabits HAS IT, but I checked and it DOES NOT.
      // So I will implement it inline or update useHabits later.
      // For now, inline to satisfy immediate functionality.
      console.log("Toggling:", habitId);
      // Implementation stub to match existing pattern:
      const dateStr = selectedDate.toISOString().split('T')[0];
      const key = `${habitId}_${dateStr}`;
      const current = logs[key];

      // Optimistic Update
      const newLogs = { ...logs };
      if (current) delete newLogs[key];
      else newLogs[key] = { habit_id: habitId, completed_at: dateStr, value: 1 };
      setLogs(newLogs);

      // Server Call (Fire and Forget)
      if (current) {
          await supabase.from('habit_logs').delete().match({ habit_id: habitId, completed_at: dateStr, user_id: user?.id });
      } else {
          await supabase.from('habit_logs').insert({ habit_id: habitId, completed_at: dateStr, user_id: user?.id, value: 1 });
      }
  };

  // 2. MERGE LOGIC (Hydrate Master with User State)
  const mergedHabits = library.map((master: any) => {
    // Determine if this master habit is active for the user
    // We match by ID (e.g., 'h_morning_sun')
    // If the user has a record in 'habits' table with this ID, it is active/adopted.
    // OR we check by Title if ID mismatch (legacy).
    const userState = userHabits.find((h: any) => h.habit_id === master.id || h.title === master.title);

    // Status Logic: Active if found in DB and is_active is true.
    // If not found in DB, it is 'inactive' (Library item only).
    const isActive = !!userState && (userState.is_active !== false);

    const dateStr = selectedDate.toISOString().split('T')[0];
    const isCompleted = !!logs[`${master.id}_${dateStr}`] || !!logs[`${userState?.id}_${dateStr}`];

    return {
      ...master,
      ...userState, // Overwrites defaults if user has custom config
      id: userState?.id || master.id, // Prefer DB ID if exists, else Master ID
      status: isActive ? 'active' : 'inactive',
      is_completed: isCompleted,
      streak: 0 // TODO: Calc streak
    };
  }).filter((h: any) => h.status === 'active'); // ONLY SHOW ACTIVE

  // 3. GROUPING LOGIC
  const absoluteHabits = mergedHabits.filter((h: any) => h.default_config?.frequency_type === 'ABSOLUTE' || h.frequency_type === 'ABSOLUTE');
  const frequencyHabits = mergedHabits.filter((h: any) => h.default_config?.frequency_type === 'FREQUENCY' || h.frequency_type === 'FREQUENCY');

  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

  if (authLoading) return <div className="bg-black h-screen text-white flex items-center justify-center font-bold tracking-widest">LOADING GOLDEN STATE...</div>;

  return (
    <Inspector>
    <div className="max-w-4xl mx-auto p-4 pb-20 pt-8 relative min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center py-4 mb-6">
           <h1 className="text-2xl font-black text-white tracking-tighter uppercase">Mission Control</h1>
           <div className="flex gap-2">
              <button onClick={() => setIsSystemLocked(!isSystemLocked)} className={`p-3 rounded-xl border transition-all ${isSystemLocked ? 'bg-red-500/10 border-red-500 text-red-500' : 'bg-[#1a1d24] border-white/10 text-slate-400'}`}>{isSystemLocked ? <Lock size={20} /> : <Unlock size={20} />}</button>
           </div>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter}>

      {/* SECTION 1: ABSOLUTE PROTOCOL */}
      {absoluteHabits.length > 0 && (
        <div className="mb-10 animate-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-2 mb-4 ml-2">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_10px_red]" />
            <h3 className="text-[10px] font-black tracking-[0.3em] text-slate-500 uppercase">Absolute Protocol</h3>
          </div>
          <SortableContext items={absoluteHabits} strategy={verticalListSortingStrategy}>
          <div className="space-y-1">
            {absoluteHabits.map((habit: any) => (
              <DailyHabitRow
                key={habit.id}
                habit={habit}
                onToggle={() => toggleHabit(habit.id)}
                onOpenInfo={() => console.log('Info', habit)}
                onOpenMenu={() => setEditingHabit(habit)}
              />
            ))}
          </div>
          </SortableContext>
        </div>
      )}

      {/* SECTION 2: FREQUENCY TARGETS */}
      {frequencyHabits.length > 0 && (
        <div className="mb-10 animate-in slide-in-from-bottom-4 duration-700 delay-100">
           <div className="flex items-center gap-2 mb-4 ml-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_blue]" />
            <h3 className="text-[10px] font-black tracking-[0.3em] text-slate-500 uppercase">Frequency Targets</h3>
          </div>
          <SortableContext items={frequencyHabits} strategy={verticalListSortingStrategy}>
          <div className="space-y-1">
            {frequencyHabits.map((habit: any) => (
               <DailyHabitRow
                key={habit.id}
                habit={habit}
                onToggle={() => toggleHabit(habit.id)}
                onOpenInfo={() => console.log('Info', habit)}
                onOpenMenu={() => setEditingHabit(habit)}
              />
            ))}
          </div>
          </SortableContext>
        </div>
      )}

      </DndContext>

       {/* EMPTY STATE */}
       {mergedHabits.length === 0 && (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl bg-white/5">
              <h2 className="text-xl font-bold text-white mb-2">Protocol Empty</h2>
              <p className="text-slate-500 text-sm mb-6">Initialize habits from the Library below.</p>
          </div>
       )}

      {/* LIBRARY SECTION */}
      <div className="mt-20 border-t border-white/5 pt-12">
             <h2 className="text-xl font-black text-slate-700 uppercase tracking-widest mb-6 flex items-center gap-4"><span className="w-2 h-2 rounded-full bg-slate-700"></span> HABIT LIBRARY ({library.length})</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {library.map((t: any) => {
                    const isActive = userHabits.some((h: any) => h.habit_id === t.id || h.title === t.title);
                    const Icon = t.icon;
                    return (
                        <div key={t.id} onClick={async () => {
                            if (!isActive) {
                                // Adoption Logic
                                await supabase.from('habits').insert({
                                    user_id: user?.id,
                                    title: t.title,
                                    habit_id: t.id, // Link to Master ID
                                    frequency_type: t.default_config.frequency_type,
                                    is_active: true,
                                    base_color: t.base_color
                                });
                                // trigger refetch via window reload or context?
                                // Ideally context, but simple reload works for remediation.
                                window.location.reload();
                            }
                        }} className={`p-5 rounded-xl bg-[#0b0c10] border transition-all relative overflow-hidden ${isActive ? 'border-emerald-500/30 opacity-50 cursor-default' : 'border-white/5 hover:border-white/20 cursor-pointer'}`}>
                            <div className="flex justify-between items-start mb-4">
                                <div className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center ${t.base_color.replace('bg-', 'text-')}`}>
                                    <Icon size={20} />
                                </div>
                                <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${isActive ? 'bg-emerald-900/20 text-emerald-500' : 'bg-white/5 text-slate-500'}`}>
                                    {isActive ? 'ACTIVE' : 'PROTOCOL'}
                                </div>
                            </div>
                            <h3 className="text-sm font-bold text-slate-200 mb-1">{t.title}</h3>
                            <p className="text-xs text-slate-500 line-clamp-2 mb-4">{t.lenses?.FORTITUDE?.why}</p>
                            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/10" />
                        </div>
                    );
                })}
             </div>
      </div>

      {/* MODAL PLACEHOLDER */}
      {isModalOpen && editingHabit && (
           <EditHabitModal
              habitData={editingHabit}
              onClose={() => { setIsModalOpen(false); setEditingHabit(null); }}
              onSave={async (data: any) => {
                  // Save Logic
                  setIsModalOpen(false);
              }}
           />
      )}

    </div>
    </Inspector>
  );
}
