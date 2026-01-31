import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Info, MoreHorizontal, Check } from 'lucide-react';
import * as Icons from 'lucide-react';

interface DailyHabitRowProps {
  habit: any;
  isLocked: boolean;
  isReordering: boolean;
  onToggle: (id: string) => void;
  onOpenInfo: (habit: any) => void;
  onOpenEdit: (habit: any) => void;
}

export const DailyHabitRow = ({
  habit,
  isLocked,
  isReordering,
  onToggle,
  onOpenInfo,
  onOpenEdit
}: DailyHabitRowProps) => {

  // DnD Hook
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: habit.id, disabled: !isReordering });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
    opacity: isDragging ? 0.5 : 1,
  };

  // Dynamic Icon
  const IconComponent = (Icons as any)[habit.visuals?.icon] || Icons.Activity;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        relative flex items-center justify-between p-4 rounded-xl border transition-all duration-200
        ${habit.completed
          ? 'bg-[#0A0F1C] border-blue-900/30'
          : 'bg-[#0A0F1C] border-white/5 hover:border-white/10'}
      `}
    >

      {/* LEFT: DRAG HANDLE (Conditional) */}
      {isReordering && (
        <div
          {...attributes}
          {...listeners}
          className="pr-4 cursor-grab active:cursor-grabbing text-slate-600 hover:text-white"
        >
          <GripVertical size={20} />
        </div>
      )}

      {/* CENTER: CONTENT */}
      <div className="flex items-center gap-4 flex-1">
        {/* Icon Box */}
        <div className={`
          w-10 h-10 rounded-lg flex items-center justify-center transition-colors
          ${habit.completed ? 'bg-blue-500 text-white' : 'bg-white/5 text-slate-400'}
        `}>
          {habit.completed ? <Check size={20} strokeWidth={3} /> : <IconComponent size={20} />}
        </div>

        {/* Text */}
        <div className="flex flex-col">
          <span className={`text-sm font-bold ${habit.completed ? 'text-blue-400 line-through decoration-blue-900' : 'text-slate-200'}`}>
            {habit.title}
          </span>
          <span className="text-[10px] text-slate-600 font-mono uppercase tracking-wider">
            {habit.default_config?.frequency_type === 'ABSOLUTE' ? 'Daily Protocol' : 'Frequency Target'}
          </span>
        </div>
      </div>

      {/* RIGHT: ACTIONS */}
      <div className="flex items-center gap-2">

        {/* TOGGLE (Always visible) */}
        {!isReordering && (
          <button
            onClick={() => onToggle(habit.id)}
            className={`
              w-12 h-8 rounded-full border transition-all flex items-center px-1
              ${habit.completed ? 'bg-blue-900/20 border-blue-500 justify-end' : 'bg-black border-white/10 justify-start'}
            `}
          >
            <div className={`w-5 h-5 rounded-full shadow-lg transition-all ${habit.completed ? 'bg-blue-500' : 'bg-slate-600'}`} />
          </button>
        )}

        {/* EDIT TOOLS (Only if Unlocked) */}
        {!isLocked && !isReordering && (
          <div className="flex items-center gap-1 pl-2 border-l border-white/5 ml-2">
            <button onClick={() => onOpenInfo(habit)} className="p-2 text-slate-600 hover:text-white transition-colors">
              <Info size={16} />
            </button>
            <button onClick={() => onOpenEdit(habit)} className="p-2 text-slate-600 hover:text-white transition-colors">
              <MoreHorizontal size={16} />
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
