import { useState, useEffect } from 'react';
import { supabase } from '../core/supabase';

export const useHabits = () => {
    const [habits, setHabits] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchUserHabits = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data } = await supabase
            .from('habits')
            .select('*')
            .eq('user_id', user.id);

        if (data) setHabits(data);
        setLoading(false);
    };

    const toggleHabit = async (habitId: string) => {
        // Placeholder for external toggle logic if needed.
        // Currently DashboardSingularity handles toggling inline for complex state.
        // But we expose it here for other components.
        await fetchUserHabits();
    };

    useEffect(() => {
        fetchUserHabits();
    }, []);

    return { habits, loading, toggleHabit, refetch: fetchUserHabits };
};
