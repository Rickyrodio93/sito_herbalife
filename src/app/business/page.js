import Background from "@/components/background/background";
import Section from "@/components/Section/Section"
import SectionComponent from "@/components/Section/SectionComponent"
import { SECTIONBUSINESS } from "@/components/sections";

export const metadata = {
    title: "Business",
    description: "scopri l'incredibile opportunità di lavoro che offre Herbalife",
    openGraph: {
        title: "Business | Distributore Indipendente Herbalife",
        description: "scopri l'incredibile opportunità di lavoro che offre Herbalife",
        url: "https://www.riccardorodio.com/business",
        siteName: "Riccardo Rodio Herbalife",
        locale: "it_IT",
        type: "website",
        images: [
            {
                url: "https://www.riccardorodio/immagini/background/business.jpg",
                width: 1200,
                height: 630,
                alt: "Business - Distributore Indipendente Herbalife"
            }
        ]
    },
}

export default function Business() {
    return (
        <>
            <Background
                titolo="scopri il business herbalife"
                src="/immagini/background/business.jpg"
            />
            <main>
                {SECTIONBUSINESS.map((section, index) => (
                    <Section
                        key={index}>
                        <SectionComponent section={section} index={index} />
                    </Section>
                ))}
            </main>
        </>
    )
}