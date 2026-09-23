import {useEffect,useState,useCallback} from 'react';
import {fetchReadings,subscribe,demoReading,isConfigured} from '../services/sensorService';
export default function useSensorData(settings){
 const [rows,setRows]=useState([]);const [now,setNow]=useState(Date.now());
 const add=useCallback(r=>setRows(p=>[...p,r].slice(-500)),[]);
 useEffect(()=>{
  if(!isConfigured){setRows(Array.from({length:30},(_,i)=>({...demoReading(settings.deviceId),created_at:new Date(Date.now()-(30-i)*5000).toISOString()})));
   const id=setInterval(()=>add(demoReading(settings.deviceId)),settings.refresh*1000);return()=>clearInterval(id)}
  fetchReadings().then(setRows).catch(console.error);return subscribe(add);
 },[settings.refresh,settings.deviceId,add]);
 useEffect(()=>{const id=setInterval(()=>setNow(Date.now()),1000);return()=>clearInterval(id)},[]);
 const latest=rows[rows.length-1];
 const online=!!latest&&(now-new Date(latest.created_at))/1000<=10; // OFFLINE after 10s of silence
 return{rows,latest,online,now,demo:!isConfigured};
}
