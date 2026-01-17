import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-surface py-6 text-center font-sans">
      <div className="text-xs text-gray-400">
        <p className="tracking-widest uppercase">MaxiMost LLC</p>
        <p>PO Box 123, Painesville, OH 44077</p>
        <p className="mt-2 text-primary italic">"Amor Fati"</p>
      </div>
    </footer>
  );
};
