import React from 'react';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';

export const CoreLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background text-text flex font-mono selection:bg-primary/30">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64 relative overflow-hidden">
        {/* Scanline Effect */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-50 bg-[length:100%_2px,3px_100%] pointer-events-none" />

        <main className="flex-1 p-8 relative z-10">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};
