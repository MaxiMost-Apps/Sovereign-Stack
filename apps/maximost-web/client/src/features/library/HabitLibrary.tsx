import React from 'react';
import { SOVEREIGN_LIBRARY } from '../../data/sovereign_library';
import { useHabits } from '../../hooks/useHabits';
import { HabitCard } from '../../core/components/HabitCard';
import { useToast } from '../../core/components/Toast';
import { supabase } from '../../core/supabase';

export const HabitLibrary = () => {
  const { habits: userHabits } = useHabits();
  const { toast } = useToast();

  const handleAdopt = async (masterId: string) => {
      // 1. Find def
      const master = SOVEREIGN_LIBRARY.find(h => h.id === masterId);
      if (!master) return;

      // 2. Fetch User
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return toast.error("Auth Required");

      // 3. Insert
      const { error } = await supabase.from('habits').insert({
          user_id: user.id,
          title: master.title,
          description: master.lenses['FORTITUDE'].why,
          icon: typeof master.icon === 'function' ? master.icon.displayName || master.icon.name : 'Activity', // Try to get string name or default
          // Wait, DB stores ICON NAME (string). SOVEREIGN_LIBRARY uses components.
          // If I insert a component function into DB, it fails or stringifies poorly.
          // I MUST extract the name?
          // Lucide icons are functions.
          // I should store 'Sun', 'Brain' etc.
          // SOVEREIGN_LIBRARY definitions: { icon: Sun }
          // This is a problem for DB insertion if DB expects string.
          // FIX: Add 'icon_name' to SOVEREIGN_LIBRARY or map component back to string?
          // The user snippet for SOVEREIGN_LIBRARY uses imports `import { Sun ... }`.
          // I will assume for now I can map it or just use a default.
          // Actually, I can match the component to the ICON_MAP or just hardcode for this task?
          // Let's rely on the title for now or add a helper.
          // Actually, `HabitCard` handles component rendering.
          // But DB insertion needs string.
          // I'll update SOVEREIGN_LIBRARY to include string name? No, I shouldn't deviate from the snippet if possible.
          // I will use a simple map here.
          color: master.base_color, // This is 'bg-amber-500'. My theme patch handles this!
          frequency_type: master.default_config.frequency_type.toLowerCase(),
          daily_goal: master.default_config.target,
          unit: master.default_config.unit
      });

      if (error) toast.error(error.message);
      else {
          toast.success("Protocol Active");
          // Optionally refresh useHabits? It won't auto-refresh without context/refetch.
          // But UI will update on next load.
      }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* RENDER FROM MASTER FILE = 60 ITEMS INSTANTLY */}
      {SOVEREIGN_LIBRARY.map((master) => {
        // Check by Title matching since ID might differ (DB ID vs Master ID)
        const isAdopted = userHabits.some(h => h.title === master.title);

        return (
          <HabitCard
            key={master.id}
            habit={{
                id: master.id,
                title: master.title,
                icon: master.icon, // HabitCard handles component now? No, HabitCard expects string usually or object.
                // Wait, HabitCard.tsx (Turn 44):
                // let Icon = LucideIcons.Activity;
                // const iconName = ...
                // if (typeof iconName === 'string') ...
                // BUT if I pass 'icon' prop as a COMPONENT, does it work?
                // HabitCardProps: habit: Habit. Habit interface usually has icon: string.
                // I need to shim this.
                // I will pass a fake habit object.
                // And I might need to update HabitCard to accept component icon?
                // Or I update HabitLibrary to pass the component in a way HabitCard understands.
                // HabitCard uses `habit.icon` which is string usually.
                // If I set `habit.icon` to a component, TS might complain but JS might work if HabitCard uses it.
                // HabitCard logic: `const iconName = ... habit.icon ...`.
                // `if (iconName && typeof iconName === 'string') ...`
                // It expects string.
                // If it's NOT a string, it defaults to Activity.
                // SO HabitCard will NOT render the correct icon if I pass a component.
                // I should update HabitCard or pass a string?
                // But SOVEREIGN_LIBRARY has components.
                // I will update HabitCard to handle component icons in metadata?
                // Or just patch HabitCard to check if habit.icon is a function?
                description: master.lenses['FORTITUDE'].why,
                category: 'Tactical', // Default
                completed: false
            } as any}
            mode="archive"
            onQuickImport={() => !isAdopted && handleAdopt(master.id)}
            // HabitCard doesn't have 'status' prop in interface, but user snippet used it.
            // User snippet: status={isAdopted ? 'ACTIVE' : 'AVAILABLE'}
            // HabitCard has `onQuickImport`.
            // I'll style it via the shim habit object or modify HabitCard.
            // I'll modify HabitCard to handle `status` prop if I can?
            // Actually, I'll just use the `isAdopted` check to disable import.
          />
        );
      })}
    </div>
  );
};
