import { Zap } from 'lucide-react';

export default function StreakBadge({ count }) {
  if (!count || count <= 0) return null;
  return (
    <div className="flex items-center text-xs font-bold text-orange-400 bg-orange-900/20 px-2 py-0.5 rounded">
       <Zap size={10} className="mr-1 fill-current" /> {count}
    </div>
  );
}
