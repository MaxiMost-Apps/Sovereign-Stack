import React, { useState, useEffect } from 'react';
import { supabase } from '@/core/supabase'; // Adjust based on your setup
import { HabitCard } from './HabitCard';
import { Habit } from '@/types/habit';
import { Loader2 } from 'lucide-react';
import { useToast } from '../components/Toast';

interface HabitArchiveProps {
    onImport: (habit: Habit) => void;
    userHabits: Habit[]; // Pass user's active habits to gray them out
}

export const HabitArchive: React.FC<HabitArchiveProps> = ({ onImport, userHabits }) => {
    const [libraryHabits, setLibraryHabits] = useState<Habit[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    // Mapping user active habits for quick lookup
    const activeHabitSlugs = new Set(userHabits.map(h => h.slug));

    useEffect(() => {
        const fetchLibrary = async () => {
            try {
                // Fetch from API
                const response = await fetch('/api/habits/library'); // Using the new endpoint
                if (!response.ok) throw new Error('API Sync Failed');
                const data = await response.json();

                setLibraryHabits(data || []);
            } catch (error) {
                console.error("Archive Load Error:", error);
                // Fallback to direct supabase if API fails (Dev/Staging)
                const { data } = await supabase.from('library_habits').select('*').order('title');
                setLibraryHabits(data || []);
            } finally {
                setLoading(false);
            }
        };

        fetchLibrary();
    }, []);

    const handleAdopt = async (habit: Habit) => {
        // Optimistic UI updates handled by parent (onImport)
        // Here we just trigger the backend adoption
        try {
            const response = await fetch('/api/habits/adopt', {
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
                 <h2 className="text-xl font-bold text-white uppercase tracking-widest">Protocol Archive</h2>
                 <span className="text-xs font-mono text-zinc-500">{libraryHabits.length} PROTOCOLS AVAILABLE</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                 {libraryHabits.map((t: any) => {
                    const isActive = activeHabitSlugs.has(t.slug);

                    const mappedHabit: Habit = {
                        id: t.slug, // Use slug as ID for library display
                        title: t.title,
                        description: t.description,
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
                            />
                        </div>
                    );
                 })}
              </div>
        </div>
    );
};
