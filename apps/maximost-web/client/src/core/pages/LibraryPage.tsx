import React from 'react';
import { HabitLibrary } from '@/components/library/HabitLibrary';

import { useHabits } from '@/hooks/useHabits'; // Import hook

export default function LibraryPage() {
  const { toggleHabit } = useHabits(); // Get toggle function

  return (
    <div className="min-h-screen bg-[#0B1221] p-4 md:p-8 pb-32">
      <div className="max-w-6xl mx-auto pt-8">
        <HabitLibrary onDeploy={(h) => toggleHabit(h.id)} />
      </div>
    </div>
  );
}
