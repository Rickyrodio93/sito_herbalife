"use client";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ModalProdotti from "./ModalProdotti";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CardProdotti from "../../components/cards/cardProdotti";
import axios from "axios";
import Papa from "papaparse";

export default function ProdottiConsigliati({ pagina }) {
  const [modalOpen, setModalOpen] = useState(null); // stato per aprire il modal
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [prodotti, setProdotti] = useState([]);

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
      breakpoint: { max: 40000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 3,
    },
    laptop: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
      slidesToSlide: 3,
      partialVisibilityGutter: 30,
    },
    tablet: {
      breakpoint: { max: 768, min: 640 },
      items: 2,
      slidesToSlide: 2,
      partialVisibilityGutter: 30,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
      partialVisibilityGutter: 50,
    },
  };

  return (
    <>
      <Carousel
        responsive={responsive}
        showDots={true}
        partialVisible={true}
        centerMode={false}
        focusOnSelect={false}
        infinite={true}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        customLeftArrow={<CustomLeftArrow aria-hidden="false" />}
        customRightArrow={<CustomRightArrow aria-hidden="false" />}
        customDot={<CustomDot />}
        className="max-w-300 mx-5 lg:mx-auto mb-25 py-10 rounded-lg"
      >
        {prodotti.map((prodotto) => (
          <div key={prodotto.id} className="px-2 pb-4 h-full">
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
      {selectedProduct && (
        <ModalProdotti
          id={selectedProduct.id}
          titolo={selectedProduct.titolo}
          descrizione={selectedProduct.descrizione}
          open={modalOpen === selectedProduct.id}
          closeModal={closeModal}
        />
      )}
    </>
  );
}
// customizzazione delle frecce e dei punti di navigazione
// freccia sinistra
const CustomLeftArrow = ({ onClick }) => (
  <button
    type="button"
    aria-label="torna indietro"
    title="torna indietro"
    onClick={onClick}
    className="absolute left-2 z-10 p-2 bg-herbalife-1 hover:bg-herbalife-2 text-herbalife-2 hover:text-herbalife-1 hover:border rounded-full"
  >
    <ChevronLeft size={40} />
  </button>
);

//freccia destra
const CustomRightArrow = ({ onClick }) => (
  <button
    type="button"
    aria-label="avanti"
    title="avanti"
    onClick={onClick}
    className="absolute right-2 z-10 p-2 bg-herbalife-1 hover:bg-herbalife-2 text-herbalife-2 hover:text-herbalife-1 hover:border rounded-full"
  >
    <ChevronRight size={40} />
  </button>
);

// pallini di navigazione
const CustomDot = ({ onClick, active }) => {
  <button
    className={`w-3 h-3 mx-1 mb-1 rounded-full transition-all cursor-pointer border ${
      active ? "bg-herbalife-1 scale-125" : "bg-herbalife-2 "
    }`}
    onClick={() => onClick()}
  ></button>;
};
