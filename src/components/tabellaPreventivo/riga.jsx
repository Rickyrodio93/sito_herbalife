"use client"

import { Minus, Plus, Trash } from "lucide-react";
import { useState } from "react";
import ZoomImage from "../zoomImage/ZoomImage";
import { AnimatePresence } from "framer-motion";
import calcoloPrezzo from "./calcoloPrezzo";
import { pushEvent } from "../utils/gtm";
import Image from "next/image";

export default function Riga({
  prodotto,
  quantita,
  onInputChange,
  ruolo,
  usoDistributore,
  livelloMarketing,
  onAggiungi,
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
      <tr className="bg-white odd:bg-odd dark:bg-p dark:odd:bg-[#2e2e2e] dark:text-white">
        {/* id prodotto */}
        <td className="px-4 py-2 font-semibold text-center">{prodotto.ID}</td>

        {/* nome prodotto */}
        <td className="p-4 flex flex-col sm:flex-row justify-start items-center gap-6 sm:gap-12 capitalize h-full">
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
            <p className="line-clamp-2 sm:line-clamp-2 truncate text-balance text-left text-ellipsis mb-4">
              {prodotto.Prodotto}
            </p>
            {ruolo !== "cliente" && (
              <div className="text-gray-400 text-sm flex flex-col w-full">
                <p className="mb-2">
                  prezzo di listino: {(prodotto.PrezzoListino || 0).toFixed(2)}{" "}
                  €
                </p>
                <p className="mb-2">
                  punti volume: {(prodotto.PuntiVolume || 0).toFixed(2)}
                </p>
              </div>
            )}
          </div>
        </td>

        {/* input quantità */}
        <td className="p-4 capitalize">
          <div className="flex flex-col items-center justify-between">
            {/* INPUT CO TASTI - E + */}
            <div className="flex items-center">
              <button
                type="button"
                onClick={decrementa}
                className="w-10 h-10 flex items-center cursor-pointer justify-center border-2 border-herbalife-1 dark:border-herbalife-2 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 active:scale-95 transition-all duration-[0] rounded-l-md"
              >
                <Minus size={18} />
              </button>
              <input
                type="number"
                min="0"
                value={quantita}
                onChange={handleInput}
                className="w-10 h-10 text-center border-y-2 border-herbalife-1 dark:border-herbalife-2 bg-white dark:bg-gray-800 dark:text-white font-bold focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <button
                type="button"
                onClick={incrementa}
                className="w-10 h-10 flex items-center cursor-pointer justify-center border-2 border-herbalife-1 dark:border-herbalife-2 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 active:scale-95 transition-all duration-[0] rounded-r-md"
              >
                <Plus size={18} />
              </button>
            </div>
            {/* BOTTONI AZIONE AGGIUNGI E CANCELLA */}
            <div className="flex flex-col w-full mt-3 gap-2">
              <button
                type="button"
                onClick={handleAggiungi}
                className="flex items-center justify-center gap-2 w-full py-2 px-3  bg-herbalife-1 hover:bg-green-700 text-white text-xs font-bold uppercase tracking-wider rounded-md transition-colors cursor-pointer shadow-sm"
              >
                <Plus size={16} strokeWidth={2} /> Aggiungi
              </button>
              <button
                type="button"
                onClick={handleRimuovi}
                className="flex items-center justify-center gap-2 w-full py-2 px-3 border-2 border-red-500 text-red-500 hover:bg-red-100 dark:bg-red-900/20 text-xs font-bold uppercase tracking-wider rounded-md transition-colors cursor-pointer"
              >
                <Trash size={16} strokeWidth={2} /> Rimuovi
              </button>
            </div>
          </div>
        </td>

        {/* prezzo prodotto */}
        <td className="px-4 py-2 capitalize text-center font-semibold">
          <div>{`${(Number(prezzoUnitario) || 0).toFixed(2)} €`}</div>
        </td>
      </tr>
    </>
  );
}
