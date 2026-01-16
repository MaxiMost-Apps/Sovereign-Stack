import React, { useState, useEffect } from 'react';
import { PencilRuler, Briefcase, Wrench, Search, Database, Target, Calendar, Flag, Layers, Zap, Shield, User, Globe, Network, Activity, Cpu, Hammer, Save } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useSearchParams } from 'react-router-dom';
import { HABIT_ATOMS } from '../config/libraryData';
import { useToast } from '../components/Toast';

export default function TheArchitect() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState<'blueprints' | 'toolbelt'>('blueprints');
  const { toast } = useToast();

  // Mission Builder State
  const [missionName, setMissionName] = useState("");
  const [selectedAtom, setSelectedAtom] = useState<any>(null);

  // 4 Laws State
  const [cue, setCue] = useState("");
  const [craving, setCraving] = useState("");
  const [response, setResponse] = useState("");
  const [reward, setReward] = useState("");

  // Kinetic State
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
      if (tabParam === 'toolbelt') setActiveTab('toolbelt');
      else setActiveTab('blueprints');
  }, [tabParam]);

  const handleTabChange = (tab: 'blueprints' | 'toolbelt') => {
      setActiveTab(tab);
      setSearchParams({ tab });
  };

  const handleAtomSelect = (atom: any) => {
      setSelectedAtom(atom);
      setMissionName(atom.title);
      // Auto-populate 4 Laws based on atom data (Mock logic or simple mapping)
      setCue(atom.how_instruction || "Define visual trigger...");
      setCraving("Visualize the outcome: " + (atom.why_instruction || ""));
      setResponse("Reduce friction: Prepare gear the night before.");
      setReward("Immediate dopamine: Mark completion in Ledger.");
  };

  const handleSaveMission = () => {
      setIsSaving(true);
      // Kinetic Impact
      const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2578/2578-preview.mp3"); // Glass impact placeholder
      audio.volume = 0.5;
      audio.play().catch(() => {}); // Ignore auto-play errors

      setTimeout(() => {
          setIsSaving(false);
          toast.success("Mission Architecture Locked");
          // Reset
          setMissionName("");
          setCue("");
          setCraving("");
          setResponse("");
          setReward("");
          setSelectedAtom(null);
      }, 500); // 500ms delay for shake effect
  };

  const toolbeltSections = [
      {
          id: 'bio', title: 'Biological Rig', icon: Activity, color: 'emerald',
          atoms: ['Sleep Architecture', 'Nutritional Biochemistry', 'Kinetic Output', 'Recovery Protocols', 'Hormonal Baseline', 'Sensory Input']
      },
      {
          id: 'mind', title: 'Cognitive Architecture', icon: Brain, color: 'blue',
          atoms: ['Mental Models', 'Focus Mechanics', 'Information Diet', 'Stoic Regulator', 'Learning Algorithms', 'Decision Matrix']
      },
      {
          id: 'flow', title: 'Operational Cadence', icon: Zap, color: 'amber',
          atoms: ['Morning Routine', 'Deep Work Blocks', 'Evening Wind-down', 'Weekly Review', 'Quarterly Audit', 'Time Boxing']
      },
      {
          id: 'space', title: 'Environmental Shield', icon: Shield, color: 'zinc',
          atoms: ['Physical Workspace', 'Digital Hygiene', 'Ambient Conditions', 'Tool Selection', 'Friction Removal', 'Sanctuary Design']
      },
      {
          id: 'network', title: 'Social Dynamics', icon: Network, color: 'purple',
          atoms: ['Inner Circle', 'Mentor Access', 'Peer Group', 'Communication Protocol', 'Value Exchange', 'Boundary Enforcement']
      },
      {
          id: 'future', title: 'Legacy Projection', icon: Flag, color: 'red',
          atoms: ['10-Year Vision', 'Character Definition', 'Skill Acquisition', 'Financial Sovereignty', 'Contribution Impact', 'SEO Meta-Tags']
      }
  ];

  return (
    <div className={cn("p-4 md:p-8 space-y-8 text-zinc-100 max-w-7xl mx-auto min-h-screen", isSaving && "animate-shake")}>
      <style>{`
        @keyframes shake {
            0% { transform: translate(1px, 1px) rotate(0deg); }
            10% { transform: translate(-1px, -2px) rotate(-1deg); }
            20% { transform: translate(-3px, 0px) rotate(1deg); }
            30% { transform: translate(3px, 2px) rotate(0deg); }
            40% { transform: translate(1px, -1px) rotate(1deg); }
            50% { transform: translate(-1px, 2px) rotate(-1deg); }
            60% { transform: translate(-3px, 1px) rotate(0deg); }
            70% { transform: translate(3px, 1px) rotate(-1deg); }
            80% { transform: translate(-1px, -1px) rotate(1deg); }
            90% { transform: translate(1px, 2px) rotate(0deg); }
            100% { transform: translate(1px, -2px) rotate(-1deg); }
        }
        .animate-shake {
            animation: shake 0.5s;
        }
      `}</style>

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-3">
            <PencilRuler className="text-purple-500 w-8 h-8" />
            The Architect
          </h1>
          <p className="text-zinc-500 mt-1 font-mono text-xs uppercase tracking-widest">Design the machine. Engineer the outcome.</p>
        </div>

        {/* TABS */}
        <div className="flex bg-zinc-900/50 p-1 rounded-lg border border-zinc-800 backdrop-blur-sm">
            <button
                onClick={() => handleTabChange('blueprints')}
                className={cn("px-4 py-2 rounded text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2", activeTab === 'blueprints' ? "bg-zinc-800 text-white border border-zinc-700" : "text-zinc-500 hover:text-white")}
            >
                <PencilRuler className="w-3 h-3" />
                Blueprints
            </button>
             <button
                onClick={() => handleTabChange('toolbelt')}
                className={cn("px-4 py-2 rounded text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2", activeTab === 'toolbelt' ? "bg-zinc-800 text-white border border-zinc-700" : "text-zinc-500 hover:text-white")}
            >
                <Wrench className="w-3 h-3" />
                Master Toolbelt
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* LEFT COL: CONTENT */}
          <div className="lg:col-span-2 space-y-8">

            {/* --- TAB A: BLUEPRINTS --- */}
            {activeTab === 'blueprints' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

                    {/* Mission Builder Input */}
                    <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-xl space-y-4 shadow-lg relative overflow-hidden group">
                        {isSaving && <div className="absolute inset-0 bg-white/10 z-50 pointer-events-none mix-blend-overlay" />}

                        <div className="flex justify-between items-center">
                            <h2 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                                <Hammer className="w-4 h-4 text-purple-500" /> Mission Builder
                            </h2>
                            {selectedAtom && <span className="text-[10px] font-mono text-purple-400 bg-purple-900/20 px-2 py-1 rounded border border-purple-900/50">LINKED: {selectedAtom.title}</span>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Protocol Name</label>
                            <input
                                type="text"
                                value={missionName}
                                onChange={(e) => setMissionName(e.target.value)}
                                placeholder="e.g. Morning Iron Protocol"
                                className="w-full bg-zinc-900 border border-zinc-800 rounded p-3 text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition-colors font-mono text-lg"
                            />
                        </div>

                        {/* 4 LAWS DYNAMIC INPUTS */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-zinc-800/50">
                            <LawInput number="1" law="Cue" tactic="Make it Obvious" value={cue} onChange={setCue} />
                            <LawInput number="2" law="Craving" tactic="Make it Attractive" value={craving} onChange={setCraving} />
                            <LawInput number="3" law="Response" tactic="Make it Easy" value={response} onChange={setResponse} />
                            <LawInput number="4" law="Reward" tactic="Make it Satisfying" value={reward} onChange={setReward} />
                        </div>

                        <button
                            onClick={handleSaveMission}
                            disabled={!missionName || isSaving}
                            className="w-full py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold uppercase tracking-widest text-xs rounded transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSaving ? "CRYSTALLIZING..." : <><Save className="w-4 h-4" /> LOCK BLUEPRINT</>}
                        </button>
                    </div>

                    {/* HABIT IDENTITY */}
                    <div className="space-y-4 pt-4 border-t border-zinc-800/50">
                        <div className="flex items-center gap-3">
                            <User className="w-5 h-5 text-purple-500" />
                            <h2 className="text-sm font-bold text-white uppercase tracking-widest">Habit Identity</h2>
                        </div>
                        <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-xl relative overflow-hidden group hover:border-purple-500/30 transition-all">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <User className="w-24 h-24 text-purple-500" />
                            </div>
                            <div className="relative z-10 space-y-4">
                                <p className="text-sm text-zinc-400 font-mono leading-relaxed max-w-2xl">
                                    "The goal is not to read a book, the goal is to become a reader." — Atomic Habits
                                </p>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Who do you wish to become?</label>
                                    <input
                                        type="text"
                                        placeholder="I am the type of person who..."
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded p-3 text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition-colors font-mono"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* --- TAB B: MASTER TOOLBELT --- */}
            {activeTab === 'toolbelt' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {toolbeltSections.map((section) => (
                        <div key={section.id} className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-all group">
                            {/* Section Header */}
                            <div className="p-4 border-b border-zinc-800 bg-zinc-900/50 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`p-1.5 rounded bg-${section.color}-500/10 text-${section.color}-500`}>
                                        <section.icon className="w-4 h-4" />
                                    </div>
                                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">{section.title}</h3>
                                </div>
                            </div>

                            {/* 6 Atoms Grid */}
                            <div className="p-4 grid grid-cols-1 gap-2">
                                {section.atoms.map((atom, i) => (
                                    <div key={i} className="flex items-center gap-3 p-2 rounded hover:bg-zinc-900 cursor-pointer group/atom transition-colors">
                                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-800 group-hover/atom:bg-white transition-colors" />
                                        <span className="text-xs text-zinc-500 font-mono group-hover/atom:text-zinc-300">{atom}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
          </div>

          {/* RIGHT COL: ATOMIC SIDEBAR (Suggestion Engine) */}
          <div className="hidden lg:block sticky top-8 h-[calc(100vh-100px)] overflow-hidden flex flex-col bg-zinc-950/50 border border-zinc-800 rounded-xl backdrop-blur-sm">
              <div className="p-4 border-b border-zinc-800 bg-zinc-900/80">
                  <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                      <Database className="w-4 h-4 text-blue-500" /> 42-Atom Ledger
                  </h3>
              </div>
              <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-hide">
                  {HABIT_ATOMS.map((atom: any, i: number) => (
                      <button
                          key={i}
                          onClick={() => handleAtomSelect(atom)}
                          className={cn(
                              "w-full text-left px-3 py-2 rounded text-xs font-mono transition-all flex items-center justify-between group border border-transparent",
                              selectedAtom?.title === atom.title
                                ? "bg-blue-900/20 text-blue-400 border-blue-500/50"
                                : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900"
                          )}
                      >
                          <span className="truncate">{atom.title}</span>
                          <span className="opacity-0 group-hover:opacity-100 text-[9px] uppercase tracking-wider text-zinc-600 transition-opacity">LOAD</span>
                      </button>
                  ))}
              </div>
          </div>

      </div>
    </div>
  );
}

const LawInput = ({ number, law, tactic, value, onChange }: any) => (
    <div className="space-y-1">
        <div className="flex justify-between text-[10px] uppercase font-bold text-zinc-600">
            <span>{number}. {law}</span>
            <span>{tactic}</span>
        </div>
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-black border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors font-mono placeholder-zinc-800"
            placeholder={`Define ${law}...`}
        />
    </div>
);

// Icon Helper
import { Brain } from 'lucide-react';
