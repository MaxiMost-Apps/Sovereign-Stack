import React, { useState, useEffect } from 'react';
import { supabase } from '@/core/supabase';
import { toast } from 'sonner';
import { ArrowLeft, Shield, Clock, Zap, AlertTriangle, Monitor, Globe, Save } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Preferences() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    let { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
    if (!data) {
        const { data: newProfile } = await supabase.from('profiles').insert({ id: user.id }).select().single();
        data = newProfile;
    }
    setProfile(data);
    setLoading(false);
  };

  const updateProfile = async (field: string, value: any) => {
    try {
      const { error } = await supabase.from('profiles').update({ [field]: value }).eq('id', profile.id);
      if (error) throw error;
      setProfile({ ...profile, [field]: value });
      toast.success('System Updated');
    } catch (err) {
      toast.error('Update Failed');
    }
  };

  const wipeDashboard = async () => {
    if (!confirm('WARNING: This will remove all active habits. Proceed?')) return;
    const { data: { user } } = await supabase.auth.getUser();
    await supabase.from('habits').delete().eq('user_id', user.id);
    toast.success('Dashboard Wiped');
    setTimeout(() => window.location.reload(), 1000);
  };

  if (loading) return <div className="p-8 text-slate-500 font-mono text-xs">INITIALIZING RIG...</div>;

  return (
    <div className="max-w-3xl mx-auto p-4 pt-12 pb-40 animate-in fade-in">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-12">
        <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold tracking-widest uppercase">Return to Mission Control</span>
        </Link>
        <button onClick={() => toast.success('Settings Saved')} className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest rounded-lg transition-colors">
          <Save size={14} /> Save Settings
        </button>
      </div>

      <h1 className="text-3xl font-black text-white tracking-[0.2em] uppercase mb-12">System Preferences</h1>

      {/* 1. IDENTITY LENS (4 OPTIONS) */}
      <section className="mb-12">
        <h2 className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-widest mb-6">
          <Monitor size={14} /> Identity Calibration
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['FORTITUDE', 'REASON', 'VISIONARY', 'ANALYTICAL'].map(lens => (
            <button
              key={lens}
              onClick={() => updateProfile('lens', lens)}
              className={`relative overflow-hidden h-24 rounded-xl border text-left transition-all group ${
                profile?.lens === lens
                  ? 'border-blue-500 bg-blue-900/10 shadow-[0_0_20px_rgba(59,130,246,0.1)]'
                  : 'border-white/5 bg-[#0B1221] hover:border-white/20'
              }`}
            >
              <div className="absolute inset-0 p-5 flex flex-col justify-center relative z-10">
                <span className="text-[10px] font-black text-slate-500 tracking-widest uppercase mb-1">LENS PROTOCOL</span>
                <span className={`text-lg font-bold tracking-wide ${profile?.lens === lens ? 'text-white' : 'text-slate-400'}`}>{lens}</span>
              </div>
              {profile?.lens === lens && <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />}
            </button>
          ))}
        </div>
      </section>

      {/* 2. COACH COUNCIL */}
      <section className="mb-12">
        <h2 className="flex items-center gap-2 text-xs font-bold text-red-400 uppercase tracking-widest mb-6">
          <Shield size={14} /> Neural Interface
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { id: 'OPERATOR', label: 'The Operator', desc: 'Tactical Execution', img: '/coaches/operator.jpg' },
            { id: 'STOIC', label: 'The Stoic', desc: 'Resilience & Logic', img: '/coaches/stoic.jpg' },
            { id: 'ALLY', label: 'The Ally', desc: 'Sustainability', img: '/coaches/ally.jpg' }
          ].map(coach => (
            <button
              key={coach.id}
              onClick={() => updateProfile('coach_mode', coach.id)}
              className={`relative h-48 rounded-xl border overflow-hidden flex flex-col justify-end transition-all group ${
                profile?.coach_mode === coach.id
                  ? 'border-white ring-1 ring-white shadow-xl scale-[1.02]'
                  : 'border-white/5 hover:border-white/20 bg-[#0B1221] hover:scale-[1.01]'
              }`}
            >
              <div className="absolute inset-0">
                 <img src={coach.img} alt={coach.label} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-700" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0B1221] via-[#0B1221]/40 to-transparent" />
              </div>
              <div className="relative z-10 p-4 text-left">
                <span className="block text-sm font-black text-white tracking-wide uppercase">{coach.label}</span>
                <span className="block text-[10px] text-slate-300 mt-1 uppercase tracking-wider opacity-80">{coach.desc}</span>
              </div>
              {profile?.coach_mode === coach.id && <div className="absolute top-4 right-4 z-20 w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e] animate-pulse" />}
            </button>
          ))}
        </div>
      </section>

      {/* 3. CHRONO & SYSTEM */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* CHRONO */}
        <div className="space-y-6">
           <h2 className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
             <Clock size={14} /> Chrono-Synchronization
           </h2>
           <div className="bg-[#0B1221] border border-white/5 rounded-2xl p-6 space-y-6">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Day Start</label>
                <div className="flex bg-slate-900/50 p-1 rounded-lg border border-white/5">
                  {['00:00', '02:00', '04:00'].map(time => (
                    <button key={time} onClick={() => updateProfile('day_start', time)} className={`flex-1 py-2 text-[10px] font-black rounded transition-all ${profile?.day_start === time ? 'bg-slate-700 text-white' : 'text-slate-500'}`}>{time}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Timezone</label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                  <select className="w-full bg-slate-900/50 border border-white/5 rounded-xl py-3 pl-10 pr-4 text-xs font-bold text-white uppercase outline-none" value={profile?.timezone} onChange={(e) => updateProfile('timezone', e.target.value)}>
                    <option value="America/New_York">America/New_York (EST)</option>
                    <option value="America/Chicago">America/Chicago (CST)</option>
                    <option value="America/Los_Angeles">America/Los_Angeles (PST)</option>
                  </select>
                </div>
              </div>
           </div>
        </div>

        {/* SYSTEM */}
        <div className="space-y-6">
           <h2 className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-widest">
             <Zap size={14} /> System Mechanics
           </h2>
           <div className="bg-[#0B1221] border border-white/5 rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase tracking-wide">Animations</span>
                <button onClick={() => updateProfile('performance_mode', !profile?.performance_mode)} className={`w-10 h-5 rounded-full relative transition-colors ${!profile?.performance_mode ? 'bg-purple-600' : 'bg-slate-700'}`}>
                  <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${!profile?.performance_mode ? 'left-6' : 'left-1'}`} />
                </button>
              </div>
              <button onClick={() => window.location.reload()} className="w-full py-3 rounded-lg border border-white/10 text-xs font-bold text-slate-400 hover:text-white hover:bg-white/5 uppercase tracking-widest transition-colors">
                Clear System Cache
              </button>
           </div>
        </div>
      </div>

      {/* DANGER ZONE */}
      <section>
        <h2 className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-widest mb-6">
          <AlertTriangle size={14} /> Danger Zone
        </h2>
        <div className="bg-red-950/10 border border-red-900/20 rounded-2xl p-6 flex items-center justify-between">
          <div>
            <span className="block text-xs font-bold text-red-200 uppercase">Factory Reset</span>
            <span className="text-[10px] text-red-400/60">Irreversible data loss.</span>
          </div>
          <button onClick={wipeDashboard} className="px-6 py-2 bg-red-900/20 text-red-500 border border-red-900/30 text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-red-900/40 transition-colors">
            Initiate Wipe
          </button>
        </div>
      </section>

    </div>
  );
}
