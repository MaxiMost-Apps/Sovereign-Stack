import React from 'react';
import { Shield, AlertTriangle } from 'lucide-react';

interface CommandDisengageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

export const CommandDisengageModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Disengage Command?",
  message = "Momentum will be paused."
}: CommandDisengageModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">

        {/* HEADER */}
        <div className="flex items-center gap-3 p-6 border-b border-zinc-900 bg-zinc-900/50">
          <div className="p-2 bg-red-500/10 rounded-md border border-red-500/20">
            <AlertTriangle className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white uppercase tracking-wide">{title}</h3>
            <p className="text-xs text-zinc-500 font-mono uppercase tracking-widest">Protocol Interruption</p>
          </div>
        </div>

        {/* BODY */}
        <div className="p-6">
          <p className="text-zinc-300 font-mono text-sm leading-relaxed border-l-2 border-zinc-800 pl-4">
            "{message}"
          </p>
        </div>

        {/* FOOTER */}
        <div className="flex items-center gap-3 p-4 bg-zinc-900/30 border-t border-zinc-900">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 rounded hover:bg-zinc-800 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-3 text-xs font-bold uppercase tracking-widest text-white bg-blue-600 hover:bg-blue-500 border border-blue-500/50 rounded shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-all flex items-center justify-center gap-2 group"
          >
            <Shield className="w-3 h-3 group-hover:scale-110 transition-transform" />
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
