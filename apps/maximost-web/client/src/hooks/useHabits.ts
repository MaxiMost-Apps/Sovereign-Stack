import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/services/supabase';
import { toast } from 'sonner';

export const useHabits = () => {
  const [habits, setHabits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Load habits once on mount, or provide a refresh trigger
  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      // THE FIX: Standardized habit_id and Lens Injection (GOLDEN QUERY)
      const { data, error } = await supabase
        .from('habits')
        .select(`
            *,
            lens_stoic,
            lens_operator,
            lens_scientist,
            lens_visionary,
            visual_color,
            habit_logs (
            id,
            status,
            created_at,
            habit_id,
            date
            )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });

      if (error) throw error;

      // Standardize data shape
      const transformed = (data || []).map(h => ({
        ...h,
        id: h.habit_id || h.id // Ensure we have a consistent ID field for frontend keys
      }));

      setHabits(transformed);
    } catch (error) {
      console.error('❌ FETCH ERROR:', error);
      toast.error('Failed to load protocols');
    } finally {
      setLoading(false);
    }
  };

  const toggleHabit = useCallback(async (habitId: string, date: number) => {
    // Optimistic Update
    const dateObj = new Date(date);
    const dateStr = dateObj.toISOString().split('T')[0];

    setHabits(prev => prev.map(h => {
        if (h.id === habitId || h.habit_id === habitId) {
            const logs = h.habit_logs || [];
            const existing = logs.find((l: any) => l.date === dateStr);
            let newLogs;

            if (existing && existing.status === 'completed') {
                // Toggle OFF
                newLogs = logs.filter((l: any) => l.date !== dateStr);
            } else {
                // Toggle ON
                newLogs = [...logs, { date: dateStr, status: 'completed', habit_id: habitId }];
            }
            return { ...h, habit_logs: newLogs };
        }
        return h;
    }));

    // THE FIX: Ensure we are sending habit_id, not id_of_habit
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Check current status to decide (Optimistic UI handled above, but need logic for DB)
        // We actually just UPSERT 'completed' or delete?
        // User instruction: "upsert ... status: 'completed'"
        // If we want to toggle OFF, we usually delete the log row or set status 'pending'.
        // But the user directive shows UPSERT 'completed'.
        // I will implement smart toggle logic: If row exists and is completed -> delete/pending. Else -> insert completed.
        // HOWEVER, "The Toggle Logic (The Pulse Fix)" snippet provided only shows the UPSERT block.
        // It says "The Sync Failed error happens when the completion is sent to the wrong column."
        // I will assume for now we want to MARK COMPLETE.
        // But a toggle needs to UNMARK.
        // I will verify logic.

        // Let's implement robust toggle:
        const { data: existingLog } = await supabase
            .from('habit_logs')
            .select('*')
            .eq('habit_id', habitId)
            .eq('date', dateStr)
            .maybeSingle();

        if (existingLog && existingLog.status === 'completed') {
             // Toggle Off
             await supabase.from('habit_logs').delete().eq('id', existingLog.id);
        } else {
            // Toggle On
            const { error } = await supabase
                .from('habit_logs')
                .upsert({
                habit_id: habitId, // MUST BE habit_id
                status: 'completed',
                date: dateStr,
                user_id: user.id
                }, { onConflict: 'habit_id, date' });

            if (error) {
                console.error("Critical Sync Failure:", error.message);
                toast.error("Sync Failed: Check Database Schema");
                // Revert optimistic?
                fetchHabits();
            }
        }

    } catch (err) {
        console.error("System Error", err);
    }
  }, []);

  return {
      habits,
      loading,
      toggleHabit,
      refresh: fetchHabits
  };
};
