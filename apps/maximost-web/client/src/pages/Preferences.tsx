import React, { useState, useEffect } from 'react';
import { Shield, Flame, Brain, Zap, Bell, Activity, Moon, Ruler, Clock, Settings, Save } from 'lucide-react';
import { supabase } from '@/services/supabase';
import { toast } from 'sonner';

const LENS_OPTIONS = [
  {
    id: 'stoic',
    name: 'STOIC',
    description: 'Logic and internal regulation.',
    icon: Shield,
    color: 'text-slate-400'
  },
  {
    id: 'operator',
    name: 'OPERATOR',
    description: 'Military precision and execution.',
    icon: Flame,
    color: 'text-red-500'
  },
  {
    id: 'scientist',
    name: 'SCIENTIST',
    description: 'Biological mechanisms and data.',
    icon: Brain,
    color: 'text-blue-400'
  },
  {
    id: 'visionary',
    name: 'VISIONARY',
    description: 'High-level ROI and legacy building.',
    icon: Zap,
    color: 'text-purple-400'
  }
];

const DAY_END_OPTIONS = [
  { label: 'Midnight (00:00)', value: 0 },
  { label: '1:00 AM', value: 1 },
  { label: '2:00 AM', value: 2 },
  { label: '3:00 AM', value: 3 },
  { label: '4:00 AM', value: 4 },
];

export default function Preferences() {
  const [loading, setLoading] = useState(false);
  const [activeLens, setActiveLens] = useState('stoic');

  // System Toggles
  const [bioUplink, setBioUplink] = useState(true);
  const [notifications, setNotifications] = useState(true);

  // Animations Enabled (true) -> Reduced Motion (false)
  const [animations, setAnimations] = useState(true);

  // Dropdowns
  const [timezone, setTimezone] = useState('local');
  const [resetTime, setResetTime] = useState('4'); // Default to 4 AM logic
  const [units, setUnits] = useState('metric');

  // Load Preferences
  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (data) {
        if (data.active_lens) setActiveLens(data.active_lens);
        if (data.settings) {
            setBioUplink(data.settings.bio_uplink ?? true);
            setNotifications(data.settings.notifications ?? true);
            setAnimations(data.settings.animations ?? true);
            setTimezone(data.settings.timezone || 'local');
            setResetTime(data.settings.reset_time?.toString() || '4');
            setUnits(data.settings.units || 'metric');
        }
      }
    } catch (err) {
      console.error('Load failed:', err);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Not authenticated');
        return;
      }

      const settings = {
        bio_uplink: bioUplink,
        notifications: notifications,
        animations: animations,
        timezone: timezone,
        reset_time: parseInt(resetTime),
        units: units
      };

      const { error } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: user.id,
          active_lens: activeLens,
          settings: settings,
          updated_at: new Date().toISOString()
        }, { onConflict: 'user_id' });

      if (error) throw error;
      toast.success('System Configuration Saved');
    } catch (err) {
      console.error('Save failed:', err);
      toast.error('Save Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020408] text-white p-6 pb-32 font-sans max-w-xl mx-auto relative">
      <header className="mb-8">
        <h1 className="text-sm font-black tracking-[0.3em] uppercase text-slate-500 mb-2">System Config</h1>
        <h2 className="text-2xl font-bold">Preferences</h2>
      </header>

      <div className="space-y-10">

        {/* IDENTITY MATRIX */}
        <section className="space-y-4">
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500">Active Identity Lens</h2>
          <div className="grid gap-3">
            {LENS_OPTIONS.map((lens) => (
              <button
                key={lens.id}
                onClick={() => setActiveLens(lens.id)}
                className={`flex flex-col p-4 rounded-2xl border transition-all text-left group ${
                  activeLens === lens.id ? 'border-blue-500 bg-blue-500/10' : 'border-white/5 bg-[#0A0F1C] hover:border-white/10'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <lens.icon size={16} className={lens.color} />
                  <span className={`font-bold text-sm tracking-tight ${activeLens === lens.id ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>
                    {lens.name}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed pl-6">{lens.description}</p>
              </button>
            ))}
          </div>
        </section>

        {/* SYSTEM CORE */}
        <section className="space-y-4 pt-6 border-t border-white/5">
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">System Core</h2>

            <div className="bg-[#0A0F1C] border border-white/5 rounded-2xl divide-y divide-white/5">

                {/* Bio-Uplink */}
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                        <Activity size={18} className="text-emerald-500" />
                        <div>
                            <h3 className="text-xs font-bold text-white">Bio-Uplink</h3>
                            <p className="text-[10px] text-slate-500">Sync Health Data</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setBioUplink(!bioUplink)}
                        className={`w-10 h-5 rounded-full transition-colors relative ${bioUplink ? 'bg-emerald-500' : 'bg-slate-700'}`}
                    >
                        <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${bioUplink ? 'left-6' : 'left-1'}`} />
                    </button>
                </div>

                {/* Notifications */}
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                        <Bell size={18} className="text-amber-500" />
                        <div>
                            <h3 className="text-xs font-bold text-white">Notifications</h3>
                            <p className="text-[10px] text-slate-500">Protocol reminders</p>
                        </div>
                    </div>
                    <button
                         onClick={() => setNotifications(!notifications)}
                        className={`w-10 h-5 rounded-full transition-colors relative ${notifications ? 'bg-blue-600' : 'bg-slate-700'}`}
                    >
                        <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${notifications ? 'left-6' : 'left-1'}`} />
                    </button>
                </div>

                {/* Reduced Motion (Logic Inverted for UI) */}
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                        <Settings size={18} className="text-slate-400" />
                        <div>
                            <h3 className="text-xs font-bold text-white">Reduced Motion</h3>
                            <p className="text-[10px] text-slate-500">Disable heavy animations</p>
                        </div>
                    </div>
                    <button
                         onClick={() => setAnimations(!animations)}
                        className={`w-10 h-5 rounded-full transition-colors relative ${!animations ? 'bg-blue-600' : 'bg-slate-700'}`}
                    >
                        {/* If !animations (Motion Reduced), switch is ON (Blue) */}
                        <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${!animations ? 'left-6' : 'left-1'}`} />
                    </button>
                </div>

                 {/* Reset Time */}
                 <div className="flex flex-col p-4 gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                          <Clock size={18} className="text-blue-400" />
                          <div>
                              <h3 className="text-xs font-bold text-white">Daily Reset Offset</h3>
                              <p className="text-[10px] text-slate-500">When the new day begins</p>
                          </div>
                      </div>
                      <select
                          value={resetTime}
                          onChange={(e) => setResetTime(e.target.value)}
                          className="bg-black/40 border border-white/10 rounded-lg px-2 py-1 text-xs text-white outline-none focus:border-blue-500"
                      >
                          {DAY_END_OPTIONS.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                      </select>
                    </div>
                    <p className="text-[9px] text-slate-600 font-mono italic pl-8">Adjust this to match your actual sleep cycle.</p>
                </div>

                 {/* Timezone */}
                 <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                        <Moon size={18} className="text-purple-400" />
                        <div>
                            <h3 className="text-xs font-bold text-white">Timezone</h3>
                            <p className="text-[10px] text-slate-500">Local Adjustment</p>
                        </div>
                    </div>
                    <select
                        value={timezone}
                        onChange={(e) => setTimezone(e.target.value)}
                        className="bg-black/40 border border-white/10 rounded-lg px-2 py-1 text-xs text-white outline-none focus:border-blue-500 max-w-[120px]"
                    >
                        <option value="local">Local System</option>
                        <option value="utc">UTC</option>
                        <option value="est">EST (New York)</option>
                        <option value="pst">PST (Los Angeles)</option>
                    </select>
                </div>

            </div>
        </section>

         {/* UNITS */}
         <section className="space-y-4 pt-6 border-t border-white/5">
             <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Measurement</h2>
             <div className="bg-[#0A0F1C] border border-white/5 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Ruler size={18} className="text-slate-300" />
                    <div>
                        <h3 className="text-xs font-bold text-white">Units</h3>
                        <p className="text-[10px] text-slate-500">Metric vs Imperial</p>
                    </div>
                </div>
                <div className="flex bg-black/40 rounded-lg p-1">
                    <button
                        onClick={() => setUnits('metric')}
                        className={`px-3 py-1 text-[10px] font-bold rounded transition-all ${units === 'metric' ? 'bg-white/10 text-white' : 'text-slate-500'}`}
                    >
                        METRIC
                    </button>
                    <button
                        onClick={() => setUnits('imperial')}
                        className={`px-3 py-1 text-[10px] font-bold rounded transition-all ${units === 'imperial' ? 'bg-white/10 text-white' : 'text-slate-500'}`}
                    >
                        IMPERIAL
                    </button>
                </div>
             </div>
         </section>

      </div>

      {/* SAVE BUTTON */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#020408] to-transparent pointer-events-none flex justify-center z-50">
         <button
            onClick={handleSave}
            disabled={loading}
            className="w-full max-w-md pointer-events-auto py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold text-xs tracking-[0.2em] uppercase shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all flex items-center justify-center gap-3"
         >
            <Save size={18} /> {loading ? 'SAVING...' : 'SAVE CHANGES'}
         </button>
      </div>
    </div>
  );
}
