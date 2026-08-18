import "@/app/(riccardorodio.com)/globals.css";
import ClientLogic from "@/components/clientLogic";
import Script from "next/script";

export const metadata = {
  title: {
    default: "nutrizione Personalizzata Herbalife e Bioniq | Riccardo Rodio",
    template: "%s | Riccardo Rodio"
  },
  description: "Consulenza nutrizionale personalizzata con Herbalife e analisi dei biomarcatori Bioniq. Scopri il tuo percorso di benessere su misura con Riccardo Rodio.",
  keywords: [
    "Nutrizione personalizzata",
    "Analisi biomarcatori",
    "Consulenza nutrizionale",
    "Bioniq",
    "Herbalife",
    "Bioniq Italia",
    "Bioniq Herbalife",
    "Herbalife Varese",
    "Bioniq Varese",
    "Integratori Varese",
    "Riccardo Rodio",
    "Controllo Peso",
    "Integratori Sportivi",
    "Integratori Personalizzati",
    "Herbalife24"
  ],
  authors: [{ name: "Riccardo Rodio", url: "https://www.riccardorodio.com" }],
  creator: "Riccardo Rodio",
  publisher: "Riccardo Rodio",
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://www.riccardorodio.com",
    languages: {
      "it-IT": "https://www.riccardorodio.com"
    }
  },
  // open graph
  openGraph: {
    title: "Nutrizione Personalizzata Herbalife & Bioniq | Riccardo Rodio",
    description: "Consulenza nutrizionale personalizzata basata sull'analisi dei tuoi biomarcatori. Scopri il percorso di benessere pensato sulle tue reali esigenze.",
    url: "https://www.riccardorodio.com",
    siteName: "Riccardo Rodio Herbalife & Bioniq",
    locale: "it_IT",
    type: "website",
    images: [
      {
        url: "https://www.riccardorodio.com/immagini/background/home_hero_3to1.webp",
        width: 1200,
        height: 630,
        alt: "Riccardo Rodio - Distributore Indipendente Herbalife e Bioniq"
      }
    ]
  },

  // twitter card
  twitter: {
    card: "summary_large_image",
    title: "Nutrizione Personalizzata Herbalife & Bioniq | Riccardo Rodio",
    description: "Consulenza nutrizionale personalizzata basata sull'analisi dei tuoi biomarcatori con Herbalife e Bioniq.",
    images: ["https://www.riccardorodio.com/immagini/background/home_hero_3to1.webp"],
  },
  // favicon
  icons: {
    icon: "/immagini/logo.ico",
    shortcut: "",
    apple: "/immagini/logo.ico"
  }
}
export default function RootLayout({ children }) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="it-IT" dir="ltr">
      <body className="bg-gray-200 dark:bg-p selection:bg-herbalife-3 dark:selection:bg-herbalife-1 selection:text-white">
        <Script
          id="theme-color"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            (function () {
              function updateThemeColor() {
                // 1. Controlla l'attributo data-theme sull'elemento <html> o le preferenze di sistema
                var currentTheme = document.documentElement.getAttribute('data-theme');
                var isDark = currentTheme === 'dark' || (!currentTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);

                // 2. Trova o crea il meta tag theme-color
                var meta = document.querySelector('meta[name="theme-color"]');
                if (!meta) {
                  meta = document.createElement('meta');
                  meta.name = 'theme-color';
                  document.head.appendChild(meta);
                }
          
                // 3. Applica il colore corretto alla barra del browser
                meta.content = isDark ? '#09090b' : '#266431';
              }
        
              // Esegui subito al caricamento iniziale
              updateThemeColor();

              // Ascolta i cambiamenti di sistema operativo
              window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateThemeColor);

              // Osserva i cambi dinamici dell'attributo data-theme (quando l'utente usa il toggle sul sito)
              var observer = new MutationObserver(updateThemeColor);
              observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
              })();
          `,
          }}
        />
        <Script
          id="gtm-script"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${gtmId}');
            `,
          }}
        />
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}

<ClientLogic />
        {/* 
        <Navbar /> */}
        {children}
        {/* <Footer />
        <DisclaimerPopup />
        <AssistantChat /> */}
      </body>
    </html>
  );
}
