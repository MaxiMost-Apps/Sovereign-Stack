import { toISODate } from './dateUtils';
import { subDays } from 'date-fns';

export const calculateStreak = (habit: any, logs: any) => {
  let streak = 0;
  const today = new Date();
  const todayStr = toISODate(today);
  const yesterdayStr = toISODate(subDays(today, 1));

  // Check if done today
  const doneToday = logs[`${habit.id}_${todayStr}`]?.value >= (habit.daily_goal || 1);
  if (doneToday) streak++;

  // Count backwards from yesterday
  let currentCheck = yesterdayStr;
  let gapAllowed = false; // Could allow freeze/skip logic later

  while (true) {
     const log = logs[`${habit.id}_${currentCheck}`];
     const isDone = log && log.value >= (habit.daily_goal || 1);

     if (isDone) {
        streak++;
        currentCheck = toISODate(subDays(new Date(currentCheck), 1));
     } else {
        break;
     }
  }

  return streak;
};
