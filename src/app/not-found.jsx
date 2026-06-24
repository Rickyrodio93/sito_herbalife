import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center px-6 text-center">
            <span className="text-7xl font-black text-zinc-300 dark:text-zinc-800 tracking-widest select-none">
                404
            </span>

            <h2 className="mt-4 text-2xl font-black uppercase tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
                pagina non trovata
            </h2>
            <p className="mt-2 text-base text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto text-balance">
                La pagina che stai cercando non esiste o è stata spostata altrove.
            </p>

            <Link
                href="/"
                className="mt-8 flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold uppercase tracking-wider rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 active:scale-95"
            >
                <ArrowLeft size={16} />
                torna alla home
            </Link>
        </div>
    )
}