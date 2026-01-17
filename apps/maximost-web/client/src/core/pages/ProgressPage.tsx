import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

import ContributionHeatmap from '../components/ContributionHeatmap';
import { supabase } from '../supabase';
import { useAuth } from '../AuthSystem';
import { subDays, format, parseISO, isSameDay } from 'date-fns';
import { getThemeStyles } from '../config/themeConfig';
// import { AscensionOverlay } from '@/components/AscensionOverlay'; // DELETED COMPONENT

export default function ProgressPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [consistencyData, setConsistencyData] = useState<any[]>([]);
  const [dailyPerfectionData, setDailyPerfectionData] = useState<any[]>([]); // For Siege Map
  const [ledgerData, setLedgerData] = useState<any[]>([]); // For Heatmap (Archive)
  const [userProfile, setUserProfile] = useState<any>(null); // For Garnish Protocol

  // Fetch Data on Load
  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      setLoading(true);
      const ninetyDaysAgo = subDays(new Date(), 90).toISOString();

      // 1. Fetch Habits
      const { data: habits } = await supabase
        .from('habits')
        .select('id, title, color, daily_goal')
        .eq('user_id', user.id);

      // Fetch Profile for Tier Check
      const { data: p } = await supabase.from('profiles').select('tier_name').eq('id', user.id).single();
      setUserProfile(p);

      // 2. Fetch Logs (Last 90 Days) for Graphs
      const { data: logs } = await supabase
        .from('habit_logs')
        .select('*')
        .eq('user_id', user.id)
        .gte('completed_at', ninetyDaysAgo);

      // 3. Fetch The Ledger (Archive) for Heatmap
      let archiveLogs: any[] = [];
      try {
          // If 'archive' table exists and contains completion history
          const { data: arch } = await supabase.from('archive').select('*').eq('user_id', user.id);
          if (arch) archiveLogs = arch;
      } catch (e) { console.warn("Ledger access failed."); }

      // Fallback: If archive is empty/missing, use habit_logs as the ledger source?
      // "The Ledger archive Historical completions and the Heatmap."
      // If archive is supposed to be the source, we use it.
      // If it's empty, heatmap is empty.

      if (habits && logs) {
        processConsistencyIndex(habits, logs);
        processDailyPerfection(habits, logs);
      }
      setLedgerData(archiveLogs);
      setLoading(false);
    };

    fetchData();
  }, [user]);

  // 1.2 "Consistency Index" Calculation (Bar Graph)
  const processConsistencyIndex = (habits: any[], logs: any[]) => {
    const data = habits.map(h => {
      // Count days where value >= daily_goal
      const validLogs = logs.filter(l => l.habit_id === h.id && l.value >= (h.daily_goal || 1)).length;
      const percentage = Math.round((validLogs / 90) * 100);
      const theme = getThemeStyles(h.color);

      return {
        name: h.title,
        value: percentage,
        color: theme.hex
      };
    }).sort((a, b) => b.value - a.value); // Sort by highest consistency

    setConsistencyData(data);
  };

  // 1.1 "Daily Perfection" Calculation (Siege Map)
  const processDailyPerfection = (habits: any[], logs: any[]) => {
      // Create a map of 90 days
      const daysMap = Array.from({ length: 90 }, (_, i) => {
          const d = subDays(new Date(), 89 - i); // 89 down to 0
          return { date: d, score: 0 };
      });

      const processedMap = daysMap.map(dayObj => {
          const dateStr = format(dayObj.date, 'yyyy-MM-dd');

          // Get logs for this day
          const daysLogs = logs.filter(l => l.completed_at.startsWith(dateStr));

          // Calculate score based on % of habits completed
          // Note: This assumes current habits were active back then.
          // For a perfect system, we'd need historical habit state, but for this audit, we use current.
          const completedCount = habits.filter(h => {
              const log = daysLogs.find(l => l.habit_id === h.id);
              return log && log.value >= (h.daily_goal || 1);
          }).length;

          const totalHabits = habits.length;
          if (totalHabits === 0) return 0;

          const ratio = completedCount / totalHabits;

          // Map Ratio to 0-4 Scale
          if (ratio === 0) return 0;
          if (ratio <= 0.25) return 1;
          if (ratio <= 0.5) return 2;
          if (ratio <= 0.75) return 3;
          return 4; // > 75% or 100%
      });

      setDailyPerfectionData(processedMap);
  };

  const getColor = (level: number) => {
    if (level === 0) return 'bg-white/5';
    if (level === 1) return 'bg-blue-900/40';
    if (level === 2) return 'bg-blue-700/60';
    if (level === 3) return 'bg-blue-500';
    return 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]';
  };

  if (loading) return <div className="p-12 text-center text-slate-500">Loading Telemetry...</div>;

  // const isInitiate = userProfile?.tier_name === 'INITIATE'; // REMOVED GATING

  return (

    <div className="p-6 max-w-6xl mx-auto space-y-12 pb-24">

      {/* SECTION 0: THE LEDGER (HEATMAP) */}
      <div className="relative">
        <h1 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">The Ledger</h1>
        <p className="text-slate-400 mb-6">Historical topology of your sovereignty.</p>

        {/* {isInitiate && <AscensionOverlay />} */}

        <div className="bg-[#0b0c10] border border-white/5 p-6 rounded-2xl mb-8">
            <ContributionHeatmap data={ledgerData} />
        </div>
      </div>

      {/* SECTION 1: CONSISTENCY INDEX (Bar Chart) */}
      <div className="relative">
        <h1 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">Consistency Index</h1>
        <p className="text-slate-400 mb-6">Compliance Percentage by Protocol (Last 90 Days).</p>

        {/* {isInitiate && <AscensionOverlay />} */}

        <div className="h-[300px] w-full bg-[#0b0c10] border border-white/5 rounded-2xl p-4">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={consistencyData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                    <XAxis type="number" domain={[0, 100]} hide />
                    <YAxis dataKey="name" type="category" width={100} tick={{fill: '#94a3b8', fontSize: 10}} interval={0} />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#0b0c10', borderColor: '#334155' }}
                        itemStyle={{ color: '#fff' }}
                        cursor={{fill: 'rgba(255,255,255,0.05)'}}
                    />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                        {consistencyData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Bar>
                </BarChart>
             </ResponsiveContainer>
        </div>
      </div>

      {/* SECTION 2: SIEGE MAP (Daily Perfection) */}
      <div className="relative">
        <h2 className="text-xl font-bold text-white uppercase tracking-tighter mb-2">Siege Map (Daily Perfection)</h2>
        <p className="text-slate-400 mb-6">Visualizing daily execution quality.</p>

        {/* {isInitiate && <AscensionOverlay />} */}

        <div className="bg-[#0b0c10] border border-white/5 p-6 rounded-2xl overflow-x-auto">
            <div className="flex gap-1 min-w-max flex-wrap max-w-[800px]">
                {dailyPerfectionData.map((level, i) => (
                    <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.005 }}
                        className={`w-4 h-4 rounded-[2px] ${getColor(level)}`}
                        title={`Day ${i + 1}: Level ${level}`}
                    />
                ))}
            </div>

            <div className="flex items-center gap-2 mt-4 text-[10px] text-slate-500 justify-end">
                <span>Drifting</span>
                <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-[2px] bg-white/5" />
                    <div className="w-3 h-3 rounded-[2px] bg-blue-900/40" />
                    <div className="w-3 h-3 rounded-[2px] bg-blue-500" />
                    <div className="w-3 h-3 rounded-[2px] bg-emerald-400" />
                </div>
                <span>Sovereign</span>
            </div>
        </div>
      </div>

    </div>

  );
}
