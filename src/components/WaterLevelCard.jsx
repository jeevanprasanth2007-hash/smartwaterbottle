import { Droplets } from 'lucide-react';
import Card from './Card';
import WaterBottleVisualization from './WaterBottleVisualization';

const WATER_LEVELS = [
  {
    key: 'HIGH',
    label: 'High',
    pct: 85,
    color: '#0ea5e9',
  },
  {
    key: 'MEDIUM',
    label: 'Medium',
    pct: 55,
    color: '#06b6d4',
  },
  {
    key: 'LOW',
    label: 'Low',
    pct: 25,
    color: '#f59e0b',
  },
];

export default function WaterLevelCard({
  big = false,
  value = 'HIGH',
  setValue,
}) {
  const selected =
    WATER_LEVELS.find((item) => item.key === value) ||
    WATER_LEVELS[0];

  // Double-click changes the water level
  const changeLevel = () => {
    const currentIndex = WATER_LEVELS.findIndex(
      (item) => item.key === selected.key
    );

    const nextIndex =
      (currentIndex + 1) % WATER_LEVELS.length;

    const nextLevel = WATER_LEVELS[nextIndex];

    console.log(
      'Water level changed:',
      nextLevel.key,
      nextLevel.pct + '%'
    );

    setValue(nextLevel.key);
  };

  const reading = {
    water_level_status: selected.key,
    water_level_percentage: selected.pct,
  };

  return (
    <Card
      title="Water level"
      icon={Droplets}
      className={big ? 'lg:row-span-2' : ''}
    >
      <div className="relative">

        {/* Bottle + Percentage */}
        <div
          className={
            big
              ? ''
              : 'flex items-center gap-4 min-h-40'
          }
        >
          <div
            className={
              big
                ? 'mb-8'
                : 'shrink-0 w-28 h-52 flex items-center justify-center'
            }
          >
            <WaterBottleVisualization
              reading={reading}
              onDoubleClick={changeLevel}
            />
          </div>

          <div className={big ? 'text-center' : ''}>
            <div className="text-4xl font-black transition-all">
              {selected.pct}%
            </div>

            <div
              className="font-bold"
              style={{ color: selected.color }}
            >
              {selected.label}
            </div>
          </div>
        </div>

        {/* Manual Buttons */}
        <div className="mt-5 grid grid-cols-3 gap-2">
          {WATER_LEVELS.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setValue(item.key)}
              className={`rounded-xl px-2 py-2 text-xs font-semibold transition-all border cursor-pointer ${
                selected.key === item.key
                  ? 'bg-sky-500/20 border-sky-400/80 scale-[1.02]'
                  : 'border-slate-300/40 dark:border-white/10 hover:bg-sky-500/10'
              }`}
              style={{ color: item.color }}
            >
              {item.label}

              <span className="block opacity-70">
                {item.pct}%
              </span>
            </button>
          ))}
        </div>

      </div>
    </Card>
  );
}