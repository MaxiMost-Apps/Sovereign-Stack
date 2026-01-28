import React from 'react';
import { motion } from 'framer-motion';
import { Check, Info, MoreVertical, GripVertical } from 'lucide-react';
import { ICON_MAP } from '@/data/sovereign_library';

interface DailyHabitRowProps {
  habit: any;
  index: number;
  isLocked: boolean; // Controls visibility of edit tools
  onToggle: (id: string) => void;
  onOpenInfo: (habit: any) => void;
}

export const DailyHabitRow: React.FC<DailyHabitRowProps> = ({ habit, index, isLocked, onToggle, onOpenInfo }) => {
  const Icon = habit.visuals?.icon ? (ICON_MAP[habit.visuals.icon] || Info) : Info;
  const isCompleted = habit.status === 'completed';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group flex items-center justify-between p-4 bg-[#0B1221] border border-white/5 rounded-2xl hover:border-white/10 transition-all select-none"
    >
      {/* LEFT: GRIPPER & INFO */}
      <div className="flex items-center gap-3">
        {/* Gripper (Only when Unlocked) */}
        {!isLocked && (
          <div className="text-slate-700 cursor-grab hover:text-slate-500">
            <GripVertical size={16} />
          </div>
        )}

        <div className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
          isCompleted ? 'bg-green-500 text-white' : `${habit.visuals.color} text-white shadow-lg opacity-90`
        }`}>
          {isCompleted ? <Check size={18} strokeWidth={3} /> : <Icon size={18} strokeWidth={2} />}
        </div>
      </div>

      {/* CENTER: TEXT */}
      <div className="flex-1 min-w-0 px-4 cursor-pointer" onClick={() => onToggle(habit.habit_id)}>
        <h3 className={`text-sm font-bold truncate transition-colors ${isCompleted ? 'text-slate-500 line-through' : 'text-white'}`}>
          {habit.title}
        </h3>
        {/* Removed "ABS" tag per request. Just the description now. */}
        <p className="text-[10px] text-slate-500 truncate">{habit.description}</p>
      </div>

      {/* RIGHT: ACTIONS */}
      <div className="flex items-center gap-1">

        {/* 3-DOT EDIT (Only when Unlocked) */}
        {!isLocked && (
          <button className="p-2 text-slate-600 hover:text-white rounded-full transition-colors">
            <MoreVertical size={16} />
          </button>
        )}

        {/* INFO (Always Visible) */}
        <button
          onClick={(e) => { e.stopPropagation(); onOpenInfo(habit); }}
          className="p-2 text-slate-600 hover:text-blue-400 rounded-full transition-colors"
        >
          <Info size={18} />
        </button>

        {/* CHECKBOX (Always Visible) */}
        <button
          onClick={() => onToggle(habit.habit_id)}
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ml-2 ${
            isCompleted
              ? 'bg-green-500/10 text-green-500 border border-green-500/20'
              : 'bg-slate-800/30 text-slate-600 border border-white/5 hover:bg-slate-800 hover:text-white'
          }`}
        >
          {isCompleted && <div className="w-2.5 h-2.5 rounded-full bg-green-500" />}
        </button>
      </div>

    </motion.div>
  );
};
