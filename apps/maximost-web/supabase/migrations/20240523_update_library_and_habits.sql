-- 1. Add Category Column to habits
ALTER TABLE habits ADD COLUMN IF NOT EXISTS category TEXT;

-- 2. Upsert Master Set into library_habits
INSERT INTO library_habits (title, theme, icon, how_instruction, why_instruction, category) VALUES
  ('Intermittent Fasting', 'asset_lime', 'Timer', 'Fast for 16 hours. Hydrate with water/electrolytes only.', 'Triggers autophagy and stabilizes insulin sensitivity.', 'bio_rig'),
  ('No Alcohol', 'warning_amber', 'Ban', 'Zero alcohol consumption for 24 hours.', 'Protect REM sleep and prevent neuro-inflammation.', 'bio_rig'),
  ('No Sugar', 'warning_amber', 'Ban', 'Eliminate all refined sugars and high-fructose corn syrup.', 'Stabilize energy levels and reduce systemic inflammation.', 'bio_rig'),
  ('Secret Good Deed', 'ghost_white', 'HeartHandshake', 'Perform one helpful act. Ensure the recipient never knows it was you.', 'Build intrinsic character without seeking external praise.', 'armor_plating'),
  ('Morning Sunlight', 'bio_emerald', 'Sun', '10-20m sunlight within 60m of waking.', 'Set the circadian clock and morning cortisol surge.', 'nav_computer'),
  ('Deep Work', 'neural_violet', 'Zap', '90 mins of distraction-free focus on one high-value task.', 'Achieve flow state and produce elite-level output.', 'kinetic_core'),
  ('Shadow Audit', 'warning_amber', 'PenTool', 'Ruthless evening review of every ''drift'' and lie told today.', 'Identify failure patterns before they become habits.', 'black_box'),
  ('Make Bed', 'maxi_blue', 'BedDouble', 'Complete a precision bed-make immediately upon waking.', 'Establish a standard of excellence with the first win.', 'kinetic_core'),
  ('Prayer / Meditate', 'oxygen_cyan', 'Sparkles', '10-15 mins of stillness, prayer, or focused breathing.', 'Re-center the mind and align with higher values.', 'nav_computer'),
  ('Call a Friend', 'maxi_blue', 'Phone', 'Connect with one person in your inner circle for 10+ mins.', 'Maintain the social infrastructure of high performance.', 'the_ally'),
  ('Nature Exposure', 'bio_emerald', 'Trees', 'Minimum 15 minutes of direct interaction with an outdoor environment.', 'To lower sympathetic nervous system activation and reduce cortisol levels.', 'bio_rig'),
  ('Thermal Exposure', 'combat_red', 'Flame', '20 minutes of Sauna (>170°F) or Hot Soak. Follow with hydration.', 'To trigger heat-shock proteins and improve cardiovascular efficiency.', 'bio_rig'),
  ('Athletic Pursuit', 'combat_red', 'Trophy', 'Engage in competitive sport, running, or high-intensity movement for 30+ minutes.', 'To maintain physical agility and the ''Operator''s'' kinetic readiness.', 'bio_rig'),
  ('Nutrient Optimization', 'oxygen_cyan', 'Pill', 'Execute your specific supplement/vitamin protocol.', 'To fill micronutrient gaps and optimize cognitive/physical performance.', 'bio_rig'),
  ('Heavy Lifting', 'slate_steel', 'Dumbbell', 'High-intensity resistance training focusing on compound lifts.', 'Muscle mass is the primary predictor of healthspan and skeletal integrity.', 'bio_rig'),
  ('Gratitude Audit', 'maxi_blue', 'Heart', 'Identify three specific things you are grateful for. Write them down.', 'To rewire the brain away from the ''Negativity Bias'' and improve baseline happiness.', 'black_box'),
  ('Inbox Zero', 'slate_steel', 'Mail', 'Process all digital communications until the primary inbox is empty.', 'To clear ''Open Loops'' and reduce the cognitive load of unfinished business.', 'kinetic_core')
ON CONFLICT (title) DO UPDATE SET
  theme = EXCLUDED.theme,
  icon = EXCLUDED.icon,
  how_instruction = EXCLUDED.how_instruction,
  why_instruction = EXCLUDED.why_instruction,
  category = EXCLUDED.category;
