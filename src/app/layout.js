import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import ClientLogic from "@/components/clientLogic";
import Footer from "@/components/footer/Footer";
import Script from "next/script";

export const metadata = {
  title: {
    default: "Riccardo Rodio | Distributore Indipendente Herbalife",
    template: "%s | Riccardo Rodio"
  },
  description: "Benvenuto sul sito di Riccardo Rodio. Scopri i prodotti Herbalife e l'opportunità di collaborare con me.",
  keywords: ["Herbalife", "Riccardo Rodio", "Controllo Peso", "Integratori Sportivi", "Herbalife24"],
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
    title: "Riccardo Rodio | Distributore Indipendente Herbalife",
    description: "Scopri i prodotti Herbalife e trasforma la tua forma fisica con una consulenza personalizzata.",
    url: "https://www.riccardorodio.com",
    siteName: "Riccardo Rodio Herbalife",
    locale: "it_IT",
    type: "website",
    images: [
      {
        url: "https://www.riccardorodio.com/immagini/background/home.webp",
        width: 1200,
        height: 630,
        alt: "Riccardo Rodio - Distributore Indipendente Herbalife"
      }
    ]
  },

  // twitter card
  twitter: {
    card: "summary_large_image", // Mostra la card con l'immagine grande, molto più cliccata
    title: "Riccardo Rodio | Distributore Indipendente Herbalife",
    description: "Scopri i prodotti Herbalife e trasforma la tua forma fisica.",
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
    <html lang="it-IT" dir="ltr" data-theme="light">
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
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
      </head>
      <body>
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
      </body>
    </html>
  );
}
