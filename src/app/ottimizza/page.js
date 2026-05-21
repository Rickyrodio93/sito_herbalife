import Background from "@/components/background/background";
import ProdottiConsigliati from "@/components/prodottiConsigliati/prodottiConsigliati";
import Section from "@/components/Section/Section";
import SectionComponent from "@/components/Section/SectionComponent";
import { SECTIONOTTIMIZZA } from "@/components/sections";

export const metadata = {
    title: "ottimizza la nutrizione",
    description: "Scopri come migliorare la tua alimentazione e il tuo benessere con soluzioni personalizzate.",
    openGraph: {
        title: "ottimizza la nutrizione | Distributore Indipendente Herbalife",
        description: "Scopri come migliorare la tua alimentazione e il tuo benessere con soluzioni personalizzate.",
        url: "https://www.riccardorodio.com/ottimizza",
        siteName: "Riccardo Rodio Herbalife",
        locale: "it_IT",
        type: "website",
        images: [
            {
                url: "https://www.riccardorodio/immagini/background/ottimizza.webp",
                width: 1200,
                height: 630,
                alt: "ottimizza la nutrizione - Distributore Indipendente Herbalife"
            }
        ]
    },
}

export default function Ottimizza() {
    return(
        <>
        <Background
        titolo={"ottimizza la nutrizione"}
        src="/immagini/background/ottimizza_nutrizione.webp"
      />
      <main>
        {SECTIONOTTIMIZZA.map((section, index) => (
          <Section key={index}>
            <SectionComponent index={index} section={section} />
          </Section>
        ))}
        <Section>
          <h3 className="text-herbalife-1 dark:text-green-600 text-2xl font-semibold capitalize py-10">
            prodotti consigliati
          </h3>
          <ProdottiConsigliati pagina="ottimizza" />
        </Section>
      </main>
        </>
    )
}