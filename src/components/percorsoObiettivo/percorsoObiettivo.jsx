"use client";

import { motion } from "framer-motion";
import {
  Brain,
  ClipboardList,
  Dumbbell,
  FlaskConical,
  HeartPulse,
  Route,
  Sparkles,
  Users,
} from "lucide-react";
import Link from "next/link";

const OBIETTIVI = [
  {
    icon: Sparkles,
    title: "Bellezza e pelle",
    description:
      "Routine mirate su collagene, idratazione profonda e luminosità della pelle.",
    link: "/skin",
  },
  {
    icon: Dumbbell,
    title: "Performance sportiva",
    description:
      "Supporto a forza, recupero ed energia per allenamenti di alto livello.",
    link: "/sport",
  },
  {
    icon: HeartPulse,
    title: "Longevità e prevenzione",
    description:
      "Un approccio nutrizionale pensato per il benessere a lungo termine.",
    link: "/scienza",
  },
  {
    icon: Brain,
    title: "Energia e lucidità mentale",
    description:
      "Nutrienti mirati per sostenere concentrazione e vitalità quotidiana.",
    link: "/ottimizza",
  },
];
const STEP = [
  {
    icon: ClipboardList,
    title: "Valutazione",
    description: "Raccogliamo i tuoi obiettivi e il tuo stato attuale.",
  },
  {
    icon: FlaskConical,
    title: "Analisi personalizzata",
    description: "Individuiamo il percorso più adatto alle tue esigenze.",
  },
  {
    icon: Users,
    title: "Consulenza con me",
    description: "Ti guido nella scelta e nell'uso corretto dei prodotti.",
  },
  {
    icon: Route,
    title: "Percorso guidato",
    description: "Monitoriamo insieme i risultati nel tempo.",
  },
];

export default function PercorsoObiettivo() {
  return (
    <div w-full>
      {/* per obiettivo */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
        {OBIETTIVI.map(({ icon: Icon, title, description, link }) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href={link}
              className="group relative flex flex-col no-underline! items-center text-center p-6 h-full bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 hover:border-herbalife-1 dark:hover:border-green-500 rounded-2xl shadow-sm hover:shadow-md transition-colors duration-300"
            >
              <span className="mb-4 p-4 rounded-full bg-zinc-50 dark:bg-zinc-800/50 text-herbalife-1 dark:text-green-500 group-hover:bg-herbalife-1 group-hover:text-white dark:group-hover:bg-green-500 dark:group-hover:text-zinc-950 transition-all duration-300 shadow-inner">
                <Icon
                  size={28}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </span>
              <span className="text-zinc-900 dark:text-zinc-100 text-sm sm:text-base font-bold tracking-tight group-hover:text-herbalife-1 dark:group-hover:text-green-400 transition-colors duration-300">
                {title}
              </span>
              <span className="mt-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-normal">
                {description}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* come funziona */}
      <div className="max-w-5xl mx-auto">
        <h3 className="text-center text-xs font-black uppercase tracking-widest text-herbalife-1 dark:text-green-500 mb-10">
          come funziona il percorso
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 relative">
          {STEP.map(({ icon: Icon, title, description }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex flex-col items-center text-center"
            >
              {/* linea connettore solo desktop */}
              {index < STEP.length - 1 && (
                <div className=" hidden lg:block absolute top-7 left-1/2 w-full h-px bg-zinc-200 dark:bg-zinc-800" />
              )}
              <span className="relative z-10 mb-3 flex items-center justify-center w-14 h-14 rounded-full bg-herbalife-1 dark:bg-green-600 text-white shadow-md">
                <Icon size={22} />
              </span>
              <span className="text-xs font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-1">
                Step {index + 1}
              </span>
              <span className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                {title}
              </span>
              <span className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-normal max-w-40">
                {description}
                </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
