import { TooltipProps } from 'recharts';

type CustomTooltipProps = TooltipProps<number, string>;

export default function CustomTooltip({
  active,
  payload,
  label,
}: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;

  // Filter out the offset bar
  const filteredPayload = payload.filter(
    (entry) => entry.name !== 'offset'
  );

  return (
    <div className="bg-white p-2 border border-gray-300 rounded shadow text-sm">
      <div className="font-semibold mb-1">Age: {label}</div>
      {filteredPayload.map((entry) => (
        <div key={entry.name} className="flex justify-between gap-4">
          <span className="capitalize">{entry.name}</span>
          <span>{Math.abs(entry.value as number).toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}