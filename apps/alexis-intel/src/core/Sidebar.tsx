import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Database, Lock, User, LayoutDashboard } from 'lucide-react';

// Mock User Data for Identity Section
const MOCK_USER = {
  name: 'JOSH',
  rank: 'SENTINEL', // Toggle to 'INITIATE' to test locked state
};

interface SidebarProps {
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  return (
    <aside className={cn("fixed left-0 top-0 h-screen w-64 bg-surface border-r border-white/10 flex flex-col z-50", className)}>

      {/* HEADER / LOGO */}
      <div className="h-16 flex items-center px-6 border-b border-white/10">
        <h1 className="text-xl font-bold tracking-widest text-white">
          ALEXIS<span className="text-amethyst">INTEL</span>
        </h1>
      </div>

      {/* NAVIGATION - INDEPENDENT AUTHORITY */}
      <nav className="flex-1 py-6 px-3 space-y-1">

        {/* INTEL DASHBOARD */}
        <NavLink
          to="/dashboard"
          className={({ isActive }) => cn(
            "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
            isActive
              ? "bg-amethyst/10 text-amethyst border border-amethyst/20"
              : "text-white/60 hover:bg-white/5 hover:text-white"
          )}
        >
          <LayoutDashboard className="w-4 h-4" />
          INTEL DASHBOARD
        </NavLink>

        {/* THE VAULT */}
        <NavLink
          to="/vault"
          className={({ isActive }) => cn(
            "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 group",
            isActive
              ? "bg-amethyst/10 text-amethyst border border-amethyst/20"
              : "text-white/60 hover:bg-white/5 hover:text-white"
          )}
        >
          <div className="relative">
            <Database className="w-4 h-4 group-hover:text-amethyst transition-colors" />
            {MOCK_USER.rank === 'INITIATE' && (
              <Lock className="w-3 h-3 absolute -top-1 -right-1 text-neon-red opacity-80" />
            )}
          </div>
          THE VAULT
        </NavLink>
      </nav>

      {/* IDENTITY (BOTTOM LEFT) */}
      <div className="p-4 border-t border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-amethyst/20 flex items-center justify-center border border-amethyst/30">
            <User className="w-4 h-4 text-amethyst" />
          </div>
          <div>
            <div className="text-sm font-bold text-white tracking-wider">{MOCK_USER.name}</div>
            <div className={cn(
              "text-xs font-mono tracking-widest",
              MOCK_USER.rank === 'SENTINEL' ? "text-neon-teal" : "text-white/40"
            )}>
              {MOCK_USER.rank}
            </div>
          </div>
        </div>
      </div>

    </aside>
  );
};
