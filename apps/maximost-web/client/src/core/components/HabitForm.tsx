import React, { useState } from 'react';
import { Save, Activity, Droplet, Zap, Brain, Moon, Sun, Flame, Layout, Music, Anchor, Coffee } from 'lucide-react';
import { getThemeStyles } from '../config/themeConfig';

interface HabitFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  mode: 'create' | 'edit' | 'library' | string;
}

const COLORS = ['maximost_blue', 'emerald_city', 'fuji_purple', 'mars_orange', 'obsidian_dark'];
const ICONS = [
  { id: 'Activity', icon: Activity },
  { id: 'Zap', icon: Zap },
  { id: 'Brain', icon: Brain },
  { id: 'Flame', icon: Flame },
  { id: 'Droplet', icon: Droplet },
  { id: 'Moon', icon: Moon },
  { id: 'Sun', icon: Sun },
  { id: 'Coffee', icon: Coffee },
];

export default function HabitForm({ initialData = {}, onSubmit, onCancel, mode }: HabitFormProps) {

  const [formData, setFormData] = useState({
    title: initialData.title || '',
    color: initialData.color || 'maximost_blue',
    icon: initialData.icon || 'Activity',
    daily_goal: initialData.daily_goal || initialData.target_value || 1,
    unit: initialData.unit || 'reps',
    frequency_type: initialData.frequency_type || initialData.type || 'daily',
    target_days: initialData.target_days || 1,
    why_instruction: initialData.why_instruction || initialData.identity || '',
    how_instruction: initialData.how_instruction || initialData.tactical || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...initialData,
      ...formData,
      daily_goal: parseInt(String(formData.daily_goal)) || 1,
      target_days: parseInt(String(formData.target_days)) || 1,
      frequency_type: formData.frequency_type
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* HEADER: NAME & COLOR */}
      <div className="space-y-4">
        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Protocol Identity</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Habit Name"
          className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white font-bold text-lg focus:border-blue-500 outline-none"
          required
        />
        
        {/* COLOR PICKER */}
        <div className="flex gap-3 justify-start">
           {COLORS.map(c => (
             <button
               key={c}
               type="button"
               onClick={() => setFormData({ ...formData, color: c })}
               className={`w-8 h-8 rounded-full border-2 transition-all ${formData.color === c ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-40 hover:opacity-100'}`}
               style={{ backgroundColor: getThemeStyles(c).primary }}
             />
           ))}
        </div>
      </div>

      {/* ICON PICKER */}
      <div className="space-y-2">
         <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Visual Anchor</label>
         <div className="flex gap-2 flex-wrap">
            {ICONS.map(({ id, icon: Icon }) => (
                <button
                    key={id}
                    type="button"
                    onClick={() => setFormData({ ...formData, icon: id })}
                    className={`p-2 rounded-lg border transition-all ${formData.icon === id ? 'bg-white/10 border-white text-white' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
                >
                    <Icon size={20} />
                </button>
            ))}
         </div>
      </div>

      {/* CALIBRATION (Goals) */}
      <div className="space-y-4 pt-4 border-t border-white/5">
        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Calibration</label>
        
        <div className="grid grid-cols-2 gap-4">
            <div>
            <label className="text-xs text-slate-400 block mb-1">Target Value</label>
            <input type="number" min="1" value={formData.daily_goal} onChange={(e) => setFormData({ ...formData, daily_goal: e.target.value })} className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white" />
            </div>
            <div>
            <label className="text-xs text-slate-400 block mb-1">Unit</label>
            <input type="text" value={formData.unit} onChange={(e) => setFormData({ ...formData, unit: e.target.value })} className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white" />
            </div>
        </div>

        <div>
            <label className="text-xs text-slate-400 block mb-1">Frequency</label>
            <select
               value={formData.frequency_type}
               onChange={(e) => setFormData({ ...formData, frequency_type: e.target.value })}
               className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white"
            >
               <option value="daily">Daily Protocol (Every Day)</option>
               <option value="weekly">Weekly Target</option>
            </select>
        </div>
      </div>

      {/* WHY / HOW */}
      <div className="space-y-4 pt-4 border-t border-white/5">
        <div>
           <label className="text-xs text-emerald-500 font-bold block mb-1">WHY (Purpose)</label>
           <textarea value={formData.why_instruction} onChange={(e) => setFormData({ ...formData, why_instruction: e.target.value })} className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-slate-300 text-xs h-16 resize-none" />
        </div>
        <div>
           <label className="text-xs text-blue-500 font-bold block mb-1">HOW (Execution)</label>
           <textarea value={formData.how_instruction} onChange={(e) => setFormData({ ...formData, how_instruction: e.target.value })} className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-slate-300 text-xs h-16 resize-none" />
        </div>
      </div>

      <div className="flex gap-3 pt-6">
        <button type="button" onClick={onCancel} className="flex-1 py-3 bg-gray-800 text-slate-400 rounded-lg font-bold">CANCEL</button>
        <button type="submit" className="flex-[2] py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-500 flex items-center justify-center gap-2">
          <Save size={18} /> SAVE
        </button>
      </div>

    </form>
  );
}
