import re
import json
import os

# Reuse the raw text
RAW_TEXT = """
🟢 CATEGORY 1: BIO (Biometric Hardware)
Theme: Optimization, Circadian Control, Hormetic Stress.

BIO_01: Morning Sunlight

Target: 15m outdoor light < 1hr of wake.

Fortitude: "Visual perimeter check. Signal the system to wake up and fight."

Reason: "Align biological clock with solar time. Optimize cortisol/melatonin timing."

Visionary: "First victory. Light the path. Clear eyes for the day's vision."

Analytical: "Trigger ipRGCs to anchor circadian rhythm and suppress daytime melatonin."

BIO_02: Cold Exposure

Target: 2m Cold Shower / Plunge < 60°F.

Fortitude: "Kill the comfort. If you can handle the cold, you can handle the chaos."

Reason: "Voluntary hardship. Train the mind to remain calm in shock."

Visionary: "Forge the steel. A tempered body creates a sharp mind."

Analytical: "Spike norepinephrine 300%. Activate brown fat thermogenesis."

BIO_03: Grounding

Target: 10m bare skin on earth.

Fortitude: "Reconnect with the terrain. Stand firm."

Reason: "Discharge static. Return to the natural baseline."

Visionary: "Roots before branches. Connect to the source."

Analytical: "Reduce inflammation via electron transfer (earthing) and autonomic balance."

BIO_04: Red Light

Target: 10m Near-Infrared / Sunset exposure.

Fortitude: "Recovery mode. Heal the damage from the battle."

Reason: "Mimic the natural evening spectrum to signal rest."

Visionary: "Recharge the cells. Prepare for tomorrow's build."

Analytical: "Stimulate mitochondrial cytochrome c oxidase for ATP regeneration."

BIO_05: Magnesium

Target: 400mg Glycinate/Threonate pre-bed.

Fortitude: "Reload the reserves. Don't run on empty."

Reason: "Essential mineral support for nervous system relaxation."

Visionary: "Fuel the recovery. Sleep deeper to dream bigger."

Analytical: "Support GABA neurotransmitter function and parasympathetic activation."

BIO_06: Digital Dark

Target: No screens 60m pre-bed.

Fortitude: "Perimeter secure. Cut the signal. No outside noise."

Reason: "Protect the mind from algorithmic interference before rest."

Visionary: "Guard the subconscious. Let the day's vision set without distraction."

Analytical: "Prevent blue light suppression of melatonin onset."

BIO_07: Blue Light Blockers

Target: Wear glasses post-sunset.

Fortitude: "Shields up. Deflect the artificial junk light."

Reason: "Filter the spectrum to match the ancestral environment."

Visionary: "Protect the eyes, protect the vision."

Analytical: "Block 450nm wavelength to preserve SCN timing."

BIO_08: Temperature Drop

Target: Room temp < 68°F (20°C).

Fortitude: "Sleep cold. Hibernate like a predator."

Reason: "Environmental cue for deep rest."

Visionary: "Cool the engine for maintenance."

Analytical: "Facilitate core body temp drop required for N3 deep sleep."

BIO_09: Mouth Tape

Target: Tape on during sleep.

Fortitude: "Shut your mouth. Breathe through the nose. Discipline in sleep."

Reason: "Correct the airway. Nasal breathing is the biological standard."

Visionary: "Silent restoration. Optimize oxygen for the brain."

Analytical: "Prevent mouth breathing to increase Nitric Oxide uptake +20%."

BIO_10: Sleep Tracking

Target: Review Oura/Whoop/Sleep data.

Fortitude: "Debrief the mission. Did you recover or did you fail?"

Reason: "What gets measured gets managed. Know your baseline."

Visionary: "Audit the foundation. Ensure the machine is ready."

Analytical: "Analyze REM/Deep ratios and HRV trends for readiness score."

🔴 CATEGORY 2: PHYS (Kinetic Output)
Theme: Structure, Capability, Anti-Fragility.

PHYS_01: Strength Session

Target: 45m Lifting / Resistance.

Fortitude: "Move the iron. Force adaptation. Be harder to kill."

Reason: "Gravity is the constant. Overcoming it is the virtue."

Visionary: "Build the monument. A strong mind needs a strong frame."

Analytical: "High-threshold motor unit recruitment for CNS adaptation."

PHYS_02: Ruck / Carry

Target: 30m Load Bearing (Pack or Farmers Walk).

Fortitude: "Carry the boats. Embrace the suck. Relentless forward motion."

Reason: "Functional load bearing. Humans are built to carry."

Visionary: "Bear the weight of the legacy. Build endurance."

Analytical: "Zone 2 output with spinal compression training (bone density)."

PHYS_03: Sauna / Heat

Target: 20m @ >170°F.

Fortitude: "Sweat it out. Endure the heat. Purge the weakness."

Reason: "Mimic fever to activate immune response."

Visionary: "Alchemize the stress. Turn heat into resilience."

Analytical: "Induce heat shock proteins (HSP) for cellular repair."

PHYS_04: Mobility / Stretch

Target: 10m Flow / Yoga.

Fortitude: "Maintenance. A jammed weapon cannot fire."

Reason: "Fluidity. The tree that does not bend, breaks."

Visionary: "Range of motion is range of action. Stay open."

Analytical: "Connective tissue hydration and joint capsule health."

PHYS_05: Sport / Play

Target: 30m Competitive or Skill activity.

Fortitude: "Combat. Test yourself against a live opponent."

Reason: "Dynamic movement. Keep the nervous system reactive."

Visionary: "The Arena. Express your capability in real-time."

Analytical: "Proprioceptive training and neuroplasticity via complex movement."

PHYS_06: Walk / Jog

Target: 30m steady state.

Fortitude: "Patrol. Cover ground. Keep moving."

Reason: "The fundamental human movement. Clear the head."

Visionary: "Forward motion. Step by step, the journey is made."

Analytical: "Low-impact lymphatic drainage and cortisol clearance."

PHYS_07: HIIT

Target: 15m Max Effort Intervals.

Fortitude: "Go to the dark place. Find your max heart rate."

Reason: "Test the upper limits. Expand the capacity."

Visionary: "Explosive power. Be ready to sprint when the door opens."

Analytical: "Increase VO2 Max and anaerobic threshold."

PHYS_08: Yoga

Target: 20m Structured Flow.

Fortitude: "Control under tension. Breathe through the hold."

Reason: "Balance strength with flexibility."

Visionary: "Union of breath and body. Center the axis."

Analytical: "Parasympathetic activation via controlled respiration."

PHYS_09: Cold Plunge (Active)

Target: Distinct from AM shower - this is recovery/training.

Fortitude: "Ice bath. Reset the inflammation. Numb the pain."

Reason: "Systemic reset after high output."

Visionary: "Clear the slate. Recovery is part of the work."

Analytical: "Vasoconstriction to flush metabolic waste products."

PHYS_10: Zone 2 Cardio

Target: 45m @ 60-70% Max HR.

Fortitude: "The long road. Boring work builds the engine."

Reason: "Build the base. Efficiency over intensity."

Visionary: "Longevity fuel. Stay in the game forever."

Analytical: "Mitochondrial efficiency and lactate clearance optimization."

🟠 CATEGORY 3: FUEL (Nutritional Engine)
Theme: Purity, Alchemy, Metabolic Flexibility.

FUEL_01: The Fast

Target: 16hr Fasting Window.

Fortitude: "Starve the weakness. Discipline over hunger."

Reason: "Physiological reset. Give the digestion a break."

Visionary: "Clear vessel. Empty stomach, sharp mind."

Analytical: "Induce autophagy and stabilize insulin sensitivity."

FUEL_02: 1g Protein / lb

Target: Hit Protein Macro.

Fortitude: "Build the armor. Feed the muscle."

Reason: "Provide the raw materials for repair."

Visionary: "Construct the temple. Use high-grade materials."

Analytical: "Maximize Muscle Protein Synthesis (MPS)."

FUEL_03: Zero Sugar

Target: No added sugar.

Fortitude: "No poison. Don't fuel a Ferrari with trash."

Reason: "Reject the cheap dopamine. Eat for function."

Visionary: "Pure energy. Keep the signal clean."

Analytical: "Prevent glycemic variability and crash."

FUEL_04: Creatine

Target: 5g Monohydrate.

Fortitude: "Take your medicine. Load the ammo."

Reason: "Consistent deposit for future output."

Visionary: "Brain fuel. Enhance the hardware."

Analytical: "Saturate phosphocreatine stores for ATP recycling."

FUEL_05: Electrolytes

Target: Sodium/Potassium/Magnesium mix.

Fortitude: "Pressurize the system. Stay conducted."

Reason: "Electrical signaling requires salt."

Visionary: "Spark the connection. Flow state requires fluid."

Analytical: "Maintain cellular hydration and nerve transmission."

FUEL_06: Fermented Food

Target: Kimchi / Sauerkraut / Kefir.

Fortitude: "Gut check. Strengthen the biome."

Reason: "Ancient wisdom. Preserve the gut-brain axis."

Visionary: "Internal ecosystem. Tend the garden."

Analytical: "Diversify microbiome for serotonin production (90% in gut)."

FUEL_07: Omega-3

Target: 2g EPA/DHA.

Fortitude: "Oil the gears. Reduce the friction."

Reason: "Anti-inflammatory protection."

Visionary: "Fluid thoughts. Smooth operation."

Analytical: "Cell membrane fluidity and neuro-protection."

FUEL_08: Raw Veggies

Target: 1 cup Greens/Cruciferous.

Fortitude: "Eat the earth. Discipline on the plate."

Reason: "Micronutrient density. Fiber matrix."

Visionary: "Live fuel. Energy from the source."

Analytical: "Sulforaphane intake for detoxification pathways."

FUEL_09: No Alcohol

Target: 0 drinks.

Fortitude: "Stay sharp. No sedation. Reality is the drug."

Reason: "Poison control. Why damage the hardware?"

Visionary: "Clear vision. No fog allowed."

Analytical: "Prevent REM sleep fragmentation and cortisol spikes."

FUEL_10: Last Meal 3hr Pre-Bed

Target: Finish eating by 7-8pm.

Fortitude: "Kitchen closed. Discipline at night."

Reason: "Digest before you rest."

Visionary: "Empty the tank for maintenance mode."

Analytical: "Allow gastric emptying to optimize HRV during sleep."

🔵 CATEGORY 4: COG (Cognitive Software)
Theme: Focus, Input Control, Output.

COG_01: Deep Work

Target: 90m Distraction-Free.

Fortitude: "Tunnel vision. Lock in. Destroy the task."

Reason: "Focus is currency. Spend it on the Great Work."

Visionary: "The Studio. Create the legacy."

Analytical: "Maximize cognitive load and flow state entry."

COG_02: Read (Analog)

Target: 20 pages physical book.

Fortitude: "Download data. Learn from the generals."

Reason: "Conversation with the dead. Absorb wisdom."

Visionary: "Expand the library. New blueprints."

Analytical: "Increase crystallized intelligence without blue light."

COG_03: No-Phone Block

Target: 1hr away from device.

Fortitude: "Sever the leash. You are not a slave to the notification."

Reason: "Reclaim attention span."

Visionary: "Silence the noise to hear the signal."

Analytical: "Dopamine detox to reset baseline motivation."

COG_04: Power Nap / NSDR

Target: 20m Non-Sleep Deep Rest.

Fortitude: "Tactical reset. Reboot the system."

Reason: "Efficient recovery. Sharpen the axe."

Visionary: "Pause to accelerate."

Analytical: "Flush adenosine and restore neuroplasticity."

COG_05: Language Study

Target: 15m Practice.

Fortitude: "New codes. Sharpen the comms."

Reason: "Expand the mental map."

Visionary: "Speak to the world. Bridge the gap."

Analytical: "Neurogenesis via novel syntax acquisition."

COG_06: Skill Practice

Target: 20m Deliberate Practice.

Fortitude: "Drill the mechanics. Amateurs practice until they get it right; pros until they can't get it wrong."

Reason: "Competence is confidence."

Visionary: "Add a tool to the belt."

Analytical: "Myelination of neural pathways."

COG_07: Writing / Output

Target: 500 words / Journaling.

Fortitude: "After-action report. Clear the chamber."

Reason: "Thinking on paper. Structure the chaos."

Visionary: "Manifest the idea. Make it real."

Analytical: "Externalize working memory to reduce load."

COG_08: Podcast / Learning

Target: 30m Educational Audio.

Fortitude: "Briefing. Get the intel."

Reason: "Always be learning. The mind must eat."

Visionary: "Inspiration input. Spark the next idea."

Analytical: "Auditory information processing."

COG_09: Pomodoro Sprints

Target: 4 x 25m Intervals.

Fortitude: "Sprinting speed. Race the clock."

Reason: "Time-boxing creates urgency."

Visionary: "Chop the wood. Stack the bricks."

Analytical: "Optimize work/rest ratios for sustained attention."

COG_10: Inbox Zero

Target: Clear email/messages.

Fortitude: "Clear comms. No open loops."

Reason: "Order the information stream."

Visionary: "Clear the deck for new opportunities."

Analytical: "Reduce decision fatigue from cluttered inputs."

🟣 CATEGORY 5: STOIC (Mindset / Spirit)
Theme: Resilience, Perspective, Internal Control.

STOIC_01: The Shadow Audit

Target: Review daily failures/emotions.

Fortitude: "Face the darkness. Where did you fail? Own it."

Reason: "Objective analysis of error. Correct the course."

Visionary: "Integrate the shadow. Become whole."

Analytical: "Root cause analysis of behavioral deviations."

STOIC_02: Accountability Mirror

Target: 1m Self-Confrontation.

Fortitude: "Look yourself in the eye. No lies."

Reason: "The only judgment that matters is your own."

Visionary: "See the person you are becoming."

Analytical: "Self-perception check and identity reinforcement."

STOIC_03: Journal (Brain Dump)

Target: Free writing.

Fortitude: "Clear the jam. Get the noise out."

Reason: "Examine the impressions."

Visionary: "Chronicle the journey."

Analytical: "Emotional regulation via linguistic processing."

STOIC_04: Meditation

Target: 10m Stillness.

Fortitude: "Hold the line. Control the monkey mind."

Reason: "Observe the thinker. Detach from the thought."

Visionary: "Access the source. Clarity."

Analytical: "Default Mode Network (DMN) suppression."

STOIC_05: Box Breathing

Target: 5m (4-4-4-4 count).

Fortitude: "Sniper focus. Calm under pressure."

Reason: "Regulate the nervous system."

Visionary: "Center the axis."

Analytical: "Vagus nerve stimulation to lower heart rate."

STOIC_06: Visualization

Target: 5m Mental Rehearsal.

Fortitude: "War game. See the obstacles. Overcome them."

Reason: "Premeditatio Malorum. Be prepared."

Visionary: "See the castle before you build it."

Analytical: "Neural priming of motor pathways."

STOIC_07: Gratitude Practice

Target: 3 items written.

Fortitude: "Acknowledge the supply lines."

Reason: "Want what you have."

Visionary: "Abundance mindset."

Analytical: "Positive psychology intervention to shift serotonin."

STOIC_08: Digital Minimalism

Target: Delete/Hide distractions.

Fortitude: "Strip the gear. Travel light."

Reason: "Essentialism. Less but better."

Visionary: "Focus on the signal."

Analytical: "Reduction of cognitive interference."

STOIC_09: Silence Block

Target: 10m No Input/Output.

Fortitude: "Embrace the void. Don't fear the quiet."

Reason: "Solitude allows thought to settle."

Visionary: "Listen to the intuition."

Analytical: "Sensory deprivation for neural rest."

STOIC_10: Memento Mori

Target: Contemplate mortality.

Fortitude: "You will die. Act like it."

Reason: "Nature's limit. Accept the timeline."

Visionary: "Urgency. Build something that lasts."

Analytical: "Psychological contrast to increase value of time."

⚪ CATEGORY 6: LOG (Logistics / Environment)
Theme: Order, Preparedness, Systems.

LOG_01: Environment Clear

Target: Tidy workspace/room.

Fortitude: "Order the perimeter. No chaos in the base."

Reason: "External order reflects internal order."

Visionary: "Set the stage."

Analytical: "Reduce visual noise to improve focus."

LOG_02: Meal Prep

Target: Prepare food for tomorrow.

Fortitude: "Secure the supply lines. Don't scavenge."

Reason: "Automate the decision. Eat for function."

Visionary: "Fueling strategy."

Analytical: "Control caloric and macro variables."

LOG_03: Tomorrow’s Kit

Target: Lay out clothes/gear.

Fortitude: "Ready to step. No friction at 0600."

Reason: "Reduce morning drag."

Visionary: "Dress for the mission."

Analytical: "Eliminate decision fatigue units in AM."

LOG_04: Financial Audit

Target: Check balances/spend.

Fortitude: "Check the ammo. Know your resources."

Reason: "Frugality is freedom."

Visionary: "Resource allocation for the build."

Analytical: "Cash flow analysis."

LOG_05: Social Sync

Target: Coord with partner/team.

Fortitude: "Comms check. Align the unit."

Reason: "Coordinate the tribe."

Visionary: "Shared vision."

Analytical: "Calendar synchronization."

LOG_06: Home Maintenance

Target: 15m Chores/Fix.

Fortitude: "Maintain the fortress."

Reason: "Entropy is the enemy. Fix what is broken."

Visionary: "Respect the space."

Analytical: "Preventative maintenance."

LOG_07: Inbox Triage

Target: Sort actionable vs archive.

Fortitude: "Sort the intel. Prioritize targets."

Reason: "Organization of inputs."

Visionary: "Clear the deck."

Analytical: "GTD (Getting Things Done) processing."

LOG_08: Grocery Run

Target: Stock provisions.

Fortitude: "Resupply. Keep the larder full."

Reason: "Logistics win wars."

Visionary: "High quality inputs."

Analytical: "Inventory management."

LOG_09: Task Batching

Target: Group similar small tasks.

Fortitude: "Execute in clusters. Efficiency."

Reason: "Reduce switching costs."

Visionary: "Flow through the work."

Analytical: "Minimize context switching penalty."

LOG_10: Weekly Review

Target: Plan the week ahead (Sunday).

Fortitude: "War room. Map the battlefield."

Reason: "Strategic planning."

Visionary: "Architect the future."

Analytical: "Performance review and iteration."
"""

def parse_library(text):
    categories = []
    current_category = None

    lines = text.split('\n')
    current_habit = None
    habits = []

    category_map = {
        'BIO': 'body',
        'PHYS': 'body',
        'FUEL': 'body',
        'COG': 'mind',
        'STOIC': 'spirit',
        'LOG': 'business'
    }

    icon_map = {
        'BIO': 'Activity',
        'PHYS': 'Dumbbell',
        'FUEL': 'Apple',
        'COG': 'Brain',
        'STOIC': 'Flame',
        'LOG': 'Clipboard'
    }

    color_map = {
        'BIO': 'bg-green-500',
        'PHYS': 'bg-red-500',
        'FUEL': 'bg-orange-500',
        'COG': 'bg-blue-500',
        'STOIC': 'bg-purple-500',
        'LOG': 'bg-slate-500'
    }

    for line in lines:
        line = line.strip()
        if not line:
            continue

        if "CATEGORY" in line:
            match = re.search(r'CATEGORY \d+: (\w+)', line)
            if match:
                current_category = match.group(1)
            continue

        if re.match(r'^[A-Z]+_\d+:', line):
            if current_habit:
                habits.append(current_habit)

            parts = line.split(':', 1)
            hid = parts[0].strip()
            title = parts[1].strip()

            freq_type = 'ABSOLUTE'
            weekly_keywords = ['Strength', 'Ruck', 'Sauna', 'Sport', 'HIIT', 'Zone 2', 'Weekly', 'Audit', 'Language', 'Skill']
            if any(k in title for k in weekly_keywords):
                freq_type = 'FREQUENCY'
            if 'Cold' in title: freq_type = 'ABSOLUTE'
            if 'Cold' in title and 'Active' in title: freq_type = 'FREQUENCY'

            target_days = 7 if freq_type == 'ABSOLUTE' else 3

            current_habit = {
                'id': hid,
                'title': title,
                'category': category_map.get(current_category, 'body'),
                'system_tags': [current_category.lower()],
                'default_config': {
                    'frequency_type': freq_type,
                    'target_days': target_days,
                    'time_of_day': 'any'
                },
                'visuals': {
                    'icon': icon_map.get(current_category, 'Zap'),
                    'color': color_map.get(current_category, 'bg-gray-500')
                },
                'lens_data': {}
            }
            continue

        if current_habit:
            if line.startswith('Target:'):
                current_habit['description'] = line.replace('Target:', '').strip()
            elif line.startswith('Fortitude:'):
                current_habit['lens_data']['operator'] = line.replace('Fortitude:', '').strip().strip('"')
            elif line.startswith('Reason:'):
                current_habit['lens_data']['human'] = line.replace('Reason:', '').strip().strip('"')
            elif line.startswith('Visionary:'):
                current_habit['lens_data']['ceo'] = line.replace('Visionary:', '').strip().strip('"')
            elif line.startswith('Analytical:'):
                current_habit['lens_data']['scientist'] = line.replace('Analytical:', '').strip().strip('"')

    if current_habit:
        habits.append(current_habit)

    return habits

def generate_ts(habits):
    ts_content = """import {
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
"""

    for h in habits:
        ts_content += f"  '{h['id']}': " + json.dumps(h['lens_data'], indent=4) + ",\n"

    ts_content += "};\n\n"

    # 2. THE ARRAY (For UI)
    ts_content += "export const SOVEREIGN_LIBRARY = "

    # Clean up habits to remove 'lens_data' for the array if we want, but it doesn't hurt.
    # Actually, we can keep it or remove it.
    # The array is used for iterating.
    ts_content += json.dumps(habits, indent=2)

    ts_content += """;

export const PROTOCOL_STACKS = [
  { id: 'stack_atlas', title: 'ATLAS GOLDEN SET', description: 'Foundation.', habit_ids: ['BIO_01', 'BIO_05', 'FUEL_02', 'LOG_03'] },
  { id: 'stack_huberman', title: 'HUBERMAN NEURAL', description: 'Brain opt.', habit_ids: ['BIO_01', 'BIO_02', 'BIO_04', 'PHYS_10'] },
  { id: 'stack_jocko', title: 'JOCKO DISCIPLINE', description: 'Execution.', habit_ids: ['BIO_09', 'PHYS_01', 'FUEL_01', 'LOG_03'] },
  { id: 'stack_stoic', title: 'THE STOIC', description: 'Resilience.', habit_ids: ['STOIC_04', 'STOIC_03', 'STOIC_10', 'COG_02'] },
  { id: 'stack_deep', title: 'DEEP WORK', description: 'Focus.', habit_ids: ['COG_01', 'COG_03', 'COG_09', 'BIO_06'] }
];
"""
    return ts_content

if __name__ == "__main__":
    habits = parse_library(RAW_TEXT)
    ts_out = generate_ts(habits)
    with open('apps/maximost-web/client/src/data/sovereign_library.ts', 'w') as f:
        f.write(ts_out)

    print("sovereign_library.ts generated successfully.")
