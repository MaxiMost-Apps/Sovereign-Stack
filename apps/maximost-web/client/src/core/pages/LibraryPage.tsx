import React, { useState, useEffect } from 'react';
import { Archive as ArchiveIcon, Layers, Plus } from 'lucide-react';
import { cn } from '../../lib/utils';

import { HabitCard } from '../components/HabitCard';
import { Habit } from '@/types/habit';
import { supabase } from '../supabase';
import { useToast } from '../components/Toast';
import { HABIT_ATOMS, PROTOCOL_MOLECULES } from '../config/libraryData';

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState<'habits' | 'stacks'>('habits');
  const [libraryHabits, setLibraryHabits] = useState<any[]>([]);
  const [libraryStacks, setLibraryStacks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // REPAIR ORDER: Check URL Search Params for Tab Default
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    if (tabParam === 'protocols' || tabParam === 'stacks') {
        setActiveTab('stacks');
    }

    const fetchLibrary = async () => {
      try {
        setLoading(true);
        // REPAIR ORDER: Fetch from Render API
        const hResponse = await fetch('https://sovereign-stack.onrender.com/api/habits/library');
        const h = hResponse.ok ? await hResponse.json() : [];

        // Fetch Stacks (Direct Supabase or could be API if exposed)
        const { data: s, error: sError } = await supabase
          .from('maximost_library_protocols')
          .select('*')
          .order('title');

        // Fallback Logic if DB is Empty
        const habitsSource = (h && h.length > 0) ? h : HABIT_ATOMS.map((atom: any, i: number) => ({
            id: `atom-${i}`,
            title: atom.title,
            description: atom.how_instruction,
            category: atom.category,
            metadata: {
                intel: { why: atom.why_instruction, impact: "Bio-Optimization" },
                tactical: { instruction: atom.how_instruction },
                visuals: { icon: atom.icon, theme: atom.theme }
            }
        }));

        const stacksSource = (s && s.length > 0) ? s : PROTOCOL_MOLECULES.map((mol: any, i: number) => ({
            id: `mol-${i}`,
            name: mol.title,
            description: mol.description,
            habits: mol.habits
        }));

        // Map to Habit Interface
        const mappedHabits = habitsSource.map((item: any) => ({
            id: item.id || item.slug,
            title: item.title,
            description: item.description,
            category: item.category,
            icon: item.metadata?.visuals?.icon || 'Activity',
            completed: false,
            metadata: item.metadata,
            slug: item.slug,
            // Pass raw fields for proper card rendering
            type: item.type,
            target_value: item.target_value,
            unit: item.unit
        }));

        setLibraryHabits(mappedHabits);
        setLibraryStacks(stacksSource);

      } catch (err: any) {
        console.error("Library Fetch Error:", err);
        // Fallback
      } finally {
        setLoading(false);
      }
    };

    fetchLibrary();
  }, []);

  const handleQuickImport = async (habit: Habit) => {
      // REPAIR ORDER: Use live API for individual adoption in Archive page too
      try {
          const response = await fetch('https://sovereign-stack.onrender.com/api/habits/adopt', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ slug: habit.slug })
          });

          if (!response.ok) throw new Error('Adoption Failed');
          toast.success(`Protocol [${habit.title}] Deployed.`);
      } catch (error: any) {
          toast.error(error.message);
      }
  };

  const getStackColor = (name: string) => {
      if (name.includes("Atlas")) return "amber";
      if (name.includes("Centenarian")) return "emerald";
      if (name.includes("Iron Mind")) return "red";
      if (name.includes("Neural")) return "blue";
      return "zinc";
  };

  return (

      <div className="p-4 md:p-8 space-y-8 text-zinc-100 max-w-6xl mx-auto mb-20 relative min-h-screen">
        {/* Full Page "Static" Overlay for atmosphere */}
        <div className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0"></div>

        {/* HEADER */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter flex items-center gap-3">
              <ArchiveIcon className="text-zinc-500 w-8 h-8" />
              {/* REPAIR ORDER: ATOM LEDGER */}
              ATOM LEDGER
            </h1>
            <p className="text-zinc-500 mt-1 font-mono text-xs uppercase tracking-widest">The Armory. Equip habits and load protocol stacks.</p>
          </div>

          <div className="flex gap-2 bg-zinc-900/50 p-1 rounded-lg border border-zinc-800 backdrop-blur-sm">
              <button
                  onClick={() => setActiveTab('habits')}
                  className={cn("px-4 py-2 rounded text-xs font-bold uppercase tracking-widest transition-all", activeTab === 'habits' ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white")}
              >
                  Habit Library
              </button>
              <button
                  onClick={() => setActiveTab('stacks')}
                  className={cn("px-4 py-2 rounded text-xs font-bold uppercase tracking-widest transition-all", activeTab === 'stacks' ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white")}
              >
                  Protocol Stacks
              </button>
          </div>
        </div>

        {/* CONTROLS - REPAIR ORDER: REMOVED NEW BUTTONS */}
        {/* <div className="relative z-10 flex justify-end">
          <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-xs uppercase tracking-widest transition-all hover:shadow-[0_0_15px_rgba(37,99,235,0.5)]">
              <Plus className="w-4 h-4" />
              <span>New {activeTab === 'habits' ? 'Habit' : 'Stack'}</span>
          </button>
        </div> */}

        {/* LOADING STATE */}
        {loading && (
            <div className="relative z-10 py-20 flex justify-center text-zinc-500 animate-pulse font-mono uppercase tracking-widest">
                INITIALIZING ARCHIVE UPLINK...
            </div>
        )}

        {/* HABITS GRID */}
        {!loading && activeTab === 'habits' && (
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {libraryHabits.map(habit => (
                  <HabitCard
                      key={habit.id}
                      habit={habit}
                      mode="archive"
                      onQuickImport={handleQuickImport}
                  />
              ))}
              {libraryHabits.length === 0 && (
                  <div className="col-span-full text-center py-20 text-zinc-500 font-mono uppercase">
                      No habits found in the archive.
                  </div>
              )}
          </div>
        )}

        {/* STACKS GRID */}
        {!loading && activeTab === 'stacks' && (
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {libraryStacks.map(stack => {
                  const color = getStackColor(stack.title || stack.name); // Handle title/name ambiguity
                  const borderClass = {
                      amber: "hover:border-amber-500/50",
                      emerald: "hover:border-emerald-500/50",
                      red: "hover:border-red-500/50", // Crimson
                      blue: "hover:border-blue-500/50",
                      zinc: "hover:border-zinc-600"
                  }[color] || "hover:border-zinc-600";

                  const iconColor = {
                      amber: "text-amber-500",
                      emerald: "text-emerald-500",
                      red: "text-red-500",
                      blue: "text-blue-500",
                      zinc: "text-zinc-500"
                  }[color] || "text-zinc-500";

                  return (
                    <div key={stack.stack_id || stack.id} className={`bg-zinc-950/50 backdrop-blur-md border border-zinc-800 p-6 rounded-lg ${borderClass} transition-colors cursor-pointer group relative overflow-hidden`}>
                        {/* Glow Effect */}
                        <div className={`absolute top-0 right-0 w-32 h-32 bg-${color}-500/10 blur-[50px] rounded-full pointer-events-none`} />

                        <div className="flex items-start justify-between mb-4 relative z-10">
                            <div className="p-3 bg-zinc-800/50 rounded-lg text-white border border-zinc-700">
                                <Layers className={`w-6 h-6 ${iconColor} transition-colors`} />
                            </div>
                            <span className="text-[10px] font-mono font-bold text-zinc-500 bg-black/50 px-2 py-1 rounded border border-zinc-800">
                                {stack.habit_slugs ? stack.habit_slugs.length : (stack.habits ? stack.habits.length : 0)} ATOMS
                            </span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-white uppercase tracking-tight relative z-10">{stack.title || stack.name}</h3>
                        <p className="text-sm text-zinc-500 mb-6 leading-relaxed relative z-10">{stack.description}</p>
                        <button className="w-full py-3 bg-white text-black font-bold uppercase tracking-widest text-xs rounded hover:bg-zinc-200 transition-all relative z-10">
                            Load Protocol
                        </button>
                    </div>
                  );
              })}
               {libraryStacks.length === 0 && (
                  <div className="col-span-full text-center py-20 text-zinc-500 font-mono uppercase">
                      No protocols found in the archive.
                  </div>
              )}
          </div>
        )}
      </div>

  );
}
