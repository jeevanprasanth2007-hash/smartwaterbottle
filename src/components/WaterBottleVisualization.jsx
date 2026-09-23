import { motion } from 'framer-motion';

export default function WaterBottleVisualization({
  reading,
  onDoubleClick,
}) {
  const percentage = Number(
    reading?.water_level_percentage ?? 0
  );

  const status =
    reading?.water_level_status || 'HIGH';

  return (
    <motion.div
      className="relative w-32 h-64 cursor-pointer select-none"
      onDoubleClick={onDoubleClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      title="Double-click to change water level"
    >
      {/* Bottle cap */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-5 rounded-t-lg rounded-b-md bg-slate-400 dark:bg-slate-500 border border-slate-300 dark:border-slate-600 z-20" />

      {/* Bottle neck */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-10 h-8 bg-white/10 dark:bg-white/5 border-x border-slate-300/50 dark:border-white/10 z-10" />

      {/* Bottle body */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-28 h-52 rounded-[2rem] border-2 border-slate-300/60 dark:border-white/20 bg-white/10 dark:bg-white/5 backdrop-blur-md overflow-hidden shadow-xl">

        {/* Water */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 overflow-hidden"
          initial={false}
          animate={{
            height: `${percentage}%`,
          }}
          transition={{
            duration: 0.7,
            ease: 'easeInOut',
          }}
        >
          {/* Water body */}
          <div className="absolute inset-0 bg-gradient-to-t from-sky-600/80 via-cyan-400/70 to-sky-300/50" />

          {/* Water wave */}
          <motion.div
            className="absolute -top-2 left-[-20%] w-[140%] h-5 rounded-[50%] bg-cyan-300/60"
            animate={{
              x: ['0%', '5%', '0%'],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Water shine */}
          <div className="absolute top-3 left-4 w-2 h-20 rounded-full bg-white/20 blur-[1px]" />
        </motion.div>

        {/* Bottle shine */}
        <div className="absolute top-5 left-4 w-3/4 h-32 rounded-full bg-white/10 blur-md pointer-events-none" />

        {/* Percentage */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <span className="text-white text-xl font-black drop-shadow-lg">
            {percentage}%
          </span>
        </div>

      </div>

      {/* Status */}
      <div className="absolute bottom-[-2px] left-1/2 -translate-x-1/2 z-20">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-900/80 text-white border border-white/10">
          {status}
        </span>
      </div>
    </motion.div>
  );
}