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
      <div className=" rounded-2xl mx-2 pb-3 bg-white dark:bg-[#272727] border border-gray-400 dark:border-gray-600 shadow-prodotti">
        <div
          key={id}
          className="aspect-[7/9] lg:aspect-[3/4] rounded-t-2xl flex flex-col justify-center"
        >
          <div className="max-h-full flex items-center justify-center">
            <img
              src={`immagini/prodotti/${id}.webp`}
              className="h-full max-w-full p-4"
              alt={titolo}
            />

            <div className="absolute top-3 flex justify-between w-[calc(100%-2.5rem)]">
              {/* badge prezzo */}
              <div className="text-herbalife-2 bg-herbalife-1 dark:bg-herbalife-3 text-xs lg:text-base py-1 px-2 rounded-lg capitalize shadow-[1px_1px_3px_rgba(0,0,0,0.5)]">
                {`${prezzo.toFixed(2)} €`}
              </div>
              {/* badge nuovo prodotto */}
              {nuovoProdotto === true ? (
                <div className="bg-red-500 text-xs lg:text-base text-white py-1 px-2 rounded-lg capitalize shadow-[1px_1px_3px_rgba(0,0,0,0.5)]">
                  nuovo prodotto
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>

        <div className=" px-4 flex flex-col h-[150px] justify-between">
          <h4 className="text-herbalife-1 dark:text-green-600 font-bold text-base py-4 capitalize">
            {titolo}
          </h4>
          <div className="w-full flex items-center justify-center">
            <button
              type="button"
              className="cursor-pointer bg-black hover:bg-[#333333] dark:hover:bg-[#131313] text-white px-4 py-2 rounded-full mx-auto"
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
