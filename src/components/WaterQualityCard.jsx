import {FlaskConical} from 'lucide-react';import Card from './Card';import {QCOL} from '../utils/status';
export default function WaterQualityCard({r}){const c=QCOL[r?.water_quality_status]||'#94a3b8';return(<Card title="Water quality" icon={FlaskConical}>
 <div className="text-xs opacity-60">Turbidity value</div><div className="text-4xl font-bold tabular-nums">{r?.turbidity_value??'—'}</div>
 <div className="mt-2 inline-flex px-3 py-1 rounded-full text-white text-sm font-semibold" style={{background:c}}>{r?.water_quality_status||'—'}</div>
 <p className="text-xs opacity-60 mt-3">Turbidity measures cloudiness only. It does not show whether water is safe to drink.</p></Card>)}
