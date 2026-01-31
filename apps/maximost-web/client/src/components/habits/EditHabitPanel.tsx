import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Settings, Database, Save, Trash2 } from 'lucide-react';
import { supabase } from '@/services/supabase';

export const EditHabitPanel = ({ habit, isOpen, onClose, onSave }: any) => {
  const [activeTab, setActiveTab] = useState<'basics' | 'architecture'>('basics');
  const [formData, setFormData] = useState<any>({});

  // Reset form data when habit changes
  useEffect(() => {
    if (habit) {
      setFormData({ ...habit });
    }
  }, [habit]);

  const handleSave = async () => {
    try {
      const updates: any = {
        title: formData.title,
        description: formData.description,
        visual_color: formData.visual_color,
        habit_type: formData.habit_type,
        // Architecture Data
        lens_stoic: formData.lens_stoic,
        lens_operator: formData.lens_operator,
        lens_scientist: formData.lens_scientist,
        lens_visionary: formData.lens_visionary,
        // Using stack_labels for Bio-Uplink temporarily if column doesn't exist,
        // OR assumign metadata field for complex data dump if columns not strictly there.
        // Based on migration, we have stack_labels.
        stack_labels: formData.stack_labels,
        // goal_target: formData.goal_target // if needed
      };

      const { error } = await supabase
        .from('habits')
        .update(updates)
        .eq('id', habit.id);

      if (error) throw error;
      if (onSave) onSave();
      onClose();
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* PANEL */}
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0A0F1C] border-l border-white/10 z-[70] shadow-2xl flex flex-col font-sans"
          >
            {/* HEADER */}
            <div className="flex items-center justify-between p-6 border-b border-white/5 bg-[#0A0F1C]">
              <h2 className="text-sm font-black uppercase tracking-widest text-white">Edit Protocol</h2>
              <button onClick={onClose} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                <X size={18} className="text-slate-400" />
              </button>
            </div>

            {/* SCROLLABLE CONTENT */}
            <div className="flex-1 overflow-y-auto p-6">
                {/* TAB SWITCHER */}
                <div className="flex bg-black/40 p-1 rounded-xl mb-8 border border-white/5">
                <button
                    onClick={() => setActiveTab('basics')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 text-[10px] font-bold rounded-lg transition-all tracking-wider ${activeTab === 'basics' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                >
                    <Settings size={14} /> BASICS
                </button>
                <button
                    onClick={() => setActiveTab('architecture')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 text-[10px] font-bold rounded-lg transition-all tracking-wider ${activeTab === 'architecture' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                >
                    <Database size={14} /> ARCHITECTURE
                </button>
                </div>

                {activeTab === 'basics' ? (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    {/* Title */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Protocol Title</label>
                        <input
                            value={formData.title || ''}
                            onChange={e => setFormData({...formData, title: e.target.value})}
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none transition-colors"
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Short Description</label>
                        <input
                            value={formData.description || ''}
                            onChange={e => setFormData({...formData, description: e.target.value})}
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none transition-colors"
                        />
                    </div>

                    {/* Visual Color */}
                    <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Visual Color</label>
                         <div className="flex gap-3">
                            {['blue', 'red', 'amber', 'purple', 'emerald'].map(c => (
                                <button
                                    key={c}
                                    onClick={() => setFormData({...formData, visual_color: c})}
                                    className={`w-8 h-8 rounded-full border-2 transition-all ${formData.visual_color === c ? `border-white scale-110 shadow-[0_0_10px_rgba(255,255,255,0.3)]` : 'border-transparent opacity-50 hover:opacity-100'}`}
                                    style={{ backgroundColor: c === 'amber' ? '#f59e0b' : c === 'emerald' ? '#10b981' : c === 'purple' ? '#a855f7' : c === 'red' ? '#ef4444' : '#3b82f6' }}
                                />
                            ))}
                         </div>
                    </div>

                    {/* Habit Type */}
                    <div className="space-y-2 pt-4 border-t border-white/5">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Type</label>
                        <select
                            value={formData.habit_type || 'ABSOLUTE'}
                            onChange={e => setFormData({...formData, habit_type: e.target.value})}
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none appearance-none"
                        >
                            <option value="ABSOLUTE">ABSOLUTE (Binary Check)</option>
                            <option value="FREQUENCY">FREQUENCY (Progress Bar)</option>
                            <option value="TIMER">TIMER (Countdown)</option>
                        </select>
                    </div>
                </div>
                ) : (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                    {/* IDENTITY LENSES */}
                    <div className="space-y-4">
                       <div className="flex items-center justify-between">
                         <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Identity Lenses (Directives)</label>
                         <span className="text-[9px] text-blue-500 font-bold bg-blue-500/10 px-2 py-0.5 rounded">AI TRAINING</span>
                       </div>

                       <div className="space-y-3">
                           <textarea
                                value={formData.lens_stoic || ''}
                                onChange={e => setFormData({...formData, lens_stoic: e.target.value})}
                                placeholder="Stoic Lens Directive..."
                                className="w-full bg-black/20 border border-white/5 rounded-xl p-3 text-xs text-slate-300 h-20 focus:border-white/20 outline-none placeholder:text-slate-600"
                           />
                           <textarea
                                value={formData.lens_operator || ''}
                                onChange={e => setFormData({...formData, lens_operator: e.target.value})}
                                placeholder="Operator Lens Directive..."
                                className="w-full bg-black/20 border border-white/5 rounded-xl p-3 text-xs text-slate-300 h-20 focus:border-white/20 outline-none placeholder:text-slate-600"
                           />
                           <textarea
                                value={formData.lens_scientist || ''}
                                onChange={e => setFormData({...formData, lens_scientist: e.target.value})}
                                placeholder="Scientist Lens Directive..."
                                className="w-full bg-black/20 border border-white/5 rounded-xl p-3 text-xs text-slate-300 h-20 focus:border-white/20 outline-none placeholder:text-slate-600"
                           />
                           <textarea
                                value={formData.lens_visionary || ''}
                                onChange={e => setFormData({...formData, lens_visionary: e.target.value})}
                                placeholder="Visionary Lens Directive..."
                                className="w-full bg-black/20 border border-white/5 rounded-xl p-3 text-xs text-slate-300 h-20 focus:border-white/20 outline-none placeholder:text-slate-600"
                           />
                       </div>
                    </div>

                    {/* COMPLEX DATA LOGIC */}
                    <div className="space-y-4 pt-4 border-t border-white/5">
                        <label className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Complex Data Logic</label>

                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                            <span className="text-xs font-bold text-slate-300">Enable Protocol Timer</span>
                            <input type="checkbox" className="w-4 h-4 rounded accent-blue-600" />
                        </div>

                        <div className="space-y-2">
                             <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Bio-Uplink ID</label>
                             <input
                                value={formData.stack_labels || ''} // Reusing stack_labels as per plan/migration availability or metadata
                                onChange={e => setFormData({...formData, stack_labels: e.target.value})}
                                placeholder="e.g., G01, apple_health.steps"
                                className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-3 text-xs text-emerald-400 font-mono focus:border-emerald-500/50 outline-none"
                             />
                        </div>
                    </div>
                </div>
                )}
            </div>

            {/* FOOTER */}
            <div className="p-6 border-t border-white/5 bg-[#0A0F1C] space-y-3">
                <button
                    onClick={handleSave}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs tracking-[0.2em] uppercase transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2"
                >
                    <Save size={16} /> Save Protocol
                </button>
                <button className="w-full py-4 border border-red-500/20 text-red-500 hover:bg-red-500/10 rounded-xl font-bold text-xs tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-2">
                    <Trash2 size={16} /> Archive
                </button>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
