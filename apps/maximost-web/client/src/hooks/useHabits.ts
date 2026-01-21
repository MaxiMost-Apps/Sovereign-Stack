import { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { useToast } from '../components/Toast';

export const useHabits = () => {
    const [habits, setHabits] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    // Fetch habits from the API (which queries library_habits/atoms)
    const fetchHabits = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://sovereign-stack.onrender.com/api/habits/library');
            if (!response.ok) throw new Error('Failed to fetch habit library');
            const data = await response.json();
            setHabits(data || []);
        } catch (error: any) {
            console.error('useHabits Error:', error);
            toast.error('Failed to load habits: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHabits();
    }, []);

    return { habits, loading, refetch: fetchHabits };
};
