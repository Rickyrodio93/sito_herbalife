"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { Search } from "lucide-react";
import Input from "./Input";

export default function BarraDiRicerca({ search, setSearch, prodotti }) {
  const [isFocus, setIsFocus] = useState(false);
  const containerRef = useRef(null);

  // 1. Array di testi che ruoteranno nel placeholder quando non si digita
  const suggerimentiPlaceholder = [
    'ricerca "Formula 1"...',
    'ricerca "Bioniq"...',
    'ricerca "Aloe MAX"...',
  ];
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholderIndex((prev) => (prev + 1) % suggerimentiPlaceholder.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // 2. Chiudi il menu a discesa se l'utente clicca fuori dal componente
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsFocus(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🌟 3. FILTRA I PRODOTTI IN TEMPO REALE IN BASE A COSA SI STA SCRIVENDO
  const prodottiFiltrati = useMemo(() => {
    if (!search.trim() || !prodotti) return [];

    const query = search.toLowerCase();
    const risultati = [];

    prodotti.forEach((categoria) => {
      if (categoria.data && Array.isArray(categoria.data)) {
        categoria.data.forEach((prodotto) => {
          // Controlliamo se il nome del prodotto o l'ID contengono quello che l'utente sta scrivendo
          const nomeProdotto = prodotto.Prodotto ? prodotto.Prodotto.toLowerCase() : "";
          const idProdotto = prodotto.ID ? prodotto.ID.toString().toLowerCase() : "";

          if (nomeProdotto.includes(query) || idProdotto.includes(query)) {
            risultati.push({
              id: prodotto.ID,
              nome: prodotto.Prodotto,
            });
          }
        });
      }
    });

    // Limito a 6 risultati per non intasare lo schermo
    return risultati
  }, [search, prodotti]);

  return (
    <div ref={containerRef} className="relative w-full flex flex-col gap-2">
      
      {/* Campo di Input */}
      <div className="relative w-full">
        <Input
          as="input"
          type="search"
          value={search}
          placeholder={suggerimentiPlaceholder[currentPlaceholderIndex]}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setIsFocus(true)}
          iconaDestra={
            <div className="text-herbalife-1 font-bold">
              <Search size={24} />
            </div>
          }
        />
      </div>

      {/* 🌟 MENU A DISCESA DEI SUGGERIMENTI IN TEMPO REALE */}
      {isFocus && prodottiFiltrati.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg mt-1 shadow-xl z-50 overflow-hidden max-h-60 overflow-y-auto">
          <div className="p-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 border-b border-zinc-100 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/50">
            Prodotti trovati ({prodottiFiltrati.length})
          </div>
          <ul>
            {prodottiFiltrati.map((prod) => (
              <li key={prod.id}>
                <button
                  type="button"
                  onClick={() => {
                    setSearch(prod.nome); // Scrive il nome intero del prodotto nell'input
                    setIsFocus(false);   // Chiude il menu a discesa
                  }}
                  className="w-full text-left px-4 py-2.5 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer flex items-center justify-between capitalize group"
                >
                  <span className="truncate group-hover:text-zinc-950 dark:group-hover:text-white font-medium">
                    {prod.nome.toLowerCase()}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400 bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-500 px-1.5 py-0.5 rounded ml-2">
                    ID: {prod.id}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Messaggio di "Nessun risultato" opzionale nel menu a tendina */}
      {isFocus && search.trim().length > 1 && prodottiFiltrati.length === 0 && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg mt-1 p-4 text-center text-xs text-zinc-400 dark:text-zinc-500 shadow-xl z-50">
          Nessun prodotto corrisponde a {search}
        </div>
      )}
    </div>
  );
}