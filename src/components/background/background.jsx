"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function Background({ src, titolo, children }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  return (
    <div
      ref={ref}
      className="min-h-[70dvh] w-full grid grid-cols-1 lg:grid-cols-12 bg-zinc-100 dark:bg-zinc-900"
    >
      {/* colonna sinistra */}
      <div className="lg:col-span-5 flex flex-col justify-center p-8 md:p-16 z-20 order-2 lg:order-1">
        <span className="text-xs uppercase tracking-widest text-herbalife-4 font-bold mb-2">
          Riccardo Rodio
        </span>
        <h1 className="uppercase text-4xl md:text-6xl font-black text-zinc-900 dark:text-white tracking-tighter mb-6 leading-none">
          {titolo}
        </h1>
        {children}
      </div>

      {/* colonna destra */}
      <div className="lg:col-span-7 relative h-[40dvh] lg:h-auto overflow-hidden order-1 lg:order-2">
        <motion.div style={{y}} className="absolute w-full h-[120%] top-[-10%]">
          <Image
            src={src}
            alt={titolo}
            fill
            priority
            className="object-cover"
          />
        </motion.div>
        <div className="hidden lg:block absolute inset-y-0 left-0 w-24 bg-linear-to-r from-zinc-100 dark:from-zinc-900 to-transparent"/>
      </div>
    </div>
  );
}
