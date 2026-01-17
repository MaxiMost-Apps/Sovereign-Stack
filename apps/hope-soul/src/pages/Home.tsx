import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Counter } from '../components/Counter';
import { StoicGenerator } from '../components/StoicGenerator';

export const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 px-4 overflow-hidden">
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-serif text-5xl md:text-7xl font-bold mb-8 text-foreground tracking-tight">
                The Sovereign <span className="text-primary italic">Soul</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="prose prose-lg mx-auto mb-16"
            >
              <blockquote className="text-xl md:text-2xl font-light leading-relaxed text-neutral-600 italic border-l-4 border-primary pl-6 py-2 bg-neutral-50/50 rounded-r-lg">
                "The Sovereign Stack is not just code; it is a declaration of independence.
                We do not build for the masses; we build for the 500 who seek mastery.
                To hold a Sovereign Key is to hold the power to elevate another.
                This is the Soul of our empire."
              </blockquote>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="flex justify-center"
            >
              <Counter />
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30 z-0">
             <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
             <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-neutral-200/50 rounded-full blur-[120px]" />
          </div>
        </section>

        {/* Stoic Generator Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <StoicGenerator />
          </div>
        </section>

        {/* Info Section */}
        <section className="py-20 bg-neutral-50 border-t border-neutral-100">
          <div className="container mx-auto px-4 max-w-5xl">
             <div className="grid md:grid-cols-2 gap-12 items-center">
               <div className="space-y-6">
                 <h2 className="font-serif text-3xl font-bold">The Scholarship Protocol</h2>
                 <p className="text-neutral-600 leading-relaxed">
                   When a Sovereign ascends, they forge more than just their own path.
                   Through the mechanism of the <span className="text-primary font-medium">Sovereign Key</span>,
                   Vanguards and Architects are granted the ability to sponsor a Sentinel-level membership
                   for a deserving peer.
                 </p>
                 <ul className="space-y-3">
                   <li className="flex items-center space-x-3 text-sm font-medium">
                     <span className="w-2 h-2 rounded-full bg-primary" />
                     <span>Vanguard: Mints 1 Key</span>
                   </li>
                   <li className="flex items-center space-x-3 text-sm font-medium">
                     <span className="w-2 h-2 rounded-full bg-primary" />
                     <span>Architect: Mints 5 Keys</span>
                   </li>
                 </ul>
               </div>
               <div className="bg-white p-8 rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center min-h-[300px]">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>
                    </div>
                    <h3 className="font-serif text-xl">Sovereign Keys</h3>
                    <p className="text-sm text-neutral-500">Access granted only by invitation.</p>
                  </div>
               </div>
             </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
