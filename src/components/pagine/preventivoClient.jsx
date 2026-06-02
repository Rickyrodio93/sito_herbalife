"use client";

import { useEffect, useState } from "react";
import InputPreventivo from "@/components/tabellaPreventivo/inputPreventivo";
import Input from "@/components/Inputs/Input";
import { ArrowBigDown, ArrowDown, ChevronDown, Search } from "lucide-react";
import UltimaModifica from "@/components/UltimaModifica/UltimaModifica";
import Tabella from "@/components/tabellaPreventivo/tabella";
import axios from "axios";
import Papa from "papaparse";
import Riepilogo from "@/components/tabellaPreventivo/riepilogo";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export default function PreventivoClient() {
  const [ruolo, setRuolo] = useState(""); // Default vuoto: "" | cliente | CP | DS
  const [livelloMarketing, setLivelloMarketing] = useState("");
  const [usoDistributore, setUsoDistributore] = useState("");
  const [search, setSearch] = useState("");
  const [prodotti, setProdotti] = useState([]);
  const [loading, setLoading] = useState(true);
  const [prodottiSelezionati, setProdottiSelezionati] = useState([]);

  useEffect(() => {
    const csvUrlProdotti =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vTCM_3vWzdtq9AefTo1Qh44lF4d1lpbrUMLVihG5SJJB1m0LfpaTf35K1FvLUG5jm_m5eyMpOqmViGJ/pub?gid=146688255&single=true&output=csv";

    axios.get(csvUrlProdotti).then((res) => {
      Papa.parse(res.data, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: false,
        transformHeader: (header) => header.trim(),
        complete: ({ data }) => {
          const prodottiRaggruppati = data.reduce((acc, row) => {
            const categoria = row.Title || "Senza Categoria";

            if (!acc[categoria]) acc[categoria] = [];

            const parse = (val) =>
              parseFloat((val || "").replace(",", ".")) || 0;

            acc[categoria].push({
              ID: row.ID,
              Prodotto: row.Prodotto,
              PrezzoListino: parse(row.PrezzoListino),
              BaseSconto: parse(row.BaseSconto),
              PuntiVolume: parse(row.PuntiVolume),
              Iva: parse(row.Iva),
            });

            return acc;
          }, {});

          const formattati = Object.keys(prodottiRaggruppati).map((cat) => ({
            title: cat,
            data: prodottiRaggruppati[cat],
          }));

          setProdotti(formattati);
          setLoading(false);
        },
      });
    });
  }, []);

  // reset dei filtri secondari quando cambia il ruolo principale
  const handleRuoloChange = (e) => {
    setRuolo(e.target.value);
    setLivelloMarketing("");
    setUsoDistributore("");
  };

  // filtro ricerca
  const prodottiFiltrati = prodotti
    .map((categoria) => ({
      ...categoria,
      data: categoria.data.filter((prodotto) =>
        prodotto.Prodotto?.toLowerCase().includes(search.toLowerCase()),
      ),
    }))
    .filter((categoria) => categoria.data.length > 0);

  // aggiungi / aggiorna / rimuovi prodotto (viene chiamato anche con quantita = 0 per rimuovere)
  const handleAggiungiProdotto = (prodotto, quantita, prezzoUnitario) => {
    setProdottiSelezionati((prev) => {
      const id = String(prodotto.ID);
      const qta = Number(quantita) || 0;
      const prezzo = Number(prezzoUnitario) || 0;
      const pv = Number(prodotto.PuntiVolume) || 0;

      // quantità 0 -> rimuovi
      if (qta === 0) {
        return prev.filter((p) => String(p.id) !== id);
      }

      const voce = {
        id,
        nome: prodotto.Prodotto,
        quantita: qta,
        prezzoUnitario: prezzo,
        PrezzoListino: prodotto.PrezzoListino,
        baseSconto: prodotto.BaseSconto,
        puntiVolumeUnitario: pv,
        iva: prodotto.Iva,
        totale: Math.round((qta * prezzo + Number.EPSILON) * 100) / 100,
      };

      const idx = prev.findIndex((p) => String(p.id) === id);
      if (idx === -1) return [...prev, voce];

      // sovrascrivo la voce esistente con la quantità dell'input
      const copy = prev.slice();
      copy[idx] = voce;
      return copy;
    });
  };

  const handleRimuoviProdotto = (id) => {
    setProdottiSelezionati((prev) =>
      prev.filter((p) => String(p.id) !== String(id)),
    );
  };

  return (
    <>
      <div className="flex flex-col gap-8 md:gap-12">
        <h2>genera un preventivo gratuito per i tuoi prodotti</h2>

        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start sm:px-4">
          <div className="lg:col-span-8 w-full max-w-4xl mx-auto">
            {/* input */}
            <div className="flex flex-col gap-4 items-center mb-10 w-full">
              <Input
                as="select"
                name="ruolo"
                value={ruolo}
                onChange={handleRuoloChange}
                iconaDestra={<ChevronDown size={18} />}
              >
                <option
                  value=""
                  className="dark:bg-zinc-900 text-zinc-400"
                  disabled
                >
                  -- seleziona ruolo --
                </option>
                <option
                  value="cliente"
                  className="dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
                >
                  Cliente
                </option>
                <option
                  value="CP"
                  className="dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
                >
                  Cliente Privilegiato
                </option>
                <option
                  value="DS"
                  className="dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
                >
                  Distributore
                </option>
              </Input>

              {/* se cliente privilegiato */}
              {ruolo === "CP" && (
                <Input
                  as="select"
                  name="livello"
                  value={livelloMarketing}
                  onChange={(e) => setLivelloMarketing(e.target.value)}
                  iconaDestra={<ChevronDown size={18} />}
                >
                  <option
                    value=""
                    className="dark:bg-zinc-900 text-zinc-400"
                    disabled
                  >
                    -- seleziona livello --
                  </option>
                  <option
                    value="25"
                    className="dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
                  >
                    bronze (22%)
                  </option>
                  <option
                    value="35"
                    className="dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
                  >
                    silver (31%)
                  </option>
                  <option
                    value="42"
                    className="dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
                  >
                    gold (38%)
                  </option>
                </Input>
              )}

              {/* se distributore */}
              {ruolo === "DS" && (
                <>
                  <Input
                    as="select"
                    name="livello"
                    value={livelloMarketing}
                    onChange={(e) => setLivelloMarketing(e.target.value)}
                    iconaDestra={<ChevronDown size={18} />}
                  >
                    <option
                      value=""
                      className="dark:bg-zinc-900 text-zinc-400"
                      disabled
                    >
                      -- seleziona livello --
                    </option>
                    <option
                      value="25"
                      className="dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
                    >
                      distributore (25%)
                    </option>
                    <option
                      value="35"
                      className="dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
                    >
                      senior consultant (35%)
                    </option>
                    <option
                      value="42"
                      className="dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
                    >
                      qualifier producer (42%)
                    </option>
                    <option
                      value="50"
                      className="dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
                    >
                      supervisore o oltre (50%)
                    </option>
                  </Input>

                  <Input
                    as="select"
                    name="tipologia"
                    value={usoDistributore}
                    onChange={(e) => setUsoDistributore(e.target.value)}
                    iconaDestra={<ChevronDown size={18} />}
                  >
                    <option
                      value=""
                      className="dark:bg-zinc-900 text-zinc-400"
                      disabled
                    >
                      -- seleziona tipologia uso --
                    </option>
                    <option
                      value="uso personale"
                      className="dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
                    >
                      uso personale
                    </option>
                    <option
                      value="vendita occasionale"
                      className="dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
                    >
                      vendita occasionale
                    </option>
                    <option
                      value="abituale <6410"
                      className="dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
                    >
                      Vendita abituale ( fino a 6410€/anno)
                    </option>
                    <option
                      value="abituale >6410"
                      className="dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
                    >
                      Vendita abituale ( oltre 6410€/anno)
                    </option>
                  </Input>
                </>
              )}
            </div>

            <div className="mb-6">
              {/* barra di ricerca */}
              <Input
                as="input"
                type="search"
                placeholder="ricerca prodotto..."
                onChange={(e) => setSearch(e.target.value)}
                iconaDestra={
                  <div className="text-herbalife-1 font-bold">
                    <Search size={24} />
                  </div>
                }
              />
            </div>

            {/* tabella */}
            <UltimaModifica />
            <div className="lg:h-[80vh] max-w-4xl overflow-x-auto shadow-nav sticky top-nav rounded-lg">
              <Tabella
                prodotti={prodottiFiltrati}
                isLoading={loading}
                ruolo={ruolo}
                usoDistributore={usoDistributore}
                livelloMarketing={livelloMarketing}
                handleAggiungiProdotto={handleAggiungiProdotto}
              />
            </div>
          </div>

          {/* riepilogo costi */}
          <div className="lg:col-span-4 w-full max-w-md mx-auto lg:sticky lg:top-25 z-30">
            <Riepilogo
              prodotti={prodottiSelezionati}
              onRimuoviProdotto={handleRimuoviProdotto}
              ruolo={ruolo}
              usoDistributore={usoDistributore}
              livelloMarketing={livelloMarketing}
            />
            <ScrollToTopButton />
          </div>
        </div>
      </div>
    </>
  );
}
