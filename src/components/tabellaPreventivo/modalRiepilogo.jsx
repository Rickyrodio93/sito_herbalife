"use client"
import { useRef } from "react";
import { motion } from "framer-motion";
import { Share, Store, X } from "lucide-react";
import { MdLocalShipping } from "react-icons/md";
import { createPortal } from "react-dom";
import calcoloPrezzo from "./calcoloPrezzo";
import { getScontoUnitario } from "./calcoloPreventivo";

export default function ModalRiepilogo({
  setShowModal,
  prodotti,
  preventivo,
  ruolo,
  livelloMarketing,
  usoDistributore,
}) {
  const modalRef = useRef(null);
  const isCliente = ruolo === "cliente";
  const modalThead = isCliente
    ? ["id", "prodotto", "cad.", "q.tà", "totale"]
    : ["id", "prodotto", "cad.", "q.tà", "sconto", "tasse", "iva", "totale"];
  const phoneNumber = "+393496635371";

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

  const linkEstoreCliente = `https://riccardorodio.goherbalife.com/Catalog/Product/Search/it-IT/${searchText}`;
  const linkMyHerbalifeBusiness = `https://www.myherbalife.com/it-IT/Shop/Catalog/Items/Search/${ruolo === "DS" ? "Ds" : "Mb"}?searchText=${searchText}`;
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
                <span className="">
                  ({ruolo} {!isCliente ? `- ${livelloMarketing}%` : ""}){" "}
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
            <div className="overflow-y-auto relative flex-[1_1_auto] p-5">
              <table className="w-full border-collapse">
                <thead className="text-zinc-400 dark:text-zinc-500 uppercase text-[11px] font-bold tracking-wider border-b border-zinc-100 dark:border-zinc-900">
                  <tr className="text-center">
                    {modalThead.map((nameCol, idx) => (
                      <td
                        key={nameCol}
                        className={`pb-3 font-semibold ${idx === 1 ? "text-left" : idx === modalThead.length - 1 ? "text-right" : "text-center"}`}
                      >
                        {nameCol}
                      </td>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
                  {prodotti.length > 0 &&
                    prodotti.map((p) => {
                      const prezzoUnitario = calcolaPrezzoFinito(p);
                      const cad = isCliente
                        ? `${prezzoUnitario.toFixed(2)}`
                        : `${p.PrezzoListino.toFixed(2)}`;

                      const scontoUnitario = getScontoUnitario(
                        p.baseSconto || p.BaseSconto,
                        livelloMarketing,
                        usoDistributore,
                      );
                      const scontoTotaleRiga = scontoUnitario * p.quantita;

                      const q = Number(p.quantita) || 0;
                      const prezzoListino =
                        Number(p.PrezzoListino || p.prezzoListino) || 0;
                      const ivaUnitaria = Number(p.Iva || p.iva || 0);

                      // 1. Calcolo IVA riga (rispecchia la tua logica condizionale)
                      let ivaRiga = 0;
                      if (
                        ruolo === "CP" ||
                        (ruolo === "DS" && usoDistributore === "uso personale")
                      ) {
                        ivaRiga =
                          (prezzoListino - scontoUnitario) * ivaUnitaria * q;
                      } else if (
                        ruolo === "DS" &&
                        usoDistributore !== "uso personale"
                      ) {
                        ivaRiga = prezzoListino * ivaUnitaria * q;
                      } else {
                        ivaRiga = prezzoListino * ivaUnitaria * q;
                      }

                      // 2. Calcolo TASSE riga (rispecchia la tua logica condizionale)
                      let tasseRiga = 0;
                      if (ruolo === "DS") {
                        if (usoDistributore === "vendita occasionale") {
                          tasseRiga = scontoUnitario * 0.1794 * q;
                        } else if (usoDistributore === "abituale <6410") {
                          tasseRiga =
                            (scontoUnitario * 0.1794 - scontoUnitario * 0.22) *
                            q;
                        } else if (usoDistributore === "abituale >6410") {
                          tasseRiga =
                            (scontoUnitario * 0.1794 -
                              scontoUnitario * 0.22 +
                              scontoUnitario * 0.0877) *
                            q;
                        }
                      }
                      const totaleRiga =
                        prezzoListino * q -
                        scontoUnitario * q +
                        (ruolo === "cliente" ? 0 : tasseRiga + ivaRiga);

                      return (
                        <tr
                          key={p.id}
                          className="text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors text-xs sm:text-sm"
                        >
                          {/* ID */}
                          <td className="text-center py-3.5 px-2 font-mono text-zinc-400 dark:text-zinc-500">
                            {p.id}
                          </td>
                          {/* Nome prodotto */}
                          <td className="text-left font-medium max-w-55 py-3.5 px-2 tracking-tight">
                            <p className="line-clamp-2">{p.nome}</p>
                          </td>
                          {/* Prezzo unitario */}
                          <td className="text-center py-3.5 px-2 font-mono">
                            {cad}€
                          </td>
                          {/* quantità */}
                          <td className="text-center py-3.5 px-2 font-medium text-zinc-500 dark:text-zinc-400">
                            {p.quantita}
                          </td>
                          {/* sconto se non cliente */}
                          {!isCliente && (
                            <>
                              <td className="text-center py-3.5 px-2 font-mono text-green-500 dark:text-green-400 text-xs">
                                -{scontoTotaleRiga.toFixed(2)}€
                              </td>
                              {/* tasse */}
                              <td className="text-center py-3.5 px-2 font-medium text-zinc-500 dark:text-zinc-400">
                                {tasseRiga=== 0 ?"-":`${tasseRiga.toFixed(2)}€`}
                              </td>
                              {/* iva */}
                              <td className="text-center py-3.5 px-2 font-medium text-zinc-500 dark:text-zinc-400">
                                {ivaRiga.toFixed(2)}€
                              </td>
                            </>
                          )}
                          {/* totale riga */}
                          <td className="text-right py-3.5 px-2 font-semibold font-mono text-zinc-950 dark:text-zinc-50">
                            {isCliente
                              ? cad * p.quantita
                              : totaleRiga.toFixed(2)}
                            €
                          </td>
                        </tr>
                      );
                    })}

                  {/* RIGA SPEDIZIONE */}
                  {!isCliente &&
                    preventivo.spedizione > 0 &&
                    (() => {
                      const sommaIvaUnit = prodotti.reduce(
                        (acc, p) =>
                          acc + Number(p.quantita) * Number(p.iva || 0),
                        0,
                      );
                      const ivaSpedizione =
                        preventivo.spedizione *
                        (sommaIvaUnit / preventivo.sommaProdotti);
                      return (
                        <tr className="bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-200 text-zinc-800 dark:text-zinc-100 text-xs">
                          <td className="text-center py-3.5 px-2 text-xs text-zinc-400 dark:text-zinc-500 flex items-center justify-center">
                            <MdLocalShipping size={16} />
                          </td>
                          <td className="text-left py-3.5 px-2 font-medium max-w-55 tracking-tight text-sm">
                            Spedizione
                          </td>
                          <td className="text-center py-3 px-2 font-mono text-red-500">
                            {preventivo.spedizione.toFixed(2)}€
                          </td>
                          <td className="text-center py-3 px-2">-</td>
                          <td className="text-center py-3 px-2">-</td>
                          <td className="text-center py-3 px-2">-</td>
                          {/* IVA Spedizione calcolata in CalcoloPreventivo */}
                          <td className="text-center py-3.5 px-2 font-medium text-zinc-500 dark:text-zinc-400">
                            {ivaSpedizione.toFixed(2)}€
                          </td>
                          <td className="text-right py-3.5 px-2 font-semibold font-mono text-zinc-950 dark:text-zinc-50">
                            {(preventivo.spedizione + ivaSpedizione).toFixed(2)}
                            €
                          </td>
                        </tr>
                      );
                    })()}
                </tbody>
                <tfoot className="border-t border-t-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold text-sm sm:text-base">
                  <tr>
                    <td
                      colSpan={2}
                      className="pt-4 pb-2 uppercase tracking-wider font-bold text-xs text-zinc-400 dark:text-zinc-500"
                    >
                      totale riepilogo:
                    </td>
                    <td className="pt-4 pb-2"></td>
                    <td className="pt-4 pb-2 text-center font-bold text-zinc-600 dark:text-zinc-400">
                      {preventivo.sommaProdotti}
                    </td>
                    {!isCliente && (
                      <>
                        <td className="text-center pt-4 pb-2 font-mono text-green-500 dark:text-green-400 text-xs">
                          -{preventivo.sconto.toFixed(2)}€
                        </td>
                        <td className="text-center pt-4 pb-2 font-mono text-zinc-500 dark:text-zinc-400 text-xs">
                          {preventivo.tasse === 0 ? "-": `${preventivo.tasse.toFixed(2)}€`}
                        </td>
                        <td className="text-center pt-4 pb-2 font-mono text-zinc-500 dark:text-zinc-400 text-xs">
                          {preventivo.iva.toFixed(2)}€
                        </td>
                      </>
                    )}
                    <td className="text-right pt-4 pb-2 font-black font-mono text-xs text-herbalife-1 dark:text-herbalife-2">
                      {isCliente
                        ? preventivo.venditaCliente.toFixed(2)
                        : preventivo.totale.toFixed(2)}
                      €
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* bottoni CTA */}
            <div className="flex flex-col sm:flex-row shrink-0 gap-3 items-center justify-end p-5 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-100 dark:border-zinc-900">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-200 font-medium transition-colors cursor-pointer text-center text-xs uppercase tracking-wider"
              >
                chiudi finestra
              </button>

              {isCliente ? (
                <>
                  <a
                    href={linkEstoreCliente}
                    className="w-full sm:w-auto bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-wider shadow-sm transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Store size={16} /> Completa sull'e-store online
                  </a>
                  <a
                    href={`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`}
                    className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-wider shadow-sm transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Share size={16} /> invia ordine su whatsApp
                  </a>
                </>
              ) : (
                <>
                  <a
                    href={linkMyHerbalifeBusiness}
                    className="w-full sm:w-auto bg-herbalife-1 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-wider shadow-sm transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Store size={16} /> completa ordine su MyHerbalife
                  </a>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );

  return createPortal(content, document.body);
}
