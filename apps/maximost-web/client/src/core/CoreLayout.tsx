import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Library, Activity, BookOpen, Bot, Monitor, FileText, Settings, Shield } from 'lucide-react';
import { Toaster } from 'sonner';

interface CoreLayoutProps {
  children: React.ReactNode;
}

const CoreLayout: React.FC<CoreLayoutProps> = ({ children }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-blue-400 border-l-2 border-blue-400 bg-blue-500/5' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5';
  };

  const NavItem = ({ to, icon: Icon, label }: { to: string, icon: any, label: string }) => (
    <Link
      to={to}
      className={`flex items-center gap-3 px-6 py-3 transition-all duration-200 text-sm font-bold tracking-widest uppercase ${isActive(to)}`}
    >
      <Icon size={18} />
      <span>{label}</span>
    </Link>
  );

  return (
    <div className="flex min-h-screen bg-[#020408] font-sans">
      {/* FIXED LEFT SIDEBAR */}
      <aside className="w-64 bg-[#020408] border-r border-white/5 flex-shrink-0 fixed h-full z-50">
        <div className="p-8">
            <h1 className="text-2xl font-black italic tracking-tighter text-white">TITAN<span className="text-blue-500">.OS</span></h1>
            <p className="text-[10px] text-gray-600 font-mono mt-1 tracking-[0.3em]">V1.6 STABLE</p>
        </div>

        <nav className="space-y-8 mt-4">
            <div>
                <div className="px-6 mb-2 text-[10px] font-bold text-gray-600 uppercase tracking-widest">Command</div>
                <NavItem to="/dashboard" icon={LayoutDashboard} label="The Dash" />
                <NavItem to="/archive" icon={Library} label="The Archive" />
                <NavItem to="/body-hud" icon={Activity} label="Body HUD" />
                <NavItem to="/ledger" icon={BookOpen} label="The Ledger" />
            </div>

            <div>
                <div className="px-6 mb-2 text-[10px] font-bold text-gray-600 uppercase tracking-widest">Tools</div>
                <NavItem to="/coach" icon={Bot} label="AI Coach" />
                <NavItem to="/mirror" icon={Monitor} label="The Mirror" />
                <NavItem to="/stacks" icon={FileText} label="Blueprints" />
            </div>

            <div>
                <div className="px-6 mb-2 text-[10px] font-bold text-gray-600 uppercase tracking-widest">System</div>
                <NavItem to="/vault" icon={Shield} label="The Vault" />
                <NavItem to="/preferences" icon={Settings} label="Preferences" />
            </div>
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 ml-64 relative">
         {children}
         <Toaster position="bottom-right" theme="dark" />
      </main>
    </div>
  );
};

export default CoreLayout;
