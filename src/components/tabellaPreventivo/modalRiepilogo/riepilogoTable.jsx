import { MdLocalShipping } from "react-icons/md";
import { getDettaglioRiga } from "../calcoloPreventivo";

function roundToTwo(num) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

export default function RiepilogoTable({
  prodotti,
  calcolaPrezzoFinito,
  isCliente,
  isAbbonato,
  ruolo,
  usoDistributore,
  livelloMarketing,
  preventivo,
}) {
  const haBioniqInOrdine = prodotti.some(
    (p) =>
      p.nome?.toLowerCase().includes("bioniq") ||
      p.id?.toString().toLowerCase().includes("628k"),
  );

  const mostraScontoBioniqCliente = isCliente && haBioniqInOrdine && isAbbonato;
  const mostraSpedizioneCliente = isCliente && !isAbbonato && haBioniqInOrdine;
  const mostraRigaSpedizione = !isCliente || mostraSpedizioneCliente;

  const modalThead = isCliente
    ? mostraScontoBioniqCliente
      ? ["id", "prodotto", "cad.", "q.tà", "sconto", "totale"]
      : ["id", "prodotto", "cad.", "q.tà", "totale"]
    : ["id", "prodotto", "cad.", "q.tà", "sconto", "tasse", "iva", "totale"];

  // Precalcolo dei dati di ogni riga prodotto
  const righe = prodotti.map((p) => {
    const q = Number(p.quantita) || 0;
    const ivaUnitaria = Number(p.Iva || p.iva || 0);
    const isBioniq =
      p.id?.toString().toLowerCase().includes("628k") ||
      p.nome?.toLowerCase().includes("bioniq");
    const isBioniqPrincipale = p.id?.toString().toLowerCase() === "628k";

    let cad = 0;
    let scontoRiga = 0;
    let tasseRiga = 0;
    let ivaRiga = 0;
    let spedizioneNetRiga = 0;
    let spedizioneIvaRiga = 0;
    let totaleRiga = 0;

    if (isCliente) {
      if (isBioniq) {
        cad = Number(p.PrezzoListino || p.prezzoListino) * (1 + ivaUnitaria);
        scontoRiga =
          mostraScontoBioniqCliente && isBioniqPrincipale
            ? roundToTwo(cad * 0.05 * q)
            : 0;
        spedizioneNetRiga =
          mostraSpedizioneCliente && isBioniqPrincipale ? 7.5 * q : 0;
        spedizioneIvaRiga = roundToTwo(spedizioneNetRiga * ivaUnitaria);
      } else {
        cad = Number(calcolaPrezzoFinito(p)) || 0;
      }
      totaleRiga = roundToTwo(cad * q - scontoRiga);
    } else {
      const d = getDettaglioRiga(p, {
        ruolo,
        usoDistributore,
        livelloMarketing,
        isAbbonato,
        puntiVolumeTotali: preventivo.puntiVolume,
        sommaProdottiTotali: preventivo.sommaProdotti,
      });

      cad = d.prezzoListino;
      scontoRiga = d.scontoRiga;
      tasseRiga = d.tasseRiga;
      ivaRiga = d.ivaRiga;
      spedizioneNetRiga = d.spedizioneRiga;
      spedizioneIvaRiga = d.ivaSpedizioneRiga;

      totaleRiga = roundToTwo(
        d.subtotaleRiga - d.scontoRiga + d.ivaRiga + d.tasseRiga,
      );
    }

    return {
      p,
      q,
      isBioniq,
      cad,
      scontoRiga,
      tasseRiga,
      ivaRiga,
      spedizioneNetRiga,
      spedizioneIvaRiga,
      totaleRiga,
    };
  });

  const spedizioneNetTotale = roundToTwo(
    righe.reduce((acc, r) => acc + r.spedizioneNetRiga, 0),
  );
  const spedizioneIvaTotale = roundToTwo(
    righe.reduce((acc, r) => acc + r.spedizioneIvaRiga, 0),
  );
  const spedizioneTotaleRiga = roundToTwo(spedizioneNetTotale + spedizioneIvaTotale);

  return (
    <div className="overflow-y-auto relative flex-[1_1_auto] p-5">
      <table className="w-full border-collapse">
        <thead className="text-zinc-400 dark:text-zinc-500 uppercase text-[11px] font-bold tracking-wider border-b border-zinc-100 dark:border-zinc-900">
          <tr className="text-center">
            {modalThead.map((nameCol, idx) => (
              <td
                key={nameCol}
                className={`pb-3 font-semibold ${
                  idx === 1
                    ? "text-left pl-2"
                    : idx === modalThead.length - 1
                      ? "text-right pr-4"
                      : "text-center"
                }`}
              >
                {nameCol}
              </td>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
          {righe.map(({ p, q, isBioniq, cad, scontoRiga, tasseRiga, ivaRiga, totaleRiga }) => (
            <tr
              key={p.id}
              className="text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors text-xs sm:text-sm"
            >
              <td className="text-center py-4 px-2 font-mono text-zinc-400 dark:text-zinc-500">
                {p.id}
              </td>
              <td className="text-left font-medium py-4 px-2 tracking-tight">
                <p className="line-clamp-2">{p.nome}</p>
                {isCliente && isBioniq && mostraScontoBioniqCliente && (
                  <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wide block mt-0.5">
                    Iscrizione / Abbonamento Attivo (-5%)
                  </span>
                )}
              </td>
              <td className="text-center py-4 px-2 font-mono">
                {cad.toFixed(2)}€
              </td>
              <td className="text-center py-4 px-2 font-medium text-zinc-500 dark:text-zinc-400">
                {q}
              </td>

              {(!isCliente || (isCliente && mostraScontoBioniqCliente)) && (
                <td className="text-center py-4 px-2 font-mono text-green-500 dark:text-green-400 font-semibold">
                  {scontoRiga > 0 ? `-${scontoRiga.toFixed(2)}€` : "-"}
                </td>
              )}

              {!isCliente && (
                <>
                  <td className="text-center py-4 px-2 font-medium text-zinc-500 dark:text-zinc-400">
                    {tasseRiga === 0 ? "-" : `${tasseRiga.toFixed(2)}€`}
                  </td>
                  <td className="text-center py-4 px-2 font-medium text-zinc-500 dark:text-zinc-400">
                    {ivaRiga.toFixed(2)}€
                  </td>
                </>
              )}

              <td className="text-right py-4 pr-4 font-semibold font-mono text-zinc-950 dark:text-zinc-50">
                {totaleRiga.toFixed(2)}€
              </td>
            </tr>
          ))}

          {/* RIGA SPEDIZIONE (mostrata come un prodotto in piu', usando le stesse colonne) */}
          {mostraRigaSpedizione && (
            <tr className="text-zinc-800 dark:text-zinc-200 text-xs sm:text-sm">
              <td className="text-center py-4 px-2 text-zinc-400 dark:text-zinc-500">
                <MdLocalShipping size={16} className="mx-auto" />
              </td>
              <td className="text-left font-medium py-4 px-2 tracking-tight">
                Spedizione
              </td>
              <td
                className={`text-center py-4 px-2 font-mono font-semibold ${
                  spedizioneNetTotale === 0 ? "text-green-600 dark:text-green-400" : "text-red-500"
                }`}
              >
                {spedizioneNetTotale === 0
                  ? "gratuita"
                  : `${(isCliente ? spedizioneTotaleRiga : spedizioneNetTotale).toFixed(2)}€`}
              </td>
              <td className="text-center py-4 px-2 text-zinc-500 dark:text-zinc-400">-</td>

              {(!isCliente || (isCliente && mostraScontoBioniqCliente)) && (
                <td className="text-center py-4 px-2 text-zinc-500 dark:text-zinc-400">-</td>
              )}

              {!isCliente && (
                <>
                  <td className="text-center py-4 px-2 text-zinc-500 dark:text-zinc-400">-</td>
                  <td className="text-center py-4 px-2 font-medium text-zinc-500 dark:text-zinc-400">
                    {spedizioneIvaTotale.toFixed(2)}€
                  </td>
                </>
              )}

              <td className="text-right py-4 pr-4 font-semibold font-mono text-zinc-950 dark:text-zinc-50">
                {spedizioneTotaleRiga.toFixed(2)}€
              </td>
            </tr>
          )}
        </tbody>
        <tfoot className="border-t border-t-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold text-sm sm:text-base">
          <tr>
            <td
              colSpan={2}
              className="pt-5 pb-2 uppercase tracking-wider font-bold text-xs text-zinc-400 pl-2"
            >
              totale riepilogo:
            </td>
            <td className="pt-5 pb-2"></td>
            <td className="pt-5 pb-2 text-center font-bold text-zinc-600">
              {preventivo.sommaProdotti || preventivo.quantitaTotale}
            </td>

            {(!isCliente || (isCliente && mostraScontoBioniqCliente)) && (
              <td className="text-center pt-5 pb-2 font-mono text-green-500 text-xs font-bold">
                {mostraScontoBioniqCliente
                  ? `-${righe.reduce((acc, r) => acc + r.scontoRiga, 0).toFixed(2)}€`
                  : preventivo.sconto > 0
                    ? `-${preventivo.sconto.toFixed(2)}€`
                    : "-"}
              </td>
            )}

            {!isCliente && (
              <>
                <td className="text-center pt-5 pb-2 font-mono text-zinc-500 text-xs">
                  {preventivo.tasse ? `${preventivo.tasse.toFixed(2)}€` : "-"}
                </td>
                <td className="text-center pt-5 pb-2 font-mono text-zinc-500 text-xs">
                  {preventivo.iva.toFixed(2)}€
                </td>
              </>
            )}

            <td className="text-right pt-5 pb-2 pr-4 font-black font-mono text-zinc-950 dark:text-zinc-50">
              {isCliente
                ? preventivo.venditaCliente.toFixed(2)
                : preventivo.totale.toFixed(2)}
              €
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}