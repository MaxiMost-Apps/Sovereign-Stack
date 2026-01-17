import React, { useState } from 'react';
import { Check, Info, Activity, Zap, Brain, Settings, Target } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Habit } from '@/types/habit';
import * as LucideIcons from 'lucide-react';

interface HabitCardProps {
  habit: Habit;
  mode?: 'dashboard' | 'archive';
  onToggle?: (id: string) => void;
  onQuickImport?: (habit: Habit) => void;
  onEdit?: (habit: Habit) => void;
}

export const HabitCard = ({ habit, mode = 'dashboard', onToggle, onQuickImport, onEdit }: HabitCardProps) => {
  const [showIntel, setShowIntel] = useState(false);

  // COLOR LOGIC (Restored & Enhanced)
  const getStyles = (cat: string) => {
    const c = cat?.toLowerCase() || '';
    if (c.includes('kinetic') || c.includes('bio')) return 'border-emerald-500/50 text-emerald-500 hover:bg-emerald-950/20';
    if (c.includes('cognitive') || c.includes('creation') || c.includes('neural')) return 'border-violet-500/50 text-violet-500 hover:bg-violet-950/20';
    if (c.includes('tactical') || c.includes('iron') || c.includes('combat')) return 'border-blue-500/50 text-blue-500 hover:bg-blue-950/20'; // Blue or Red? 'combat' usually red, but 'tactical' often blue/steel. Let's use Blue for standard, maybe Red for specific themes.
    // Fallback based on specific theme if available
    const theme = habit.metadata?.visuals?.theme || habit.theme || '';
    if (theme.includes('red') || theme.includes('combat')) return 'border-red-500/50 text-red-500 hover:bg-red-950/20';
    if (theme.includes('steel') || theme.includes('slate')) return 'border-slate-500/50 text-slate-400 hover:bg-slate-900';

    return 'border-zinc-800 text-zinc-400 hover:bg-zinc-900';
  };

  const styles = getStyles(habit.category);
  const isDashboard = mode === 'dashboard';

  // Icon Logic
  let Icon = LucideIcons.Activity;
  const iconName = habit.metadata?.visuals?.icon ?? habit.metadata?.tactical?.icon ?? habit.icon ?? 'Activity';
  if (iconName && typeof iconName === 'string') {
      const ResolvedIcon = (LucideIcons as any)[iconName];
      if (ResolvedIcon) Icon = ResolvedIcon;
  }

  // Goal/Type Logic
  const goalDisplay = habit.type === 'boolean'
        ? (habit.target_value ? `${habit.target_value}x / ${habit.unit || 'day'}` : '1x / day')
        : (habit.target_value ? `${habit.target_value} ${habit.unit || 'mins'}` : null);

  return (
    <div className={cn(
      "relative group p-4 rounded-xl border bg-zinc-950/50 backdrop-blur-sm transition-all duration-300 flex items-center justify-between",
      styles,
      (isDashboard && habit.completed) && "opacity-50 grayscale"
    )}>

      {/* LEFT FLANK: TITLE / INTEL SWAP */}
      <div className="flex items-center gap-4">
        {/* CHECKBOX (DASHBOARD ONLY) */}
        {isDashboard && onToggle && (
            <button
            onClick={() => onToggle(habit.id)}
            className={cn(
                "w-6 h-6 rounded border flex items-center justify-center transition-all",
                habit.completed ? "bg-current border-transparent text-black" : "border-zinc-700 hover:border-white"
            )}
            >
            {habit.completed && <Check className="w-4 h-4" />}
            </button>
        )}

        {/* ICON (ARCHIVE ONLY - Replaces Checkbox for visual balance) */}
        {!isDashboard && (
             <div className="w-8 h-8 rounded border border-white/10 flex items-center justify-center bg-white/5">
                 <Icon className="w-4 h-4 opacity-70" />
             </div>
        )}

        {/* TEXT PAYLOAD */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className={cn(
              "font-bold uppercase tracking-wide text-sm transition-all duration-300",
              showIntel ? "text-xs text-zinc-500" : "text-white"
            )}>
              {showIntel ? "MISSION / LOGIC:" : habit.title}
            </span>

            {/* THE INTEL TRIGGER */}
            <div
              onMouseEnter={() => setShowIntel(true)}
              onMouseLeave={() => setShowIntel(false)}
              className="cursor-help p-1 rounded-full hover:bg-white/10 transition-colors"
            >
              <Info className="w-3 h-3 opacity-50 hover:opacity-100" />
            </div>
          </div>

          {/* SUBTEXT (Tactical Description OR Intel Why) */}
          <span className={cn(
            "text-xs font-mono transition-all duration-300",
            showIntel ? "text-emerald-400" : "text-zinc-600"
          )}>
            {showIntel
              ? (habit.metadata?.intel?.why || habit.metadata?.compiler?.why || "Data Unavailable")
              : (habit.metadata?.tactical?.description || habit.description || "No tactical data")}
          </span>
        </div>
      </div>

      {/* RIGHT FLANK: ACTION AREA */}
      <div className="flex items-center gap-3">
        {/* GOAL DISPLAY (If Available) */}
        {goalDisplay && (
            <div className="hidden md:flex items-center gap-1.5 px-2 py-1 bg-white/5 rounded border border-white/5 text-[10px] text-zinc-500 uppercase font-mono tracking-wide">
                <Target className="w-3 h-3" />
                <span>{goalDisplay}</span>
            </div>
        )}

        {/* ARCHIVE MODE: IMPORT BUTTON */}
        {!isDashboard && onQuickImport && (
            <button
                onClick={() => onQuickImport(habit)}
                className="opacity-0 group-hover:opacity-100 transition-all px-3 py-1 text-[10px] font-bold uppercase tracking-widest border border-white/20 hover:bg-white hover:text-black rounded"
            >
                Import
            </button>
        )}

        {/* SETTINGS (Both Modes, optional) */}
        {onEdit && (
             <button onClick={() => onEdit(habit)} className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-500 hover:text-white">
                 <Settings className="w-4 h-4" />
             </button>
        )}

        {/* CATEGORY ICON */}
        <div className="opacity-20 group-hover:opacity-100 transition-opacity">
            {(habit.category === 'Kinetic' || habit.category?.includes('bio')) && <Activity className="w-5 h-5" />}
            {(habit.category === 'Cognitive' || habit.category?.includes('black_box')) && <Zap className="w-5 h-5" />}
            {(habit.category === 'Tactical' || habit.category?.includes('armor')) && <Brain className="w-5 h-5" />}
        </div>
      </div>
    </div>
  );
};
