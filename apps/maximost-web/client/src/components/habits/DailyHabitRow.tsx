import React from 'react';
import { motion } from 'framer-motion';
import { Check, Info, MoreHorizontal, GripVertical, Plus } from 'lucide-react';
import { ICON_MAP } from '@/data/sovereign_library';

interface DailyHabitRowProps {
  habit: any;
  index: number;
  isReordering: boolean; // Toggled by Up/Down arrows
  isLocked: boolean;
  onToggle: (id: string, val?: number) => void;
  onOpenInfo: (habit: any) => void;
  onOpenEdit: (habit: any) => void;
}

export const DailyHabitRow: React.FC<DailyHabitRowProps> = ({ habit, index, isReordering, isLocked, onToggle, onOpenInfo, onOpenEdit }) => {
  const Icon = habit.visuals?.icon ? (ICON_MAP[habit.visuals.icon] || Info) : Info;
  const isCompleted = habit.status === 'completed';

  // Logic for measurable habits (e.g. Water 0/3)
  // We check 'metadata.config' first (user saved settings), then default_config
  const config = habit.metadata?.config || habit.default_config || {};
  const targetVal = config.target_value || 1;
  const isMeasurable = targetVal > 1;
  const currentVal = habit.current_value || 0;

  // Dynamic Shadow Color based on Habit Color (e.g. bg-blue-500 -> shadow-blue-500/50)
  // Simplified for V1: Use current color class string to infer style
  const pulseClass = isCompleted ? `animate-pulse shadow-[0_0_15px_currentColor]` : '';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group flex items-center p-3 bg-[#0B1221] border border-white/5 rounded-2xl hover:border-white/10 transition-all select-none gap-3"
    >

      {/* 1. GRIPPER (Controlled by Sort Toggle) */}
      {isReordering && (
        <div className="text-slate-700 cursor-grab hover:text-slate-500 shrink-0">
          <GripVertical size={16} />
        </div>
      )}

      {/* 2. ICON */}
      <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
        isCompleted ? 'bg-green-500 text-white' : `${habit.visuals.color} text-white shadow-lg opacity-90`
      }`}>
        {isCompleted ? <Check size={18} strokeWidth={3} /> : <Icon size={18} strokeWidth={2} />}
      </div>

      {/* 3. CENTER CONTENT */}
      <div className="flex flex-col justify-center flex-1 min-w-0">
        <div className="flex items-center gap-2">
          {/* Title */}
          <h3 className={`text-sm font-bold truncate transition-colors ${isCompleted ? 'text-slate-500 line-through decoration-slate-600' : 'text-white'}`}>
            {habit.title}
          </h3>

          {/* ACTIONS (i and ...) - Next to Name, Hidden on Lock */}
          {!isLocked && (
            <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
               <button onClick={(e) => { e.stopPropagation(); onOpenInfo(habit); }} className="p-1 text-slate-600 hover:text-blue-400 transition-colors"><Info size={14} /></button>
               <button onClick={(e) => { e.stopPropagation(); onOpenEdit(habit); }} className="p-1 text-slate-600 hover:text-white transition-colors"><MoreHorizontal size={14} /></button>
            </div>
          )}
        </div>

        {/* Progress Bar or Desc */}
        {isMeasurable ? (
           <div className="flex items-center gap-2 mt-1">
             <div className="h-1 w-24 bg-slate-800 rounded-full overflow-hidden">
               <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${Math.min((currentVal/targetVal)*100, 100)}%` }} />
             </div>
             <span className="text-[9px] font-mono text-slate-400">{currentVal}/{targetVal} {config.unit || 'reps'}</span>
           </div>
        ) : (
           <p className="text-[10px] text-slate-500 truncate mt-0.5 font-medium">{habit.description}</p>
        )}
      </div>

      {/* 4. COMPLETION ACTION (Pulsing Circle or Plus) */}
      {isMeasurable && !isCompleted ? (
        <button
          onClick={() => onToggle(habit.habit_id, 1)} // Increment by 1
          className="shrink-0 w-10 h-10 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-500 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all active:scale-95"
        >
          <Plus size={18} />
        </button>
      ) : (
        <button
          onClick={() => onToggle(habit.habit_id)}
          className={`shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all relative ${
            isCompleted
              ? `${habit.visuals.color.replace('bg-', 'border-').replace('500', '400')} ${habit.visuals.color}` // Dynamic Border/Fill
              : 'border-slate-700 bg-transparent hover:border-slate-500'
          }`}
        >
          {isCompleted && (
             <>
               {/* Pulsing Ring */}
               <div className={`absolute inset-0 rounded-full ${habit.visuals.color} animate-ping opacity-75`} />
               {/* Solid Fill */}
               <div className={`w-full h-full rounded-full ${habit.visuals.color}`} />
             </>
          )}
        </button>
      )}

    </motion.div>
  );
};
