import FormBusiness from "@/components/forms/FormBusiness";
import Section from "@/components/Section/Section";

export const metadata = {
    title: "Candidatura Business - Herbalife",
    description: "Compila il modulo per candidarti ed entrare nel mio team Herbalife.",
};
export default function CandidatiPage() {
    return (
        <main className="pt-32 pb-20 min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col justify-center">
            <Section>
                <div className="w-full max-w-xl mx-auto mb-10 text-center">
                    <h1 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white uppercase tracking-wide mb-3">Inizia la tua Attività</h1>
                    <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 font-medium px-4">Compila i passaggi sottostanti per inviare la tua candidatura e prenotare la chiamata informativa.</p>
                </div>
                <FormBusiness />
            </Section>
        </main>
    )
}