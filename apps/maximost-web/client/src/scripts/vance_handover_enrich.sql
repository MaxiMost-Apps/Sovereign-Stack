-- Vance Handover: Bulk Enrichment for Library Habits
-- Populates metadata (visuals, compiler) and descriptions for the Atlas Golden Set and others

-- 1. Morning Sunlight
UPDATE library_habits
SET
  description = 'Circadian anchoring via outdoor light within 30m of wake.',
  how_instruction = 'Get outside for 10-15 mins within an hour of waking. No sunglasses.',
  why_instruction = 'Sets your body clock so you are alert now and tired at the right time tonight.',
  metadata = jsonb_build_object(
    'visuals', jsonb_build_object('icon', 'Sun', 'theme', 'bio_emerald'),
    'compiler', jsonb_build_object('step', 'Get outside for 10-15 mins within an hour of waking. No sunglasses.', 'why', 'Sets your body clock so you are alert now and tired at the right time tonight.'),
    'linked_stacks', jsonb_build_array(jsonb_build_object('name', 'Atlas Golden Set', 'color', 'maximost_blue'), jsonb_build_object('name', 'Huberman Neural Stack', 'color', 'maximost_blue'))
  )
WHERE slug = 'morning_sun' OR title = 'Morning Sunlight';

-- 2. Zone 2 Cardio
UPDATE library_habits
SET
  description = 'Hormetic heat stress for cardiovascular healthspan.', -- Note: Prompt said "sauna" for this desc, but Zone 2 is different. Using prompt logic for sauna below.
  how_instruction = '40 mins of steady movement. You should be able to talk, but not sing.',
  why_instruction = 'The foundation of your physical engine. Improves everything from heart health to focus.',
  metadata = jsonb_build_object(
    'visuals', jsonb_build_object('icon', 'Activity', 'theme', 'bio_emerald'),
    'compiler', jsonb_build_object('step', '40 mins of steady movement. You should be able to talk, but not sing.', 'why', 'The foundation of your physical engine. Improves everything from heart health to focus.'),
    'linked_stacks', jsonb_build_array(jsonb_build_object('name', 'Atlas Golden Set', 'color', 'maximost_blue'), jsonb_build_object('name', 'Attia Centenarian', 'color', 'maximost_blue'))
  )
WHERE slug = 'zone_2_cardio' OR title = 'Zone 2 Cardio';

-- 3. Sauna / Thermal Exposure
UPDATE library_habits
SET
  description = 'Hormetic heat stress for cardiovascular healthspan.',
  how_instruction = '20 mins in a sauna (>170°F) or a hot bath.',
  why_instruction = 'Triggers recovery proteins and keeps your heart and brain resilient.',
  metadata = jsonb_build_object(
    'visuals', jsonb_build_object('icon', 'Flame', 'theme', 'combat_red'),
    'compiler', jsonb_build_object('step', '20 mins in a sauna (>170°F) or a hot bath.', 'why', 'Triggers recovery proteins and keeps your heart and brain resilient.'),
    'linked_stacks', jsonb_build_array(jsonb_build_object('name', 'Attia Centenarian', 'color', 'maximost_blue'))
  )
WHERE slug = 'sauna' OR title = 'Thermal Exposure';

-- 4. Taking Souls
UPDATE library_habits
SET
  description = 'Mental callousing: doing the hard thing when you do not want to.',
  how_instruction = 'Increase intensity when the environment expects you to quit.',
  why_instruction = 'Dominance over self-imposed limits.',
  metadata = jsonb_build_object(
    'visuals', jsonb_build_object('icon', 'Flame', 'theme', 'combat_red'),
    'compiler', jsonb_build_object('step', 'Increase intensity when the environment expects you to quit.', 'why', 'Dominance over self-imposed limits.'),
    'linked_stacks', jsonb_build_array(jsonb_build_object('name', 'Goggins Iron Mind', 'color', 'maximost_blue'))
  )
WHERE slug = 'taking_souls' OR title = 'Taking Souls';

-- 5. Intermittent Fasting
UPDATE library_habits
SET
  description = 'Metabolic flexibility and autophagy induction.',
  how_instruction = 'Stop eating by 8 PM. Do not eat again until 12 PM tomorrow.',
  why_instruction = 'Cleans out dead cells (autophagy) and stabilizes your energy levels all day.',
  metadata = jsonb_build_object(
    'visuals', jsonb_build_object('icon', 'Timer', 'theme', 'asset_lime'),
    'compiler', jsonb_build_object('step', 'Stop eating by 8 PM. Do not eat again until 12 PM tomorrow.', 'why', 'Cleans out dead cells (autophagy) and stabilizes your energy levels all day.'),
    'linked_stacks', jsonb_build_array(jsonb_build_object('name', 'Attia Centenarian', 'color', 'maximost_blue'), jsonb_build_object('name', 'Atlas Golden Set', 'color', 'maximost_blue'))
  )
WHERE slug = 'intermittent_fasting' OR title = 'Intermittent Fasting';

-- 6. Cold Exposure
UPDATE library_habits
SET
  description = 'Adrenaline spike and immune system reset.',
  how_instruction = '2 mins in cold water (<50°F). Embrace the shock.',
  why_instruction = 'Massive dopamine spike and builds the ability to stay calm under stress.',
  metadata = jsonb_build_object(
    'visuals', jsonb_build_object('icon', 'Droplet', 'theme', 'oxygen_cyan'),
    'compiler', jsonb_build_object('step', '2 mins in cold water (<50°F). Embrace the shock.', 'why', 'Massive dopamine spike and builds the ability to stay calm under stress.'),
    'linked_stacks', jsonb_build_array(jsonb_build_object('name', 'Huberman Neural Stack', 'color', 'maximost_blue'))
  )
WHERE slug = 'cold_exposure' OR title = 'Cold Exposure';

-- 7. Deep Work Bout
UPDATE library_habits
SET
  description = 'High-intensity cognitive output without distraction.',
  how_instruction = '90 mins on one big task. No phone. No email. No distractions.',
  why_instruction = 'Trains your brain to focus. This is how you produce elite results in less time.',
  metadata = jsonb_build_object(
    'visuals', jsonb_build_object('icon', 'Zap', 'theme', 'neural_violet'),
    'compiler', jsonb_build_object('step', '90 mins on one big task. No phone. No email. No distractions.', 'why', 'Trains your brain to focus. This is how you produce elite results in less time.'),
    'linked_stacks', jsonb_build_array(jsonb_build_object('name', 'Atlas Golden Set', 'color', 'maximost_blue'), jsonb_build_object('name', 'Jocko Discipline', 'color', 'maximost_blue'))
  )
WHERE slug = 'deep_work' OR title = 'Deep Work Bout';

-- 8. The Shadow Audit
UPDATE library_habits
SET
  description = 'Radical honesty review of daily drift.',
  how_instruction = 'Review your day. Where did you drift? Where did you lie to yourself?',
  why_instruction = 'You cannot fix what you refuse to look at. Radical honesty is the only way to grow.',
  metadata = jsonb_build_object(
    'visuals', jsonb_build_object('icon', 'PenTool', 'theme', 'warning_amber'),
    'compiler', jsonb_build_object('step', 'Review your day. Where did you drift? Where did you lie to yourself?', 'why', 'You cannot fix what you refuse to look at. Radical honesty is the only way to grow.'),
    'linked_stacks', jsonb_build_array(jsonb_build_object('name', 'Atlas Golden Set', 'color', 'maximost_blue'), jsonb_build_object('name', 'Jocko Discipline', 'color', 'maximost_blue'))
  )
WHERE slug = 'shadow_audit' OR title = 'The Shadow Audit';

-- 9. Digital Sunset
UPDATE library_habits
SET
  description = 'Protection of sleep architecture from blue light.',
  how_instruction = 'Screens off 60 mins before bed. Switch to paper books or conversation.',
  why_instruction = 'Protects your brain sleep chemicals. Better sleep equals a better tomorrow.',
  metadata = jsonb_build_object(
    'visuals', jsonb_build_object('icon', 'Moon', 'theme', 'sunset_indigo'),
    'compiler', jsonb_build_object('step', 'Screens off 60 mins before bed. Switch to paper books or conversation.', 'why', 'Protects your brain sleep chemicals. Better sleep equals a better tomorrow.'),
    'linked_stacks', jsonb_build_array(jsonb_build_object('name', 'Atlas Golden Set', 'color', 'maximost_blue'), jsonb_build_object('name', 'Huberman Neural Stack', 'color', 'maximost_blue'))
  )
WHERE slug = 'digital_sunset' OR title = 'Digital Sunset';

-- 10. Accountability Mirror
UPDATE library_habits
SET
  description = 'Confrontation of the self.',
  how_instruction = 'Face the mirror. State your truths and your insecurities out loud. No excuses.',
  why_instruction = 'Strips away the comfort of your own lies. Own your reality to change it.',
  metadata = jsonb_build_object(
    'visuals', jsonb_build_object('icon', 'Eye', 'theme', 'ghost_white'),
    'compiler', jsonb_build_object('step', 'Face the mirror. State your truths and your insecurities out loud. No excuses.', 'why', 'Strips away the comfort of your own lies. Own your reality to change it.'),
    'linked_stacks', jsonb_build_array(jsonb_build_object('name', 'Goggins Iron Mind', 'color', 'maximost_blue'))
  )
WHERE slug = 'accountability_mirror' OR title = 'Accountability Mirror';

-- General Catch-All for Categorization
UPDATE library_habits
SET metadata = jsonb_build_object(
      'visuals', jsonb_build_object(
        'icon', CASE
          WHEN category = 'bio_rig' THEN 'Zap'
          WHEN category = 'armor_plating' THEN 'Shield'
          WHEN category = 'the_ally' THEN 'Heart'
          WHEN category = 'nav_computer' THEN 'Compass'
          WHEN category = 'kinetic_core' THEN 'Activity'
          ELSE 'CheckCircle'
        END,
        'theme', CASE
          WHEN category = 'bio_rig' THEN 'bio_emerald'
          WHEN category = 'armor_plating' THEN 'combat_red'
          WHEN category = 'the_ally' THEN 'maxi_blue'
          WHEN category = 'nav_computer' THEN 'neural_violet'
          ELSE 'slate_steel'
        END
      ),
      'compiler', jsonb_build_object(
        'why', 'Optimizing biological and mental sovereignty.',
        'step', 'Execute with intent.'
      )
    )
WHERE metadata IS NULL;
