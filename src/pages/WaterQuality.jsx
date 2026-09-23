import WaterQualityCard from '../components/WaterQualityCard';import RealtimeChart from '../components/RealtimeChart';
export default function WaterQuality({d}){return(<div className="grid gap-4 lg:grid-cols-3"><WaterQualityCard r={d.latest}/><div className="lg:col-span-2"><RealtimeChart title="Turbidity history" kind="turb" rows={d.rows} color="#06b6d4" n={50}/></div></div>)}
