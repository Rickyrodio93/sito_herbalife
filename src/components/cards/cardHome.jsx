"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const SPRING = { type: "spring", stiffness: 260, damping: 11, mass: 0.9 };

function Card({
  link,
  icon: Icon,
  title,
  isActive,
  anyActive,
  onActivate,
  onDeactivate,
}) {
  const reduce = useReducedMotion();
  const isExternal = link.startsWith("http");

  return (
    <motion.div
      onPointerEnter={onActivate}
      onPointerLeave={onDeactivate}
      onFocus={onActivate}
      onBlur={onDeactivate}
      animate={{
        flexGrow: isActive ? 2.6 : 1, // vale solo su lg (flex)
        scaleY: reduce ? 1 : isActive ? 1.05 : anyActive ? 0.93 : 1,
      }}
      transition={reduce ? { duration: 0 } : SPRING}
      whileTap={reduce ? undefined : { scaleX: 1.06, scaleY: 0.9 }}
      className="min-w-0 lg:basis-0 h-32 sm:h-36 lg:h-44"
      style={{ transformOrigin: "center" }}
    >
      <Link
        href={link}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        data-active={isActive}
        aria-label={title}
        className="group relative flex h-full w-full flex-col items-center justify-center gap-2 lg:gap-0 lg:data-[active=true]:gap-2 overflow-hidden rounded-3xl border border-line bg-card p-4 text-center no-underline! shadow-sm outline-none transition-[border-color,box-shadow,gap] duration-300 hover:border-herbalife-1 dark:hover:border-green-500 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-herbalife-1/50 data-[active=true]:border-herbalife-1 dark:data-[active=true]:border-green-500"
      >
        {/* icona */}
        <motion.span
          animate={{ scale: isActive ? 1.2 : 1 }}
          transition={reduce ? { duration: 0 } : SPRING}
          className="shrink-0 rounded-full bg-raised p-3.5 text-herbalife-1 dark:text-green-500 shadow-inner transition-colors duration-300 group-data-[active=true]:bg-herbalife-1 group-data-[active=true]:text-white dark:group-data-[active=true]:bg-green-500 dark:group-data-[active=true]:text-zinc-950"
        >
          <Icon size={28} />
        </motion.span>

        {/* titolo: sempre visibile sotto lg, su desktop si apre in altezza sotto l'icona */}
        <span className="text-sm sm:text-base font-bold capitalize leading-tight text-balance text-zinc-900 dark:text-zinc-100 lg:overflow-hidden lg:max-h-0 lg:opacity-0 lg:group-data-[active=true]:max-h-14 lg:group-data-[active=true]:opacity-100 lg:transition-[max-height,opacity] lg:duration-500 lg:ease-[cubic-bezier(0.34,1.56,0.64,1)]">
          {title}
        </span>
      </Link>
    </motion.div>
  );
}

export default function CardsHome({ cards }) {
  const [active, setActive] = useState(null);

  return (
    <div className="mx-auto mb-24 grid max-w-5xl grid-cols-2 gap-4 px-4 sm:grid-cols-3 sm:gap-5 lg:flex lg:gap-4">
      {cards.map((card, i) => (
        <Card
          key={card.link}
          {...card}
          isActive={active === i}
          anyActive={active !== null}
          onActivate={() => setActive(i)}
          onDeactivate={() => setActive((a) => (a === i ? null : a))}
        />
      ))}
    </div>
  );
}
