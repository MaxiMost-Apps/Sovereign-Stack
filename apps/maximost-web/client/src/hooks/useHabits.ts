// FILE: apps/maximost-web/client/src/hooks/useHabits.ts
import { useState, useEffect } from 'react';
import { supabase } from '@/services/supabase'; // FIXED IMPORT (Was @/core/supabase)

export const useHabits = () => {
  const [habits, setHabits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // FETCH
  const fetchHabits = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('habits')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .order('sort_order', { ascending: true }); // Ensure order

      if (error) throw error;
      setHabits(data || []);
    } catch (err) {
      console.error('Error fetching habits:', err);
    } finally {
      setLoading(false);
    }
  };

  // TOGGLE
  const toggleHabit = async (habitId: string) => {
    // 1. Optimistic Update
    setHabits(prev => prev.map(h =>
      h.habit_id === habitId || h.id === habitId // Handle both ID types
        ? { ...h, completed: !h.completed }
        : h
    ));

    // 2. DB Update (Mock implementation for now - you can expand this)
    // In a real app, you'd insert into a 'completions' table
    console.log(`Toggled habit: ${habitId}`);
  };

  // REORDER (New Function)
  const reorderHabits = async (newOrder: any[]) => {
    // 1. Optimistic Update
    setHabits(newOrder);

    // 2. DB Update
    try {
      const updates = newOrder.map((habit, index) => ({
        id: habit.id,
        sort_order: index,
        updated_at: new Date().toISOString(),
      }));

      const { error } = await supabase.from('habits').upsert(updates);
      if (error) throw error;
    } catch (err) {
      console.error('Error reordering habits:', err);
      // Optional: Revert on error
    }
  };

  // CONFIG UPDATE
  const updateHabitConfig = async (id: string, updates: any) => {
    // ... Existing logic ...
    console.log('Update config', id, updates);
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  return { habits, loading, toggleHabit, reorderHabits, updateHabitConfig };
};
