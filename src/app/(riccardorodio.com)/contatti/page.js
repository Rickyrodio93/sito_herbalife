import ContattiClient from "@/components/pagine/contattiClient";

export const metadata = {
    title: "contatti",
    description:
        "Vuoi una consulenza o hai domande sui prodotti? Contatta Riccardo Rodio, Distributore Indipendente Herbalife. Sono qui per aiutarti a stare meglio!",
    alternates: { canonical: "https://www.riccardorodio.com/contatti" },
    openGraph: {
        title: "contatti | Riccardo Rodio",
        description: "Scrivimi o chiamami: consulenza su prodotti Herbalife, Bioniq e attività.",
        url: "https://www.riccardorodio.com/contatti",
        siteName: "Riccardo Rodio Herbalife",
        locale: "it_IT",
        type: "website",
    },
};
export default function Contatti() {
    return (
        <ContattiClient />
    )
}