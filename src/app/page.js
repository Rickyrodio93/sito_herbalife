"use client"
import Background from "@/components/background/background";
import ProdottiConsigliati from "@/components/prodottiConsigliati/prodottiConsigliati";
import Section from "@/components/Section/Section";
import SectionComponent from "@/components/Section/SectionComponent";
import { SECTIONHOME } from "@/components/sections";
import { motion } from "framer-motion";
import Link from "next/link";


export default function Home() {
  return (
    <>
      <Background
        titolo="Riscopri il tuo benessere con Herbalife"
        src="/immagini/background/home.webp"
      >

        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 max-w-md sm:max-w-none">
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
              preventivo prodotti
            </Link>
          </motion.div>
          {/* CTA secondaria */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full sm:w-auto"
          >
            <Link
              href="https://accounts.myherbalife.com/Account/Create?appId=1&qrFlow=1&locale=it-IT&SponsorId=kQkJ2BXpUJ4=&cmp=m_it_it_wbs_dssignup_btn_nap_copylink_20250305"
              target="_blank"
              className="block text-center text-zinc-900 dark:text-white bg-transparent hover:bg-zinc-900/5 text-base md:text-lg uppercase font-bold tracking-wider px-8 py-4 rounded-xl border-2 border-zinc-900 dark:border-white transition-all duration-300"

            >
              entra nel mio team
            </Link>
          </motion.div>
        </div>
      </Background>
      <main>
        {SECTIONHOME.map((section, index) => {
          // se NON è presente il title --> nessuna section
          if (!section.title) {
            return section.component;
          }
          // se è presente un title --> wrapper <Section />
          return (
            <Section key={index}>
              <SectionComponent index={index} section={section} />
            </Section>
          );
        })}

        <Section>
          <h3 className="text-herbalife-1 dark:text-green-600 text-2xl font-semibold capitalize py-10">prodotti consigliati</h3>
          <ProdottiConsigliati pagina="prodottiHome1" />
          <h3 className="text-herbalife-1 dark:text-green-600 text-2xl font-semibold capitalize py-10">i più venduti</h3>
          <ProdottiConsigliati pagina="prodottiHome2" />
        </Section>
      </main>
    </>
  )
}