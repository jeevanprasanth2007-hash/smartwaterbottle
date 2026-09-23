import DeviceCard from '../components/DeviceCard';export default function Device({d,settings}){return <DeviceCard r={d.latest} online={d.online} settings={settings}/>}
