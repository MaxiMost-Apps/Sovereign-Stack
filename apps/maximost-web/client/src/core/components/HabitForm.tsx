import React, { useState } from 'react';
import { Save, Activity, Zap, Brain, Flame, Droplet, Moon, Sun, Layout, Music, Anchor, Coffee, Dumbbell, Book, Briefcase, Heart, Trash2, Calendar, FileText } from 'lucide-react';
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
    daily_goal: initialData.daily_goal || initialData.target_value || 1,
    unit: initialData.unit || 'reps',
    frequency_type: initialData.frequency_type || initialData.type || 'daily',
    target_days: initialData.target_days || 1,
    why_instruction: initialData.why_instruction || initialData.identity || '',
    how_instruction: initialData.how_instruction || initialData.tactical || '',
    start_date: initialData.start_date || new Date().toISOString().split('T')[0],
    custom_note: initialData.custom_note || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...initialData, ...formData, daily_goal: parseInt(String(formData.daily_goal)) || 1 });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 h-full text-slate-200">
      
      {/* 1. TOP ROW: FREQUENCY & START DATE */}
      <div className="grid grid-cols-2 gap-4">
        <div>
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Frequency</label>
            <div className="bg-[#0b0c10] border border-white/10 rounded-lg p-1 flex gap-1">
                <button
                    type="button"
                    onClick={() => setFormData({ ...formData, frequency_type: 'daily' })}
                    className={`flex-1 py-2 text-[10px] font-bold uppercase rounded transition-all ${formData.frequency_type === 'daily' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-white'}`}
                >
                    Daily
                </button>
                <button
                    type="button"
                    onClick={() => setFormData({ ...formData, frequency_type: 'weekly' })}
                    className={`flex-1 py-2 text-[10px] font-bold uppercase rounded transition-all ${formData.frequency_type === 'weekly' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-white'}`}
                >
                    Weekly
                </button>
            </div>
            {/* WEEKLY SLIDER */}
            {formData.frequency_type === 'weekly' && (
                <div className="mt-2 animate-in slide-in-from-top-2">
                    <div className="flex items-center gap-2 bg-[#0b0c10] border border-white/10 rounded-lg p-2">
                        <span className="text-xs font-bold text-slate-400 pl-2">Days:</span>
                        <input
                            type="range"
                            min="1" max="7"
                            value={formData.target_days}
                            onChange={(e) => setFormData({ ...formData, target_days: parseInt(e.target.value) })}
                            className="flex-1 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                        <span className="text-sm font-black text-blue-500 w-6 text-center">{formData.target_days}</span>
                    </div>
                </div>
            )}
        </div>
        <div>
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Start Date</label>
            <div className="relative">
                <input
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    className="w-full bg-[#0b0c10] border border-white/10 rounded-lg p-3 text-white outline-none focus:border-blue-500 text-xs font-bold uppercase"
                />
                <Calendar className="absolute right-3 top-2.5 text-slate-500 pointer-events-none" size={16} />
            </div>
        </div>
      </div>

      {/* 2. NAME */}
      <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Habit Name"
          className="w-full bg-[#0b0c10] border border-white/10 rounded-xl p-4 text-white font-black text-xl focus:border-blue-500 outline-none placeholder:text-slate-700"
          autoFocus
          required
      />

      {/* 3. TARGET & UNIT */}
      <div className="grid grid-cols-2 gap-4">
          <div>
             <label className="text-xs text-slate-500 font-bold block mb-2">Target Value</label>
             <input type="number" min="1" value={formData.daily_goal} onChange={(e) => setFormData({ ...formData, daily_goal: e.target.value })} className="w-full bg-[#0b0c10] border border-white/10 rounded-lg p-3 text-white font-mono focus:border-blue-500 outline-none" />
          </div>
          <div>
             <label className="text-xs text-slate-500 font-bold block mb-2">Unit (e.g. mins, oz)</label>
             <input type="text" value={formData.unit} onChange={(e) => setFormData({ ...formData, unit: e.target.value })} className="w-full bg-[#0b0c10] border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 outline-none" />
          </div>
      </div>

      {/* 4. SPLIT: COLORS (Left) & ICONS (Right) */}
      <div className="grid grid-cols-12 gap-6 pt-4 border-t border-white/5">
          {/* COLORS - LEFT COL (4) */}
          <div className="col-span-4 border-r border-white/5 pr-4">
             <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-3">Theme Color</label>
             <div className="grid grid-cols-2 gap-3">
                {COLORS.map(c => (
                    <button
                    key={c}
                    type="button"
                    onClick={() => setFormData({ ...formData, color: c })}
                    className={`w-8 h-8 rounded-full transition-all ${formData.color === c ? 'ring-2 ring-white scale-110 shadow-lg' : 'opacity-40 hover:opacity-100'}`}
                    style={{ backgroundColor: getThemeStyles(c).primary }}
                    />
                ))}
             </div>
          </div>

          {/* ICONS - RIGHT COL (8) */}
          <div className="col-span-8">
             <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-3">Visual Anchor</label>
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

      {/* 5. NOTES & DIRECTIVES */}
      <div className="space-y-4 pt-4 border-t border-white/5">
        <div>
           <label className="text-xs text-slate-500 font-bold block mb-2 flex items-center gap-2"><FileText size={12}/> Custom Note / Integration</label>
           <input
             type="text"
             value={formData.custom_note}
             onChange={(e) => setFormData({ ...formData, custom_note: e.target.value })}
             className="w-full bg-[#0b0c10] border border-white/10 rounded-lg p-3 text-slate-300 text-xs outline-none focus:border-blue-500"
             placeholder="Optional context for the Ledger..."
           />
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div>
               <label className="text-xs text-emerald-500 font-bold block mb-2">Why?</label>
               <textarea
                 value={formData.why_instruction}
                 onChange={(e) => setFormData({ ...formData, why_instruction: e.target.value })}
                 className="w-full bg-[#0b0c10] border border-white/10 rounded-lg p-3 text-slate-300 text-xs h-20 resize-none outline-none focus:border-emerald-500/50"
               />
            </div>
            <div>
               <label className="text-xs text-blue-500 font-bold block mb-2">How?</label>
               <textarea
                 value={formData.how_instruction}
                 onChange={(e) => setFormData({ ...formData, how_instruction: e.target.value })}
                 className="w-full bg-[#0b0c10] border border-white/10 rounded-lg p-3 text-slate-300 text-xs h-20 resize-none outline-none focus:border-blue-500/50"
               />
            </div>
        </div>
      </div>

      {/* FOOTER ACTIONS */}
      <div className="flex gap-3 pt-6 border-t border-white/5 items-center sticky bottom-0 bg-[#14151a]">
        <button type="button" onClick={onCancel} className="px-6 py-3 bg-white/5 hover:bg-white/10 text-slate-400 rounded-xl font-bold transition-all uppercase text-xs tracking-widest">
            Cancel
        </button>
        <button type="submit" className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-900/20 uppercase text-xs tracking-widest">
          <Save size={16} /> Save Protocol
        </button>
        {mode === 'edit' && (
            <button type="button" className="p-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all">
                <Trash2 size={20} />
            </button>
        )}
      </div>
    </form>
  );
}
