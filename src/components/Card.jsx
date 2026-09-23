import {motion} from 'framer-motion';
export default function Card({title,icon:I,children,className=''}){return(<motion.section initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} whileHover={{y:-2}} className={`glass p-5 ${className}`}>
 <div className="flex items-center gap-2 text-sm font-semibold text-sky-700 dark:text-sky-300 mb-3">{I&&<I size={18}/>}{title}</div>{children}</motion.section>)}
