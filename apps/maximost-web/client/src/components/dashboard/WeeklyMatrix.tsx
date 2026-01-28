import React from 'react';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { Check } from 'lucide-react';

export const WeeklyMatrix = ({ habits }) => {
  const today = new Date();
  const startDate = startOfWeek(today, { weekStartsOn: 1 }); // Monday start
  const weekDays = [...Array(7)].map((_, i) => addDays(startDate, i));

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="p-4 text-left text-[10px] font-bold text-slate-500 uppercase tracking-widest w-48">Protocol</th>
            {weekDays.map(day => (
              <th key={day.toString()} className="p-2 text-center">
                <div className={`flex flex-col items-center gap-1 ${isSameDay(day, today) ? 'text-blue-400' : 'text-slate-600'}`}>
                  <span className="text-[10px] font-black uppercase">{format(day, 'EEE')}</span>
                  <span className="text-xs font-bold">{format(day, 'd')}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {habits.map(habit => (
            <tr key={habit.id} className="group hover:bg-white/5 transition-colors">
              <td className="p-4">
                <div className="font-bold text-xs text-white">{habit.title}</div>
              </td>
              {weekDays.map(day => {
                // Mock logic for matrix view (since we don't have full history loaded yet)
                // In a real app, you'd check habit.history[dateString]
                const isDone = isSameDay(day, today) && habit.status === 'completed';

                return (
                  <td key={day.toString()} className="p-2 text-center">
                    <div className="flex items-center justify-center">
                      <div
                        className={`
                          w-8 h-8 flex items-center justify-center rounded-full border transition-all duration-300
                          ${isDone
                            ? `${habit.base_color || 'bg-blue-600'} border-transparent text-white shadow-[0_0_10px_rgba(255,255,255,0.2)]`
                            : 'bg-[#0B1221] border-white/5 text-transparent'
                          }
                        `}
                      >
                        {isDone && <Check size={14} strokeWidth={4} />}
                      </div>
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
