import React, { useState, useRef, useEffect } from 'react';
import { Check, MoreVertical, Edit2, Trash2, Info, Flame, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getThemeStyles } from '../config/themeConfig';
import { Activity, Zap, Brain, Droplet, Moon, Sun, Layout, Music, Anchor, Coffee, Dumbbell, Book, Briefcase, Heart } from 'lucide-react';

const ICON_MAP: any = { Activity, Zap, Brain, Flame, Droplet, Moon, Sun, Layout, Music, Anchor, Coffee, Dumbbell, Book, Briefcase, Heart };

const COLOR_HEX: any = {
    maximost_blue: '#3b82f6',
    emerald_city: '#10b981',
    mars_orange: '#f97316',
    fuji_purple: '#a855f7',
    obsidian_dark: '#ffffff'
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
  const [showInfo, setShowInfo] = useState(false);
  const [showInput, setShowInput] = useState(false); // ✅ CONTROLS POPOVER
  const inputRef = useRef<HTMLInputElement>(null);

  const theme = getThemeStyles(habit.color || 'maximost_blue');
  const primaryColor = COLOR_HEX[habit.color] || theme.primary || '#3b82f6';
  const IconComponent = ICON_MAP[habit.icon] || Activity;
  
  const target = habit.daily_goal || 1;
  const isQuantified = target > 1;
  const currentValue = logEntry?.value || 0;
  const isFullyComplete = currentValue >= target;

  useEffect(() => {
    if (showInput && inputRef.current) inputRef.current.focus();
  }, [showInput]);

  const handleInputSubmit = (e: any) => {
    if (e.key === 'Enter') {
        const val = parseInt(e.currentTarget.value);
        if (!isNaN(val)) {
            onToggle(habit.id, date, val);
            setShowInput(false);
        }
    }
    if (e.key === 'Escape') setShowInput(false);
  };

  const handleMainClick = () => {
    if (isSystemLocked || isFuture || isSortMode) return;
    if (isQuantified) {
      setShowInput(true); // ✅ OPEN POPOVER
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
        borderColor: isFullyComplete ? primaryColor : 'rgba(255,255,255,0.05)',
        boxShadow: isFullyComplete ? `0 0 15px -10px ${primaryColor}` : 'none'
    }}>
      
      {/* LEFT: ICON & CONTROLS */}
      <div className="flex items-center gap-4 flex-1">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-all bg-white/5" style={{ color: primaryColor }}>
            <IconComponent size={24} />
        </div>
        
        <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
                <span className={cn("font-bold text-sm text-slate-200", isFullyComplete && "text-white")}>{habit.title}</span>
                
                {/* ALWAYS VISIBLE CONTROLS */}
                <div className="flex items-center gap-1">
                    <button onClick={() => setShowInfo(!showInfo)} className={`p-1 rounded transition-colors ${showInfo ? 'text-blue-400' : 'text-slate-600 hover:text-white'}`}>
                        <Info size={16} />
                    </button>
                    <div className="relative">
                        <button onClick={() => setShowMenu(!showMenu)} className={`p-1 rounded transition-colors ${showMenu ? 'text-white' : 'text-slate-600 hover:text-white'}`}>
                            <MoreVertical size={16} />
                        </button>
                        {showMenu && (
                            <div className="absolute left-0 top-8 w-40 bg-[#1a1d24] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden ring-1 ring-black">
                                <button onClick={() => { onEdit(); setShowMenu(false); }} className="w-full text-left px-4 py-3 text-xs font-bold text-slate-300 hover:bg-white/5 flex items-center gap-3">
                                    <Edit2 size={14} /> Edit Habit
                                </button>
                                <div className="h-[1px] bg-white/5 my-0" />
                                <button onClick={() => { onDelete(); setShowMenu(false); }} className="w-full text-left px-4 py-3 text-xs font-bold text-red-500 hover:bg-red-500/10 flex items-center gap-3">
                                    <Trash2 size={14} /> Delete
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-bold tracking-wider uppercase text-slate-500">
                {habit.frequency_type === 'weekly' && <span className="text-blue-400">Weekly Target</span>}
                {isQuantified && <span style={{ color: theme.secondary }}>Goal: {target} {habit.unit}</span>}
                {habit.current_streak > 2 && <span className="text-orange-500 flex items-center gap-1"><Flame size={10} /> {habit.current_streak} DAY STREAK</span>}
            </div>
        </div>
      </div>

      {/* RIGHT: CIRCLE BUTTON + FLOATING INPUT */}
      <div className="pl-4 border-l border-white/5 relative">
        {!isSortMode && (
           <div className="relative flex items-center justify-center">
               
               {/* 1. THE TRIGGER BUTTON (Always a Circle) */}
               <button
                 onClick={handleMainClick}
                 disabled={isSystemLocked}
                 className={cn(
                   "w-12 h-12 rounded-full flex items-center justify-center transition-all border-2",
                   isFullyComplete ? "bg-opacity-100 text-black shadow-lg" : "bg-transparent text-transparent hover:border-slate-500"
                 )}
                 style={{
                     borderColor: isFullyComplete ? primaryColor : '#334155',
                     backgroundColor: isFullyComplete ? primaryColor : 'transparent',
                     boxShadow: isFullyComplete ? `0 0 15px ${primaryColor}` : 'none'
                 }}
               >
                 {isQuantified && !isFullyComplete ? (
                    <span className="text-xs text-slate-500 font-bold">{currentValue > 0 ? currentValue : '+'}</span>
                 ) : (
                    <Check size={24} strokeWidth={4} color="black" />
                 )}
               </button>

               {/* 2. THE FLOATING POPOVER (Z-Index High) */}
               {showInput && (
                   <div className="absolute right-14 top-1/2 -translate-y-1/2 w-40 bg-[#1a1d24] border border-white/20 p-2 rounded-xl shadow-2xl z-[100] flex gap-2 animate-in slide-in-from-right-2">
                       <input 
                         ref={inputRef}
                         type="number"
                         placeholder="#"
                         className="w-full bg-black border border-white/10 rounded px-2 py-2 text-white font-bold text-center outline-none focus:border-blue-500"
                         onKeyDown={handleInputSubmit}
                       />
                       <button onClick={() => setShowInput(false)} className="bg-white/5 hover:bg-white/10 text-slate-400 p-2 rounded">
                           <X size={16} />
                       </button>
                   </div>
               )}
           </div>
        )}
      </div>
    </div>

    {/* INFO PANEL */}
    {showInfo && (
        <div className="mb-4 ml-16 p-4 rounded-xl bg-white/5 border-l-2 border-slate-700 text-slate-400 text-xs leading-relaxed animate-in slide-in-from-top-2">
            <div className="mb-2">
                <span className="font-bold text-blue-400 block mb-1 uppercase tracking-widest text-[10px]">Identity Anchor</span>
                {habit.why_instruction || "No identity anchor set."}
            </div>
            <div>
                <span className="font-bold text-emerald-400 block mb-1 uppercase tracking-widest text-[10px]">Tactical Execution</span>
                {habit.how_instruction || "No tactical instructions set."}
            </div>
        </div>
    )}
    </>
  );
}