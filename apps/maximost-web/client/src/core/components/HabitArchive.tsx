import React, { useState, useEffect } from 'react';
import { HabitCard } from './HabitCard';
import { Habit } from '@/types/habit';
import { Loader2 } from 'lucide-react';
import { useToast } from '../components/Toast';
import { lexiconStore } from '../../store/lexiconStore'; // REPAIR ORDER: Import Sovereign Store

interface HabitArchiveProps {
    onImport: (habit: Habit) => void;
    userHabits: Habit[]; // Pass user's active habits to gray them out
    onEdit?: (habit: Habit) => void; // Pass edit handler
}

export const HabitArchive: React.FC<HabitArchiveProps> = ({ onImport, userHabits, onEdit }) => {
    const [libraryHabits, setLibraryHabits] = useState<Habit[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    // Mapping user active habits for quick lookup
    const activeHabitSlugs = new Set(userHabits.map(h => h.slug));

    useEffect(() => {
        // REPAIR ORDER: Sovereign Source Loading
        // We bypass the API fetch completely to guarantee the list appears.
        const sovereignAtoms = lexiconStore.atoms.map((atom: any) => ({
            id: atom.title, // Use title as temp ID
            title: atom.title,
            description: atom.description || atom.how_instruction,
            category: atom.category,
            slug: atom.title.toLowerCase().replace(/\s+/g, '-'),
            metadata: {
                tactical: { description: atom.description }
            },
            ...atom
        }));

        setLibraryHabits(sovereignAtoms);
        setLoading(false);
    }, []);

    const handleAdopt = async (habit: Habit) => {
        try {
            // Use Absolute URL for Adoption
            const response = await fetch('https://maximost-api.onrender.com/api/habits/adopt', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ slug: habit.slug })
            });

            if (!response.ok) throw new Error('Adoption Failed');

            toast.success(`Protocol [${habit.title}] Deployed.`);
            onImport(habit); // Trigger parent refresh or modal

        } catch (error: any) {
            toast.error(error.message);
        }
    };

    if (loading) return <div className="p-12 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-zinc-700" /></div>;

    return (
        <div className="space-y-6">
             <div className="flex justify-between items-center mb-6">
                 {/* REPAIR ORDER: Rename to ATOM LEDGER */}
                 <h2 className="text-xl font-bold text-white uppercase tracking-widest">ATOM LEDGER</h2>
                 <span className="text-xs font-mono text-zinc-500">{libraryHabits.length} PROTOCOLS AVAILABLE</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                 {libraryHabits.map((t: any) => {
                    const isActive = activeHabitSlugs.has(t.slug);

                    const mappedHabit: Habit = {
                        id: t.slug, // Use slug as ID for library display
                        title: t.title,
                        description: t.metadata?.tactical?.description || t.description || "No description available",
                        category: t.category, // Pass through new categories
                        metadata: t.metadata,
                        type: t.type,
                        target_value: t.target_value,
                        unit: t.unit,
                        completed: isActive, // Hijack 'completed' to show active state
                        slug: t.slug,
                        theme: t.theme,
                        icon: t.icon
                    };

                    return (
                        <div key={t.slug} className={isActive ? "opacity-50 pointer-events-none grayscale" : ""}>
                            <HabitCard
                               habit={mappedHabit}
                               mode="archive"
                               onQuickImport={!isActive ? () => handleAdopt(mappedHabit) : undefined}
                               onEdit={onEdit} // Pass the slide-in trigger
                            />
                        </div>
                    );
                 })}
              </div>
        </div>
    );
};
