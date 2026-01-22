import React, { useState, useRef, useEffect } from 'react';
import { Check, MoreVertical, Edit2, Trash2, Info, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getThemeStyles } from '../config/themeConfig';

// Import all icons for mapping
import { Activity, Zap, Brain, Droplet, Moon, Sun, Layout, Music, Anchor, Coffee } from 'lucide-react';
const ICON_MAP: any = { Activity, Zap, Brain, Flame, Droplet, Moon, Sun, Layout, Music, Anchor, Coffee };

// FALLBACK COLOR MAP (Ensures Neon Colors even if theme fails)
const COLOR_HEX: any = {
    maximost_blue: '#3b82f6', // Bright Blue
    emerald_city: '#10b981',  // Neon Green
    mars_orange: '#f97316',   // Orange
    fuji_purple: '#a855f7',   // Purple
    obsidian_dark: '#ffffff'  // White
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
  const [isInputMode, setIsInputMode] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Theme & Icon Logic
  const theme = getThemeStyles(habit.color || 'maximost_blue');
  const primaryColor = COLOR_HEX[habit.color] || theme.primary || '#3b82f6'; // Force Color
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
        borderColor: isFullyComplete ? primaryColor : 'rgba(255,255,255,0.05)',
        boxShadow: isFullyComplete ? `0 0 15px -10px ${primaryColor}` : 'none'
    }}>
      
      {/* LEFT SIDE: ICON | TEXT | CONTROLS */}
      <div className="flex items-center gap-4 flex-1">

        {/* ICON */}
        <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-all bg-white/5" style={{ color: primaryColor }}>
            <IconComponent size={20} />
        </div>
        
        {/* TEXT & CONTROLS CONTAINER */}
        <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
                <span className={cn("font-bold text-sm text-slate-200", isFullyComplete && "text-white")}>
                    {habit.title}
                </span>

                {/* ⬅️ MOVED TO LEFT: CONTROLS (Info & Menu) */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => setShowInfo(!showInfo)} className="p-1 text-slate-600 hover:text-blue-400 transition-colors">
                        <Info size={14} />
                    </button>
                    <div className="relative">
                        <button onClick={() => setShowMenu(!showMenu)} className="p-1 text-slate-600 hover:text-white transition-colors">
                            <MoreVertical size={14} />
                        </button>
                        {showMenu && (
                            <div className="absolute left-0 top-6 w-32 bg-[#1a1d24] border border-white/10 rounded-lg shadow-2xl z-50 overflow-hidden">
                                <button onClick={() => { onEdit(); setShowMenu(false); }} className="w-full text-left px-4 py-3 text-xs font-bold text-slate-300 hover:bg-white/5 flex items-center gap-2"><Edit2 size={12} /> Edit</button>
                                <button onClick={() => { onDelete(); setShowMenu(false); }} className="w-full text-left px-4 py-3 text-xs font-bold text-red-500 hover:bg-red-500/10 flex items-center gap-2"><Trash2 size={12} /> Delete</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* SUBTITLE */}
            <div className="flex items-center gap-2 text-[10px] font-bold tracking-wider uppercase text-slate-500">
                {habit.frequency_type === 'weekly' && <span className="text-blue-400">Weekly Target</span>}
                {isQuantified && <span style={{ color: theme.secondary }}>Goal: {target} {habit.unit}</span>}
                {habit.current_streak > 2 && <span className="text-orange-500 flex items-center gap-1"><Flame size={10} /> {habit.current_streak} DAY STREAK</span>}
            </div>
        </div>
      </div>

      {/* RIGHT SIDE: BIG CHECK BUTTON */}
      <div className="pl-4 border-l border-white/5">
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
                 className="w-16 h-12 bg-black border text-white font-bold text-center rounded text-lg outline-none z-50 relative"
                 style={{ borderColor: primaryColor }}
               />
             ) : (
               <button
                 onClick={handleMainClick}
                 disabled={isSystemLocked}
                 className={cn(
                   "w-12 h-12 rounded-full flex items-center justify-center transition-all border-2", // ⬆️ INCREASED SIZE
                   isFullyComplete ? "bg-opacity-100 text-black shadow-lg" : "bg-transparent text-transparent hover:border-slate-500"
                 )}
                 style={{
                     borderColor: isFullyComplete ? primaryColor : '#334155',
                     backgroundColor: isFullyComplete ? primaryColor : 'transparent', // ✅ FORCE NEON COLOR
                     boxShadow: isFullyComplete ? `0 0 15px ${primaryColor}` : 'none'
                 }}
               >
                 {isQuantified && !isFullyComplete ? (
                    <span className="text-xs text-slate-500 font-bold">{currentValue}</span>
                 ) : (
                    <Check size={24} strokeWidth={4} color="black" /> // ✅ BLACK CHECK ON NEON
                 )}
               </button>
             )}
           </div>
        )}
      </div>
    </div>

    {/* INFO PANEL */}
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
