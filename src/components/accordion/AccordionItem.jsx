import { ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AccordionItem({
  title,
  content,
  isExpanded,
  onToggle,
}) {
  return (
    <div className="bg-white dark:bg-[#333333] px-10 py-5 rounded-3xl overflow-hidden transition-all duration-300">
      <div
        className="flex justify-between items-start cursor-pointer"
        onClick={onToggle}
      >
        <li className="list-decimal list-inside text-2xl font-bold text-herbalife-1 dark:text-herbalife-4 text-left capitalize">
          {title}
        </li>
        <div
          className={`text-4xl text-black dark:text-white transition-all duration-300 ${
            isExpanded ? "rotate-90" : ""
          }`}
        >
          <ChevronRight />
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { height: "auto", opacity: 1 },
              collapsed: { height: 0, opacity: 0 },
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="text-left overflow-hidden text-black dark:text-white"
          >
            <div className="pb-5 text-justify hyphens-auto">{content}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
