import {motion} from 'framer-motion';import {LEVELS,levelPct} from '../utils/status';
export default function WaterBottleVisualization({reading}){
 const p=levelPct(reading),c=LEVELS[reading?.water_level_status]?.c||'#0ea5e9';
 return(<div className="relative mx-auto w-40 h-72"><div className="absolute left-1/2 -translate-x-1/2 -top-1 w-14 h-6 rounded-t-lg bg-slate-400/60"/>
  <div className="absolute inset-x-0 top-5 bottom-0 rounded-[2.5rem] border-4 border-white/80 dark:border-white/30 overflow-hidden bg-white/30">
   <motion.div className="absolute inset-x-0 bottom-0" animate={{height:`${p}%`}} transition={{type:'spring',stiffness:40,damping:14}} style={{background:c}}>
    <svg className="absolute -top-3 w-[200%] wave" height="14" viewBox="0 0 200 14" preserveAspectRatio="none"><path d="M0 7Q25 0 50 7T100 7T150 7T200 7V14H0Z" fill={c}/></svg></motion.div></div></div>)}
