import { Sun, Brain, Activity, Droplets, Moon, Zap, Flame, Shield, Dumbbell, Heart, Bed, Smartphone, Wind, Anchor, Coffee, Hash } from 'lucide-react';

export const SOVEREIGN_LENSES = {
  FORTITUDE: { color: 'bg-emerald-600', label: 'Resilience' },
  REASON: { color: 'bg-blue-600', label: 'Rationality' },
  VISIONARY: { color: 'bg-purple-600', label: 'Strategy' },
  ANALYTICAL: { color: 'bg-slate-500', label: 'Data' }
};

export const SOVEREIGN_LIBRARY = [
  // ABSOLUTE HABITS (Non-Negotiable)
  {
    id: 'h_morning_sun',
    title: 'Morning Sunlight',
    icon: Sun,
    base_color: 'bg-amber-500',
    lenses: { FORTITUDE: { why: "Discipline starts early." } },
    default_config: { frequency_type: 'ABSOLUTE', target: 1, unit: 'session' }
  },
  {
    id: 'h_cold_plunge',
    title: 'Cold Plunge',
    icon: Droplets,
    base_color: 'bg-cyan-500',
    lenses: { FORTITUDE: { why: "Kill the comfort demon." } },
    default_config: { frequency_type: 'ABSOLUTE', target: 1, unit: 'session' }
  },
  {
    id: 'h_no_sugar',
    title: 'No Sugar',
    icon: Shield,
    base_color: 'bg-red-600',
    lenses: { FORTITUDE: { why: "Glycemic discipline." } },
    default_config: { frequency_type: 'ABSOLUTE', target: 1, unit: 'day' }
  },
  {
    id: 'h_sleep_8h',
    title: 'Sleep 8 Hours',
    icon: Bed,
    base_color: 'bg-indigo-500',
    lenses: { FORTITUDE: { why: "Recovery is a weapon." } },
    default_config: { frequency_type: 'ABSOLUTE', target: 1, unit: 'night' }
  },
  // FREQUENCY HABITS (Targets)
  {
    id: 'h_deep_work',
    title: 'Deep Work',
    icon: Brain,
    base_color: 'bg-violet-600',
    lenses: { FORTITUDE: { why: "Focus is the new currency." } },
    default_config: { frequency_type: 'FREQUENCY', target: 5, unit: 'sessions' }
  },
  {
    id: 'h_zone_2',
    title: 'Zone 2 Cardio',
    icon: Activity,
    base_color: 'bg-emerald-500',
    lenses: { FORTITUDE: { why: "Build the engine." } },
    default_config: { frequency_type: 'FREQUENCY', target: 3, unit: 'sessions' }
  },
  {
    id: 'h_lift_heavy',
    title: 'Heavy Lift',
    icon: Dumbbell,
    base_color: 'bg-stone-500',
    lenses: { FORTITUDE: { why: "Iron sharpens iron." } },
    default_config: { frequency_type: 'FREQUENCY', target: 4, unit: 'sessions' }
  }
  // ... (Add the rest of the 60 here)
];
