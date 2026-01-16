import React from 'react';

export const SegmentedBar = ({ current, target, color = 'bg-blue-500' }: any) => {
  const displayTarget = Math.max(target, 1);
  const segments = 10;
  const percentage = Math.min(Math.max(current, 0) / displayTarget, 1);
  const fillCount = Math.ceil(percentage * segments);

  return (
    <div className="flex gap-0.5 h-1.5 w-full max-w-[120px] opacity-90 mt-2">
      {Array.from({ length: segments }).map((_, i) => (
        <div key={i} className={`h-full flex-1 rounded-[1px] transition-all ${i < fillCount ? `${color} shadow-[0_0_6px_currentColor]` : 'bg-white/10'}`} />
      ))}
    </div>
  );
};
