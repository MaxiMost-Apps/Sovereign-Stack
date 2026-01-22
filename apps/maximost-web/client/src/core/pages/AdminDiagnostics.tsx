// src/pages/AdminDiagnostics.tsx
import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { getApiUrl } from '../../config';

export default function AdminDiagnostics() {
  const [scanning, setScanning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [status, setStatus] = useState<string>('idle');

  useEffect(() => {
    // FORCE-FETCH the real endpoint. No caching.
    // Enhanced with Auth to pass middleware
    const runDiagnostics = async () => {
        setScanning(true);
        setLogs(prev => [...prev, "INITIALIZING SYSTEM SCAN..."]);
        try {
            // 1. LATENCY CHECK
            const start = performance.now();
            const { count, error } = await supabase.from('habits').select('*', { count: 'exact', head: true });
            const latency = Math.round(performance.now() - start);
            if (error) throw error;
            setLogs(prev => [...prev, `✅ DATABASE CONNECTION: ACTIVE (${latency}ms)`]);
            setLogs(prev => [...prev, `✅ RECORDS FOUND: ${count}`]);

            // 2. AUTH CHECK
            const { data: session } = await supabase.auth.getSession();
            if (session?.session) {
                setLogs(prev => [...prev, `✅ AUTH TOKEN: VALID (User: ${session.session.user.id.slice(0,4)}...)`]);
            } else {
                setLogs(prev => [...prev, `⚠️ AUTH TOKEN: MISSING OR EXPIRED`]);
            }
            setStatus('operational');
        } catch (e: any) {
            setLogs(prev => [...prev, `❌ CRITICAL FAILURE: ${e.message}`]);
            setStatus('error');
        } finally {
            setScanning(false);
        }
    };

    runDiagnostics();
  }, []);

  return (
    <div style={{ padding: '40px', background: '#000', color: '#0F0', fontFamily: 'monospace', minHeight: '100vh' }}>
      <h1>💀 SOVEREIGN DIAGNOSTICS (REAL-TIME)</h1>

      <div style={{ border: '1px solid #333', padding: '20px', marginBottom: '20px', minHeight: '300px' }}>
         {logs.map((log, i) => (
             <div key={i} style={{ marginBottom: '5px' }}>{log}</div>
         ))}
         {scanning && <div className="animate-pulse">_</div>}
      </div>

      {status === 'operational' && <h2 style={{ color: '#0F0' }}>SYSTEM OPERATIONAL</h2>}
      {status === 'error' && <h2 style={{ color: 'red' }}>SYSTEM COMPROMISED</h2>}

    </div>
  );
}
