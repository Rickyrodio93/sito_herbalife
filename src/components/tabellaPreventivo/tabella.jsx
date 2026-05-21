"use client"
import React, { useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Riga from "./riga";

export default function Tabella({
  prodotti,
  isLoading = false,
  ruolo,
  usoDistributore,
  livelloMarketing,
  handleAggiungiProdotto,
}) {
  const tableThead = ["ID", "Prodotto", "Quantità", "Prezzo"];
  const [quantities, setQuantities] = useState({});

  // gestire il cambiamento di input
  const handleInputChange = (id, value) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: parseInt(value, 10) || 0,
    }));
  };

  return (
    <div className="w-full ">
      <table className="w-full overflow-x-auto table-auto border-collapse">
        <thead className="text-white bg-herbalife-1 sticky text-sm top-0 h-10 uppercase z-1">
          <tr>
            {tableThead.map((nameCol, index) => (
              <th key={index} className="px-6 py-2">
                {nameCol}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <SkeletonTheme
                  key={i}
                  baseColor="#e5ffc54d"
                  highlightColor="#26643133"
                >
                  <tr>
                    <td
                      colSpan={tableThead.length > 0 ? tableThead.length : 1}
                      className="sticky top-10 w-4xl"
                    >
                      <Skeleton className="h-10" />
                    </td>
                  </tr>
                  {tableThead.map((_, idx) => (
                    <td key={idx} className="px-3 py-4">
                      <SkeletonTheme
                        baseColor="#26643133"
                        highlightColor="#e5ffc54d"
                      >
                        <Skeleton count={2} className="h-20" />
                      </SkeletonTheme>
                    </td>
                  ))}
                </SkeletonTheme>
              ))
            : prodotti.map((categoria, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td
                      colSpan={tableThead.length}
                      className="bg-herbalife-2 text-herbalife-1 text-center font-semibold text-xl capitalize sticky top-10 z-1"
                    >
                      {categoria.title}
                    </td>
                  </tr>

                  {categoria.data.map((prodotto) => (
                    <Riga
                      key={prodotto.ID}
                      prodotto={prodotto}
                      quantita={quantities[prodotto.ID] ?? 1}
                      onInputChange={handleInputChange}
                      ruolo={ruolo}
                      usoDistributore={usoDistributore}
                      livelloMarketing={livelloMarketing}
                      onAggiungi={handleAggiungiProdotto}
                    />
                  ))}
                </React.Fragment>
              ))}
        </tbody>
      </table>
    </div>
  );
}
