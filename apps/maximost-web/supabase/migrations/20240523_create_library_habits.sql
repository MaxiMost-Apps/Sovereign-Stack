-- Create library_habits table
CREATE TABLE IF NOT EXISTS library_habits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL UNIQUE,
  theme TEXT NOT NULL,
  icon TEXT NOT NULL,
  category TEXT,
  how_instruction TEXT,
  why_instruction TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE library_habits ENABLE ROW LEVEL SECURITY;

-- Allow Read for All Users
CREATE POLICY "Enable read access for all users" ON library_habits FOR SELECT USING (true);

-- Insert Big Bang Data
INSERT INTO library_habits (title, theme, icon, how_instruction, why_instruction, category) VALUES
  ('Morning Sunlight', 'bio_emerald', 'Sun', 'Get 10-20m of low-angle sunlight within 60m of waking. On cloudy days, stay for 30m.', 'Anchors circadian clock, triggers morning cortisol, and sets the melatonin timer for sleep.', 'nav_computer'),
  ('Zone 2 Cardio', 'bio_emerald', 'Activity', '40 mins of steady-state exercise at a pace where you can still hold a conversation.', 'Builds mitochondrial density and the metabolic foundation for longevity (Attia).', 'bio_rig'),
  ('Intermittent Fasting', 'asset_lime', 'Timer', 'Restrict eating window (e.g., 16:8). Fast for 16 hours. Hydrate with water/electrolytes only.', 'Triggers autophagy (cellular cleanup) and stabilizes insulin sensitivity.', 'bio_rig'),
  ('The Shadow Audit', 'warning_amber', 'PenTool', 'Ruthless evening review of drifts and lies told today. No ego. Only data.', 'Radical honesty is the only path to identifying and fixing patterns of failure.', 'black_box'),
  ('The Accountability Mirror', 'ghost_white', 'Eye', 'Look yourself in the eye and state your brutal truths, insecurities, and goals.', 'Based on Goggins. Removes self-deception by confronting the physical and mental truth.', 'black_box'),
  ('Deep Work Bout', 'neural_violet', 'Zap', '90 mins of distraction-free focus. Phone in another room. Single high-value task.', 'Cal Newport''s protocol for achieving flow and producing elite-level output.', 'kinetic_core'),
  ('Memento Mori', 'ghost_white', 'Lock', 'Meditate for 2 mins on your mortality. Remind yourself this is not a drill.', 'Stoic practice to strip away trivialities and clarify immediate priorities.', 'armor_plating'),
  ('Premeditatio Malorum', 'warning_amber', 'Shield', 'Visualize exactly what could go wrong today. Develop tactical responses for each scenario.', 'Removes the shock of misfortune and ensures calm execution under pressure.', 'armor_plating'),
  ('Digital Sunset', 'sunset_indigo', 'Moon', 'Remove blue light and high-dopamine inputs 60m before bed.', 'Allows melatonin to rise naturally for restorative REM sleep (Walker).', 'black_box'),
  ('Cold Exposure', 'oxygen_cyan', 'Droplet', '1-3 mins in cold water (<50°F). Do not dry off immediately; let the body reheat naturally.', 'Triggers 250% increase in baseline dopamine and builds cold-shock resilience (Huberman).', 'bio_rig'),
  ('Nasal Breathing', 'oxygen_cyan', 'Activity', 'Focus on 100% nasal breathing during exercise and sleep (use mouth tape if needed).', 'Filters air, increases nitric oxide, and optimizes CO2/O2 balance (Nestor).', 'bio_rig'),
  ('Heavy Lifting', 'slate_steel', 'Dumbbell', 'High-intensity resistance training focusing on compound lifts (Push/Pull/Squat).', 'Muscle mass is the primary predictor of healthspan and skeletal integrity (Attia).', 'bio_rig'),
  ('The Cookie Jar', 'warning_amber', 'Trophy', 'Reflect on a past victory or hardship overcome when internal resistance is high.', 'Goggins'' protocol for accessing mental fuel during moments of extreme suffering.', 'black_box'),
  ('Prioritize & Execute', 'maxi_blue', 'Target', 'Detach from the chaos, pick the single most impactful task, and neutralize it.', 'Jocko''s Law of Combat for maintaining clarity and momentum under pressure.', 'kinetic_core'),
  ('Dopamine Fast', 'neural_violet', 'Lock', '24 hours without high-stimulation inputs (Social media, video games, refined sugar).', 'Resets the brain''s reward baseline to combat addiction and lethargy (Lembke).', 'black_box'),
  ('Box Breathing', 'oxygen_cyan', 'Activity', 'Inhale 4s, Hold 4s, Exhale 4s, Hold 4s. Repeat for 5-10 cycles.', 'Tactical nerve reset used by SEALs to lower heart rate and restore calm.', 'bio_rig'),
  ('Shutdown Ritual', 'sunset_indigo', 'RotateCcw', 'Close all open tasks, plan the next day''s ''Big 3'', and say ''Shutdown Complete''.', 'Cal Newport''s method for clearing ''attention residue'' and protecting evening rest.', 'black_box'),
  ('1% Better (Identity)', 'maxi_blue', 'Target', 'Focus on one small win today that reinforces the person you are becoming.', 'Atomic Habits logic: systems outperform goals. Small wins compound into identity shifts.', 'nav_computer'),
  ('Amor Fati', 'slate_steel', 'RotateCcw', 'Embrace a setback today as if you specifically chose it for your own growth.', 'The Stoic practice of loving fate rather than just tolerating it.', 'armor_plating'),
  ('Taking Souls', 'combat_red', 'Flame', 'Increase intensity specifically when the environment or competition expects you to quit.', 'Goggins'' protocol for psychological dominance over self-imposed limits.', 'kinetic_core')
ON CONFLICT (title) DO UPDATE SET
  theme = EXCLUDED.theme,
  icon = EXCLUDED.icon,
  how_instruction = EXCLUDED.how_instruction,
  why_instruction = EXCLUDED.why_instruction,
  category = EXCLUDED.category;
