import React, { useEffect, useState } from 'react';
import { supabase } from '@/services/supabase';

export const AuthSystem = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#050A14] text-xs font-mono text-slate-500">INITIALIZING SECURITY...</div>;

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050A14] p-4">
        <div className="w-full max-w-md bg-[#0A0F1C] border border-white/5 p-8 rounded-2xl text-center">
          <h1 className="text-2xl font-black text-white uppercase tracking-widest mb-2">Sovereign Stack</h1>
          <p className="text-xs text-slate-500 mb-8 uppercase tracking-widest">Access Restricted</p>
          <button onClick={() => supabase.auth.signInWithOAuth({ provider: 'google' })} className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest rounded-lg hover:bg-slate-200 transition-colors">
            Authenticate Identity
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
