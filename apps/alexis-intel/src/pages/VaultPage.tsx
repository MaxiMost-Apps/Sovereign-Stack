import React, { useState } from 'react';
import { Database, Lock, Download, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock Data for the Vault
const VAULT_DATA = [
  { id: '1092', type: 'SLEEP_LOG', date: '2024-05-18', status: 'SYNCED', size: '12KB' },
  { id: '1093', type: 'GLUCOSE', date: '2024-05-18', status: 'PENDING', size: '4KB' },
  { id: '1094', type: 'HRV_DUMP', date: '2024-05-17', status: 'SYNCED', size: '2MB' },
  { id: '1095', type: 'STEPS_LOG', date: '2024-05-17', status: 'SYNCED', size: '18KB' },
  { id: '1096', type: 'KETONES', date: '2024-05-16', status: 'SYNCED', size: '2KB' },
];

export const VaultPage: React.FC = () => {
  // Rank State Logic (Mock)
  // Toggle this to 'INITIATE' to see the gated view
  const [userRank, setUserRank] = useState<'INITIATE' | 'SENTINEL'>('SENTINEL');

  // Initiate View (Garnish Protocol / Access Denied)
  if (userRank === 'INITIATE') {
    return (
      <div className="relative h-[80vh] flex flex-col items-center justify-center text-center overflow-hidden rounded-2xl border border-white/5 bg-black/40">

        {/* Blurred Background Layer */}
        <div className="absolute inset-0 bg-amethyst/5 blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

        <div className="relative z-10 max-w-lg p-8 glass-panel rounded-2xl border-red-500/20 shadow-[0_0_50px_rgba(255,42,109,0.1)]">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6 border border-red-500/30">
            <Lock className="w-8 h-8 text-red-500" />
          </div>

          <h2 className="text-2xl font-bold text-white mb-2 tracking-wide">RESTRICTED ACCESS</h2>
          <p className="text-white/60 mb-8">
            The Imperial Vault is reserved for Sentinel rank and above. Your biometrics are being logged, but you lack clearance to export raw data.
          </p>

          <button className="w-full py-3 bg-white text-black font-bold rounded hover:bg-white/90 transition-colors flex items-center justify-center gap-2">
             ASCEND TO SENTINEL <ChevronRight className="w-4 h-4" />
          </button>

          <button
             onClick={() => setUserRank('SENTINEL')}
             className="mt-4 text-xs text-white/20 hover:text-white/40 underline"
          >
            [DEV: Bypass Rank Check]
          </button>
        </div>
      </div>
    );
  }

  // Sentinel+ View (The Vault)
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-light text-white mb-2 flex items-center gap-3">
            <Database className="w-8 h-8 text-amethyst" />
            Imperial <span className="font-bold text-white">Vault</span>
          </h2>
          <p className="text-white/40">
             Secure archival storage for raw physiological datasets.
          </p>
        </div>

        <button className="px-4 py-2 bg-amethyst/10 hover:bg-amethyst/20 border border-amethyst/30 text-amethyst text-sm font-medium rounded transition-all flex items-center gap-2">
          <Download className="w-4 h-4" />
          EXPORT CSV
        </button>
      </div>

      {/* Data Grid */}
      <div className="glass-panel rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-white/50">
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">ID</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Data Type</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Date Logged</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Status</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs text-right">Size</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {VAULT_DATA.map((row) => (
                <tr key={row.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4 font-mono text-white/40 group-hover:text-white transition-colors">#{row.id}</td>
                  <td className="px-6 py-4 font-medium text-white">{row.type}</td>
                  <td className="px-6 py-4 text-white/60">{row.date}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2 py-1 rounded text-[10px] font-bold tracking-wider border",
                      row.status === 'SYNCED' ? "bg-neon-teal/10 text-neon-teal border-neon-teal/20" : "bg-neon-amber/10 text-neon-amber border-neon-amber/20"
                    )}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-white/40">{row.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination / Footer of Table */}
        <div className="p-4 border-t border-white/10 flex justify-center">
            <span className="text-xs text-white/30">Showing 5 of 128 records</span>
        </div>
      </div>

       <div className="flex justify-end">
          <button
             onClick={() => setUserRank('INITIATE')}
             className="text-xs text-white/20 hover:text-white/40 underline"
          >
            [DEV: Demote to Initiate]
          </button>
       </div>
    </div>
  );
};
