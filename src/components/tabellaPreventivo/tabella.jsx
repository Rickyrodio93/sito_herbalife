"use client";
import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Riga from "./riga";
import { ChevronDown, ChevronUp } from "lucide-react";
import { AnimatePresence } from "framer-motion";

export default function Tabella({
  prodotti,
  isLoading = false,
  ruolo,
  usoDistributore,
  livelloMarketing,
  handleAggiungiProdotto,
  isSearching,
}) {
  const tableThead = ["ID", "Prodotto", "Quantità", "Prezzo"];
  const [quantities, setQuantities] = useState({});
  const [categorieAperte, setCategorieAperte] = useState({});

  useEffect(() => {
    if (isSearching) {
      const categorieSpalancate = prodotti.reduce((acc, categoria) => {
        acc[categoria.title] = true;
        return acc;
      }, {});
      setCategorieAperte(categorieSpalancate);
    }
  }, [isSearching, prodotti]);

  // gestire il cambiamento di input
  const handleInputChange = (id, value) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: parseInt(value, 10) || 0,
    }));
  };

  const toggleCategoria = (titolo) => {
    setCategorieAperte((prev) => ({
      ...prev,
      [titolo]: !prev[titolo],
    }));
  };

  return (
    <div className="w-full ">
      <table className="w-full block lg:table table-auto border-collapse">
        <thead className="hidden lg:table-header-group text-zinc-400 dark:text-zinc-500 bg-zinc-900 dark:bg-zinc-950 sticky text-xs top-0 h-11 uppercase tracking-wider border-b border-zinc-800 z-20">
          <tr>
            {tableThead.map((nameCol, index) => (
              <th
                key={index}
                className="px-6 py-3 font-semibold text-left first:text-center last:text-center"
              >
                {nameCol}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="w-full block lg:table-row-group">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <SkeletonTheme
                  key={i}
                  baseColor="#f4f4f5"
                  highlightColor="#e4e4e7"
                >
                  <tr className="block lg:table-row">
                    <td colSpan={tableThead.length} className="px-6 py-4 block lg:table-cell">
                      <Skeleton className="h-8 w-48 rounded-md" />
                    </td>
                  </tr>

                  <tr className="border-b border-zinc-100">
                    <td className="p-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                    </td>
                    <td className="p-4">
                      <Skeleton className="h-12 w-full max-w-sm" />
                    </td>
                    <td className="p-4">
                      <Skeleton className="h-12 w-20" />
                    </td>
                    <td className="p-4">
                      <Skeleton className="h-12 w-20" />
                    </td>
                  </tr>
                </SkeletonTheme>
              ))
            : prodotti.map((categoria, index) => {
                const isAperta = !!categorieAperte[categoria.title];

                return (
                  <React.Fragment key={index}>
                    <tr
                      onClick={() => toggleCategoria(categoria.title)}
                      className="cursor-pointer group select-none block lg:table-row"
                    >
                      <td
                        colSpan={tableThead.length}
                        className="bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 lg:sticky lg:top-10.5 z-15 py-3.5 px-6 border-b border-zinc-200 dark:border-zinc-800 shadow-sm block lg:table-cell"
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="text-sm font-black uppercase tracking-wider text-herbalife-1 dark:text-herbalife-2">
                            {categoria.title}
                            <span className="text-sm text-zinc-400 dark:text-zinc-500 font-bold font-mono ml-2 bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 rounded-full whitespace-nowrap inline-block">
                              {categoria.data.length} prodotti
                            </span>
                          </span>

                          {isAperta ? (
                            <ChevronUp size={16} />
                          ) : (
                            <ChevronDown size={16} />
                          )}
                        </div>
                      </td>
                    </tr>

                    <AnimatePresence>
                      {isAperta &&
                        categoria.data.map((prodotto) => (
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
                    </AnimatePresence>
                  </React.Fragment>
                );
              })}
        </tbody>
      </table>
    </div>
  );
}
