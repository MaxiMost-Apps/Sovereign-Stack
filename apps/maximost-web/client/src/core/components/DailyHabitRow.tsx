import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, GripVertical, Flame, Lock, Unlock, Info, Plus } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { getThemeStyles } from '../config/themeConfig';
import HabitActionMenu from './HabitActionMenu';
import StreakBadge from './StreakBadge';
import { calculateStreak } from '../utils/streakLogic';
import { SmartProgressBar } from './ui/SmartProgressBar';
import CheckCircle from './ui/CheckCircle';
import { supabase } from '../supabase';
import { useAuth } from '../AuthSystem';
import { useToast } from './Toast';
import { useLens } from '../context/LensContext';
import { HABIT_ATOMS } from '../../store/lexiconStore';

export default function DailyHabitRow({ habit, isCompleted, logEntry, onToggle, onEdit, onDelete, isSystemLocked, isSortMode, allLogs, isFuture, date, weeklyProgress, dragAttributes, dragListeners }: any) {
  const { toast } = useToast();
  const { currentLens, lensTheme } = useLens();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // REPAIR ORDER: Loading State
  const [val, setVal] = useState(logEntry?.value || 0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { user } = useAuth();
  const target = habit.daily_goal || 1;
  const isLocked = isSystemLocked;
  const isNumeric = target > 1;
  const isDone = isNumeric ? val >= target : isCompleted;

  // FREQUENCY GHOSTING: Check if weekly target is met
  const isFrequency = habit.frequency_type === 'frequency' || (habit.frequency_type !== 'absolute' && habit.frequency_type !== 'daily');
  const weeklyTarget = habit.target_count || 3;
  const isMissionComplete = isFrequency && (weeklyProgress >= weeklyTarget);

  // LIVE STREAK CALCULATION
  const currentStreak = calculateStreak(habit, allLogs || {});

  useEffect(() => { setVal(logEntry?.value || 0); }, [logEntry]);

  // Theme & Icon Logic
  const theme = getThemeStyles(habit.metadata?.visuals?.theme ?? habit.color);
  const iconName = habit.metadata?.visuals?.icon ?? habit.icon ?? 'Activity';
  const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.Activity;

  // Hydrate Atom Data for Lens Perspectives
  // We match by slug (preferred) or title.
  // The DB habit might not have the full JSON yet, so we pull from the Sovereign Store.
  const atomData = HABIT_ATOMS.find(a =>
      (habit.slug && a.slug === habit.slug) ||
      (habit.atom_id && a.atom_id === habit.atom_id) ||
      a.title === habit.title
  );

  const perspectiveText = atomData?.perspectives?.[currentLens];
  const LensIcon = lensTheme.icon;

  // Auto-Save Note Logic (Sump Pump)
  const handleSaveNote = async (content: string) => {
      if (!content.trim() || !user) return;
      const dateStr = new Date().toISOString().split('T')[0];

      const payload = {
          user_id: user.id,
          habit_id: habit.id,
          completed_at: dateStr,
          note: content
      };

      try {
          // NEW ENDPOINT: Server-Orchestrated Logging
          const apiUrl = import.meta.env.VITE_API_BASE_URL
              ? `${import.meta.env.VITE_API_BASE_URL}/api/habit_logs`
              : 'http://localhost:3000/api/habit_logs';

          const response = await fetch(apiUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
          });

          if (!response.ok) {
              const errorData = await response.json().catch(() => ({}));
              throw new Error(errorData.message || 'Server rejected log entry');
          }
      } catch (error: any) {
          // 3.1 Kill the Ghost Offline State
          if (!navigator.onLine || error.status >= 500) {
               // GENUINE OFFLINE / SERVER DOWN
               console.warn("Cloud connection failed. Engaging Local Ledger.");
               const currentQueue = JSON.parse(localStorage.getItem('offline_queue') || '[]');
               currentQueue.push({ type: 'NOTE_ENTRY', payload, timestamp: Date.now() });
               localStorage.setItem('offline_queue', JSON.stringify(currentQueue));
               toast.error("⚠️ Network Offline. Note saved to Local Ledger.");
          } else if (error.status >= 400 || error.code) {
               // LOGIC ERROR
               console.error("API Error:", error);
               toast.error(`Sync Failed: ${error.message}`);
          }
      }
  };

  const handleNoteBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      handleSaveNote(e.target.value);
  };

  // 1. ANIMATION HANDLER
  const handleBlur = () => {
    const inputVal = parseInt(val) || 0;
    if (inputVal !== (logEntry?.value || 0)) {
        onToggle(habit.id, date, inputVal);
    }
  };

  // 2. UNCHECK HANDLER
  const handleUncheck = (e: any) => {
     e.stopPropagation();
     setVal(0);
     onToggle(habit.id, date, 0);
  };

  const handleCheck = async (e: any) => {
    e.stopPropagation();
    if (isLoading) return;
    setIsLoading(true);
    try {
        await onToggle(habit.id);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className={`relative group transition-all ${isMenuOpen || isPopoverOpen ? 'z-50' : 'z-0'}`}>
    <div
        className={`min-h-24 py-3 px-4 rounded-r-xl rounded-l-md flex items-center justify-between transition-all group relative border-l-4 border-y border-r border-white/5 bg-[#0b0c10] ${isMissionComplete && !isDone ? 'opacity-[0.6] grayscale' : ''}`}
        style={{ borderLeftColor: theme.hex }}
        onDoubleClick={() => setIsExpanded(!isExpanded)}
        onContextMenu={(e) => { e.preventDefault(); setIsExpanded(!isExpanded); }}
    >
      {/* LEFT */}
      <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
        {isSortMode ? (
            <div className="text-gray-500 p-2 cursor-grab active:cursor-grabbing self-center" {...dragAttributes} {...dragListeners}><GripVertical /></div>
        ) : (
            <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 rounded-xl flex items-center justify-center shadow-lg bg-black/40 border border-white/5 self-center">
                <IconComponent className="w-5 h-5 md:w-6 md:h-6" style={{ color: theme.hex, filter: `drop-shadow(0 0 8px ${theme.glow})` }} />
            </div>
        )}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <div className="flex items-center gap-2 flex-1 min-w-0">
             <h3 className={`font-bold whitespace-normal line-clamp-2 leading-tight text-sm ${isDone ? 'text-gray-500 line-through' : 'text-white'}`}>{habit.title}</h3>

             {/* New Streak Fire Logic */}
             {currentStreak >= 3 && (
               <div className="flex items-center space-x-1 text-orange-500 ml-2">
                 <Flame className="w-4 h-4 fill-current animate-pulse" />
                 <span className="text-xs font-bold font-mono">{currentStreak}</span>
               </div>
             )}

             {/* SUBJECT-ANCHORED ACTIONS (Info & Menu) */}
             {!isLocked && (
                <div className="flex items-center gap-1 ml-2">
                    <button
                        onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
                        className={`p-1 transition-colors ${isExpanded ? 'text-green-500' : 'text-slate-600 hover:text-green-500'}`}
                    >
                        <Info className="w-4 h-4" />
                    </button>
                    <div className="opacity-100 w-auto" onClick={(e) => e.stopPropagation()}>
                        <HabitActionMenu
                            habit={habit}
                            onEdit={() => onEdit(habit)}
                            onDelete={() => onDelete(habit.id)}
                            isOpen={isMenuOpen}
                            onOpenChange={setIsMenuOpen}
                        />
                    </div>
                </div>
             )}
          </div>

          {/* Smart Progress Bar for Numeric/Frequency Habits */}
          {isNumeric && (
             <div className="flex items-center gap-2 text-xs text-gray-400">
               <div className="w-24">
                  <SmartProgressBar current={val} target={target} color={theme.bg} unit={habit.unit} />
               </div>
               <span className={`${isDone ? 'text-emerald-400' : 'text-blue-400'} font-bold mt-1`}>{val} / {target} {habit.unit}</span>
             </div>
          )}

          {habit.metadata?.linked_stacks && habit.metadata.linked_stacks.length > 0 ? (
             <div className="w-full mt-1 flex flex-wrap gap-1 items-center">
                {habit.metadata.linked_stacks.map((stack: any, i: number) => {
                    const stackTheme = getThemeStyles(stack.color || 'maximost_blue');
                    return (
                        <span key={i} className={`text-[9px] font-bold uppercase tracking-wider leading-tight ${stackTheme.text}`} style={{ opacity: 0.9 }}>
                            {stack.name} {i < habit.metadata.linked_stacks.length - 1 && <span className="text-slate-600 mx-0.5">•</span>}
                        </span>
                    );
                })}
             </div>
          ) : habit.description && (
             <div className="w-full mt-1">
                <p className={`text-[10px] font-bold uppercase tracking-wider leading-tight ${theme.text}`} style={{ opacity: 0.8 }}>{habit.description}</p>
             </div>
          )}
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3 self-center">
        {/* Actions are always visible, Menu is hidden if locked */}
           <>
             {isNumeric ? (
                  // NUMERIC LOGIC: Click = Toggle Max, Long Press = Expand/Notes
                  <div className="relative flex items-center justify-center w-12 h-12 flex-shrink-0">
                      <div onContextMenu={(e) => { e.preventDefault(); setIsExpanded(!isExpanded); }}>
                        <CheckCircle
                            checked={isDone}
                            color={theme.hex}
                            isNumeric={true}
                            value={val}
                            disabled={isFuture}
                            size="lg"
                            onClick={(e: any) => {
                                e.stopPropagation();
                                if(isDone) onToggle(habit.id, date, 0); // Reset
                                else onToggle(habit.id, date, target); // Max Out
                            }}
                        >
                            {!isDone && <Plus className="w-4 h-4 text-slate-500" />}
                        </CheckCircle>
                      </div>

                      {/* POPOVER - CENTERED OVERLAY (No Layout Shift) */}
                      <AnimatePresence>
                          {isPopoverOpen && (
                              <motion.div
                                  initial={{ scale: 0.8, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  exit={{ scale: 0.8, opacity: 0 }}
                                  className="absolute right-0 top-1/2 -translate-y-1/2 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-1 z-[100] flex items-center gap-1 origin-right"
                                  style={{ minWidth: '120px' }}
                                  onPointerDown={(e) => e.stopPropagation()}
                              >
                                  <input
                                      autoFocus
                                      type="number"
                                      value={val || ''}
                                      placeholder="-"
                                      onChange={(e) => setVal(parseInt(e.target.value) || 0)}
                                      onKeyDown={(e) => {
                                          if(e.key === 'Enter') {
                                              onToggle(habit.id, date, val);
                                              setIsPopoverOpen(false);
                                          }
                                      }}
                                      className="w-16 h-10 bg-black border border-slate-700 rounded-lg text-center text-white font-bold outline-none focus:border-blue-500 text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none z-[101]"
                                  />
                                  <button
                                      onClick={() => {
                                          onToggle(habit.id, date, val);
                                          setIsPopoverOpen(false);
                                      }}
                                      className="w-10 h-10 bg-emerald-600 hover:bg-emerald-500 rounded-lg flex items-center justify-center text-white transition-colors shadow-lg"
                                  >
                                      <Check className="w-5 h-5" />
                                  </button>
                              </motion.div>
                          )}
                      </AnimatePresence>

                      {/* Overlay to close popover */}
                      {isPopoverOpen && (
                          <div
                              className="fixed inset-0 z-[90] bg-transparent"
                              onClick={(e) => { e.stopPropagation(); setIsPopoverOpen(false); }}
                          />
                      )}
                  </div>
             ) : (
                // BOOLEAN STATE
                <div className="flex items-center justify-center w-12 h-12 flex-shrink-0">
                    {isLoading ? (
                        <div className="w-6 h-6 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: theme.hex, borderTopColor: 'transparent' }} />
                    ) : (
                        <CheckCircle
                            checked={isDone}
                            color={theme.hex}
                            disabled={isFuture}
                            size="lg"
                            onClick={handleCheck} // Use wrapped handler
                        />
                    )}
                </div>
             )}
           </>
      </div>
    </div>

    {/* INTEL REVEAL (Accordion) */}
    <AnimatePresence>
        {isExpanded && (
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-black/40 border-b border-white/5 overflow-hidden rounded-b-xl shadow-inner relative"
            >
                {/* CONTINUOUS BORDER STRIP */}
                <div className="absolute top-0 bottom-0 left-0 w-1 bg-inherit z-10" style={{ backgroundColor: theme.hex }} />

                <div className="p-4 pl-[70px] md:pl-[90px] grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 pt-8 relative">

                    {/* LENS HEADER BACKGROUND */}
                    {perspectiveText && (
                         <div className="absolute top-0 left-0 right-0 h-1 md:left-[70px] bg-gradient-to-r from-transparent via-white/5 to-transparent" style={{ backgroundColor: lensTheme.hex, opacity: 0.1 }} />
                    )}

                    <div className="space-y-1">
                        <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Tactical (How)</h4>
                        <ul className="text-sm text-slate-300 leading-relaxed list-disc pl-4 space-y-1">
                            {/* Check for Protocol Array First */}
                            {atomData?.protocol && Array.isArray(atomData.protocol) ? (
                                atomData.protocol.map((step: string, i: number) => <li key={i}>{step}</li>)
                            ) : (
                                <li>
                                {(typeof habit.metadata?.tactical === 'string' ? habit.metadata.tactical : habit.metadata?.tactical?.description) || habit.metadata?.compiler?.step || habit.how_instruction || habit.description || "Hydration Required."}
                                </li>
                            )}
                        </ul>
                    </div>

                    <div className="space-y-1">
                         {/* DYNAMIC LENS HEADER */}
                         <div className="flex items-center gap-2 mb-1">
                             <LensIcon className="w-3 h-3" style={{ color: lensTheme.hex }} />
                             <h4 className="text-[10px] font-bold uppercase tracking-widest" style={{ color: lensTheme.hex }}>
                                 {lensTheme.label} PERSPECTIVE
                             </h4>
                         </div>

                        <p className="text-sm text-slate-300 leading-relaxed border-l-2 pl-3 py-1" style={{ borderColor: lensTheme.hex }}>
                             {perspectiveText || (typeof habit.metadata?.identity === 'string' ? habit.metadata.identity : habit.metadata?.identity?.motivation) || habit.metadata?.compiler?.why || habit.why_instruction || "Hydration Required."}
                        </p>
                        {habit.metadata?.compiler?.expert && (
                            <span className="text-[10px] text-blue-500 uppercase font-bold tracking-wider block mt-1">
                                [{habit.metadata.compiler.expert}]
                            </span>
                        )}
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Field Note</h4>
                        <textarea
                            placeholder=""
                            className="w-full bg-slate-900/40 border border-slate-800/50 rounded-lg p-3 text-sm text-white focus:border-blue-500 outline-none resize-none overflow-y-auto"
                            rows={1}
                            onBlur={handleNoteBlur}
                            style={{ minHeight: '40px', maxHeight: '120px' }}
                        />
                    </div>
                </div>
            </motion.div>
        )}
    </AnimatePresence>
    </div>
  );
}
