import React from 'react';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { motion } from 'framer-motion';

export const WeeklyHabitMatrix = ({ habits, selectedDate }: any) => {
  const startOfCurrentWeek = startOfWeek(selectedDate, { weekStartsOn: 1 }); // Monday start
  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(startOfCurrentWeek, i));

  const colorConfig: any = {
    blue: { bg: 'bg-blue-500', glow: 'rgba(59,130,246,0.6)' },
    red: { bg: 'bg-red-500', glow: 'rgba(239,68,68,0.6)' },
    amber: { bg: 'bg-amber-500', glow: 'rgba(245,158,11,0.6)' },
  };

  return (
    <div className="bg-[#0A0F1C] border border-white/5 rounded-2xl p-4 overflow-x-auto">
      {/* Header Row */}
      <div className="flex mb-4">
        <div className="w-1/3 min-w-[120px] text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-end pb-1">
          PROTOCOL
        </div>
        <div className="flex-1 flex justify-between gap-1">
          {weekDays.map((day, i) => (
            <div key={i} className={`flex-1 text-center text-[10px] font-mono font-bold ${isSameDay(day, new Date()) ? 'text-blue-400' : 'text-slate-600'}`}>
              <div>{format(day, 'EEEEE')}</div>
              <div className="opacity-50">{format(day, 'd')}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Habit Rows */}
      <div className="space-y-3">
        {habits.map((habit: any) => {
          const theme = colorConfig[habit.visual_color] || colorConfig.blue;

          return (
            <div key={habit.id} className="flex items-center">
              <div className="w-1/3 min-w-[120px] pr-2">
                <h4 className="text-xs font-bold text-slate-300 truncate">{habit.title}</h4>
              </div>
              <div className="flex-1 flex justify-between gap-1">
                {weekDays.map((day, i) => {
                  const dateStr = format(day, 'yyyy-MM-dd');
                  const isCompleted = habit.habit_logs?.some((l: any) => l.date === dateStr && l.status === 'completed');

                  return (
                    <div key={i} className="flex-1 flex justify-center">
                      <div
                        className={`w-3 h-3 rounded-full transition-all duration-300 border border-white/5
                          ${isCompleted ? `${theme.bg} scale-110` : 'bg-[#151a25]'}`}
                        style={{ boxShadow: isCompleted ? `0 0 8px ${theme.glow}` : 'none' }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
