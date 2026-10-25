"use client";

import { ChevronUp, ClipboardCheck, Printer, ShoppingBag } from "lucide-react";
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

  // misuro la fessura: il layer dello scontrino finisce lì
  const slotRef = useRef(null);
  const [sopraSlot, setSopraSlot] = useState(190);

  useEffect(() => {
    const el = slotRef.current;
    if (!el) return;
    const misura = () =>
      setSopraSlot(
        Math.round(window.innerHeight - el.getBoundingClientRect().top),
      );
    misura();
    const ro = new ResizeObserver(misura);
    ro.observe(el);
    window.addEventListener("resize", misura);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", misura);
    };
  }, []);

  const totale =
    ruolo === "cliente" ? preventivo.venditaCliente : preventivo.totale;
  const totaleLCD = totale.toFixed(2).replace(".", ",");

  const isBioniqUnico =
    haBioniq && ruolo === "DS" && usoDistributore !== "uso personale";
  const isDisabled = haOrdineMisto || isBioniqUnico;

  const toggle = () => setIsOpenMobile(!isOpenMobile);

  // uscita a scatti: avanza, si ferma, avanza...
  const nascosto = reduce ? { opacity: 0 } : { y: "105%" };
  const visibile = reduce
    ? { opacity: 1 }
    : { y: ["105%", "72%", "72%", "41%", "41%", "14%", "14%", "0%"] };
  const transizioneIn = reduce
    ? { duration: 0.2 }
    : {
        duration: 1.1,
        ease: "linear",
        times: [0, 0.18, 0.28, 0.46, 0.56, 0.74, 0.84, 1],
      };

  return (
    <>
      {/* STAMPANTE */}
      <div className="lg:hidden fixed bottom-24 left-4 right-4 z-50 pb-[env(safe-area-inset-bottom)]">
        {/* fessura da cui esce la carta */}
        <div
          ref={slotRef}
          aria-hidden="true"
          className="mx-2 h-3 rounded-t-xl border-x border-zinc-700 bg-zinc-950 shadow-[inset_0_-4px_5px_rgba(0,0,0,0.95)]"
        />

        {/* corpo */}
        <div className="flex items-center gap-3 rounded-b-3xl rounded-t-lg border border-zinc-700 bg-linear-to-b from-zinc-700 to-zinc-800 p-3 shadow-2xl">
          {/* display LCD */}
          <button
            type="button"
            onClick={toggle}
            aria-label="Apri o chiudi lo scontrino"
            className="flex min-w-0 grow cursor-pointer items-center justify-between gap-3 rounded-xl border border-black/60 bg-[#0d1a11] px-3 py-2 text-left shadow-[inset_0_2px_6px_rgba(0,0,0,0.8)]"
          >
            <span className="flex flex-col">
              <span className="font-courier text-[9px] uppercase tracking-[0.2em] text-green-400/60">
                totale
              </span>
              <span className="font-courier text-xl font-black leading-none tracking-wider text-green-400 [text-shadow:0_0_8px_rgba(74,222,128,0.55)]">
                {totaleLCD} €
              </span>
            </span>
            <span className="shrink-0 font-courier text-[10px] uppercase tracking-widest text-green-400/70">
              {preventivo.sommaProdotti < 100
                ? preventivo.sommaProdotti
                : "99+"}{" "}
              art.
            </span>
          </button>

          {/* LED di stato */}
          <span
            aria-hidden="true"
            className={`size-2.5 shrink-0 rounded-full ${
              isOpenMobile
                ? "animate-pulse bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)]"
                : "bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.8)]"
            }`}
          />
          {/* tasto feed */}
          <button
            type="button"
            onClick={toggle}
            className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-2xl border border-zinc-600 bg-zinc-900 px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_3px_0_#09090b] transition-all active:translate-y-0.5 active:shadow-none"
          >
            <Printer size={15} />
            <span>{isOpenMobile ? "Chiudi" : "Stampa"}</span>
            <ChevronUp
              size={14}
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
            style={{ bottom: sopraSlot - 6 }}
            className="pointer-events-none fixed inset-x-0 top-20 z-49 flex flex-col justify-end overflow-hidden lg:hidden"
          >
            <motion.div
              initial={nascosto}
              animate={visibile}
              exit={nascosto}
              transition={transizioneIn}
              className="pointer-events-auto mx-8 flex max-h-full min-h-0 flex-col gap-4 pt-2 pb-3"
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
