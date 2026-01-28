import React from 'react';
import { motion } from 'framer-motion';
import { Check, Info, Activity } from 'lucide-react';
import { ICON_MAP } from '@/data/sovereign_library';

interface DailyHabitRowProps {
  habit: any;
  index: number;
  onToggle: (id: string) => void;
  onOpenInfo: (habit: any) => void;
}

export const DailyHabitRow: React.FC<DailyHabitRowProps> = ({ habit, index, onToggle, onOpenInfo }) => {
  const Icon = habit.visuals?.icon ? (ICON_MAP[habit.visuals.icon] || Activity) : Activity;
  const isCompleted = habit.status === 'completed';
  const isFrequency = habit.default_config.frequency_type === 'FREQUENCY';
  const target = habit.default_config.target_days || 7;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onToggle(habit.habit_id)}
      className="group relative flex items-center gap-4 p-4 glass-panel glass-panel-hover rounded-2xl cursor-pointer select-none"
    >
      <div className={`relative shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${isCompleted ? 'bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)] scale-105' : `${habit.visuals.color} text-white shadow-lg opacity-90`}`}>
        <motion.div key={isCompleted ? 'check' : 'icon'} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
          {isCompleted ? <Check size={24} strokeWidth={3} /> : <Icon size={22} strokeWidth={2.5} />}
        </motion.div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className={`text-sm font-bold tracking-wide truncate transition-colors ${isCompleted ? 'text-slate-500 line-through decoration-slate-600' : 'text-white'}`}>{habit.title}</h3>
          <span className={`text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded ${isFrequency ? 'bg-blue-500/10 text-blue-400' : 'bg-red-500/10 text-red-400'}`}>{isFrequency ? `${target}/WK` : 'ABS'}</span>
        </div>
        <p className="text-[10px] text-slate-500 truncate mt-0.5 font-medium">{habit.description}</p>
      </div>
      <div className="flex items-center gap-1">
        <button onClick={(e) => { e.stopPropagation(); onOpenInfo(habit); }} className="p-3 text-slate-600 hover:text-blue-400 hover:bg-white/5 rounded-full transition-colors active:scale-90"><Info size={20} /></button>
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${isCompleted ? 'border-green-500 bg-green-500/20' : 'border-slate-700 bg-slate-800/50'}`}>
          {isCompleted && <div className="w-2.5 h-2.5 rounded-full bg-green-500" />}
        </div>
      </div>
    </motion.div>
  );
};
