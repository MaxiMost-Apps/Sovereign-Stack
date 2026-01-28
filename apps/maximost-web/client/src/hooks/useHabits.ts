import { useState, useEffect } from 'react';
import { supabase } from '@/core/supabase';
import { toast } from 'sonner';
import { SOVEREIGN_LIBRARY } from '@/data/sovereign_library'; // The Source of Truth

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

    // 1. FIND DEFINITION (The Fix)
    const libraryDef = SOVEREIGN_LIBRARY.find(h => h.id === habitId);
    if (!libraryDef) {
      console.error('CRITICAL: Habit ID not found in Library:', habitId);
      return;
    }

    // Optimistic UI
    const previousHabits = [...habits];
    const exists = habits.find(h => h.habit_id === habitId);

    if (exists) {
      // Toggle Checkmark
      setHabits(prev => prev.map(h => {
        if (h.habit_id === habitId) {
          const isCompleted = h.status === 'completed';
          return { ...h, status: isCompleted ? 'active' : 'completed' };
        }
        return h;
      }));
    } else {
      // Add New Habit (Deploy)
      setHabits(prev => [...prev, {
        habit_id: habitId,
        title: libraryDef.title,
        status: 'active',
        streak: 0,
        visuals: libraryDef.visuals
      }]);
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: existing } = await supabase
        .from('habits')
        .select('*')
        .eq('user_id', user.id)
        .eq('habit_id', habitId)
        .maybeSingle();

      if (existing) {
        // Update Status
        const newStatus = existing.status === 'completed' ? 'active' : 'completed';
        await supabase.from('habits').update({
          status: newStatus,
          last_completed: newStatus === 'completed' ? today : existing.last_completed
        }).eq('id', existing.id);
      } else {
        // Insert New (Sending Title to fix error)
        const { error } = await supabase.from('habits').insert({
          user_id: user.id,
          habit_id: habitId,
          title: libraryDef.title, // <--- CRITICAL FIX
          status: 'active',
          streak: 0,
          metadata: { visuals: libraryDef.visuals, config: libraryDef.default_config }
        });
        if (error) throw error;
        toast.success('Protocol Deployed');
        fetchHabits();
      }
    } catch (error: any) {
      console.error('Sync Failed:', error);
      toast.error('Sync Failed');
      setHabits(previousHabits);
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
