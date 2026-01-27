import React, { useEffect, useState } from 'react';
import { Activity, ArrowRight, Zap, Brain, Flame, Droplet, Moon, Sun, Coffee } from 'lucide-react';
import { getThemeStyles } from '../config/themeConfig';
import { SOVEREIGN_LIBRARY } from '../../data/sovereign_library';

const ICON_MAP: any = { Activity, Zap, Brain, Flame, Droplet, Moon, Sun, Coffee };

interface HabitArchiveProps {
  onAdopt?: (template: any) => void;
  mode?: 'library' | 'stacks';
}

export function HabitArchive({ onAdopt, mode = 'library' }: HabitArchiveProps) {
  console.log("✅ HABIT ARCHIVE TITAN LOADED (SOVEREIGN SOURCE)");
  const [items, setItems] = useState<any[]>(SOVEREIGN_LIBRARY);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((t) => {
        const colorInput = t.color || t.base_color || 'maximost_blue';
        const theme = getThemeStyles(colorInput);

        // Handle Component Icons
        const IconComponent = (typeof t.icon === 'function' || typeof t.icon === 'object') ? t.icon : (ICON_MAP[t.icon] || Activity);

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
                  {t.description || t.lenses?.FORTITUDE?.why || "Standard operational protocol."}
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
