import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/core/supabase';
import { toast } from 'sonner';
import { SOVEREIGN_LIBRARY } from '@/data/sovereign_library';

export const useHabits = () => {
  const [habits, setHabits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Load habits once on mount
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

  const toggleHabit = useCallback(async (habitId: string, value?: number) => {
    // 1. INSTANT UI UPDATE (Optimistic)
    const def = SOVEREIGN_LIBRARY.find(h => h.id === habitId);
    if (!def) return;

    setHabits(prev => {
      const exists = prev.find(h => h.habit_id === habitId);
      if (exists) {
        // Update Existing
        return prev.map(h => {
          if (h.habit_id === habitId) {
             if (typeof value === 'number') {
                const newVal = (h.current_value || 0) + value;
                const target = h.metadata?.config?.target_value || 1;
                return { ...h, current_value: newVal, status: newVal >= target ? 'completed' : 'active' };
             }
             const isCompleted = h.status === 'completed';
             return { ...h, status: isCompleted ? 'active' : 'completed' };
          }
          return h;
        });
      } else {
        // Create New
        return [...prev, {
          habit_id: habitId,
          title: def.title,
          description: def.description,
          visuals: def.visuals,
          default_config: def.default_config,
          status: 'active',
          streak: 0,
          current_value: 0,
          metadata: { config: def.default_config, visuals: def.visuals }
        }];
      }
    });

    // 2. BACKGROUND SYNC
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: existing } = await supabase.from('habits').select('*').eq('user_id', user.id).eq('habit_id', habitId).maybeSingle();

      if (existing) {
        // UPDATE
        let updates: any = {};
        if (typeof value === 'number') {
           const newVal = (existing.current_value || 0) + value;
           const target = existing.metadata?.config?.target_value || 1;
           updates = { current_value: newVal, status: newVal >= target ? 'completed' : 'active' };
        } else {
           const newStatus = existing.status === 'completed' ? 'active' : 'completed';
           updates = { status: newStatus };
        }
        const { error } = await supabase.from('habits').update(updates).eq('id', existing.id);
        if (error) throw error;

      } else {
        // INSERT
        const { error } = await supabase.from('habits').insert({
          user_id: user.id,
          habit_id: habitId,
          title: def.title,
          status: 'active',
          streak: 0,
          metadata: { visuals: def.visuals, config: def.default_config }
        });
        if (error) throw error;
      }
    } catch (err) {
      console.error('❌ SAVE FAILED:', err);
      toast.error('Sync failed - check console');
      fetchHabits(); // Revert to server state on error
    }
  }, []);

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
