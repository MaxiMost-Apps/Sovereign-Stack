import React, { useState, useEffect } from 'react';
import { Save, Download, Shield, Activity, Brain, Database, RefreshCw, ArrowLeft, Radio, FileUp, HardDrive, Lock, Edit, Trash2, Plus } from 'lucide-react';
import { useAuth } from '../AuthSystem';
import { useAIContext } from '../context/AIContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../components/Toast';
import { supabase } from '../supabase';
import { format } from 'date-fns';

export function VaultCore({ isOverlay = false }: { isOverlay?: boolean }) {
  const { user } = useAuth();
  const { neuralConfig, updateConfig } = useAIContext();
  const navigate = useNavigate();
  const { toast } = useToast();

  // -- STATE --
  const [newMemoryInput, setNewMemoryInput] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [ledgerData, setLedgerData] = useState<any[]>([]);
  const [loadingLedger, setLoadingLedger] = useState(false);

  // Sync Input with Context
  useEffect(() => {
      setNewMemoryInput(neuralConfig || "");
  }, [neuralConfig]);

  // Load Ledger Data
  useEffect(() => {
      if (!user) return;
      const fetchLedger = async () => {
          setLoadingLedger(true);
          // Fetch Habit Logs joined with Habits
          const { data, error } = await supabase
              .from('habit_logs')
              .select('*, habits(title, unit)')
              .order('completed_at', { ascending: false })
              .limit(10); // Recent 10 entries

          if (!error && data) {
              setLedgerData(data);
          }
          setLoadingLedger(false);
      };
      fetchLedger();
  }, [user]);

  const handleSaveNeural = async () => {
      await updateConfig(newMemoryInput);
      toast.success('Neural Archives Updated');
  };

  const handleUpload = async (event: any) => {
      const file = event.target.files[0];
      if (!file) return;

      try {
          const fileExt = file.name.split('.').pop();
          const fileName = `${Math.random()}.${fileExt}`;
          const filePath = `${user?.id}/${fileName}`;

          const { error: uploadError } = await supabase.storage
              .from('vault_imports')
              .upload(filePath, file);

          if (uploadError) throw uploadError;

          toast.success("Infiltration Successful");
      } catch (error: any) {
          toast.error("Upload Failed: " + error.message);
      }
  };

  const handleExport = () => {
      // Mock Export
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ user_id: user?.id, neuralConfig, timestamp: Date.now() }));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", "maximost_sovereign_archive.json");
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
      toast.success('Master Ledger Downloaded');
  };

  const handleDeleteAccount = () => {
      if (deleteConfirmation === 'DELETE MY DATA') {
          if(user) {
              localStorage.clear();
              navigate('/login');
              toast.error('Protocol Terminated. Data Shredded.');
          }
      } else {
          toast.error("Confirmation Phrase Incorrect");
      }
  };

  const handleDeleteEntry = async (id: string) => {
      const { error } = await supabase.from('habit_logs').delete().eq('id', id);
      if (error) {
          toast.error("Deletion Failed");
      } else {
          setLedgerData(prev => prev.filter(item => item.id !== id));
          toast.success("Entry Erased from Ledger");
      }
  };

  const integrations = [
      { id: 'oura', name: 'Oura Ring', status: 'connected', icon: Activity, color: 'teal' },
      { id: 'whoop', name: 'Whoop', status: 'disconnected', icon: Activity, color: 'white' },
      { id: 'apple', name: 'Apple Health', status: 'connected', icon: Activity, color: 'red' },
      { id: 'garmin', name: 'Garmin', status: 'disconnected', icon: Activity, color: 'blue' },
      { id: 'samsung', name: 'Samsung Health', status: 'disconnected', icon: Activity, color: 'blue' },
  ];

  return (
    <div className={`space-y-16 pb-40 min-h-screen text-slate-300 ${isOverlay ? 'p-0' : 'p-6 max-w-5xl mx-auto bg-[#030303]'}`}>

      {/* Header (Only if NOT overlay, or different style) */}
      {!isOverlay && (
          <div className="flex flex-col gap-4 border-b border-white/5 pb-8">
            <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-slate-600 hover:text-white transition-colors w-fit group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs font-bold uppercase tracking-widest">Back to Command</span>
            </button>
            <div>
                <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-2 flex items-center gap-3">
                    <Shield className="w-8 h-8 text-slate-500" /> THE VAULT
                </h1>
                <p className="text-slate-500 font-mono text-xs">SOVEREIGN COMMAND // ZERO-KNOWLEDGE ARCHITECTURE</p>
            </div>
          </div>
      )}

      {/* SECTION 1: INGRESS (Telemetry Uplinks) */}
      <section>
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
          <Radio className="w-4 h-4" /> Telemetry Uplinks (Ingress)
        </h2>
        <div className="grid grid-cols-2 gap-4">
            {integrations.map((item) => (
                <div key={item.id} className="bg-[#050505] border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center gap-3 hover:border-white/20 transition-all cursor-pointer group relative overflow-hidden">
                    {item.status === 'connected' && (
                        <div className={`absolute top-2 right-2 w-2 h-2 rounded-full bg-${item.color}-500 shadow-[0_0_10px_currentColor] animate-pulse`} style={{ color: item.color === 'teal' ? '#00f5ff' : undefined }} />
                    )}
                    <div className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-500 group-hover:text-white transition-colors`}>
                        <item.icon className="w-5 h-5" />
                    </div>
                    <div className="text-center">
                        <h4 className="text-xs font-bold text-slate-300">{item.name}</h4>
                        <span className={`text-[9px] font-mono uppercase tracking-wider ${item.status === 'connected' ? 'text-emerald-500' : 'text-slate-700'}`}>
                            {item.status === 'connected' ? 'SECURE LINK ACTIVE' : 'DISCONNECTED'}
                        </span>
                    </div>
                </div>
            ))}
        </div>
        <p className="text-[10px] text-slate-600 mt-4 text-center">Authorize secure, read-only streams from your hardware. Data is encrypted immediately upon entry via the Terra Protocol.</p>
      </section>

      {/* SECTION 2: GLASSBOX LEDGER (Data Management) */}
      <section className="border-t border-white/5 pt-12">
          <div className="flex justify-between items-center mb-6">
              <h2 className="text-xs font-bold text-blue-500 uppercase tracking-widest flex items-center gap-2">
                  <Database className="w-4 h-4" /> Glassbox Ledger
              </h2>
              <button className="text-[10px] font-bold uppercase text-slate-500 hover:text-white flex items-center gap-1">
                  <Plus className="w-3 h-3" /> Manual Entry
              </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {loadingLedger ? (
                  <div className="col-span-full py-8 text-center text-xs text-slate-600 font-mono animate-pulse">DECRYPTING LEDGER...</div>
              ) : ledgerData.length === 0 ? (
                  <div className="col-span-full py-8 text-center text-xs text-slate-600 font-mono">NO DATA POINTS FOUND</div>
              ) : (
                  ledgerData.map((entry) => (
                      <div key={entry.id} className="bg-zinc-950/50 border border-zinc-800 p-4 rounded-lg flex items-center justify-between group hover:border-blue-500/30 transition-all">
                          <div>
                              <h4 className="text-sm font-bold text-white mb-1">{entry.habits?.title || 'Unknown Metric'}</h4>
                              <p className="text-xs text-slate-500 font-mono">{format(new Date(entry.completed_at), 'MMM d, yyyy')} • {entry.value} {entry.habits?.unit || ''}</p>
                          </div>
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="p-2 hover:bg-zinc-800 rounded text-slate-400 hover:text-blue-400" title="Edit">
                                  <Edit className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => handleDeleteEntry(entry.id)}
                                className="p-2 hover:bg-red-950/20 rounded text-slate-400 hover:text-red-500" title="Delete"
                              >
                                  <Trash2 className="w-3 h-3" />
                              </button>
                          </div>
                      </div>
                  ))
              )}
          </div>
      </section>

      {/* SECTION 3: CONTEXT (The Mind) */}
      <section className="border-t border-white/5 pt-12">
         <div className="flex justify-between items-end mb-6">
            <div>
                <h2 className="text-xs font-bold text-purple-900 uppercase tracking-widest mb-2 flex items-center gap-2"><Brain className="w-4 h-4" /> Neural Archives (Context)</h2>
                <p className="text-sm text-slate-600">The AI's knowledge base of your objectives.</p>
            </div>
         </div>

         <div className="bg-[#050505] border border-white/10 rounded-xl p-6 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-900/50 to-transparent" />
             <textarea
                rows={6}
                value={newMemoryInput}
                onChange={(e) => setNewMemoryInput(e.target.value)}
                placeholder="Target Parameters: Define mission-critical context (e.g., 'Currently managing a $2M liquidity transition. Prioritize cognitive endurance over physical output for the next 14 days.')"
                className="w-full bg-black/50 border border-white/10 rounded-lg p-4 text-sm text-slate-300 focus:border-purple-900 focus:outline-none resize-none font-mono"
            />
            <div className="flex justify-end mt-4">
                <button onClick={handleSaveNeural} className="bg-purple-900/20 hover:bg-purple-900/40 text-purple-400 border border-purple-900/50 px-6 py-2 rounded-lg font-bold text-xs uppercase tracking-wide flex items-center gap-2 transition-all">
                    <Save className="w-4 h-4" /> Update Context
                </button>
            </div>
         </div>
      </section>

      {/* SECTION 4: EGRESS */}
      <section className="border-t border-white/5 pt-12">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2"><HardDrive className="w-4 h-4" /> Sovereign Vault Protocol (Egress)</h2>

        <div className="grid md:grid-cols-2 gap-6">
            {/* INFILTRATION MODULE */}
            <div
                className={`p-8 border-2 border-dashed rounded-xl bg-black/40 transition-all flex flex-col items-center justify-center text-center group cursor-pointer relative ${isDragging ? 'border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'border-white/5 hover:border-white/20'}`}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
                onDrop={(e) => { e.preventDefault(); setIsDragging(false); }}
            >
                <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    onChange={handleUpload}
                />
                <FileUp className={`w-8 h-8 mb-4 transition-colors ${isDragging ? 'text-blue-500 animate-bounce' : 'text-slate-700 group-hover:text-slate-400'}`} />
                <span className="text-xs font-black text-blue-500 uppercase tracking-[0.2em] mb-2">CONFIG YOUR RIG</span>
                <h3 className="text-xl font-black text-slate-300 uppercase tracking-tight mb-4">INFILTRATION MODULE</h3>
                <button className="bg-slate-900 border border-slate-800 text-slate-400 px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-slate-800 hover:text-white transition-all pointer-events-none">
                    [ INITIATE MIGRATION ]
                </button>
            </div>

            {/* MASTER LEDGER */}
            <div className="p-8 border border-white/5 rounded-xl bg-black/40 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-black text-white uppercase tracking-tight flex items-center gap-2"><HardDrive className="w-5 h-5 text-emerald-900" /> MASTER LEDGER</h3>
                        <span className="text-[9px] font-mono text-emerald-900 border border-emerald-900/30 px-2 py-1 rounded">LATENCY: 0ms</span>
                    </div>
                    <p className="text-xs text-slate-500 mb-8 leading-relaxed">
                        Extract your entire biometric, behavioral, and cognitive history into a universal format (JSON/CSV). Total portability. You own the Ledger.
                    </p>
                </div>
                <button onClick={handleExport} className="w-full bg-emerald-900/10 border border-emerald-900/30 text-emerald-600 hover:bg-emerald-900/20 hover:text-emerald-400 px-4 py-3 rounded-lg font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" /> [ GENERATE LEDGER ]
                </button>
            </div>
        </div>
      </section>

      {/* SECTION 5: TERMINATION */}
      <section className="border-t border-white/5 pt-12 flex flex-col items-center text-center">
         <h2 className="text-xs font-bold text-red-900 uppercase tracking-widest mb-4 flex items-center gap-2"><Lock className="w-3 h-3" /> ERASURE PROTOCOL</h2>
         <p className="text-xs text-slate-600 max-w-lg mb-8">
             Proceeding will trigger a cryptographic shredding of your Sovereign Vault. This cannot be undone. All telemetry, history, and AI context will be permanently vaporized from the mesh.
         </p>

         <div className="flex flex-col gap-4 w-full max-w-xs">
             <input
                type="text"
                placeholder="Type 'DELETE MY DATA' to confirm"
                className="bg-red-950/10 border border-red-900/30 text-red-500 text-center placeholder-red-900/40 text-xs px-4 py-3 rounded-lg focus:outline-none focus:border-red-500/50 transition-all font-mono"
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
             />
             <button
                onClick={handleDeleteAccount}
                disabled={deleteConfirmation !== 'DELETE MY DATA'}
                className={`border px-8 py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2
                    ${deleteConfirmation === 'DELETE MY DATA'
                        ? 'bg-red-950/20 border-red-900/30 text-red-500 hover:bg-red-900 hover:text-white cursor-pointer'
                        : 'bg-transparent border-white/5 text-slate-700 cursor-not-allowed'
                    }
                `}
            >
                [ INITIATE BURN ]
            </button>
         </div>
      </section>

    </div>
  );
}
