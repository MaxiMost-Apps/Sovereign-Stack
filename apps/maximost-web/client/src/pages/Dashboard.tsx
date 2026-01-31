import { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { Circle, Activity, Footprints, ChevronLeft, ChevronRight, Lock } from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'day' | 'week' | 'month'>('day');
  const [currentDate, setCurrentDate] = useState(new Date()); // For navigation
  const [habits, setHabits] = useState<any[]>([]);
  const [bioStats, setBioStats] = useState<any>({ glucose: '--', steps: 0 });
  const [loading, setLoading] = useState(true);

  // 1. FETCH DATA
  useEffect(() => {
    fetchData();
    // Real-time subscriptions
    const habitSub = supabase.channel('habit-updates').on('postgres_changes', { event: '*', schema: 'public' }, fetchData).subscribe();
    const bioSub = supabase.channel('bio-updates').on('postgres_changes', { event: '*', schema: 'health' }, fetchBioStats).subscribe();
    return () => { supabase.removeChannel(habitSub); supabase.removeChannel(bioSub); };
  }, [currentDate]); // Refetch if date changes (optional optimization)

  async function fetchData() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        setLoading(false);
        return;
    }

    // Fetch Habits + Logs
    const { data } = await supabase
      .from('habits')
      .select(`*, habit_logs(status, date)`)
      .eq('user_id', user.id)
      .eq('is_archived', false)
      .order('created_at', { ascending: true });

    if (data) setHabits(data);
    fetchBioStats();
    setLoading(false);
  }

  async function fetchBioStats() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data: glucose } = await supabase.from('glucose_entries').select('sgv').eq('user_id', user.id).order('recorded_at', { ascending: false }).limit(1).single();
    const { data: metrics } = await supabase.from('daily_metrics').select('steps').eq('user_id', user.id).eq('date', format(new Date(), 'yyyy-MM-dd')).single();
    setBioStats({ glucose: glucose?.sgv || '--', steps: metrics?.steps || 0 });
  }

  // TOGGLE LOGIC (Supports Any Date)
  async function toggleHabitDate(habitId: string, dateStr: string) {
    const habit = habits.find(h => h.id === habitId);
    const log = habit?.habit_logs?.find((l: any) => l.date === dateStr);
    const newStatus = log?.status === 'completed' ? 'pending' : 'completed';
    const { data: { user } } = await supabase.auth.getUser();

    await supabase.from('habit_logs').upsert({
        habit_id: habitId, user_id: user?.id, date: dateStr, status: newStatus
    }, { onConflict: 'habit_id, date' });
  }

  // --- VIEWS ---

  // 1. DAY VIEW (The Checklist)
  const renderDayView = () => (
    <div className="space-y-4">
      <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-2">
         <Lock size={12} /> Absolute Habits
      </div>
      {habits.map(habit => {
        const todayStr = format(currentDate, 'yyyy-MM-dd');
        const isDone = habit.habit_logs?.some((l: any) => l.date === todayStr && l.status === 'completed');

        return (
          <div key={habit.id} onClick={() => toggleHabitDate(habit.id, todayStr)}
            className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between
              ${isDone ? 'bg-blue-950/20 border-blue-500/30' : 'bg-[#0a0a0a] border-gray-800'}`}>
            <div className="flex items-center gap-4">
               {/* Neon Blue Circle Design */}
               <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                  ${isDone ? 'border-blue-500 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'border-gray-600'}`}>
               </div>
               <div>
                 <h3 className={`font-medium ${isDone ? 'text-blue-200' : 'text-gray-200'}`}>{habit.title}</h3>
                 <p className="text-[10px] text-gray-500 uppercase tracking-widest">Protocol</p>
               </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  // 2. WEEK VIEW (The Grid)
  const renderWeekView = () => {
    // Calculate start of the selected week
    const start = startOfWeek(currentDate, { weekStartsOn: 1 }); // Monday start
    const weekDays = [...Array(7)].map((_, i) => addDays(start, i));

    return (
      <div className="overflow-x-auto pb-4">
        {/* Header Row */}
        <div className="flex border-b border-gray-800 pb-2 mb-2 min-w-[350px]">
           <div className="w-[140px] shrink-0 text-[10px] text-gray-500 uppercase font-bold tracking-widest pl-2">Protocol</div>
           {weekDays.map(day => (
             <div key={day.toString()} className={`flex-1 text-center text-[10px] uppercase font-bold ${isSameDay(day, new Date()) ? 'text-blue-400' : 'text-gray-600'}`}>
               {format(day, 'EEE dd')}
             </div>
           ))}
        </div>

        {/* Habit Rows */}
        <div className="space-y-1 min-w-[350px]">
           {habits.map(habit => (
             <div key={habit.id} className="flex items-center py-3 border-b border-gray-800/30">
               {/* Habit Name */}
               <div className="w-[140px] shrink-0 font-medium text-sm text-gray-300 truncate pl-2">
                 {habit.title}
               </div>

               {/* Days Grid */}
               {weekDays.map(day => {
                 const dateStr = format(day, 'yyyy-MM-dd');
                 const isDone = habit.habit_logs?.some((l: any) => l.date === dateStr && l.status === 'completed');
                 return (
                   <div key={dateStr} className="flex-1 flex justify-center">
                     <div
                       onClick={() => toggleHabitDate(habit.id, dateStr)}
                       className={`w-8 h-8 rounded-full border border-gray-800 flex items-center justify-center cursor-pointer transition-all
                         ${isDone
                           ? 'bg-blue-600 border-blue-500 shadow-[0_0_8px_rgba(37,99,235,0.6)]'
                           : 'bg-[#111] hover:border-gray-600'
                         }
                       `}
                     >
                       {/* Empty or Filled Circle */}
                     </div>
                   </div>
                 )
               })}
             </div>
           ))}
        </div>
      </div>
    );
  };

  if (loading) return <div className="h-screen bg-black flex items-center justify-center text-gray-500 font-mono text-xs tracking-[0.2em]">INITIALIZING TITAN OS...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-4 pb-24 font-sans selection:bg-blue-500/30">

      {/* HEADER */}
      <div className="mb-6 pt-2">
        <div className="text-[10px] text-blue-500 font-bold tracking-[0.2em] mb-1">TODAY'S MISSION</div>
        <div className="flex justify-between items-end mb-4">
          <h1 className="text-2xl font-bold tracking-tight text-white">{format(currentDate, 'EEEE, MMM dd')}</h1>
          <div className="flex gap-2">
             <button onClick={() => setCurrentDate(addDays(currentDate, -1))} className="p-2 bg-gray-900 rounded-lg text-gray-400"><ChevronLeft size={16}/></button>
             <button onClick={() => setCurrentDate(addDays(currentDate, 1))} className="p-2 bg-gray-900 rounded-lg text-gray-400"><ChevronRight size={16}/></button>
          </div>
        </div>

        {/* TABS */}
        <div className="grid grid-cols-3 bg-[#111] p-1 rounded-xl border border-gray-800">
          {(['day', 'week', 'month'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all
                ${activeTab === tab ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* VIEW CONTENT */}
      <div>
        {activeTab === 'day' && renderDayView()}
        {activeTab === 'week' && renderWeekView()}
        {activeTab === 'month' && <div className="text-center py-20 text-gray-600 text-xs">MONTHLY AUDIT LOCKED</div>}
      </div>

      {/* FOOTER: BIO-STATS HUD */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#050505]/90 backdrop-blur-xl border-t border-gray-900 px-6 py-4 pb-8 flex justify-around items-center z-50">
        <div className="flex flex-col items-center group cursor-pointer">
          <div className="flex items-center gap-1 text-gray-500 text-[9px] mb-1 tracking-[0.2em] uppercase group-hover:text-blue-400"><Activity size={10} /> Glucose</div>
          <div className={`text-xl font-bold font-mono ${parseInt(bioStats.glucose) > 140 ? 'text-red-500' : 'text-blue-400'}`}>{bioStats.glucose}</div>
        </div>
        <div className="h-8 w-px bg-gray-800"></div>
        <div className="flex flex-col items-center group cursor-pointer">
          <div className="flex items-center gap-1 text-gray-500 text-[9px] mb-1 tracking-[0.2em] uppercase group-hover:text-blue-400"><Footprints size={10} /> Steps</div>
          <div className="text-xl font-bold font-mono text-white">{bioStats.steps > 1000 ? (bioStats.steps / 1000).toFixed(1) + 'k' : bioStats.steps}</div>
        </div>
      </div>
    </div>
  );
}
