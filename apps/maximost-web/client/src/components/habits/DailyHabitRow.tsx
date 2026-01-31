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
  isLedgerMode?: boolean; // For "Atom Ledger" view (inactive habits)
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
      {/* Progress Bar Background for Frequency Habits (Optional visual flair) */}
      {frequencyType === 'FREQUENCY' && currentValue > 0 && (
         <div
           className="absolute bottom-0 left-0 h-0.5 bg-blue-500/50 transition-all duration-500"
           style={{ width: `${Math.min((currentValue / targetValue) * 100, 100)}%` }}
         />
      )}

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
           {/* Subtext / Streak */}
           <div className="text-[10px] text-gray-600 font-mono flex items-center gap-2">
               <span className={habit.streak > 0 ? "text-green-500" : ""}>Streak: {habit.streak || 0}</span>
               {frequencyType === 'FREQUENCY' && <span>• Target: {targetValue}</span>}
           </div>
        </div>
      </div>

      {/* 3. SMART INPUT */}
      <div className="flex-shrink-0">
         {frequencyType === 'ABSOLUTE' ? (
             /* BINARY CHECKBOX */
             <button
                onClick={() => onToggle(habit.habit_id)}
                className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
                  isCompleted
                  ? 'bg-blue-600 border-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)]'
                  : 'border-white/10 hover:border-blue-500/50 hover:bg-white/5'
                }`}
              >
                {isCompleted && <Check size={18} className="text-white animate-in zoom-in duration-200" strokeWidth={3} />}
              </button>
         ) : (
             /* FREQUENCY RING (1/3) */
             <button
                onClick={() => onToggle(habit.habit_id, 1)} // Increment
                className="relative w-10 h-10 flex items-center justify-center group/ring"
             >
                {/* SVG Ring */}
                <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 36 36">
                    <path
                        className="text-gray-800"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                    />
                    <path
                        className={`${isCompleted ? 'text-green-500' : 'text-blue-500'} transition-all duration-500`}
                        strokeDasharray={`${Math.min((currentValue / targetValue) * 100, 100)}, 100`}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                    />
                </svg>
                {/* Number Center */}
                <span className="absolute text-[9px] font-bold font-mono text-gray-300 group-hover/ring:text-white transition-colors">
                    {currentValue}/{targetValue}
                </span>
             </button>
         )}
      </div>
    </div>
  );
};
