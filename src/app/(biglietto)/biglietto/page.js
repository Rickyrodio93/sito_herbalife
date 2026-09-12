"use client"
// import { ArrowRight, Wallet } from "lucide-react";
// import Image from "next/image";
// import { IoIosFootball, IoIosSave } from "react-icons/io";
// import { RiMessage2Line } from "react-icons/ri";
// import { FaLeaf, FaDna } from "react-icons/fa";
// import { MdBusinessCenter } from "react-icons/md";
// import DarkMode from "@/components/navbar/dark mode/darkMode";


const LINK = [
    {
        href: "https://shopbioniq.com/it-it/riccardorodio-personal-formula",
        icon: Dna,
        label: "Bioniq GO",
        nota: "Integratori formulati su misura",
        color: "text-sky-400",
        bg: "bg-sky-950/30 hover:bg-sky-900/40 border-sky-800/40"
    },
    {
        href: "https://www.riccardorodio.com",
        icon: Leaf,
        label: "Prodotti Herbalife",
        nota: "Nutrizione quotidiana",
        color: "text-emerald-400",
        bg: "bg-emerald-950/30 hover:bg-emerald-900/40 border-emerald-800/40"
    },
    {
        href: "https://www.riccardorodio.com/sport",
        icon: Trophy,
        label: "Prodotti Sportivi",
        nota: "Linea H24 pensata per il support degli sportivi",
        color: "text-amber-400",
        bg: "bg-amber-950/30 hover:bg-amber-900/40 border-amber-800/40"
    },
];

const BUSINESS_LINK = {
    href: "https://accounts.myherbalife.com/Account/Create?appId=1&qrFlow=1&locale=it-IT&SponsorId=kQkJ2BXpUJ4=&cmp=m_it_it_wbs_dssignup_btn_nap_copylink_20250305",
    icon: Briefcase,
    label: "Diventa Distributore",
    nota: "Entra nel mio team e crea la tua libertà finanziaria",
    color: "text-emerald-300",
    bg: "bg-gradient-to-r from-emerald-900/50 to-zinc-900 border-emerald-500/50 hover:border-emerald-400"
};

// export default function BigliettoDigitale() {
//     return (
//         <div
//             className="relative min-h-screen flex flex-col items-center justify-between px-6 py-18 md:py-5 font-poppins selection:bg-[#B08D57]/20 transition-colors duration-300
//             bg-[radial-gradient(circle_at_20%_15%,#fffdf8_0%,#f2ece0_55%,#e8e0cd_100%)]
//             dark:bg-[radial-gradient(circle_at_20%_15%,#1c2f26_0%,#0f1a15_45%,#0a120e_100%)]"
//         >
//             <style>{`
//         @keyframes sheen {
//           0% { transform: translateX(-120%) rotate(8deg); opacity: 0; }
//           15% { opacity: 1; }
//           55% { opacity: 0.9; }
//           100% { transform: translateX(120%) rotate(8deg); opacity: 0; }
//         }
//         .sheen-sweep { animation: sheen 2.2s ease-out 0.3s 1; }
//         @media (prefers-reduced-motion: reduce) {
//           .sheen-sweep { animation: none; }
//         }
//       `}</style>
//             <div className="fixed top-5 right-6 z-50 p-1 rounded-full border border-[#B08D57]/30 bg-[#14231D]/5 dark:bg-[#F6F3EC]/5 backdrop-blur-sm">
//                 <DarkMode />
//             </div>
//             <div className="w-full max-w-sm flex flex-col items-center grow justify-center">
//                 {/* CARTA */}
//                 <div className="relative w-full rounded-[1.75rem] bg-[#F6F3EC] dark:bg-[#14231D] border border-[#B08D57]/40 shadow-[0_20px_50px_-15px_rgba(20,35,29,0.25)] dark:shadow-[0_20px_50px_-15px_rgba(20,35,29,0.5)] px-8 pt-10 pb-8 overflow-hidden transition-colors duration-300">
//                     {/* riflesso metallico */}
//                     <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[1.75rem]">
//                         <div className="sheen-sweep absolute -top-1/2 left-0 h-[200%] w-1/3 bg-linear-to-r from-transparent via-[#B08D57]/25 to-transparent" />
//                     </div>

//                     {/* monogramma */}
//                     <span className="absolute top-5 right-6 font-rancho text-2xl text-[#B08D57]/70 tracking-wide">
//                         RR
//                     </span>

//                     {/* linea oro sottile */}
//                     {/* <div className="absolute top-0 left-8 right-8 h-px bg-linear-to-r from-transparent via-[#B08D57]/60 to-transparent" /> */}

//                     <div className="relative flex flex-col items-center text-center">
//                         <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#B08D57]/50 mb-5 bg-[#2F5233] shadow-lg">
//                             <Image
//                                 src="/immagini/profilo_1.webp"
//                                 alt="Riccardo Rodio"
//                                 fill
//                                 priority
//                                 sizes="96px"
//                                 className="object-cover"
//                             />
//                         </div>
//                         <h1 className="font-rancho text-4xl text-[#14231D] dark:text-[#F6F3EC] leading-none mb-2">
//                             Riccardo Rodio
//                         </h1>
//                         <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B08D57]">
//                             Consulente Benessere &amp; Integrazione
//                         </p>
//                     </div>
//                 </div>
//                 {/* AZIONI PRINCIPALI */}
//                 <div className="w-full grid grid-cols-2 gap-3 mt-6">
//                     <a
//                         href="/contatto.vcf"
//                         download
//                         className="flex flex-col items-center justify-center gap-1.5 py-4 bg-[#14231D] hover:bg-[#1c2f26] dark:bg-[#14231D] dark:hover:bg-[#1c2f26] text-[#F6F3EC] font-semibold rounded-2xl shadow-sm transition-all active:scale-[0.98] text-sm border dark:border-[#B08D57]"
//                     >
//                         <IoIosSave size={18} className="text-[#B08D57]" />
//                         Salva contatto
//                     </a>
//                     <a
//                         href="https://wa.me/393496635371"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="flex flex-col items-center justify-center gap-1.5 py-4 bg-[#2F5233] hover:bg-[#264429] text-[#F6F3EC] font-semibold rounded-2xl shadow-sm transition-all active:scale-[0.98] text-sm"
//                     >
//                         <RiMessage2Line size={18} className="text-[#B08D57]" />
//                         WhatsApp
//                     </a>
//                 </div>

//                 <button
//                     onClick={async () => {
//                         try {
//                             const res = await fetch("/api/wallet-link");
//                             const data = await res.json();
//                             if (data.url) {
//                                 window.location.href = data.url;
//                             }else {
//                                 alert("Errore nella generazione del Pass Google Wallet.")
//                             }
//                         } catch (err) {
//                             console.error(err)
//                         }
//                     }}
//                     // href="/api/wallet-link"
//                     // target="_blank"
//                     // rel="noopener noreferrer"
//                     className="w-full mt-3 flex justify-center items-center py-3.5 px-4 rounded-2xl bg-[#F6F3EC] dark:bg-[#14231D] border border-[#B08D57]/30 shadow-sm transition-all active:scale-[0.98] cursor-pointer"
//                 >
//                     <Image
//                         src="/immagini/google wallet/it_add_to_google_wallet_add-wallet-badge.svg"
//                         alt="Aggiungi a Google Wallet"
//                         width={197}
//                         height={25}
//                         className="md:hidden block object-contain"
//                         priority
//                     />
//                     <Image
//                         src="/immagini/google wallet/it_add_to_google_wallet_wallet-button.svg"
//                         alt="Aggiungi a Google Wallet"
//                         width={220}
//                         height={28}
//                         className="hidden md:block object-contain"
//                         priority
//                     />
//                 </button>

//                 {/* separatore editoriale */}
//                 <div className="w-full flex items-center gap-3 mt-9 mb-3">
//                     <div className="grow border-t border-[#14231D]/10 dark:border-[#F6F3EC]/10" />
//                     <span className="text-[10px] text-[#14231D]/50 dark:text-[#F6F3EC]/45 uppercase tracking-[0.25em] font-semibold">
//                         I miei link
//                     </span>
//                     <div className="grow border-t border-[#14231D]/10 dark:border-[#F6F3EC]/10" />
//                 </div>

//                 {/* elenco link, spina editoriale */}
//                 <div className="w-full relative pl-5">
//                     <div className="absolute left-1.5 top-2 bottom-2 w-px bg-[#14231D]/10 dark:bg-[#F6F3EC]/10" />
//                     <div className="flex flex-col">
//                         {LINK.map(({ href, icon: Icon, label, nota }) => (
//                             <a
//                                 key={label}
//                                 href={href}
//                                 target={href.startsWith("http") ? "_blank" : undefined}
//                                 rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
//                                 className="group relative flex items-center justify-between py-4 border-b border-[#14231D]/8 dark:border-[#F6F3EC]/8 last:border-0"
//                             >
//                                 <span className="absolute -left-5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#F6F3EC] dark:bg-[#0f1a15] border-2 border-[#B08D57]/50 group-hover:bg-[#B08D57] transition-colors" />
//                                 <span className="flex items-center gap-3.5">
//                                     <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#14231D]/6 dark:bg-[#F6F3EC]/8 text-[#2F5233] dark:text-[#2F5233] group-hover:bg-[#2F5233] group-hover:text-[#F6F3EC] transition-colors">
//                                         <Icon size={16} />
//                                     </span>
//                                     <span className="flex flex-col text-left">
//                                         <span className="font-semibold text-[#14231D] dark:text-[#F6F3EC] text-[15px]">
//                                             {label}
//                                         </span>
//                                         <span className="text-[11px] text-[#14231D]/50 dark:text-[#F6F3EC]/45">{nota}</span>
//                                     </span>
//                                 </span>
//                                 <ArrowRight
//                                     size={16}
//                                     className="text-[#14231D]/30 dark:text-[#F6F3EC]/30 group-hover:text-[#B08D57] group-hover:translate-x-0.5 transition-all"
//                                 />
//                             </a>
//                         ))}
//                     </div>
//                 </div>

//                 <div className="w-full flex items-center gap-3 mt-5 mb-3">
//                     <div className="grow border-t border-dashed border-[#b08d57]/30" />
//                     <span className="text-[10px] text-[#b08d57] uppercase tracking-[0.25em] font-semibold">
//                         Opportunità
//                     </span>
//                     <div className="grow border-t border-dashed border-[#b08d57]/30" />
//                 </div>
//                 <a
//                     href={BUSINESS_LINK.href}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="group w-full flex items-center justify-between py-4 px-4 rounded-2xl bg-[#B08D57]/8 border border-[#b08d57]/25 hover:border-[#b08d57]/50 transition-colors"
//                 >
//                     <span className="flex items-center gap-3.5">
//                         <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#b08d57]/15 text-[#b08d57] group-hover:bg-[#b08d57] group-hover:text-[#f6f3ec] transition-colors">
//                             <BUSINESS_LINK.icon size={16} />
//                         </span>
//                         <span className="flex flex-col text-left">
//                             <span className="font-semibold text-[#14231d] dark:text-[#f6f3ec] text-[15px]">
//                                 {BUSINESS_LINK.label}
//                             </span>
//                             <span className="text-[11px] text-[#14231D]/50 dark:text-[#F6F3EC]/45">{BUSINESS_LINK.nota}</span>
//                         </span>
//                     </span>
//                     <ArrowRight
//                         size={16}
//                         className="text-[#b08d57]/50 group-hover:text-[#b08d57] group-hover:translate-x-0.5 transition-all"
//                     />
//                 </a>
//             </div>

//             {/* footer */}
//             <div className="mt-12 text-center">
//                 <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B08D57] border border-[#B08D57]/30 rounded-full px-3 py-1 mb-3">
//                     Distributore Indipendente
//                 </span>
//                 <p className="text-[11px] text-[#14231D]/40 dark:text-[#F6F3EC]/40">
//                     © {new Date().getFullYear()} Riccardo Rodio — Tutti i diritti riservati.
//                 </p>
//             </div>
//         </div>
//     );
// }

import { Briefcase, Check, ChevronRight, Dna, Leaf, MessageCircle, Phone, Share2, Sparkles, Trophy, UserPlus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function BigliettoDigitale() {
    const [copied, setCopied] = useState(false);
    const [loadingWallet, setLoadingWallet] = useState(false);

    // Gestore per la generazione e redirect verso Google Wallet
    const handleGoogleWallet = async () => {
        try {
            setLoadingWallet(true);
            const res = await fetch("/api/wallet-link");
            const data = await res.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                alert("Impossibile generare il pass in questo momento.")
            }
        } catch (err) {
            console.error("Errore durante la richiesta del pass:", err);
            alert("Si è verificato un errore di connessione.");
        } finally {
            setLoadingWallet(false)
        }
    };

    // funzione di condivisione
    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: "Riccardo Rodio - Consulente Benessere",
                text: "Salva i miei contatti e naviga nei servizi di nutrizione su misura.",
                url: window.location.href,
            }).catch(() => { });
        } else {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    }

    return (
        <main className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans selection:bg-emerald-500 selection-text-white">
            {/* sfondi glow effects */}
            <div className="absolute top-1/4 -left-20 w-72 h-72 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-sky-600/20 rounded-full blur-3xl pointer-events-none" />

            <div className="w-full max-w-md relative z-10 my-8">

                {/* card principale glassmorfica */}
                <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl transition-all">

                    {/* header card */}
                    <div className="flex flex-col items-center text-center">

                        <div className="relative mb-4">
                            <div className="w-28 h-28 rounded-full p-1 bg-linear-to-tr from-emerald-500 via-sky-500 to-emerald-400 shadow-lg">
                                <div className="relative w-full h-full rounded-full overflow-hidden bg-zinc-900">
                                    <Image
                                        src="/immagini/profilo_1.webp"
                                        alt="Riccardo Rodio"
                                        fill
                                        sizes="112px"
                                        priority
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                            <span className="absolute bottom-1 right-1 bg-emerald-500 p-1.5 rounded-full border-2 border-zinc-900 text-zinc-950">
                                <Sparkles size={14} className="fill-current" />
                            </span>
                        </div>

                        <span className="text-xs uppercase tracking-widest font-bold text-emerald-400 mb-1">
                            Consulente del Benessere
                        </span>
                        <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white">
                            Riccardo Rodio
                        </h1>

                        <p className="text-xs text-zinc-400 mt-1 max-w-xs leading-relaxed">
                            Distributore Indipendente Herbalife & Partner Bioniq
                        </p>
                    </div>

                    <a
                        href="/contatto.vcf"
                        download="Riccardo_Rodio_Consulente_Benessere.vcf"
                        className="w-full mt-6 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-linear-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-sm shadow-lg shadow-emerald-950/50 transition-all active:scale-[0.98]"
                    >
                        <UserPlus size={18} />
                        <span>Salva Contatto in Rubrica</span>
                    </a>

                    {/* Actions Buttons */}
                    <div className="grid grid-cols-2 gap-3 mt-6">
                        <a
                            href="https://wa.me/393496635371"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all active:scale-[0.98] shadow-md shadow-emerald-950/40"
                        >
                            <MessageCircle size={18} />
                            <span>WhatsApp</span>
                        </a>
                        <a
                            href="tel:+393496635371"
                            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold text-sm border border-zinc-700/60 transition-all active:scale-[0.98]"
                        >
                            <Phone size={18} />
                            <span>Chiama</span>
                        </a>
                    </div>

                    {/* Aggiungi a Google Wallet */}
                    <div className="mt-6 pt-6 border-t border-zinc-800/80">
                        <span className="block text-[11px] uppercase tracking-widest text-zinc-500 font-bold mb-3 text-center">
                            Tessera digitale Wallet
                        </span>

                        <button
                            onClick={handleGoogleWallet}
                            disabled={loadingWallet}
                            className="w-full flex items-center justify-center py-3 px-4 rounded-2xl bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 shadow-md transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50 group"
                        >
                            {loadingWallet ? (
                                <span className="text-xs text-zinc-400 animate-pulse">Generazione pass in corso...</span>
                            ) : (
                                <Image
                                    src="/immagini/google wallet/it_add_to_google_wallet_wallet-button.svg"
                                    alt="Aggiungi a Google Wallet"
                                    width={210}
                                    height={32}
                                    className="object-contain group-hover:scale-105 transition-transform" />
                            )}
                        </button>
                    </div>

                    {/* Link importanti */}
                    <div className="mt-5 pt-5 border-t border-zinc-800/80 space-y-2.5">
                        <span className="block text-[11px] uppercase tracking-widest text-zinc-500 font-bold mb-2.5 text-center">
                            Link Utili
                        </span>

                        {LINK.map((item, index) => {
                            const IconComponent = item.icon;
                            return (
                                <a
                                    key={index}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center justify-between p-3 rounded-xl border text-xs transition-all ${item.bg}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <IconComponent size={18} className={item.color} />
                                        <div className="flex flex-col text-left">
                                            <span className="font-bold text-zinc-100">{item.label}</span>
                                            <span className="text-[10px] text-zinc-400">{item.nota}</span>
                                        </div>
                                    </div>
                                    <ChevronRight size={14} className="text-zinc-500" />
                                </a>
                            )
                        })}

                        <a
                            href={BUSINESS_LINK.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center justify-between p-3 rounded-xl border text-xs transition-all mt-3 ${BUSINESS_LINK.bg}`}
                        >
                            <div className="flex items-center gap-3">
                                <BUSINESS_LINK.icon size={18} className={BUSINESS_LINK.color} />
                                <div className="flex flex-col text-left">
                                    <span className="font-bold text-white">{BUSINESS_LINK.label}</span>
                                    <span className="text-[10px] text-zinc-300">{BUSINESS_LINK.nota}</span>
                                </div>
                            </div>
                            <ChevronRight size={14} className="text-zinc-400" />
                        </a>
                    </div>

                    {/* Pulsante Condividi Biglietto */}
                    <button
                        onClick={handleShare}
                        className="w-full mt-5 flex items-center justify-center gap-2 py-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    >
                        {copied ? (
                            <>
                                <Check size={14} className="text-emerald-400" />
                                <span className="text-emerald-400">Link copiato negli appunti!</span>
                            </>
                        ) : (
                            <>
                                <Share2 size={14} />
                                <span>Condividi questo Biglietto</span>
                            </>
                        )}
                    </button>

                </div>

                {/* Footer info legale / Brand copyright */}
                <p className="text-[10px] text-center text-zinc-600 mt-4 leading-normal">
                    © {new Date().getFullYear()} Riccardo Rodio — Distributore Indipendente Herbalife.<br />
                    Nutrizione di precisione Bioniq & Wellness Coaching.
                </p>
            </div>
        </main>
    )
}