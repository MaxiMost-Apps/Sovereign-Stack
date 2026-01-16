import { motion, AnimatePresence } from 'framer-motion';
import { Check, Plus } from 'lucide-react';

interface CheckCircleProps {
  checked: boolean;
  color: string;
  isNumeric?: boolean;
  value?: number;
  onClick?: (e: any) => void;
  disabled?: boolean;
  size?: 'md' | 'lg'; // md for Week, lg for Day
}

export default function CheckCircle({ checked, color, isNumeric, value, onClick, disabled, size = 'lg' }: CheckCircleProps) {
  const sizeClasses = size === 'lg' ? 'w-12 h-12' : 'w-10 h-10';
  const iconSize = size === 'lg' ? 'w-6 h-6' : 'w-4 h-4';
  const textSize = size === 'lg' ? 'text-xs' : 'text-[10px]';

  return (
    <motion.button
      disabled={disabled}
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      animate={{
        scale: checked ? [1, 1.1, 1] : 1,
        boxShadow: checked ? `0 0 15px ${color}` : 'none'
      }}
      className={`${sizeClasses} rounded-full flex items-center justify-center transition-all relative flex-shrink-0 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      style={{
        backgroundColor: checked ? color : 'transparent',
        borderColor: color, // Sprint 21: Visual QA - Hollow circle border matches theme
        borderWidth: '2px',
        borderStyle: 'solid',
      }}
    >

      <AnimatePresence mode='wait'>
        {checked ? (
          <motion.div
            key="checked"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="text-white"
          >
            {isNumeric && value !== undefined ? (
               <span className={`${textSize} font-bold text-black`}>{value}</span>
            ) : (
               <Check className={`${iconSize} stroke-[3px]`} />
            )}
          </motion.div>
        ) : (
          <motion.div
            key="unchecked"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-slate-500"
          >
             {isNumeric && (
                value === 0 ? <Plus className={`${iconSize}`} /> : <span className={`${textSize} font-bold`}>{value}</span>
             )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
