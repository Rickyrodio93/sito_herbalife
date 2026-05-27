"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

export default function DesktopMenu({ menu }) {
  const [isHover, setIsHover] = useState(false);
  const hasSubMenu = menu?.subMenu?.length > 0;

  return (
    <li
      className="relative p-2"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Link
        href={menu.link || "#"}
        className={`flex items-center gap-1.5 cursor-pointer px-3 py-2 rounded-xl transition-all font-semibold ${
          isHover
            ? "text-herbalife-1 dark:text-green-500 bg-zinc-100 dark:bg-zinc-800/60"
            : "text-zinc-700 dark:text-zinc-300"
        }`}
      >
        <span>{menu.name}</span>
        {hasSubMenu && (
          <ChevronDown
            size={16}
            className={`transition-transform duration-300 ${isHover ? "rotate-180 text-herbalife-1 dark:text-green-500" : "text-zinc-400"}`}
          />
        )}
      </Link>

      <AnimatePresence>
        {hasSubMenu && isHover && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-max max-w-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-xl z-50"
          >
            <div
              className={`grid gap-4 p-2 ${
                menu.gridCols === 3
                  ? "grid-cols-3"
                  : menu.gridCols === 2
                    ? "grid-cols-2"
                    : "grid-cols-1"
              }`}
            >
              {menu?.subMenu?.map((subMenu, i) => (
                <Link
                  href={subMenu.link || "#"}
                  key={i}
                  className="group/item flex items-start gap-3 p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900/60 transition-colors duration-200"
                >
                  {/* icona */}
                  {subMenu?.icon && (
                    <div className="shrinc-0 bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 p-2.5 rounded-lg group-hover/item:bg-herbalife-1 group-hover/item:text-white dark:group-hover/item:bg-green-500 dark:group-hover/item:text-zinc-950 transition-colors duration-200 shadow-sm">
                      <subMenu.icon size={20} />
                    </div>
                  )}
                  {/* testo */}
                  <div className="flex flex-col text-left">
                    <h6 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm capitalize group-hover/item:text-herbalife-1 dark:group-hover/item:text-green-500 transition-colors">
                      {subMenu?.name}
                    </h6>
                    {subMenu?.desc && (
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 font-normal mt-0.5 leading-snug max-w-50">
                        {subMenu?.desc}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
