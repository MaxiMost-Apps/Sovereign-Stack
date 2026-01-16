import React, { useState } from 'react';
import {
  ShieldAlert, Activity, Users, Brain,
  Terminal, Play, Database, Server,
  Cpu, Zap, Cloud, Lock, Save,
  FileInput, GitBranch, Radio
} from 'lucide-react';
import { cn } from '../../lib/utils'; // Verify path to utils

// --- THE 4 SOVEREIGN AIRLOCKS (INFRASTRUCTURE) ---
const AIRLOCK_SYSTEMS = [
  {
    id: 'lock1',
    name: 'COACH COUNCIL',
    provider: 'Google Gemini API',
    type: 'Intelligence',
    version: 'Gemini 1.5 Flash',
    status: 'Operational',
    health: 98,
    usage: '450k / 1M Tokens',
    usagePercent: 45,
    cost: '$0.00 (Free Tier)',
    modules: ['Personality Injectors', 'Context Retention'],
    nextEvolution: 'Gemini 1.5 Pro (Reasoning Upgrade)'
  },
  {
    id: 'lock2',
    name: 'TERRA API',
    provider: 'Terra',
    type: 'Biometrics Bridge',
    version: 'v2.1 Webhooks',
    status: 'Listening',
    health: 100,
    usage: '3 Active Connections',
    usagePercent: 10,
    cost: '$0.00 (Dev Plan)',
    modules: ['Whoop Stream', 'Oura Stream', 'Garmin Stream'],
    nextEvolution: 'Graph API Integration'
  },
  {
    id: 'lock3',
    name: 'SUPABASE',
    provider: 'AWS (Managed)',
    type: 'The Iron Memory',
    version: 'Postgres 15',
    status: 'Ingesting',
    health: 100,
    usage: '125MB / 500MB',
    usagePercent: 25,
    cost: '$0.00 (Free Tier)',
    // RENAMED INGESTION PROTOCOL: THE FOUNDRY
    modules: ['Auth', 'Row Level Security', 'The Foundry (CSV/Apple/JSON)'],
    nextEvolution: 'Point-in-Time Recovery'
  },
  {
    id: 'lock4',
    name: 'MASTER ARCHITECT',
    provider: 'Google AI Studio',
    type: 'Sovereign Overseer',
    version: 'Gemini 1.5 Pro (Tuned)',
    status: 'Standby',
    health: 100,
    usage: 'Context: 12k / 1M',
    usagePercent: 1,
    cost: 'N/A (Studio Key)',
    // RENAMED STRESS TEST: RED TEAM
    modules: ['Drift Detection', 'Code Audit', 'Red Team Protocol'],
    nextEvolution: '2.0 Million Context Window'
  }
];

import { useLocation } from 'react-router-dom';

export default function AdminConsole() {
  const location = useLocation();
  const initialTab = location.pathname.includes('diagnostics') ? 'diagnostics' : 'overwatch';
  const [activeTab, setActiveTab] = useState<'overwatch' | 'airlocks' | 'diagnostics' | 'cortex'>(initialTab as any);

  return (
    <div className="p-4 md:p-8 space-y-8 text-zinc-100 max-w-7xl mx-auto mb-20">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-3">
            <ShieldAlert className="text-orange-500 w-8 h-8" />
            Admin Console
          </h1>
          <p className="text-zinc-500 mt-1">Infrastructure Command & Diagnostics.</p>
        </div>

        {/* TAB CONTROLS */}
        <div className="flex flex-wrap gap-2 bg-zinc-900/50 p-1 rounded-lg">
          <TabButton active={activeTab === 'overwatch'} onClick={() => setActiveTab('overwatch')} icon={Users} label="Overwatch" />
          <TabButton active={activeTab === 'airlocks'} onClick={() => setActiveTab('airlocks')} icon={Cloud} label="Airlocks" />
          <TabButton active={activeTab === 'diagnostics'} onClick={() => setActiveTab('diagnostics')} icon={Activity} label="Diagnostics" />
          <TabButton active={activeTab === 'cortex'} onClick={() => setActiveTab('cortex')} icon={Brain} label="The Cortex" />
        </div>
      </div>

      {/* --- TAB 1: OVERWATCH (USER GRID) --- */}
      {activeTab === 'overwatch' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard label="Total Users" value="3" icon={Users} color="text-blue-500" />
            <StatCard label="System Load" value="12%" icon={Activity} color="text-emerald-500" />
            <StatCard label="Security Level" value="DEFCON 4" icon={Lock} color="text-orange-500" />
          </div>
          <div className="p-12 border border-dashed border-zinc-800 rounded-lg text-center text-zinc-600 bg-zinc-900/10">
            <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">User Grid Active. Monitoring 3 identities.</p>
          </div>
        </div>
      )}

      {/* --- TAB 2: THE 4 AIRLOCKS (INFRASTRUCTURE) --- */}
      {activeTab === 'airlocks' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {AIRLOCK_SYSTEMS.map((lock) => (
            <div key={lock.id} className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-lg hover:border-zinc-600 transition-all group">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded bg-zinc-800 text-white group-hover:bg-zinc-700 transition-colors`}>
                    {lock.id === 'lock1' ? <Brain className="w-6 h-6 text-purple-500" /> :
                     lock.id === 'lock2' ? <Activity className="w-6 h-6 text-blue-500" /> :
                     lock.id === 'lock3' ? <Database className="w-6 h-6 text-emerald-500" /> :
                     <Cpu className="w-6 h-6 text-amber-500" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg tracking-wide">{lock.name}</h3>
                    <p className="text-xs text-zinc-500 uppercase tracking-widest">{lock.provider}</p>
                  </div>
                </div>
                <div className="text-right">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                      lock.status === 'Operational' || lock.status === 'Listening' || lock.status === 'Ingesting' ? 'bg-emerald-900/30 text-emerald-400' : 'bg-amber-900/30 text-amber-400'
                    }`}>
                      {lock.status}
                    </span>
                </div>
              </div>

              {/* Version Info */}
              <div className="flex justify-between items-center text-xs mb-4 bg-black/20 p-2 rounded">
                 <span className="text-zinc-400">Current: <span className="text-white font-mono">{lock.version}</span></span>
                 <span className="text-zinc-500">Target: {lock.nextEvolution}</span>
              </div>

              {/* Usage / Fuel Gauge */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-[10px] font-bold uppercase text-zinc-500">
                  <span>Usage Load</span>
                  <span>{lock.usage}</span>
                </div>
                <div className="h-2 w-full bg-black rounded-full overflow-hidden border border-zinc-800">
                  <div
                    className={`h-full transition-all duration-1000 ${
                        lock.usagePercent > 80 ? 'bg-red-500' :
                        lock.usagePercent > 50 ? 'bg-amber-500' : 'bg-blue-600'
                    }`}
                    style={{ width: `${lock.usagePercent}%` }}
                  />
                </div>
              </div>

              {/* Modules List (Foundry / Red Team) */}
              <div className="flex flex-wrap gap-2 mb-4">
                {lock.modules?.map((mod, i) => (
                  <span key={i} className="px-2 py-1 bg-zinc-950 border border-zinc-800 rounded text-[10px] text-zinc-400 flex items-center gap-1">
                    {mod.includes('Foundry') ? <FileInput className="w-3 h-3 text-emerald-500"/> : null}
                    {mod.includes('Red Team') ? <GitBranch className="w-3 h-3 text-red-500"/> : null}
                    {mod}
                  </span>
                ))}
              </div>

              {/* Cost Monitor */}
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 border-t border-zinc-800 pt-4">
                 <Zap className="w-3 h-3 text-yellow-500" />
                 <span>Est. Cost: <span className="text-white">{lock.cost}</span></span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- TAB 3: DIAGNOSTICS (THE 3 TOOLS) --- */}
      {activeTab === 'diagnostics' && <DiagnosticsPanel />}

      {/* --- TAB 4: THE CORTEX (MASTER NEURO) --- */}
      {activeTab === 'cortex' && (
        <div className="space-y-6 max-w-4xl">
          <div className="bg-purple-900/10 border border-purple-500/30 p-6 rounded-lg">
            <h3 className="text-purple-400 font-bold uppercase tracking-widest flex items-center gap-2 mb-2">
              <Brain className="w-5 h-5" /> Master Neuro (Global Context)
            </h3>
            <p className="text-zinc-400 text-sm mb-6">
              This is the <strong>Global Narrative</strong>. Information entered here overrides the "Zeitgeist" for ALL users.
              <br/><span className="text-purple-500 text-xs mt-1 block">*Distinct from User Personal Vault.</span>
            </p>
            <textarea
              className="w-full h-48 bg-black border border-zinc-800 rounded-lg p-4 text-sm text-purple-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-mono"
              placeholder="// ENTER GLOBAL CONTEXT PROTOCOL..."
              defaultValue="CURRENT STATE: DEFCON 4. Market volatility high. Focus users on Stoic discipline."
            />
            <div className="flex justify-end mt-4">
              <button className="flex items-center gap-2 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold uppercase text-xs rounded transition-colors">
                <Save className="w-4 h-4" /> Broadcast to System
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- SUB-COMPONENT: DIAGNOSTICS PANEL (Local Logic) ---
function DiagnosticsPanel() {
  const [logs, setLogs] = useState<string[]>([]);
  const [status, setStatus] = useState({ api: 'pending', db: 'pending' });

  const addLog = (msg: string) => setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]);

  const runDeepScan = () => {
    addLog('>> INITIATING DEEP SCAN...');
    setStatus({ api: 'pending', db: 'pending' });

    // MOCK: Simulate API Check
    setTimeout(() => {
        setStatus(s => ({ ...s, api: 'online' }));
        addLog('API GATEWAY: SECURE (20ms)');
    }, 800);

    // MOCK: Simulate DB Check
    setTimeout(() => {
        setStatus(s => ({ ...s, db: 'online' }));
        addLog('DB CONNECTION: ESTABLISHED');
        addLog('>> SCAN COMPLETE. ALL SYSTEMS NOMINAL.');
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* LEFT: CONTROLS */}
      <div className="space-y-6">
        {/* TOOL 1: SYSTEM HEALTH */}
        <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-lg space-y-4">
          <h3 className="text-zinc-500 font-bold uppercase text-xs tracking-widest flex items-center gap-2">
            <Activity className="w-4 h-4" /> Tool 1: Deep Scan
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <StatusIndicator label="API Gateway" status={status.api} icon={Server} />
            <StatusIndicator label="Supabase DB" status={status.db} icon={Database} />
          </div>
          <button onClick={runDeepScan} className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-xs font-bold uppercase rounded transition-colors">
            Run Diagnostics
          </button>
        </div>

        {/* TOOL 2: WAR GAME */}
        <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-lg space-y-4">
          <h3 className="text-zinc-500 font-bold uppercase text-xs tracking-widest flex items-center gap-2">
            <Play className="w-4 h-4" /> Tool 2: War Game (Sim)
          </h3>
          <div className="flex gap-2">
             <button onClick={() => addLog('>> SIM: FAILURE TRIGGERED')} className="flex-1 py-3 border border-red-900/50 bg-red-950/10 text-red-500 text-xs font-bold uppercase rounded">Fail</button>
             <button onClick={() => addLog('>> SIM: PROMO TRIGGERED')} className="flex-1 py-3 border border-emerald-900/50 bg-emerald-950/10 text-emerald-500 text-xs font-bold uppercase rounded">Promo</button>
          </div>
        </div>
      </div>

      {/* RIGHT: TERMINAL */}
      <div className="bg-black border border-zinc-800 rounded-lg p-4 font-mono text-xs flex flex-col h-[400px]">
        <div className="flex items-center gap-2 text-zinc-500 border-b border-zinc-900 pb-2 mb-2">
            <Terminal className="w-4 h-4" />
            <span className="uppercase tracking-widest">Live Output</span>
        </div>
        <div className="flex-1 overflow-y-auto space-y-1 text-green-500/80">
            {logs.length === 0 && <span className="opacity-30">Waiting for command...</span>}
            {logs.map((log, i) => <div key={i} className="break-all">{log}</div>)}
        </div>
      </div>
    </div>
  );
}

// --- HELPERS ---
const TabButton = ({ active, onClick, icon: Icon, label }: any) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center gap-2 px-4 py-2 text-sm font-bold uppercase tracking-wide rounded-md transition-all",
      active ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50"
    )}
  >
    <Icon className="w-4 h-4" />
    <span className="hidden md:inline">{label}</span>
  </button>
);

const StatCard = ({ label, value, icon: Icon, color }: any) => (
  <div className="bg-zinc-900/30 border border-zinc-800 p-4 rounded-lg flex items-center justify-between">
    <div>
      <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-1">{label}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
    <Icon className={`w-8 h-8 ${color} opacity-20`} />
  </div>
);

const StatusIndicator = ({ label, status, icon: Icon }: any) => (
  <div className={`flex items-center justify-between p-3 border rounded ${
    status === 'online' ? 'border-emerald-900/50 bg-emerald-950/10 text-emerald-500' :
    status === 'pending' ? 'border-zinc-800 bg-zinc-900 text-zinc-500' : 'border-red-900 bg-red-950/10 text-red-500'
  }`}>
    <div className="flex items-center gap-2">
        <Icon className="w-4 h-4" />
        <span className="text-xs font-bold">{label}</span>
    </div>
    <div className={`w-2 h-2 rounded-full ${status === 'online' ? 'bg-emerald-500' : status === 'pending' ? 'bg-zinc-600 animate-pulse' : 'bg-red-500'}`} />
  </div>
);
