import { Sun, Brain, Activity, Droplets, Moon, Zap, Flame, Shield, Dumbbell, Heart } from 'lucide-react';

// 1. DEFINE THE LENSES (The "Filters")
export const SOVEREIGN_LENSES = {
  FORTITUDE: { color: 'bg-slate-800', label: 'Resilience & Grit' },
  REASON: { color: 'bg-blue-600', label: 'Logic & Analysis' },
  VISIONARY: { color: 'bg-purple-600', label: 'Future & Strategy' },
  ANALYTICAL: { color: 'bg-slate-100 text-black', label: 'Data & Precision' }
};

// 2. DEFINE THE HABIT LIBRARY (The "DNA")
export const SOVEREIGN_LIBRARY = [
  {
    id: 'h_morning_sun',
    title: 'Morning Sunlight',
    icon: Sun,
    base_color: 'bg-amber-500',
    lenses: {
      FORTITUDE: { why: "Discipline starts before comfort.", how: "10m outdoor exposure immediately." },
      REASON: { why: "Anchor circadian rhythm via cortisol pulse.", how: "View lux > 10,000 within 30m of wake." },
      VISIONARY: { why: "Illuminate the path forward.", how: "Visualize the win while under the sun." },
      ANALYTICAL: { why: "Optimizes melatonin onset 16h later.", how: "Log lux intensity." }
    },
    default_config: { frequency_type: 'ABSOLUTE', target: 1, unit: 'session' }
  },
  {
    id: 'h_deep_work',
    title: 'Deep Work',
    icon: Brain,
    base_color: 'bg-violet-600',
    lenses: {
      FORTITUDE: { why: "Callous the mind against distraction.", how: "90m block. Phone in another room." },
      REASON: { why: "Maximize cognitive output per hour.", how: "No context switching." },
      VISIONARY: { why: "Build the empire brick by brick.", how: "Focus on highest leverage task." },
      ANALYTICAL: { why: "Flow state requires 23m to access.", how: "Track interruptions." }
    },
    default_config: { frequency_type: 'FREQUENCY', target: 5, unit: 'sessions' }
  },
  {
    id: 'h_zone_2',
    title: 'Zone 2 Cardio',
    icon: Activity,
    base_color: 'bg-emerald-500',
    lenses: {
      FORTITUDE: { why: "Engine building. Boring but necessary.", how: "Nasal breathing only." },
      REASON: { why: "Mitochondrial efficiency optimization.", how: "Keep HR between 130-140." },
      VISIONARY: { why: "Longevity for the long game.", how: "Listen to strategy podcasts." },
      ANALYTICAL: { why: "Lactate clearance < 2mmol/L.", how: "Monitor HR drift." }
    },
    default_config: { frequency_type: 'FREQUENCY', target: 3, unit: 'hours' }
  }
  // ... Add remaining core habits here
];
