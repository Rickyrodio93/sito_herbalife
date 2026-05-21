"use client"

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function DesktopMenu({ menu }) {
  const [isHover, setIsHover] = useState(false);

  // * toggle Hover Menu
  const toggleHoverMenu = () => {
    setIsHover(!isHover);
  };

  // * animation variants
  const subMenuAnimate = {
    enter: {
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.5,
      },
      display: "block",
    },
    exit: {
      opacity: 0,
      rotateX: -15,
      transition: {
        duration: 0.5,
      },
      display: "none",
    },
  };

  // * checking if menu has sub menu
  const hasSubMenu = menu?.subMenu?.length > 0;

  return (
    <motion.li
      className="group/link"
      onHoverStart={toggleHoverMenu}
      onHoverEnd={toggleHoverMenu}
    >
      <Link
        href={menu.link || "#"}
        className="flex-center gap-1 cursor-pointer px-3 py-1 rounded-xl hover:bg-black/5 dark:hover:bg-white/5"
      >
        {menu.name}
        {hasSubMenu && (
          <ChevronDown className="mt-[0.6px] group-hover/link:rotate-180 duration-200" />
        )}
      </Link>
      {hasSubMenu && (
        <motion.div
          className="sub-menu dark:bg-black"
          initial="exit"
          animate={isHover ? "enter" : "exit"}
          variants={subMenuAnimate}
        >
          <div
            className={`grid gap-7 ${
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
                className="relative cursor-pointer"
              >
                <div className="flex-center gap-x-4 group/menubox">
                  <div className="bg-black/5 dark:bg-white/5 w-fit p-2 rounded-md group-hover/menubox:bg-black group-hover/menubox:text-gray-100 dark:group-hover/menubox:bg-white dark:group-hover/menubox:text-gray-900 duration-300">
                    {subMenu?.icon && <subMenu.icon />}
                  </div>
                  <div>
                    <h6 className="font-bold capitalize text-base">
                      {subMenu?.name}
                    </h6>
                    <p className="text-sm dark:text-gray-400">
                      {subMenu?.desc}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.li>
  );
}
