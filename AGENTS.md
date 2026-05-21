# AGENTS.md - Istruzioni Operative per Agenti AI

Benvenuto a bordo. Questo file contiene le regole tassative di sviluppo per il sito di **Riccardo Rodio (Distributore Indipendente Herbalife)**. Leggi e rispetta queste linee guida prima di effettuare qualsiasi modifica al codice.

## 1. Identità del Progetto & Business Logics
- **Sito Web:** Piattaforma informativa e configuratore di preventivi per prodotti Herbalife.
- **Tono e Stile:** Professionale, pulito, focalizzato sul benessere e sulla trasparenza dei prezzi.
- **Gestione Dati:** I dati dei prodotti non devono MAI essere scritti fissi (hardcoded) nel codice. Vengono prelevati dinamicamente da un CSV di Google Sheets tramite Axios e PapaParse.

## 2. Stack Tecnologico & Vincoli
- **Framework:** Next.js (App Router) - Sfrutta i Server Components ovunque possibile.
- **Stile:** Tailwind CSS. Non inventare classi arbitrarie al di fuori del design system esistente.
- **Tema:** Supporto nativo per Light/Dark Mode gestito tramite l'attributo `data-theme` sul tag HTML.

## 3. REGOLE TASSATIVE DI COMPORTAMENTO (Confini dell'Agente)
- **Installazione Pacchetti:** È severamente VIETATO installare nuovi pacchetti NPM (`npm install`) senza prima chiedere l'esplicita autorizzazione dell'utente umano. Cerca di risolvere i problemi con le librerie già presenti (`axios`, `papaparse`, `lucide-react`, `framer-motion`).
- **Codice Client vs Server:** Prima di usare `window`, `document` o `localStorage`, assicurati che il componente sia isolato in un Client Component e protetto contro i crash di pre-rendering sul server (usando `useEffect` o `dynamic(..., { ssr: false })`).
- **Gestione Git:** Non fare commit automatici se non ti viene espressamente richiesto.

## 4. Architettura dei File Critici
- `app/layout.js`: Contiene i metadata globali e il codice di tracciamento di Google Tag Manager (GTM). Non modificarlo senza supervisione.
- `app/preventivo/page.js`: È la pagina del configuratore. Utilizza un dynamic import per evitare errori di build su Vercel dovuti alle API del browser.
- `components/ClientLogic.jsx`: Gestisce lo scroll globale e comunica i cambi pagina (pageview) a GTM.

## 5. Standard di Risposta
- Prima di modificare un file esistente, spiega brevemente COSA intendi fare e PERCHÉ.
- Mostra solo i blocchi di codice modificati, non riscrivere interi file da 300 righe se cambia solo una funzione.