import Image from "next/image";

export default function CardProdotti({
  id,
  titolo,
  descrizione,
  nuovoProdotto,
  prezzo,
  OpenModal,
}) {
  return (
    <>
      <div className="group relative w-full h-full bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm flex flex-col justify-between overflow-hidden rounded-2xl pb-4 transition-all duration-300 hover:shadow-md">
        {/* contenitore immagine */}
        <div className="relative w-full h-52 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-800/20 p-4 overflow-hidden">
          <div className="relative w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
            <Image
              src={`/immagini/prodotti/${id}.webp`}
              alt={titolo}
              fill
              className="object-contain p-2"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
            />
          </div>

          {/* badge */}
          <div className="absolute top-3 left-3 right-3 flex justify-between items-center pointer-events-none">
            {/* prezzo */}
            <div className="text-herbalife-2 bg-herbalife-1 dark:bg-herbalife-3 text-xs lg:text-sm font-bold py-1 px-2.5 rounded-lg shadow-sm pointer-events-auto backdrop-blur-sm bg-opacity-95">
              {typeof prezzo === "number" ? `${prezzo.toFixed(2)} €` : "0.00 €"}
            </div>
            {/* nuovo prodotto */}
            {nuovoProdotto && (
              <div className="bg-red-500 text-xs lg:text-sm text-white font-bold py-1 px-2.5 rounded-lg uppercase tracking-wider shadow-sm pointer-events-auto">
                nuovo
              </div>
            )}
          </div>
        </div>

        {/* titolo e info */}
        <div className="px-4 flex flex-col justify-between grow pt-3">
          <h4 className="text-zinc-900 dark:text-zinc-100 group-hover:text-herbalife-4 dark:group-hover:text-herbalife-1 font-bold text-base line-clamp-2 min-h-12 flex items-center justify-center capitalize mb-3 transition-colors duration-300">
            {titolo}
          </h4>
          <div className="w-full flex items-center justify-center">
            <button
              type="button"
              className="w-full cursor-pointer bg-zinc-950 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-950 font-semibold px-4 py-2.5 rounded-xl transition-all text-sm uppercase tracking-wider active:scale-[0.98]"
              onClick={() => OpenModal(id, titolo, descrizione)}
            >
              dettagli
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
