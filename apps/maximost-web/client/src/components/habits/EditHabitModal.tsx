import React, { useState, useEffect } from 'react';
import { X, Save, Trash2, Calendar } from 'lucide-react';

interface EditHabitModalProps {
  habit: any | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (habitData: any) => void;
  onDelete?: (habitId: string) => void;
}

export const EditHabitModal = ({ habit, isOpen, onClose, onSave, onDelete }: EditHabitModalProps) => {
  const [formData, setFormData] = useState<any>({
    title: '',
    target_value: 1,
    unit: 'reps',
    frequency_type: 'ABSOLUTE',
    frequency_days: []
  });

  useEffect(() => {
    if (habit) {
      setFormData({
        title: habit.title || '',
        target_value: habit.default_config?.target_value || habit.target_value || 1,
        unit: habit.metadata?.config?.unit || 'reps',
        frequency_type: habit.default_config?.frequency_type || 'ABSOLUTE',
        frequency_days: [] // TODO: Implement day selection logic if needed
      });
    }
  }, [habit]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end pointer-events-none">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="w-full max-w-md h-full bg-[#0A0F1C] border-l border-white/10 shadow-2xl pointer-events-auto flex flex-col transform transition-transform duration-300">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <div>
            <h2 className="text-lg font-black tracking-widest text-white uppercase">Protocol Config</h2>
            <p className="text-xs text-slate-500 font-mono mt-1">
              {habit?.id ? 'EDIT EXISTING PROTOCOL' : 'INITIALIZE NEW PROTOCOL'}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* Field: Title */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Protocol Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500 outline-none transition-colors font-mono"
            />
          </div>

          {/* Field: Target */}
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Target Value</label>
                <input
                  type="number"
                  value={formData.target_value}
                  onChange={(e) => setFormData({...formData, target_value: parseInt(e.target.value)})}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500 outline-none transition-colors font-mono"
                />
             </div>
             <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Unit</label>
                <input
                  type="text"
                  value={formData.unit}
                  onChange={(e) => setFormData({...formData, unit: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500 outline-none transition-colors font-mono"
                  placeholder="e.g. mins"
                />
             </div>
          </div>

          {/* Field: Frequency */}
          <div className="space-y-3">
             <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
               <Calendar size={14} /> Frequency
             </label>
             <div className="flex gap-2 p-1 bg-black/30 rounded-lg border border-white/5">
                {['Daily', 'Weekly'].map(type => (
                   <button
                     key={type}
                     onClick={() => setFormData({...formData, frequency_type: type === 'Daily' ? 'ABSOLUTE' : 'FREQUENCY'})}
                     className={`flex-1 py-2 text-xs font-bold uppercase rounded ${
                        (formData.frequency_type === 'ABSOLUTE' && type === 'Daily') || (formData.frequency_type === 'FREQUENCY' && type === 'Weekly')
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-500 hover:text-white'
                     }`}
                   >
                     {type}
                   </button>
                ))}
             </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/5 bg-black/20 flex items-center justify-between gap-4">
           {habit?.id && onDelete && (
             <button
               onClick={() => onDelete(habit.id)}
               className="flex items-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 hover:bg-red-500/20 transition-all font-bold text-xs uppercase tracking-wider"
             >
               <Trash2 size={16} /> Archive
             </button>
           )}

           <div className="flex gap-3 ml-auto w-full md:w-auto">
             <button
               onClick={onClose}
               className="px-6 py-3 rounded-lg text-slate-400 hover:text-white font-bold text-xs uppercase tracking-wider"
             >
               Cancel
             </button>
             <button
               onClick={() => onSave({ ...habit, ...formData })}
               className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-white shadow-lg shadow-blue-900/20 font-bold text-xs uppercase tracking-wider transition-all"
             >
               <Save size={16} /> Initialize Protocol
             </button>
           </div>
        </div>

      </div>
    </div>
  );
};
