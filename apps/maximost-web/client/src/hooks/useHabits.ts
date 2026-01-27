import { useState, useEffect } from 'react';
import { supabase } from '../core/supabase';

export const useHabits = () => {
    const [habits, setHabits] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
        fetchUserHabits();
    }, []);

    return { habits, loading };
};
