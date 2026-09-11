"use client";
import Background from "@/components/background/background";
import TabellaRicette from "@/components/ricette/TabellaRicette";
import { useState } from "react";
import BarraDiRicerca from "../Inputs/barraDiRicerca";
import { ricette } from "../ricette/ricette";

export default function RicetteClient() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <>
        <main className="pt-17 md:pt-20">
      <Background
        titolo={"ricette"}
        src="/immagini/background/sfondoRicette.jpg"
      />

        <BarraDiRicerca
          search={searchQuery}
          setSearch={setSearchQuery}
          prodotti={[...ricette]}
        />

        <TabellaRicette searchQuery={searchQuery} />
      </main>
    </>
  );
}
