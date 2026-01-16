import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Check,
  GripVertical,
  Pencil,
  X
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { format, isSameDay } from 'date-fns';
import { Habit, HabitCompletion } from '@/types/habit';
import { EnhancedHabitIcon } from "@/components/ui/habit-icon";

interface RichHabitCardProps {
  habit: Habit;
  completions?: HabitCompletion[];
  onToggleCompletion: (habitId: string, date: Date) => void;
  onEdit: (habit: Habit) => void;
  onDelete: (habitId: string) => void;
}

const colorSchemes = {
  red: { primary: "text-red-600", bg: "bg-red-100", lightBg: "bg-red-50/50", border: "border-red-200" },
  orange: { primary: "text-orange-600", bg: "bg-orange-100", lightBg: "bg-orange-50/50", border: "border-orange-200" },
  yellow: { primary: "text-yellow-600", bg: "bg-yellow-100", lightBg: "bg-yellow-50/50", border: "border-yellow-200" },
  green: { primary: "text-green-600", bg: "bg-green-100", lightBg: "bg-green-50/50", border: "border-green-200" },
  blue: { primary: "text-blue-600", bg: "bg-blue-100", lightBg: "bg-blue-50/50", border: "border-blue-200" },
  indigo: { primary: "text-indigo-600", bg: "bg-indigo-100", lightBg: "bg-indigo-50/50", border: "border-indigo-200" },
  purple: { primary: "text-purple-600", bg: "bg-purple-100", lightBg: "bg-purple-50/50", border: "border-purple-200" },
  pink: { primary: "text-pink-600", bg: "bg-pink-100", lightBg: "bg-pink-50/50", border: "border-pink-200" },
  slate: { primary: "text-slate-600", bg: "bg-slate-100", lightBg: "bg-slate-50/50", border: "border-slate-200" },
};

export function RichHabitCard({
  habit,
  completions = [],
  onToggleCompletion,
  onEdit,
  onDelete,
}: RichHabitCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: habit.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  let colorKey = habit.color || habit.iconColor || 'blue';
  if (!habit.color && !habit.iconColor) {
      if (habit.category === 'physical') colorKey = 'red';
      else if (habit.category === 'nutrition') colorKey = 'orange';
      else if (habit.category === 'sleep') colorKey = 'indigo';
      else if (habit.category === 'mental') colorKey = 'yellow';
  }

  // @ts-ignore
  const colors = colorSchemes[colorKey] || colorSchemes.slate;

  const today = new Date();

  const weekDates = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - 6 + i);
    return d;
  });

  const isEmoji = (str: string) => {
      return str && /\p{Emoji}/u.test(str) && str.length <= 4;
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`grid grid-cols-[2fr_repeat(7,1fr)] gap-1 mb-2 group rounded-md p-1 transition-all hover:shadow-md border ${colors.border} ${colors.lightBg}`}
    >
      {/* Header / Identity */}
      <div className="px-2 py-2 flex items-center relative">
        <button
          className="cursor-grab active:cursor-grabbing mr-2 touch-none text-slate-400 hover:text-slate-600"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2 min-w-0">
          <div className={`p-1.5 rounded-full ${colors.bg} flex items-center justify-center w-8 h-8`}>
             {isEmoji(habit.icon) ? (
                 <span className="text-sm">{habit.icon}</span>
             ) : (
                 <EnhancedHabitIcon icon={habit.icon} category={habit.category || 'physical'} className={`h-4 w-4 ${colors.primary}`} />
             )}
          </div>

          <div className="min-w-0 flex flex-col">
            <span className={`font-bold text-sm whitespace-nowrap overflow-hidden text-ellipsis block ${colors.primary}`}>
              {habit.title}
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <Badge variant="outline" className={`text-[9px] px-1 py-0 h-3.5 border-0 bg-white/50 ${colors.primary}`}>
                {habit.category}
              </Badge>
              <span className="text-[9px] text-muted-foreground flex items-center">
                 {habit.streak}🔥
              </span>
            </div>
          </div>
        </div>

        <div className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
            <button onClick={() => onEdit(habit)} className="p-1 rounded-full hover:bg-white/50 text-slate-500"><Pencil className="h-3 w-3" /></button>
            <button onClick={() => onDelete(habit.id)} className="p-1 rounded-full hover:bg-red-100 text-red-400"><X className="h-3 w-3" /></button>
        </div>
      </div>

      {/* Week Grid */}
      {weekDates.map((date, i) => {
        const isToday = isSameDay(date, today);
        const isCompleted = completions.some(c => c.habitId === habit.id && isSameDay(new Date(c.date), date) && c.completed);

        return (
          <div key={i} className="flex flex-col items-center justify-center">
            <span className="text-[9px] text-muted-foreground mb-1">{format(date, 'EEEEE')}</span>
            <button
              onClick={() => onToggleCompletion(habit.id, date)}
              className={`
                h-8 w-8 rounded-full flex items-center justify-center transition-all
                ${isCompleted
                    ? `bg-gradient-to-br from-${colorKey}-400 to-${colorKey}-600 text-white shadow-sm scale-105`
                    : `bg-white border-2 ${isToday ? colors.border : 'border-transparent'} hover:border-${colorKey}-300`
                }
              `}
            >
              {isCompleted && <Check className="h-4 w-4" />}
            </button>
          </div>
        );
      })}
    </div>
  );
}
