import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft } from 'lucide-react';
import { useEffect } from 'react';

interface ConsoleOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  showBack?: boolean;
  onBack?: () => void;
}

export default function ConsoleOverlay({ isOpen, onClose, title, children, showBack, onBack }: ConsoleOverlayProps) {
  // Lock body scroll
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
          />

          {/* Slide-In Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[80%] max-w-4xl bg-[#0B1121] border-l border-white/10 shadow-2xl z-[100] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5 bg-[#0F172A]">
               <div className="flex items-center gap-4">
                  {showBack && (
                      <button onClick={onBack} className="p-2 hover:bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors">
                          <ChevronLeft className="w-5 h-5" />
                      </button>
                  )}
                  <div>
                      <h2 className="text-xl font-black text-white uppercase tracking-tighter">{title}</h2>
                      <div className="flex gap-2 mt-1">
                          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                          <span className="text-[10px] font-mono text-blue-500 uppercase tracking-widest">CONSOLE ACTIVE</span>
                      </div>
                  </div>
               </div>
               <button onClick={onClose} className="p-2 hover:bg-red-900/20 rounded-lg text-slate-500 hover:text-red-500 transition-colors border border-transparent hover:border-red-900/30">
                  <X className="w-6 h-6" />
               </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
                {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
