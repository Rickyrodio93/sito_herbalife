"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import AccordionItem from "../accordion/AccordionItem";
import { AccordionDataProdotto } from "../accordion/accordionData";
import Background from "../background/background";
import Image from "next/image";
import {
  Brain,
  ClipboardList,
  Coffee,
  Dumbbell,
  Eye,
  FlaskConical,
  HeartPulse,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
} from "lucide-react";

const OBIETTIVI = [
  {
    icon: Sparkles,
    title: "Bellezza e benessere",
    description:
      "Supporto nutrizionale per pelle, capelli e unghie, e per il normale trasporto del ferro nell'organismo.",
  },
  {
    icon: Dumbbell,
    title: "Sport e performance",
    description:
      "Un apporto mirato per l'attività fisica, la normale funzione muscolare e i livelli di testosterone.",
  },
  {
    icon: Brain,
    title: "Funzione cognitiva",
    description:
      "Nutrienti a supporto del normale funzionamento del sistema nervoso e della funzione cognitiva.",
  },
  {
    icon: HeartPulse,
    title: "Benessere a lungo termine",
    description:
      "Supporto nutrizionale che accompagna l'avanzare dell'età: ossa, ferro e normale funzione cardiaca.",
  },
];
const STEP = [
  {
    icon: ClipboardList,
    title: "Valutazione gratuita",
    description:
      "Completi la Valutazione del Benessere: altezza, peso, attività fisica e obiettivi.",
  },
  {
    icon: Eye,
    title: "Formula visualizzata",
    description:
      "Vedi la tua formula personalizzata, calcolata sui tuoi dati reali.",
  },
  {
    icon: ShoppingBag,
    title: "Ordine",
    description:
      "Ricevi i tuoi granuli, prodotti in Svizzera con tecnologia dedicata all'assorbimento.",
  },
  {
    icon: Coffee,
    title: "Uso quotidiano",
    description: "Due cucchiai al giorno, integrati nella tua routine.",
  },
];
const QUALITA = [
  "Verifica degli ingredienti",
  "Test di purezza e analisi dei contaminanti",
  "Assenza di sostanze proibite",
  "Conformità agli standard GMP",
  "Controlli regolari SwissMedic",
  "Qualità e stabilità nel tempo",
];

export default function BioniqClient() {
  const [expandedId, setExpandedId] = useState(null);
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Bioniq GO",
    brand: { "@type": "Brand", name: "Bioniq" },
    description:
      "Integratore alimentare personalizzato in granuli, formulato su misura in base a una Valutazione del Benessere individuale. Fino a 23 ingredienti selezionati, prodotto in Svizzera con controlli SwissMedic e conformità GMP.",
    manufacturer: { "@type": "Organization", name: "Bioniq / Herbalife" },
    offers: {
      "@type": "Offer",
      url: "https://shopbioniq.com/it-IT/riccardorodio",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Person", name: "Riccardo Rodio" },
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: AccordionDataProdotto.map((item) => ({
      "@type": "Question",
      name: item.title,
      acceptedAnswer: {
        "@type": "Answer",
        text:
          typeof item.content === "string"
            ? item.content
            : "Risposta disponibile nella pagina Bioniq di Riccardo Rodio.",
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="bioniq-theme">
        <main className="pt-28 md:pt-32 bg-bioniq-panna dark:bg-bioniq-notte transition-colors duration-300">
          <Background
            titolo="il tuo corpo non è una media statistica"
            src="/immagini/swiperImmagini/Bioniq_phone.webp"
          >
            <p className="text-zinc-600 dark:text-bioniq-panna/70 text-base md:text-lg max-w-lg leading-relaxed mb-8">
              Bioniq costruisce una formula di integrazione unica, calcolata
              sulla tua reale Valutazione del Benessere — non uno standard
              uguale per tutti.
            </p>
            <motion.div
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link
                href="https://quiz.mypro2col.com/it-IT/intro?site=riccardorodio-catalog2"
                target="_blank"
                className="inline-block text-center text-bioniq-notte bg-bioniq-acqua hover:bg-bioniq-teal hover:text-white text-base md:text-lg font-black uppercase tracking-wider px-8 py-4 rounded-full shadow-lg transition-all duration-300 no-underline!"
              >
                Inizia la valutazione del benessere
              </Link>
            </motion.div>
          </Background>

          {/* PER OBIETTIVO */}
          <section className="max-w-6xl mx-auto px-6 py-20">
            <h3 className="font-serif text-2xl md:text-4xl text-center text-zinc-900 dark:text-bioniq-panna font-bold mb-3">
              Un integratore per ogni obiettivo
            </h3>
            <p className="text-center text-zinc-500 dark:text-bioniq-panna/60 max-w-xl mx-auto mb-12">
              La formula viene calibrata sulla tua priorità di benessere
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {OBIETTIVI.map(({ icon: Icon, title, description }) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center yext-center p-6 bg-white dark:bg-bioniq-notte/60 border border-zinc-200 dark:border-bioniq-teal/30 rounded-2xl shadow-sm"
                >
                  <span className="mb-4 p-4 rounded-full bg-bioniq-teal/10 text-bioniq-teal dark:text-bioniq-acqua">
                    <Icon size={26} />
                  </span>
                  <span className="text-sm sm:text-base font-bold text-zinc-900 dark:text-bioniq-panna mb-2">
                    {title}
                  </span>
                  <span className="text-xs sm:text-sm text-zinc-500 dark:text-bioniq-panna/60 leading-normal">
                    {description}
                  </span>
                </motion.div>
              ))}
            </div>
          </section>

          {/* COME FUNZIONA */}
          <section className="bg-bioniq-notte py-20">
            <div className="max-w-5xl mx-auto px-6">
              <h3 className="font-serif text-2xl md:text-4xl text-center text-bioniq-panna font-bold mb-14">
                Crea il tuo integratore quotidiano
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 relative">
                {STEP.map(({ icon: Icon, title, description }, index) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative flex flex-col items-center text-center"
                  >
                    {index < STEP.length - 1 && (
                      <div className="hidden lg:block absolute top-7 left-1/2 w-full h-px bg-bioniq-teal/20" />
                    )}
                    <span className="relative z-10 mb-3 flex items-center justify-center w-14 h-14 rounded-full bg-bioniq-teal text-white shadow-md">
                      <Icon size={22} />
                    </span>
                    <span className="text-[11px] font-black uppercase tracking-wider text-bioniq-acqua mb-1">
                      Passo {index + 1}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-bioniq-panna mb-1">
                      {title}
                    </span>
                    <span className="text-xs sm:text-sm text-bioniq-panna/60 leading-normal max-w-40">
                      {description}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* QUALITà SVIZZERA */}
          <section className="max-w-5xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-bioniq-teal dark:text-bioniq-acqua mb-4">
                <ShieldCheck size={16} /> Qualità svizzera certificata
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-zinc-900 dark:text-bioniq-panna mb-4">
                Ogni lotto, controllato.
              </h3>
              <p className="text-zinc-600 dark:text-bioniq-panna/70 mb-6 leading-relaxed">
                I processi produttivi sono regolarmente controllati da
                SwissMedic. La tecnologia a granuli è pensata per favorire
                l&apos;assorbimento, senza coloranti artificiali, zuccheri,
                dolcificanti o gelatina.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {QUALITA.map((voce) => (
                  <li
                    key={voce}
                    className="flex items-center gap-2 text-sm text-zinc-700 dark:text-bioniq-acqua shrink-0"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-bioniq-teal dark:bg-bioniq-acqua shrink-0" />
                    {voce}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-4/5 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/immagini/bioniq/Bioniq_Carosello.webp"
                alt="Qualità svizzera Bioniq"
                fill
                className="object-cover"
              />
            </div>
          </section>

          {/* FAQ */}
          <section className="max-w-3xl mx-auto px-6 py-20">
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-center text-zinc-900 dark:text-bioniq-panna mb-10">
              Domande frequenti su Bioniq
            </h3>
            <div className="flex flex-col gap-4">
              {AccordionDataProdotto.map((item) => (
                <AccordionItem
                  key={item.id}
                  {...item}
                  isExpanded={expandedId === item.id}
                  onToggle={() =>
                    setExpandedId(expandedId === item.id ? null : item.id)
                  }
                />
              ))}
            </div>
          </section>

          {/* CTA FINALE */}
          <section className="bg-bioniq-teal py-16 text-center px-6">
            <FlaskConical className="mx-auto mb-4 text-white/80" size={32} />
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-3">
              Scopri la tua formula personalizzata
            </h3>
            <p className="text-white/80 max-w-lg mx-auto mb-8">
              La Valutazione del Benessere è gratuita e richiede pochi minuti.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="https://quiz.mypro2col.com/it-IT/intro?site=riccardorodio-catalog2"
                target="_blank"
                className="inline-block text-center text-bioniq-teal bg-white hover:bg-bioniq-panna text-sm md:text-base font-black uppercase tracking-wider px-8 py-4 rounded-full shadow-md transition-all duration-300 no-underline!"
              >
                Inizia la Valutazione del Benessere
              </Link>
              <Link
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                className="inline-block text-center text-white border-2 border-white/60 hover:bg-white/10 text-sm md:text-base font-bold uppercase tracking-wider px-8 py-4 rounded-full transition-all duration-300 no-underline!"
              >
                Parlane con me
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
