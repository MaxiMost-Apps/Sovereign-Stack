import { useState, useEffect } from 'react';
import { supabase } from '@/core/supabase';
import { toast } from 'sonner';

export const useHabits = () => {
  const [habits, setHabits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
      console.error('❌ FETCH ERROR:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleHabit = async (habitId: string) => {
    const today = new Date().toISOString().split('T')[0];

    // Optimistic UI Update
    const previousHabits = [...habits];
    setHabits(prev => prev.map(h => {
      if (h.habit_id === habitId) {
        const isCompleted = h.status === 'completed';
        return {
          ...h,
          status: isCompleted ? 'active' : 'completed',
          streak: isCompleted ? Math.max(0, h.streak - 1) : h.streak + 1
        };
      }
      return h;
    }));

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('User not logged in');
        return;
      }

      // Check existence
      const { data: existing, error: fetchError } = await supabase
        .from('habits')
        .select('*')
        .eq('user_id', user.id)
        .eq('habit_id', habitId)
        .maybeSingle();

      if (fetchError) throw fetchError;

      if (existing) {
        // UPDATE
        const newStatus = existing.status === 'completed' ? 'active' : 'completed';
        const { error: updateError } = await supabase
          .from('habits')
          .update({
            status: newStatus,
            last_completed: newStatus === 'completed' ? today : existing.last_completed,
            streak: newStatus === 'completed' ? (existing.streak || 0) + 1 : Math.max(0, (existing.streak || 0) - 1)
          })
          .eq('id', existing.id);

        if (updateError) throw updateError;
      } else {
        // INSERT (Deploy)
        const { error: insertError } = await supabase
          .from('habits')
          .insert({
            user_id: user.id,
            habit_id: habitId,
            status: 'active',
            streak: 0,
            metadata: {}
          });

        if (insertError) throw insertError;
        toast.success('Protocol Deployed');
        // Re-fetch to ensure we have the real DB ID
        fetchHabits();
      }
    } catch (error: any) {
      console.error('❌ TOGGLE ERROR:', error.message || error);
      toast.error(`Error: ${error.message || 'Sync failed'}`);
      setHabits(previousHabits); // Revert UI
    }
  };

  const updateHabitConfig = async (habitId: string, updates: any) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('habits')
        .update({
          metadata: updates
        })
        .eq('user_id', user.id)
        .eq('habit_id', habitId);

      if (error) throw error;

      toast.success('Protocol Updated');
      fetchHabits();
    } catch (error) {
      console.error('Update failed', error);
      toast.error('Update Failed');
    }
  };

  return { habits, loading, toggleHabit, updateHabitConfig, refresh: fetchHabits };
};
