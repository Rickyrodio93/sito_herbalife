import Background from "@/components/background/background";
import CardCampioni from "@/components/cards/CardCampioni";
import ProdottiConsigliati from "@/components/prodottiConsigliati/prodottiConsigliati";
import Section from "@/components/Section/Section";
import SectionComponent from "@/components/Section/SectionComponent";
import { SECTIONSPORT } from "@/components/sections";

export const metadata = {
    title: "sport",
    description: "Massimizza le tue prestazioni con Herbalife24. Scopri i prodotti per sportivi su riccardorodio.com: energia, idratazione e recupero per i tuoi allenamenti.",
    openGraph: {
        title: "sport | Distributore Indipendente Herbalife",
        description: "Massimizza le tue prestazioni con Herbalife24. Scopri i prodotti per sportivi su riccardorodio.com: energia, idratazione e recupero per i tuoi allenamenti.",
        url: "https://www.riccardorodio.com/sport",
        siteName: "Riccardo Rodio Herbalife",
        locale: "it_IT",
        type: "website",
        images: [
            {
                url: "https://www.riccardorodio/immagini/background/sport.webp",
                width: 1200,
                height: 630,
                alt: "sport - Distributore Indipendente Herbalife"
            }
        ]
    },
}

export default function Sport() {
    return (
        <>
        <Background titolo={"linea h24"} src="/immagini/background/sport.webp" />
        <main>
            <Section>
                <h2>collaboriamo con i campioni</h2>
                <CardCampioni/>
            </Section>
            {SECTIONSPORT.map((section, index) => (
                <Section key={index}>
            <SectionComponent section={section} index={index} />
          </Section>
            ))}

            <Section>
          <h3 className="text-herbalife-1 dark:text-green-600 text-2xl font-semibold capitalize py-10">
            prodotti consigliati
          </h3>
          <ProdottiConsigliati pagina="sport" />
        </Section>
        </main>
        </>
    )
}