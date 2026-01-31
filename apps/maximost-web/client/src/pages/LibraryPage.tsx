import React from 'react';
import { HabitLibrary } from '@/components/library/HabitLibrary';

export default function LibraryPage() {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8 pb-20">
       {/* Page Header */}
       <div>
         <h1 className="text-2xl font-black tracking-widest uppercase text-white mb-2">The Armory</h1>
         <p className="text-slate-500 font-mono text-xs uppercase tracking-wider">Deploy new protocols.</p>
       </div>

       {/* Component */}
       <HabitLibrary />
    </div>
  );
}
