import { Store, TrendingDown, Trophy, ChefHat, Banana, Bath, BookOpen, Calculator, Network, LetterText, Microscope, ScanLine } from "lucide-react";

export const Menus = [
    {
        name: "Home",
        link: "/"
    },
    {
        name: "Prodotti",
        subMenuHeading: ["", ""],
        subMenu: [
            {
                name: "store online",
                desc: "acquista i prodotti online",
                link: "https://riccardorodio.goherbalife.com/Catalog/Home/Index/it-IT",
                icon: Store,
            },
            {
                name: "controllo del peso",
                desc: "prodotti studiati per la perdita e il controllo del peso",
                link: "/controlloPeso",
                icon: TrendingDown
            },
            {
                name: "ottimizza la nutrizione",
                desc: "integratori specifici per ogni esigenza",
                link: "/ottimizza",
                icon: Banana
            },
            {
                name: "sport",
                desc: "la nostra linea sportiva per il supporto nelle 24h",
                link: "/sport",
                icon: Trophy
            },
            {
                name: "cura della pelle e del corpo",
                desc: "scopri la nostra linea skin dedicata alla tua pelle",
                link: "/skin",
                icon: Bath
            },
            {
                name: "skin AI",
                desc: "consulenza personalizzata con IA per la pelle del viso",
                link:"https://www.hlskin.ai/customer/68d8040a900d82b0b94c0c33",
                icon: ScanLine
            },
            {
                name: "ricette",
                desc: "ricette da tutto il mondo con l'uso dei prodotti",
                link: "/ricette",
                icon: ChefHat
            },
            {
                name: "scienza dei prodotti",
                desc: "la scienza dietro ai prodotti n° 1 al mondo",
                link: "/scienza",
                icon: Microscope
            },
            {
                name: "catalogo on-line",
                desc: "acquista direttamente online tutti i prodotti",
                link: "https://assets.herbalifenutrition.com/content/dam/regional/emea/it_it/consumable_content/marketing_materials/brochure/2022/03-Mar/product-brochure-it.pdf/_jcr_content/renditions/original.",
                icon: BookOpen
            },
            {
                name: "preventivo",
                desc: "genera un preventivo gratuito per il tuo ordine",
                link: "/preventivo",
                icon: Calculator
            },
        ],
        gridCols: 2,
    },
    {
        name: "Contatti",
        link: "/contatti"
    },
    {
        name: "Business",
        subMenu: [
            {
                name: "opportunità di lavoro",
                desc: "scopri l'incredibile opportunità di lavoro che offre Herbalife",
                link: "/business",
                icon: Network
            },
            {
                name: "entra nel team",
                desc: "compila il form ed entra a far parte del mio team",
                link: "https://accounts.myherbalife.com/Account/Create?appId=1&qrFlow=1&locale=it-IT&SponsorId=kQkJ2BXpUJ4=&cmp=m_it_it_wbs_dssignup_btn_nap_copylink_20250305",
                icon: LetterText
            }
        ], gridCols: 1
    }
]