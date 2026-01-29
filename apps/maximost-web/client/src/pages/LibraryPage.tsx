import React from 'react';
import { HabitLibrary } from '@/components/library/HabitLibrary';
import { useHabits } from '@/hooks/useHabits';

export default function LibraryPage() {
  const { toggleHabit } = useHabits();

  return (
    <div className="min-h-screen bg-[#020408] p-4 pb-32">
      <div className="max-w-3xl mx-auto pt-12">
        <HabitLibrary onDeploy={(habit) => toggleHabit(habit.id)} />
      </div>
    </div>
  );
}
