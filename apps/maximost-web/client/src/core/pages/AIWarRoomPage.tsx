import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { Send, Settings, Brain, Trash2, Info, Target, Shield } from 'lucide-react';
import { supabase } from '../supabase';
import { useAuth } from '../AuthSystem';
import { COACH_CONFIG } from '../config/coachConfig';

export default function AIWarRoomPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [persona, setPersona] = useState('stoic');
  const activeCoach = COACH_CONFIG[persona];

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [thinkingText, setThinkingText] = useState("");
  const [memories, setMemories] = useState([]);
  const [newMemory, setNewMemory] = useState("");
  const [tacticalIntel, setTacticalIntel] = useState([]);

  // 3.1 The Loading Gate (Strict Auth & Config Check)
  if (loading) return <div className="flex h-screen items-center justify-center bg-slate-950 text-blue-500 font-mono text-sm animate-pulse">SYNCHRONIZING...</div>;
  if (!user) return <div className="flex h-screen items-center justify-center bg-slate-950 text-red-500 font-mono text-sm">AUTH SYNC PENDING...</div>;

  // 1.1 The Defensive Guard (Coach Config)
  if (!activeCoach || !activeCoach?.colors) {
      return (
        <div className="flex h-screen items-center justify-center bg-slate-950">
          <div className="text-blue-500 font-mono text-sm animate-pulse">
            INITIALIZING WAR ROOM...
          </div>
        </div>
      );
  }

  // 1. Coach Switching System Message
  useEffect(() => {
    if(persona && COACH_CONFIG[persona]) {
      setMessages(prev => [...prev, {
         id: Date.now(),
         text: `SYSTEM: War Room active. Commander ${COACH_CONFIG[persona].name} on deck.`,
         sender: 'system'
      }]);
    }
  }, [persona]);

  // Load Data
  useEffect(() => {
    if (!user) return;
    const load = async () => {
       // A. Get Persona (Targeting Profiles now)
       let { data: profile } = await supabase.from('profiles').select('coach_preference').eq('id', user.id).single();

       // Fallback for immediate migration if settings page wasn't visited
       if (!profile) {
          const { data: legacy } = await supabase.from('user_settings').select('theme_preference').eq('user_id', user.id).single();
          if (legacy) setPersona(legacy.theme_preference || 'stoic');
       } else {
          setPersona(profile.coach_preference || 'stoic');
       }

       // B. Get Chat History (Last 50, from NEW table ai_chat_history)
       const { data: history } = await supabase
          .from('ai_chat_history')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', {ascending:true})
          .limit(50);

       if(history?.length) {
          setMessages(history.map(m=>({
             id: m.id,
             text: m.content,
             sender: m.role === 'model' ? 'ai' : 'user' // Map 'model' to 'ai' for UI
          })));
       } else {
          // Default greeting
          const currentCoach = COACH_CONFIG[settings?.theme_preference || 'stoic'];
          setMessages([{id:'init', text:`This is the War Room. I am ${currentCoach.name}. Let's review the tactics.`, sender:'ai'}]);
       }

       // C. Get Memories
       const { data: mems } = await supabase.from('user_memories').select('*').eq('user_id', user.id);
       setMemories(mems || []);

       // D. Get Tactical Intel (Handshake: get_coaching_stats RPC)
       const { data: rpcData, error: rpcError } = await supabase.rpc('get_coaching_stats');

       if (rpcData && !rpcError) {
           // Cyrus Handshake Active: Use RPC Data
           setTacticalIntel(rpcData.map((h: any) => ({
               title: h.title,
               category: h.category, // Map Category
               tactical: (typeof h.tactical === 'string' ? h.tactical : h.tactical?.description) || "Awaiting Orders"
           })));
       } else {
           // Fallback: Direct Table Fetch (if RPC pending)
           const { data: habits } = await supabase.from('habits').select('title, metadata, category').eq('user_id', user.id).eq('is_active', true);
           if (habits) {
               setTacticalIntel(habits.map(h => ({
                   title: h.title,
                   category: h.category, // Map Category
                   tactical: (typeof h.metadata?.tactical === 'string' && h.metadata.tactical)
                        ? h.metadata.tactical
                        : (h.metadata?.tactical?.description || "Awaiting Orders")
               })));
           }
       }
    };
    load();
  }, [user]);

  // Thinking Animation
  useEffect(() => {
    let interval;
    if (loading) {
      let i = 0;
      setThinkingText(activeCoach.thinking_logs[0]);
      interval = setInterval(() => {
        i = (i + 1) % activeCoach.thinking_logs.length;
        setThinkingText(activeCoach.thinking_logs[i]);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [loading, activeCoach]);

  const handleSend = async (e) => {
    e.preventDefault();
    if(!input.trim() || loading) return;

    const userText = input;
    setInput("");

    // UI Update (Optimistic)
    setMessages(prev => [...prev, { id: Date.now(), text: userText, sender: 'user' }]);
    setLoading(true);

    // DB Save: User Message
    await supabase.from('ai_chat_history').insert({
       user_id: user.id,
       role: 'user',
       content: userText
    });

    // INJECT TELEMETRY (THE TRUTH)
    let telemetryContext = "No habit data available.";
    try {
        const { data: stats } = await supabase.from('habit_stats_view').select('*').eq('user_id', user.id);
        if (stats && stats.length > 0) {
            telemetryContext = stats.map((h: any) => `- ${h.title}: 30d Vol: ${h.vol_30}, Trend: ${h.trend_direction}`).join('\n');
        }
    } catch (e) { console.error("Telemetry Fetch Failed", e); }

    const memoryContext = memories.map(m => `- ${m.memory_text}`).join('\n');
    const tacticalContext = tacticalIntel.map(t => `- ${t.title}: ${t.tactical}`).join('\n');

    const fullPrompt = `${activeCoach.system_prompt}

    CURRENT TELEMETRY (THE TRUTH):
    ${telemetryContext}

    TACTICAL INTEL (ACTIVE PROTOCOLS):
    ${tacticalContext}

    DIRECTIVE:
    Use this data to audit the user. Focus on execution steps (Tactical Intel).

    USER MEMORIES:
    ${memoryContext}

    USER: ${userText}`;

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: fullPrompt }] }] })
      });
      const data = await response.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "I am reflecting...";

      // DB Save: AI Message
      await supabase.from('ai_chat_history').insert({
         user_id: user.id,
         role: 'model',
         content: reply
      });

      setMessages(prev => [...prev, { id: Date.now()+1, text: reply, sender: 'ai' }]);
    } catch (e) {
      setMessages(prev => [...prev, { id: Date.now()+1, text: "Connection offline.", sender: 'ai' }]);
    }
    setLoading(false);
  };

  const addMemory = async (e) => {
    e.preventDefault();
    if(!newMemory) return;
    const { data } = await supabase.from('user_memories').insert({user_id: user.id, memory_text: newMemory}).select().single();
    if(data) setMemories(prev=>[...prev, data]);
    setNewMemory("");
  };

  const deleteMemory = async (id) => {
     await supabase.from('user_memories').delete().eq('id', id);
     setMemories(prev => prev.filter(m => m.id !== id));
  };

  return (

      <div className="flex flex-col h-[calc(100vh-100px)] max-w-6xl mx-auto gap-4">
        {/* HEADER */}
        <div className={`bg-gray-900 border-2 ${activeCoach?.colors?.border} rounded-2xl p-6 flex items-center justify-between relative overflow-hidden`}>
           <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-${activeCoach?.colors?.text?.split('-')[1]}-500/10 to-transparent rounded-full blur-3xl`} />

           <div className="flex items-center gap-6 z-10">
              <img src={activeCoach?.avatar_img} className={`w-20 h-20 rounded-2xl object-cover ring-2 ${activeCoach?.colors?.border}`} />
              <div>
                 <h1 className="text-3xl font-black text-white uppercase tracking-tighter">WAR ROOM: {activeCoach?.name}</h1>
                 <p className={`text-xs font-bold uppercase tracking-widest ${activeCoach?.colors?.text}`}>{activeCoach?.role}</p>
                 <p className="text-sm text-gray-400 mt-1 max-w-md">{activeCoach?.desc}</p>
              </div>
           </div>

           <button onClick={() => navigate('/settings')} className="z-10 text-xs bg-black/40 px-4 py-2 rounded-lg border border-white/5 hover:bg-black/60 flex items-center gap-2 transition-all">
              <Settings size={14} /> Change Commander
           </button>
        </div>

        <div className="flex flex-1 gap-4 overflow-hidden">

           {/* TACTICAL SIDEBAR (Left) */}
           <div className="w-72 bg-gray-900/30 backdrop-blur rounded-2xl border border-gray-800 flex flex-col hidden lg:flex">
              <div className="p-4 border-b border-gray-800 flex items-center gap-2 text-gray-400">
                 <Target size={16} /> <h3 className="font-bold text-xs uppercase tracking-widest">Tactical Briefing</h3>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {tacticalIntel.length === 0 && <p className="text-xs text-gray-600 italic">No active protocols.</p>}
                  {tacticalIntel.map((t, i) => {
                      // PALETTE MAPPING
                      let cardStyle = "bg-black/20 border-white/5 text-slate-500"; // Default
                      let titleStyle = "text-slate-300";

                      if (t.category === 'kinetic') {
                          cardStyle = "bg-blue-950/30 border-blue-500/20";
                          titleStyle = "text-blue-400";
                      } else if (t.category === 'cognitive') {
                          cardStyle = "bg-slate-900 border-slate-700";
                          titleStyle = "text-slate-400";
                      } else if (t.category === 'elite') { // Assuming 'elite' key, adjust if needed
                          cardStyle = "bg-white/5 border-amber-500/50";
                          titleStyle = "text-amber-400";
                      }

                      return (
                          <div key={i} className={`p-3 rounded-lg border ${cardStyle} transition-all`}>
                              <div className={`text-xs font-bold mb-1 uppercase tracking-wider ${titleStyle}`}>{t.title}</div>
                              <div className={`text-[10px] leading-relaxed line-clamp-3 font-mono ${t.category === 'elite' ? 'text-amber-100/70' : 'text-slate-400'}`}>
                                  {t.tactical}
                              </div>
                          </div>
                      );
                  })}
              </div>
           </div>

           {/* CHAT (Center) */}
           <div className="flex-1 flex flex-col bg-gray-900/50 backdrop-blur rounded-2xl border border-gray-800 overflow-hidden relative">
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map(m => (
                  <div key={m.id} className={`flex gap-4 ${m.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}>
                    {m.sender === 'ai' && <img src={activeCoach.avatar_img} className="w-8 h-8 rounded-lg object-cover mt-2 border border-white/10" />}
                    <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed shadow-lg ${m.sender === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-gray-800 border border-gray-700 text-gray-200 rounded-tl-none'}`}>
                      {m.text}
                    </div>
                  </div>
                ))}
                {loading && <div className="flex items-center gap-3 ml-14 animate-pulse"><div className={`w-2 h-2 rounded-full ${activeCoach.colors.pulse}`} /><span className={`text-[10px] font-bold uppercase tracking-widest ${activeCoach.colors.text}`}>{thinkingText}</span></div>}
              </div>
              <form onSubmit={handleSend} className="p-4 bg-black/40 border-t border-white/5 flex gap-3">
                <input value={input} onChange={e => setInput(e.target.value)} className="flex-1 bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50" placeholder={`Brief ${activeCoach.name}...`} />
                <button type="submit" disabled={loading} className="bg-blue-600 p-3 rounded-xl text-white hover:scale-105"><Send size={20}/></button>
              </form>
           </div>

           {/* MEMORY SIDEBAR (Right) */}
           <div className="w-72 bg-gray-900/30 backdrop-blur rounded-2xl border border-gray-800 flex flex-col hidden md:flex">
              <div className="p-4 border-b border-gray-800 flex items-center gap-2 text-gray-400">
                 <Brain size={16} /> <h3 className="font-bold text-xs uppercase tracking-widest">Glass Box</h3>
              </div>

              <div className="p-4 border-b border-gray-800">
                 <form onSubmit={addMemory} className="flex gap-2">
                    <input value={newMemory} onChange={e=>setNewMemory(e.target.value)} className="flex-1 bg-black/40 border border-gray-700 rounded px-2 py-1 text-xs text-white" placeholder="Add memory..." />
                    <button type="submit" className="bg-purple-600 px-3 py-1 rounded text-white text-xs font-bold uppercase hover:bg-purple-500">ADD</button>
                 </form>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                 {memories.map(m => (
                    <div key={m.id} className="bg-black/40 p-3 rounded-lg border border-gray-800 flex justify-between group">
                       <p className="text-xs text-gray-400">{m.memory_text}</p>
                       <button onClick={() => deleteMemory(m.id)} className="text-red-900 opacity-0 group-hover:opacity-100 hover:text-red-500"><Trash2 size={12}/></button>
                    </div>
                 ))}
                 <div className="p-4 text-[10px] text-gray-600 text-center leading-relaxed">
                    <Shield size={12} className="mx-auto mb-2"/>
                    CONFIDENTIAL
                 </div>
              </div>
           </div>
        </div>
      </div>

  );
}
