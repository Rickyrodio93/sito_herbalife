import { Plus, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { configRuoli, teamMembri } from "./teamConfig"


export default function Team() {

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