"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y } from "swiper/modules";
import "swiper/css";
import axios from "axios";
import Papa from "papaparse";
import { ArrowLeft, ArrowRight } from "lucide-react";
import CardProdotti from "../cards/cardProdotti";
import ModalProdotti from "./ModalProdotti";

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTCM_3vWzdtq9AefTo1Qh44lF4d1lpbrUMLVihG5SJJB1m0LfpaTf35K1FvLUG5jm_m5eyMpOqmViGJ/pub?gid=126954972&single=true&output=csv";

// una sola richiesta per pagina, anche con più carousel
let cache = null;
const caricaProdotti = () => {
  cache ??= axios
    .get(CSV_URL)
    .then(
      (res) =>
        Papa.parse(res.data, { header: true, skipEmptyLines: true }).data,
    )
    .catch((err) => {
      cache = null;
      throw err;
    });
  return cache;
};

const frecciaStyle =
  "p-2.5 rounded-xl bg-card border border-line text-zinc-700 dark:text-zinc-300 hover:text-herbalife-1 dark:hover:text-green-400 transition-all active:scale-95 shadow-sm cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-zinc-700 dark:disabled:hover:text-zinc-300";

export default function ProdottiConsigliati({ pagina, title }) {
  const [prodotti, setProdotti] = useState([]);
  const [modalOpen, setModalOpen] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [swiper, setSwiper] = useState(null);
  const [bordi, setBordi] = useState({ inizio: true, fine: false });

  useEffect(() => {
    let attivo = true;
    caricaProdotti()
      .then((righe) => {
        if (!attivo) return;
        setProdotti(
          righe
            .filter((riga) => riga.Pagina === pagina)
            .map((p) => {
              const prezzo = parseFloat(
                String(p.prezzoPubblico ?? "").replace(",", "."),
              );
              return {
                id: p.id,
                titolo: p.prodotto,
                descrizione: p.descrizione,
                nuovoProdotto: String(p.nuovoProdotto).toUpperCase() === "TRUE",
                prezzoPubblico: Number.isFinite(prezzo) ? prezzo : null,
              };
            }),
        );
      })
      .catch((err) =>
        console.error("Errore nel caricamento dei prodotti:", err),
      );
    return () => {
      attivo = false;
    };
  }, [pagina]);

  const aggiornaBordi = (s) =>
    setBordi({ inizio: s.isBeginning, fine: s.isEnd });

  const OpenModal = (id, titolo, descrizione) => {
    setModalOpen(id);
    setSelectedProduct({ id, titolo, descrizione });
  };

  const closeModal = () => {
    setModalOpen(null);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  if (prodotti.length === 0) return null;

  // se tutte le card entrano nello schermo, le frecce non servono
  const tuttoVisibile = bordi.inizio && bordi.fine;

  return (
    <div className="mx-auto max-w-6xl text-left not-first:mt-16">
      <div className="mb-6 flex items-end justify-between gap-4">
        <h2>{title}</h2>
        {!tuttoVisibile && (
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => swiper?.slidePrev()}
              disabled={bordi.inizio}
              className={frecciaStyle}
              aria-label="Prodotto precedente"
            >
              <ArrowLeft size={18} strokeWidth={2.5} />
            </button>
            <button
              type="button"
              onClick={() => swiper?.slideNext()}
              disabled={bordi.fine}
              className={frecciaStyle}
              aria-label="Prodotto successivo"
            >
              <ArrowRight size={18} strokeWidth={2.5} />
            </button>
          </div>
        )}
      </div>

      <Swiper
        modules={[A11y]}
        onSwiper={(s) => {
          setSwiper(s);
          aggiornaBordi(s);
        }}
        onSlideChange={aggiornaBordi}
        onResize={aggiornaBordi}
        onBreakpoint={aggiornaBordi}
        onUpdate={aggiornaBordi}
        slidesPerView={1.2}
        spaceBetween={16}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 24 },
        }}
        className="px-1! py-3!"
      >
        {prodotti.map((prodotto) => (
          <SwiperSlide key={prodotto.id} className="h-auto!">
            <div>
              <CardProdotti
              id={prodotto.id}
              titolo={prodotto.titolo}
              descrizione={prodotto.descrizione}
              nuovoProdotto={prodotto.nuovoProdotto}
              prezzo={prodotto.prezzoPubblico}
              OpenModal={OpenModal}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {selectedProduct && (
        <ModalProdotti 
        id={selectedProduct.id}
        titolo={selectedProduct.titolo}
        descrizione={selectedProduct.descrizione}
        open={modalOpen === selectedProduct.id}
        closeModal={closeModal}
        />
      )}
    </div>
  );
}
