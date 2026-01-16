import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Sun, Shield, Activity, Scale, Heart, ChevronDown, ChevronUp, Radar, Box, Anchor } from 'lucide-react';


export function ToolkitPage() {
  const tools = [
    {
      id: "01", title: "The Bio-Rig", subtitle: "Physiological Optimization", icon: Sun, color: "orange",
      terms: [
        { term: "Circadian Anchoring", def: "Viewing low-angle sunlight within 30 minutes of waking to set the brain’s master clock." },
        { term: "Medicine 3.0", def: "Proactive 'health-care' based on tracking biomarkers and adjusting habits decades before disease." },
        { term: "The Four Horsemen", def: "The four killers (Metabolic, Cancer, Neuro, Cardio) and the protocols to outlive them." },
        { term: "Zone 2 Training", def: "Steady-state aerobic activity holding a conversation. The metabolic foundation." },
        { term: "Task Bracketing", def: "Framing a habit with specific cues before and after to make it reflexive." },
        { term: "NSDR", def: "Non-Sleep Deep Rest protocols (Yoga Nidra) to recover cognitive resources in real-time." }
      ]
    },
    {
      id: "02", title: "The Kinetic Core", subtitle: "Execution & Discipline", icon: Activity, color: "emerald",
      terms: [
        { term: "Extreme Ownership", def: "You own every outcome, failure, and victory in your world." },
        { term: "The 40% Rule", def: "When your mind says you are 'finished', you have only tapped a fraction of your capacity." },
        { term: "Discipline Equals Freedom", def: "Rigid structure and daily non-negotiables create the freedom to excel." },
        { term: "Prioritize and Execute", def: "Picking the single most important task and focusing all resources until neutralized." },
        { term: "Taking Souls", def: "Increasing intensity specifically when the competition expects you to quit." },
        { term: "Day One Mentality", def: "Approaching every day with everything to prove and nothing to protect." }
      ]
    },
    {
      id: "03", title: "The Black Box", subtitle: "Audit & Radical Truth", icon: Box, color: "indigo",
      terms: [
        { term: "The Shadow Audit", def: "Ruthless evening review of where you drifted, lied to yourself, or failed." },
        { term: "Accountability Mirror", def: "Stripping away the ego to see the raw data truth of your current performance." },
        { term: "Detachment", def: "Stepping back from emotion to make informed, tactical decisions." },
        { term: "Limbic Friction", def: "The internal resistance or 'activation energy' required to start a difficult task." },
        { term: "The Drift Protocol", def: "Emergency plan triggered when falling off the path to return to standard within 24h." },
        { term: "Software Problem", def: "Realizing your 'limits' are just outdated mental programming." }
      ]
    },
    {
      id: "04", title: "The Armor Plating", subtitle: "Stoic Fortitude", icon: Shield, color: "blue",
      terms: [
        { term: "Amor Fati", def: "Love of Fate. Embracing chaos as the exact fuel required for your next move." },
        { term: "Dichotomy of Control", def: "Separating what is up to us from what is not, focusing 100% on the internal." },
        { term: "Memento Mori", def: "Using the fact that time is finite to create immediate clarity." },
        { term: "Premeditatio Malorum", def: "Negative Visualization. Mentally rehearsing disasters to prepare a tactical response." },
        { term: "Ataraxia", def: "Internal calm that remains steady regardless of external chaos." },
        { term: "The Obstacle is the Way", def: "The hindrance in your path is the new path itself." }
      ]
    },
    {
      id: "05", title: "The Nav-Computer", subtitle: "Identity & Direction", icon: Anchor, color: "purple",
      terms: [
        { term: "Aretê", def: "Expressing your highest possible self in every moment. Excellence as a baseline." },
        { term: "Eudaimonia", def: "Being 'well-souled' where actions and values are in perfect alignment." },
        { term: "Prokoptôn", def: "One who is making progress. The path is the destination." },
        { term: "Identity Architecture", def: "Designing habits based on the person you are becoming, not goals." },
        { term: "Enclothed Cognition", def: "The psychological influence your 'uniform' has on your performance." },
        { term: "North Star Protocol", def: "A mission statement that serves as the ultimate filter for every decision." }
      ]
    },
    {
      id: "06", title: "The Telemetry", subtitle: "Longevity & Data", icon: Radar, color: "rose",
      terms: [
        { term: "Healthspan", def: "The period of life spent in good health. The primary metric of success." },
        { term: "The Marginal Decade", def: "Training today to ensure your final 10 years are marked by mobility and strength." },
        { term: "Centenarian Decathlon", def: "Identifying the 10 physical tasks you want to be able to do at age 100." },
        { term: "The Cookie Jar", def: "A mental repository of past victories used as fuel during suffering." },
        { term: "Vigilant Watchman", def: "Continuous attention to catch your impressions before they turn into reactions." },
        { term: "Antifragility", def: "Getting stronger specifically because of chaos and volatility." }
      ]
    }
  ];

  return (

    <div className="p-6 max-w-5xl mx-auto space-y-12 pb-32">
      <div>
        <h1 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">The Master Toolbelt</h1>
        <p className="text-slate-400">Tactical Gear for the Mind. Six modules of high-fidelity mental models.</p>
      </div>

      <div className="space-y-6">
        {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>

  );
}

function ToolCard({ tool }: any) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            className={`border border-white/5 bg-[#0b0c10] rounded-2xl overflow-hidden transition-all ${isOpen ? 'border-white/20' : 'hover:border-white/10'}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-6 flex items-center justify-between text-left focus:outline-none"
            >
                <div className="flex items-center gap-6">
                    <div className={`w-14 h-14 rounded-xl bg-${tool.color}-500/10 flex items-center justify-center border border-${tool.color}-500/20`}>
                        <tool.icon className={`w-7 h-7 text-${tool.color}-500`} />
                    </div>
                    <div>
                        <span className={`text-[10px] font-black uppercase tracking-[0.2em] text-${tool.color}-500 block mb-1`}>Tool {tool.id}</span>
                        <h3 className="text-xl font-bold text-white tracking-tight">{tool.title}</h3>
                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wide mt-1">{tool.subtitle}</p>
                    </div>
                </div>
                <div className={`p-2 rounded-full transition-colors ${isOpen ? 'bg-white/10' : ''}`}>
                    {isOpen ? <ChevronUp className="text-slate-400"/> : <ChevronDown className="text-slate-600"/>}
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        className="px-6 pb-8"
                    >
                        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 pt-6 border-t border-white/5">
                            {tool.terms.map((t: any, i: number) => (
                                <div key={i} className="group">
                                    <h4 className="text-sm font-bold text-slate-200 mb-1 group-hover:text-white transition-colors">{t.term}</h4>
                                    <p className="text-xs text-slate-500 leading-relaxed group-hover:text-slate-400 transition-colors">{t.def}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
