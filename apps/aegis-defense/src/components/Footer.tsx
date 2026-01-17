
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-emerald-900/30 bg-obsidian py-8 font-mono text-xs uppercase tracking-widest text-emerald-800/60">
      <div className="container mx-auto px-4 flex flex-col items-center space-y-4 text-center">

        {/* Independent Sub-tag */}
        <div className="mb-2">
            <span className="text-[10px] text-emerald-900/40 tracking-[0.2em] border border-emerald-900/20 px-2 py-1 rounded-sm">A MaxiMost Laboratory</span>
        </div>

        {/* Legal & Location */}
        <div className="flex flex-col items-center space-y-2">
          <p>© 2026 MAXIMOST LLC | ALL RIGHTS RESERVED.</p>
          <p>P.O. BOX [TBD] | PAINESVILLE, OH 44077 | SECTOR OHIO.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
