import { useState, useEffect } from 'react';
import { supabase } from '@/core/supabase';
import { toast } from 'sonner';

export const useHabits = () => {
  const [habits, setHabits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // FETCH ONCE (No Loops)
  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('habits')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active');

      if (error) throw error;
      setHabits(data || []);
    } catch (error) {
      console.error('Error fetching habits:', error);
    } finally {
      setLoading(false);
    }
  };

  // THE MISSING LINK: WRITE TO DB
  const toggleHabit = async (habitId: string) => {
    // 1. Optimistic Update (Instant UI)
    const today = new Date().toISOString().split('T')[0];
    setHabits(prev => prev.map(h => {
      if (h.habit_id === habitId) {
        return { ...h, status: h.status === 'completed' ? 'active' : 'completed' };
      }
      return h;
    }));

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // 2. Database Write
      // Check if row exists
      const { data: existing } = await supabase
        .from('habits')
        .select('*')
        .eq('user_id', user.id)
        .eq('habit_id', habitId)
        .single();

      if (existing) {
        // Toggle Logic
        const newStatus = existing.status === 'completed' ? 'active' : 'completed';
        await supabase
          .from('habits')
          .update({ status: newStatus, last_completed: newStatus === 'completed' ? today : existing.last_completed })
          .eq('id', existing.id);
      } else {
        // Create Logic
        await supabase
          .from('habits')
          .insert({
            user_id: user.id,
            habit_id: habitId,
            status: 'completed',
            last_completed: today
          });
      }
    } catch (error) {
      console.error('Toggle failed:', error);
      toast.error('Failed to save progress');
      // Revert optimistic update here if needed
    }
  };

  return { habits, loading, toggleHabit, refresh: fetchHabits };
};
