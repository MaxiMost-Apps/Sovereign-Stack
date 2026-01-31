import {
  Sun, Moon, Droplets, Flame, Zap, Brain, Activity,
  Dumbbell, Shield, Anchor, Heart, Eye, Coffee,
  Smartphone, Wind, BookOpen, PenTool, DollarSign,
  Mountain, Clock, BedDouble, Utensils, Footprints,
  Music, Smile, Users, CheckCircle, Target, Lock,
  Thermometer, Briefcase, Calculator, Radio, Hash,
  Lightbulb, Skull, Swords, Gem, Sprout, Network,
  Signal, Battery, Leaf, Fish, Milk, Egg,
  Gamepad2, XCircle, Ban, Hourglass, Scale,
  Glasses, Mic, RefreshCw, Box, Layers, Speaker,
  Clipboard, CalendarCheck, Home, ShoppingCart, User,
  Apple
} from 'lucide-react';

export const ICON_MAP: Record<string, any> = {
  Sun, Moon, Droplets, Flame, Zap, Brain, Activity,
  Dumbbell, Shield, Anchor, Heart, Eye, Coffee,
  Smartphone, Wind, BookOpen, PenTool, DollarSign,
  Mountain, Clock, BedDouble, Utensils, Footprints,
  Music, Smile, Users, CheckCircle, Target, Lock,
  Thermometer, Briefcase, Calculator, Radio, Hash,
  Lightbulb, Skull, Swords, Gem, Sprout, Network,
  Signal, Battery, Leaf, Fish, Milk, Egg,
  Gamepad2, XCircle, Ban, Hourglass, Scale,
  Glasses, Mic, RefreshCw, Box, Layers, Speaker,
  Clipboard, CalendarCheck, Home, ShoppingCart, User,
  Apple
};

export const SOVEREIGN_LIBRARY = [
  {
    "id": "BIO_01",
    "title": "Morning Sunlight",
    "category": "body",
    "system_tags": [
      "bio"
    ],
    "default_config": {
      "frequency_type": "ABSOLUTE",
      "target_days": 7,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Activity",
      "color": "bg-green-500"
    },
    "lenses": {
      "FORTITUDE": "Visual perimeter check. Signal the system to wake up and fight.",
      "REASON": "Align biological clock with solar time. Optimize cortisol/melatonin timing.",
      "VISIONARY": "First victory. Light the path. Clear eyes for the day's vision.",
      "ANALYTICAL": "Trigger ipRGCs to anchor circadian rhythm and suppress daytime melatonin."
    },
    "description": "15m outdoor light < 1hr of wake."
  },
  {
    "id": "BIO_02",
    "title": "Cold Exposure",
    "category": "body",
    "system_tags": [
      "bio"
    ],
    "default_config": {
      "frequency_type": "ABSOLUTE",
      "target_days": 7,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Activity",
      "color": "bg-green-500"
    },
    "lenses": {
      "FORTITUDE": "Kill the comfort. If you can handle the cold, you can handle the chaos.",
      "REASON": "Voluntary hardship. Train the mind to remain calm in shock.",
      "VISIONARY": "Forge the steel. A tempered body creates a sharp mind.",
      "ANALYTICAL": "Spike norepinephrine 300%. Activate brown fat thermogenesis."
    },
    "description": "2m Cold Shower / Plunge < 60\u00b0F."
  },
  {
    "id": "BIO_03",
    "title": "Grounding",
    "category": "body",
    "system_tags": [
      "bio"
    ],
    "default_config": {
      "frequency_type": "ABSOLUTE",
      "target_days": 7,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Activity",
      "color": "bg-green-500"
    },
    "lenses": {
      "FORTITUDE": "Reconnect with the terrain. Stand firm.",
      "REASON": "Discharge static. Return to the natural baseline.",
      "VISIONARY": "Roots before branches. Connect to the source.",
      "ANALYTICAL": "Reduce inflammation via electron transfer (earthing) and autonomic balance."
    },
    "description": "10m bare skin on earth."
  },
  {
    "id": "BIO_04",
    "title": "Red Light",
    "category": "body",
    "system_tags": [
      "bio"
    ],
    "default_config": {
      "frequency_type": "ABSOLUTE",
      "target_days": 7,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Activity",
      "color": "bg-green-500"
    },
    "lenses": {
      "FORTITUDE": "Recovery mode. Heal the damage from the battle.",
      "REASON": "Mimic the natural evening spectrum to signal rest.",
      "VISIONARY": "Recharge the cells. Prepare for tomorrow's build.",
      "ANALYTICAL": "Stimulate mitochondrial cytochrome c oxidase for ATP regeneration."
    },
    "description": "10m Near-Infrared / Sunset exposure."
  },
  {
    "id": "BIO_05",
    "title": "Magnesium",
    "category": "body",
    "system_tags": [
      "bio"
    ],
    "default_config": {
      "frequency_type": "ABSOLUTE",
      "target_days": 7,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Activity",
      "color": "bg-green-500"
    },
    "lenses": {
      "FORTITUDE": "Reload the reserves. Don't run on empty.",
      "REASON": "Essential mineral support for nervous system relaxation.",
      "VISIONARY": "Fuel the recovery. Sleep deeper to dream bigger.",
      "ANALYTICAL": "Support GABA neurotransmitter function and parasympathetic activation."
    },
    "description": "400mg Glycinate/Threonate pre-bed."
  },
  {
    "id": "BIO_06",
    "title": "Digital Dark",
    "category": "body",
    "system_tags": [
      "bio"
    ],
    "default_config": {
      "frequency_type": "ABSOLUTE",
      "target_days": 7,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Activity",
      "color": "bg-green-500"
    },
    "lenses": {
      "FORTITUDE": "Perimeter secure. Cut the signal. No outside noise.",
      "REASON": "Protect the mind from algorithmic interference before rest.",
      "VISIONARY": "Guard the subconscious. Let the day's vision set without distraction.",
      "ANALYTICAL": "Prevent blue light suppression of melatonin onset."
    },
    "description": "No screens 60m pre-bed."
  },
  {
    "id": "BIO_07",
    "title": "Blue Light Blockers",
    "category": "body",
    "system_tags": [
      "bio"
    ],
    "default_config": {
      "frequency_type": "ABSOLUTE",
      "target_days": 7,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Activity",
      "color": "bg-green-500"
    },
    "lenses": {
      "FORTITUDE": "Shields up. Deflect the artificial junk light.",
      "REASON": "Filter the spectrum to match the ancestral environment.",
      "VISIONARY": "Protect the eyes, protect the vision.",
      "ANALYTICAL": "Block 450nm wavelength to preserve SCN timing."
    },
    "description": "Wear glasses post-sunset."
  },
  {
    "id": "BIO_08",
    "title": "Temperature Drop",
    "category": "body",
    "system_tags": [
      "bio"
    ],
    "default_config": {
      "frequency_type": "ABSOLUTE",
      "target_days": 7,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Activity",
      "color": "bg-green-500"
    },
    "lenses": {
      "FORTITUDE": "Sleep cold. Hibernate like a predator.",
      "REASON": "Environmental cue for deep rest.",
      "VISIONARY": "Cool the engine for maintenance.",
      "ANALYTICAL": "Facilitate core body temp drop required for N3 deep sleep."
    },
    "description": "Room temp < 68\u00b0F (20\u00b0C)."
  },
  {
    "id": "BIO_09",
    "title": "Mouth Tape",
    "category": "body",
    "system_tags": [
      "bio"
    ],
    "default_config": {
      "frequency_type": "ABSOLUTE",
      "target_days": 7,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Activity",
      "color": "bg-green-500"
    },
    "lenses": {
      "FORTITUDE": "Shut your mouth. Breathe through the nose. Discipline in sleep.",
      "REASON": "Correct the airway. Nasal breathing is the biological standard.",
      "VISIONARY": "Silent restoration. Optimize oxygen for the brain.",
      "ANALYTICAL": "Prevent mouth breathing to increase Nitric Oxide uptake +20%."
    },
    "description": "Tape on during sleep."
  },
  {
    "id": "BIO_10",
    "title": "Sleep Tracking",
    "category": "body",
    "system_tags": [
      "bio"
    ],
    "default_config": {
      "frequency_type": "ABSOLUTE",
      "target_days": 7,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Activity",
      "color": "bg-green-500"
    },
    "lenses": {
      "FORTITUDE": "Debrief the mission. Did you recover or did you fail?",
      "REASON": "What gets measured gets managed. Know your baseline.",
      "VISIONARY": "Audit the foundation. Ensure the machine is ready.",
      "ANALYTICAL": "Analyze REM/Deep ratios and HRV trends for readiness score."
    },
    "description": "Review Oura/Whoop/Sleep data."
  },
  {
    "id": "PHYS_01",
    "title": "Strength Session",
    "category": "body",
    "system_tags": [
      "phys"
    ],
    "default_config": {
      "frequency_type": "FREQUENCY",
      "target_days": 3,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Dumbbell",
      "color": "bg-red-500"
    },
    "lenses": {
      "FORTITUDE": "Move the iron. Force adaptation. Be harder to kill.",
      "REASON": "Gravity is the constant. Overcoming it is the virtue.",
      "VISIONARY": "Build the monument. A strong mind needs a strong frame.",
      "ANALYTICAL": "High-threshold motor unit recruitment for CNS adaptation."
    },
    "description": "45m Lifting / Resistance."
  },
  {
    "id": "PHYS_02",
    "title": "Ruck / Carry",
    "category": "body",
    "system_tags": [
      "phys"
    ],
    "default_config": {
      "frequency_type": "FREQUENCY",
      "target_days": 3,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Dumbbell",
      "color": "bg-red-500"
    },
    "lenses": {
      "FORTITUDE": "Carry the boats. Embrace the suck. Relentless forward motion.",
      "REASON": "Functional load bearing. Humans are built to carry.",
      "VISIONARY": "Bear the weight of the legacy. Build endurance.",
      "ANALYTICAL": "Zone 2 output with spinal compression training (bone density)."
    },
    "description": "30m Load Bearing (Pack or Farmers Walk)."
  },
  {
    "id": "PHYS_03",
    "title": "Sauna / Heat",
    "category": "body",
    "system_tags": [
      "phys"
    ],
    "default_config": {
      "frequency_type": "FREQUENCY",
      "target_days": 3,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Dumbbell",
      "color": "bg-red-500"
    },
    "lenses": {
      "FORTITUDE": "Sweat it out. Endure the heat. Purge the weakness.",
      "REASON": "Mimic fever to activate immune response.",
      "VISIONARY": "Alchemize the stress. Turn heat into resilience.",
      "ANALYTICAL": "Induce heat shock proteins (HSP) for cellular repair."
    },
    "description": "20m @ >170\u00b0F."
  },
  {
    "id": "PHYS_04",
    "title": "Mobility / Stretch",
    "category": "body",
    "system_tags": [
      "phys"
    ],
    "default_config": {
      "frequency_type": "ABSOLUTE",
      "target_days": 7,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Dumbbell",
      "color": "bg-red-500"
    },
    "lenses": {
      "FORTITUDE": "Maintenance. A jammed weapon cannot fire.",
      "REASON": "Fluidity. The tree that does not bend, breaks.",
      "VISIONARY": "Range of motion is range of action. Stay open.",
      "ANALYTICAL": "Connective tissue hydration and joint capsule health."
    },
    "description": "10m Flow / Yoga."
  },
  {
    "id": "PHYS_05",
    "title": "Sport / Play",
    "category": "body",
    "system_tags": [
      "phys"
    ],
    "default_config": {
      "frequency_type": "FREQUENCY",
      "target_days": 3,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Dumbbell",
      "color": "bg-red-500"
    },
    "lenses": {
      "FORTITUDE": "Combat. Test yourself against a live opponent.",
      "REASON": "Dynamic movement. Keep the nervous system reactive.",
      "VISIONARY": "The Arena. Express your capability in real-time.",
      "ANALYTICAL": "Proprioceptive training and neuroplasticity via complex movement."
    },
    "description": "30m Competitive or Skill activity."
  },
  {
    "id": "PHYS_06",
    "title": "Walk / Jog",
    "category": "body",
    "system_tags": [
      "phys"
    ],
    "default_config": {
      "frequency_type": "ABSOLUTE",
      "target_days": 7,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Dumbbell",
      "color": "bg-red-500"
    },
    "lenses": {
      "FORTITUDE": "Patrol. Cover ground. Keep moving.",
      "REASON": "The fundamental human movement. Clear the head.",
      "VISIONARY": "Forward motion. Step by step, the journey is made.",
      "ANALYTICAL": "Low-impact lymphatic drainage and cortisol clearance."
    },
    "description": "30m steady state."
  },
  {
    "id": "PHYS_07",
    "title": "HIIT",
    "category": "body",
    "system_tags": [
      "phys"
    ],
    "default_config": {
      "frequency_type": "FREQUENCY",
      "target_days": 3,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Dumbbell",
      "color": "bg-red-500"
    },
    "lenses": {
      "FORTITUDE": "Go to the dark place. Find your max heart rate.",
      "REASON": "Test the upper limits. Expand the capacity.",
      "VISIONARY": "Explosive power. Be ready to sprint when the door opens.",
      "ANALYTICAL": "Increase VO2 Max and anaerobic threshold."
    },
    "description": "15m Max Effort Intervals."
  },
  {
    "id": "PHYS_08",
    "title": "Yoga",
    "category": "body",
    "system_tags": [
      "phys"
    ],
    "default_config": {
      "frequency_type": "ABSOLUTE",
      "target_days": 7,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Dumbbell",
      "color": "bg-red-500"
    },
    "lenses": {
      "FORTITUDE": "Control under tension. Breathe through the hold.",
      "REASON": "Balance strength with flexibility.",
      "VISIONARY": "Union of breath and body. Center the axis.",
      "ANALYTICAL": "Parasympathetic activation via controlled respiration."
    },
    "description": "20m Structured Flow."
  },
  {
    "id": "PHYS_09",
    "title": "Cold Plunge (Active)",
    "category": "body",
    "system_tags": [
      "phys"
    ],
    "default_config": {
      "frequency_type": "FREQUENCY",
      "target_days": 3,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Dumbbell",
      "color": "bg-red-500"
    },
    "lenses": {
      "FORTITUDE": "Ice bath. Reset the inflammation. Numb the pain.",
      "REASON": "Systemic reset after high output.",
      "VISIONARY": "Clear the slate. Recovery is part of the work.",
      "ANALYTICAL": "Vasoconstriction to flush metabolic waste products."
    },
    "description": "Distinct from AM shower - this is recovery/training."
  },
  {
    "id": "PHYS_10",
    "title": "Zone 2 Cardio",
    "category": "body",
    "system_tags": [
      "phys"
    ],
    "default_config": {
      "frequency_type": "FREQUENCY",
      "target_days": 3,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Dumbbell",
      "color": "bg-red-500"
    },
    "lenses": {
      "FORTITUDE": "The long road. Boring work builds the engine.",
      "REASON": "Build the base. Efficiency over intensity.",
      "VISIONARY": "Longevity fuel. Stay in the game forever.",
      "ANALYTICAL": "Mitochondrial efficiency and lactate clearance optimization."
    },
    "description": "45m @ 60-70% Max HR."
  },
  {
    "id": "FUEL_01",
    "title": "The Fast",
    "category": "body",
    "system_tags": [
      "fuel"
    ],
    "default_config": {
      "frequency_type": "ABSOLUTE",
      "target_days": 7,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Apple",
      "color": "bg-orange-500"
    },
    "lenses": {
      "FORTITUDE": "Starve the weakness. Discipline over hunger.",
      "REASON": "Physiological reset. Give the digestion a break.",
      "VISIONARY": "Clear vessel. Empty stomach, sharp mind.",
      "ANALYTICAL": "Induce autophagy and stabilize insulin sensitivity."
    },
    "description": "16hr Fasting Window."
  },
  {
    "id": "FUEL_02",
    "title": "1g Protein / lb",
    "category": "body",
    "system_tags": [
      "fuel"
    ],
    "default_config": {
      "frequency_type": "ABSOLUTE",
      "target_days": 7,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Apple",
      "color": "bg-orange-500"
    },
    "lenses": {
      "FORTITUDE": "Build the armor. Feed the muscle.",
      "REASON": "Provide the raw materials for repair.",
      "VISIONARY": "Construct the temple. Use high-grade materials.",
      "ANALYTICAL": "Maximize Muscle Protein Synthesis (MPS)."
    },
    "description": "Hit Protein Macro."
  },
  {
    "id": "FUEL_03",
    "title": "Zero Sugar",
    "category": "body",
    "system_tags": [
      "fuel"
    ],
    "default_config": {
      "frequency_type": "ABSOLUTE",
      "target_days": 7,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Apple",
      "color": "bg-orange-500"
    },
    "lenses": {
      "FORTITUDE": "No poison. Don't fuel a Ferrari with trash.",
      "REASON": "Reject the cheap dopamine. Eat for function.",
      "VISIONARY": "Pure energy. Keep the signal clean.",
      "ANALYTICAL": "Prevent glycemic variability and crash."
    },
    "description": "No added sugar."
  },
  {
    "id": "FUEL_04",
    "title": "Creatine",
    "category": "body",
    "system_tags": [
      "fuel"
    ],
    "default_config": {
      "frequency_type": "ABSOLUTE",
      "target_days": 7,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Apple",
      "color": "bg-orange-500"
    },
    "lenses": {
      "FORTITUDE": "Take your medicine. Load the ammo.",
      "REASON": "Consistent deposit for future output.",
      "VISIONARY": "Brain fuel. Enhance the hardware.",
      "ANALYTICAL": "Saturate phosphocreatine stores for ATP recycling."
    },
    "description": "5g Monohydrate."
  },
  {
    "id": "FUEL_05",
    "title": "Electrolytes",
    "category": "body",
    "system_tags": [
      "fuel"
    ],
    "default_config": {
      "frequency_type": "ABSOLUTE",
      "target_days": 7,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Apple",
      "color": "bg-orange-500"
    },
    "lenses": {
      "FORTITUDE": "Pressurize the system. Stay conducted.",
      "REASON": "Electrical signaling requires salt.",
      "VISIONARY": "Spark the connection. Flow state requires fluid.",
      "ANALYTICAL": "Maintain cellular hydration and nerve transmission."
    },
    "description": "Sodium/Potassium/Magnesium mix."
  },
  {
    "id": "FUEL_06",
    "title": "Fermented Food",
    "category": "body",
    "system_tags": [
      "fuel"
    ],
    "default_config": {
      "frequency_type": "ABSOLUTE",
      "target_days": 7,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Apple",
      "color": "bg-orange-500"
    },
    "lenses": {
      "FORTITUDE": "Gut check. Strengthen the biome.",
      "REASON": "Ancient wisdom. Preserve the gut-brain axis.",
      "VISIONARY": "Internal ecosystem. Tend the garden.",
      "ANALYTICAL": "Diversify microbiome for serotonin production (90% in gut)."
    },
    "description": "Kimchi / Sauerkraut / Kefir."
  },
  {
    "id": "FUEL_07",
    "title": "Omega-3",
    "category": "body",
    "system_tags": [
      "fuel"
    ],
    "default_config": {
      "frequency_type": "ABSOLUTE",
      "target_days": 7,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Apple",
      "color": "bg-orange-500"
    },
    "lenses": {
      "FORTITUDE": "Oil the gears. Reduce the friction.",
      "REASON": "Anti-inflammatory protection.",
      "VISIONARY": "Fluid thoughts. Smooth operation.",
      "ANALYTICAL": "Cell membrane fluidity and neuro-protection."
    },
    "description": "2g EPA/DHA."
  },
  {
    "id": "FUEL_08",
    "title": "Raw Veggies",
    "category": "body",
    "system_tags": [
      "fuel"
    ],
    "default_config": {
      "frequency_type": "ABSOLUTE",
      "target_days": 7,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Apple",
      "color": "bg-orange-500"
    },
    "lenses": {
      "FORTITUDE": "Eat the earth. Discipline on the plate.",
      "REASON": "Micronutrient density. Fiber matrix.",
      "VISIONARY": "Live fuel. Energy from the source.",
      "ANALYTICAL": "Sulforaphane intake for detoxification pathways."
    },
    "description": "1 cup Greens/Cruciferous."
  },
  {
    "id": "FUEL_09",
    "title": "No Alcohol",
    "category": "body",
    "system_tags": [
      "fuel"
    ],
    "default_config": {
      "frequency_type": "ABSOLUTE",
      "target_days": 7,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Apple",
      "color": "bg-orange-500"
    },
    "lenses": {
      "FORTITUDE": "Stay sharp. No sedation. Reality is the drug.",
      "REASON": "Poison control. Why damage the hardware?",
      "VISIONARY": "Clear vision. No fog allowed.",
      "ANALYTICAL": "Prevent REM sleep fragmentation and cortisol spikes."
    },
    "description": "0 drinks."
  },
  {
    "id": "FUEL_10",
    "title": "Last Meal 3hr Pre-Bed",
    "category": "body",
    "system_tags": [
      "fuel"
    ],
    "default_config": {
      "frequency_type": "ABSOLUTE",
      "target_days": 7,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Apple",
      "color": "bg-orange-500"
    },
    "lenses": {
      "FORTITUDE": "Kitchen closed. Discipline at night.",
      "REASON": "Digest before you rest.",
      "VISIONARY": "Empty the tank for maintenance mode.",
      "ANALYTICAL": "Allow gastric emptying to optimize HRV during sleep."
    },
    "description": "Finish eating by 7-8pm."
  },
  {
    "id": "COG_01",
    "title": "Deep Work",
    "category": "mind",
    "system_tags": [
      "cog"
    ],
    "default_config": {
      "frequency_type": "ABSOLUTE",
      "target_days": 7,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Brain",
      "color": "bg-blue-500"
    },
    "lenses": {
      "FORTITUDE": "Tunnel vision. Lock in. Destroy the task.",
      "REASON": "Focus is currency. Spend it on the Great Work.",
      "VISIONARY": "The Studio. Create the legacy.",
      "ANALYTICAL": "Maximize cognitive load and flow state entry."
    },
    "description": "90m Distraction-Free."
  },
  {
    "id": "COG_02",
    "title": "Read (Analog)",
    "category": "mind",
    "system_tags": [
      "cog"
    ],
    "default_config": {
      "frequency_type": "ABSOLUTE",
      "target_days": 7,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Brain",
      "color": "bg-blue-500"
    },
    "lenses": {
      "FORTITUDE": "Download data. Learn from the generals.",
      "REASON": "Conversation with the dead. Absorb wisdom.",
      "VISIONARY": "Expand the library. New blueprints.",
      "ANALYTICAL": "Increase crystallized intelligence without blue light."
    },
    "description": "20 pages physical book."
  },
  {
    "id": "COG_03",
    "title": "No-Phone Block",
    "category": "mind",
    "system_tags": [
      "cog"
    ],
    "default_config": {
      "frequency_type": "ABSOLUTE",
      "target_days": 7,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Brain",
      "color": "bg-blue-500"
    },
    "lenses": {
      "FORTITUDE": "Sever the leash. You are not a slave to the notification.",
      "REASON": "Reclaim attention span.",
      "VISIONARY": "Silence the noise to hear the signal.",
      "ANALYTICAL": "Dopamine detox to reset baseline motivation."
    },
    "description": "1hr away from device."
  },
  {
    "id": "COG_04",
    "title": "Power Nap / NSDR",
    "category": "mind",
    "system_tags": [
      "cog"
    ],
    "default_config": {
      "frequency_type": "ABSOLUTE",
      "target_days": 7,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Brain",
      "color": "bg-blue-500"
    },
    "lenses": {
      "FORTITUDE": "Tactical reset. Reboot the system.",
      "REASON": "Efficient recovery. Sharpen the axe.",
      "VISIONARY": "Pause to accelerate.",
      "ANALYTICAL": "Flush adenosine and restore neuroplasticity."
    },
    "description": "20m Non-Sleep Deep Rest."
  },
  {
    "id": "COG_05",
    "title": "Language Study",
    "category": "mind",
    "system_tags": [
      "cog"
    ],
    "default_config": {
      "frequency_type": "FREQUENCY",
      "target_days": 3,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Brain",
      "color": "bg-blue-500"
    },
    "lenses": {
      "FORTITUDE": "New codes. Sharpen the comms.",
      "REASON": "Expand the mental map.",
      "VISIONARY": "Speak to the world. Bridge the gap.",
      "ANALYTICAL": "Neurogenesis via novel syntax acquisition."
    },
    "description": "15m Practice."
  },
  {
    "id": "COG_06",
    "title": "Skill Practice",
    "category": "mind",
    "system_tags": [
      "cog"
    ],
    "default_config": {
      "frequency_type": "FREQUENCY",
      "target_days": 3,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Brain",
      "color": "bg-blue-500"
    },
    "lenses": {
      "FORTITUDE": "Drill the mechanics. Amateurs practice until they get it right; pros until they can't get it wrong.",
      "REASON": "Competence is confidence.",
      "VISIONARY": "Add a tool to the belt.",
      "ANALYTICAL": "Myelination of neural pathways."
    },
    "description": "20m Deliberate Practice."
  },
  {
    "id": "COG_07",
    "title": "Writing / Output",
    "category": "mind",
    "system_tags": [
      "cog"
    ],
    "default_config": {
      "frequency_type": "ABSOLUTE",
      "target_days": 7,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Brain",
      "color": "bg-blue-500"
    },
    "lenses": {
      "FORTITUDE": "After-action report. Clear the chamber.",
      "REASON": "Thinking on paper. Structure the chaos.",
      "VISIONARY": "Manifest the idea. Make it real.",
      "ANALYTICAL": "Externalize working memory to reduce load."
    },
    "description": "500 words / Journaling."
  },
  {
    "id": "COG_08",
    "title": "Podcast / Learning",
    "category": "mind",
    "system_tags": [
      "cog"
    ],
    "default_config": {
      "frequency_type": "ABSOLUTE",
      "target_days": 7,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Brain",
      "color": "bg-blue-500"
    },
    "lenses": {
      "FORTITUDE": "Briefing. Get the intel.",
      "REASON": "Always be learning. The mind must eat.",
      "VISIONARY": "Inspiration input. Spark the next idea.",
      "ANALYTICAL": "Auditory information processing."
    },
    "description": "30m Educational Audio."
  },
  {
    "id": "COG_09",
    "title": "Pomodoro Sprints",
    "category": "mind",
    "system_tags": [
      "cog"
    ],
    "default_config": {
      "frequency_type": "ABSOLUTE",
      "target_days": 7,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Brain",
      "color": "bg-blue-500"
    },
    "lenses": {
      "FORTITUDE": "Sprinting speed. Race the clock.",
      "REASON": "Time-boxing creates urgency.",
      "VISIONARY": "Chop the wood. Stack the bricks.",
      "ANALYTICAL": "Optimize work/rest ratios for sustained attention."
    },
    "description": "4 x 25m Intervals."
  },
  {
    "id": "COG_10",
    "title": "Inbox Zero",
    "category": "mind",
    "system_tags": [
      "cog"
    ],
    "default_config": {
      "frequency_type": "ABSOLUTE",
      "target_days": 7,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Brain",
      "color": "bg-blue-500"
    },
    "lenses": {
      "FORTITUDE": "Clear comms. No open loops.",
      "REASON": "Order the information stream.",
      "VISIONARY": "Clear the deck for new opportunities.",
      "ANALYTICAL": "Reduce decision fatigue from cluttered inputs."
    },
    "description": "Clear email/messages."
  },
  {
    "id": "STOIC_01",
    "title": "The Shadow Audit",
    "category": "spirit",
    "system_tags": [
      "stoic"
    ],
    "default_config": {
      "frequency_type": "FREQUENCY",
      "target_days": 3,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Flame",
      "color": "bg-purple-500"
    },
    "lenses": {
      "FORTITUDE": "Face the darkness. Where did you fail? Own it.",
      "REASON": "Objective analysis of error. Correct the course.",
      "VISIONARY": "Integrate the shadow. Become whole.",
      "ANALYTICAL": "Root cause analysis of behavioral deviations."
    },
    "description": "Review daily failures/emotions."
  },
  {
    "id": "STOIC_02",
    "title": "Accountability Mirror",
    "category": "spirit",
    "system_tags": [
      "stoic"
    ],
    "default_config": {
      "frequency_type": "ABSOLUTE",
      "target_days": 7,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Flame",
      "color": "bg-purple-500"
    },
    "lenses": {
      "FORTITUDE": "Look yourself in the eye. No lies.",
      "REASON": "The only judgment that matters is your own.",
      "VISIONARY": "See the person you are becoming.",
      "ANALYTICAL": "Self-perception check and identity reinforcement."
    },
    "description": "1m Self-Confrontation."
  },
  {
    "id": "STOIC_03",
    "title": "Journal (Brain Dump)",
    "category": "spirit",
    "system_tags": [
      "stoic"
    ],
    "default_config": {
      "frequency_type": "ABSOLUTE",
      "target_days": 7,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Flame",
      "color": "bg-purple-500"
    },
    "lenses": {
      "FORTITUDE": "Clear the jam. Get the noise out.",
      "REASON": "Examine the impressions.",
      "VISIONARY": "Chronicle the journey.",
      "ANALYTICAL": "Emotional regulation via linguistic processing."
    },
    "description": "Free writing."
  },
  {
    "id": "STOIC_04",
    "title": "Meditation",
    "category": "spirit",
    "system_tags": [
      "stoic"
    ],
    "default_config": {
      "frequency_type": "ABSOLUTE",
      "target_days": 7,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Flame",
      "color": "bg-purple-500"
    },
    "lenses": {
      "FORTITUDE": "Hold the line. Control the monkey mind.",
      "REASON": "Observe the thinker. Detach from the thought.",
      "VISIONARY": "Access the source. Clarity.",
      "ANALYTICAL": "Default Mode Network (DMN) suppression."
    },
    "description": "10m Stillness."
  },
  {
    "id": "STOIC_05",
    "title": "Box Breathing",
    "category": "spirit",
    "system_tags": [
      "stoic"
    ],
    "default_config": {
      "frequency_type": "ABSOLUTE",
      "target_days": 7,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Flame",
      "color": "bg-purple-500"
    },
    "lenses": {
      "FORTITUDE": "Sniper focus. Calm under pressure.",
      "REASON": "Regulate the nervous system.",
      "VISIONARY": "Center the axis.",
      "ANALYTICAL": "Vagus nerve stimulation to lower heart rate."
    },
    "description": "5m (4-4-4-4 count)."
  },
  {
    "id": "STOIC_06",
    "title": "Visualization",
    "category": "spirit",
    "system_tags": [
      "stoic"
    ],
    "default_config": {
      "frequency_type": "ABSOLUTE",
      "target_days": 7,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Flame",
      "color": "bg-purple-500"
    },
    "lenses": {
      "FORTITUDE": "War game. See the obstacles. Overcome them.",
      "REASON": "Premeditatio Malorum. Be prepared.",
      "VISIONARY": "See the castle before you build it.",
      "ANALYTICAL": "Neural priming of motor pathways."
    },
    "description": "5m Mental Rehearsal."
  },
  {
    "id": "STOIC_07",
    "title": "Gratitude Practice",
    "category": "spirit",
    "system_tags": [
      "stoic"
    ],
    "default_config": {
      "frequency_type": "ABSOLUTE",
      "target_days": 7,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Flame",
      "color": "bg-purple-500"
    },
    "lenses": {
      "FORTITUDE": "Acknowledge the supply lines.",
      "REASON": "Want what you have.",
      "VISIONARY": "Abundance mindset.",
      "ANALYTICAL": "Positive psychology intervention to shift serotonin."
    },
    "description": "3 items written."
  },
  {
    "id": "STOIC_08",
    "title": "Digital Minimalism",
    "category": "spirit",
    "system_tags": [
      "stoic"
    ],
    "default_config": {
      "frequency_type": "ABSOLUTE",
      "target_days": 7,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Flame",
      "color": "bg-purple-500"
    },
    "lenses": {
      "FORTITUDE": "Strip the gear. Travel light.",
      "REASON": "Essentialism. Less but better.",
      "VISIONARY": "Focus on the signal.",
      "ANALYTICAL": "Reduction of cognitive interference."
    },
    "description": "Delete/Hide distractions."
  },
  {
    "id": "STOIC_09",
    "title": "Silence Block",
    "category": "spirit",
    "system_tags": [
      "stoic"
    ],
    "default_config": {
      "frequency_type": "ABSOLUTE",
      "target_days": 7,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Flame",
      "color": "bg-purple-500"
    },
    "lenses": {
      "FORTITUDE": "Embrace the void. Don't fear the quiet.",
      "REASON": "Solitude allows thought to settle.",
      "VISIONARY": "Listen to the intuition.",
      "ANALYTICAL": "Sensory deprivation for neural rest."
    },
    "description": "10m No Input/Output."
  },
  {
    "id": "STOIC_10",
    "title": "Memento Mori",
    "category": "spirit",
    "system_tags": [
      "stoic"
    ],
    "default_config": {
      "frequency_type": "ABSOLUTE",
      "target_days": 7,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Flame",
      "color": "bg-purple-500"
    },
    "lenses": {
      "FORTITUDE": "You will die. Act like it.",
      "REASON": "Nature's limit. Accept the timeline.",
      "VISIONARY": "Urgency. Build something that lasts.",
      "ANALYTICAL": "Psychological contrast to increase value of time."
    },
    "description": "Contemplate mortality."
  },
  {
    "id": "LOG_01",
    "title": "Environment Clear",
    "category": "business",
    "system_tags": [
      "log"
    ],
    "default_config": {
      "frequency_type": "ABSOLUTE",
      "target_days": 7,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Clipboard",
      "color": "bg-slate-500"
    },
    "lenses": {
      "FORTITUDE": "Order the perimeter. No chaos in the base.",
      "REASON": "External order reflects internal order.",
      "VISIONARY": "Set the stage.",
      "ANALYTICAL": "Reduce visual noise to improve focus."
    },
    "description": "Tidy workspace/room."
  },
  {
    "id": "LOG_02",
    "title": "Meal Prep",
    "category": "business",
    "system_tags": [
      "log"
    ],
    "default_config": {
      "frequency_type": "ABSOLUTE",
      "target_days": 7,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Clipboard",
      "color": "bg-slate-500"
    },
    "lenses": {
      "FORTITUDE": "Secure the supply lines. Don't scavenge.",
      "REASON": "Automate the decision. Eat for function.",
      "VISIONARY": "Fueling strategy.",
      "ANALYTICAL": "Control caloric and macro variables."
    },
    "description": "Prepare food for tomorrow."
  },
  {
    "id": "LOG_03",
    "title": "Tomorrow\u2019s Kit",
    "category": "business",
    "system_tags": [
      "log"
    ],
    "default_config": {
      "frequency_type": "ABSOLUTE",
      "target_days": 7,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Clipboard",
      "color": "bg-slate-500"
    },
    "lenses": {
      "FORTITUDE": "Ready to step. No friction at 0600.",
      "REASON": "Reduce morning drag.",
      "VISIONARY": "Dress for the mission.",
      "ANALYTICAL": "Eliminate decision fatigue units in AM."
    },
    "description": "Lay out clothes/gear."
  },
  {
    "id": "LOG_04",
    "title": "Financial Audit",
    "category": "business",
    "system_tags": [
      "log"
    ],
    "default_config": {
      "frequency_type": "FREQUENCY",
      "target_days": 3,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Clipboard",
      "color": "bg-slate-500"
    },
    "lenses": {
      "FORTITUDE": "Check the ammo. Know your resources.",
      "REASON": "Frugality is freedom.",
      "VISIONARY": "Resource allocation for the build.",
      "ANALYTICAL": "Cash flow analysis."
    },
    "description": "Check balances/spend."
  },
  {
    "id": "LOG_05",
    "title": "Social Sync",
    "category": "business",
    "system_tags": [
      "log"
    ],
    "default_config": {
      "frequency_type": "ABSOLUTE",
      "target_days": 7,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Clipboard",
      "color": "bg-slate-500"
    },
    "lenses": {
      "FORTITUDE": "Comms check. Align the unit.",
      "REASON": "Coordinate the tribe.",
      "VISIONARY": "Shared vision.",
      "ANALYTICAL": "Calendar synchronization."
    },
    "description": "Coord with partner/team."
  },
  {
    "id": "LOG_06",
    "title": "Home Maintenance",
    "category": "business",
    "system_tags": [
      "log"
    ],
    "default_config": {
      "frequency_type": "ABSOLUTE",
      "target_days": 7,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Clipboard",
      "color": "bg-slate-500"
    },
    "lenses": {
      "FORTITUDE": "Maintain the fortress.",
      "REASON": "Entropy is the enemy. Fix what is broken.",
      "VISIONARY": "Respect the space.",
      "ANALYTICAL": "Preventative maintenance."
    },
    "description": "15m Chores/Fix."
  },
  {
    "id": "LOG_07",
    "title": "Inbox Triage",
    "category": "business",
    "system_tags": [
      "log"
    ],
    "default_config": {
      "frequency_type": "ABSOLUTE",
      "target_days": 7,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Clipboard",
      "color": "bg-slate-500"
    },
    "lenses": {
      "FORTITUDE": "Sort the intel. Prioritize targets.",
      "REASON": "Organization of inputs.",
      "VISIONARY": "Clear the deck.",
      "ANALYTICAL": "GTD (Getting Things Done) processing."
    },
    "description": "Sort actionable vs archive."
  },
  {
    "id": "LOG_08",
    "title": "Grocery Run",
    "category": "business",
    "system_tags": [
      "log"
    ],
    "default_config": {
      "frequency_type": "ABSOLUTE",
      "target_days": 7,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Clipboard",
      "color": "bg-slate-500"
    },
    "lenses": {
      "FORTITUDE": "Resupply. Keep the larder full.",
      "REASON": "Logistics win wars.",
      "VISIONARY": "High quality inputs.",
      "ANALYTICAL": "Inventory management."
    },
    "description": "Stock provisions."
  },
  {
    "id": "LOG_09",
    "title": "Task Batching",
    "category": "business",
    "system_tags": [
      "log"
    ],
    "default_config": {
      "frequency_type": "ABSOLUTE",
      "target_days": 7,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Clipboard",
      "color": "bg-slate-500"
    },
    "lenses": {
      "FORTITUDE": "Execute in clusters. Efficiency.",
      "REASON": "Reduce switching costs.",
      "VISIONARY": "Flow through the work.",
      "ANALYTICAL": "Minimize context switching penalty."
    },
    "description": "Group similar small tasks."
  },
  {
    "id": "LOG_10",
    "title": "Weekly Review",
    "category": "business",
    "system_tags": [
      "log"
    ],
    "default_config": {
      "frequency_type": "FREQUENCY",
      "target_days": 3,
      "time_of_day": "any"
    },
    "visuals": {
      "icon": "Clipboard",
      "color": "bg-slate-500"
    },
    "lenses": {
      "FORTITUDE": "War room. Map the battlefield.",
      "REASON": "Strategic planning.",
      "VISIONARY": "Architect the future.",
      "ANALYTICAL": "Performance review and iteration."
    },
    "description": "Plan the week ahead (Sunday)."
  }
];

export const PROTOCOL_STACKS = [
  { id: 'stack_atlas', title: 'ATLAS GOLDEN SET', description: 'Foundation.', habit_ids: ['BIO_01', 'BIO_05', 'FUEL_02', 'LOG_03'] },
  { id: 'stack_huberman', title: 'HUBERMAN NEURAL', description: 'Brain opt.', habit_ids: ['BIO_01', 'BIO_02', 'BIO_04', 'PHYS_10'] },
  { id: 'stack_jocko', title: 'JOCKO DISCIPLINE', description: 'Execution.', habit_ids: ['BIO_09', 'PHYS_01', 'FUEL_01', 'LOG_03'] },
  { id: 'stack_stoic', title: 'THE STOIC', description: 'Resilience.', habit_ids: ['STOIC_04', 'STOIC_03', 'STOIC_10', 'COG_02'] },
  { id: 'stack_deep', title: 'DEEP WORK', description: 'Focus.', habit_ids: ['COG_01', 'COG_03', 'COG_09', 'BIO_06'] }
];
