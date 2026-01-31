import React, { useState } from 'react';
import { Info, MoreHorizontal, Check, Shield, Flame, Brain, Zap, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const DailyHabitRow = ({ habit, isLocked, date, onToggle }: any) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isCompleted = habit.completed;

  const colorConfig: any = {
    blue: { glow: 'rgba(59, 130, 246, 0.5)', text: 'text-blue-500', bg: 'bg-blue-500' },
    red: { glow: 'rgba(239, 68, 68, 0.5)', text: 'text-red-500', bg: 'bg-red-500' },
    amber: { glow: 'rgba(245, 158, 11, 0.5)', text: 'text-amber-500', bg: 'bg-amber-500' },
  };
  const theme = colorConfig[habit.visual_color] || colorConfig.blue;

  return (
    <div className="bg-[#0A0F1C] border border-white/5 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3 flex-1">
          {!isLocked && (
            <div className="flex items-center gap-2 mr-2">
              <button onClick={() => setIsDrawerOpen(!isDrawerOpen)}><Info size={18} className="text-slate-600" /></button>
              <button><MoreHorizontal size={18} className="text-slate-600" /></button>
            </div>
          )}
          <div>
            <h3 className={`font-bold text-sm ${isCompleted ? 'text-slate-500 line-through' : 'text-white'}`}>{habit.title}</h3>
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">
              {habit.description} {habit.stack_labels && `• STACKS: ${habit.stack_labels}`}
            </p>
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => onToggle(habit.id, date)}
          className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all
            ${isCompleted ? `border-transparent ${theme.bg}` : 'border-slate-800 bg-transparent'}`}
          style={{ boxShadow: isCompleted ? `0 0 15px ${theme.glow}` : 'none' }}
        >
          {isCompleted && <Check size={20} className="text-white" strokeWidth={3} />}
        </motion.button>
      </div>

      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="bg-black/20 border-t border-white/5 p-4 overflow-hidden">
            <div className="grid grid-cols-2 gap-4 text-[10px] font-mono">
              <div className="space-y-1"><span className="text-slate-500 flex items-center gap-1"><Shield size={10}/> STOIC</span><p className="text-white">{habit.lens_stoic}</p></div>
              <div className="space-y-1"><span className="text-red-500 flex items-center gap-1"><Flame size={10}/> OPERATOR</span><p className="text-white">{habit.lens_operator}</p></div>
              <div className="space-y-1"><span className="text-blue-400 flex items-center gap-1"><Brain size={10}/> SCIENTIST</span><p className="text-white">{habit.lens_scientist}</p></div>
              <div className="space-y-1"><span className="text-purple-400 flex items-center gap-1"><Zap size={10}/> VISIONARY</span><p className="text-white">{habit.lens_visionary}</p></div>
            </div>
            {habit.habit_type === 'TIMER' && (
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] text-blue-500 font-black">ACTIVE PROTOCOL</span>
                <button className="flex items-center gap-2 bg-blue-600 px-4 py-1.5 rounded-full text-[10px] font-bold"><Play size={10} /> START TIMER</button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
