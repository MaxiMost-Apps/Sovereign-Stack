import React, { useEffect, useState } from 'react';
import { supabase } from '@/services/supabase';
import { format, parseISO } from 'date-fns';
import { Activity, CheckCircle, Zap, Brain, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const ActivityFeed = ({ limit = 10 }: { limit?: number }) => {
  const [feed, setFeed] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeed();
  }, [limit]);

  const fetchFeed = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        // Mock data if no user (for preview)
        setFeed(generateMockFeed());
        setLoading(false);
        return;
      }

      // 1. Fetch Real Completions
      const { data: logs } = await supabase
        .from('habit_logs')
        .select(`
          id,
          created_at,
          status,
          value,
          habits (title, visual_color)
        `)
        .eq('user_id', user.id)
        .eq('status', 'completed')
        .order('created_at', { ascending: false })
        .limit(limit);

      // 2. Mix with Mock "Health" and "AI" events (since those backends are complex/missing)
      const realEvents = (logs || []).map((l: any) => ({
        type: 'COMPLETION',
        id: l.id,
        timestamp: l.created_at,
        title: l.habits?.title || 'Unknown Protocol',
        color: l.habits?.visual_color || 'blue',
        details: 'Protocol Executed'
      }));

      // In a real app, we would fetch health spikes from a 'bio_metrics' table
      // and AI notes from 'memories' or 'coach_logs'.
      // For this UI restoration, we intersperse mock events to demonstrate the "Welltory" density.

      const mixedFeed = [...realEvents, ...generateMockFeed().slice(0, 2)]
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, limit);

      setFeed(mixedFeed.length > 0 ? mixedFeed : generateMockFeed()); // Fallback to mock if empty
    } catch (err) {
      console.error('Feed error', err);
    } finally {
      setLoading(false);
    }
  };

  const generateMockFeed = () => [
    {
       type: 'BIO',
       id: 'm1',
       timestamp: new Date().toISOString(),
       title: 'High Stress Detected',
       color: 'red',
       details: 'HRV dropped 20% post-workout.',
       icon: Zap
    },
    {
       type: 'AI',
       id: 'm2',
       timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
       title: 'Coach Alexis',
       color: 'purple',
       details: 'Your consistency on "Deep Work" is up 15% this week. Keep pushing.',
       icon: Brain
    }
  ];

  const getIcon = (item: any) => {
    if (item.type === 'COMPLETION') return <CheckCircle size={14} className="text-blue-400" />;
    if (item.type === 'BIO') return <Zap size={14} className="text-red-400" />;
    if (item.type === 'AI') return <Brain size={14} className="text-purple-400" />;
    return <Activity size={14} />;
  };

  const getBorderColor = (color: string) => {
    const map: any = { blue: 'border-blue-500/30', red: 'border-red-500/30', purple: 'border-purple-500/30', amber: 'border-amber-500/30' };
    return map[color] || 'border-white/10';
  };

  if (loading) return <div className="text-[10px] text-slate-600 font-mono p-4">Initializing Ledger...</div>;

  return (
    <div className="space-y-2 relative">
      <div className="absolute left-3 top-0 bottom-0 w-px bg-white/5" /> {/* Timeline Line */}

      {feed.map((item, i) => (
        <motion.div
          key={item.id || i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          className="relative pl-8 py-2 group cursor-pointer"
        >
          {/* Timeline Node */}
          <div className={`absolute left-[9px] top-3.5 w-1.5 h-1.5 rounded-full ${item.type === 'BIO' ? 'bg-red-500' : 'bg-blue-500'} shadow-[0_0_8px_rgba(59,130,246,0.5)]`} />

          <div className={`bg-[#0c0e14] border ${getBorderColor(item.color)} rounded-xl p-3 hover:bg-white/5 transition-colors`}>
            <div className="flex justify-between items-start mb-1">
              <div className="flex items-center gap-2">
                {getIcon(item)}
                <span className={`text-xs font-bold ${item.type === 'BIO' ? 'text-red-400' : 'text-white'}`}>{item.title}</span>
              </div>
              <span className="text-[9px] text-slate-600 font-mono">
                {format(parseISO(item.timestamp), 'HH:mm')}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed pl-6">
              {item.details}
            </p>
          </div>
        </motion.div>
      ))}

      <button className="w-full py-3 text-[10px] font-bold text-slate-500 hover:text-white uppercase tracking-widest flex items-center justify-center gap-1 transition-colors">
        View Full Ledger <ChevronRight size={12} />
      </button>
    </div>
  );
};
