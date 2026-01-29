export const MASTER_LIBRARY = [
  // BIO (Biometric)
  { id: 'BIO_01', title: 'Morning Sunlight', description: '15m outdoor light < 1hr of wake.', category: 'BIO', visuals: { icon: 'Sun', color: 'bg-amber-500' }, default_config: { frequency_type: 'ABSOLUTE', target_days: 7, target_value: 15, unit: 'min' } },
  { id: 'BIO_02', title: 'Cold Exposure', description: '2m Cold Shower / Plunge < 60°F.', category: 'BIO', visuals: { icon: 'ThermometerSnowflake', color: 'bg-amber-500' }, default_config: { frequency_type: 'ABSOLUTE', target_days: 7, target_value: 2, unit: 'min' } },
  { id: 'BIO_03', title: 'Grounding', description: '10m bare skin on earth.', category: 'BIO', visuals: { icon: 'Activity', color: 'bg-amber-500' }, default_config: { frequency_type: 'ABSOLUTE', target_days: 7 } },
  { id: 'BIO_04', title: 'Red Light', description: '10m Near-Infrared / Sunset exposure.', category: 'BIO', visuals: { icon: 'Flame', color: 'bg-amber-500' }, default_config: { frequency_type: 'ABSOLUTE', target_days: 7 } },
  { id: 'BIO_05', title: 'Magnesium', description: '400mg Glycinate/Threonate pre-bed.', category: 'BIO', visuals: { icon: 'Moon', color: 'bg-amber-500' }, default_config: { frequency_type: 'ABSOLUTE', target_days: 7 } },
  { id: 'BIO_06', title: 'Digital Dark', description: 'No screens 60m pre-bed.', category: 'BIO', visuals: { icon: 'SmartphoneOff', color: 'bg-amber-500' }, default_config: { frequency_type: 'ABSOLUTE', target_days: 7 } },
  { id: 'BIO_07', title: 'Blue Blockers', description: 'Wear glasses post-sunset.', category: 'BIO', visuals: { icon: 'Glasses', color: 'bg-amber-500' }, default_config: { frequency_type: 'ABSOLUTE', target_days: 7 } },
  { id: 'BIO_08', title: 'Temp Drop', description: 'Room temp < 68°F (20°C).', category: 'BIO', visuals: { icon: 'Wind', color: 'bg-amber-500' }, default_config: { frequency_type: 'ABSOLUTE', target_days: 7 } },
  { id: 'BIO_09', title: 'Mouth Tape', description: 'Tape on during sleep.', category: 'BIO', visuals: { icon: 'BedDouble', color: 'bg-amber-500' }, default_config: { frequency_type: 'ABSOLUTE', target_days: 7 } },
  { id: 'BIO_10', title: 'Sleep Tracking', description: 'Review Oura/Whoop/Sleep data.', category: 'BIO', visuals: { icon: 'BarChart3', color: 'bg-amber-500' }, default_config: { frequency_type: 'ABSOLUTE', target_days: 7 } },

  // PHYS (Kinetic)
  { id: 'PHYS_01', title: 'Strength Session', description: '45m Lifting / Resistance.', category: 'PHYS', visuals: { icon: 'Dumbbell', color: 'bg-red-600' }, default_config: { frequency_type: 'FREQUENCY', target_days: 4, target_value: 45, unit: 'min' } },
  { id: 'PHYS_02', title: 'Ruck / Carry', description: '30m Load Bearing.', category: 'PHYS', visuals: { icon: 'Briefcase', color: 'bg-red-600' }, default_config: { frequency_type: 'FREQUENCY', target_days: 2 } },
  { id: 'PHYS_03', title: 'Sauna / Heat', description: '20m @ >170°F.', category: 'PHYS', visuals: { icon: 'Flame', color: 'bg-red-600' }, default_config: { frequency_type: 'FREQUENCY', target_days: 4 } },
  { id: 'PHYS_04', title: 'Mobility / Stretch', description: '10m Flow / Yoga.', category: 'PHYS', visuals: { icon: 'Orbit', color: 'bg-red-600' }, default_config: { frequency_type: 'ABSOLUTE', target_days: 7 } },
  { id: 'PHYS_05', title: 'Sport / Play', description: '30m Competitive or Skill.', category: 'PHYS', visuals: { icon: 'Activity', color: 'bg-red-600' }, default_config: { frequency_type: 'FREQUENCY', target_days: 2 } },
  { id: 'PHYS_06', title: 'Walk / Jog', description: '30m steady state.', category: 'PHYS', visuals: { icon: 'Footprints', color: 'bg-red-600' }, default_config: { frequency_type: 'ABSOLUTE', target_days: 7 } },
  { id: 'PHYS_07', title: 'HIIT', description: '15m Max Effort Intervals.', category: 'PHYS', visuals: { icon: 'Zap', color: 'bg-red-600' }, default_config: { frequency_type: 'FREQUENCY', target_days: 2 } },
  { id: 'PHYS_08', title: 'Yoga', description: '20m Structured Flow.', category: 'PHYS', visuals: { icon: 'Orbit', color: 'bg-red-600' }, default_config: { frequency_type: 'FREQUENCY', target_days: 2 } },
  { id: 'PHYS_09', title: 'Cold Plunge (Active)', description: 'Recovery/Training specific.', category: 'PHYS', visuals: { icon: 'ThermometerSnowflake', color: 'bg-red-600' }, default_config: { frequency_type: 'FREQUENCY', target_days: 3 } },
  { id: 'PHYS_10', title: 'Zone 2 Cardio', description: '45m @ 60-70% Max HR.', category: 'PHYS', visuals: { icon: 'Activity', color: 'bg-red-600' }, default_config: { frequency_type: 'FREQUENCY', target_days: 3 } },

  // FUEL (Nutrition)
  { id: 'FUEL_01', title: 'The Fast', description: '16hr Fasting Window.', category: 'FUEL', visuals: { icon: 'Ban', color: 'bg-orange-500' }, default_config: { frequency_type: 'ABSOLUTE', target_days: 7, target_value: 16, unit: 'hrs' } },
  { id: 'FUEL_02', title: 'Protein Target', description: '1g Protein / lb bodyweight.', category: 'FUEL', visuals: { icon: 'Utensils', color: 'bg-orange-500' }, default_config: { frequency_type: 'ABSOLUTE', target_days: 7 } },
  { id: 'FUEL_03', title: 'Zero Sugar', description: 'No added sugar.', category: 'FUEL', visuals: { icon: 'Ban', color: 'bg-orange-500' }, default_config: { frequency_type: 'ABSOLUTE', target_days: 7 } },
  { id: 'FUEL_04', title: 'Creatine', description: '5g Monohydrate.', category: 'FUEL', visuals: { icon: 'Zap', color: 'bg-orange-500' }, default_config: { frequency_type: 'ABSOLUTE', target_days: 7 } },
  { id: 'FUEL_05', title: 'Electrolytes', description: 'Sodium/Potassium/Magnesium.', category: 'FUEL', visuals: { icon: 'Droplets', color: 'bg-orange-500' }, default_config: { frequency_type: 'ABSOLUTE', target_days: 7 } },
  { id: 'FUEL_06', title: 'Fermented Food', description: 'Kimchi / Sauerkraut / Kefir.', category: 'FUEL', visuals: { icon: 'Apple', color: 'bg-orange-500' }, default_config: { frequency_type: 'FREQUENCY', target_days: 4 } },
  { id: 'FUEL_07', title: 'Omega-3', description: '2g EPA/DHA.', category: 'FUEL', visuals: { icon: 'Fish', color: 'bg-orange-500' }, default_config: { frequency_type: 'ABSOLUTE', target_days: 7 } },
  { id: 'FUEL_08', title: 'Raw Veggies', description: '1 cup Greens/Cruciferous.', category: 'FUEL', visuals: { icon: 'Apple', color: 'bg-orange-500' }, default_config: { frequency_type: 'ABSOLUTE', target_days: 7 } },
  { id: 'FUEL_09', title: 'No Alcohol', description: '0 drinks.', category: 'FUEL', visuals: { icon: 'Ban', color: 'bg-orange-500' }, default_config: { frequency_type: 'ABSOLUTE', target_days: 7 } },
  { id: 'FUEL_10', title: 'Last Meal 3hr Pre-Bed', description: 'Finish eating by 7-8pm.', category: 'FUEL', visuals: { icon: 'Clock', color: 'bg-orange-500' }, default_config: { frequency_type: 'ABSOLUTE', target_days: 7 } },

  // COG (Cognitive)
  { id: 'COG_01', title: 'Deep Work', description: '90m Distraction-Free.', category: 'COG', visuals: { icon: 'Brain', color: 'bg-blue-600' }, default_config: { frequency_type: 'FREQUENCY', target_days: 5, target_value: 90, unit: 'min' } },
  { id: 'COG_02', title: 'Read (Analog)', description: '20 pages physical book.', category: 'COG', visuals: { icon: 'BookOpen', color: 'bg-blue-600' }, default_config: { frequency_type: 'ABSOLUTE', target_days: 7 } },
  { id: 'COG_03', title: 'No-Phone Block', description: '1hr away from device.', category: 'COG', visuals: { icon: 'SmartphoneOff', color: 'bg-blue-600' }, default_config: { frequency_type: 'ABSOLUTE', target_days: 7 } },
  { id: 'COG_04', title: 'Power Nap / NSDR', description: '20m Non-Sleep Deep Rest.', category: 'COG', visuals: { icon: 'Moon', color: 'bg-blue-600' }, default_config: { frequency_type: 'ABSOLUTE', target_days: 7 } },
  { id: 'COG_05', title: 'Language Study', description: '15m Practice.', category: 'COG', visuals: { icon: 'Mic', color: 'bg-blue-600' }, default_config: { frequency_type: 'FREQUENCY', target_days: 4 } },
  { id: 'COG_06', title: 'Skill Practice', description: '20m Deliberate Practice.', category: 'COG', visuals: { icon: 'PenTool', color: 'bg-blue-600' }, default_config: { frequency_type: 'FREQUENCY', target_days: 4 } },
  { id: 'COG_07', title: 'Writing / Output', description: '500 words / Journaling.', category: 'COG', visuals: { icon: 'PenTool', color: 'bg-blue-600' }, default_config: { frequency_type: 'ABSOLUTE', target_days: 7 } },
  { id: 'COG_08', title: 'Podcast / Learning', description: '30m Educational Audio.', category: 'COG', visuals: { icon: 'Radio', color: 'bg-blue-600' }, default_config: { frequency_type: 'ABSOLUTE', target_days: 7 } },
  { id: 'COG_09', title: 'Pomodoro Sprints', description: '4 x 25m Intervals.', category: 'COG', visuals: { icon: 'Timer', color: 'bg-blue-600' }, default_config: { frequency_type: 'FREQUENCY', target_days: 5 } },
  { id: 'COG_10', title: 'Inbox Zero', description: 'Clear email/messages.', category: 'COG', visuals: { icon: 'Mail', color: 'bg-blue-600' }, default_config: { frequency_type: 'ABSOLUTE', target_days: 7 } },

  // STOIC (Mindset)
  { id: 'STOIC_01', title: 'The Shadow Audit', description: 'Review daily failures/emotions.', category: 'STOIC', visuals: { icon: 'Ghost', color: 'bg-purple-600' }, default_config: { frequency_type: 'ABSOLUTE', target_days: 7 } },
  { id: 'STOIC_02', title: 'Accountability Mirror', description: '1m Self-Confrontation.', category: 'STOIC', visuals: { icon: 'UserCheck', color: 'bg-purple-600' }, default_config: { frequency_type: 'ABSOLUTE', target_days: 7 } },
  { id: 'STOIC_03', title: 'Journal (Dump)', description: 'Free writing.', category: 'STOIC', visuals: { icon: 'FileText', color: 'bg-purple-600' }, default_config: { frequency_type: 'ABSOLUTE', target_days: 7 } },
  { id: 'STOIC_04', title: 'Meditation', description: '10m Stillness.', category: 'STOIC', visuals: { icon: 'Anchor', color: 'bg-purple-600' }, default_config: { frequency_type: 'ABSOLUTE', target_days: 7 } },
  { id: 'STOIC_05', title: 'Box Breathing', description: '5m (4-4-4-4).', category: 'STOIC', visuals: { icon: 'Wind', color: 'bg-purple-600' }, default_config: { frequency_type: 'ABSOLUTE', target_days: 7 } },
  { id: 'STOIC_06', title: 'Visualization', description: '5m Mental Rehearsal.', category: 'STOIC', visuals: { icon: 'Eye', color: 'bg-purple-600' }, default_config: { frequency_type: 'ABSOLUTE', target_days: 7 } },
  { id: 'STOIC_07', title: 'Gratitude Practice', description: '3 items written.', category: 'STOIC', visuals: { icon: 'HeartHandshake', color: 'bg-purple-600' }, default_config: { frequency_type: 'ABSOLUTE', target_days: 7 } },
  { id: 'STOIC_08', title: 'Digital Minimalism', description: 'Delete/Hide distractions.', category: 'STOIC', visuals: { icon: 'Trash2', color: 'bg-purple-600' }, default_config: { frequency_type: 'ABSOLUTE', target_days: 7 } },
  { id: 'STOIC_09', title: 'Silence Block', description: '10m No Input/Output.', category: 'STOIC', visuals: { icon: 'Moon', color: 'bg-purple-600' }, default_config: { frequency_type: 'ABSOLUTE', target_days: 7 } },
  { id: 'STOIC_10', title: 'Memento Mori', description: 'Contemplate mortality.', category: 'STOIC', visuals: { icon: 'Ghost', color: 'bg-purple-600' }, default_config: { frequency_type: 'ABSOLUTE', target_days: 7 } },

  // LOG (Logistics)
  { id: 'LOG_01', title: 'Environment Clear', description: 'Tidy workspace/room.', category: 'LOG', visuals: { icon: 'Tent', color: 'bg-slate-600' }, default_config: { frequency_type: 'ABSOLUTE', target_days: 7 } },
  { id: 'LOG_02', title: 'Meal Prep', description: 'Prepare food for tomorrow.', category: 'LOG', visuals: { icon: 'Utensils', color: 'bg-slate-600' }, default_config: { frequency_type: 'ABSOLUTE', target_days: 7 } },
  { id: 'LOG_03', title: 'Tomorrow’s Kit', description: 'Lay out clothes/gear.', category: 'LOG', visuals: { icon: 'Briefcase', color: 'bg-slate-600' }, default_config: { frequency_type: 'ABSOLUTE', target_days: 7 } },
  { id: 'LOG_04', title: 'Financial Audit', description: 'Check balances/spend.', category: 'LOG', visuals: { icon: 'BarChart3', color: 'bg-slate-600' }, default_config: { frequency_type: 'ABSOLUTE', target_days: 7 } },
  { id: 'LOG_05', title: 'Social Sync', description: 'Coord with partner/team.', category: 'LOG', visuals: { icon: 'UserCheck', color: 'bg-slate-600' }, default_config: { frequency_type: 'ABSOLUTE', target_days: 7 } },
  { id: 'LOG_06', title: 'Home Maintenance', description: '15m Chores/Fix.', category: 'LOG', visuals: { icon: 'Tent', color: 'bg-slate-600' }, default_config: { frequency_type: 'FREQUENCY', target_days: 3 } },
  { id: 'LOG_07', title: 'Inbox Triage', description: 'Sort actionable vs archive.', category: 'LOG', visuals: { icon: 'Mail', color: 'bg-slate-600' }, default_config: { frequency_type: 'ABSOLUTE', target_days: 7 } },
  { id: 'LOG_08', title: 'Grocery Run', description: 'Stock provisions.', category: 'LOG', visuals: { icon: 'ShoppingCart', color: 'bg-slate-600' }, default_config: { frequency_type: 'FREQUENCY', target_days: 2 } },
  { id: 'LOG_09', title: 'Task Batching', description: 'Group similar small tasks.', category: 'LOG', visuals: { icon: 'ListChecks', color: 'bg-slate-600' }, default_config: { frequency_type: 'ABSOLUTE', target_days: 7 } },
  { id: 'LOG_10', title: 'Weekly Review', description: 'Plan the week ahead (Sun).', category: 'LOG', visuals: { icon: 'CalendarRange', color: 'bg-slate-600' }, default_config: { frequency_type: 'FREQUENCY', target_days: 1 } }
];
