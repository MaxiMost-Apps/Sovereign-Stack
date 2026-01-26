import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { Activity, ArrowRight, Zap, Brain, Flame, Droplet, Moon, Sun, Coffee } from 'lucide-react';
import { getThemeStyles } from '../config/themeConfig';

const ICON_MAP: any = { Activity, Zap, Brain, Flame, Droplet, Moon, Sun, Coffee };

// MOCK DATA: Use this if DB returns nothing
const MOCK_TEMPLATES = [
    { id: 't1', title: 'Morning Sunlight', icon: 'Sun', color: 'maximost_blue', description: 'Anchor your circadian clock with 10m outdoor light.' },
    { id: 't2', title: 'Zone 2 Cardio', icon: 'Activity', color: 'emerald_city', description: '45 mins of steady state movement.' },
    { id: 't3', title: 'Deep Work', icon: 'Brain', color: 'fuji_purple', description: '90 minutes of undistracted focus.' },
    { id: 't4', title: 'Cold Plunge', icon: 'Droplet', color: 'cyan', description: 'Metabolic reset via thermal shock.' }
];

interface HabitArchiveProps {
  onAdopt?: (template: any) => void;
  mode?: 'library' | 'stacks';
}

export function HabitArchive({ onAdopt, mode = 'library' }: HabitArchiveProps) {
  console.log("✅ HABIT ARCHIVE TITAN LOADED");
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
        setLoading(true);
        // Force mock data if mode is library for immediate visibility
        const { data } = await supabase.from('habits').select('*').is('user_id', null);

        // If DB is empty, use Mock Data
        const finalData = (data && data.length > 0) ? data : MOCK_TEMPLATES;
        setItems(finalData);
        setLoading(false);
    };
    fetchItems();
  }, [mode]);

  if (loading) return <div className="text-slate-500 text-xs animate-pulse">Loading Archive...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((t) => {
        const theme = getThemeStyles(t.color || 'maximost_blue');
        const IconComponent = ICON_MAP[t.icon] || Activity;

        return (
          <div
            key={t.id}
            onClick={() => onAdopt && onAdopt({ ...t, id: undefined, is_active: true })}
            // ✅ FORCED HEIGHT & ALIGNMENT
            className="h-full min-h-[140px] p-5 rounded-xl bg-[#0b0c10] border border-white/5 hover:border-white/20 cursor-pointer transition-all group relative overflow-hidden flex flex-col justify-between"
          >
            <div>
                <div className="flex justify-between items-start mb-3">
                   <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center" style={{ color: theme.primary }}>
                      <IconComponent size={20} />
                   </div>
                   <div className="px-2 py-1 rounded bg-white/5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                       PROTOCOL
                   </div>
                </div>

                <h3 className="text-sm font-bold text-slate-200 mb-1 group-hover:text-white transition-colors">
                  {t.title}
                </h3>
                {/* ✅ DESCRIPTION FIX */}
                <p className="text-xs text-slate-500 line-clamp-2 mb-2">
                  {t.description || t.why_instruction || "Standard operational protocol."}
                </p>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0" style={{ color: theme.secondary }}>
               INITIALIZE <ArrowRight size={12} />
            </div>

            <div className="absolute bottom-0 left-0 w-full h-[2px]" style={{ background: theme.primary }} />
          </div>
        );
      })}
    </div>
  );
}
