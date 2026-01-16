// client/src/core/pages/BioTelemetryPage.tsx
import React, { useState, useEffect } from 'react';
import { Activity, Zap, Heart, Moon, Signal, Scale, Dumbbell, Footprints, Save } from 'lucide-react';
import { useToast } from '../components/Toast';

export default function BioTelemetryPage() {
  const { toast } = useToast();

  // Manual State
  const [metrics, setMetrics] = useState({
      weight: '',
      bodyFat: '',
      bench: '',
      squat: '',
      deadlift: '',
      steps: ''
  });

  useEffect(() => {
      const saved = localStorage.getItem('manual_metrics');
      if (saved) setMetrics(JSON.parse(saved));
  }, []);

  const handleChange = (key: string, value: string) => {
      setMetrics(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
      localStorage.setItem('manual_metrics', JSON.stringify(metrics));
      // In a real implementation, this would upsert to habit_logs or a biometrics table
      toast.success("Biometrics Locked");
  };

  return (
    <div className="p-8 space-y-8 bg-[#0B1121] min-h-screen text-white relative overflow-hidden font-mono">

      {/* Tactical Header */}
      <div className="flex justify-between items-center border-b border-zinc-800 pb-6 relative z-10">
        <h1 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-3">
          <Activity className="text-emerald-500 w-8 h-8" /> Bio-Telemetry
        </h1>
        <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
            </span>
            <div className="bg-orange-950/30 text-orange-500 text-[10px] font-bold px-3 py-1.5 rounded border border-orange-900/50 uppercase tracking-widest animate-pulse">
                MANUAL OVERRIDE // INPUT ACTIVE
            </div>
        </div>
      </div>

      {/* Main Grid: Manual Input Station */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">

        {/* COMPOSITION */}
        <ManualCard icon={Scale} title="Body Composition" color="blue">
            <div className="grid grid-cols-2 gap-4">
                <InputGroup label="Weight (lbs)" value={metrics.weight} onChange={(v) => handleChange('weight', v)} />
                <InputGroup label="Body Fat %" value={metrics.bodyFat} onChange={(v) => handleChange('bodyFat', v)} />
            </div>
        </ManualCard>

        {/* ENGINE RPM (Steps) */}
        <ManualCard icon={Footprints} title="Engine RPM (Steps)" color="emerald">
             <div className="space-y-2">
                <InputGroup label="Daily Steps" value={metrics.steps} onChange={(v) => handleChange('steps', v)} />
                <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-800 mt-2">
                    <div className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)] transition-all duration-1000" style={{ width: `${Math.min((parseInt(metrics.steps || '0') / 10000) * 100, 100)}%` }} />
                </div>
             </div>
        </ManualCard>

        {/* OUTPUT (Lifts) */}
        <ManualCard icon={Dumbbell} title="Max Output (PRs)" color="red">
            <div className="space-y-3">
                <InputGroup label="Bench Press" value={metrics.bench} onChange={(v) => handleChange('bench', v)} />
                <InputGroup label="Squat" value={metrics.squat} onChange={(v) => handleChange('squat', v)} />
                <InputGroup label="Deadlift" value={metrics.deadlift} onChange={(v) => handleChange('deadlift', v)} />
            </div>
        </ManualCard>

      </div>

      {/* Save Action */}
      <div className="fixed bottom-8 right-8 z-50">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold uppercase tracking-widest shadow-[0_0_30px_rgba(37,99,235,0.5)] transition-all hover:scale-105"
          >
              <Save className="w-5 h-5" /> Save Metrics
          </button>
      </div>

      {/* Full Page "Static" Overlay for atmosphere */}
      <div className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0"></div>
    </div>
  );
}

const ManualCard = ({ icon: Icon, title, children, color }: any) => {
    const colorClass = {
        blue: "text-blue-500 border-blue-500/30",
        emerald: "text-emerald-500 border-emerald-500/30",
        red: "text-red-500 border-red-500/30"
    }[color] || "text-zinc-500";

    return (
        <div className="bg-zinc-950/50 backdrop-blur-md border border-zinc-800 p-6 rounded-xl space-y-4 hover:border-zinc-700 transition-all group">
            <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded bg-zinc-900 ${colorClass.split(' ')[0]}`}>
                    <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-xs font-bold uppercase text-zinc-300 tracking-widest">{title}</h3>
            </div>
            {children}
        </div>
    );
};

const InputGroup = ({ label, value, onChange }: any) => (
    <div className="space-y-1">
        <label className="text-[9px] uppercase font-bold text-zinc-600 tracking-wide">{label}</label>
        <input
            type="number"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-black border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-white/20 transition-colors font-mono"
            placeholder="0"
        />
    </div>
);
