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

        <div className="absolute bottom-1/8 sm:bottom-1/4 w-full gap-10 flex flex-wrap sm:flex-nowrap justify-evenly items-center text-center">
          <motion.div
            className="w-full sm:w-auto sm:max-w-full"
            initial={{ x: "-10%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Link
              href="/preventivo"
              className="text-white bg-herbalife-4 hover:bg-herbalife-1 text-center px-6 py-3 sm:text-3xl uppercase font-bold border rounded-xl mx-5 sm:m-auto"
            >preventivo prodotti</Link>
          </motion.div>
          <motion.div
          className="w-full sm:w-auto sm:max-w-full"
            initial={{ x: "10%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Link
              href="https://accounts.myherbalife.com/Account/Create?appId=1&qrFlow=1&locale=it-IT&SponsorId=kQkJ2BXpUJ4=&cmp=m_it_it_wbs_dssignup_btn_nap_copylink_20250305"
              target="_blank"
              className="text-white bg-herbalife-3 hover:bg-blue-700 text-center px-6 py-3 sm:text-3xl uppercase font-bold border rounded-xl mx-5 sm:m-auto"
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