import React, { useState } from 'react';
import { RefreshCw, Quote } from 'lucide-react';

const QUOTES = [
  { text: "The happiness of your life depends upon the quality of your thoughts.", author: "Marcus Aurelius" },
  { text: "We suffer more often in imagination than in reality.", author: "Seneca" },
  { text: "No man is free who is not master of himself.", author: "Epictetus" },
  { text: "Waste no more time arguing about what a good man should be. Be one.", author: "Marcus Aurelius" },
  { text: "Difficulty is what wakes up the genius.", author: "Nassim Taleb" },
];

export const StoicQuote: React.FC = () => {
  const [quote, setQuote] = useState(QUOTES[0]);

  const generate = () => {
    const randomIndex = Math.floor(Math.random() * QUOTES.length);
    setQuote(QUOTES[randomIndex]);
  };

  return (
    <div className="h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="mb-8">
        <Quote className="w-12 h-12 text-primary opacity-50 mx-auto" />
      </div>

      <blockquote className="text-3xl md:text-4xl font-serif text-secondary leading-relaxed mb-6 max-w-3xl">
        "{quote.text}"
      </blockquote>

      <cite className="block text-sm font-sans tracking-widest text-muted uppercase mb-12 not-italic">
        — {quote.author}
      </cite>

      <button
        onClick={generate}
        className="group flex items-center gap-2 px-8 py-3 bg-secondary text-white rounded-full hover:bg-primary transition-all duration-300 shadow-lg hover:shadow-primary/30"
      >
        <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
        <span className="font-sans text-xs tracking-widest font-bold">NEXT REFLECTION</span>
      </button>
    </div>
  );
};
