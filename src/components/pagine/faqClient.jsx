"use client";

import { AccordionData } from "@/components/accordion/accordionData";
import AccordionItem from "@/components/accordion/AccordionItem";
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
      <main>
        <section className="max-w-4xl mx-auto mb-10">
          <h2 className="text-3xl font-bold mb-4">
            Domande Frequenti sull&apos;Attività Herbalife
          </h2>

          <p className="section-p text-lg leading-relaxed">
            In questa guida rispondo alle domande più frequenti su come iniziare
            un&apos;attività Herbalife, quanto si può guadagnare, quanto tempo è
            necessario dedicare e quali sono i vantaggi concreti. Troverai
            informazioni chiare, realistiche e aggiornate per capire se questa
            opportunità nel settore benessere è adatta a te.
          </p>
        </section>
        <ol className="flex flex-col gap-3 max-w-lg mx-auto my-25">
          {AccordionData.map((item) => (
            <AccordionItem
              key={item.id}
              {...item}
              isExpanded={expandedId === item.id}
              onToggle={() => toggleExpand(item.id)}
            />
          ))}
        </ol>
        <section className="max-w-4xl mx-auto mb-12 bg-white dark:bg-[#333333] text-black dark:text-white p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">In breve</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Attività flessibile part-time o full-time</li>
            <li>Possibilità di reddito extra o principale</li>
            <li>Formazione online e supporto continuo</li>
            <li>Basso costo di avviamento</li>
            <li>Recesso possibile secondo condizioni contrattuali</li>
          </ul>
        </section>
        <section className="max-w-4xl mx-auto my-12 text-center text-black dark:text-white">
          <h3 className="text-2xl font-bold mb-4">
            Vuoi capire se questa attività è adatta a te?
          </h3>

          <p className="mb-6">
            Scrivimi su WhatsApp e ti spiego senza impegno tutti i dettagli.
          </p>

          <a
            href="https://wa.me/+393496635371"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Scrivimi su WhatsApp
          </a>
        </section>
      </main>
    </>
  );
}
