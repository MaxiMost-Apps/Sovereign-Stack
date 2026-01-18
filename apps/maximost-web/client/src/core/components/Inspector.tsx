import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { useAuth } from '../AuthSystem';

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
                const { data: habits, error } = await supabase.from('habits').select('id').limit(1);

                if (error) {
                    console.error("Habit Fetch Failed:", error);
                    // Fallback: If DB fails, we still show dashboard but it might be empty
                }

                // 2. SECONDARY: Fire & Forget (Non-Blocking)
                // Founding Status, Telemetry, etc.
                fetch('/api/founding-status').catch(e => console.warn("Secondary Fetch Failed (Ignored):", e));
                fetch('/api/telemetry/uptime').catch(e => console.warn("Telemetry Failed (Ignored):", e));

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
