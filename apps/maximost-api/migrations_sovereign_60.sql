-- Migration: Seed Sovereign 60 into maximost_library_habits
-- Run this in Supabase SQL Editor


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('morning-sunlight', 'Morning Sunlight', 'BIO', 'Sun', 'bio_emerald', '{"description": "Anchor your circadian clock with outdoor light.", "logic": "Anchor the circadian clock and trigger the natural cortisol-to-serotonin release cascade.", "protocol": ["Exit the perimeter within 30 minutes of waking.", "Expose retinas to direct solar infrared (no sunglasses).", "Maintain exposure for 10\u201320 minutes depending on cloud density."], "perspectives": {"fortitude": "Field reconnaissance. A stagnant operator is a compromised operator. Verify your physical environment to initialize the day''s command.", "reason": "First principles. Align your biological hardware with the solar cycle to prevent logical drift and hormonal variance.", "visionary": "The Path begins at the horizon. You are architecting a high-performance legacy; it starts by claiming the morning jurisdiction.", "analytical": "Sensor calibration. Early photons reset the Suprachiasmatic Nucleus. Calibrate your internal baseline to ensure a 2200-hour shutdown."}, "base_color": "#F59E0B"}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('cold-exposure', 'Cold Exposure', 'BIO', 'Snowflake', 'oxygen_cyan', '{"description": "Control neurochemistry through thermal shock."}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('grounding', 'Grounding', 'BIO', 'Anchor', 'bio_emerald', '{"description": "Direct earth contact for inflammation/recovery."}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('red-light', 'Red Light', 'BIO', 'Zap', 'combat_red', '{"description": "Mitochondrial enhancement therapy."}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('magnesium', 'Magnesium', 'BIO', 'Activity', 'asset_lime', '{"description": "Essential mineral for nervous system regulation."}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('digital-dark', 'Digital Dark', 'BIO', 'Moon', 'black_box', '{"description": "Zero blue light/screens post-sunset."}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('blue-light-block', 'Blue Light Block', 'BIO', 'Eye', 'neural_violet', '{"description": "Protect melatonin production."}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('temperature-drop', 'Temperature Drop', 'BIO', 'Thermometer', 'bio_rig', '{"description": "Core body cooling for deep sleep onset."}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('mouth-tape', 'Mouth Tape', 'BIO', 'Wind', 'oxygen_cyan', '{"description": "Forced nasal breathing during sleep."}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('sleep-tracking', 'Sleep Tracking', 'BIO', 'Moon', 'slate_steel', '{"description": "Quantify recovery metrics."}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('zone-2-cardio', 'Zone 2 Cardio', 'PHYS', 'Activity', 'bio_emerald', '{"description": "Base aerobic capacity building.", "logic": "Optimize mitochondrial density and build a robust aerobic baseline for sustained energy production.", "protocol": ["Maintain a heart rate where you can hold a conversation but with effort.", "Perform for 45+ minutes to trigger mitochondrial biogenesis.", "Nasal breathing only to maintain autonomic nervous system control."], "perspectives": {"fortitude": "Engine maintenance. A low-capacity engine fails during high-intensity maneuvers. Build the endurance required to hold the line.", "reason": "Biological law. Aerobic capacity is the foundation of longevity. Rational men do not ignore the fundamental needs of the heart.", "visionary": "Building for the century. You need a heart that can sustain a hundred-year mission. Build the physiological engine for your legacy.", "analytical": "Lactate clearance optimization. Targeting maximum fat oxidation. Build the aerobic base to support higher-intensity peak metrics."}, "base_color": "#EF4444"}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('strength-session', 'Strength Session', 'PHYS', 'Dumbbell', 'slate_steel', '{"description": "Heavy resistance training."}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('ruck', 'Ruck', 'PHYS', 'Briefcase', 'combat_red', '{"description": "Weighted walking for durability."}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('sauna-heat', 'Sauna/Heat', 'PHYS', 'Flame', 'combat_red', '{"description": "Heat shock protein activation."}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('mobility', 'Mobility', 'PHYS', 'RefreshCw', 'bio_emerald', '{"description": "Joint range of motion maintenance."}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('sport-play', 'Sport/Play', 'PHYS', 'Activity', 'maxi_blue', '{"description": "Dynamic movement and competition."}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('walk-jog', 'Walk/Jog', 'PHYS', 'Activity', 'bio_rig', '{"description": "Low intensity movement."}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('hiit', 'HIIT', 'PHYS', 'Zap', 'combat_red', '{"description": "High intensity interval training."}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('yoga', 'Yoga', 'PHYS', 'Activity', 'neural_violet', '{"description": "Mind-body alignment and flexibility."}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('cold-plunge', 'Cold Plunge', 'PHYS', 'Droplet', 'oxygen_cyan', '{"description": "Systemic inflammation reduction."}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('intermittent-fast', 'Intermittent Fasting', 'FUEL', 'Timer', 'asset_lime', '{"description": "Restricted feeding window.", "logic": "Stabilize insulin levels and trigger cellular autophagy to clear metabolic debris.", "protocol": ["Maintain a 16:8 ingestion window.", "Hydrate with water and electrolytes during the ''Off'' phase.", "Break the fast with high-protein input to trigger muscle synthesis."], "perspectives": {"fortitude": "Resource management. Constant consumption is a supply chain failure. Train the system to survive and strike on internal reserves.", "reason": "Metabolic law. The human engine is designed to switch fuels. Prioritize insulin sensitivity as a first principle of health.", "visionary": "Mastery of appetite. You are not a slave to your stomach. Choosing when to eat is the ultimate claim of personal jurisdiction.", "analytical": "Input optimization. Data shows peak cognitive stability occurs in the fasted state. Eliminate the insulin spike to maintain high output."}, "base_color": "#10B981"}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('high-protein', 'High Protein', 'FUEL', 'Dna', 'asset_lime', '{"description": "Muscle synthesis priority."}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('electrolytes', 'Electrolytes', 'FUEL', 'Zap', 'oxygen_cyan', '{"description": "Hydration optimization."}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('no-sugar', 'No Sugar', 'FUEL', 'Lock', 'combat_red', '{"description": "Glycemic control."}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('hydrate', 'Hydrate', 'FUEL', 'Droplet', 'oxygen_cyan', '{"description": "Water intake baseline."}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('acv', 'ACV', 'FUEL', 'Activity', 'asset_lime', '{"description": "Apple Cider Vinegar protocol."}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('creatine', 'Creatine', 'FUEL', 'Zap', 'slate_steel', '{"description": "Cognitive and physical fuel."}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('omega-3', 'Omega-3', 'FUEL', 'Activity', 'bio_emerald', '{"description": "Anti-inflammatory fats."}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('fiber', 'Fiber', 'FUEL', 'Activity', 'bio_emerald', '{"description": "Gut health foundation."}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('cheat-meal-reset', 'Cheat Meal Reset', 'FUEL', 'RefreshCw', 'warning_amber', '{"description": "Planned metabolic flexibility."}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('deep-work', 'Deep Work', 'COG', 'Zap', 'neural_violet', '{"description": "Distraction-free focus block."}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('read-analog', 'Read (Analog)', 'COG', 'BookOpen', 'slate_steel', '{"description": "Physical book reading.", "logic": "Build deep-work capacity and semantic knowledge accumulation without digital signal interference.", "protocol": ["Select a physical text (paper) to eliminate notification hijacking.", "Engage the ''Aegis Shield'' (Phone in another room).", "Consume for 20+ minutes with zero task-switching."], "perspectives": {"fortitude": "Bunker protocol. Deep focus is a tactical asset. Close the door on external noise and sharpen your primary weapon: the mind.", "reason": "Rational ingestion. Information is the raw material of thought. Use analog media to ensure high-fidelity knowledge transfer.", "visionary": "Architecting the blueprint. Every page is a stone in the foundation of your legacy. Read like you are learning to rule your world.", "analytical": "Throughput maximization. Minimize task-switching costs. Analog input ensures 100% bandwidth allocation to the Prefrontal Cortex."}, "base_color": "#3B82F6"}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('no-phone-block', 'No-Phone Block', 'COG', 'Lock', 'black_box', '{"description": "Digital separation period."}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('nsdr', 'NSDR', 'COG', 'Moon', 'neural_violet', '{"description": "Non-Sleep Deep Rest."}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('language', 'Language', 'COG', 'MessageSquare', 'neural_violet', '{"description": "Cognitive plasticity training."}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('skill-practice', 'Skill Practice', 'COG', 'Wrench', 'maxi_blue', '{"description": "Deliberate practice session."}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('writing', 'Writing', 'COG', 'PenTool', 'slate_steel', '{"description": "Structuring thought."}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('podcast', 'Podcast', 'COG', 'Headphones', 'neural_violet', '{"description": "Passive learning."}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('pomodoro', 'Pomodoro', 'COG', 'Timer', 'combat_red', '{"description": "Interval focus cycles."}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('inbox-zero', 'Inbox Zero', 'COG', 'Mail', 'slate_steel', '{"description": "Digital clutter clearance."}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('shadow-audit', 'The Shadow Audit', 'STOIC', 'Moon', 'warning_amber', '{"description": "Review of daily failures/wins.", "logic": "Close the day''s open cognitive loops and architect tomorrow''s primary tactical objectives.", "protocol": ["Review the day''s ''War Logs'' (What went right/wrong).", "Identify exactly where discipline drifted or where you lied to yourself.", "Lock in the Top 3 mission-critical tasks for tomorrow."], "perspectives": {"fortitude": "Post-mission debrief. Identify the breaches in your perimeter. Own the failures so you don''t repeat them at 0600 tomorrow.", "reason": "Objective assessment. Remove the ego and view the day''s data as a neutral observer. Correct the trajectory based on rational results.", "visionary": "Refining the horizon. The Shadow Audit ensures that today''s mistakes do not become tomorrow''s legacy. Stay the course.", "analytical": "Output variance report. Compare intended execution against actual results. Adjust the protocol for a more efficient 24-hour cycle."}, "base_color": "#6366F1"}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('accountability-mirror', 'Accountability Mirror', 'STOIC', 'User', 'ghost_white', '{"description": "Self-confrontation."}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('brain-dump', 'Brain Dump', 'STOIC', 'FileText', 'slate_steel', '{"description": "Clear working memory."}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('meditation', 'Meditation', 'STOIC', 'Zap', 'neural_violet', '{"description": "Mindfulness practice."}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('box-breathing', 'Box Breathing', 'STOIC', 'Wind', 'oxygen_cyan', '{"description": "Autonomic regulation."}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('visualization', 'Visualization', 'STOIC', 'Eye', 'neural_violet', '{"description": "Mental rehearsal."}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('gratitude', 'Gratitude', 'STOIC', 'Heart', 'bio_emerald', '{"description": "Positive reinforcement."}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('digital-minimalism', 'Digital Minimalism', 'STOIC', 'Smartphone', 'black_box', '{"description": "Intentional technology use."}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('silence', 'Silence', 'STOIC', 'MicOff', 'ghost_white', '{"description": "Absence of input."}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('memento-mori', 'Memento Mori', 'STOIC', 'Skull', 'ghost_white', '{"description": "Remembrance of death."}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('environment-clear', 'Environment Clear', 'LOG', 'Trash', 'slate_steel', '{"description": "Physical space reset."}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('meal-prep', 'Meal Prep', 'LOG', 'Utensils', 'asset_lime', '{"description": "Nutritional logistics."}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('tomorrows-kit', 'Tomorrow’s Kit', 'LOG', 'Briefcase', 'bio_rig', '{"description": "Pre-deployment staging."}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('financial-audit', 'Financial Audit', 'LOG', 'DollarSign', 'bio_emerald', '{"description": "Resource check."}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('social-sync', 'Social Sync', 'LOG', 'Users', 'maxi_blue', '{"description": "Tribe connection."}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('home-maintenance', 'Home Maintenance', 'LOG', 'Home', 'slate_steel', '{"description": "Base upkeep."}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('inbox-triage', 'Inbox Triage', 'LOG', 'Inbox', 'slate_steel', '{"description": "Sorting communications."}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('grocery-run', 'Grocery Run', 'LOG', 'ShoppingCart', 'asset_lime', '{"description": "Supply run."}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('task-batching', 'Task Batching', 'LOG', 'Layers', 'neural_violet', '{"description": "Grouped execution."}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;


INSERT INTO maximost_library_habits (slug, name, category, icon, theme, metadata)
VALUES ('weekly-review', 'Weekly Review', 'LOG', 'Calendar', 'warning_amber', '{"description": "Strategic alignment."}'::jsonb)
ON CONFLICT (slug) DO UPDATE SET
name = EXCLUDED.name,
category = EXCLUDED.category,
icon = EXCLUDED.icon,
theme = EXCLUDED.theme,
metadata = EXCLUDED.metadata;
