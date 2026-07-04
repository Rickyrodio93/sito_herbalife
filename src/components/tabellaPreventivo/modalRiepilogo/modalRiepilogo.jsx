"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { createPortal } from "react-dom";
import calcoloPrezzo from "../calcoloPrezzo";

import RiepilogoTable from "./riepilogoTable";
import CTARiepilogo from "./CTARiepilogo";

export default function ModalRiepilogo({
  setShowModal,
  prodotti,
  preventivo,
  ruolo,
  livelloMarketing,
  usoDistributore,
  isAbbonato,
}) {
  const modalRef = useRef(null);
  const isCliente = ruolo === "cliente";

  const calcolaPrezzoFinito = (prodotto) => {
    return calcoloPrezzo(
      "cliente",
      {
        PrezzoListino: prodotto.PrezzoListino || prodotto.prezzoListino,
        BaseSconto: prodotto.BaseSconto || prodotto.baseSconto,
        Iva: prodotto.Iva || prodotto.iva,
      },
      null,
      null,
    );
  };

  // righe prodotti per WhatsApp
  const righeProdotti = prodotti.map((p, idx) => {
    const prezzoFinito = calcolaPrezzoFinito(p);
    const totaleRiga = prezzoFinito * p.quantita;

    return `${idx + 1}) *${p.id}* - *${p.nome}*
  cad: _${prezzoFinito.toFixed(2)}€_
  q.tà: _${p.quantita}_ 
  totale prodotto: _${totaleRiga.toFixed(2)}€_`;
  });

  // messaggio finale
  const message =
    "Salve, vorrei ordinare i seguenti prodotti:\n\n" +
    righeProdotti.join("\n\n") +
    `\n\n----------------------------` +
    `\n*Totale prodotti:* ${preventivo.sommaProdotti}` +
    `\n*TOTALE DA PAGARE:* ${preventivo.venditaCliente.toFixed(2)}€` +
    `\n----------------------------` +
    `\n_(Prezzi comprensivi di IVA e spese accessorie)_`;

  const encodedMessage = encodeURIComponent(message); // messaggio codificato per whatsApp

  const ids = prodotti.map((p) => p.id);
  const searchText = encodeURIComponent(ids.join(" "));

  const haProdottiBioniq =
    prodotti?.some((item) => item.nome?.toLowerCase().includes("bioniq")) ||
    false;
  const content = (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, ease: "linear" }}
        exit={{ opacity: 0 }}
        onClick={() => setShowModal(false)}
        className="flex items-center justify-center fixed inset-0 z-999999 bg-zinc-950/50 backdrop-blur-md"
      >
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.98 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl max-h-[90vh] md:max-h-[85vh] m-4 flex flex-col"
        >
          <div
            ref={modalRef}
            className="relative flex flex-col rounded-xl w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 max-h-full overflow-hidden text-sm shadow-2xl"
          >
            {/* header del modale */}
            <div className="flex items-center shrink-0 justify-between p-5 border-b border-zinc-100 dark:border-zinc-900">
              <h3 className="uppercase tracking-wider font-bold text-zinc-900 dark:text-zinc-50 text-lg mb-0">
                riepilogo ordine{" "}
                <span>
                  ({ruolo} {!isCliente ? `- ${livelloMarketing}%` : ""})
                </span>
              </h3>
              <button
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer transition-colors p-1 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900"
                onClick={() => setShowModal(false)}
              >
                <X size={20} />
              </button>
            </div>

            {/* tabella modale */}

            <RiepilogoTable
              prodotti={prodotti}
              calcolaPrezzoFinito={calcolaPrezzoFinito}
              isCliente={isCliente}
              isAbbonato={isAbbonato}
              livelloMarketing={livelloMarketing}
              usoDistributore={usoDistributore}
              ruolo={ruolo}
              preventivo={preventivo}
            />

            {/* bottoni CTA */}
            <CTARiepilogo
              setShowModal={setShowModal}
              haProdottiBioniq={haProdottiBioniq}
              isCliente={isCliente}
              ruolo={ruolo}
              searchText={searchText}
              encodedMessage={encodedMessage}
            />
          </div>
        </motion.div>
      </motion.div>
    </>
  );

  return createPortal(content, document.body);
}
