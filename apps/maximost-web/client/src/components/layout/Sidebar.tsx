import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Library, Settings, LogOut, User } from 'lucide-react';

export const Sidebar = () => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Mission', path: '/' },
    { icon: Library, label: 'Library', path: '/library' },
    { icon: Settings, label: 'System', path: '/preferences' },
  ];

  return (
    <div className="w-16 hover:w-64 transition-all duration-300 h-full bg-[#0A0F1C] border-r border-white/5 flex flex-col z-50 group absolute md:relative overflow-hidden">

      {/* LOGO AREA */}
      <div className="h-16 flex items-center justify-center border-b border-white/5 shrink-0">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-xs">
          T
        </div>
        <span className="ml-3 font-black tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          TITAN V2
        </span>
      </div>

      {/* NAV LINKS */}
      <nav className="flex-1 py-6 space-y-2 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center h-10 px-2.5 rounded-lg transition-all duration-200
              ${isActive
                ? 'bg-blue-600/10 text-blue-400 shadow-[0_0_10px_rgba(37,99,235,0.2)]'
                : 'text-slate-500 hover:text-slate-200 hover:bg-white/5'}
            `}
          >
            <item.icon size={20} className="shrink-0" />
            <span className="ml-3 text-sm font-bold tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              {item.label}
            </span>
          </NavLink>
        ))}
      </nav>

      {/* USER FOOTER */}
      <div className="p-2 border-t border-white/5 shrink-0">
        <button className="flex items-center w-full h-10 px-2.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-colors">
          <User size={20} className="shrink-0" />
          <span className="ml-3 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            OPERATOR
          </span>
        </button>
      </div>

    </div>
  );
};
