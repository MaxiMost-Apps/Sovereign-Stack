import React, { useState } from 'react';
import { X } from 'lucide-react';

// styles/theme.ts (Define the Sovereign Colors)
const SOVEREIGN_COLORS = {
  bg: "bg-[#0B1221]", // The Deep Navy Background
  panel: "bg-[#131B2C]", // The Input Fields
  accent: "bg-[#2563EB]", // The Electric Blue Active State
  textSub: "text-slate-400",
  border: "border-white/5"
};

export const EditProtocolModal = ({ habit, onClose, onSave }: any) => {
  const [mode, setMode] = useState<'ABSOLUTE' | 'FREQUENCY'>(habit.frequency_type === 'weekly' ? 'FREQUENCY' : 'ABSOLUTE');
  const [title, setTitle] = useState(habit.title || '');
  const [description, setDescription] = useState(habit.description || '');
  const [targetDays, setTargetDays] = useState(habit.target_days || 4); // Default to 4

  const handleSave = () => {
      onSave({
          ...habit,
          title,
          description,
          frequency_type: mode === 'FREQUENCY' ? 'weekly' : 'daily',
          daily_goal: mode === 'FREQUENCY' ? targetDays : (habit.daily_goal || 1)
      });
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${SOVEREIGN_COLORS.bg}/90 backdrop-blur-xl`}>
      <div className={`w-full max-w-2xl ${SOVEREIGN_COLORS.bg} border ${SOVEREIGN_COLORS.border} shadow-2xl rounded-xl overflow-hidden`}>

        {/* HEADER */}
        <div className="flex justify-between items-center p-6 border-b border-white/5">
          <h2 className="text-xl font-black tracking-widest text-white uppercase">Edit Protocol</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-white"><X size={20}/></button>
        </div>

        <div className="p-8 space-y-8">

          {/* TITLE INPUT */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">Habit Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full p-4 rounded-lg ${SOVEREIGN_COLORS.panel} text-white font-mono focus:ring-1 focus:ring-blue-500 outline-none`}
            />
          </div>

          {/* MISSION DESCRIPTION */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">Mission Description</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full p-4 rounded-lg ${SOVEREIGN_COLORS.panel} text-white font-mono outline-none resize-none`}
            />
          </div>

          {/* THE TOGGLE (ABSOLUTE VS FREQUENCY) */}
          <div className="grid grid-cols-2 bg-black/40 p-1 rounded-lg">
            <button
              onClick={() => setMode('ABSOLUTE')}
              className={`py-3 text-xs font-bold tracking-widest uppercase transition-all rounded-md ${mode === 'ABSOLUTE' ? 'bg-red-900/50 text-red-500 shadow-lg' : 'text-slate-600 hover:text-slate-400'}`}
            >
              Absolute
            </button>
            <button
              onClick={() => setMode('FREQUENCY')}
              className={`py-3 text-xs font-bold tracking-widest uppercase transition-all rounded-md ${mode === 'FREQUENCY' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'text-slate-600 hover:text-slate-400'}`}
            >
              Frequency
            </button>
          </div>

          {/* FREQUENCY SELECTOR (1-7) */}
          {mode === 'FREQUENCY' && (
            <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
              <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">Target Days / Week</label>
                <span className="text-blue-400 font-mono text-xs">{targetDays}</span>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {[1,2,3,4,5,6,7].map(num => (
                  <button
                    key={num}
                    onClick={() => setTargetDays(num)}
                    className={`h-10 rounded border border-white/5 flex items-center justify-center font-mono text-sm transition-all
                      ${targetDays === num ? 'bg-blue-600 text-white border-blue-400 shadow-[0_0_15px_rgba(37,99,235,0.5)]' : 'bg-[#131B2C] text-slate-500 hover:bg-white/5'}
                    `}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ACTION FOOTER */}
          <div className="flex justify-end gap-4 pt-6 border-t border-white/5">
            <button onClick={onClose} className="px-6 py-3 text-xs font-bold tracking-widest text-slate-500 hover:text-white uppercase">Cancel</button>
            <button onClick={handleSave} className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold tracking-widest uppercase rounded shadow-lg shadow-blue-900/20">
              Update Habit
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
