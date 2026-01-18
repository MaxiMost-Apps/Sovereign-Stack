import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Shield, AlertTriangle } from 'lucide-react';

export const Telemetry = () => {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newLog = `[${new Date().toISOString()}] SIGNAL DETECTED: SECTOR ${Math.floor(Math.random() * 9) + 1} - INTEGRITY ${Math.floor(Math.random() * 20) + 80}%`;
      setLogs(prev => [newLog, ...prev].slice(0, 10));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-mono">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-4 mb-4">
          <Activity className="w-8 h-8 text-primary animate-pulse" />
          <h1 className="text-4xl md:text-5xl text-primary tracking-tighter">LIVE INGEST FEED</h1>
        </div>
        <p className="text-gray-500 border-l-2 border-primary pl-4">
          Real-time biometrics and environmental telemetry.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
           <div className="bg-black/50 border border-primary/20 p-4 rounded-sm h-[400px] overflow-hidden relative">
              <div className="absolute top-0 right-0 p-2 text-xs text-primary/50">ENCRYPTED // TLS 1.3</div>
              <div className="space-y-2">
                {logs.map((log, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-sm text-green-400 font-mono"
                  >
                    {log}
                  </motion.div>
                ))}
              </div>
              <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-black to-transparent pointer-events-none" />
           </div>
        </div>

        <div className="space-y-6">
            <div className="bg-primary/5 border border-primary/20 p-6">
                <div className="flex items-center gap-2 mb-2 text-primary">
                    <Shield className="w-5 h-5" />
                    <h3 className="font-bold">SYSTEM STATUS</h3>
                </div>
                <div className="text-3xl font-bold text-white mb-1">OPTIMAL</div>
                <div className="w-full bg-gray-800 h-1 mt-2">
                    <div className="bg-primary h-full w-[95%] animate-pulse" />
                </div>
            </div>

             <div className="bg-amber-500/10 border border-amber-500/20 p-6">
                <div className="flex items-center gap-2 mb-2 text-amber-500">
                    <AlertTriangle className="w-5 h-5" />
                    <h3 className="font-bold">THREAT LEVEL</h3>
                </div>
                <div className="text-3xl font-bold text-white mb-1">LOW</div>
                <div className="text-xs text-amber-500/70">Routine monitoring active.</div>
            </div>
        </div>
      </div>
    </div>
  );
};
