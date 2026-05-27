"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function MobMenu({
  Menus,
  closeAll,
  isOpen,
  clicked,
  setClicked,
  toggleDrawer,
}) {
  return (
    <>
      <button
        className="relative z-50 flex items-center justify-center w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 transition-colors"
        onClick={toggleDrawer}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed left-0 right-0 top-nav bottom-0 overflow-y-auto h-[calc(100vh-var(--spacing-nav))] bg-white dark:bg-zinc-950 px-6 py-8 z-40 flex flex-col border-t border-zinc-100 dark:border-zinc-800"
          >
            <ul className="flex flex-col gap-2 w-full">
              {Menus?.map(({ name, subMenu, link }, i) => {
                const hasSubMenu = subMenu?.length > 0;
                const isClicked = clicked === i;

                return (
                  <li key={name} className="border-b border-zinc-100 dark:border-zinc-900/50 last:border-0 pb-2 last:pb-0">
                    <Link
                      href={link || "#"}
                      className={`flex items-center justify-between p-3 rounded-xl font-bold text-base ${
                        isClicked 
                          ? "text-herbalife-1 dark:text-green-500 bg-zinc-50 dark:bg-zinc-900" 
                          : "text-zinc-800 dark:text-zinc-200"
                      }`}
                      onClick={(e) => {
                        if (hasSubMenu) {
                          e.preventDefault();
                          setClicked(isClicked ? null : i);
                        } else {
                          closeAll();
                        }
                      }}
                    >
                      <span>{name}</span>
                      {hasSubMenu && (
                        <ChevronDown
                          size={18}
                          className={`text-zinc-400 transition-transform duration-300 ${isClicked ? "rotate-180 text-herbalife-1 dark:text-green-500" : ""}`}
                        />
                      )}
                    </Link>

                    {/* Sottomenu Mobile Armonioso */}
                    <AnimatePresence>
                      {hasSubMenu && isClicked && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden ml-4 mt-1 pl-2 border-l border-zinc-200 dark:border-zinc-800 flex flex-col gap-1"
                        >
                          {subMenu?.map(({ name: subName, link: subLink, icon: Icon }) => (
                            <li key={subName}>
                              <Link
                                href={subLink}
                                className="p-2.5 flex items-center hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-lg text-zinc-600 dark:text-zinc-400 text-sm font-medium gap-x-3 capitalize transition-colors"
                                onClick={closeAll}
                              >
                                {Icon && <Icon size={16} className="text-zinc-400" />}
                                <span>{subName}</span>
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}