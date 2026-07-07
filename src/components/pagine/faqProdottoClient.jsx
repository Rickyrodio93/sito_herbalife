"use client";

import { useState } from "react";
import Link from "next/link";
import { AccordionDataProdotto } from "../accordion/accordionData";
import AccordionItem from "../accordion/AccordionItem";

export default function FAQProdottoClient() {
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
        name: "Che differenza c'è tra Bioniq e un multivitaminico generico?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Bioniq formula l'integrazione a partire dall'analisi dei tuoi biomarcatori ematici, mentre un multivitaminico generico ha dosi identiche per chiunque.",
        },
      },
      {
        "@type": "Question",
        name: "Come funziona l'analisi dei biomarcatori?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "I tuoi valori ematici vengono analizzati da un sistema di intelligenza artificiale che individua carenze o squilibri e costruisce una formula personalizzata.",
        },
      },
      {
        "@type": "Question",
        name: "In quanto tempo ricevo la mia formula personalizzata?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "I tempi variano in base alla fase di analisi; durante la consulenza viene indicata una stima precisa per il singolo caso.",
        },
      },
      {
        "@type": "Question",
        name: "I prodotti sono sicuri e controllati?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sì, le formulazioni seguono controlli di qualità rigorosi in ogni fase, dalla selezione degli ingredienti al prodotto finale.",
        },
      },
      {
        "@type": "Question",
        name: "Posso abbinare Bioniq ai prodotti Herbalife?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sì, è possibile integrare il percorso Bioniq con la linea nutrizionale Herbalife valutando insieme la combinazione più adatta.",
        },
      },
      {
        "@type": "Question",
        name: "Quanto costa il percorso di nutrizione personalizzata?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Il costo dipende dal tipo di analisi e dalla formula richiesta; una valutazione personalizzata fornisce un preventivo preciso.",
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>

      <main className="pt-32 pb-20  min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col justify-center transition-colors duration-300">
        <section className="max-w-3xl mx-auto mb-12 text-center sm:text-left">
          <h2>Domande Frequenti su Nutrizione Personalizzata e Bioniq</h2>

          <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg leading-relaxed text-justify sm:text-left">
            Le risposte alle domande più comuni su come funziona l&apos;analisi
            dei biomarcatori, la sicurezza dei prodotti e il percorso di
            nutrizione su misura con Herbalife e Bioniq.
          </p>

          <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
            Cerchi informazioni sull&apos;opportunità commerciale?{" "}
            <Link href="/faq">Vai alla FAQ dedicata</Link>
          </p>
        </section>

        <div className="flex flex-col gap-4 w-full max-w-xl mx-auto mb-16">
          {AccordionDataProdotto.map((item) => (
            <AccordionItem
              key={item.id}
              {...item}
              isExpanded={expandedId === item.id}
              onToggle={() => toggleExpand(item.id)}
            />
          ))}
        </div>

        <section className="max-w-2xl mx-auto text-center px-4">
          <h3 className="text-2xl sm:text-3xl font-extrabold mb-3 text-zinc-900 dark:text-zinc-100 tracking-tight">
            Vuoi scoprire il percorso più adatto a te?
          </h3>
          <p className="mb-8 text-zinc-600 dark:text-zinc-400 font-medium">
            Richiedi una valutazione personalizzata: ne parliamo insieme senza
            impegno.
          </p>
          <div className="flex justify-center">
            <Link
              href="/preventivo"
              className="inline-flex items-center justify-center bg-herbalife-4 dark:bg-herbalife-1 text-white hover:opacity-95 px-8 py-4 rounded-xl font-bold text-base shadow-md transition-all duration-300 cursor-pointer hover:shadow-lg active:scale-98 no-underline!"
            >
              richiedi una valutazione personalizzata
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
