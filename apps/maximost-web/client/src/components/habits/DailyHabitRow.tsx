import React, { useState } from 'react';
import { Info, MoreHorizontal, Check, Shield, Flame, Brain, Zap, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ICON_MAP } from '@/data/sovereign_library';

interface DailyHabitRowProps {
  habit: any;
  isLocked: boolean;
  date: Date;
  onToggle: (id: string, date?: number) => void;
  onOpenConfig?: (habit: any) => void;
}

export const DailyHabitRow = ({ habit, isLocked, date, onToggle, onOpenConfig }: DailyHabitRowProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isCompleted = habit.completed;

  const colorConfig: any = {
    blue: { glow: 'rgba(59, 130, 246, 0.5)', text: 'text-blue-500', bg: 'bg-blue-500' },
    red: { glow: 'rgba(239, 68, 68, 0.5)', text: 'text-red-500', bg: 'bg-red-500' },
    amber: { glow: 'rgba(245, 158, 11, 0.5)', text: 'text-amber-500', bg: 'bg-amber-500' },
    purple: { glow: 'rgba(168, 85, 247, 0.5)', text: 'text-purple-400', bg: 'bg-purple-500' },
    emerald: { glow: 'rgba(16, 185, 129, 0.5)', text: 'text-emerald-400', bg: 'bg-emerald-500' },
  };
  const theme = colorConfig[habit.visual_color] || colorConfig.blue;
  const frequencyType = habit.habit_type || 'ABSOLUTE';

  return (
    <div className="bg-[#0A0F1C] border border-white/5 rounded-2xl overflow-hidden group">
      <div className="flex items-center justify-between p-4">

        {/* Left Side: Title & Info */}
        <div className="flex items-center gap-3 flex-1">
          {/* Management Icons (Only visible when Unlocked) */}
          {!isLocked && (
            <div className="flex items-center gap-2 mr-2">
              <button
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                className={`p-1 rounded hover:bg-white/10 ${isDrawerOpen ? 'text-blue-400' : 'text-slate-600'}`}
              >
                <Info size={18} />
              </button>
              {onOpenConfig && (
                <button
                    onClick={() => onOpenConfig(habit)}
                    className="p-1 rounded hover:bg-white/10 text-slate-600 hover:text-white"
                >
                    <MoreHorizontal size={18} />
                </button>
              )}
            </div>
          )}

          <div>
            <h3 className={`font-bold text-sm transition-colors ${isCompleted ? 'text-slate-500 line-through' : 'text-white'}`}>{habit.title}</h3>
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">
              {habit.description} {habit.stack_labels && `• ${habit.stack_labels}`}
            </p>
          </div>
        </div>

        {/* Right Side: Toggle Action */}
        <div className="flex-shrink-0">
             {frequencyType === 'ABSOLUTE' ? (
                 <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onToggle(habit.id, date.getTime())}
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all
                        ${isCompleted ? `border-transparent ${theme.bg}` : 'border-slate-800 bg-transparent'}`}
                    style={{ boxShadow: isCompleted ? `0 0 15px ${theme.glow}` : 'none' }}
                 >
                    {isCompleted && <Check size={20} className="text-white" strokeWidth={3} />}
                 </motion.button>
             ) : (
                /* FREQUENCY LOGIC VISUAL */
                <button
                    onClick={() => onToggle(habit.id, date.getTime())}
                    className="relative h-8 w-24 bg-black/40 rounded-full border border-white/10 overflow-hidden flex items-center justify-center group/pill hover:border-blue-500/30 transition-all"
                >
                    <div
                        className={`absolute left-0 top-0 bottom-0 transition-all duration-500 ${theme.bg}`}
                        style={{ width: isCompleted ? '100%' : '30%' }}
                    />
                    <span className="relative z-10 text-[10px] font-bold font-mono text-white drop-shadow-md">
                        {isCompleted ? 'DONE' : 'LOG'}
                    </span>
                </button>
             )}
        </div>
      </div>

      {/* DRAWER: Identity Lenses */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-black/20 border-t border-white/5 overflow-hidden"
          >
            <div className="p-5 grid grid-cols-1 gap-4">
               {(habit.lens_stoic || habit.lens_operator || habit.lens_scientist || habit.lens_visionary) ? (
                 <>
                   {habit.lens_stoic && <div className="space-y-1"><span className="text-[9px] font-black text-slate-500 flex items-center gap-1 uppercase tracking-widest"><Shield size={10}/> STOIC</span><p className="text-[11px] text-slate-300 leading-relaxed font-mono">{habit.lens_stoic}</p></div>}
                   {habit.lens_operator && <div className="space-y-1"><span className="text-[9px] font-black text-red-500 flex items-center gap-1 uppercase tracking-widest"><Flame size={10}/> OPERATOR</span><p className="text-[11px] text-slate-300 leading-relaxed font-mono">{habit.lens_operator}</p></div>}
                   {habit.lens_scientist && <div className="space-y-1"><span className="text-[9px] font-black text-blue-400 flex items-center gap-1 uppercase tracking-widest"><Brain size={10}/> SCIENTIST</span><p className="text-[11px] text-slate-300 leading-relaxed font-mono">{habit.lens_scientist}</p></div>}
                   {habit.lens_visionary && <div className="space-y-1"><span className="text-[9px] font-black text-purple-400 flex items-center gap-1 uppercase tracking-widest"><Zap size={10}/> VISIONARY</span><p className="text-[11px] text-slate-300 leading-relaxed font-mono">{habit.lens_visionary}</p></div>}
                 </>
               ) : (
                 <div className="text-center py-4">
                    <p className="text-[10px] text-slate-600 font-mono italic">No lens directives configured.</p>
                 </div>
               )}
            </div>

            {habit.habit_type === 'TIMER' && (
              <div className="px-5 pb-5 pt-0 flex items-center justify-between">
                <span className="text-[10px] text-blue-500 font-black tracking-widest uppercase">ACTIVE PROTOCOL</span>
                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-4 py-1.5 rounded-full text-[10px] font-bold text-white transition-colors">
                    <Play size={10} /> START TIMER
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
