import React, { useState } from 'react';
import { DailyHabitRow } from '@/components/habits/DailyHabitRow';
import { HabitLibrary } from '@/components/library/HabitLibrary';
import { useLibrary } from '@/hooks/useLibrary';
import { useHabits } from '@/hooks/useHabits';

export default function DashboardSingularity() {
  const { library } = useLibrary(); // Master File (60 Items)
  const { habits: userHabits, toggleHabit } = useHabits(); // DB State

  // MERGE LOGIC (Fixed)
  // We map over the Library. If the user has data, we merge it.
  // If NOT, we default to 'active' so it actually SHOWS UP on the screen.
  const activeHabits = library.map(master => {
    const userState = userHabits.find(h => h.habit_id === master.id);

    return {
      ...master,
      ...userState, // Merge DB stats (streak, status) if they exist
      status: userState?.status || 'active', // Default to active so it shows up!
      is_completed: userState?.status === 'completed'
    };
  });

  // Filter for display
  const absoluteHabits = activeHabits.filter(h => h.default_config.frequency_type === 'ABSOLUTE');
  const frequencyHabits = activeHabits.filter(h => h.default_config.frequency_type === 'FREQUENCY');

  return (
    <div className="max-w-4xl mx-auto p-4 pb-40">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8 pt-4">
        <h1 className="text-xl font-black tracking-[0.3em] uppercase text-white">Mission Control</h1>
      </div>

      {/* SECTION 1: ABSOLUTE PROTOCOL */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4 ml-2">
          <div className="w-1.5 h-1.5 rounded-full bg-red-600 shadow-[0_0_10px_red]" />
          <h3 className="text-[10px] font-black tracking-[0.3em] text-slate-500 uppercase">Absolute Protocol</h3>
        </div>
        <div className="space-y-1">
          {absoluteHabits.map((habit: any) => (
            <DailyHabitRow
              key={habit.id}
              habit={habit}
              onToggle={toggleHabit}
              onOpenInfo={() => {}}
              onOpenMenu={() => {}}
            />
          ))}
        </div>
      </div>

      {/* SECTION 2: FREQUENCY TARGETS */}
      <div className="mb-12">
          <div className="flex items-center gap-2 mb-4 ml-2">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_blue]" />
          <h3 className="text-[10px] font-black tracking-[0.3em] text-slate-500 uppercase">Frequency Targets</h3>
        </div>
        <div className="space-y-1">
          {frequencyHabits.map((habit: any) => (
              <DailyHabitRow
              key={habit.id}
              habit={habit}
              onToggle={toggleHabit}
              onOpenInfo={() => {}}
              onOpenMenu={() => {}}
            />
          ))}
        </div>
      </div>

      {/* SECTION 3: LIBRARY */}
      <div className="mt-12 border-t border-white/5 pt-8">
        <div className="flex items-center gap-2 mb-6 ml-2">
           <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
           <h3 className="text-[10px] font-black tracking-[0.3em] text-slate-500 uppercase">Habit Library</h3>
        </div>
        <HabitLibrary />
      </div>

    </div>
  );
}
