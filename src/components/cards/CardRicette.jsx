"use client";
import { motion } from "framer-motion";
import { ArrowRight, ChefHat } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

// formattazione per caricare correttamente le immagini e i file
const formatID = (num) => String(num ?? 0).padStart(3, "0");

export default function CardRicette({ titolo, id, prodotti = [], index = 0 }) {
  const [immagineMancante, setImmagineMancante] = useState(false);
  const formattedId = formatID(id);
  const chips = prodotti.slice(0, 2);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 16,
        delay: (index % 4) * 0.06,
      }}
      whileHover={{ y: -4 }}
      className="group flex h-full w-full flex-col gap-4 rounded-3xl border border-line bg-card p-3 text-left shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-herbalife-1 dark:hover:border-green-500 hover:shadow-lg"
    >
      {/* immagine */}
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-raised">
        {immagineMancante ? (
          <div className="absolute inset-0 flex items-center justify-center text-zinc-300 dark:text-zinc-800">
            <ChefHat size={40} />
          </div>
        ) : (
          <Image
            src={`/immagini/ricette/fotoRicette/${formattedId}.webp`}
            alt={titolo}
            fill
            sizes="(max-width:640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImmagineMancante(true)}
          />
        )}
      </div>

      {/* contenuto */}
      <div className="flex grow flex-col justify-between gap-4 px-1">
        <div className="flex flex-col gap-2">
          <h3 className="min-h-12 text-lg font-bold leading-snug capitalize line-clamp-2 text-zinc-900 dark:text-zinc-100 transition-colors duration-200 group-hover:text-herbalife-1 dark:group-hover:text-green-400">
            {titolo}
          </h3>

          {chips.length > 0 && (
            <ul className="flex flex-wrap gap-1.5">
              {chips.map((p) => (
                <li
                key={p}
                className="rounded-full bg-herbalife-2/60 dark:bg-raised px-2.5 py-0.5 text-[11px] font-semibold capitalize text-herbalife-1 dark:text-green-400"
                >
                  {p}
                </li>
              ))}
            </ul>
          )}
        </div>

        <a
          href={`/documenti/ricette/${formattedId}.pdf`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl bg-zinc-950 px-4 py-2.5 text-sm font-semibold uppercase tracking-wider text-white no-underline! transition-all duration-300 hover:bg-herbalife-1 active:scale-[0.98] dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-green-500"
        >
          visualizza ricetta
          <ArrowRight size={16} />
        </a>
      </div>
    </motion.article>
  );
}
