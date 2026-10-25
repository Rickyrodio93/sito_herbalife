"use client";

import Image from "next/image";
import {
  Store,
  TrendingDown,
  Trophy,
  ChefHat,
  Banana,
  Bath,
  BookOpen,
  Calculator,
  Network,
  LetterText,
  Microscope,
  ScanLine,
  Cylinder,
  Home,
  Grid,
  Phone,
  Briefcase,
} from "lucide-react";
import DarkMode from "./dark mode/darkMode";
import DesktopMenu from "./DesktopMenu";
import MobMenu from "./MobMenu.jsx";
import ProgressBar from "./progressBar.jsx";
import Link from "next/link.js";
import { useState } from "react";

const Menus = [
  {
    name: "Home",
    link: "/",
    icon: Home
  },
  {
    name: "Prodotti",
    icon: Grid,
    subMenu: [
      // --- Percorsi ---
      { group: "Percorsi", name: "formulazioni personalizzate", desc: "Integratori quotidiani basati sulle tue informazioni personali e sui tuoi obiettivi di benessere", link: "/bioniq", icon: Cylinder },
      { group: "Percorsi", name: "controllo del peso", desc: "prodotti studiati per la perdita e il controllo del peso", link: "/controlloPeso", icon: TrendingDown },
      { group: "Percorsi", name: "ottimizza la nutrizione", desc: "integratori specifici per ogni esigenza", link: "/ottimizza", icon: Banana },
      { group: "Percorsi", name: "sport", desc: "la nostra linea sportiva per il supporto nelle 24h", link: "/sport", icon: Trophy },
      { group: "Percorsi", name: "cura della pelle e del corpo", desc: "scopri la nostra linea skin dedicata alla tua pelle", link: "/skin", icon: Bath },
      { group: "Percorsi", name: "skin AI", desc: "consulenza personalizzata con IA per la pelle del viso", link: "https://www.hlskin.ai/customer/68d8040a900d82b0b94c0c33", icon: ScanLine },
      // --- Scopri ---
      { group: "Scopri", name: "ricette", desc: "ricette da tutto il mondo con l'uso dei prodotti", link: "/ricette", icon: ChefHat },
      { group: "Scopri", name: "scienza dei prodotti", desc: "la scienza dietro ai prodotti n° 1 al mondo", link: "/scienza", icon: Microscope },
      { group: "Scopri", name: "catalogo on-line", desc: "sfoglia il catalogo completo dei prodotti", link: "https://assets.herbalifenutrition.com/content/dam/regional/emea/it_it/consumable_content/marketing_materials/brochure/2022/03-Mar/product-brochure-it.pdf/_jcr_content/renditions/original.", icon: BookOpen },
      // --- Acquista ---
      { group: "Acquista", name: "store online", desc: "acquista i prodotti online", link: "https://riccardorodio.goherbalife.com/Catalog/Home/Index/it-IT", icon: Store },
      { group: "Acquista", name: "preventivo", desc: "genera un preventivo gratuito per il tuo ordine", link: "/preventivo", icon: Calculator },
    ],
  
  },
  {
    name: "Preventivo",
    link: "/preventivo",
    desktopHidden: true
  },
  {
    name: "Contatti",
    link: "/contatti",
    icon: Phone,
  },
  {
    name: "Business",
    icon: Briefcase,
    subMenu: [
      {
        name: "opportunità di lavoro",
        desc: "scopri l'incredibile opportunità di lavoro che offre Herbalife",
        link: "/business",
        icon: Network,
      },
      {
        name: "entra nel team",
        desc: "compila il form ed entra a far parte del mio team",
        link: "https://accounts.myherbalife.com/Account/Create?appId=1&qrFlow=1&locale=it-IT&SponsorId=kQkJ2BXpUJ4=&cmp=m_it_it_wbs_dssignup_btn_nap_copylink_20250305",
        icon: LetterText,
      },
    ],
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [clicked, setClicked] = useState(null);

  // funzione per azzerare e chiudere tutto quando si cambia pagina
  const closeAll = () => {
    setIsOpen(false);
    setClicked(null);
  };

  return (
    <>
      <header className="fixed z-40 top-2 left-2 right-2 lg:top-2 lg:left-0 lg:right-0 max-w-5xl lg:mx-auto rounded-full border border-line bg-card/90 backdrop-blur-md text-[15px] shadow-nav transition-all duration-300">
        <div className="px-4 py-2 flex items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr] w-full">
          {/* Logo */}
          <Link href="/" title="Home" className="flex items-center justify-self-start">
            <Image
              src="/immagini/distributore_indipendente_orizzontale.png"
              height={60}
              width={240}
              alt="logo orizzontale"
              className="h-8 sm:h-10 w-auto object-contain transition-opacity hover:opacity-90"
              onClick={closeAll}
              priority
            />
          </Link>

          <ul className="hidden lg:flex lg:items-center gap-x-1 text-zinc-700 dark:text-zinc-200 font-medium">
            {Menus.filter((m) => !m.desktopHidden).map((menu) => (
              <DesktopMenu menu={menu} key={menu.name} />
            ))}
          </ul>

          {/* DarkMode Toggle */}
          <div className="flex items-center gap-x-2 lg:justify-self-end">
            <DarkMode />
          </div>
        </div>
        <ProgressBar />
      </header>

      <MobMenu  Menus={Menus} closeAll={closeAll}/>
    </>
  );
}
