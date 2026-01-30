import React from 'react';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';

interface CoreLayoutProps {
  children: React.ReactNode;
}

export const CoreLayout: React.FC<CoreLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background text-white flex font-sans selection:bg-amethyst/30">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT WRAPPER */}
      <div className="flex-1 flex flex-col ml-64 relative overflow-hidden">

        {/* Background Ambient Glow */}
        <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-amethyst/10 rounded-full blur-[120px] pointer-events-none z-0" />

        {/* Page Content */}
        <main className="flex-1 p-8 relative z-10 animate-enter">
          {children}
        </main>

        {/* Footer */}
        <Footer />

      </div>
    </div>
  );
};
