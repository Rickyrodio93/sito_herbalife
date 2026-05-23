"use client";

import dynamic from "next/dynamic";

// Ora Next.js accetta ssr: false perché siamo nel "mondo client"
const PreventivoClient = dynamic(
  () => import("@/components/pagine/preventivoClient"),
  { 
    ssr: false,
    loading: () => <div className="p-10 text-center text-xl">Caricamento preventivo...</div>
  }
);

export default function PreventivoWrapper() {
  return <PreventivoClient />;
}