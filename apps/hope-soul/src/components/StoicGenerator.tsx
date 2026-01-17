import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, RefreshCw } from 'lucide-react';

const QUOTES = [
  { text: "We suffer more often in imagination than in reality.", author: "Seneca" },
  { text: "You have power over your mind - not outside events. Realize this, and you will find strength.", author: "Marcus Aurelius" },
  { text: "The happiness of your life depends upon the quality of your thoughts.", author: "Marcus Aurelius" },
  { text: "Waste no more time arguing about what a good man should be. Be one.", author: "Marcus Aurelius" },
  { text: "He who fears death will never do anything worth of a man who is alive.", author: "Seneca" },
  { text: "First say to yourself what you would be; and then do what you have to do.", author: "Epictetus" },
  { text: "It is not death that a man should fear, but he should fear never beginning to live.", author: "Marcus Aurelius" },
  { text: "Discipline is the bridge between goals and accomplishment.", author: "Jim Rohn" }, // Modern Stoic vibe
  { text: "Man conquers the world by conquering himself.", author: "Zeno of Citium" }
];

export const StoicGenerator = () => {
  const [index, setIndex] = useState(0);

  const generate = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * QUOTES.length);
    } while (newIndex === index);
    setIndex(newIndex);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-neutral-100 max-w-2xl mx-auto text-center">
      <div className="mb-6 flex justify-center text-primary/20">
        <Quote size={48} />
      </div>

      <div className="min-h-[120px] flex flex-col justify-center mb-8">
        <AnimatePresence mode='wait'>
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-2xl font-serif font-medium text-neutral-800 mb-4 leading-relaxed">
              "{QUOTES[index].text}"
            </p>
            <p className="text-sm uppercase tracking-widest text-primary font-bold">
              — {QUOTES[index].author}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        onClick={generate}
        className="inline-flex items-center space-x-2 px-6 py-3 bg-neutral-900 text-white rounded hover:bg-neutral-800 transition-colors text-sm font-medium tracking-wide uppercase"
      >
        <RefreshCw size={16} />
        <span>Consult the Oracle</span>
      </button>
    </div>
  );
};
