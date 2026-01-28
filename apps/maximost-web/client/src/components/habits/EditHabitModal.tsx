import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { ICON_MAP } from '@/data/sovereign_library';

export const EditHabitModal = ({ habit, onClose, onSave }: any) => {
  const [title, setTitle] = useState(habit.title);
  const [mode, setMode] = useState<'ABSOLUTE' | 'FREQUENCY'>(habit.default_config?.frequency_type || 'ABSOLUTE');
  const [goal, setGoal] = useState(habit.default_config?.target_value || 1);
  const [unit, setUnit] = useState(habit.default_config?.unit || 'reps');
  const [color, setColor] = useState(habit.visuals?.color || 'bg-blue-500');
  const [iconKey, setIconKey] = useState(habit.visuals?.icon || 'Zap');
  const [how, setHow] = useState(habit.lenses?.FORTITUDE?.how || '');
  const [why, setWhy] = useState(habit.lenses?.FORTITUDE?.why || '');

  const colors = ['bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-violet-600', 'bg-red-600', 'bg-cyan-600', 'bg-pink-500', 'bg-slate-500', 'bg-orange-500', 'bg-lime-500'];
  const icons = Object.keys(ICON_MAP);

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="w-full max-w-xl bg-[#0B1221] border border-white/10 rounded-xl shadow-2xl flex flex-col max-h-[90vh]">

        {/* HEADER */}
        <div className="p-5 border-b border-white/5 flex justify-between items-center bg-slate-900/50 rounded-t-xl">
          <h2 className="text-lg font-black tracking-widest uppercase text-white">Edit Protocol</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-white"><X size={20} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* NAME */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Habit Name</label>
            <input value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-slate-900/50 p-4 rounded-lg border border-white/5 text-white font-bold focus:border-blue-500 outline-none" />
          </div>

          {/* TOGGLE */}
          <div className="bg-black/40 p-1 rounded-lg flex border border-white/5">
             <button onClick={() => setMode('ABSOLUTE')} className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded transition-all ${mode === 'ABSOLUTE' ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-600'}`}>Absolute</button>
             <button onClick={() => setMode('FREQUENCY')} className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded transition-all ${mode === 'FREQUENCY' ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-600'}`}>Frequency</button>
          </div>

          {/* GOAL / UNIT */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Goal</label>
              <input type="number" value={goal} onChange={e => setGoal(parseInt(e.target.value))} className="w-full bg-slate-900/50 p-4 rounded-lg border border-white/5 text-white font-mono focus:border-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Unit</label>
              <input value={unit} onChange={e => setUnit(e.target.value)} className="w-full bg-slate-900/50 p-4 rounded-lg border border-white/5 text-white font-mono focus:border-blue-500 outline-none" />
            </div>
          </div>

          {/* VISUALS (SPLIT LAYOUT) */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Visuals</label>
            <div className="grid grid-cols-2 gap-6">
              {/* COLORS */}
              <div className="grid grid-cols-5 gap-2 content-start">
                {colors.map(c => (
                  <button key={c} onClick={() => setColor(c)} className={`w-8 h-8 rounded-full ${c} flex items-center justify-center transition-transform hover:scale-110 ${color === c ? 'ring-2 ring-white scale-110' : 'opacity-70'}`}>
                    {color === c && <Check size={14} className="text-white" />}
                  </button>
                ))}
              </div>
              {/* ICONS */}
              <div className="grid grid-cols-5 gap-2 h-32 overflow-y-auto pr-2 custom-scrollbar">
                {icons.map(k => {
                  const Icon = ICON_MAP[k];
                  return (
                    <button key={k} onClick={() => setIconKey(k)} className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all ${iconKey === k ? 'bg-white text-black border-white' : 'bg-slate-900 border-white/10 text-slate-500 hover:text-white'}`}>
                      <Icon size={14} />
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* TEXT AREAS */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Tactical (How)</label>
            <textarea value={how} onChange={e => setHow(e.target.value)} className="w-full h-20 bg-slate-900/50 p-4 rounded-lg border border-white/5 text-slate-300 text-sm focus:border-blue-500 outline-none resize-none" />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Identity (Why)</label>
            <textarea value={why} onChange={e => setWhy(e.target.value)} className="w-full h-20 bg-slate-900/50 p-4 rounded-lg border border-white/5 text-slate-300 text-sm focus:border-blue-500 outline-none resize-none" />
          </div>

        </div>

        {/* FOOTER */}
        <div className="p-5 border-t border-white/5 bg-slate-950/50 flex justify-end gap-3 rounded-b-xl">
          <button onClick={onClose} className="px-6 py-3 text-xs font-bold text-slate-500 hover:text-white uppercase tracking-widest">Cancel</button>
          <button onClick={() => onSave({ ...habit, title, visuals: { color, icon: iconKey }, default_config: { frequency_type: mode, target_value: goal, unit }, lenses: { FORTITUDE: { how, why } } })} className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold tracking-widest shadow-lg uppercase">
            Save Habit
          </button>
        </div>

      </div>
    </div>
  );
};
