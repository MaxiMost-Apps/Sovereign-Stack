import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-white/10 bg-surface py-6 text-center">
      <div className="text-xs text-primary/50 font-mono">
        <p>MAXIMOST LLC</p>
        <p>PO Box 123, Painesville, OH 44077</p>
        <p className="mt-2 text-primary/30">[SECURE LINK ESTABLISHED]</p>
      </div>
    </footer>
  );
};
