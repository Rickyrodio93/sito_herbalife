import FAQProdottoClient from "@/components/pagine/faqProdottoClient"

export const metadata = {
    title: "Nutrizione Personalizzata e Bioniq: Domande Frequenti",
    description: "Come funziona l'analisi dei biomarcatori, la sicurezza dei prodotti e il percorso di nutrizione su misura con Herbalife e Bioniq. Risposte chiare e aggiornate.",
    openGraph: {
        title: "FAQ Nutrizione Personalizzata e Bioniq",
        description: "Come funziona l'analisi dei biomarcatori, la sicurezza dei prodotti e il percorso di nutrizione su misura con Herbalife e Bioniq.",
        url: "https://www.riccardorodio.com/faq-prodotto",
        siteName: "Riccardo Rodio Herbalife & Bioniq",
        locale: "it_IT",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "FAQ Nutrizione Personalizzata e Bioniq",
        description: "Come funziona l'analisi dei biomarcatori, la sicurezza dei prodotti e il percorso di nutrizione su misura con Herbalife e Bioniq.",
    },
}

export default function FAQProdotto(){
    return (
        <>
        <FAQProdottoClient />
        </>
    )
}