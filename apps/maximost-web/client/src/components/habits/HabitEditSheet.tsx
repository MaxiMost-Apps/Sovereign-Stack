import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Save, Trash2, Cpu, Database, Clock, Shield, Flame, Brain, Zap } from 'lucide-react';
import { supabase } from '@/services/supabase';

export const HabitEditSheet = ({ habit, onClose, onSave }: any) => {
  const [activeTab, setActiveTab] = useState<'HQ' | 'ARCHITECTURE'>('HQ');
  const [formData, setFormData] = useState({ ...habit });

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from('habits')
        .update({
          title: formData.title,
          description: formData.description, // Mapped from subtitle/description
          lens_stoic: formData.lens_stoic,
          lens_operator: formData.lens_operator,
          lens_scientist: formData.lens_scientist,
          lens_visionary: formData.lens_visionary,
          stack_labels: formData.stack_labels,
          // metadata: { ...formData.metadata, timer_config: ... } // Future proofing
        })
        .eq('id', habit.id); // Using 'id' (UUID)

      if (error) throw error;
      onSave();
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-md bg-[#080a0f] border-l border-white/10 shadow-2xl flex flex-col font-sans"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          <h2 className="text-xs font-black tracking-[0.3em] uppercase text-blue-500">Edit Protocol</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg text-slate-400"><X size={20}/></button>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-2 p-2 gap-2 bg-[#020408]">
          <button
            onClick={() => setActiveTab('HQ')}
            className={`py-3 text-[10px] font-bold tracking-widest uppercase rounded-lg transition-all ${activeTab === 'HQ' ? 'bg-white/10 text-white' : 'text-slate-600 hover:text-slate-400'}`}
          >
            HQ
          </button>
          <button
            onClick={() => setActiveTab('ARCHITECTURE')}
            className={`py-3 text-[10px] font-bold tracking-widest uppercase rounded-lg transition-all ${activeTab === 'ARCHITECTURE' ? 'bg-white/10 text-white' : 'text-slate-600 hover:text-slate-400'}`}
          >
            Architecture
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">

          {activeTab === 'HQ' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
               <div className="space-y-2">
                 <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Protocol Title</label>
                 <input
                   value={formData.title}
                   onChange={e => setFormData({...formData, title: e.target.value})}
                   className="w-full bg-transparent border-b border-white/10 py-2 text-xl font-bold text-white focus:border-blue-500 outline-none"
                 />
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Description</label>
                 <textarea
                   value={formData.description || ''}
                   onChange={e => setFormData({...formData, description: e.target.value})}
                   className="w-full bg-[#0c0e14] border border-white/10 rounded-xl p-3 text-sm text-slate-300 focus:border-blue-500 outline-none min-h-[100px]"
                 />
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Stack Labels</label>
                 <input
                   value={formData.stack_labels || ''}
                   onChange={e => setFormData({...formData, stack_labels: e.target.value})}
                   className="w-full bg-transparent border-b border-white/10 py-2 text-sm text-blue-400 font-mono focus:border-blue-500 outline-none"
                   placeholder="e.g. MORNING, HEALTH"
                 />
               </div>
            </div>
          )}

          {activeTab === 'ARCHITECTURE' && (
             <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">

                {/* Identity Lenses */}
                <section className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Database size={14} className="text-blue-500" />
                    <h3 className="text-[10px] font-bold text-white uppercase tracking-widest">Identity Lenses</h3>
                  </div>

                  {[
                    { key: 'lens_stoic', label: 'Stoic', icon: Shield, color: 'text-slate-300' },
                    { key: 'lens_operator', label: 'Operator', icon: Flame, color: 'text-red-500' },
                    { key: 'lens_scientist', label: 'Scientist', icon: Brain, color: 'text-blue-400' },
                    { key: 'lens_visionary', label: 'Visionary', icon: Zap, color: 'text-purple-400' },
                  ].map((lens) => (
                    <div key={lens.key} className="space-y-1">
                       <label className={`text-[9px] font-bold uppercase tracking-widest flex items-center gap-2 ${lens.color}`}>
                         <lens.icon size={10} /> {lens.label} Directive
                       </label>
                       <input
                         value={formData[lens.key as keyof typeof formData] || ''}
                         onChange={e => setFormData({...formData, [lens.key]: e.target.value})}
                         className="w-full bg-[#0c0e14] border border-white/5 rounded-lg px-3 py-2 text-xs text-slate-300 focus:border-white/20 outline-none"
                         placeholder={`Define ${lens.label} intent...`}
                       />
                    </div>
                  ))}
                </section>

                {/* Timer Settings */}
                <section className="space-y-4 pt-6 border-t border-white/5">
                   <div className="flex items-center gap-2 mb-2">
                    <Clock size={14} className="text-amber-500" />
                    <h3 className="text-[10px] font-bold text-white uppercase tracking-widest">Timer Config</h3>
                  </div>
                  <div className="bg-[#0c0e14] border border-white/5 rounded-xl p-4 text-center">
                    <p className="text-xs text-slate-500 mb-2">Duration (Seconds)</p>
                    <input
                      type="number"
                      className="bg-transparent text-2xl font-mono font-bold text-center text-white w-full outline-none"
                      placeholder="0"
                    />
                  </div>
                </section>

                {/* Bio-Uplink */}
                <section className="space-y-4 pt-6 border-t border-white/5">
                   <div className="flex items-center gap-2 mb-2">
                    <Cpu size={14} className="text-emerald-500" />
                    <h3 className="text-[10px] font-bold text-white uppercase tracking-widest">Bio-Uplink</h3>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] text-slate-500 uppercase tracking-widest">Metric ID</label>
                    <input
                       className="w-full bg-[#0c0e14] border border-white/5 rounded-lg px-3 py-2 text-xs text-emerald-400 font-mono focus:border-emerald-500/50 outline-none"
                       placeholder="e.g. apple_health.heart_rate"
                    />
                  </div>
                </section>

             </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/5 bg-[#020408] space-y-3">
          <button
            onClick={handleSave}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs tracking-[0.2em] uppercase transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2"
          >
            <Save size={16} /> Save Protocol
          </button>
           <button className="w-full py-3 border border-red-500/20 text-red-500 hover:bg-red-500/10 rounded-xl font-bold text-xs tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-2">
            <Trash2 size={14} /> Archive
          </button>
        </div>

      </motion.div>
    </>
  );
};
