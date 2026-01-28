import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Plus } from 'lucide-react';
import CheckCircle from './ui/CheckCircle';

export default function WeeklyCell({ dayStr, logVal, target, unit, isNumeric, isDisabled, isToday, onToggle, theme }: any) {
    const isComplete = isNumeric ? logVal >= target : logVal > 0;
    const [showInput, setShowInput] = useState(false);
    const [tempValue, setTempValue] = useState(logVal || '');

    const handleOpenInput = (e: any) => {
        e.stopPropagation();
        if (isDisabled) return;
        setTempValue(logVal || '');
        setShowInput(true);
    };

    const handleSave = (e?: any) => {
        e?.stopPropagation();
        const val = parseInt(tempValue) || 0;
        onToggle(dayStr, val);
        setShowInput(false);
    };

    // Z-Index Trap: High z-index when open
    return (
        <div className={`flex items-center justify-center p-2 relative ${showInput ? 'z-50' : 'z-10'} border-r border-white/5 last:border-0 h-16 ${isDisabled ? 'opacity-30 pointer-events-none' : ''} ${isToday ? 'bg-blue-500/10' : ''}`}>
            {isNumeric ? (
                  // NUMERIC LOGIC with OVERLAY POPOVER (Matched to Daily Standard)
                  <div className="relative flex items-center justify-center w-10 h-10">
                      <CheckCircle
                          checked={isComplete}
                          color={theme.hex}
                          isNumeric={true}
                          value={logVal}
                          disabled={isDisabled}
                          size="lg"
                          onClick={handleOpenInput}
                      >
                          {!isComplete && <Plus className="w-4 h-4 text-slate-500" />}
                      </CheckCircle>

                      {/* POPOVER - CENTERED OVERLAY (No Layout Shift) */}
                      <AnimatePresence>
                          {showInput && (
                              <motion.div
                                  initial={{ scale: 0.8, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  exit={{ scale: 0.8, opacity: 0 }}
                                  className="absolute right-0 top-1/2 -translate-y-1/2 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-1 z-[100] flex items-center gap-1 origin-right"
                                  style={{ minWidth: '120px' }}
                                  onPointerDown={(e) => e.stopPropagation()}
                              >
                                  <input
                                      autoFocus
                                      type="number"
                                      value={tempValue}
                                      placeholder="-"
                                      onChange={(e) => setTempValue(parseInt(e.target.value) || 0)}
                                      onKeyDown={(e) => {
                                          if(e.key === 'Enter') handleSave();
                                      }}
                                      className="w-16 h-10 bg-black border border-slate-700 rounded-lg text-center text-white font-bold outline-none focus:border-blue-500 text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                  />
                                  <button
                                      onClick={handleSave}
                                      className="w-10 h-10 bg-emerald-600 hover:bg-emerald-500 rounded-lg flex items-center justify-center text-white transition-colors shadow-lg"
                                  >
                                      <Check className="w-5 h-5" />
                                  </button>
                              </motion.div>
                          )}
                      </AnimatePresence>

                      {/* Overlay to close popover */}
                      {showInput && (
                          <div
                              className="fixed inset-0 z-[90] bg-transparent"
                              onClick={(e) => { e.stopPropagation(); setShowInput(false); }}
                          />
                      )}
                  </div>
             ) : (
                // BOOLEAN STATE (FORCED CIRCLE OVERWRITE)
                <button
                    onClick={(e) => { e.stopPropagation(); onToggle(dayStr); }}
                    className={`
                        w-8 h-8 flex items-center justify-center rounded-full border transition-all duration-300
                        ${isComplete
                        ? `${theme.bg?.replace('bg-', 'bg-') || 'bg-blue-600'} border-transparent text-white shadow-[0_0_10px_rgba(255,255,255,0.2)]`
                        : 'bg-[#0B1221] border-white/5 text-transparent hover:border-white/20'
                        }
                    `}
                    style={isComplete ? { backgroundColor: theme.hex } : {}}
                >
                    {isComplete && <div className="w-2 h-2 bg-white rounded-full animate-pulse" />}
                </button>
             )}
        </div>
    );
}
