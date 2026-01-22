import React, { useState, useRef, useEffect } from 'react';
import { Check, Edit2, Trash2, Activity, Zap, Brain, Flame, Droplet, Moon, Sun, Layout, Music, Anchor, Coffee, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getThemeStyles } from '../config/themeConfig';

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
  const [isInputMode, setIsInputMode] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // 2. THEME RESTORATION
  const theme = getThemeStyles(habit.color || 'maximost_blue');
  const IconComponent = ICON_MAP[habit.icon] || Activity;

  // 3. TARGET LOGIC
  const target = habit.daily_goal || habit.target_value || 1;
  const isQuantified = target > 1;
  const currentValue = logEntry?.value || 0;
  const progress = Math.min((currentValue / target) * 100, 100);
  const isFullyComplete = currentValue >= target;

  useEffect(() => {
    if (isInputMode && inputRef.current) inputRef.current.focus();
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

  const handleCheckClick = () => {
    if (isSystemLocked || isFuture || isSortMode) return;
    if (isQuantified) {
      setInputValue(currentValue.toString());
      setIsInputMode(true);
    } else {
      onToggle(habit.id, date, isFullyComplete ? 0 : 1);
    }
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
                <div className="absolute left-0 top-11 w-32 bg-[#1a1d24] border border-white/10 rounded-lg shadow-2xl z-50 overflow-hidden">
                    <button onClick={() => { onEdit(); setShowMenu(false); }} className="w-full text-left px-4 py-3 text-xs font-bold text-slate-300 hover:bg-white/5 flex items-center gap-2">
                        <Edit2 size={12} /> Edit
                    </button>
                    <button onClick={() => { onDelete(); setShowMenu(false); }} className="w-full text-left px-4 py-3 text-xs font-bold text-red-500 hover:bg-red-500/10 flex items-center gap-2">
                        <Trash2 size={12} /> Delete
                    </button>
                </div>
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

      {/* RIGHT: CHECK BUTTON (Input Only) */}
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
                 className="w-16 bg-black border text-white font-bold text-center rounded py-1 outline-none z-50 relative"
                 style={{ borderColor: theme.primary }}
               />
             ) : (
               <button
                 onClick={handleCheckClick}
                 disabled={isSystemLocked}
                 className={cn(
                   "flex items-center justify-center transition-all font-bold text-xs border-2",
                   // Rect for Numbers, Circle for Checks
                   isQuantified ? "min-w-[3rem] h-8 px-2 rounded-lg" : "w-8 h-8 rounded-full"
                 )}
                 style={{
                     borderColor: isFullyComplete ? theme.primary : '#334155',
                     backgroundColor: isFullyComplete ? theme.primary : 'transparent',
                     color: isFullyComplete ? '#000' : '#94a3b8'
                 }}
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
      </div>
      
      {/* PROGRESS BAR */}
      {isQuantified && currentValue > 0 && currentValue < target && (
        <div className="absolute bottom-0 left-0 h-[3px] transition-all duration-500" style={{ width: `${progress}%`, backgroundColor: theme.primary }} />
      )}
    </div>
  );
}
