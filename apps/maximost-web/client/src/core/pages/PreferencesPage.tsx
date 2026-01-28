import React, { useState, useEffect } from 'react';
import { supabase } from '@/core/supabase';
import { toast } from 'sonner';
import { ArrowLeft, Save, Shield, User } from 'lucide-react';
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

    // Fetch profile safely
    const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single();
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

      <h1 className="text-2xl font-black text-white tracking-widest uppercase mb-8">System Preferences</h1>

      {/* SECTION: IDENTITY */}
      <div className="bg-[#0B1221] border border-white/5 rounded-2xl p-6 mb-6">
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

      {/* SECTION: AI COACH */}
      <div className="bg-[#0B1221] border border-white/5 rounded-2xl p-6">
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
              {/* BACKGROUND IMAGE */}
              <div className="absolute inset-0">
                 <img
                   src={coach.img}
                   alt={coach.label}
                   className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                 />
                 {/* Gradient Overlay for Text Readability */}
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0B1221] via-[#0B1221]/40 to-transparent" />
              </div>

              {/* TEXT LABEL */}
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
    </div>
  );
}
