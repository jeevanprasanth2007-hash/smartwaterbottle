import {LayoutDashboard,FlaskConical,Droplets,History,Cpu,Settings} from 'lucide-react';
export const NAV=[['dashboard','Dashboard',LayoutDashboard],['quality','Water Quality',FlaskConical],['level','Water Level',Droplets],['history','History',History],['device','Device',Cpu],['settings','Settings',Settings]];
export default function Sidebar({page,setPage,open,setOpen}){return(<>
 <aside className={`glass !rounded-none md:!rounded-3xl fixed md:sticky z-30 inset-y-0 left-0 md:top-4 w-56 shrink-0 p-4 space-y-1 transition-transform ${open?'':'-translate-x-full'} md:translate-x-0 md:m-4 md:h-[calc(100vh-2rem)]`}>
 <div className="text-xl font-bold mb-4">💧 Smart Water Bottle</div>{NAV.map(([k,l,I])=>(<button key={k} onClick={()=>{setPage(k);setOpen(false)}} className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left ${page===k?'bg-sky-500 text-white':'hover:bg-sky-500/10'}`}><I size={18}/>{l}</button>))}</aside>
 {open&&<div className="fixed inset-0 z-20 bg-black/30 md:hidden" onClick={()=>setOpen(false)}/>}
 <nav className="md:hidden fixed bottom-0 inset-x-0 z-20 glass !rounded-none flex justify-around py-2">{NAV.filter(n=>n[0]!=='device').map(([k,l,I])=>(<button key={k} aria-label={l} onClick={()=>setPage(k)} className={`p-2 rounded-xl ${page===k?'text-sky-500':'opacity-60'}`}><I/></button>))}</nav></>)}
