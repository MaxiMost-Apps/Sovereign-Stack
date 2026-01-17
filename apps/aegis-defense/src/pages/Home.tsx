import React from 'react';
import { DopamineDetoxCalculator } from '../components/DopamineDetoxCalculator';
import { Shield, Sword, Lock } from 'lucide-react';

export function Home() {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 tracking-tight">
            The Best Defense is a <span className="text-primary">Clear Mind</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            In an age of infinite distraction, attention is your most valuable asset.
            Defend it with lethal precision.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-primary text-black px-8 py-3 rounded-md font-bold hover:bg-primary/90 transition-colors">
              Initiate Protocol
            </button>
            <button className="border border-primary/20 text-primary px-8 py-3 rounded-md font-medium hover:bg-primary/10 transition-colors">
              View Directives
            </button>
          </div>
        </div>
      </section>

      {/* Feature Section: Detox Calculator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif text-white mb-4">Neurochemical Defense</h2>
          <p className="text-gray-400">Quantify your vulnerability to digital psychological operations.</p>
        </div>
        <DopamineDetoxCalculator />
      </section>

      {/* Grid Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Shield,
              title: "Digital Hardening",
              description: "Protocols to secure your digital perimeter against intrusion."
            },
            {
              icon: Lock,
              title: "Privacy Ops",
              description: "Advanced techniques for anonymity and data sovereignty."
            },
            {
              icon: Sword,
              title: "Offensive Mindset",
              description: "Turning improved focus into actionable competitive advantage."
            }
          ].map((feature, idx) => (
            <div key={idx} className="bg-secondary/30 p-8 rounded-lg border border-primary/10 hover:border-primary/50 transition-colors group">
              <feature.icon className="w-10 h-10 text-gray-500 group-hover:text-primary transition-colors mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
