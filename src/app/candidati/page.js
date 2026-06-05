import FormSelezionabile from "@/components/forms/FormSelezionabile";
import Section from "@/components/Section/Section";

export const metadata = {
    title: "Candidatura Business - Herbalife",
    description: "Compila il modulo per candidarti ed entrare nel mio team Herbalife.",
};
export default function CandidatiPage() {
    return (
        <main className="pt-32 pb-20 min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col justify-center transition-colors duration-300">
            <Section>
                <FormSelezionabile />
            </Section>
        </main>
    )
}