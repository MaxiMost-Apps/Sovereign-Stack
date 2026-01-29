import React, { useState, useEffect } from 'react';
import { supabase } from '@/services/supabase';
import { toast } from 'sonner';
import { ArrowLeft, Shield, Clock, Zap, AlertTriangle, Monitor, Save, Eye, Brain, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Preferences() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadProfile(); }, []);

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
    const { error } = await supabase.from('profiles').update({ [field]: value }).eq('id', profile.id);
    if (!error) {
      setProfile({ ...profile, [field]: value });
      toast.success('System Updated');
    }
  };

  const wipeDashboard = async () => {
    if (!confirm('CONFIRM: Wipe dashboard?')) return;
    const { data: { user } } = await supabase.auth.getUser();
    await supabase.from('habits').delete().eq('user_id', user.id);
    toast.success('Dashboard Wiped');
    setTimeout(() => window.location.reload(), 1500);
  };

  if (loading) return <div className="p-8 text-slate-500 font-mono text-xs">LOADING RIG...</div>;

  return (
    <div className="max-w-3xl mx-auto p-4 pt-12 pb-40 animate-in fade-in">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-12">
        <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold tracking-widest uppercase">Mission Control</span>
        </Link>
        <button onClick={() => toast.success('Settings Saved')} className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest rounded-lg transition-colors">
          <Save size={14} /> Save Settings
        </button>
      </div>

      <h1 className="text-3xl font-black text-white tracking-[0.2em] uppercase mb-12">System Configuration</h1>

      {/* 1. IDENTITY LENS */}
      <section className="mb-12">
        <h2 className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-6"><Monitor size={14} /> Identity Filter</h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            { id: 'FORTITUDE', label: 'Fortitude', icon: Shield, color: 'text-blue-500' },
            { id: 'REASON', label: 'Reason', icon: Brain, color: 'text-emerald-500' },
            { id: 'VISIONARY', label: 'Visionary', icon: Eye, color: 'text-purple-500' },
            { id: 'ANALYTICAL', label: 'Analytical', icon: Activity, color: 'text-amber-500' }
          ].map(lens => (
            <button key={lens.id} onClick={() => updateProfile('lens', lens.id)} className={`relative h-24 rounded-xl border text-left p-5 transition-all ${profile?.lens === lens.id ? `border-white bg-${lens.color.split('-')[1]}-900/10` : 'border-white/5 bg-[#0B1221] hover:border-white/10'}`}>
              <lens.icon size={20} className={`mb-2 ${profile?.lens === lens.id ? lens.color : 'text-slate-600'}`} />
              <span className={`text-sm font-black tracking-wide uppercase ${profile?.lens === lens.id ? 'text-white' : 'text-slate-500'}`}>{lens.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* 2. COACH */}
      <section className="mb-12">
        <h2 className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-6"><Shield size={14} /> Neural Interface</h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            { id: 'OPERATOR', label: 'The Operator', desc: 'Tactical', img: '/coaches/operator.jpg' },
            { id: 'STOIC', label: 'The Stoic', desc: 'Resilient', img: '/coaches/stoic.jpg' },
            { id: 'ALLY', label: 'The Ally', desc: 'Sustainable', img: '/coaches/ally.jpg' }
          ].map(coach => (
             <button key={coach.id} onClick={() => updateProfile('coach_mode', coach.id)} className={`relative h-48 rounded-xl border overflow-hidden group ${profile?.coach_mode === coach.id ? 'border-white ring-1 ring-white' : 'border-white/5'}`}>
               <img src={coach.img} alt={coach.label} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-all duration-700" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0B1221] via-[#0B1221]/20 to-transparent" />
               <div className="relative z-10 p-4 text-left mt-auto h-full flex flex-col justify-end">
                  <span className="text-xs font-black text-white uppercase">{coach.label}</span>
                  <span className="text-[9px] text-slate-400 uppercase mt-1">{coach.desc}</span>
               </div>
               {profile?.coach_mode === coach.id && <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />}
             </button>
          ))}
        </div>
      </section>

      {/* 3. CHRONO & SYSTEM */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-6">
           <h2 className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest"><Clock size={14} /> Chrono-Sync</h2>
           <div className="bg-[#0B1221] border border-white/5 rounded-2xl p-6">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Day End (Reset)</label>
              <div className="flex flex-wrap gap-2">
                {['12AM', '1AM', '2AM', '3AM', '4AM'].map(time => (
                  <button key={time} onClick={() => updateProfile('day_end', time)} className={`px-3 py-2 text-[10px] font-black rounded border transition-all ${profile?.day_end === time ? 'bg-slate-700 border-slate-500 text-white' : 'border-white/5 text-slate-500 hover:text-white'}`}>{time}</button>
                ))}
              </div>
           </div>
        </div>

        <div className="space-y-6">
           <h2 className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest"><Zap size={14} /> System Mechanics</h2>
           <div className="bg-[#0B1221] border border-white/5 rounded-2xl p-6 space-y-4">
              <button onClick={() => window.location.reload()} className="w-full py-3 rounded-lg border border-white/10 text-[10px] font-bold text-slate-400 hover:text-white hover:bg-white/5 uppercase tracking-widest">
                Clear System Cache <span className="block text-[8px] text-slate-600 font-normal lowercase">(safe • retains data)</span>
              </button>
              <button onClick={wipeDashboard} className="w-full py-3 rounded-lg bg-red-900/10 border border-red-900/30 text-red-500 text-[10px] font-black uppercase tracking-widest hover:bg-red-900/30">
                Reset Dashboard <span className="block text-[8px] text-red-400/50 font-normal lowercase">(clears active habits • keeps history)</span>
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
