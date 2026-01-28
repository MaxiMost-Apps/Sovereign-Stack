import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { ICON_MAP } from '@/data/sovereign_library';

// The "Titan" Color Palette from your screenshot
const COLOR_PALETTE = [
  'bg-blue-600', 'bg-teal-600', 'bg-amber-600', 'bg-violet-600', 'bg-slate-500',
  'bg-red-600', 'bg-cyan-600', 'bg-lime-600', 'bg-indigo-600', 'bg-stone-400'
];

export const HabitEditModal = ({ habit, onClose, onSave }: any) => {
  const [formData, setFormData] = useState({
    title: habit.title,
    description: habit.description,
    frequency_type: habit.default_config.frequency_type,
    target: habit.default_config.target_days,
    unit: 'reps', // defaulting for now
    color: habit.visuals.color,
    icon: habit.visuals.icon,
    tactical: habit.lenses?.FORTITUDE?.how || '',
    identity: habit.lenses?.FORTITUDE?.why || '',
    status: 'active'
  });

  const handleSave = () => {
    onSave(habit.id, formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/90 backdrop-blur-md p-0 md:p-4">
      <div className="w-full max-w-lg bg-[#0B1221] border-t md:border border-white/10 md:rounded-2xl shadow-2xl h-[90vh] md:h-auto overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">

        {/* HEADER */}
        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-slate-900/50 sticky top-0 z-10 backdrop-blur-md">
          <div>
            <h2 className="text-lg font-black uppercase tracking-widest text-white">Edit Protocol</h2>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[10px] font-bold text-blue-500 uppercase tracking-wider">Console Active</span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-slate-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-6">

          {/* TITLE & DESCRIPTION */}
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Habit Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full bg-[#131B2C] border border-white/10 rounded-lg p-3 text-white font-bold focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Mission Description</label>
              <textarea
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                className="w-full bg-[#131B2C] border border-white/10 rounded-lg p-3 text-slate-300 text-sm focus:border-blue-500 focus:outline-none transition-colors h-20 resize-none"
              />
            </div>
          </div>

          {/* TYPE TOGGLE */}
          <div className="bg-[#131B2C] p-1 rounded-lg flex border border-white/5">
            {['ABSOLUTE', 'FREQUENCY'].map(type => (
              <button
                key={type}
                onClick={() => setFormData({...formData, frequency_type: type as any})}
                className={`flex-1 py-2 text-[10px] font-black tracking-[0.2em] uppercase rounded-md transition-all ${
                  formData.frequency_type === type
                    ? 'bg-slate-700 text-white shadow-lg'
                    : 'text-slate-600 hover:text-slate-400'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* GOAL / UNIT */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Goal</label>
              <input
                type="number"
                value={formData.target}
                onChange={e => setFormData({...formData, target: parseInt(e.target.value)})}
                className="w-full bg-[#131B2C] border border-white/10 rounded-lg p-3 text-white font-mono"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Unit</label>
              <input
                type="text"
                value={formData.unit}
                onChange={e => setFormData({...formData, unit: e.target.value})}
                className="w-full bg-[#131B2C] border border-white/10 rounded-lg p-3 text-white font-mono"
              />
            </div>
          </div>

          {/* VISUALS (Color Picker) */}
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 block">Visuals</label>
            <div className="flex flex-wrap gap-3">
              {COLOR_PALETTE.map(color => (
                <button
                  key={color}
                  onClick={() => setFormData({...formData, color})}
                  className={`w-10 h-10 rounded-full ${color} transition-transform hover:scale-110 flex items-center justify-center ${
                    formData.color === color ? 'ring-2 ring-white ring-offset-2 ring-offset-[#0B1221] scale-110' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  {formData.color === color && <Check size={16} className="text-white" strokeWidth={4} />}
                </button>
              ))}
            </div>
          </div>

          {/* TACTICAL & IDENTITY (The Rich Data) */}
          <div className="space-y-4 pt-4 border-t border-white/5">
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Tactical (How)</label>
              <textarea
                value={formData.tactical}
                onChange={e => setFormData({...formData, tactical: e.target.value})}
                placeholder="Precise steps..."
                className="w-full bg-[#131B2C] border border-white/10 rounded-lg p-3 text-slate-300 text-sm focus:border-blue-500 focus:outline-none h-24 font-mono"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Identity (Why)</label>
              <textarea
                value={formData.identity}
                onChange={e => setFormData({...formData, identity: e.target.value})}
                placeholder="Identity reason..."
                className="w-full bg-[#131B2C] border border-white/10 rounded-lg p-3 text-slate-300 text-sm focus:border-blue-500 focus:outline-none h-24 font-mono"
              />
            </div>
          </div>

        </div>

        {/* FOOTER */}
        <div className="p-6 border-t border-white/5 bg-slate-950/50 flex gap-4">
          <button onClick={onClose} className="flex-1 py-3 rounded-lg text-xs font-bold text-slate-500 hover:bg-white/5 uppercase tracking-widest transition-colors">
            Cancel
          </button>
          <button onClick={handleSave} className="flex-[2] py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-widest shadow-lg shadow-blue-900/20 transition-colors">
            Update Habit
          </button>
        </div>

      </div>
    </div>
  );
};
