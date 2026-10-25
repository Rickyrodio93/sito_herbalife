"use client";

import { ChevronUp, ClipboardCheck, ShoppingBag } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import PreventivoLista from "./preventivoLista";
import Scontrino from "./scontrino";
import { useEffect, useRef, useState } from "react";

export default function RiepilogoTelefono({
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
  const reduce = useReducedMotion();
  const barraRef = useRef(null);
  const [sopraBarra, setSopraBarra] = useState(180);

  useEffect(() => {
    const el = barraRef.current;
    if (!el) return;
    const misura = () => {
      // distanza tra il bordo superiore della barra e il fondo dello schermo
      setSopraBarra(
        Math.round(window.innerHeight - el.getBoundingClientRect().top),
      );
    };
    misura();
    const ro = new ResizeObserver(misura);
    ro.observe(el);
    window.addEventListener("resize", misura);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", misura);
    };
  }, []);

  const totaleCalcolato =
    ruolo === "cliente"
      ? `${preventivo.venditaCliente.toFixed(2)} €`
      : `${preventivo.totale.toFixed(2)} €`;

  const isBioniqUnico =
    haBioniq && ruolo === "DS" && usoDistributore !== "uso personale";
  const isDisabled = haOrdineMisto || isBioniqUnico;

  // la carta parte sotto la barra (clippata dal layer) e sale
  const nascosto = reduce ? { opacity: 0 } : { y: "105%" };
  const visibile = reduce ? { opacity: 1 } : { y: 0 };

  return (
    <>
      {/* barra totale: è anche la "stampante" */}
      <div
        ref={barraRef}
        className="lg:hidden fixed bottom-24 left-4 right-4 z-50 pb-[env(safe-area-inset-bottom)]"
      >
        <div className="bg-zinc-900/95 dark:bg-card/95 backdrop-blur-xl border border-zinc-700 dark:border-line text-white rounded-3xl p-3 sm:p-4 shadow-2xl flex items-center justify-between transition-all">
          <div
            onClick={() => setIsOpenMobile(!isOpenMobile)}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-zinc-800 border border-zinc-700/60 flex items-center justify-center text-green-400">
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

          <button
            onClick={() => setIsOpenMobile(!isOpenMobile)}
            className="flex items-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all active:scale-95 cursor-pointer"
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
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.55 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black z-40 lg:hidden"
            onClick={() => setIsOpenMobile(false)}
          />
        )}

        {isOpenMobile && (
          // layer: il bordo inferiore sta dietro la barra e clippa la carta
          <div
            key="layer"
            style={{ bottom: sopraBarra + 12 }}
            className="pointer-events-none fixed inset-x-0 top-20 z-49 flex flex-col justify-end overflow-hidden lg:hidden"
          >
            <motion.div
              initial={nascosto}
              animate={visibile}
              exit={nascosto}
              transition={
                reduce
                  ? { duration: 0.2 }
                  : { duration: 0.9, ease: [0.22, 0.8, 0.3, 1] }
              }
              className="pointer-events-auto mx-4 flex max-h-full min-h-0 flex-col gap-4 pt-2 pb-3"
            >
              {haBioniq && (
                <div className="shrink-0 rounded-2xl border border-line bg-card p-3">
                  <PreventivoLista
                    mostraLista={false}
                    prodotti={prodotti}
                    haBioniq={haBioniq}
                    ruolo={ruolo}
                    usoDistributore={usoDistributore}
                    haOrdineMisto={haOrdineMisto}
                    isAbbonato={isAbbonato}
                    setIsAbbonato={setIsAbbonato}
                  />
                </div>
              )}

              <Scontrino
                className="min-h-0"
                scrollClassName="min-h-0 flex-1 overflow-y-auto"
                prodotti={prodotti}
                ruolo={ruolo}
                preventivo={preventivo}
                livelloMarketing={livelloMarketing}
                usoDistributore={usoDistributore}
                isAbbonato={isAbbonato}
                onRimuoviProdotto={onRimuoviProdotto}
                haOrdineMisto={haOrdineMisto}
                footer={
                  prodotti.length > 0 && (
                    <button
                      disabled={isDisabled}
                      onClick={() => {
                        setIsOpenMobile(false);
                        openModal();
                      }}
                      className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-herbalife-4 px-4 py-3.5 text-xs font-black uppercase tracking-wider text-white shadow-md transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <ClipboardCheck size={16} />
                      {ruolo === "cliente"
                        ? "conferma ordine"
                        : "riepilogo ordine"}
                    </button>
                  )
                }
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
