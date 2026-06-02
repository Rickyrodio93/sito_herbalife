"use client";

import Image from "next/image";
import { Menus } from "./utils.js";
import DarkMode from "./dark mode/darkMode";
import DesktopMenu from "./DesktopMenu";
import MobMenu from "./MobMenu.jsx";
import ProgressBar from "./progressBar.jsx";
import Link from "next/link.js";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [clicked, setClicked] = useState(null);

  // * toggle Drawer
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
    setClicked(null);
  };

  // funzione per azzerare e chiudere tutto quando si cambia pagina
  const closeAll = () => {
    setIsOpen(false);
    setClicked(null);
  };

  return (
    <nav
      className={`fixed z-50 top-0 left-0 right-0 transition-all duration-300 h-nav ${
        isOpen
          ? "top-0 mx-0 max-w-full rounded-none bg-white dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-900"
          : "top-2 mx-2 lg:mx-auto max-w-5xl rounded-full border border-zinc-300/60 dark:border-zinc-700/90 bg-white/90 dark:bg-zinc-900/80 backdrop-blur-md text-[15px]"
      }`}
    >
      <div className="px-4 flex items-center justify-between w-full h-full max-w-7xl mx-auto">
        <Link href="/" title="Home" className="flex items-center">
          <Image
            src="/immagini/distributore_indipendente_orizzontale.png"
            height={60}
            width={240}
            alt="logo orizzontale"
            className="h-8 sm:h-10 w-auto object-contain transition-opacity hover:opacity-90"
            onClick={closeAll}
            priority
          />
        </Link>

        {/* menus */}
        {/* Desktop menu */}
        <ul className="hidden lg:flex lg:items-center gap-x-1 text-zinc-700 dark:text-zinc-200 font-medium">
          {Menus.map((menu) => (
            <DesktopMenu menu={menu} key={menu.name} />
          ))}
        </ul>

        <div className="flex items-center gap-x-4">
          <DarkMode />

          {/* mobile menu */}
          <div className="lg:hidden flex items-center">
            <MobMenu
              Menus={Menus}
              closeAll={closeAll}
              isOpen={isOpen}
              clicked={clicked}
              setClicked={setClicked}
              toggleDrawer={toggleDrawer}
            />
          </div>
        </div>
      </div>
      <ProgressBar />
    </nav>
  );
}
