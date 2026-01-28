import React from 'react';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { Check } from 'lucide-react';

interface WeeklyMatrixProps {
  habits: any[];
  isLocked?: boolean;
}

export const WeeklyMatrix: React.FC<WeeklyMatrixProps> = ({ habits, isLocked }) => {
  const today = new Date();
  const startDate = startOfWeek(today, { weekStartsOn: 1 }); // Monday start
  const weekDays = [...Array(7)].map((_, i) => addDays(startDate, i));

  return (
    <div className="overflow-x-auto rounded-2xl border border-white/5 bg-[#0B1221] p-4">
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
                <div className="text-[9px] text-slate-500 uppercase tracking-wider">{habit.default_config?.frequency_type}</div>
              </td>
              {weekDays.map(day => {
                const isDone = isSameDay(day, today) && habit.status === 'completed';
                return (
                  <td key={day.toString()} className="p-2 text-center">
                    <div className="flex items-center justify-center">
                      <div className={`w-8 h-8 flex items-center justify-center rounded-full border transition-all ${isDone ? 'bg-blue-600 border-transparent text-white' : 'bg-[#131B2C] border-white/5'}`}>
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
