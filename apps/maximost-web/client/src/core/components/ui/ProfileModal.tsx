import React, { useState, useEffect } from 'react';
import { X, Save, User, Mail, AtSign } from 'lucide-react';
import { useAuth } from '../../AuthSystem';
import { supabase } from '../../supabase';
import { useToast } from '../Toast';

export function ProfileModal({ isOpen, onClose, userProfile, onUpdate }: any) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
      full_name: '',
      display_name: '',
      callsign: '',
      email: ''
  });

  useEffect(() => {
      if (userProfile) {
          setFormData({
              full_name: userProfile.full_name || '',
              display_name: userProfile.display_name || '',
              callsign: userProfile.callsign || userProfile.username || '', // Migrating legacy username to callsign
              email: user?.email || ''
          });
      }
  }, [userProfile, user]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
      setLoading(true);
      try {
          const { error } = await supabase
              .from('profiles')
              .update({
                  full_name: formData.full_name,
                  display_name: formData.display_name,
                  callsign: formData.callsign
              })
              .eq('id', user?.id);

          if (error) throw error;

          toast.success("Profile Updated");
          if (onUpdate) onUpdate(); // Refresh parent state
          onClose();
      } catch (e: any) {
          toast.error("Update Failed: " + e.message);
      } finally {
          setLoading(false);
      }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md bg-[#0b0c10] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-white/5 px-6 py-4 flex items-center justify-between border-b border-white/5">
            <h3 className="text-white font-bold tracking-widest text-sm uppercase">Operator Profile</h3>
            <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
                <X className="w-5 h-5" />
            </button>
        </div>

        {/* CONTENT */}
        <div className="p-6 space-y-6">

            {/* 1. CALLSIGN (System ID) */}
            <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <AtSign className="w-3 h-3" /> Callsign
                </label>
                <input
                    type="text"
                    value={formData.callsign}
                    onChange={(e) => setFormData({...formData, callsign: e.target.value})}
                    className="w-full bg-black border border-slate-800 rounded-lg p-3 text-white focus:border-blue-500 outline-none font-mono text-sm"
                    placeholder="MAVERICK..."
                />
            </div>

            {/* 2. DISPLAY NAME (Community) */}
            <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <User className="w-3 h-3" /> Display Name
                </label>
                <input
                    type="text"
                    value={formData.display_name}
                    onChange={(e) => setFormData({...formData, display_name: e.target.value})}
                    className="w-full bg-black border border-slate-800 rounded-lg p-3 text-white focus:border-blue-500 outline-none text-sm"
                    placeholder="Public Alias..."
                />
            </div>

            {/* 3. REAL NAME (Private) */}
            <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <User className="w-3 h-3" /> Real Name
                </label>
                <input
                    type="text"
                    value={formData.full_name}
                    onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                    className="w-full bg-black border border-slate-800 rounded-lg p-3 text-white focus:border-blue-500 outline-none text-sm"
                    placeholder="Legal Name..."
                />
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <Mail className="w-3 h-3" /> Email
                </label>
                <input
                    type="text"
                    value={formData.email}
                    disabled
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-slate-400 outline-none cursor-not-allowed text-sm"
                />
            </div>

            <div className="pt-4 flex justify-end">
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-blue-900/20"
                >
                   {loading ? 'Saving...' : <><Save className="w-4 h-4" /> Save Changes</>}
                </button>
            </div>
        </div>

      </div>
    </div>
  );
}
