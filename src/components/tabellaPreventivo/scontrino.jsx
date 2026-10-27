"use client";

import { X } from "lucide-react";
import { getDettaglioRiga } from "./calcoloPreventivo";

const euro = (n) => (Number(n) || 0).toFixed(2).replace(".", ",");
const ETICHETTE_RUOLO = {
  cliente: "cliente",
  CP: "cliente privilegiato",
  DS: "distributore",
};

const BARRE = [2, 1, 3, 1, 2, 1, 1, 3, 1, 2, 3, 1, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 1, 3, 1, 2];

function Voce({ etichetta, valore, className = "" }) {
  return (
    <div className={`flex items-baseline gap-1 text-xs ${className}`}>
      <span className="shrink-0">{etichetta}</span>
      <span className="grow border-b border-dotted border-ink/40" />
      <span className="shrink-0 font-bold">{valore}</span>
    </div>
  );
}

const Taglio = () => (
  <div className="my-3 border-t border-dashed border-ink/40" />
);

export default function Scontrino({
  prodotti,
  ruolo,
  preventivo,
  livelloMarketing,
  usoDistributore,
  isAbbonato,
  onRimuoviProdotto,
  haOrdineMisto,
  footer,
  className = "",
  scrollClassName = "",
}) {
  const isCliente = ruolo === "cliente";
  const ctx = {
    ruolo,
    usoDistributore,
    livelloMarketing,
    isAbbonato,
    puntiVolumeTotali: preventivo.puntiVolume,
    sommaProdottiTotali: preventivo.sommaProdotti,
  };

  const righe = prodotti.map((p) => {
    const d = getDettaglioRiga(p, ctx);
    const importo = isCliente ? d.venditaClienteRiga : d.subtotaleRiga;
    return { p, q: d.q, importo, unitario: d.q ? importo / d.q : 0 };
  });

  const pctSconto = usoDistributore?.startsWith("abituale")
    ? 50
    : Number(livelloMarketing) || 0;
  const totale = isCliente ? preventivo.venditaCliente : preventivo.totale;
  const mostraGuadagno = ruolo === "DS" && usoDistributore !== "uso personale";

  return (
    <div
      className={`paper-before paper-after relative flex flex-col bg-paper text-ink font-courier uppercase shadow-2xl ${className}`}
    >
      <div className={`px-5 pt-6 pb-2 ${scrollClassName}`}>
        {/* intestazione */}
        <div className="text-center">
          <p className="text-base font-black tracking-[0.25em]">
            Riccardo Rodio
          </p>
          <p className="text-[10px] tracking-widest text-ink-soft">
            Distributore Indipendente
          </p>
          <div className="mt-2 flex justify-between text-[10px] text-ink-soft">
            <span>{new Date().toLocaleDateString("it-IT")}</span>
            <span>{ETICHETTE_RUOLO[ruolo] || ""}</span>
          </div>
        </div>

        <Taglio />

        {/* rige */}
        {righe.length === 0 ? (
          <p className="py-6 text-center text-xs text-ink-soft">
            nessun prodotto, aggiungine dalla lista
          </p>
        ) : (
          <ul className="flex flex-col gap-3">
            {righe.map(({ p, q, importo, unitario }) => (
              <li key={p.id}>
                <div className="flex items-start justify-between gap-2 text-xs">
                  <span className="min-w-0 wrap-break-word">
                    <span className="text-ink-soft">{p.id}</span> {p.nome}
                  </span>
                  <button
                    type="button"
                    onClick={() => onRimuoviProdotto?.(p.id)}
                    aria-label={`Rimuovi ${p.nome}`}
                    className="flex size-7 lg:size-5 shrink-0 cursor-pointer items-center justify-center rounded border border-ink/30 text-ink-soft transition-colors hover:border-red-700 hover:text-red-700"
                  >
                    <X size={12} />
                  </button>
                </div>
                <Voce
                  etichetta={`${q} x ${euro(unitario)}`}
                  valore={euro(importo)}
                  className="mt-0.5"
                />
              </li>
            ))}
          </ul>
        )}

        <Taglio />

        {haOrdineMisto ? (
          <p className="py-2 text-center text-xs text-red-700">
            ordine misto: dettagli non disponibili
          </p>
        ) : (
          <>
            <div className="flex flex-col gap-1">
              {isCliente ? (
                <>
                  <Voce
                    etichetta="di cui Iva"
                    valore={`${euro(preventivo.iva)} €`}
                  />
                  <p className="text-[10px] text-ink-soft">
                    spese accessorie incluse
                  </p>
                </>
              ) : (
                <>
                  <Voce
                    etichetta="subtotale"
                    valore={`${euro(preventivo.subtotale)} €`}
                  />
                  <Voce
                    etichetta={pctSconto ? `sconto -${pctSconto}%` : "sconto"}
                    valore={`-${euro(preventivo.sconto)} €`}
                  />
                  <Voce
                    etichetta="spedizione"
                    valore={
                      preventivo.spedizione === 0
                        ? "gratuita"
                        : `${euro(preventivo.spedizione)} €`
                    }
                  />
                  {preventivo.tasse > 0 && (
                    <Voce
                      etichetta="tasse"
                      valore={`${euro(preventivo.tasse)} €`}
                    />
                  )}
                  <Voce etichetta="iva" valore={`${euro(preventivo.iva)} €`} />
                </>
              )}
            </div>

            <div className="mt-3 flex items-baseline justify-between border-y-2 border-dashed border-ink/50 py-2">
              <span className="text-sm font-black tracking-widest">Totale</span>
              <span className="text-xl font-black">{euro(totale)} €</span>
            </div>

            {!isCliente && (
              <div className="mt-3 flex flex-col gap-1">
                <Voce
                  etichetta="punti volume"
                  valore={`${euro(preventivo.puntiVolume)} PV`}
                />
                {mostraGuadagno && (
                  <>
                    <Voce
                      etichetta="vendita cliente"
                      valore={`${euro(preventivo.venditaCliente)} €`}
                    />
                    <Voce
                      etichetta="guadagno netto"
                      valore={`${euro(preventivo.guadagnoNetto)} €`}
                    />
                  </>
                )}
              </div>
            )}
          </>
        )}

        {/* piè di pagina */}
        <div className="mt-5 flex flex-col items-center gap-2">
          <div className="flex h-9 items-stretch" aria-hidden="true">
            {BARRE.map((w, i) => (
              <span
                key={i}
                className="bg-ink"
                style={{ width: w * 1.5, marginRight: (i % 2) + 1 }}
              />
            ))}
          </div>
          <p className="text-[10px] traking.widest text-ink-soft">
            Grazie e a presto!
          </p>
        </div>
      </div>

      {footer && <div className="shrink-0 px-5 pb-6 pt-2">{footer}</div>}
    </div>
  );
}
