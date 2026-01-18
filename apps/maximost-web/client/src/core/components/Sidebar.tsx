import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Archive, Activity, BookOpen,
  MessageSquare, ShieldAlert, BookText, Lock,
  Settings, LogOut, Zap, Ruler, Wrench
} from 'lucide-react';
import { CommandDisengageModal } from '@/core/components/ui/CommandDisengageModal';
import { useAuth } from '@/core/AuthSystem';

export const Sidebar = () => {
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut, role } = useAuth();

  const navItems = [
    { section: 'COMMAND', items: [
      { name: 'THE DASH', icon: LayoutDashboard, path: '/dashboard' },
      { name: 'THE ARCHIVE', icon: Archive, path: '/archive' },
      { name: 'BODY HUD', icon: Activity, path: '/body-hud' },
      { name: 'THE LEDGER', icon: BookOpen, path: '/ledger' },
    ]},
    { section: 'TOOLS', items: [
      { name: 'AI COACH', icon: MessageSquare, path: '/coach' },
      { name: 'THE MIRROR', icon: ShieldAlert, path: '/mirror' },
      { name: 'BLUEPRINTS', icon: Ruler, path: '/architect?tab=blueprints' },
      { name: 'MASTER TOOLBELT', icon: Wrench, path: '/architect?tab=toolbelt' },
      { name: 'THE LEXICON', icon: BookText, path: '/tools/lexicon' },
    ]},
    { section: 'SYSTEM', items: [
      { name: 'THE VAULT', icon: Lock, path: '/vault' },
      ...(role === 'ROOT_ADMIN' ? [{ name: 'ADMIN DIAG', icon: ShieldAlert, path: '/admin/diagnostics', variant: 'warning' }] : []),
      { name: 'PREFERENCES', icon: Zap, path: '/preferences' },
    ]}
  ];

  const handleLogout = async () => {
      await signOut();
      // KILL-SWITCH: Full Reload to clear all state
      window.location.reload();
  };

  return (
    <aside className="w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col h-screen font-mono">
      {/* Identity Anchor: Logo & Blue Light */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-sm overflow-hidden shadow-[0_0_15px_rgba(37,99,235,0.5)] border border-blue-500/30">
          <img src="/Gemini_sq_logo1.png" alt="M" className="w-full h-full object-cover" />
        </div>
        <span className="text-xl font-bold tracking-tighter text-white">MAXIMOST</span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-8 overflow-y-auto scrollbar-hide">
        {navItems.map((group) => (
          <div key={group.section}>
            <h3 className="text-xs font-semibold text-zinc-500 tracking-[0.2em] mb-4 px-2">
              {group.section}
            </h3>
            <div className="space-y-1">
              {group.items.map((item: any) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => {
                     // CUSTOM ACTIVE LOGIC FOR QUERY PARAMS (Double Blue Fix)
                     const isMatch = item.path.includes('?')
                        ? location.pathname + location.search === item.path
                        : isActive;

                     // CUSTOM VARIANT LOGIC (Orange for Admin)
                     if (item.variant === 'warning') {
                        return `flex items-center gap-3 px-3 py-2 text-sm transition-all duration-200 group ${isMatch ? 'text-orange-400 bg-orange-500/10 border-l-4 border-orange-600' : 'text-zinc-400 hover:text-orange-400 hover:bg-zinc-900'}`;
                     }

                     return `
                        flex items-center gap-3 px-3 py-2 text-sm transition-all duration-200 group
                        ${isMatch
                          ? 'text-blue-400 bg-blue-500/10 border-l-4 border-blue-600'
                          : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}
                     `;
                  }}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="font-medium tracking-tight">{item.name}</span>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Personnel Block (Utility Dock) */}
      <div className="p-4 border-t border-zinc-800 bg-zinc-950/50">
        <div className="flex items-center justify-between">

          {/* User Profile (Click to Edit) */}
          <div
            onClick={() => navigate('/preferences')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative">
                <div className="w-8 h-8 rounded bg-zinc-800 flex items-center justify-center text-xs font-bold text-blue-400 border border-blue-500/30 group-hover:border-blue-400 transition-colors">
                {user?.email?.[0]?.toUpperCase() || 'A'}
                </div>
                <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-black animate-pulse shadow-[0_0_8px_#3b82f6]"></div>
            </div>

            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-white uppercase tracking-tight truncate max-w-[80px] group-hover:text-blue-400 transition-colors">
                  {user?.email?.split('@')[0] || 'Vance'}
              </span>
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-tight">Tier 1</span>
            </div>
          </div>

          {/* Utility Icons */}
          <div className="flex items-center gap-1">
             <button
                onClick={() => navigate('/vault')}
                className="text-zinc-500 hover:text-white transition-colors p-1.5 hover:bg-zinc-900 rounded"
                title="The Vault"
             >
                <Lock className="w-4 h-4" />
             </button>
             <button
                onClick={() => navigate('/preferences')}
                className="text-zinc-500 hover:text-white transition-colors p-1.5 hover:bg-zinc-900 rounded"
                title="Preferences"
             >
                <Settings className="w-4 h-4" />
             </button>
             <a
                href="/"
                onClick={(e) => {
                    e.preventDefault();
                    window.localStorage.clear();
                    window.location.href = '/';
                }}
                className="text-zinc-500 hover:text-red-500 transition-colors p-1.5 hover:bg-red-950/20 rounded flex items-center justify-center cursor-pointer"
                title="Disengage"
             >
                <LogOut className="w-4 h-4" />
             </a>
          </div>

        </div>
      </div>

      <CommandDisengageModal
        isOpen={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
        onConfirm={handleLogout}
        title="Disengage Command?"
        message="You are leaving the command console. Momentum will be paused."
      />
    </aside>
  );
};
