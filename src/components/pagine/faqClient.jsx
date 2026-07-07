"use client";

import { AccordionData } from "@/components/accordion/accordionData";
import AccordionItem from "@/components/accordion/AccordionItem";
import Link from "next/link";
import { useState } from "react";

export default function FAQClient() {
  const [expandedId, setExpandedId] = useState(null);
  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Quanto tempo bisogna dedicare all'attività Herbalife?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "L'attività può essere svolta part-time o full-time, dedicando dalle 4 alle 40 ore settimanali in base agli obiettivi personali.",
        },
      },
      {
        "@type": "Question",
        name: "Quanto si può guadagnare con l'attività Herbalife?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "I guadagni dipendono dall'impegno, dal tempo dedicato e dai risultati personali. È importante leggere la Dichiarazione dei compensi medi lordi ufficiale prima di iniziare.",
        },
      },
      {
        "@type": "Question",
        name: "Quali sono i vantaggi di diventare Distributore Herbalife?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Flessibilità negli orari, prodotti di qualità, formazione continua e supporto di una comunità globale.",
        },
      },
      {
        "@type": "Question",
        name: "Posso interrompere l'attività se cambio idea?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sì, è possibile recedere dal contratto in qualsiasi momento secondo le condizioni previste, con possibilità di rimborso entro 90 giorni.",
        },
      },
      {
        "@type": "Question",
        name: "Serve una laurea in nutrizione per iniziare?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, non è richiesta una laurea. È prevista formazione online, eventi e supporto continuo.",
        },
      },
      {
        "@type": "Question",
        name: "Come si inizia concretamente l'attività Herbalife?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Per iniziare è necessario acquistare l'Herbalife Member Pack e seguire i passaggi di iscrizione.",
        },
      },
    ],
  };
  return (
    <>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>

      <main className="pt-32 pb-20 min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col justify-center transition-colors duration-300">
        <section className="max-w-3xl mx-auto mb-12 text-center sm:text-left">
          <h2>Domande Frequenti sull&apos;Attività Herbalife</h2>

          <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg leading-relaxed text-justify sm:text-left">
            In questa guida rispondo alle domande più frequenti su come iniziare
            un&apos;attività Herbalife, quanto si può guadagnare, quanto tempo è
            necessario dedicare e quali sono i vantaggi concreti. Troverai
            informazioni chiare, realistiche e aggiornate per capire se questa
            opportunità nel settore benessere è adatta a te.
          </p>

          <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
            Cerchi informazioni sui prodotti o su Bioniq?{" "}
            <Link href="/faq-prodotto">Vai alla FAQ dedicata</Link>
          </p>
        </section>

        <div className="flex flex-col gap-4 w-full max-w-xl mx-auto mb-16">
          {AccordionData.map((item) => (
            <AccordionItem
              key={item.id}
              {...item}
              isExpanded={expandedId === item.id}
              onToggle={() => toggleExpand(item.id)}
            />
          ))}
        </div>
        <section className="w-full max-w-3xl mx-auto mb-16 border border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-900/50 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-sm">
          <h3 className="text-xl font-bold mb-4 text-zinc-900 dark:text-zinc-100 tracking-wide uppercase">
            In sintesi
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 list-none p-0 m-0 text-zinc-600 dark:text-zinc-400 font-medium text-sm sm:text-base">
            <li className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-herbalife-1 dark:bg-green-500 shrink-0" />
              Attività flessibile part-time o full-time
            </li>
            <li className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-herbalife-1 dark:bg-green-500 shrink-0" />
              Possibilità di reddito extra o principale
            </li>
            <li className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-herbalife-1 dark:bg-green-500 shrink-0" />
              Formazione online e supporto continuo
            </li>
            <li className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-herbalife-1 dark:bg-green-500 shrink-0" />
              Basso costo di avviamento
            </li>
            <li className="flex items-center gap-2.5 sm:col-span-2">
              <span className="h-2 w-2 rounded-full bg-herbalife-1 dark:bg-green-500 shrink-0" />
              Recesso possibile secondo condizioni contrattuali
            </li>
          </ul>
        </section>

        <section className="max-w-2xl mx-auto text-center px-4">
          <h3 className="text-2xl sm:text-3xl font-extrabold mb-3 text-zinc-900 dark:text-zinc-100 tracking-tight">
            Vuoi capire se questa attività è adatta a te?
          </h3>
          <p className="mb-8 text-zinc-600 dark:text-zinc-400 font-medium">
            Scrivimi su WhatsApp e ti spiego senza impegno tutti i dettagli.
          </p>
          <div className="flex justify-center">
            <a 
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-herbalife-4 dark:bg-herbalife-1 text-white hover:opacity-95 px-8 py-4 rounded-xl font-bold text-base shadow-md transition-all duration-300 cursor-pointer hover:shadow-lg active:scale-98"
            >
              scrivimi su whatsapp
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
