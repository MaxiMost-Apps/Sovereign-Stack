import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Activity, Fingerprint, ArrowRight, Brain, MousePointerClick, Ban } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


export function ArchitectPage() {
  const navigate = useNavigate();
  const tools = [
    {
      id: 'design',
      title: "Design the Cue",
      subtitle: "CREATE A GOOD HABIT",
      content: "1. Make it Obvious (The Cue).\n2. Make it Attractive (The Craving).\n3. Make it Easy (The Response).\n4. Make it Satisfying (The Reward).",
      action: "Design Protocol",
      icon: MousePointerClick,
      color: "blue"
    },
    {
      id: 'break',
      title: "Break the Loop",
      subtitle: "STOP A BAD HABIT",
      content: "1. Make it Invisible.\n2. Make it Unattractive.\n3. Make it Difficult.\n4. Make it Unsatisfying. (Add friction until the loop breaks).",
      action: "Invert Protocol",
      icon: Ban,
      color: "red"
    },
    {
      id: 'identity',
      title: "Identity Architecture",
      subtitle: "WHO YOU BECOME",
      content: "The goal is not to run a marathon, but to become a Runner. Every time you train, you cast a vote for this new identity.",
      action: "Cast Vote",
      icon: Fingerprint,
      color: "purple"
    }
  ];

  return (

    <div className="p-6 max-w-5xl mx-auto space-y-12 pb-24">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-white uppercase tracking-tighter mb-2 flex items-center gap-3">
            <Brain className="w-8 h-8 text-slate-500" /> The Architect
        </h1>
        <p className="text-slate-400 max-w-xl">
            Behavioral Engineering Tools. Design your environment to make success inevitable.
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

                <div className="text-slate-400 leading-relaxed text-sm mb-6 max-w-3xl whitespace-pre-line">
                    {tool.content}
                </div>

                {/* Action Button */}
                <button
                    onClick={() => navigate('/journal?mode=protocol')}
                    className={`flex items-center gap-2 text-xs font-bold text-${tool.color}-400 uppercase tracking-widest hover:text-white transition-colors w-fit group/btn`}
                >
                    {tool.action} <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>

  );
}
