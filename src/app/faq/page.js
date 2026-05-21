import FAQClient from "@/components/pagine/faqClient"

export const metadata = {
    title: "Attività Herbalife: Come Iniziare, Guadagni e Domande Frequenti",
    description: "Scopri come iniziare un'attività Herbalife, quanto si può guadagnare, quanto tempo dedicare e quali sono i vantaggi. Risposte chiare e aggiornate.",
    openGraph: {
        title: "FAQ",
        description: "Scopri come iniziare un'attività Herbalife, quanto si può guadagnare, quanto tempo dedicare e quali sono i vantaggi. Risposte chiare e aggiornate.",
        url: "https://www.riccardorodio.com/faq",
        siteName: "Riccardo Rodio Herbalife",
        locale: "it_IT",
        type: "website",
    },
    twitter: {
        card: "summary_large_image", // Mostra la card con l'immagine grande, molto più cliccata
        title: "FAQ",
        description: "Scopri come iniziare un'attività Herbalife, quanto si può guadagnare, quanto tempo dedicare e quali sono i vantaggi. Risposte chiare e aggiornate.",
    },
}

export default function FAQ() {
    return (
        <>
            <FAQClient />
        </>
    )
}