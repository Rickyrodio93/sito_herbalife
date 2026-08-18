import { ArrowRight, Wallet } from "lucide-react";
import Image from "next/image";
import { IoIosFootball, IoIosSave } from "react-icons/io";
import { RiMessage2Line } from "react-icons/ri";
import { FaLeaf, FaDna } from "react-icons/fa";
import { MdBusinessCenter } from "react-icons/md";
import DarkMode from "@/components/navbar/dark mode/darkMode";

const LINK = [
    {
        href: "https://shopbioniq.com/it-it/riccardorodio-personal-formula",
        icon: FaDna,
        label: "Bioniq GO",
        nota: "Integratori formulati su misura",
    },
    {
        href: "https://www.riccardorodio.com",
        icon: FaLeaf,
        label: "Prodotti Herbalife",
        nota: "Nutrizione quotidiana",
    },
    {
        href: "https://www.riccardorodio.com/sport",
        icon: IoIosFootball,
        label: "Prodotti Sportivi",
        nota: "Linea H24 pensata per il support degli sportivi"
    },
];

const BUSINESS_LINK = {
    href: "https://accounts.myherbalife.com/Account/Create?appId=1&qrFlow=1&locale=it-IT&SponsorId=kQkJ2BXpUJ4=&cmp=m_it_it_wbs_dssignup_btn_nap_copylink_20250305",
    icon: MdBusinessCenter,
    label: "Diventa Distributore",
    nota: "Entra nel mio team e crea la tua libertà finanziaria",
};

export default function BigliettoDigitale() {
    return (
        <div
            className="relative min-h-screen flex flex-col items-center justify-between px-6 py-18 md:py-5 font-poppins selection:bg-[#B08D57]/20 transition-colors duration-300
            bg-[radial-gradient(circle_at_20%_15%,#fffdf8_0%,#f2ece0_55%,#e8e0cd_100%)]
            dark:bg-[radial-gradient(circle_at_20%_15%,#1c2f26_0%,#0f1a15_45%,#0a120e_100%)]"
        >
            <style>{`
        @keyframes sheen {
          0% { transform: translateX(-120%) rotate(8deg); opacity: 0; }
          15% { opacity: 1; }
          55% { opacity: 0.9; }
          100% { transform: translateX(120%) rotate(8deg); opacity: 0; }
        }
        .sheen-sweep { animation: sheen 2.2s ease-out 0.3s 1; }
        @media (prefers-reduced-motion: reduce) {
          .sheen-sweep { animation: none; }
        }
      `}</style>
            <div className="fixed top-5 right-6 z-50 p-1 rounded-full border border-[#B08D57]/30 bg-[#14231D]/5 dark:bg-[#F6F3EC]/5 backdrop-blur-sm">
                <DarkMode />
            </div>
            <div className="w-full max-w-sm flex flex-col items-center grow justify-center">
                {/* CARTA */}
                <div className="relative w-full rounded-[1.75rem] bg-[#F6F3EC] dark:bg-[#14231D] border border-[#B08D57]/40 shadow-[0_20px_50px_-15px_rgba(20,35,29,0.25)] dark:shadow-[0_20px_50px_-15px_rgba(20,35,29,0.5)] px-8 pt-10 pb-8 overflow-hidden transition-colors duration-300">
                    {/* riflesso metallico */}
                    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[1.75rem]">
                        <div className="sheen-sweep absolute -top-1/2 left-0 h-[200%] w-1/3 bg-linear-to-r from-transparent via-[#B08D57]/25 to-transparent" />
                    </div>

                    {/* monogramma */}
                    <span className="absolute top-5 right-6 font-rancho text-2xl text-[#B08D57]/70 tracking-wide">
                        RR
                    </span>

                    {/* linea oro sottile */}
                    {/* <div className="absolute top-0 left-8 right-8 h-px bg-linear-to-r from-transparent via-[#B08D57]/60 to-transparent" /> */}

                    <div className="relative flex flex-col items-center text-center">
                        <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#B08D57]/50 mb-5 bg-[#2F5233] shadow-lg">
                            <Image
                                src="/immagini/profilo_1.webp"
                                alt="Riccardo Rodio"
                                fill
                                priority
                                sizes="96px"
                                className="object-cover"
                            />
                        </div>
                        <h1 className="font-rancho text-4xl text-[#14231D] dark:text-[#F6F3EC] leading-none mb-2">
                            Riccardo Rodio
                        </h1>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B08D57]">
                            Consulente Benessere &amp; Integrazione
                        </p>
                    </div>
                </div>
                {/* AZIONI PRINCIPALI */}
                <div className="w-full grid grid-cols-2 gap-3 mt-6">
                    <a
                        href="/contatto.vcf"
                        download
                        className="flex flex-col items-center justify-center gap-1.5 py-4 bg-[#14231D] hover:bg-[#1c2f26] dark:bg-[#14231D] dark:hover:bg-[#1c2f26] text-[#F6F3EC] font-semibold rounded-2xl shadow-sm transition-all active:scale-[0.98] text-sm border dark:border-[#B08D57]"
                    >
                        <IoIosSave size={18} className="text-[#B08D57]" />
                        Salva contatto
                    </a>
                    <a
                        href="https://wa.me/393496635371"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center gap-1.5 py-4 bg-[#2F5233] hover:bg-[#264429] text-[#F6F3EC] font-semibold rounded-2xl shadow-sm transition-all active:scale-[0.98] text-sm"
                    >
                        <RiMessage2Line size={18} className="text-[#B08D57]" />
                        WhatsApp
                    </a>
                </div>

                <a
                    href="/api/wallet-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full mt-3 flex justify-center items-center py-3.5 px-4 rounded-2xl bg-[#F6F3EC] dark:bg-[#14231D] border border-[#B08D57]/30 shadow-sm transition-all active:scale-[0.98] hover:border-[#B08D57]/60"
                >
                    <Image
                        src="/immagini/google wallet/it_add_to_google_wallet_add-wallet-badge.svg"
                        alt="Aggiungi a Google Wallet"
                        width={197}
                        height={25}
                        className="md:hidden block object-contain"
                        priority
                    />
                    <Image
                        src="/immagini/google wallet/it_add_to_google_wallet_wallet-button.svg"
                        alt="Aggiungi a Google Wallet"
                        width={220}
                        height={28}
                        className="hidden md:block object-contain"
                        priority
                    />
                </a>

                {/* separatore editoriale */}
                <div className="w-full flex items-center gap-3 mt-9 mb-3">
                    <div className="grow border-t border-[#14231D]/10 dark:border-[#F6F3EC]/10" />
                    <span className="text-[10px] text-[#14231D]/50 dark:text-[#F6F3EC]/45 uppercase tracking-[0.25em] font-semibold">
                        I miei link
                    </span>
                    <div className="grow border-t border-[#14231D]/10 dark:border-[#F6F3EC]/10" />
                </div>

                {/* elenco link, spina editoriale */}
                <div className="w-full relative pl-5">
                    <div className="absolute left-1.5 top-2 bottom-2 w-px bg-[#14231D]/10 dark:bg-[#F6F3EC]/10" />
                    <div className="flex flex-col">
                        {LINK.map(({ href, icon: Icon, label, nota }) => (
                            <a
                                key={label}
                                href={href}
                                target={href.startsWith("http") ? "_blank" : undefined}
                                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                                className="group relative flex items-center justify-between py-4 border-b border-[#14231D]/8 dark:border-[#F6F3EC]/8 last:border-0"
                            >
                                <span className="absolute -left-5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#F6F3EC] dark:bg-[#0f1a15] border-2 border-[#B08D57]/50 group-hover:bg-[#B08D57] transition-colors" />
                                <span className="flex items-center gap-3.5">
                                    <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#14231D]/6 dark:bg-[#F6F3EC]/8 text-[#2F5233] dark:text-[#2F5233] group-hover:bg-[#2F5233] group-hover:text-[#F6F3EC] transition-colors">
                                        <Icon size={16} />
                                    </span>
                                    <span className="flex flex-col text-left">
                                        <span className="font-semibold text-[#14231D] dark:text-[#F6F3EC] text-[15px]">
                                            {label}
                                        </span>
                                        <span className="text-[11px] text-[#14231D]/50 dark:text-[#F6F3EC]/45">{nota}</span>
                                    </span>
                                </span>
                                <ArrowRight
                                    size={16}
                                    className="text-[#14231D]/30 dark:text-[#F6F3EC]/30 group-hover:text-[#B08D57] group-hover:translate-x-0.5 transition-all"
                                />
                            </a>
                        ))}
                    </div>
                </div>

                <div className="w-full flex items-center gap-3 mt-5 mb-3">
                    <div className="grow border-t border-dashed border-[#b08d57]/30" />
                    <span className="text-[10px] text-[#b08d57] uppercase tracking-[0.25em] font-semibold">
                        Opportunità
                    </span>
                    <div className="grow border-t border-dashed border-[#b08d57]/30" />
                </div>
                <a
                    href={BUSINESS_LINK.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-full flex items-center justify-between py-4 px-4 rounded-2xl bg-[#B08D57]/8 border border-[#b08d57]/25 hover:border-[#b08d57]/50 transition-colors"
                >
                    <span className="flex items-center gap-3.5">
                        <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#b08d57]/15 text-[#b08d57] group-hover:bg-[#b08d57] group-hover:text-[#f6f3ec] transition-colors">
                            <BUSINESS_LINK.icon size={16} />
                        </span>
                        <span className="flex flex-col text-left">
                            <span className="font-semibold text-[#14231d] dark:text-[#f6f3ec] text-[15px]">
                                {BUSINESS_LINK.label}
                            </span>
                            <span className="text-[11px] text-[#14231D]/50 dark:text-[#F6F3EC]/45">{BUSINESS_LINK.nota}</span>
                        </span>
                    </span>
                    <ArrowRight
                        size={16}
                        className="text-[#b08d57]/50 group-hover:text-[#b08d57] group-hover:translate-x-0.5 transition-all"
                    />
                </a>
            </div>

            {/* footer */}
            <div className="mt-12 text-center">
                <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B08D57] border border-[#B08D57]/30 rounded-full px-3 py-1 mb-3">
                    Distributore Indipendente
                </span>
                <p className="text-[11px] text-[#14231D]/40 dark:text-[#F6F3EC]/40">
                    © {new Date().getFullYear()} Riccardo Rodio — Tutti i diritti riservati.
                </p>
            </div>
        </div>
    );
}