import React from 'react';

import { BookOpen, Shield, Battery, Activity, Database, Flame, Zap, Anchor, Moon } from 'lucide-react';

export default function LexiconPage() {
  return (

      <div className="max-w-4xl mx-auto p-4 md:p-8 text-zinc-300 space-y-12 mb-20">

        {/* HEADER */}
        <div className="border-b border-zinc-800 pb-8">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase flex items-center gap-4 mb-4">
            <BookOpen className="w-10 h-10 text-blue-500" />
            The Lexicon
          </h1>
          <p className="text-lg text-zinc-500 max-w-2xl">
            The official glossary of the Sovereign System. Language shapes reality. We speak with precision to execute with violence.
          </p>
        </div>

        {/* SECTION I: D.A.S.H. */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white uppercase tracking-widest border-l-4 border-blue-500 pl-4">
            I. THE D.A.S.H. PROTOCOL (Hierarchy of Execution)
          </h2>
          <p className="text-zinc-400">
            We don't just "do things." We execute through the D.A.S.H. layers, moving from the macro to the microscopic.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800">
              <span className="text-4xl font-black text-blue-600 block mb-2">D</span>
              <h3 className="text-xl font-bold text-white mb-1">Day</h3>
              <p className="text-sm">The primary temporal window of engagement.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800">
              <span className="text-4xl font-black text-blue-600 block mb-2">A</span>
              <h3 className="text-xl font-bold text-white mb-1">Atom</h3>
              <p className="text-sm">The smallest possible unit of action (e.g., "Put on your shoes").</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800">
              <span className="text-4xl font-black text-blue-600 block mb-2">S</span>
              <h3 className="text-xl font-bold text-white mb-1">Step</h3>
              <p className="text-sm">The immediate physical movement required to initiate momentum.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800">
              <span className="text-4xl font-black text-blue-600 block mb-2">H</span>
              <h3 className="text-xl font-bold text-white mb-1">Habit</h3>
              <p className="text-sm">The permanent "firmware" of your identity once a task becomes automatic.</p>
            </div>
          </div>
          <p className="text-center font-mono text-blue-400 text-sm uppercase tracking-widest mt-4">Slogan: "One DASH at a time."</p>
        </section>

        {/* SECTION II: WORD REPLACEMENT */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white uppercase tracking-widest border-l-4 border-red-500 pl-4">
            II. WORD REPLACEMENT PROTOCOL (The Savage Filter)
          </h2>
          <p className="text-zinc-400">
            The system explicitly kills "soft" terminology in favor of "tactical" language to harden the user's psychology.
          </p>

          <div className="overflow-hidden rounded-lg border border-zinc-800">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-900 text-zinc-500 font-bold uppercase text-xs">
                <tr>
                  <th className="p-4">Kill These Words (Soft)</th>
                  <th className="p-4 text-emerald-500">Use These Instead (Tactical)</th>
                  <th className="p-4">Contextual Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 bg-black">
                <tr>
                  <td className="p-4 text-red-400 line-through decoration-red-500/50">Journaling</td>
                  <td className="p-4 text-emerald-400 font-bold">AAR (After-Action Report)</td>
                  <td className="p-4 text-zinc-500">Performance audit, not feelings.</td>
                </tr>
                <tr>
                  <td className="p-4 text-red-400 line-through decoration-red-500/50">Habit Tracker</td>
                  <td className="p-4 text-emerald-400 font-bold">Tactical Protocol</td>
                  <td className="p-4 text-zinc-500">Biological operating procedure.</td>
                </tr>
                <tr>
                  <td className="p-4 text-red-400 line-through decoration-red-500/50">To-Do List</td>
                  <td className="p-4 text-emerald-400 font-bold">Mission Orders</td>
                  <td className="p-4 text-zinc-500">Strategic, non-negotiable objectives.</td>
                </tr>
                <tr>
                  <td className="p-4 text-red-400 line-through decoration-red-500/50">Routine</td>
                  <td className="p-4 text-emerald-400 font-bold">The Rig</td>
                  <td className="p-4 text-zinc-500">The mechanical structure of your day.</td>
                </tr>
                <tr>
                  <td className="p-4 text-red-400 line-through decoration-red-500/50">Goals</td>
                  <td className="p-4 text-emerald-400 font-bold">Objectives</td>
                  <td className="p-4 text-zinc-500">Specific tactical targets.</td>
                </tr>
                <tr>
                  <td className="p-4 text-red-400 line-through decoration-red-500/50">Failed</td>
                  <td className="p-4 text-emerald-400 font-bold">Data Point</td>
                  <td className="p-4 text-zinc-500">Analyze and adjust; no room for shame.</td>
                </tr>
                <tr>
                  <td className="p-4 text-red-400 line-through decoration-red-500/50">Motivation</td>
                  <td className="p-4 text-emerald-400 font-bold">Momentum / Discipline</td>
                  <td className="p-4 text-zinc-500">Physical state vs. fleeting emotion.</td>
                </tr>
                <tr>
                  <td className="p-4 text-red-400 line-through decoration-red-500/50">Preferences</td>
                  <td className="p-4 text-emerald-400 font-bold">Neural Bridge Config</td>
                  <td className="p-4 text-zinc-500">System-level configuration.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION III: METRICS */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white uppercase tracking-widest border-l-4 border-yellow-500 pl-4">
            III. CORE METRICS & METAPHORS
          </h2>

          <div className="space-y-4">
            <div className="p-6 bg-zinc-900/30 rounded-lg flex gap-4">
                <Battery className="w-8 h-8 text-yellow-500 shrink-0" />
                <div>
                    <h3 className="font-bold text-white text-lg">The Willpower Battery</h3>
                    <p className="text-zinc-400 text-sm mt-1">Our core metaphor; willpower is a finite resource that drains like a battery. The OS exists to automate your life so you don't waste "juice" on trivial decisions.</p>
                </div>
            </div>

            <div className="p-6 bg-zinc-900/30 rounded-lg flex gap-4">
                <Activity className="w-8 h-8 text-blue-500 shrink-0" />
                <div>
                    <h3 className="font-bold text-white text-lg">The Force Indicator</h3>
                    <p className="text-zinc-400 text-sm mt-1">A visual dashboard metric that tracks total daily momentum (Force = Mass x Acceleration). It measures output across Kinetic, Creation, and Restoration.</p>
                </div>
            </div>

            <div className="p-6 bg-zinc-900/30 rounded-lg flex gap-4">
                <Shield className="w-8 h-8 text-red-500 shrink-0" />
                <div>
                    <h3 className="font-bold text-white text-lg">The Iron Mind Metric</h3>
                    <p className="text-zinc-400 text-sm mt-1">A "Stress Score" tracking how many times you chose the "Hard Path" over the path of least resistance.</p>
                </div>
            </div>

            <div className="p-6 bg-zinc-900/30 rounded-lg flex gap-4">
                <Flame className="w-8 h-8 text-orange-500 shrink-0" />
                <div>
                    <h3 className="font-bold text-white text-lg">Taking Souls</h3>
                    <p className="text-zinc-400 text-sm mt-1">A status indicator triggered when exceeding a target goal by a significant margin (e.g., 200% completion).</p>
                </div>
            </div>
          </div>
        </section>

        {/* SECTION IV: INFRASTRUCTURE */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white uppercase tracking-widest border-l-4 border-purple-500 pl-4">
            IV. SYSTEM INFRASTRUCTURE (The Map)
          </h2>
          <ul className="grid gap-4 list-none">
            <li className="bg-black border border-zinc-800 p-4 rounded text-sm">
                <strong className="text-white block mb-1 text-base">The Dash</strong>
                The primary Command Dashboard designed for "at-a-glance" situational awareness.
            </li>
            <li className="bg-black border border-zinc-800 p-4 rounded text-sm">
                <strong className="text-white block mb-1 text-base">The Ledger</strong>
                The consolidated historical record merging the Journal (AARs) and Progress (Charts) into one timeline.
            </li>
            <li className="bg-black border border-zinc-800 p-4 rounded text-sm">
                <strong className="text-white block mb-1 text-base">The Vault</strong>
                Encrypted storage for Neural Archives and Telemetry Uplinks (Whoop/Oura); the "engine room".
            </li>
            <li className="bg-black border border-zinc-800 p-4 rounded text-sm">
                <strong className="text-white block mb-1 text-base">The Archive</strong>
                The "Armory" containing all Habit Atoms and Protocol Molecules (Stacks).
            </li>
            <li className="bg-black border border-zinc-800 p-4 rounded text-sm">
                <strong className="text-white block mb-1 text-base">The Ghost Protocol</strong>
                Backend fail-safe logic that returns safe "Zero" values if external APIs fail to sync.
            </li>
          </ul>
        </section>

        {/* SECTION V: SPECTRUM */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white uppercase tracking-widest border-l-4 border-emerald-500 pl-4">
            V. THE CATEGORY SPECTRUM
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
             <div className="p-4 border border-emerald-900/50 bg-emerald-950/10 rounded-lg">
                 <div className="flex items-center gap-2 mb-2 text-emerald-500 font-bold uppercase tracking-widest">
                     <Activity className="w-4 h-4" /> Kinetic
                 </div>
                 <p className="text-xs text-emerald-400/70">Physical/biological movement habits (e.g., Cold Plunge, Lifting).</p>
             </div>

             <div className="p-4 border border-violet-900/50 bg-violet-950/10 rounded-lg">
                 <div className="flex items-center gap-2 mb-2 text-violet-500 font-bold uppercase tracking-widest">
                     <Zap className="w-4 h-4" /> Creation
                 </div>
                 <p className="text-xs text-violet-400/70">Deep work and building habits (e.g., Coding, Writing).</p>
             </div>

             <div className="p-4 border border-amber-900/50 bg-amber-950/10 rounded-lg">
                 <div className="flex items-center gap-2 mb-2 text-amber-500 font-bold uppercase tracking-widest">
                     <Moon className="w-4 h-4" /> Restoration
                 </div>
                 <p className="text-xs text-amber-400/70">Recovery, sleep, and mental maintenance (e.g., IF, Sauna).</p>
             </div>
          </div>
        </section>

      </div>

  );
}
