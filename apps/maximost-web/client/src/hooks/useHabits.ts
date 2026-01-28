import { useState, useEffect } from 'react';
import { supabase } from '@/core/supabase';
import { toast } from 'sonner';
import { SOVEREIGN_LIBRARY } from '@/data/sovereign_library'; // Import the Library to look up titles

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

    // 1. FIND THE HABIT DETAILS (The Missing Link)
    const habitDef = SOVEREIGN_LIBRARY.find(h => h.id === habitId);
    if (!habitDef) {
      console.error('Habit definition not found for:', habitId);
      return;
    }

    // Optimistic UI Update
    const previousHabits = [...habits];
    // Check if it's already in our local list (even if not saved yet)
    const existsLocally = habits.find(h => h.habit_id === habitId);

    if (existsLocally) {
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
    } else {
      // Add it visually immediately
      setHabits(prev => [...prev, {
        habit_id: habitId,
        title: habitDef.title, // Use the title from the library
        description: habitDef.description,
        visuals: habitDef.visuals,
        default_config: habitDef.default_config,
        status: 'active',
        streak: 0
      }]);
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('User not logged in');
        return;
      }

      // Check existence in DB
      const { data: existing, error: fetchError } = await supabase
        .from('habits')
        .select('*')
        .eq('user_id', user.id)
        .eq('habit_id', habitId)
        .maybeSingle();

      if (fetchError) throw fetchError;

      if (existing) {
        // UPDATE EXISTING
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
        // INSERT NEW (THE FIX IS HERE)
        const { error: insertError } = await supabase
          .from('habits')
          .insert({
            user_id: user.id,
            habit_id: habitId,
            title: habitDef.title, // <--- CRITICAL: Sending the Title now!
            status: 'active',
            streak: 0,
            metadata: {
                visuals: habitDef.visuals,
                config: habitDef.default_config
            }
          });

        if (insertError) throw insertError;
        toast.success('Protocol Deployed');
        fetchHabits(); // Refresh ID
      }
    } catch (error: any) {
      console.error('❌ TOGGLE ERROR:', error.message || error);
      toast.error(`Sync failed: ${error.message}`);
      setHabits(previousHabits); // Revert
    }
  };

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
