import React, { useState } from 'react';
import { X, Edit2, Check, Target, Shield, ArrowLeft } from 'lucide-react';
import { ICON_MAP } from '@/data/sovereign_library';

export const HabitDetailModal = ({ habit, onClose, onSave }: any) => {
  const [isEditing, setIsEditing] = useState(false);

  // EDIT STATE
  const [color, setColor] = useState(habit.visuals.color);
  const [iconKey, setIconKey] = useState(habit.visuals.icon || 'Sun');
  const [frequencyType, setFrequencyType] = useState(habit.default_config.frequency_type);
  const [targetDays, setTargetDays] = useState(habit.default_config.target_days);

  const colors = [
    'bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-violet-600',
    'bg-red-600', 'bg-cyan-600', 'bg-pink-500', 'bg-indigo-600', 'bg-slate-500', 'bg-orange-500'
  ];

  const icons = Object.keys(ICON_MAP);

  // === READ ONLY DRAWER ===
  if (!isEditing) {
    return (
      <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in">
        <div className="w-full max-w-md bg-[#0B1221] border border-white/10 rounded-t-3xl md:rounded-2xl shadow-2xl overflow-hidden flex flex-col">

          <div className={`h-32 ${habit.visuals.color} relative flex items-end p-6`}>
             <button onClick={onClose} className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 p-2 rounded-full text-white transition-colors">
               <X size={18} />
             </button>
             <div>
               <h2 className="text-2xl font-black text-white uppercase tracking-widest">{habit.title}</h2>
               <div className="flex items-center gap-2 mt-2">
                 <span className="text-[10px] font-bold bg-black/20 px-2 py-1 rounded text-white/90 uppercase tracking-wider">
                   {habit.default_config.frequency_type}
                 </span>
                 <span className="text-[10px] font-bold bg-black/20 px-2 py-1 rounded text-white/90 uppercase tracking-wider">
                   {habit.default_config.target_days} Days / Wk
                 </span>
               </div>
             </div>
          </div>

          <div className="p-6 space-y-6 bg-[#0B1221]">
            <div>
              <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                <Target size={12} /> Tactical Objective
              </label>
              <p className="text-sm text-slate-300 leading-relaxed font-medium">{habit.description}</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
               <div className="p-4 bg-slate-900/50 rounded-xl border border-white/5">
                 <span className="flex items-center gap-2 text-[10px] font-black text-blue-400 uppercase mb-2">Protocol Logic</span>
                 <p className="text-xs text-white leading-relaxed">"{habit.lenses?.FORTITUDE?.why || 'Execute without excuse.'}"</p>
               </div>
            </div>
          </div>

          <div className="p-6 pt-0">
            <button onClick={() => setIsEditing(true)} className="w-full py-4 rounded-xl border border-white/10 text-xs font-bold text-white hover:bg-white/5 uppercase tracking-widest flex items-center justify-center gap-2 transition-colors">
              <Edit2 size={14} /> Adjust Parameters
            </button>
          </div>
        </div>
      </div>
    );
  }

  // === EDIT MODE ===
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in zoom-in-95 duration-200">
      <div className="w-full max-w-2xl bg-[#0B1221] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

        {/* HEADER */}
        <div className="p-5 border-b border-white/5 flex justify-between items-center bg-slate-900/50">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsEditing(false)} className="p-2 -ml-2 text-slate-500 hover:text-white"><ArrowLeft size={20}/></button>
            <h2 className="text-lg font-black tracking-widest uppercase text-white">Edit Atom</h2>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white"><X size={20} /></button>
        </div>

        {/* SPLIT LAYOUT */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* LEFT: COLORS */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Signal Color</label>
            <div className="grid grid-cols-5 gap-3">
              {colors.map(c => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`aspect-square rounded-xl ${c} flex items-center justify-center transition-transform hover:scale-105 ${color === c ? 'ring-2 ring-white scale-110' : 'opacity-70 hover:opacity-100'}`}
                >
                  {color === c && <Check size={20} className="text-white drop-shadow-md" />}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: ICONS */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Visual Icon</label>
            <div className="grid grid-cols-5 gap-3 max-h-60 overflow-y-auto p-1">
              {icons.map(iconName => {
                const IconComp = ICON_MAP[iconName];
                return (
                  <button
                    key={iconName}
                    onClick={() => setIconKey(iconName)}
                    className={`aspect-square rounded-xl flex items-center justify-center border transition-all ${
                      iconKey === iconName
                        ? 'bg-white text-black border-white'
                        : 'bg-slate-900 border-white/10 text-slate-500 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    <IconComp size={20} />
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* BOTTOM: FREQUENCY SLIDER */}
        <div className="p-6 border-t border-white/5 bg-slate-900/30">
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">
            Frequency Target: <span className="text-white text-sm ml-2">{targetDays} Days / Week</span>
          </label>
          <input
            type="range"
            min="1"
            max="7"
            value={targetDays}
            onChange={(e) => setTargetDays(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between text-[10px] text-slate-500 mt-2 font-mono uppercase">
            <span>1 Day</span>
            <span>Every Day</span>
          </div>
        </div>

        {/* SAVE FOOTER */}
        <div className="p-5 border-t border-white/5 bg-slate-950/50 flex justify-end gap-3">
          <button onClick={() => setIsEditing(false)} className="px-6 py-3 rounded-lg text-xs font-bold text-slate-500 hover:text-white uppercase tracking-widest">Cancel</button>
          <button
            onClick={() => onSave({
              ...habit,
              default_config: { ...habit.default_config, target_days: targetDays, frequency_type: targetDays === 7 ? 'ABSOLUTE' : 'FREQUENCY' },
              visuals: { color, icon: iconKey }
            })}
            className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold tracking-widest transition-colors shadow-lg shadow-blue-900/20 uppercase"
          >
            Confirm Updates
          </button>
        </div>

      </div>
    </div>
  );
};
