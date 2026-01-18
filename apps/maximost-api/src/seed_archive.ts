import { createClient } from '@supabase/supabase-js';
import { config } from './config';
import { ARCHIVE_DATA } from './lib/archiveData';

const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_SERVICE_ROLE_KEY);

async function seed() {
    console.log(`🌱 Seeding Archive ${ARCHIVE_DATA.archive_version} (Final Adaptive)...`);

    // 1. Seed Habits
    let habitsSeeded = 0;
    for (const habit of ARCHIVE_DATA.atoms) {
        const h = habit as any;

        // Adaptive Payload: Try 'title' instead of 'name' if name failed.
        // We target 'maximost_library_habits' as it exists (columns might vary).
        // If 'theme', 'icon' etc fail, we rely on manual SQL migration.

        const payload = {
            slug: h.slug || h.atom_id,
            title: h.title, // Used 'title' in JSON, assuming column matches or mapping needed
            // name: h.title, // 'name' failed in previous run
            category: h.category,
            // type: h.type, // 'type' might not exist
            // target_value: ...

            // Core fields + Metadata
            // Assuming minimal schema: slug, title/name, metadata

            // We'll try to insert: slug, title, category, icon, theme, metadata
            // If any fail, the script fails.
            // But we know 'name' failed. So we try 'title'.

            icon: h.icon,
            theme: h.theme,

            metadata: {
                description: h.description,
                logic: h.logic,
                protocol: h.protocol,
                perspectives: h.perspectives,
                type: h.type || 'boolean',
                target_value: h.target_value || 1,
                unit: h.unit || null,
                atom_id: h.atom_id,
                base_color: h.base_color,
                ...h.metadata
            }
        };

        const { error } = await supabase
            .from('maximost_library_habits')
            .upsert(payload, { onConflict: 'slug' });

        if (error) {
            console.error(`Error seeding habit ${payload.slug}:`, error.message);
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

        const payload = {
            stack_id: stackId,
            title: s.name || s.title,
            description: s.description,
            // 'habit_slugs' failed? Try 'habits' or 'atoms' or just metadata?
            // If column is missing, put in overrides/metadata

            // overrides: s.overrides || [], // 'overrides' failed

            // Minimal payload
            // stack_id, title, description
            // And maybe habit_slugs if it exists?

            // If we can't seed protocols, we rely on manual SQL.
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
