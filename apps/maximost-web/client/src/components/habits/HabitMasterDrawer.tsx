import React, { useState, useEffect } from 'react';
import { X, Shield, Settings2, Trash2, Calendar, Zap, Info } from 'lucide-react';

interface HabitMasterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  habit: any;
  initialTab?: 'HQ' | 'CONFIG';
  onUpdate: (data: any) => void;
  onArchive: (id: string) => void;
}

// Internal Toggle Component (Self-Contained)
const SimpleToggle = ({ checked, onChange }: { checked: boolean, onChange?: (v: boolean) => void }) => (
  <button
    onClick={() => onChange && onChange(!checked)}
    className={`w-10 h-5 rounded-full relative transition-colors ${checked ? 'bg-green-500' : 'bg-white/10'}`}
  >
    <div className={`w-3 h-3 bg-white rounded-full absolute top-1 transition-all ${checked ? 'left-6' : 'left-1'}`} />
  </button>
);

export const HabitMasterDrawer: React.FC<HabitMasterDrawerProps> = ({
  isOpen,
  onClose,
  habit,
  initialTab = 'HQ',
  onUpdate,
  onArchive
}) => {
  const [activeTab, setActiveTab] = useState<'HQ' | 'CONFIG'>(initialTab);
  const [notes, setNotes] = useState(habit?.notes || '');

  // Sync tab when prop changes
  useEffect(() => {
    if (isOpen) setActiveTab(initialTab);
  }, [initialTab, isOpen]);

  if (!isOpen || !habit) return null;

  // Data Mapping for "Real" Data
  const targetValue = habit.target_value || habit.metadata?.config?.target_value || 1;
  const unit = habit.unit || habit.metadata?.config?.unit || 'rep';
  const effectiveDate = habit.start_date || habit.created_at?.split('T')[0];
  const isActive = !habit.is_paused && habit.status !== 'archived';

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-[#0A0F1C]/95 backdrop-blur-xl border-l border-white/10 z-50 shadow-2xl transition-transform duration-300 transform translate-x-0">

        {/* Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-blue-400 font-mono tracking-widest uppercase mb-1">Status: Operational</span>
            {activeTab === 'CONFIG' ? (
              <input
                className="bg-transparent border-none text-xl font-bold text-white focus:ring-0 p-0 outline-none placeholder:text-gray-600"
                defaultValue={habit.title}
                placeholder="Habit Title"
                onChange={(e) => onUpdate({ title: e.target.value })}
              />
            ) : (
              <h2 className="text-xl font-bold text-white tracking-tight">{habit.title}</h2>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
               <span className="text-[10px] text-gray-500 font-mono uppercase">Active</span>
               <SimpleToggle
                 checked={isActive}
                 onChange={(val) => onUpdate({ is_paused: !val })}
               />
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/5">
          <button
            onClick={() => setActiveTab('HQ')}
            className={`flex-1 py-4 text-xs font-bold tracking-widest flex items-center justify-center gap-2 transition-all ${
              activeTab === 'HQ' ? 'text-blue-400 border-b-2 border-blue-400 bg-blue-400/5' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <Shield size={14} /> [HEADQUARTERS]
          </button>
          <button
            onClick={() => setActiveTab('CONFIG')}
            className={`flex-1 py-4 text-xs font-bold tracking-widest flex items-center justify-center gap-2 transition-all ${
              activeTab === 'CONFIG' ? 'text-blue-400 border-b-2 border-blue-400 bg-blue-400/5' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <Settings2 size={14} /> [CONFIGURATION]
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto h-[calc(100vh-180px)]">
          {activeTab === 'HQ' ? (
            <div className="space-y-8 animate-in fade-in duration-300">
              {/* Tactical Status Placeholder */}
              <div className="flex flex-col items-center justify-center py-8 bg-white/5 rounded-xl border border-white/5">
                <div className="w-32 h-32 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin-slow flex items-center justify-center">
                   <Zap size={40} className="text-blue-400" />
                </div>
                <span className="mt-4 text-sm text-gray-400 font-mono tracking-tighter">TELEMETRY: STANDBY</span>
              </div>

              {/* Field Notes */}
              <div className="space-y-3">
                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest flex items-center gap-2">
                  <Info size={12} /> Field Notes
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Record tactical intelligence..."
                  className="w-full h-32 bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-gray-300 focus:border-blue-500/50 transition-all resize-none outline-none"
                />
              </div>

              {/* Intel Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                  <span className="block text-[10px] text-gray-500 uppercase mb-1">Effective Date</span>
                  <span className="text-sm text-gray-200 font-mono">{effectiveDate || 'Not Set'}</span>
                </div>
                <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                  <span className="block text-[10px] text-gray-500 uppercase mb-1">Current Streak</span>
                  <span className="text-sm text-green-400 font-mono">{habit.streak || 0} Days</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              {/* Identity */}
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] text-gray-500 font-bold uppercase block mb-2">Description</label>
                  <textarea
                    defaultValue={habit.description}
                    onChange={(e) => onUpdate({ description: e.target.value })}
                    className="w-full h-24 bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-gray-300 outline-none focus:border-blue-500/50 transition-all"
                  />
                </div>
              </div>

              {/* Cadence */}
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <label className="text-[10px] text-gray-500 font-bold uppercase block mb-2">Freq (d/w)</label>
                  <input type="number" defaultValue={7} className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-sm text-white outline-none" />
                </div>
                <div className="col-span-1">
                  <label className="text-[10px] text-gray-500 font-bold uppercase block mb-2">Target</label>
                  <input
                    type="number"
                    defaultValue={targetValue}
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-sm text-white outline-none"
                    onChange={(e) => onUpdate({ target_value: parseInt(e.target.value) })}
                  />
                </div>
                <div className="col-span-1">
                  <label className="text-[10px] text-gray-500 font-bold uppercase block mb-2">Unit</label>
                  <input
                    type="text"
                    defaultValue={unit}
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-sm text-white outline-none placeholder:text-gray-700"
                    placeholder="min"
                    onChange={(e) => onUpdate({ unit: e.target.value })}
                  />
                </div>
              </div>

              {/* Timing - Required */}
              <div>
                <label className="text-[10px] text-gray-500 font-bold uppercase block mb-2 flex items-center gap-2 text-blue-400">
                  <Calendar size={12} /> Effective Date (Required)
                </label>
                <input
                  type="date"
                  required
                  defaultValue={effectiveDate}
                  className="w-full bg-black/40 border border-blue-500/30 rounded-lg p-3 text-sm text-white outline-none focus:border-blue-500"
                  onChange={(e) => onUpdate({ start_date: e.target.value })}
                />
              </div>

              {/* Actions */}
              <div className="pt-8 space-y-4">
                <button
                  onClick={() => onClose()}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition-all text-sm uppercase tracking-widest"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => {
                      onArchive(habit.habit_id);
                      onClose();
                  }}
                  className="w-full bg-transparent hover:bg-red-500/10 text-red-500 border border-red-500/30 font-bold py-3 rounded-lg transition-all text-sm uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  <Trash2 size={16} /> Archive Protocol
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
