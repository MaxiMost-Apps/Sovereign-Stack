import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getApiUrl } from '@/config';

export const Founding500Ticker: React.FC = () => {
    const [count, setCount] = useState<number | null>(null);

    useEffect(() => {
        const fetchCount = async () => {
            try {
                // Determine API base URL (can be from env or relative if proxy setup)
                // Assuming Vite proxy or same domain for simplicity in monorepo dev
                const res = await fetch(getApiUrl('/api/stats/vanguard-count'));
                if (res.ok) {
                    const data = await res.json();
                    setCount(data.count);
                }
            } catch (err) {
                console.error("Failed to fetch Founding 500 count", err);
            }
        };

        fetchCount();
        const interval = setInterval(fetchCount, 60000); // Update every minute
        return () => clearInterval(interval);
    }, []);

    if (count === null) return null;

    const remaining = Math.max(0, 500 - count);

    return (
        <div className="flex items-center gap-2 bg-amber-900/30 border border-amber-500/30 rounded-full px-4 py-1.5 shadow-[0_0_15px_rgba(245,158,11,0.2)] animate-pulse">
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-amber-400 font-mono text-xs font-bold tracking-widest uppercase">
                Founding 500: {remaining} Spots Left
            </span>
        </div>
    );
};
