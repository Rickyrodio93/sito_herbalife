"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

export default function DesktopMenu({ menu }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasSubMenu = menu?.subMenu?.length > 0;
  const isMega = hasSubMenu && menu.subMenu.some((s) => s.group);

  // raggruppa mantenendo l'ordine in cui compaiono i gruppi
  const gruppi = isMega
    ? Object.entries(
        menu.subMenu.reduce((acc, s) => {
          (acc[s.group] ||= []).push(s);
          return acc;
        }, {}),
      )
    : [];

  const chiudi = () => setIsOpen(false);

  const renderVoce = (sub) => (
    <Link
      href={sub.link || "#"}
      key={sub.name}
      onClick={chiudi}
      className="group/item flex items-start gap-3 p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900/60 focus-visible:bg-zinc-50 dark:focus-visible:bg-zinc-900/60 outline-none transition-colors duration-200"
    >
      {sub.icon && (
        <div className="shrink-0 bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 p-2.5 rounded-lg group-hover/item:bg-herbalife-1 group-hover/item:text-white dark:group-hover/item:bg-green-500 dark:group-hover/item:text-zinc-950 transition-colors duration-200 shadow-sm">
          <sub.icon size={20} />
        </div>
      )}
      <div className="flex flex-col text-left">
        <h6 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm capitalize group-hover/item:text-herbalife-1 dark:group-hover/item:text-green-500 transition-colors">
          {sub.name}
        </h6>
        {sub.desc && (
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-normal mt-0.5 leading-snug line-clamp-2">
            {sub.desc}
          </p>
        )}
      </div>
    </Link>
  );

  return (
    <li
      className={isMega ? "p-2" : "relative p-2"}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={chiudi}
      onFocus={() => setIsOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) chiudi();
      }}
      onKeyDown={(e) => e.key === "Escape" && chiudi()}
    >
      <Link
        href={menu.link || "#"}
        aria-haspopup={hasSubMenu || undefined}
        aria-expanded={hasSubMenu ? isOpen : undefined}
        className={`flex items-center gap-1.5 cursor-pointer px-3 py-2 rounded-xl transition-all font-semibold outline-none focus-visible:ring-2 focus-visible:ring-herbalife-1/40 ${
          isOpen
            ? "text-herbalife-1 dark:text-green-500 bg-zinc-100 dark:bg-zinc-800/60"
            : "text-zinc-700 dark:text-zinc-300"
        }`}
      >
        <span>{menu.name}</span>
        {hasSubMenu && (
          <ChevronDown
            size={16}
            className={`transition-transform duration-300 ${isOpen ? "rotate-180 text-herbalife-1 dark:text-green-500" : "text-zinc-400"}`}
          />
        )}
      </Link>

      <AnimatePresence>
        {hasSubMenu && isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className={`absolute top-full pt-3 z-50 before:content-[''] before:absolute before:inset-x-0 before:-top-4 before:h-4 ${
              isMega ? "left-0 right-0" : "left-1/2 -translate-x-1/2 w-72"
            }`}
          >
            <div className="bg-card border border-line rounded-3xl p-4 shadow-xl">
              {isMega ? (
                <div className="grid grid-cols-3 gap-6">
                  {gruppi.map(([titolo, voci]) => (
                    <div key={titolo} className="flex flex-col gap-1">
                      <span className="px-3 pb-2 text-[11px] font-black uppercase tracking-widest text-herbalife-1 dark:text-green-500">
                        {titolo}
                      </span>
                      {voci.map(renderVoce)}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-1">
                  {menu.subMenu.map(renderVoce)}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
