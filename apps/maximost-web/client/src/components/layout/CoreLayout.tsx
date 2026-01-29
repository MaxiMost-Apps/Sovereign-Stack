import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Menu, X } from 'lucide-react';
import { TelemetryHeader } from './TelemetryHeader';
import ConsoleOverlay from '@/components/ui/ConsoleOverlay';
import { VaultCore } from '@/components/vault/VaultCore';
import CommandMenu from '@/components/admin/CommandMenu';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '@/components/auth/AuthSystem';
import AccessDenied from '@/components/ui/AccessDenied';

export default function CoreLayout({ children }: { children?: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { role } = useAuth();

  // Global Command Palette Listener (Cmd+K)
  useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
          if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
              e.preventDefault();
              setIsCommandOpen(prev => !prev);
          }
          if (e.key === 'Escape') {
              setIsCommandOpen(false);
          }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Access Control Logic (Updated: Vault is open to all operators)
  const isRestricted = location.pathname.startsWith('/admin');
  const isAuthorized = role === 'ROOT_ADMIN';

  const content = (isRestricted && !isAuthorized) ? <AccessDenied /> : (children || <Outlet />);

  return (
    <div className="flex h-screen bg-[#0B1121] text-white overflow-hidden font-mono">

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR (Responsive & Persistent) */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-zinc-950 border-r border-zinc-800 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full overflow-y-auto scrollbar-hide">
           <div className="flex justify-end p-4 md:hidden">
              <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-white"><X /></button>
           </div>
           <Sidebar
              onCloseMobile={() => setSidebarOpen(false)}
              onOpenVault={() => setIsVaultOpen(true)}
           />
        </div>
      </div>

      {/* MAIN CONTENT area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* MOBILE HEADER */}
        <div className="md:hidden flex items-center p-4 border-b border-gray-800 bg-[#0F172A]">
           <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-2 text-gray-400 hover:text-white">
              <Menu />
           </button>
           <span className="font-bold ml-2 text-lg">MaxiMost</span>
        </div>

        {/* 1% HEADER (Telemetry) */}
        <div className="hidden md:block">
           <TelemetryHeader />
           {/* 1% Loading Bar */}
           <motion.div
              key={location.pathname + "bar"}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.5, ease: "circOut" }}
              className="h-[2px] bg-blue-500 shadow-[0_0_10px_#3b82f6]"
           />
        </div>

        {/* PAGE CONTENT (Animated) */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-hide relative">
           <AnimatePresence mode="wait">
             <motion.div
               key={location.pathname}
               initial={{ x: 20, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               exit={{ x: -20, opacity: 0 }}
               transition={{ duration: 0.3, ease: "easeOut" }}
               className="h-full"
             >
                {content}
             </motion.div>
           </AnimatePresence>
        </main>
      </div>

      {/* VAULT OVERLAY */}
      <ConsoleOverlay
        isOpen={isVaultOpen}
        onClose={() => setIsVaultOpen(false)}
        title="Sovereign Vault"
      >
         <VaultCore isOverlay={true} />
      </ConsoleOverlay>

      {/* TACTICAL OVERLAY (Command Menu) */}
      <CommandMenu isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />

    </div>
  );
}
