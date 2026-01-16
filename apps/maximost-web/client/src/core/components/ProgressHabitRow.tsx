import { Habit } from '@/types/habit';
import { EnhancedHabitIcon } from "@/components/ui/habit-icon";
import HabitActionMenu from './HabitActionMenu';

interface ProgressHabitRowProps {
  habit: Habit;
  currentValue: number;
  targetValue: number;
  unit: string;
  onUpdate: (value: number) => void;
  onEdit: (habit: Habit) => void;
  onDelete: (habitId: string) => void;
}

export default function ProgressHabitRow({ habit, currentValue, targetValue, unit, onUpdate, onEdit, onDelete }: ProgressHabitRowProps) {
  const isEmoji = (str: string) => str && /\p{Emoji}/u.test(str) && str.length <= 4;
  const isCompleted = currentValue >= targetValue;

  return (
    <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 flex items-center justify-between group hover:border-blue-500/30 transition-all">
      {/* LEFT: Identity */}
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-gray-700`}>
           {isEmoji(habit.icon) ? habit.icon : <EnhancedHabitIcon icon={habit.icon} category={habit.category} size="md" />}
        </div>
        <div>
          <h3 className={`font-bold text-lg ${isCompleted ? 'text-green-400' : 'text-white'}`}>
            {habit.title}
          </h3>
          <div className="flex gap-2 text-xs text-gray-400">
             <span className="uppercase tracking-wider">{habit.category || 'General'}</span>
             <span>• Target: {targetValue} {unit}</span>
          </div>
        </div>
      </div>

      {/* RIGHT: Actions */}
      <div className="flex items-center gap-4">
        {/* Progress Control */}
        <div className="flex items-center gap-1 bg-gray-900 rounded-lg p-1 border border-gray-700">
            <button
                onClick={() => onUpdate(Math.max(0, currentValue - 1))}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 rounded"
            >
                -
            </button>
            <span className={`text-sm font-bold w-16 text-center ${isCompleted ? 'text-green-400' : 'text-white'}`}>
                {currentValue} <span className="text-gray-500">/</span> {targetValue}
            </span>
            <button
                onClick={() => onUpdate(currentValue + 1)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 rounded"
            >
                +
            </button>
        </div>

        {/* 3 DOTS MENU */}
        <HabitActionMenu habit={habit} onEdit={onEdit} onDelete={onDelete} />
      </div>
    </div>
  );
}
