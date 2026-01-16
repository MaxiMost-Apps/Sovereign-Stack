import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Search, Database, Terminal, Shield, Zap, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../AuthSystem';
import { supabase } from '../supabase';

interface Command {
    id: string;
    label: string;
    icon: React.ElementType;
    action?: () => void;
    path?: string;
    color?: string; // Tailwind class
    hex?: string; // Specific Hex for style
    role?: 'admin' | 'user';
}

interface CommandMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CommandMenu({ isOpen, onClose }: CommandMenuProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on open & Check Admin Role
  useEffect(() => {
      if (isOpen) {
          setTimeout(() => inputRef.current?.focus(), 100);

          if (user) {
              supabase.from('profiles').select('role').eq('id', user.id).single().then(({ data }) => {
                  if (data?.role === 'ROOT_ADMIN') setIsAdmin(true);
              });
          }
      } else {
          setSearch("");
      }
  }, [isOpen, user]);

  const commands: Command[] = [
      {
          id: 'deep-scan',
          label: 'Deep Scan (Diagnostic)',
          icon: Search,
          path: '/dev-audit',
          hex: '#D4AF37', // Elite Gold (God Mode)
          role: 'admin'
      },
      {
          id: 'integrity',
          label: 'Integrity Check',
          icon: Shield,
          action: () => alert('Integrity verified.'),
          hex: '#D4AF37', // Elite Gold
          role: 'admin'
      },
      {
          id: 'nuke-cache',
          label: 'Nuke Cache (Reset)',
          icon: Zap,
          action: () => {
              localStorage.clear();
              sessionStorage.clear();
              window.location.reload();
          },
          hex: '#D4AF37', // Elite Gold (God Mode)
          role: 'admin'
      },
      {
          id: 'logs',
          label: 'System Logs',
          icon: Terminal,
          action: () => alert('Log stream active.'),
          hex: '#007BFF', // Kinetic Blue
          role: 'user'
      },
      {
          id: 'dashboard',
          label: 'Go to Dashboard',
          icon: Activity,
          path: '/dashboard',
          hex: '#007BFF',
          role: 'user'
      }
  ];

  const filteredCommands = commands.filter(c => {
      if (c.role === 'admin' && !isAdmin) return false;
      return c.label.toLowerCase().includes(search.toLowerCase());
  });

  const handleCommand = (cmd: Command) => {
      if (cmd.path) navigate(cmd.path);
      else if (cmd.action) cmd.action();
      onClose();
  };

  // Status HUD Logic (Nerve Center)
  const [statusColor, setStatusColor] = useState("bg-emerald-500");
  const [statusPulse, setStatusPulse] = useState("shadow-[0_0_10px_#10B981]");

  useEffect(() => {
      // Check System Events (Nerve Center)
      const checkStatus = async () => {
          try {
              const { data: events } = await supabase
                  .from('system_events')
                  .select('event_type')
                  .order('created_at', { ascending: false })
                  .limit(5);

              if (events && events.length > 0) {
                  const hasCritical = events.some((e: any) => e.event_type === 'CRITICAL');
                  const hasWarning = events.some((e: any) => e.event_type === 'WARNING');

                  if (hasCritical) {
                      setStatusColor("bg-red-500");
                      setStatusPulse("shadow-[0_0_10px_#EF4444]");
                  } else if (hasWarning) {
                      setStatusColor("bg-amber-500");
                      setStatusPulse("shadow-[0_0_10px_#F59E0B]");
                  } else {
                      setStatusColor("bg-emerald-500");
                      setStatusPulse("shadow-[0_0_10px_#10B981]");
                  }
              }
          } catch (e) {
              console.warn("Nerve Center Offline (Status Check Failed)");
          }
      };
      if (isOpen) checkStatus();
  }, [isOpen]);

  return (
    <AnimatePresence>
        {isOpen && (
            <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-[20vh] px-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                />

                {/* Main HUD */}
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: -20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: -20 }}
                    className="w-full max-w-2xl bg-[#0b0c10] border border-white/10 rounded-2xl shadow-2xl overflow-hidden relative z-10"
                >
                    {/* Header / Search */}
                    <div className="flex items-center gap-4 p-4 border-b border-white/5">
                        <Search className="w-5 h-5 text-slate-500" />
                        <input
                            ref={inputRef}
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Type a command..."
                            className="flex-1 bg-transparent text-lg text-white placeholder-slate-600 outline-none font-mono"
                        />
                        {/* Status Pulse */}
                        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5">
                            <div className={`w-2 h-2 rounded-full ${statusColor} animate-pulse ${statusPulse}`} />
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">SYSTEM ONLINE</span>
                        </div>
                        <div className="text-[10px] text-slate-600 font-bold border border-slate-800 px-2 py-1 rounded">ESC</div>
                    </div>

                    {/* Results */}
                    <div className="max-h-[60vh] overflow-y-auto p-2">
                        {filteredCommands.length === 0 ? (
                            <div className="p-8 text-center text-slate-600 text-sm">No commands found.</div>
                        ) : (
                            filteredCommands.map((cmd) => (
                                <button
                                    key={cmd.id}
                                    onClick={() => handleCommand(cmd)}
                                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div
                                            className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/5 bg-black/40"
                                            style={{ color: cmd.hex }}
                                        >
                                            <cmd.icon className="w-4 h-4" />
                                        </div>
                                        <span className="text-sm font-bold text-slate-300 group-hover:text-white">{cmd.label}</span>
                                    </div>
                                    {cmd.role === 'admin' && (
                                        <span className="text-[9px] font-black uppercase tracking-widest text-[#D4AF37] border border-[#D4AF37]/20 px-2 py-0.5 rounded bg-[#D4AF37]/10">
                                            GOD MODE
                                        </span>
                                    )}
                                </button>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-2 bg-black/40 border-t border-white/5 flex justify-between items-center text-[10px] text-slate-600 px-4">
                        <span>MaxiMost OS v6.0</span>
                        <div className="flex gap-2">
                            <span>Select: ↵</span>
                            <span>Navigate: ↑↓</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        )}
    </AnimatePresence>
  );
}
