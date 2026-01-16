import React from 'react';
import { useAuth } from '../core/AuthSystem';
import { useToast } from './Toast';

export const AscensionOverlay = () => {
    const { user } = useAuth();
    const { toast } = useToast();

    const handleAscend = async () => {
        try {
            const response = await fetch('/api/stripe/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: user.id,
                    target_tier: 'SENTINEL', // Default ascension target
                    success_url: window.location.origin + '/dashboard?session_id={CHECKOUT_SESSION_ID}',
                    cancel_url: window.location.href
                })
            });
            const data = await response.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                console.error("Ascension Link Failed");
                toast.error("Ascension Link Failed");
            }
        } catch (e) {
            console.error("Connection Error");
            toast.error("Connection Error");
        }
    };

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
            {/* Card */}
            <div className="pointer-events-auto p-8 rounded-xl max-w-md text-center border-2 border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.2)]" style={{
                backdropFilter: 'blur(16px)',
                background: 'rgba(5, 5, 5, 0.8)'
            }}>
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">
                    Sovereign History
                </h2>
                <p className="text-emerald-400 font-mono text-sm mb-6 leading-relaxed">
                    "History is reserved for the Sovereign. Your data is your power—don't let it fade. Ascend to Sentinel to unlock your full lineage and claim your legacy."
                </p>
                <button
                    onClick={handleAscend}
                    className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest rounded-lg transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)]"
                >
                    ASCEND NOW
                </button>
            </div>
        </div>
    );
};
