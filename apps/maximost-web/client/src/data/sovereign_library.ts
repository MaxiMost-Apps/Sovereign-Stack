import {
  Sun, Moon, Droplets, Flame, Zap, Brain, Activity,
  Dumbbell, Shield, Anchor, Heart, Eye, Coffee,
  Smartphone, Wind, BookOpen, PenTool, DollarSign,
  Mountain, Clock, BedDouble, Utensils, Footprints,
  Music, Smile, Users, CheckCircle, Target, Lock,
  Thermometer, Briefcase, Calculator, Radio, Hash,
  Lightbulb, Skull, Swords, Gem, Sprout, Network,
  Signal, Battery, Leaf, Fish, Milk, Egg,
  Gamepad2, XCircle, Ban, Hourglass, Scale,
  Glasses, Mic, RefreshCw, Box, Layers, Speaker,
  Clipboard, CalendarCheck, Home, ShoppingCart, User
} from 'lucide-react';

// --- 1. ICON MAPPING ---
export const ICON_MAP: Record<string, any> = {
  Sun, Moon, Droplets, Flame, Zap, Brain, Activity,
  Dumbbell, Shield, Anchor, Heart, Eye, Coffee,
  Smartphone, Wind, BookOpen, PenTool, DollarSign,
  Mountain, Clock, BedDouble, Utensils, Footprints,
  Music, Smile, Users, CheckCircle, Target, Lock,
  Thermometer, Briefcase, Calculator, Radio, Hash,
  Lightbulb, Skull, Swords, Gem, Sprout, Network,
  Signal, Battery, Leaf, Fish, Milk, Egg,
  Gamepad2, XCircle, Ban, Hourglass, Scale,
  Glasses, Mic, RefreshCw, Box, Layers, Speaker,
  Clipboard, CalendarCheck, Home, ShoppingCart, User
};

// --- 2. TYPES ---
export interface LensData {
  why: string;
  how: string;
}

export interface HabitDefinition {
  id: string;
  title: string;
  description: string;
  category: 'mind' | 'body' | 'spirit' | 'business' | 'asset';
  system_tags: string[];
  default_config: {
    frequency_type: 'ABSOLUTE' | 'FREQUENCY';
    target_days: number;
    time_of_day: 'morning' | 'afternoon' | 'evening' | 'any';
  };
  visuals: {
    icon: string;
    color: string;
  };
  lenses: {
    FORTITUDE: LensData;
    REASON: LensData;
  };
}

// --- 3. THE ATOM LEDGER (60 ITEMS) ---
export const SOVEREIGN_LIBRARY: HabitDefinition[] = [

  // === MORNING & BIOLOGY (1-10) ===
  {
    id: 'h_wake_0430',
    title: '04:30 Wake Up',
    description: 'Beat the enemy to the battlefield.',
    category: 'body',
    system_tags: ['discipline', 'jocko'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'morning' },
    visuals: { icon: 'Clock', color: 'bg-slate-600' },
    lenses: {
      FORTITUDE: { why: "The enemy is sleeping. You are working.", how: "Alarm far from bed. No snooze." },
      REASON: { why: "Maximizes distraction-free hours.", how: "Go to bed early to sustain this." }
    }
  },
  {
    id: 'h_morning_sun',
    title: 'Morning Sunlight',
    description: 'Anchor circadian clock.',
    category: 'body',
    system_tags: ['circadian', 'huberman'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'morning' },
    visuals: { icon: 'Sun', color: 'bg-amber-500' },
    lenses: {
      FORTITUDE: { why: "Discipline starts early.", how: "Face East immediately." },
      REASON: { why: "Sets circadian rhythm via melanopsin triggers.", how: "10-20m direct exposure." }
    }
  },
  {
    id: 'h_morning_salt',
    title: 'Morning Salt',
    description: '30oz Water + Electrolytes.',
    category: 'body',
    system_tags: ['hydration'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'morning' },
    visuals: { icon: 'Droplets', color: 'bg-blue-400' },
    lenses: {
      FORTITUDE: { why: "Prime the machine.", how: "Drink before coffee." },
      REASON: { why: "Rehydrates brain tissue after sleep.", how: "LMNT or Sea Salt in water." }
    }
  },
  {
    id: 'h_cold_plunge',
    title: 'Cold Plunge',
    description: 'Systemic inflammation reduction.',
    category: 'body',
    system_tags: ['dopamine', 'recovery'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'morning' },
    visuals: { icon: 'Thermometer', color: 'bg-cyan-500' },
    lenses: {
      FORTITUDE: { why: "Kill the comfort demon.", how: "Full submersion." },
      REASON: { why: "Increases dopamine 2.5x.", how: "3-5m at 50°F." }
    }
  },
  {
    id: 'h_delay_caffeine',
    title: 'Delay Caffeine',
    description: 'Wait 90 minutes before coffee.',
    category: 'body',
    system_tags: ['adenosine'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'morning' },
    visuals: { icon: 'Coffee', color: 'bg-amber-700' },
    lenses: {
      FORTITUDE: { why: "Prove you function without stimulants.", how: "Hydrate first." },
      REASON: { why: "Prevents afternoon crash.", how: "Wait for cortisol peak." }
    }
  },
  {
    id: 'h_make_bed',
    title: 'Make The Bed',
    description: 'First task completed.',
    category: 'mind',
    system_tags: ['order'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'morning' },
    visuals: { icon: 'CheckCircle', color: 'bg-emerald-600' },
    lenses: {
      FORTITUDE: { why: "Create order from chaos.", how: "Military corners." },
      REASON: { why: "Psychological momentum.", how: "Takes 60 seconds." }
    }
  },
  {
    id: 'h_meditation',
    title: 'Meditation',
    description: 'Mindfulness practice.',
    category: 'spirit',
    system_tags: ['mindfulness'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'morning' },
    visuals: { icon: 'Wind', color: 'bg-sky-400' },
    lenses: {
      FORTITUDE: { why: "Control the monkey mind.", how: "10 mins silence." },
      REASON: { why: "Increases grey matter density.", how: "Focus on breath." }
    }
  },
  {
    id: 'h_wim_hof',
    title: 'Wim Hof Breathing',
    description: 'Hypoxic training.',
    category: 'body',
    system_tags: ['breath'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 3, time_of_day: 'morning' },
    visuals: { icon: 'Wind', color: 'bg-blue-300' },
    lenses: {
      FORTITUDE: { why: "Control physiology.", how: "30 rounds + hold." },
      REASON: { why: "Alkalizes blood temporarily.", how: "Follow protocol." }
    }
  },
  {
    id: 'h_gratitude',
    title: 'Gratitude Log',
    description: 'Positive reinforcement.',
    category: 'spirit',
    system_tags: ['mindset'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'morning' },
    visuals: { icon: 'Heart', color: 'bg-pink-500' },
    lenses: {
      FORTITUDE: { why: "Perspective is tactical.", how: "Write 3 things." },
      REASON: { why: "Rewires brain for positivity.", how: "Be specific." }
    }
  },
  {
    id: 'h_scripture',
    title: 'Read Scripture',
    description: 'Ancient wisdom input.',
    category: 'spirit',
    system_tags: ['wisdom'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'morning' },
    visuals: { icon: 'BookOpen', color: 'bg-yellow-600' },
    lenses: {
      FORTITUDE: { why: "Stand on the shoulders of giants.", how: "1 chapter." },
      REASON: { why: "Grounds moral framework.", how: "Reflect on meaning." }
    }
  },

  // === PHYSICAL TRAINING (11-20) ===
  {
    id: 'h_zone_2',
    title: 'Zone 2 Cardio',
    description: 'Base aerobic capacity.',
    category: 'body',
    system_tags: ['endurance'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 4, time_of_day: 'any' },
    visuals: { icon: 'Activity', color: 'bg-emerald-500' },
    lenses: {
      FORTITUDE: { why: "Build the engine.", how: "Nasal breathing pace." },
      REASON: { why: "Mitochondrial efficiency.", how: "45-60 mins." }
    }
  },
  {
    id: 'h_heavy_lift',
    title: 'Heavy Resistance',
    description: 'Compound movements.',
    category: 'body',
    system_tags: ['strength'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 4, time_of_day: 'afternoon' },
    visuals: { icon: 'Dumbbell', color: 'bg-stone-500' },
    lenses: {
      FORTITUDE: { why: "Iron sharpens iron.", how: "Log every rep." },
      REASON: { why: "Bone density & testosterone.", how: "Squat, Deadlift, Press." }
    }
  },
  {
    id: 'h_ruck',
    title: 'Rucking',
    description: 'Weighted walking.',
    category: 'body',
    system_tags: ['endurance'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 2, time_of_day: 'any' },
    visuals: { icon: 'Mountain', color: 'bg-green-800' },
    lenses: {
      FORTITUDE: { why: "Embrace the suck.", how: "30lb pack." },
      REASON: { why: "Work capacity.", how: "3 miles minimum." }
    }
  },
  {
    id: 'h_sprint',
    title: 'VO2 Max Sprints',
    description: 'HIIT intervals.',
    category: 'body',
    system_tags: ['vo2max'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 1, time_of_day: 'any' },
    visuals: { icon: 'Wind', color: 'bg-red-500' },
    lenses: {
      FORTITUDE: { why: "Taste blood.", how: "Max effort." },
      REASON: { why: "VO2 Max / Longevity.", how: "4x4 protocol." }
    }
  },
  {
    id: 'h_mobility',
    title: 'Mobility / Yoga',
    description: 'Joint maintenance.',
    category: 'body',
    system_tags: ['recovery'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 3, time_of_day: 'evening' },
    visuals: { icon: 'Smile', color: 'bg-teal-500' },
    lenses: {
      FORTITUDE: { why: "Maintenance prevents breakdown.", how: "15 mins." },
      REASON: { why: "Preserves range of motion.", how: "Focus on hips/spine." }
    }
  },
  {
    id: 'h_grip',
    title: 'Grip Training',
    description: 'Dead hangs / carries.',
    category: 'body',
    system_tags: ['strength'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 3, time_of_day: 'any' },
    visuals: { icon: 'Target', color: 'bg-stone-700' },
    lenses: {
      FORTITUDE: { why: "Never let go.", how: "Hang for time." },
      REASON: { why: "Grip/Mortality correlation.", how: "Heavy carries." }
    }
  },
  {
    id: 'h_neck',
    title: 'Neck Training',
    description: 'Protective chassis.',
    category: 'body',
    system_tags: ['durability'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 2, time_of_day: 'any' },
    visuals: { icon: 'Shield', color: 'bg-stone-400' },
    lenses: {
      FORTITUDE: { why: "Protect the computer.", how: "Controlled resistance." },
      REASON: { why: "Concussion prevention.", how: "Iron neck or plates." }
    }
  },
  {
    id: 'h_sport',
    title: 'Sport / Play',
    description: 'Dynamic movement.',
    category: 'body',
    system_tags: ['agility'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 1, time_of_day: 'any' },
    visuals: { icon: 'Trophy', color: 'bg-yellow-500' },
    lenses: {
      FORTITUDE: { why: "Test the machine.", how: "Compete." },
      REASON: { why: "Neuroplasticity.", how: "Pickleball, BJJ, etc." }
    }
  },
  {
    id: 'h_walk_jog',
    title: 'Walk / Jog',
    description: 'Low intensity movement.',
    category: 'body',
    system_tags: ['recovery'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'any' },
    visuals: { icon: 'Footprints', color: 'bg-green-400' },
    lenses: {
      FORTITUDE: { why: "Keep moving.", how: "10k steps." },
      REASON: { why: "Base metabolic health.", how: "Track steps." }
    }
  },
  {
    id: 'h_sauna',
    title: 'Sauna / Heat',
    description: 'Heat shock proteins.',
    category: 'body',
    system_tags: ['recovery'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 4, time_of_day: 'evening' },
    visuals: { icon: 'Flame', color: 'bg-orange-600' },
    lenses: {
      FORTITUDE: { why: "Sit in the fire.", how: "20 mins @ 190F." },
      REASON: { why: "Cardiovascular benefits.", how: "Post-workout." }
    }
  },

  // === NUTRITION & BIOCHEM (21-30) ===
  {
    id: 'h_fasting',
    title: 'Intermittent Fast',
    description: 'Restricted feeding.',
    category: 'body',
    system_tags: ['diet'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'morning' },
    visuals: { icon: 'Utensils', color: 'bg-yellow-500' },
    lenses: {
      FORTITUDE: { why: "Hunger is focus.", how: "Skip breakfast." },
      REASON: { why: "Autophagy activation.", how: "16:8 window." }
    }
  },
  {
    id: 'h_protein',
    title: 'High Protein',
    description: 'Muscle synthesis.',
    category: 'body',
    system_tags: ['diet'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'any' },
    visuals: { icon: 'Egg', color: 'bg-red-700' },
    lenses: {
      FORTITUDE: { why: "Feed the beast.", how: "1g per lb bodyweight." },
      REASON: { why: "Satiety and synthesis.", how: "Prioritize meat." }
    }
  },
  {
    id: 'h_no_sugar',
    title: 'No Sugar',
    description: 'Glycemic control.',
    category: 'body',
    system_tags: ['diet'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'any' },
    visuals: { icon: 'Ban', color: 'bg-red-600' },
    lenses: {
      FORTITUDE: { why: "Reject poison.", how: "Zero added sugar." },
      REASON: { why: "Metabolic health.", how: "Read labels." }
    }
  },
  {
    id: 'h_no_alcohol',
    title: 'Zero Alcohol',
    description: 'Neurotoxin avoidance.',
    category: 'body',
    system_tags: ['health'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'any' },
    visuals: { icon: 'Ban', color: 'bg-red-800' },
    lenses: {
      FORTITUDE: { why: "Reality is enough.", how: "Drink water." },
      REASON: { why: "Sleep preservation.", how: "Total abstinence." }
    }
  },
  {
    id: 'h_creatine',
    title: 'Creatine 5g',
    description: 'Physical fuel.',
    category: 'body',
    system_tags: ['supplements'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'morning' },
    visuals: { icon: 'Zap', color: 'bg-white' },
    lenses: {
      FORTITUDE: { why: "Power output.", how: "5g daily." },
      REASON: { why: "ATP production.", how: "Monohydrate." }
    }
  },
  {
    id: 'h_magnesium',
    title: 'Magnesium',
    description: 'Nervous system reg.',
    category: 'body',
    system_tags: ['supplements'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'evening' },
    visuals: { icon: 'Zap', color: 'bg-purple-500' },
    lenses: {
      FORTITUDE: { why: "Calm the storm.", how: "400mg Glycinate." },
      REASON: { why: "Relaxation.", how: "Before bed." }
    }
  },
  {
    id: 'h_omega3',
    title: 'Omega-3',
    description: 'Brain health.',
    category: 'body',
    system_tags: ['supplements'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'morning' },
    visuals: { icon: 'Fish', color: 'bg-orange-400' },
    lenses: {
      FORTITUDE: { why: "Oil the machine.", how: "High EPA/DHA." },
      REASON: { why: "Inflammation reduction.", how: "2g daily." }
    }
  },
  {
    id: 'h_acv',
    title: 'ACV',
    description: 'Apple Cider Vinegar.',
    category: 'body',
    system_tags: ['diet'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'morning' },
    visuals: { icon: 'FlaskConical', color: 'bg-amber-300' },
    lenses: {
      FORTITUDE: { why: "Gut health.", how: "1 tbsp in water." },
      REASON: { why: "Glycemic control.", how: "Before meals." }
    }
  },
  {
    id: 'h_fiber',
    title: 'Fiber',
    description: 'Gut health.',
    category: 'body',
    system_tags: ['diet'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'any' },
    visuals: { icon: 'Leaf', color: 'bg-green-400' },
    lenses: {
      FORTITUDE: { why: "Feed the biome.", how: "Veggie intake." },
      REASON: { why: "Digestion.", how: "Psyllium or food." }
    }
  },
  {
    id: 'h_cheat_meal',
    title: 'Cheat Meal Reset',
    description: 'Metabolic flexibility.',
    category: 'body',
    system_tags: ['diet'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 1, time_of_day: 'any' },
    visuals: { icon: 'RefreshCw', color: 'bg-pink-500' },
    lenses: {
      FORTITUDE: { why: "Strategic release.", how: "One meal, not a day." },
      REASON: { why: "Leptin reset.", how: "Enjoy it fully." }
    }
  },

  // === COGNITIVE & WORK (31-40) ===
  {
    id: 'h_deep_work',
    title: 'Deep Work',
    description: 'Distraction free focus.',
    category: 'business',
    system_tags: ['productivity'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 5, time_of_day: 'morning' },
    visuals: { icon: 'Brain', color: 'bg-violet-600' },
    lenses: {
      FORTITUDE: { why: "Distraction is poverty.", how: "90 mins, no phone." },
      REASON: { why: "Flow state.", how: "Cognitive load." }
    }
  },
  {
    id: 'h_read',
    title: 'Read (Analog)',
    description: 'Physical reading.',
    category: 'mind',
    system_tags: ['learning'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'evening' },
    visuals: { icon: 'BookOpen', color: 'bg-emerald-600' },
    lenses: {
      FORTITUDE: { why: "Sharpen the mind.", how: "10 pages." },
      REASON: { why: "Focus training.", how: "Paper only." }
    }
  },
  {
    id: 'h_writing',
    title: 'Writing',
    description: 'Structuring thought.',
    category: 'mind',
    system_tags: ['clarity'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 3, time_of_day: 'morning' },
    visuals: { icon: 'PenTool', color: 'bg-blue-500' },
    lenses: {
      FORTITUDE: { why: "Clear thoughts.", how: "Journal or publish." },
      REASON: { why: "Articulation.", how: "500 words." }
    }
  },
  {
    id: 'h_inbox_zero',
    title: 'Inbox Zero',
    description: 'Digital clutter clearance.',
    category: 'business',
    system_tags: ['organization'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 5, time_of_day: 'afternoon' },
    visuals: { icon: 'Briefcase', color: 'bg-blue-700' },
    lenses: {
      FORTITUDE: { why: "No loose ends.", how: "Clear the queue." },
      REASON: { why: "Mental clarity.", how: "Archive/Delete." }
    }
  },
  {
    id: 'h_plan_tomorrow',
    title: 'Plan Tomorrow',
    description: 'Pre-deployment staging.',
    category: 'business',
    system_tags: ['prep'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'evening' },
    visuals: { icon: 'Target', color: 'bg-slate-500' },
    lenses: {
      FORTITUDE: { why: "Win the morning.", how: "Top 3 priorities." },
      REASON: { why: "Decision fatigue.", how: "Check calendar." }
    }
  },
  {
    id: 'h_learn_skill',
    title: 'Learn Skill',
    description: 'Neuroplasticity training.',
    category: 'mind',
    system_tags: ['learning'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 3, time_of_day: 'any' },
    visuals: { icon: 'Lightbulb', color: 'bg-yellow-600' },
    lenses: {
      FORTITUDE: { why: "Always be a white belt.", how: "30 mins practice." },
      REASON: { why: "Brain health.", how: "Coding/Language." }
    }
  },
  {
    id: 'h_chess',
    title: 'Chess / Strategy',
    description: 'Tactical game play.',
    category: 'mind',
    system_tags: ['strategy'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 2, time_of_day: 'any' },
    visuals: { icon: 'Swords', color: 'bg-stone-600' },
    lenses: {
      FORTITUDE: { why: "Think ahead.", how: "1 rapid game." },
      REASON: { why: "Pattern recognition.", how: "Analyze losses." }
    }
  },
  {
    id: 'h_outreach',
    title: 'Outreach / Sales',
    description: 'Pipeline generation.',
    category: 'business',
    system_tags: ['growth'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 5, time_of_day: 'morning' },
    visuals: { icon: 'Network', color: 'bg-indigo-600' },
    lenses: {
      FORTITUDE: { why: "Hunt your food.", how: "5 calls/DMs." },
      REASON: { why: "Pipeline is life.", how: "Track conversions." }
    }
  },
  {
    id: 'h_audit_expenses',
    title: 'Audit Expenses',
    description: 'Financial leak check.',
    category: 'asset',
    system_tags: ['wealth'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 1, time_of_day: 'any' },
    visuals: { icon: 'Calculator', color: 'bg-red-400' },
    lenses: {
      FORTITUDE: { why: "Plug the leaks.", how: "Review charges." },
      REASON: { why: "Wealth preservation.", how: "Cancel unused." }
    }
  },
  {
    id: 'h_crypto_buy',
    title: 'Bitcoin Buy',
    description: 'DCA hard money.',
    category: 'asset',
    system_tags: ['wealth'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 1, time_of_day: 'any' },
    visuals: { icon: 'Gem', color: 'bg-orange-500' },
    lenses: {
      FORTITUDE: { why: "Opt out.", how: "Auto-buy." },
      REASON: { why: "Asymmetric upside.", how: "Self-custody." }
    }
  },

  // === MINDSET & RECOVERY (41-50) ===
  {
    id: 'h_dark_room',
    title: 'Dark Room Sleep',
    description: 'Blackout environment.',
    category: 'body',
    system_tags: ['sleep'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'evening' },
    visuals: { icon: 'Moon', color: 'bg-black' },
    lenses: {
      FORTITUDE: { why: "Cave mode.", how: "Tape LEDs." },
      REASON: { why: "Deep sleep.", how: "Eye mask." }
    }
  },
  {
    id: 'h_negative_viz',
    title: 'Negative Viz',
    description: 'Premeditatio Malorum.',
    category: 'mind',
    system_tags: ['stoicism'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 3, time_of_day: 'morning' },
    visuals: { icon: 'Skull', color: 'bg-stone-800' },
    lenses: {
      FORTITUDE: { why: "Prepare for the blow.", how: "Imagine loss." },
      REASON: { why: "Resilience.", how: "2 mins." }
    }
  },
  {
    id: 'h_memento_mori',
    title: 'Memento Mori',
    description: 'Remember death.',
    category: 'spirit',
    system_tags: ['stoicism'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 1, time_of_day: 'any' },
    visuals: { icon: 'Hourglass', color: 'bg-stone-500' },
    lenses: {
      FORTITUDE: { why: "Time is finite.", how: "Look at countdown." },
      REASON: { why: "Urgency.", how: "Don't waste today." }
    }
  },
  {
    id: 'h_journal_review',
    title: 'Weekly Review',
    description: 'Sunday strategy.',
    category: 'mind',
    system_tags: ['strategy'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 1, time_of_day: 'any' },
    visuals: { icon: 'BookOpen', color: 'bg-blue-800' },
    lenses: {
      FORTITUDE: { why: "Course correct.", how: "Review goals." },
      REASON: { why: "Planning.", how: "Set next week." }
    }
  },
  {
    id: 'h_social_detox',
    title: 'No Social Media',
    description: 'Dopamine fast.',
    category: 'mind',
    system_tags: ['focus'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 1, time_of_day: 'any' },
    visuals: { icon: 'Ban', color: 'bg-red-500' },
    lenses: {
      FORTITUDE: { why: "Stop scrolling.", how: "Delete apps." },
      REASON: { why: "Dopamine reset.", how: "Blocker." }
    }
  },
  {
    id: 'h_call_parents',
    title: 'Call Parents',
    description: 'Lineage connection.',
    category: 'spirit',
    system_tags: ['family'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 1, time_of_day: 'any' },
    visuals: { icon: 'Users', color: 'bg-teal-600' },
    lenses: {
      FORTITUDE: { why: "Honor lineage.", how: "Call, don't text." },
      REASON: { why: "Regret minimization.", how: "Check in." }
    }
  },
  {
    id: 'h_date_night',
    title: 'Date Night',
    description: 'Partner focus.',
    category: 'spirit',
    system_tags: ['relationship'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 1, time_of_day: 'evening' },
    visuals: { icon: 'Heart', color: 'bg-pink-600' },
    lenses: {
      FORTITUDE: { why: "Lead.", how: "Plan logistics." },
      REASON: { why: "Investment.", how: "No phones." }
    }
  },
  {
    id: 'h_play_kids',
    title: 'Play w/ Kids',
    description: 'Undistracted time.',
    category: 'spirit',
    system_tags: ['family'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'evening' },
    visuals: { icon: 'Smile', color: 'bg-yellow-400' },
    lenses: {
      FORTITUDE: { why: "Be present.", how: "Phone away." },
      REASON: { why: "Legacy.", how: "Floor time." }
    }
  },
  {
    id: 'h_gear_prep',
    title: 'Gear Prep',
    description: 'Kit staging.',
    category: 'body',
    system_tags: ['prep'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'evening' },
    visuals: { icon: 'Briefcase', color: 'bg-slate-700' },
    lenses: {
      FORTITUDE: { why: "Remove friction.", how: "Bag at door." },
      REASON: { why: "AM efficiency.", how: "Check weather." }
    }
  },
  {
    id: 'h_water_filter',
    title: 'Clean Water',
    description: 'Filtered/Spring only.',
    category: 'body',
    system_tags: ['health'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'any' },
    visuals: { icon: 'Droplets', color: 'bg-cyan-600' },
    lenses: {
      FORTITUDE: { why: "Don't drink poison.", how: "RO + Minerals." },
      REASON: { why: "Endocrine health.", how: "No plastic." }
    }
  },

  // === FINAL 10 (51-60) ===
  {
    id: 'h_grounding',
    title: 'Grounding',
    description: 'Earth contact.',
    category: 'body',
    system_tags: ['recovery'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 3, time_of_day: 'morning' },
    visuals: { icon: 'Sprout', color: 'bg-green-600' },
    lenses: {
      FORTITUDE: { why: "Connect.", how: "Barefoot outside." },
      REASON: { why: "Inflammation.", how: "10 mins." }
    }
  },
  {
    id: 'h_nature_walk',
    title: 'Nature Walk',
    description: 'Green space movement.',
    category: 'mind',
    system_tags: ['calm'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 2, time_of_day: 'any' },
    visuals: { icon: 'Leaf', color: 'bg-green-500' },
    lenses: {
      FORTITUDE: { why: "Decompress.", how: "Phone in car." },
      REASON: { why: "Optic flow.", how: "Horizon gaze." }
    }
  },
  {
    id: 'h_cooking',
    title: 'Cook Meal',
    description: 'Scratch cooking.',
    category: 'body',
    system_tags: ['nutrition'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'evening' },
    visuals: { icon: 'Flame', color: 'bg-orange-500' },
    lenses: {
      FORTITUDE: { why: "Control inputs.", how: "No seed oils." },
      REASON: { why: "Quality control.", how: "Master grill." }
    }
  },
  {
    id: 'h_box_breathing',
    title: 'Box Breathing',
    description: 'Stress reset.',
    category: 'mind',
    system_tags: ['calm'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 3, time_of_day: 'any' },
    visuals: { icon: 'Wind', color: 'bg-blue-200' },
    lenses: {
      FORTITUDE: { why: "Reset.", how: "4-4-4-4." },
      REASON: { why: "Stress reduction.", how: "Navy SEAL." }
    }
  },
  {
    id: 'h_no_phone',
    title: 'No-Phone Block',
    description: 'Physical separation.',
    category: 'mind',
    system_tags: ['focus'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'any' },
    visuals: { icon: 'Ban', color: 'bg-red-400' },
    lenses: {
      FORTITUDE: { why: "Break addiction.", how: "Phone in drawer." },
      REASON: { why: "Dopamine reset.", how: "2 hours." }
    }
  },
  {
    id: 'h_sleep_tracking',
    title: 'Sleep Tracking',
    description: 'Quantify recovery.',
    category: 'body',
    system_tags: ['data'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'morning' },
    visuals: { icon: 'Moon', color: 'bg-indigo-500' },
    lenses: {
      FORTITUDE: { why: "Data is truth.", how: "Check stats." },
      REASON: { why: "Feedback loop.", how: "Oura/Whoop." }
    }
  },
  {
    id: 'h_blue_block',
    title: 'Blue Light Block',
    description: 'Melatonin protection.',
    category: 'body',
    system_tags: ['sleep'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'evening' },
    visuals: { icon: 'Glasses', color: 'bg-orange-500' },
    lenses: {
      FORTITUDE: { why: "Sunset rules.", how: "Wear glasses." },
      REASON: { why: "Circadian rhythm.", how: "Post-sunset." }
    }
  },
  {
    id: 'h_temp_drop',
    title: 'Temp Drop',
    description: 'Cool sleeping.',
    category: 'body',
    system_tags: ['sleep'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'evening' },
    visuals: { icon: 'Thermometer', color: 'bg-cyan-800' },
    lenses: {
      FORTITUDE: { why: "Hibernate.", how: "AC to 65." },
      REASON: { why: "Deep sleep.", how: "Cool core." }
    }
  },
  {
    id: 'h_mouth_tape',
    title: 'Mouth Tape',
    description: 'Nasal breathing.',
    category: 'body',
    system_tags: ['sleep'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'evening' },
    visuals: { icon: 'Smile', color: 'bg-teal-700' },
    lenses: {
      FORTITUDE: { why: "Breathe right.", how: "Tape lips." },
      REASON: { why: "Oxygenation.", how: "Micropore." }
    }
  },
  {
    id: 'h_digital_dark',
    title: 'Digital Dark',
    description: 'Zero screens.',
    category: 'mind',
    system_tags: ['sleep'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'evening' },
    visuals: { icon: 'Moon', color: 'bg-indigo-900' },
    lenses: {
      FORTITUDE: { why: "Unplug.", how: "No screens." },
      REASON: { why: "Melatonin.", how: "1 hour pre-bed." }
    }
  }
];

// --- 4. THE 9 PROTOCOL STACKS ---
export const PROTOCOL_STACKS = [
  {
    id: 'stack_atlas',
    title: 'ATLAS GOLDEN SET',
    description: 'The foundation. Stabilize the rig.',
    habit_ids: ['h_wake_0430', 'h_morning_sun', 'h_morning_salt', 'h_protein', 'h_sleep_tracking']
  },
  {
    id: 'stack_huberman',
    title: 'HUBERMAN NEURAL',
    description: 'Optimizing the brain via biology.',
    habit_ids: ['h_morning_sun', 'h_cold_plunge', 'h_delay_caffeine', 'h_wim_hof', 'h_zone_2']
  },
  {
    id: 'stack_goggins',
    title: 'GOGGINS IRON MIND',
    description: 'Calloused mind through friction.',
    habit_ids: ['h_ruck', 'h_cold_plunge', 'h_sprint', 'h_mirror']
  },
  {
    id: 'stack_attia',
    title: 'ATTIA CENTENARIAN',
    description: 'Training for the Marginal Decade.',
    habit_ids: ['h_zone_2', 'h_heavy_lift', 'h_protein', 'h_sprint', 'h_mobility']
  },
  {
    id: 'stack_jocko',
    title: 'JOCKO DISCIPLINE',
    description: 'Military-grade daily execution.',
    habit_ids: ['h_wake_0430', 'h_heavy_lift', 'h_fasting', 'h_tomorrow_kit']
  },
  {
    id: 'stack_stoic',
    title: 'THE STOIC',
    description: 'Ancient logic for modern chaos.',
    habit_ids: ['h_meditation', 'h_scripture', 'h_writing', 'h_memento_mori']
  },
  {
    id: 'stack_war',
    title: 'THE WAR PHASE',
    description: 'High-output optimization.',
    habit_ids: ['h_deep_work', 'h_inbox_zero', 'h_no_phone', 'h_fasting']
  },
  {
    id: 'stack_deep',
    title: 'DEEP STACK',
    description: 'Cognitive superpower.',
    habit_ids: ['h_deep_work', 'h_no_phone', 'h_meditation', 'h_digital_dark']
  },
  {
    id: 'stack_athlete',
    title: 'ATHLETE STANDARD',
    description: 'Explosive power & recovery.',
    habit_ids: ['h_sprint', 'h_heavy_lift', 'h_protein', 'h_sauna', 'h_sleep_tracking']
  }
];
