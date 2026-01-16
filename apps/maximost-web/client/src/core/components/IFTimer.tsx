import React, { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';
import { differenceInHours, differenceInMinutes } from 'date-fns';

export function IFTimer() {
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number } | null>(null);
  const [progress, setProgress] = useState(0);

  // MOCK STATE (Pending DB Migration)
  // Simulation: Last meal was yesterday at 8 PM, Target is 16 hours.
  const [mockData] = useState({
      last_meal_at: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(), // 14 hours ago
      fasting_target_hours: 16
  });

  useEffect(() => {
    const calculateTime = () => {
       const lastMeal = new Date(mockData.last_meal_at);
       // HARD-WIRE: FORCE EST (America/New_York)
       const now = new Date(new Date().toLocaleString("en-US", { timeZone: "America/New_York" }));
       const targetHours = mockData.fasting_target_hours;

       const elapsedMinutes = differenceInMinutes(now, lastMeal);
       const targetMinutes = targetHours * 60;
       const remainingMinutes = targetMinutes - elapsedMinutes;

       if (remainingMinutes <= 0) {
           setTimeLeft({ hours: 0, minutes: 0 });
           setProgress(100);
       } else {
           setTimeLeft({
               hours: Math.floor(remainingMinutes / 60),
               minutes: remainingMinutes % 60
           });
           setProgress(Math.min((elapsedMinutes / targetMinutes) * 100, 100));
       }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [mockData]);

  if (!timeLeft) return null;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 flex items-center justify-between w-full max-w-sm">
        <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${timeLeft.hours === 0 && timeLeft.minutes === 0 ? 'bg-emerald-500/20 text-emerald-500' : 'bg-blue-500/20 text-blue-500'}`}>
                <Timer className="w-5 h-5" />
            </div>
            <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Fasting Timer</h3>
                <p className="text-white font-mono font-bold">
                    {timeLeft.hours === 0 && timeLeft.minutes === 0
                        ? "TARGET REACHED"
                        : `${timeLeft.hours}h ${timeLeft.minutes}m Remaining`}
                </p>
            </div>
        </div>

        {/* Progress Circle (Simple CSS Conic) */}
        <div className="relative w-10 h-10 rounded-full flex items-center justify-center bg-zinc-800"
             style={{
                 background: `conic-gradient(${timeLeft.hours === 0 && timeLeft.minutes === 0 ? '#10b981' : '#3b82f6'} ${progress}%, #27272a 0)`
             }}
        >
            <div className="w-8 h-8 bg-zinc-900 rounded-full flex items-center justify-center">
                <span className="text-[10px] font-bold text-white">{Math.floor(progress)}%</span>
            </div>
        </div>
    </div>
  );
}
