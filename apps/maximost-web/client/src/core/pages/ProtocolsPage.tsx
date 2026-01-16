import React, { useState, useEffect } from 'react';
import { Layers, Plus, ArrowRight } from 'lucide-react';
import { supabase } from '../supabase';
import { useAuth } from '../AuthSystem';

import { useToast } from '../components/Toast';
import { useNavigate } from 'react-router-dom';
import { getThemeStyles } from '../config/themeConfig';

export function ProtocolsPage() {
    const { user } = useAuth();
    const { toast } = useToast();
    const navigate = useNavigate();
    const [protocols, setProtocols] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProtocols = async () => {
            const { data } = await supabase.from('library_protocols').select('*').order('title');
            setProtocols(data || []);
            setLoading(false);
        };
        fetchProtocols();
    }, []);

    const installProtocol = async (protocol: any) => {
        if(!user) return;

        // 0. Fetch existing habits for Linking Logic
        const { data: existing } = await supabase.from('habits').select('*').eq('user_id', user.id);
        const existingMap = new Map((existing || []).map(e => [e.title, e]));

        // 1. Fetch Habit Details for each atom in the stack
        const { data: habitAtoms, error } = await supabase
            .from('library_habits')
            .select('*')
            .in('slug', protocol.habits);

        if (error) {
             toast.error("System Error: " + error.message);
             return;
        }

        if (!habitAtoms || habitAtoms.length === 0) {
            toast.error("Error: Protocol atoms not found in archive.");
            return;
        }

        const newHabits = [];
        const updates = [];
        const stackInfo = { name: protocol.title, color: protocol.theme_override || 'maximost_blue' };

        for (const atom of habitAtoms) {
            if (existingMap.has(atom.title)) {
                // UPDATE EXISTING: Link Stack
                const h = existingMap.get(atom.title);
                const currentStacks = h.metadata?.linked_stacks || [];
                // Deduplicate Stack Tag
                if (!currentStacks.find((s:any) => s.name === stackInfo.name)) {
                     const newMetadata = { ...h.metadata, linked_stacks: [...currentStacks, stackInfo] };
                     updates.push({ id: h.id, metadata: newMetadata });
                }
            } else {
                // INSERT NEW
                newHabits.push({
                     user_id: user.id,
                     title: atom.title,
                     icon: atom.metadata?.visuals?.icon ?? atom.icon ?? 'Activity',
                     color: atom.metadata?.visuals?.theme ?? protocol.master_theme ?? atom.theme ?? 'maximost_blue',
                     frequency_type: atom.type === 'boolean' ? 'absolute' : 'frequency',
                     target_count: atom.target_value || 3,
                     daily_goal: atom.target_value || 1,
                     unit: atom.unit || 'check',
                     // VANCE: Inject DASH descriptions (How/Why) from Library Metadata
                     description: protocol.title,
                     how_instruction: atom.metadata?.compiler?.step ?? atom.how_instruction,
                     why_instruction: atom.metadata?.compiler?.why ?? atom.why_instruction,
                     category: atom.category,
                     metadata: { ...atom.metadata, linked_stacks: [stackInfo] },
                     is_active: true
                });
            }
        }

        // Execute Updates (Linking)
        for(const u of updates) {
            await supabase.from('habits').update({ metadata: u.metadata }).eq('id', u.id);
        }

        // Execute Inserts
        if (newHabits.length > 0) {
            const { error: insertError } = await supabase.from('habits').insert(newHabits);
            if (insertError) {
                toast.error("Deployment Failed: " + insertError.message);
                return;
            }
        }

        toast.success("Protocol Active");
        navigate('/dashboard');
    };

    return (

        <div className="p-6 max-w-7xl mx-auto space-y-8 pb-24">
            <div>
                <h1 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">Protocol Stacks</h1>
                <p className="text-slate-400">Deploy complete behavioral systems from the world's elite.</p>
            </div>

            {loading ? <div className="text-slate-500">Loading Stacks...</div> : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {protocols.map(p => {
                        const theme = getThemeStyles(p.theme_override || 'maximost_blue');
                        return (
                        <div
                            key={p.id}
                            className="bg-[#0b0c10] border border-white/10 p-6 rounded-2xl transition-all group flex flex-col justify-between h-full relative"
                            title="Deploying Protocol Molecule."
                            style={{ borderColor: theme.hex + '33' }}
                        >
                            <div>
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex flex-col">
                                        <h3 className="text-xl font-bold text-white leading-none">{p.title}</h3>
                                        {p.category && <span className="text-[10px] font-bold uppercase tracking-widest mt-1" style={{ color: theme.hex }}>{p.category}</span>}
                                    </div>
                                    <Layers className="w-5 h-5" style={{ color: theme.hex }} />
                                </div>
                                <p className="text-sm text-slate-400 mb-6 min-h-[40px] leading-relaxed mt-4">{p.description}</p>

                                <div className="space-y-2 mb-8 bg-white/5 p-4 rounded-xl">
                                    {p.habits.map((h: string) => (
                                        <div key={h} className="text-xs text-slate-300 flex items-center gap-2">
                                            <div className="w-1 h-1 rounded-full" style={{ backgroundColor: theme.hex }} />
                                            {h}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={() => installProtocol(p)}
                                className="w-full py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 border"
                                style={{
                                    backgroundColor: theme.hex + '1A',
                                    borderColor: theme.hex + '33',
                                    color: theme.hex
                                }}
                            >
                                <Plus className="w-4 h-4" /> Deploy Stack
                            </button>
                        </div>
                    )})}
                </div>
            )}
        </div>

    );
}
