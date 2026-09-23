import WaterLevelCard from '../components/WaterLevelCard';import RealtimeChart from '../components/RealtimeChart';
export default function WaterLevel({d}){return(<div className="grid gap-4 lg:grid-cols-3"><WaterLevelCard r={d.latest} big/><div className="lg:col-span-2"><RealtimeChart title="Water level history" kind="level" rows={d.rows} n={50}/></div></div>)}
