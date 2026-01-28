import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { ICON_MAP } from '@/data/sovereign_library';

export const HabitEditModal = ({ habit, onClose, onSave }: any) => {
  const [activeTab, setActiveTab] = useState<'ABSOLUTE' | 'FREQUENCY'>(habit.default_config.frequency_type);
  const [goal, setGoal] = useState(habit.default_config.target_days || 1);
  const [unit, setUnit] = useState('reps');
  const [color, setColor] = useState(habit.visuals.color);

  // Lens Data (Safe access)
  const defaultLens = { why: "Execute without excuse.", how: "Just do it." };
  const [tactical, setTactical] = useState(habit.lenses?.FORTITUDE?.how || defaultLens.how);
  const [identity, setIdentity] = useState(habit.lenses?.FORTITUDE?.why || defaultLens.why);

  const colors = [
    'bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-violet-600', 'bg-slate-500',
    'bg-red-600', 'bg-cyan-600', 'bg-lime-500', 'bg-indigo-600', 'bg-zinc-400'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#0B1221] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

        {/* HEADER: Corrected to "Edit Habit" */}
        <div className="p-5 border-b border-white/5 flex justify-between items-center bg-slate-900/50">
          <div>
            <h2 className="text-lg font-black tracking-widest uppercase text-white">Edit Habit</h2>
            <div className="flex items-center gap-2 mt-1">
              <div className={`w-2 h-2 rounded-full ${activeTab === 'ABSOLUTE' ? 'bg-red-500' : 'bg-blue-500'}`} />
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Atom Active</span>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* SCROLLABLE BODY */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">

          {/* TITLE & DESC */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Habit Name</label>
            <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5 text-white font-bold">
              {habit.title}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Tactical Brief</label>
            <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5 text-slate-400 text-sm">
              {habit.description}
            </div>
          </div>

          {/* FREQUENCY TOGGLE */}
          <div className="flex bg-black/40 p-1 rounded-lg border border-white/5">
            <button
              onClick={() => setActiveTab('ABSOLUTE')}
              className={`flex-1 py-2 rounded text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'ABSOLUTE' ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-600 hover:text-slate-400'}`}
            >
              Absolute
            </button>
            <button
              onClick={() => setActiveTab('FREQUENCY')}
              className={`flex-1 py-2 rounded text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'FREQUENCY' ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-600 hover:text-slate-400'}`}
            >
              Frequency
            </button>
          </div>

          {/* GOAL & UNIT */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Target (Days)</label>
              <input
                type="number"
                value={goal}
                onChange={(e) => setGoal(parseInt(e.target.value))}
                className="w-full bg-slate-900/50 p-4 rounded-xl border border-white/5 text-white font-mono focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Unit</label>
              <input
                type="text"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full bg-slate-900/50 p-4 rounded-xl border border-white/5 text-white font-mono focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          {/* VISUALS */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Atom Color</label>
            <div className="flex gap-2 flex-wrap">
              {colors.map(c => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-10 h-10 rounded-full ${c} flex items-center justify-center transition-transform hover:scale-110 ${color === c ? 'ring-2 ring-white scale-110' : ''}`}
                >
                  {color === c && <Check size={16} className="text-white" />}
                </button>
              ))}
            </div>
          </div>

          {/* LENS DATA */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Tactical (How)</label>
            <textarea
              value={tactical}
              onChange={(e) => setTactical(e.target.value)}
              className="w-full h-24 bg-slate-900/50 p-4 rounded-xl border border-white/5 text-slate-300 text-sm focus:border-blue-500 outline-none resize-none font-mono"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Identity (Why)</label>
            <textarea
              value={identity}
              onChange={(e) => setIdentity(e.target.value)}
              className="w-full h-24 bg-slate-900/50 p-4 rounded-xl border border-white/5 text-slate-300 text-sm focus:border-blue-500 outline-none resize-none font-mono"
            />
          </div>
        </div>

        {/* FOOTER */}
        <div className="p-5 border-t border-white/5 bg-slate-950/50 flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-3 rounded-lg text-xs font-bold text-slate-500 hover:text-white hover:bg-white/5 transition-colors uppercase tracking-widest">
            Cancel
          </button>
          <button onClick={() => onSave({ ...habit, default_config: { ...habit.default_config, frequency_type: activeTab, target_days: goal }, visuals: { ...habit.visuals, color } })} className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold tracking-widest transition-colors shadow-lg shadow-blue-900/20 uppercase">
            Save Habit
          </button>
        </div>

      </div>
    </div>
  );
};
