"use client";

import { Minus, Plus, Trash } from "lucide-react";
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
  isCliente,
}) {
  const [isZoomOpen, setIsZoomOpen] = useState(false);

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
        initial={
          isCliente
            ? {
                opacity: 0,
                y: -20,
                scaleY: 0.8,
                transformOrigin: "top",
              }
            : false
        }
        animate={
          isCliente
            ? {
                opacity: 1,
                y: 0,
                scaleY: 1,
              }
            : false
        }
        exit={
          isCliente
            ? {
                opacity: 0,
                y: -20, // Rientra verso l'alto, scomparendo sotto la categoria
                scaleY: 0.8,
                transition: { duration: 0.15 }, // Uscita leggermente più rapida per dare un feeling scattante
              }
            : false
        }
        transition={{
          type: "spring",
          stiffness: 350,
          damping: 28,
        }}
        className="bg-white dark:bg-zinc-950 hover:bg-zinc-50/80 dark:hover:bg-zinc-900/40 transition-colors duration-150 border-b border-zinc-100 dark:border-zinc-900"
      >
        {/* id prodotto */}
        <td className="px-4 py-4 text-center font-mono text-xs text-zinc-400 dark:text-zinc-500">
          {prodotto.ID}
        </td>

        {/* nome prodotto */}
        <td className="p-4 flex items-center gap-6 capitalize">
          <div className="relative min-w-25 max-w-25 sm:max-w-36 sm:max-h-full aspect-3/4 sm:aspect-square flex justify-center">
            <Image
              src={`/immagini/prodotti/${prodotto.ID}.webp`}
              alt={prodotto.Prodotto}
              fill
              sizes="(max-w-640px) 100px, 144px"
              className="sm:m-auto object-contain cursor-zoom-in"
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

          <div className="w-full">
            <p className="text-zinc-900 dark:text-zinc-100 font-medium text-base mb-1 tracking-tight">
              {prodotto.Prodotto.toLowerCase()}
            </p>
            {ruolo !== "cliente" && (
              <div className="flex gap-4 text-zinc-400 dark:text-zinc-500 font-mono text-[11px]">
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
          </div>
        </td>

        {/* input quantità */}
        <td className="p-4">
          <div className="flex flex-col items-center gap-2">
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
                className="w-10 text-center bg-transparent text-sm font-bold focus:outline-none dark:text-wite [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <button
                type="button"
                onClick={incrementa}
                className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 rounded-md transition-colors cursor-pointer active:scale-90"
              >
                <Plus size={14} />
              </button>
            </div>

            <div className="flex gap-2 w-full max-w-30">
              <button
                onClick={handleAggiungi}
                className="flex-1 py-1 px-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-900 text-white text-[10px] font-bold uppercase tracking-wider rounded transition-colors cursor-pointer shadow-sm "
              >
                aggiungi
              </button>
              <button 
                onClick={handleRimuovi}
                className="p-1 text-zinc-400 hover:text-red-500 border border-zinc-200 dark:border-zinc-800 hover:border-red-200 dark:hover:border-red-900/50 rounded transition-colors cursor-pointer"
                >
                <Trash size={14} />
              </button>
            </div>
          </div>
        </td>

        {/* prezzo prodotto */}
        <td className="px-6 py-4 text-right font-semibold text-zinc-950 dark:text-zinc-50 font-mono text-base">
          <div>{`${(Number(prezzoUnitario) || 0).toFixed(2)}€`}</div>
        </td>
      </motion.tr>
    </>
  );
}
