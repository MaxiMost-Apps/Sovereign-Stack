
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-emerald-900/30 bg-obsidian py-8 font-mono text-xs uppercase tracking-widest text-emerald-800/60">
      <div className="container mx-auto px-4">
        {/* Lab Switcher */}
        <div className="mb-6 flex justify-center space-x-8">
          <a href="#" className="hover:text-emerald-400 hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.5)] transition-all">Command</a>
          <a href="#" className="hover:text-emerald-400 hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.5)] transition-all">Intel</a>
          <a href="#" className="text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.3)] cursor-default">Defense</a>
          <a href="#" className="hover:text-emerald-400 hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.5)] transition-all">Soul</a>
        </div>

        {/* Legal & Location */}
        <div className="flex flex-col items-center space-y-2 text-center">
          <p>© 2026 MAXIMOST LLC | ALL RIGHTS RESERVED.</p>
          <p>P.O. BOX [TBD] | PAINESVILLE, OH 44077 | SECTOR OHIO.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
