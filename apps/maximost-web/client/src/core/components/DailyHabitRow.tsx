import React, { useState } from 'react';
import { Check, Plus, Minus, MoreVertical, Edit2, Trash2, RotateCcw, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { getThemeStyles } from '../config/themeConfig';

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
  allLogs?: any;
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
  const theme = getThemeStyles(habit.color);
  
  // 1. DETERMINE MODE: Boolean (Check) vs Quantitative (Numbers)
  const target = habit.daily_goal || habit.target_value || 1;
  const isQuantified = target > 1;
  const currentValue = logEntry?.value || 0;
  
  // 2. PROGRESS CALCULATION
  const progress = Math.min((currentValue / target) * 100, 100);
  const isFullyComplete = currentValue >= target;

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSystemLocked || isFuture) return;
    const next = currentValue + 1;
    onToggle(habit.id, date, next);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSystemLocked || isFuture || currentValue <= 0) return;
    const next = currentValue - 1;
    // If going to 0, send 0 (which usually deletes the log in the backend)
    onToggle(habit.id, date, next);
  };

  const handleCheck = () => {
    if (isSystemLocked || isFuture) return;
    // Toggle: If complete, set to 0. If incomplete, set to Target (Instant finish)
    const val = isFullyComplete ? 0 : target;
    onToggle(habit.id, date, val);
  };

  return (
    <div className={cn(
      "group relative flex items-center justify-between p-3 rounded-xl border transition-all mb-3",
      "bg-[#0b0c10] border-white/5 hover:border-white/10",
      isFullyComplete ? "opacity-50 grayscale" : "opacity-100",
      isSortMode && "cursor-grab active:cursor-grabbing border-dashed border-slate-700"
    )}>
      
      {/* LEFT: INFO */}
      <div className="flex items-center gap-4 flex-1">
        <div className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
          isFullyComplete ? "bg-emerald-500/20 text-emerald-500" : "bg-white/5 text-slate-500"
        )}>
           {/* You can map icons dynamically if needed */}
           <Activity size={18} />
        </div>
        
        <div className="flex flex-col">
          <span className={cn(
            "font-bold text-sm transition-all",
            isFullyComplete ? "text-slate-500 line-through" : "text-slate-200"
          )}>
            {habit.title}
          </span>
          
          {/* META: Frequency or Unit */}
          <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold tracking-wider uppercase">
             {habit.frequency_type === 'weekly' && <span className="text-blue-400">Weekly</span>}
             {isQuantified && <span>{currentValue} / {target} {habit.unit}</span>}
             {habit.current_streak > 1 && <span className="text-orange-500">🔥 {habit.current_streak}</span>}
          </div>
        </div>
      </div>

      {/* RIGHT: CONTROLS */}
      <div className="flex items-center gap-3">
        
        {/* CONTROL 1: QUANTIFIED STEPPER */}
        {isQuantified && !isSortMode && (
          <div className="flex items-center bg-black/50 rounded-lg border border-white/10 overflow-hidden">
            <button 
              onClick={handleDecrement}
              className="p-2 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <Minus size={14} />
            </button>
            <div className="w-12 text-center text-xs font-mono font-bold text-white border-l border-r border-white/10 py-1">
               {Math.floor(progress)}%
            </div>
            <button 
              onClick={handleIncrement}
              className="p-2 hover:bg-white/10 text-blue-400 hover:text-white transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>
        )}

        {/* CONTROL 2: MAIN TOGGLE (Checkbox or Finish) */}
        {!isQuantified && !isSortMode && (
           <button
             onClick={handleCheck}
             disabled={isSystemLocked}
             className={cn(
               "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all",
               isFullyComplete 
                 ? "bg-emerald-500 border-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.5)]" 
                 : "border-slate-700 hover:border-slate-500 bg-transparent"
             )}
           >
             {isFullyComplete && <Check size={16} strokeWidth={4} />}
           </button>
        )}

        {/* CONTROL 3: MENU (Edit/Delete) */}
        <div className="relative">
          <button 
            onClick={() => setShowMenu(!showMenu)} 
            className="p-2 text-slate-600 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
          >
            <MoreVertical size={16} />
          </button>
          
          {showMenu && (
            <div className="absolute right-0 top-8 w-32 bg-[#1a1d24] border border-white/10 rounded-lg shadow-2xl z-50 overflow-hidden">
              <button 
                onClick={() => { onEdit(); setShowMenu(false); }}
                className="w-full text-left px-4 py-3 text-xs font-bold text-slate-300 hover:bg-white/5 flex items-center gap-2"
              >
                <Edit2 size={12} /> Edit
              </button>
              <button 
                onClick={() => { onDelete(); setShowMenu(false); }}
                className="w-full text-left px-4 py-3 text-xs font-bold text-red-500 hover:bg-red-500/10 flex items-center gap-2"
              >
                <Trash2 size={12} /> Delete
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* PROGRESS BAR BACKGROUND (For Quantified) */}
      {isQuantified && currentValue > 0 && currentValue < target && (
        <div className="absolute bottom-0 left-0 h-[2px] bg-blue-500/50 transition-all duration-500" style={{ width: `${progress}%` }} />
      )}
    </div>
  );
}