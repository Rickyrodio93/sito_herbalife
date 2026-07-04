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
              <button
                type="button"
                onClick={() => setIsAbbonato(!isAbbonato)}
                className={`inline-flex w-fit items-center gap-2 pl-1 pr-3 py-1 rounded-full border transition-colors cursor-pointer ${
                  isAbbonato
                    ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-300 dark:border-emerald-500/30"
                    : "bg-white/50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                }`}
              >
                <span
                  className={`relative inline-flex h-4 w-7 shrink-0 items-center rounded-full transition-colors ${
                    isAbbonato ? "bg-emerald-500" : "bg-zinc-300 dark:bg-zinc-700"
                  }`}
                >
                  <span
                    className={`inline-block h-3 w-3 transform rounded-full bg-white shadow transition-transform ${
                      isAbbonato ? "translate-x-3.5" : "translate-x-0.5"
                    }`}
                  />
                </span>
                <span
                  className={`text-[11px] font-medium tracking-tight ${
                    isAbbonato
                      ? "text-emerald-700 dark:text-emerald-400"
                      : "text-zinc-700 dark:text-zinc-300"
                  }`}
                >
                  Sono già un utente abbonato Bioniq
                </span>
              </button>
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
