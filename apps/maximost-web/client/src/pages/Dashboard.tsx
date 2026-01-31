import React, { useState } from 'react';
import { Lock, Unlock } from 'lucide-react';
import { DailyHabitRow } from '@/components/habits/DailyHabitRow';
import { HabitMasterDrawer } from '@/components/habits/HabitMasterDrawer';
import { useHabits } from '@/hooks/useHabits';

export const Dashboard: React.FC = () => {
  const { habits, loading, toggleHabit, updateHabitConfig, deleteHabit } = useHabits();
  const [isLocked, setIsLocked] = useState(true);
  const [drawerState, setDrawerState] = useState<{
    isOpen: boolean;
    habit: any;
    tab: 'HQ' | 'CONFIG';
  }>({
    isOpen: false,
    habit: null,
    tab: 'HQ'
  });

  const handleOpenDrawer = (habit: any, tab: 'HQ' | 'CONFIG') => {
    setDrawerState({ isOpen: true, habit, tab });
  };

  const activeHabits = habits.filter(h => h.status !== 'archived');

  return (
    <div className="min-h-screen bg-[#020408] text-white p-6 pb-32">
      {/* Dashboard Header */}
      <header className="flex justify-between items-center mb-10 max-w-3xl mx-auto">
        <div>
          <h1 className="text-3xl font-black italic uppercase tracking-tighter">Command Center</h1>
          <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.3em] mt-1">Operator: Josh // Sovereignty Tier</p>
        </div>

        <button
          onClick={() => setIsLocked(!isLocked)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
            isLocked
            ? 'bg-blue-600/10 border-blue-500/50 text-blue-400'
            : 'bg-white/5 border-white/10 text-gray-400'
          }`}
        >
          {isLocked ? <Lock size={16} /> : <Unlock size={16} />}
          <span className="text-xs font-bold font-mono tracking-widest uppercase">
            {isLocked ? 'Locked' : 'Unlocked'}
          </span>
        </button>
      </header>

      {/* Habit List */}
      <div className="max-w-3xl mx-auto space-y-3">
        {loading ? (
            <div className="text-center text-gray-500 font-mono text-xs uppercase animate-pulse mt-20">Initializing Command Link...</div>
        ) : activeHabits.length === 0 ? (
            <div className="text-center text-gray-500 font-mono text-xs uppercase mt-20">No protocols active. Check Library.</div>
        ) : (
            activeHabits.map((habit) => (
            <DailyHabitRow
                key={habit.id}
                habit={habit}
                isLocked={isLocked}
                onOpenInfo={(h) => handleOpenDrawer(h, 'HQ')}
                onOpenConfig={(h) => handleOpenDrawer(h, 'CONFIG')}
                onToggle={(id) => toggleHabit(id)}
            />
            ))
        )}
      </div>

      {/* Master Drawer Integration */}
      <HabitMasterDrawer
        isOpen={drawerState.isOpen}
        habit={drawerState.habit}
        initialTab={drawerState.tab}
        onClose={() => setDrawerState({ ...drawerState, isOpen: false })}
        onUpdate={(data) => {
            if (drawerState.habit) {
                updateHabitConfig(drawerState.habit.habit_id, data);
                // Optimistically update drawer local state if needed
                setDrawerState(prev => ({ ...prev, habit: { ...prev.habit, ...data } }));
            }
        }}
        onArchive={(id) => {
             // id passed here is usually habit_id based on Drawer logic
             deleteHabit(id);
             setDrawerState({ ...drawerState, isOpen: false });
        }}
      />
    </div>
  );
};
