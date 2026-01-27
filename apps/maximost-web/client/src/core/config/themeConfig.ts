import {
  // Bio-Rig
  Heart, Flame, Droplet, Thermometer,
  Activity, Utensils, BedDouble, Pill,

  // Cognitive
  Brain, BookOpen, PenTool, Lightbulb,
  Glasses, Library, Puzzle, Scroll,

  // Kinetic
  Dumbbell, Footprints, Zap, Trophy,
  Timer, Swords, Target, Bike,

  // Social
  Users, MessageSquare, Handshake, HeartHandshake,
  Megaphone, Crown, Smile, Share2,

  // Internal/System/Nav
  Shield, Eye, Moon, Sun,
  Lock, Key, Anchor, Compass, Map, Flag,
  Briefcase, DollarSign, Search, Settings, RotateCcw, Check, Sparkles, Phone, Trees, Mail
} from 'lucide-react';

// 1. THE OPERATOR PALETTE
export const THEME_COLORS = [
  { id: 'maximost_blue', label: 'MaxiMost Blue', hex: '#3B82F6', tailwind: 'blue-500', glow: 'rgba(59,130,246,0.6)' },
  { id: 'bio_emerald',   label: 'Bio Emerald',   hex: '#10B981', tailwind: 'emerald-500', glow: 'rgba(16,185,129,0.6)' },
  { id: 'warning_amber', label: 'Warning Amber', hex: '#F59E0B', tailwind: 'amber-500', glow: 'rgba(245,158,11,0.6)' },
  { id: 'neural_violet', label: 'Neural Violet', hex: '#8B5CF6', tailwind: 'violet-500', glow: 'rgba(139,92,246,0.6)' },
  { id: 'slate_steel',   label: 'Slate Steel',   hex: '#94A3B8', tailwind: 'slate-400', glow: 'rgba(148,163,184,0.6)' },
  { id: 'combat_red',    label: 'Combat Red',    hex: '#EF4444', tailwind: 'red-500', glow: 'rgba(239,68,68,0.6)' },
  { id: 'oxygen_cyan',   label: 'Oxygen Cyan',   hex: '#06B6D4', tailwind: 'cyan-500', glow: 'rgba(6,182,212,0.6)' },
  { id: 'asset_lime',    label: 'Asset Lime',    hex: '#84CC16', tailwind: 'lime-500', glow: 'rgba(132,204,22,0.6)' },
  { id: 'sunset_indigo', label: 'Sunset Indigo', hex: '#6366F1', tailwind: 'indigo-500', glow: 'rgba(99,102,241,0.6)' },
  { id: 'ghost_white',   label: 'Ghost White',   hex: '#F1F5F9', tailwind: 'slate-100', glow: 'rgba(241,245,249,0.6)' },
];

// 2. THE ICON ARMORY (Expanded to 42+ per Vance Directive)
export const ICONS = [
  // BIO-RIG
  { id: 'heart', icon: Heart, label: 'Cardio' },
  { id: 'flame', icon: Flame, label: 'Streak' },
  { id: 'droplet', icon: Droplet, label: 'Hydrate' },
  { id: 'thermometer', icon: Thermometer, label: 'Cold/Heat' },
  { id: 'activity', icon: Activity, label: 'Pulse' },
  { id: 'utensils', icon: Utensils, label: 'Diet' },
  { id: 'beddouble', icon: BedDouble, label: 'Sleep' },
  { id: 'pill', icon: Pill, label: 'Supplements' },

  // COGNITIVE
  { id: 'brain', icon: Brain, label: 'Focus' },
  { id: 'book', icon: BookOpen, label: 'Read' },
  { id: 'journal', icon: PenTool, label: 'Write' },
  { id: 'lightbulb', icon: Lightbulb, label: 'Idea' },
  { id: 'glasses', icon: Glasses, label: 'Vision' },
  { id: 'library', icon: Library, label: 'Study' },
  { id: 'puzzle', icon: Puzzle, label: 'Solve' },
  { id: 'scroll', icon: Scroll, label: 'Learn' },

  // KINETIC
  { id: 'dumbbell', icon: Dumbbell, label: 'Lift' },
  { id: 'footprints', icon: Footprints, label: 'Steps' },
  { id: 'zap', icon: Zap, label: 'Energy' },
  { id: 'trophy', icon: Trophy, label: 'Win' },
  { id: 'timer', icon: Timer, label: 'Duration' },
  { id: 'swords', icon: Swords, label: 'Combat' },
  { id: 'target', icon: Target, label: 'Goal' },
  { id: 'bike', icon: Bike, label: 'Cycle' },

  // SOCIAL
  { id: 'users', icon: Users, label: 'Tribe' },
  { id: 'messagesquare', icon: MessageSquare, label: 'Chat' },
  { id: 'handshake', icon: Handshake, label: 'Deal' },
  { id: 'hearthandshake', icon: HeartHandshake, label: 'Support' },
  { id: 'megaphone', icon: Megaphone, label: 'Speak' },
  { id: 'crown', icon: Crown, label: 'Lead' },
  { id: 'smile', icon: Smile, label: 'Mood' },
  { id: 'share2', icon: Share2, label: 'Share' },

  // INTERNAL / SYSTEM
  { id: 'shield', icon: Shield, label: 'Defense' },
  { id: 'eye', icon: Eye, label: 'Review' },
  { id: 'moon', icon: Moon, label: 'Night' },
  { id: 'sun', icon: Sun, label: 'Day' },
  { id: 'lock', icon: Lock, label: 'Secure' },
  { id: 'key', icon: Key, label: 'Access' },
  { id: 'anchor', icon: Anchor, label: 'Ground' },
  { id: 'compass', icon: Compass, label: 'Direction' },
  { id: 'map', icon: Map, label: 'Plan' },
  { id: 'flag', icon: Flag, label: 'Milestone' },

  // LEGACY / EXTRA
  { id: 'work', icon: Briefcase, label: 'Work' },
  { id: 'dollar', icon: DollarSign, label: 'Wealth' },
  { id: 'search', icon: Search, label: 'Find' },
  { id: 'settings', icon: Settings, label: 'Config' },
  { id: 'rotate', icon: RotateCcw, label: 'Reset' },
  { id: 'check', icon: Check, label: 'Done' },
  { id: 'sparkles', icon: Sparkles, label: 'Clean' },
  { id: 'phone', icon: Phone, label: 'Call' },
  { id: 'trees', icon: Trees, label: 'Nature' },
  { id: 'mail', icon: Mail, label: 'Inbox' }
];

// 3. HELPER: Get Styles by ID (Safe Fallback)
export const getThemeStyles = (colorId: string) => {
  // 1. Direct Hex Support (Vance Patch)
  if (colorId && colorId.startsWith('#')) {
      return {
          bg: `bg-[${colorId}]`,
          text: `text-[${colorId}]`,
          border: `border-[${colorId}]`,
          glow: `${colorId}99`,
          hex: colorId,
          tailwind: 'slate-700' // Console-grade fallback for custom hexes
      };
  }

  // 1.5 Tailwind Class Support (Green Bug Fix)
  // Maps 'bg-blue-600' -> 'maximost_blue' logic
  if (colorId && colorId.startsWith('bg-')) {
      const parts = colorId.split('-'); // e.g., ['bg', 'blue', '600']
      if (parts.length > 1) {
          const colorName = parts[1]; // 'blue'
          const match = THEME_COLORS.find(c => c.tailwind.startsWith(colorName));
          if (match) {
              return {
                  bg: `bg-${match.tailwind}`,
                  text: `text-${match.tailwind}`,
                  border: `border-${match.tailwind}`,
                  glow: match.glow,
                  hex: match.hex
              };
          }
      }
  }

  // Alias mapping for Big Bang Payload
  const aliasMap: any = { 'maxi_blue': 'maximost_blue' };
  const targetId = aliasMap[colorId] || colorId;

  const theme = THEME_COLORS.find(c => c.id === targetId) || THEME_COLORS[0]; // Default to Blue
  return {
    bg: `bg-${theme.tailwind}`,
    text: `text-${theme.tailwind}`,
    border: `border-${theme.tailwind}`,
    glow: theme.glow,
    hex: theme.hex
  };
};

// 4. HELPER: Get Icon Component (Hotfix N-3)
export const getIcon = (iconName: string) => {
    // Normalize to lowercase to match config
    const name = iconName?.toLowerCase();

    // Map by ID from the ICONS array
    const iconDef = ICONS.find(i => i.id === name);
    if (iconDef) return iconDef.icon;

    // Direct string match fallback (if name is technically correct but not in list for some reason)
    const map: any = {
        'sun': Sun,
        'activity': Activity,
        'book': BookOpen,
        'check': Check,
        'brain': Brain,
        'droplet': Droplet,
        'moon': Moon,
        'shield': Shield,
        'zap': Zap,
        'target': Target,
        'timer': Timer,
        'pentool': PenTool,
        'eye': Eye,
        'lock': Lock,
        'dumbbell': Dumbbell,
        'trophy': Trophy,
        'rotateccw': RotateCcw,
        'flame': Flame,
        'ban': Lock, // Fallback
        'hearthandshake': HeartHandshake,
        'beddouble': BedDouble,
        'sparkles': Sparkles,
        'phone': Phone,
        'trees': Trees,
        'pill': Pill,
        'mail': Mail,
        'thermometer': Thermometer,
        'utensils': Utensils,
        'lightbulb': Lightbulb,
        'glasses': Glasses,
        'library': Library,
        'puzzle': Puzzle,
        'scroll': Scroll,
        'footprints': Footprints,
        'swords': Swords,
        'bike': Bike,
        'messagesquare': MessageSquare,
        'handshake': Handshake,
        'megaphone': Megaphone,
        'crown': Crown,
        'smile': Smile,
        'share2': Share2,
        'key': Key,
        'anchor': Anchor,
        'compass': Compass,
        'map': Map,
        'flag': Flag
    };

    // Return the mapped icon, or Activity as fallback
    return map[name] || Activity;
};

// Legacy Wrapper for backward compatibility (points to new getIcon logic)
export const getIconComponent = (iconId: string) => {
   return getIcon(iconId);
};
