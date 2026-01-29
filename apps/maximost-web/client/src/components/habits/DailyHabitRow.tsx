import React from 'react';
import { motion } from 'framer-motion';
import { Check, Info, MoreHorizontal, GripVertical, Plus } from 'lucide-react';
import { ICON_MAP } from '@/data/sovereign_library';

interface DailyHabitRowProps {
  habit: any;
  index: number;
  isReordering: boolean;
  isLocked: boolean;
  onToggle: (id: string, val?: number) => void;
  onOpenInfo: (habit: any) => void;
  onOpenEdit: (habit: any) => void;
}

export const DailyHabitRow: React.FC<DailyHabitRowProps> = ({ habit, index, isReordering, isLocked, onToggle, onOpenInfo, onOpenEdit }) => {
  const Icon = habit.visuals?.icon ? (ICON_MAP[habit.visuals.icon] || Info) : Info;
  const isCompleted = habit.status === 'completed';

  // Logic for measurable habits
  const config = habit.metadata?.config || habit.default_config || {};
  const targetVal = config.target_value || 1;
  const isMeasurable = targetVal > 1;
  const currentVal = habit.current_value || 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group flex items-center gap-4 p-4 bg-[#0B1221] border border-white/5 rounded-2xl hover:border-white/10 transition-all select-none"
    >

      {/* GRIPPER */}
      {isReordering && (
        <div className="text-slate-600 cursor-grab hover:text-white shrink-0">
          <GripVertical size={20} />
        </div>
      )}

      {/* ICON */}
      <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
        isCompleted ? 'bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.4)]' : `${habit.visuals.color} text-white shadow-lg opacity-90`
      }`}>
        {isCompleted ? <Check size={20} strokeWidth={3} /> : <Icon size={20} strokeWidth={2.5} />}
      </div>

      {/* TEXT & CONTROLS */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3">
          <h3 className={`text-sm font-bold tracking-wide truncate transition-colors ${isCompleted ? 'text-slate-500 line-through decoration-slate-600' : 'text-white'}`}>
            {habit.title}
          </h3>

          {/* ACTIONS */}
          {!isLocked && (
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
               <button onClick={(e) => { e.stopPropagation(); onOpenInfo(habit); }} className="p-1.5 text-slate-500 hover:text-blue-400 transition-colors"><Info size={16} /></button>
               <button onClick={(e) => { e.stopPropagation(); onOpenEdit(habit); }} className="p-1.5 text-slate-500 hover:text-white transition-colors"><MoreHorizontal size={16} /></button>
            </div>
          )}
        </div>

        {/* SUBTEXT / PROGRESS */}
        {isMeasurable ? (
           <div className="flex items-center gap-3 mt-1.5">
             <div className="h-1.5 w-24 bg-slate-800 rounded-full overflow-hidden">
               <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${Math.min((currentVal/targetVal)*100, 100)}%` }} />
             </div>
             <span className="text-[10px] font-mono text-slate-400">{currentVal}/{targetVal} {config.unit}</span>
           </div>
        ) : (
           <p className="text-[10px] text-slate-500 truncate mt-1 font-medium tracking-wide">{habit.description}</p>
        )}
      </div>

      {/* COMPLETION BUTTON */}
      {isMeasurable && !isCompleted ? (
        <button
          onClick={() => onToggle(habit.habit_id, 1)}
          className="shrink-0 w-12 h-12 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-500 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all active:scale-95"
        >
          <Plus size={20} strokeWidth={3} />
        </button>
      ) : (
        <button
          onClick={() => onToggle(habit.habit_id)}
          className={`shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ml-2 ${
            isCompleted
              ? 'bg-green-500 border-green-500 shadow-[0_0_15px_#22c55e] animate-pulse'
              : 'border-slate-700 hover:border-slate-500 bg-transparent'
          }`}
        >
          {isCompleted && <div className="w-full h-full rounded-full bg-green-500" />}
        </button>
      )}

    </motion.div>
  );
};
