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
          {/* SECTOR 1: ABSOLUTE HABITS */}
          {absoluteHabits.length > 0 && (
            <div className="relative">
              <div className="flex items-center gap-3 mb-4 ml-2">
                <Shield size={16} className="text-red-600" />
                <h3 className="text-[11px] font-black tracking-[0.3em] text-red-600/80 uppercase">Absolute Habits</h3>
                <div className="h-px flex-1 bg-gradient-to-r from-red-900/50 to-transparent" />
              </div>
              <div className="space-y-2">
              {absoluteHabits.map(habit => (
                <DailyHabitRow key={habit.id} habit={habit} onToggle={toggleHabit} onOpenInfo={() => setSelectedHabit(habit)} onOpenMenu={() => {}} />
              ))}
              </div>
            </div>
          )}

          {/* SECTOR 2: FREQUENCY TARGETS */}
          {frequencyHabits.length > 0 && (
            <div className="relative">
              <div className="flex items-center gap-3 mb-4 ml-2">
                <Activity size={16} className="text-blue-500" />
                <h3 className="text-[11px] font-black tracking-[0.3em] text-blue-500/80 uppercase">Frequency Targets</h3>
                <div className="h-px flex-1 bg-gradient-to-r from-blue-900/50 to-transparent" />
              </div>
              <div className="space-y-2">
              {frequencyHabits.map(habit => (
                <DailyHabitRow key={habit.id} habit={habit} onToggle={toggleHabit} onOpenInfo={() => setSelectedHabit(habit)} onOpenMenu={() => {}} />
              ))}
              </div>
            </div>
          )}

          {/* EMPTY STATE */}
          {activeHabits.length === 0 && (
            <div className="p-12 text-center border border-dashed border-white/10 rounded-2xl">
              <h3 className="text-slate-500 font-bold uppercase tracking-widest">No Active Protocols</h3>
              <p className="text-xs text-slate-600 mt-2">Access the Library below to deploy habits.</p>
            </div>
          )}
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
          onSave={(updatedHabit: any) => {
            // Connect the UI to the Database
            updateHabitConfig(updatedHabit.id, {
              frequency_type: updatedHabit.default_config.frequency_type,
              target_days: updatedHabit.default_config.target_days,
              visuals: updatedHabit.visuals,
              // We can also sync title/description overrides if supported by schema/backend
            });
            setSelectedHabit(null);
          }}
        />
      )}
    </div>
  );
}
