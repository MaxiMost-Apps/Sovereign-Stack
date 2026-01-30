import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-white/10 bg-surface/50 backdrop-blur-md py-6">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">

          {/* LEGAL ONLY - INDEPENDENT AUTHORITY */}
          <div className="text-center text-xs text-white/30 space-y-1">
            <p className="font-medium tracking-widest text-white/40">MAXIMOST LLC</p>
            <p>PO Box 123, Painesville, OH 44077</p>
          </div>

        </div>
      </div>
    </footer>
  );
};
