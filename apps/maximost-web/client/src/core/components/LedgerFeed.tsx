import React from 'react';
import { Activity, Zap, FileText, CheckCircle2, Lock } from 'lucide-react';
import { useLens } from '../context/LensContext';

// Feed Card Component
const FeedCard = ({ item }: any) => {
    const { type, timestamp, content } = item;
    const { currentLens } = useLens();
    const time = new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Resolve Narrative based on Lens
    const narrative = content.narrative ||
                      content.perspectives?.[currentLens] ||
                      content.perspectives?.fortitude ||
                      content.preview ||
                      (typeof content.data === 'string' ? content.data : JSON.stringify(content.data));

    // Type Config
    const config = {
        habit_completion: { icon: CheckCircle2, border: content.color || '#10B981', bg: 'bg-zinc-900/50' },
        telemetry: { icon: Activity, border: '#3B82F6', bg: 'bg-blue-950/20' },
        field_note: { icon: FileText, border: '#9CA3AF', bg: 'bg-zinc-950', font: 'font-mono' }
    }[type as 'habit_completion' | 'telemetry' | 'field_note'] || { icon: Zap, border: '#fff', bg: 'bg-zinc-900' };

    const Icon = config.icon;

    return (
        <div className={`relative pl-4 border-l-2 py-4 ${config.bg} mb-2 rounded-r-lg transition-all hover:bg-white/5 group cursor-default`} style={{ borderColor: config.border }}>
            <div className="flex justify-between items-start mb-1">
                <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" style={{ color: config.border }} />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">{content.title}</span>
                </div>
                <span className="text-[10px] text-zinc-500 font-mono">{time}</span>
            </div>

            {content.mission && (
                <div className="text-[10px] text-zinc-400 mb-2 uppercase tracking-wide opacity-70">
                    Mission: {content.mission}
                </div>
            )}

            <div className={`text-sm text-zinc-300 leading-relaxed ${content.is_encrypted ? 'blur-sm select-none cursor-pointer hover:blur-none transition-all duration-500' : ''} ${config.font || ''}`}>
                {narrative}
                {content.is_encrypted && <Lock className="w-3 h-3 absolute bottom-4 right-4 text-zinc-600" />}
            </div>
        </div>
    );
};

interface LedgerFeedProps {
    feed: any[];
    loading?: boolean;
    compact?: boolean;
    onLoadMore?: () => void;
    hasMore?: boolean;
}

export const LedgerFeed: React.FC<LedgerFeedProps> = ({ feed, loading, compact = false, onLoadMore, hasMore = false }) => {
    // Group Feed by Date
    const groupedFeed = feed.reduce((acc: any, item: any) => {
        const dateStr = item.timestamp ? new Date(item.timestamp).toDateString() : 'Unknown Date';
        if (!acc[dateStr]) acc[dateStr] = [];
        acc[dateStr].push(item);
        return acc;
    }, {});

    if (loading && feed.length === 0) return <div className="p-12 text-center text-slate-500 animate-pulse">SYNCING LEDGER...</div>;
    if (feed.length === 0) return <div className="text-center py-10 text-zinc-600 font-mono uppercase tracking-widest text-xs">No recent activity recorded.</div>;

    return (
        <div className={`bg-[#0b0c10] border border-white/5 rounded-2xl overflow-hidden relative ${compact ? 'min-h-[200px]' : 'min-h-[400px]'}`}>
            {!compact && <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>}

            {/* Fade Out Gradient */}
            {!compact && hasMore && <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0b0c10] to-transparent pointer-events-none z-20" />}

            <div className={`p-4 md:p-6 space-y-6 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent ${compact ? 'max-h-[300px]' : 'max-h-[600px]'}`}>
                {Object.entries(groupedFeed).map(([date, items]: any) => (
                    <div key={date}>
                        {/* STICKY DATE HEADER */}
                        <div className="sticky top-0 z-10 bg-[#0b0c10]/95 backdrop-blur py-2 mb-2 border-b border-white/5">
                            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{date}</h3>
                        </div>
                        <div className="space-y-1 pl-2 border-l border-white/5 ml-2">
                            {items.map((item: any) => (
                                <FeedCard key={item.id} item={item} />
                            ))}
                        </div>
                    </div>
                ))}

                {/* Load More Button */}
                {!compact && hasMore && (
                    <div className="pt-8 pb-8 flex justify-center relative z-30">
                        <button
                            onClick={onLoadMore}
                            disabled={loading}
                            className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all border border-zinc-800 hover:border-zinc-600 hover:text-white flex items-center gap-2"
                        >
                            {loading ? 'Decrypting...' : 'Load More Operations'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
