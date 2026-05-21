"use client"
import { motion } from "framer-motion";

export default function Section({ children }) {
  return (
    <section className="bg-gray-200 even:bg-odd dark:bg-p dark:even:bg-[#2e2e2e] px-7 md:px-14 pb-14 text-center group">
      <motion.div
        initial={{ translateX: "-5%", opacity: 0 }}
        whileInView={{ translateX: 0, opacity:1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {children}
      </motion.div>
    </section>
  );
}
