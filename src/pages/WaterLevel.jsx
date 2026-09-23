import WaterLevelCard from '../components/WaterLevelCard';
import RealtimeChart from '../components/RealtimeChart';

export default function WaterLevel({ d, dummyLevel, setDummyLevel }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-3">
        <WaterLevelCard
          value={dummyLevel}
          setValue={setDummyLevel}
          big
        />

        <div className="lg:col-span-2">
          <RealtimeChart
            title="Water level history"
            kind="level"
            rows={d.rows}
            n={50}
          />
        </div>
      </div>
    </div>
  );
}
