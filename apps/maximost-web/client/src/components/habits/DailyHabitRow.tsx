import React from 'react';
import { GripVertical, Info, MoreHorizontal, Check, Plus } from 'lucide-react';
import { ICON_MAP } from '@/data/sovereign_library';

interface DailyHabitRowProps {
  habit: any;
  isLocked: boolean;
  isReordering?: boolean;
  onOpenInfo: (habit: any) => void;
  onOpenConfig: (habit: any) => void;
  onToggle: (id: string, value?: number) => void;
  isLedgerMode?: boolean; // For "Reserves" view (inactive habits)
}

export const DailyHabitRow: React.FC<DailyHabitRowProps> = ({
  habit,
  isLocked,
  isReordering = false,
  onOpenInfo,
  onOpenConfig,
  onToggle,
  isLedgerMode = false
}) => {
  // Safe Accessors
  const metadata = habit.metadata || {};
  const config = metadata.config || habit.default_config || {};
  const visuals = metadata.visuals || habit.visuals || {};

  const frequencyType = config.frequency_type || 'ABSOLUTE';
  const targetValue = habit.target_value || config.target_days || 1; // Fallback logic
  const currentValue = habit.current_value || 0;

  const IconComponent = ICON_MAP[visuals.icon] || Check;
  const colorClass = visuals.color || 'bg-blue-500';
  const isCompleted = habit.status === 'completed';

  // --- LEDGER MODE (Inactive) ---
  if (isLedgerMode) {
      return (
        <div className="group flex items-center gap-4 bg-[#0A0F1C] px-4 py-3 rounded-lg border border-white/5 hover:border-blue-500/30 transition-all opacity-60 hover:opacity-100">
           <div className={`w-8 h-8 rounded-md flex items-center justify-center ${colorClass} bg-opacity-10 text-white/50 group-hover:text-white`}>
              <IconComponent size={16} />
           </div>
           <div className="flex-1">
              <h4 className="text-sm font-bold text-gray-400 group-hover:text-white transition-colors">{habit.title}</h4>
           </div>
           <button
             onClick={() => onToggle(habit.habit_id)} // Toggle effectively "Equips" it (sets to active)
             className="px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500 text-blue-500 hover:text-white text-[10px] font-bold uppercase tracking-widest rounded transition-all flex items-center gap-2"
           >
             <Plus size={12} /> Equip
           </button>
        </div>
      );
  }

  // --- ACTIVE MODE ---
  return (
    <div className="group flex items-center gap-4 bg-[#0B1221] px-4 py-4 rounded-xl border border-white/5 hover:bg-white/[0.02] hover:border-white/10 transition-all animate-in fade-in duration-500 relative overflow-hidden">

      {/* 1. Drag Handle (Visible ONLY if Reordering is true) */}
      {isReordering && (
        <div className="cursor-grab active:cursor-grabbing text-gray-500 hover:text-white transition-colors animate-in slide-in-from-left-2 duration-200">
          <GripVertical size={20} />
        </div>
      )}

      {/* 2. Habit Icon & Title */}
      <div className="flex items-center gap-4 flex-1">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClass} bg-opacity-10 text-white shadow-[0_0_15px_-5px_rgba(255,255,255,0.1)]`}
        >
          <IconComponent size={20} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h4 className={`text-sm font-bold tracking-tight transition-colors ${isCompleted ? 'text-gray-500 line-through' : 'text-white'}`}>
                {habit.title}
            </h4>

            {/* Info and Edit Icons (Hidden if Locked) */}
            {!isLocked && (
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => onOpenInfo(habit)}
                  className="p-1 hover:bg-blue-400/10 text-gray-600 hover:text-blue-400 rounded-md transition-all"
                  title="HQ / Info"
                >
                  <Info size={14} />
                </button>
                <button
                  onClick={() => onOpenConfig(habit)}
                  className="p-1 hover:bg-white/10 text-gray-600 hover:text-gray-200 rounded-md transition-all"
                  title="Config"
                >
                  <MoreHorizontal size={14} />
                </button>
              </div>
            )}
          </div>
           {/* Subtext removed for cleaner look as per V1.8 spec, unless necessary */}
        </div>
      </div>

      {/* 3. VISUAL VARIANT (Absolute vs Frequency) */}
      <div className="flex-shrink-0">
         {frequencyType === 'ABSOLUTE' ? (
             /* BINARY CHECKBOX (Simple Circle) */
             <button
                onClick={() => onToggle(habit.habit_id)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  isCompleted
                  ? 'bg-blue-600 border-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)]'
                  : 'border-white/20 hover:border-blue-500/50 hover:bg-white/5'
                }`}
              >
                {isCompleted && <Check size={14} className="text-white animate-in zoom-in duration-200" strokeWidth={4} />}
              </button>
         ) : (
             /* FREQUENCY PILL (Progress Bar Style) */
             <button
                onClick={() => onToggle(habit.habit_id, 1)} // Increment
                className="relative h-8 w-24 bg-black/40 rounded-full border border-white/10 overflow-hidden flex items-center justify-center group/pill hover:border-blue-500/30 transition-all"
             >
                {/* Background Bar */}
                <div
                    className={`absolute left-0 top-0 bottom-0 transition-all duration-500 ${currentValue >= targetValue ? 'bg-green-500' : 'bg-blue-600'}`}
                    style={{ width: `${Math.min((currentValue / targetValue) * 100, 100)}%` }}
                />

                {/* Text Overlay */}
                <span className="relative z-10 text-[10px] font-bold font-mono text-white drop-shadow-md">
                    {currentValue} / {targetValue}
                </span>
             </button>
         )}
      </div>
    </div>
  );
};
