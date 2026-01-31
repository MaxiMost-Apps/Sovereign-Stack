import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Library, Activity, BookOpen, Bot, Monitor, FileText, Settings, Shield, LogOut, User } from 'lucide-react';
import { Toaster } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from './AuthSystem';

interface CoreLayoutProps {
  children: React.ReactNode;
}

const CoreLayout: React.FC<CoreLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-blue-400 border-l-2 border-blue-400 bg-blue-500/5' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5';
  };

  const handleSignOut = async () => {
      await signOut();
      navigate('/login');
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
      <aside className="w-64 bg-[#020408] border-r border-white/5 flex-shrink-0 fixed h-full z-50 flex flex-col">
        <div className="p-8 flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-900/50">
                <Shield size={18} fill="currentColor" />
             </div>
             <div>
                <h1 className="text-xl font-black italic tracking-tighter text-white">MAXIMOST</h1>
                <p className="text-[8px] text-blue-500 font-bold uppercase tracking-[0.3em] pl-0.5">Titan OS V1.9</p>
             </div>
        </div>

        <nav className="space-y-8 mt-4 flex-1 overflow-y-auto scrollbar-none">
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

        {/* USER PROFILE SECTION */}
        <div className="p-6 border-t border-white/5 bg-[#050A14]">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600/20 text-blue-500 flex items-center justify-center border border-blue-500/30">
                        <User size={16} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-white tracking-wide">{user?.email?.split('@')[0] || 'Josh'}</span>
                        <span className="text-[9px] text-green-500 font-mono uppercase tracking-widest">Signed In</span>
                    </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="p-2 text-gray-600 hover:text-red-500 transition-colors rounded-md hover:bg-white/5"
                  title="Sign Out"
                >
                    <LogOut size={16} />
                </button>
            </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 ml-64 relative overflow-hidden">
         <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="min-h-screen"
            >
                {children}
            </motion.div>
         </AnimatePresence>
         <Toaster position="bottom-right" theme="dark" />
      </main>
    </div>
  );
};

export default CoreLayout;
