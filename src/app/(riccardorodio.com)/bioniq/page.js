import BioniqClient from "@/components/pagine/bionicClient"

export const metadata = {
    title: "Bioniq: Nutrizione Personalizzata su Analisi dei Biomarcatori",
    description:
        "Bioniq crea una formula di integrazione unica per te, basata sulla tua Valutazione del Benessere e sui tuoi biomarcatori. Scienza svizzera certificata, non un multivitaminico generico. Scoprilo con Riccardo Rodio.",

    alternates: {
        canonical: "https://www.riccardorodio.com/bioniq",
    },

    keywords: [
        "Bioniq",
        "nutrizione personalizzata",
        "analisi biomarcatori",
        "integratori su misura",
        "Bioniq Herbalife",
        "valutazione del benessere",
        "Bioniq Italia",
        "Riccardo Rodio",
    ],

    openGraph: {
        title: "Bioniq: Nutrizione Personalizzata su Analisi dei Biomarcatori",
        description:
            "Una formula di integrazione unica per te, basata sui tuoi biomarcatori. Scienza svizzera certificata con Riccardo Rodio.",
        url: "https://www.riccardorodio.com/bioniq",
        siteName: "Riccardo Rodio Herbalife & Bioniq",
        locale: "it_IT",
        type: "website",
        images: [
            {
                url: "https://www.riccardorodio.com/immagini/og_image/bioniq.png",
                width: 1200,
                height: 630,
                alt: "Bioniq - Nutrizione personalizzata by Riccardo Rodio",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "Bioniq: Nutrizione Personalizzata su Analisi dei Biomarcatori",
        description:
            "Una formula di integrazione unica per te, basata sui tuoi biomarcatori. Scienza svizzera certificata con Riccardo Rodio.",
        images: ["https://www.riccardorodio.com/immagini/og_image/bioniq.png"],
    },
};

export default function Bioniq() {
    return <BioniqClient />
}