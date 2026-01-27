import React, { useState, useEffect } from 'react';
import { X, Save, Calendar, BarChart2 } from 'lucide-react';
import { SOVEREIGN_LIBRARY } from '../../data/sovereign_library';

export default function EditHabitModal({ habitData, onClose, onSave }: any) {
  // Hydrate visual data from Master File if available, fallback to DB data
  const masterDef = SOVEREIGN_LIBRARY.find(h => h.id === habitData.habit_id);

  const [mode, setMode] = useState(habitData.frequency_type || 'FREQUENCY');
  const [targetDays, setTargetDays] = useState(habitData.target_days || 4);
  const [formData, setFormData] = useState({
    title: masterDef?.title || habitData.title,
    description: masterDef?.lenses['FORTITUDE'].why || habitData.description, // Default to Fortitude text
    unit: habitData.unit || 'reps',
    goal: habitData.goal || 1
  });

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-[#0B1221] border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">

        {/* HEADER */}
        <div className="flex justify-between items-center p-6 border-b border-white/5 bg-[#0B1221]">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
            <h2 className="text-sm font-black tracking-[0.2em] text-white uppercase">Edit Protocol</h2>
          </div>
          <button onClick={onClose} className="text-slate-600 hover:text-white transition-colors"><X size={18}/></button>
        </div>

        <div className="p-8 space-y-6">

          {/* TITLE & DESCRIPTION */}
          <div className="space-y-4">
            <div className="group">
              <label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-2 block group-focus-within:text-blue-500">Habit Title</label>
              <input
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full bg-[#131B2C] border border-white/5 rounded p-4 text-lg font-mono text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
              />
            </div>

            <div className="group">
              <label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-2 block group-focus-within:text-blue-500">Mission Description</label>
              <textarea
                rows={2}
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                className="w-full bg-[#131B2C] border border-white/5 rounded p-4 text-sm font-mono text-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all resize-none"
              />
            </div>
          </div>

          {/* THE TOGGLE: ABSOLUTE VS FREQUENCY */}
          <div className="grid grid-cols-2 bg-black/50 p-1.5 rounded-lg border border-white/5">
            <button
              onClick={() => setMode('ABSOLUTE')}
              className={`py-3 text-[10px] font-black tracking-[0.2em] uppercase transition-all rounded-md flex items-center justify-center gap-2
                ${mode === 'ABSOLUTE' ? 'bg-red-900/20 text-red-500 border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.15)]' : 'text-slate-600 hover:text-slate-400'}`}
            >
              Absolute
            </button>
            <button
              onClick={() => setMode('FREQUENCY')}
              className={`py-3 text-[10px] font-black tracking-[0.2em] uppercase transition-all rounded-md flex items-center justify-center gap-2
                ${mode === 'FREQUENCY' ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]' : 'text-slate-600 hover:text-slate-400'}`}
            >
              Frequency
            </button>
          </div>

          {/* FREQUENCY SELECTOR (1-7) */}
          {mode === 'FREQUENCY' && (
            <div className="space-y-3 animate-in fade-in slide-in-from-top-1">
              <div className="flex justify-between items-end">
                <label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">Target Days / Week</label>
                <span className="text-blue-400 font-mono text-xs">{targetDays}</span>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {[1,2,3,4,5,6,7].map(num => (
                  <button
                    key={num}
                    onClick={() => setTargetDays(num)}
                    className={`h-10 rounded border flex items-center justify-center font-mono text-sm transition-all
                      ${targetDays === num
                        ? 'bg-blue-600 border-blue-400 text-white shadow-[0_0_10px_rgba(37,99,235,0.5)]'
                        : 'bg-[#131B2C] border-white/5 text-slate-600 hover:border-white/20 hover:text-slate-300'}
                    `}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ACTION FOOTER */}
          <div className="flex justify-end gap-6 pt-6 border-t border-white/5 mt-4">
            <button onClick={onClose} className="text-[10px] font-bold tracking-widest text-slate-500 hover:text-white uppercase transition-colors">
              Cancel
            </button>
            <button
              onClick={() => onSave({ ...habitData, ...formData, frequency_type: mode, target_days: targetDays })}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black tracking-[0.2em] uppercase rounded shadow-lg shadow-blue-900/20 transform active:scale-95 transition-all"
            >
              Update Protocol
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
