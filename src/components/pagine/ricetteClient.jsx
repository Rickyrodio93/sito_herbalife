"use client";
import Background from "@/components/background/background";
import TabellaRicette from "@/components/ricette/TabellaRicette";
import { useState } from "react";
import BarraDiRicerca from "../Inputs/barraDiRicerca";
import { ricette } from "../ricette/ricette";
import Section from "../Section/Section";

const SUGGERIMENTI = ricette.map(({ id, titolo }) => ({ id, nome: titolo }));
const PLACEHOLDERS = [
  'cerca "pancake"...',
  'cerca "shake"...',
  'cerca "torta"...',
  'cerca "formula 1"...',
];

export default function RicetteClient() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <>
      <main>
        <Background
          titolo="ricette"
          sottotitolo="Colazioni, dolci e shake da preparare con i prodotti Herbalife"
          src="/immagini/background/sfondoRicette.jpg"
          compatta
        />

        <Section>
          <div className="flex flex-col gap-8 text-left">
            <h2>trova la tua ricetta</h2>

            <div className="w-full max-w-2xl">
              <BarraDiRicerca
                search={searchQuery}
                setSearch={setSearchQuery}
                suggerimenti={SUGGERIMENTI}
                placeholders={PLACEHOLDERS}
                mostraId={false}
                etichetta="Ricette"
              />
            </div>

            <TabellaRicette searchQuery={searchQuery} />
          </div>
        </Section>
      </main>
    </>
  );
}
