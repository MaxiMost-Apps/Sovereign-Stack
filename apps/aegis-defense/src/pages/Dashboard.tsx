
import React from 'react';
import { Shield, Activity, Lock, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 font-mono">
      {/* Page Title / Sub-header */}
      <div className="mb-8 border-b border-emerald-900/30 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-white uppercase">
          Security Command Center
        </h1>
        <p className="text-emerald-500/60 text-sm mt-1">System Status: OPERATIONAL</p>
      </div>

      {/* Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-obsidian border border-emerald-900/30 p-6 rounded-sm relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Shield size={64} className="text-emerald-500" />
          </div>
          <div className="flex items-center space-x-3 mb-2">
            <Shield className="text-emerald-500" size={20} />
            <h3 className="text-xs uppercase tracking-widest text-emerald-400">Defense Level</h3>
          </div>
          <p className="text-2xl font-bold text-white">MAXIMUM</p>
          <div className="mt-4 h-1 w-full bg-emerald-900/20">
            <div className="h-full w-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-obsidian border border-emerald-900/30 p-6 rounded-sm relative overflow-hidden group hover:border-amethyst-500/50 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Activity size={64} className="text-amethyst-500" />
          </div>
          <div className="flex items-center space-x-3 mb-2">
            <Activity className="text-amethyst-500" size={20} />
            <h3 className="text-xs uppercase tracking-widest text-amethyst-400">System Load</h3>
          </div>
          <p className="text-2xl font-bold text-white">12%</p>
          <div className="mt-4 h-1 w-full bg-amethyst-900/20">
            <div className="h-full w-[12%] bg-amethyst-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]"></div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-obsidian border border-emerald-900/30 p-6 rounded-sm relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Lock size={64} className="text-emerald-500" />
          </div>
          <div className="flex items-center space-x-3 mb-2">
            <Lock className="text-emerald-500" size={20} />
            <h3 className="text-xs uppercase tracking-widest text-emerald-400">Active Locks</h3>
          </div>
          <p className="text-2xl font-bold text-white">3</p>
          <div className="mt-4 h-1 w-full bg-emerald-900/20">
            <div className="h-full w-[10%] bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-obsidian border border-emerald-900/30 p-6 rounded-sm relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Users size={64} className="text-emerald-500" />
          </div>
          <div className="flex items-center space-x-3 mb-2">
            <Users className="text-emerald-500" size={20} />
            <h3 className="text-xs uppercase tracking-widest text-emerald-400">Active Units</h3>
          </div>
          <p className="text-2xl font-bold text-white">42</p>
          <div className="mt-4 h-1 w-full bg-emerald-900/20">
            <div className="h-full w-[60%] bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="col-span-2 bg-obsidian border border-emerald-900/30 p-6 rounded-sm">
           <h3 className="text-xs uppercase tracking-widest text-emerald-500 mb-4 border-b border-emerald-900/30 pb-2">Recent Traffic</h3>
           <div className="h-64 flex items-center justify-center text-emerald-800/40 border border-dashed border-emerald-900/30">
              [TRAFFIC VISUALIZATION MODULE]
           </div>
        </div>

        <div className="col-span-1 bg-obsidian border border-emerald-900/30 p-6 rounded-sm">
           <h3 className="text-xs uppercase tracking-widest text-emerald-500 mb-4 border-b border-emerald-900/30 pb-2">Quick Actions</h3>
           <div className="space-y-2">
             <button
               onClick={() => console.log('Scanning system...')}
               className="w-full text-left px-4 py-3 bg-emerald-900/10 border border-emerald-900/30 hover:bg-emerald-900/20 hover:border-emerald-500/50 text-emerald-100 text-xs uppercase tracking-wider transition-all"
             >
                Initiate System Scan
             </button>
             <button
               onClick={() => navigate('/audit-logs')}
               className="w-full text-left px-4 py-3 bg-emerald-900/10 border border-emerald-900/30 hover:bg-emerald-900/20 hover:border-emerald-500/50 text-emerald-100 text-xs uppercase tracking-wider transition-all"
             >
                View Audit Logs
             </button>
             <button
               onClick={() => console.log('Purging cache...')}
               className="w-full text-left px-4 py-3 bg-amethyst-900/10 border border-amethyst-900/30 hover:bg-amethyst-900/20 hover:border-amethyst-500/50 text-amethyst-100 text-xs uppercase tracking-wider transition-all"
             >
                Purge Cache
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
