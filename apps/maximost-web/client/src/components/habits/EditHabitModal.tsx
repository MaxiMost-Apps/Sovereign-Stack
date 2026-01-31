import { useState } from 'react';
import { supabase } from '../../services/supabase';
import { X, Save, Trash2 } from 'lucide-react';

export default function EditHabitModal({ habit, onClose, onSave }: any) {
  const [formData, setFormData] = useState({ ...habit });

  const handleSave = async () => {
    const { error } = await supabase
      .from('habits')
      .update({
        title: formData.title,
        subtitle: formData.subtitle,
        lens_stoic: formData.lens_stoic,
        lens_operator: formData.lens_operator,
        lens_scientist: formData.lens_scientist,
        lens_visionary: formData.lens_visionary,
        // Using stack_labels for the "Smart Match" metadata
        stack_labels: formData.stack_labels
      })
      .eq('id', habit.id);

    if (!error) {
      onSave();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex flex-col font-mono">
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-gray-900 bg-[#080a0f]">
        <h2 className="text-xs font-bold tracking-[0.3em] text-blue-500 uppercase">Edit Protocol</h2>
        <button onClick={onClose} className="p-2 bg-gray-900 rounded-lg"><X size={20}/></button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-[#080a0f]">
        {/* Core Identifiers */}
        <section className="space-y-4">
          <div>
            <label className="text-[10px] text-gray-600 uppercase tracking-widest">Protocol Title</label>
            <input
              className="w-full bg-transparent border-b border-gray-800 py-3 text-xl font-bold focus:border-blue-500 outline-none transition-all"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>
          <div>
            <label className="text-[10px] text-gray-600 uppercase tracking-widest">Subtitle / Stacks</label>
            <input
              className="w-full bg-transparent border-b border-gray-800 py-2 text-sm text-blue-400 focus:border-blue-500 outline-none"
              value={formData.stack_labels}
              onChange={(e) => setFormData({...formData, stack_labels: e.target.value})}
              placeholder="e.g. MORNING, RECOVERY"
            />
          </div>
        </section>

        {/* The 4 Identity Lenses (The Pre-filled Data) */}
        <section className="space-y-6 pt-4 border-t border-gray-900">
          <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">Identity Lenses</p>

          {[
            { id: 'stoic', label: 'Stoic', color: 'text-gray-300' },
            { id: 'operator', label: 'Operator', color: 'text-red-500' },
            { id: 'scientist', label: 'Scientist', color: 'text-blue-400' },
            { id: 'visionary', label: 'Visionary', color: 'text-purple-400' }
          ].map((lens) => (
            <div key={lens.id} className="space-y-2">
              <label className={`text-[9px] uppercase font-bold tracking-widest ${lens.color}`}>{lens.label}</label>
              <textarea
                className="w-full bg-[#0c0e14] border border-gray-800 rounded-xl p-4 text-xs text-gray-400 focus:border-blue-900 outline-none min-h-[80px]"
                value={formData[`lens_${lens.id}` as keyof typeof formData] || ''}
                onChange={(e) => setFormData({...formData, [`lens_${lens.id}`]: e.target.value})}
                placeholder={`No ${lens.label} directive set.`}
              />
            </div>
          ))}
        </section>

        {/* Danger Zone */}
        <button className="w-full py-4 border border-red-900/30 text-red-900 text-[10px] font-bold uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 hover:bg-red-900/10 transition-all">
          <Trash2 size={14}/> Archive Protocol
        </button>
      </div>

      {/* Footer Action */}
      <div className="p-6 border-t border-gray-900 bg-[#080a0f]">
        <button
          onClick={handleSave}
          className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.3)]"
        >
          <Save size={18}/> Commit Changes
        </button>
      </div>
    </div>
  );
}
