// PASTE THE FULL 60-ITEM LIST HERE
export const MASTER_LIBRARY = [
  // === MORNING & BIOLOGY (1-10) ===
  {
    id: 'h_wake_0430',
    title: '04:30 Wake Up',
    description: 'Beat the enemy to the battlefield.',
    category: 'body',
    system_tags: ['discipline', 'jocko'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'morning' },
    visuals: { icon: 'Clock', color: 'bg-slate-600' },
    lenses: { FORTITUDE: { why: "The enemy sleeps.", how: "No snooze." }, REASON: { why: "Focus hours.", how: "Go to bed early." } }
  },
  {
    id: 'h_morning_sun',
    title: 'Morning Sunlight',
    description: 'Anchor circadian clock.',
    category: 'body',
    system_tags: ['circadian', 'huberman'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'morning' },
    visuals: { icon: 'Sun', color: 'bg-amber-500' },
    lenses: { FORTITUDE: { why: "Discipline.", how: "Outside immediately." }, REASON: { why: "Cortisol peak.", how: "10-20 mins." } }
  },
  {
    id: 'h_salt_water',
    title: 'Morning Salt',
    description: '30oz Water + Electrolytes.',
    category: 'body',
    system_tags: ['hydration'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'morning' },
    visuals: { icon: 'Droplets', color: 'bg-blue-400' },
    lenses: { FORTITUDE: { why: "Prime machine.", how: "Drink first." }, REASON: { why: "Rehydration.", how: "LMNT/Salt." } }
  },
  {
    id: 'h_cold_plunge',
    title: 'Cold Plunge',
    description: 'Systemic inflammation reduction.',
    category: 'body',
    system_tags: ['recovery'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'morning' },
    visuals: { icon: 'Thermometer', color: 'bg-cyan-500' },
    lenses: { FORTITUDE: { why: "Kill comfort.", how: "Submerge." }, REASON: { why: "Dopamine.", how: "3 mins @ 50F." } }
  },
  {
    id: 'h_delay_caffeine',
    title: 'Delay Caffeine',
    description: 'Wait 90 mins before coffee.',
    category: 'body',
    system_tags: ['adenosine'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'morning' },
    visuals: { icon: 'Coffee', color: 'bg-amber-700' },
    lenses: { FORTITUDE: { why: "No crutches.", how: "Hydrate first." }, REASON: { why: "Adenosine clearance.", how: "Wait 90m." } }
  },
  {
    id: 'h_make_bed',
    title: 'Make The Bed',
    description: 'First task completed.',
    category: 'mind',
    system_tags: ['order'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'morning' },
    visuals: { icon: 'CheckCircle', color: 'bg-emerald-600' },
    lenses: { FORTITUDE: { why: "Order.", how: "Military corners." }, REASON: { why: "Momentum.", how: "60 seconds." } }
  },
  {
    id: 'h_meditation',
    title: 'Meditation',
    description: 'Mindfulness practice.',
    category: 'spirit',
    system_tags: ['mindfulness'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'morning' },
    visuals: { icon: 'Wind', color: 'bg-sky-400' },
    lenses: { FORTITUDE: { why: "Control mind.", how: "Silence." }, REASON: { why: "Grey matter.", how: "10 mins." } }
  },
  {
    id: 'h_breathwork',
    title: 'Wim Hof Breath',
    description: 'Hypoxic training.',
    category: 'body',
    system_tags: ['breath'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 3, time_of_day: 'morning' },
    visuals: { icon: 'Wind', color: 'bg-blue-300' },
    lenses: { FORTITUDE: { why: "Physiology control.", how: "30 rounds." }, REASON: { why: "Alkalinity.", how: "Hold breath." } }
  },
  {
    id: 'h_gratitude',
    title: 'Gratitude Log',
    description: 'Positive reinforcement.',
    category: 'spirit',
    system_tags: ['mindset'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'morning' },
    visuals: { icon: 'Heart', color: 'bg-pink-500' },
    lenses: { FORTITUDE: { why: "Perspective.", how: "Write 3." }, REASON: { why: "Rewiring.", how: "Be specific." } }
  },
  {
    id: 'h_scripture',
    title: 'Read Scripture',
    description: 'Ancient wisdom.',
    category: 'spirit',
    system_tags: ['wisdom'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'morning' },
    visuals: { icon: 'BookOpen', color: 'bg-yellow-600' },
    lenses: { FORTITUDE: { why: "Giants' shoulders.", how: "1 Chapter." }, REASON: { why: "Moral grounding.", how: "Reflect." } }
  },

  // --- 2. PHYSICAL TRAINING (10) ---
  {
    id: 'h_zone_2',
    title: 'Zone 2 Cardio',
    description: 'Base aerobic capacity.',
    category: 'body',
    system_tags: ['endurance'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 4, time_of_day: 'any' },
    visuals: { icon: 'Activity', color: 'bg-emerald-500' },
    lenses: { FORTITUDE: { why: "Engine building.", how: "Nasal breath." }, REASON: { why: "Mitochondria.", how: "45 mins." } }
  },
  {
    id: 'h_heavy_lift',
    title: 'Heavy Lift',
    description: 'Compound resistance.',
    category: 'body',
    system_tags: ['strength'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 4, time_of_day: 'afternoon' },
    visuals: { icon: 'Dumbbell', color: 'bg-stone-500' },
    lenses: { FORTITUDE: { why: "Iron sharpens.", how: "Log reps." }, REASON: { why: "Bone density.", how: "Squat/Dead." } }
  },
  {
    id: 'h_rucking',
    title: 'Rucking',
    description: 'Weighted walking.',
    category: 'body',
    system_tags: ['endurance'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 2, time_of_day: 'any' },
    visuals: { icon: 'Mountain', color: 'bg-green-800' },
    lenses: { FORTITUDE: { why: "Embrace suck.", how: "30lb pack." }, REASON: { why: "Work capacity.", how: "3 miles." } }
  },
  {
    id: 'h_sprint',
    title: 'VO2 Max Sprint',
    description: 'HIIT intervals.',
    category: 'body',
    system_tags: ['vo2max'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 1, time_of_day: 'any' },
    visuals: { icon: 'Wind', color: 'bg-red-500' },
    lenses: { FORTITUDE: { why: "Taste blood.", how: "Max effort." }, REASON: { why: "Longevity.", how: "4x4 mins." } }
  },
  {
    id: 'h_mobility',
    title: 'Mobility',
    description: 'Joint maintenance.',
    category: 'body',
    system_tags: ['recovery'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 3, time_of_day: 'evening' },
    visuals: { icon: 'Smile', color: 'bg-teal-500' },
    lenses: { FORTITUDE: { why: "Maintenance.", how: "15 mins." }, REASON: { why: "ROM.", how: "Hips/Spine." } }
  },
  {
    id: 'h_grip',
    title: 'Grip Training',
    description: 'Hang/Carry.',
    category: 'body',
    system_tags: ['strength'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 3, time_of_day: 'any' },
    visuals: { icon: 'Target', color: 'bg-stone-700' },
    lenses: { FORTITUDE: { why: "Never let go.", how: "Dead hang." }, REASON: { why: "Mortality link.", how: "Farmers walk." } }
  },
  {
    id: 'h_neck',
    title: 'Neck Training',
    description: 'Protective chassis.',
    category: 'body',
    system_tags: ['durability'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 2, time_of_day: 'any' },
    visuals: { icon: 'Shield', color: 'bg-stone-400' },
    lenses: { FORTITUDE: { why: "Protection.", how: "Resistance." }, REASON: { why: "Concussion prev.", how: "Iron Neck." } }
  },
  {
    id: 'h_sport',
    title: 'Sport / Play',
    description: 'Dynamic movement.',
    category: 'body',
    system_tags: ['agility'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 1, time_of_day: 'any' },
    visuals: { icon: 'Trophy', color: 'bg-yellow-500' },
    lenses: { FORTITUDE: { why: "Test machine.", how: "Compete." }, REASON: { why: "Neuroplasticity.", how: "Pickleball/BJJ." } }
  },
  {
    id: 'h_10k_steps',
    title: '10k Steps',
    description: 'Base movement.',
    category: 'body',
    system_tags: ['recovery'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'any' },
    visuals: { icon: 'Footprints', color: 'bg-green-400' },
    lenses: { FORTITUDE: { why: "Keep moving.", how: "Walk." }, REASON: { why: "Metabolism.", how: "Track steps." } }
  },
  {
    id: 'h_sauna',
    title: 'Sauna',
    description: 'Heat shock.',
    category: 'body',
    system_tags: ['recovery'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 4, time_of_day: 'evening' },
    visuals: { icon: 'Flame', color: 'bg-orange-600' },
    lenses: { FORTITUDE: { why: "In the fire.", how: "20 mins." }, REASON: { why: "Cardio benefit.", how: "190F." } }
  },

  // --- 3. NUTRITION (10) ---
  {
    id: 'h_fasting',
    title: 'Intermittent Fast',
    description: 'Feeding window.',
    category: 'body',
    system_tags: ['diet'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'morning' },
    visuals: { icon: 'Utensils', color: 'bg-yellow-500' },
    lenses: { FORTITUDE: { why: "Hunger is focus.", how: "Skip breakfast." }, REASON: { why: "Autophagy.", how: "16:8 window." } }
  },
  {
    id: 'h_protein',
    title: 'Protein Target',
    description: '1g per lb bodyweight.',
    category: 'body',
    system_tags: ['diet'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'any' },
    visuals: { icon: 'Egg', color: 'bg-red-700' },
    lenses: { FORTITUDE: { why: "Feed beast.", how: "Meat/Eggs." }, REASON: { why: "Synthesis.", how: "Track macros." } }
  },
  {
    id: 'h_no_sugar',
    title: 'No Sugar',
    description: 'Glycemic control.',
    category: 'body',
    system_tags: ['diet'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'any' },
    visuals: { icon: 'Ban', color: 'bg-red-600' },
    lenses: { FORTITUDE: { why: "Reject poison.", how: "Read labels." }, REASON: { why: "Metabolic.", how: "Zero added." } }
  },
  {
    id: 'h_no_alcohol',
    title: 'Zero Alcohol',
    description: 'Neurotoxin avoidance.',
    category: 'body',
    system_tags: ['health'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'any' },
    visuals: { icon: 'Ban', color: 'bg-red-800' },
    lenses: { FORTITUDE: { why: "Reality enough.", how: "Water." }, REASON: { why: "Sleep kill.", how: "Abstain." } }
  },
  {
    id: 'h_creatine',
    title: 'Creatine',
    description: '5g Monohydrate.',
    category: 'body',
    system_tags: ['supplements'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'morning' },
    visuals: { icon: 'Zap', color: 'bg-white' },
    lenses: { FORTITUDE: { why: "Power.", how: "5g daily." }, REASON: { why: "ATP.", how: "In water." } }
  },
  {
    id: 'h_magnesium',
    title: 'Magnesium',
    description: 'Nervous system.',
    category: 'body',
    system_tags: ['supplements'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'evening' },
    visuals: { icon: 'Zap', color: 'bg-purple-500' },
    lenses: { FORTITUDE: { why: "Calm.", how: "Glycinate." }, REASON: { why: "Relaxation.", how: "400mg." } }
  },
  {
    id: 'h_omega3',
    title: 'Omega-3',
    description: 'Brain health.',
    category: 'body',
    system_tags: ['supplements'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'morning' },
    visuals: { icon: 'Fish', color: 'bg-orange-400' },
    lenses: { FORTITUDE: { why: "Oil machine.", how: "Fish oil." }, REASON: { why: "Inflammation.", how: "2g EPA/DHA." } }
  },
  {
    id: 'h_acv',
    title: 'Apple Cider Vinegar',
    description: 'Glycemic control.',
    category: 'body',
    system_tags: ['diet'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'morning' },
    visuals: { icon: 'FlaskConical', color: 'bg-amber-300' },
    lenses: { FORTITUDE: { why: "Gut health.", how: "Shot." }, REASON: { why: "Insulin.", how: "Before meal." } }
  },
  {
    id: 'h_fiber',
    title: 'Fiber',
    description: 'Gut biome.',
    category: 'body',
    system_tags: ['diet'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'any' },
    visuals: { icon: 'Leaf', color: 'bg-green-400' },
    lenses: { FORTITUDE: { why: "Feed biome.", how: "Veggies." }, REASON: { why: "Digestion.", how: "Psyllium." } }
  },
  {
    id: 'h_cheat_meal',
    title: 'Cheat Meal',
    description: 'Metabolic reset.',
    category: 'body',
    system_tags: ['diet'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 1, time_of_day: 'any' },
    visuals: { icon: 'RefreshCw', color: 'bg-pink-500' },
    lenses: { FORTITUDE: { why: "Strategic.", how: "One meal." }, REASON: { why: "Leptin.", how: "Enjoy." } }
  },

  // --- 4. COGNITIVE & WORK (10) ---
  {
    id: 'h_deep_work',
    title: 'Deep Work',
    description: '90m Focus Block.',
    category: 'business',
    system_tags: ['productivity'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 5, time_of_day: 'morning' },
    visuals: { icon: 'Brain', color: 'bg-violet-600' },
    lenses: { FORTITUDE: { why: "No distraction.", how: "Phone away." }, REASON: { why: "Flow.", how: "90 mins." } }
  },
  {
    id: 'h_read',
    title: 'Read (Analog)',
    description: 'Paper book.',
    category: 'mind',
    system_tags: ['learning'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'evening' },
    visuals: { icon: 'BookOpen', color: 'bg-emerald-600' },
    lenses: { FORTITUDE: { why: "Sharpen.", how: "10 pages." }, REASON: { why: "Focus.", how: "No screens." } }
  },
  {
    id: 'h_writing',
    title: 'Writing',
    description: 'Structured thought.',
    category: 'mind',
    system_tags: ['clarity'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 3, time_of_day: 'morning' },
    visuals: { icon: 'PenTool', color: 'bg-blue-500' },
    lenses: { FORTITUDE: { why: "Clarity.", how: "Journal." }, REASON: { why: "Articulation.", how: "500 words." } }
  },
  {
    id: 'h_inbox_zero',
    title: 'Inbox Zero',
    description: 'Clear queues.',
    category: 'business',
    system_tags: ['organization'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 5, time_of_day: 'afternoon' },
    visuals: { icon: 'Briefcase', color: 'bg-blue-700' },
    lenses: { FORTITUDE: { why: "No loose ends.", how: "Triage." }, REASON: { why: "Mental load.", how: "Archive." } }
  },
  {
    id: 'h_plan_tomorrow',
    title: 'Plan Tomorrow',
    description: 'Pre-deployment.',
    category: 'business',
    system_tags: ['prep'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'evening' },
    visuals: { icon: 'Target', color: 'bg-slate-500' },
    lenses: { FORTITUDE: { why: "Win morning.", how: "Top 3." }, REASON: { why: "Decision fatigue.", how: "List it." } }
  },
  {
    id: 'h_learn_skill',
    title: 'Learn Skill',
    description: 'Neuroplasticity.',
    category: 'mind',
    system_tags: ['learning'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 3, time_of_day: 'any' },
    visuals: { icon: 'Lightbulb', color: 'bg-yellow-600' },
    lenses: { FORTITUDE: { why: "White belt.", how: "Practice." }, REASON: { why: "Growth.", how: "30 mins." } }
  },
  {
    id: 'h_chess',
    title: 'Chess',
    description: 'Strategy game.',
    category: 'mind',
    system_tags: ['strategy'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 2, time_of_day: 'any' },
    visuals: { icon: 'Swords', color: 'bg-stone-600' },
    lenses: { FORTITUDE: { why: "Think ahead.", how: "Play." }, REASON: { why: "Patterns.", how: "1 game." } }
  },
  {
    id: 'h_outreach',
    title: 'Outreach',
    description: 'Pipeline generation.',
    category: 'business',
    system_tags: ['growth'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 5, time_of_day: 'morning' },
    visuals: { icon: 'Network', color: 'bg-indigo-600' },
    lenses: { FORTITUDE: { why: "Hunt.", how: "5 calls." }, REASON: { why: "Pipeline.", how: "DM/Email." } }
  },
  {
    id: 'h_audit_spend',
    title: 'Audit Spend',
    description: 'Financial check.',
    category: 'asset',
    system_tags: ['wealth'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 1, time_of_day: 'any' },
    visuals: { icon: 'Calculator', color: 'bg-red-400' },
    lenses: { FORTITUDE: { why: "Plug leaks.", how: "Check bank." }, REASON: { why: "Wealth.", how: "Review." } }
  },
  {
    id: 'h_buy_bitcoin',
    title: 'Buy Bitcoin',
    description: 'DCA Hard Money.',
    category: 'asset',
    system_tags: ['wealth'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 1, time_of_day: 'any' },
    visuals: { icon: 'Gem', color: 'bg-orange-500' },
    lenses: { FORTITUDE: { why: "Opt out.", how: "Auto-buy." }, REASON: { why: "Asymmetry.", how: "Custody." } }
  },

  // --- 5. RECOVERY & MINDSET (10) ---
  {
    id: 'h_dark_room',
    title: 'Dark Room',
    description: 'Blackout sleep.',
    category: 'body',
    system_tags: ['sleep'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'evening' },
    visuals: { icon: 'Moon', color: 'bg-black' },
    lenses: { FORTITUDE: { why: "Cave mode.", how: "Tape LEDs." }, REASON: { why: "Deep sleep.", how: "Eye mask." } }
  },
  {
    id: 'h_negative_viz',
    title: 'Negative Viz',
    description: 'Stoic prep.',
    category: 'mind',
    system_tags: ['stoicism'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 3, time_of_day: 'morning' },
    visuals: { icon: 'Skull', color: 'bg-stone-800' },
    lenses: { FORTITUDE: { why: "Prepare.", how: "Imagine loss." }, REASON: { why: "Resilience.", how: "2 mins." } }
  },
  {
    id: 'h_memento_mori',
    title: 'Memento Mori',
    description: 'Remember death.',
    category: 'spirit',
    system_tags: ['stoicism'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 1, time_of_day: 'any' },
    visuals: { icon: 'Hourglass', color: 'bg-stone-500' },
    lenses: { FORTITUDE: { why: "Time is finite.", how: "Look at countdown." }, REASON: { why: "Urgency.", how: "Don't waste." } }
  },
  {
    id: 'h_weekly_review',
    title: 'Weekly Review',
    description: 'Sunday strategy.',
    category: 'mind',
    system_tags: ['strategy'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 1, time_of_day: 'any' },
    visuals: { icon: 'BookOpen', color: 'bg-blue-800' },
    lenses: { FORTITUDE: { why: "Correct.", how: "Review goals." }, REASON: { why: "Plan.", how: "Set week." } }
  },
  {
    id: 'h_social_detox',
    title: 'Social Detox',
    description: 'No media.',
    category: 'mind',
    system_tags: ['focus'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 1, time_of_day: 'any' },
    visuals: { icon: 'Ban', color: 'bg-red-500' },
    lenses: { FORTITUDE: { why: "Stop scroll.", how: "Delete app." }, REASON: { why: "Dopamine.", how: "Blocker." } }
  },
  {
    id: 'h_call_parents',
    title: 'Call Parents',
    description: 'Lineage.',
    category: 'spirit',
    system_tags: ['family'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 1, time_of_day: 'any' },
    visuals: { icon: 'Users', color: 'bg-teal-600' },
    lenses: { FORTITUDE: { why: "Honor.", how: "Call." }, REASON: { why: "Regret min.", how: "Check in." } }
  },
  {
    id: 'h_date_night',
    title: 'Date Night',
    description: 'Partner focus.',
    category: 'spirit',
    system_tags: ['relationship'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 1, time_of_day: 'evening' },
    visuals: { icon: 'Heart', color: 'bg-pink-600' },
    lenses: { FORTITUDE: { why: "Lead.", how: "Plan it." }, REASON: { why: "Invest.", how: "No phones." } }
  },
  {
    id: 'h_play_kids',
    title: 'Play w/ Kids',
    description: 'Undistracted.',
    category: 'spirit',
    system_tags: ['family'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'evening' },
    visuals: { icon: 'Smile', color: 'bg-yellow-400' },
    lenses: { FORTITUDE: { why: "Present.", how: "Floor time." }, REASON: { why: "Legacy.", how: "Phone away." } }
  },
  {
    id: 'h_gear_prep',
    title: 'Gear Prep',
    description: 'Kit staging.',
    category: 'body',
    system_tags: ['prep'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'evening' },
    visuals: { icon: 'Briefcase', color: 'bg-slate-700' },
    lenses: { FORTITUDE: { why: "No friction.", how: "Pack bag." }, REASON: { why: "Efficiency.", how: "Doorway." } }
  },
  {
    id: 'h_clean_water',
    title: 'Clean Water',
    description: 'Filtered only.',
    category: 'body',
    system_tags: ['health'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'any' },
    visuals: { icon: 'Droplets', color: 'bg-cyan-600' },
    lenses: { FORTITUDE: { why: "No poison.", how: "RO filter." }, REASON: { why: "Endocrine.", how: "Glass only." } }
  },

  // --- 6. LOGISTICS & ENV (10) ---
  {
    id: 'h_grounding',
    title: 'Grounding',
    description: 'Earth contact.',
    category: 'body',
    system_tags: ['recovery'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 3, time_of_day: 'morning' },
    visuals: { icon: 'Sprout', color: 'bg-green-600' },
    lenses: { FORTITUDE: { why: "Connect.", how: "Barefoot." }, REASON: { why: "Inflammation.", how: "10 mins." } }
  },
  {
    id: 'h_nature_walk',
    title: 'Nature Walk',
    description: 'Green space.',
    category: 'mind',
    system_tags: ['calm'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 2, time_of_day: 'any' },
    visuals: { icon: 'Leaf', color: 'bg-green-500' },
    lenses: { FORTITUDE: { why: "Decompress.", how: "Trees." }, REASON: { why: "Optic flow.", how: "Horizon." } }
  },
  {
    id: 'h_cook_meal',
    title: 'Cook Meal',
    description: 'Scratch cooking.',
    category: 'body',
    system_tags: ['nutrition'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'evening' },
    visuals: { icon: 'Flame', color: 'bg-orange-500' },
    lenses: { FORTITUDE: { why: "Control.", how: "No seed oils." }, REASON: { why: "Quality.", how: "Grill." } }
  },
  {
    id: 'h_box_breath',
    title: 'Box Breathing',
    description: 'Stress reset.',
    category: 'mind',
    system_tags: ['calm'],
    default_config: { frequency_type: 'FREQUENCY', target_days: 3, time_of_day: 'any' },
    visuals: { icon: 'Wind', color: 'bg-blue-200' },
    lenses: { FORTITUDE: { why: "Reset.", how: "4-4-4-4." }, REASON: { why: "Navy SEAL.", how: "5 mins." } }
  },
  {
    id: 'h_no_phone',
    title: 'No Phone',
    description: 'Physical separation.',
    category: 'mind',
    system_tags: ['focus'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'any' },
    visuals: { icon: 'Ban', color: 'bg-red-400' },
    lenses: { FORTITUDE: { why: "Break chain.", how: "Drawer." }, REASON: { why: "Dopamine.", how: "2 hours." } }
  },
  {
    id: 'h_sleep_track',
    title: 'Sleep Track',
    description: 'Quantify recovery.',
    category: 'body',
    system_tags: ['data'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'morning' },
    visuals: { icon: 'Moon', color: 'bg-indigo-500' },
    lenses: { FORTITUDE: { why: "Truth.", how: "Check stats." }, REASON: { why: "Feedback.", how: "Oura." } }
  },
  {
    id: 'h_blue_block',
    title: 'Blue Block',
    description: 'Melatonin protection.',
    category: 'body',
    system_tags: ['sleep'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'evening' },
    visuals: { icon: 'Glasses', color: 'bg-orange-500' },
    lenses: { FORTITUDE: { why: "Sunset.", how: "Glasses." }, REASON: { why: "Circadian.", how: "Post-sun." } }
  },
  {
    id: 'h_temp_drop',
    title: 'Temp Drop',
    description: 'Cool sleep.',
    category: 'body',
    system_tags: ['sleep'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'evening' },
    visuals: { icon: 'Thermometer', color: 'bg-cyan-800' },
    lenses: { FORTITUDE: { why: "Hibernate.", how: "AC 65." }, REASON: { why: "Deep sleep.", how: "Chiller." } }
  },
  {
    id: 'h_mouth_tape',
    title: 'Mouth Tape',
    description: 'Nasal breath.',
    category: 'body',
    system_tags: ['sleep'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'evening' },
    visuals: { icon: 'Smile', color: 'bg-teal-700' },
    lenses: { FORTITUDE: { why: "Shut mouth.", how: "Tape." }, REASON: { why: "Oxygen.", how: "Strips." } }
  },
  {
    id: 'h_digital_dark',
    title: 'Digital Dark',
    description: 'Zero screens.',
    category: 'mind',
    system_tags: ['sleep'],
    default_config: { frequency_type: 'ABSOLUTE', target_days: 7, time_of_day: 'evening' },
    visuals: { icon: 'Moon', color: 'bg-indigo-900' },
    lenses: { FORTITUDE: { why: "Unplug.", how: "Off." }, REASON: { why: "Melatonin.", how: "1h pre-bed." } }
  }
];
