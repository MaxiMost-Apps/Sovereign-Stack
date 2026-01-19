-- Migration: 001_sovereign_60_seed.sql
-- Schema Hardening & Data Injection

-- 1. Ensure Schema Support
ALTER TABLE maximost_library_habits ADD COLUMN IF NOT EXISTS atom_id TEXT;
ALTER TABLE maximost_library_habits ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;
ALTER TABLE maximost_library_habits ADD COLUMN IF NOT EXISTS base_color TEXT;
ALTER TABLE maximost_library_habits ADD COLUMN IF NOT EXISTS logic TEXT;

-- Also ensure User Habits table has support
ALTER TABLE habits ADD COLUMN IF NOT EXISTS atom_id TEXT;
ALTER TABLE habits ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;
ALTER TABLE habits ADD COLUMN IF NOT EXISTS base_color TEXT;
ALTER TABLE habits ADD COLUMN IF NOT EXISTS logic TEXT;

-- 5. Ensure Telemetry Logs Table

CREATE TABLE IF NOT EXISTS telemetry_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    source TEXT,
    payload JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE telemetry_logs ENABLE ROW LEVEL SECURITY;
-- Grants are tricky if roles differ, skipping specific grants assuming service_role has access.


-- 2. Seed Library

INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('morning-sunlight', 'Morning Sunlight', 'BIO', 'Sun', 'bio_emerald', '{"description": "Anchor your circadian clock with outdoor light.", "logic": "Anchor the circadian clock and trigger the natural cortisol-to-serotonin release cascade.", "protocol": ["Exit the perimeter within 30 minutes of waking.", "Expose retinas to direct solar infrared (no sunglasses).", "Maintain exposure for 10\u201320 minutes depending on cloud density."], "perspectives": {"fortitude": "Field reconnaissance. A stagnant operator is a compromised operator. Verify your physical environment to initialize the day''s command.", "reason": "First principles. Align your biological hardware with the solar cycle to prevent logical drift and hormonal variance.", "visionary": "The Path begins at the horizon. You are architecting a high-performance legacy; it starts by claiming the morning jurisdiction.", "analytical": "Sensor calibration. Early photons reset the Suprachiasmatic Nucleus. Calibrate your internal baseline to ensure a 2200-hour shutdown."}, "base_color": "#F59E0B", "atom_id": "morning-sunlight"}'::jsonb, '#F59E0B', 'morning-sunlight', 'Anchor the circadian clock and trigger the natural cortisol-to-serotonin release cascade.')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('cold-exposure', 'Cold Exposure', 'BIO', 'Snowflake', 'oxygen_cyan', '{"description": "Control neurochemistry through thermal shock.", "base_color": "#06b6d4"}'::jsonb, '#06b6d4', 'cold-exposure', '')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('grounding', 'Grounding', 'BIO', 'Anchor', 'bio_emerald', '{"description": "Direct earth contact for inflammation/recovery.", "base_color": "#10b981"}'::jsonb, '#10b981', 'grounding', '')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('red-light', 'Red Light', 'BIO', 'Zap', 'combat_red', '{"description": "Mitochondrial enhancement therapy.", "base_color": "#ef4444"}'::jsonb, '#ef4444', 'red-light', '')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('magnesium', 'Magnesium', 'BIO', 'Activity', 'asset_lime', '{"description": "Essential mineral for nervous system regulation.", "base_color": "#84cc16"}'::jsonb, '#84cc16', 'magnesium', '')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('digital-dark', 'Digital Dark', 'BIO', 'Moon', 'black_box', '{"description": "Zero blue light/screens post-sunset.", "base_color": "#18181b"}'::jsonb, '#18181b', 'digital-dark', '')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('blue-light-block', 'Blue Light Block', 'BIO', 'Eye', 'neural_violet', '{"description": "Protect melatonin production.", "base_color": "#8b5cf6"}'::jsonb, '#8b5cf6', 'blue-light-block', '')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('temperature-drop', 'Temperature Drop', 'BIO', 'Thermometer', 'bio_rig', '{"description": "Core body cooling for deep sleep onset.", "base_color": "#3b82f6"}'::jsonb, '#3b82f6', 'temperature-drop', '')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('mouth-tape', 'Mouth Tape', 'BIO', 'Wind', 'oxygen_cyan', '{"description": "Forced nasal breathing during sleep.", "base_color": "#06b6d4"}'::jsonb, '#06b6d4', 'mouth-tape', '')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('sleep-tracking', 'Sleep Tracking', 'BIO', 'Moon', 'slate_steel', '{"description": "Quantify recovery metrics.", "base_color": "#64748b"}'::jsonb, '#64748b', 'sleep-tracking', '')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('zone-2-cardio', 'Zone 2 Cardio', 'PHYS', 'Activity', 'bio_emerald', '{"description": "Base aerobic capacity building.", "logic": "Optimize mitochondrial density and build a robust aerobic baseline for sustained energy production.", "protocol": ["Maintain a heart rate where you can hold a conversation but with effort.", "Perform for 45+ minutes to trigger mitochondrial biogenesis.", "Nasal breathing only to maintain autonomic nervous system control."], "perspectives": {"fortitude": "Engine maintenance. A low-capacity engine fails during high-intensity maneuvers. Build the endurance required to hold the line.", "reason": "Biological law. Aerobic capacity is the foundation of longevity. Rational men do not ignore the fundamental needs of the heart.", "visionary": "Building for the century. You need a heart that can sustain a hundred-year mission. Build the physiological engine for your legacy.", "analytical": "Lactate clearance optimization. Targeting maximum fat oxidation. Build the aerobic base to support higher-intensity peak metrics."}, "base_color": "#EF4444", "atom_id": "zone-2-cardio"}'::jsonb, '#EF4444', 'zone-2-cardio', 'Optimize mitochondrial density and build a robust aerobic baseline for sustained energy production.')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('strength-session', 'Strength Session', 'PHYS', 'Dumbbell', 'slate_steel', '{"description": "Heavy resistance training.", "base_color": "#64748b"}'::jsonb, '#64748b', 'strength-session', '')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('ruck', 'Ruck', 'PHYS', 'Briefcase', 'combat_red', '{"description": "Weighted walking for durability.", "base_color": "#ef4444"}'::jsonb, '#ef4444', 'ruck', '')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('sauna-heat', 'Sauna/Heat', 'PHYS', 'Flame', 'combat_red', '{"description": "Heat shock protein activation.", "base_color": "#ef4444"}'::jsonb, '#ef4444', 'sauna-heat', '')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('mobility', 'Mobility', 'PHYS', 'RefreshCw', 'bio_emerald', '{"description": "Joint range of motion maintenance.", "base_color": "#10b981"}'::jsonb, '#10b981', 'mobility', '')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('sport-play', 'Sport/Play', 'PHYS', 'Activity', 'maxi_blue', '{"description": "Dynamic movement and competition.", "base_color": "#2563eb"}'::jsonb, '#2563eb', 'sport-play', '')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('walk-jog', 'Walk/Jog', 'PHYS', 'Activity', 'bio_rig', '{"description": "Low intensity movement.", "base_color": "#3b82f6"}'::jsonb, '#3b82f6', 'walk-jog', '')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('hiit', 'HIIT', 'PHYS', 'Zap', 'combat_red', '{"description": "High intensity interval training.", "base_color": "#ef4444"}'::jsonb, '#ef4444', 'hiit', '')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('yoga', 'Yoga', 'PHYS', 'Activity', 'neural_violet', '{"description": "Mind-body alignment and flexibility.", "base_color": "#8b5cf6"}'::jsonb, '#8b5cf6', 'yoga', '')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('cold-plunge', 'Cold Plunge', 'PHYS', 'Droplet', 'oxygen_cyan', '{"description": "Systemic inflammation reduction.", "base_color": "#06b6d4"}'::jsonb, '#06b6d4', 'cold-plunge', '')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('intermittent-fast', 'Intermittent Fasting', 'FUEL', 'Timer', 'asset_lime', '{"description": "Restricted feeding window.", "logic": "Stabilize insulin levels and trigger cellular autophagy to clear metabolic debris.", "protocol": ["Maintain a 16:8 ingestion window.", "Hydrate with water and electrolytes during the ''Off'' phase.", "Break the fast with high-protein input to trigger muscle synthesis."], "perspectives": {"fortitude": "Resource management. Constant consumption is a supply chain failure. Train the system to survive and strike on internal reserves.", "reason": "Metabolic law. The human engine is designed to switch fuels. Prioritize insulin sensitivity as a first principle of health.", "visionary": "Mastery of appetite. You are not a slave to your stomach. Choosing when to eat is the ultimate claim of personal jurisdiction.", "analytical": "Input optimization. Data shows peak cognitive stability occurs in the fasted state. Eliminate the insulin spike to maintain high output."}, "base_color": "#10B981", "atom_id": "intermittent-fast"}'::jsonb, '#10B981', 'intermittent-fast', 'Stabilize insulin levels and trigger cellular autophagy to clear metabolic debris.')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('high-protein', 'High Protein', 'FUEL', 'Dna', 'asset_lime', '{"description": "Muscle synthesis priority.", "base_color": "#84cc16"}'::jsonb, '#84cc16', 'high-protein', '')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('electrolytes', 'Electrolytes', 'FUEL', 'Zap', 'oxygen_cyan', '{"description": "Hydration optimization.", "base_color": "#06b6d4"}'::jsonb, '#06b6d4', 'electrolytes', '')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('no-sugar', 'No Sugar', 'FUEL', 'Lock', 'combat_red', '{"description": "Glycemic control.", "base_color": "#ef4444"}'::jsonb, '#ef4444', 'no-sugar', '')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('hydrate', 'Hydrate', 'FUEL', 'Droplet', 'oxygen_cyan', '{"description": "Water intake baseline.", "base_color": "#06b6d4"}'::jsonb, '#06b6d4', 'hydrate', '')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('acv', 'ACV', 'FUEL', 'Activity', 'asset_lime', '{"description": "Apple Cider Vinegar protocol.", "base_color": "#84cc16"}'::jsonb, '#84cc16', 'acv', '')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('creatine', 'Creatine', 'FUEL', 'Zap', 'slate_steel', '{"description": "Cognitive and physical fuel.", "base_color": "#64748b"}'::jsonb, '#64748b', 'creatine', '')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('omega-3', 'Omega-3', 'FUEL', 'Activity', 'bio_emerald', '{"description": "Anti-inflammatory fats.", "base_color": "#10b981"}'::jsonb, '#10b981', 'omega-3', '')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('fiber', 'Fiber', 'FUEL', 'Activity', 'bio_emerald', '{"description": "Gut health foundation.", "base_color": "#10b981"}'::jsonb, '#10b981', 'fiber', '')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('cheat-meal-reset', 'Cheat Meal Reset', 'FUEL', 'RefreshCw', 'warning_amber', '{"description": "Planned metabolic flexibility.", "base_color": "#f59e0b"}'::jsonb, '#f59e0b', 'cheat-meal-reset', '')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('deep-work', 'Deep Work', 'COG', 'Zap', 'neural_violet', '{"description": "Distraction-free focus block.", "base_color": "#8b5cf6"}'::jsonb, '#8b5cf6', 'deep-work', '')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('read-analog', 'Read (Analog)', 'COG', 'BookOpen', 'slate_steel', '{"description": "Physical book reading.", "logic": "Build deep-work capacity and semantic knowledge accumulation without digital signal interference.", "protocol": ["Select a physical text (paper) to eliminate notification hijacking.", "Engage the ''Aegis Shield'' (Phone in another room).", "Consume for 20+ minutes with zero task-switching."], "perspectives": {"fortitude": "Bunker protocol. Deep focus is a tactical asset. Close the door on external noise and sharpen your primary weapon: the mind.", "reason": "Rational ingestion. Information is the raw material of thought. Use analog media to ensure high-fidelity knowledge transfer.", "visionary": "Architecting the blueprint. Every page is a stone in the foundation of your legacy. Read like you are learning to rule your world.", "analytical": "Throughput maximization. Minimize task-switching costs. Analog input ensures 100% bandwidth allocation to the Prefrontal Cortex."}, "base_color": "#3B82F6", "atom_id": "read-analog"}'::jsonb, '#3B82F6', 'read-analog', 'Build deep-work capacity and semantic knowledge accumulation without digital signal interference.')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('no-phone-block', 'No-Phone Block', 'COG', 'Lock', 'black_box', '{"description": "Digital separation period.", "base_color": "#18181b"}'::jsonb, '#18181b', 'no-phone-block', '')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('nsdr', 'NSDR', 'COG', 'Moon', 'neural_violet', '{"description": "Non-Sleep Deep Rest.", "base_color": "#8b5cf6"}'::jsonb, '#8b5cf6', 'nsdr', '')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('language', 'Language', 'COG', 'MessageSquare', 'neural_violet', '{"description": "Cognitive plasticity training.", "base_color": "#8b5cf6"}'::jsonb, '#8b5cf6', 'language', '')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('skill-practice', 'Skill Practice', 'COG', 'Wrench', 'maxi_blue', '{"description": "Deliberate practice session.", "base_color": "#2563eb"}'::jsonb, '#2563eb', 'skill-practice', '')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('writing', 'Writing', 'COG', 'PenTool', 'slate_steel', '{"description": "Structuring thought.", "base_color": "#64748b"}'::jsonb, '#64748b', 'writing', '')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('podcast', 'Podcast', 'COG', 'Headphones', 'neural_violet', '{"description": "Passive learning.", "base_color": "#8b5cf6"}'::jsonb, '#8b5cf6', 'podcast', '')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('pomodoro', 'Pomodoro', 'COG', 'Timer', 'combat_red', '{"description": "Interval focus cycles.", "base_color": "#ef4444"}'::jsonb, '#ef4444', 'pomodoro', '')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('inbox-zero', 'Inbox Zero', 'COG', 'Mail', 'slate_steel', '{"description": "Digital clutter clearance.", "base_color": "#64748b"}'::jsonb, '#64748b', 'inbox-zero', '')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('shadow-audit', 'The Shadow Audit', 'STOIC', 'Moon', 'warning_amber', '{"description": "Review of daily failures/wins.", "logic": "Close the day''s open cognitive loops and architect tomorrow''s primary tactical objectives.", "protocol": ["Review the day''s ''War Logs'' (What went right/wrong).", "Identify exactly where discipline drifted or where you lied to yourself.", "Lock in the Top 3 mission-critical tasks for tomorrow."], "perspectives": {"fortitude": "Post-mission debrief. Identify the breaches in your perimeter. Own the failures so you don''t repeat them at 0600 tomorrow.", "reason": "Objective assessment. Remove the ego and view the day''s data as a neutral observer. Correct the trajectory based on rational results.", "visionary": "Refining the horizon. The Shadow Audit ensures that today''s mistakes do not become tomorrow''s legacy. Stay the course.", "analytical": "Output variance report. Compare intended execution against actual results. Adjust the protocol for a more efficient 24-hour cycle."}, "base_color": "#6366F1", "atom_id": "shadow-audit"}'::jsonb, '#6366F1', 'shadow-audit', 'Close the day''s open cognitive loops and architect tomorrow''s primary tactical objectives.')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('accountability-mirror', 'Accountability Mirror', 'STOIC', 'User', 'ghost_white', '{"description": "Self-confrontation.", "base_color": "#f8fafc"}'::jsonb, '#f8fafc', 'accountability-mirror', '')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('brain-dump', 'Brain Dump', 'STOIC', 'FileText', 'slate_steel', '{"description": "Clear working memory.", "base_color": "#64748b"}'::jsonb, '#64748b', 'brain-dump', '')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('meditation', 'Meditation', 'STOIC', 'Zap', 'neural_violet', '{"description": "Mindfulness practice.", "base_color": "#8b5cf6"}'::jsonb, '#8b5cf6', 'meditation', '')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('box-breathing', 'Box Breathing', 'STOIC', 'Wind', 'oxygen_cyan', '{"description": "Autonomic regulation.", "base_color": "#06b6d4"}'::jsonb, '#06b6d4', 'box-breathing', '')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('visualization', 'Visualization', 'STOIC', 'Eye', 'neural_violet', '{"description": "Mental rehearsal.", "base_color": "#8b5cf6"}'::jsonb, '#8b5cf6', 'visualization', '')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('gratitude', 'Gratitude', 'STOIC', 'Heart', 'bio_emerald', '{"description": "Positive reinforcement.", "base_color": "#10b981"}'::jsonb, '#10b981', 'gratitude', '')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('digital-minimalism', 'Digital Minimalism', 'STOIC', 'Smartphone', 'black_box', '{"description": "Intentional technology use.", "base_color": "#18181b"}'::jsonb, '#18181b', 'digital-minimalism', '')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('silence', 'Silence', 'STOIC', 'MicOff', 'ghost_white', '{"description": "Absence of input.", "base_color": "#f8fafc"}'::jsonb, '#f8fafc', 'silence', '')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('memento-mori', 'Memento Mori', 'STOIC', 'Skull', 'ghost_white', '{"description": "Remembrance of death.", "base_color": "#f8fafc"}'::jsonb, '#f8fafc', 'memento-mori', '')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('environment-clear', 'Environment Clear', 'LOG', 'Trash', 'slate_steel', '{"description": "Physical space reset.", "base_color": "#64748b"}'::jsonb, '#64748b', 'environment-clear', '')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('meal-prep', 'Meal Prep', 'LOG', 'Utensils', 'asset_lime', '{"description": "Nutritional logistics.", "base_color": "#84cc16"}'::jsonb, '#84cc16', 'meal-prep', '')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('tomorrows-kit', 'Tomorrow’s Kit', 'LOG', 'Briefcase', 'bio_rig', '{"description": "Pre-deployment staging.", "base_color": "#3b82f6"}'::jsonb, '#3b82f6', 'tomorrows-kit', '')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('financial-audit', 'Financial Audit', 'LOG', 'DollarSign', 'bio_emerald', '{"description": "Resource check.", "base_color": "#10b981"}'::jsonb, '#10b981', 'financial-audit', '')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('social-sync', 'Social Sync', 'LOG', 'Users', 'maxi_blue', '{"description": "Tribe connection.", "base_color": "#2563eb"}'::jsonb, '#2563eb', 'social-sync', '')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('home-maintenance', 'Home Maintenance', 'LOG', 'Home', 'slate_steel', '{"description": "Base upkeep.", "base_color": "#64748b"}'::jsonb, '#64748b', 'home-maintenance', '')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('inbox-triage', 'Inbox Triage', 'LOG', 'Inbox', 'slate_steel', '{"description": "Sorting communications.", "base_color": "#64748b"}'::jsonb, '#64748b', 'inbox-triage', '')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('grocery-run', 'Grocery Run', 'LOG', 'ShoppingCart', 'asset_lime', '{"description": "Supply run.", "base_color": "#84cc16"}'::jsonb, '#84cc16', 'grocery-run', '')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('task-batching', 'Task Batching', 'LOG', 'Layers', 'neural_violet', '{"description": "Grouped execution.", "base_color": "#8b5cf6"}'::jsonb, '#8b5cf6', 'task-batching', '')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata, base_color, atom_id, logic)
VALUES ('weekly-review', 'Weekly Review', 'LOG', 'Calendar', 'warning_amber', '{"description": "Strategic alignment.", "base_color": "#f59e0b"}'::jsonb, '#f59e0b', 'weekly-review', '')
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata,
base_color = EXCLUDED.base_color,
atom_id = EXCLUDED.atom_id,
logic = EXCLUDED.logic;


-- 3. Sync User Habits

UPDATE habits h
SET
    metadata = l.metadata,
    base_color = l.base_color,
    atom_id = l.atom_id,
    logic = l.logic
FROM maximost_library_habits l
WHERE h.slug = l.slug;


-- 4. Ensure Habit Logs has Metadata
ALTER TABLE habit_logs ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;
