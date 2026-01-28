import {
  Sun, Moon, Droplets, Flame, Zap, Brain, Activity,
  Dumbbell, Shield, Anchor, Heart, Eye, Coffee,
  Smartphone, Wind, BookOpen, PenTool, DollarSign
} from 'lucide-react';

// MAP: String -> Component (Crucial for the Dashboard to render icons dynamically)
export const ICON_MAP: Record<string, any> = {
  Sun, Moon, Droplets, Flame, Zap, Brain, Activity,
  Dumbbell, Shield, Anchor, Heart, Eye, Coffee,
  Smartphone, Wind, BookOpen, PenTool, DollarSign
};

export const SOVEREIGN_LIBRARY = [
  // --- ABSOLUTE PROTOCOL (Non-Negotiable) ---
  {
    id: 'h_morning_sun',
    title: 'Morning Sunlight',
    description: 'Direct ocular exposure within 30 mins of waking.',
    category: 'body',
    system_tags: ['circadian', 'cortisol'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'morning' },
    visuals: { icon: 'Sun', color: 'bg-amber-500' }
  },
  {
    id: 'h_cold_plunge',
    title: 'Cold Plunge',
    description: 'Submersion at <55°F for 3 minutes.',
    category: 'body',
    system_tags: ['dopamine', 'metabolic'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'morning' },
    visuals: { icon: 'Droplets', color: 'bg-cyan-500' }
  },
  {
    id: 'h_sleep_8h',
    title: 'Sleep 8 Hours',
    description: 'Time in bed adequate for 5 full cycles.',
    category: 'body',
    system_tags: ['recovery', 'cognitive'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'evening' },
    visuals: { icon: 'Moon', color: 'bg-indigo-500' }
  },
  {
    id: 'h_no_sugar',
    title: 'Zero Processed Sugar',
    description: 'Strict elimination of added glycemic spikes.',
    category: 'body',
    system_tags: ['insulin', 'inflammation'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'any' },
    visuals: { icon: 'Shield', color: 'bg-red-600' }
  },
  {
    id: 'h_read_30',
    title: 'Read 30 Mins',
    description: 'Non-fiction, tactical, or philosophical input.',
    category: 'mind',
    system_tags: ['cognitive', 'focus'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'evening' },
    visuals: { icon: 'BookOpen', color: 'bg-emerald-600' }
  },

  // --- FREQUENCY TARGETS (Growth) ---
  {
    id: 'h_zone_2',
    title: 'Zone 2 Cardio',
    description: '45-60 minutes at nasal-breathing pace.',
    category: 'body',
    system_tags: ['mitochondria', 'endurance'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 4, time_of_day: 'any' },
    visuals: { icon: 'Activity', color: 'bg-emerald-500' }
  },
  {
    id: 'h_lift_heavy',
    title: 'Heavy Resistance',
    description: 'Compound movements near failure.',
    category: 'body',
    system_tags: ['musculoskeletal', 'hormonal'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 4, time_of_day: 'afternoon' },
    visuals: { icon: 'Dumbbell', color: 'bg-stone-500' }
  },
  {
    id: 'h_deep_work',
    title: 'Deep Work Block',
    description: '90 minutes uninterrupted creative output.',
    category: 'business',
    system_tags: ['flow', 'output'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 5, time_of_day: 'morning' },
    visuals: { icon: 'Brain', color: 'bg-violet-600' }
  },
  {
    id: 'h_sauna',
    title: 'Heat Exposure',
    description: '20 minutes at >180°F.',
    category: 'body',
    system_tags: ['heat-shock', 'growth-hormone'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 4, time_of_day: 'evening' },
    visuals: { icon: 'Flame', color: 'bg-orange-600' }
  },
  {
    id: 'h_writing',
    title: 'Tactical Writing',
    description: 'Documentation, journaling, or content creation.',
    category: 'mind',
    system_tags: ['clarity', 'legacy'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 3, time_of_day: 'morning' },
    visuals: { icon: 'PenTool', color: 'bg-blue-500' }
  },
  {
    id: 'h_financial_review',
    title: 'Asset Review',
    description: 'Check markets, P&L, and cash flow.',
    category: 'asset',
    system_tags: ['wealth', 'audit'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 1, time_of_day: 'morning' },
    visuals: { icon: 'DollarSign', color: 'bg-green-600' }
  },
  {
    id: 'h_fasting',
    title: 'Intermittent Fast',
    description: '16+ hour window of zero calories.',
    category: 'body',
    system_tags: ['autophagy', 'discipline'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 5, time_of_day: 'morning' },
    visuals: { icon: 'Zap', color: 'bg-yellow-500' }
  },
  {
    id: 'h_digital_detox',
    title: 'Digital Sunset',
    description: 'No screens 1 hour before bed.',
    category: 'mind',
    system_tags: ['recovery', 'melatonin'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'evening' },
    visuals: { icon: 'Smartphone', color: 'bg-pink-600' }
  },
  {
    id: 'h_breathwork',
    title: 'Wim Hof / Box Breathing',
    description: 'Hypoxic training or parasympathetic activation.',
    category: 'spirit',
    system_tags: ['co2-tolerance', 'calm'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 7, time_of_day: 'morning' },
    visuals: { icon: 'Wind', color: 'bg-sky-400' }
  }
  // ... Continue adding to reach 60 items following this EXACT schema
];
