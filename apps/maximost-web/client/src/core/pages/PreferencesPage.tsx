import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { Save, RefreshCw, Lock, Shield, Activity, Heart } from 'lucide-react';
import { toast } from 'sonner';

export default function Preferences() {
  const [profile, setProfile] = useState({
    lens: 'FORTITUDE',
    coach_mode: 'STOIC',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    day_start: '06:00',
    day_end: '22:00',
    reduce_motion: false
  });
  const [loading, setLoading] = useState(false);

  // LOAD PROFILE
  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      if (data) setProfile({ ...profile, ...data });
    };
    load();
  }, []);

  // SAVE PROFILE
  const handleSave = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user');

      const updates = {
        id: user.id,
        lens: profile.lens,
        coach_mode: profile.coach_mode,
        timezone: profile.timezone,
        day_start: profile.day_start,
        day_end: profile.day_end,
        performance_mode: profile.reduce_motion,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase.from('profiles').upsert(updates);
      if (error) throw error;

      toast.success('PROTOCOL CALIBRATED.');
    } catch (error: any) {
      console.error('Save failed:', error);
      toast.error(`ERROR: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 pb-20">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-2xl font-black tracking-[0.2em] text-white uppercase mb-1">Identity Calibration</h1>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest">Anchor the Machine.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold tracking-widest uppercase rounded shadow-lg shadow-blue-900/20 disabled:opacity-50"
        >
          {loading ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
          {loading ? 'SAVING...' : 'LOCK PARAMETERS'}
        </button>
      </div>

      {/* THE COUNCIL (TITAN CARDS) */}
      <section className="mb-12">
        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 block">Voice Protocol</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { id: 'STOIC', icon: Shield, label: 'The Stoic', desc: 'Endure. The obstacle is the way.' },
            { id: 'OPERATOR', icon: Activity, label: 'The Operator', desc: 'Execute. Mission parameters set.' },
            { id: 'ALLY', icon: Heart, label: 'The Ally', desc: 'Recover. Good work today.' }
          ].map(mode => (
            <button
              key={mode.id}
              onClick={() => setProfile({ ...profile, coach_mode: mode.id })}
              className={`p-6 rounded-xl border text-left transition-all relative overflow-hidden group ${profile.coach_mode === mode.id ? 'bg-blue-900/20 border-blue-500/50' : 'bg-[#0B1221] border-white/5 hover:border-white/10'}`}
            >
              <mode.icon size={24} className={`mb-4 ${profile.coach_mode === mode.id ? 'text-blue-400' : 'text-slate-600'}`} />
              <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-1">{mode.label}</h3>
              <p className="text-[10px] text-slate-500">{mode.desc}</p>
            </button>
          ))}
        </div>
      </section>

      {/* SYSTEM CACHE */}
      <div className="mt-20 border-t border-white/5 pt-8">
        <div className="border border-red-900/30 bg-red-900/10 p-6 rounded-xl">
           <h3 className="text-red-500 font-bold uppercase tracking-widest text-xs mb-2">Danger Zone</h3>
           <p className="text-slate-400 text-xs mb-4">Irreversible action. Wipe all active habits and reset dashboard configuration.</p>
           <button className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-widest text-xs rounded">
             Wipe Dashboard
           </button>
        </div>
      </div>
    </div>
  );
}
