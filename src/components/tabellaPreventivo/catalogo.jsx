"use client";

import { useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Riga from "./riga";

function Pillola({ attiva, onClick, children }) {
  return (
    <button
      type="button"
      aria-pressed={attiva}
      onClick={onClick}
      className={`flex shrink-0 cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold capitalize transition-colors ${
        attiva
          ? "border-herbalife-1 bg-herbalife-1 text-white dark:border-green-700 dark:bg-green-700"
          : "border-line bg-card text-zinc-700 hover:border-herbalife-1 dark:text-zinc-200 dark:hover:border-green-500"
      }`}
    >
      {children}
    </button>
  );
}

export default function Catalogo({
  gruppi,
  isLoading,
  qtaPerId,
  onSet,
  ruolo,
  usoDistributore,
  livelloMarketing,
  isAbbonato,
  setIsAbbonato,
  vuoto,
}) {
  const [categoria, setCategoria] = useState(null);

  if (isLoading) {
    return (
      <SkeletonTheme baseColor="var(--raised)" highlightColor="var(--line)">
        <ul className="flex flex-col gap-3" aria-busy="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <li key={i}>
              <Skeleton height={96} borderRadius={16} />
            </li>
          ))}
        </ul>
      </SkeletonTheme>
    );
  }

  if (gruppi.length === 0) return vuoto;

  // se la categoria scelta sparisce (es. per la ricerca) si torna a "Tutte"
  const attiva = gruppi.some((g) => g.title === categoria) ? categoria : null;
  const visibili = attiva ? gruppi.filter((g) => g.title === attiva) : gruppi;
  const totale = gruppi.reduce((acc, g) => acc + g.data.length, 0);
  const conTitoli = gruppi.length > 1;

  const conteggio = (n) => (
    <span className="rounded-full bg-black/10 px-1.5 py-0.5 font-mono text-[11px] font-bold dark:bg-white/15">
      {n}
    </span>
  );

  return (
    <div>
      {conTitoli && (
        <div className="sticky top-18 z-20 -mx-2 mb-4 bg-surface/90 px-2 py-2 backdrop-blur">
          <div
            role="group"
            aria-label="Filtra per categoria"
            className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <Pillola attiva={!attiva} onClick={() => setCategoria(null)}>
              Tutte {conteggio(totale)}
            </Pillola>
            {gruppi.map((g) => (
              <Pillola
                key={g.title}
                attiva={attiva === g.title}
                onClick={() => setCategoria(g.title)}
              >
                {g.title} {conteggio(g.data.length)}
              </Pillola>
            ))}
          </div>
        </div>
      )}

      <div className="@container flex flex-col gap-8">
        {visibili.map((g) => (
          <div key={g.title} role="group" aria-label={g.title}>
            {conTitoli && (
              <h3 className="mb-3 text-sm font-black uppercase tracking-wider text-herbalife-1 dark:text-green-400">
                {g.title}
              </h3>
            )}
            <ul className="flex flex-col gap-3">
              {g.data.map((prodotto) => (
                <Riga
                  key={prodotto.ID}
                  prodotto={prodotto}
                  quantita={qtaPerId.get(String(prodotto.ID)) ?? 0}
                  onSet={onSet}
                  ruolo={ruolo}
                  usoDistributore={usoDistributore}
                  livelloMarketing={livelloMarketing}
                  isAbbonato={isAbbonato}
                  setIsAbbonato={setIsAbbonato}
                />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
