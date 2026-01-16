import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface PulseCheckboxProps {
  checked: boolean;
  onToggle: () => void;
  color?: string; // e.g. 'bg-neon-teal'
}

export function PulseCheckbox({ checked, onToggle, color = 'bg-emerald-500' }: PulseCheckboxProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.85 }}
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      className={`
        relative w-8 h-8 rounded-lg flex items-center justify-center border transition-all duration-300
        ${checked
          ? `${color} border-transparent shadow-[0_0_15px_rgba(16,185,129,0.4)]`
          : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'
        }
      `}
    >
      <motion.div
        initial={false}
        animate={{ scale: checked ? 1 : 0, opacity: checked ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <Check className="w-5 h-5 text-black font-extrabold" strokeWidth={4} />
      </motion.div>
    </motion.button>
  );
}
