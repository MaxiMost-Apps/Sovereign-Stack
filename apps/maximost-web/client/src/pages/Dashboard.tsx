import { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import { format, isSameDay, addDays } from 'date-fns';
import { Info, MoreVertical, Lock, Unlock, ChevronLeft, ChevronRight } from 'lucide-react';
import EditHabitModal from '../components/habits/EditHabitModal';

export default function Dashboard() {
  const [view, setView] = useState<'DAILY' | 'WEEKLY' | 'MONTHLY'>('DAILY');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [habits, setHabits] = useState<any[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(true);
  const [editingHabit, setEditingHabit] = useState<any>(null);

  useEffect(() => { fetchHabits(); }, [currentDate]);

  async function fetchHabits() {
    const { data } = await supabase.from('habits').select(`*, habit_logs(status, date)`).eq('is_active', true);
    if (data) setHabits(data);
  }

  const toggleStatus = async (habitId: string) => {
    const dateStr = format(currentDate, 'yyyy-MM-dd');
    const habit = habits.find(h => h.id === habitId);
    const log = habit?.habit_logs?.find((l: any) => l.date === dateStr);
    const newStatus = log?.status === 'completed' ? 'pending' : 'completed';
    await supabase.from('habit_logs').upsert({ habit_id: habitId, date: dateStr, status: newStatus });
    fetchHabits();
  };

  return (
    <div className="min-h-screen bg-[#080a0f] text-white p-4 font-mono">
      {/* Header Area */}
      <div className="mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-[10px] text-blue-500 font-bold tracking-[0.2em] uppercase">Today's Mission</p>
            <h1 className="text-2xl font-bold">{format(currentDate, 'EEEE, MMM d')}</h1>
          </div>
          <div className="flex gap-2">
            <button className="p-2 bg-[#1a1f26] rounded-lg border border-gray-800"><MoreVertical size={18}/></button>
            <button onClick={() => setIsLocked(!isLocked)} className="p-2 bg-[#1a1f26] rounded-lg border border-gray-800">
              {isLocked ? <Lock size={18} className="text-blue-500" /> : <Unlock size={18} />}
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="bg-[#0c0e14] rounded-xl p-1 grid grid-cols-3 mb-4">
          {['DAILY', 'WEEKLY', 'MONTHLY'].map(t => (
            <button key={t} onClick={() => setView(t as any)}
              className={`py-2 text-[10px] font-bold rounded-lg ${view === t ? 'bg-blue-600' : 'text-gray-500'}`}>{t}</button>
          ))}
        </div>

        {/* Date Navigator */}
        <div className="flex justify-between items-center bg-[#0c0e14] border border-gray-900 rounded-xl p-3">
          <button onClick={() => setCurrentDate(addDays(currentDate, -1))}><ChevronLeft size={18} className="text-gray-600"/></button>
          <span className="text-xs font-bold uppercase tracking-widest">
            {isSameDay(currentDate, new Date()) ? 'Today' : format(currentDate, 'MMMM d')}
          </span>
          <button onClick={() => setCurrentDate(addDays(currentDate, 1))}><ChevronRight size={18} className="text-gray-600"/></button>
        </div>
      </div>

      {/* Habit List */}
      <div className="space-y-3">
        <p className="text-[10px] text-gray-600 font-bold tracking-widest uppercase mb-2">Absolute Habits</p>
        {habits.map(habit => {
          const isDone = habit.habit_logs?.some((l: any) => l.date === format(currentDate, 'yyyy-MM-dd') && l.status === 'completed');
          return (
            <div key={habit.id} className="bg-[#0c0e14] border border-gray-900 rounded-2xl overflow-hidden">
              <div className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#14171e] flex items-center justify-center text-blue-500">
                    <PulseIcon />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className={`font-bold text-sm ${isDone ? 'text-gray-600 line-through' : ''}`}>{habit.title}</h3>
                      <button onClick={() => setExpandedId(expandedId === habit.id ? null : habit.id)}><Info size={14} className="text-gray-600"/></button>
                      <button onClick={() => setEditingHabit(habit)}><MoreVertical size={14} className="text-gray-600"/></button>
                    </div>
                    <p className="text-[9px] text-gray-500 uppercase mt-1">{habit.subtitle}</p>
                  </div>
                </div>
                {/* Circle Toggle */}
                <button onClick={() => toggleStatus(habit.id)}
                  className={`w-12 h-12 rounded-full border-2 transition-all ${isDone ? 'bg-blue-600 border-blue-600 shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'border-blue-900/30'}`} />
              </div>

              {/* Lens Drawer Down */}
              {expandedId === habit.id && (
                <div className="px-5 pb-5 pt-2 grid grid-cols-2 gap-4 text-[10px] bg-[#0e1117] border-t border-gray-900">
                  <div><span className="text-blue-500 font-bold">STOIC:</span> <p className="text-gray-400">{habit.lens_stoic}</p></div>
                  <div><span className="text-blue-500 font-bold">OPERATOR:</span> <p className="text-gray-400">{habit.lens_operator}</p></div>
                  <div><span className="text-blue-500 font-bold">SCIENTIST:</span> <p className="text-gray-400">{habit.lens_scientist}</p></div>
                  <div><span className="text-blue-500 font-bold">VISIONARY:</span> <p className="text-gray-400">{habit.lens_visionary}</p></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Edit Modal */}
      {editingHabit && (
        <EditHabitModal
          habit={editingHabit}
          onClose={() => setEditingHabit(null)}
          onSave={fetchHabits}
        />
      )}
    </div>
  );
}

function PulseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}
