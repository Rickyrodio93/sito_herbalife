"use client";

import { useEffect, useState } from "react";
import InputPreventivo from "@/components/tabellaPreventivo/inputPreventivo";
import Input from "@/components/Inputs/Input";
import { Search } from "lucide-react";
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
              <InputPreventivo
                title="ruolo"
                value={ruolo}
                onChange={handleRuoloChange}
                option={[
                  { name: "-- seleziona ruolo --", optionValue: "" },
                  { name: "cliente", optionValue: "cliente" },
                  { name: "cliente privilegiato", optionValue: "CP" },
                  { name: "distributore", optionValue: "DS" },
                ]}
              />

              {/* se cliente privilegiato */}
              {ruolo === "CP" && (
                <InputPreventivo
                  title="livello"
                  value={livelloMarketing}
                  onChange={(e) => setLivelloMarketing(e.target.value)}
                  option={[
                    { name: "-- seleziona --", optionValue: "" },
                    { name: "bronze (22%)", optionValue: 25 },
                    { name: "silver (31%)", optionValue: 35 },
                    { name: "gold (42%)", optionValue: 42 },
                  ]}
                />
              )}

              {/* se distributore */}
              {ruolo === "DS" && (
                <>
                  <InputPreventivo
                    title="livello"
                    value={livelloMarketing}
                    onChange={(e) => setLivelloMarketing(e.target.value)}
                    option={[
                      { name: "-- seleziona livello --", optionValue: "" },
                      { name: "distributore (25%)", optionValue: 25 },
                      { name: "senior consultant (35%)", optionValue: 35 },
                      { name: "qualifier producer (42%)", optionValue: 42 },
                      { name: "supervisore o oltre (50%)", optionValue: 50 },
                    ]}
                  />
                  <InputPreventivo
                    title="tipologia"
                    value={usoDistributore}
                    onChange={(e) => setUsoDistributore(e.target.value)}
                    option={[
                      {
                        name: "-- seleziona tipologia uso --",
                        optionValue: "",
                      },
                      { name: "uso personale", optionValue: "uso personale" },
                      {
                        name: "vendita occasionale",
                        optionValue: "vendita occasionale",
                      },
                      {
                        name: "Vendita abituale ( fino a 6410€/anno)",
                        optionValue: "abituale <6410",
                      },
                      {
                        name: "Vendita abituale ( oltre 6410€/anno)",
                        optionValue: "abituale >6410",
                      },
                    ]}
                  />
                </>
              )}
            </div>

            <div className="mb-6">
              {/* barra di ricerca */}
              <Input
                type={"search"}
                placeholder={"ricerca prodotto..."}
                onChange={(e) => setSearch(e.target.value)}
              >
                <div className="h-full aspect-square flex items-center justify-center text-herbalife-1 font-bold">
                  <Search size={24} />
                </div>
              </Input>
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
