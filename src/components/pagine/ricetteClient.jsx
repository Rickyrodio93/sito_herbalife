"use client"
import Background from "@/components/background/background";
import Input from "@/components/Inputs/Input";
import TabellaRicette from "@/components/ricette/TabellaRicette";
import { Search } from "lucide-react";
import { useState } from "react";

export default function RicetteClient() {
    const [searchQuery, setSearchQuery] = useState("")
    return(

        <>
        <Background titolo={"ricette"} src="/immagini/background/sfondoRicette.jpg" />
        <main className="py-25 px-5">
            <Input 
            type="search"
            placeholder="ricerca ricetta"
            value={searchQuery}
            onChange={(e) => {
                setSearchQuery(e.target.value)
            }}
            >
            <div className="h-full aspect-square flex items-center justify-center text-herbalife-1 font-bold">
                <Search size={30}/>
            </div>
            </Input>

            <TabellaRicette searchQuery={searchQuery}/>
        </main>
    </>
    )
}