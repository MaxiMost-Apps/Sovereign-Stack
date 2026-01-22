import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { useAuth } from '../AuthSystem';
import { getApiUrl } from '@/config';

interface InspectorProps {
    children: React.ReactNode;
}

export const Inspector: React.FC<InspectorProps> = ({ children }) => {
    const { user, loading: authLoading } = useAuth();
    const [isSystemReady, setIsSystemReady] = useState(false);
    const [status, setStatus] = useState<string>("INITIALIZING NEURAL BRIDGE...");

    useEffect(() => {
        if (authLoading) return;
        if (!user) {
            setIsSystemReady(true); // Allow public/auth pages
            return;
        }

        const runDiagnostics = async () => {
            try {
                // 1. PRIMARY: Fetch Habits (Critical)
                // Use robust fetch that handles 400 (Sort Order Schema Mismatch)
                const { data: habits, error } = await supabase.from('habits').select('id').limit(1);

                if (error) {
                    console.warn("Habit Fetch Warning (Inspector):", error.message);
                    // FAIL OPEN: If Schema is broken (400), we still unlock dashboard
                    // The dashboard might show empty or error state, but won't loop.
                }

                // 2. SECONDARY: Fire & Forget (Non-Blocking)
                // Founding Status, Telemetry, etc.
                // fetch(getApiUrl('/api/founding-status')).catch(e => console.warn("Secondary Fetch Failed (Ignored):", e));
                // fetch(getApiUrl('/api/telemetry/uptime')).catch(e => console.warn("Telemetry Failed (Ignored):", e));

                // 3. UNLOCK
                setIsSystemReady(true);

            } catch (err) {
                console.error("Inspector Critical Failure:", err);
                setIsSystemReady(true); // Fail Open
            }
        };

        runDiagnostics();
    }, [user, authLoading]);

    if (!isSystemReady) {
        return (
            <div className="bg-[#0B1121] h-screen text-white flex items-center justify-center animate-pulse">
                {status}
            </div>
        );
    }

    return <>{children}</>;
};
