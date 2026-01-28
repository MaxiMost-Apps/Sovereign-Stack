import React from 'react';
import { motion } from 'framer-motion';
import { Check, Info, MoreHorizontal, GripVertical } from 'lucide-react';
import { ICON_MAP } from '@/data/sovereign_library';

interface DailyHabitRowProps {
  habit: any;
  index: number;
  isLocked: boolean;
  onToggle: (id: string) => void;
  onOpenInfo: (habit: any) => void;
  onOpenEdit: (habit: any) => void; // New prop for 3-dots
}

export const DailyHabitRow: React.FC<DailyHabitRowProps> = ({ habit, index, isLocked, onToggle, onOpenInfo, onOpenEdit }) => {
  const Icon = habit.visuals?.icon ? (ICON_MAP[habit.visuals.icon] || Info) : Info;
  const isCompleted = habit.status === 'completed';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group flex items-center p-3 bg-[#0B1221] border border-white/5 rounded-2xl hover:border-white/10 transition-all select-none gap-3"
    >

      {/* 1. GRIPPER (Leftmost - Hidden when Locked) */}
      {!isLocked && (
        <div className="text-slate-700 cursor-grab hover:text-slate-500 shrink-0">
          <GripVertical size={16} />
        </div>
      )}

      {/* 2. ICON (Always Visible) */}
      <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
        isCompleted ? 'bg-green-500 text-white' : `${habit.visuals.color || 'bg-slate-700'} text-white shadow-lg`
      }`}>
        {isCompleted ? <Check size={18} strokeWidth={3} /> : <Icon size={18} strokeWidth={2} />}
      </div>

      {/* 3. NAME & DESCRIPTION + INLINE ACTIONS */}
      <div className="flex flex-col justify-center flex-1 min-w-0">

        {/* ROW 1: Title + Action Buttons */}
        <div className="flex items-center gap-2">
          <h3 className={`text-sm font-bold truncate transition-colors ${isCompleted ? 'text-slate-500 line-through' : 'text-white'}`}>
            {habit.title}
          </h3>

          {/* THE BUTTONS (Next to name, Hidden when Locked) */}
          {!isLocked && (
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
               <button onClick={(e) => { e.stopPropagation(); onOpenInfo(habit); }} className="p-1 text-slate-500 hover:text-blue-400 transition-colors">
                 <Info size={14} />
               </button>
               <button onClick={(e) => { e.stopPropagation(); onOpenEdit(habit); }} className="p-1 text-slate-500 hover:text-white transition-colors">
                 <MoreHorizontal size={14} />
               </button>
            </div>
          )}
        </div>

        {/* ROW 2: Description */}
        <p className="text-[10px] text-slate-500 truncate">{habit.description}</p>
      </div>

      {/* 4. CHECK BUTTON (Far Right - Always Visible) */}
      <button
        onClick={() => onToggle(habit.habit_id)}
        className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
          isCompleted
            ? 'bg-green-500/10 text-green-500 border border-green-500/20'
            : 'bg-slate-800/30 text-slate-600 border border-white/5 hover:bg-slate-700 hover:text-white'
        }`}
      >
        {isCompleted && <div className="w-2.5 h-2.5 rounded-full bg-green-500" />}
      </button>

    </motion.div>
  );
};
