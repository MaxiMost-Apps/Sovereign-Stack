import React, { useState } from 'react';
import { DailyHabitRow } from '../components/habits/DailyHabitRow';
import { HabitLibrary } from '../components/library/HabitLibrary';
import { useLibrary } from '../hooks/useLibrary';
import { useHabits } from '../hooks/useHabits';
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor, TouchSensor } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useAuth } from './AuthSystem';
import { Inspector } from './components/Inspector';

export default function DashboardSingularity() {
  const { library } = useLibrary(); // Master File
  const { habits: userHabits, toggleHabit, loading: habitsLoading } = useHabits(); // User DB State
  const { loading: authLoading } = useAuth();

  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

  // MERGE: Map User State onto Master Library
  // If user has no data yet, this prevents the "Empty" screen by filtering differently
  const activeHabits = library.map((master: any) => {
    const userState = userHabits.find((h: any) => h.habit_id === master.id || h.title === master.title);
    if (!userState) return null; // Only show what user has adopted

    return {
      ...master,
      ...userState,
      status: userState.status || 'active',
      is_completed: userState.status === 'completed' || userState.is_completed // Handle both structures if needed
    };
  }).filter(Boolean);

  const absoluteHabits = activeHabits.filter((h: any) => h.default_config?.frequency_type === 'ABSOLUTE');
  const frequencyHabits = activeHabits.filter((h: any) => h.default_config?.frequency_type === 'FREQUENCY');

  if (authLoading || habitsLoading) return <div className="bg-black h-screen text-white flex items-center justify-center font-bold tracking-widest">LOADING GOLDEN STATE...</div>;

  return (
    <Inspector>
    <div className="max-w-4xl mx-auto p-4 pb-40">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8 pt-4">
        <h1 className="text-xl font-black tracking-[0.3em] uppercase text-white">Mission Control</h1>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter}>

      {/* SECTION 1: ABSOLUTE PROTOCOL */}
      {absoluteHabits.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4 ml-2">
            <div className="w-1.5 h-1.5 rounded-full bg-red-600 shadow-[0_0_10px_red]" />
            <h3 className="text-[10px] font-black tracking-[0.3em] text-slate-500 uppercase">Absolute Protocol</h3>
          </div>
          <SortableContext items={absoluteHabits} strategy={verticalListSortingStrategy}>
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
          </SortableContext>
        </div>
      )}

      {/* SECTION 2: FREQUENCY TARGETS */}
      {frequencyHabits.length > 0 && (
        <div className="mb-12">
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
                onToggle={toggleHabit}
                onOpenInfo={() => {}}
                onOpenMenu={() => {}}
              />
            ))}
          </div>
          </SortableContext>
        </div>
      )}

      </DndContext>

      {/* SECTION 3: LIBRARY (Always Visible) */}
      <div className="mt-12 border-t border-white/5 pt-8">
        <div className="flex items-center gap-2 mb-6 ml-2">
           <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
           <h3 className="text-[10px] font-black tracking-[0.3em] text-slate-500 uppercase">Habit Library</h3>
        </div>
        <HabitLibrary />
      </div>

    </div>
    </Inspector>
  );
}
