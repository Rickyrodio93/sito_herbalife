"use client"

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function Background({ src, titolo, children }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Trasforma il progresso nello scroll in un movimento verticale
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = 1.35; // un po' più grande per evitare spazi vuoti

  return (
    <div
      ref={ref}
      className="h-[calc(100dvh-var(--spacing-nav))] w-full relative overflow-hidden bg-gray-400"
    >
      {/* Immagine con parallasse continuo */}
      <motion.div
        style={{ y }}
        className="absolute left-0 w-full h-[120%] top-[-10%] object-cover"
      >
        <Image src={src} alt={titolo} fill priority className="object-cover" />
      </motion.div>

      {/* Overlay + titolo */}
      <div
        className="w-full h-full absolute top-0 flex flex-col items-center 
          before:absolute before:bottom-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.65)]"
      >
        <h1 className="text-center my-auto mx-auto uppercase md:text-7xl text-5xl text-white font-bold z-10 font-noto text-shadow-[2px_2px_3px_#1c1c1c]">
          {titolo}
        </h1>
      </div>

      {children}
    </div>
  );
}
