import React, { createContext, useContext, useState, useEffect } from 'react';
import { Shield, Compass, Eye, BarChart3, LucideIcon } from 'lucide-react';

export type LensType = 'fortitude' | 'reason' | 'visionary' | 'analytical';

interface LensTheme {
    color: string;
    icon: LucideIcon;
    label: string;
    description: string;
    hex: string;
}

export const LENS_THEMES: Record<LensType, LensTheme> = {
    fortitude: {
        color: 'emerald',
        hex: '#059669',
        icon: Shield,
        label: 'FORTITUDE',
        description: 'Tactical Terminal / Military HUD'
    },
    reason: {
        color: 'blue',
        hex: '#2563EB',
        icon: Compass,
        label: 'REASON',
        description: 'Architect Blueprint / Logical Grid'
    },
    visionary: {
        color: 'purple', // Amethyst maps to purple/violet usually
        hex: '#7C3AED',
        icon: Eye,
        label: 'VISIONARY',
        description: 'Modern Stoic / Institutional Vault'
    },
    analytical: {
        color: 'slate',
        hex: '#94A3B8',
        icon: BarChart3,
        label: 'ANALYTICAL',
        description: 'Clinical Research / Lab Dashboard'
    }
};

interface LensContextType {
    currentLens: LensType;
    setLens: (lens: LensType) => void;
    lensTheme: LensTheme;
}

const LensContext = createContext<LensContextType | undefined>(undefined);

export function LensProvider({ children }: { children: React.ReactNode }) {
    const [currentLens, setCurrentLens] = useState<LensType>(() => {
        // Hydrate from storage or default
        const saved = localStorage.getItem('activeLens');
        // Validate if it's a valid lens
        if (saved && ['fortitude', 'reason', 'visionary', 'analytical'].includes(saved)) {
            return saved as LensType;
        }
        return 'fortitude';
    });

    useEffect(() => {
        localStorage.setItem('activeLens', currentLens);
        // Dispatch storage event to sync across tabs/components if needed
        window.dispatchEvent(new Event('storage'));
    }, [currentLens]);

    // Listen for external changes (e.g. from PreferencesPage if it writes to localStorage)
    useEffect(() => {
        const handleStorage = () => {
             const saved = localStorage.getItem('activeLens');
             if (saved && saved !== currentLens && ['fortitude', 'reason', 'visionary', 'analytical'].includes(saved)) {
                 setCurrentLens(saved as LensType);
             }
        };
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, [currentLens]);

    const value = {
        currentLens,
        setLens: setCurrentLens,
        lensTheme: LENS_THEMES[currentLens]
    };

    return (
        <LensContext.Provider value={value}>
            {children}
        </LensContext.Provider>
    );
}

export function useLens() {
    const context = useContext(LensContext);
    if (context === undefined) {
        throw new Error('useLens must be used within a LensProvider');
    }
    return context;
}
