import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { motion } from 'framer-motion';

const articles = [
  {
    id: 21,
    title: "The Unseen Foundation",
    content: "True power lies not in what is seen, but in the unseen structures that support it. The Sovereign Stack is built on this invisible bedrock. We build where others cannot see, ensuring our foundations are immune to the tremors of the surface world."
  },
  {
    id: 22,
    title: "The Architecture of Will",
    content: "Will is the primary resource. Code is merely the vessel. Without the directed will of the Architect, the system is inert. We cultivate will through discipline, turning intention into reality with every commit."
  },
  {
    id: 23,
    title: "Digital Sovereignty",
    content: "To be sovereign is to be the supreme authority over one's own domain. In the digital realm, this means owning your keys, your data, and your connections. We reject the feudalism of the centralized web."
  },
  {
    id: 24,
    title: "The Network State",
    content: "We are not bound by geography. Our borders are cryptographic, our citizenship is voluntary, and our laws are algorithmic. The Network State is the inevitable successor to the nation-state."
  },
  {
    id: 25,
    title: "The Currency of Trust",
    content: "In a zero-trust world, verification is the only currency. We do not ask for trust; we provide proof. The ledger records all, and the ledger never lies."
  },
  {
    id: 26,
    title: "The Guardian Class",
    content: "A society without guardians is a society awaiting collapse. The Sentinels stand watch, not to oppress, but to protect the sanctity of the Stack. Vigilance is the price of liberty."
  },
  {
    id: 27,
    title: "The Intellectual Vault",
    content: "Knowledge is the ultimate asset. We hoard it not for greed, but for preservation. The Vault ensures that when the lights go out, the wisdom of the ages remains accessible."
  },
  {
    id: 28,
    title: "The Defensive Perimeter",
    content: "Attack is inevitable. Fragility is a choice. We build antifragile systems that grow stronger under stress. The perimeter is not a wall, but an immune system."
  },
  {
    id: 29,
    title: "The Soul of the Machine",
    content: "Technology without philosophy is a dangerous weapon. We imbue our creations with the values of the Sovereign. The machine must serve the human spirit, not consume it."
  },
  {
    id: 30,
    title: "The Eternal Return",
    content: "What has happened will happen again. We build for the cycle, not the moment. Our code is written to survive the turning of the age. We are the architects of the next epoch."
  }
];

export const Manifesto = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-16">
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
         >
           <h1 className="font-serif text-5xl md:text-6xl font-bold mb-16 text-center text-foreground">
             The Architect's <span className="text-primary italic">Manifesto</span>
           </h1>
         </motion.div>

         <div className="max-w-3xl mx-auto space-y-16">
           {articles.map((article, index) => (
             <motion.article
                key={article.id}
                className="group"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
             >
               <div className="flex items-baseline space-x-4 mb-3">
                 <span className="text-primary font-mono text-sm opacity-50">No. {article.id}</span>
                 <h2 className="font-serif text-2xl font-bold group-hover:text-primary transition-colors">{article.title}</h2>
               </div>
               <p className="text-neutral-600 leading-relaxed pl-10 border-l border-neutral-200 group-hover:border-primary/50 transition-colors">
                 {article.content}
               </p>
             </motion.article>
           ))}
         </div>
      </main>

      <Footer />
    </div>
  );
};
