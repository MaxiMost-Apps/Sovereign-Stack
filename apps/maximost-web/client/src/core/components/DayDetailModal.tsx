import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { getCheckColor } from '../utils/getHabitStyle';

interface DayDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date;
  logs: any;
  habits: any[];
}

export default function DayDetailModal({ isOpen, onClose, date, logs, habits }: DayDetailModalProps) {
  if (!isOpen) return null;

  const dateStr = format(date, 'yyyy-MM-dd');

  // Filter logs for this specific date
  const completedHabits = habits.filter((h: any) => {
    const entry = Object.values(logs).find((l: any) => l.habit_id === h.id && l.completed_at.startsWith(dateStr));
    return entry && entry.value >= (h.daily_goal || 1);
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-sm bg-[#0b0c10] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/[0.02]">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-500" />
                {format(date, 'MMM d, yyyy')}
              </h3>
              <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">Daily Log</p>
            </div>
            <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
            {completedHabits.length > 0 ? (
              <div className="space-y-3">
                {completedHabits.map((h: any) => {
                   const colorClass = getCheckColor(h.color).split(' ')[0]; // Extract text color class
                   return (
                    <div key={h.id} className="flex items-center gap-3 p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                      <div className={`w-2 h-2 rounded-full ${colorClass.replace('text-', 'bg-')}`} />
                      <span className="text-sm font-bold text-slate-200">{h.title}</span>
                    </div>
                   );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-slate-500 italic text-sm">No protocols completed on this day.</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-white/5 bg-white/[0.02] text-center">
            <button onClick={onClose} className="text-xs font-bold text-slate-400 hover:text-white uppercase tracking-widest">
              Close Intelligence
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
