import {
  Check,
  GripVertical
} from 'lucide-react';
import { format, isSameDay } from 'date-fns';
import { motion } from 'framer-motion';
import { Habit, HabitCompletion } from '@/types/habit';
import HabitActionMenu from './HabitActionMenu';
import { getHabitStyle, getCheckColor } from '@/core/utils/getHabitStyle';
import { getLocalDate, isFuture } from '@/core/utils/dateUtils';

interface HabitRowProps {
  habit: Habit;
  completions?: HabitCompletion[];
  onToggleCompletion?: (habitId: string, date: Date, valueOverride?: number) => void;
  onEdit?: (habit: Habit) => void;
  onDelete?: (habitId: string) => void;
  dragHandleProps?: any;
  selectedDate?: Date;
}

export default function HabitRow({
  habit,
  completions = [],
  onToggleCompletion,
  onEdit,
  onDelete,
  dragHandleProps,
  selectedDate = new Date()
}: HabitRowProps) {

  const stopProp = (e: React.PointerEvent | React.MouseEvent) => {
    e.stopPropagation();
  };

  const weekDates = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() - 3 + i);
    return d;
  });

  return (
    // Phase 71: Updated to Flex-based row matching WeeklyMatrix header
    <div className={`flex items-center h-16 border-b border-gray-800 relative group ${getHabitStyle(habit.color)}`}>
       {/* LEFT COLUMN: Fixed Width 200px */}
       <div className="w-[200px] shrink-0 flex items-center gap-3 px-3 border-r border-gray-800/50 h-full overflow-hidden">
          {dragHandleProps && (
              <button
              className="cursor-grab active:cursor-grabbing mr-2 touch-none text-slate-400 hover:text-slate-600"
              {...dragHandleProps}
              onPointerDown={(e) => {
                 // Forward pointer down to drag handle logic if necessary,
                 // but dnd-kit usually handles this via listeners attached in parent wrapper.
                 // However, we passed dragHandleProps from SortableHabitRow.
                 // We should ensure this doesn't conflict.
                 // Actually, in `SortableHabitRow.tsx`, we saw {...attributes} {...listeners} on the WRAPPER div.
                 // So the whole row is draggable by default.
                 // If we want ONLY the handle to be draggable, we should have passed `activatorEvent` or similar.
                 // But assuming `SortableHabitRow` applies listeners to the wrapper, this handle might be redundant or visual only.
                 // Let's keep it but stop prop if needed.
                 // stopProp(e); // Careful: if listeners are on wrapper, stopping prop might block drag start?
                 // No, usually drag starts from the listener.
              }}
              >
              <GripVertical className="h-4 w-4" />
              </button>
          )}

          <div className="text-xl shrink-0">{habit.icon || '⚡'}</div>
          <div className="overflow-hidden min-w-0">
             <h4 className="font-bold text-white truncate text-xs">{habit.title}</h4>
             {habit.daily_goal > 1 && (
                <div className="text-[10px] text-gray-300 truncate">Target: {habit.daily_goal} {habit.unit}</div>
             )}
          </div>
       </div>

      {/* RIGHT COLUMNS: The Days (Flex-1) */}
      {weekDates.map((date, i) => {
        const dateStr = getLocalDate(date);
        const isToday = isSameDay(date, new Date());
        const isCompleted = completions.some(c => c.habitId === habit.id && c.date === dateStr && c.completed);
        const disabled = isFuture(dateStr);

        return (
          <div key={i} className="flex-1 flex items-center justify-center bg-gray-900/30 h-full border-l border-gray-800/50 relative">
            <motion.button
              onPointerDown={stopProp}
              disabled={disabled}
              whileTap={{ scale: 0.8 }}
              animate={{
                scale: isCompleted ? [1, 1.4, 1] : 1,
                boxShadow: isCompleted
                  ? "0 0 25px rgba(16, 185, 129, 0.8)"
                  : "0 0 0px rgba(0,0,0,0)",
                borderColor: isCompleted ? "#10b981" : "#334155"
              }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.5 }}
              onClick={() => {
                // @ts-ignore
                const val = habit.daily_goal > 1 ? habit.daily_goal : 1;
                onToggleCompletion?.(habit.id, date, isCompleted ? 0 : val);
              }}
              className={`
                w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center relative z-20
                ${disabled ? 'opacity-20 cursor-not-allowed' : 'cursor-pointer'}
                ${isCompleted
                    ? `${getCheckColor(habit.color)} text-white`
                    : `bg-gray-900 ${isToday ? 'border-gray-500' : 'border-gray-700'} hover:border-gray-500 text-transparent`
                }
              `}
            >
              {isCompleted && <Check className="h-3 w-3" />}
            </motion.button>
          </div>
        );
      })}

      {/* Action Menu - Absolute Positioned */}
      <div
        className="absolute right-1 top-1/2 -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 transition-opacity"
        onPointerDown={stopProp}
      >
          {onEdit && onDelete && (
             <HabitActionMenu habit={habit} onEdit={onEdit} onDelete={onDelete} />
          )}
      </div>
    </div>
  );
}
