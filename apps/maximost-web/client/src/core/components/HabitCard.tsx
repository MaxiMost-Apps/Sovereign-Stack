import React, { useState, useEffect } from 'react';
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

  // COLOR LOGIC
  const getStyles = (cat: string) => {
    const c = cat?.toLowerCase() || '';
    if (c.includes('kinetic') || c.includes('bio')) return 'border-emerald-500/50 text-emerald-500 hover:bg-emerald-950/20';
    if (c.includes('cognitive') || c.includes('creation') || c.includes('neural')) return 'border-violet-500/50 text-violet-500 hover:bg-violet-950/20';
    if (c.includes('tactical') || c.includes('iron') || c.includes('combat')) return 'border-blue-500/50 text-blue-500 hover:bg-blue-950/20';
    return 'border-zinc-800 text-zinc-400 hover:bg-zinc-900';
  };

  const styles = getStyles(habit.category);
  const isDashboard = mode === 'dashboard';

  // Icon Logic
  let Icon = LucideIcons.Activity;
  const iconSource = habit.metadata?.visuals?.icon ?? habit.metadata?.tactical?.icon ?? habit.icon ?? 'Activity';

  if (iconSource) {
      if (typeof iconSource === 'function' || typeof iconSource === 'object') {
          // Direct Component (Sovereign Library)
          Icon = iconSource as any;
      } else if (typeof iconSource === 'string') {
          // String Lookup
          const ResolvedIcon = (LucideIcons as any)[iconSource];
          if (ResolvedIcon) Icon = ResolvedIcon;
      }
  }

  // REPAIR ORDER: Hide Goal/Time Display in Library Trays (Archive Mode)
  // AND Hide in Dashboard Library Tray (which uses mode='archive')
  // Basically, only show goal display if it's an ACTIVE habit row, which HabitCard is generally not used for (DailyHabitRow handles that).
  // HabitCard is used for the Library Grid on Dashboard and Archive Page.
  // So we should hide it always for HabitCard unless specifically requested.
  // The prompt says "Hide the target_value and unit labels on all cards in the Habit Library trays."
  const goalDisplay = null;

  // DUAL-ACTION HANDLERS
  const handleCardClick = (e: React.MouseEvent) => {
      // If Archive Mode: Adopt
      if (!isDashboard && onQuickImport) {
          onQuickImport(habit);
      } else if (isDashboard && onQuickImport) {
          // Dashboard Library Tray also uses onQuickImport for "Add to Dash"
          onQuickImport(habit);
      }
  };

  const handleInfoClick = (e: React.MouseEvent) => {
      e.stopPropagation(); // Stop card click
      if (onEdit) onEdit(habit);
      else setShowIntel(!showIntel);
  };

  // REPAIR ORDER: Fix Metadata Parsing for Intel Display
  const getIntelText = () => {
      if (showIntel) {
          // Prioritize Why/Identity, then Tactical
          return habit.metadata?.intel?.why ||
                 habit.metadata?.compiler?.why ||
                 habit.why_instruction || // If flattened
                 "Data Unavailable";
      } else {
          // Prioritize Tactical/Description
          // The prompt says "display the metadata.tactical string"
          // In DB, tactical might be a string or object.
          // Based on seeds: how_instruction -> metadata.compiler.step
          // Let's try multiple fallbacks
          const tactical = habit.metadata?.tactical;
          if (typeof tactical === 'string') return tactical;
          if (typeof tactical === 'object' && tactical?.instruction) return tactical.instruction;

          return habit.metadata?.compiler?.step ||
                 habit.description ||
                 "No tactical data";
      }
  };

  return (
    <div
        onClick={handleCardClick}
        className={cn(
            "relative group p-4 rounded-xl border bg-zinc-950/50 backdrop-blur-sm transition-all duration-300 flex items-center justify-between cursor-pointer",
            styles,
            (isDashboard && habit.completed) && "opacity-50 grayscale"
        )}
    >

      {/* LEFT FLANK: TITLE / INTEL SWAP */}
      <div className="flex items-center gap-4">
        {/* CHECKBOX (DASHBOARD ONLY - but HabitCard is usually Library view) */}
        {isDashboard && onToggle && (
            <button
            onClick={(e) => { e.stopPropagation(); onToggle(habit.id); }}
            className={cn(
                "w-6 h-6 rounded border flex items-center justify-center transition-all",
                habit.completed ? "bg-current border-transparent text-black" : "border-zinc-700 hover:border-white"
            )}
            >
            {habit.completed && <Check className="w-4 h-4" />}
            </button>
        )}

        {/* ICON (Archive Mode OR Dashboard Library Tray) */}
        {(!isDashboard || !onToggle) && (
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

            {/* THE INFO/EDIT TRIGGER (Anti-Shake Wrapper) */}
            <div
                className="relative w-5 h-5 flex items-center justify-center overflow-hidden"
                style={{ willChange: 'transform' }} // GPU isolation
            >
                <div
                onClick={handleInfoClick}
                className="cursor-help p-1 rounded-full hover:bg-white/10 transition-colors z-20 flex items-center justify-center w-full h-full"
                >
                    {onEdit ? <Settings className="w-3 h-3 opacity-50 hover:opacity-100" /> : <Info className="w-3 h-3 opacity-50 hover:opacity-100" />}
                </div>
            </div>
          </div>

          {/* SUBTEXT */}
          <span className={cn(
            "text-xs font-mono transition-all duration-300",
            showIntel ? "text-emerald-400" : "text-zinc-600"
          )}>
            {getIntelText()}
          </span>
        </div>
      </div>

      {/* RIGHT FLANK: ACTION AREA */}
      <div className="flex items-center gap-3">
        {/* Goal Display Removed */}

        {/* ARCHIVE MODE: IMPORT BUTTON (Visual only, click handled by card) */}
        {onQuickImport && (
            <button
                className="opacity-0 group-hover:opacity-100 transition-all px-3 py-1 text-[10px] font-bold uppercase tracking-widest border border-white/20 hover:bg-white hover:text-black rounded"
            >
                Import
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
