import { useState, useEffect } from 'react';
import { supabase } from '@/core/supabase';
import { toast } from 'sonner';
import { SOVEREIGN_LIBRARY } from '@/data/sovereign_library';

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
      const { data } = await supabase.from('habits').select('*').eq('user_id', user.id).eq('status', 'active');
      setHabits(data || []);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleHabit = async (habitId: string) => {
    // 1. GET DEFINITION
    const def = SOVEREIGN_LIBRARY.find(h => h.id === habitId);
    if (!def) return;

    // 2. OPTIMISTIC UPDATE (Instant Feedback)
    const previousHabits = [...habits];
    const exists = habits.find(h => h.habit_id === habitId);

    if (exists) {
      // Toggle Status Immediately
      setHabits(prev => prev.map(h =>
        h.habit_id === habitId
          ? { ...h, status: h.status === 'completed' ? 'active' : 'completed', streak: h.status === 'completed' ? h.streak : h.streak + 1 }
          : h
      ));
    } else {
      // Deploy Immediately
      setHabits(prev => [...prev, {
        habit_id: habitId,
        title: def.title,
        description: def.description,
        visuals: def.visuals,
        default_config: def.default_config,
        status: 'active',
        streak: 0
      }]);
    }

    // 3. BACKGROUND SYNC
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user');

      const { data: existing } = await supabase.from('habits').select('id, status, streak').eq('user_id', user.id).eq('habit_id', habitId).maybeSingle();

      if (existing) {
        const newStatus = existing.status === 'completed' ? 'active' : 'completed';
        await supabase.from('habits').update({
          status: newStatus,
          last_completed: newStatus === 'completed' ? new Date().toISOString() : null,
          streak: newStatus === 'completed' ? existing.streak + 1 : Math.max(0, existing.streak - 1)
        }).eq('id', existing.id);
      } else {
        await supabase.from('habits').insert({
          user_id: user.id,
          habit_id: habitId,
          title: def.title,
          status: 'active',
          streak: 0,
          metadata: { visuals: def.visuals, config: def.default_config }
        });
      }
    } catch (err) {
      console.error('Sync failed', err);
      toast.error('Sync failed - reverting');
      setHabits(previousHabits); // Revert only on actual error
    }
  };

  // Add updateHabitConfig to support the Dashboard editing
  const updateHabitConfig = async (habitId: string, updates: any) => {
      try {
        // Optimistic Update
        setHabits(prev => prev.map(h => h.habit_id === habitId ? { ...h, ...updates } : h));

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Sync to DB
        // Determine what to update. If it's visual/config, it likely goes into metadata or specific columns if they exist.
        // The migration added `metadata`.
        const { error } = await supabase
          .from('habits')
          .update({
             title: updates.title,
             metadata: {
                 visuals: updates.visuals,
                 config: updates.default_config
             }
          })
          .eq('user_id', user.id)
          .eq('habit_id', habitId);

        if (error) throw error;
        toast.success('Protocol Updated');
      } catch (error) {
        console.error('Update failed', error);
        toast.error('Update Failed');
        fetchHabits(); // Revert
      }
  };

  return { habits, loading, toggleHabit, updateHabitConfig, refresh: fetchHabits };
};
