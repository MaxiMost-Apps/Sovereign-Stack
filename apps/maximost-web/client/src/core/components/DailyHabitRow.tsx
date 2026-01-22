import React, { useState, useRef, useEffect } from 'react';
import { Check, Edit2, Trash2, Activity, Zap, Brain, Flame, Droplet, Moon, Sun, Layout, Music, Anchor, Coffee, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getThemeStyles } from '../config/themeConfig';
import { motion, AnimatePresence } from 'framer-motion';
import CheckCircle from './ui/CheckCircle';

// 1. ICON MAPPER (Restores your Icons)
const ICON_MAP: any = {
  Activity, Zap, Brain, Flame, Droplet, Moon, Sun, Layout, Music, Anchor, Coffee
};

interface DailyHabitRowProps {
  habit: any;
  isCompleted: boolean;
  logEntry?: any;
  onToggle: (id: string, date: string, value?: number) => void;
  onEdit: () => void;
  onDelete: () => void;
  isSystemLocked: boolean;
  isSortMode: boolean;
  date: string;
  isFuture: boolean;
}

export default function DailyHabitRow({
  habit,
  isCompleted,
  logEntry,
  onToggle,
  onEdit,
  onDelete,
  isSystemLocked,
  isSortMode,
  date,
  isFuture
}: DailyHabitRowProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showInput, setShowInput] = useState(false); // Popover State
  const [inputValue, setInputValue] = useState('');

  // 2. THEME RESTORATION
  const theme = getThemeStyles(habit.color || 'maximost_blue');
  const IconComponent = ICON_MAP[habit.icon] || Activity;

  // 3. TARGET LOGIC
  const target = habit.daily_goal || habit.target_value || 1;
  const isQuantified = target > 1;
  const currentValue = logEntry?.value || 0;
  // Progress Logic for Border/Background?
  // Weekly view uses CheckCircle. We should reuse CheckCircle for consistency if possible,
  // or mimic it exactly. CheckCircle handles the visual logic.

  const isFullyComplete = currentValue >= target;

  const handleCheckClick = (e: any) => {
    e.stopPropagation();
    if (isSystemLocked || isFuture || isSortMode) return;

    if (isQuantified) {
      setInputValue(currentValue.toString());
      setShowInput(true);
    } else {
      onToggle(habit.id, date, isFullyComplete ? 0 : 1);
    }
  };

  const handleInputSave = () => {
      setShowInput(false);
      const val = parseInt(inputValue);
      if (!isNaN(val)) onToggle(habit.id, date, val);
  };

  return (
    <div className={cn(
      "group relative flex items-center justify-between p-3 rounded-xl border transition-all mb-3",
      "bg-[#0b0c10]", // Dark base
      isFullyComplete && !isQuantified ? "opacity-60 grayscale" : "opacity-100",
      isSortMode && "cursor-grab active:cursor-grabbing border-dashed border-slate-700"
    )}
    style={{
        // 4. RESTORE GLOW & BORDER COLOR
        borderColor: isFullyComplete ? theme.primary : 'rgba(255,255,255,0.1)',
        boxShadow: isFullyComplete ? `0 0 10px -5px ${theme.primary}` : 'none'
    }}>
      
      {/* LEFT: ICON & EDIT MENU */}
      <div className="flex items-center gap-4 flex-1">

        {/* CLICK ICON TO OPEN MENU */}
        <div className="relative">
            <button
                onClick={() => setShowMenu(!showMenu)}
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-105"
                style={{ backgroundColor: `${theme.primary}20`, color: theme.primary }}
            >
                <IconComponent size={20} />
            </button>

            {/* LEFT-SIDE MENU */}
            {showMenu && (
                <>
                <div className="fixed inset-0 z-[40]" onClick={() => setShowMenu(false)} />
                <div className="absolute left-0 top-11 w-32 bg-[#1a1d24] border border-white/10 rounded-lg shadow-2xl z-50 overflow-hidden">
                    <button onClick={() => { onEdit(); setShowMenu(false); }} className="w-full text-left px-4 py-3 text-xs font-bold text-slate-300 hover:bg-white/5 flex items-center gap-2">
                        <Edit2 size={12} /> Edit
                    </button>
                    <button onClick={() => { onDelete(); setShowMenu(false); }} className="w-full text-left px-4 py-3 text-xs font-bold text-red-500 hover:bg-red-500/10 flex items-center gap-2">
                        <Trash2 size={12} /> Delete
                    </button>
                </div>
                </>
            )}
        </div>
        
        <div className="flex flex-col cursor-pointer" onClick={() => setShowMenu(!showMenu)}>
          <span className="font-bold text-sm text-slate-200 group-hover:text-white transition-colors">
            {habit.title}
          </span>
          
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-wider uppercase" style={{ color: theme.secondary }}>
             {habit.frequency_type === 'weekly' && <span>Weekly Target</span>}
             {isQuantified && <span>{currentValue} / {target} {habit.unit}</span>}
          </div>
        </div>
      </div>

      {/* RIGHT: CIRCLE BUTTON (Uniformity) */}
      <div className="flex items-center gap-3 relative">
        {!isSortMode && (
           <div className="relative z-10">
               {/*
                  Using the CheckCircle component directly ensures visual consistency
                  with the Weekly Matrix (which uses CheckCircle).
                  Pass 'lg' for Daily view size (w-12 h-12 -> maybe too big? Daily row used w-8.
                  Let's check CheckCircle: lg=w-12, md=w-10.
                  The prompt says "w-8 h-8 rounded-full".
                  CheckCircle sizes might be slightly off.
                  Let's use a custom wrapper or modify CheckCircle props if needed.
                  But for "Uniformity", reusing the component is best.
                  Wait, CheckCircle doesn't have a 'sm' or 'custom' size.
                  I will manually implement the Circle UI here to match the specific "w-8 h-8" requirement from the prompt.
               */}

               <button
                 onClick={handleCheckClick}
                 disabled={isSystemLocked}
                 className={cn(
                   "w-8 h-8 rounded-full flex items-center justify-center transition-all relative border-2",
                   isFullyComplete ? "bg-transparent" : "bg-transparent hover:border-slate-500"
                 )}
                 style={{
                     borderColor: isFullyComplete ? theme.primary : '#334155',
                     backgroundColor: isFullyComplete ? theme.primary : 'transparent',
                     color: isFullyComplete ? '#000' : '#94a3b8',
                     boxShadow: isFullyComplete ? `0 0 10px ${theme.primary}` : 'none'
                 }}
               >
                  {isQuantified ? (
                      <span className="text-[10px] font-bold">{currentValue}</span>
                  ) : (
                      isFullyComplete && <Check size={16} strokeWidth={4} />
                  )}
               </button>

               {/* POPOVER INPUT (Quantified Only) */}
               <AnimatePresence>
                  {showInput && (
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-[100] flex items-center gap-2">
                          <motion.div
                              initial={{ scale: 0.8, opacity: 0, x: 20 }}
                              animate={{ scale: 1, opacity: 1, x: -50 }} // Slide to left of button
                              exit={{ scale: 0.8, opacity: 0, x: 20 }}
                              className="bg-[#0B0C10] border border-white/20 rounded-xl shadow-2xl p-1 flex items-center gap-1"
                          >
                              <input
                                  autoFocus
                                  type="number"
                                  value={inputValue}
                                  onChange={(e) => setInputValue(e.target.value)}
                                  onKeyDown={(e) => {
                                      if(e.key === 'Enter') handleInputSave();
                                      if(e.key === 'Escape') setShowInput(false);
                                  }}
                                  className="w-16 h-8 bg-black border border-white/10 rounded-lg text-center text-white font-bold outline-none focus:border-blue-500 text-sm"
                              />
                              <button onClick={handleInputSave} className="w-8 h-8 bg-blue-600 hover:bg-blue-500 rounded-lg flex items-center justify-center text-white">
                                  <Check size={14} />
                              </button>
                          </motion.div>

                          {/* Backdrop to close */}
                          <div className="fixed inset-0 z-[-1]" onClick={() => setShowInput(false)} />
                      </div>
                  )}
               </AnimatePresence>
           </div>
        )}
      </div>
      
      {/* PROGRESS BAR (Quantified Only) */}
      {isQuantified && currentValue > 0 && currentValue < target && (
        <div className="absolute bottom-0 left-0 h-[3px] transition-all duration-500" style={{ width: `${(currentValue/target)*100}%`, backgroundColor: theme.primary }} />
      )}
    </div>
  );
}
