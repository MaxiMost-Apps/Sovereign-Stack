import React from 'react';
import { motion } from 'framer-motion';

export const Counter = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-neutral-50 rounded-lg border border-neutral-100 shadow-sm">
      <h3 className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-2">Remaining Slots</h3>
      <div className="flex items-baseline space-x-1">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-serif font-bold text-primary"
        >
          482
        </motion.span>
        <span className="text-xl text-neutral-400 font-light">/ 500</span>
      </div>
      <p className="mt-2 text-xs text-neutral-400">Founding 500</p>
    </div>
  );
};
