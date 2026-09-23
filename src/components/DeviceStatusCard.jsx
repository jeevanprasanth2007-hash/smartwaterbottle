import {Wifi,WifiOff,Clock} from 'lucide-react';import Card from './Card';import {ago} from '../utils/status';
export default function DeviceStatusCard({r,online,mode}){return mode==='time'?(<Card title="Last update" icon={Clock}><div className="text-2xl font-bold">{r?new Date(r.created_at).toLocaleTimeString():'—'}</div><div className="text-sm opacity-60">{r&&ago(r.created_at)}</div></Card>):(
 <Card title="ESP32 connection" icon={online?Wifi:WifiOff}><div className="flex items-center gap-2 text-2xl font-bold"><span className={`h-3 w-3 rounded-full ${online?'bg-emerald-500 animate-pulse':'bg-red-500'}`}/>{online?'Connected':'Offline'}</div>
 <div className="text-sm opacity-60">Smart Bottle ESP32 · last seen {r?ago(r.created_at):'never'}</div></Card>)}
