// The Sovereign Source: Immutable Lexicon Store
// Bypasses API/DB dependency for the Master Toolbelt display.

export const HABIT_ATOMS = [
  {
    title: "Intermittent Fasting",
    theme: "asset_lime",
    icon: "Timer",
    description: "Trigger cellular repair and stabilize energy.",
    how_instruction: "Stop eating by 8 PM. Don't eat again until 12 PM tomorrow. Water and black coffee only.",
    why_instruction: "Cleans out dead cells (autophagy) and stabilizes your energy levels all day.",
    category: "bio_rig"
  },
  {
    title: "Morning Sunlight",
    theme: "bio_emerald",
    icon: "Sun",
    description: "Anchor your circadian clock with outdoor light.",
    how_instruction: "Get outside for 10-15 mins within an hour of waking. No sunglasses.",
    why_instruction: "Sets your body clock so you're alert now and tired at the right time tonight.",
    category: "nav_computer"
  },
  {
    title: "Zone 2 Cardio",
    theme: "bio_emerald",
    icon: "Activity",
    description: "The foundation of your physical engine. Improves everything from heart health to focus.",
    how_instruction: "40 mins of steady movement. You should be able to talk, but not sing.",
    why_instruction: "The foundation of your physical engine. Improves everything from heart health to focus.",
    category: "bio_rig"
  },
  {
    title: "The Shadow Audit",
    theme: "warning_amber",
    icon: "PenTool",
    description: "Review your day. Where did you drift? Where did you lie to yourself? Write it down.",
    how_instruction: "Review your day. Where did you drift? Where did you lie to yourself? Write it down.",
    why_instruction: "You can't fix what you refuse to look at. Radical honesty is the only way to grow.",
    category: "black_box"
  },
  {
    title: "Deep Work Bout",
    theme: "neural_violet",
    icon: "Zap",
    description: "Compound cognitive returns via intense focus.",
    how_instruction: "90 mins on one big task. No phone. No email. No distractions.",
    why_instruction: "Trains your brain to focus. This is how you produce elite results in less time.",
    category: "kinetic_core"
  },
  {
    title: "Accountability Mirror",
    theme: "ghost_white",
    icon: "Eye",
    description: "Face your insecurities.",
    how_instruction: "Face the mirror. State your truths and your insecurities out loud. No excuses.",
    why_instruction: "Strips away the comfort of your own lies. Own your reality to change it.",
    category: "black_box"
  },
  {
    title: "Secret Good Deed",
    theme: "neural_violet",
    icon: "Heart",
    description: "Build virtue by helping others in secret.",
    how_instruction: "Do something helpful for someone. Ensure they never find out it was you.",
    why_instruction: "Builds character for yourself, not for the applause of others.",
    category: "armor_plating"
  },
  {
    title: "Digital Sunset",
    theme: "sunset_indigo",
    icon: "Moon",
    description: "Protect recovery chemicals from blue light.",
    how_instruction: "Screens off 60 mins before bed. Switch to paper books or conversation.",
    why_instruction: "Protects your brain's sleep chemicals. Better sleep equals a better tomorrow.",
    category: "black_box"
  },
  {
    title: "Make Bed",
    theme: "slate_steel",
    icon: "Shield",
    description: "Secure your first victory immediately.",
    how_instruction: "Fix your bed to a high standard immediately after standing up.",
    why_instruction: "Your first win of the day. It sets the tone for everything that follows.",
    category: "kinetic_core"
  },
  {
    title: "Thermal Exposure",
    theme: "combat_red",
    icon: "Flame",
    description: "Use heat stress to protect the brain and heart.",
    how_instruction: "20 mins in a sauna (>170°F) or a hot bath.",
    why_instruction: "Triggers recovery proteins and keeps your heart and brain resilient.",
    category: "bio_rig"
  },
  {
    title: "Cold Exposure",
    theme: "oxygen_cyan",
    icon: "Droplet",
    description: "Control neurochemistry through thermal shock.",
    how_instruction: "2 mins in cold water (<50°F). Embrace the shock.",
    why_instruction: "Massive dopamine spike and builds the ability to stay calm under stress.",
    category: "bio_rig"
  },
  {
    title: "Memento Mori",
    theme: "ghost_white",
    icon: "Lock",
    description: "Clarify priorities by remembering finitude.",
    how_instruction: "Take 2 mins to remember you will die. This could be your last day.",
    why_instruction: "Kills procrastination instantly. Focus on what actually matters.",
    category: "armor_plating"
  },
  {
    title: "Nasal Breathing",
    theme: "oxygen_cyan",
    icon: "Activity",
    description: "Improve oxygen delivery via the Bohr Effect.",
    how_instruction: "Breathe only through your nose, even during exercise and sleep.",
    why_instruction: "Optimizes your oxygen levels and keeps your nervous system calm.",
    category: "bio_rig"
  },
  {
    title: "Heavy Lifting",
    theme: "slate_steel",
    icon: "Dumbbell",
    description: "Train the nervous system to generate force.",
    how_instruction: "Lift heavy weights using basic movements (squat, press, pull).",
    why_instruction: "Strength is the best predictor of how well you'll move in 30 years.",
    category: "bio_rig"
  },
  {
    title: "The Cookie Jar",
    theme: "warning_amber",
    icon: "Trophy",
    description: "Fuel for the current struggle.",
    how_instruction: "When you want to quit, remember a time you overcame something harder.",
    why_instruction: "Your past wins are fuel. Use them to push through current friction.",
    category: "black_box"
  },
  {
    title: "Amor Fati",
    theme: "slate_steel",
    icon: "RotateCcw",
    description: "Love of fate.",
    how_instruction: "Take a problem you're facing and treat it as a necessary challenge.",
    why_instruction: "Don't just tolerate your fate—love it. Use it as fuel for growth.",
    category: "armor_plating"
  },
  {
    title: "No Alcohol",
    theme: "combat_red",
    icon: "Lock",
    description: "Zero alcohol for 24 hours.",
    how_instruction: "Zero alcohol for 24 hours.",
    why_instruction: "Alcohol is a neurotoxin that destroys your sleep quality and decision making.",
    category: "bio_rig"
  },
  {
    title: "Prayer / Stillness",
    theme: "ghost_white",
    icon: "Heart",
    description: "Center your mind and align values.",
    how_instruction: "10 mins of prayer, meditation, or silent reflection.",
    why_instruction: "Centers your mind and reminds you of your highest values.",
    category: "nav_computer"
  },
  {
    title: "Nature Exposure",
    theme: "bio_emerald",
    icon: "Trees",
    description: "Lower stress via environmental fractals.",
    how_instruction: "Spend 15 mins outside in a natural environment (Touch Grass).",
    why_instruction: "Lower stress hormones and reset your focus by interacting with the real world.",
    category: "bio_rig"
  },
  {
    title: "Inbox Zero",
    theme: "slate_steel",
    icon: "Mail",
    description: "Clear the mental static of digital business.",
    how_instruction: "Clear all unread messages until your primary inbox is empty.",
    why_instruction: "Removes the mental 'static' of unfinished digital business.",
    category: "kinetic_core"
  },
  {
    title: "Taking Souls",
    theme: "combat_red",
    icon: "Flame",
    description: "Enter the room of suffering. Do not leave until you've taken a soul.",
    how_instruction: "Increase intensity when the environment expects you to quit.",
    why_instruction: "Dominance over self-imposed limits.",
    category: "kinetic_core"
  },
  {
    title: "Prioritize & Execute",
    theme: "maxi_blue",
    icon: "Target",
    description: "Pick the single most impactful task and neutralize it.",
    how_instruction: "Pick the single most impactful task and neutralize it.",
    why_instruction: "Jocko's Law of Combat for clarity.",
    category: "kinetic_core"
  },
  {
    title: "Ready State",
    theme: "bio_emerald",
    icon: "RefreshCw",
    description: "Maintain mechanical range of motion.",
    how_instruction: "THE ATOM: Tissue Maintenance. THE STEP: Couch stretch and deep squat hold.",
    why_instruction: "Offset the hip flexion contractures caused by 21st-century sitting. [Starrett]",
    category: "bio_rig"
  },
  {
    title: "Protein Loading",
    theme: "asset_lime",
    icon: "Dna",
    description: "Trigger muscle synthesis and morning energy.",
    how_instruction: "THE ATOM: Leucine Trigger. THE STEP: 30g+ protein in the first meal.",
    why_instruction: "Required threshold to initiate Muscle Protein Synthesis. [Layman]",
    category: "bio_rig"
  },
  {
    title: "Sleep Hygiene",
    theme: "bio_rig",
    icon: "Moon",
    description: "Prioritize the brain's cleaning cycle.",
    how_instruction: "THE ATOM: Glymphatic Clearance. THE STEP: Cool room (65°F). Total darkness.",
    why_instruction: "Clears amyloid beta waste (neurotoxins) from the brain. [Walker]",
    category: "bio_rig"
  },
  {
    title: "VO2 Max Training",
    theme: "telemetry",
    icon: "Activity",
    description: "Expand the ceiling of aerobic capacity.",
    how_instruction: "THE ATOM: Aerobic Power. THE STEP: 4 mins Max Effort, 4 mins Rest. Repeat 4x.",
    why_instruction: "Cardiorespiratory fitness is the strongest correlate to lifespan. [Attia]",
    category: "bio_rig"
  },
  {
    title: "Glycemic Defense",
    theme: "combat_red",
    icon: "Lock",
    description: "Protect energy from insulin spikes.",
    how_instruction: "THE ATOM: Metabolic Shield. THE STEP: Zero refined sugar or liquid calories for 24h.",
    why_instruction: "Reduces systemic inflammation and energy crashes. [Lustig]",
    category: "bio_rig"
  },
  {
    title: "Fasted Walk",
    theme: "bio_rig",
    icon: "Activity",
    description: "Mobilize fatty acids immediately upon waking.",
    how_instruction: "THE ATOM: Lipolysis. THE STEP: 20m walk before first calorie. Low intensity.",
    why_instruction: "Increases fat burning during low-intensity movement. [Horowitz]",
    category: "bio_rig"
  },
  {
    title: "Cold Bedroom",
    theme: "bio_rig",
    icon: "Thermometer",
    description: "Trigger the core temp drop for deep sleep.",
    how_instruction: "THE ATOM: Core Temp Drop. THE STEP: Bedroom at 65°F (18°C) one hour before sleep.",
    why_instruction: "Biological trigger for sleep onset and quality maintenance. [Walker]",
    category: "bio_rig"
  },
  {
    title: "Brain Fuel",
    theme: "asset_lime",
    icon: "Zap",
    description: "Enhance anaerobic power and cognition.",
    how_instruction: "THE ATOM: ATP Reservoir. THE STEP: 5g Monohydrate daily. Anytime.",
    why_instruction: "Improves anaerobic power and cognition. [Attia]",
    category: "bio_rig"
  },
  {
    title: "Sleep Stack",
    theme: "neural_violet",
    icon: "Moon",
    description: "Chemical assistance for sleep onset.",
    how_instruction: "THE ATOM: Neuro-Downreg. THE STEP: Mg Threonate + Theanine 60m pre-bed.",
    why_instruction: "Reduce sleep latency. [Huberman]",
    category: "bio_rig"
  },
  {
    title: "Delayed Caffeine",
    theme: "bio_rig",
    icon: "Coffee",
    description: "Wait 90 mins after waking to prevent the afternoon crash.",
    how_instruction: "THE ATOM: Adenosine Clearance. THE STEP: No caffeine for first 90m of day.",
    why_instruction: "Allows natural adenosine clearance to prevent afternoon crash. [Huberman]",
    category: "bio_rig"
  },
  {
    title: "No Sugary Drinks",
    theme: "combat_red",
    icon: "Droplet",
    description: "Zero liquid calories—pure performance.",
    how_instruction: "THE ATOM: Insulin Control. THE STEP: Water, black coffee, or tea only.",
    why_instruction: "Liquid sugar is the fastest path to metabolic dysfunction. [Lustig]",
    category: "bio_rig"
  },
  {
    title: "Grounding",
    theme: "bio_emerald",
    icon: "Anchor",
    description: "10 mins of direct earth contact for inflammation/recovery.",
    how_instruction: "THE ATOM: Electron Exchange. THE STEP: Bare feet on grass or dirt.",
    why_instruction: "Reduces blood viscosity and inflammation. [Ober]",
    category: "bio_rig"
  },
  {
    title: "Vitamin D3/K2",
    theme: "asset_lime",
    icon: "Sun",
    description: "The fundamental hormonal baseline.",
    how_instruction: "THE ATOM: Hormonal Foundation. THE STEP: Take with fat-containing meal.",
    why_instruction: "Regulates over 1,000 genes and immune function. [Rhonda Patrick]",
    category: "bio_rig"
  },
  {
    title: "Dead Hang",
    theme: "telemetry",
    icon: "Anchor",
    description: "Test systemic strength and decompress spine.",
    how_instruction: "THE ATOM: Force Output. THE STEP: Hang from a bar. Active shoulders. Total of 120s.",
    why_instruction: "Grip strength is the #1 physical biomarker of all-cause mortality. [Bohannon]",
    category: "bio_rig"
  },
  {
    title: "Box Breathing",
    theme: "oxygen_cyan",
    icon: "Wind",
    description: "Tactical autonomic nervous system regulation.",
    how_instruction: "THE ATOM: Vagus Nerve Stim. THE STEP: Inhale 4s, Hold 4s, Exhale 4s, Hold 4s.",
    why_instruction: "Instantly lowers heart rate and restores cognitive control. [McKeown]",
    category: "bio_rig"
  },
  {
    title: "Digital Air Gap",
    theme: "black_box",
    icon: "Lock",
    description: "Sever the connection to the digital hive mind.",
    how_instruction: "THE ATOM: Dopamine Reset. THE STEP: Phone in a separate room for 1 hour of deep work.",
    why_instruction: "Constant notifications downregulate dopamine receptors. [Lembke]",
    category: "black_box"
  },
  {
    title: "40% Override",
    theme: "combat_red",
    icon: "Zap",
    description: "Push past the perceived limit.",
    how_instruction: "THE ATOM: Governor Bypass. THE STEP: Push for 5 more when mind says 'done'.",
    why_instruction: "The mind quits before the body. [Goggins]",
    category: "kinetic_core"
  },
  {
    title: "Control Audit",
    theme: "ghost_white",
    icon: "Shield",
    description: "Focus only on what you can control.",
    how_instruction: "THE ATOM: Focus Strike. THE STEP: Discard worries outside your control.",
    why_instruction: "Zero energy leak on externals. [Epictetus]",
    category: "armor_plating"
  },
  {
    title: "Breath Check",
    theme: "oxygen_cyan",
    icon: "Wind",
    description: "Measure CO2 tolerance.",
    how_instruction: "THE ATOM: Exhale Timer. THE STEP: Measure duration of a single exhale.",
    why_instruction: "Proxy for stress resilience. [Mackenzie]",
    category: "bio_rig"
  },
  {
    title: "Social Sync",
    theme: "maxi_blue",
    icon: "Users",
    description: "Maintain social infrastructure.",
    how_instruction: "THE ATOM: Tribe Connection. THE STEP: Connect with one person for 10+ mins.",
    why_instruction: "Social isolation is a primary biological stressor. [Conti]",
    category: "bio_rig"
  },
  {
    title: "Skill Acquisition",
    theme: "neural_violet",
    icon: "BookOpen",
    description: "Expand specific knowledge and leverage.",
    how_instruction: "THE ATOM: Neural Plasticity. THE STEP: 30m focused practice on a high-leverage skill.",
    why_instruction: "Focus + Novelty = Growth. The mind is for training, not just storage. [Huberman]",
    category: "kinetic_core"
  },
  {
    title: "Daily Shutdown",
    theme: "sunset_indigo",
    icon: "RotateCcw",
    description: "Close all open cognitive loops before disconnecting.",
    how_instruction: "THE ATOM: Cognitive Closure. THE STEP: Review tomorrow's Big 3. Say 'Shutdown Complete'.",
    why_instruction: "Clears attention residue and protects the evening window. [Newport]",
    category: "kinetic_core"
  },
  {
    title: "Agency Audit",
    theme: "nav_computer",
    icon: "Brain",
    description: "Map the internal terrain of the mind.",
    how_instruction: "THE ATOM: Narrative Control. THE STEP: Journal to identify 'Defense' vs 'Generative' drive.",
    why_instruction: "Identifying internal 'spies' allows you to regain agency over your life. [Conti]",
    category: "black_box"
  },
  {
    title: "Leverage Audit",
    theme: "kinetic_core",
    icon: "TrendingUp",
    description: "Ensure effort is multiplied by leverage.",
    how_instruction: "THE ATOM: Input/Output Disconnection. THE STEP: Audit tasks: Code, Media, or Capital?",
    why_instruction: "Wealth is the product of Leverage x Judgment. Stop trading time for money. [Ravikant]",
    category: "kinetic_core"
  },
  {
    title: "Recovery Sync",
    theme: "maxi_blue",
    icon: "Sun",
    description: "Honor the personal mission.",
    how_instruction: "THE ATOM: Sovereign Spirit. THE STEP: Attend meeting or Service. No isolation.",
    why_instruction: "Isolation is drift. [Founder]",
    category: "bio_rig"
  },
  {
    title: "Neural Reboot",
    theme: "neural_violet",
    icon: "Zap",
    description: "Cognitive recovery without sleep.",
    how_instruction: "THE ATOM: Dopamine Reset. THE STEP: 10-20 min audio guide (Yoga Nidra).",
    why_instruction: "Cognitive recovery without sleep. [Huberman]",
    category: "bio_rig"
  }
];

export const PROTOCOL_MOLECULES = [
  {
    title: "Atlas Golden Set",
    description: "The foundation. The five habits that stabilize any rig.",
    habits: ["morning_sun", "deep_work", "fasted_walk", "shadow_audit", "digital_sunset"]
  },
  {
    title: "Huberman Neural Stack",
    description: "Optimizing the brain through biological triggers.",
    habits: ["morning_sun", "cold_plunge", "nsdr_reset", "digital_sunset"]
  },
  {
    title: "Goggins Iron Mind",
    description: "Building a calloused mind through intentional friction.",
    habits: ["accountability_mirror", "heavy_lifting", "taking_souls", "cookie_jar"]
  },
  {
    title: "Attia Centenarian",
    description: "Training today for the 'Marginal Decade' of your life.",
    habits: ["fasted_walk", "heavy_lifting", "fasting", "vo2_max"]
  },
  {
    title: "Jocko Discipline",
    description: "Military-grade standard for daily execution.",
    habits: ["make_bed", "deep_work", "shadow_audit", "no_sugar"]
  },
  {
    title: "The Stoic",
    description: "Ancient logic for modern chaos.",
    habits: ["memento_mori", "amor_fati", "prayer_stillness", "good_deed"]
  },
  {
    title: "The War Phase",
    description: "High-output optimization for crisis.",
    habits: ["sauna", "digital_air_gap", "thermoregulation", "deep_work"]
  },
  {
    title: "Deep Stack",
    description: "Unlocking the cognitive superpower.",
    habits: ["deep_work", "daily_shutdown", "touch_grass"]
  },
  {
    title: "Athlete Standard",
    description: "Explosive power and rapid recovery.",
    habits: ["heavy_lifting", "protein_loading", "ready_state", "nsdr_reset"]
  }
];

export const lexiconStore = {
    atoms: HABIT_ATOMS,
    molecules: PROTOCOL_MOLECULES,

    // Helper to get by category if needed
    getByCategory: (category: string) => HABIT_ATOMS.filter(h => h.category === category)
};
