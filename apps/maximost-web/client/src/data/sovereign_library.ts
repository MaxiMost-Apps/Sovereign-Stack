import {
  Sun, Moon, Droplets, Flame, Zap, Brain, Activity,
  Dumbbell, Shield, Anchor, Heart, Eye, Coffee,
  Smartphone, Wind, BookOpen, PenTool, DollarSign,
  Mountain, Clock, BedDouble, Utensils, Footprints,
  Music, Smile, Users, CheckCircle, Target, Lock,
  Thermometer, Briefcase, Calculator, Radio, Hash,
  Lightbulb, Skull, Swords, Gem, Sprout, Network,
  Signal, Battery, Leaf, Fish, Milk, Egg,
  Gamepad2, XCircle, Ban, Hourglass, Scale
} from 'lucide-react';

// --- 1. ICON MAPPING (Crucial for DB Hydration) ---
export const ICON_MAP: Record<string, any> = {
  Sun, Moon, Droplets, Flame, Zap, Brain, Activity,
  Dumbbell, Shield, Anchor, Heart, Eye, Coffee,
  Smartphone, Wind, BookOpen, PenTool, DollarSign,
  Mountain, Clock, BedDouble, Utensils, Footprints,
  Music, Smile, Users, CheckCircle, Target, Lock,
  Thermometer, Briefcase, Calculator, Radio, Hash,
  Lightbulb, Skull, Swords, Gem, Sprout, Network,
  Signal, Battery, Leaf, Fish, Milk, Egg,
  Gamepad2, XCircle, Ban, Hourglass, Scale
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
    FORTITUDE?: LensData;
    REASON?: LensData;
    [key: string]: LensData | undefined;
  };
}

// --- 3. THE SOVEREIGN LIBRARY (FULL 60) ---
export const SOVEREIGN_LIBRARY: HabitDefinition[] = [

  // === 1. MORNING PROTOCOL (THE IGNITION) ===
  {
    id: 'h_early_rise',
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
    description: 'Direct ocular exposure within 30 mins of waking.',
    category: 'body',
    system_tags: ['circadian', 'huberman'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'morning' },
    visuals: { icon: 'Sun', color: 'bg-amber-500' },
    lenses: {
      FORTITUDE: { why: "Discipline starts before the world wakes up.", how: "Step outside immediately. Face East." },
      REASON: { why: "Sets circadian rhythm via melanopsin triggers.", how: "10-20m direct exposure (no glass)." }
    }
  },
  {
    id: 'h_hydrate',
    title: 'Morning Salt',
    description: '30oz Water + Electrolytes immediately.',
    category: 'body',
    system_tags: ['hydration', 'cognitive'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'morning' },
    visuals: { icon: 'Droplets', color: 'bg-blue-400' },
    lenses: {
      FORTITUDE: { why: "Prime the machine.", how: "Drink before you think." },
      REASON: { why: "Rehydrates brain tissue after sleep.", how: "LMNT or Sea Salt in water." }
    }
  },
  {
    id: 'h_cold_plunge',
    title: 'Cold Plunge',
    description: 'Submersion at <55°F for 3 minutes.',
    category: 'body',
    system_tags: ['dopamine', 'metabolic'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'morning' },
    visuals: { icon: 'Thermometer', color: 'bg-cyan-500' },
    lenses: {
      FORTITUDE: { why: "Kill the comfort demon. Master panic.", how: "Full submersion. Control breath." },
      REASON: { why: "Increases dopamine 2.5x and reduces inflammation.", how: "3-5m at 50°F." }
    }
  },
  {
    id: 'h_delay_caffeine',
    title: 'Delay Caffeine',
    description: 'Wait 90 minutes before first coffee.',
    category: 'body',
    system_tags: ['adenosine', 'huberman'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'morning' },
    visuals: { icon: 'Coffee', color: 'bg-amber-700' },
    lenses: {
      FORTITUDE: { why: "Prove you function without stimulants.", how: "Hydrate first. Wait for cortisol peak." },
      REASON: { why: "Prevents afternoon crash by clearing adenosine.", how: "Water + Electrolytes first." }
    }
  },
  {
    id: 'h_make_bed',
    title: 'Make The Bed',
    description: 'The first task of the day completed.',
    category: 'mind',
    system_tags: ['momentum', 'order'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'morning' },
    visuals: { icon: 'CheckCircle', color: 'bg-emerald-600' },
    lenses: {
      FORTITUDE: { why: "Create order from chaos.", how: "Military corners. Do it right." },
      REASON: { why: "Psychological momentum for the day.", how: "Takes 60 seconds." }
    }
  },
  {
    id: 'h_meditation',
    title: 'Meditation',
    description: '10-20 minutes of silence or focus.',
    category: 'spirit',
    system_tags: ['mindfulness', 'cortisol'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'morning' },
    visuals: { icon: 'Wind', color: 'bg-sky-400' },
    lenses: {
      FORTITUDE: { why: "Control the monkey mind.", how: "Sit still. Focus on breath." },
      REASON: { why: "Increases grey matter density.", how: "Use Sam Harris or unguided." }
    }
  },
  {
    id: 'h_breathwork',
    title: 'Wim Hof Breathing',
    description: 'Hypoxic training or box breathing.',
    category: 'spirit',
    system_tags: ['co2-tolerance', 'calm'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 3, time_of_day: 'morning' },
    visuals: { icon: 'Wind', color: 'bg-blue-300' },
    lenses: {
      FORTITUDE: { why: "Control your physiology.", how: "30 rounds. Hold breath." },
      REASON: { why: "Alkalizes blood temporarily.", how: "Follow the protocol." }
    }
  },
  {
    id: 'h_gratitude',
    title: 'Gratitude Log',
    description: 'Write down 3 wins or thanks.',
    category: 'spirit',
    system_tags: ['psychology', 'happiness'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'morning' },
    visuals: { icon: 'Heart', color: 'bg-pink-500' },
    lenses: {
      FORTITUDE: { why: "Perspective is tactical.", how: "Don't be cynical." },
      REASON: { why: "Rewires brain for positivity.", how: "Be specific." }
    }
  },
  {
    id: 'h_read_scripture',
    title: 'Read Scripture/Stoics',
    description: 'Ancient wisdom input.',
    category: 'spirit',
    system_tags: ['wisdom', 'faith'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'morning' },
    visuals: { icon: 'BookOpen', color: 'bg-yellow-600' },
    lenses: {
      FORTITUDE: { why: "Stand on the shoulders of giants.", how: "Bible, Marcus Aurelius, or Seneca." },
      REASON: { why: "Grounds moral framework.", how: "1 chapter daily." }
    }
  },

  // === 2. PHYSICAL DOMINION (THE ENGINE) ===
  {
    id: 'h_zone_2',
    title: 'Zone 2 Cardio',
    description: '45-60 minutes at nasal-breathing pace.',
    category: 'body',
    system_tags: ['mitochondria', 'attia'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 4, time_of_day: 'any' },
    visuals: { icon: 'Activity', color: 'bg-emerald-500' },
    lenses: {
      FORTITUDE: { why: "Build the engine.", how: "Nasal breathing only. Sustain discomfort." },
      REASON: { why: "Optimizes mitochondrial efficiency.", how: "Keep HR at 70% max." }
    }
  },
  {
    id: 'h_lift_heavy',
    title: 'Heavy Resistance',
    description: 'Compound movements near failure.',
    category: 'body',
    system_tags: ['strength', 'hormonal'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 4, time_of_day: 'afternoon' },
    visuals: { icon: 'Dumbbell', color: 'bg-stone-500' },
    lenses: {
      FORTITUDE: { why: "Iron sharpens iron.", how: "Progressive overload. Log every rep." },
      REASON: { why: "Increases bone density and testosterone.", how: "Squat, Deadlift, Press." }
    }
  },
  {
    id: 'h_ruck',
    title: 'Rucking',
    description: 'Weighted walking with 30lb+ pack.',
    category: 'body',
    system_tags: ['endurance', 'durability'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 2, time_of_day: 'any' },
    visuals: { icon: 'Mountain', color: 'bg-green-800' },
    lenses: {
      FORTITUDE: { why: "Embrace the suck.", how: "Put on the pack. Walk until it hurts." },
      REASON: { why: "Builds work capacity without joint impact.", how: "30-50lbs for 3 miles." }
    }
  },
  {
    id: 'h_sprint',
    title: 'VO2 Max Sprints',
    description: 'Max effort intervals (HIIT).',
    category: 'body',
    system_tags: ['vo2max', 'attia'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 1, time_of_day: 'any' },
    visuals: { icon: 'Wind', color: 'bg-red-500' },
    lenses: {
      FORTITUDE: { why: "Taste blood.", how: "4x4 protocol or hill sprints." },
      REASON: { why: "VO2 Max is the highest correlate to longevity.", how: "Reach max heart rate." }
    }
  },
  {
    id: 'h_mobility',
    title: 'Mobility / Yoga',
    description: '15 mins of joint maintenance.',
    category: 'body',
    system_tags: ['recovery', 'injury-prevention'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 3, time_of_day: 'evening' },
    visuals: { icon: 'Smile', color: 'bg-teal-500' },
    lenses: {
      FORTITUDE: { why: "Maintenance prevents breakdown.", how: "Focus on hips and spine." },
      REASON: { why: "Preserves range of motion.", how: "Hold stretches 2 mins." }
    }
  },
  {
    id: 'h_sauna',
    title: 'Sauna / Heat',
    description: '20 minutes at >180°F.',
    category: 'body',
    system_tags: ['heat-shock', 'growth-hormone'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 4, time_of_day: 'evening' },
    visuals: { icon: 'Flame', color: 'bg-orange-600' },
    lenses: {
      FORTITUDE: { why: "Sit in the fire.", how: "Stay until you want to leave, then stay 2 mins more." },
      REASON: { why: "Releases Heat Shock Proteins.", how: "20m session." }
    }
  },
  {
    id: 'h_grip_strength',
    title: 'Grip Training',
    description: 'Dead hangs or farmers carry.',
    category: 'body',
    system_tags: ['longevity', 'strength'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 3, time_of_day: 'afternoon' },
    visuals: { icon: 'Hand', color: 'bg-stone-700' },
    lenses: {
      FORTITUDE: { why: "Never let go.", how: "Hang for max time." },
      REASON: { why: "Strong grip correlates to all-cause mortality reduction.", how: "Use heavy carry." }
    }
  },
  {
    id: 'h_neck_train',
    title: 'Neck Training',
    description: 'Flexion/Extension resistance.',
    category: 'body',
    system_tags: ['durability', 'fight'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 2, time_of_day: 'afternoon' },
    visuals: { icon: 'Shield', color: 'bg-stone-400' },
    lenses: {
      FORTITUDE: { why: "Protect the computer.", how: "Iron neck or plate curls." },
      REASON: { why: "Reduces concussion risk.", how: "Slow controlled reps." }
    }
  },
  {
    id: 'h_stretching',
    title: 'Deep Stretching',
    description: 'Long hold static stretching.',
    category: 'body',
    system_tags: ['recovery', 'calm'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 3, time_of_day: 'evening' },
    visuals: { icon: 'Activity', color: 'bg-indigo-400' },
    lenses: {
      FORTITUDE: { why: "Patience in tension.", how: "Hold for 2-3 mins." },
      REASON: { why: "Fascial release.", how: "Focus on hamstrings/hips." }
    }
  },
  {
    id: 'h_10k_steps',
    title: '10,000 Steps',
    description: 'Non-exercise activity thermogenesis.',
    category: 'body',
    system_tags: ['neat', 'metabolism'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'any' },
    visuals: { icon: 'Footprints', color: 'bg-green-400' },
    lenses: {
      FORTITUDE: { why: "Keep moving.", how: "Take the stairs. Walk while calling." },
      REASON: { why: "Base level metabolic health.", how: "Track via phone/watch." }
    }
  },

  // === 3. NUTRITIONAL & BIO-HACKING (THE FUEL) ===
  {
    id: 'h_no_sugar',
    title: 'Zero Processed Sugar',
    description: 'Strict elimination of added glycemic spikes.',
    category: 'body',
    system_tags: ['insulin', 'inflammation'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'any' },
    visuals: { icon: 'Ban', color: 'bg-red-600' },
    lenses: {
      FORTITUDE: { why: "You are not a slave to impulse.", how: "Read labels. Reject poison." },
      REASON: { why: "Prevents metabolic syndrome.", how: "Stick to whole foods." }
    }
  },
  {
    id: 'h_no_alcohol',
    title: 'Zero Alcohol',
    description: 'No ethanol consumption.',
    category: 'body',
    system_tags: ['liver', 'sleep'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'any' },
    visuals: { icon: 'Ban', color: 'bg-red-800' },
    lenses: {
      FORTITUDE: { why: "Reality is enough.", how: "Drink water or soda water." },
      REASON: { why: "Alcohol is a neurotoxin that destroys sleep.", how: "Total abstinence." }
    }
  },
  {
    id: 'h_fasting',
    title: 'Intermittent Fast',
    description: '16+ hour window of zero calories.',
    category: 'body',
    system_tags: ['autophagy', 'discipline'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 5, time_of_day: 'morning' },
    visuals: { icon: 'Utensils', color: 'bg-yellow-500' },
    lenses: {
      FORTITUDE: { why: "Hunger is not an emergency.", how: "Skip breakfast. Black coffee only." },
      REASON: { why: "Activates autophagy (cell cleaning).", how: "16:8 or 18:6 window." }
    }
  },
  {
    id: 'h_protein',
    title: 'Protein Target',
    description: '1g of protein per lb of bodyweight.',
    category: 'body',
    system_tags: ['muscle', 'satiety'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'any' },
    visuals: { icon: 'Egg', color: 'bg-red-700' },
    lenses: {
      FORTITUDE: { why: "Feed the muscle.", how: "Prioritize meat and eggs." },
      REASON: { why: "Required for muscle synthesis.", how: "Track via macro app." }
    }
  },
  {
    id: 'h_creatine',
    title: 'Creatine 5g',
    description: 'Daily cognitive and physical fuel.',
    category: 'body',
    system_tags: ['supplements', 'brain'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'morning' },
    visuals: { icon: 'Zap', color: 'bg-white' },
    lenses: {
      FORTITUDE: { why: "Consistency is key.", how: "Mix with morning water." },
      REASON: { why: "Increases ATP production.", how: "5g daily, no cycling needed." }
    }
  },
  {
    id: 'h_fish_oil',
    title: 'Omega-3s',
    description: 'High EPA/DHA intake.',
    category: 'body',
    system_tags: ['supplements', 'brain'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'morning' },
    visuals: { icon: 'Fish', color: 'bg-orange-400' },
    lenses: {
      FORTITUDE: { why: "Oil the machine.", how: "Take with fat." },
      REASON: { why: "Reduces systemic inflammation.", how: "2-3g EPA/DHA daily." }
    }
  },
  {
    id: 'h_vitamin_d',
    title: 'Vitamin D3/K2',
    description: 'Hormonal precursor support.',
    category: 'body',
    system_tags: ['supplements', 'hormones'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'morning' },
    visuals: { icon: 'Sun', color: 'bg-yellow-400' },
    lenses: {
      FORTITUDE: { why: "Winter proof.", how: "Take in AM." },
      REASON: { why: "Critical for immune function and testosterone.", how: "5000 IU daily." }
    }
  },
  {
    id: 'h_magnesium',
    title: 'Magnesium',
    description: 'Supplement for nervous system regulation.',
    category: 'body',
    system_tags: ['supplements', 'sleep'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'evening' },
    visuals: { icon: 'Moon', color: 'bg-purple-500' },
    lenses: {
      FORTITUDE: { why: "Calm the storm.", how: "Take Threonate or Glycinate." },
      REASON: { why: "Relaxes muscles and brain.", how: "400mg before bed." }
    }
  },
  {
    id: 'h_raw_dairy',
    title: 'Raw/Fermented Dairy',
    description: 'Nutrient dense fats (Kefir/Raw Milk).',
    category: 'body',
    system_tags: ['gut', 'testosterone'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 5, time_of_day: 'any' },
    visuals: { icon: 'Milk', color: 'bg-stone-100' },
    lenses: {
      FORTITUDE: { why: "Eat like an ancestor.", how: "Glass of kefir." },
      REASON: { why: "Probiotics for gut microbiome.", how: "Source high quality." }
    }
  },
  {
    id: 'h_steak_eggs',
    title: 'Steak & Eggs',
    description: 'The power meal.',
    category: 'body',
    system_tags: ['carnivore', 'satiety'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 2, time_of_day: 'any' },
    visuals: { icon: 'Utensils', color: 'bg-red-900' },
    lenses: {
      FORTITUDE: { why: "Apex predator fuel.", how: "Red meat + yolks." },
      REASON: { why: "High bioavailability of nutrients.", how: "Grass fed if possible." }
    }
  },

  // === 4. COGNITIVE & BUSINESS (THE MISSION) ===
  {
    id: 'h_deep_work',
    title: 'Deep Work Block',
    description: '90 minutes uninterrupted creative output.',
    category: 'business',
    system_tags: ['flow', 'productivity'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 5, time_of_day: 'morning' },
    visuals: { icon: 'Brain', color: 'bg-violet-600' },
    lenses: {
      FORTITUDE: { why: "Distraction is poverty.", how: "Phone away. No internet." },
      REASON: { why: "Maximizes cognitive load.", how: "90 minute sprint." }
    }
  },
  {
    id: 'h_plan_tomorrow',
    title: 'Plan Tomorrow',
    description: 'Define the mission before sleep.',
    category: 'business',
    system_tags: ['organization', 'anxiety-reduction'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'evening' },
    visuals: { icon: 'Target', color: 'bg-slate-500' },
    lenses: {
      FORTITUDE: { why: "Wake up with a purpose.", how: "Write down top 3 priorities." },
      REASON: { why: "Reduces decision fatigue.", how: "Check calendar and todos." }
    }
  },
  {
    id: 'h_read_30',
    title: 'Read 30 Mins',
    description: 'Non-fiction, tactical, or philosophical input.',
    category: 'mind',
    system_tags: ['learning', 'stoicism'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'evening' },
    visuals: { icon: 'BookOpen', color: 'bg-emerald-600' },
    lenses: {
      FORTITUDE: { why: "Sharpen the mind.", how: "Paper books only." },
      REASON: { why: "Continuous education.", how: "Take notes." }
    }
  },
  {
    id: 'h_writing',
    title: 'Tactical Writing',
    description: 'Journaling or content creation.',
    category: 'mind',
    system_tags: ['clarity', 'legacy'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 3, time_of_day: 'morning' },
    visuals: { icon: 'PenTool', color: 'bg-blue-500' },
    lenses: {
      FORTITUDE: { why: "Clear thoughts, clear actions.", how: "Brain dump or structured essay." },
      REASON: { why: "Improves articulation.", how: "500 words minimum." }
    }
  },
  {
    id: 'h_inbox_zero',
    title: 'Inbox Zero',
    description: 'Clear all comms channels.',
    category: 'business',
    system_tags: ['organization', 'clarity'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 5, time_of_day: 'afternoon' },
    visuals: { icon: 'Briefcase', color: 'bg-blue-700' },
    lenses: {
      FORTITUDE: { why: "No loose ends.", how: "Delete, Delegate, Do, Defer." },
      REASON: { why: "Reduces cognitive drag.", how: "Touch each email once." }
    }
  },
  {
    id: 'h_learn_skill',
    title: 'Skill Acquisition',
    description: 'Practice a new hard skill.',
    category: 'mind',
    system_tags: ['neuroplasticity', 'growth'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 3, time_of_day: 'any' },
    visuals: { icon: 'Lightbulb', color: 'bg-yellow-600' },
    lenses: {
      FORTITUDE: { why: "Always be a white belt.", how: "Coding, Language, Combat." },
      REASON: { why: "Increases neuroplasticity.", how: "30 mins focused practice." }
    }
  },
  {
    id: 'h_chess',
    title: 'Chess / Strategy',
    description: 'Tactical game play.',
    category: 'mind',
    system_tags: ['strategy', 'iq'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 2, time_of_day: 'any' },
    visuals: { icon: 'Swords', color: 'bg-stone-600' },
    lenses: {
      FORTITUDE: { why: "Think 3 moves ahead.", how: "Play 1 rapid game." },
      REASON: { why: "Pattern recognition training.", how: "Analyze losses." }
    }
  },
  {
    id: 'h_outreach',
    title: 'Outreach / Sales',
    description: 'Send 5 new messages/calls.',
    category: 'business',
    system_tags: ['growth', 'sales'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 5, time_of_day: 'morning' },
    visuals: { icon: 'Network', color: 'bg-indigo-600' },
    lenses: {
      FORTITUDE: { why: "Hunt your food.", how: "Cold call or DM." },
      REASON: { why: "Pipeline equals lifeline.", how: "Track conversion." }
    }
  },

  // === 5. ASSET DEFENSE (THE VAULT) ===
  {
    id: 'h_financial_review',
    title: 'Asset Review',
    description: 'Check markets, P&L, and cash flow.',
    category: 'asset',
    system_tags: ['wealth', 'audit'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 1, time_of_day: 'morning' },
    visuals: { icon: 'DollarSign', color: 'bg-green-600' },
    lenses: {
      FORTITUDE: { why: "Face the numbers.", how: "Open all accounts. Update ledger." },
      REASON: { why: "What gets measured gets managed.", how: "Track net worth." }
    }
  },
  {
    id: 'h_no_spend',
    title: 'No Spend Day',
    description: 'Zero discretionary spending.',
    category: 'asset',
    system_tags: ['frugality', 'discipline'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 2, time_of_day: 'any' },
    visuals: { icon: 'Lock', color: 'bg-gray-500' },
    lenses: {
      FORTITUDE: { why: "You don't need it.", how: "Cook at home. No online shopping." },
      REASON: { why: "Increases savings rate.", how: "Deploy capital to assets instead." }
    }
  },
  {
    id: 'h_audit_expenses',
    title: 'Audit Expenses',
    description: 'Review last months charges.',
    category: 'asset',
    system_tags: ['finance', 'leaks'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 1, time_of_day: 'any' },
    visuals: { icon: 'Calculator', color: 'bg-red-400' },
    lenses: {
      FORTITUDE: { why: "Plug the leaks.", how: "Check credit card statement." },
      REASON: { why: "Recurring subscriptions kill wealth.", how: "Cancel unused." }
    }
  },
  {
    id: 'h_crypto_buy',
    title: 'Bitcoin Buy',
    description: 'DCA into hard money.',
    category: 'asset',
    system_tags: ['crypto', 'sovereignty'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 1, time_of_day: 'any' },
    visuals: { icon: 'Gem', color: 'bg-orange-500' },
    lenses: {
      FORTITUDE: { why: "Opt out of the system.", how: "Auto-buy." },
      REASON: { why: "Asymmetric upside.", how: "Self-custody." }
    }
  },
  {
    id: 'h_stock_buy',
    title: 'Index Fund Buy',
    description: 'VTI/VOO purchase.',
    category: 'asset',
    system_tags: ['wealth', 'compounding'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 1, time_of_day: 'any' },
    visuals: { icon: 'TrendingUp', color: 'bg-green-700' },
    lenses: {
      FORTITUDE: { why: "Own the world.", how: "Automate it." },
      REASON: { why: "Compound interest is the 8th wonder.", how: "Set and forget." }
    }
  },

  // === 6. SLEEP & RECOVERY (THE REST) ===
  {
    id: 'h_sleep_8h',
    title: 'Sleep 8 Hours',
    description: 'Time in bed adequate for 5 full cycles.',
    category: 'body',
    system_tags: ['recovery', 'sleep'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'evening' },
    visuals: { icon: 'BedDouble', color: 'bg-indigo-500' },
    lenses: {
      FORTITUDE: { why: "Recovery is a weapon.", how: "Protect the sleep window." },
      REASON: { why: "Glymphatic system cleans brain toxins.", how: "Cool room (65°F)." }
    }
  },
  {
    id: 'h_digital_detox',
    title: 'Digital Sunset',
    description: 'No screens 1 hour before bed.',
    category: 'mind',
    system_tags: ['sleep', 'dopamine'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'evening' },
    visuals: { icon: 'Smartphone', color: 'bg-pink-600' },
    lenses: {
      FORTITUDE: { why: "Reclaim your attention.", how: "Phone in kitchen. Read a book." },
      REASON: { why: "Blue light blocks melatonin.", how: "Use red light or candles." }
    }
  },
  {
    id: 'h_mouth_tape',
    title: 'Mouth Tape',
    description: 'Forced nasal breathing during sleep.',
    category: 'body',
    system_tags: ['sleep', 'oxygen'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'evening' },
    visuals: { icon: 'Smile', color: 'bg-teal-700' },
    lenses: {
      FORTITUDE: { why: "Shut your mouth.", how: "Micropore tape across lips." },
      REASON: { why: "Prevents snoring and apnea.", how: "Increases nitric oxide." }
    }
  },
  {
    id: 'h_dark_room',
    title: 'Blackout Room',
    description: 'Total darkness sleep environment.',
    category: 'body',
    system_tags: ['sleep', 'circadian'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'evening' },
    visuals: { icon: 'Moon', color: 'bg-black' },
    lenses: {
      FORTITUDE: { why: "Cave dweller mode.", how: "Tape over LEDs. Blackout curtains." },
      REASON: { why: "Light pollution disrupts deep sleep.", how: "Use eye mask if needed." }
    }
  },

  // === 7. STOICISM & MINDSET (THE SOFTWARE) ===
  {
    id: 'h_negative_viz',
    title: 'Negative Visualization',
    description: 'Premeditatio Malorum.',
    category: 'mind',
    system_tags: ['stoicism', 'resilience'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 3, time_of_day: 'morning' },
    visuals: { icon: 'Skull', color: 'bg-stone-800' },
    lenses: {
      FORTITUDE: { why: "Prepare for the blow.", how: "Imagine losing everything." },
      REASON: { why: "Reduces anxiety by facing worst case.", how: "Spend 2 mins visualizing loss." }
    }
  },
  {
    id: 'h_memento_mori',
    title: 'Memento Mori',
    description: 'Remember you will die.',
    category: 'mind',
    system_tags: ['stoicism', 'urgency'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 1, time_of_day: 'any' },
    visuals: { icon: 'Hourglass', color: 'bg-stone-500' },
    lenses: {
      FORTITUDE: { why: "Time is finite.", how: "Look at your life countdown." },
      REASON: { why: "Creates urgency and clarity.", how: "Don't waste the day." }
    }
  },
  {
    id: 'h_journal_review',
    title: 'Weekly Review',
    description: 'Sunday strategic analysis.',
    category: 'mind',
    system_tags: ['strategy', 'planning'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 1, time_of_day: 'any' },
    visuals: { icon: 'BookOpen', color: 'bg-blue-800' },
    lenses: {
      FORTITUDE: { why: "Course correct.", how: "Review goals vs actuals." },
      REASON: { why: "Feedback loops improve performance.", how: "Plan next week." }
    }
  },
  {
    id: 'h_social_detox',
    title: 'No Social Media',
    description: 'Complete abstention from feeds.',
    category: 'mind',
    system_tags: ['dopamine', 'focus'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 1, time_of_day: 'any' },
    visuals: { icon: 'Ban', color: 'bg-red-500' },
    lenses: {
      FORTITUDE: { why: "Stop scrolling, start living.", how: "Delete apps for 24h." },
      REASON: { why: "Resets dopamine baseline.", how: "Block via DNS." }
    }
  },

  // === 8. TRIBE & RELATIONSHIP (THE NETWORK) ===
  {
    id: 'h_call_parents',
    title: 'Call Parents',
    description: 'Connect with lineage.',
    category: 'spirit',
    system_tags: ['family', 'duty'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 1, time_of_day: 'any' },
    visuals: { icon: 'Users', color: 'bg-teal-600' },
    lenses: {
      FORTITUDE: { why: "Honor thy father and mother.", how: "Call, don't text." },
      REASON: { why: "Regret minimization.", how: "Check in on health." }
    }
  },
  {
    id: 'h_date_night',
    title: 'Date Night',
    description: 'Focused partner time.',
    category: 'spirit',
    system_tags: ['relationship', 'love'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 1, time_of_day: 'evening' },
    visuals: { icon: 'Heart', color: 'bg-pink-600' },
    lenses: {
      FORTITUDE: { why: "Lead the relationship.", how: "Plan the logistics." },
      REASON: { why: "Relationships require investment.", how: "No phones." }
    }
  },
  {
    id: 'h_play_kids',
    title: 'Play w/ Kids',
    description: 'Undistracted floor time.',
    category: 'spirit',
    system_tags: ['family', 'legacy'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'evening' },
    visuals: { icon: 'Smile', color: 'bg-yellow-400' },
    lenses: {
      FORTITUDE: { why: "Be present.", how: "Phone in other room." },
      REASON: { why: "They grow up fast.", how: "Engage in their world." }
    }
  },

  // === 9. TACTICAL & SURVIVAL (THE GEAR) ===
  {
    id: 'h_gear_prep',
    title: 'Gear Prep',
    description: 'Lay out clothes/kit for tomorrow.',
    category: 'body',
    system_tags: ['preparation', 'friction'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'evening' },
    visuals: { icon: 'Briefcase', color: 'bg-slate-700' },
    lenses: {
      FORTITUDE: { why: "Remove friction.", how: "Gym bag packed at door." },
      REASON: { why: "Reduces AM decision fatigue.", how: "Check weather first." }
    }
  },
  {
    id: 'h_water_filter',
    title: 'Drink Clean Water',
    description: 'Filtered/Spring water only.',
    category: 'body',
    system_tags: ['health', 'toxins'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'any' },
    visuals: { icon: 'Droplets', color: 'bg-cyan-600' },
    lenses: {
      FORTITUDE: { why: "Don't drink poison.", how: "Reverse Osmosis + Minerals." },
      REASON: { why: "Tap water contains endocrine disruptors.", how: "Avoid plastic bottles." }
    }
  },
  {
    id: 'h_grounding',
    title: 'Grounding',
    description: 'Barefoot on earth.',
    category: 'body',
    system_tags: ['inflammation', 'nature'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 3, time_of_day: 'morning' },
    visuals: { icon: 'Sprout', color: 'bg-green-600' },
    lenses: {
      FORTITUDE: { why: "Connect to the source.", how: "Feet on grass/dirt." },
      REASON: { why: "Reduces inflammation via electron exchange.", how: "10 mins daily." }
    }
  },
  {
    id: 'h_nature_walk',
    title: 'Nature Walk',
    description: 'Unplugged walking in trees.',
    category: 'mind',
    system_tags: ['calm', 'optic-flow'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 2, time_of_day: 'any' },
    visuals: { icon: 'Leaf', color: 'bg-green-500' },
    lenses: {
      FORTITUDE: { why: "Decompress.", how: "Leave phone in car." },
      REASON: { why: "Optic flow reduces anxiety.", how: "Look at horizon." }
    }
  },
  {
    id: 'h_cooking',
    title: 'Cook Meal',
    description: 'Prepare food from scratch.',
    category: 'body',
    system_tags: ['nutrition', 'skill'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'evening' },
    visuals: { icon: 'Flame', color: 'bg-orange-500' },
    lenses: {
      FORTITUDE: { why: "Control inputs.", how: "No seed oils." },
      REASON: { why: "Restaurant food is lower quality.", how: "Master the grill." }
    }
  }
];

// --- 4. THE PROTOCOL STACKS (COMPOUNDS) ---
export const PROTOCOL_STACKS = [
  // 1. NEURAL OPTIMIZATION
  {
    id: 'stack_huberman',
    title: 'Huberman Neural Stack',
    description: 'Optimizing the brain through biological triggers.',
    habit_ids: ['h_morning_sun', 'h_delay_caffeine', 'h_cold_plunge', 'h_sleep_8h', 'h_zone_2', 'h_fish_oil']
  },
  // 2. DISCIPLINE
  {
    id: 'stack_jocko',
    title: 'Jocko Discipline',
    description: 'Military-grade standard for daily execution.',
    habit_ids: ['h_early_rise', 'h_lift_heavy', 'h_steak_eggs', 'h_plan_tomorrow', 'h_gear_prep']
  },
  // 3. LONGEVITY
  {
    id: 'stack_attia',
    title: 'Attia Centenarian',
    description: 'Training today for the marginal decade of your life.',
    habit_ids: ['h_zone_2', 'h_sprint', 'h_lift_heavy', 'h_protein', 'h_mobility', 'h_grip_strength']
  },
  // 4. RESET
  {
    id: 'stack_dopamine',
    title: 'Dopamine Detox',
    description: 'Reset reward pathways.',
    habit_ids: ['h_no_sugar', 'h_digital_detox', 'h_cold_plunge', 'h_deep_work', 'h_social_detox']
  },
  // 5. FOCUS
  {
    id: 'stack_monk',
    title: 'Monk Mode',
    description: 'Total isolation for maximum output.',
    habit_ids: ['h_meditation', 'h_deep_work', 'h_writing', 'h_fasting', 'h_no_spend', 'h_no_alcohol']
  },
  // 6. MINDSET
  {
    id: 'stack_stoic',
    title: 'The Stoic',
    description: 'Mental fortress construction.',
    habit_ids: ['h_morning_sun', 'h_cold_plunge', 'h_negative_viz', 'h_read_scripture', 'h_memento_mori']
  },
  // 7. BUSINESS (The Missing Link)
  {
    id: 'stack_executive',
    title: 'The Executive',
    description: 'High-leverage output and pipeline management.',
    habit_ids: ['h_deep_work', 'h_inbox_zero', 'h_outreach', 'h_plan_tomorrow', 'h_financial_review']
  },
  // 8. ENDURANCE (The Missing Link)
  {
    id: 'stack_savage',
    title: 'The Savage',
    description: 'Callus the mind through physical suffering.',
    habit_ids: ['h_early_rise', 'h_ruck', 'h_sprint', 'h_cold_plunge', 'h_fasting']
  },
  // 9. QUANTIFIED SELF (The Missing Link)
  {
    id: 'stack_biohacker',
    title: 'The Biohacker',
    description: 'Data-driven optimization of the machine.',
    habit_ids: ['h_sleep_8h', 'h_magnesium', 'h_vitamin_d', 'h_fish_oil', 'h_creatine', 'h_mouth_tape']
  }
];
