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
      {/* VERSIONE DESKTOP */}
      <div className="hidden lg:block w-full">
        <div className="text-black dark:text-white capitalize w-72">
          
          <div className="w-full h-min shadow-2xl p-6 my-5 mx-auto text-center relative paper bg-white dark:bg-zinc-800 dark:before:bg-zinc-800! dark:after:bg-zinc-800! rounded-lg">
            <h3 className="mt-0 text-xl pb-3 uppercase font-mono font-bold tracking-wide border-b border-zinc-100 dark:border-zinc-700/50 mb-4">
              la tua lista prodotti:
            </h3>

            <PreventivoLista
              prodotti={prodotti}
              onRimuoviProdotto={onRimuoviProdotto}
            />

            <h3 className="my-4 text-xl uppercase font-mono font-bold tracking-wide border-b border-zinc-100 dark:border-zinc-700/50 pb-2">
              dettagli prodotti:
            </h3>

            <PreventivoDettaglio
              ruolo={ruolo}
              preventivo={preventivo}
              livelloMarketing={livelloMarketing}
              usoDistributore={usoDistributore}
            />

            {/* 2. Il pulsante rimane integrato DENTRO il blocco carta per un look compatto */}
            {prodotti.length > 0 && (
              <button
                onClick={ruolo === "cliente" ? openModal : handleCopySKU}
                className="mt-6 flex items-center justify-center gap-2 w-full py-3 px-4 bg-herbalife-4 hover:bg-herbalife-1 text-white rounded-xl transition-all duration-300 text-sm font-black uppercase tracking-wider shadow-md hover:shadow-lg active:scale-[0.98]"
              >
                {copied ? (
                  <>
                    <Check size={18} /> Copiato!
                  </>
                ) : (
                  <>
                    <ClipboardCopy size={18} />{" "}
                    {ruolo !== "cliente" ? "copia per myHL" : "conferma ordine"}
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* RIEPILOGO SMARTPHONE */}
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

      {/* MODALI DI CONFERMA / COPIA */}
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
