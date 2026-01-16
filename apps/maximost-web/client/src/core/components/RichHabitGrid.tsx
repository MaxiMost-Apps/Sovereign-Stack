import React, { useState, useEffect } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { RichHabitCard } from './RichHabitCard';
import { Habit } from '@/types/habit';
import { supabase } from '@/core/supabase';

interface RichHabitGridProps {
  habits: Habit[];
  onHabitUpdate: () => void;
  onEdit: (habit: Habit) => void;
  onDelete: (habitId: string) => void;
}

export default function RichHabitGrid({ habits, onHabitUpdate, onEdit, onDelete }: RichHabitGridProps) {
  const [items, setItems] = useState<Habit[]>(habits);

  useEffect(() => {
    setItems(habits);
  }, [habits]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        const newOrder = arrayMove(items, oldIndex, newIndex);

        const updates = newOrder.map((h, index) => ({ id: h.id, sort_order: index }));

        // Persist
        (async () => {
            for (const update of updates) {
                await supabase.from('habits').update({ sort_order: update.sort_order }).eq('id', update.id);
            }
        })();

        return newOrder;
      });
    }
  };

  const toggleCompletion = async (habitId: string, date: Date) => {
      onHabitUpdate();
  };

  const mockCompletions: any[] = [];

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map(h => h.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {items.map((habit) => (
            <RichHabitCard
                key={habit.id}
                habit={habit}
                completions={mockCompletions}
                onToggleCompletion={toggleCompletion}
                onEdit={onEdit}
                onDelete={onDelete}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
