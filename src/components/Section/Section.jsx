"use client";
import { motion } from "framer-motion";

export default function Section({ children, sfondoAlternato = false }) {
  return (
    <section 
    className={`bg-surface px-6 md:px-16 py-16 text-center border-t border-line first:border-t-0 ${
      sfondoAlternato ? "even:bg-surface-alt" : ""
    }`}
    >
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
        className="max-w-7xl mx-auto"
      >
        {children}
      </motion.div>
    </section>
  );
}
