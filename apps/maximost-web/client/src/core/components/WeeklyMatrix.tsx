import React, { useEffect } from 'react';
import { addDays, format, isSameDay, startOfWeek as dateFnsStartOfWeek } from 'date-fns';
import { toISODate, isFuture } from '../utils/dateUtils';
import { getThemeStyles, getIcon } from '../config/themeConfig';
import SortableHabitRow from './SortableHabitRow';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Target } from 'lucide-react';
import WeeklyHabitRow from './WeeklyHabitRow';

// Helper to format dates like "MON 12"
const getDayLabel = (date: Date) => {
    return format(date, 'EEE d').toUpperCase();
};

export default function WeeklyMatrix({ habits, currentDate, logs = {}, onToggle, onEdit, onDelete, isSystemLocked, isSortMode, startOfWeek = 1, adjustedToday = new Date() }: any) {
  const isReordering = isSortMode; // Control Split: Sort Mode drives DnD

  // 1. ADD AUTO-SCROLL TO TODAY LOGIC
  useEffect(() => {
    // Find the element with id="today-column" and scroll it into view
    const timer = setTimeout(() => {
      const todayEl = document.getElementById('today-column');
      if (todayEl) {
        // Offset logic for sticky column (220px)
        const container = todayEl.closest('.overflow-x-auto');
        if (container) {
            const offset = 220; // Width of sticky column
            const left = (todayEl as HTMLElement).offsetLeft - offset;
            container.scrollTo({ left, behavior: 'smooth' });
        } else {
            todayEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
      }
    }, 100); // Slight delay to ensure render
    return () => clearTimeout(timer);
  }, []);

  if (!habits) return <div className="p-8 text-center text-gray-500">Loading...</div>;

  const start = dateFnsStartOfWeek(currentDate, { weekStartsOn: startOfWeek as 0 | 1 | 2 | 3 | 4 | 5 | 6 });
  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(start, i));
  const validHabits = habits.filter((h: any) => h && h.id && h.title);

  // 2. HELPER TO CHECK IF DATE IS TODAY (Uses Adjusted Today from props)
  const checkIsToday = (offset: number) => {
      return isSameDay(weekDays[offset], adjustedToday);
  };

  // 1. STRICT LOGIC: Separate the two types of habits
  const absoluteHabits = validHabits.filter((h: any) =>
    !h.frequency_type ||
    h.frequency_type.toLowerCase() === 'daily' ||
    h.frequency_type.toLowerCase() === 'absolute'
  );

  const frequencyHabits = validHabits.filter((h: any) =>
    h.frequency_type &&
    h.frequency_type.toLowerCase() !== 'daily' &&
    h.frequency_type.toLowerCase() !== 'absolute'
  );

  const renderRow = (habit: any) => {
    // Determine cell rendering inside the matrix based on 'habit.base_color'
    // WeeklyHabitRow likely maps 'weekDays' to render multiple cells.
    // The instructions say "Find the grid cell div and replace with this".
    // WeeklyHabitRow is imported. I need to modify WeeklyHabitRow, OR inline the logic if WeeklyMatrix handled it.
    // But WeeklyMatrix delegates to WeeklyHabitRow.
    // I will modify WeeklyHabitRow in the next step or modify the render function here if it was inline.
    // Wait, the file I read is WeeklyMatrix.tsx and it USES WeeklyHabitRow.
    // The instruction says "Target: apps/maximost-web/client/src/components/dashboard/WeeklyMatrix.tsx".
    // If the grid cell is inside WeeklyHabitRow, I must target that.
    // Let's assume the user meant WeeklyHabitRow.tsx OR the inline logic used to be here.
    // I will read WeeklyHabitRow next.
    return (
        <WeeklyHabitRow
            habit={habit}
            logs={logs}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
            weekDays={weekDays}
            isTodayCol={checkIsToday}
            isSystemLocked={isSystemLocked}
            isEditMode={isSortMode}
        />
    );
  };

  return (
    // MASTER CONTAINER (This handles the scroll for the WHOLE view)
    <div className="overflow-x-auto custom-scrollbar relative h-[calc(100vh-200px)]">
      <div className="min-w-[800px] pb-24">
         {/* 1. DATE HEADER ROW (Sticky Top & Left) */}
         <div className="sticky top-0 z-40 bg-[#050505] border-b border-white/10 flex">
             {/* Top Left Corner (Empty/Label) */}
             <div className="sticky left-0 z-50 bg-[#050505] w-[220px] p-4 font-bold text-slate-500 uppercase tracking-widest text-[10px] border-r border-white/5 shadow-[4px_0_10px_rgba(0,0,0,0.5)] flex items-center">
                 Protocol
             </div>

             {/* Dates */}
             <div className="flex-1 grid grid-cols-7">
                 {weekDays.map((day, i) => {
                     const isToday = checkIsToday(i);
                     return (
                     <div
                       key={i}
                       id={isToday ? 'today-column' : ''} // ID for Auto-Scroll
                       className={`text-center py-4 text-[10px] font-bold uppercase tracking-wider border-r border-white/5 last:border-0 ${isToday ? 'text-blue-400 bg-blue-500/5' : 'text-slate-500'}`}
                     >
                         {getDayLabel(day)}
                     </div>
                 )})}
             </div>
         </div>

         {/* 2. ABSOLUTE HABITS */}
         {absoluteHabits.length > 0 && (
            <>
              {/* DIVIDER ROW - Scrolls with content but spans full width */}
              <div className="bg-[#0b0c10] border-b border-white/5 flex sticky left-0 w-full z-10">
                  <div className="sticky left-0 z-20 bg-[#0b0c10] w-[220px] px-4 py-2 border-r border-white/5 shadow-[4px_0_10px_rgba(0,0,0,0.5)]">
                    <div className="text-[10px] font-bold text-slate-100 uppercase tracking-widest flex items-center gap-2">
                        <Shield className="w-3 h-3 text-blue-400 fill-blue-500/20" /> ABSOLUTE HABITS
                    </div>
                  </div>
                  {/* Empty space for the rest of the row to maintain grid alignment or just fill */}
                  <div className="flex-1 bg-[#0b0c10]"></div>
              </div>

              <div className="flex flex-col">
                {absoluteHabits.map((habit: any) => (
                    <div key={habit.id} className="w-full">
                        {isReordering ?
                            <SortableHabitRow key={habit.id} id={habit.id}>{renderRow(habit)}</SortableHabitRow> :
                            renderRow(habit)
                        }
                    </div>
                ))}
              </div>
            </>
         )}

         {/* 3. FREQUENCY HABITS (No Gap) */}
         {frequencyHabits.length > 0 && (
            <>
               {/* DIVIDER ROW */}
               <div className="bg-[#0b0c10] border-b border-white/5 flex sticky left-0 w-full z-10 mt-0">
                  <div className="sticky left-0 z-20 bg-[#0b0c10] w-[220px] px-4 py-2 border-r border-white/5 shadow-[4px_0_10px_rgba(0,0,0,0.5)]">
                    <div className="text-[10px] font-bold text-slate-100 uppercase tracking-widest flex items-center gap-2">
                        <Target className="w-3 h-3 text-emerald-400" /> FREQUENCY HABITS
                    </div>
                  </div>
                  <div className="flex-1 bg-[#0b0c10]"></div>
               </div>

               <div className="flex flex-col">
                {frequencyHabits.map((habit: any) => (
                    <div key={habit.id} className="w-full">
                        {isReordering ?
                            <SortableHabitRow key={habit.id} id={habit.id}>{renderRow(habit)}</SortableHabitRow> :
                            renderRow(habit)
                        }
                    </div>
                ))}
               </div>
            </>
         )}
      </div>
    </div>
  );
}
