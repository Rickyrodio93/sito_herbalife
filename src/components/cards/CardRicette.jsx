"use client";
import { motion } from "framer-motion";

export default function CardRicette({ titolo, id }) {
  // formattazione per caricare correttamente le immagini e i file
  const formatID = (num) => String(num ?? 0).padStart(3, "0");

  //varianti per animazione
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  const formattedId = formatID(id);
  return (
    <>
      <motion.div
        variants={cardVariants}
        className="w-full bg-white dark:bg:zinc-900/50 border border-zinc-150 dark:border-zinc-800/80 rounded-2xl p-3 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-300 group"
      >
        {/* immagine */}
        <div className="w-full aspect-4/3 sm:aspect-square overflow-hidden rounded-xl relative bg-zinc-100 dark:bg-zinc-800">
          <div
          className="absolute inset-0 bg-no-repeat bg-center bg-cover transition-transform duration-500 group-hover:scale-105"
            style={{
              backgroundImage: `url(/immagini/ricette/fotoRicette/${formattedId}.webp)`,
            }}
          />

          <div />
        </div>

        {/* sfumatura decorativa */}
        <div className="flex flex-col gap-4 pt-4 px-1 grow justify-between">
          <h3 className="text-zinc-800 dark:text-zinc-100 font-bold text-lg leading-snug line-clamp-2 capitalize group-hover:text-herbalife-1 dark:group-hover:text-green-400 transition-colors duration-200">
            {titolo}
          </h3>
          <a
            href={`/documenti/ricette/${formattedId}.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center text-sm font-semibold tracking-wide text-zinc-700 dark:text-zinc-300 bg-zinc-100 hover:bg-herbalife-1 dark:bg-zinc-800 dark:hover:bg-green-500 hover:text-white dark:hover:text-zinc-950 py-3 rounded-xl transition-all duration-300 active:scale-98"
          >
            visualizza ricetta
          </a>
        </div>
      </motion.div>
    </>
  );
}
