import React from 'react';
import { GripVertical, Info, MoreHorizontal, Check } from 'lucide-react';
import { ICON_MAP } from '@/data/sovereign_library';

interface DailyHabitRowProps {
  habit: any;
  isLocked: boolean;
  onOpenInfo: (habit: any) => void;
  onOpenConfig: (habit: any) => void;
  onToggle: (id: string) => void;
}

export const DailyHabitRow: React.FC<DailyHabitRowProps> = ({
  habit,
  isLocked,
  onOpenInfo,
  onOpenConfig,
  onToggle
}) => {
  // Map Data
  const color = habit.visuals?.color?.replace('bg-', 'text-') || 'text-blue-500'; // Hack: extract color or default
  // Ideally, 'visuals.color' is a tailwind class like 'bg-blue-500'.
  // The spec code used inline styles: style={{ backgroundColor: `${habit.color}15`, color: habit.color }}
  // If habit.visuals.color is 'bg-blue-500', we can't easily convert to hex for inline style opacity.
  // We'll try to use the class directly for background if possible, or mapping.
  // Actually, 'sovereign_library.ts' has colors like 'bg-amber-500'.
  // Let's use the class for the icon container background and text color if possible.

  const IconComponent = ICON_MAP[habit.visuals?.icon] || Check;
  const isCompleted = habit.status === 'completed';

  // Helper to extract a hex-like color or fallback for the inline style opacity trick
  // Since we have Tailwind classes, it's better to use Tailwind opacity utilities if possible.
  // But the spec used style={{ backgroundColor: ... }}.
  // Let's just use the habit.color if it exists (mock) or map visuals.color class to a style.
  // To keep it simple and robust:
  const colorClass = habit.visuals?.color || 'bg-gray-500';

  return (
    <div className="group flex items-center gap-4 bg-white/2 px-4 py-4 rounded-xl border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all animate-in fade-in duration-500">

      {/* 1. Drag Handle (Hidden if Locked) */}
      {!isLocked && (
        <div className="cursor-grab active:cursor-grabbing text-gray-600 hover:text-gray-400 transition-colors">
          <GripVertical size={20} />
        </div>
      )}

      {/* 2. Habit Icon & Title */}
      <div className="flex items-center gap-4 flex-1">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClass} bg-opacity-10 text-white`}
          // style={{ backgroundColor: `${habit.color}15`, color: habit.color }} // Replaced with Tailwind classes
        >
          <IconComponent size={20} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h4 className={`text-base font-semibold tracking-tight ${isCompleted ? 'text-gray-500 line-through' : 'text-white'}`}>
                {habit.title}
            </h4>

            {/* Info and Edit Icons (Shown only if Unlocked) */}
            {!isLocked && (
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => onOpenInfo(habit)}
                  className="p-1.5 hover:bg-blue-400/10 text-gray-500 hover:text-blue-400 rounded-md transition-all"
                >
                  <Info size={14} />
                </button>
                <button
                  onClick={() => onOpenConfig(habit)}
                  className="p-1.5 hover:bg-white/10 text-gray-500 hover:text-gray-200 rounded-md transition-all"
                >
                  <MoreHorizontal size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Checkbox */}
      <button
        onClick={() => onToggle(habit.habit_id)}
        className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-all ${
          isCompleted
          ? 'bg-blue-600 border-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)]'
          : 'border-white/10 hover:border-blue-500/50'
        }`}
      >
        {isCompleted && <Check size={18} className="text-white" strokeWidth={3} />}
      </button>
    </div>
  );
};
