import React, { useState, useEffect } from 'react';
import { Save, Activity, Droplet, Zap, Brain, Moon, Sun, Flame } from 'lucide-react';
import { getThemeStyles } from '../config/themeConfig';

interface HabitFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  mode: 'create' | 'edit' | 'library' | string;
}

const COLORS = ['maximost_blue', 'emerald_city', 'fuji_purple', 'mars_orange', 'obsidian_dark'];

export default function HabitForm({ initialData = {}, onSubmit, onCancel, mode }: HabitFormProps) {

  // 1. ROBUST INITIALIZATION (Check all possible field names)
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    color: initialData.color || 'maximost_blue',
    icon: initialData.icon || 'Activity',

    // Normalize Goal: Look for daily_goal OR target_value OR default to 1
    daily_goal: initialData.daily_goal || initialData.target_value || 1,
    unit: initialData.unit || 'reps',

    // Normalize Frequency: Look for frequency_type OR type OR default to 'daily'
    frequency_type: initialData.frequency_type || initialData.type || 'daily',
    target_days: initialData.target_days || 1,

    why_instruction: initialData.why_instruction || initialData.identity || '',
    how_instruction: initialData.how_instruction || initialData.tactical || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 2. PREPARE PAYLOAD (Ensure Numbers are Numbers)
    const payload = {
      ...initialData, // Keep ID/Created_at
      ...formData,
      daily_goal: parseInt(String(formData.daily_goal)) || 1,
      target_days: parseInt(String(formData.target_days)) || 1,
      // Ensure we send frequency_type specifically
      frequency_type: formData.frequency_type
    };

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* IDENTITY */}
      <div className="space-y-4">
        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Protocol Identity</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Protocol Name"
          className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white font-bold placeholder:text-slate-600 focus:border-blue-500 outline-none"
          required
        />
        
        {/* COLORS */}
        <div className="flex gap-2">
           {COLORS.map(c => (
             <button
               key={c}
               type="button"
               onClick={() => setFormData({ ...formData, color: c })}
               className={`w-8 h-8 rounded-full border-2 transition-all ${formData.color === c ? 'border-white scale-110' : 'border-transparent opacity-50'}`}
               style={{ backgroundColor: getThemeStyles(c).primary }}
             />
           ))}
        </div>
      </div>

      {/* CALIBRATION (The Broken Part) */}
      <div className="space-y-4 pt-4 border-t border-white/5">
        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Calibration</label>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-slate-400 block mb-1">Target Value</label>
            <input
              type="number"
              min="1"
              value={formData.daily_goal}
              onChange={(e) => setFormData({ ...formData, daily_goal: e.target.value })}
              className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white font-mono"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1">Unit (e.g. oz, mins)</label>
            <input
              type="text"
              value={formData.unit}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white"
            />
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

      {/* DIRECTIVES */}
      <div className="space-y-4 pt-4 border-t border-white/5">
        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Directives</label>
        
        <div>
           <label className="text-xs text-emerald-500/80 font-bold block mb-1">WHY (Identity Anchor)</label>
           <textarea
             value={formData.why_instruction}
             onChange={(e) => setFormData({ ...formData, why_instruction: e.target.value })}
             className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-slate-300 text-sm h-20 resize-none outline-none focus:border-emerald-500/50"
           />
        </div>

        <div>
           <label className="text-xs text-blue-500/80 font-bold block mb-1">HOW (Tactical Execution)</label>
           <textarea
             value={formData.how_instruction}
             onChange={(e) => setFormData({ ...formData, how_instruction: e.target.value })}
             className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-slate-300 text-sm h-20 resize-none outline-none focus:border-blue-500/50"
           />
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
