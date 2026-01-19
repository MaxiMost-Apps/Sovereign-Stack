import json

ATOMS = [
  {"slug": "morning-sunlight", "atom_id": "morning-sunlight", "title": "Morning Sunlight", "theme": "bio_emerald", "base_color": "#F59E0B", "icon": "Sun", "category": "BIO", "description": "Anchor your circadian clock with outdoor light.", "logic": "Anchor the circadian clock and trigger the natural cortisol-to-serotonin release cascade.", "protocol": ["Exit the perimeter within 30 minutes of waking.", "Expose retinas to direct solar infrared (no sunglasses).", "Maintain exposure for 10–20 minutes depending on cloud density."], "perspectives": {"fortitude": "Field reconnaissance. A stagnant operator is a compromised operator. Verify your physical environment to initialize the day's command.", "reason": "First principles. Align your biological hardware with the solar cycle to prevent logical drift and hormonal variance.", "visionary": "The Path begins at the horizon. You are architecting a high-performance legacy; it starts by claiming the morning jurisdiction.", "analytical": "Sensor calibration. Early photons reset the Suprachiasmatic Nucleus. Calibrate your internal baseline to ensure a 2200-hour shutdown."}},
  {"slug": "cold-exposure", "title": "Cold Exposure", "theme": "oxygen_cyan", "base_color": "#06b6d4", "icon": "Snowflake", "category": "BIO", "description": "Control neurochemistry through thermal shock."},
  {"slug": "grounding", "title": "Grounding", "theme": "bio_emerald", "base_color": "#10b981", "icon": "Anchor", "category": "BIO", "description": "Direct earth contact for inflammation/recovery."},
  {"slug": "red-light", "title": "Red Light", "theme": "combat_red", "base_color": "#ef4444", "icon": "Zap", "category": "BIO", "description": "Mitochondrial enhancement therapy."},
  {"slug": "magnesium", "title": "Magnesium", "theme": "asset_lime", "base_color": "#84cc16", "icon": "Activity", "category": "BIO", "description": "Essential mineral for nervous system regulation."},
  {"slug": "digital-dark", "title": "Digital Dark", "theme": "black_box", "base_color": "#18181b", "icon": "Moon", "category": "BIO", "description": "Zero blue light/screens post-sunset."},
  {"slug": "blue-light-block", "title": "Blue Light Block", "theme": "neural_violet", "base_color": "#8b5cf6", "icon": "Eye", "category": "BIO", "description": "Protect melatonin production."},
  {"slug": "temperature-drop", "title": "Temperature Drop", "theme": "bio_rig", "base_color": "#3b82f6", "icon": "Thermometer", "category": "BIO", "description": "Core body cooling for deep sleep onset."},
  {"slug": "mouth-tape", "title": "Mouth Tape", "theme": "oxygen_cyan", "base_color": "#06b6d4", "icon": "Wind", "category": "BIO", "description": "Forced nasal breathing during sleep."},
  {"slug": "sleep-tracking", "title": "Sleep Tracking", "theme": "slate_steel", "base_color": "#64748b", "icon": "Moon", "category": "BIO", "description": "Quantify recovery metrics."},
  {"slug": "zone-2-cardio", "atom_id": "zone-2-cardio", "title": "Zone 2 Cardio", "theme": "bio_emerald", "base_color": "#EF4444", "icon": "Activity", "category": "PHYS", "description": "Base aerobic capacity building.", "logic": "Optimize mitochondrial density and build a robust aerobic baseline for sustained energy production.", "protocol": ["Maintain a heart rate where you can hold a conversation but with effort.", "Perform for 45+ minutes to trigger mitochondrial biogenesis.", "Nasal breathing only to maintain autonomic nervous system control."], "perspectives": {"fortitude": "Engine maintenance. A low-capacity engine fails during high-intensity maneuvers. Build the endurance required to hold the line.", "reason": "Biological law. Aerobic capacity is the foundation of longevity. Rational men do not ignore the fundamental needs of the heart.", "visionary": "Building for the century. You need a heart that can sustain a hundred-year mission. Build the physiological engine for your legacy.", "analytical": "Lactate clearance optimization. Targeting maximum fat oxidation. Build the aerobic base to support higher-intensity peak metrics."}},
  {"slug": "strength-session", "title": "Strength Session", "theme": "slate_steel", "base_color": "#64748b", "icon": "Dumbbell", "category": "PHYS", "description": "Heavy resistance training."},
  {"slug": "ruck", "title": "Ruck", "theme": "combat_red", "base_color": "#ef4444", "icon": "Briefcase", "category": "PHYS", "description": "Weighted walking for durability."},
  {"slug": "sauna-heat", "title": "Sauna/Heat", "theme": "combat_red", "base_color": "#ef4444", "icon": "Flame", "category": "PHYS", "description": "Heat shock protein activation."},
  {"slug": "mobility", "title": "Mobility", "theme": "bio_emerald", "base_color": "#10b981", "icon": "RefreshCw", "category": "PHYS", "description": "Joint range of motion maintenance."},
  {"slug": "sport-play", "title": "Sport/Play", "theme": "maxi_blue", "base_color": "#2563eb", "icon": "Activity", "category": "PHYS", "description": "Dynamic movement and competition."},
  {"slug": "walk-jog", "title": "Walk/Jog", "theme": "bio_rig", "base_color": "#3b82f6", "icon": "Activity", "category": "PHYS", "description": "Low intensity movement."},
  {"slug": "hiit", "title": "HIIT", "theme": "combat_red", "base_color": "#ef4444", "icon": "Zap", "category": "PHYS", "description": "High intensity interval training."},
  {"slug": "yoga", "title": "Yoga", "theme": "neural_violet", "base_color": "#8b5cf6", "icon": "Activity", "category": "PHYS", "description": "Mind-body alignment and flexibility."},
  {"slug": "cold-plunge", "title": "Cold Plunge", "theme": "oxygen_cyan", "base_color": "#06b6d4", "icon": "Droplet", "category": "PHYS", "description": "Systemic inflammation reduction."},
  {"slug": "intermittent-fast", "atom_id": "intermittent-fast", "title": "Intermittent Fasting", "theme": "asset_lime", "base_color": "#10B981", "icon": "Timer", "category": "FUEL", "description": "Restricted feeding window.", "logic": "Stabilize insulin levels and trigger cellular autophagy to clear metabolic debris.", "protocol": ["Maintain a 16:8 ingestion window.", "Hydrate with water and electrolytes during the 'Off' phase.", "Break the fast with high-protein input to trigger muscle synthesis."], "perspectives": {"fortitude": "Resource management. Constant consumption is a supply chain failure. Train the system to survive and strike on internal reserves.", "reason": "Metabolic law. The human engine is designed to switch fuels. Prioritize insulin sensitivity as a first principle of health.", "visionary": "Mastery of appetite. You are not a slave to your stomach. Choosing when to eat is the ultimate claim of personal jurisdiction.", "analytical": "Input optimization. Data shows peak cognitive stability occurs in the fasted state. Eliminate the insulin spike to maintain high output."}},
  {"slug": "high-protein", "title": "High Protein", "theme": "asset_lime", "base_color": "#84cc16", "icon": "Dna", "category": "FUEL", "description": "Muscle synthesis priority."},
  {"slug": "electrolytes", "title": "Electrolytes", "theme": "oxygen_cyan", "base_color": "#06b6d4", "icon": "Zap", "category": "FUEL", "description": "Hydration optimization."},
  {"slug": "no-sugar", "title": "No Sugar", "theme": "combat_red", "base_color": "#ef4444", "icon": "Lock", "category": "FUEL", "description": "Glycemic control."},
  {"slug": "hydrate", "title": "Hydrate", "theme": "oxygen_cyan", "base_color": "#06b6d4", "icon": "Droplet", "category": "FUEL", "description": "Water intake baseline."},
  {"slug": "acv", "title": "ACV", "theme": "asset_lime", "base_color": "#84cc16", "icon": "Activity", "category": "FUEL", "description": "Apple Cider Vinegar protocol."},
  {"slug": "creatine", "title": "Creatine", "theme": "slate_steel", "base_color": "#64748b", "icon": "Zap", "category": "FUEL", "description": "Cognitive and physical fuel."},
  {"slug": "omega-3", "title": "Omega-3", "theme": "bio_emerald", "base_color": "#10b981", "icon": "Activity", "category": "FUEL", "description": "Anti-inflammatory fats."},
  {"slug": "fiber", "title": "Fiber", "theme": "bio_emerald", "base_color": "#10b981", "icon": "Activity", "category": "FUEL", "description": "Gut health foundation."},
  {"slug": "cheat-meal-reset", "title": "Cheat Meal Reset", "theme": "warning_amber", "base_color": "#f59e0b", "icon": "RefreshCw", "category": "FUEL", "description": "Planned metabolic flexibility."},
  {"slug": "deep-work", "title": "Deep Work", "theme": "neural_violet", "base_color": "#8b5cf6", "icon": "Zap", "category": "COG", "description": "Distraction-free focus block."},
  {"slug": "read-analog", "atom_id": "read-analog", "title": "Read (Analog)", "theme": "slate_steel", "base_color": "#3B82F6", "icon": "BookOpen", "category": "COG", "description": "Physical book reading.", "logic": "Build deep-work capacity and semantic knowledge accumulation without digital signal interference.", "protocol": ["Select a physical text (paper) to eliminate notification hijacking.", "Engage the 'Aegis Shield' (Phone in another room).", "Consume for 20+ minutes with zero task-switching."], "perspectives": {"fortitude": "Bunker protocol. Deep focus is a tactical asset. Close the door on external noise and sharpen your primary weapon: the mind.", "reason": "Rational ingestion. Information is the raw material of thought. Use analog media to ensure high-fidelity knowledge transfer.", "visionary": "Architecting the blueprint. Every page is a stone in the foundation of your legacy. Read like you are learning to rule your world.", "analytical": "Throughput maximization. Minimize task-switching costs. Analog input ensures 100% bandwidth allocation to the Prefrontal Cortex."}},
  {"slug": "no-phone-block", "title": "No-Phone Block", "theme": "black_box", "base_color": "#18181b", "icon": "Lock", "category": "COG", "description": "Digital separation period."},
  {"slug": "nsdr", "title": "NSDR", "theme": "neural_violet", "base_color": "#8b5cf6", "icon": "Moon", "category": "COG", "description": "Non-Sleep Deep Rest."},
  {"slug": "language", "title": "Language", "theme": "neural_violet", "base_color": "#8b5cf6", "icon": "MessageSquare", "category": "COG", "description": "Cognitive plasticity training."},
  {"slug": "skill-practice", "title": "Skill Practice", "theme": "maxi_blue", "base_color": "#2563eb", "icon": "Wrench", "category": "COG", "description": "Deliberate practice session."},
  {"slug": "writing", "title": "Writing", "theme": "slate_steel", "base_color": "#64748b", "icon": "PenTool", "category": "COG", "description": "Structuring thought."},
  {"slug": "podcast", "title": "Podcast", "theme": "neural_violet", "base_color": "#8b5cf6", "icon": "Headphones", "category": "COG", "description": "Passive learning."},
  {"slug": "pomodoro", "title": "Pomodoro", "theme": "combat_red", "base_color": "#ef4444", "icon": "Timer", "category": "COG", "description": "Interval focus cycles."},
  {"slug": "inbox-zero", "title": "Inbox Zero", "theme": "slate_steel", "base_color": "#64748b", "icon": "Mail", "category": "COG", "description": "Digital clutter clearance."},
  {"slug": "shadow-audit", "atom_id": "shadow-audit", "title": "The Shadow Audit", "theme": "warning_amber", "base_color": "#6366F1", "icon": "Moon", "category": "STOIC", "description": "Review of daily failures/wins.", "logic": "Close the day's open cognitive loops and architect tomorrow's primary tactical objectives.", "protocol": ["Review the day's 'War Logs' (What went right/wrong).", "Identify exactly where discipline drifted or where you lied to yourself.", "Lock in the Top 3 mission-critical tasks for tomorrow."], "perspectives": {"fortitude": "Post-mission debrief. Identify the breaches in your perimeter. Own the failures so you don't repeat them at 0600 tomorrow.", "reason": "Objective assessment. Remove the ego and view the day's data as a neutral observer. Correct the trajectory based on rational results.", "visionary": "Refining the horizon. The Shadow Audit ensures that today's mistakes do not become tomorrow's legacy. Stay the course.", "analytical": "Output variance report. Compare intended execution against actual results. Adjust the protocol for a more efficient 24-hour cycle."}},
  {"slug": "accountability-mirror", "title": "Accountability Mirror", "theme": "ghost_white", "base_color": "#f8fafc", "icon": "User", "category": "STOIC", "description": "Self-confrontation."},
  {"slug": "brain-dump", "title": "Brain Dump", "theme": "slate_steel", "base_color": "#64748b", "icon": "FileText", "category": "STOIC", "description": "Clear working memory."},
  {"slug": "meditation", "title": "Meditation", "theme": "neural_violet", "base_color": "#8b5cf6", "icon": "Zap", "category": "STOIC", "description": "Mindfulness practice."},
  {"slug": "box-breathing", "title": "Box Breathing", "theme": "oxygen_cyan", "base_color": "#06b6d4", "icon": "Wind", "category": "STOIC", "description": "Autonomic regulation."},
  {"slug": "visualization", "title": "Visualization", "theme": "neural_violet", "base_color": "#8b5cf6", "icon": "Eye", "category": "STOIC", "description": "Mental rehearsal."},
  {"slug": "gratitude", "title": "Gratitude", "theme": "bio_emerald", "base_color": "#10b981", "icon": "Heart", "category": "STOIC", "description": "Positive reinforcement."},
  {"slug": "digital-minimalism", "title": "Digital Minimalism", "theme": "black_box", "base_color": "#18181b", "icon": "Smartphone", "category": "STOIC", "description": "Intentional technology use."},
  {"slug": "silence", "title": "Silence", "theme": "ghost_white", "base_color": "#f8fafc", "icon": "MicOff", "category": "STOIC", "description": "Absence of input."},
  {"slug": "memento-mori", "title": "Memento Mori", "theme": "ghost_white", "base_color": "#f8fafc", "icon": "Skull", "category": "STOIC", "description": "Remembrance of death."},
  {"slug": "environment-clear", "title": "Environment Clear", "theme": "slate_steel", "base_color": "#64748b", "icon": "Trash", "category": "LOG", "description": "Physical space reset."},
  {"slug": "meal-prep", "title": "Meal Prep", "theme": "asset_lime", "base_color": "#84cc16", "icon": "Utensils", "category": "LOG", "description": "Nutritional logistics."},
  {"slug": "tomorrows-kit", "title": "Tomorrow’s Kit", "theme": "bio_rig", "base_color": "#3b82f6", "icon": "Briefcase", "category": "LOG", "description": "Pre-deployment staging."},
  {"slug": "financial-audit", "title": "Financial Audit", "theme": "bio_emerald", "base_color": "#10b981", "icon": "DollarSign", "category": "LOG", "description": "Resource check."},
  {"slug": "social-sync", "title": "Social Sync", "theme": "maxi_blue", "base_color": "#2563eb", "icon": "Users", "category": "LOG", "description": "Tribe connection."},
  {"slug": "home-maintenance", "title": "Home Maintenance", "theme": "slate_steel", "base_color": "#64748b", "icon": "Home", "category": "LOG", "description": "Base upkeep."},
  {"slug": "inbox-triage", "title": "Inbox Triage", "theme": "slate_steel", "base_color": "#64748b", "icon": "Inbox", "category": "LOG", "description": "Sorting communications."},
  {"slug": "grocery-run", "title": "Grocery Run", "theme": "asset_lime", "base_color": "#84cc16", "icon": "ShoppingCart", "category": "LOG", "description": "Supply run."},
  {"slug": "task-batching", "title": "Task Batching", "theme": "neural_violet", "base_color": "#8b5cf6", "icon": "Layers", "category": "LOG", "description": "Grouped execution."},
  {"slug": "weekly-review", "title": "Weekly Review", "theme": "warning_amber", "base_color": "#f59e0b", "icon": "Calendar", "category": "LOG", "description": "Strategic alignment."}
]

def generate_sql():
    table_name = "maximost_library_habits"

    print(f"-- Migration: 001_sovereign_60_seed.sql")
    print("-- Schema Hardening & Data Injection")
    print("")
    print("-- 1. Ensure Schema Support")
    print(f"ALTER TABLE {table_name} ADD COLUMN IF NOT EXISTS atom_id TEXT;")
    print(f"ALTER TABLE {table_name} ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{{}}'::jsonb;")
    print(f"ALTER TABLE {table_name} ADD COLUMN IF NOT EXISTS base_color TEXT;")
    print(f"ALTER TABLE {table_name} ADD COLUMN IF NOT EXISTS logic TEXT;")
    print("")
    print(f"-- Also ensure User Habits table has support")
    print("ALTER TABLE habits ADD COLUMN IF NOT EXISTS atom_id TEXT;")
    print("ALTER TABLE habits ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;")
    print("ALTER TABLE habits ADD COLUMN IF NOT EXISTS base_color TEXT;")
    print("ALTER TABLE habits ADD COLUMN IF NOT EXISTS logic TEXT;")
    print("")
    print("-- 5. Ensure Telemetry Logs Table")
    print("""
CREATE TABLE IF NOT EXISTS telemetry_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    source TEXT,
    payload JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE telemetry_logs ENABLE ROW LEVEL SECURITY;
-- Grants are tricky if roles differ, skipping specific grants assuming service_role has access.
""")
    print("")
    print(f"-- 2. Seed Library")

    for atom in ATOMS:
        slug = atom['slug']
        name = atom['title'].replace("'", "''")

        # Flatten logic into metadata as backup
        metadata = {}
        if 'description' in atom: metadata['description'] = atom['description']
        if 'logic' in atom: metadata['logic'] = atom['logic']
        if 'protocol' in atom: metadata['protocol'] = atom['protocol']
        if 'perspectives' in atom: metadata['perspectives'] = atom['perspectives']
        if 'base_color' in atom: metadata['base_color'] = atom['base_color']
        if 'atom_id' in atom: metadata['atom_id'] = atom['atom_id']

        metadata_json = json.dumps(metadata).replace("'", "''")

        category = atom.get('category', 'General')
        icon = atom.get('icon', 'Activity')
        theme = atom.get('theme', 'slate_steel')
        base_color = atom.get('base_color', '')
        logic = atom.get('logic', '').replace("'", "''")
        atom_id = atom.get('atom_id', slug)

        # Use simple INSERT with ON CONFLICT
        # We target columns: slug, name, category, icon, theme, metadata, base_color, atom_id, logic
        # Assuming table has them now (due to ALTER)

        print(f"""
INSERT INTO {table_name} (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('{slug}', '{name}', '{category}', '{icon}', '{theme}', '{metadata_json}'::jsonb, '{base_color}', '{atom_id}', '{logic}')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;
""")

    print("")
    print("-- 3. Sync User Habits")
    print("""
UPDATE habits h
SET
    metadata = l.metadata,
    base_color = l.base_color,
    atom_id = l.atom_id,
    logic = l.logic
FROM maximost_library_habits l
WHERE h.slug = l.slug;
""")

    print("")
    print("-- 4. Ensure Habit Logs has Metadata")
    print("ALTER TABLE habit_logs ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;")

if __name__ == "__main__":
    generate_sql()
