import React, { useState } from 'react';
import { DailyHabitRow } from '@/components/habits/DailyHabitRow';
import { WeeklyMatrix } from '@/components/dashboard/WeeklyMatrix';
import { HabitLibrary } from '@/components/library/HabitLibrary';
import { HabitEditModal } from '@/components/habits/HabitEditModal'; // Using the NEW Edit Modal
import { useLibrary } from '@/hooks/useLibrary';
import { useHabits } from '@/hooks/useHabits';
import { LayoutGrid, Calendar, BarChart3, Shield, Activity, Lock } from 'lucide-react';
import { format } from 'date-fns';

export default function DashboardSingularity() {
  const [view, setView] = useState<'day' | 'week' | 'month'>('day');
  const [selectedHabit, setSelectedHabit] = useState<any>(null);

  const { library } = useLibrary();
  const { habits: userHabits, toggleHabit, updateHabitConfig } = useHabits();

  // MERGE LOGIC
  const activeHabits = library.map(master => {
    const userState = userHabits.find(h => h.habit_id === master.id);
    if (!userState || userState.status === 'archived') return null;
    return { ...master, ...userState, status: userState.status || 'active', is_completed: userState.status === 'completed' };
  }).filter(Boolean);

  const absoluteHabits = activeHabits.filter(h => h.default_config.frequency_type === 'ABSOLUTE');
  const frequencyHabits = activeHabits.filter(h => h.default_config.frequency_type === 'FREQUENCY');

  return (
    <div className="max-w-4xl mx-auto p-4 pb-40">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pt-4 gap-4">
        <div>
          <h2 className="text-[10px] font-black tracking-[0.2em] text-blue-500 uppercase mb-1">Today's Mission</h2>
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-white tracking-tight">{format(new Date(), 'EEEE, MMM d')}</h1>
            <div className="p-2 rounded-lg border border-white/10 text-slate-500">
               <Lock size={16} />
            </div>
          </div>
        </div>

        {/* TABS (Day/Week/Month) */}
        <div className="flex bg-[#131B2C] p-1 rounded-lg border border-white/5 w-full md:w-auto">
          {[
            { id: 'day', label: 'DAILY' },
            { id: 'week', label: 'WEEKLY' },
            { id: 'month', label: 'MONTHLY' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setView(tab.id as any)}
              className={`flex-1 md:flex-none px-6 py-2 rounded-md text-[10px] font-black tracking-[0.2em] uppercase transition-all ${
                view === tab.id ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* VIEW: DAY */}
      {view === 'day' && (
        <div className="animate-in fade-in space-y-8">
          {/* ABSOLUTE */}
          <div>
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 pl-1">Absolute Habits</h3>
            <div className="space-y-2 border-l-2 border-blue-600 pl-4 py-1">
              {absoluteHabits.map(habit => (
                <DailyHabitRow key={habit.id} habit={habit} onToggle={toggleHabit} onOpenInfo={() => setSelectedHabit(habit)} onOpenMenu={() => {}} />
              ))}
              {absoluteHabits.length === 0 && <p className="text-slate-600 text-xs italic">No absolute protocols active.</p>}
            </div>
          </div>

          {/* FREQUENCY */}
          <div>
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 pl-1">Frequency Habits</h3>
            <div className="space-y-2 border-l-2 border-emerald-500 pl-4 py-1">
              {frequencyHabits.map(habit => (
                <DailyHabitRow key={habit.id} habit={habit} onToggle={toggleHabit} onOpenInfo={() => setSelectedHabit(habit)} onOpenMenu={() => {}} />
              ))}
               {frequencyHabits.length === 0 && <p className="text-slate-600 text-xs italic">No frequency targets set.</p>}
            </div>

            {/* INITIALIZE BUTTON */}
            <div className="mt-8 border border-white/10 rounded-lg p-4 flex justify-center border-dashed hover:border-blue-500/50 hover:bg-blue-500/5 transition-all cursor-pointer">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">+ Initialize New Habit</span>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: WEEK */}
      {view === 'week' && <WeeklyMatrix habits={activeHabits} />}

      {/* VIEW: MONTH */}
      {view === 'month' && (
         <div className="p-12 text-center border border-white/5 rounded-2xl bg-[#0B1221]">
            <BarChart3 className="w-12 h-12 text-slate-700 mx-auto mb-4" />
            <h3 className="text-white font-bold tracking-widest uppercase">Macro Analysis</h3>
         </div>
      )}

      <div className="mt-16 border-t border-white/5 pt-8">
        <h3 className="text-xl font-mono font-bold text-white mb-6">Habit Archive</h3>
        <HabitLibrary />
      </div>

      {/* EDIT MODAL */}
      {selectedHabit && (
        <HabitEditModal
          habit={selectedHabit}
          onClose={() => setSelectedHabit(null)}
          onSave={(id: any, updates: any) => {
            // Connect the UI to the Database
            updateHabitConfig(id, {
              frequency_type: updates.frequency_type,
              target_days: updates.target, // Mapped from formData.target
              visuals: { icon: updates.icon, color: updates.color }, // Re-constructing visuals object
              custom_title: updates.title !== selectedHabit.title ? updates.title : undefined,
              custom_description: updates.description !== selectedHabit.description ? updates.description : undefined
            });
            setSelectedHabit(null);
          }}
        />
      )}
    </div>
  );
}
