import { Brain, Flame, Shield, Zap, Activity, Mountain, Swords, Wallet, Anchor } from 'lucide-react';

export const SOVEREIGN_STACKS = [
  { id: 'stack_atlas', title: 'Atlas Golden Set', expert_voice: 'Founder', theme_override: 'maxi_blue', icon: Anchor, description: 'The foundation for Rig stability.', habits: ['BIO_01', 'COG_01', 'PHYS_06', 'STOIC_01', 'BIO_06'] },
  { id: 'stack_huberman', title: 'Neuro-Rig Stack', expert_voice: 'Andrew Huberman', theme_override: 'bio_amber', icon: Brain, description: 'Biological hardware optimization.', habits: ['BIO_01', 'PHYS_09', 'COG_04', 'BIO_06', 'BIO_05'] },
  { id: 'stack_goggins', title: 'Iron Mind', expert_voice: 'David Goggins', theme_override: 'combat_red', icon: Flame, description: 'Callous the mind through suffering.', habits: ['STOIC_02', 'PHYS_01', 'STOIC_10', 'PHYS_02'] },
  { id: 'stack_jocko', title: 'Discipline Stack', expert_voice: 'Jocko Willink', theme_override: 'void_black', icon: Shield, description: 'The military standard for execution.', habits: ['STOIC_06', 'PHYS_01', 'STOIC_01', 'FUEL_03'] },
  { id: 'stack_stoic', title: 'The Citadel', expert_voice: 'Marcus Aurelius', theme_override: 'ghost_white', icon: Mountain, description: 'Impervious to external fortune.', habits: ['STOIC_10', 'STOIC_07', 'STOIC_04', 'STOIC_09'] },
  { id: 'stack_attia', title: 'Centenarian', expert_voice: 'Peter Attia', theme_override: 'bio_amber', icon: Activity, description: 'Training for the Marginal Decade.', habits: ['PHYS_06', 'PHYS_01', 'FUEL_01', 'PHYS_07'] },
  { id: 'stack_war', title: 'The War Phase', expert_voice: 'The Operator', theme_override: 'combat_red', icon: Swords, description: 'High-output optimization for crisis.', habits: ['PHYS_03', 'BIO_06', 'BIO_08', 'COG_01'] },
  { id: 'stack_deep', title: 'Deep Stack', expert_voice: 'Cal Newport', theme_override: 'maxi_blue', icon: Zap, description: 'Unlocking cognitive superpowers.', habits: ['COG_01', 'COG_03', 'LOG_09', 'BIO_06'] },
  { id: 'stack_wealth', title: 'The Wealth Stack', expert_voice: 'Naval Ravikant', theme_override: 'maxi_blue', icon: Wallet, description: 'Leveraging judgment over time.', habits: ['LOG_04', 'COG_06', 'COG_01', 'STOIC_04'] }
];
