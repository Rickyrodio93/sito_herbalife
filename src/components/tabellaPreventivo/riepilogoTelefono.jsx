"use client";
import { ChevronUp, ClipboardCopy, ShoppingBag, X } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { motion, useDragControls } from "framer-motion";
import PreventivoDettaglio from "./preventivoDettaglio";
import PreventivoLista from "./preventivoLista";

export default function riepilogoTelefono({
  prodotti,
  ruolo,
  preventivo,
  livelloMarketing,
  usoDistributore,
  setIsOpenMobile,
  isOpenMobile,
  onRimuoviProdotto,
  openModal,
  haBioniq,
  haOrdineMisto,
  isAbbonato,
  setIsAbbonato,
}) {
  const dragControls = useDragControls();

  const totaleCalcolato =
    ruolo === "cliente"
      ? `${preventivo.venditaCliente.toFixed(2)} €`
      : `${preventivo.totale.toFixed(2)} €`;

  const isBioniqUnico =
    haBioniq && ruolo === "DS" && usoDistributore !== "uso personale";
  const isDisabled = haOrdineMisto || isBioniqUnico;

  return (
    <>
      <div className="lg:hidden fixed bottom-24 left-4 right-4 z-50 pb-[env(safe-area-inset-bottom)]">
        <div className="bg-zinc-900/95 dark:bg-zinc-950/95 backdrop-blur-xl border border-zinc-800 text-white rounded-3xl p-3 sm:p-4 shadow-2xl flex items-center justify-between transition-all">
          {/* totale + badge */}
          <div
            onClick={() => setIsOpenMobile(!isOpenMobile)}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-zinc-80 border border-zinc-700/60 flex items-center justify-center text-herbalife-1 dark:text-green-400">
                <ShoppingBag size={20} />
              </div>
              {preventivo.sommaProdotti > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-herbalife-1 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center border-2 border-zinc-900">
                  {preventivo.sommaProdotti < 100
                    ? preventivo.sommaProdotti
                    : "+99"}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <span className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">
                Totale Ordine
              </span>
              <span className="text-base font-extrabold text-white">
                {totaleCalcolato}
              </span>
            </div>
          </div>

          {/* pulsante dettaglio */}
          <button
            onClick={() => setIsOpenMobile(!isOpenMobile)}
            className="flex items-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-100 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all active:scale-95 cursor-pointer"
          >
            <span>{isOpenMobile ? "Chiudi" : "Dettagli"}</span>
            <ChevronUp
              size={16}
              className={`transition-transform duration-300 ${isOpenMobile ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpenMobile && (
          <>
            {/* backdrop scuro */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black z-40 lg:hidden"
              onClick={() => setIsOpenMobile(false)}
            />

            {/* Bottom Sheet Modal */}
            <motion.div
              key="drawer"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              drag="y"
              dragControls={dragControls}
              dragListener={false}
              dragConstraints={{ top: 0 }}
              dragElastic={{ top: 0, bottom: 0.5 }}
              onDragEnd={(event, info) => {
                if (info.offset.y > 100 || info.velocity.y > 300) {
                  setIsOpenMobile(false);
                }
              }}
              className="group fixed bottom-0 left-0 right-0 z-49 max-h-[82dvh] overflow-y-auto rounded-t-4xl bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 p-6 pt-4 border-t border-zinc-200 dark:border-zinc-800 shadow-2xl pb-48 lg:hidden"
            >
              <div
                onPointerDown={(e) => dragControls.start(e)}
                className="w-full py-2 cursor-grab active:cursor-grabbing touch-none flex justify-center"
              >
                <div className="w-12 h-1.5 bg-zinc-300 dark:bg-zinc-700 rounded-full group-active:bg-herbalife-1 transition-colors" />
              </div>

              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold capitalize">
                  La tua lista prodotti
                </h3>
                <button
                  className="p-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:opacity-80 transition cursor-pointer"
                  onClick={() => setIsOpenMobile(false)}
                >
                  <X />
                </button>
              </div>

              <PreventivoLista
                prodotti={prodotti}
                onRimuoviProdotto={onRimuoviProdotto}
                haBioniq={haBioniq}
                ruolo={ruolo}
                usoDistributore={usoDistributore}
                haOrdineMisto={haOrdineMisto}
                isAbbonato={isAbbonato}
                setIsAbbonato={setIsAbbonato}
              />

              {haOrdineMisto ? (
                <p className="mb-4 font-mono text-sm text-red-500">
                  Dettagli non disponibili per ordini misti.
                </p>
              ) : (
                <PreventivoDettaglio
                  ruolo={ruolo}
                  preventivo={preventivo}
                  livelloMarketing={livelloMarketing}
                  usoDistributore={usoDistributore}
                  onRimuoviProdotto={onRimuoviProdotto}
                />
              )}

              {/* pulsante Riepilogo */}
              {prodotti.length > 0 && (
                <button
                  disabled={isDisabled}
                  onClick={() => {
                    setIsOpenMobile(false);
                    openModal(true);
                  }}
                  className="mt-4 flex items-center justify-center gap-2 w-full py-3.5 px-4 bg-herbalife-1 dark:bg-green-500 hover:bg-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed text-white dark:text-zinc-950 rounded-2xl transition-all text-xs font-bold uppercase tracking-wider shadow-lg active:scale-[0.98] cursor-pointer"
                >
                  <ClipboardCopy size={16} />
                  <span>
                    {ruolo === "cliente"
                      ? "Conferma Ordine"
                      : "Riepilogo Ordine"}
                  </span>
                </button>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
