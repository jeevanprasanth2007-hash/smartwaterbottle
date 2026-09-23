import {ResponsiveContainer,AreaChart,Area,XAxis,YAxis,Tooltip,CartesianGrid} from 'recharts';import Card from './Card';import {levelPct} from '../utils/status';
export default function RealtimeChart({title,rows,kind,color='#0ea5e9',n=30}){
 const d=rows.slice(-n).map(r=>({t:new Date(r.created_at).toLocaleTimeString([], {minute:'2-digit',second:'2-digit'}),v:kind==='level'?levelPct(r):Number(r.turbidity_value)}));
 return(<Card title={title}><div className="h-56"><ResponsiveContainer><AreaChart data={d}><defs><linearGradient id={kind} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={color} stopOpacity=".5"/><stop offset="1" stopColor={color} stopOpacity="0"/></linearGradient></defs>
 <CartesianGrid strokeDasharray="3 3" opacity=".2"/><XAxis dataKey="t" fontSize={11}/><YAxis fontSize={11}/><Tooltip/>
 <Area dataKey="v" stroke={color} fill={`url(#${kind})`} strokeWidth={2}/></AreaChart></ResponsiveContainer></div></Card>)}
