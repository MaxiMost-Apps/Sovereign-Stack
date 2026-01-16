// THE MASTER PALETTE (12 Colors)
export const HABIT_COLORS = [
  { id: 'blue', label: 'Blue', class: 'border-l-blue-600', bg: 'bg-blue-600', text: 'text-blue-400' },
  { id: 'sky', label: 'Sky', class: 'border-l-cyan-500', bg: 'bg-cyan-500', text: 'text-cyan-400' },
  { id: 'red', label: 'Red', class: 'border-l-red-600', bg: 'bg-red-600', text: 'text-red-400' },
  { id: 'rose', label: 'Rose', class: 'border-l-rose-500', bg: 'bg-rose-500', text: 'text-rose-400' },
  { id: 'green', label: 'Green', class: 'border-l-green-600', bg: 'bg-green-600', text: 'text-green-400' },
  { id: 'emerald', label: 'Emerald', class: 'border-l-emerald-500', bg: 'bg-emerald-500', text: 'text-emerald-400' },
  { id: 'purple', label: 'Purple', class: 'border-l-purple-600', bg: 'bg-purple-600', text: 'text-purple-400' },
  { id: 'violet', label: 'Violet', class: 'border-l-violet-600', bg: 'bg-violet-600', text: 'text-violet-400' },
  { id: 'orange', label: 'Orange', class: 'border-l-orange-500', bg: 'bg-orange-500', text: 'text-orange-400' },
  { id: 'amber', label: 'Amber', class: 'border-l-amber-500', bg: 'bg-amber-500', text: 'text-amber-400' },
  { id: 'yellow', label: 'Yellow', class: 'border-l-yellow-500', bg: 'bg-yellow-500', text: 'text-yellow-400' },
  { id: 'slate', label: 'Slate', class: 'border-l-gray-500', bg: 'bg-gray-600', text: 'text-gray-400' },
];

export const normalizeColor = (raw: string) => {
  if (!raw) return 'blue';
  const c = raw.toLowerCase();
  return HABIT_COLORS.find(h => c.includes(h.id))?.id || 'slate';
};

export const getHabitStyle = (raw: string) => {
  const c = normalizeColor(raw);
  const colorDef = HABIT_COLORS.find(h => h.id === c) || HABIT_COLORS[11]; // Fallback to slate
  return `bg-gray-900 border-y border-r border-gray-800 border-l-4 ${colorDef.class}`;
};

export const getIconStyle = (colorRaw: string) => {
  const c = normalizeColor(colorRaw);
  const map: any = {
    blue: 'bg-blue-500/20 text-blue-400',
    sky: 'bg-cyan-500/20 text-cyan-400',
    red: 'bg-red-500/20 text-red-400',
    rose: 'bg-rose-500/20 text-rose-400',
    green: 'bg-green-500/20 text-green-400',
    emerald: 'bg-emerald-500/20 text-emerald-400',
    purple: 'bg-purple-500/20 text-purple-400',
    violet: 'bg-violet-500/20 text-violet-400',
    orange: 'bg-orange-500/20 text-orange-400',
    amber: 'bg-amber-500/20 text-amber-400',
    yellow: 'bg-yellow-500/20 text-yellow-400',
    slate: 'bg-gray-800 text-gray-400',
  };
  return map[c] || map.slate;
};

export const getCheckColor = (raw: string) => {
  const c = normalizeColor(raw);
  const colorDef = HABIT_COLORS.find(h => h.id === c) || HABIT_COLORS[11];
  return `${colorDef.bg} border-transparent text-white shadow-[0_0_15px_rgba(0,0,0,0.5)]`;
};
// Helper for text color used in DailyHabitRow
export const getTextColor = (raw: string) => {
  const c = normalizeColor(raw);
  const colorDef = HABIT_COLORS.find(h => h.id === c) || HABIT_COLORS[11];
  return colorDef.text;
};

// Helper for bg color used in DailyHabitRow progress bar
export const getBgColor = (raw: string) => {
    const c = normalizeColor(raw);
    const colorDef = HABIT_COLORS.find(h => h.id === c) || HABIT_COLORS[11];
    return colorDef.bg;
};
