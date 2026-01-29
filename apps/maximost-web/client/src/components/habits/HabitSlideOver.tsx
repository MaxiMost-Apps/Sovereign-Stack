import React, { useState, useEffect } from 'react';
import { X, Check, Trash2, Calendar, FileText } from 'lucide-react';
import { ICON_MAP } from '@/data/sovereign_library';

interface HabitSlideOverProps {
  habit: any; // The habit data (either from Library or Active)
  mode: 'EDIT' | 'CREATE'; // Are we editing active or deploying new?
  onClose: () => void;
  onConfirm: (data: any) => void;
  onDelete?: () => void;
}

export const HabitSlideOver: React.FC<HabitSlideOverProps> = ({ habit, mode, onClose, onConfirm, onDelete }) => {
  // Initialize state with habit data
  const [title, setTitle] = useState(habit.title);
  const [freqType, setFreqType] = useState<'ABSOLUTE' | 'FREQUENCY'>(habit.default_config?.frequency_type || 'ABSOLUTE');
  const [targetDays, setTargetDays] = useState(habit.default_config?.target_days || 7);
  const [goal, setGoal] = useState(habit.default_config?.target_value || 1);
  const [unit, setUnit] = useState(habit.default_config?.unit || 'reps');
  const [color, setColor] = useState(habit.visuals?.color || 'bg-blue-500');
  const [iconKey, setIconKey] = useState(habit.visuals?.icon || 'Zap');
  const [how, setHow] = useState(habit.lenses?.FORTITUDE?.how || '');
  const [why, setWhy] = useState(habit.lenses?.FORTITUDE?.why || '');

  const colors = ['bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-violet-600', 'bg-red-600', 'bg-cyan-600', 'bg-pink-500', 'bg-slate-500', 'bg-orange-500', 'bg-lime-500'];
  const icons = Object.keys(ICON_MAP);

  return (
    <div className="fixed inset-0 z-[70] flex justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md h-full bg-[#050A14] border-l border-white/10 shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">

        {/* HEADER */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-[#0B1221]">
           <div>
             <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1 block">
               {mode === 'CREATE' ? 'INITIALIZE PROTOCOL' : 'MODIFY PROTOCOL'}
             </span>
             <h2 className="text-xl font-black text-white uppercase tracking-widest">{title}</h2>
           </div>
           <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-slate-400 hover:text-white"><X size={20}/></button>
        </div>

        {/* SCROLLABLE BODY */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">

           {/* 1. FREQUENCY MATRIX */}
           <div className="space-y-4">
             <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Cadence</label>
             <div className="bg-white/5 p-1 rounded-lg flex">
                <button onClick={() => setFreqType('ABSOLUTE')} className={`flex-1 py-3 text-[10px] font-black uppercase rounded transition-all ${freqType === 'ABSOLUTE' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}>Absolute</button>
                <button onClick={() => setFreqType('FREQUENCY')} className={`flex-1 py-3 text-[10px] font-black uppercase rounded transition-all ${freqType === 'FREQUENCY' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}>Frequency</button>
             </div>

             {/* Slider for Frequency */}
             {freqType === 'FREQUENCY' && (
               <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                 <div className="flex justify-between mb-2">
                   <span className="text-[10px] text-slate-400 uppercase">Target Days</span>
                   <span className="text-xs font-bold text-white">{targetDays} / Week</span>
                 </div>
                 <input type="range" min="1" max="7" value={targetDays} onChange={(e) => setTargetDays(parseInt(e.target.value))} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />
               </div>
             )}
           </div>

           {/* 2. OUTPUT METRICS */}
           <div className="grid grid-cols-2 gap-4">
             <div>
               <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Daily Goal</label>
               <input type="number" value={goal} onChange={e => setGoal(parseInt(e.target.value))} className="w-full bg-white/5 p-3 rounded-xl border border-white/5 text-white font-mono text-center focus:border-blue-500 outline-none" />
             </div>
             <div>
               <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Unit</label>
               <input value={unit} onChange={e => setUnit(e.target.value)} className="w-full bg-white/5 p-3 rounded-xl border border-white/5 text-white font-mono text-center focus:border-blue-500 outline-none" />
             </div>
           </div>

           {/* 3. VISUAL IDENTIFIER */}
           <div>
             <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Signal Config</label>
             <div className="grid grid-cols-2 gap-4">
                <div className="grid grid-cols-5 gap-2 content-start">
                  {colors.map(c => (
                    <button key={c} onClick={() => setColor(c)} className={`w-8 h-8 rounded-full ${c} flex items-center justify-center transition-transform hover:scale-110 ${color === c ? 'ring-2 ring-white scale-110' : 'opacity-50'}`}>
                      {color === c && <Check size={14} className="text-white" />}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-5 gap-2 h-32 overflow-y-auto pr-1">
                  {icons.map(k => {
                    const Icon = ICON_MAP[k];
                    return (
                      <button key={k} onClick={() => setIconKey(k)} className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all ${iconKey === k ? 'bg-white text-black border-white' : 'border-white/10 text-slate-500 hover:text-white'}`}>
                        <Icon size={14} />
                      </button>
                    )
                  })}
                </div>
             </div>
           </div>

           {/* 4. TACTICAL BRIEF */}
           <div className="space-y-4">
             <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Tactical (How)</label>
                <textarea value={how} onChange={e => setHow(e.target.value)} className="w-full h-20 bg-white/5 p-3 rounded-xl border border-white/5 text-slate-300 text-xs focus:border-blue-500 outline-none resize-none" />
             </div>
             <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Identity (Why)</label>
                <textarea value={why} onChange={e => setWhy(e.target.value)} className="w-full h-20 bg-white/5 p-3 rounded-xl border border-white/5 text-slate-300 text-xs focus:border-blue-500 outline-none resize-none" />
             </div>
           </div>

        </div>

        {/* FOOTER */}
        <div className="p-6 border-t border-white/5 bg-[#0B1221] flex justify-between items-center gap-4">
           {mode === 'EDIT' && onDelete && (
             <button onClick={onDelete} className="p-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-colors">
               <Trash2 size={20} />
             </button>
           )}
           <button
             onClick={() => onConfirm({ ...habit, title, visuals: { color, icon: iconKey }, default_config: { frequency_type: freqType, target_days: targetDays, target_value: goal, unit }, lenses: { FORTITUDE: { how, why } } })}
             className="flex-1 py-4 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-lg shadow-blue-900/20 transition-all"
           >
             {mode === 'CREATE' ? 'Confirm Deployment' : 'Save Updates'}
           </button>
        </div>

      </div>
    </div>
  );
};
