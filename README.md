# 🍃 Herbalife Wellness & Cart Configurator

Un'applicazione web ad alte prestazioni sviluppata con **Next.js**, progettata per digitalizzare, ottimizzare e semplificare l'esperienza di acquisto e la gestione dei preventivi per i prodotti Herbalife. 

Lo strumento offre un'interfaccia intuitiva sia per i clienti finali, sia per la rete vendita (Clienti Privilegiati e Distributori), integrando un motore di calcolo fiscale dinamico e flessibile in tempo reale.

🌐 **sito online** [https://www.riccardorodio.com](riccardorodio.com)

---

## ✨ Funzionalità Principali

* **🚀 Architettura Next.js:** Migrazione completata con successo da React SPA a Next.js, garantendo caricamenti istantanei, ottimizzazione delle immagini di copertina (`next/image`) e una struttura a componenti scalabile.
* **🧮 Motore di Calcolo Fiscale Avanzato:** Calcolo immediato dei prezzi personalizzato in base al ruolo dell'utente:
    * *Cliente Standard:* Prezzo di listino al pubblico comprensivo di spese accessorie e IVA.
    * *Cliente Privilegiato (CP):* Sconti progressivi (Bronze 22%, Silver 31%, Gold 42%) applicati sulla base sconto.
    * *Distributore (DS):* Gestione dei piani di guadagno e regime fiscale a seconda della finalità (Uso Personale, Vendita Occasionale, Vendita Abituale sotto/sopra la soglia INPS dei 6.410€/anno).
* **📋 Riepilogo Scontrino Dinamico (Sticky):** Un pannello di riepilogo desktop in modalità *sticky* con effetto visivo "paper" che segue l'utente durante la navigazione della tabella prodotti senza perdere il focus sul carrello.
* **📑 Modal Universale dei Prezzi:** Un pop-up dettagliato che mostra la distinta dell'ordine. Per i profili business (DS/CP) introduce colonne dedicate per lo **sconto unitario** e il **risparmio complessivo** accumulato.
* **🔌 Integrazione Direct Link & Social:**
    * Generazione automatica di link crittografati per l'invio immediato dell'ordine precompilato su **WhatsApp**.
    * Deep-linking verso **MyHerbalife** (`/Ds` o `/Mb`) per i distributori, permettendo di caricare i codici SKU direttamente nel carrello ufficiale con un clic.
* **🎨 UI/UX Moderna & Dark Mode:** Interfaccia rifinita con Tailwind CSS, animazioni fluide guidate da Framer Motion e pieno supporto alla modalità scura.

---

## 🛠️ Tech Stack

* **Framework:** [Next.js](https://nextjs.org/) (App Router / Pages Router)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Animazioni:** [Framer Motion](https://www.framer.com/motion/)
* **Icone:** [Lucide React](https://lucide.dev/)
* **State Management & Portals:** React Context & React DOM Portals

---

## 📦 Installazione e Avvio Locale

Assicurati di avere [Node.js](https://nodejs.org/) installato sul tuo computer.

1. **Clona il repository:**
   ```bash
   git clone [https://github.com/tuo-username/nome-repo.git](https://github.com/tuo-username/nome-repo.git)
   cd nome-repo

3. **Installa le dipendenze:**

```
npm install
# oppure
yarn install
# oppure
pnpm install
```

4. **Avvia il server di sviluppo:**

```
npm run dev
```

Apri http://localhost:3000 sul tuo browser per vedere l'applicazione in funzione.

5. **Generazione della build di produzione**

```
npm run build
npm run start
```

---

## 📁 Struttura del Progetto

- src/components/: Contiene tutti i componenti React (Navbar Riga, Tabella, ecc.).

- src/utils/: Funzioni di utilità, configurazione GTM e logica di calcolo.

- public/: Asset statici come icone e immagini dei prodotti.

- vercel.json: Configurazione per il routing e i redirect su Vercel.

---

## 📧 Contatti

Riccardo Rodio - Sito Web: https://riccardorodio.com

GitHub: @Rickyrodio93

Made with ❤️ by Riccardo Rodio
