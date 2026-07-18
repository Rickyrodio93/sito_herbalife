"use client";

import { useEffect } from "react";
import { RefreshCw } from "lucide-react";

export default function Error({ error, reset }) {
    useEffect(() => {
        // Opzionale: puoi tracciare l'errore su un servizio esterno (es. Sentry)
        console.error("Errore catturato:", error);
    }, [error]);

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center px-6 text-center">
            <div className="w-16 h-16 bg-rose-100 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 rounded-2xl flex items-center justify-center shadow-sm mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
            </div>
            
            <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
                Qualcosa è andato storto
            </h2>
            <p className="mt-2 text-base text-zinc-500 dark:text-zinc-400 max-w-md mx-auto text-balance">
                Si è verificato un errore imprevisto durante il caricamento di questa pagina.
            </p>

            <button
                onClick={() => reset()}
                className="mt-8 flex items-center gap-2 px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-50 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 text-sm font-bold uppercase tracking-wider rounded-xl shadow-sm hover:shadow transition-all duration-200 active:scale-95 cursor-pointer"
            >
                <RefreshCw size={16} />
                Riprova
            </button>
        </div>
    );
}