import Background from "@/components/background/background";
import Section from "@/components/Section/Section";
import SectionComponent from "@/components/Section/SectionComponent";
import { SECTIONSCIENZA } from "@/components/sections";

export const metadata = {
    title: "scienza",
    description: "tutta la scienza dietro i prodotti herbalife",
    openGraph: {
        title: "scienza | Distributore Indipendente Herbalife",
        description: "tutta la scienza dietro i prodotti herbalife",
        url: "https://www.riccardorodio.com/scienza",
        siteName: "Riccardo Rodio Herbalife",
        locale: "it_IT",
        type: "website",
        images: [
            {
                url: "https://www.riccardorodio/immagini/background/scienza.webp",
                width: 1200,
                height: 630,
                alt: "scienza - Distributore Indipendente Herbalife"
            }
        ]
    },
}

export default function Scienza() {
    return (
        <>
            <Background titolo={"la scienza dietro i prodotti"} src="/immagini/background/scienza.webp" />
            <main>
                {SECTIONSCIENZA.map((section, index) => (
                    <Section key={section}>
                        <SectionComponent index={index} section={section} />
                    </Section>
                ))}
            </main>
        </>
    )
}