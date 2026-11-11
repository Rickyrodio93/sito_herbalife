"use client";

import { memo, useState } from "react";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import ZoomImage from "../zoomImage/ZoomImage";
import calcoloPrezzo from "./calcoloPrezzo";
import { pushEvent } from "../utils/gtm";

const IMMAGINE_DEFAULT = "/immagini/prodotti/default.svg";
const MAX = 999;
const limita = (n) => Math.min(Math.max(n, 0), MAX);

function Contatore({ quantita, nome, onApplica }) {
  // la bozza vale solo finché la quantità nel preventivo non cambia
  const [bozza, setBozza] = useState(null); // { base, valore }

  const mostrato =
    bozza && bozza.base === quantita ? bozza.valore : String(quantita);
  const n = parseInt(mostrato, 10);
  const valido = !Number.isNaN(n);
  const corrente = valido ? n : quantita;
  const inAttesa = valido && n !== quantita;

  const scrivi = (valore) =>
    setBozza({ base: quantita, valore: String(valore) });
  const cambia = (delta) => scrivi(limita(corrente + delta));

  const applica = () => {
    if (!inAttesa) return;
    onApplica(limita(n));
    setBozza(null);
  };

  const tasto =
    "flex size-9 cursor-pointer items-center justify-center rounded-lg text-zinc-600 transition-colors hover:text-zinc-900 active:scale-90 disabled:cursor-not-allowed disabled:opacity-40 dark:text-zinc-300 dark:hover:text-white";

  return (
    <div className="flex w-fit flex-col items-stretch gap-1">
      <div className="flex items-center rounded-xl border border-line bg-raised p-0.5">
        <button
          type="button"
          onClick={() => cambia(-1)}
          disabled={corrente <= 0}
          aria-label={`Diminuisci la quantità di ${nome}`}
          className={tasto}
        >
          <Minus size={16} />
        </button>
        <input
          type="number"
          inputMode="numeric"
          min="0"
          max={MAX}
          value={mostrato}
          onChange={(e) => {
            const v = e.target.value;
            scrivi(v === "" ? "" : limita(parseInt(v, 10) || 0));
          }}
          onBlur={() => {
            // campo lasciato vuoto: torna alla quantità del preventivo
            if (!valido) setBozza(null);
          }}
          onKeyDown={(e) => e.key === "Enter" && applica()}
          aria-label={`Quantità di ${nome}`}
          className="w-10 bg-transparent text-center text-sm font-bold text-zinc-900 outline-none [appearance:textfield] dark:text-zinc-100 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <button
          type="button"
          onClick={() => cambia(1)}
          disabled={corrente >= MAX}
          aria-label={`Aumenta la quantità di ${nome}`}
          className={tasto}
        >
          <Plus size={16} />
        </button>
      </div>

      {/* fascia riservata: il pulsante compare senza spostare la riga */}
      <div className="h-8" aria-live="polite">
        {inAttesa && (
          <button
            type="button"
            onClick={applica}
            className={`h-8 w-full cursor-pointer rounded-lg px-2 text-[11px] font-black uppercase tracking-wider text-white transition-all active:scale-[0.97] ${
              n === 0
                ? "bg-red-600 hover:bg-red-700"
                : "bg-herbalife-1 hover:opacity-90 dark:bg-green-700"
            }`}
          >
            {n === 0 ? "rimuovi" : "aggiorna"}
          </button>
        )}
      </div>
    </div>
  );
}

function Riga({
  prodotto,
  quantita,
  onSet,
  ruolo,
  usoDistributore,
  livelloMarketing,
  isAbbonato,
  setIsAbbonato,
}) {
  const [zoom, setZoom] = useState(false);
  const [immagineMancante, setImmagineMancante] = useState(false);

  const src = immagineMancante
    ? IMMAGINE_DEFAULT
    : `/immagini/prodotti/${prodotto.ID}.webp`;
  const isBioniqPrincipale = prodotto.ID === "628K";
  const inCarrello = quantita > 0;

  const prezzo = calcoloPrezzo(
    ruolo,
    prodotto,
    usoDistributore,
    livelloMarketing,
    isAbbonato,
  );

  const imposta = (n) => {
    onSet(prodotto, n);
    pushEvent({
      event:
        n === 0
          ? "product_remove"
          : quantita === 0
            ? "product_add"
            : "product_quantity_change",
      product_id: prodotto.ID,
      product_name: prodotto.Prodotto,
      quantity: n,
      price: prezzo,
      role: ruolo,
      page: window.location.pathname,
    });
  };

  return (
    <li
      className={`flex flex-col gap-3 rounded-2xl border p-3 transition-colors @md:flex-row @md:items-center @md:gap-4 ${
        inCarrello
          ? "border-herbalife-1 bg-herbalife-2/30 dark:border-green-500 dark:bg-green-500/10"
          : "border-line bg-card hover:bg-raised"
      }`}
    >
      <div className="flex min-w-0 grow items-center gap-3">
        <button
          type="button"
          onClick={() => setZoom(true)}
          aria-label={`Ingrandisci l'immagine di ${prodotto.Prodotto}`}
          className="relative size-16 shrink-0 cursor-zoom-in overflow-hidden rounded-xl bg-raised @md:size-20"
        >
          <Image
            src={src}
            alt=""
            fill
            sizes="80px"
            className="object-contain p-1"
            onError={() => setImmagineMancante(true)}
          />
        </button>
        <AnimatePresence>
          {zoom && <ZoomImage src={src} onClose={() => setZoom(false)} />}
        </AnimatePresence>

        <div className="min-w-0">
          <p className="text-sm font-semibold leading-tight capitalize text-zinc-900 sm:text-base dark:text-zinc-100">
            {prodotto.Prodotto.toLowerCase()}
            {inCarrello && <span className="sr-only"> (nel preventivo)</span>}
          </p>
          <p className="mt-1 flex flex-wrap gap-x-3 font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
            <span>ID {prodotto.ID}</span>
            {ruolo !== "cliente" && (
              <>
                <span>Listino {(prodotto.PrezzoListino || 0).toFixed(2)}€</span>
                <span>PV {(prodotto.PuntiVolume || 0).toFixed(2)}</span>
              </>
            )}
          </p>

          {isBioniqPrincipale && (
            <button
              type="button"
              onClick={() => setIsAbbonato(!isAbbonato)}
              aria-pressed={isAbbonato}
              className={`mt-2 inline-flex cursor-pointer items-center gap-2 rounded-full border py-1 pl-1 pr-3 transition-colors ${
                isAbbonato
                  ? "border-emerald-300 bg-emerald-50 dark:border-emerald-500/30 dark:bg-emerald-500/10"
                  : "border-line bg-raised hover:border-zinc-400"
              }`}
            >
              <span
                className={`relative inline-flex h-4 w-7 shrink-0 items-center rounded-full transition-colors ${
                  isAbbonato ? "bg-emerald-500" : "bg-zinc-300 dark:bg-zinc-600"
                }`}
              >
                <span
                  className={`inline-block size-3 rounded-full bg-white shadow transition-transform ${
                    isAbbonato ? "translate-x-3.5" : "translate-x-0.5"
                  }`}
                />
              </span>
              <span
                className={`text-left text-[11px] font-semibold tracking-tight ${
                  isAbbonato
                    ? "text-emerald-700 dark:text-emerald-400"
                    : "text-zinc-600 dark:text-zinc-300"
                }`}
              >
                {isAbbonato
                  ? `Abbonato · consegna gratuita${ruolo === "cliente" ? " · sconto -5%" : ""}`
                  : "Attiva abbonamento"}
              </span>
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 @md:justify-end">
        <span className="font-mono text-lg font-bold text-herbalife-1 dark:text-green-400">
          {(Number(prezzo) || 0).toFixed(2)}€
        </span>
        {inCarrello ? (
          <Contatore
            quantita={quantita}
            nome={prodotto.Prodotto}
            onApplica={imposta}
          />
        ) : (
          <button
            type="button"
            onClick={() => imposta(1)}
            className="h-10 cursor-pointer rounded-xl bg-zinc-950 px-5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-zinc-800 active:scale-[0.97] dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white"
          >
            aggiungi
          </button>
        )}
      </div>
    </li>
  );
}

// con memo si aggiorna solo la riga toccata, non l'intera lista
export default memo(Riga);
