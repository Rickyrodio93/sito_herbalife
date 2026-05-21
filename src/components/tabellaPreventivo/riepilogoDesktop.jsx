import PreventivoDettaglio from "./preventivoDettaglio";
import CalcoloPreventivo from "./calcoloPreventivo";
import RiepilogoTelefono from "./riepilogoTelefono";
import { useState } from "react";
import PreventivoLista from "./preventivoLista";
import { Check, ClipboardCopy } from "lucide-react";
import ModalRiepilogo from "./modalRiepilogo";
import { AnimatePresence } from "framer-motion";
import ConfermaCopia from "./confermaCopia";

export default function Riepilogo({
  prodotti = [],
  onRimuoviProdotto,
  ruolo,
  usoDistributore,
  livelloMarketing,
}) {
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [conferma, setConferma] = useState(false);

  const preventivo = CalcoloPreventivo(
    prodotti,
    ruolo,
    usoDistributore,
    livelloMarketing,
  );

  // logica per copiare gli ID prodotto per il listino ordini
  const handleCopySKU = () => {
    if (prodotti.length === 0) return;

    // generazione stringa codici ID
    const skuString = prodotti
      .map((p) => String(p.id)) // prendo l'ID nel preventivo
      .filter((id) => id && id !== "undefined") // Pulizia di sicurezza
      .join("\n"); // unisco ogni ID con uno spazio per il listino myHerbalife

    if (skuString) {
      navigator.clipboard.writeText(skuString).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        setConferma(true); // apertura del modal
      });
    }
  };

  const openModal = () => setShowModal(true);

  return (
    <>
      <div className="hidden lg:block">
        <div className="text-black dark:text-white capitalize">
          <div className="bg-white dark:bg-[#2e2e2e] lg:sticky lg:top-[calc(var(--spacing-nav)+100px)]">
            <div className="w-72 h-min shadow-[0px_0px_15px_rgba(0,0,0,0.3)] p-6 my-5 mx-auto text-center relative paper dark:before:bg-[#2e2e2e!important] dark:after:bg-[#2e2e2e!important]">
              <h3 className="mt-0 text-2xl pb-3 uppercase font-courier">
                la tua lista prodotti:
              </h3>

              <PreventivoLista
                prodotti={prodotti}
                onRimuoviProdotto={onRimuoviProdotto}
              />
              <h3 className="mb-3 text-2xl uppercase font-courier">
                dettagli prodotti:
              </h3>
              <PreventivoDettaglio
                ruolo={ruolo}
                preventivo={preventivo}
                livelloMarketing={livelloMarketing}
                usoDistributore={usoDistributore}
              />
            </div>
          </div>
        </div>
      </div>

      {/* pulsante per la condivisione ordini */}
      {prodotti.length > 0 && (
        <button
          onClick={ruolo === "cliente" ? openModal : handleCopySKU}
          className="max-lg:hidden flex items-center justify-center gap-2 w-full mb-6 py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md transition-all text-sm font-bold uppercase tracking-wider shadow-md"
        >
          {copied ? (
            <>
              <Check size={16} /> Copiato!
            </>
          ) : (
            <>
              <ClipboardCopy size={16} />{" "}
              {ruolo !== "cliente" ? "copia per myHL" : "conferma ordine"}
            </>
          )}
        </button>
      )}

      {/* riepilogo smartphone */}
      <RiepilogoTelefono
        prodotti={prodotti}
        ruolo={ruolo}
        preventivo={preventivo}
        livelloMarketing={livelloMarketing}
        usoDistributore={usoDistributore}
        setIsOpenMobile={setIsOpenMobile}
        isOpenMobile={isOpenMobile}
        onRimuoviProdotto={onRimuoviProdotto}
        handleCopySKU={handleCopySKU}
        copied={copied}
        openModal={openModal}
      />

      <AnimatePresence>
        {ruolo === "cliente" && showModal && (
          <ModalRiepilogo
            setShowModal={setShowModal}
            prodotti={prodotti}
            preventivo={preventivo}
          />
        )}

        {ruolo !== "cliente" && conferma && (
          <ConfermaCopia
            setConferma={setConferma}
            ruolo={ruolo}
            prodotti={prodotti}
          />
        )}
      </AnimatePresence>
    </>
  );
}
