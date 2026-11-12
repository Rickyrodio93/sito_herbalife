import { ClipboardCheck } from "lucide-react";
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
    <div className="hidden pane:block lg:block w-full" scrollClassName="max-h-[max(8rem,calc(100dvh_-_40rem))] lg:max-h-[max(8rem,calc(100dvh_-_34rem))] overflow-y-auto">
      <div className="mx-auto my-5 w-full max-w-sm">
        

        <Scontrino
          prodotti={prodotti}
          ruolo={ruolo}
          preventivo={preventivo}
          livelloMarketing={livelloMarketing}
          usoDistributore={usoDistributore}
          isAbbonato={isAbbonato}
          onRimuoviProdotto={onRimuoviProdotto}
          haOrdineMisto={haOrdineMisto}
          haBioniq={haBioniq}
          setIsAbbonato={setIsAbbonato}
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
