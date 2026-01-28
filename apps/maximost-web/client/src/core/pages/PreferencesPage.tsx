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

      {/* HEADER WITH SAVE BUTTON */}
      <div className="flex items-center justify-between mb-8">
        <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-bold tracking-widest uppercase">Return to Mission Control</span>
        </Link>
        <button onClick={() => toast.success('Settings Saved')} className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest rounded-lg transition-colors">
            Save Settings
        </button>
      </div>

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
            { id: 'STOIC', label: 'The Stoic', desc: 'Endure. The obstacle is the way.', img: '/coaches/stoic.jpg' },
            { id: 'OPERATOR', label: 'The Operator', desc: 'Execute. Mission parameters set.', img: '/coaches/operator.jpg' },
            { id: 'ALLY', label: 'The Ally', desc: 'Support. We go far together.', img: '/coaches/ally.jpg' },
          ].map(coach => (
            <button
              key={coach.id}
              onClick={() => updateProfile('coach_mode', coach.id)}
              className={`relative group overflow-hidden rounded-2xl border transition-all text-left h-48 ${
                profile?.coach_mode === coach.id
                  ? 'border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.3)]'
                  : 'border-white/5 hover:border-white/20'
              }`}
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0">
                  <img src={coach.img} alt={coach.label} className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity grayscale group-hover:grayscale-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              </div>

              <div className="absolute bottom-0 p-4 w-full">
                <div className="flex justify-between items-center mb-1">
                   <h3 className={`text-sm font-black uppercase tracking-widest ${profile?.coach_mode === coach.id ? 'text-white' : 'text-slate-300'}`}>{coach.label}</h3>
                   {profile?.coach_mode === coach.id && <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />}
                </div>
                <p className="text-[10px] text-slate-400 font-medium leading-tight">{coach.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* SECTION: CHRONO-SYNC */}
      <div className="mb-8 p-6 rounded-2xl border border-white/5 bg-[#0e1422]">
         <div className="flex items-center gap-3 mb-6">
          <Clock className="text-blue-500" size={20} />
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Chrono-Sync</h2>
        </div>

        <div className="grid grid-cols-2 gap-8">
            <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-3">Active Timezone</label>
                <div className="p-3 rounded-lg bg-black/20 border border-white/5 text-xs text-white font-mono flex items-center justify-between">
                    {profile?.timezone || 'UTC'}
                    <span className="text-[10px] text-green-500 font-bold bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">DETECTED</span>
                </div>
            </div>
            <div>
                 <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-3">Lens Filter</label>
                 <div className="flex bg-black/20 p-1 rounded-lg border border-white/5">
                    {['FORTITUDE', 'REASON'].map(lens => (
                        <button
                            key={lens}
                            onClick={() => updateProfile('lens', lens)}
                            className={`flex-1 py-2 text-[10px] font-black uppercase rounded transition-all ${profile?.lens === lens ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            {lens}
                        </button>
                    ))}
                 </div>
            </div>
        </div>
      </div>

      {/* SECTION: DANGER ZONE */}
      <div className="p-6 rounded-2xl border border-red-500/10 bg-red-950/5">
         <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="text-red-500" size={20} />
          <h2 className="text-sm font-bold text-red-500 uppercase tracking-wider">Danger Zone</h2>
        </div>
        <div className="flex items-center justify-between">
            <div>
                <h3 className="text-xs font-bold text-white uppercase">Factory Reset</h3>
                <p className="text-[10px] text-slate-500 mt-1">This will wipe all active protocols and streak data.</p>
            </div>
            <button
                onClick={async () => {
                    if(confirm("CONFIRM PROTOCOL WIPE? This cannot be undone.")) {
                         await supabase.rpc('factory_reset'); // Ensure this RPC exists or handle manually
                         window.location.reload();
                    }
                }}
                className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-lg text-[10px] font-black uppercase tracking-widest transition-colors flex items-center gap-2"
            >
                <Trash2 size={12} /> Initiate Wipe
            </button>
        </div>
      </div>

    </div>
  );
}
