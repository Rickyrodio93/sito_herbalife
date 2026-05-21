import RicetteClient from "@/components/pagine/ricetteClient"


export const metadata = {
    title: "ricette",
    description: "tantissime ricette buonissime da tutto il mondo da preparare con i prodotti Herbalife",
    openGraph: {
        title: "ricette | Distributore Indipendente Herbalife",
        description: "tantissime ricette buonissime da tutto il mondo da preparare con i prodotti Herbalife",
        url: "https://www.riccardorodio.com/ricette",
        siteName: "Riccardo Rodio Herbalife",
        locale: "it_IT",
        type: "website",
        images: [
            {
                url: "https://www.riccardorodio/immagini/background/sfondoRicette.jpg",
                width: 1200,
                height: 630,
                alt: "ricette - Distributore Indipendente Herbalife"
            }
        ]
    },
}

export default function Ricette() {
    return (
        <>
            <RicetteClient />
        </>
    )
}