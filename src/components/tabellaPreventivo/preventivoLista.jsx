import { AlertTriangle, CheckSquare, Square, Truck, X } from "lucide-react";
import Input from "../Inputs/Input";

export default function PreventivoLista({
  prodotti,
  onRimuoviProdotto,
  haBioniq,
  ruolo,
  usoDistributore,
  haOrdineMisto,
  isAbbonato,
  setIsAbbonato,
}) {
  return (
    <>
      {haBioniq && (
        <>
          <div className="mb-5 text-left p-3.5 rounded-xl border border-amber-500/20 bg-amber-500/5 dark:bg-amber-500/10 text-amber-950 dark:text-amber-200 normal-case shadow-inner">
            <div className="flex items-start gap-2 text-xs leading-relaxed">
              <AlertTriangle
                size={16}
                className="text-amber-500 shrink-0 mt-0.5"
              />
              <p>
                <strong className="font-bold">Si prega di notare:</strong>{" "}
                Bioniq è un integratore personalizzato che richiede una gestione
                dedicata, deve essere acquistato come ordine separato ed essendo
                personalizzato non è rimborsabile.
              </p>
            </div>

            {/* Se l'utente ha inserito sia prodotti classici che Bioniq, mostriamo il blocco tassativo */}
            {haOrdineMisto && (
              <div className="mt-2.5 text-[11px] font-black text-red-600 dark:text-red-400 border-t border-amber-500/10 pt-2 flex items-start gap-1">
                <span>
                  <X size={14} />
                </span>
                <span>
                  L&apos;ordine non può essere misto. Rimuovi i prodotti
                  classici o il prodotto Bioniq per procedere.
                </span>
              </div>
            )}

            {/* Vantaggio della spedizione gratuita */}
            <div className="mt-3 border-t border-amber-500/10 pt-2 flex flex-col gap-2">
              <label className="flex items-center gap-2 cursor-pointer select-none group">
                <input
                  type="checkbox"
                  checked={isAbbonato}
                  onChange={(e) => setIsAbbonato(e.target.checked)}
                  className="sr-only"
                />
                <div className="text-zinc-600 dark:text-zinc-400 group-hover:text-herbalife-4 dark:group-hover:text-herbalife-1 transition-colors">
                  {isAbbonato ? (
                    <CheckSquare
                      size={16}
                      className="text-emerald-600 dark:text-emerald-400"
                    />
                  ) : (
                    <Square size={16} />
                  )}
                </div>
                <span className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300">
                  Sono già un utente abbonato Bioniq
                </span>
              </label>
              <div className="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-bold border-t border-amber-500/10 pt-2">
                <Truck size={14} className="shrink-0" />
                <span>
                  {isAbbonato
                    ? "Spedizione Gratuita attivata per il tuo abbonamento"
                    : "Abbonati per attivare la spedizione gratuita!"}
                </span>
              </div>
            </div>
          </div>

          {ruolo === "DS" && usoDistributore !== "uso personale" && (
            <div className="mb-5 text-left p-3.5 rounded-xl border border-red-500/20 bg-red-500/5 dark:bg-red-500/10 text-red-950 dark:text-red-200 normal-case shadow-inner">
              <div className="flex items-start gap-2 text-xs leading-relaxed">
                <AlertTriangle
                  size={16}
                  className="text-red-500 shrink-0 mt-0.5"
                />
                <p>
                  Bioniq è acquistabile soltanto per uso personale. Si prega di
                  selezionare uso personale per procedere
                </p>
              </div>
            </div>
          )}
        </>
      )}
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
