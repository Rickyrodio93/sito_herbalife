import PreventivoWrapper from "@/components/pagine/PreventivoWrapper"

export const metadata = {
    title: "preventivo prodotti",
    description: "Richiedi un preventivo personalizzato e gratuito per i tuoi prodotti Herbalife. Scopri i prezzi e ricevi una consulenza su misura per i tuoi obiettivi con Riccardo Rodio.",

    openGraph: {
        title: "preventivo prodotti | Riccardo Rodio - sito web ufficiale",
        description: "Richiedi un preventivo personalizzato e gratuito per i tuoi prodotti Herbalife. Scopri i prezzi e ricevi una consulenza su misura per i tuoi obiettivi con Riccardo Rodio.",
        url: "https://www.riccardorodio.com/preventivo",
        images: [
            {
                url: "https://riccardorodio.com/immagini/og_image/preventivo.png",
                width: 1200,
                height: 630,
                alt: "Generatore preventivo prodotti Herbalife - Riccardo Rodio",
            },
        ],
    },
};

export default function Preventivo() {
    return (
        <>
            <main className="pb-25 px-5 lg:px-10 text-balance">
                <PreventivoWrapper />
            </main>
        </>
    )
}