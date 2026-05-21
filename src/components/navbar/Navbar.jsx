"use client"

import Image from 'next/image';
import { Menus } from "./utils.js";
import DarkMode from "./dark mode/darkMode";
import DesktopMenu from "./DesktopMenu";
import MobMenu from "./MobMenu.jsx";
import ProgressBar from "./progressBar.jsx";
import Link from 'next/link.js';


export default function Navbar() {
  return (
    <nav className="h-(--spacing-nav) text-[15px] sticky z-99999 inset-0 flex flex-center shadow-(--shadow-nav) bg-white dark:bg-gray-800">
      <div className="px-3.5 flex-center-between w-full max-w-7xl mx-auto">
        <Link href="/" title="Home" className='max-w-lg'>
          <Image
            src="/immagini/distributore_indipendente_orizzontale.png"
            height={80}
            width={300}
            alt="logo orizzontale"
            className="h-8 sm:h-15 w-auto object-contain"
          />
        </Link>

        {/* menus */}
        {/* Desktop menu */}
        <ul className="lg:flex lg:items-center hidden gap-x-1 z-999 text-black dark:text-white">
          {Menus.map((menu) => (
            <DesktopMenu menu={menu} key={menu.name} />
          ))}
        </ul>
        <div className="flex-center gap-x-3">
          <DarkMode />

          {/* mobile menu */}
          <div className="lg:hidden text-black dark:text-white z-999">
            <MobMenu Menus={Menus} />
          </div>
        </div>
      </div>
      <ProgressBar />
    </nav>
  );
}
