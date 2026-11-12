"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import Papa from "papaparse";
import { AlertTriangle, RotateCcw } from "lucide-react";
import BarraDiRicerca from "../Inputs/barraDiRicerca";
import UltimaModifica from "@/components/UltimaModifica/UltimaModifica";
import Catalogo from "@/components/tabellaPreventivo/catalogo";
import Riepilogo from "@/components/tabellaPreventivo/riepilogo";
import ScrollToTopButton from "@/components/ScrollToTopButton";

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTCM_3vWzdtq9AefTo1Qh44lF4d1lpbrUMLVihG5SJJB1m0LfpaTf35K1FvLUG5jm_m5eyMpOqmViGJ/pub?gid=146688255&single=true&output=csv";
const CHIAVE = "preventivo:v1";
const CATEGORIA_BIONIQ = "formulazioni personalizzate";

const LINEE = [
  { id: "herbalife", nome: "Herbalife" },
  { id: "bioniq", nome: "Bioniq" },
];
const RUOLI = [
  { v: "cliente", l: "Cliente" },
  { v: "CP", l: "Cliente privilegiato" },
  { v: "DS", l: "Distributore" },
];
const LIVELLI = {
  CP: [
    { v: "25", l: "Bronze 22%" },
    { v: "35", l: "Silver 31%" },
    { v: "42", l: "Gold 38%" },
  ],
  DS: [
    { v: "25", l: "Distributore 25%" },
    { v: "35", l: "Senior consultant 35%" },
    { v: "42", l: "Success builder 42%" },
    { v: "50", l: "Supervisore o oltre 50%" },
  ],
};
const USI = [
  { v: "uso personale", l: "Uso personale" },
  { v: "vendita occasionale", l: "Vendita occasionale" },
  { v: "abituale <6410", l: "Abituale fino a 6.410 €/anno" },
  { v: "abituale >6410", l: "Abituale oltre 6.410 €/anno" },
];

const STATO_INIZIALE = {
  ruolo: "cliente",
  livello: "",
  uso: "",
  linea: "herbalife",
  carrelli: { herbalife: [], bioniq: [] },
  isAbbonato: false,
};

const normalizza = (s) =>
  String(s ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

const contaArticoli = (lista) =>
  lista.reduce((acc, p) => acc + (Number(p.quantita) || 0), 0);

const contaProdotti = (gruppi) =>
  gruppi.reduce((acc, g) => acc + g.data.length, 0);

const filtra = (gruppi, q) =>
  !q
    ? gruppi
    : gruppi
        .map((g) => ({
          ...g,
          data: g.data.filter((p) =>
            normalizza(`${p.Prodotto} ${p.ID}`).includes(q),
          ),
        }))
        .filter((g) => g.data.length > 0);

const raggruppa = (prodotti) => {
  const mappa = new Map();
  prodotti.forEach((p) => {
    if (!mappa.has(p.categoria)) mappa.set(p.categoria, []);
    mappa.get(p.categoria).push(p);
  });
  return [...mappa].map(([title, data]) => ({ title, data }));
};

const carica = () => {
  if (typeof window === "undefined") return STATO_INIZIALE;
  try {
    const s = JSON.parse(localStorage.getItem(CHIAVE) || "null");
    if (!s) return STATO_INIZIALE;
    return {
      ...STATO_INIZIALE,
      ...s,
      carrelli: {
        herbalife: s.carrelli?.herbalife ?? [],
        bioniq: s.carrelli?.bioniq ?? [],
      },
    };
  } catch {
    return STATO_INIZIALE;
  }
};

function Scelta({ legenda, opzioni, valore, onChange }) {
  return (
    <fieldset>
      <legend className="mb-2 text-xs font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
        {legenda}
      </legend>
      <div className="flex flex-wrap gap-2">
        {opzioni.map((o) => (
          <label
            key={o.v}
            className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-herbalife-1/50 ${
              valore === o.v
                ? "border-herbalife-1 bg-herbalife-1 text-white dark:border-green-700 dark:bg-green-700"
                : "border-line bg-card text-zinc-700 hover:border-herbalife-1 dark:text-zinc-200 dark:hover:border-green-500"
            }`}
          >
            <input
              type="radio"
              name={legenda}
              value={o.v}
              checked={valore === o.v}
              onChange={() => onChange(o.v)}
              className="sr-only"
            />
            {o.l}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function PreventivoClient() {
  const [iniziale] = useState(carica);
  const [ruolo, setRuolo] = useState(iniziale.ruolo);
  const [livello, setLivello] = useState(iniziale.livello);
  const [uso, setUso] = useState(iniziale.uso);
  const [linea, setLinea] = useState(iniziale.linea);
  const [carrelli, setCarrelli] = useState(iniziale.carrelli);
  const [isAbbonato, setIsAbbonato] = useState(iniziale.isAbbonato);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [catalogo, setCatalogo] = useState({ herbalife: [], bioniq: [] });
  const [loading, setLoading] = useState(true);
  const [errore, setErrore] = useState(false);
  const [tentativo, setTentativo] = useState(0);

  // caricamento prodotti dal foglio Google
  useEffect(() => {
    let attivo = true;
    axios
      .get(CSV_URL)
      .then((res) => {
        Papa.parse(res.data, {
          header: true,
          skipEmptyLines: true,
          transformHeader: (h) => h.trim(),
          complete: ({ data }) => {
            if (!attivo) return;
            const num = (val) => parseFloat((val || "").replace(",", ".")) || 0;
            const prodotti = data
              .filter((r) => r.ID && r.Prodotto)
              .map((r) => ({
                ID: r.ID,
                Prodotto: r.Prodotto,
                PrezzoListino: num(r.PrezzoListino),
                BaseSconto: num(r.BaseSconto),
                PuntiVolume: num(r.PuntiVolume),
                Iva: num(r.Iva),
                categoria: r.Title || "Senza Categoria",
              }));
            setCatalogo({
              herbalife: raggruppa(
                prodotti.filter((p) => p.categoria !== CATEGORIA_BIONIQ),
              ),
              bioniq: raggruppa(
                prodotti.filter((p) => p.categoria === CATEGORIA_BIONIQ),
              ),
            });
            setLoading(false);
          },
        });
      })
      .catch(() => {
        if (!attivo) return;
        setErrore(true);
        setLoading(false);
      });
    return () => {
      attivo = false;
    };
  }, [tentativo]);

  const riprova = () => {
    setErrore(false);
    setLoading(true);
    setTentativo((t) => t + 1);
  };

  // salvataggio automatico
  useEffect(() => {
    try {
      localStorage.setItem(
        CHIAVE,
        JSON.stringify({ ruolo, livello, uso, linea, carrelli, isAbbonato }),
      );
    } catch {}
  }, [ruolo, livello, uso, linea, carrelli, isAbbonato]);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const cambiaRuolo = (nuovo) => {
    setRuolo(nuovo);
    setLivello(nuovo === "cliente" ? "" : "25");
    setUso(nuovo === "DS" ? "uso personale" : "");
  };

  const imposta = useCallback(
    (prodotto, quantita) => {
      setCarrelli((prev) => {
        const lista = prev[linea];
        const id = String(prodotto.ID);
        const qta = Math.max(0, Math.min(999, Number(quantita) || 0));
        if (qta === 0) {
          return { ...prev, [linea]: lista.filter((p) => String(p.id) !== id) };
        }
        const voce = {
          id,
          nome: prodotto.Prodotto,
          quantita: qta,
          PrezzoListino: prodotto.PrezzoListino,
          baseSconto: prodotto.BaseSconto,
          puntiVolumeUnitario: Number(prodotto.PuntiVolume) || 0,
          iva: prodotto.Iva,
          categoria: prodotto.categoria,
        };
        const idx = lista.findIndex((p) => String(p.id) === id);
        const nuova =
          idx === -1
            ? [...lista, voce]
            : lista.map((p, i) => (i === idx ? voce : p));
        return { ...prev, [linea]: nuova };
      });
    },
    [linea],
  );

  const rimuovi = (id) =>
    setCarrelli((prev) => ({
      ...prev,
      [linea]: prev[linea].filter((p) => String(p.id) !== String(id)),
    }));

  const svuota = () => {
    if (window.confirm("Vuoi svuotare questo preventivo?")) {
      setCarrelli((prev) => ({ ...prev, [linea]: [] }));
    }
  };

  const carrello = carrelli[linea];
  const altra = linea === "herbalife" ? "bioniq" : "herbalife";
  const nomeLinea = LINEE.find((l) => l.id === linea).nome;
  const nomeAltra = LINEE.find((l) => l.id === altra).nome;

  const q = normalizza(debouncedSearch.trim());
  const risultati = useMemo(
    () => ({
      herbalife: filtra(catalogo.herbalife, q),
      bioniq: filtra(catalogo.bioniq, q),
    }),
    [catalogo, q],
  );
  const risultatiAltra = contaProdotti(risultati[altra]);

  const qtaPerId = useMemo(
    () => new Map(carrello.map((p) => [String(p.id), p.quantita])),
    [carrello],
  );

  const usoNonValido =
    linea === "bioniq" && ruolo === "DS" && uso !== "uso personale";
  const abituale = uso.startsWith("abituale");

  if (errore) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-16 text-center">
        <p className="font-bold text-zinc-900 dark:text-zinc-100">
          Non riesco a caricare i prodotti.
        </p>
        <button
          type="button"
          onClick={riprova}
          className="flex cursor-pointer items-center gap-2 rounded-xl bg-zinc-950 px-5 py-3 text-sm font-semibold uppercase tracking-wider text-white dark:bg-zinc-100 dark:text-zinc-950"
        >
          <RotateCcw size={16} /> riprova
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 md:gap-10">
      <h2>genera un preventivo gratuito per i tuoi prodotti</h2>

      <div className="preventivo-griglia grid w-full grid-cols-1 items-start gap-8 lg:grid-cols-12">
        <div className="preventivo-catalogo mx-auto flex w-full min-w-0 max-w-4xl flex-col gap-6 lg:col-span-8">
          {/* profilo */}
          <div className="flex flex-col gap-5 rounded-3xl border border-line bg-card p-5 shadow-sm">
            <Scelta
              legenda="Il tuo profilo"
              opzioni={RUOLI}
              valore={ruolo}
              onChange={cambiaRuolo}
            />

            {ruolo !== "cliente" && !abituale && (
              <Scelta
                legenda="Livello"
                opzioni={LIVELLI[ruolo]}
                valore={livello}
                onChange={setLivello}
              />
            )}

            {ruolo === "DS" && (
              <>
                <Scelta
                  legenda="Tipologia d'uso"
                  opzioni={USI}
                  valore={uso}
                  onChange={setUso}
                />
                {abituale && (
                  <p className="text-sm text-zinc-600 dark:text-zinc-300">
                    Con la vendita abituale lo sconto applicato è il 50%.
                  </p>
                )}
              </>
            )}
          </div>

          {/* linea di prodotti */}
          <div className="flex flex-col gap-3">
            <UltimaModifica />

            <div
              role="group"
              aria-label="Linea di prodotti"
              className="grid grid-cols-2 gap-1 rounded-2xl border border-line bg-raised p-1"
            >
              {LINEE.map(({ id, nome }) => {
                const attiva = linea === id;
                const n = contaArticoli(carrelli[id]);
                return (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={attiva}
                    onClick={() => setLinea(id)}
                    className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-black uppercase tracking-wider transition-all ${
                      attiva
                        ? "bg-card text-herbalife-1 shadow-sm dark:text-green-400"
                        : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
                    }`}
                  >
                    {nome}
                    {n > 0 && (
                      <span className="rounded-full bg-herbalife-1 px-2 py-0.5 text-[11px] font-black text-white dark:bg-green-700">
                        {n}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {linea === "bioniq" && (
              <p className="text-sm text-zinc-600 dark:text-zinc-300">
                Bioniq è un integratore personalizzato: si ordina separatamente
                dai prodotti Herbalife e non è rimborsabile.
              </p>
            )}

            {contaArticoli(carrelli[altra]) > 0 && (
              <p className="text-sm text-zinc-600 dark:text-zinc-300">
                Hai anche {contaArticoli(carrelli[altra])} articoli nel
                preventivo {nomeAltra}: restano salvati nella sua scheda.
              </p>
            )}

            {contaArticoli(carrello) > 0 && (
              <button
                type="button"
                onClick={svuota}
                className="w-fit cursor-pointer text-sm font-bold text-zinc-600 underline underline-offset-4 hover:text-red-600 dark:text-zinc-300 dark:hover:text-red-400"
              >
                svuota il preventivo {nomeLinea}
              </button>
            )}

            {usoNonValido && (
              <div
                role="alert"
                className="flex flex-col gap-3 rounded-2xl border border-red-500/30 bg-red-500/5 p-4 text-sm text-red-900 dark:text-red-200 sm:flex-row sm:items-center sm:justify-between"
              >
                <p className="flex items-start gap-2">
                  <AlertTriangle
                    size={16}
                    className="mt-0.5 shrink-0 text-red-500"
                  />
                  Bioniq si può acquistare solo per uso personale.
                </p>
                <button
                  type="button"
                  onClick={() => setUso("uso personale")}
                  className="w-fit cursor-pointer rounded-xl bg-red-600 px-4 py-2 text-xs font-black uppercase tracking-wider text-white hover:bg-red-700"
                >
                  imposta uso personale
                </button>
              </div>
            )}
          </div>

          {/* ricerca */}
          <div className="flex flex-col gap-2">
            <BarraDiRicerca
              search={search}
              setSearch={setSearch}
              prodotti={[...catalogo.bioniq, ...catalogo.herbalife]}
            />
            {q && risultatiAltra > 0 && (
              <button
                type="button"
                onClick={() => setLinea(altra)}
                className="w-fit cursor-pointer text-sm font-bold text-herbalife-1 underline underline-offset-4 dark:text-green-400"
              >
                {risultatiAltra}{" "}
                {risultatiAltra === 1 ? "risultato" : "risultati"} anche in{" "}
                {nomeAltra}: vai alla scheda
              </button>
            )}
          </div>

          {/* catalogo */}
          <Catalogo
            key={linea}
            gruppi={risultati[linea]}
            isLoading={loading}
            qtaPerId={qtaPerId}
            onSet={imposta}
            ruolo={ruolo}
            usoDistributore={uso}
            livelloMarketing={livello}
            isAbbonato={isAbbonato}
            setIsAbbonato={setIsAbbonato}
            vuoto={
              <div className="rounded-3xl border border-dashed border-line py-12 text-center">
                <p className="font-bold text-zinc-900 dark:text-zinc-100">
                  {q
                    ? `Nessun prodotto ${nomeLinea} per "${debouncedSearch}"`
                    : "Nessun prodotto disponibile"}
                </p>
              </div>
            }
          />
        </div>

        {/* riepilogo */}
        <div className="preventivo-scontrino z-30 mx-auto w-full max-w-md lg:sticky lg:top-25 lg:col-span-4">
          <Riepilogo
            prodotti={carrello}
            onRimuoviProdotto={rimuovi}
            ruolo={ruolo}
            usoDistributore={uso}
            livelloMarketing={livello}
            isAbbonato={linea === "bioniq" && isAbbonato}
            setIsAbbonato={linea === "bioniq" ? setIsAbbonato : () => {}}
          />
          <ScrollToTopButton />
        </div>
      </div>
    </div>
  );
}
