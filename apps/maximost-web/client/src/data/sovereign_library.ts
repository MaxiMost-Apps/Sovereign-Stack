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
  Apple, Crosshair, Beaker, Binary, Crown, Globe
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
  Apple, Crosshair, Beaker, Binary, Crown, Globe
};

// 1. THE DATA RECORD (Lenses)
export const SOVEREIGN_LIBRARY_DATA: Record<string, { operator: string, scientist: string, ceo: string, human: string }> = {
  'BIO_01': {
    "operator": "Visual perimeter check. Signal the system to wake up and fight.",
    "human": "Align biological clock with solar time. Optimize cortisol/melatonin timing.",
    "ceo": "First victory. Light the path. Clear eyes for the day's vision.",
    "scientist": "Trigger ipRGCs to anchor circadian rhythm and suppress daytime melatonin."
},
  'BIO_02': {
    "operator": "Kill the comfort. If you can handle the cold, you can handle the chaos.",
    "human": "Voluntary hardship. Train the mind to remain calm in shock.",
    "ceo": "Forge the steel. A tempered body creates a sharp mind.",
    "scientist": "Spike norepinephrine 300%. Activate brown fat thermogenesis."
},
  'BIO_03': {
    "operator": "Reconnect with the terrain. Stand firm.",
    "human": "Discharge static. Return to the natural baseline.",
    "ceo": "Roots before branches. Connect to the source.",
    "scientist": "Reduce inflammation via electron transfer (earthing) and autonomic balance."
},
  'BIO_04': {
    "operator": "Recovery mode. Heal the damage from the battle.",
    "human": "Mimic the natural evening spectrum to signal rest.",
    "ceo": "Recharge the cells. Prepare for tomorrow's build.",
    "scientist": "Stimulate mitochondrial cytochrome c oxidase for ATP regeneration."
},
  'BIO_05': {
    "operator": "Reload the reserves. Don't run on empty.",
    "human": "Essential mineral support for nervous system relaxation.",
    "ceo": "Fuel the recovery. Sleep deeper to dream bigger.",
    "scientist": "Support GABA neurotransmitter function and parasympathetic activation."
},
  'BIO_06': {
    "operator": "Perimeter secure. Cut the signal. No outside noise.",
    "human": "Protect the mind from algorithmic interference before rest.",
    "ceo": "Guard the subconscious. Let the day's vision set without distraction.",
    "scientist": "Prevent blue light suppression of melatonin onset."
},
  'BIO_07': {
    "operator": "Shields up. Deflect the artificial junk light.",
    "human": "Filter the spectrum to match the ancestral environment.",
    "ceo": "Protect the eyes, protect the vision.",
    "scientist": "Block 450nm wavelength to preserve SCN timing."
},
  'BIO_08': {
    "operator": "Sleep cold. Hibernate like a predator.",
    "human": "Environmental cue for deep rest.",
    "ceo": "Cool the engine for maintenance.",
    "scientist": "Facilitate core body temp drop required for N3 deep sleep."
},
  'BIO_09': {
    "operator": "Shut your mouth. Breathe through the nose. Discipline in sleep.",
    "human": "Correct the airway. Nasal breathing is the biological standard.",
    "ceo": "Silent restoration. Optimize oxygen for the brain.",
    "scientist": "Prevent mouth breathing to increase Nitric Oxide uptake +20%."
},
  'BIO_10': {
    "operator": "Debrief the mission. Did you recover or did you fail?",
    "human": "What gets measured gets managed. Know your baseline.",
    "ceo": "Audit the foundation. Ensure the machine is ready.",
    "scientist": "Analyze REM/Deep ratios and HRV trends for readiness score."
},
  'PHYS_01': {
    "operator": "Move the iron. Force adaptation. Be harder to kill.",
    "human": "Gravity is the constant. Overcoming it is the virtue.",
    "ceo": "Build the monument. A strong mind needs a strong frame.",
    "scientist": "High-threshold motor unit recruitment for CNS adaptation."
},
  'PHYS_02': {
    "operator": "Carry the boats. Embrace the suck. Relentless forward motion.",
    "human": "Functional load bearing. Humans are built to carry.",
    "ceo": "Bear the weight of the legacy. Build endurance.",
    "scientist": "Zone 2 output with spinal compression training (bone density)."
},
  'PHYS_03': {
    "operator": "Sweat it out. Endure the heat. Purge the weakness.",
    "human": "Mimic fever to activate immune response.",
    "ceo": "Alchemize the stress. Turn heat into resilience.",
    "scientist": "Induce heat shock proteins (HSP) for cellular repair."
},
  'PHYS_04': {
    "operator": "Maintenance. A jammed weapon cannot fire.",
    "human": "Fluidity. The tree that does not bend, breaks.",
    "ceo": "Range of motion is range of action. Stay open.",
    "scientist": "Connective tissue hydration and joint capsule health."
},
  'PHYS_05': {
    "operator": "Combat. Test yourself against a live opponent.",
    "human": "Dynamic movement. Keep the nervous system reactive.",
    "ceo": "The Arena. Express your capability in real-time.",
    "scientist": "Proprioceptive training and neuroplasticity via complex movement."
},
  'PHYS_06': {
    "operator": "Patrol. Cover ground. Keep moving.",
    "human": "The fundamental human movement. Clear the head.",
    "ceo": "Forward motion. Step by step, the journey is made.",
    "scientist": "Low-impact lymphatic drainage and cortisol clearance."
},
  'PHYS_07': {
    "operator": "Go to the dark place. Find your max heart rate.",
    "human": "Test the upper limits. Expand the capacity.",
    "ceo": "Explosive power. Be ready to sprint when the door opens.",
    "scientist": "Increase VO2 Max and anaerobic threshold."
},
  'PHYS_08': {
    "operator": "Control under tension. Breathe through the hold.",
    "human": "Balance strength with flexibility.",
    "ceo": "Union of breath and body. Center the axis.",
    "scientist": "Parasympathetic activation via controlled respiration."
},
  'PHYS_09': {
    "operator": "Ice bath. Reset the inflammation. Numb the pain.",
    "human": "Systemic reset after high output.",
    "ceo": "Clear the slate. Recovery is part of the work.",
    "scientist": "Vasoconstriction to flush metabolic waste products."
},
  'PHYS_10': {
    "operator": "The long road. Boring work builds the engine.",
    "human": "Build the base. Efficiency over intensity.",
    "ceo": "Longevity fuel. Stay in the game forever.",
    "scientist": "Mitochondrial efficiency and lactate clearance optimization."
},
  'FUEL_01': {
    "operator": "Starve the weakness. Discipline over hunger.",
    "human": "Physiological reset. Give the digestion a break.",
    "ceo": "Clear vessel. Empty stomach, sharp mind.",
    "scientist": "Induce autophagy and stabilize insulin sensitivity."
},
  'FUEL_02': {
    "operator": "Build the armor. Feed the muscle.",
    "human": "Provide the raw materials for repair.",
    "ceo": "Construct the temple. Use high-grade materials.",
    "scientist": "Maximize Muscle Protein Synthesis (MPS)."
},
  'FUEL_03': {
    "operator": "No poison. Don't fuel a Ferrari with trash.",
    "human": "Reject the cheap dopamine. Eat for function.",
    "ceo": "Pure energy. Keep the signal clean.",
    "scientist": "Prevent glycemic variability and crash."
},
  'FUEL_04': {
    "operator": "Take your medicine. Load the ammo.",
    "human": "Consistent deposit for future output.",
    "ceo": "Brain fuel. Enhance the hardware.",
    "scientist": "Saturate phosphocreatine stores for ATP recycling."
},
  'FUEL_05': {
    "operator": "Pressurize the system. Stay conducted.",
    "human": "Electrical signaling requires salt.",
    "ceo": "Spark the connection. Flow state requires fluid.",
    "scientist": "Maintain cellular hydration and nerve transmission."
},
  'FUEL_06': {
    "operator": "Gut check. Strengthen the biome.",
    "human": "Ancient wisdom. Preserve the gut-brain axis.",
    "ceo": "Internal ecosystem. Tend the garden.",
    "scientist": "Diversify microbiome for serotonin production (90% in gut)."
},
  'FUEL_07': {
    "operator": "Oil the gears. Reduce the friction.",
    "human": "Anti-inflammatory protection.",
    "ceo": "Fluid thoughts. Smooth operation.",
    "scientist": "Cell membrane fluidity and neuro-protection."
},
  'FUEL_08': {
    "operator": "Eat the earth. Discipline on the plate.",
    "human": "Micronutrient density. Fiber matrix.",
    "ceo": "Live fuel. Energy from the source.",
    "scientist": "Sulforaphane intake for detoxification pathways."
},
  'FUEL_09': {
    "operator": "Stay sharp. No sedation. Reality is the drug.",
    "human": "Poison control. Why damage the hardware?",
    "ceo": "Clear vision. No fog allowed.",
    "scientist": "Prevent REM sleep fragmentation and cortisol spikes."
},
  'FUEL_10': {
    "operator": "Kitchen closed. Discipline at night.",
    "human": "Digest before you rest.",
    "ceo": "Empty the tank for maintenance mode.",
    "scientist": "Allow gastric emptying to optimize HRV during sleep."
},
  'COG_01': {
    "operator": "Tunnel vision. Lock in. Destroy the task.",
    "human": "Focus is currency. Spend it on the Great Work.",
    "ceo": "The Studio. Create the legacy.",
    "scientist": "Maximize cognitive load and flow state entry."
},
  'COG_02': {
    "operator": "Download data. Learn from the generals.",
    "human": "Conversation with the dead. Absorb wisdom.",
    "ceo": "Expand the library. New blueprints.",
    "scientist": "Increase crystallized intelligence without blue light."
},
  'COG_03': {
    "operator": "Sever the leash. You are not a slave to the notification.",
    "human": "Reclaim attention span.",
    "ceo": "Silence the noise to hear the signal.",
    "scientist": "Dopamine detox to reset baseline motivation."
},
  'COG_04': {
    "operator": "Tactical reset. Reboot the system.",
    "human": "Efficient recovery. Sharpen the axe.",
    "ceo": "Pause to accelerate.",
    "scientist": "Flush adenosine and restore neuroplasticity."
},
  'COG_05': {
    "operator": "New codes. Sharpen the comms.",
    "human": "Expand the mental map.",
    "ceo": "Speak to the world. Bridge the gap.",
    "scientist": "Neurogenesis via novel syntax acquisition."
},
  'COG_06': {
    "operator": "Drill the mechanics. Amateurs practice until they get it right; pros until they can't get it wrong.",
    "human": "Competence is confidence.",
    "ceo": "Add a tool to the belt.",
    "scientist": "Myelination of neural pathways."
},
  'COG_07': {
    "operator": "After-action report. Clear the chamber.",
    "human": "Thinking on paper. Structure the chaos.",
    "ceo": "Manifest the idea. Make it real.",
    "scientist": "Externalize working memory to reduce load."
},
  'COG_08': {
    "operator": "Briefing. Get the intel.",
    "human": "Always be learning. The mind must eat.",
    "ceo": "Inspiration input. Spark the next idea.",
    "scientist": "Auditory information processing."
},
  'COG_09': {
    "operator": "Sprinting speed. Race the clock.",
    "human": "Time-boxing creates urgency.",
    "ceo": "Chop the wood. Stack the bricks.",
    "scientist": "Optimize work/rest ratios for sustained attention."
},
  'COG_10': {
    "operator": "Clear comms. No open loops.",
    "human": "Order the information stream.",
    "ceo": "Clear the deck for new opportunities.",
    "scientist": "Reduce decision fatigue from cluttered inputs."
},
  'STOIC_01': {
    "operator": "Face the darkness. Where did you fail? Own it.",
    "human": "Objective analysis of error. Correct the course.",
    "ceo": "Integrate the shadow. Become whole.",
    "scientist": "Root cause analysis of behavioral deviations."
},
  'STOIC_02': {
    "operator": "Look yourself in the eye. No lies.",
    "human": "The only judgment that matters is your own.",
    "ceo": "See the person you are becoming.",
    "scientist": "Self-perception check and identity reinforcement."
},
  'STOIC_03': {
    "operator": "Clear the jam. Get the noise out.",
    "human": "Examine the impressions.",
    "ceo": "Chronicle the journey.",
    "scientist": "Emotional regulation via linguistic processing."
},
  'STOIC_04': {
    "operator": "Hold the line. Control the monkey mind.",
    "human": "Observe the thinker. Detach from the thought.",
    "ceo": "Access the source. Clarity.",
    "scientist": "Default Mode Network (DMN) suppression."
},
  'STOIC_05': {
    "operator": "Sniper focus. Calm under pressure.",
    "human": "Regulate the nervous system.",
    "ceo": "Center the axis.",
    "scientist": "Vagus nerve stimulation to lower heart rate."
},
  'STOIC_06': {
    "operator": "War game. See the obstacles. Overcome them.",
    "human": "Premeditatio Malorum. Be prepared.",
    "ceo": "See the castle before you build it.",
    "scientist": "Neural priming of motor pathways."
},
  'STOIC_07': {
    "operator": "Acknowledge the supply lines.",
    "human": "Want what you have.",
    "ceo": "Abundance mindset.",
    "scientist": "Positive psychology intervention to shift serotonin."
},
  'STOIC_08': {
    "operator": "Strip the gear. Travel light.",
    "human": "Essentialism. Less but better.",
    "ceo": "Focus on the signal.",
    "scientist": "Reduction of cognitive interference."
},
  'STOIC_09': {
    "operator": "Embrace the void. Don't fear the quiet.",
    "human": "Solitude allows thought to settle.",
    "ceo": "Listen to the intuition.",
    "scientist": "Sensory deprivation for neural rest."
},
  'STOIC_10': {
    "operator": "You will die. Act like it.",
    "human": "Nature's limit. Accept the timeline.",
    "ceo": "Urgency. Build something that lasts.",
    "scientist": "Psychological contrast to increase value of time."
},
  'LOG_01': {
    "operator": "Order the perimeter. No chaos in the base.",
    "human": "External order reflects internal order.",
    "ceo": "Set the stage.",
    "scientist": "Reduce visual noise to improve focus."
},
  'LOG_02': {
    "operator": "Secure the supply lines. Don't scavenge.",
    "human": "Automate the decision. Eat for function.",
    "ceo": "Fueling strategy.",
    "scientist": "Control caloric and macro variables."
},
  'LOG_03': {
    "operator": "Ready to step. No friction at 0600.",
    "human": "Reduce morning drag.",
    "ceo": "Dress for the mission.",
    "scientist": "Eliminate decision fatigue units in AM."
},
  'LOG_04': {
    "operator": "Check the ammo. Know your resources.",
    "human": "Frugality is freedom.",
    "ceo": "Resource allocation for the build.",
    "scientist": "Cash flow analysis."
},
  'LOG_05': {
    "operator": "Comms check. Align the unit.",
    "human": "Coordinate the tribe.",
    "ceo": "Shared vision.",
    "scientist": "Calendar synchronization."
},
  'LOG_06': {
    "operator": "Maintain the fortress.",
    "human": "Entropy is the enemy. Fix what is broken.",
    "ceo": "Respect the space.",
    "scientist": "Preventative maintenance."
},
  'LOG_07': {
    "operator": "Sort the intel. Prioritize targets.",
    "human": "Organization of inputs.",
    "ceo": "Clear the deck.",
    "scientist": "GTD (Getting Things Done) processing."
},
  'LOG_08': {
    "operator": "Resupply. Keep the larder full.",
    "human": "Logistics win wars.",
    "ceo": "High quality inputs.",
    "scientist": "Inventory management."
},
  'LOG_09': {
    "operator": "Execute in clusters. Efficiency.",
    "human": "Reduce switching costs.",
    "ceo": "Flow through the work.",
    "scientist": "Minimize context switching penalty."
},
  'LOG_10': {
    "operator": "War room. Map the battlefield.",
    "human": "Strategic planning.",
    "ceo": "Architect the future.",
    "scientist": "Performance review and iteration."
},
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
    "lens_data": {
      "operator": "Visual perimeter check. Signal the system to wake up and fight.",
      "human": "Align biological clock with solar time. Optimize cortisol/melatonin timing.",
      "ceo": "First victory. Light the path. Clear eyes for the day's vision.",
      "scientist": "Trigger ipRGCs to anchor circadian rhythm and suppress daytime melatonin."
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
    "lens_data": {
      "operator": "Kill the comfort. If you can handle the cold, you can handle the chaos.",
      "human": "Voluntary hardship. Train the mind to remain calm in shock.",
      "ceo": "Forge the steel. A tempered body creates a sharp mind.",
      "scientist": "Spike norepinephrine 300%. Activate brown fat thermogenesis."
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
    "lens_data": {
      "operator": "Reconnect with the terrain. Stand firm.",
      "human": "Discharge static. Return to the natural baseline.",
      "ceo": "Roots before branches. Connect to the source.",
      "scientist": "Reduce inflammation via electron transfer (earthing) and autonomic balance."
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
    "lens_data": {
      "operator": "Recovery mode. Heal the damage from the battle.",
      "human": "Mimic the natural evening spectrum to signal rest.",
      "ceo": "Recharge the cells. Prepare for tomorrow's build.",
      "scientist": "Stimulate mitochondrial cytochrome c oxidase for ATP regeneration."
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
    "lens_data": {
      "operator": "Reload the reserves. Don't run on empty.",
      "human": "Essential mineral support for nervous system relaxation.",
      "ceo": "Fuel the recovery. Sleep deeper to dream bigger.",
      "scientist": "Support GABA neurotransmitter function and parasympathetic activation."
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
    "lens_data": {
      "operator": "Perimeter secure. Cut the signal. No outside noise.",
      "human": "Protect the mind from algorithmic interference before rest.",
      "ceo": "Guard the subconscious. Let the day's vision set without distraction.",
      "scientist": "Prevent blue light suppression of melatonin onset."
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
    "lens_data": {
      "operator": "Shields up. Deflect the artificial junk light.",
      "human": "Filter the spectrum to match the ancestral environment.",
      "ceo": "Protect the eyes, protect the vision.",
      "scientist": "Block 450nm wavelength to preserve SCN timing."
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
    "lens_data": {
      "operator": "Sleep cold. Hibernate like a predator.",
      "human": "Environmental cue for deep rest.",
      "ceo": "Cool the engine for maintenance.",
      "scientist": "Facilitate core body temp drop required for N3 deep sleep."
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
    "lens_data": {
      "operator": "Shut your mouth. Breathe through the nose. Discipline in sleep.",
      "human": "Correct the airway. Nasal breathing is the biological standard.",
      "ceo": "Silent restoration. Optimize oxygen for the brain.",
      "scientist": "Prevent mouth breathing to increase Nitric Oxide uptake +20%."
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
    "lens_data": {
      "operator": "Debrief the mission. Did you recover or did you fail?",
      "human": "What gets measured gets managed. Know your baseline.",
      "ceo": "Audit the foundation. Ensure the machine is ready.",
      "scientist": "Analyze REM/Deep ratios and HRV trends for readiness score."
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
    "lens_data": {
      "operator": "Move the iron. Force adaptation. Be harder to kill.",
      "human": "Gravity is the constant. Overcoming it is the virtue.",
      "ceo": "Build the monument. A strong mind needs a strong frame.",
      "scientist": "High-threshold motor unit recruitment for CNS adaptation."
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
    "lens_data": {
      "operator": "Carry the boats. Embrace the suck. Relentless forward motion.",
      "human": "Functional load bearing. Humans are built to carry.",
      "ceo": "Bear the weight of the legacy. Build endurance.",
      "scientist": "Zone 2 output with spinal compression training (bone density)."
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
    "lens_data": {
      "operator": "Sweat it out. Endure the heat. Purge the weakness.",
      "human": "Mimic fever to activate immune response.",
      "ceo": "Alchemize the stress. Turn heat into resilience.",
      "scientist": "Induce heat shock proteins (HSP) for cellular repair."
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
    "lens_data": {
      "operator": "Maintenance. A jammed weapon cannot fire.",
      "human": "Fluidity. The tree that does not bend, breaks.",
      "ceo": "Range of motion is range of action. Stay open.",
      "scientist": "Connective tissue hydration and joint capsule health."
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
    "lens_data": {
      "operator": "Combat. Test yourself against a live opponent.",
      "human": "Dynamic movement. Keep the nervous system reactive.",
      "ceo": "The Arena. Express your capability in real-time.",
      "scientist": "Proprioceptive training and neuroplasticity via complex movement."
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
    "lens_data": {
      "operator": "Patrol. Cover ground. Keep moving.",
      "human": "The fundamental human movement. Clear the head.",
      "ceo": "Forward motion. Step by step, the journey is made.",
      "scientist": "Low-impact lymphatic drainage and cortisol clearance."
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
    "lens_data": {
      "operator": "Go to the dark place. Find your max heart rate.",
      "human": "Test the upper limits. Expand the capacity.",
      "ceo": "Explosive power. Be ready to sprint when the door opens.",
      "scientist": "Increase VO2 Max and anaerobic threshold."
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
    "lens_data": {
      "operator": "Control under tension. Breathe through the hold.",
      "human": "Balance strength with flexibility.",
      "ceo": "Union of breath and body. Center the axis.",
      "scientist": "Parasympathetic activation via controlled respiration."
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
    "lens_data": {
      "operator": "Ice bath. Reset the inflammation. Numb the pain.",
      "human": "Systemic reset after high output.",
      "ceo": "Clear the slate. Recovery is part of the work.",
      "scientist": "Vasoconstriction to flush metabolic waste products."
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
    "lens_data": {
      "operator": "The long road. Boring work builds the engine.",
      "human": "Build the base. Efficiency over intensity.",
      "ceo": "Longevity fuel. Stay in the game forever.",
      "scientist": "Mitochondrial efficiency and lactate clearance optimization."
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
    "lens_data": {
      "operator": "Starve the weakness. Discipline over hunger.",
      "human": "Physiological reset. Give the digestion a break.",
      "ceo": "Clear vessel. Empty stomach, sharp mind.",
      "scientist": "Induce autophagy and stabilize insulin sensitivity."
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
    "lens_data": {
      "operator": "Build the armor. Feed the muscle.",
      "human": "Provide the raw materials for repair.",
      "ceo": "Construct the temple. Use high-grade materials.",
      "scientist": "Maximize Muscle Protein Synthesis (MPS)."
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
    "lens_data": {
      "operator": "No poison. Don't fuel a Ferrari with trash.",
      "human": "Reject the cheap dopamine. Eat for function.",
      "ceo": "Pure energy. Keep the signal clean.",
      "scientist": "Prevent glycemic variability and crash."
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
    "lens_data": {
      "operator": "Take your medicine. Load the ammo.",
      "human": "Consistent deposit for future output.",
      "ceo": "Brain fuel. Enhance the hardware.",
      "scientist": "Saturate phosphocreatine stores for ATP recycling."
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
    "lens_data": {
      "operator": "Pressurize the system. Stay conducted.",
      "human": "Electrical signaling requires salt.",
      "ceo": "Spark the connection. Flow state requires fluid.",
      "scientist": "Maintain cellular hydration and nerve transmission."
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
    "lens_data": {
      "operator": "Gut check. Strengthen the biome.",
      "human": "Ancient wisdom. Preserve the gut-brain axis.",
      "ceo": "Internal ecosystem. Tend the garden.",
      "scientist": "Diversify microbiome for serotonin production (90% in gut)."
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
    "lens_data": {
      "operator": "Oil the gears. Reduce the friction.",
      "human": "Anti-inflammatory protection.",
      "ceo": "Fluid thoughts. Smooth operation.",
      "scientist": "Cell membrane fluidity and neuro-protection."
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
    "lens_data": {
      "operator": "Eat the earth. Discipline on the plate.",
      "human": "Micronutrient density. Fiber matrix.",
      "ceo": "Live fuel. Energy from the source.",
      "scientist": "Sulforaphane intake for detoxification pathways."
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
    "lens_data": {
      "operator": "Stay sharp. No sedation. Reality is the drug.",
      "human": "Poison control. Why damage the hardware?",
      "ceo": "Clear vision. No fog allowed.",
      "scientist": "Prevent REM sleep fragmentation and cortisol spikes."
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
    "lens_data": {
      "operator": "Kitchen closed. Discipline at night.",
      "human": "Digest before you rest.",
      "ceo": "Empty the tank for maintenance mode.",
      "scientist": "Allow gastric emptying to optimize HRV during sleep."
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
    "lens_data": {
      "operator": "Tunnel vision. Lock in. Destroy the task.",
      "human": "Focus is currency. Spend it on the Great Work.",
      "ceo": "The Studio. Create the legacy.",
      "scientist": "Maximize cognitive load and flow state entry."
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
    "lens_data": {
      "operator": "Download data. Learn from the generals.",
      "human": "Conversation with the dead. Absorb wisdom.",
      "ceo": "Expand the library. New blueprints.",
      "scientist": "Increase crystallized intelligence without blue light."
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
    "lens_data": {
      "operator": "Sever the leash. You are not a slave to the notification.",
      "human": "Reclaim attention span.",
      "ceo": "Silence the noise to hear the signal.",
      "scientist": "Dopamine detox to reset baseline motivation."
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
    "lens_data": {
      "operator": "Tactical reset. Reboot the system.",
      "human": "Efficient recovery. Sharpen the axe.",
      "ceo": "Pause to accelerate.",
      "scientist": "Flush adenosine and restore neuroplasticity."
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
    "lens_data": {
      "operator": "New codes. Sharpen the comms.",
      "human": "Expand the mental map.",
      "ceo": "Speak to the world. Bridge the gap.",
      "scientist": "Neurogenesis via novel syntax acquisition."
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
    "lens_data": {
      "operator": "Drill the mechanics. Amateurs practice until they get it right; pros until they can't get it wrong.",
      "human": "Competence is confidence.",
      "ceo": "Add a tool to the belt.",
      "scientist": "Myelination of neural pathways."
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
    "lens_data": {
      "operator": "After-action report. Clear the chamber.",
      "human": "Thinking on paper. Structure the chaos.",
      "ceo": "Manifest the idea. Make it real.",
      "scientist": "Externalize working memory to reduce load."
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
    "lens_data": {
      "operator": "Briefing. Get the intel.",
      "human": "Always be learning. The mind must eat.",
      "ceo": "Inspiration input. Spark the next idea.",
      "scientist": "Auditory information processing."
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
    "lens_data": {
      "operator": "Sprinting speed. Race the clock.",
      "human": "Time-boxing creates urgency.",
      "ceo": "Chop the wood. Stack the bricks.",
      "scientist": "Optimize work/rest ratios for sustained attention."
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
    "lens_data": {
      "operator": "Clear comms. No open loops.",
      "human": "Order the information stream.",
      "ceo": "Clear the deck for new opportunities.",
      "scientist": "Reduce decision fatigue from cluttered inputs."
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
    "lens_data": {
      "operator": "Face the darkness. Where did you fail? Own it.",
      "human": "Objective analysis of error. Correct the course.",
      "ceo": "Integrate the shadow. Become whole.",
      "scientist": "Root cause analysis of behavioral deviations."
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
    "lens_data": {
      "operator": "Look yourself in the eye. No lies.",
      "human": "The only judgment that matters is your own.",
      "ceo": "See the person you are becoming.",
      "scientist": "Self-perception check and identity reinforcement."
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
    "lens_data": {
      "operator": "Clear the jam. Get the noise out.",
      "human": "Examine the impressions.",
      "ceo": "Chronicle the journey.",
      "scientist": "Emotional regulation via linguistic processing."
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
    "lens_data": {
      "operator": "Hold the line. Control the monkey mind.",
      "human": "Observe the thinker. Detach from the thought.",
      "ceo": "Access the source. Clarity.",
      "scientist": "Default Mode Network (DMN) suppression."
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
    "lens_data": {
      "operator": "Sniper focus. Calm under pressure.",
      "human": "Regulate the nervous system.",
      "ceo": "Center the axis.",
      "scientist": "Vagus nerve stimulation to lower heart rate."
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
    "lens_data": {
      "operator": "War game. See the obstacles. Overcome them.",
      "human": "Premeditatio Malorum. Be prepared.",
      "ceo": "See the castle before you build it.",
      "scientist": "Neural priming of motor pathways."
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
    "lens_data": {
      "operator": "Acknowledge the supply lines.",
      "human": "Want what you have.",
      "ceo": "Abundance mindset.",
      "scientist": "Positive psychology intervention to shift serotonin."
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
    "lens_data": {
      "operator": "Strip the gear. Travel light.",
      "human": "Essentialism. Less but better.",
      "ceo": "Focus on the signal.",
      "scientist": "Reduction of cognitive interference."
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
    "lens_data": {
      "operator": "Embrace the void. Don't fear the quiet.",
      "human": "Solitude allows thought to settle.",
      "ceo": "Listen to the intuition.",
      "scientist": "Sensory deprivation for neural rest."
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
    "lens_data": {
      "operator": "You will die. Act like it.",
      "human": "Nature's limit. Accept the timeline.",
      "ceo": "Urgency. Build something that lasts.",
      "scientist": "Psychological contrast to increase value of time."
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
    "lens_data": {
      "operator": "Order the perimeter. No chaos in the base.",
      "human": "External order reflects internal order.",
      "ceo": "Set the stage.",
      "scientist": "Reduce visual noise to improve focus."
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
    "lens_data": {
      "operator": "Secure the supply lines. Don't scavenge.",
      "human": "Automate the decision. Eat for function.",
      "ceo": "Fueling strategy.",
      "scientist": "Control caloric and macro variables."
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
    "lens_data": {
      "operator": "Ready to step. No friction at 0600.",
      "human": "Reduce morning drag.",
      "ceo": "Dress for the mission.",
      "scientist": "Eliminate decision fatigue units in AM."
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
    "lens_data": {
      "operator": "Check the ammo. Know your resources.",
      "human": "Frugality is freedom.",
      "ceo": "Resource allocation for the build.",
      "scientist": "Cash flow analysis."
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
    "lens_data": {
      "operator": "Comms check. Align the unit.",
      "human": "Coordinate the tribe.",
      "ceo": "Shared vision.",
      "scientist": "Calendar synchronization."
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
    "lens_data": {
      "operator": "Maintain the fortress.",
      "human": "Entropy is the enemy. Fix what is broken.",
      "ceo": "Respect the space.",
      "scientist": "Preventative maintenance."
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
    "lens_data": {
      "operator": "Sort the intel. Prioritize targets.",
      "human": "Organization of inputs.",
      "ceo": "Clear the deck.",
      "scientist": "GTD (Getting Things Done) processing."
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
    "lens_data": {
      "operator": "Resupply. Keep the larder full.",
      "human": "Logistics win wars.",
      "ceo": "High quality inputs.",
      "scientist": "Inventory management."
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
    "lens_data": {
      "operator": "Execute in clusters. Efficiency.",
      "human": "Reduce switching costs.",
      "ceo": "Flow through the work.",
      "scientist": "Minimize context switching penalty."
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
    "lens_data": {
      "operator": "War room. Map the battlefield.",
      "human": "Strategic planning.",
      "ceo": "Architect the future.",
      "scientist": "Performance review and iteration."
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
