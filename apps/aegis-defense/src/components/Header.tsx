
import React from 'react';
import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="w-full border-b border-emerald-900/30 bg-obsidian py-4 font-mono text-xs uppercase tracking-widest text-emerald-500">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo / Brand */}
        <Link to="/" className="flex items-center space-x-2 hover:text-emerald-400 transition-colors group">
          <Shield size={20} className="text-emerald-500 group-hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.5)] transition-all" />
          <span className="font-bold text-lg tracking-tighter">AEGIS<span className="text-emerald-800 font-normal">//DEFENSE</span></span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-8">
          <a href="#" className="hover:text-white hover:drop-shadow-[0_0_5px_rgba(16,185,129,0.5)] transition-all">Guides</a>
          <a href="#" className="hover:text-white hover:drop-shadow-[0_0_5px_rgba(16,185,129,0.5)] transition-all">Protocols</a>
          <a href="#" className="hover:text-white hover:drop-shadow-[0_0_5px_rgba(16,185,129,0.5)] transition-all">Tools</a>
          <Link to="/" className="text-emerald-400 font-bold border-b border-emerald-500/50 pb-0.5 hover:text-white transition-all">The Lab</Link>
        </nav>

        {/* Mobile Menu Placeholder (Optional for now) */}
        <div className="md:hidden text-emerald-800">
            [MENU]
        </div>
      </div>
    </header>
  );
};

export default Header;
