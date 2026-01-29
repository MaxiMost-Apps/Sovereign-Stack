import { useEffect, useState } from 'react';
import { supabase } from '@/services/supabase';
import { useAuth } from '@/components/auth/AuthSystem';
import { toISODate } from '@/utils/dateUtils';
import { Check } from 'lucide-react';

export function TelemetryHeader() {
  const { user } = useAuth();
  const [habits, setHabits] = useState<any[]>([]);
  const [logs, setLogs] = useState<any>({});
  const [loading, setLoading] = useState(true);

  // Instant Local Storage Read for 0ms Latency
  useEffect(() => {
     const cachedLogs = localStorage.getItem('habit_logs_cache');
     if (cachedLogs) {
         setLogs(JSON.parse(cachedLogs));
     }
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchTopHabits = async () => {
       // Fetch top 5 active habits for the HUD with EXTENDED METADATA
       const { data } = await supabase
           .from('habits')
           .select('id, title, color, metadata, target_count, daily_goal, frequency_type')
           .eq('user_id', user.id)
           .eq('is_active', true)
           .order('sort_order')
           .limit(5);

       if (data && data.length > 0) {
           setHabits(data);

           // SDP HARD REFRESH REQUIREMENT: Fetch fresh logs for these 5 habits to heal any cache drift
           const ids = data.map(h => h.id);
           const todayStr = toISODate(new Date());

           const { data: freshLogs } = await supabase
               .from('habit_logs')
               .select('*')
               .in('habit_id', ids)
               .eq('completed_at', todayStr); // Optimized: Only care about TODAY for the HUD

           if (freshLogs) {
               // Merge with local state (Server Authority)
               setLogs((prev: any) => {
                   const updated = { ...prev };
                   freshLogs.forEach(l => {
                       updated[`${l.habit_id}_${todayStr}`] = l;
                   });
                   return updated;
               });
           }
       }

       setLoading(false);
    };

    fetchTopHabits();

    // Listen for local updates from Dashboard (via Custom Event or Storage Event)
    const handleStorage = () => {
        const cached = localStorage.getItem('habit_logs_cache');
        if (cached) setLogs(JSON.parse(cached));
    };

    window.addEventListener('storage', handleStorage);
    // Poll local storage every 2s to catch intra-tab updates (poor man's context)
    const interval = setInterval(() => {
        const cached = localStorage.getItem('habit_logs_cache');
        const current = JSON.stringify(logs);
        if (cached && cached !== current) {
             setLogs(JSON.parse(cached));
        }
    }, 2000);

    return () => {
        window.removeEventListener('storage', handleStorage);
        clearInterval(interval);
    };
  }, [user]);

  if (loading || habits.length === 0) return null;

  const todayStr = toISODate(new Date());

  // MISSION LOGIC: Check for Active Protocol (Linked Stacks)
  // If any of the top 5 belong to a stack, show that stack name. Priority to the first one found.
  const activeStack = habits.find(h => h.metadata?.linked_stacks?.length > 0)?.metadata?.linked_stacks[0]?.name;
  const headerTitle = activeStack ? `MISSION: ${activeStack}` : "DAILY ROSTER";

  // HELPER: Calculate Progress Ring
  const getProgress = (h: any) => {
      const log = logs[`${h.id}_${todayStr}`];
      const currentValue = log ? log.value : 0;

      // Determine Target
      let target = h.daily_goal || 1;

      // If frequency type is 'frequency' (X times a week), the daily goal might be session based.
      // But for the daily HUD, we usually just care if they did it *today*.
      // If daily_goal > 1 (e.g. 10 pages), we calculate percentage.

      const percentage = Math.min(100, Math.max(0, (currentValue / target) * 100));
      return { percentage, isComplete: currentValue >= target };
  };

  return (
    <div className="flex items-center gap-4 px-6 py-3 bg-[#0B1121] border-b border-white/5 w-full overflow-x-auto scrollbar-hide">
       <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest whitespace-nowrap">{headerTitle} //</span>
       <div className="flex items-center gap-6">
          {habits.map(h => {
             const { percentage, isComplete } = getProgress(h);

             // Color Logic - Vance Patch: Support Custom Hex for Pips
             let rawColor = '#94A3B8'; // Default Slate

             if (h.color && h.color.startsWith('#')) {
                 rawColor = h.color;
             } else {
                 rawColor = h.color === 'maximost_blue' ? '#3B82F6' :
                            h.color === 'combat_red' ? '#EF4444' :
                            h.color === 'bio_emerald' ? '#10B981' :
                            h.color === 'neural_violet' ? '#8B5CF6' :
                            h.color === 'warning_amber' ? '#F59E0B' :
                            '#94A3B8';
             }

             // Circadian Logic (Bonus Hardening)
             // If window exists and implies we shouldn't care yet, we could dim it.
             // For now, adhering to "Neutral/Blue" if strictly required, but sticking to design first.

             const radius = 6;
             const circumference = 2 * Math.PI * radius;
             const strokeDashoffset = circumference - (percentage / 100) * circumference;

             return (
                 <div key={h.id} className="flex items-center gap-2 group cursor-default" title={h.title}>
                    {/* CUSTOM PIP: SVG RING */}
                    <div className="relative w-4 h-4 flex items-center justify-center">
                        {/* Background Ring */}
                        <svg className="w-full h-full transform -rotate-90">
                            <circle
                                cx="50%" cy="50%" r={radius}
                                stroke="#1e293b" // slate-800
                                strokeWidth="2"
                                fill="transparent"
                            />
                            {/* Progress Ring (Only if not complete, or maybe overlay?) */}
                            {!isComplete && (
                                <circle
                                    cx="50%" cy="50%" r={radius}
                                    stroke={rawColor}
                                    strokeWidth="2"
                                    fill="transparent"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={strokeDashoffset}
                                    strokeLinecap="round"
                                    className="transition-all duration-500 ease-out"
                                />
                            )}
                            {/* Complete State: Solid Fill */}
                            {isComplete && (
                                <circle
                                    cx="50%" cy="50%" r={radius}
                                    fill={rawColor}
                                    className="transition-all duration-300 ease-out"
                                />
                            )}
                        </svg>

                        {/* Checkmark Overlay (Absolute Center) */}
                        {isComplete && (
                            <Check className="w-2.5 h-2.5 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" strokeWidth={4} />
                        )}
                    </div>

                    <span className={`text-[10px] font-bold uppercase tracking-wider transition-colors ${isComplete ? 'text-slate-500 line-through decoration-slate-700' : 'text-slate-400 group-hover:text-slate-200'}`}>
                        {h.title}
                    </span>
                 </div>
             );
          })}
       </div>
    </div>
  );
}
