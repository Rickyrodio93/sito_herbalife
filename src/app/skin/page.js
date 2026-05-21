import Background from "@/components/background/background";
import ProdottiConsigliati from "@/components/prodottiConsigliati/prodottiConsigliati";
import Section from "@/components/Section/Section";
import SectionComponent from "@/components/Section/SectionComponent";
import { SECTIONSKIN } from "@/components/sections";

export const metadata = {
    title: "skin",
    description: "Nutri la tua pelle dall'interno e dall'esterno. Scopri la linea Herbalife Skin su riccardorodio.com per una bellezza radiosa e risultati visibili.",
    openGraph: {
        title: "skin | Distributore Indipendente Herbalife",
        description: "Nutri la tua pelle dall'interno e dall'esterno. Scopri la linea Herbalife Skin su riccardorodio.com per una bellezza radiosa e risultati visibili.",
        url: "https://www.riccardorodio.com/skin",
        siteName: "Riccardo Rodio Herbalife",
        locale: "it_IT",
        type: "website",
        images: [
            {
                url: "https://www.riccardorodio/immagini/background/skin.webp",
                width: 1200,
                height: 630,
                alt: "skin - Distributore Indipendente Herbalife"
            }
        ]
    },
}

export default function Skin() {
    return (
        <>
        <Background titolo={"herbalife skin"} src={"/immagini/background/skin.webp"}/>
            <main>
                {SECTIONSKIN.map((section, index) => (
                    <Section key={index}>
                        <SectionComponent section={section} index={index}/>
                    </Section>
                ))}
                <Section>
                    <h3 className="text-herbalife-1 dark:text-green-600 text-2xl font-semibold capitalize py-10">prodotti consigliati</h3>
                    <ProdottiConsigliati pagina="skin" />
                </Section>
            </main>
        </>
    )
}