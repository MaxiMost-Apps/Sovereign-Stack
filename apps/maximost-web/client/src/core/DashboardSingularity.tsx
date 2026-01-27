import React, { useState, useEffect, useRef } from 'react';
import { supabase } from './supabase';
import { useAuth } from './AuthSystem';
import { getApiUrl } from '../config';
import { calculateStreak } from './utils/streakLogic';
import { toISODate } from './utils/dateUtils';
import WeeklyMatrix from './components/WeeklyMatrix';
import MonthlyCalendar from './components/MonthlyCalendar';
import ConsoleOverlay from './components/ConsoleOverlay';
import { Inspector } from './components/Inspector';
import { useToast } from './components/Toast';
// ✅ FIXED IMPORTS: Added 'Save', 'GripVertical', 'Trash2', etc.
import { Lock, Unlock, ArrowUpDown, Plus, Check, MoreVertical, Edit2, Trash2, Info, Flame, X, GripVertical, Save, Activity, Zap, Brain, Droplet, Moon, Sun, Coffee, Dumbbell, Book, Briefcase, Heart, Calendar, FileText, ArrowRight, Layout } from 'lucide-react';
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor, TouchSensor } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { subHours, addMonths, subMonths, addDays, subDays, format, isSameDay } from 'date-fns';
import { cn } from '@/lib/utils';

// --- 1. CONFIG & THEMES (Inlined) ---
const THEMES: any = {
  maximost_blue: { primary: '#3b82f6', secondary: '#60a5fa', bg: 'rgba(59, 130, 246, 0.1)' },
  emerald_city: { primary: '#10b981', secondary: '#34d399', bg: 'rgba(16, 185, 129, 0.1)' },
  fuji_purple: { primary: '#a855f7', secondary: '#c084fc', bg: 'rgba(168, 85, 247, 0.1)' },
  mars_orange: { primary: '#f97316', secondary: '#fb923c', bg: 'rgba(249, 115, 22, 0.1)' },
  obsidian_dark: { primary: '#ffffff', secondary: '#94a3b8', bg: 'rgba(255, 255, 255, 0.05)' },
  red: { primary: '#ef4444', secondary: '#f87171', bg: 'rgba(239, 68, 68, 0.1)' },
  yellow: { primary: '#eab308', secondary: '#facc15', bg: 'rgba(234, 179, 8, 0.1)' },
  pink: { primary: '#ec4899', secondary: '#f472b6', bg: 'rgba(236, 72, 153, 0.1)' },
  cyan: { primary: '#06b6d4', secondary: '#22d3ee', bg: 'rgba(6, 182, 212, 0.1)' },
  gray: { primary: '#94a3b8', secondary: '#cbd5e1', bg: 'rgba(148, 163, 184, 0.1)' }
};
const getThemeStyles = (c: string) => THEMES[c] || THEMES['maximost_blue'];

const COLORS = ['maximost_blue', 'emerald_city', 'fuji_purple', 'mars_orange', 'obsidian_dark', 'red', 'yellow', 'pink', 'cyan', 'gray'];
const ICONS = [
  { id: 'Activity', icon: Activity }, { id: 'Zap', icon: Zap }, { id: 'Brain', icon: Brain },
  { id: 'Flame', icon: Flame }, { id: 'Droplet', icon: Droplet }, { id: 'Moon', icon: Moon },
  { id: 'Sun', icon: Sun }, { id: 'Coffee', icon: Coffee }, { id: 'Dumbbell', icon: Dumbbell },
  { id: 'Book', icon: Book }, { id: 'Briefcase', icon: Briefcase }, { id: 'Heart', icon: Heart }
];
const ICON_MAP: any = { Activity, Zap, Brain, Flame, Droplet, Moon, Sun, Coffee, Dumbbell, Book, Briefcase, Heart };

const MOCK_TEMPLATES = [
    { id: 't1', title: 'Morning Sunlight', icon: 'Sun', color: 'maximost_blue', description: 'Anchor your circadian clock with 10m outdoor light.' },
    { id: 't2', title: 'Zone 2 Cardio', icon: 'Activity', color: 'emerald_city', description: '45 mins of steady state movement.' },
    { id: 't3', title: 'Deep Work', icon: 'Brain', color: 'fuji_purple', description: '90 minutes of undistracted focus.' },
    { id: 't4', title: 'Cold Plunge', icon: 'Droplet', color: 'cyan', description: 'Metabolic reset via thermal shock.' }
];

// --- 2. COMPONENT: SORTABLE WRAPPER (Inlined to fix Drag & Drop) ---
function SortableItem({ id, children, disabled }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id, disabled });
  const style = { transform: CSS.Transform.toString(transform), transition };
  // Clone element to pass drag props if needed, or just wrap
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="touch-none">
      {children}
    </div>
  );
}

// --- 3. COMPONENT: DAILY HABIT ROW ---
function DailyHabitRow({ habit, isCompleted, logEntry, onToggle, onEdit, onDelete, isSystemLocked, isSortMode, date }: any) {
  const [showMenu, setShowMenu] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const theme = getThemeStyles(habit.color || 'maximost_blue');
  const IconComponent = ICON_MAP[habit.icon] || Activity;
  const target = habit.daily_goal || 1;
  const isQuantified = target > 1;
  const currentValue = logEntry?.value || 0;
  const isFullyComplete = currentValue >= target;

  useEffect(() => { if (showInput && inputRef.current) inputRef.current.focus(); }, [showInput]);

  const handleInputSubmit = (e: any) => {
    if (e.key === 'Enter') {
        const val = parseInt(e.currentTarget.value);
        if (!isNaN(val)) { onToggle(habit.id, date, val); setShowInput(false); }
    } else if (e.key === 'Escape') setShowInput(false);
  };

  return (
    <div className={cn("relative flex items-center justify-between p-4 rounded-xl border transition-all mb-3 bg-[#0b0c10] border-white/5", isFullyComplete ? "opacity-100" : "opacity-90")}
    style={{ height: '80px', borderColor: isFullyComplete ? theme.primary : (isSortMode ? '#1e3a8a' : 'rgba(255,255,255,0.05)'), boxShadow: isFullyComplete ? `0 0 15px -10px ${theme.primary}` : 'none' }}>

      <div className="flex items-center gap-4 flex-1">
        {/* GRIPPER VISIBLE ONLY IN SORT MODE */}
        {isSortMode && <div className="text-slate-500"><GripVertical size={24} /></div>}

        <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-all bg-white/5" style={{ color: theme.primary }}><IconComponent size={24} /></div>
        <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
                <span className={cn("font-bold text-sm text-slate-200", isFullyComplete && "text-white")}>{habit.title}</span>
                {!isSystemLocked && !isSortMode && (
                <div className="relative z-10">
                    <button onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }} className="p-1 text-slate-600 hover:text-white"><MoreVertical size={16} /></button>
                    {showMenu && (
                        <div className="absolute left-0 top-8 w-40 bg-[#1a1d24] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden ring-1 ring-black">
                            <button onClick={() => { onEdit(); setShowMenu(false); }} className="w-full text-left px-4 py-3 text-xs font-bold text-slate-300 hover:bg-white/5 flex items-center gap-3"><Edit2 size={14} /> Edit Habit</button>
                            <button onClick={() => { onDelete(); setShowMenu(false); }} className="w-full text-left px-4 py-3 text-xs font-bold text-red-500 hover:bg-red-500/10 flex items-center gap-3"><Trash2 size={14} /> Delete</button>
                        </div>
                    )}
                </div>
                )}
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold tracking-wider uppercase text-slate-500">
                {isQuantified && <span style={{ color: theme.secondary }}>Goal: {target} {habit.unit}</span>}
                {habit.frequency_type === 'weekly' && <span className="text-blue-400">Weekly Target</span>}
            </div>
        </div>
      </div>

      <div className="pl-4 border-l border-white/5 relative h-12 flex items-center z-20">
           <div className="relative flex items-center justify-center">
               <button onClick={() => !isSystemLocked && (isQuantified ? setShowInput(true) : onToggle(habit.id, date, isFullyComplete ? 0 : 1))}
                 className={cn("w-12 h-12 rounded-full flex items-center justify-center transition-all border-2", isFullyComplete ? "bg-opacity-100 text-black shadow-lg" : "bg-transparent text-transparent hover:border-slate-500")}
                 style={{ borderColor: isFullyComplete ? theme.primary : '#334155', backgroundColor: isFullyComplete ? theme.primary : 'transparent', boxShadow: isFullyComplete ? `0 0 15px ${theme.primary}` : 'none', opacity: isSystemLocked ? 0.5 : 1 }}>
                 {isQuantified && !isFullyComplete ? <span className="text-xs text-slate-500 font-bold">{currentValue > 0 ? currentValue : '+'}</span> : <Check size={24} strokeWidth={4} color="black" />}
               </button>
               {showInput && (
                   <div className="absolute right-14 top-1/2 -translate-y-1/2 w-48 bg-[#1a1d24] border border-white/20 p-2 rounded-xl shadow-2xl z-[100] flex gap-2 animate-in slide-in-from-right-2">
                       <input ref={inputRef} type="number" placeholder="#" className="w-full bg-black border border-white/10 rounded px-2 py-2 text-white font-bold text-center outline-none focus:border-blue-500" onKeyDown={handleInputSubmit} />
                       <button onClick={() => setShowInput(false)} className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-500 p-2 rounded border border-emerald-500/50"><Check size={16} /></button>
                   </div>
               )}
           </div>
      </div>
    </div>
  );
}

// --- 4. COMPONENT: RICH HABIT FORM (Inlined) ---
function RichHabitForm({ initialData = {}, onSubmit, onCancel, mode }: any) {
  const [formData, setFormData] = useState({
    title: initialData.title || '', color: initialData.color || 'maximost_blue', icon: initialData.icon || 'Activity',
    daily_goal: initialData.daily_goal || 1, unit: initialData.unit || 'reps', frequency_type: initialData.frequency_type || 'daily',
    start_date: initialData.start_date || new Date().toISOString().split('T')[0], custom_note: initialData.custom_note || '',
    why_instruction: initialData.why_instruction || '', how_instruction: initialData.how_instruction || ''
  });

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit({ ...initialData, ...formData, daily_goal: parseInt(String(formData.daily_goal)) || 1 }); }} className="space-y-6 text-slate-200">

      {/* FREQUENCY ROW */}
      <div className="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
        <div className="flex-1">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Frequency</label>
            <select value={formData.frequency_type} onChange={(e) => setFormData({ ...formData, frequency_type: e.target.value })} className="w-full bg-black border border-white/20 rounded-lg p-2 text-white font-bold text-sm outline-none focus:border-blue-500 uppercase">
               <option value="daily">Daily Protocol</option><option value="weekly">Weekly Target</option><option value="absolute">Non-Negotiable</option>
            </select>
        </div>
        <div className="flex-1">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Start Date</label>
            <input type="date" value={formData.start_date} onChange={(e) => setFormData({ ...formData, start_date: e.target.value })} className="w-full bg-black border border-white/20 rounded-lg p-2 text-white font-bold text-sm outline-none focus:border-blue-500" />
        </div>
      </div>

      {/* IDENTITY */}
      <div className="space-y-4">
          <div><label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">Habit Identity</label>
          <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. Morning Sunlight" className="w-full bg-[#0b0c10] border border-white/10 rounded-xl p-4 text-white font-black text-xl focus:border-blue-500 outline-none" autoFocus required /></div>

          <div className="grid grid-cols-2 gap-4">
              <div><label className="text-[10px] text-slate-500 font-bold block mb-1">TARGET VALUE</label><input type="number" min="1" value={formData.daily_goal} onChange={(e) => setFormData({ ...formData, daily_goal: e.target.value })} className="w-full bg-[#0b0c10] border border-white/10 rounded-lg p-3 text-white font-mono" /></div>
              <div><label className="text-[10px] text-slate-500 font-bold block mb-1">UNIT</label><input type="text" value={formData.unit} onChange={(e) => setFormData({ ...formData, unit: e.target.value })} className="w-full bg-[#0b0c10] border border-white/10 rounded-lg p-3 text-white" /></div>
          </div>
      </div>

      {/* VISUALS */}
      <div className="grid grid-cols-12 gap-6 pt-6 border-t border-white/5">
          <div className="col-span-4 border-r border-white/5 pr-4">
             <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-3">Theme</label>
             <div className="grid grid-cols-3 gap-3">
                {COLORS.map(c => ( <button key={c} type="button" onClick={() => setFormData({ ...formData, color: c })} className={`w-8 h-8 rounded-full transition-all ${formData.color === c ? 'ring-2 ring-white scale-110 shadow-lg' : 'opacity-30 hover:opacity-100'}`} style={{ backgroundColor: getThemeStyles(c).primary }} /> ))}
             </div>
          </div>
          <div className="col-span-8 pl-2">
             <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-3">Icon</label>
             <div className="grid grid-cols-6 gap-2">
                {ICONS.map(({ id, icon: Icon }) => ( <button key={id} type="button" onClick={() => setFormData({ ...formData, icon: id })} className={`p-2 rounded-lg flex items-center justify-center transition-all ${formData.icon === id ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-600 hover:text-slate-300 hover:bg-white/5'}`}><Icon size={18} /></button> ))}
             </div>
          </div>
      </div>

      {/* FOOTER */}
      <div className="flex gap-3 pt-6 border-t border-white/5 items-center sticky bottom-0 bg-[#14151a] z-10 pb-4">
        <button type="button" onClick={onCancel} className="px-6 py-3 bg-white/5 hover:bg-white/10 text-slate-400 rounded-xl font-bold uppercase text-xs tracking-widest">Cancel</button>
        {/* ✅ FIXED: Added Save Icon */}
        <button type="submit" className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 uppercase text-xs tracking-widest shadow-lg shadow-blue-900/20"><Save size={16} /> Save Changes</button>
        {mode === 'edit' && <button type="button" className="p-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all"><Trash2 size={20} /></button>}
      </div>
    </form>
  );
}

// --- 5. MAIN DASHBOARD ---
export default function DashboardSingularity() {
  console.log("🌟 TITAN V5 - TRUE SINGULARITY LOADED");
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
  const [libraryItems, setLibraryItems] = useState<any[]>(MOCK_TEMPLATES);

  useEffect(() => {
      localStorage.setItem('isSystemLocked', String(isSystemLocked));
      fetchData();
      fetchLibrary();
  }, [user, isSystemLocked]);

  const fetchData = async () => {
    if (!user) return;
    const { data: h } = await supabase.from('habits').select('*').order('sort_order');
    const { data: l } = await supabase.from('habit_logs').select('*').eq('user_id', user.id);
    const logMap: any = {};
    (l || []).forEach((log: any) => {
      const dateStr = log.completed_at ? log.completed_at.split('T')[0] : '';
      if (dateStr) logMap[`${log.habit_id}_${dateStr}`] = log;
    });
    setLogs(logMap);
    setHabits((h || []).map((habit: any) => ({ ...habit, streak: calculateStreak(habit, logMap) })));
  };

  const fetchLibrary = async () => {
      const { data } = await supabase.from('habits').select('*').is('user_id', null);
      if (data && data.length > 0) setLibraryItems(data);
  };

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }), useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } }));

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
        const payload = { habit_id: habitId, date: dateStr, target_date: dateStr, value: parseInt(String(newVal)) };
        await fetch(getApiUrl('/api/completions/toggle'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}` },
            body: JSON.stringify(payload)
        });
     } catch (error) { console.error("Sync Error", error); }
  };

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setHabits((items) => arrayMove(items, items.findIndex((i: any) => i.id === active.id), items.findIndex((i: any) => i.id === over.id)));
  };

  const safeHabits = habits.filter((h: any) => h && h.id && h.is_active !== false);

  if (authLoading) return <div className="bg-black h-screen text-white flex items-center justify-center font-bold tracking-widest">LOADING TITAN V5...</div>;

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
              {['daily', 'weekly', 'monthly'].map(m => ( <button key={m} onClick={() => setViewMode(m)} className={`px-4 py-1.5 text-[10px] font-black uppercase rounded-md ${viewMode === m ? 'bg-slate-700 text-white' : 'text-slate-500'}`}>{m}</button> ))}
           </div>
           <div className="flex items-center gap-4 pr-2">
              <button onClick={() => setSelectedDate(d => viewMode === 'monthly' ? subMonths(d, 1) : subDays(d, viewMode === 'weekly' ? 7 : 1))} className="text-slate-400">←</button>
              <span className="text-xs font-bold text-white w-24 text-center tracking-wider">{isSameDay(selectedDate, new Date()) ? 'Today' : format(selectedDate, 'MMM d')}</span>
              <button onClick={() => setSelectedDate(d => viewMode === 'monthly' ? addMonths(d, 1) : addDays(d, viewMode === 'weekly' ? 7 : 1))} className="text-slate-400">→</button>
           </div>
        </div>

        {/* CONTENT */}
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            {viewMode === 'daily' && (
                <div className="space-y-3">
                    <SortableContext items={safeHabits.map((h: any) => h.id)} strategy={verticalListSortingStrategy}>
                        {safeHabits.map((h: any) => (
                            <SortableItem key={h.id} id={h.id} disabled={!isSortMode}>
                                <DailyHabitRow habit={h} isSystemLocked={isSystemLocked} isSortMode={isSortMode} isCompleted={!!logs[`${h.id}_${toISODate(selectedDate)}`]} logEntry={logs[`${h.id}_${toISODate(selectedDate)}`]} onToggle={(id: string, d: any, v: any) => toggleCheck(id, selectedDate, v)} onEdit={() => handleEdit(h)} onDelete={handleDelete} date={toISODate(selectedDate)} />
                            </SortableItem>
                        ))}
                    </SortableContext>
                    {safeHabits.length === 0 && <div className="text-center py-10 text-slate-500 text-sm">No active protocols. <button onClick={() => { setEditingHabit(null); setIsModalOpen(true); }} className="text-blue-500 underline">Create one.</button></div>}
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
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {libraryItems.map((t) => {
                    const th = getThemeStyles(t.color || 'maximost_blue');
                    const Ic = ICON_MAP[t.icon] || Activity;
                    return (
                        <div key={t.id} onClick={() => handleEdit({ ...t, id: undefined, is_active: true })} className="p-5 rounded-xl bg-[#0b0c10] border border-white/5 hover:border-white/20 cursor-pointer transition-all relative overflow-hidden">
                            <div className="flex justify-between items-start mb-4"><div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center" style={{ color: th.primary }}><Ic size={20} /></div><div className="px-2 py-1 rounded bg-white/5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">TEMPLATE</div></div>
                            <h3 className="text-sm font-bold text-slate-200 mb-1">{t.title}</h3>
                            <p className="text-xs text-slate-500 line-clamp-2 mb-4">{t.description || "System Protocol."}</p>
                            <div className="flex items-center gap-2 text-[10px] font-bold" style={{ color: th.secondary }}>INITIALIZE <ArrowRight size={12} /></div>
                            <div className="absolute bottom-0 left-0 w-full h-[2px]" style={{ background: th.primary }} />
                        </div>
                    );
                })}
             </div>
        </div>

        {isModalOpen && (
           <ConsoleOverlay isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingHabit ? "EDIT" : "NEW"}>
               {/* ✅ FIXED: Use RichHabitForm instead of InlineHabitForm */}
               <RichHabitForm initialData={initialForm} onSubmit={async (data: any) => { setIsModalOpen(false); await supabase.from('habits').upsert(data); fetchData(); }} onCancel={() => setIsModalOpen(false)} mode={editingHabit ? 'edit' : 'create'} />
           </ConsoleOverlay>
        )}
      </div>
    </Inspector>
  );
}
