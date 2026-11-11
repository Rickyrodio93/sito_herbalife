"use client";

import { useEffect, useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import Papa from "papaparse";

// Tooltip personalizzato moderno e pulito
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    return (
      <div className="rounded-xl border border-neutral-200 bg-white/95 p-3 shadow-lg backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/95">
        <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          Anno {label}
        </p>
        <p className="mt-1 text-base font-bold text-emerald-600 dark:text-emerald-400">
          ${value.toLocaleString()}{" "}
          <span className="text-xs font-normal text-neutral-500">Mln</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function FatturatoChart() {
  const [dati, setDati] = useState([]);
  const [loading, setLoading] = useState(true);

  const csvUrl =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQb2a_fPI4uKEoqn6A0CpY34LHPoQ7yLagUhyC4YITp-5bdTz9JiPXNdjzNB0vBAChwPF4g3TvbQ3F4/pub?output=csv";

  useEffect(() => {
    fetch(csvUrl)
      .then((response) => response.text())
      .then((text) => {
        const risultato = Papa.parse(text, { header: true });
        const datiPuliti = risultato.data
          .filter(
            (riga) => riga["anno"] && riga["fatturato (Milioni di dollari)"],
          )
          .map((riga) => ({
            anno: riga["anno"],
            fatturato: parseFloat(
              riga["fatturato (Milioni di dollari)"]
                .replace(/\$/g, "")
                .replace(/,/g, ""),
            ),
          }));
        setDati(datiPuliti);
      })
      .catch((error) =>
        console.error("Errore nel caricamento dei dati:", error),
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-full rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/50">
      {/* Header del grafico */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
            Andamento Fatturato
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Dati espressi in Milioni di USD ($)
          </p>
        </div>
      </div>

      {/* Area Grafico o Loader */}
      <div className="h-95 w-full">
        {loading ? (
          <div className="flex h-full w-full items-center justify-center">
            <div className="flex items-center gap-3 text-sm text-neutral-500">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent"></span>
              Caricamento dati in corso...
            </div>
          </div>
        ) : dati.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={dati}
              margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorFatturato" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                className="stroke-neutral-200/60 dark:stroke-neutral-800/80"
              />

              <XAxis
                dataKey="anno"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6B7280", fontSize: 12 }}
                dy={10}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6B7280", fontSize: 12 }}
                tickFormatter={(value) => `$${value}`}
              />

              <Tooltip content={<CustomTooltip />} />

              <Area
                type="monotone"
                dataKey="fatturato"
                stroke="#10B981"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorFatturato)"
                activeDot={{
                  r: 6,
                  fill: "#10B981",
                  stroke: "#FFFFFF",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-neutral-500">
            Nessun dato disponibile.
          </div>
        )}
      </div>
    </div>
  );
}
