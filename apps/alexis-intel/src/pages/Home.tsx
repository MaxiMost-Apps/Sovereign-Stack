import React from 'react';
import { Zone2Calculator } from '../components/Zone2Calculator';
import { Brain, Cpu, Database } from 'lucide-react';

export function Home() {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 tracking-tight">
            Intelligence <span className="text-primary">Amplified</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Data is noise. Intelligence is signal.
            We provide the tools to filter, analyze, and execute.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-white text-background px-8 py-3 rounded-md font-medium hover:bg-gray-200 transition-colors">
              Begin Analysis
            </button>
            <button className="border border-white/20 text-white px-8 py-3 rounded-md font-medium hover:bg-white/5 transition-colors">
              Read Manifesto
            </button>
          </div>
        </div>
      </section>

      {/* Feature Section: Zone 2 Calculator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif text-white mb-4">Physiological Intelligence</h2>
          <p className="text-gray-400">Optimize your biological hardware for peak cognitive performance.</p>
        </div>
        <Zone2Calculator />
      </section>

      {/* Grid Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Brain,
              title: "Cognitive Frameworks",
              description: "Mental models for high-stakes decision making."
            },
            {
              icon: Database,
              title: "Data Sovereignty",
              description: "Techniques for reclaiming your digital footprint."
            },
            {
              icon: Cpu,
              title: "System Architecture",
              description: "Building resilient life operating systems."
            }
          ].map((feature, idx) => (
            <div key={idx} className="bg-secondary/30 p-8 rounded-lg border border-white/5 hover:border-primary/30 transition-colors group">
              <feature.icon className="w-10 h-10 text-gray-500 group-hover:text-primary transition-colors mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
