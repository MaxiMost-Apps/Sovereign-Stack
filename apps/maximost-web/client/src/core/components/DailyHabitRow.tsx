import React, { useState, useRef, useEffect } from 'react';
import { Check, MoreVertical, Edit2, Trash2, Activity } from 'lucide-react';
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
  const [isInputMode, setIsInputMode] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Normalize Target
  const target = habit.daily_goal || habit.target_value || 1;
  const isQuantified = target > 1; // If target is 1, it's a Boolean (Circle). If > 1, it's Quantified (Rectangle).

  const currentValue = logEntry?.value || 0;
  const progress = Math.min((currentValue / target) * 100, 100);
  const isFullyComplete = currentValue >= target;

  useEffect(() => {
    if (isInputMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isInputMode]);

  const handleInputSubmit = () => {
    setIsInputMode(false);
    const val = parseInt(inputValue);
    if (!isNaN(val)) onToggle(habit.id, date, val);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleInputSubmit();
    if (e.key === 'Escape') setIsInputMode(false);
  };

  const handleMainClick = () => {
    if (isSystemLocked || isFuture || isSortMode) return;

    if (isQuantified) {
      setInputValue(currentValue.toString());
      setIsInputMode(true);
    } else {
      const val = isFullyComplete ? 0 : 1;
      onToggle(habit.id, date, val);
    }
  };

  return (
    <div className={cn(
      "group relative flex items-center justify-between p-3 rounded-xl border transition-all mb-3",
      "bg-[#0b0c10] border-white/5 hover:border-white/10",
      isFullyComplete && !isQuantified ? "opacity-50 grayscale" : "opacity-100",
      isSortMode && "cursor-grab active:cursor-grabbing border-dashed border-slate-700"
    )}>
      
      {/* LEFT: INFO */}
      <div className="flex items-center gap-4 flex-1">
        <div className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
          isFullyComplete ? "bg-emerald-500/20 text-emerald-500" : "bg-white/5 text-slate-500"
        )}>
           <Activity size={18} />
        </div>
        
        <div className="flex flex-col">
          <span className={cn(
            "font-bold text-sm transition-all",
            isFullyComplete && !isQuantified ? "text-slate-500 line-through" : "text-slate-200"
          )}>
            {habit.title}
          </span>
          
          <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold tracking-wider uppercase">
             {habit.frequency_type === 'weekly' && <span className="text-blue-400">Weekly</span>}
             {isQuantified && <span>Goal: {target} {habit.unit}</span>}
          </div>
        </div>
      </div>

      {/* RIGHT: CONTROLS */}
      <div className="flex items-center gap-3">
        
        {!isSortMode && (
           <div className="relative">
             {isInputMode ? (
               <input
                 ref={inputRef}
                 type="number"
                 value={inputValue}
                 onChange={(e) => setInputValue(e.target.value)}
                 onBlur={handleInputSubmit}
                 onKeyDown={handleKeyDown}
                 className="w-16 bg-black border border-blue-500 text-white font-bold text-center rounded py-1 outline-none z-50 relative"
               />
             ) : (
               <button
                 onClick={handleMainClick}
                 disabled={isSystemLocked}
                 className={cn(
                   "flex items-center justify-center transition-all font-bold text-xs border-2",
                   // ✅ SHAPE LOGIC: Rect for Numbers, Circle for Checks
                   isQuantified ? "min-w-[3rem] h-8 px-2 rounded-lg" : "w-8 h-8 rounded-full",

                   isFullyComplete
                     ? "bg-emerald-500 border-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                     : "border-slate-700 hover:border-slate-500 bg-transparent text-slate-400 hover:text-white"
                 )}
               >
                 {isQuantified ? (
                   <span>{currentValue}</span>
                 ) : (
                   isFullyComplete && <Check size={16} strokeWidth={4} />
                 )}
               </button>
             )}
           </div>
        )}

        {/* MENU */}
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
      
      {/* PROGRESS BAR (Quantified Only) */}
      {isQuantified && currentValue > 0 && currentValue < target && (
        <div className="absolute bottom-0 left-0 h-[2px] bg-blue-500/50 transition-all duration-500" style={{ width: `${progress}%` }} />
      )}
    </div>
  );
}
