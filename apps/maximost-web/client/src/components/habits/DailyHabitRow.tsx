import React from 'react';
import { Check, GripVertical, MoreVertical, Info } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export const DailyHabitRow = ({ habit, onToggle, onOpenInfo, onOpenMenu }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: habit.id });

  const style = { transform: CSS.Transform.toString(transform), transition };
  const isCompleted = habit.status === 'completed';
  const isAbsolute = habit.default_config?.frequency_type === 'ABSOLUTE';

  return (
    <div ref={setNodeRef} style={style} className={`relative group flex items-center gap-4 p-4 mb-3 rounded-2xl border transition-all duration-300 ${isCompleted ? 'bg-slate-900/50 border-slate-800' : 'bg-[#0B1221] border-white/5 hover:border-white/10'}`}>
      <div {...attributes} {...listeners} className="cursor-grab touch-none text-slate-700 hover:text-slate-500 p-1">
        <GripVertical size={20} />
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <div className="flex items-center gap-3">
          <h3 className={`text-sm font-bold tracking-wide transition-colors ${isCompleted ? 'text-slate-500 line-through' : 'text-white'}`}>
            {habit.title}
          </h3>
          <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={(e) => { e.stopPropagation(); onOpenInfo(habit); }} className="text-slate-600 hover:text-blue-400 p-1 hover:bg-white/5 rounded"><Info size={14} /></button>
            <button onClick={(e) => { e.stopPropagation(); onOpenMenu(habit); }} className="text-slate-600 hover:text-white p-1 hover:bg-white/5 rounded"><MoreVertical size={14} /></button>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-1">
          {isAbsolute ? (
            <span className="text-[9px] font-black text-red-600 tracking-[0.2em] uppercase border border-red-900/30 px-1.5 py-0.5 rounded bg-red-900/10">ABSOLUTE</span>
          ) : (
            <span className="text-[9px] font-black text-blue-500 tracking-[0.2em] uppercase border border-blue-900/30 px-1.5 py-0.5 rounded bg-blue-900/10">FREQ: {habit.target_days || 4}/WK</span>
          )}
          {habit.streak > 0 && <span className="text-[9px] font-bold text-orange-500">🔥 {habit.streak}</span>}
        </div>
      </div>

      <button
        onClick={() => onToggle(habit.id)}
        className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${isCompleted ? 'bg-slate-600 text-white shadow-[0_0_15px_rgba(255,255,255,0.15)] scale-105' : 'bg-[#131B2C] border-2 border-white/5 text-transparent hover:border-white/20'}`}
      >
         <Check size={20} strokeWidth={4} className={`transition-all duration-300 ${isCompleted ? 'scale-100' : 'scale-0'}`} />
      </button>
    </div>
  );
};
