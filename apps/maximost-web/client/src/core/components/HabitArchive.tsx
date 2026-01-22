import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { Activity, Layers, Plus, ArrowRight } from 'lucide-react';
import { getThemeStyles } from '../config/themeConfig';

interface HabitArchiveProps {
  onAdopt?: (template: any) => void; // The handler we just passed
}

export function HabitArchive({ onAdopt }: HabitArchiveProps) {
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    // Fetch 'system' habits or templates.
    // If you don't have a 'is_template' column, we can filter by user_id IS NULL or a specific flag.
    // For now, let's fetch ALL habits to populate the list, filtering out the user's active ones if needed.
    // Ideally, you have a 'library' table or a flag.
    const { data } = await supabase.from('habits').select('*').eq('is_active', false).limit(20);
    if (data) setTemplates(data);
    setLoading(false);
  };

  if (loading) return <div className="text-slate-500 text-xs">Loading Archives...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

      {/* 1. CREATE NEW CARD */}
      <div
        onClick={() => onAdopt && onAdopt({})} // Open Empty Form
        className="p-6 rounded-xl border border-dashed border-white/10 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-white/5 hover:border-blue-500/50 transition-all group"
      >
        <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
          <Plus size={24} />
        </div>
        <span className="text-sm font-bold text-slate-400 group-hover:text-blue-400 uppercase tracking-widest">
          Build Custom Protocol
        </span>
      </div>

      {/* 2. TEMPLATE CARDS */}
      {templates.map((t) => {
        const theme = getThemeStyles(t.color || 'maximost_blue');
        return (
          <div
            key={t.id}
            onClick={() => onAdopt && onAdopt({
              ...t,
              id: undefined, // Clear ID so it creates a NEW habit
              is_active: true // Ensure it starts active
            })}
            className="p-5 rounded-xl bg-[#0b0c10] border border-white/5 hover:border-white/20 cursor-pointer transition-all group relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-4">
               <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
                  <Activity size={20} />
               </div>
               <div className="px-2 py-1 rounded bg-white/5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  {t.frequency_type || 'Daily'}
               </div>
            </div>

            <h3 className="text-sm font-bold text-slate-200 mb-1 group-hover:text-blue-400 transition-colors">
              {t.title}
            </h3>
            <p className="text-xs text-slate-500 line-clamp-2 mb-4">
              {t.description || t.why_instruction || "No mission brief available."}
            </p>

            <div className="flex items-center gap-2 text-[10px] font-bold text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
               INITIALIZE <ArrowRight size={12} />
            </div>

            {/* Color Strip */}
            <div className="absolute bottom-0 left-0 w-full h-[2px]" style={{ background: theme.primary }} />
          </div>
        );
      })}
    </div>
  );
}
