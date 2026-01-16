import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Download, Trash2, Shield, Activity, Brain, Heart, CheckCircle, Database, Zap, RefreshCw, ChevronDown, ChevronUp, ArrowLeft, Clock, Monitor, Plus, FileUp, HardDrive } from 'lucide-react';
import { supabase } from '../supabase';
import { useAuth } from '../AuthSystem';
import { useAIContext } from '../context/AIContext';
import { useNavigate } from 'react-router-dom';

import { DEMO_HABITS } from '../config/demoData';

export default function VaultSettings() {
  const { user } = useAuth();
  const { neuralConfig, updateConfig } = useAIContext();
  const navigate = useNavigate();

  // -- STATE --
  const [activeCoach, setActiveCoach] = useState('stoic');
  const [dayEndOffset, setDayEndOffset] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [startOfWeek, setStartOfWeek] = useState('MONDAY');

  // Dirty Checking
  const [originalSettings, setOriginalSettings] = useState({ coach: 'stoic', offset: 0, motion: false, startOfWeek: 'MONDAY' });
  const hasChanges = activeCoach !== originalSettings.coach || dayEndOffset !== originalSettings.offset || reducedMotion !== originalSettings.motion || startOfWeek !== originalSettings.startOfWeek;

  // Status & Data
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  // Memory
  const [showMemory, setShowMemory] = useState(false);
  const [newMemoryInput, setNewMemoryInput] = useState("");

  // Sync Input with Context
  useEffect(() => {
      setNewMemoryInput(neuralConfig || "");
  }, [neuralConfig]);

  // -- LOAD --
  useEffect(() => {
    if (!user) return;
    const loadProfile = async () => {
      // 1. Primary Source: Profiles
      let { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();

      // 2. Legacy Migration Check (If profile is missing critical data or doesn't exist)
      if (!profile) {
         console.log("Migration: Checking legacy user_settings...");
         const { data: legacy } = await supabase.from('user_settings').select('*').eq('user_id', user.id).single();

         if (legacy) {
             console.log("Migration: Found legacy data. Porting to profiles...");
             // MIGRATE
             const payload = {
                 id: user.id,
                 coach_preference: legacy.coach_preference || 'stoic',
                 day_end_offset: legacy.day_end_offset || 0,
                 reduced_motion: legacy.reduced_motion || false,
                 start_of_week: 'MONDAY', // Default for legacy
                 updated_at: new Date().toISOString()
             };

             // Write to Profiles
             const { data: newProfile, error } = await supabase.from('profiles').upsert(payload).select().single();

             if (!error && newProfile) {
                 profile = newProfile;
                 // DESTROY LEGACY (Prevent Split Brain)
                 await supabase.from('user_settings').delete().eq('user_id', user.id);
                 console.log("Migration: Legacy table cleared.");
             }
         }
      }

      if (profile) {
        setActiveCoach(profile.coach_preference || 'stoic');
        setDayEndOffset(profile.day_end_offset || 0);
        setReducedMotion(profile.reduced_motion || false);
        setStartOfWeek(profile.start_of_week || 'MONDAY');
        setOriginalSettings({
            coach: profile.coach_preference || 'stoic',
            offset: profile.day_end_offset || 0,
            motion: profile.reduced_motion || false,
            startOfWeek: profile.start_of_week || 'MONDAY'
        });
        localStorage.setItem('activeCoach', profile.coach_preference || 'stoic');
      }

    };
    loadProfile();
  }, [user]);

  // -- ACTIONS --

  const handleSave = async () => {
    if (!user) return;
    try {
      setLoading(true);
      setStatusMsg('Syncing to Cloud...');

      // 1. DB Update (Targeting profiles - Consolidated Persistence)
      try {
          const { error } = await supabase.from('profiles').upsert({
                id: user.id,
                coach_preference: activeCoach || 'stoic',
                day_end_offset: dayEndOffset || 0,
                reduced_motion: reducedMotion || false,
                start_of_week: startOfWeek || 'MONDAY',
                updated_at: new Date().toISOString()
            });

          if (error) throw error;

          // 2. Local Sync
          localStorage.setItem('activeCoach', activeCoach || 'stoic');
          window.dispatchEvent(new Event('storage'));

          // 3. Reset Dirty State
          setOriginalSettings({ coach: activeCoach, offset: dayEndOffset, motion: reducedMotion, startOfWeek: startOfWeek });
          setStatusMsg('System Configuration Locked.');
          setTimeout(() => setStatusMsg(''), 3000);
      } catch (error: any) {
          // 3.1 Kill the Ghost Offline State
          if (!navigator.onLine || error.status >= 500) {
               // GENUINE OFFLINE / SERVER DOWN
               console.warn("Cloud connection failed. Engaging Local Ledger (Sump Pump).");
               const currentQueue = JSON.parse(localStorage.getItem('offline_queue') || '[]');
               currentQueue.push({ type: 'SETTINGS_UPDATE', payload: { activeCoach, dayEndOffset, reducedMotion, startOfWeek }, timestamp: Date.now() });
               localStorage.setItem('offline_queue', JSON.stringify(currentQueue));

               setStatusMsg('⚠️ Network Offline. Settings Queued.');
               // Still update local state for UX continuity
               setOriginalSettings({ coach: activeCoach, offset: dayEndOffset, motion: reducedMotion, startOfWeek: startOfWeek });
          } else if (error.status >= 400 || error.code) {
               // LOGIC ERROR (e.g., RLS, Invalid Data)
               console.error("Sync Failed:", error.message);
               setStatusMsg(`Sync Failed: ${error.message}`);
               // Don't update local state, force user to see error
          }
      }

    } catch (err) {
      console.error('Save error:', err);
      setStatusMsg('Error Saving');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNeural = async () => {
      // Trigger global context update (Writes to DB)
      await updateConfig(newMemoryInput);
      setStatusMsg('Neural Archives Updated.');
      setTimeout(() => setStatusMsg(''), 3000);
  };

  const handleGenerateData = async () => {
    if (!user) return;
    // Safety check
    if(!confirm("This will erase current habits and load the 'Golden Set' demo data. Continue?")) return;

    setLoading(true);
    setStatusMsg("Wiping Old Data...");

    try {
        // A. WIPE OLD HABITS (Clean Slate)
        await supabase.from('habits').delete().eq('user_id', user.id);

        setStatusMsg("Injecting Protocols...");

        // B. INSERT GOLDEN SET
        const habitsToInsert = DEMO_HABITS.map(h => ({
            ...h,
            user_id: user.id,
            created_at: new Date().toISOString()
        }));

        const { error } = await supabase.from('habits').insert(habitsToInsert);
        if (error) throw error;

        setStatusMsg("System Online. Redirecting...");

        // C. REFRESH DASHBOARD
        setTimeout(() => {
            window.location.href = '/dashboard';
        }, 1500);

    } catch (e) {
        console.error("Demo Error:", e);
        setStatusMsg("Error Loading Data");
    } finally {
        setLoading(false);
    }
  };

  const handleExport = () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ profile: originalSettings, neuralConfig }));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", "maximost_sovereign_archive.json");
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
  };

  const coaches = [
    { id: 'stoic', name: 'The Stoic', color: 'blue', img: 'stoicCC1', desc: 'Logic, Clarity, Endurance', icon: Shield },
    { id: 'operator', name: 'The Operator', color: 'emerald', img: 'operatorCC1t', desc: 'Discipline, Tactics, Action', icon: Activity },
    { id: 'ally', name: 'The Ally', color: 'purple', img: 'NurturerCC1', desc: 'Support, Systems, Patience', icon: Heart }
  ];

  return (

    <div className="p-6 max-w-5xl mx-auto space-y-16 pb-40">
        <div className="fixed top-20 right-6 text-[10px] text-slate-700 font-mono">
            Settings Module v2.0
        </div>

      {/* Header */}
      <div className="flex flex-col gap-4">
        <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors w-fit group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-widest">Back to Command</span>
        </button>
        <div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">System Configuration</h1>
            <p className="text-slate-400">Manage your AI integration, day boundaries, and sovereign vault.</p>
        </div>
      </div>

      {/* 1. SYSTEM PREFERENCES */}
      <section>
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
          <Monitor className="w-4 h-4" /> Global Preferences
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#0b0c10] border border-white/5 p-6 rounded-xl flex items-center justify-between">
                <div>
                    <h3 className="text-white font-bold text-sm flex items-center gap-2"><Clock className="w-4 h-4 text-blue-500" /> Day End Offset</h3>
                    <p className="text-xs text-slate-500 mt-1">Extend "Today" past midnight.</p>
                </div>
                <div className="flex gap-2">
                    {[0, 2, 4].map(hour => (
                        <button key={hour} onClick={() => setDayEndOffset(hour)} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${dayEndOffset === hour ? 'bg-blue-600 text-white border-blue-500' : 'bg-transparent text-slate-500 border-slate-800'}`}>{hour === 0 ? '12 AM' : `+${hour}H`}</button>
                    ))}
                </div>
            </div>
            <div className="bg-[#0b0c10] border border-white/5 p-6 rounded-xl flex items-center justify-between">
                <div>
                    <h3 className="text-white font-bold text-sm flex items-center gap-2"><Zap className="w-4 h-4 text-yellow-500" /> UI Dynamics</h3>
                    <p className="text-xs text-slate-500 mt-1">Enable pulse effects and motion.</p>
                </div>
                <button onClick={() => setReducedMotion(!reducedMotion)} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all border ${!reducedMotion ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/50' : 'bg-transparent text-slate-500 border-slate-800'}`}>{!reducedMotion ? 'ON' : 'OFF'}</button>
            </div>

            {/* Start of Week Toggle */}
            <div className="bg-[#0b0c10] border border-white/5 p-6 rounded-xl flex items-center justify-between col-span-1 md:col-span-2">
                <div>
                    <h3 className="text-white font-bold text-sm flex items-center gap-2"><Clock className="w-4 h-4 text-purple-500" /> Start of Week</h3>
                    <p className="text-xs text-slate-500 mt-1">Determine your calendar's anchor day.</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => setStartOfWeek('SUNDAY')} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all border ${startOfWeek === 'SUNDAY' ? 'bg-purple-600 text-white border-purple-500' : 'bg-transparent text-slate-500 border-slate-800'}`}>SUNDAY</button>
                    <button onClick={() => setStartOfWeek('MONDAY')} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all border ${startOfWeek === 'MONDAY' ? 'bg-purple-600 text-white border-purple-500' : 'bg-transparent text-slate-500 border-slate-800'}`}>MONDAY</button>
                </div>
            </div>
        </div>
      </section>

      {/* 2. AI PERSONA */}
      <section>
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
          <Brain className="w-4 h-4" /> AI Persona Protocol
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {coaches.map((c) => {
            const isSelected = activeCoach === c.id;
            return (
              <motion.div
                key={c.id}
                onClick={() => setActiveCoach(c.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative cursor-pointer rounded-2xl border-2 h-64 overflow-hidden group transition-all ${isSelected ? `border-${c.color}-500 shadow-[0_0_30px_rgba(0,0,0,0.5)]` : 'border-white/5 opacity-60 hover:opacity-100'}`}
              >
                <div className="absolute inset-0 z-0">
                   <img src={`/images/${c.img}.png`} className={`w-full h-full object-cover transition-all duration-700 ${isSelected ? 'grayscale-0 scale-110' : 'grayscale'}`} />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                   {isSelected && (
                       <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md mb-2`}>
                          <c.icon className={`w-3 h-3 text-${c.color}-400`} />
                          <span className={`text-[10px] font-bold uppercase tracking-wider text-${c.color}-400`}>Active Protocol</span>
                       </div>
                   )}
                   <h3 className={`text-2xl font-black italic uppercase tracking-tighter ${isSelected ? 'text-white' : 'text-slate-300'}`}>{c.name}</h3>
                   <p className="text-xs text-slate-400 font-medium mt-1">{c.desc}</p>
                </div>
                {isSelected && <div className={`absolute top-4 right-4 bg-${c.color}-500 text-black p-1.5 rounded-full shadow-lg`}><CheckCircle className="w-5 h-5" /></div>}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 3. NEURAL ARCHIVES */}
      <section className="border-t border-white/5 pt-12">
         <div className="flex justify-between items-end mb-6">
            <div>
                <h2 className="text-xs font-bold text-purple-500 uppercase tracking-widest mb-2 flex items-center gap-2"><Database className="w-4 h-4" /> Neural Archives</h2>
                <p className="text-sm text-slate-400">Inject specific memories or context for the AI to reference.</p>
            </div>
            <button onClick={() => setShowMemory(!showMemory)} className="text-purple-400 text-xs font-bold uppercase hover:text-purple-300 flex items-center gap-1">
                {showMemory ? 'Hide Memory' : 'View Memory'} {showMemory ? <ChevronUp className="w-3 h-3"/> : <ChevronDown className="w-3 h-3"/>}
            </button>
         </div>

         <AnimatePresence>
            {showMemory && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="bg-[#0b0c10] border border-white/10 rounded-xl p-6 overflow-hidden">
                    <div className="flex gap-4 mb-2">
                        <textarea
                            rows={6}
                            value={newMemoryInput}
                            onChange={(e) => setNewMemoryInput(e.target.value)}
                            placeholder="Target Parameters: Define mission-critical context (e.g., 'Currently managing a $2M liquidity transition. Prioritize cognitive endurance over physical output for the next 14 days.')"
                            className="flex-1 bg-black/50 border border-white/10 rounded-lg p-4 text-sm text-white focus:border-purple-500 focus:outline-none resize-none"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button onClick={handleSaveNeural} className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-lg font-bold text-xs uppercase tracking-wide flex items-center gap-2">
                            <Save className="w-4 h-4" /> Save Context
                        </button>
                    </div>
                </motion.div>
            )}
         </AnimatePresence>
      </section>

      {/* 4. SOVEREIGN VAULT PROTOCOL */}
      <section className="border-t border-white/5 pt-12">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2"><Shield className="w-4 h-4" /> SOVEREIGN VAULT PROTOCOL</h2>
        <p className="text-xs text-slate-500 mb-6 max-w-3xl leading-relaxed">
            MaxiMost operates on a Zero-Knowledge Architecture. Your data is encrypted locally before it touches our pipes. We don't just 'not sell' your data—we physically cannot see it. You are the sole Operator.
        </p>

        <div className="space-y-4">
            {/* THE INFILTRATION MODULE */}
            <div className="p-8 border-2 border-dashed border-white/10 rounded-xl bg-black/20 hover:border-blue-500/30 transition-all flex flex-col items-center justify-center text-center group cursor-pointer">
                <FileUp className="w-8 h-8 text-slate-600 mb-4 group-hover:text-blue-500 transition-colors" />
                <h3 className="text-lg font-black text-white uppercase tracking-tight mb-1">CONFIG YOUR RIG</h3>
                <p className="text-xs text-slate-500 mb-6 max-w-md">Migrating from the fragmented past? Drag your Apple Health XML, Oura CSV, or Notion JSON here. The Rig will auto-parse your history into the Archive.</p>
                <button className="bg-slate-800 text-slate-300 px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">
                    [ INITIATE MIGRATION ]
                </button>
            </div>

            {/* THE MASTER LEDGER */}
            <div className="flex items-center justify-between p-6 rounded-xl border border-white/5 bg-white/[0.02]">
                <div>
                    <h3 className="text-white font-bold mb-1 flex items-center gap-2"><HardDrive className="w-4 h-4 text-emerald-500" /> GENERATE MASTER LEDGER</h3>
                    <p className="text-xs text-slate-500 max-w-xl">Extract your entire biometric, financial, and cognitive history into a universal format (JSON/CSV). Total portability. No lock-in. No friction.</p>
                </div>
                <button onClick={handleExport} className="text-[10px] font-bold text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 rounded-lg hover:bg-emerald-500 hover:text-black transition-all flex items-center gap-2">
                    <Download className="w-3 h-3" /> REQUEST ARCHIVE
                </button>
            </div>

            {/* SYSTEM RESYNC */}
            <div className="flex items-center justify-between p-6 bg-slate-800/20 border border-white/5 rounded-xl hover:bg-slate-800/40 transition-colors">
                <div>
                    <h4 className="text-slate-200 font-bold text-sm">SYSTEM RESYNC</h4>
                    <p className="text-slate-500 text-xs mt-1">Clears local display cache and re-downloads your data from the Sovereign Vault. No history or logs will be removed.</p>
                </div>
                <button onClick={() => { localStorage.clear(); window.location.reload(); }} className="text-slate-400 hover:text-white transition-colors">
                    <RefreshCw className="w-5 h-5" />
                </button>
            </div>

            {/* THE BURN PROTOCOL */}
            <div className="flex flex-col items-end pt-12 border-t border-white/5 mt-8">
                <h3 className="text-red-500 font-black uppercase tracking-widest text-xs mb-2">TOTAL ERASURE PROTOCOL</h3>
                <p className="text-xs text-slate-500 text-right max-w-xl mb-4">Proceeding will trigger a cryptographic shredding of your Sovereign Vault. This cannot be undone. All telemetry, history, and AI context will be permanently vaporized from the mesh.</p>
                <button
                    onClick={() => {
                        const confirmText = prompt("Type 'DELETE MY DATA' to confirm irreversible destruction of your account:");
                        if (confirmText === 'DELETE MY DATA') {
                            if(user) {
                                localStorage.clear();
                                window.location.href = '/login';
                            }
                        }
                    }}
                    className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all"
                >
                    [ INITIATE BURN ]
                </button>
            </div>
        </div>
      </section>

      {/* FIXED BOTTOM STATUS BAR */}
      <motion.div
        className="fixed bottom-6 right-6 left-6 md:left-72 bg-[#0b0c10] border border-blue-500/20 p-4 rounded-xl flex justify-between items-center shadow-2xl z-50"
        initial={{ y: 100 }}
        animate={{ y: hasChanges ? 0 : 100 }}
      >
        <div className="text-sm text-slate-300"><span className="text-blue-400 font-bold mr-2">●</span> Unsaved Changes</div>
        <button onClick={handleSave} disabled={loading} className="px-6 py-2 rounded-lg font-bold uppercase tracking-wider text-xs bg-blue-600 hover:bg-blue-500 text-white shadow-lg transition-all flex items-center gap-2">
          {loading ? 'Saving...' : 'Save & Sync'}
        </button>
      </motion.div>

      {/* GLOBAL STATUS TOAST (Shows 'System Updated' etc) */}
      <AnimatePresence>
        {statusMsg && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="fixed bottom-24 right-6 bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 px-4 py-2 rounded-lg font-bold text-xs backdrop-blur-md z-50">
                {statusMsg}
            </motion.div>
        )}
      </AnimatePresence>

    </div>

  );
}
