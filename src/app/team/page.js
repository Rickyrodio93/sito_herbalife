import { Plus, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {configRuoli, teamMembri} from "./teamConfig"


export default function Team() {

    /* const configRuoli = {
        DS: {
            nomeEsteso: "distributore",
            priorita: 8,
            card: "bg-zinc-100 dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 hover:shadow-zinc-300/60 dark:hover:shadow-zinc-950",
            badge: "bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200",
        },
        SV: {
            nomeEsteso: "supervisore",
            priorita: 7,
            card: "bg-slate-100 dark:bg-slate-900 border-slate-300 dark:border-slate-700 hover:shadow-slate-300/60 dark:hover:shadow-zinc-950",
            badge: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300",
        },
        WT: {
            nomeEsteso: "world team",
            priorita: 6,
            card: "bg-gray-200 dark:bg-gray-950/40 border-gray-700/50 dark:border-gray-900/40 hover:shadow-gray-400/50 dark:hover:shadow-zinc-950",
            badge: "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200",
        },
        "GET": {
            nomeEsteso: "global expansion team",
            priorita: 5,
            card: "bg-rose-100 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/40 hover:shadow-rose-200/50 dark:hover:shadow-rose-950/30",
            badge: "bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200",
        },
        "GET2.5K": {
            nomeEsteso: "get team 2500",
            priorita: 4,
            card: "bg-amber-100 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/40 hover:shadow-amber-200/50 dark:hover:shadow-amber-950/30",
            badge: "bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200",
        },
        "MT": {
            nomeEsteso: "millionaire team",
            priorita: 3,
            card: "bg-emerald-100/70 dark:bg-emerald-900/80 border-emerald-200 dark:border-emerald-900/40 hover:shadow-emerald-200/50 dark:hover:shadow-emerald-950/30",
            badge: "bg-emerald-200 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200",
        },
        "MT7.5K": {
            nomeEsteso: "millionaire team 7500",
            priorita: 2,
            card: "bg-sky-100 dark:bg-sky-950/40 border-sky-200 dark:border-sky-900/40 hover:shadow-sky-200/50 dark:hover:shadow-sky-950/30",
            badge: "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200",
        },
        "PT": {
            nomeEsteso: "president's team",
            priorita: 1,
            card: "bg-gradient-to-b from-amber-200/70 to-indigo-50 dark:from-zinc-900 dark:to-indigo-950/30 border-indigo-200 dark:border-indigo-900/50 hover:shadow-indigo-200/50 dark:hover:shadow-indigo-950/30",
            badge: "bg-gradient-to-r from-amber-200 to-indigo-200 text-indigo-900 dark:from-zinc-800 dark:to-indigo-950/60 dark:text-indigo-200",
        }
    }; */

    const membriOrdinati = [...teamMembri].sort((a, b) => {
        const pesoA = configRuoli[a.ruolo]?.priorita || 99;
        const pesoB = configRuoli[b.ruolo]?.priorita || 99;
        if (pesoA !== pesoB) return pesoA - pesoB;
        return a.id - b.id;
    });

    return (
        <main className="pt-28 md:pt-32 px-6 sm:p-16">
            <div className="max-w-7xl mx-auto px-8 py-12 bg-zinc-50 dark:bg-zinc-950 min-h-screen">
                {/* intestazione */}
                <div className="text-center mb-16">
                    <h1 className="text-3xl font-black uppercase tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
                        Il mio Team
                    </h1>
                    <p className="mt-4 text-base text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto text-balance">
                        Persone straordinarie che lavorano insieme per fare la differenza. Scopri chi siamo e i traguardi raggiunti.
                    </p>
                </div>
                {/* griglia card */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 items-stretch">
                    {/* card call to action */}
                    <Link
                        href={"https://accounts.myherbalife.com/Account/Create?appId=1&qrFlow=1&locale=it-IT&SponsorId=kQkJ2BXpUJ4=&cmp=m_it_it_wbs_dssignup_btn_nap_copylink_20250305"}
                        target="_blank"
                        className="relative group border-2 border-dashed border-zinc-300 dark:border-zinc-700 hover:border-emerald-500 dark:hover:border-emerald-400 rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all duration-300 bg-zinc-100/50 dark:bg-zinc-900/20 hover:bg-white dark:hover:bg-zinc-900 min-h-80 shadow-sm hover:shadow-md hover:-translate-y-1 cursor-pointer group"
                    >
                        <div className="w-16 h-16 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 group-hover:bg-emerald-500 dark:group-hover:bg-emerald-400 group-hover:text-white flex items-center justify-center transition-colors duration-300 shadow-sm mb-4">
                            <Plus size={28} className="transform group-hover:rotate-90 transition-transform duration-300" />
                        </div>
                        <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                            unisciti al team!
                        </h3>
                        <p className="mt-2 text-sm text-zinc-400 dark:text-zinc-500 max-w-50 leading-snug">
                            Vuoi avviare la tua attività? Clicca qui e crea il tuo account nel mio team.
                        </p>
                    </Link>
                    {/* card membri */}
                    {membriOrdinati.map((membro) => {
                        const infoRuolo = configRuoli[membro.ruolo] || {
                            nomeEsteso: membro.ruolo,
                            card: "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800",
                            badge: "bg-zinc-100 text-zinc-700",
                        };

                        return (
                            <div
                                key={membro.id}
                                className={`relative border rounded-2xl p-6 shadow-sm flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${infoRuolo.card}`}>

                                {/* spilla risultato */}
                                <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full shadow-lg flex items-center justify-center text-xl transform rotate-12 hover:rotate-0 transition-transform cursor-default z-10 select-none">
                                    {membro.ruolo && membro.ruolo.trim() !== "" ? (

                                        <Image
                                            src={`/immagini/spille/${membro.ruolo}.webp`}
                                            alt={infoRuolo.nomeEsteso}
                                            fill
                                            className="object-contain drop-shadow-sm"
                                        />
                                    ) : (
                                        <Image
                                            src={`/immagini/spille/DS.webp`}
                                            alt="DS"
                                            fill
                                            className="object-contain drop-shadow-sm"
                                        />
                                    )}
                                </div>

                                <div>
                                    {/* immagine profilo */}
                                    <div className="relative w-36 h-36 mx-auto mb-5 rounded-full overflow-hidden border-2 border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
                                        {membro.immagine && membro.immagine.trim() !== "" ? (

                                            <Image
                                                src={membro.immagine}
                                                alt={membro.nome}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-linear-to-br from-emerald-500 via-emerald-600 to-green-700 flex flex-col items-center justify-center select-none p-4">
                                                <div className="p-2.5 bg-white/10 dark:bg-black/10 rounded-full backdrop-blur-sm shadow-inner animate-pulse duration-3000 mb-1">
                                                    <User size={40} className="text-white drop-shadow-sm" strokeWidth={1.5} />
                                                </div>

                                                <span className="text-[9px] font-black tracking-widest text-emerald-100/90 uppercase text-center max-w-25 leading-tight">
                                                    HL Team<br />Member
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="text-center">
                                        {/* ruolo */}
                                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${infoRuolo.badge}`}>
                                            {infoRuolo.nomeEsteso}
                                        </span>
                                        {/* nome */}
                                        <h3 className="mt-3 text-lg font-bold text-zinc-900 dark:text-zinc-50 capitalize">
                                            {membro.nome}
                                        </h3>
                                        {/* storia */}
                                        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed text-left">
                                            {membro.descrizione}

                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}


                </div>
            </div>
        </main>
    )
}