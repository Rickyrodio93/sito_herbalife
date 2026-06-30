import Background from "@/components/background/background";
import ProdottiConsigliati from "@/components/prodottiConsigliati/prodottiConsigliati";
import Section from "@/components/Section/Section";
import SectionComponent from "@/components/Section/SectionComponent";
import { SECTIONCONTROLLOPESO } from "@/components/sections";

export const metadata = {
    title: "controllo del peso",
    description: "Raggiungi il tuo peso forma con Herbalife. Scopri i programmi per il controllo del peso su riccardorodio.com. Inizia oggi il tuo percorso personalizzato!",
    openGraph: {
        title: "controllo del peso | Distributore Indipendente Herbalife",
        description: "Scopri i prodotti Herbalife e trasforma la tua forma fisica con una consulenza personalizzata.",
        url: "https://www.riccardorodio.com/controlloPeso",
        siteName: "Riccardo Rodio Herbalife",
        locale: "it_IT",
        type: "website",
        images: [
            {
                url: "https://www.riccardorodio/immagini/background/controlloPeso.webp",
                width: 1200,
                height: 630,
                alt: "controllo del peso - Distributore Indipendente Herbalife"
            }
        ]
    },
}

export default function ControlloPeso() {
    return (
        <>
            <main className="pt-28 md:pt-30">
                <Background titolo="controllo del peso" src="/immagini/background/controlloPeso.webp" />
                {SECTIONCONTROLLOPESO.map((section, index) => (
                    <Section key={index}>
                        <SectionComponent index={index} section={section} />
                    </Section>
                ))}

                <Section>
                    <ProdottiConsigliati pagina="controlloPeso" title="prodotti consigliati" />
                </Section>
            </main>
        </>
    )
}