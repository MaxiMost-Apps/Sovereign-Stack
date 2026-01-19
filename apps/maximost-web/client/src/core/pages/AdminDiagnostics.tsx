// src/pages/AdminDiagnostics.tsx
import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { getApiUrl } from '../../config';

export default function AdminDiagnostics() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // FORCE-FETCH the real endpoint. No caching.
    // Enhanced with Auth to pass middleware
    const fetchDiagnostics = async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            const token = session?.access_token;

            if (!token) {
                setError("No Active Session. Please Login.");
                return;
            }

            const res = await fetch(getApiUrl('/api/admin/diagnostics'), {
              headers: {
                  'Cache-Control': 'no-cache',
                  'Authorization': `Bearer ${token}`
              }
            });

            const json = await res.json();
            if (!res.ok) throw new Error(json.error || `Status: ${res.status}`);
            setData(json);
        } catch (err: any) {
            setError(err.message);
        }
    };

    fetchDiagnostics();
  }, []);

  return (
    <div style={{ padding: '40px', background: '#000', color: '#0F0', fontFamily: 'monospace', minHeight: '100vh' }}>
      <h1>💀 SOVEREIGN DIAGNOSTICS (RAW)</h1>

      {error && <h2 style={{ color: 'red' }}>❌ ERROR: {error}</h2>}

      {!data && !error && <h3>Ping...</h3>}

      {data && (
        <>
          <div style={{ border: '1px solid #333', padding: '20px', marginBottom: '20px' }}>
            <h3>1. DATABASE STATUS</h3>
            {/* If this is 42, we kill the fallback file */}
            <p>DB REAL HABIT COUNT: <strong>{data.db_real_count}</strong> (User Table)</p>
            <p>LIB REAL HABIT COUNT: <strong>{data.lib_real_count}</strong> (Library Table)</p>
            <p>SCHEMA HEALTH: <strong>{data.schema_health ? '✅ ONLINE' : '❌ CRITICAL FAILURE'}</strong></p>
            <p>USER: <strong>{data.user_email}</strong></p>
          </div>

          <div style={{ border: '1px solid #333', padding: '20px' }}>
            <h3>2. ROUTE AUDIT (The 405 Check)</h3>
            <pre>{JSON.stringify(data.route_audit, null, 2)}</pre>
          </div>
        </>
      )}
    </div>
  );
}
