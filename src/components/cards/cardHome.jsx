
import { motion } from "framer-motion";
import Link from "next/link";

export default function Card({ link, icon: Icon, title }) {
  return (
    <motion.div
      whileHover={{
        translateY: "-10px",
        boxShadow: "0px 10px 10px rgba(0 0 0 / 0.5)",
      }}
      transition={{ duration: 0.2 }}
      className="rounded-3xl"
    >
      <Link
        href={link}
        className="w-30 sm:w-48 bg-herbalife-2 dark:bg-herbalife-3 capitalize flex flex-wrap flex-col items-center border-4 border-herbalife-1 dark:border-herbalife-2 rounded-3xl justify-center text-gray-900 dark:text-white text-sm sm:text-xl py-0 px-3 aspect-[3/4] font-bold"
      >
        <span className="mb-6 sm:mb-12 text-herbalife-1 dark:text-herbalife-2">
          <Icon size={40} />
        </span>
        {title}
      </Link>
    </motion.div>
  );
}
