import {AnimatePresence,motion} from 'framer-motion';import {AlertTriangle,WifiOff} from 'lucide-react';
export const buildAlerts=(r,online,s)=>{if(!s.alerts)return[];const a=[];
 if(!online)a.push({k:'off',t:'ESP32 offline',m:'No sensor data received recently.',red:1});
 if(r&&['LOW','EMPTY'].includes(r.water_level_status))a.push({k:'low',t:'Low water level',m:'Water level is low. Please refill the bottle.'});
 if(r&&r.water_quality_status==='TURBID')a.push({k:'turb',t:'Turbid water',m:'Water turbidity has increased.'});return a};
export default function AlertCard({alerts}){return(<div className="space-y-2"><AnimatePresence>{alerts.map(a=>(<motion.div key={a.k} initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} exit={{opacity:0}} className={`glass !rounded-2xl p-4 flex gap-3 items-start border-l-4 ${a.red?'!border-l-red-500':'!border-l-amber-500'}`}>
 {a.red?<WifiOff className="text-red-500"/>:<AlertTriangle className="text-amber-500"/>}<div><div className="font-semibold">{a.t}</div><div className="text-sm opacity-70">{a.m}</div></div></motion.div>))}</AnimatePresence>
 {!alerts.length&&<div className="text-sm opacity-60">No active alerts.</div>}</div>)}
