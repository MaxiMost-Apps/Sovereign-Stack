import React, { useState } from 'react';
import { DailyHabitRow } from '@/components/habits/DailyHabitRow';
import { WeeklyMatrix } from '@/core/components/WeeklyMatrix';
import { HabitLibrary } from '@/components/library/HabitLibrary';
import { useLibrary } from '@/hooks/useLibrary';
import { useHabits } from '@/hooks/useHabits';
import { LayoutGrid, Calendar, BarChart3 } from 'lucide-react';

export default function DashboardSingularity() {
  // 1. RESTORE VIEW STATE (This fixes the missing tabs)
  const [view, setView] = useState<'day' | 'week' | 'month'>('day');

  const { library } = useLibrary();
  const { habits: userHabits, toggleHabit } = useHabits();

  // 2. MERGE LOGIC
  const activeHabits = library.map(master => {
    const userState = userHabits.find(h => h.habit_id === master.id);
    return {
      ...master,
      ...userState,
      status: userState?.status || 'active',
      is_completed: userState?.status === 'completed'
    };
  });

  const absoluteHabits = activeHabits.filter(h => h.default_config.frequency_type === 'ABSOLUTE');
  const frequencyHabits = activeHabits.filter(h => h.default_config.frequency_type === 'FREQUENCY');

  return (
    <div className="max-w-4xl mx-auto p-4 pb-40">

      {/* HEADER & TABS (Restored) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pt-4 gap-4">
        <h1 className="text-xl font-black tracking-[0.3em] uppercase text-white">Mission Control</h1>

        {/* TAB SWITCHER */}
        <div className="flex bg-[#131B2C] p-1 rounded-lg border border-white/5">
          {[
            { id: 'day', icon: LayoutGrid, label: 'DAY' },
            { id: 'week', icon: Calendar, label: 'WEEK' },
            { id: 'month', icon: BarChart3, label: 'MONTH' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setView(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-[10px] font-bold tracking-widest transition-all ${
                view === tab.id
                  ? 'bg-slate-700 text-white shadow-lg'
                  : 'text-slate-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* VIEW: DAY */}
      {view === 'day' && (
        <div className="animate-in fade-in duration-500">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4 ml-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-600 shadow-[0_0_10px_red]" />
              <h3 className="text-[10px] font-black tracking-[0.3em] text-slate-500 uppercase">Absolute Protocol</h3>
            </div>
            <div className="space-y-1">
              {absoluteHabits.map(habit => (
                <DailyHabitRow key={habit.id} habit={habit} onToggle={toggleHabit} onOpenInfo={() => {}} onOpenMenu={() => {}} />
              ))}
            </div>
          </div>

          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4 ml-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_blue]" />
              <h3 className="text-[10px] font-black tracking-[0.3em] text-slate-500 uppercase">Frequency Targets</h3>
            </div>
            <div className="space-y-1">
              {frequencyHabits.map(habit => (
                <DailyHabitRow key={habit.id} habit={habit} onToggle={toggleHabit} onOpenInfo={() => {}} onOpenMenu={() => {}} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW: WEEK */}
      {view === 'week' && (
        <div className="animate-in fade-in duration-500">
          <WeeklyMatrix habits={activeHabits} />
        </div>
      )}

      {/* VIEW: MONTH (Placeholder) */}
      {view === 'month' && (
        <div className="p-12 text-center border border-white/5 rounded-2xl bg-[#0B1221] animate-in fade-in">
          <BarChart3 className="w-12 h-12 text-slate-700 mx-auto mb-4" />
          <h3 className="text-white font-bold tracking-widest uppercase">Macro Analysis</h3>
          <p className="text-slate-500 text-xs mt-2">Data aggregation in progress.</p>
        </div>
      )}

      {/* LIBRARY (Always Visible) */}
      <div className="mt-12 border-t border-white/5 pt-8">
        <HabitLibrary />
      </div>
    </div>
  );
}
