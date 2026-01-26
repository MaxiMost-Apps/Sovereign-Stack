import React, { useState } from 'react';
import { Save, Activity, Zap, Brain, Flame, Droplet, Moon, Sun, Coffee, Dumbbell, Book, Briefcase, Heart, Trash2, Calendar, FileText, Layout } from 'lucide-react';
import { getThemeStyles } from '../config/themeConfig';

interface HabitFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  mode: 'create' | 'edit';
}

const COLORS = ['maximost_blue', 'emerald_city', 'fuji_purple', 'mars_orange', 'obsidian_dark', 'red', 'yellow', 'pink', 'cyan', 'gray'];
const ICONS = [
  { id: 'Activity', icon: Activity }, { id: 'Zap', icon: Zap }, { id: 'Brain', icon: Brain },
  { id: 'Flame', icon: Flame }, { id: 'Droplet', icon: Droplet }, { id: 'Moon', icon: Moon },
  { id: 'Sun', icon: Sun }, { id: 'Coffee', icon: Coffee }, { id: 'Dumbbell', icon: Dumbbell },
  { id: 'Book', icon: Book }, { id: 'Briefcase', icon: Briefcase }, { id: 'Heart', icon: Heart }
];

export default function HabitForm({ initialData = {}, onSubmit, onCancel, mode }: HabitFormProps) {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    color: initialData.color || 'maximost_blue',
    icon: initialData.icon || 'Activity',
    daily_goal: initialData.daily_goal || 1,
    unit: initialData.unit || 'reps',
    frequency_type: initialData.frequency_type || 'daily',
    why_instruction: initialData.why_instruction || '',
    how_instruction: initialData.how_instruction || '',
    start_date: initialData.start_date || new Date().toISOString().split('T')[0],
    custom_note: initialData.custom_note || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...initialData, ...formData, daily_goal: parseInt(String(formData.daily_goal)) || 1 });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 h-full text-slate-200">
      
      {/* 1. TOP BAR: FREQUENCY & DATE */}
      <div className="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
        <div className="flex-1">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Frequency</label>
            <select
               value={formData.frequency_type}
               onChange={(e) => setFormData({ ...formData, frequency_type: e.target.value })}
               className="w-full bg-black border border-white/20 rounded-lg p-2 text-white font-bold text-sm outline-none focus:border-blue-500"
            >
               <option value="daily">Daily Protocol</option>
               <option value="weekly">Weekly Target</option>
               <option value="absolute">Non-Negotiable</option>
            </select>
        </div>
        <div className="flex-1">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Start Date</label>
            <input
                type="date"
                value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                className="w-full bg-black border border-white/20 rounded-lg p-2 text-white font-bold text-sm outline-none focus:border-blue-500"
            />
        </div>
      </div>

      {/* 2. IDENTITY (Name & Target) */}
      <div className="space-y-4">
          <div>
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">Habit Identity</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Morning Sunlight"
              className="w-full bg-[#0b0c10] border border-white/10 rounded-xl p-4 text-white font-black text-xl focus:border-blue-500 outline-none placeholder:text-slate-700"
              autoFocus
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
              <div>
                 <label className="text-[10px] text-slate-500 font-bold block mb-1">TARGET VALUE</label>
                 <input type="number" min="1" value={formData.daily_goal} onChange={(e) => setFormData({ ...formData, daily_goal: e.target.value })} className="w-full bg-[#0b0c10] border border-white/10 rounded-lg p-3 text-white font-mono" />
              </div>
              <div>
                 <label className="text-[10px] text-slate-500 font-bold block mb-1">UNIT</label>
                 <input type="text" value={formData.unit} onChange={(e) => setFormData({ ...formData, unit: e.target.value })} className="w-full bg-[#0b0c10] border border-white/10 rounded-lg p-3 text-white" />
              </div>
          </div>
      </div>

      {/* 3. VISUALS (Split Layout) */}
      <div className="grid grid-cols-12 gap-6 pt-6 border-t border-white/5">
          {/* COLORS (Left - 4 Cols) */}
          <div className="col-span-4 border-r border-white/5 pr-4">
             <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-3">Theme</label>
             <div className="grid grid-cols-3 gap-3">
                {COLORS.map(c => (
                    <button
                    key={c}
                    type="button"
                    onClick={() => setFormData({ ...formData, color: c })}
                    className={`w-8 h-8 rounded-full transition-all ${formData.color === c ? 'ring-2 ring-white scale-110 shadow-lg' : 'opacity-30 hover:opacity-100'}`}
                    style={{ backgroundColor: getThemeStyles(c).primary }}
                    />
                ))}
             </div>
          </div>

          {/* ICONS (Right - 8 Cols) */}
          <div className="col-span-8 pl-2">
             <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-3">Icon</label>
             <div className="grid grid-cols-6 gap-2">
                {ICONS.map(({ id, icon: Icon }) => (
                    <button
                        key={id}
                        type="button"
                        onClick={() => setFormData({ ...formData, icon: id })}
                        className={`p-2 rounded-lg flex items-center justify-center transition-all ${formData.icon === id ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-600 hover:text-slate-300 hover:bg-white/5'}`}
                    >
                        <Icon size={18} />
                    </button>
                ))}
             </div>
          </div>
      </div>

      {/* 4. FOOTER */}
      <div className="flex gap-3 pt-6 border-t border-white/5 items-center sticky bottom-0 bg-[#14151a] z-10 pb-4">
        <button type="button" onClick={onCancel} className="px-6 py-3 bg-white/5 hover:bg-white/10 text-slate-400 rounded-xl font-bold uppercase text-xs tracking-widest">Cancel</button>
        <button type="submit" className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 uppercase text-xs tracking-widest shadow-lg shadow-blue-900/20">
          <Save size={16} /> Save Changes
        </button>
        {mode === 'edit' && (
            <button type="button" className="p-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all"><Trash2 size={20} /></button>
        )}
      </div>
    </form>
  );
}
