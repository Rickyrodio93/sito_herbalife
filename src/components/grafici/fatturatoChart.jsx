"use client"
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

export default function fatturatoChart() {
  const [dati, setDati] = useState([]);

  const csvUrl =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQb2a_fPI4uKEoqn6A0CpY34LHPoQ7yLagUhyC4YITp-5bdTz9JiPXNdjzNB0vBAChwPF4g3TvbQ3F4/pub?output=csv";

  useEffect(() => {
    fetch(csvUrl)
      .then((response) => response.text())
      .then((text) => {
        const risultato = Papa.parse(text, { header: true });
        const datiPuliti = risultato.data
          .filter(
            (riga) => riga["anno"] && riga["fatturato (Milioni di dollari)"]
          )
          .map((riga) => ({
            anno: riga["anno"],
            fatturato: parseFloat(
              riga["fatturato (Milioni di dollari)"]
                .replace(/\$/g, "")
                .replace(/,/g, "")
            ),
          }));
        setDati(datiPuliti);
      });
  }, []);

  return (
    <>
      <h2>fatturato herbalife (1980 - 2024)</h2>
      <div className="w-full h-150 mb-25 ">
        {dati.length > 0 ? (
          <ResponsiveContainer>
            <AreaChart data={dati}>
              <defs>
                <linearGradient id="colorFatturato" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#4CAF50" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="anno"
                domain={["auto", "auto"]}
                label={{
                  key: "AxisLabel",
                  value: `Anno`,
                  style: { textAnchor: "middle" },
                  position: "bottom",
                  offset: -6,
                }}
              />
              <YAxis
                domain={["auto", "auto"]}
                label={{
                  value: `Milioni di $`,
                  angle: -90,
                  position: "left",
                  style: { textAnchor: "middle" },
                  offset: -6,
                }}
              />

              <Tooltip formatter={(value) => `${value} Milioni di $`} />
              <Area
                type="monotone"
                dataKey="fatturato"
                stroke="#4CAF50"
                fillOpacity={1}
                fill="url(#colorFatturato)"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <p className="dark:text-white">Caricamento dati...</p>
        )}
      </div>
    </>
  );
}
