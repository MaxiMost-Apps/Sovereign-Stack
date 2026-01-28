import React from 'react';
import { motion } from 'framer-motion';
import { Check, Info } from 'lucide-react';
import { ICON_MAP } from '@/data/sovereign_library';

interface DailyHabitRowProps {
  habit: any;
  index: number;
  onToggle: (id: string) => void;
  onOpenInfo: (habit: any) => void;
}

export const DailyHabitRow: React.FC<DailyHabitRowProps> = ({ habit, index, onToggle, onOpenInfo }) => {
  const Icon = habit.visuals?.icon ? (ICON_MAP[habit.visuals.icon] || Info) : Info;
  const isCompleted = habit.status === 'completed';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileTap={{ scale: 0.98 }}
      className="group relative flex items-center justify-between p-4 bg-[#0B1221] border border-white/5 rounded-2xl hover:border-white/10 transition-all cursor-pointer select-none"
      onClick={() => onToggle(habit.habit_id)}
    >

      {/* LEFT: Identity */}
      <div className="flex items-center gap-4 overflow-hidden">
        {/* Visual Circle */}
        <div className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
          isCompleted
            ? 'bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)]'
            : `${habit.visuals.color} text-white shadow-lg opacity-90`
        }`}>
          <motion.div
            key={isCompleted ? 'check' : 'icon'}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {isCompleted ? <Check size={24} strokeWidth={3} /> : <Icon size={22} strokeWidth={2.5} />}
          </motion.div>
        </div>

        {/* Text */}
        <div className="min-w-0">
          <h3 className={`text-sm font-bold tracking-wide truncate transition-colors ${
            isCompleted ? 'text-slate-500 line-through decoration-slate-600' : 'text-white'
          }`}>
            {habit.title}
          </h3>
          <p className="text-[10px] text-slate-500 truncate mt-0.5 font-medium">
            {habit.description}
          </p>
        </div>
      </div>

      {/* RIGHT: Actions */}
      <div className="flex items-center gap-2 pl-4">
        {/* Info Button (Drawer) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenInfo(habit);
          }}
          className="p-2 text-slate-600 hover:text-blue-400 hover:bg-white/5 rounded-full transition-colors active:scale-90"
        >
          <Info size={20} />
        </button>

        {/* Check Button (Visual only, whole row is clickable) */}
        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
          isCompleted ? 'border-green-500 bg-green-500/10' : 'border-slate-700 bg-slate-800/30'
        }`}>
          {isCompleted && <div className="w-3 h-3 rounded-full bg-green-500" />}
        </div>
      </div>

    </motion.div>
  );
};
