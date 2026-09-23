import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import { buildAlerts } from './components/AlertCard';
import useSensorData from './hooks/useSensorData';
import Dashboard from './pages/Dashboard';
import WaterQuality from './pages/WaterQuality';
import WaterLevel from './pages/WaterLevel';
import History from './pages/History';
import Device from './pages/Device';
import Settings from './pages/Settings';

export default function App() {
  const [page, setPage] = useState('dashboard');
  const [open, setOpen] = useState(false);
  const [waterLevel, setWaterLevel] = useState('HIGH');

  const changeWaterLevel = (level) => {
    console.log('💧 Water level:', level);
    setWaterLevel(level);
  };

  const [s, setS] = useState({
    deviceId: 'BOTTLE_001',
    refresh: 5,
    alerts: true,
    dark: false,
    turb: { clear: 2300, slight: 1800 },
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', s.dark);
  }, [s.dark]);

  const d = useSensorData(s);
  const alerts = buildAlerts(d.latest, d.online, s);

  const P = {
    dashboard: <Dashboard d={d} alerts={alerts} dummyLevel={waterLevel} setDummyLevel={changeWaterLevel} />,
    quality: <WaterQuality d={d} />,
    level: <WaterLevel d={d} dummyLevel={waterLevel} setDummyLevel={changeWaterLevel} />,
    history: <History d={d} />,
    device: <Device d={d} settings={s} />,
    settings: <Settings s={s} set={setS} />,
  }[page];

  return (
    <div className="md:flex">
      <Sidebar page={page} setPage={setPage} open={open} setOpen={setOpen} />

      <main className="flex-1 min-w-0 pb-20 md:pb-4">
        <Navbar online={d.online} setOpen={setOpen} />

        <div className="px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {P}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
