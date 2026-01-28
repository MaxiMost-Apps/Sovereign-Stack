import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Shield, Activity, Brain, Heart, CheckCircle, Zap, Clock, Monitor, ArrowLeft, ChevronDown, ChevronUp, User, AtSign, Mail, Lock, Globe, Trash2, RefreshCw } from 'lucide-react';
import { supabase } from '../supabase';
import { useAuth } from '../AuthSystem';
import { useNavigate } from 'react-router-dom';
import { useKinetic } from '@/core/hooks/useKinetic';

import { useToast } from '../components/Toast';
import { AscensionOverlay } from '@/components/AscensionOverlay';

export default function PreferencesPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { triggerImpact } = useKinetic();
  const [tierName, setTierName] = useState('INITIATE');

  // -- STATE --
  const [activeCoach, setActiveCoach] = useState('stoic');
  const [activeLens, setActiveLens] = useState('fortitude'); // Default Lens
  const [dayEndOffset, setDayEndOffset] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [startOfWeek, setStartOfWeek] = useState('MONDAY');

  // Profile State
  const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [dayStart, setDayStart] = useState('06:00');
  const [dayEnd, setDayEnd] = useState('22:00');

  // Dirty Checking
  const [originalSettings, setOriginalSettings] = useState<any>({});
  // Simplified dirty check
  const hasChanges = true; // Always allow save for now to ensure persistence

  const [loading, setLoading] = useState(false);

  // -- LOAD --
  useEffect(() => {
    if (!user) return;
    const loadProfile = async () => {
      let { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();

      if (profile) {
        setTierName(profile.tier_name || 'INITIATE');
        setActiveCoach(profile.coach_preference || 'stoic');
        setActiveLens(profile.neural_config?.lens || 'fortitude');
        setDayEndOffset(profile.day_end_offset || 0);
        setReducedMotion(profile.reduced_motion || false);
        setTimezone(profile.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone);

        // Load Day Settings (Mock if missing from DB)
        setDayStart(profile.neural_config?.day_start || '06:00');
        setDayEnd(profile.neural_config?.day_end || '22:00');
        localStorage.setItem('activeCoach', profile.coach_preference || 'stoic');
      }
    };
    loadProfile();
  }, [user]);

  // -- ACTIONS --
  const handleSave = async () => {
    if (!user) return;
    triggerImpact();
    try {
      setLoading(true);

      // 1. Update Profile Data
      const updates = {
            id: user.id,
            coach_preference: activeCoach,
            neural_config: {
                lens: activeLens,
                day_start: dayStart,
                day_end: dayEnd
            },
            day_end_offset: dayEndOffset,
            reduced_motion: reducedMotion,
            timezone: timezone,
            updated_at: new Date().toISOString()
      };

      const { error } = await supabase.from('profiles').upsert(updates);
      if (error) throw error;

      // Local Sync
      localStorage.setItem('activeCoach', activeCoach);
      localStorage.setItem('activeLens', activeLens);
      window.dispatchEvent(new Event('storage'));

      setOriginalSettings({
          coach: activeCoach,
          offset: dayEndOffset,
          motion: reducedMotion,
          startOfWeek: startOfWeek,
          fullName: fullName,
          screenName: screenName,
          timezone: timezone
      });

      toast.success('Profile & Preferences Locked');

    } catch (err: any) {
      console.error('Save error:', err);
      toast.error(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const coaches = [
    { id: 'stoic', name: 'The Stoic', color: 'blue', img: 'stoicCC1', desc: 'Logic, Clarity, Endurance', icon: Shield },
    { id: 'operator', name: 'The Operator', color: 'emerald', img: 'operatorCC1t', desc: 'Discipline, Tactics, Action', icon: Activity },
    { id: 'ally', name: 'The Ally', color: 'purple', img: 'NurturerCC1', desc: 'Support, Systems, Patience', icon: Heart }
  ];

  const lenses = [
      { id: 'fortitude', name: 'Fortitude', color: 'bg-emerald-500', hex: '#059669', desc: 'Resilience & Grit' },
      { id: 'reason', name: 'Reason', color: 'bg-blue-600', hex: '#2563EB', desc: 'Logic & Analysis' },
      { id: 'visionary', name: 'Visionary', color: 'bg-purple-600', hex: '#7C3AED', desc: 'Future & Strategy' },
      { id: 'analytical', name: 'Analytical', color: 'bg-slate-400', hex: '#94A3B8', desc: 'Data & Precision' }
  ];

  // Apply Global Theme
  useEffect(() => {
      const selected = lenses.find(l => l.id === activeLens);
      if (selected) {
          document.documentElement.style.setProperty('--primary', selected.hex);
          // Optional: Dispatch event for non-react components if any
      }
  }, [activeLens]);

  const timezones = [
      "UTC", "America/New_York", "America/Los_Angeles", "America/Chicago", "Europe/London", "Europe/Paris", "Asia/Tokyo", "Australia/Sydney"
  ];

  // const isInitiate = tierName === 'INITIATE'; // REMOVED GATING

  return (
    <div className="space-y-8 p-6 max-w-2xl mx-auto pb-40 relative">
      {/* HEADER */}
      <div className="border-b border-zinc-800 pb-4">
        <h1 className="text-2xl font-black uppercase tracking-tighter text-white">Identity Calibration</h1>
        <p className="text-zinc-500 font-mono text-xs">ANCHOR THE MACHINE.</p>
      </div>

      {/* {isInitiate && <AscensionOverlay />} */}

      {/* GLOBAL PARAMETERS */}

      {/* LENSES & TONES */}
      <div className="space-y-6">
          <div>
              <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-[10px] font-bold uppercase text-zinc-600 tracking-widest">Neural Lens (Theme)</h2>
                  <span className="text-[9px] text-zinc-500 italic">Updates the perspective of 'i' information on habits.</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                  {lenses.map(lens => (
                      <button
                          key={lens.id}
                          onClick={() => setActiveLens(lens.id)}
                          className={`p-4 rounded border text-left transition-all relative overflow-hidden group ${activeLens === lens.id ? 'bg-zinc-900 border-white/20' : 'bg-black border-zinc-800 opacity-50 hover:opacity-100'}`}
                      >
                          <div className={`absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-40 transition-opacity`}>
                              {/* Icon placeholder or dynamic */}
                              {lens.id === 'fortitude' && <Shield className={`w-8 h-8 ${lens.color.replace('bg-', 'text-')}`} />}
                              {lens.id === 'reason' && <Brain className={`w-8 h-8 ${lens.color.replace('bg-', 'text-')}`} />}
                              {lens.id === 'visionary' && <Globe className={`w-8 h-8 ${lens.color.replace('bg-', 'text-')}`} />}
                              {lens.id === 'analytical' && <Activity className={`w-8 h-8 ${lens.color.replace('bg-', 'text-')}`} />}
                          </div>
                          <div className={`w-3 h-3 rounded-full mb-2 ${lens.color}`} />
                          <div className="text-xs font-bold text-white uppercase">{lens.name}</div>
                          <div className="text-[10px] text-zinc-500">{lens.desc}</div>
                      </button>
                  ))}
              </div>
          </div>

          <h2 className="text-[10px] font-bold uppercase text-zinc-600 tracking-widest">Voice Protocol (Tone)</h2>
          <div className="grid grid-cols-3 gap-4">
            {['STOIC', 'OPERATOR', 'ALLY'].map(coach => (
                <button
                    key={coach}
                    onClick={() => setActiveCoach(coach.toLowerCase())}
                    className={`relative p-4 rounded-xl border transition-all ${activeCoach.toUpperCase() === coach ? 'border-blue-500 bg-blue-500/10' : 'border-white/5 bg-[#131B2C]'}`}
                >
                    {/* Placeholder for Image - Using Icon for now to prevent breakage if image missing */}
                    <div className="w-12 h-12 mb-3 rounded-full mx-auto bg-slate-800 flex items-center justify-center">
                        <span className="text-xs">{coach[0]}</span>
                    </div>
                    {/* <img src={`/assets/coaches/${coach.toLowerCase()}.png`} className="w-12 h-12 mb-3 rounded-full mx-auto object-cover" /> */}
                    <span className="text-[10px] font-bold uppercase tracking-widest block text-center">{coach}</span>
                </button>
            ))}
          </div>
      </div>

      <div className="grid grid-cols-2 gap-6 pt-6 border-t border-zinc-900">
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase text-zinc-600 tracking-widest">Operational Timezone</label>
          <select
            value={timezone}
            onChange={(e) => { setTimezone(e.target.value); triggerImpact(); }}
            className="w-full bg-black border border-zinc-800 p-3 text-white font-mono text-sm focus:border-blue-500 outline-none transition-colors appearance-none cursor-pointer"
          >
            {timezones.map(tz => <option key={tz} value={tz}>{tz.replace('_', ' ')}</option>)}
            <option value={Intl.DateTimeFormat().resolvedOptions().timeZone}>System Default ({Intl.DateTimeFormat().resolvedOptions().timeZone})</option>
          </select>
        </div>

        <div className="space-y-2">
             <label className="text-[10px] font-bold uppercase text-zinc-600 tracking-widest">Performance Mode</label>
             <div className="flex items-center gap-2 p-3 bg-black border border-zinc-800 rounded">
                 <button
                    onClick={() => setReducedMotion(!reducedMotion)}
                    className={`w-4 h-4 rounded border ${reducedMotion ? 'bg-blue-500 border-blue-500' : 'border-zinc-600'}`}
                 />
                 <span className="text-sm text-zinc-400">Reduce Motion</span>
             </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 pt-6 border-t border-zinc-900">
          <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-zinc-600 tracking-widest">Day Start</label>
              <select
                value={dayStart}
                onChange={(e) => setDayStart(e.target.value)}
                className="w-full bg-black border border-zinc-800 p-3 text-white font-mono text-sm focus:border-blue-500 outline-none"
              >
                  {['04:00', '05:00', '06:00', '07:00', '08:00'].map(t => <option key={t} value={t}>{t}</option>)}
              </select>
          </div>
          <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-zinc-600 tracking-widest">Day End</label>
              <select
                value={dayEnd}
                onChange={(e) => setDayEnd(e.target.value)}
                className="w-full bg-black border border-zinc-800 p-3 text-white font-mono text-sm focus:border-blue-500 outline-none"
              >
                  {['20:00', '21:00', '22:00', '23:00', '00:00'].map(t => <option key={t} value={t}>{t}</option>)}
              </select>
          </div>
      </div>

      {/* UTILITY ZONE */}
      <div className="pt-12 border-t border-zinc-800 space-y-4">
          <div className="flex justify-between items-center bg-zinc-900/30 p-4 rounded-lg border border-zinc-800">
              <div>
                  <h3 className="text-sm font-bold text-white">System Cache</h3>
                  <p className="text-xs text-zinc-500">Force reload application data.</p>
              </div>
              <button
                onClick={() => { localStorage.clear(); window.location.reload(); }}
                className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold uppercase rounded transition-all"
              >
                  <RefreshCw className="w-3 h-3" /> Clear Cache
              </button>
          </div>

          <div className="border border-red-900/30 bg-red-900/10 p-6 rounded-xl">
              <h3 className="text-red-500 font-bold uppercase tracking-widest text-xs mb-2">Danger Zone</h3>
              <p className="text-slate-400 text-xs mb-4">
                  Irreversible action. Wipe all active habits and reset dashboard configuration.
                  <br/><span className="text-white font-bold">You will NOT lose your historical completion logs or data.</span>
              </p>
              <button
                onClick={async () => {
                    if (window.confirm("CRITICAL WARNING: This will delete ALL your active habits. Are you sure?")) {
                        if (window.confirm("Double Check: This cannot be undone.")) {
                            setLoading(true);
                            await supabase.from('habits').delete().eq('user_id', user.id);
                            toast.success("Dashboard Wiped");
                            window.location.reload();
                        }
                    }
                }}
                className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-widest text-xs rounded">
                  Wipe Dashboard
              </button>
          </div>
      </div>

      {/* SAVE BUTTON */}
      <div className="fixed bottom-6 right-6 left-6 md:left-72 z-50 flex justify-end">
        <button
            onClick={handleSave}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase text-xs px-8 py-3 rounded shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all flex items-center gap-2"
        >
            <Save className="w-4 h-4" />
            {loading ? 'SYNCING...' : 'LOCK PARAMETERS'}
        </button>
      </div>

    </div>
  );
}
