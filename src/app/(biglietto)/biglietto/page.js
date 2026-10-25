"use client"

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