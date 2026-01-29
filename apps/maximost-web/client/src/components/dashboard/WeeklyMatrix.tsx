import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export const WeeklyMatrix = ({ habits, isLocked }: any) => {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div className="space-y-4 animate-in fade-in">
      <div className="grid grid-cols-[2fr_repeat(7,1fr)] gap-2 mb-2 px-2">
        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">PROTOCOL</div>
        {days.map((d, i) => (
          <div key={i} className="text-center text-[10px] font-black text-slate-600">{d}</div>
        ))}
      </div>

      {habits.map((h: any, i: number) => (
        <motion.div
          key={h.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="grid grid-cols-[2fr_repeat(7,1fr)] gap-2 items-center bg-[#0B1221] border border-white/5 p-3 rounded-xl hover:border-white/10 transition-colors"
        >
          <div className="truncate text-xs font-bold text-white pl-2">{h.title}</div>
          {days.map((_, dayIndex) => {
             // Mock logic for matrix visualization - in real app would check completion by date
             const isCompleted = Math.random() > 0.5;
             return (
               <div key={dayIndex} className="flex justify-center">
                 <div className={`w-6 h-6 rounded-md flex items-center justify-center transition-all ${isCompleted ? 'bg-green-500/20 text-green-500' : 'bg-white/5 text-slate-700'}`}>
                   {isCompleted && <Check size={12} strokeWidth={4} />}
                 </div>
               </div>
             )
          })}
        </motion.div>
      ))}
    </div>
  );
};
