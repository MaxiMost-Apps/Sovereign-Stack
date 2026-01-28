import React from 'react';
import { HabitLibrary } from '@/components/library/HabitLibrary';

export default function LibraryPage() {
  return (
    <div className="min-h-screen bg-[#0B1221] p-4 md:p-8 pb-32">
      <div className="max-w-6xl mx-auto pt-8">
        <HabitLibrary />
      </div>
    </div>
  );
}
