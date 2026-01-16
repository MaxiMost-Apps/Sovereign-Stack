import { useState, useEffect } from 'react';
import { HABIT_COLORS, normalizeColor } from '../utils/getHabitStyle';
import { THEME_COLORS, ICONS } from '../config/themeConfig';
import { motion, AnimatePresence } from 'framer-motion';

// Internal Switch Component for KISS Logic
const Switch = ({ checked, onCheckedChange }: { checked: boolean; onCheckedChange: (val: boolean) => void }) => (
  <label className="relative inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      className="sr-only peer"
      checked={checked}
      onChange={(e) => onCheckedChange(e.target.checked)}
    />
    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 transition-colors duration-300"></div>
  </label>
);

export default function HabitForm({ initialData = {}, onSubmit, onCancel, mode }: any) {
  const [formData, setFormData] = useState<any>({
    title: '', description: '', icon: 'activity', color: 'maximost_blue',
    frequency_type: 'absolute', target_count: 3, daily_goal: 1, unit: '',
    start_date: new Date().toLocaleDateString('en-CA'),
    how_instruction: '', why_instruction: '',
    is_active: true // Default to active
  });
  const [postToJournal, setPostToJournal] = useState(false);

  useEffect(() => {
    if (initialData && (initialData.id || (initialData.title && initialData.title !== ''))) {
      const freq = initialData.frequency_type || initialData.default_frequency_type || 'absolute';
      // Try to match legacy colors to new ID, or default to blue
      const legacyColorMap: any = { 'blue': 'maximost_blue', 'green': 'bio_emerald', 'red': 'combat_red', 'purple': 'neural_violet', 'orange': 'warning_amber' };

      // VANCE: Prioritize Metadata for Color/Icon extraction
      const rawColor = initialData.metadata?.visuals?.theme || initialData.color || 'maximost_blue';
      const cleanColor = THEME_COLORS.find(c => c.id === rawColor) ? rawColor : (legacyColorMap[rawColor] || 'maximost_blue');

      // Map legacy icons if possible, or default
      const rawIcon = initialData.metadata?.visuals?.icon || initialData.icon || 'activity';
      // Basic check if icon exists in new set, if not default to activity.
      const cleanIcon = ICONS.find(i => i.id === rawIcon) ? rawIcon : 'activity';

      setFormData((prev: any) => ({
        ...prev,
        ...initialData,
        title: initialData.title || prev.title || '',
        frequency_type: freq,
        target_count: initialData.target_count || 3,
        daily_goal: initialData.daily_goal || 1,
        color: cleanColor,
        icon: cleanIcon,
        description: initialData.description || '', // Keeping description in state but likely ignoring UI
        how_instruction: initialData.metadata?.tactical || initialData.how_instruction || initialData.metadata?.compiler?.step || '',
        why_instruction: initialData.metadata?.identity || initialData.why_instruction || initialData.metadata?.compiler?.why || '',
        is_active: initialData.is_active !== undefined ? initialData.is_active : true
      }));
    } else {
      setPostToJournal(false);
    }
  }, [initialData, mode]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!formData.title) return alert("Title is required");
    // Pass 'addJournal' to match DashboardCore expectation

    // VANCE: Enforce SDP - Write to both flat columns and metadata JSONB
    const enrichedMetadata = {
        ...(formData.metadata || {}),
        tactical: formData.how_instruction, // Iron Skeleton Persistence
        identity: formData.why_instruction
    };

    onSubmit({
        ...formData,
        metadata: enrichedMetadata,
        addJournal: postToJournal,
        // We let DashboardCore handle the journal entry creation and text formatting
        target_count: parseInt(formData.target_count)||3,
        daily_goal: parseInt(formData.daily_goal)||1
    });
  };

  const getButtonLabel = () => {
      if (mode === 'create') return 'Create Habit';
      if (mode === 'edit') return 'Update Habit';
      if (mode === 'library') return 'Add to Dashboard';
      return 'Create Habit';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-white">
      {/* 1. Habit Title */}
      <div>
        <label className="text-xs font-bold text-gray-500 uppercase mb-1">Habit Title</label>
        <input type="text" value={formData.title} onChange={e=>setFormData({...formData, title:e.target.value})} className="w-full bg-gray-800 border-gray-700 rounded-xl p-4 text-lg focus:border-blue-500 outline-none" autoFocus placeholder="e.g. Read 10 Pages" required />
      </div>

      {/* 2. Mission Description (Layer 2) */}
      <div>
        <label className="text-xs font-bold text-gray-500 uppercase mb-1">Mission Description</label>
        <textarea
            rows={2}
            value={formData.description}
            onChange={e=>setFormData({...formData, description:e.target.value})}
            className="w-full bg-gray-800 border-gray-700 rounded-xl p-3 text-sm focus:border-blue-500 outline-none resize-none"
            placeholder="Protocol Objective..."
        />
      </div>

      {/* 3. Type Toggle (Absolute vs. Frequency) */}
      <div className="flex bg-slate-900 p-1 rounded-lg w-full border border-slate-800 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
        <button
            type="button"
            onClick={() => setFormData({...formData, frequency_type: 'absolute'})}
            className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${
            formData.frequency_type === 'absolute'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 border border-blue-400'
                : 'text-slate-500 hover:text-slate-300'
            }`}
        >
            Absolute
        </button>
        <button
            type="button"
            onClick={() => setFormData({...formData, frequency_type: 'frequency'})}
            className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${
            formData.frequency_type === 'frequency'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 border border-blue-400'
                : 'text-slate-500 hover:text-slate-300'
            }`}
        >
            Frequency
        </button>
      </div>

      {/* Frequency Target Capsules (Conditional) */}
      {formData.frequency_type === 'frequency' && (
          <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-700 flex flex-col justify-center">
              <div className="flex justify-between text-xs mb-2"><span>Target Days / Week</span><span className="text-blue-400 font-bold">{formData.target_count}</span></div>
              <div className="flex justify-between gap-1">
                  {[1, 2, 3, 4, 5, 6, 7].map(num => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setFormData({...formData, target_count: num})}
                        className={`flex-1 h-8 rounded text-xs font-bold flex items-center justify-center transition-all ${
                            parseInt(formData.target_count) === num
                                ? 'bg-blue-600 text-white border border-blue-500 shadow-lg'
                                : 'border border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white'
                        }`}
                      >
                          {num}
                      </button>
                  ))}
              </div>
          </div>
      )}

      {/* 4. Goal & Unit */}
      <div className="flex gap-2">
          <div className="w-[30%]">
              <label className="text-[10px] text-gray-500 uppercase block mb-1">Goal</label>
              <input type="number" value={formData.daily_goal} onChange={e=>setFormData({...formData, daily_goal:e.target.value})} className="w-full bg-gray-800 border-gray-700 rounded p-2 text-white" />
          </div>
          <div className="w-[70%]">
              <label className="text-[10px] text-gray-500 uppercase block mb-1">Unit</label>
              <input type="text" value={formData.unit} onChange={e=>setFormData({...formData, unit:e.target.value})} className="w-full bg-gray-800 border-gray-700 rounded p-2 text-white" placeholder="e.g. mins, pages" />
          </div>
      </div>

      {/* 5. Visuals (Color & Icon) */}
      <div>
          <label className="text-xs text-gray-500 uppercase font-bold mb-2 block">Visuals</label>
          <div className="grid grid-cols-2 gap-4">
              {/* Colors (Left) */}
              <div className="grid grid-cols-5 gap-2">
                {THEME_COLORS.map((theme) => (
                <button
                    key={theme.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, color: theme.id })}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                    formData.color === theme.id
                        ? 'border-white scale-110'
                        : 'border-transparent opacity-50 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: theme.hex, boxShadow: formData.color === theme.id ? `0 0 15px ${theme.glow}` : 'none' }}
                    title={theme.label}
                />
                ))}
              </div>

              {/* Icons (Right) */}
              <div className="border-l border-gray-700 pl-4">
                  <div className="grid grid-cols-6 gap-2 h-20 overflow-y-auto custom-scrollbar">
                    {ICONS.map((item) => {
                        const Icon = item.icon;
                        const isSelected = formData.icon === item.id;
                        return (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, icon: item.id })}
                            className={`p-1 rounded flex items-center justify-center transition-all ${
                                isSelected ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-white'
                            }`}
                        >
                            <Icon className="w-4 h-4" />
                        </button>
                        );
                    })}
                  </div>
              </div>
          </div>
      </div>

      {/* 6. Tactical (How) & Identity (Why) */}
      <div className="grid md:grid-cols-2 gap-4">
           <div>
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-2">
                Tactical (How)
                </label>
                <textarea
                rows={2}
                placeholder="Precise steps..."
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-sm text-slate-200 focus:border-blue-500 outline-none transition-all resize-none"
                value={formData.how_instruction}
                onChange={(e) => setFormData({...formData, how_instruction: e.target.value})}
                />
            </div>

            <div>
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-2">
                Identity (Why)
                </label>
                <textarea
                rows={2}
                placeholder="Identity reason..."
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-sm text-slate-200 focus:border-blue-500 outline-none transition-all resize-none"
                value={formData.why_instruction}
                onChange={(e) => setFormData({...formData, why_instruction: e.target.value})}
                />
            </div>
      </div>

      {/* 7. HABIT STATUS (KISS MODULE) */}
      <div className="grid grid-cols-2 gap-4 items-start bg-slate-950/50 p-3 rounded-lg border border-slate-800">

          {/* LEFT: STATUS TOGGLE */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              STATUS
            </label>

            <div className="flex items-center gap-3">
              {/* The Switch Component */}
              <Switch
                checked={formData.is_active}
                onCheckedChange={(val) => setFormData({...formData, is_active: val})}
              />
              <span className={`text-xs font-bold ${formData.is_active ? 'text-blue-400' : 'text-slate-500'}`}>
                {formData.is_active ? 'ACTIVE' : 'PAUSED'}
              </span>
            </div>

            {/* Dynamic Warning Message */}
            {!formData.is_active && (
              <div className="text-[10px] text-amber-500 mt-1 animate-in fade-in slide-in-from-top-1">
                ⚠️ Habit will move to Reserves.
              </div>
            )}
          </div>

          {/* RIGHT: START DATE (Keep this aligned) */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              EFFECTIVE DATE
            </label>
            <input
              type="date"
              value={formData.start_date ? formData.start_date.split('T')[0] : ''}
              onChange={(e) => setFormData({...formData, start_date: e.target.value})}
              className="bg-slate-900 border border-slate-700 rounded p-1 text-xs text-white focus:border-blue-500 outline-none"
            />
          </div>
      </div>

      {/* 8. Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
           {/* Left: Log Checkbox */}
           <div className="flex items-center gap-2">
                {mode === 'create' && (
                    <>
                        <input
                        type="checkbox"
                        id="journalCheck"
                        checked={postToJournal}
                        onChange={(e) => setPostToJournal(e.target.checked)}
                        className="w-3 h-3 accent-amber-500 rounded cursor-pointer"
                        />
                        <label htmlFor="journalCheck" className="text-xs text-slate-400 cursor-pointer select-none">
                        Log to Journal
                        </label>
                    </>
                )}
           </div>

           {/* Right: Actions */}
           <div className="flex items-center gap-3">
                <button type="button" onClick={onCancel} className="text-slate-500 hover:text-white text-xs font-bold uppercase tracking-wider px-3">
                    Cancel
                </button>
                <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-bold text-xs uppercase tracking-widest">
                    {getButtonLabel()}
                </button>
           </div>
      </div>
    </form>
  );
}
