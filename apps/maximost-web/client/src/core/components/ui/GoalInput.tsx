import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Plus } from 'lucide-react';

export default function GoalInput({ val, target, unit, isNumeric, isDisabled, onUpdate, theme }: any) {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const isComplete = isNumeric ? val >= target : val > 0;

    // Close popover on click outside
    useEffect(() => {
        function handleClickOutside(event: any) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsPopoverOpen(false);
            }
        }
        if (isPopoverOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            // Focus input
            setTimeout(() => inputRef.current?.focus(), 100);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isPopoverOpen]);

    const handleCommit = (newVal: any) => {
        const num = parseInt(newVal) || 0;
        onUpdate(num);
        setIsPopoverOpen(false);
    };

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            handleCommit(e.target.value);
        }
    };

    return (
        <div className="relative flex items-center justify-center w-full h-full" ref={containerRef}>
            {isComplete ? (
                // DONE STATE (Filled Pulse)
                <motion.button
                    disabled={isDisabled}
                    onClick={(e) => { e.stopPropagation(); onUpdate(0); }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, boxShadow: `0 0 15px ${theme.glow}` }}
                    className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-transform"
                    style={{ backgroundColor: theme.hex }}
                >
                    {isNumeric ? <span className="font-bold text-[10px] text-black">{val}</span> : <Check className="w-4 h-4 stroke-[3px] text-black" />}
                </motion.button>
            ) : (
                isNumeric ? (
                    // NUMERIC INPUT (Hollow Circle -> Popover)
                    <>
                        <motion.button
                            onClick={(e) => { e.stopPropagation(); setIsPopoverOpen(!isPopoverOpen); }}
                            disabled={isDisabled}
                            whileTap={{ scale: 0.9 }}
                            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors group/circle ${isDisabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer hover:border-slate-500'}`}
                            style={{
                                borderColor: theme.hex,
                                boxShadow: `inset 0 0 5px ${theme.glow}20`,
                                color: theme.hex
                            }}
                        >
                            {val > 0 ? (
                                <span className="text-[9px] font-bold">{val}</span>
                            ) : (
                                <Plus className="w-3 h-3 opacity-0 group-hover/circle:opacity-100 transition-opacity" />
                            )}
                        </motion.button>

                        {/* POPOVER */}
                        <AnimatePresence>
                            {isPopoverOpen && (
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0, y: 10 }}
                                    animate={{ scale: 1, opacity: 1, y: 0 }}
                                    exit={{ scale: 0.8, opacity: 0, y: 10 }}
                                    className="absolute top-10 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 z-[100] flex items-center gap-2 min-w-[100px]"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <input
                                        ref={inputRef}
                                        type="number"
                                        defaultValue={val || ''}
                                        placeholder="-"
                                        onKeyDown={handleKeyDown}
                                        className="w-12 bg-slate-800 border border-slate-700 rounded-lg p-1 text-center text-white font-bold text-xs outline-none focus:border-blue-500"
                                    />
                                    <button
                                        onClick={() => handleCommit(inputRef.current?.value)}
                                        className="w-6 h-6 bg-blue-600 hover:bg-blue-500 rounded flex items-center justify-center text-white transition-colors"
                                    >
                                        <Check className="w-3 h-3" />
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </>
                ) : (
                    // CHECKBOX (Hollow Circle)
                    <motion.button
                        disabled={isDisabled}
                        onClick={(e) => { e.stopPropagation(); onUpdate(1); }}
                        whileHover={{ scale: 1.1, borderColor: "rgba(255,255,255,0.5)" }}
                        className={`w-4 h-4 rounded-full border border-slate-800 bg-transparent transition-all cursor-pointer ${isDisabled ? 'opacity-20' : ''}`}
                    />
                )
            )}
        </div>
    );
}
