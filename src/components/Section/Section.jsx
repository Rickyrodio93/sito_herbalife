"use client"
import { motion } from "framer-motion";

export default function Section({ children }) {
  return (
    <section className="bg-white even:bg-zinc-50/50 dark:bg-zinc-950 dark:even:bg-zinc-900/30 px-6 md:px-16 py-16 text-center borde-b border-zinc-100 dark:border-zinc-900 last:border-0">
      <motion.div
        initial={{x: -20, opacity:0}}
        whileInView={{x:0, opacity: 1}}
        viewport={{once: true, margin: "-100px"}}
        transition={{type: "spring", stiffness:100, damping: 20, delay: 0.1}}
      >
        {children}
      </motion.div>
    </section>
  );
}
