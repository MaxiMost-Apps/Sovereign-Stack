-- Migration: Seed Protocol Stacks (Maximost Library)
-- overwrite on conflict

INSERT INTO maximost_library_protocols (stack_id, title, description, expert_voice, theme_override, habit_slugs, overrides) VALUES
(
    'stack_atlas',
    'Atlas Golden Set',
    'The foundation for Rig stability.',
    'The Founder',
    'maxi_blue',
    ARRAY['morning_sun', 'deep_work', 'fasted_walk', 'shadow_audit', 'digital_sunset'],
    '[]'::jsonb
),
(
    'stack_huberman',
    'Neuro-Rig Stack',
    'Biological hardware optimization.',
    'Andrew Huberman',
    'oxygen_cyan',
    ARRAY['morning_sun', 'cold_plunge', 'nsdr_reset', 'digital_sunset'],
    '[]'::jsonb
),
(
    'stack_goggins',
    'Iron Mind',
    'Callous the mind through suffering.',
    'David Goggins',
    'combat_red',
    ARRAY['accountability_mirror', 'heavy_lifting', 'taking_souls', 'cookie_jar'],
    '[{"slug": "heavy_lifting", "title": "Taking Souls (Lift)", "description": "Enter the room of suffering. Do not leave until you''ve taken a soul.", "how_instruction": "THE ATOM: Mental Callousing. THE STEP: Train until the mind wants to quit.", "why_instruction": "Trains the brain to override the ''Safety Governor''. [Goggins]"}]'::jsonb
),
(
    'stack_jocko',
    'Discipline Stack',
    'The military standard for daily execution.',
    'Jocko Willink',
    'slate_steel',
    ARRAY['make_bed', 'deep_work', 'shadow_audit', 'no_sugar'],
    '[{"slug": "make_bed", "title": "Secure the Perimeter", "description": "Discipline starts the moment you leave the sheets.", "how_instruction": "Precision bed-make. No loose corners.", "why_instruction": "Do not let the first mission fail. Establish the standard."}]'::jsonb
),
(
    'stack_stoic',
    'The Citadel',
    'Impervious to external fortune.',
    'Marcus Aurelius',
    'ghost_white',
    ARRAY['memento_mori', 'amor_fati', 'prayer_stillness', 'good_deed'],
    '[]'::jsonb
),
(
    'stack_attia',
    'Centenarian',
    'Training for the Marginal Decade.',
    'Peter Attia',
    'bio_emerald',
    ARRAY['fasted_walk', 'heavy_lifting', 'fasting', 'vo2_max'],
    '[]'::jsonb
),
(
    'stack_war',
    'The War Phase',
    'High-output optimization for crisis.',
    'The Operator',
    'warning_amber',
    ARRAY['sauna', 'digital_air_gap', 'thermoregulation', 'deep_work'],
    '[]'::jsonb
),
(
    'stack_deep',
    'Deep Stack',
    'Unlocking the cognitive superpower.',
    'Cal Newport',
    'neural_violet',
    ARRAY['deep_work', 'daily_shutdown', 'touch_grass'],
    '[]'::jsonb
),
(
    'stack_athlete',
    'Athlete Standard',
    'Explosive power and rapid recovery.',
    'Performance Coach',
    'combat_red',
    ARRAY['heavy_lifting', 'protein_loading', 'ready_state', 'nsdr_reset'],
    '[]'::jsonb
)
ON CONFLICT (stack_id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    expert_voice = EXCLUDED.expert_voice,
    theme_override = EXCLUDED.theme_override,
    habit_slugs = EXCLUDED.habit_slugs,
    overrides = EXCLUDED.overrides;
