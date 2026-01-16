import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Info, Lock, Unlock, GripVertical } from 'lucide-react';
import { getThemeStyles, getIcon } from '../config/themeConfig';
import { SmartProgressBar } from './ui/SmartProgressBar';
import { getCheckColor } from '../utils/getHabitStyle';
import { toISODate, isFuture } from '../utils/dateUtils';
import HabitActionMenu from './HabitActionMenu';
import { supabase } from '../supabase';
import { useAuth } from '../AuthSystem';
import WeeklyCell from './WeeklyCell';
import { useToast } from './Toast';

export default function WeeklyHabitRow({ habit, logs, onToggle, onEdit, onDelete, weekDays, isTodayCol, isSystemLocked, isEditMode }: any) {
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLocked = isSystemLocked;
  const { user } = useAuth();
  const theme = getThemeStyles(habit.metadata?.visuals?.theme ?? habit.color);
  const IconComponent = getIcon(habit.metadata?.visuals?.icon ?? habit.icon);

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
          // 1. Force the Network Request
          const { error } = await supabase.from('habit_logs').upsert(payload, { onConflict: 'habit_id, completed_at' });
          if (error) throw error;
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

  return (
    <div className={`relative group transition-all ${isMenuOpen ? 'z-50' : 'z-0'}`}>
        <div className={`flex border-b border-white/5 group hover:bg-white/[0.02] min-h-16 border-l-4 items-stretch`} style={{ borderLeftColor: theme.hex }}>
            {/* STICKY COLUMN (Habit Name) */}
            <div
                className="sticky left-0 z-30 bg-slate-950 w-[220px] p-4 flex items-center border-r border-white/5 shadow-[4px_0_10px_rgba(0,0,0,0.5)] min-h-full"
                onDoubleClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
            >
                {/* Control Split: Edit Mode Grip vs Icon */}
                <div className="mr-3 self-center">
                    {isEditMode ? (
                        <div className="text-gray-500 cursor-grab active:cursor-grabbing"><GripVertical className="w-5 h-5" /></div>
                    ) : (
                        <div className="text-xl shrink-0 text-slate-400"><IconComponent className="w-5 h-5" style={{ color: theme.hex }} /></div>
                    )}
                </div>

                <div className="flex items-center justify-between flex-1 min-w-0 self-center">
                    <div className="whitespace-normal line-clamp-2 leading-tight text-sm font-bold text-gray-200 cursor-pointer hover:text-blue-400 transition-colors" title={habit.title}>
                        {habit.title}
                    </div>

                    {/* Right Side: Info & Menu (Hidden if Locked) */}
                    {!isLocked && (
                        <div className="flex items-center gap-1 ml-2">
                            <button
                                onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
                                className={`transition-colors ${isExpanded ? 'text-blue-400' : 'text-slate-600 hover:text-slate-400'}`}
                            >
                                <Info className="w-3 h-3" />
                            </button>
                            <div className="opacity-100 w-auto">
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
            </div>

            {/* DAYS GRID */}
            <div className="flex-1 grid grid-cols-7">
            {weekDays.map((day: Date, i: number) => {
                const dateStr = toISODate(day);
                const logVal = logs[`${habit.id}_${dateStr}`]?.value || 0;
                const target = habit.daily_goal || 1;
                const isNumeric = target > 1;
                const isDisabled = isFuture(dateStr);
                const isToday = isTodayCol ? isTodayCol(i) : false;

                return (
                    <WeeklyCell
                        key={day.toString()}
                        dayStr={dateStr}
                        logVal={logVal}
                        target={target}
                        unit={habit.unit}
                        isNumeric={isNumeric}
                        isDisabled={isDisabled}
                        isToday={isToday}
                        onToggle={(d: any, v: any) => onToggle(habit.id, d, v)}
                        theme={theme}
                    />
                );
            })}
            </div>
        </div>

        {/* INTEL REVEAL (Accordion) */}
        <AnimatePresence>
            {isExpanded && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-slate-900/80 border-b border-white/5 overflow-hidden"
                >
                    <div className="p-4 pl-[200px] grid grid-cols-3 gap-8">
                        <div className="space-y-1">
                            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Tactical (How)</h4>
                            <p className="text-sm text-slate-300 leading-relaxed">
                                {(typeof habit.metadata?.tactical === 'string' ? habit.metadata.tactical : habit.metadata?.tactical?.description) || habit.metadata?.compiler?.step || habit.how_instruction || "Hydration Required."}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Identity (Why)</h4>
                            <p className="text-sm text-slate-300 leading-relaxed">
                                {(typeof habit.metadata?.identity === 'string' ? habit.metadata.identity : habit.metadata?.identity?.motivation) || habit.metadata?.compiler?.why || habit.why_instruction || "Hydration Required."}
                            </p>
                        </div>
                        <div className="space-y-1 relative">
                            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Field Note</h4>
                            <textarea
                                placeholder=""
                                className="w-full bg-slate-900/40 border border-slate-800/50 rounded-lg p-3 text-sm text-white focus:border-blue-500 outline-none resize-none overflow-y-auto"
                                rows={1}
                                onBlur={handleNoteBlur}
                                style={{ minHeight: '40px', maxHeight: '120px' }}
                            />
                            {/* Manual Save (Backup) */}
                            <button className="absolute right-2 bottom-2 text-[10px] text-blue-500 font-bold uppercase hover:text-white transition-colors">
                                SAVE
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
  );
}
