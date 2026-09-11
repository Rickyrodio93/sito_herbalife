"use client";

import { motion, AnimatePresence, useDragControls } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { X, ChevronRight, Calculator } from "lucide-react";

export default function MobMenu({ Menus, closeAll }) {
  const pathname = usePathname();
  const isPreventivoPage = pathname === "/preventivo";

  const [openSubmenuIdx, setOpenSubmenuIdx] = useState(null);

  const dragControls = useDragControls();

  const handleMenuClick = (menu, index) => {
    if (menu.subMenu && menu.subMenu.length > 0) {
      setOpenSubmenuIdx(openSubmenuIdx === index ? null : index);
    } else {
      setOpenSubmenuIdx(null);
      if (closeAll) closeAll();
    }
  };

  const activeMenu = openSubmenuIdx !== null ? Menus?.[openSubmenuIdx] : null;

  return (
    <>
      {/* ----------------------------------------------------
          NAVBAR FLOATING (DINAMICA DA MENUS)
      ---------------------------------------------------- */}
      <div className="fixed bottom-4 left-4 right-4 z-50 lg:hidden pb-[env(safe-area-inset-bottom)]">
        <nav className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800 rounded-full p-1.5 sm:p-2 shadow-2xl flex items-center justify-around">
          {Menus?.map((menu, idx) => {
            const hasSubMenu = menu.subMenu && menu.subMenu.length > 0;
            const Icon = menu.icon;
            const isActive =
              (menu.link && pathname === menu.link) || openSubmenuIdx === idx;

            // Se è presente il tasto preventivo/calcolatore centrale nell'array, gli diamo il risalto Hero
            const isPreventivoBtn = menu.link === "/preventivo";

            if (isPreventivoBtn) {
              return (
                <Link
                  key={menu.name || idx}
                  href="/preventivo"
                  onClick={() => {
                    setOpenSubmenuIdx(null);
                    if (closeAll) closeAll();
                  }}
                  className="bg-herbalife-1 dark:bg-green-500 text-white dark:text-zinc-950 p-3.5 rounded-full shadow-lg shadow-herbalife-1/30 dark:shadow-green-500/20 -mt-6 border-4 border-slate-100 dark:border-zinc-950 hover:scale-105 active:scale-95 transition-all flex items-center justify-center"
                  aria-label={menu.name}
                >
                  <Calculator size={22} />
                </Link>
              );
            }

            const buttonContent = (
              <div
                className={`flex flex-col items-center p-2 rounded-full transition-colors cursor-pointer ${
                  isActive
                    ? "text-herbalife-1 dark:text-green-400 font-bold"
                    : "text-zinc-600 dark:text-zinc-400"
                }`}
              >
                {Icon && <Icon size={20} />}
                <span className="text-[10px] mt-0.5 font-medium capitalize">
                  {menu.name}
                </span>
              </div>
            );

            if (hasSubMenu) {
              return (
                <button
                  key={menu.name || idx}
                  onClick={() => handleMenuClick(menu, idx)}
                >
                  {buttonContent}
                </button>
              );
            }

            return (
              <Link
                key={menu.name || idx}
                href={menu.link || "#"}
                onClick={() => handleMenuClick(menu, idx)}
              >
                {buttonContent}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* ----------------------------------------------------
          DRAWER PER SOTTOMENU (SE PRESENTE IN MENUS)
      ---------------------------------------------------- */}
      <AnimatePresence>
        {activeMenu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40 lg:hidden"
              onClick={() => setOpenSubmenuIdx(null)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              drag="y"
              dragControls={dragControls}
              dragListener={false}
              dragConstraints={{ top: 0 }}
              dragElastic={{ top: 0, bottom: 0.5 }}
              onDragEnd={(event, info) => {
                if (info.offset.y > 100 || info.velocity.y > 300) {
                  setOpenSubmenuIdx(null);
                }
              }}
              className="group fixed bottom-0 left-0 right-0 z-50 max-h-[80dvh] overflow-y-auto overscroll-contain rounded-t-4xl bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 p-6 pt-4 border-t border-zinc-200 dark:border-zinc-800 shadow-2xl pb-24 lg:hidden"
            >
              <div
                onPointerDown={(e) => dragControls.start(e)}
                className="w-full py-2 cursor-grab active:cursor-grabbing touch-none flex justify-center"
              >
                <div className="w-12 h-1.5 bg-zinc-300 dark:bg-zinc-700 rounded-full group-active:bg-herbalife-1" />
              </div>

              <div className="flex justify-between items-center mb-6 border-b border-zinc-100 dark:border-zinc-800 pb-3">
                <h3 className="text-lg font-bold capitalize">
                  {activeMenu.name}
                </h3>
                <button
                  className="p-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 cursor-pointer"
                  onClick={() => setOpenSubmenuIdx(null)}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Mappatura delle voci del sotto-menu */}
              <div className="grid grid-cols-1 gap-2.5">
                {activeMenu.subMenu.map((subItem) => {
                  const SubIcon = subItem.icon;
                  return (
                    <Link
                      key={subItem.name}
                      href={subItem.link || "#"}
                      onClick={() => {
                        setOpenSubmenuIdx(null);
                        if (closeAll) closeAll();
                      }}
                      className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-100 dark:border-zinc-700/50 transition-all active:scale-[0.99]"
                    >
                      <div className="flex items-center gap-3.5">
                        {SubIcon && (
                          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-herbalife-1 dark:text-green-400">
                            <SubIcon size={20} />
                          </div>
                        )}
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100 capitalize">
                            {subItem.name}
                          </span>
                          {subItem.desc && (
                            <span className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-1">
                              {subItem.desc}
                            </span>
                          )}
                        </div>
                      </div>
                      <ChevronRight size={18} className="text-zinc-400" />
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
