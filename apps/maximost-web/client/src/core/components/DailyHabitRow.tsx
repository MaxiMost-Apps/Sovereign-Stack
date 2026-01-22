import React, { useState, useRef, useEffect } from 'react';
import { Check, MoreVertical, Edit2, Trash2, Info, Lock, Unlock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getThemeStyles } from '../config/themeConfig';

// Import all icons for mapping
import { Activity, Zap, Brain, Flame, Droplet, Moon, Sun, Layout, Music, Anchor, Coffee } from 'lucide-react';
const ICON_MAP: any = { Activity, Zap, Brain, Flame, Droplet, Moon, Sun, Layout, Music, Anchor, Coffee };

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
  const [showInfo, setShowInfo] = useState(false);
  const [isInputMode, setIsInputMode] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Theme & Icon Logic
  const theme = getThemeStyles(habit.color || 'maximost_blue');
  const IconComponent = ICON_MAP[habit.icon] || Activity;
  const target = habit.daily_goal || 1;
  const isQuantified = target > 1;
  const currentValue = logEntry?.value || 0;
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

  const handleMainClick = () => {
    if (isSystemLocked || isFuture || isSortMode) return;
    if (isQuantified) {
      setInputValue(currentValue.toString());
      setIsInputMode(true);
    } else {
      onToggle(habit.id, date, isFullyComplete ? 0 : 1);
    }
  };

  return (
    <>
    <div className={cn(
      "group relative flex items-center justify-between p-4 rounded-xl border transition-all mb-3",
      "bg-[#0b0c10] border-white/5",
      isFullyComplete ? "opacity-100" : "opacity-90",
      isSortMode && "cursor-grab active:cursor-grabbing border-dashed border-slate-700"
    )}
    style={{
        borderColor: isFullyComplete ? theme.primary : 'rgba(255,255,255,0.05)',
        boxShadow: isFullyComplete ? `0 0 15px -10px ${theme.primary}` : 'none'
    }}>
      
      {/* LEFT: ICON & IDENTITY */}
      <div className="flex items-center gap-4 flex-1">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-all bg-white/5" style={{ color: theme.primary }}>
            <IconComponent size={20} />
        </div>
        
        <div className="flex flex-col">
          <span className={cn("font-bold text-sm text-slate-200", isFullyComplete && "text-white")}>
            {habit.title}
          </span>
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-wider uppercase text-slate-500">
             {habit.frequency_type === 'weekly' && <span className="text-blue-400">Weekly Target</span>}
             {isQuantified && <span style={{ color: theme.secondary }}>Goal: {target} {habit.unit}</span>}
             {habit.current_streak > 2 && <span className="text-orange-500 flex items-center gap-1"><Flame size={10} /> {habit.current_streak} DAY STREAK</span>}
          </div>
        </div>
      </div>

      {/* RIGHT: CONTROLS */}
      <div className="flex items-center gap-2">

        {/* INFO TOGGLE */}
        <button onClick={() => setShowInfo(!showInfo)} className="p-2 text-slate-600 hover:text-blue-400 transition-colors">
            <Info size={16} />
        </button>

        {/* COMPLETION INPUT (Always a Circle) */}
        {!isSortMode && (
           <div className="relative mx-2">
             {isInputMode ? (
               <input
                 ref={inputRef}
                 type="number"
                 value={inputValue}
                 onChange={(e) => setInputValue(e.target.value)}
                 onBlur={handleInputSubmit}
                 onKeyDown={handleKeyDown}
                 className="w-12 h-8 bg-black border text-white font-bold text-center rounded text-sm outline-none z-50 relative"
                 style={{ borderColor: theme.primary }}
               />
             ) : (
               <button
                 onClick={handleMainClick}
                 disabled={isSystemLocked}
                 className={cn(
                   "w-8 h-8 rounded-full flex items-center justify-center transition-all border-2",
                   isFullyComplete ? "bg-opacity-100 text-black" : "bg-transparent text-transparent hover:border-slate-500"
                 )}
                 style={{
                     borderColor: isFullyComplete ? theme.primary : '#334155',
                     backgroundColor: isFullyComplete ? theme.primary : 'transparent',
                     boxShadow: isFullyComplete ? `0 0 10px ${theme.primary}` : 'none'
                 }}
               >
                 {isQuantified && !isFullyComplete ? (
                    <span className="text-[10px] text-slate-500">{currentValue}</span>
                 ) : (
                    <Check size={16} strokeWidth={4} />
                 )}
               </button>
             )}
           </div>
        )}

        {/* 3-DOT MENU */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 text-slate-600 hover:text-white transition-colors"
          >
            <MoreVertical size={16} />
          </button>

          {showMenu && (
            <div className="absolute right-0 top-8 w-32 bg-[#1a1d24] border border-white/10 rounded-lg shadow-2xl z-50 overflow-hidden">
              <button onClick={() => { onEdit(); setShowMenu(false); }} className="w-full text-left px-4 py-3 text-xs font-bold text-slate-300 hover:bg-white/5 flex items-center gap-2"><Edit2 size={12} /> Edit</button>
              <button onClick={() => { onDelete(); setShowMenu(false); }} className="w-full text-left px-4 py-3 text-xs font-bold text-red-500 hover:bg-red-500/10 flex items-center gap-2"><Trash2 size={12} /> Delete</button>
            </div>
          )}
        </div>
      </div>
    </div>

    {/* EXPANDABLE INFO PANEL */}
    {showInfo && (
        <div className="mb-4 ml-14 p-4 rounded-lg bg-white/5 border-l-2 border-slate-700 text-slate-400 text-xs leading-relaxed animate-in slide-in-from-top-2">
            <div className="mb-2">
                <span className="font-bold text-blue-400 block mb-1">WHY (IDENTITY):</span>
                {habit.why_instruction || "No identity anchor set."}
            </div>
            <div>
                <span className="font-bold text-emerald-400 block mb-1">HOW (TACTICS):</span>
                {habit.how_instruction || "No tactical instructions set."}
            </div>
        </div>
    )}
    </>
  );
}
