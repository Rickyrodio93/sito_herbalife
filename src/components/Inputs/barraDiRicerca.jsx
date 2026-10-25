"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import { Search } from "lucide-react";
import Input from "./Input";

const PLACEHOLDER_DEFAULT = [
  'ricerca "Formula 1"...',
  'ricerca "Bioniq"...',
  'ricerca "Aloe MAX"...',
];

const normalizza = (s) =>
  String(s ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export default function BarraDiRicerca({
  search,
  setSearch,
  prodotti, // formato preventivo: [{ data: [{ ID, Prodotto }] }]
  suggerimenti, // formato piatto: [{ id, nome }]
  placeholders = PLACEHOLDER_DEFAULT,
  mostraId = true,
  etichetta = "Prodotti",
}) {
  const [isFocus, setIsFocus] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    if (placeholders.length < 2) return;
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [placeholders.length]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsFocus(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // unifica i due formati in un unico elenco { id, nome }
  const elenco = useMemo(() => {
    if (suggerimenti) return suggerimenti;
    const lista = [];
    (prodotti || []).forEach((categoria) => {
      categoria.data?.forEach((p) =>
        lista.push({ id: p.ID, nome: p.Prodotto }),
      );
    });
    return lista;
  }, [suggerimenti, prodotti]);

  const risultati = useMemo(() => {
    const query = normalizza(search.trim());
    if (!query) return [];
    return elenco.filter(
      (item) =>
        normalizza(item.nome).includes(query) ||
        (mostraId && normalizza(item.id).includes(query)),
    );
  }, [search, elenco, mostraId]);

  return (
    <div ref={containerRef} className="relative w-full flex flex-col gap-2">
      <Input
        as="input"
        type="search"
        value={search}
        placeholder={placeholders[placeholderIndex]}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setIsFocus(true)}
        iconaDestra={
          <div className="text-herbalife-1 font-bold">
            <Search size={24} />
          </div>
        }
      />

      {isFocus && risultati.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-card border border-line rounded-2xl mt-1 shadow-xl z-50 overflow-hidden max-h-60 overflow-y-auto text-left">
          <div className="p-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 border-b border-line bg-raised">
            {etichetta} trovati ({risultati.length})
          </div>
          <ul>
            {risultati.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => {
                    setSearch(item.nome);
                    setIsFocus(false);
                  }}
                  className="w-full text-left px-4 py-2.5 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-raised transition-colors cursor-pointer flex items-center justify-between capitalize group"
                >
                  <span className="truncate group-hover:text-zinc-950 dark:group-hover:text-white font-medium">
                    {item.nome.toLowerCase()}
                  </span>
                  {mostraId && (
                    <span className="text-[10px] font-mono text-zinc-400 bg-raised dark:text-zinc-500 px-1.5 py-0.5 rounded ml-2">
                      ID: {item.id}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isFocus && search.trim().length > 1 && risultati.length === 0 && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl mt-1 p-4 text-center text-xs text-zinc-400 dark:text-zinc-500 shadow-xl z-50">
          Nessun risultato per &quot;{search}&quot;
        </div>
      )}
    </div>
  );
}
