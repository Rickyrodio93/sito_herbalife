import { X } from "lucide-react";

export default function PreventivoLista({ prodotti, onRimuoviProdotto }) {
  return (
    <>
      <ul className="mb-4 space-y-2 border-b border-dashed border-gray-400 lg:text-left">
        {prodotti.map((p) => (
          <li
            key={p.id}
            className="lg:mb-5 lg:font-courier flex justify-between items-center border-b border-none pb-2"
          >
            <p>
              <strong>{p.id}</strong> - {p.nome} -{" "}
              <strong>x{p.quantita}</strong>
            </p>
            <button
              onClick={() => onRimuoviProdotto && onRimuoviProdotto(p.id)}
              className="flex justify-center items-center font-semibold lg:border-gray-300 lg:border-2 rounded-md aspect-square h-6 cursor-pointer text-red-600 lg:text-black lg:dark:text-white"
            >
              <X size={14} />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
