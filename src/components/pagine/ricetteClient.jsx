"use client";
import Background from "@/components/background/background";
import Input from "@/components/Inputs/Input";
import TabellaRicette from "@/components/ricette/TabellaRicette";
import { Search } from "lucide-react";
import { useState } from "react";

export default function RicetteClient() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <>
        <main className="pt-28 md:pt-30">
      <Background
        titolo={"ricette"}
        src="/immagini/background/sfondoRicette.jpg"
      />
        <Input
          type="search"
          placeholder="ricerca ricetta"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          iconaDestra={
            <div className="text-herbalife-1 font-bold">
              <Search size={24} />
            </div>
          }
          className="mt-8"
        >
          <div className="h-full aspect-square flex items-center justify-center text-herbalife-1 font-bold">
            <Search size={30} />
          </div>
        </Input>

        <TabellaRicette searchQuery={searchQuery} />
      </main>
    </>
  );
}
