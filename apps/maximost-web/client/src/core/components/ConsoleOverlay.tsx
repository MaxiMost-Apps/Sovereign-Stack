import React, { Fragment } from 'react';
import { X } from 'lucide-react';

interface ConsoleOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function ConsoleOverlay({ isOpen, onClose, title, children }: ConsoleOverlayProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div
        className="relative w-full max-w-2xl bg-[#0b0c10] border border-white/10 rounded-2xl shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <div className="flex flex-col">
             <h2 className="text-xl font-black text-white tracking-widest uppercase">{title}</h2>
             <span className="text-[10px] text-blue-500 font-bold tracking-[0.2em] flex items-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
               CONSOLE ACTIVE
             </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
}
