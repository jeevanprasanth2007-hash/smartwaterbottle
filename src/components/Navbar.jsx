import {Menu} from 'lucide-react';
export default function Navbar({online,setOpen,demo}){return(<header className="flex items-center justify-between p-4"><button className="md:hidden p-2 glass !rounded-xl" aria-label="Menu" onClick={()=>setOpen(true)}><Menu/></button>
 <div className="text-sm opacity-70">{demo&&'Demo data. Add Supabase keys to go live.'}</div>
 <div className="glass !rounded-full px-4 py-2 flex items-center gap-2 text-sm font-semibold"><span className={`h-2.5 w-2.5 rounded-full ${online?'bg-emerald-500 animate-pulse':'bg-red-500'}`}/>{online?'ESP32 Connected':'ESP32 Offline'}</div></header>)}
