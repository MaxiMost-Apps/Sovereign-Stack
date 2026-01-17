import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Shield, BookOpen, Lock, Wrench, FlaskConical } from 'lucide-react';

export const Sidebar: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <aside className={cn("fixed left-0 top-0 h-screen w-64 bg-surface border-r border-primary/20 flex flex-col z-50", className)}>

      {/* HEADER */}
      <div className="h-16 flex items-center px-6 border-b border-primary/20 bg-black/40">
        <Shield className="w-6 h-6 text-primary mr-2" />
        <h1 className="text-xl font-bold tracking-widest text-white">AEGIS<span className="text-primary">DEFENSE</span></h1>
      </div>

      {/* NAV */}
      <nav className="flex-1 py-6 px-3 space-y-1 font-mono">
        <NavLink to="/guides" className={({isActive}) => cn("flex items-center gap-3 px-3 py-2 rounded text-sm hover:bg-primary/10 transition-colors", isActive ? "text-primary bg-primary/10" : "text-white/60")}>
          <BookOpen className="w-4 h-4" /> GUIDES
        </NavLink>
        <NavLink to="/protocols" className={({isActive}) => cn("flex items-center gap-3 px-3 py-2 rounded text-sm hover:bg-primary/10 transition-colors", isActive ? "text-primary bg-primary/10" : "text-white/60")}>
          <Lock className="w-4 h-4" /> PROTOCOLS
        </NavLink>
        <NavLink to="/tools" className={({isActive}) => cn("flex items-center gap-3 px-3 py-2 rounded text-sm hover:bg-primary/10 transition-colors", isActive ? "text-primary bg-primary/10" : "text-white/60")}>
          <Wrench className="w-4 h-4" /> TOOLS
        </NavLink>
        <NavLink to="/lab" className={({isActive}) => cn("flex items-center gap-3 px-3 py-2 rounded text-sm hover:bg-primary/10 transition-colors", isActive ? "text-primary bg-primary/10" : "text-white/60")}>
          <FlaskConical className="w-4 h-4" /> THE LAB
        </NavLink>
      </nav>

      <div className="p-4 border-t border-primary/20">
         <div className="text-xs text-primary/40 text-center font-mono">
            UNIT TANK // OPERATIONAL
         </div>
      </div>
    </aside>
  );
};
