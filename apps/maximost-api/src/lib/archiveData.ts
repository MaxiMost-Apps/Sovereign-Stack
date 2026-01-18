// apps/maximost-api/src/lib/archiveData.ts

export const HABIT_ATOMS = [
  // 01. BIO
  {
    "slug": "morning-sunlight",
    "atom_id": "morning-sunlight",
    "title": "Morning Sunlight",
    "theme": "bio_emerald",
    "base_color": "#F59E0B",
    "icon": "Sun",
    "category": "BIO",
    "description": "Anchor your circadian clock with outdoor light.",
    "logic": "Anchor the circadian clock and trigger the natural cortisol-to-serotonin release cascade.",
    "protocol": [
      "Exit the perimeter within 30 minutes of waking.",
      "Expose retinas to direct solar infrared (no sunglasses).",
      "Maintain exposure for 10–20 minutes depending on cloud density."
    ],
    "perspectives": {
      "fortitude": "Field reconnaissance. A stagnant operator is a compromised operator. Verify your physical environment to initialize the day's command.",
      "reason": "First principles. Align your biological hardware with the solar cycle to prevent logical drift and hormonal variance.",
      "visionary": "The Path begins at the horizon. You are architecting a high-performance legacy; it starts by claiming the morning jurisdiction.",
      "analytical": "Sensor calibration. Early photons reset the Suprachiasmatic Nucleus. Calibrate your internal baseline to ensure a 2200-hour shutdown."
    }
  },
  {"slug": "cold-exposure", "title": "Cold Exposure", "theme": "oxygen_cyan", "icon": "Snowflake", "category": "BIO", "description": "Control neurochemistry through thermal shock."},
  {"slug": "grounding", "title": "Grounding", "theme": "bio_emerald", "icon": "Anchor", "category": "BIO", "description": "Direct earth contact for inflammation/recovery."},
  {"slug": "red-light", "title": "Red Light", "theme": "combat_red", "icon": "Zap", "category": "BIO", "description": "Mitochondrial enhancement therapy."},
  {"slug": "magnesium", "title": "Magnesium", "theme": "asset_lime", "icon": "Activity", "category": "BIO", "description": "Essential mineral for nervous system regulation."},
  {"slug": "digital-dark", "title": "Digital Dark", "theme": "black_box", "icon": "Moon", "category": "BIO", "description": "Zero blue light/screens post-sunset."},
  {"slug": "blue-light-block", "title": "Blue Light Block", "theme": "neural_violet", "icon": "Eye", "category": "BIO", "description": "Protect melatonin production."},
  {"slug": "temperature-drop", "title": "Temperature Drop", "theme": "bio_rig", "icon": "Thermometer", "category": "BIO", "description": "Core body cooling for deep sleep onset."},
  {"slug": "mouth-tape", "title": "Mouth Tape", "theme": "oxygen_cyan", "icon": "Wind", "category": "BIO", "description": "Forced nasal breathing during sleep."},
  {"slug": "sleep-tracking", "title": "Sleep Tracking", "theme": "slate_steel", "icon": "Moon", "category": "BIO", "description": "Quantify recovery metrics."},

  // 02. PHYS
  {
    "slug": "zone-2-cardio",
    "atom_id": "zone-2-cardio",
    "title": "Zone 2 Cardio",
    "theme": "bio_emerald",
    "base_color": "#EF4444",
    "icon": "Activity",
    "category": "PHYS",
    "description": "Base aerobic capacity building.",
    "logic": "Optimize mitochondrial density and build a robust aerobic baseline for sustained energy production.",
    "protocol": [
      "Maintain a heart rate where you can hold a conversation but with effort.",
      "Perform for 45+ minutes to trigger mitochondrial biogenesis.",
      "Nasal breathing only to maintain autonomic nervous system control."
    ],
    "perspectives": {
      "fortitude": "Engine maintenance. A low-capacity engine fails during high-intensity maneuvers. Build the endurance required to hold the line.",
      "reason": "Biological law. Aerobic capacity is the foundation of longevity. Rational men do not ignore the fundamental needs of the heart.",
      "visionary": "Building for the century. You need a heart that can sustain a hundred-year mission. Build the physiological engine for your legacy.",
      "analytical": "Lactate clearance optimization. Targeting maximum fat oxidation. Build the aerobic base to support higher-intensity peak metrics."
    }
  },
  {"slug": "strength-session", "title": "Strength Session", "theme": "slate_steel", "icon": "Dumbbell", "category": "PHYS", "description": "Heavy resistance training."},
  {"slug": "ruck", "title": "Ruck", "theme": "combat_red", "icon": "Briefcase", "category": "PHYS", "description": "Weighted walking for durability."},
  {"slug": "sauna-heat", "title": "Sauna/Heat", "theme": "combat_red", "icon": "Flame", "category": "PHYS", "description": "Heat shock protein activation."},
  {"slug": "mobility", "title": "Mobility", "theme": "bio_emerald", "icon": "RefreshCw", "category": "PHYS", "description": "Joint range of motion maintenance."},
  {"slug": "sport-play", "title": "Sport/Play", "theme": "maxi_blue", "icon": "Activity", "category": "PHYS", "description": "Dynamic movement and competition."},
  {"slug": "walk-jog", "title": "Walk/Jog", "theme": "bio_rig", "icon": "Activity", "category": "PHYS", "description": "Low intensity movement."},
  {"slug": "hiit", "title": "HIIT", "theme": "combat_red", "icon": "Zap", "category": "PHYS", "description": "High intensity interval training."},
  {"slug": "yoga", "title": "Yoga", "theme": "neural_violet", "icon": "Activity", "category": "PHYS", "description": "Mind-body alignment and flexibility."},
  {"slug": "cold-plunge", "title": "Cold Plunge", "theme": "oxygen_cyan", "icon": "Droplet", "category": "PHYS", "description": "Systemic inflammation reduction."},

  // 03. FUEL
  {
    "slug": "intermittent-fast",
    "atom_id": "intermittent-fast",
    "title": "Intermittent Fasting",
    "theme": "asset_lime",
    "base_color": "#10B981",
    "icon": "Timer",
    "category": "FUEL",
    "description": "Restricted feeding window.",
    "logic": "Stabilize insulin levels and trigger cellular autophagy to clear metabolic debris.",
    "protocol": [
      "Maintain a 16:8 ingestion window.",
      "Hydrate with water and electrolytes during the 'Off' phase.",
      "Break the fast with high-protein input to trigger muscle synthesis."
    ],
    "perspectives": {
      "fortitude": "Resource management. Constant consumption is a supply chain failure. Train the system to survive and strike on internal reserves.",
      "reason": "Metabolic law. The human engine is designed to switch fuels. Prioritize insulin sensitivity as a first principle of health.",
      "visionary": "Mastery of appetite. You are not a slave to your stomach. Choosing when to eat is the ultimate claim of personal jurisdiction.",
      "analytical": "Input optimization. Data shows peak cognitive stability occurs in the fasted state. Eliminate the insulin spike to maintain high output."
    }
  },
  {"slug": "high-protein", "title": "High Protein", "theme": "asset_lime", "icon": "Dna", "category": "FUEL", "description": "Muscle synthesis priority."},
  {"slug": "electrolytes", "title": "Electrolytes", "theme": "oxygen_cyan", "icon": "Zap", "category": "FUEL", "description": "Hydration optimization."},
  {"slug": "no-sugar", "title": "No Sugar", "theme": "combat_red", "icon": "Lock", "category": "FUEL", "description": "Glycemic control."},
  {"slug": "hydrate", "title": "Hydrate", "theme": "oxygen_cyan", "icon": "Droplet", "category": "FUEL", "description": "Water intake baseline."},
  {"slug": "acv", "title": "ACV", "theme": "asset_lime", "icon": "Activity", "category": "FUEL", "description": "Apple Cider Vinegar protocol."},
  {"slug": "creatine", "title": "Creatine", "theme": "slate_steel", "icon": "Zap", "category": "FUEL", "description": "Cognitive and physical fuel."},
  {"slug": "omega-3", "title": "Omega-3", "theme": "bio_emerald", "icon": "Activity", "category": "FUEL", "description": "Anti-inflammatory fats."},
  {"slug": "fiber", "title": "Fiber", "theme": "bio_emerald", "icon": "Activity", "category": "FUEL", "description": "Gut health foundation."},
  {"slug": "cheat-meal-reset", "title": "Cheat Meal Reset", "theme": "warning_amber", "icon": "RefreshCw", "category": "FUEL", "description": "Planned metabolic flexibility."},

  // 04. COG
  {"slug": "deep-work", "title": "Deep Work", "theme": "neural_violet", "icon": "Zap", "category": "COG", "description": "Distraction-free focus block."},
  {
    "slug": "read-analog",
    "atom_id": "read-analog",
    "title": "Read (Analog)",
    "theme": "slate_steel",
    "base_color": "#3B82F6",
    "icon": "BookOpen",
    "category": "COG",
    "description": "Physical book reading.",
    "logic": "Build deep-work capacity and semantic knowledge accumulation without digital signal interference.",
    "protocol": [
      "Select a physical text (paper) to eliminate notification hijacking.",
      "Engage the 'Aegis Shield' (Phone in another room).",
      "Consume for 20+ minutes with zero task-switching."
    ],
    "perspectives": {
      "fortitude": "Bunker protocol. Deep focus is a tactical asset. Close the door on external noise and sharpen your primary weapon: the mind.",
      "reason": "Rational ingestion. Information is the raw material of thought. Use analog media to ensure high-fidelity knowledge transfer.",
      "visionary": "Architecting the blueprint. Every page is a stone in the foundation of your legacy. Read like you are learning to rule your world.",
      "analytical": "Throughput maximization. Minimize task-switching costs. Analog input ensures 100% bandwidth allocation to the Prefrontal Cortex."
    }
  },
  {"slug": "no-phone-block", "title": "No-Phone Block", "theme": "black_box", "icon": "Lock", "category": "COG", "description": "Digital separation period."},
  {"slug": "nsdr", "title": "NSDR", "theme": "neural_violet", "icon": "Moon", "category": "COG", "description": "Non-Sleep Deep Rest."},
  {"slug": "language", "title": "Language", "theme": "neural_violet", "icon": "MessageSquare", "category": "COG", "description": "Cognitive plasticity training."},
  {"slug": "skill-practice", "title": "Skill Practice", "theme": "maxi_blue", "icon": "Wrench", "category": "COG", "description": "Deliberate practice session."},
  {"slug": "writing", "title": "Writing", "theme": "slate_steel", "icon": "PenTool", "category": "COG", "description": "Structuring thought."},
  {"slug": "podcast", "title": "Podcast", "theme": "neural_violet", "icon": "Headphones", "category": "COG", "description": "Passive learning."},
  {"slug": "pomodoro", "title": "Pomodoro", "theme": "combat_red", "icon": "Timer", "category": "COG", "description": "Interval focus cycles."},
  {"slug": "inbox-zero", "title": "Inbox Zero", "theme": "slate_steel", "icon": "Mail", "category": "COG", "description": "Digital clutter clearance."},

  // 05. STOIC
  {
    "slug": "shadow-audit",
    "atom_id": "shadow-audit",
    "title": "The Shadow Audit",
    "theme": "warning_amber",
    "base_color": "#6366F1",
    "icon": "Moon",
    "category": "STOIC",
    "description": "Review of daily failures/wins.",
    "logic": "Close the day's open cognitive loops and architect tomorrow's primary tactical objectives.",
    "protocol": [
      "Review the day's 'War Logs' (What went right/wrong).",
      "Identify exactly where discipline drifted or where you lied to yourself.",
      "Lock in the Top 3 mission-critical tasks for tomorrow."
    ],
    "perspectives": {
      "fortitude": "Post-mission debrief. Identify the breaches in your perimeter. Own the failures so you don't repeat them at 0600 tomorrow.",
      "reason": "Objective assessment. Remove the ego and view the day's data as a neutral observer. Correct the trajectory based on rational results.",
      "visionary": "Refining the horizon. The Shadow Audit ensures that today's mistakes do not become tomorrow's legacy. Stay the course.",
      "analytical": "Output variance report. Compare intended execution against actual results. Adjust the protocol for a more efficient 24-hour cycle."
    }
  },
  {"slug": "accountability-mirror", "title": "Accountability Mirror", "theme": "ghost_white", "icon": "User", "category": "STOIC", "description": "Self-confrontation."},
  {"slug": "brain-dump", "title": "Brain Dump", "theme": "slate_steel", "icon": "FileText", "category": "STOIC", "description": "Clear working memory."},
  {"slug": "meditation", "title": "Meditation", "theme": "neural_violet", "icon": "Zap", "category": "STOIC", "description": "Mindfulness practice."},
  {"slug": "box-breathing", "title": "Box Breathing", "theme": "oxygen_cyan", "icon": "Wind", "category": "STOIC", "description": "Autonomic regulation."},
  {"slug": "visualization", "title": "Visualization", "theme": "neural_violet", "icon": "Eye", "category": "STOIC", "description": "Mental rehearsal."},
  {"slug": "gratitude", "title": "Gratitude", "theme": "bio_emerald", "icon": "Heart", "category": "STOIC", "description": "Positive reinforcement."},
  {"slug": "digital-minimalism", "title": "Digital Minimalism", "theme": "black_box", "icon": "Smartphone", "category": "STOIC", "description": "Intentional technology use."},
  {"slug": "silence", "title": "Silence", "theme": "ghost_white", "icon": "MicOff", "category": "STOIC", "description": "Absence of input."},
  {"slug": "memento-mori", "title": "Memento Mori", "theme": "ghost_white", "icon": "Skull", "category": "STOIC", "description": "Remembrance of death."},

  // 06. LOG
  {"slug": "environment-clear", "title": "Environment Clear", "theme": "slate_steel", "icon": "Trash", "category": "LOG", "description": "Physical space reset."},
  {"slug": "meal-prep", "title": "Meal Prep", "theme": "asset_lime", "icon": "Utensils", "category": "LOG", "description": "Nutritional logistics."},
  {"slug": "tomorrows-kit", "title": "Tomorrow’s Kit", "theme": "bio_rig", "icon": "Briefcase", "category": "LOG", "description": "Pre-deployment staging."},
  {"slug": "financial-audit", "title": "Financial Audit", "theme": "bio_emerald", "icon": "DollarSign", "category": "LOG", "description": "Resource check."},
  {"slug": "social-sync", "title": "Social Sync", "theme": "maxi_blue", "icon": "Users", "category": "LOG", "description": "Tribe connection."},
  {"slug": "home-maintenance", "title": "Home Maintenance", "theme": "slate_steel", "icon": "Home", "category": "LOG", "description": "Base upkeep."},
  {"slug": "inbox-triage", "title": "Inbox Triage", "theme": "slate_steel", "icon": "Inbox", "category": "LOG", "description": "Sorting communications."},
  {"slug": "grocery-run", "title": "Grocery Run", "theme": "asset_lime", "icon": "ShoppingCart", "category": "LOG", "description": "Supply run."},
  {"slug": "task-batching", "title": "Task Batching", "theme": "neural_violet", "icon": "Layers", "category": "LOG", "description": "Grouped execution."},
  {"slug": "weekly-review", "title": "Weekly Review", "theme": "warning_amber", "icon": "Calendar", "category": "LOG", "description": "Strategic alignment."}
];

export const PROTOCOL_MOLECULES = [
  {
    title: "Atlas Golden Set",
    description: "The foundation. The five habits that stabilize any rig.",
    habits: ["morning-sunlight", "deep-work", "walk-jog", "shadow-audit", "digital-dark"]
  },
  {
    title: "Huberman Neural Stack",
    description: "Optimizing the brain through biological triggers.",
    habits: ["morning-sunlight", "cold-exposure", "nsdr", "digital-dark"]
  },
  {
    title: "Goggins Iron Mind",
    description: "Building a calloused mind through intentional friction.",
    habits: ["accountability-mirror", "strength-session", "ruck", "shadow-audit"]
  },
  {
    title: "Attia Centenarian",
    description: "Training today for the 'Marginal Decade' of your life.",
    habits: ["zone-2-cardio", "strength-session", "intermittent-fast", "hiit"]
  },
  {
    title: "Jocko Discipline",
    description: "Military-grade standard for daily execution.",
    habits: ["environment-clear", "deep-work", "shadow-audit", "no-sugar"]
  },
  {
    title: "The Stoic",
    description: "Ancient logic for modern chaos.",
    habits: ["memento-mori", "gratitude", "meditation", "social-sync"]
  },
  {
    title: "The War Phase",
    description: "High-output optimization for crisis.",
    habits: ["sauna-heat", "no-phone-block", "temperature-drop", "deep-work"]
  },
  {
    title: "Deep Stack",
    description: "Unlocking the cognitive superpower.",
    habits: ["deep-work", "environment-clear", "grounding"]
  },
  {
    title: "Athlete Standard",
    description: "Explosive power and rapid recovery.",
    habits: ["strength-session", "high-protein", "mobility", "nsdr"]
  }
];
