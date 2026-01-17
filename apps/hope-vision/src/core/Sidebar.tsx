import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Compass, Book, Users, Sparkles, Feather } from 'lucide-react';

export const Sidebar: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <aside className={cn("fixed left-0 top-0 h-screen w-64 bg-surface border-r border-gray-200 flex flex-col z-50 shadow-sm", className)}>

      {/* HEADER */}
      <div className="h-20 flex items-center px-6 border-b border-gray-100">
        <Feather className="w-6 h-6 text-primary mr-3" />
        <div>
          <h1 className="text-lg font-serif font-bold text-secondary tracking-wide">HOPE<span className="text-primary">VISION</span></h1>
          <div className="text-[10px] text-muted tracking-[0.2em] uppercase">Est. 2026</div>
        </div>
      </div>

      {/* NAV */}
      <nav className="flex-1 py-8 px-4 space-y-2 font-sans">
        <NavLink to="/path" className={({isActive}) => cn("flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-300", isActive ? "text-primary bg-primary/5 font-medium" : "text-gray-500 hover:text-secondary hover:bg-gray-50")}>
          <Compass className="w-4 h-4" /> THE PATH
        </NavLink>
        <NavLink to="/stories" className={({isActive}) => cn("flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-300", isActive ? "text-primary bg-primary/5 font-medium" : "text-gray-500 hover:text-secondary hover:bg-gray-50")}>
          <Book className="w-4 h-4" /> STORIES
        </NavLink>
        <NavLink to="/foundation" className={({isActive}) => cn("flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-300", isActive ? "text-primary bg-primary/5 font-medium" : "text-gray-500 hover:text-secondary hover:bg-gray-50")}>
          <Users className="w-4 h-4" /> FOUNDATION
        </NavLink>
        <NavLink to="/mirror" className={({isActive}) => cn("flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-300", isActive ? "text-primary bg-primary/5 font-medium" : "text-gray-500 hover:text-secondary hover:bg-gray-50")}>
          <Sparkles className="w-4 h-4" /> THE MIRROR
        </NavLink>
      </nav>

      <div className="p-6 border-t border-gray-100 bg-gray-50/50">
         <div className="text-xs text-gray-400 text-center font-serif italic">
            "The Obstacle Is The Way"
         </div>
      </div>
    </aside>
  );
};
