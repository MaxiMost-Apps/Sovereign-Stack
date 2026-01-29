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
      const { data } = await supabase.from('habits').select('*').eq('user_id', user.id).eq('status', 'active').order('created_at');
      setHabits(data || []);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleHabit = async (habitId: string, value?: number) => {
    // 1. GET DEFINITION
    const def = SOVEREIGN_LIBRARY.find(h => h.id === habitId);
    if (!def) return;

    const previousHabits = [...habits];
    const exists = habits.find(h => h.habit_id === habitId);

    // 2. OPTIMISTIC UPDATE
    if (exists) {
      setHabits(prev => prev.map(h => {
        if (h.habit_id === habitId) {
          // If it's a value-based habit (like water/sauna), add to the count
          if (typeof value === 'number') {
             const currentVal = h.current_value || 0;
             // Use metadata config if available, otherwise default
             const target = h.metadata?.config?.target_value || h.default_config?.target_value || 1;
             const newVal = currentVal + value;
             // Complete if target reached
             const isComplete = newVal >= target;
             return { ...h, current_value: newVal, status: isComplete ? 'completed' : 'active' };
          }
          // Standard boolean toggle
          const isCompleted = h.status === 'completed';
          return { ...h, status: isCompleted ? 'active' : 'completed', streak: isCompleted ? h.streak : h.streak + 1 };
        }
        return h;
      }));
    } else {
      // Deploy Immediately
      setHabits(prev => [...prev, {
        habit_id: habitId,
        title: def.title,
        description: def.description,
        visuals: def.visuals,
        default_config: def.default_config,
        status: 'active',
        streak: 0,
        current_value: 0
      }]);
    }

    // 3. BACKGROUND SYNC
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user');

      const { data: existing } = await supabase.from('habits').select('*').eq('user_id', user.id).eq('habit_id', habitId).maybeSingle();

      if (existing) {
        if (typeof value === 'number') {
           const newVal = (existing.current_value || 0) + value;
           const target = existing.metadata?.config?.target_value || 1;
           const newStatus = newVal >= target ? 'completed' : 'active';
           await supabase.from('habits').update({ current_value: newVal, status: newStatus }).eq('id', existing.id);
        } else {
           const newStatus = existing.status === 'completed' ? 'active' : 'completed';
           await supabase.from('habits').update({
             status: newStatus,
             // last_completed logic could be refined but this is V1
             streak: newStatus === 'completed' ? existing.streak + 1 : Math.max(0, existing.streak - 1)
           }).eq('id', existing.id);
        }
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
      toast.error('Sync failed');
      setHabits(previousHabits);
    }
  };

  // Add updateHabitConfig to support the Dashboard editing
  const updateHabitConfig = async (habitId: string, updates: any) => {
      try {
        setHabits(prev => prev.map(h => h.habit_id === habitId ? { ...h, ...updates } : h));
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        await supabase.from('habits').update({
             title: updates.title,
             metadata: { visuals: updates.visuals, config: updates.default_config }
          }).eq('user_id', user.id).eq('habit_id', habitId);
        toast.success('Protocol Updated');
      } catch (error) {
        console.error('Update failed', error);
        toast.error('Update Failed');
        fetchHabits();
      }
  };

  return { habits, loading, toggleHabit, updateHabitConfig, refresh: fetchHabits };
};
