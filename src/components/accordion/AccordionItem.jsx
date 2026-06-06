"use client";

import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AccordionItem({
  title,
  content,
  isExpanded,
  onToggle,
}) {
  return (
    <div
      className={`w-full rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-900/50 backdrop-blur-md shadow-sm transition-all duration-300 ${
        isExpanded
          ? "shadow-md ring-1 ring-herbalife-1/10 dark:ring-herbalife-4/10"
          : ""
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full px-6 py-5 flex justify-between items-center gap-4 cursor-pointer text-left outline-none bg-transparent border-none select-none group"
      >
        <span className="text-lg sm:text-xl font-bold capitalize text-zinc-800 dark:text-zinc-100 group-hover:text-herbalife-1 dark:group-hover:text-green-400 transition-colors duration-200">
          {title}
        </span>

        <div
          className={`flex items-center justify-center p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 group-hover:text-herbalife-1 dark:group-hover:text-green-400 transition-all duration-300 ${
            isExpanded
              ? "rotate-180 bg-herbalife-1/10 dark:bg-herbalife-4/10 text-herbalife-1! dark:text-green-400"
              : ""
          }`}
        >
          <ChevronDown
            size={18}
            className="transition-transform duration-300"
          />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { height: "auto", opacity: 1 },
              collapsed: { height: 0, opacity: 1 },
            }}
            transition={{ duration: 0.25, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed text-justify hyphens-auto border-t border-zinc-100 dark:border-zinc-800/50 pt-4 mx-6">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
