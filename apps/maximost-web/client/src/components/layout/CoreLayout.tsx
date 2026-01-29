import React from 'react';
import { Toaster } from 'sonner';

export const CoreLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-[#050A14] text-slate-200 selection:bg-blue-500/30">
      {children}
      <Toaster position="top-center" theme="dark" />
    </div>
  );
};
