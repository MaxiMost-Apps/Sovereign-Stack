import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { DailyHabitRow } from '@/components/habits/DailyHabitRow';
import { WeeklyMatrix } from '@/components/dashboard/WeeklyMatrix';
import { HabitLibrary } from '@/components/library/HabitLibrary';
import { HabitInfoDrawer } from '@/components/habits/HabitInfoDrawer';
import { EditHabitModal } from '@/components/habits/EditHabitModal';
import { useLibrary } from '@/hooks/useLibrary';
import { useHabits } from '@/hooks/useHabits';
import { LayoutGrid, Calendar, BarChart3, Lock, Unlock, ArrowUpDown, ChevronLeft, ChevronRight, Plus } from 'lucide-react';

export default function Dashboard() {
  const [view, setView] = useState<'day' | 'week' | 'month'>('day');
  const [isLocked, setIsLocked] = useState(false);
  const [isReordering, setIsReordering] = useState(false);
  const [drawerHabit, setDrawerHabit] = useState<any>(null);
  const [editHabit, setEditHabit] = useState<any>(null);

  const { library } = useLibrary();
  const { habits: userHabits, toggleHabit, updateHabitConfig } = useHabits();

  // MERGE LOGIC
  const activeHabits = library.map(master => {
    const userState = userHabits.find(h => h.habit_id === master.id);
    if (!userState || userState.status === 'archived') return null;
    return {
      ...master, ...userState,
      default_config: { ...master.default_config, ...userState.metadata?.config },
      visuals: { ...master.visuals, ...userState.metadata?.visuals },
      status: userState.status || 'active',
      is_completed: userState.status === 'completed'
    };
  }).filter(Boolean);

  const absoluteHabits = activeHabits.filter(h => h.default_config.frequency_type === 'ABSOLUTE');
  const frequencyHabits = activeHabits.filter(h => h.default_config.frequency_type === 'FREQUENCY');

  return (
    <div className="min-h-screen bg-[#050A14] pb-32">
      {/* HEADER */}
      <div className="sticky top-0 z-40 bg-[#050A14]/90 backdrop-blur-md border-b border-white/5 px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black tracking-[0.2em] uppercase text-white">Mission Control</h1>
            <div className="flex items-center gap-3 mt-1">
               <button className="text-slate-600 hover:text-white"><ChevronLeft size={16}/></button>
               <p className="text-[10px] text-blue-500 font-bold tracking-widest uppercase">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</p>
               <button className="text-slate-600 hover:text-white"><ChevronRight size={16}/></button>
            </div>
          </div>
          <div className="flex gap-2">
             {view === 'day' && <button onClick={() => setIsReordering(!isReordering)} className={`p-2 rounded-lg transition-colors ${isReordering ? 'text-blue-400 bg-blue-500/10' : 'text-slate-600 hover:text-white'}`}><ArrowUpDown size={20} /></button>}
             <button onClick={() => setIsLocked(!isLocked)} className={`p-2 rounded-lg transition-colors ${isLocked ? 'text-red-500 bg-red-500/10' : 'text-slate-600 hover:text-white'}`}>{isLocked ? <Lock size={20} /> : <Unlock size={20} />}</button>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-4 mt-4">
        {/* TABS */}
        <div className="flex bg-[#0B1221] p-1 rounded-xl border border-white/5 mb-8">
           {[{ id: 'day', icon: LayoutGrid, label: 'DAY' }, { id: 'week', icon: Calendar, label: 'WEEK' }, { id: 'month', icon: BarChart3, label: 'MONTH' }].map(tab => (
            <button key={tab.id} onClick={() => setView(tab.id as any)} className={`flex-1 py-3 text-[10px] font-black tracking-widest ${view === tab.id ? 'bg-slate-700 text-white rounded-lg shadow-lg' : 'text-slate-500'}`}>{tab.label}</button>
           ))}
        </div>

        {/* DAY VIEW */}
        {view === 'day' && (
          <div className="space-y-4 animate-in fade-in">
            {/* ABSOLUTE */}
            <div className="space-y-3">
                <div className="flex items-center gap-2 pl-2"><span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Absolute Habits</span></div>
                {absoluteHabits.map((h, i) => <DailyHabitRow key={h.id} habit={h} index={i} isReordering={isReordering} isLocked={isLocked} onToggle={toggleHabit} onOpenInfo={() => setDrawerHabit(h)} onOpenEdit={() => setEditHabit(h)} />)}
            </div>
            {/* FREQUENCY */}
            <div className="space-y-3 pt-8">
                 <div className="flex items-center gap-2 pl-2 border-t border-white/5 pt-6"><span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Frequency Habits</span></div>
                {frequencyHabits.map((h, i) => <DailyHabitRow key={h.id} habit={h} index={i} isReordering={isReordering} isLocked={isLocked} onToggle={toggleHabit} onOpenInfo={() => setDrawerHabit(h)} onOpenEdit={() => setEditHabit(h)} />)}
            </div>
            {/* CREATE BTN */}
            <div className="pt-8">
              <button onClick={() => setEditHabit({ title: '', visuals: { color: 'bg-blue-500', icon: 'Zap' }, default_config: {} })} className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl flex items-center justify-center gap-2 text-white font-bold uppercase tracking-widest transition-all shadow-lg shadow-blue-900/20"><Plus size={16} /> Initialize New Habit</button>
            </div>
            <div className="mt-20 border-t border-white/5 pt-10"><HabitLibrary onDeploy={(h) => {
               // When deploying from library, open edit modal to confirm settings
               setEditHabit({ ...h, habit_id: h.id });
            }} /></div>
          </div>
        )}
        {view === 'week' && <WeeklyMatrix habits={activeHabits} isLocked={isLocked} />}
      </div>

      <AnimatePresence>
        {drawerHabit && <HabitInfoDrawer habit={drawerHabit} onClose={() => setDrawerHabit(null)} />}
        {editHabit && <EditHabitModal habit={editHabit} onClose={() => setEditHabit(null)} onSave={(updates: any) => {
            if (updates.habit_id && !updates.id) toggleHabit(updates.habit_id); // New
            else if (updates.id) updateHabitConfig(updates.id, updates); // Edit
            setEditHabit(null);
        }} />}
      </AnimatePresence>
    </div>
  );
}
