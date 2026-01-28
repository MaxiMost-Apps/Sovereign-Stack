import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { ICON_MAP } from '@/data/sovereign_library';

export const EditHabitModal = ({ habit, onClose, onSave }: any) => {
  const [title, setTitle] = useState(habit.title);
  const [desc, setDesc] = useState(habit.description);
  const [mode, setMode] = useState<'ABSOLUTE' | 'FREQUENCY'>(habit.default_config?.frequency_type || 'ABSOLUTE');
  const [target, setTarget] = useState(habit.default_config?.target_days || 7);
  const [unit, setUnit] = useState('reps');
  const [color, setColor] = useState(habit.visuals?.color || 'bg-blue-500');

  const colors = ['bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-violet-600', 'bg-slate-500', 'bg-red-600', 'bg-cyan-600', 'bg-lime-500'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="w-full max-w-md bg-[#0B1221] border border-white/10 rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">

        {/* HEADER */}
        <div className="p-5 border-b border-white/5 flex justify-between items-center bg-slate-900/50 rounded-t-2xl">
          <div>
            <h2 className="text-lg font-black tracking-widest uppercase text-white">Edit Habit</h2>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Atom Active</span>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white"><X size={20} /></button>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">

          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Habit Name</label>
            <input value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-slate-900/50 p-4 rounded-xl border border-white/5 text-white font-bold focus:border-blue-500 outline-none" />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Tactical Brief</label>
            <textarea value={desc} onChange={e => setDesc(e.target.value)} className="w-full h-20 bg-slate-900/50 p-4 rounded-xl border border-white/5 text-slate-300 text-sm focus:border-blue-500 outline-none resize-none" />
          </div>

          {/* TOGGLE */}
          <div className="bg-black/30 p-1 rounded-lg flex border border-white/5">
             <button onClick={() => setMode('ABSOLUTE')} className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded transition-all ${mode === 'ABSOLUTE' ? 'bg-slate-700 text-white' : 'text-slate-600'}`}>Absolute</button>
             <button onClick={() => setMode('FREQUENCY')} className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded transition-all ${mode === 'FREQUENCY' ? 'bg-slate-700 text-white' : 'text-slate-600'}`}>Frequency</button>
          </div>

          {/* METRICS */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Target (Days)</label>
              <input type="number" value={target} onChange={e => setTarget(parseInt(e.target.value))} className="w-full bg-slate-900/50 p-4 rounded-xl border border-white/5 text-white font-mono text-center focus:border-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Unit</label>
              <input value={unit} onChange={e => setUnit(e.target.value)} className="w-full bg-slate-900/50 p-4 rounded-xl border border-white/5 text-white font-mono text-center focus:border-blue-500 outline-none" />
            </div>
          </div>

          {/* COLORS */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Atom Color</label>
            <div className="flex flex-wrap gap-3">
              {colors.map(c => (
                <button key={c} onClick={() => setColor(c)} className={`w-10 h-10 rounded-full ${c} flex items-center justify-center transition-transform hover:scale-110 ${color === c ? 'ring-2 ring-white scale-110' : 'opacity-70'}`}>
                  {color === c && <Check size={16} className="text-white" />}
                </button>
              ))}
            </div>
          </div>

          {/* TACTICAL/IDENTITY BOXES */}
          <div className="p-4 bg-slate-900/30 rounded-xl border border-white/5">
            <span className="block text-[10px] text-blue-400 font-black uppercase mb-1">Tactical (How)</span>
            <p className="text-xs text-slate-300">"{habit.lenses?.FORTITUDE?.how || 'Execute without hesitation.'}"</p>
          </div>
          <div className="p-4 bg-slate-900/30 rounded-xl border border-white/5">
            <span className="block text-[10px] text-green-400 font-black uppercase mb-1">Identity (Why)</span>
            <p className="text-xs text-slate-300">"{habit.lenses?.FORTITUDE?.why || 'Because the alternative is mediocrity.'}"</p>
          </div>

        </div>

        {/* FOOTER */}
        <div className="p-5 border-t border-white/5 bg-slate-950/50 flex justify-end gap-3 rounded-b-2xl">
          <button onClick={onClose} className="px-6 py-3 text-xs font-bold text-slate-500 hover:text-white uppercase tracking-widest">Cancel</button>
          <button onClick={() => onSave({ ...habit, title, description: desc, visuals: { ...habit.visuals, color }, default_config: { frequency_type: mode, target_days: target } })} className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold tracking-widest shadow-lg uppercase">
            Save Habit
          </button>
        </div>

      </div>
    </div>
  );
};
