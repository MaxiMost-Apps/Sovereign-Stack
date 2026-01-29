import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Brain, Shield, TrendingUp, Zap, Fingerprint, Check, ChevronDown, ChevronUp, Watch, Smartphone, Heart, Command, Wifi } from 'lucide-react';
import { Founding500Ticker } from '@/components/Founding500Ticker';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-blue-500/30 overflow-x-hidden">

      {/* 1. HUD HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto backdrop-blur-md bg-black/40 px-4 py-2 rounded-full border border-white/10">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_#3b82f6]" />
            <span className="font-bold tracking-widest text-xs text-slate-200">MAXIMOST</span>
        </div>
        <div className="flex items-center gap-2 pointer-events-auto backdrop-blur-md bg-black/40 px-4 py-2 rounded-full border border-white/10">
            <span className="font-mono text-[10px] text-slate-400">V12.0 :: SYSTEM ONLINE</span>
            <Wifi className="w-3 h-3 text-emerald-500" />
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative pt-40 pb-24 px-6 text-center max-w-5xl mx-auto">
        <motion.div
            animate={{ opacity: [0.4, 0.6, 0.4], scale: [1, 1.1, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -z-10"
        />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          {/* THE HERO PILL (Source of Style) */}
          <div className="flex flex-col items-center gap-4 mb-8">
             <div className="inline-block px-4 py-1.5 rounded-full bg-blue-900/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold tracking-[0.2em] uppercase shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                The Operating System for Sovereignty
             </div>
             <Founding500Ticker />
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-tight">
            FORGE YOUR ELITE HABITS.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">MASTER YOUR MIND.</span>
          </h1>
          <h2 className="text-lg md:text-xl font-bold text-slate-300 max-w-2xl mx-auto mb-6">
            "Stop reading self-help books. You don’t need more motivation; you need a system."
          </h2>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            MaxiMost is your high-performance Command Center. Stop juggling 10 different apps just to manage your day. Align your telemetry and train your Internal Force into a single, ruthless rig. No Fluff. No Drift. Just Data and Discipline.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/auth')}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-lg transition-all shadow-[0_0_30px_rgba(37,99,235,0.3)] border border-blue-400/20"
            >
              Get Started Free
            </motion.button>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('manifesto')?.scrollIntoView({ behavior: 'smooth'})}
                className="px-8 py-4 bg-slate-900/80 text-slate-300 border border-slate-700 rounded-xl font-bold text-lg transition-all backdrop-blur-sm hover:bg-slate-800"
            >
              Read The Manifesto
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* 2.5. CONSOLIDATION BLOCK (PROBLEM/SOLUTION) */}
      <section className="py-24 px-6 bg-[#050505] border-y border-white/5 relative z-20">
          <div className="max-w-5xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-12">
                  YOU DON'T NEED ANOTHER APP.<br/>
                  <span className="text-blue-500">YOU NEED A RIG.</span>
              </h2>

              <div className="grid md:grid-cols-2 gap-12 text-left">
                  <div className="bg-red-900/10 border border-red-500/20 p-8 rounded-3xl">
                      <h3 className="text-red-400 font-bold uppercase tracking-widest text-sm mb-4 flex items-center gap-2">
                          <span className="text-xl">✕</span> The Problem
                      </h3>
                      <p className="text-slate-300 leading-relaxed text-lg">
                          "The current self-improvement world wants you to use 10 different apps to go for a run, journal your thoughts, and track your sleep. That’s not progress; that’s digital noise."
                      </p>
                  </div>

                  <div className="bg-emerald-900/10 border border-emerald-500/20 p-8 rounded-3xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-20">
                          <Command className="w-24 h-24 text-emerald-500" />
                      </div>
                      <h3 className="text-emerald-400 font-bold uppercase tracking-widest text-sm mb-4 flex items-center gap-2">
                          <span className="text-xl">✓</span> The Solution
                      </h3>
                      <p className="text-slate-300 leading-relaxed text-lg relative z-10">
                          "MaxiMost combines your biology, your philosophy, and your execution into one view. Maintain the High Ground. Verify your truth. Execute."
                      </p>
                  </div>
              </div>
          </div>
      </section>

      {/* 3. THE COACHES */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <CoachCard
                title="THE STOIC"
                desc="Calm, reflective, and logical. Focuses on mental clarity."
                color="text-blue-400"
                accent="border-blue-500/40"
                glow="group-hover:shadow-[0_0_40px_rgba(59,130,246,0.2)]"
                image="/images/stoicCC1.png"
            />
            <CoachCard
                title="THE OPERATOR"
                desc="Direct, intense, and action-oriented. Extreme ownership."
                color="text-emerald-400"
                accent="border-emerald-500/40"
                glow="group-hover:shadow-[0_0_40px_rgba(16,185,129,0.2)]"
                image="/images/operatorCC1t.png"
            />
            <CoachCard
                title="THE ALLY"
                desc="Encouraging and supportive. Focuses on sustainable progress."
                color="text-purple-400"
                accent="border-purple-500/40"
                glow="group-hover:shadow-[0_0_40px_rgba(168,85,247,0.2)]"
                image="/images/NurturerCC1.png"
            />
          </div>
        </div>
      </section>

      {/* 4. FEATURE GRID */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-white tracking-tight">Everything You Need to Win</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            icon={Activity} color="text-emerald-400" bg="group-hover:bg-emerald-500/10"
            title="The Shadow Audit"
            // UPDATED COPY
            desc="We don't trust your checkbox; we trust your data. Sync with major platforms to verify your recovery automatically."
          />
          <FeatureCard
            icon={Brain} color="text-indigo-400" bg="group-hover:bg-indigo-500/10"
            title="The AI Council"
            desc="Three distinct intelligences: The Stoic, The Operator, and The Ally. Choose your adviser."
          />
          <FeatureCard
            icon={Shield} color="text-rose-400" bg="group-hover:bg-rose-500/10"
            title="The Drift Protocol"
            desc="Real-time analysis of your consistency. Detect when you are 'drifting' from your path before you fail."
          />
          <FeatureCard
            icon={TrendingUp} color="text-blue-400" bg="group-hover:bg-blue-500/10"
            title="1% Better Every Day"
            desc="Visual analytics to track your compound growth over time."
          />
          <FeatureCard
            icon={Zap} color="text-yellow-400" bg="group-hover:bg-yellow-500/10"
            title="Bio-Rhythm Sync"
            desc="Optimize your schedule based on your chronotype. Push hard when energy is high; recover when it is low."
          />
          <FeatureCard
            icon={Fingerprint} color="text-purple-400" bg="group-hover:bg-purple-500/10"
            title="Identity Architecture"
            desc="Move from 'Goals' to 'Identity.' Every rep is a vote for the person you are becoming."
          />
        </div>
      </section>

      {/* 5. FITNESS INTEGRATION */}
      <section className="py-24 px-6 bg-slate-900/30 border-y border-white/5 backdrop-blur-sm overflow-hidden">
         <div className="max-w-5xl mx-auto">
             <div className="text-center mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">Universal Data Sync</h2>
                {/* UPDATED COPY */}
                <p className="text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                    We aggregate biometrics from every major platform. We are constantly striving for innovation and new partnerships.
                </p>
             </div>

             {/* Terminal Container */}
             <div className="bg-[#0a0a0a] border border-slate-800 rounded-xl p-2 max-w-3xl mx-auto shadow-2xl relative mb-8">
                <div className="flex gap-2 px-4 py-3 border-b border-white/5 bg-black/50">
                    <div className="w-3 h-3 rounded-full bg-red-500/20" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
                </div>
                <DataStreamTerminal />
             </div>

             {/* UPDATED BADGE ORDER: Google, Apple, Fitbit, Samsung, Garmin, Strava, Oura */}
             <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                 <IntegrationPill icon={Smartphone} label="Google" color="border-emerald-500/30 bg-black text-emerald-400" />
                 <IntegrationPill icon={Watch} label="Apple" color="border-blue-500/30 bg-black text-blue-400" />
                 <IntegrationPill icon={Activity} label="Fitbit" color="border-teal-500/30 bg-black text-teal-400" />
                 <IntegrationPill icon={Smartphone} label="Samsung" color="border-blue-400/30 bg-black text-blue-300" />
                 <IntegrationPill icon={Watch} label="Garmin" color="border-orange-500/30 bg-black text-orange-400" />
                 <IntegrationPill icon={TrendingUp} label="Strava" color="border-orange-600/30 bg-black text-orange-500" />
                 <IntegrationPill icon={Activity} label="Oura" color="border-white/20 bg-black text-white" />
             </div>
         </div>
      </section>

      {/* 6. THE MANIFESTO */}
      <section id="manifesto" className="py-32 px-6 bg-[#050505]">
        <div className="max-w-3xl mx-auto text-center space-y-10">
             <h2 className="text-xs font-bold text-slate-500 tracking-[0.3em] uppercase mb-4">THE MANIFESTO</h2>
             <h3 className="text-4xl font-serif text-white font-bold leading-tight">WHY THE WORLD DOESN'T NEED ANOTHER HABIT TRACKER.</h3>

             <div className="text-slate-300 leading-relaxed text-xl font-serif italic max-w-2xl mx-auto border-l-2 border-blue-500 pl-6">
                "We looked at the current landscape and saw two things: 'Nanny Apps' that treat you like a child, and 'Blank Pages' that force you to build your own tools from scratch."
             </div>
             <div className="text-2xl text-white font-black py-4 uppercase tracking-wide">We rejected both.</div>
             <p className="text-slate-400 leading-relaxed text-lg max-w-2xl mx-auto">
                Maximost is built for the <strong>Operator</strong>—the person who wants a system, not a sandbox. The person who wants the cold, hard truth about their performance.
             </p>
             <p className="text-slate-400 leading-relaxed text-lg max-w-2xl mx-auto">
                We rely on <strong>Biological Verification</strong>, not Internal Force. We rely on <strong>Stoic Logic</strong>, not motivation. No fluff. No drift. Just data and discipline.
             </p>

             <div className="pt-12">
                {/* MATCHED HERO STYLING EXACTLY */}
                <span className="inline-block px-6 py-2 rounded-full bg-blue-900/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold tracking-[0.2em] uppercase shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                    NO FLUFF. NO DRIFT. JUST DATA AND DISCIPLINE.
                </span>
             </div>
        </div>
      </section>

      {/* 7. PRICING */}
      <section className="pb-32 px-6 bg-[#050505] pt-12">
          <div className="max-w-6xl mx-auto">
             <div className="text-center mb-16">
                 <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Operational Tiers</h2>
                 <p className="text-slate-400 mt-4">No hidden fees. No cancellation traps. Just pure utility.</p>
             </div>

             <div className="grid md:grid-cols-3 gap-6">

                {/* TIER 1: MONTHLY (Was Operator) - Order: 2 on Desktop, 3 on Mobile? No, Mobile Stacking Fix: Vanguard needs to be above Sign-In (Free?).
                    Current Order in code: Initiate, Vanguard, Operator, Architect.
                    We need: Monthly, Yearly, Lifetime (Vanguard), Sovereign.
                    Wait, that's 4 tiers. Grid is 3 cols. The 4th was spanning on md.
                    Let's reorganize.
                    Proposed: Monthly ($14.99), Yearly ($149.99), Lifetime ($199).
                    Sovereign ($499) as the anchor/whale below or alongside.
                */}

                {/* 1. MONTHLY ($14.99) */}
                <div className="p-8 rounded-3xl border border-blue-900/30 bg-blue-950/5 flex flex-col order-2 md:order-1">
                    <div className="text-blue-500 font-bold uppercase tracking-widest text-xs mb-4">Monthly Protocol</div>
                    <div className="text-4xl font-black text-white mb-2">$14.99</div>
                    <p className="text-slate-500 text-sm mb-8">Per month. Cancel anytime.</p>
                    <ul className="space-y-4 mb-8 flex-1">
                        <CheckItem text="Unlimited Habits" />
                        <CheckItem text="Cloud Sync & Encrypted Vault" />
                        <CheckItem text="AI Coach (The Stoic)" />
                    </ul>
                    <button onClick={() => navigate('/auth')} className="w-full py-4 bg-blue-600/10 border border-blue-500/30 hover:bg-blue-600 hover:text-white text-blue-400 rounded-xl font-bold text-xs uppercase tracking-widest transition-all">
                        Subscribe Monthly
                    </button>
                </div>

                {/* 2. LIFETIME / VANGUARD ($199) - CENTER / MOST POPULAR */}
                {/* Mobile Stacking: "Vanguard card must appear above the Sign-In box".
                    If "Sign-In box" implies the cheaper plans, this should be order-1 on mobile.
                */}
                <div className="p-8 rounded-3xl border border-amber-500/50 bg-amber-950/10 relative transform md:-translate-y-4 shadow-2xl shadow-amber-900/20 flex flex-col order-1 md:order-2 z-10">
                    <div className="absolute top-0 right-0 bg-amber-500 text-black text-[10px] font-black uppercase px-3 py-1 rounded-bl-xl rounded-tr-2xl">Most Popular</div>
                    <div className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-4">Vanguard Edition</div>
                    <div className="text-5xl font-black text-white mb-2">$199</div>
                    <div className="text-amber-400 font-bold text-sm mb-2">LIFETIME ACCESS</div>
                    <p className="text-amber-200/60 text-xs mb-8">+ 1 SCHOLARSHIP GENERATED</p>
                    <ul className="space-y-4 mb-8 flex-1">
                        <CheckItem text="Lifetime Access (No monthly fees)" />
                        <CheckItem text="Founding 500 Status" />
                        <CheckItem text="Priority Integration Voting" />
                        <CheckItem text="You arm a Survivor (1-for-1)" />
                    </ul>
                    <motion.button
                       whileHover={{ scale: 1.02 }}
                       whileTap={{ scale: 0.98 }}
                       onClick={() => navigate('/auth')}
                       className="w-full py-5 bg-amber-600 hover:bg-amber-500 text-black rounded-xl font-black uppercase text-sm tracking-[0.2em] shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                    >
                        Join The Vanguard
                    </motion.button>
                </div>

                {/* 3. YEARLY ($149.99) */}
                <div className="p-8 rounded-3xl border border-emerald-900/30 bg-emerald-950/5 flex flex-col order-3">
                    <div className="text-emerald-500 font-bold uppercase tracking-widest text-xs mb-4">Yearly Commitment</div>
                    <div className="text-4xl font-black text-white mb-2">$149.99</div>
                    <p className="text-emerald-500/60 text-sm mb-8">Save 17% vs Monthly.</p>
                    <ul className="space-y-4 mb-8 flex-1">
                        <CheckItem text="All Monthly Features" />
                        <CheckItem text="Commitment Contract" />
                        <CheckItem text="Advanced Analytics" />
                    </ul>
                    <button onClick={() => navigate('/auth')} className="w-full py-4 bg-emerald-600/10 border border-emerald-500/30 hover:bg-emerald-600 hover:text-white text-emerald-400 rounded-xl font-bold text-xs uppercase tracking-widest transition-all">
                        Commit Yearly
                    </button>
                </div>

                {/* 4. SOVEREIGN ELITE ($499) */}
                <div className="p-8 rounded-3xl border border-red-900/30 bg-red-950/5 flex flex-col opacity-80 hover:opacity-100 transition-opacity md:col-span-3 lg:col-span-3 order-4">
                    <div className="text-center mb-4">
                         <div className="text-red-500 font-bold uppercase tracking-widest text-xs">Sovereign Elite</div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                        <div className="text-4xl font-black text-white">$499</div>
                        <p className="text-slate-500 text-sm">Lifetime Access + Equity in the System. The Anchor Tier.</p>
                         <button className="px-8 py-3 border border-red-900 text-red-800 hover:text-red-500 hover:border-red-500 uppercase font-bold text-xs tracking-widest bg-red-950/20 transition-all">
                            Become Sovereign
                        </button>
                    </div>
                </div>

             </div>
          </div>
      </section>

      {/* 8. FAQ */}
      <section className="py-24 px-6 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
            <FaqItem
                q="How does data integration work?"
                a="We use Terra and Vital API to connect with Oura, Whoop, Fitbit, Garmin, and Strava. For the mobile app launch, we prioritize direct connections with Samsung Health, Google Fit, and Apple Health."
            />
            <FaqItem
                q="How does the AI work? Is it private?"
                a="We operate on a 'Glass Box' philosophy. You can view exactly what the AI 'remembers' about you in your Settings, and delete specific memories instantly. Your journal is encrypted."
            />
            <FaqItem
                q="Does it work offline?"
                a="The core habit tracker is built for speed and works regardless of connection status. AI coaching and Cloud Backup will sync once connection is restored."
            />
            <FaqItem
                q="Is my data safe?"
                a="Your biometric data is stored locally on your device where possible and encrypted in transit. We do not sell your data. We are a subscription business, not an ad business."
            />
             <FaqItem
                q="Who owns my data?"
                a="You do. You can export or delete your entire history at any time from the Settings panel."
            />
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="py-12 border-t border-slate-900 bg-[#020202]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-slate-600 text-xs">
                &copy; {new Date().getFullYear()} MaxiMost. All Rights Reserved.
            </p>
            <div className="flex gap-6">
                <a href="/privacy" className="text-slate-600 hover:text-blue-500 text-xs transition-colors">Privacy Policy</a>
                <a href="/terms" className="text-slate-600 hover:text-blue-500 text-xs transition-colors">Terms of Service</a>
                <a href="/support" className="text-slate-600 hover:text-blue-500 text-xs transition-colors">Support</a>
            </div>
        </div>
      </footer>
    </div>
  );
}

// === SUB-COMPONENTS ===

function DataStreamTerminal() {
    const logs = [
        "INITIALIZING SECURE HANDSHAKE...",
        "DETECTED SOURCE: OURA_RING_V3",
        "> SYNCING SLEEP_SCORE... [84] ... VERIFIED",
        "> SYNCING HRV_BASELINE... [42ms] ... OK",
        "DETECTED SOURCE: GOOGLE_HEALTH_CONNECT",
        "> SYNCING STEPS... [12,432] ... DELTA +4%",
        "CALCULATING DRIFT SCORE... 0.02 (OPTIMAL)",
        "SYSTEM READY. WAITING FOR INPUT..."
    ];

    const [lines, setLines] = useState<string[]>([]);

    useEffect(() => {
        let currentIndex = 0;
        const interval = setInterval(() => {
            // SAFEGUARD: Ensure we never try to access an index that doesn't exist
            if (currentIndex >= 0 && currentIndex < logs.length) {
                setLines(prev => [...prev, logs[currentIndex]]);
                currentIndex++;
            } else {
                setLines([]); // Reset loop
                currentIndex = 0;
            }
        }, 800);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-64 bg-black/80 p-6 font-mono text-xs overflow-hidden flex flex-col justify-end">
            {lines.map((line, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    // SAFEGUARD: Using (line || '') prevents "reading 'includes' of undefined"
                    className={`mb-2 ${(line || '').includes('VERIFIED') || (line || '').includes('OPTIMAL') ? 'text-emerald-400' : 'text-slate-400'}`}
                >
                    <span className="text-slate-600 mr-2">{`[${new Date().toLocaleTimeString()}]`}</span>
                    {line}
                </motion.div>
            ))}
            <motion.div
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="w-2 h-4 bg-blue-500 mt-1"
            />
        </div>
    );
}

function FeatureCard({ icon: Icon, title, desc, color, bg }: any) {
  return (
    <motion.div
        whileHover={{ y: -5, borderColor: 'rgba(255, 255, 255, 0.1)' }}
        className="p-8 rounded-3xl bg-[#0b0c10] border border-white/5 transition-all group hover:bg-[#101115]"
    >
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors shadow-inner bg-black ${bg}`}>
        <Icon className={`w-7 h-7 transition-colors ${color}`} />
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function CoachCard({ title, desc, color, accent, glow, image }: any) {
    return (
        <motion.div
            whileHover={{ scale: 1.02, rotateX: 5, rotateY: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`relative overflow-hidden bg-slate-900 border ${accent} rounded-2xl text-left hover:border-opacity-100 transition-all duration-300 group h-[500px] flex flex-col justify-end shadow-2xl ${glow}`}
            style={{ perspective: 1000 }}
        >
             {image && (
                 <div className="absolute inset-0 z-0">
                     <img
                        src={image}
                        alt={title}
                        className="object-cover h-full w-full grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                 </div>
             )}
            <div className="relative z-20 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <div className="inline-block px-3 py-1 mb-3 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
                     <h3 className={`text-xl font-black italic tracking-tighter ${color}`}>{title}</h3>
                </div>
                <p className="text-slate-200 text-sm font-medium leading-relaxed drop-shadow-md">{desc}</p>
            </div>
        </motion.div>
    );
}

function IntegrationPill({ icon: Icon, label, color }: any) {
    return (
        <motion.div
            whileHover={{ y: -2, backgroundColor: "rgba(30, 41, 59, 1)" }}
            className={`flex items-center gap-2 px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg transition-colors cursor-default ${color ? '' : ''}`}
        >
            <Icon className="w-4 h-4 text-slate-400" />
            <span className={`text-xs font-bold uppercase tracking-wider ${color ? color.split(' ').filter((c:any) => c.startsWith('text-')).join(' ') : 'text-slate-300'}`}>{label}</span>
        </motion.div>
    );
}

function FaqItem({ q, a }: { q: string, a: string }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="bg-[#0b0c10] border border-white/5 rounded-2xl overflow-hidden transition-colors hover:border-white/10">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
            >
                <h4 className={`font-bold pr-4 transition-colors ${isOpen ? 'text-blue-400' : 'text-slate-200'}`}>{q}</h4>
                {isOpen ? <ChevronUp className="text-blue-500 w-5 h-5" /> : <ChevronDown className="text-slate-500 w-5 h-5" />}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-6 pb-6"
                    >
                        <p className="text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-4">{a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function CheckItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3 text-slate-300 text-sm">
      <div className="mt-0.5 p-0.5 rounded-full bg-blue-500/10">
        <Check className="w-4 h-4 text-blue-500 shrink-0" />
      </div>
      <span>{text}</span>
    </li>
  );
}
