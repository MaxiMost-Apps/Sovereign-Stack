import React from 'react';
import { ShieldAlert, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AccessDenied() {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-md">
      <div className="max-w-md w-full bg-zinc-950 border border-red-900/50 rounded-lg p-1 relative overflow-hidden">
        {/* Scanline */}
        <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(220,38,38,0.05)_50%,transparent_100%)] bg-[length:100%_4px] animate-scan pointer-events-none" />

        <div className="bg-red-950/10 p-8 rounded border border-red-900/20 flex flex-col items-center text-center space-y-6">
            <div className="w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center border border-red-500/50 shadow-[0_0_30px_rgba(220,38,38,0.3)]">
                <ShieldAlert className="w-8 h-8 text-red-500" />
            </div>

            <div className="space-y-2">
                <h1 className="text-2xl font-black text-red-500 uppercase tracking-widest">Access Denied</h1>
                <p className="text-red-400/70 font-mono text-sm">Clearance Level Insufficient.</p>
                <p className="text-xs text-red-900 font-mono uppercase tracking-widest mt-4">Error Code: ID-10-T</p>
            </div>

            <button
                onClick={() => navigate('/dashboard')}
                className="px-6 py-3 bg-red-900/20 hover:bg-red-900/40 border border-red-900/50 text-red-400 font-bold uppercase tracking-widest text-xs rounded transition-all w-full flex items-center justify-center gap-2 group"
            >
                <Lock className="w-3 h-3 group-hover:scale-110 transition-transform" />
                Return to Command
            </button>
        </div>
      </div>
    </div>
  );
}
