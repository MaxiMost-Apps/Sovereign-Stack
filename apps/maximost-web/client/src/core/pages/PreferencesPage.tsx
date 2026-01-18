import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Shield, Activity, Brain, Heart, CheckCircle, Zap, Clock, Monitor, ArrowLeft, ChevronDown, ChevronUp, User, AtSign, Mail, Lock, Globe } from 'lucide-react';
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
  const [fullName, setFullName] = useState('');
  const [screenName, setScreenName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);

  // Dirty Checking
  const [originalSettings, setOriginalSettings] = useState<any>({});
  const hasChanges =
      activeCoach !== originalSettings.coach ||
      dayEndOffset !== originalSettings.offset ||
      reducedMotion !== originalSettings.motion ||
      startOfWeek !== originalSettings.startOfWeek ||
      fullName !== originalSettings.fullName ||
      screenName !== originalSettings.screenName ||
      timezone !== originalSettings.timezone ||
      password !== '';

  const [loading, setLoading] = useState(false);

  // -- LOAD --
  useEffect(() => {
    if (!user) return;
    const loadProfile = async () => {
      let { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();

      if (profile) {
        setTierName(profile.tier_name || 'INITIATE');
        setActiveCoach(profile.coach_preference || 'stoic');
        setActiveLens(profile.neural_config?.lens || 'fortitude'); // Load Lens
        setDayEndOffset(profile.day_end_offset || 0);
        setReducedMotion(profile.reduced_motion || false);
        setStartOfWeek(profile.start_of_week || 'MONDAY');
        setFullName(profile.full_name || '');
        setScreenName(profile.username || '');
        setTimezone(profile.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone);

        setEmail(user.email || '');

        setOriginalSettings({
            coach: profile.coach_preference || 'stoic',
            offset: profile.day_end_offset || 0,
            motion: profile.reduced_motion || false,
            startOfWeek: profile.start_of_week || 'MONDAY',
            fullName: profile.full_name || '',
            screenName: profile.username || '',
            timezone: profile.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone
        });
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
            neural_config: { lens: activeLens }, // Persist Lens
            day_end_offset: dayEndOffset,
            reduced_motion: reducedMotion,
            start_of_week: startOfWeek,
            full_name: fullName,
            username: screenName,
            timezone: timezone,
            updated_at: new Date().toISOString()
      };

      const { error } = await supabase.from('profiles').upsert(updates);
      if (error) throw error;

      // 2. Update Auth Data (Email/Password) - Account Genesis
      if (password || (email !== user.email)) {
          const authUpdates: any = {};
          if (email !== user.email) authUpdates.email = email;
          if (password) authUpdates.password = password;

          const { error: authError } = await supabase.auth.updateUser(authUpdates);
          if (authError) throw authError;

          if (password) {
              toast.success("Security Credentials Updated");
              setPassword(''); // Clear field
          }
          if (email !== user.email) {
              toast.success("Confirmation Email Sent");
          }
      }

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
      { id: 'fortitude', name: 'Fortitude', color: 'bg-amber-500', desc: 'Resilience & Grit' },
      { id: 'reason', name: 'Reason', color: 'bg-blue-500', desc: 'Logic & Analysis' },
      { id: 'visionary', name: 'Visionary', color: 'bg-purple-500', desc: 'Future & Strategy' },
      { id: 'analytical', name: 'Analytical', color: 'bg-emerald-500', desc: 'Data & Precision' }
  ];

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
      <div className="space-y-4">
          <h2 className="text-[10px] font-bold uppercase text-zinc-600 tracking-widest">Neural Lens (Theme)</h2>
          <div className="grid grid-cols-2 gap-4">
              {lenses.map(lens => (
                  <button
                      key={lens.id}
                      onClick={() => setActiveLens(lens.id)}
                      className={`p-4 rounded border text-left transition-all ${activeLens === lens.id ? 'bg-zinc-900 border-white/20' : 'bg-black border-zinc-800 opacity-50 hover:opacity-100'}`}
                  >
                      <div className={`w-3 h-3 rounded-full mb-2 ${lens.color}`} />
                      <div className="text-xs font-bold text-white uppercase">{lens.name}</div>
                      <div className="text-[10px] text-zinc-500">{lens.desc}</div>
                  </button>
              ))}
          </div>

          <h2 className="text-[10px] font-bold uppercase text-zinc-600 tracking-widest mt-6">Voice Protocol (Tone)</h2>
          <div className="grid grid-cols-3 gap-4">
              {coaches.map(coach => (
                  <button
                      key={coach.id}
                      onClick={() => setActiveCoach(coach.id)}
                      className={`p-4 rounded border text-center transition-all ${activeCoach === coach.id ? `bg-${coach.color}-900/10 border-${coach.color}-500/50` : 'bg-black border-zinc-800 opacity-50 hover:opacity-100'}`}
                  >
                      <coach.icon className={`w-6 h-6 mx-auto mb-2 text-${coach.color}-500`} />
                      <div className="text-[10px] font-bold text-white uppercase">{coach.name}</div>
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
            {timezones.map(tz => <option key={tz} value={tz}>{tz}</option>)}
            <option value={Intl.DateTimeFormat().resolvedOptions().timeZone}>System Default</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase text-zinc-600 tracking-widest">Day End Offset</label>
          <input
            type="number"
            value={dayEndOffset}
            onChange={(e) => { setDayEndOffset(Number(e.target.value)); triggerImpact(); }}
            className="w-full bg-black border border-zinc-800 p-3 text-white font-mono text-sm focus:border-blue-500 outline-none"
          />
        </div>
      </div>

      {/* SECURE IDENTITY */}
      <div className="space-y-4 pt-4 border-t border-zinc-900">
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase text-zinc-600 tracking-widest">Operator Email</label>
          <input
            type="email"
            value={email}
            placeholder="ENTER EMAIL TO UNLOCK"
            className="w-full bg-black border border-zinc-800 p-3 text-white font-mono text-sm focus:border-emerald-500 outline-none"
            onChange={(e) => {
              setEmail(e.target.value);
              triggerImpact();
            }}
          />
        </div>

        {/* ANIMATED PASSWORD REVEAL */}
        <div className={`transition-all duration-500 ease-in-out overflow-hidden ${email.length > 5 ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
           <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-red-900 tracking-widest">Access Key</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-black border border-red-900/30 p-3 text-white font-mono text-sm focus:border-red-500 outline-none"
            />
          </div>
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
