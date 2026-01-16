import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ghost, AlertTriangle } from 'lucide-react';
import { useKinetic } from '../../core/hooks/useKinetic';

type GhostVariant = 'subtle' | 'glass' | 'pulse';

interface CouncilGhostProps {
  variant?: GhostVariant;
  isDrifting?: boolean;
  message?: string;
  onCorrect?: () => void;
}

// SHATTER EFFECT COMPONENT
const ShatterEffect = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden"
    >
        {/* Glass Crack SVG Overlay */}
        <svg viewBox="0 0 100 100" className="w-full h-full opacity-60 mix-blend-overlay">
            <motion.path
                d="M50 50 L20 20 M50 50 L80 20 M50 50 L20 80 M50 50 L80 80"
                stroke="white"
                strokeWidth="0.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.1, ease: "easeOut" }}
            />
            <motion.path
                d="M50 50 L30 10 M50 50 L70 10 M50 50 L10 50 M50 50 L90 50"
                stroke="white"
                strokeWidth="0.2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.2, ease: "easeOut", delay: 0.05 }}
            />
        </svg>
        <div className="absolute inset-0 bg-white/5 mix-blend-color-dodge animate-pulse" />
    </motion.div>
  );
};

export const CouncilGhost = ({ variant = 'subtle', isDrifting = false, message = "DRIFTING DETECTED", onCorrect }: CouncilGhostProps) => {
    const { triggerKinetic } = useKinetic();
    const [isShattering, setIsShattering] = useState(false);

    const handleCorrection = () => {
        setIsShattering(true);
        triggerKinetic('heavy');
        if (onCorrect) onCorrect();
        setTimeout(() => setIsShattering(false), 1000);
    };

    // VARIANT STYLES
    const getStyles = () => {
        switch (variant) {
            case 'subtle':
                return "bg-black/40 border border-white/5 text-slate-500 hover:text-slate-300";
            case 'glass':
                return "bg-white/5 backdrop-blur-md border border-white/10 text-white shadow-lg";
            case 'pulse':
                return "bg-red-950/20 border border-red-500/30 text-red-400 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.2)]";
            default:
                return "bg-black border border-zinc-800 text-zinc-500";
        }
    };

    if (!isDrifting) return null;

    return (
        <div className="relative overflow-hidden rounded-lg">
            <AnimatePresence>
                {isShattering && <ShatterEffect />}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`relative px-4 py-3 rounded-lg flex items-center justify-between gap-4 transition-all duration-500 ${getStyles()}`}
            >
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${variant === 'pulse' ? 'bg-red-500/10' : 'bg-white/5'}`}>
                        <Ghost className="w-4 h-4" />
                    </div>
                    <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-80">Council Whisper</h4>
                        <p className="text-xs font-mono font-medium">{message}</p>
                    </div>
                </div>

                <button
                    onClick={handleCorrection}
                    className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider bg-white/5 hover:bg-white/10 border border-white/10 rounded transition-colors flex items-center gap-2"
                >
                    <span>Correct</span>
                    <AlertTriangle className="w-3 h-3" />
                </button>
            </motion.div>
        </div>
    );
};
