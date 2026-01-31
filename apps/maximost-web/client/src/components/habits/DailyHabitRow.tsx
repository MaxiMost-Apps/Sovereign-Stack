import React, { useState } from 'react';
import { GripVertical, Info, MoreHorizontal, Check, Plus } from 'lucide-react';
import { ICON_MAP } from '@/data/sovereign_library';

interface DailyHabitRowProps {
  habit: any;
  isLocked: boolean;
  isReordering?: boolean;
  onOpenInfo?: (habit: any) => void;
  onOpenConfig?: (habit: any) => void;
  onToggle: (id: string, value?: number) => void;
  isLedgerMode?: boolean;
  date?: Date; // Add date to interface
}

export const DailyHabitRow: React.FC<DailyHabitRowProps> = ({
  habit,
  isLocked,
  isReordering = false,
  onOpenInfo,
  onOpenConfig,
  onToggle,
  isLedgerMode = false,
  date
}) => {
  // Safe Accessors
  const metadata = habit.metadata || {};
  const config = metadata.config || habit.default_config || {};
  const visuals = metadata.visuals || habit.visuals || {};

  const frequencyType = habit.habit_type || config.frequency_type || 'ABSOLUTE'; // Use updated schema prop
  const targetValue = habit.target_value || config.target_days || 1;
  const currentValue = habit.current_value || 0;

  const IconComponent = ICON_MAP[visuals.icon] || Check;
  const colorClass = habit.visual_color ? `bg-${habit.visual_color}-500` : (visuals.color || 'bg-blue-500');

  // Completed logic passed from parent or calculated
  const isCompleted = habit.completed;

  // --- LEDGER MODE (Inactive) ---
  if (isLedgerMode) {
      return (
        <div className="group flex items-center gap-4 bg-[#0A0F1C] px-4 py-3 rounded-lg border border-white/5 hover:border-blue-500/30 transition-all opacity-60 hover:opacity-100">
           {/* ... existing ledger logic ... */}
        </div>
      );
  }

  // --- ACTIVE MODE ---
  const theme = {
    bg: colorClass,
    glow: 'rgba(59, 130, 246, 0.5)' // simplified default
  };

  // Override theme based on color string
  if (habit.visual_color === 'red') theme.glow = 'rgba(239, 68, 68, 0.5)';
  if (habit.visual_color === 'amber') theme.glow = 'rgba(245, 158, 11, 0.5)';

  return (
    <div className="group flex items-center gap-4 bg-[#0B1221] px-4 py-4 rounded-xl border border-white/5 hover:bg-white/[0.02] hover:border-white/10 transition-all animate-in fade-in duration-500 relative overflow-hidden">

      {/* 1. Drag Handle */}
      {isReordering && (
        <div className="cursor-grab active:cursor-grabbing text-gray-500 hover:text-white transition-colors animate-in slide-in-from-left-2 duration-200">
          <GripVertical size={20} />
        </div>
      )}

      {/* 2. Habit Icon & Title */}
      <div className="flex items-center gap-4 flex-1">

        {/* Title Block */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className={`text-sm font-bold tracking-tight transition-colors ${isCompleted ? 'text-gray-500 line-through' : 'text-white'}`}>
                {habit.title}
            </h4>

            {/* Info and Edit Icons (Hidden if Locked) */}
            {!isLocked && (
              <div className="flex items-center gap-1 opacity-100 transition-opacity"> {/* REMOVED group-hover:opacity-100 for better mobile UX or testing */}
                {onOpenInfo && <button
                  onClick={() => onOpenInfo(habit)}
                  className="p-1 hover:bg-blue-400/10 text-gray-600 hover:text-blue-400 rounded-md transition-all"
                  title="HQ / Info"
                >
                  <Info size={14} />
                </button>}
                {onOpenConfig && <button
                  onClick={() => onOpenConfig(habit)}
                  className="p-1 hover:bg-white/10 text-gray-600 hover:text-gray-200 rounded-md transition-all"
                  title="Config"
                >
                  <MoreHorizontal size={14} />
                </button>}
              </div>
            )}
          </div>
           <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">
              {habit.description} {habit.stack_labels && `• ${habit.stack_labels}`}
           </p>
        </div>
      </div>

      {/* 3. VISUAL VARIANT (Absolute vs Frequency) */}
      <div className="flex-shrink-0">
         {frequencyType === 'ABSOLUTE' ? (
             /* BINARY CHECKBOX (Simple Circle) */
             <button
                onClick={() => onToggle(habit.id, date?.getTime())}
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300
                  ${isCompleted ? `border-transparent ${theme.bg}` : 'border-slate-800 bg-transparent'}`}
                style={{ boxShadow: isCompleted ? `0 0 15px ${theme.glow}` : 'none' }}
              >
                {isCompleted && <Check size={20} className="text-white animate-in zoom-in duration-200" strokeWidth={3} />}
              </button>
         ) : (
             /* FREQUENCY PILL */
              <button
                onClick={() => onToggle(habit.id, date?.getTime())} // Increment
                className="relative h-8 w-24 bg-black/40 rounded-full border border-white/10 overflow-hidden flex items-center justify-center group/pill hover:border-blue-500/30 transition-all"
             >
                <div
                    className={`absolute left-0 top-0 bottom-0 transition-all duration-500 bg-blue-600`}
                    style={{ width: `${Math.min((currentValue / targetValue) * 100, 100)}%` }}
                />
                <span className="relative z-10 text-[10px] font-bold font-mono text-white drop-shadow-md">
                    {currentValue} / {targetValue}
                </span>
             </button>
         )}
      </div>
    </div>
  );
};
