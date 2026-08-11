"use client"

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";
import { SECTIONHOME } from "@/components/sections";
import Background from "@/components/background/background";
import Section from "@/components/Section/Section";

const SectionComponentDinamico = dynamic(
  () => import("@/components/Section/SectionComponent"),
  { ssr: true }
)

const ProdottiConsigliatiDinamici = dynamic(
  () => import("@/components/prodottiConsigliati/prodottiConsigliati"),
  {
    ssr: false, // Se caricano dati lato client o usano localizzazioni/storage
    loading: () => <div className="h-60 w-full bg-zinc-100 dark:bg-zinc-900 animate-pulse rounded-2xl" />
  }
);
const FloatingCallCTA = dynamic(() => import("@/components/FloatingCallCTA"), { ssr: false });


export default function Home() {
  return (
    <>
      <main className="pt-28 md:pt-30">
        <Background
          titolo="Riscopri il tuo benessere con Herbalife & Bioniq"
          src="/immagini/background/herbalife-bioniq.webp"
        >

          <div className="mt-8 flex flex-col items-stretch sm:items-start gap-4 max-w-md sm:max-w-none">
            {/* CTA principale */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full sm:w-auto"
            >
              <Link
                href="/preventivo"
                className="block text-center text-white bg-herbalife-4 hover:bg-herbalife-1 text-base md:text-lg uppercase font-black tracking-wider px-8 py-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
              >
                genera un preventivo prodotti
              </Link>
            </motion.div>
            {/* link secondario, discreto: opportunità business */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                href="/business"
                className="inline-block text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white underline underline-offset-4 transition-colors duration-300"
              >
                Sei interessato all&apos;opportunità commerciale? Scoprila qui
              </Link>
            </motion.div>
          </div>
        </Background>
        {SECTIONHOME.map((section, index) => {
          // se NON è presente il title --> nessuna section
          if (!section.title) {
            return (
              <Section key={index}>
                {section.component}
              </Section>
            );
          }
          // se è presente un title --> wrapper <Section />
          return (
            <Section key={index}>
              <SectionComponentDinamico index={index} section={section} />
            </Section>
          );
        })}

        <Section>
          <ProdottiConsigliatiDinamici pagina="prodottiHome1" title="prodotti consigliati" />
          <ProdottiConsigliatiDinamici pagina="prodottiHome2" title="i più venduti" />
        </Section>
      </main>
      <FloatingCallCTA />
    </>
  )
}