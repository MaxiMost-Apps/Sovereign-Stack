import React from 'react';
import { Check } from 'lucide-react';

// Helper to get last 7 days
const getDays = () => {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d);
  }
  return days;
};

export const WeeklyMatrix = ({ habits }: { habits: any[] }) => {
  const days = getDays();

  return (
    <div className="overflow-x-auto pb-4">
      <div className="min-w-[600px]">

        {/* HEADER ROW */}
        <div className="grid grid-cols-[200px_repeat(7,1fr)] gap-2 mb-4">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pt-2">Protocol</div>
          {days.map((d, i) => (
            <div key={i} className="text-center">
              <div className="text-[10px] font-bold text-slate-400 uppercase">{d.toLocaleDateString('en-US', { weekday: 'short' })}</div>
              <div className="text-[10px] text-slate-600">{d.getDate()}</div>
            </div>
          ))}
        </div>

        {/* HABIT ROWS */}
        <div className="space-y-2">
          {habits.map((habit) => (
            <div key={habit.id} className="grid grid-cols-[200px_repeat(7,1fr)] gap-2 items-center p-3 bg-[#0A0F1C] border border-white/5 rounded-lg">

              {/* Title */}
              <div className="truncate text-xs font-bold text-slate-300 pr-4">
                {habit.title}
              </div>

              {/* Days */}
              {days.map((d, i) => {
                // Mock logic: Check if this date is in habit.completions array
                // In real app, you'd check the actual data
                const isCompleted = Math.random() > 0.5; // Placeholder for visual demo

                return (
                  <button
                    key={i}
                    className={`
                      h-8 w-full rounded flex items-center justify-center transition-all
                      ${isCompleted ? 'bg-blue-500/20 text-blue-400' : 'bg-white/5 hover:bg-white/10'}
                    `}
                  >
                    {isCompleted && <Check size={14} strokeWidth={3} />}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
