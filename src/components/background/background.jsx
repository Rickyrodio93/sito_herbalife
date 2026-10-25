"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function Background({
  src,
  titolo,
  sottotitolo,
  compatta = false,
  children,
}) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={containerRef}
      className={`relative w-full flex items-end overflow-hidden bg-zinc-950 text-white px-4 sm:px-6 lg:px-8 pt-16 pb-10 md:pb-14 ${
        compatta
          ? "min-h-[45dvh] md:min-h-[50dvh]"
          : "min-h-[70dvh] lg:min-h-[78dvh]"
      }`}
    >
      {/* immagine con parallax */}
      <motion.div
        style={{ y: imageY }}
        className="absolute inset-x-0 h-[136%] top-[-18%] z-0"
      >
        <Image
          src={src}
          alt={titolo}
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-t from-zinc-950/90 via-zinc-950/40 to-zinc-950/10" />
        <div className="absolute inset-0 bg-linear-to-r from-zinc-950/70 via-zinc-950/20 to-transparent hidden lg:block" />
      </motion.div>

      {/* card Glassmorphic */}
      <motion.div
        style={{ opacity: opacityText }}
        className="relative z-10 w-full max-w-6xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          {/* subtitle */}
          <div className="inline-flex items-center gap-2 mb-4 text-[11px] font-bold uppercase tracking-widest text-herbalife-2">
            <span className="w-2 h-2 rounded-full bg-herbalife-4 animate-pulse" />
            Riccardo Rodio · Distributore Indipendente
          </div>
          {/* titolo */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-[1.05] text-balance drop-shadow-xl">
            {titolo}
          </h1>

          {sottotitolo && (
            <p className="mt-4 text-base md:text-lg text-zinc-200 leading-relaxed max-w-xl">
              {sottotitolo}
            </p>
          )}
          {children && <div className="mt-8 text-zinc-200">{children}</div>}
        </motion.div>
      </motion.div>
    </section>
  );
}
