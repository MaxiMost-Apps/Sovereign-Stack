import React from 'react';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';

export const CoreLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background text-text flex font-serif selection:bg-primary/20 selection:text-secondary">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64 relative">
        <main className="flex-1 p-12 max-w-5xl mx-auto w-full">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};
