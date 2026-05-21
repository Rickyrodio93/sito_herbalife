import { useRef } from "react";
import { motion } from "framer-motion";
import { Share, Store, X } from "lucide-react";
import { createPortal } from "react-dom";
import calcoloPrezzo from "./calcoloPrezzo";

export default function ModalRiepilogo({ setShowModal, prodotti, preventivo }) {
  const modalRef = useRef(null);
  const modalThead = ["id", "prodotto", "cad.", "q.tà", "totale"];
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
  const content = (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "linear" }}
        exit={{ opacity: 0 }}
        onClick={() => setShowModal(false)}
        className="flex items-center justify-center fixed inset-0 z-[999999999999999] bg-black/50 backdrop-blur-sm"
      >
        <motion.div
          initial={{ opacity: 0, y: "-10%" }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
          exit={{ opacity: 0, y: "-10%", transition: { duration: 0.3 } }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl max-h-[85vh] m-auto flex flex-col p-4"
        >
          <div
            ref={modalRef}
            className="relative flex flex-col w-full pointer-events-auto rounded-lg bg-white dark:bg-[#2e2e2e] border border-[rgba(0,0,0,0.175)] max-h-full overflow-hidden  text-sm sm:text-lg"
          >
            <div className="flex items-center shrink-0 justify-between p-4 border-b border-[#dee2e6] rounded-t-[calc(0.5rem-1px)]">
              <h3 className="capitalize text-herbalife-1 text-xl pr-2.5 mb-0 ">
                riepilogo prodotti:
              </h3>
              <button
                className="text-black dark:text-white cursor-pointer"
                onClick={() => setShowModal(false)}
              >
                <X />
              </button>
            </div>
            <div className="overflow-y-auto relative flex-[1_1_auto] p-4">
              <table className="w-full caption-bottom border-collapse">
                <thead className="text-black dark:text-white">
                  <tr className="text-center">
                    {modalThead.map((nameCol) => (
                      <td
                        key={nameCol}
                        className="capitalize font-bold text-sm sm:text-lg"
                      >
                        {nameCol}
                      </td>
                    ))}
                  </tr>
                </thead>
                <tbody className="border-t border-t-[#dee2e6]">
                  {prodotti.length > 0
                    ? prodotti.map((p) => {
                        const datiPerCalcolo = {
                          PrezzoListino: p.PrezzoListino,
                          Iva: p.Iva || p.iva,
                        };
                        const prezzoFinitoCliente = calcoloPrezzo(
                          "cliente",
                          datiPerCalcolo,
                          null,
                          null,
                        );
                        return (
                          <tr
                            key={p.id}
                            className="bg-white odd:bg-odd dark:odd:bg-[#1c1c1c] dark:bg-[#2e2e2e] text-black dark:text-white text-sm sm:text-lg"
                          >
                            <td className="text-center py-2 px-4">{p.id}</td>
                            <td className="text-left line-clamp-2 leading-8 py-2 px-4">
                              {p.nome}
                            </td>
                            <td className="py-2 px-4">
                              {prezzoFinitoCliente.toFixed(2)}€
                            </td>
                            <td className="py-2 px-4">{p.quantita}</td>
                            <td className="py-2 px-4 text-right">
                              {(prezzoFinitoCliente * p.quantita).toFixed(2)}€
                            </td>
                          </tr>
                        );
                      })
                    : ""}
                </tbody>
                <tfoot className="border-t border-t-[#dee2e6] text-black dark:text-white">
                  <tr className="font-bold">
                    <td colSpan={3} className="capitalize">
                      totale:
                    </td>
                    <td className="py-2 px-4">{preventivo.sommaProdotti}</td>
                    <td className="text-right py-2 px-4 text-sm sm:text-lg">
                      {preventivo.venditaCliente.toFixed(2)}€
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="flex shrink-0 gap-5 items-center justify-end p-[calc(1rem-0.5rem*.5)] border-t-2 border-t-[#dee2e6] dark:border-t-gray-500 rounded-bl-[calc(0.5rem-1px)] rounded-br-[calc(0.5rem-1px)]">
              <a
                href={`https://riccardorodio.goherbalife.com/Catalog/Product/Search/it-IT/${searchText}`}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-sm flex gap-2.5"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Store size={25} /> completa sull'e-store online
              </a>

              <a
                href={`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-sm flex gap-2.5"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Share size={25} /> contattami per completare l'ordine
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );

  return createPortal(content, document.body);
}
