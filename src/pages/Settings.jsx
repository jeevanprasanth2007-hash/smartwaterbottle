import Card from '../components/Card';
const inp='rounded-xl px-3 py-2 bg-white/70 dark:bg-white/10 w-full';
export default function Settings({s,set}){
 const F=({l,k,type='text',sub})=>(<label className="block"><span className="text-sm opacity-70">{l}</span><input className={inp} type={type} value={sub?s.turb[sub]:s[k]} onChange={e=>{const v=type==='number'?+e.target.value:e.target.value;set(sub?{...s,turb:{...s.turb,[sub]:v}}:{...s,[k]:v})}}/></label>);
 const T=({l,k})=>(<label className="flex items-center justify-between"><span>{l}</span><input type="checkbox" className="h-5 w-5" checked={s[k]} onChange={e=>set({...s,[k]:e.target.checked})}/></label>);
 return(<Card title="Settings" className="max-w-xl space-y-4"><F l="Device ID" k="deviceId"/><F l="Refresh interval (seconds, demo mode)" k="refresh" type="number"/><F l="Turbidity: CLEAR at or above" sub="clear" type="number"/><F l="Turbidity: SLIGHTLY TURBID at or above" sub="slight" type="number"/>
 <div className="space-y-3 pt-2"><T l="Enable alerts" k="alerts"/><T l="Dark mode" k="dark"/></div><p className="text-xs opacity-60">Water level bands: HIGH 75%+, MEDIUM 40%+, LOW 10%+, otherwise EMPTY.</p></Card>)}
