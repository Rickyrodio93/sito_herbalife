"use client";
import { useEffect, useRef, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ModalProdotti from "./ModalProdotti";
import { ArrowLeft, ArrowRight } from "lucide-react";
import CardProdotti from "../../components/cards/cardProdotti";
import axios from "axios";
import Papa from "papaparse";

export default function ProdottiConsigliati({ pagina, title }) {
  const [modalOpen, setModalOpen] = useState(null); // stato per aprire il modal
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [prodotti, setProdotti] = useState([]);
  const carouselRef = useRef(null);

  const csvUrlConsigliati =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTCM_3vWzdtq9AefTo1Qh44lF4d1lpbrUMLVihG5SJJB1m0LfpaTf35K1FvLUG5jm_m5eyMpOqmViGJ/pub?gid=126954972&single=true&output=csv";

  useEffect(() => {
    axios.get(csvUrlConsigliati).then((res) => {
      Papa.parse(res.data, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          const prodottiFiltrati = result.data
            .filter((riga) => riga.Pagina === pagina)
            .map((prodotto) => ({
              id: prodotto.id,
              titolo: prodotto.prodotto,
              descrizione: prodotto.descrizione,
              nuovoProdotto:
                String(prodotto.nuovoProdotto).toUpperCase() === "TRUE",
              prezzoPubblico: parseFloat(
                prodotto.prezzoPubblico.replace(",", "."),
              ),
            }));

          setProdotti(prodottiFiltrati);
        },
      });
    });
  }, [pagina]);

  // apre il modal
  const OpenModal = (id, titolo, descrizione) => {
    setModalOpen(id);
    setSelectedProduct({ id, titolo, descrizione });
  };

  // chiude il modal
  const closeModal = () => {
    setModalOpen(null); // chiude il modal
    setTimeout(() => setSelectedProduct(null), 300);
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 40000, min: 1536 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1536, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 2,
      partialVisibilityGutter: 30,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
      partialVisibilityGutter: 40,
    },
  };

  // Funzioni di navigazione collegate ai pulsanti in alto a destra
  const handlePrev = () => {
    if (carouselRef.current) carouselRef.current.previous();
  };

  const handleNext = () => {
    if (carouselRef.current) carouselRef.current.next();
  };

  if (prodotti.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
      <div className="flex items-end justify-between mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-herbalife-4 dark:text-herbalife-1">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="p-2.5 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/60 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700/50 hover:text-herbalife-4 dark:hover:text-herbalife-1 transition-all active:scale-95 shadow-sm"
            aria-label="Prodotto precedente"
          >
            <ArrowLeft size={18} strokeWidth={2.5} />
          </button>
          <button
            onClick={handleNext}
            className="p-2.5 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/60 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700/50 hover:text-herbalife-4 dark:hover:text-herbalife-1 transition-all active:scale-95 shadow-sm"
            aria-label="Prodotto successivo"
          >
            <ArrowRight size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* struttura carosello */}
      <div className="relative">
        <Carousel
          ref={carouselRef}
          responsive={responsive}
          arrows={false}
          showDots={false}
          draggable={true}
          swipeable={true}
          infinite={true}
          partialVisible={true}
          keyBoardControl={true}
          itemClass="px-2 pb-4"
          className="overflow-visible"
        >
          {prodotti.map((prodotto) => (
            <div key={prodotto.id} className="h-full transition-all duration-300 hover:-translate-y-1">
              <CardProdotti
                id={prodotto.id}
                titolo={prodotto.titolo}
                descrizione={prodotto.descrizione}
                nuovoProdotto={prodotto.nuovoProdotto}
                prezzo={prodotto.prezzoPubblico}
                OpenModal={OpenModal}
              />
            </div>
          ))}
        </Carousel>
      </div>

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
