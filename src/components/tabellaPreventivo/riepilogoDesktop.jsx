import { ClipboardCheck } from "lucide-react";
import PreventivoLista from "./preventivoLista";
import Scontrino from "./scontrino";

export default function RiepilogoDesktop({
  prodotti,
  onRimuoviProdotto,
  ruolo,
  preventivo,
  livelloMarketing,
  usoDistributore,
  openModal,
  haBioniq,
  haOrdineMisto,
  isAbbonato,
  setIsAbbonato,
}) {
  const bloccato =
    haOrdineMisto || (haBioniq && ruolo === "DS" && usoDistributore !== "uso personale");

  return (
    <div className="hidden lg:block w-full">
      <div className="mx-auto my-5 w-full max-w-sm">
        {haBioniq && (
          <div className="mb-6 rounded-2xl border border-line bg-card p-3">
            <PreventivoLista
              mostraLista={false}
              prodotti={prodotti}
              haBioniq={haBioniq}
              ruolo={ruolo}
              usoDistributore={usoDistributore}
              haOrdineMisto={haOrdineMisto}
              isAbbonato={isAbbonato}
              setIsAbbonato={setIsAbbonato}
            />
          </div>
        )}

        <Scontrino
          prodotti={prodotti}
          ruolo={ruolo}
          preventivo={preventivo}
          livelloMarketing={livelloMarketing}
          usoDistributore={usoDistributore}
          isAbbonato={isAbbonato}
          onRimuoviProdotto={onRimuoviProdotto}
          haOrdineMisto={haOrdineMisto}
          scrollClassName="max-h-[50dvh] overflow-y-auto"
          footer={
            prodotti.length > 0 && (
              <button
                onClick={openModal}
                disabled={bloccato}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-herbalife-4 px-4 py-3 text-sm font-black uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:bg-herbalife-1 hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ClipboardCheck size={18} />
                {ruolo === "cliente" ? "conferma ordine" : "riepilogo ordine"}
              </button>
            )
          }
        />
      </div>
    </div>
  );
}
