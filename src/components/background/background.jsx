"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function Background({ src, titolo, children }) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[75dvh] lg:min-h-[85dvh] w-full flex items-end overflow-hidden bg-zinc-950 text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8"
    >
      {/* immagine con parallax */}
      <motion.div
        style={{ y: imageY }}
        className="absolute inset-0 w-full h-[115%] top-[-7%] z-0"
      >
        <Image
          src={src}
          alt={titolo}
          fill
          priority
          className="object-cover object-center opacity-60 dark:opacity-45 filter contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/60 to-zinc-950/30"/>
        <div className="absolute inset-0 bg-linear-to-r from-zinc-950/90 via-zinc-950/40 to-transparent hidden lg:block"/>
      </motion.div>

      {/* card Glassmorphic */}
      <motion.div
      style={{opacity: opacityText}}
      initial={{opacity: 0 , y:30}}
      animate={{opacity: 1 , y:0}}
      transition={{duration: 0.6, ease: [0.16, 1, 0.3, 1]}}
      className="relative z-10 w-full max-w-5xl mx-auto"
      >
        <div className="bg-zinc-900/60 dark:bg-zinc-900/40 backdrop-blur-2xl border border-white/10 dark:border-zinc-800/80 rounded-3xl md:rounded-4xl p-6 sm:p-10 lg:p-12 shadow-2xl">
          {/* subtitle */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-herbalife-1/10 border border-herbalife-1/30 mb-4">
            <span className="w-2 h-2 rounded-full bg-herbalife-1 animate-pulse" />
            <span className="text-[11px] uppercase tracking-wider text-herbalife-1 font-bold">
              Riccardo Rodio
            </span>
          </div>
          {/* titolo */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase mb-4 leading-[1.05]">
            {titolo}
          </h1>
          {/* contenuto / children */}
          <div className="text-zinc-300 text-sm md:text-base font-normal max-w-2xl leading-relaxed space-y-4">
            {children}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
