export const LEVELS={HIGH:{pct:85,c:'#0ea5e9'},MEDIUM:{pct:55,c:'#06b6d4'},LOW:{pct:25,c:'#f59e0b'},EMPTY:{pct:3,c:'#ef4444'}};
export const levelFromPct=p=>p>=75?'HIGH':p>=40?'MEDIUM':p>=10?'LOW':'EMPTY';
// Turbidity labels describe clarity only, NOT drinking safety.
export const QCOL={CLEAR:'#10b981','SLIGHTLY TURBID':'#f59e0b',TURBID:'#ef4444'};
export const levelPct=r=>r?.water_level_percentage!=null?Number(r.water_level_percentage):LEVELS[r?.water_level_status]?.pct??0;
export const ago=d=>{const s=Math.max(0,Math.round((Date.now()-new Date(d))/1000));return s<5?'Just now':s<60?`${s}s ago`:`${Math.floor(s/60)}m ago`};
