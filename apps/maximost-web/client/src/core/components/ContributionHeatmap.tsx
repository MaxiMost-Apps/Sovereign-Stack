import React from 'react';
import { getThemeStyles } from '../config/themeConfig';
import { eachDayOfInterval, subDays, format, getDay } from 'date-fns';

export default function ContributionHeatmap({ data }: { data: any[] }) {
  const today = new Date();
  const startDate = subDays(today, 364); // Last 365 days
  const days = eachDayOfInterval({ start: startDate, end: today });

  // Map data to frequency (dateStr -> count)
  const frequencyMap: Record<string, number> = {};
  data.forEach((item) => {
      // Assuming item has 'completed_at' or 'date'
      const dateStr = item.completed_at || item.date;
      if (dateStr) {
          const d = dateStr.split('T')[0];
          frequencyMap[d] = (frequencyMap[d] || 0) + (item.value || 1);
      }
  });

  // Determine intensity color
  const getColor = (count: number) => {
      if (count === 0) return 'bg-white/5';
      if (count === 1) return 'bg-blue-900/40';
      if (count === 2) return 'bg-blue-800/60';
      if (count === 3) return 'bg-blue-600/80';
      return 'bg-blue-500'; // Kinetic Blue Max
  };

  return (
    <div className="w-full overflow-x-auto pb-4 scrollbar-hide">
        <div className="flex gap-1 min-w-max">
            {/* We render columns of weeks. Since we have flat days, we group them or just render a grid? */}
            {/* Standard approach: 7 rows (Days), 52 columns (Weeks) */}
            {/* Simplification: Just render blocks row-first wrapping? No, heatmaps are usually col-first (weeks). */}
            {/* Let's do CSS Grid: grid-rows-7 grid-flow-col */}

            <div className="grid grid-rows-7 grid-flow-col gap-1">
                {days.map((day) => {
                    const dateStr = format(day, 'yyyy-MM-dd');
                    const count = frequencyMap[dateStr] || 0;
                    return (
                        <div
                            key={dateStr}
                            className={`w-3 h-3 rounded-sm ${getColor(count)}`}
                            title={`${dateStr}: ${count} completions`}
                        />
                    );
                })}
            </div>
        </div>
        <div className="flex justify-between items-center mt-2 text-[10px] text-slate-500 font-mono">
            <span>{format(startDate, 'MMM yyyy')}</span>
            <div className="flex items-center gap-1">
                <span>Less</span>
                <div className="w-2 h-2 rounded-sm bg-white/5" />
                <div className="w-2 h-2 rounded-sm bg-blue-900/40" />
                <div className="w-2 h-2 rounded-sm bg-blue-600/80" />
                <div className="w-2 h-2 rounded-sm bg-blue-500" />
                <span>More</span>
            </div>
            <span>{format(today, 'MMM yyyy')}</span>
        </div>
    </div>
  );
}
