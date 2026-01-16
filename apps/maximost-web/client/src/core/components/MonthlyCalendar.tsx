import { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, subDays } from 'date-fns';
import { getThemeStyles } from '../config/themeConfig';
import DayDetailModal from './DayDetailModal';
import * as LucideIcons from 'lucide-react';
import { ArrowUpRight, ArrowDownRight, Minus, Activity } from 'lucide-react';
import { supabase } from '../supabase';
import { useAuth } from '../AuthSystem';

export default function MonthlyCalendar({ habits, currentDate, logs }: any) {
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');
  const [selectedDay, setSelectedDay] = useState<{date: Date} | null>(null);

  const days = eachDayOfInterval({ start: startOfMonth(currentDate), end: endOfMonth(currentDate) });

  const [telemetry, setTelemetry] = useState<any>({});

  // FETCH TELEMETRY VIEW
  useEffect(() => {
      const fetchStats = async () => {
          if (!user) return;
          try {
            const { data, error } = await supabase.from('habit_stats_view').select('*').eq('user_id', user.id);
            if (!error && data) {
                const map: any = {};
                data.forEach((row: any) => map[row.habit_id] = row);
                setTelemetry(map);
            }
          } catch (e) { console.error("Telemetry View Offline"); }
      };
      fetchStats();
  }, [logs, user]); // Refresh when logs change

  const getStats = (habit: any) => {
    // 1. Try View Data
    const viewData = telemetry[habit.id];
    if (viewData) {
        // Calculate Integrity from View Data (using 30d vol as proxy for now, or just use 30d vol raw)
        // The View returns vol_30, vol_90, trend_direction
        const integrity = Math.min(100, Math.round((viewData.vol_30 / 30) * 100));
        return {
            mo: viewData.vol_30,
            total: viewData.vol_90,
            trend: viewData.trend_direction,
            integrity
        };
    }

    // 2. Fallback: Client-Side Logic (Mirroring View Logic)
    const count = (daysBack: number, offset: number = 0) => {
      const start = subDays(new Date(), daysBack + offset).toISOString().split('T')[0];
      const end = subDays(new Date(), offset).toISOString().split('T')[0];
      return Object.values(logs).filter((l:any) =>
        l.habit_id === habit.id && l.completed_at > start && l.completed_at <= end && l.value >= (habit.daily_goal||1)
      ).length;
    };

    const last30 = count(30);
    const last90 = count(90);

    const current30 = count(30, 0);
    const prev30 = count(30, 30); // View uses 30 vs 30 for trend
    let trend = 'stable';
    if (current30 >= prev30) trend = 'up'; // Matching SQL Logic >=
    else trend = 'down';

    const integrity = Math.min(100, Math.round((last30 / 30) * 100));

    return { mo: last30, total: last90, trend, integrity };
  };

  // Safe Filter (Case Insensitive)
  const visibleHabits = habits.filter((h: any) => {
     if (filter === 'all') return true;
     return (h.frequency_type || 'absolute').toLowerCase() === filter.toLowerCase();
  });

  return (
    <div className="space-y-6">
      {/* FILTER BAR ONLY */}
      <div className="flex bg-gray-900 p-2 rounded-xl border border-gray-800 w-full md:w-max">
          {['all', 'absolute', 'frequency'].map(f => (
             <button key={f} onClick={() => setFilter(f)} className={`px-4 py-1.5 rounded-md text-xs font-bold capitalize transition-all ${filter === f ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}>
               {f}
             </button>
          ))}
      </div>

      {/* CALENDAR */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
         <div className="grid grid-cols-7 gap-1">
            {['S','M','T','W','T','F','S'].map(d => <div key={d} className="text-center text-[10px] text-gray-500 font-bold mb-2">{d}</div>)}

            {days.map(day => {
               const dayStr = format(day, 'yyyy-MM-dd');
               // Match habits
               const doneHabits = visibleHabits.filter((h: any) => {
                  const entry = Object.values(logs).find((l:any) => l.habit_id === h.id && l.completed_at.startsWith(dayStr));
                  return entry && entry.value >= (h.daily_goal || 1);
               });

               const displayedHabits = doneHabits.slice(0, 6);
               const remaining = doneHabits.length - 6;

               return (
                 <div
                    key={dayStr}
                    onClick={() => setSelectedDay({ date: day })}
                    className="min-h-[80px] bg-black/40 border border-gray-800/50 rounded-lg p-2 flex flex-col justify-between overflow-hidden cursor-pointer hover:bg-white/[0.02] transition-colors group relative"
                 >
                    <span className="text-[10px] text-gray-600 font-mono group-hover:text-white transition-colors">{format(day, 'd')}</span>

                    {/* TACTICAL HEATMAP DOTS */}
                    <div className="flex flex-wrap gap-1 content-end">
                        {displayedHabits.map((h: any) => {
                           const theme = getThemeStyles(h.color);
                           return (
                              <div
                                key={h.id}
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: theme.hex }}
                                title={h.title} // Desktop Tooltip
                              />
                           );
                        })}
                        {remaining > 0 && (
                            <div className="w-auto h-2 flex items-center justify-center bg-gray-800 rounded-full px-1">
                                <span className="text-[6px] font-bold text-gray-400">+{remaining}</span>
                            </div>
                        )}
                    </div>
                 </div>
               );
            })}
         </div>
      </div>

      {/* STATS SCOREBOARD (Tactical Modules) */}
      <div className="space-y-2">
         {/* HEADER ROW */}
         <div className="grid grid-cols-12 gap-4 px-6 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
             <div className="col-span-5">Habit Protocol</div>
             <div className="col-span-3 text-center">30-Day Volume</div>
             <div className="col-span-3 text-center">90-Day Volume</div>
             <div className="col-span-1 text-center">Activity</div>
         </div>

         {visibleHabits.map((h: any) => {
           const stats = getStats(h);
           const theme = getThemeStyles(h.color);
           const Icon = (LucideIcons as any)[h.icon] || LucideIcons.Shield;

           return (
             <div
                key={h.id}
                className={`grid grid-cols-12 gap-4 items-center bg-slate-900/50 border border-slate-800 rounded-lg p-4 transition-all duration-300 hover:shadow-lg hover:border-opacity-50`}
                style={{
                    '--theme-color': theme.hex
                } as React.CSSProperties}
             >
               {/* 1. HABIT + INTEGRITY */}
               <div className="col-span-5 flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
                       <Icon className="w-4 h-4" style={{ color: theme.hex }} />
                   </div>
                   <div className="flex flex-col">
                       <span className="text-sm font-bold text-slate-200">{h.title}</span>
                       <div className="flex items-center gap-2 mt-1">
                           <div className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                              stats.integrity >= 80 ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10' :
                              stats.integrity >= 50 ? 'border-amber-500/30 text-amber-400 bg-amber-500/10' :
                              'border-red-500/30 text-red-500 bg-red-500/10'
                           }`}>
                              {stats.integrity}%
                           </div>
                       </div>
                   </div>
               </div>

               {/* 2. 30-DAY + TREND */}
               <div className="col-span-3 flex flex-col items-center justify-center">
                   <div className="flex items-center gap-2">
                       <span className="text-lg font-black text-white">{stats.mo}</span>
                       {stats.trend === 'up' && <ArrowUpRight className="w-4 h-4 text-emerald-500" />}
                       {stats.trend === 'down' && <ArrowDownRight className="w-4 h-4 text-red-500" />}
                       {stats.trend === 'stable' && <Minus className="w-4 h-4 text-slate-600" />}
                   </div>
                   <span className="text-[10px] text-slate-500 uppercase tracking-wider">vs Prev 15d</span>
               </div>

               {/* 3. 90-DAY */}
               <div className="col-span-3 text-center">
                   <span className="text-sm font-bold text-slate-400">{stats.total}</span>
               </div>

               {/* 4. ACTIVITY SPARK */}
               <div className="col-span-1 flex justify-center">
                   <Activity className="w-4 h-4 text-slate-700" />
               </div>
             </div>
           );
         })}
      </div>

      {/* MOBILE DETAIL MODAL */}
      {selectedDay && (
          <DayDetailModal
            isOpen={!!selectedDay}
            onClose={() => setSelectedDay(null)}
            date={selectedDay.date}
            logs={logs}
            habits={habits}
          />
      )}

    </div>
  );
}
