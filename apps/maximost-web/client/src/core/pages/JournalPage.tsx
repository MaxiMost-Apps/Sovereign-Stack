import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, parseISO } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Loader2, Sun, Moon, PenTool, CheckCircle, ChevronLeft, ChevronRight, Cpu } from 'lucide-react';


export default function JournalPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [entries, setEntries] = useState({ am: '', pm: '', free: '', system: '' });
  const [activeDays, setActiveDays] = useState<string[]>([]);
  const [historyList, setHistoryList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const fetchOverview = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data } = await supabase
      .from('journal_entries')
      .select('date, am_entry, pm_entry, free_entry, system_log')
      .eq('user_id', user.id)
      .order('date', { ascending: false });
    if (data) {
        setActiveDays(data.map(d => d.date));
        setHistoryList(data);
    }
  };

  useEffect(() => { fetchOverview(); }, [saveStatus]);

  useEffect(() => {
    const loadEntry = async () => {
      setLoading(true);
      const dateStr = format(selectedDate, 'yyyy-MM-dd');
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.from('journal_entries').select('*').eq('user_id', user.id).eq('date', dateStr).maybeSingle();
        setEntries(data ? {
            am: data.am_entry || '',
            pm: data.pm_entry || '',
            free: data.free_entry || '',
            system: data.system_log || ''
        } : { am: '', pm: '', free: '', system: '' });
      }
      setLoading(false);
    };
    loadEntry();
  }, [selectedDate]);

  const handleSave = async () => {
    setSaving(true);
    setSaveStatus('idle');
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const dateStr = format(selectedDate, 'yyyy-MM-dd');
      const { error } = await supabase.from('journal_entries').upsert({
        user_id: user.id,
        date: dateStr,
        am_entry: entries.am,
        pm_entry: entries.pm,
        free_entry: entries.free,
        system_log: entries.system // NOW EDITABLE
      }, { onConflict: 'user_id, date' });

      if (error) { console.error(error); setSaveStatus('error'); }
      else { setSaveStatus('success'); fetchOverview(); setTimeout(() => setSaveStatus('idle'), 2000); }
    }
    setSaving(false);
  };

  const calendarDays = eachDayOfInterval({ start: startOfMonth(selectedDate), end: endOfMonth(selectedDate) });

  return (

      <div className="p-6 max-w-7xl mx-auto space-y-8 pb-24 grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* LEFT SIDEBAR (Calendar & History) */}
        <div className="lg:col-span-1 space-y-6">
          <h1 className="text-2xl font-bold text-slate-100 mb-6">Journal</h1>

          <div className="glass-panel rounded-2xl p-4 bg-slate-900/50">
            <div className="flex justify-between items-center mb-4 text-slate-100 font-bold">
              <button onClick={() => setSelectedDate(d => new Date(d.setMonth(d.getMonth() - 1)))}><ChevronLeft className="w-5 h-5"/></button>
              <span>{format(selectedDate, 'MMMM')}</span>
              <button onClick={() => setSelectedDate(d => new Date(d.setMonth(d.getMonth() + 1)))}><ChevronRight className="w-5 h-5"/></button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {['S','M','T','W','T','F','S'].map(d => <div key={d} className="text-slate-500 font-bold">{d}</div>)}
              {calendarDays.map(day => {
                const dateStr = format(day, 'yyyy-MM-dd');
                const hasEntry = activeDays.includes(dateStr);
                const isSelected = isSameDay(day, selectedDate);
                return (
                  <button
                    key={day.toString()}
                    onClick={() => setSelectedDate(day)}
                    className={`h-8 w-8 rounded-full flex items-center justify-center relative transition-all mx-auto ${isSelected ? 'bg-amber-500 text-black font-bold' : 'text-slate-400 hover:bg-white/10'} ${!isSameMonth(day, selectedDate) && 'opacity-20'}`}
                  >
                    {format(day, 'd')}
                    {hasEntry && !isSelected && <div className="absolute bottom-1 w-1 h-1 bg-amber-500 rounded-full"></div>}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-4 max-h-[400px] overflow-y-auto bg-slate-900/50">
              <h3 className="text-xs font-bold text-slate-500 uppercase mb-3">Log History</h3>
              <div className="space-y-2">
                  {historyList.map(entry => (
                      <button
                          key={entry.date}
                          onClick={() => setSelectedDate(parseISO(entry.date))}
                          className={`w-full text-left p-3 rounded-lg border text-sm transition-all ${format(selectedDate, 'yyyy-MM-dd') === entry.date ? 'bg-amber-500/10 border-amber-500/50' : 'bg-transparent border-white/5 text-slate-400 hover:border-white/20'}`}
                      >
                          <div className={`font-bold mb-1 ${format(selectedDate, 'yyyy-MM-dd') === entry.date ? 'text-amber-500' : 'text-slate-300'}`}>{format(parseISO(entry.date), 'EEE, MMM do')}</div>
                          <div className="flex flex-wrap gap-1">
                              {entry.am_entry && <span className="text-[10px] px-1.5 py-0.5 rounded bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">AM</span>}
                              {entry.pm_entry && <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-500 border border-purple-500/20">PM</span>}
                              {entry.system_log && <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-500 border border-blue-500/20">SYS</span>}
                          </div>
                      </button>
                  ))}
              </div>
          </div>
        </div>

        {/* MAIN EDITOR (With Page Turn Animation) */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex justify-between items-end border-b border-white/10 pb-4">
              <div>
                  <h2 className="text-3xl font-bold text-white">{format(selectedDate, 'EEEE')}</h2>
                  <p className="text-slate-400">{format(selectedDate, 'MMMM do, yyyy')}</p>
              </div>
              <button onClick={handleSave} disabled={saving} className={`px-6 py-2 rounded-lg font-bold flex items-center gap-2 ${saveStatus === 'success' ? 'bg-emerald-500 text-black' : 'bg-amber-500 text-black hover:bg-amber-400'} transition-all`}>
               {saving ? <Loader2 className="animate-spin w-4 h-4" /> : saveStatus === 'success' ? <CheckCircle className="w-4 h-4"/> : <Save className="w-4 h-4"/>}
               {saveStatus === 'success' ? 'Saved' : 'Save Entry'}
             </button>
          </div>

          {loading ? <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin w-10 h-10 text-slate-600"/></div> : (
            <AnimatePresence mode='wait'>
              <motion.div
                  key={format(selectedDate, 'yyyy-MM-dd')}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="grid gap-6"
              >
                  {/* EDITABLE System Logs */}
                  {(entries.system || format(selectedDate, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')) && (
                      <div className="glass-panel border-blue-500/30 rounded-2xl p-4 bg-blue-950/10">
                          <div className="flex items-center gap-2 mb-2 text-blue-400 font-bold text-sm uppercase tracking-wider">
                              <Cpu className="w-4 h-4" /> System Logs (Editable)
                          </div>
                          <textarea
                              className="w-full bg-transparent text-blue-200 font-mono text-sm focus:outline-none resize-none placeholder-blue-500/30"
                              value={entries.system}
                              onChange={(e) => setEntries(prev => ({ ...prev, system: e.target.value }))}
                              placeholder="System events appear here..."
                              rows={Math.max(2, entries.system.split('\n').length)}
                          />
                      </div>
                  )}

                  <JournalSection icon={Sun} title="AM Intentions" value={entries.am} onChange={(v:string) => setEntries(prev => ({...prev, am: v}))} onBlur={handleSave} placeholder="1. What is the one thing I must do today?\n2. What am I grateful for?" />
                  <JournalSection icon={Moon} title="PM Reflection" value={entries.pm} onChange={(v:string) => setEntries(prev => ({...prev, pm: v}))} onBlur={handleSave} placeholder="1. What went well?\n2. What did I learn?" />
                  <JournalSection icon={PenTool} title="Free Write" value={entries.free} onChange={(v:string) => setEntries(prev => ({...prev, free: v}))} onBlur={handleSave} placeholder="Clear your mind..." />
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>

  );
}

function JournalSection({ icon: Icon, title, value, onChange, onBlur, placeholder }: any) {
  return (
    <div className="glass-panel rounded-2xl p-6 transition-all focus-within:border-amber-500/50 bg-slate-900/40">
      <div className="flex items-center gap-2 mb-4 text-slate-200 font-bold text-lg">
        <Icon className="w-5 h-5 text-amber-500" /> {title}
      </div>
      <textarea
        className="w-full bg-transparent border border-white/5 rounded-xl p-4 text-slate-300 focus:outline-none focus:border-amber-500 h-32 resize-none leading-relaxed placeholder-slate-600"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
      />
    </div>
  );
}
