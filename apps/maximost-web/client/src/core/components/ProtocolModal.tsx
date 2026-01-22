import React, { useState } from 'react';
import { X, CheckSquare, Square, Layers, ArrowRight } from 'lucide-react';
import { getThemeStyles } from '../config/themeConfig';

export default function ProtocolModal({ stack, isOpen, onClose, onConfirm }: any) {
  // Default to all selected
  // Handle case where stack.habits might be missing or different structure
  const initialIds = (stack?.habits || []).map((h: any) => h.id || h.slug || h);
  const [selectedIds, setSelectedIds] = useState<string[]>(initialIds);

  if (!isOpen || !stack) return null;

  const theme = getThemeStyles(stack.color || 'maximost_blue');

  const toggleSelection = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id] );
  };

  const handleImport = () => {
    // Filter the original list based on selection
    // Support both object habits and string slugs
    const habitsToImport = (stack.habits || []).filter((h: any) => {
        const id = h.id || h.slug || h;
        return selectedIds.includes(id);
    });
    onConfirm(habitsToImport);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-[#0B0C10] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">

        {/* HEADER */}
        <div className="p-6 border-b border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-transparent to-white/20 pointer-events-none" />
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white"><X size={20} /></button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/5" style={{ color: theme.primary }}>
              <Layers size={20} />
            </div>
            <h2 className="text-xl font-black text-white uppercase tracking-tight">{stack.title || stack.name}</h2>
          </div>
          <p className="text-xs text-slate-400 font-medium pl-1">{stack.description}</p>
        </div>

        {/* HABIT LIST */}
        <div className="p-4 space-y-2 max-h-[50vh] overflow-y-auto custom-scrollbar">
          <div className="flex justify-between items-center px-2 mb-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">PROTOCOL CONTENTS</span>
            <span className="text-[10px] font-bold text-blue-500">{selectedIds.length} SELECTED</span>
          </div>

          {(stack.habits || []).map((h: any, i: number) => {
             // Handle simple slug string or object
             const id = h.id || h.slug || h;
             const title = h.title || h.name || (typeof h === 'string' ? h.replace(/-/g, ' ').toUpperCase() : 'UNKNOWN');
             const meta = h.daily_goal > 1 ? `Target: ${h.daily_goal} ${h.unit}` : 'Daily Check-in';

             return (
                <div
                  key={id || i}
                  onClick={() => toggleSelection(id)}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${selectedIds.includes(id) ? 'bg-white/5 border-white/10' : 'opacity-50 border-transparent hover:opacity-100'}`}
                >
                  <div className={`transition-colors ${selectedIds.includes(id) ? 'text-blue-500' : 'text-slate-600'}`}>
                    {selectedIds.includes(id) ? <CheckSquare size={20} /> : <Square size={20} />}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-200">{title}</div>
                    <div className="text-[10px] text-slate-500">{meta}</div>
                  </div>
                </div>
             );
          })}
        </div>

        {/* FOOTER */}
        <div className="p-4 border-t border-white/5 bg-[#08090c]">
          <button
            onClick={handleImport}
            disabled={selectedIds.length === 0}
            className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-900/20"
          >
            <Layers size={18} /> INSTALL PROTOCOL
          </button>
        </div>
      </div>
    </div>
  );
}
