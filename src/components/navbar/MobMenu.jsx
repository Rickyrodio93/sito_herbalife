"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function MobMenu({
  Menus,
  closeAll,
  isOpen,
  clicked,
  setClicked,
  toggleDrawer,
}) {
  // * toggle sub menu item
  const subMenuDrawer = {
    enter: {
      height: "auto",
      overflow: "hidden",
    },
    exit: {
      height: 0,
      overflow: "hidden",
    },
  };

  return (
    <>
      <button
        className="z-999 relative"
        onClick={toggleDrawer}
        aria-label="menu"
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? "0%" : "-100%" }}
        className="fixed left-0 right-0 top-nav overflow-y-auto h-full z-999 bg-gray-100 dark:bg-[#18181a] backdrop-blur p-6"
      >
        <ul>
          {Menus?.map(({ name, subMenu, link }, i) => {
            // * checking if sub menu exist
            const hasSubMenu = subMenu?.length > 0;
            // * checking if menu is clicked
            const isClicked = clicked === i;

            return (
              <li key={name}>
                <Link
                  href={link || "#"}
                  className="flex items-center justify-between p-4 hover:bg-black/5 dark:hover:bg-white/5 rounded-md cursor-pointer relative"
                  // * toggle sub menu item open
                  onClick={(e) => {
                    if (hasSubMenu) {
                      // Se c'è un sottomenu, blocchiamo l'azione del link e facciamo il toggle della tendina
                      e.preventDefault();
                      setClicked(isClicked ? null : i);
                    } else {
                      // Se è un link diretto, cambiamo pagina e chiudiamo la navbar
                      closeAll();
                    }
                  }}
                >
                  {name}
                  {hasSubMenu && (
                    <ChevronDown
                      className={`ml-auto ${isClicked && "rotate-180"}`}
                    />
                  )}
                </Link>
                {hasSubMenu && (
                  <motion.ul
                    key={name}
                    initial="exit"
                    animate={isClicked ? "enter" : "exit"}
                    variants={subMenuDrawer}
                    className="ml-5"
                  >
                    {subMenu?.map(({ index, name, link, desc, icon: Icon }) => (
                      <li key={index}>
                        <Link
                          href={link}
                          key={name}
                          className="p-2 flex items-center hover:bg-black/5 dark:hover:bg-white/5 rounded-md cursor-pointer gap-x-2 capitalize"
                          title={desc}
                          onClick={closeAll}
                        >
                          <Icon size={17} />
                          <span>{name}</span>
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </li>
            );
          })}
        </ul>
      </motion.div>
    </>
  );
}
