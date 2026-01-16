import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Shield, Star, Users, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../AuthSystem';


export default function ManifestoPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (

    <div className="min-h-screen bg-[#050505] text-slate-200 font-mono selection:bg-green-500/30 overflow-x-hidden p-6 md:p-12 leading-relaxed pb-40">

      {/* HEADER */}
      <div className="max-w-4xl mx-auto mb-16 border-b border-green-900/30 pb-8">
         <button
            onClick={() => navigate(user ? '/dashboard' : '/')}
            className="flex items-center gap-2 text-green-700 hover:text-green-500 transition-colors mb-8 text-xs font-bold uppercase tracking-[0.2em]"
         >
            <ArrowLeft className="w-3 h-3" /> {user ? "Return to Command" : "Return to Base"}
         </button>

         <div className="inline-block px-2 py-1 mb-4 border border-green-500/30 text-green-500 text-[10px] uppercase tracking-widest font-bold bg-green-900/10">
            CLASSIFIED // EYES ONLY
         </div>

         <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter uppercase">THE MANIFESTO</h1>
         <h2 className="text-xl md:text-2xl font-bold text-green-500 uppercase tracking-widest">NO FLUFF. NO DRIFT. JUST DATA AND DISCIPLINE.</h2>
      </div>

      {/* CONTENT */}
      <div className="max-w-3xl mx-auto space-y-16 text-lg text-slate-400">

         <section>
            <h3 className="text-white font-bold uppercase tracking-widest border-l-4 border-red-500 pl-4 mb-6">The Problem: Knowledge Hoarding</h3>
            <p className="mb-4">
               Stop reading. Start Forging. It is 2026. The world doesn’t need another self-help book. It needs an Operating System. You have been Knowledge Hoarding—collecting books, podcasts, and theories like trophies while your life drifts. Your bookshelf is full, but your dashboard is empty.
            </p>
            <p className="text-white font-bold">
               You don't need more information. You need a Rig.
            </p>
         </section>

         <section>
            <h3 className="text-white font-bold uppercase tracking-widest border-l-4 border-red-500 pl-4 mb-6">The Environment: Hostile</h3>
            <p className="mb-4">
               The 21st century is a hostile environment for the human mind. Big Tech is colonizing your dopamine. Big Food is hijacking your metabolism. The Drift is the entropy that pulls you toward mediocrity.
            </p>
            <p>
               You aren't just fighting the world; you are fighting your own biology. And right now, you are unarmed.
            </p>
         </section>

         <section>
            <h3 className="text-white font-bold uppercase tracking-widest border-l-4 border-emerald-500 pl-4 mb-6">The Solution: The Compiler</h3>
            <p className="mb-4">
               MaxiMost is not an app. It is a Behavioral Compiler. We take the static wisdom of the Stoics, the Bio-hackers, and the Elite Operators and turn it into actionable, verified code.
            </p>
            <p>
               We do not use "Willpower"—that is a finite battery that fails when you are tired. We train <span className="text-emerald-400 font-bold">"Internal Force"</span>—a muscle forged through the repetition of the D.A.S.H. Protocol.
            </p>
         </section>

         <section className="bg-slate-900/30 p-8 border border-slate-800 rounded-none">
            <h3 className="text-white font-bold uppercase tracking-widest mb-6 text-center">THE CODE: D.A.S.H.</h3>
            <p className="text-center text-sm mb-8 text-slate-500">We win the war one DASH at a time.</p>

            <div className="space-y-4">
               <div className="flex gap-4">
                  <span className="text-blue-500 font-bold w-8">D</span>
                  <span className="text-white font-bold w-24">DAY</span>
                  <span>The only temporal window that matters. Win the 24 hours.</span>
               </div>
               <div className="flex gap-4">
                  <span className="text-blue-500 font-bold w-8">A</span>
                  <span className="text-white font-bold w-24">ATOM</span>
                  <span>The smallest unit of action (e.g., "Put on shoes," not "Run").</span>
               </div>
               <div className="flex gap-4">
                  <span className="text-blue-500 font-bold w-8">S</span>
                  <span className="text-white font-bold w-24">STEP</span>
                  <span>The immediate physical movement.</span>
               </div>
               <div className="flex gap-4">
                  <span className="text-blue-500 font-bold w-8">H</span>
                  <span className="text-white font-bold w-24">HABIT</span>
                  <span>The permanent firmware of your identity.</span>
               </div>
            </div>
         </section>

         <section>
            <h3 className="text-white font-bold uppercase tracking-widest border-l-4 border-blue-500 pl-4 mb-6">The Standard</h3>
            <ul className="space-y-4 list-disc pl-6 marker:text-blue-500">
               <li><strong className="text-white">We build on Honesty and Resilience.</strong> We practice the Shopping Cart Rule. Integrity is doing the right thing when no one is watching.</li>
               <li><strong className="text-white">We live by the Burnt Toast Theory.</strong> We do not leak energy on micro-frictions. If the toast burns, it is not a bad day; it is a signal to recalibrate.</li>
               <li><strong className="text-white">We perform Secret Good Deeds.</strong> We build virtue for its own sake.</li>
               <li><strong className="text-white">We calibrate the Biological Base</strong> before supplements. We maintain the High Ground.</li>
            </ul>
         </section>

         {/* CITADEL SECTION - Gold/Amber */}
         <section className="bg-amber-950/10 border border-amber-500/20 p-8 md:p-12 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                 <Shield className="w-64 h-64 text-amber-500" />
             </div>

             <h3 className="text-amber-500 font-black uppercase tracking-[0.2em] text-2xl mb-6 relative z-10">
                 WE BUILD THE CITADEL.
             </h3>
             <p className="text-amber-100/80 mb-6 relative z-10">
                 We do not hoard capital; we deploy it. Sovereignty is not a solo mission; it is a collective defense.
                 For every Sovereign Operator who joins the Vanguard, MaxiMost funds the arming of a Survivor.
             </p>

             <div className="flex flex-col md:flex-row gap-8 mt-8 relative z-10">
                 <div className="flex-1 bg-black/40 border border-amber-500/30 p-6">
                     <div className="text-xs text-amber-500 uppercase tracking-widest mb-2">You Buy</div>
                     <div className="text-white font-bold text-xl">Lifetime Sovereignty ($199)</div>
                 </div>
                 <div className="flex items-center justify-center">
                     <ArrowLeft className="w-6 h-6 text-amber-500 rotate-90 md:rotate-0 md:transform md:-scale-x-100" />
                 </div>
                 <div className="flex-1 bg-black/40 border border-amber-500/30 p-6">
                     <div className="text-xs text-amber-500 uppercase tracking-widest mb-2">We Give</div>
                     <div className="text-white font-bold text-xl">12-Month Operator Scholarship</div>
                     <div className="text-xs text-amber-200/60 mt-1">($180 Value to Veteran or Recovery Grad)</div>
                 </div>
             </div>

             <p className="mt-8 text-amber-100/60 text-sm italic relative z-10">
                 We do not just sell to the elite; we arm the survivors. We verify progress through the 30-Day Protocol. If you have the strength to fight your way back from the darkness, we will provide the Rig to keep you in the light.
             </p>
         </section>

         {/* PRICING UPDATE SECTION */}
         <section className="pt-12 border-t border-slate-800" id="pricing">
            <h2 className="text-3xl font-black text-white mb-12 text-center uppercase tracking-widest">Operational Tiers</h2>

            <div className="grid md:grid-cols-2 gap-6">
               {/* TIER 1: INITIATE */}
               <div className="p-8 border border-slate-800 bg-black/50">
                  <h4 className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-4">Tier 1</h4>
                  <div className="text-2xl font-black text-white mb-2">INITIATE</div>
                  <div className="text-4xl font-mono text-slate-300 mb-6">$0 <span className="text-sm text-slate-600">/ forever</span></div>
                  <ul className="space-y-2 text-sm text-slate-500 mb-8">
                      <li>• Basic Dashboard Access</li>
                      <li>• 3 Active Habits</li>
                      <li>• Local Storage Only</li>
                  </ul>
               </div>

               {/* TIER 2: OPERATOR */}
               <div className="p-8 border border-blue-900/30 bg-blue-950/5">
                  <h4 className="text-blue-500 font-bold uppercase tracking-widest text-xs mb-4">Tier 2</h4>
                  <div className="text-2xl font-black text-white mb-2">OPERATOR</div>
                  <div className="text-4xl font-mono text-blue-400 mb-6">$15 <span className="text-sm text-slate-600">/ mo</span></div>
                  <ul className="space-y-2 text-sm text-slate-400 mb-8">
                      <li>• Unlimited Habits</li>
                      <li>• Cloud Sync & Encrypted Vault</li>
                      <li>• AI Coach (The Stoic)</li>
                  </ul>
                  <button onClick={() => navigate('/auth')} className="w-full py-3 border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white uppercase font-bold text-xs tracking-widest transition-all">
                      Initialize
                  </button>
               </div>

               {/* TIER 3: VANGUARD (Featured) */}
               <div className="p-8 border border-amber-500/50 bg-amber-950/10 relative md:col-span-2">
                  <div className="absolute top-0 right-0 bg-amber-500 text-black text-[10px] font-black uppercase px-3 py-1">Best Value</div>
                  <h4 className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-4">Tier 3: The Founding 500</h4>
                  <div className="text-4xl font-black text-white mb-2">VANGUARD</div>
                  <div className="text-6xl font-mono text-amber-400 mb-2">$199 <span className="text-xl text-slate-500">LIFETIME</span></div>
                  <p className="text-amber-200/60 text-sm mb-8 flex items-center gap-2">
                      <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                      INCLUDES 1 SPONSORSHIP ($180 Value)
                  </p>

                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                      <ul className="space-y-2 text-sm text-slate-300">
                          <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-500" /> Lifetime Access (No monthly fees)</li>
                          <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-500" /> Grandfathered into all future AI</li>
                          <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-500" /> Private Discord Access</li>
                      </ul>
                      <ul className="space-y-2 text-sm text-slate-300">
                           <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-500" /> <strong>You arm a Survivor</strong> (1-for-1 model)</li>
                           <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-500" /> Founder Badge on Profile</li>
                      </ul>
                  </div>

                  <button onClick={() => navigate('/auth')} className="w-full py-4 bg-amber-600 hover:bg-amber-500 text-black font-black uppercase text-sm tracking-[0.2em] transition-all shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                      Join The Vanguard
                  </button>
               </div>

                {/* TIER 4: ARCHITECT */}
                <div className="p-8 border border-red-900/30 bg-red-950/5 md:col-span-2 opacity-80 hover:opacity-100 transition-opacity">
                  <h4 className="text-red-500 font-bold uppercase tracking-widest text-xs mb-4">Tier 4</h4>
                  <div className="text-2xl font-black text-white mb-2">ARCHITECT</div>
                  <div className="text-4xl font-mono text-red-400 mb-6">$499 <span className="text-sm text-slate-600">/ LIFETIME</span></div>
                  <p className="text-slate-400 text-sm mb-6">
                      For those who want to build the system, not just use it. Direct line to the core team. Feature bounty voting rights.
                  </p>
                  <button className="w-full py-3 border border-red-900 text-red-800 cursor-not-allowed uppercase font-bold text-xs tracking-widest">
                      Invite Only
                  </button>
               </div>

            </div>
         </section>

      </div>
    </div>

  );
}
