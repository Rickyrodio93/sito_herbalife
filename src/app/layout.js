import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import ClientLogic from "@/components/clientLogic";
import Footer from "@/components/footer/Footer";
import Script from "next/script";
import DisclaimerPopup from "@/components/DisclaimerPopup";
import AssistantChat from "@/components/assistantChat/AssistantChat";

export const metadata = {
  title: {
    default: "Acquista Prodotti Herbalife e Bioniq | Riccardo Rodio Distributore",
    template: "%s | Riccardo Rodio"
  },
  description: "Ordina i prodotti integrativi Herbalife e la linea personalizzata Bioniq. Scopri il catalogo completo e calcola il tuo preventivo tramite Distributore Indipendente.",
  keywords: [
    "Herbalife",
    "Bioniq",
    "Herbalife Varese",
    "Bioniq Varese",
    "Integratori Varese",
    "Acquista Herbalife",
    "Bioniq Italia",
    "Bioniq Herbalife",
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
    title: "Acquista Prodotti Herbalife e Bioniq | Riccardo Rodio",
    description: "Ordina i prodotti Herbalife e la linea su misura Bioniq. Calcola il tuo preventivo personalizzato e trasforma il tuo benessere.",
    url: "https://www.riccardorodio.com",
    siteName: "Riccardo Rodio Herbalife & Bioniq",
    locale: "it_IT",
    type: "website",
    images: [
      {
        url: "https://www.riccardorodio.com/immagini/background/home.webp",
        width: 1200,
        height: 630,
        alt: "Riccardo Rodio - Distributore Indipendente Herbalife e Bioniq"
      }
    ]
  },

  // twitter card
  twitter: {
    card: "summary_large_image",
    title: "Acquista Prodotti Herbalife e Bioniq | Riccardo Rodio",
    description: "Ordina i prodotti Herbalife e la linea di integratori su misura Bioniq. Calcola ora il tuo preventivo.",
    images: ["https://www.riccardorodio.com/immagini/background/home.webp"],
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
        <Navbar />
        {children}
        <Footer />
        <DisclaimerPopup />
        <AssistantChat />
      </body>
    </html>
  );
}
