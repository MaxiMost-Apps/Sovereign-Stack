import React from 'react';
import { SOVEREIGN_LIBRARY, ICON_MAP } from '../../data/sovereign_library';
import { useHabits } from '../../hooks/useHabits';
import { ArrowRight, Activity } from 'lucide-react';
import { supabase } from '../../core/supabase';
import { useAuth } from '../../core/AuthSystem';

const THEMES: any = {
  maximost_blue: { primary: '#3b82f6', secondary: '#60a5fa', bg: 'rgba(59, 130, 246, 0.1)' },
  emerald_city: { primary: '#10b981', secondary: '#34d399', bg: 'rgba(16, 185, 129, 0.1)' },
  fuji_purple: { primary: '#a855f7', secondary: '#c084fc', bg: 'rgba(168, 85, 247, 0.1)' },
  // ... map rest if needed, or rely on tailwind classes from library
};
const getThemeStyles = (c: string) => THEMES[c] || THEMES['maximost_blue'];

export const HabitLibrary = () => {
  const { habits: userHabits } = useHabits();
  const { user } = useAuth();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {SOVEREIGN_LIBRARY.map((t: any) => {
          const isActive = userHabits.some((h: any) => h.habit_id === t.id || h.title === t.title);
          const Icon = ICON_MAP[t.visuals?.icon] || t.icon || Activity;
          const color = t.visuals?.color || t.base_color;

          return (
              <div key={t.id} onClick={async () => {
                  if (!isActive) {
                      await supabase.from('habits').insert({
                          user_id: user?.id,
                          title: t.title,
                          habit_id: t.id,
                          frequency_type: t.default_config.frequency_type,
                          is_active: true,
                          base_color: color
                      });
                      window.location.reload();
                  }
              }} className={`p-5 rounded-xl bg-[#0b0c10] border transition-all relative overflow-hidden ${isActive ? 'border-emerald-500/30 opacity-50 cursor-default' : 'border-white/5 hover:border-white/20 cursor-pointer'}`}>
                  <div className="flex justify-between items-start mb-4">
                      <div className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center ${color?.replace('bg-', 'text-') || 'text-slate-500'}`}>
                          <Icon size={20} />
                      </div>
                      <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${isActive ? 'bg-emerald-900/20 text-emerald-500' : 'bg-white/5 text-slate-500'}`}>
                          {isActive ? 'ACTIVE' : 'PROTOCOL'}
                      </div>
                  </div>
                  <h3 className="text-sm font-bold text-slate-200 mb-1">{t.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-4">{t.description || t.lenses?.FORTITUDE?.why || "Standard Protocol."}</p>

                  {!isActive && (
                      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">INITIALIZE <ArrowRight size={12} /></div>
                  )}
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/10" />
              </div>
          );
      })}
    </div>
  );
};
