"use client";

import { CheckSquare, Minus, Plus, Square, Trash } from "lucide-react";
import { useState } from "react";
import ZoomImage from "../zoomImage/ZoomImage";
import { AnimatePresence } from "framer-motion";
import calcoloPrezzo from "./calcoloPrezzo";
import { pushEvent } from "../utils/gtm";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Riga({
  prodotto,
  quantita,
  onInputChange,
  ruolo,
  usoDistributore,
  livelloMarketing,
  onAggiungi,
  isAbbonato,
  setIsAbbonato,
  ...props
}) {
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const isBioniqPrincipale = prodotto?.ID === "628K";

  // funzioni per gestire l'input quantità con i pulsanti + e -
  const incrementa = () => onInputChange(prodotto.ID, quantita + 1);
  const decrementa = () => {
    if (quantita > 0) onInputChange(prodotto.ID, quantita - 1);
  };

  // funzione per gestire l'inserimento manuale da tastiera
  const handleInput = (e) => {
    const newQuantity = parseInt(e.target.value, 10) || 0;
    onInputChange(prodotto.ID, newQuantity);

    pushEvent({
      event: "product_quantity_change",
      product_id: prodotto.ID,
      quantity: newQuantity,
      page: window.location.pathname,
    });
  };

  // calcolo il prezzo (calcoloPrezzo ora restituisce un numero)
  const prezzoUnitario = calcoloPrezzo(
    ruolo,
    prodotto,
    usoDistributore,
    livelloMarketing,
    isAbbonato,
  );

  // quando premi aggiungi, chiedo al parent di aggiungere/sostituire/rimuovere
  const handleAggiungi = () => {
    // Chiamiamo sempre onAggiungi (anche con qta = 0): il parent decide se rimuovere
    onAggiungi(prodotto, quantita, prezzoUnitario);

    // per il monitoraggio
    pushEvent({
      event: "product_add",
      product_id: prodotto.ID,
      product_name: prodotto.Prodotto,
      quantity: quantita,
      price: prezzoUnitario,
      role: ruolo,
      page: window.location.pathname,
    });
  };

  // alternativa: rimuovi direttamente con il tasto Trash
  const handleRimuovi = () => {
    onAggiungi(prodotto, 0, prezzoUnitario);

    // per il monitoraggio
    pushEvent({
      event: "product_remove",
      product_id: prodotto.ID,
      product_name: prodotto.Prodotto,
      role: ruolo,
      page: window.location.pathname,
    });
  };

  return (
    <>
      <motion.tr
        initial={{
          opacity: 0,
          y: -20,
          scaleY: 0.8,
          transformOrigin: "top",
        }}
        animate={{
          opacity: 1,
          y: 0,
          scaleY: 1,
        }}
        exit={{
          opacity: 0,
          y: -20, // Rientra verso l'alto, scomparendo sotto la categoria
          scaleY: 0.8,
          transition: { duration: 0.15 }, // Uscita leggermente più rapida per dare un feeling scattante
        }}
        transition={{
          type: "spring",
          stiffness: 350,
          damping: 28,
        }}
        className="bg-white dark:bg-zinc-950 hover:bg-zinc-50/80 dark:hover:bg-zinc-900/40 transition-colors duration-150 border-b border-zinc-100 dark:border-zinc-900 flex flex-col p-4 gap-3 lg:table-row lg:p-0 lg:gap-0 relative"
      >
        {/* 🌟 1. ID PRODOTTO: Diventa un'etichetta fluttuante nell'angolo su mobile */}
        <td className="text-left font-mono text-[10px] text-zinc-400 dark:text-zinc-500 lg:table-cell lg:px-4 lg:py-4 lg:text-center lg:text-xs flex justify-between">
          <span className="lg:hidden bg-zinc-100 dark:bg-zinc-900 px-2 py-0.5 rounded font-bold mr-1">
            ID: {prodotto.ID}
          </span>

          <span className="hidden lg:inline">{prodotto.ID}</span>
        </td>

        {/* 🌟 2. CORPO PRODOTTO (IMMAGINE + NOME) */}
        <td className="p-0 block lg:table-cell lg:p-4 lg:align-middle capitalize">
          <div className="flex items-center gap-4 lg:gap-6">
            {/* Box Immagine bilanciato per mobile */}
            <div className="relative min-w-20 max-w-20 sm:min-w-24 sm:max-w-24 aspect-square flex justify-center bg-zinc-50 dark:bg-zinc-900/30 rounded-lg p-1">
              <Image
                src={`/immagini/prodotti/${prodotto.ID}.webp`}
                alt={prodotto.Prodotto}
                fill
                sizes="(max-w-640px) 80px, 144px"
                className="m-auto object-contain cursor-zoom-in"
                onClick={(e) => {
                  e.preventDefault();
                  setIsZoomOpen(true);
                }}
              />
              <AnimatePresence>
                {isZoomOpen && (
                  <ZoomImage
                    src={`/immagini/prodotti/${prodotto.ID}.webp`}
                    onClose={() => setIsZoomOpen(false)}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Info Testuali */}
            <div className="w-full">
              <p className="text-zinc-900 dark:text-zinc-100 font-semibold text-sm sm:text-base mb-1 tracking-tight leading-tight">
                {prodotto.Prodotto.toLowerCase()}
              </p>
              {ruolo !== "cliente" && (
                <div className="flex gap-3 text-zinc-400 dark:text-zinc-500 font-mono text-[10px] sm:text-[11px]">
                  <span>
                    Listino:{" "}
                    <strong className="text-zinc-600 dark:text-zinc-400">
                      {(prodotto.PrezzoListino || 0).toFixed(2)}€
                    </strong>
                  </span>
                  <span>
                    PV:{" "}
                    <strong className="text-zinc-600 dark:text-zinc-400">
                      {(prodotto.PuntiVolume || 0).toFixed(2)}
                    </strong>
                  </span>
                </div>
              )}

              {/* switch abbonamento */}
              {isBioniqPrincipale && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsAbbonato(!isAbbonato);
                  }}
                  className={`mt-2 inline-flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border transition-colors cursor-pointer ${isAbbonato ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-300 dark:border-emerald-500/30" : "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"}`}
                >
                  <span
                    className={`relative inline-flex h-4 w-7 shrink-0 items-center rounded-full transition-colors ${isAbbonato ? "bg-emerald-500" : "bg-zinc-300 dark:bg-zinc-700"}`}
                  >
                    <span
                      className={`inline-block h-3 w-3 transform rounded-full bg-white shadow transition-transform ${
                        isAbbonato ? "translate-x-3.5" : "translate-x-0.5"
                      }`}
                    />
                  </span>
                  <span
                    className={`text-[10px] sm:text-[11px] font-semibold tracking-tight text-left ${
                      isAbbonato
                        ? "text-emerald-700 dark:text-emerald-400"
                        : "text-zinc-600 dark:text-zinc-400"
                    }`}
                  >
                    {isAbbonato
                      ? `Abbonato · consegna gratuita${ruolo !== "cliente" ? "" : " · sconto -5%"}`
                      : "Attiva abbonamento"}
                  </span>
                </button>
              )}
            </div>
          </div>
        </td>

        {/* 🌟 SEZIONE COMFORT: Prezzo e Controlli uniti su Mobile */}
        <div className="flex flex-row-reverse items-center justify-between mt-2 pt-2 border-t border-dashed border-zinc-100 dark:border-zinc-900 lg:contents">
          {/* 🌟 3. CONTROLLI QUANTITÀ (Viene prima nel codice -> Perfetto per Desktop. Su Mobile va a destra grazie a flex-row-reverse) */}
          <td className="p-0 block lg:table-cell lg:p-4">
            <div className="flex items-center gap-2 justify-end flex-col lg:items-center">
              {/* Selettore +/- */}
              <div className="flex items-center bg-zinc-100 dark:bg-zinc-900 p-0.5 rounded-lg border border-zinc-200/50 dark:border-zinc-800 dark:text-white">
                <button
                  type="button"
                  onClick={decrementa}
                  className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 rounded-md transition-colors cursor-pointer active:scale-90"
                >
                  <Minus size={14} />
                </button>
                <input
                  type="number"
                  min="0"
                  value={quantita}
                  onChange={handleInput}
                  className="w-8 text-center bg-transparent text-sm font-bold focus:outline-none dark:text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <button
                  type="button"
                  onClick={incrementa}
                  className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 rounded-md transition-colors cursor-pointer active:scale-90"
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* Pulsanti Azione (Aggiungi / Cestino) */}
              <div className="flex gap-1.5 items-center">
                <button
                  onClick={handleAggiungi}
                  className="py-2 px-3 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-900 text-white text-[10px] font-bold uppercase tracking-wider rounded transition-colors cursor-pointer shadow-sm h-9 flex items-center justify-center"
                >
                  aggiungi
                </button>
                <button
                  onClick={handleRimuovi}
                  className="p-2 text-zinc-400 hover:text-red-500 border border-zinc-200 dark:border-zinc-800 hover:border-red-200 dark:hover:border-red-900/50 rounded transition-colors cursor-pointer h-9 w-9 flex items-center justify-center"
                >
                  <Trash size={14} />
                </button>
              </div>
            </div>
          </td>

          {/* 🌟 4. PREZZO FINALE (Viene dopo nel codice -> Fine della riga su Desktop. Su Mobile va a sinistra) */}
          <td className="p-0 text-left lg:table-cell lg:px-6 lg:py-4 lg:text-right font-semibold text-zinc-950 dark:text-zinc-50 font-mono text-base">
            <span className="text-xs text-zinc-400 block lg:hidden font-sans font-normal mb-0.5">
              Prezzo calcolato:
            </span>
            <div className="text-lg lg:text-base text-herbalife-1 lg:text-zinc-950 lg:dark:text-zinc-50 font-bold">
              {`${(Number(prezzoUnitario) || 0).toFixed(2)}€`}
            </div>
          </td>
        </div>
      </motion.tr>
    </>
  );
}
