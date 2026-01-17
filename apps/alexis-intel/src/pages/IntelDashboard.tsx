import React from 'react';
import { AreaChart, Area, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Activity, Moon, Footprints, Droplets, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock Data
const SLEEP_DATA = [
  { day: 'M', score: 85 },
  { day: 'T', score: 72 },
  { day: 'W', score: 90 },
  { day: 'T', score: 65 },
  { day: 'F', score: 88 },
  { day: 'S', score: 92 },
  { day: 'S', score: 95 },
];

const STEPS_DATA = [
  { time: '6AM', steps: 0 },
  { time: '9AM', steps: 2500 },
  { time: '12PM', steps: 5500 },
  { time: '3PM', steps: 8200 },
  { time: '6PM', steps: 11000 },
  { time: '9PM', steps: 12500 },
];

interface GlassCardProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

const GlassCard: React.FC<GlassCardProps> = ({ title, icon: Icon, children, className, action }) => (
  <div className={cn("glass-panel rounded-xl p-6 flex flex-col h-full", className)}>
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center gap-2 text-white/80">
        <div className="p-2 bg-white/5 rounded-lg border border-white/5">
          <Icon className="w-5 h-5 text-amethyst" />
        </div>
        <span className="font-medium tracking-wide text-sm">{title}</span>
      </div>
      {action}
    </div>
    <div className="flex-1">
      {children}
    </div>
  </div>
);

const MetricInput = ({ label, unit, placeholder }: { label: string, unit: string, placeholder: string }) => (
  <div className="mb-4">
    <label className="block text-xs font-mono text-white/50 mb-1.5 uppercase tracking-wider">{label}</label>
    <div className="relative group">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full bg-black/40 border border-white/10 rounded-lg py-2.5 px-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-amethyst/50 focus:ring-1 focus:ring-amethyst/20 transition-all font-mono"
      />
      <span className="absolute right-3 top-2.5 text-xs text-white/40 font-mono">{unit}</span>
    </div>
  </div>
);

export const IntelDashboard: React.FC = () => {
  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h2 className="text-3xl font-light text-white mb-2">Biometric <span className="font-bold text-amethyst text-glow">Pulse</span></h2>
        <p className="text-white/40 max-w-2xl">
          Live ingestion stream for physiological telemetry. Connect sources to establish baseline.
        </p>
      </div>

      {/* METRICS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* SLEEP */}
        <GlassCard title="SLEEP HYGIENE" icon={Moon}>
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-4xl font-mono font-bold text-white">7.2</span>
            <span className="text-sm text-white/40">hrs avg</span>
            <span className="ml-auto flex items-center text-xs text-neon-teal bg-neon-teal/10 px-2 py-1 rounded-full border border-neon-teal/20">
              <ArrowUpRight className="w-3 h-3 mr-1" /> +12%
            </span>
          </div>
          <div className="h-32 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SLEEP_DATA}>
                <Bar
                  dataKey="score"
                  fill="#a855f7"
                  radius={[4, 4, 0, 0]}
                  fillOpacity={0.6}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 pt-6 border-t border-white/5">
            <MetricInput label="Manual Entry" unit="HOURS" placeholder="0.0" />
          </div>
        </GlassCard>

        {/* STEPS */}
        <GlassCard title="KINETIC OUTPUT" icon={Footprints}>
           <div className="flex items-baseline gap-2 mb-6">
            <span className="text-4xl font-mono font-bold text-white">12.5k</span>
            <span className="text-sm text-white/40">steps</span>
             <span className="ml-auto flex items-center text-xs text-neon-amber bg-neon-amber/10 px-2 py-1 rounded-full border border-neon-amber/20">
              Target Met
            </span>
          </div>
          <div className="h-32 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={STEPS_DATA}>
                <defs>
                  <linearGradient id="colorSteps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2E9CDB" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2E9CDB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="steps"
                  stroke="#2E9CDB"
                  fillOpacity={1}
                  fill="url(#colorSteps)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
           <div className="mt-6 pt-6 border-t border-white/5">
            <MetricInput label="Manual Entry" unit="STEPS" placeholder="00000" />
          </div>
        </GlassCard>

        {/* GLUCOSE / VITALS */}
        <GlassCard title="METABOLIC STATE" icon={Droplets}>
           <div className="flex items-baseline gap-2 mb-6">
            <span className="text-4xl font-mono font-bold text-white">88</span>
            <span className="text-sm text-white/40">mg/dL</span>
             <span className="ml-auto text-xs text-white/30">
              Fasting
            </span>
          </div>
           <div className="space-y-4">
             <div className="p-3 bg-white/5 rounded border border-white/5 flex justify-between items-center">
               <span className="text-sm text-white/60">Glucose (Fasted)</span>
               <span className="font-mono text-neon-teal">85 mg/dL</span>
             </div>
              <div className="p-3 bg-white/5 rounded border border-white/5 flex justify-between items-center">
               <span className="text-sm text-white/60">Ketones</span>
               <span className="font-mono text-amethyst">0.5 mmol/L</span>
             </div>
             <div className="p-3 bg-white/5 rounded border border-white/5 flex justify-between items-center">
               <span className="text-sm text-white/60">Resting HR</span>
               <span className="font-mono text-neon-red">48 bpm</span>
             </div>
           </div>
           <div className="mt-6 pt-6 border-t border-white/5">
            <button className="w-full py-3 bg-amethyst/20 hover:bg-amethyst/30 border border-amethyst/40 text-amethyst font-medium rounded-lg transition-all flex items-center justify-center gap-2">
              <Activity className="w-4 h-4" />
              LOG BIOMETRICS
            </button>
          </div>
        </GlassCard>

      </div>
    </div>
  );
};
