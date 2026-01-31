import React, { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import {
  Lock,
  Unlock,
  LayoutList,
  CalendarDays,
  BarChart3,
  GripVertical
} from 'lucide-react';

// Components
import { DailyHabitRow } from '@/components/habits/DailyHabitRow';
import { WeeklyMatrix } from '@/components/dashboard/WeeklyMatrix';
import { EditHabitModal } from '@/components/habits/EditHabitModal';

// Hooks
import { useHabits } from '@/hooks/useHabits';

export const Dashboard = () => {
  const { habits, reorderHabits, toggleHabit, updateHabitConfig } = useHabits(); // added updateHabitConfig

  // UI State
  const [view, setView] = useState<'day' | 'week' | 'month'>('day');
  const [isLocked, setIsLocked] = useState(true); // Default to Locked (Safe Mode)
  const [isReordering, setIsReordering] = useState(false);
  const [editingHabit, setEditingHabit] = useState<any | null>(null);

  // DnD Sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Reset reordering if locked
  useEffect(() => {
    if (isLocked) setIsReordering(false);
  }, [isLocked]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = habits.findIndex((h) => h.id === active.id);
      const newIndex = habits.findIndex((h) => h.id === over?.id);
      const newOrder = arrayMove(habits, oldIndex, newIndex);
      reorderHabits(newOrder); // Optimistic update
    }
  };

  const handleSaveEdit = (updatedHabit: any) => {
    // Call hook to update
    updateHabitConfig(updatedHabit.habit_id || updatedHabit.id, updatedHabit);
    setEditingHabit(null);
  };

  return (
    <div className="min-h-full pb-20">

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-[#020408]/80 backdrop-blur-md border-b border-white/5 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-black tracking-[0.2em] uppercase text-white">
              Mission Control
            </h1>
            <span className="px-1.5 py-0.5 bg-blue-900/30 border border-blue-500/30 text-[10px] font-bold text-blue-400 rounded">
              V2.1
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* LOCK TOGGLE */}
            <button
              onClick={() => setIsLocked(!isLocked)}
              className={`p-2 rounded-lg transition-all ${isLocked ? 'text-emerald-500 bg-emerald-500/10' : 'text-amber-500 bg-amber-500/10'}`}
            >
              {isLocked ? <Lock size={18} /> : <Unlock size={18} />}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 space-y-6">

        {/* VIEW TOGGLE */}
        <div className="flex p-1 bg-[#0A0F1C] border border-white/5 rounded-lg">
          {[
            { id: 'day', icon: LayoutList, label: 'DAY' },
            { id: 'week', icon: CalendarDays, label: 'WEEK' },
            { id: 'month', icon: BarChart3, label: 'MONTH' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setView(tab.id as any)}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-[10px] font-bold tracking-widest rounded transition-all ${
                view === tab.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* REORDER TOGGLE (Only in Day View + Unlocked) */}
        {view === 'day' && !isLocked && (
          <div className="flex justify-end">
            <button
              onClick={() => setIsReordering(!isReordering)}
              className={`flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded border transition-all ${
                isReordering
                  ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                  : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'
              }`}
            >
              <GripVertical size={12} />
              {isReordering ? 'Done Reordering' : 'Reorder Habits'}
            </button>
          </div>
        )}

        {/* CONTENT AREA */}
        <div className="min-h-[400px]">

          {/* DAY VIEW */}
          {view === 'day' && (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={habits.map(h => h.id)}
                strategy={verticalListSortingStrategy}
                disabled={!isReordering} // Disable DnD logic if not reordering
              >
                <div className="space-y-3">
                  {habits.length === 0 ? (
                    <div className="text-center p-10 text-slate-500 border border-dashed border-white/10 rounded-xl">
                      No active protocols. Initialize one from the Library.
                    </div>
                  ) : (
                    habits.map((habit) => (
                      <DailyHabitRow
                        key={habit.id}
                        habit={habit}
                        isLocked={isLocked}
                        isReordering={isReordering}
                        onToggle={toggleHabit}
                        onOpenInfo={() => console.log('Open Info', habit.id)}
                        onOpenEdit={() => setEditingHabit(habit)}
                      />
                    ))
                  )}
                </div>
              </SortableContext>
            </DndContext>
          )}

          {/* WEEK VIEW */}
          {view === 'week' && <WeeklyMatrix habits={habits} />}

          {/* MONTH VIEW */}
          {view === 'month' && (
            <div className="p-12 text-center border border-dashed border-white/10 rounded-xl">
              <p className="text-xs text-slate-500 font-mono">STATS MODULE OFFLINE</p>
            </div>
          )}

        </div>

      </main>

      <EditHabitModal
        habit={editingHabit}
        isOpen={!!editingHabit}
        onClose={() => setEditingHabit(null)}
        onSave={handleSaveEdit}
        onDelete={(id) => {
           // Mock delete or archive
           console.log('Archive', id);
           setEditingHabit(null);
        }}
      />
    </div>
  );
};
