import { ClipboardCheck } from "lucide-react";
import PreventivoDettaglio from "./preventivoDettaglio";
import PreventivoLista from "./preventivoLista";

export default function RiepilogoDesktop({
  prodotti,
  onRimuoviProdotto,
  ruolo,
  preventivo,
  livelloMarketing,
  usoDistributore,
  openModal,
}) {
  return (
    <>
      <div className="hidden lg:block w-full">
        <div className="text-black dark:text-white capitalize w-72">
          <div className="relative bg-white paper w-full h-min shadow-2xl p-6 my-5 mx-auto text-center dark:bg-zinc-800 dark:before:bg-zinc-800! dark:after:bg-zinc-800!">
            <h3 className="mt-0 text-xl pb-3 uppercase font-mono font-bold tracking-wide border-b border-zinc-300 dark:border-zinc-700/50 mb-4">
              la tua lista prodotti:
            </h3>

            <PreventivoLista
              prodotti={prodotti}
              onRimuoviProdotto={onRimuoviProdotto}
            />

            <h3 className="my-4 text-xl uppercase font-mono font-bold tracking-wide border-b border-zinc-300 dark:border-zinc-700/50 pb-2">
              dettagli prodotti:
            </h3>

            <PreventivoDettaglio
              ruolo={ruolo}
              preventivo={preventivo}
              livelloMarketing={livelloMarketing}
              usoDistributore={usoDistributore}
            />
            {/* pulsante riepilogo */}
            {prodotti.length > 0 && (
              <button
                onClick={openModal}
                className="mt-6 flex items-center justify-center gap-2 w-full py-3 px-4 text-white bg-herbalife-4 hover:bg-herbalife-1 rounded-xl transition-all duration-300 text-sm font-black uppercase tracking-wider shadow-md hover:shadow-lg active:scale-[0.98]"
              >
                <ClipboardCheck size={18} />{" "}
                {ruolo === "cliente" ? "conferma ordine" : "riepilogo ordine"}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
