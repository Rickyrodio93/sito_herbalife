import { ChefHat } from "lucide-react";
import CardRicette from "../cards/CardRicette";
import { ricette } from "./ricette";

const normalizza = (s) =>
  String(s ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export default function TabellaRicette({ searchQuery = "" }) {
  const termine = searchQuery.trim();
  const q = normalizza(termine);

  // cerca nel titolo e nei prodotti; le più recenti per prime
  const risultati = ricette
    .filter(
      (r) =>
        !q ||
        normalizza(`${r.titolo} ${(r.prodotti || []).join(" ")}`).includes(q),
    )
    .reverse();

  return (
    <div className="w-full">
      <p className="mb-6 text-sm font-medium text-zinc-500 dark:text-zinc-400">
        {risultati.length} {risultati.length === 1 ? "ricetta" : "ricette"}
        {termine && ` per "${termine}"`}
      </p>

      {risultati.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {risultati.map((ricetta, index) => (
            <CardRicette
              key={ricetta.id}
              id={ricetta.id}
              titolo={ricetta.titolo}
              prodotti={ricetta.prodotti}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <span className="p-4 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-400 dark:text-zinc-500">
            <ChefHat size={32} />
          </span>
          <p className="font-bold text-zinc-900 dark:text-zinc-100">
            Nessuna ricetta trovata
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Prova con un altro ingrediente o con il nome di un prodotto.
          </p>
        </div>
      )}
    </div>
  );
}
