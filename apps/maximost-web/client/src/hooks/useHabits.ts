import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/services/supabase';
import { toast } from 'sonner';

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

      if (!user) {
        setLoading(false);
        return;
      }

      // THE GOLDEN QUERY
      // Exactly as requested, but we MUST include 'date' in habit_logs for the dashboard logic to work.
      // If the backend doesn't have 'date', this will fail, but the toggle logic implies it does.
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
        .eq('user_id', user.id);

      if (error) throw error;

      // Standardize data shape
      const transformed = (data || []).map(h => ({
        ...h,
        id: h.habit_id || h.id // Ensure we have a consistent ID field for frontend keys
      }));

      setHabits(transformed);
    } catch (error) {
      console.error('❌ FETCH ERROR:', error);
      // Do not toast error to avoid spamming "Sync Failed" if it's just a hydration issue
    } finally {
      setLoading(false);
    }
  };

  const toggleHabit = useCallback(async (habitId: string, date: number) => {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Date Logic
        const dateObj = new Date(date);
        const dateStr = dateObj.toISOString().split('T')[0];

        // 1. Optimistic Update
        setHabits(prev => prev.map(h => {
            if (h.id === habitId || h.habit_id === habitId) {
                const logs = h.habit_logs || [];
                const existing = logs.find((l: any) => l.date === dateStr);
                let newLogs;

                if (existing && existing.status === 'completed') {
                    // Toggle OFF (Remove)
                    newLogs = logs.filter((l: any) => l.date !== dateStr);
                } else {
                    // Toggle ON (Add)
                    newLogs = [...logs, { date: dateStr, status: 'completed', habit_id: habitId }];
                }
                return { ...h, habit_logs: newLogs };
            }
            return h;
        }));

        // 2. Database Sync
        // We need to check if we are toggling ON or OFF.
        // Since we don't have the "current" state in the DB easily without fetching,
        // we can assume the UI state is the truth OR try to delete first.

        // Strategy:
        // If we want to toggle, we usually check existence.
        // But for "High Execution", we can assume if the user clicked, they want the opposite.
        // Let's rely on the optimistic update's intent.

        // Find the habit in the optimistic state to see what we just did.
        // Actually, it's safer to query the DB for the specific row.
        const { data: existingLog } = await supabase
            .from('habit_logs')
            .select('id, status')
            .eq('habit_id', habitId)
            .eq('date', dateStr)
            .maybeSingle();

        if (existingLog && existingLog.status === 'completed') {
             // It WAS completed, so we want to DELETE it (Toggle Off).
             await supabase.from('habit_logs').delete().eq('id', existingLog.id);
        } else {
            // It was NOT completed (or didn't exist), so we UPSERT.
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
                toast.error("Sync Failed");
                fetchHabits(); // Revert
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
