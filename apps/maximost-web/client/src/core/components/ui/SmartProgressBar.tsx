import { SegmentedBar } from './SegmentedBar';

export const SmartProgressBar = ({ current, target, color, unit }: any) => {
  // Scenario A: Time/Volume units -> Fluid Linear Bar
  const fluidUnits = ['min', 'mins', 'sec', 'secs', 'hr', 'hrs', 'oz', 'ml', 'l'];
  const isFluid = fluidUnits.includes(unit?.toLowerCase());

  if (isFluid) {
    const percentage = Math.min(100, Math.max(0, (current / target) * 100));
    return (
      <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden mt-1">
        <div
            className={`h-full ${color} transition-all duration-500 ease-out shadow-[0_0_10px_rgba(255,255,255,0.3)]`}
            style={{ width: `${percentage}%` }}
        />
      </div>
    );
  }

  // Scenario B: Reps/Pages -> Segmented Bar (Default)
  return <SegmentedBar current={current} target={target} color={color} />;
};
