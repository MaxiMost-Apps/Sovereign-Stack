import React, { useState, useEffect } from 'react';
import { supabase } from '@/core/supabase';
import { toast } from 'sonner';
import { ArrowLeft, Save, Shield, User, Clock, AlertTriangle, RefreshCw, Trash2 } from 'lucide-react';
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

    const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
    if (data) setProfile(data);
    setLoading(false);
  };

  const updateProfile = async (field: string, value: any) => {
    try {
      const { error } = await supabase.from('profiles').update({ [field]: value }).eq('id', profile.id);
      if (error) throw error;
      setProfile({ ...profile, [field]: value });
      toast.success('Protocol Updated');
    } catch (err) {
      toast.error('Update Failed');
    }
  };

  if (loading) return <div className="p-8 text-slate-500">Loading Bio-Rig...</div>;

  return (
    <div className="max-w-2xl mx-auto p-4 pt-12 pb-40">
      <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-white mb-8 transition-colors">
        <ArrowLeft size={16} /> <span className="text-xs font-bold tracking-widest uppercase">Back to Mission Control</span>
      </Link>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-black text-white tracking-widest uppercase">System Preferences</h1>
        <div className="flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e] animate-pulse" />
           <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Online</span>
        </div>
      </div>

      {/* SECTION: COACH PROTOCOL */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="text-red-500" size={20} />
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Coach Protocol</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { id: 'OPERATOR', label: 'The Operator', desc: 'Tactical Execution', img: '/coaches/operator.jpg' },
            { id: 'STOIC', label: 'The Stoic', desc: 'Resilience & Logic', img: '/coaches/stoic.jpg' },
            { id: 'ALLY', label: 'The Ally', desc: 'Sustainability', img: '/coaches/ally.jpg' }
          ].map(coach => (
            <button
              key={coach.id}
              onClick={() => updateProfile('coach_mode', coach.id)}
              className={`relative h-48 rounded-2xl border overflow-hidden flex flex-col justify-end transition-all group ${
                profile?.coach_mode === coach.id
                  ? 'border-white ring-2 ring-white shadow-2xl scale-[1.02]'
                  : 'border-white/5 hover:border-white/20 hover:scale-[1.01]'
              }`}
            >
              <div className="absolute inset-0">
                 <img
                   src={coach.img}
                   alt={coach.label}
                   className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0B1221] via-[#0B1221]/40 to-transparent" />
              </div>

              <div className="relative z-10 p-5 text-left">
                <div className="flex items-center justify-between">
                    <span className="text-lg font-black text-white tracking-widest uppercase">{coach.label}</span>
                    {profile?.coach_mode === coach.id && <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e] animate-pulse" />}
                </div>
                <span className="block text-[10px] text-slate-300 mt-1 font-medium tracking-wider uppercase opacity-80">{coach.desc}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* SECTION: IDENTITY LENS */}
      <div className="bg-[#0B1221] border border-white/5 rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <User className="text-blue-500" size={20} />
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Identity Lens</h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {['FORTITUDE', 'REASON', 'VISIONARY', 'ANALYTICAL'].map(lens => (
            <button
              key={lens}
              onClick={() => updateProfile('lens', lens)}
              className={`p-4 rounded-xl border text-left transition-all ${
                profile?.lens === lens
                  ? 'bg-blue-600 border-blue-400 text-white shadow-lg'
                  : 'bg-slate-900/50 border-white/5 text-slate-500 hover:border-white/20'
              }`}
            >
              <span className="block text-[10px] font-black tracking-widest uppercase mb-1">LENS</span>
              <span className="block text-sm font-bold">{lens}</span>
            </button>
          ))}
        </div>
      </div>

      {/* SECTION: CHRONO SYNCHRONIZATION */}
      <div className="bg-[#0B1221] border border-white/5 rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Clock className="text-amber-500" size={20} />
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Chrono Synchronization</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">Day Start</label>
              <input
                type="time"
                value={profile?.day_start || '06:00'}
                onChange={(e) => updateProfile('day_start', e.target.value)}
                className="w-full bg-slate-900/50 border border-white/10 rounded-lg p-3 text-white font-mono focus:border-amber-500 outline-none"
              />
           </div>
           <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">Timezone</label>
              <select
                value={profile?.timezone || 'UTC'}
                onChange={(e) => updateProfile('timezone', e.target.value)}
                className="w-full bg-slate-900/50 border border-white/10 rounded-lg p-3 text-white font-mono focus:border-amber-500 outline-none"
              >
                 <option value="UTC">UTC (Universal)</option>
                 <option value="America/New_York">New York (EST)</option>
                 <option value="America/Los_Angeles">Los Angeles (PST)</option>
                 <option value="Europe/London">London (GMT)</option>
              </select>
           </div>
        </div>
      </div>

      {/* SECTION: SYSTEM MAINTENANCE */}
      <div className="bg-[#0B1221] border border-white/5 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <AlertTriangle className="text-slate-500" size={20} />
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">System Maintenance</h2>
        </div>

        <div className="space-y-4">
           <button
             onClick={() => window.location.reload()}
             className="w-full flex items-center justify-between p-4 rounded-xl border border-white/5 bg-slate-900/30 hover:bg-slate-800 transition-all group"
           >
              <div className="flex items-center gap-3">
                 <RefreshCw size={18} className="text-slate-500 group-hover:text-blue-400 transition-colors" />
                 <span className="text-xs font-bold text-slate-300 uppercase tracking-wide">Clear Cache & Reload</span>
              </div>
              <span className="text-[10px] text-slate-600 font-mono">V18.5</span>
           </button>

           <div className="border border-red-900/30 bg-red-900/5 p-4 rounded-xl">
              <div className="flex justify-between items-center">
                 <div className="flex items-center gap-3">
                    <Trash2 size={18} className="text-red-500" />
                    <div>
                       <h3 className="text-xs font-bold text-red-500 uppercase tracking-wide">Danger Zone</h3>
                       <p className="text-[10px] text-red-400/60 mt-0.5">Irreversible data loss.</p>
                    </div>
                 </div>
                 <button className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-[10px] font-black uppercase tracking-widest rounded transition-colors">
                    Wipe Data
                 </button>
              </div>
           </div>
        </div>
      </div>

    </div>
  );
}
