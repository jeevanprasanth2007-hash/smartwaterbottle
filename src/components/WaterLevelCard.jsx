import {Droplets} from 'lucide-react';import Card from './Card';import WaterBottleVisualization from './WaterBottleVisualization';import {LEVELS} from '../utils/status';
export default function WaterLevelCard({r,big}){return(<Card title="Water level" icon={Droplets}>
 <div className={big?'':'flex items-center gap-2 h-36'}><div className={big?'mb-4':'origin-left scale-50 w-20 h-36 shrink-0'}><WaterBottleVisualization reading={r}/></div>
 <div className={big?'text-center':''}>{r?.water_level_percentage!=null&&<div className="text-4xl font-bold">{Math.round(r.water_level_percentage)}%</div>}
 <span className="font-semibold" style={{color:LEVELS[r?.water_level_status]?.c}}>{r?.water_level_status||'—'}</span></div></div></Card>)}
