import { useState, useEffect } from 'react';
import { supabase } from '@/core/supabase';
import { format } from 'date-fns';

export const useHabits = () => {
  const [habits, setHabits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. FETCH ONCE (No Loop)
  const fetchHabits = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data, error } = await supabase.from('habits').select('*').eq('user_id', user.id);
      if (error) throw error;
      setHabits(data || []);
    } catch (err) {
      console.error('Error fetching user habits:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const toggleHabit = async (habitId: string) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    setHabits(prev => prev.map(h =>
      h.habit_id === habitId ? { ...h, status: 'completed', streak: (h.streak || 0) + 1 } : h
    ));
    await fetch('https://sovereign-stack.onrender.com/api/completions/toggle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ habit_id: habitId, date: today, status: 'completed' })
    });
  };

  return { habits, loading, toggleHabit, refresh: fetchHabits };
};
