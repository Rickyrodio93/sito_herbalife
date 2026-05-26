import { motion } from "framer-motion";
import Link from "next/link";

export default function Card({ link, icon: Icon, title }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.8 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="w-full h-full"
    >
      <Link
        href={link}
        className="group relative flex flex-col items-center justify-center text-center aspect-4/5 sm:aspect-square p-6 w-full h-full bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 hover:border-herbalife-1 dark:hover:border-green-500 rounded-2xl shadow-sm hover:shadow-md transition-colors duration-300 overflow-hidden"
      >
        <div className="mb-4 sm:mb-6 p-4 rounded-full bg-zinc-50 dark:bg-zinc-800/50 text-herbalife-1 dark:text-green-500 group-hover:bg-herbalife-1 group-hover:text-white dark:group-hover:bg-green-500 dark:group-hover:text-zinc-950 transition-all duration-300 shadow-inner">
          <Icon
            size={32}
            className="sm:size-10 transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <span className="text-zinc-900 dark:text-zinc-100 text-sm sm:text-lg font-bold tracking-tight capitalize group-hover:text-herbalife-1 dark:group-hover:text-green-400 transition-colors duration-300 px-1">
          {title}
        </span>
      </Link>
    </motion.div>
  );
}
