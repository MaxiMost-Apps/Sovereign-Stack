import { createClient } from '@supabase/supabase-js';
import { config } from './config';
import { ARCHIVE_DATA } from './lib/archiveData';

const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_SERVICE_ROLE_KEY);

async function seed() {
    console.log(`🌱 Seeding Archive ${ARCHIVE_DATA.archive_version} (Schema Adaptive)...`);

    // 1. Seed Habits
    let habitsSeeded = 0;
    for (const habit of ARCHIVE_DATA.atoms) {
        // Strip fields that might not exist in schema (atom_id, description)
        const { atom_id, description, ...rest } = habit as any;

        const payload = {
            slug: habit.slug,
            name: habit.title,
            category: habit.category,
            type: habit.type || 'absolute',
            target_value: habit.target_value || 1,
            unit: habit.unit || 'rep',
            icon: habit.icon,
            theme: habit.theme,

            // Consolidate extra fields into metadata
            metadata: {
                ...habit.metadata,
                description: description, // Persist description in metadata
                atom_id: atom_id,
                base_color: (habit as any).base_color,
                ...rest
            }
        };

        const { error } = await supabase
            .from('maximost_library_habits')
            .upsert(payload, { onConflict: 'slug' });

        if (error) {
            console.error(`Error seeding habit ${habit.slug}:`, error.message);
        } else {
            habitsSeeded++;
        }
    }
    console.log(`✅ Library Habits synced: ${habitsSeeded}/${ARCHIVE_DATA.atoms.length}`);

    // 2. Seed Protocols
    let stacksSeeded = 0;
    for (const stack of ARCHIVE_DATA.protocol_stacks) {
        const s = stack as any;
        const stackId = s.id || s.title.toLowerCase().replace(/\s+/g, '-');

        // Minimal payload to pass schema checks
        const payload = {
            stack_id: stackId,
            title: s.name || s.title,
            description: s.description,
            habit_slugs: s.habits || s.habit_slugs,
            overrides: s.overrides || []
            // expert_voice and theme_override removed to prevent schema errors
        };

        const { error } = await supabase
            .from('maximost_library_protocols')
            .upsert(payload, { onConflict: 'stack_id' });

        if (error) {
            console.error(`Error seeding protocol ${stackId}:`, error.message);
        } else {
            stacksSeeded++;
        }
    }
    console.log(`✅ Protocol Stacks synced: ${stacksSeeded}/${ARCHIVE_DATA.protocol_stacks.length}`);
}

seed();
