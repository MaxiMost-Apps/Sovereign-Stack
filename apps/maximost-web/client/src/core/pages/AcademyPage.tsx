import React from 'react';
import { motion } from 'framer-motion';
import { Zap, BookOpen, Fingerprint, ArrowRight, Brain } from 'lucide-react';


export function AcademyPage() {
  const tools = [
    {
      id: 'fogg',
      title: "The Fogg Behavior Model",
      subtitle: "B = MAP",
      content: "Behavior happens when Motivation, Ability, and a Prompt converge. If a habit fails, is it too hard (Ability) or did you forget (Prompt)?",
      action: "Analyze a Habit",
      icon: Zap,
      color: "blue"
    },
    {
      id: 'identity',
      title: "Identity Architecture",
      subtitle: "THE VOTE SYSTEM",
      content: "Every action is a vote for the person you want to become. You don't need a unanimous vote to win the election, just a majority.",
      action: "Cast a Vote",
      icon: Fingerprint,
      color: "purple"
    },
    {
      id: 'canon',
      title: "The Knowledge Base",
      subtitle: "20-BOOK INTEL",
      content: "Atomic Habits, Deep Work, Meditations, Outlive. The source codes for the MaxiMost philosophy are built into your AI Coach.",
      action: "View Reading List",
      icon: BookOpen,
      color: "emerald"
    }
  ];

  return (

    <div className="p-6 max-w-5xl mx-auto space-y-12 pb-24">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-white uppercase tracking-tighter mb-2 flex items-center gap-3">
            <Brain className="w-8 h-8 text-slate-500" /> The Academy
        </h1>
        <p className="text-slate-400 max-w-xl">
            Your virtual toolbelt. Use these frameworks to engineer your environment and armor your mind against drift.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid gap-6">
        {tools.map((tool, i) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#0b0c10] border border-white/5 rounded-2xl p-8 flex flex-col md:flex-row gap-8 hover:border-white/10 transition-all group"
          >
            {/* Icon Box */}
            <div className={`w-20 h-20 rounded-2xl bg-${tool.color}-500/10 border border-${tool.color}-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                <tool.icon className={`w-10 h-10 text-${tool.color}-500`} />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col justify-center">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold text-white">{tool.title}</h3>
                    <span className={`text-[10px] font-black text-${tool.color}-400 uppercase tracking-[0.2em] bg-${tool.color}-900/20 px-3 py-1 rounded-full w-fit mt-2 md:mt-0`}>
                        {tool.subtitle}
                    </span>
                </div>

                <p className="text-slate-400 leading-relaxed text-sm mb-6 max-w-3xl">
                    {tool.content}
                </p>

                {/* Action Button (Visual only for now) */}
                <button className={`flex items-center gap-2 text-xs font-bold text-${tool.color}-400 uppercase tracking-widest hover:text-white transition-colors w-fit group/btn`}>
                    {tool.action} <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>

  );
}
