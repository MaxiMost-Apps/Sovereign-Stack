import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { Activity, ArrowRight, Layers } from 'lucide-react'; // Removed 'Plus'
import { getThemeStyles } from '../config/themeConfig';

// 1. RESTORE ICON MAPPER (So cards show Brain, Fire, etc. instead of just Activity)
import { Zap, Brain, Flame, Droplet, Moon, Sun, Layout, Music, Anchor, Coffee } from 'lucide-react';
const ICON_MAP: any = { Activity, Zap, Brain, Flame, Droplet, Moon, Sun, Layout, Music, Anchor, Coffee };

interface HabitArchiveProps {
  onAdopt?: (template: any) => void;
  mode?: 'library' | 'stacks'; // New prop to switch between Habits and Stacks
}

export function HabitArchive({ onAdopt, mode = 'library' }: HabitArchiveProps) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, [mode]);

  const fetchItems = async () => {
    setLoading(true);
    let data = [];

    // FETCH LOGIC
    if (mode === 'stacks') {
        // Fetch Stacks (if you have a stacks table, otherwise mock for now)
        // For now, I will Mock the Stacks so you see them immediately as per your screenshot
        data = [
            { id: 's1', title: 'Atlas Golden Set', description: 'The foundation. The five habits that stabilize any rig.', count: 5, color: 'mars_orange' },
            { id: 's2', title: 'Huberman Neural Stack', description: 'Optimizing the brain through biological triggers.', count: 4, color: 'maximost_blue' },
            { id: 's3', title: 'Goggins Iron Mind', description: 'Building a calloused mind through intentional friction.', count: 4, color: 'obsidian_dark' }
        ];
    } else {
        // Fetch System Templates (Library)
        // We filter for habits where user_id is NULL (System Habits)
        const { data: templates } = await supabase.from('habits').select('*').is('user_id', null);
        data = templates || [];
    }

    setItems(data);
    setLoading(false);
  };

  if (loading) return <div className="text-slate-500 text-xs animate-pulse">Loading Archive...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

      {/* ❌ REMOVED: The "Create New" Card is GONE.
         (It now only lives in the Dashboard Header or Sidebar)
      */}

      {items.map((t) => {
        const theme = getThemeStyles(t.color || 'maximost_blue');
        const IconComponent = ICON_MAP[t.icon] || (mode === 'stacks' ? Layers : Activity);

        return (
          <div
            key={t.id}
            onClick={() => onAdopt && onAdopt({ ...t, id: undefined, is_active: true })} // Clone logic
            className="p-5 rounded-xl bg-[#0b0c10] border border-white/5 hover:border-white/20 cursor-pointer transition-all group relative overflow-hidden"
            // ❌ REMOVED: hover:animate-shake or pulse
          >
            <div className="flex justify-between items-start mb-4">
               <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center transition-colors" style={{ color: theme.primary }}>
                  <IconComponent size={20} />
               </div>
               {mode === 'stacks' ? (
                   <div className="px-2 py-1 rounded bg-white/5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                       {t.count} ATOMS
                   </div>
               ) : (
                   <div className="px-2 py-1 rounded bg-white/5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                       {t.frequency_type || 'Daily'}
                   </div>
               )}
            </div>

            <h3 className="text-sm font-bold text-slate-200 mb-1 group-hover:text-white transition-colors">
              {t.title}
            </h3>
            <p className="text-xs text-slate-500 line-clamp-2 mb-4">
              {t.description || t.why_instruction || t.how_instruction || "No mission brief available."}
            </p>

            <div className="flex items-center gap-2 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0" style={{ color: theme.secondary }}>
               {mode === 'stacks' ? 'LOAD PROTOCOL' : 'INITIALIZE'} <ArrowRight size={12} />
            </div>

            {/* Color Strip */}
            <div className="absolute bottom-0 left-0 w-full h-[2px]" style={{ background: theme.primary }} />
          </div>
        );
      })}
    </div>
  );
}
