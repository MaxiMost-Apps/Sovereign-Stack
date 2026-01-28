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
      console.error('Error fetching habits:', error);
    } finally {
      setLoading(false);
    }
  };

  // 1. TOGGLE (Checkmark)
  const toggleHabit = async (habitId: string) => {
    const today = new Date().toISOString().split('T')[0];

    // Optimistic UI
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
      if (!user) return;

      const { data: existing } = await supabase
        .from('habits')
        .select('*')
        .eq('user_id', user.id)
        .eq('habit_id', habitId)
        .single();

      if (existing) {
        const newStatus = existing.status === 'completed' ? 'active' : 'completed';
        await supabase
          .from('habits')
          .update({
            status: newStatus,
            last_completed: newStatus === 'completed' ? today : existing.last_completed,
            streak: newStatus === 'completed' ? existing.streak + 1 : Math.max(0, existing.streak - 1)
          })
          .eq('id', existing.id);
      } else {
        // First time activation (Deploy)
        await supabase
          .from('habits')
          .insert({
            user_id: user.id,
            habit_id: habitId,
            status: 'active', // Deploy as active, not completed immediately
            streak: 0
          });
        toast.success('Protocol Deployed');
        fetchHabits(); // Refresh to get the real ID
      }
    } catch (error) {
      console.error('Toggle failed:', error);
      toast.error('Sync Failed');
      fetchHabits(); // Revert
    }
  };

  // 2. UPDATE CONFIG (The Edit Modal Save)
  const updateHabitConfig = async (habitId: string, updates: any) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // We store custom config in a 'metadata' column or 'custom_config' column
      // Assuming 'metadata' exists from our SQL fix earlier
      const { error } = await supabase
        .from('habits')
        .update({
          metadata: updates // Stores target_days, frequency_type, color, etc.
        })
        .eq('user_id', user.id)
        .eq('habit_id', habitId);

      if (error) throw error;

      toast.success('Protocol Updated');
      fetchHabits(); // Refresh to see changes
    } catch (error) {
      console.error('Update failed', error);
      toast.error('Update Failed');
    }
  };

  return { habits, loading, toggleHabit, updateHabitConfig, refresh: fetchHabits };
};
