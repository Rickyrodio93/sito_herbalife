"use client"
import { motion } from "framer-motion";
import { useState } from "react";
const images = [
  {
    src: "/immagini/sport/campioni/Simona-Quadarella.webp",
    name: "simona quadarella",
  },
  {
    src: "/immagini/sport/campioni/simone-alessio.webp",
    name: "simone alessio",
  },
  {
    src: "/immagini/sport/campioni/Arianna-Fontana.webp",
    name: "arianna fontana",
  },
  {
    src: "/immagini/sport/campioni/Federazione-Italiana-Nuoto.webp",
    name: "FIN - federazione italiana nuoto",
  },
  {
    src: "/immagini/sport/campioni/LA-Galaxy.webp",
    name: "LA galaxy",
  },
  {
    src: "/immagini/sport/campioni/original.webp",
    name: "herbalife e coni",
  },
  {
    src: "/immagini/sport/campioni/Giuseppe-Vicino.webp",
    name: "giuseppe vicino",
  },
  {
    src: "/immagini/sport/campioni/Cristiano-Ronaldo.webp",
    name: "cristiano ronaldo",
  },
  {
    src: "/immagini/sport/campioni/Logo_divisione_calcio_a_5_lnd_figc.webp",
    name: "FIGC lega nazionale dilettanti - LND calcio 5",
  },
  {
    src: "/immagini/sport/campioni/Matteo-Zurloni.webp",
    name: "matteo zurloni",
  },
  {
    src: "/immagini/sport/campioni/Federico-Pelizzari.webp",
    name: "federico pelizzari",
  },
  {
    src: "/immagini/sport/campioni/Arianna-Errigo.webp",
    name: "arianna errigo",
  },
  {
    src: "/immagini/sport/campioni/Matteo-Rizzo.webp",
    name: "matteo rizzo",
  },
];

export default function CardCampioni() {
  const [activeIndex, setActiveIndex] = useState(null);

  const isMobile =
    typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;

  return (
    <div className="max-w-[1024px] mx-auto colums-1 sm:columns-2 lg:columns-3 pb-10 md:pb-20 gap-4">
      {images.map((image, index) => (
        <div key={index} className="mb-4 break-inside-avoid">
          <figure
            className="overflow-hidden grid justify-center mb-4"
            style={{ gridTemplateAreas: "stack" }}
            onClick={() => {
              if (isMobile) {
                setActiveIndex(activeIndex === index ? null : index);
              }
            }}
          >
            <img
              src={image.src}
              className="w-full object-cover rounded-lg"
              style={{ gridArea: "stack" }}
            />
            <motion.figcaption
              initial={{ opacity: 0 }}
              animate={{
                opacity: isMobile ? (activeIndex === index ? 1 : 0) : undefined,
              }}
              whileHover={!isMobile ? { opacity: 1 } : undefined}
              transition={{ duration: 0.2 }}
              className="grid items-end pb-4 px-4 bg-gradient-to-b rounded-lg from-[transparent] to-[rgb(33_44_55)] text-white capitalize font-bold"
              style={{ gridArea: "stack" }}
            >
              {image.name}
            </motion.figcaption>
          </figure>
        </div>
      ))}
    </div>
  );
}
