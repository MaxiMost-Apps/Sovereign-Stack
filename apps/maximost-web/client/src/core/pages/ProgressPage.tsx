import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Activity, Zap, FileText, CheckCircle2, Lock } from 'lucide-react';

import { supabase } from '../supabase';
import { useAuth } from '../AuthSystem';
import { subDays, format, parseISO, isSameDay } from 'date-fns';
import { getThemeStyles } from '../config/themeConfig';
import { getApiUrl } from '../../config';

// Feed Card Component
const FeedCard = ({ item }: any) => {
    const { type, timestamp, content } = item;
    const time = new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Type Config
    const config = {
        habit_completion: { icon: CheckCircle2, border: content.color || '#10B981', bg: 'bg-zinc-900/50' },
        telemetry: { icon: Activity, border: '#3B82F6', bg: 'bg-blue-950/20' },
        field_note: { icon: FileText, border: '#9CA3AF', bg: 'bg-zinc-950', font: 'font-mono' }
    }[type as 'habit_completion' | 'telemetry' | 'field_note'] || { icon: Zap, border: '#fff', bg: 'bg-zinc-900' };

    const Icon = config.icon;

    return (
        <div className={`relative pl-4 border-l-2 py-4 ${config.bg} mb-2 rounded-r-lg transition-all hover:bg-white/5 group cursor-default`} style={{ borderColor: config.border }}>
            <div className="flex justify-between items-start mb-1">
                <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" style={{ color: config.border }} />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">{content.title}</span>
                </div>
                <span className="text-[10px] text-zinc-500 font-mono">{time}</span>
            </div>

            {content.mission && (
                <div className="text-[10px] text-zinc-400 mb-2 uppercase tracking-wide opacity-70">
                    Mission: {content.mission}
                </div>
            )}

            <div className={`text-sm text-zinc-300 leading-relaxed ${content.is_encrypted ? 'blur-sm select-none cursor-pointer hover:blur-none transition-all duration-500' : ''} ${config.font || ''}`}>
                {content.narrative || content.preview || (typeof content.data === 'string' ? content.data : JSON.stringify(content.data))}
                {content.is_encrypted && <Lock className="w-3 h-3 absolute bottom-4 right-4 text-zinc-600" />}
            </div>
        </div>
    );
};

export default function ProgressPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [consistencyData, setConsistencyData] = useState<any[]>([]);
  const [dailyPerfectionData, setDailyPerfectionData] = useState<any[]>([]);
  const [feed, setFeed] = useState<any[]>([]);

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

      // 2. Fetch Logs (Last 90 Days) for Graphs
      const { data: logs } = await supabase
        .from('habit_logs')
        .select('*')
        .eq('user_id', user.id)
        .gte('completed_at', ninetyDaysAgo);

      // 3. Fetch Unified Feed (Replacing Heatmap)
      try {
          const session = await supabase.auth.getSession();
          const token = session.data.session?.access_token;

          const res = await fetch(getApiUrl('/api/habit_logs/feed'), {
              headers: { 'Authorization': `Bearer ${token}` }
          });
          if (res.ok) {
              const { feed } = await res.json();
              setFeed(feed || []);
          }
      } catch (e) { console.warn("Feed fetch failed", e); }

      if (habits && logs) {
        processConsistencyIndex(habits, logs);
        processDailyPerfection(habits, logs);
      }
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

  // Group Feed by Date
  const groupedFeed = feed.reduce((acc: any, item: any) => {
      // Assuming item.timestamp is ISO or Date string
      const dateStr = item.timestamp ? new Date(item.timestamp).toDateString() : 'Unknown Date';
      if (!acc[dateStr]) acc[dateStr] = [];
      acc[dateStr].push(item);
      return acc;
  }, {});

  return (

    <div className="p-6 max-w-6xl mx-auto space-y-12 pb-24">

      {/* SECTION 0: THE LEDGER (FEED) */}
      <div className="relative">
        <h1 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">The Ledger</h1>
        <p className="text-slate-400 mb-6">Chronological stream of Sovereign Actions.</p>

        <div className="bg-[#0b0c10] border border-white/5 rounded-2xl overflow-hidden min-h-[400px] relative">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>

            <div className="p-6 space-y-8 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
                {Object.entries(groupedFeed).map(([date, items]: any) => (
                    <div key={date}>
                        {/* STICKY DATE HEADER */}
                        <div className="sticky top-0 z-10 bg-[#0b0c10]/95 backdrop-blur py-2 mb-4 border-b border-white/5">
                            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest">{date}</h3>
                        </div>
                        <div className="space-y-1 pl-2 border-l border-white/5 ml-2">
                            {items.map((item: any) => (
                                <FeedCard key={item.id} item={item} />
                            ))}
                        </div>
                    </div>
                ))}
                {feed.length === 0 && !loading && (
                    <div className="text-center py-20 text-zinc-600 font-mono uppercase tracking-widest">
                        No telemetry recorded. Initialize protocols.
                    </div>
                )}
            </div>
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
