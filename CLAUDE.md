# Contesto del Progetto: Sito Riccardo Rodio (Next.js)

## Stack Tecnologico
- **Framework:** Next.js (App Router, React 19)
- **Stile:** Tailwind CSS
- **Librerie chiave:** Framer Motion (per animazioni), Lucide React (icone), Axios & PapaParse (per i dati).

## Architettura e Regole del Codice
1. **Server vs Client Components:** Mantieni i file `page.js` come Server Components per ottimizzare la SEO e la gestione dei `metadata`. Sposta la logica interattiva (form, tabelle, stati) in componenti client separati (es. `NomeComponenteClient.jsx`).
2. **Metadata:** Usa l'oggetto `metadata` nativo di Next.js lato server. Non esportare metadata da file con `"use client"`.
3. **Immagini:** Usa sempre il componente `<Image />` di `next/image` con i dovuti attributi (`fill` o `width`/`height` e `sizes`) per garantire performance ottimali.

## Gestione dei Dati
- I dati dei prodotti Herbalife non sono hardcodati, ma vengono scaricati dinamicamente tramite Axios e formattati con PapaParse da un CSV pubblico di Google Sheets.

## Regole di Risposta per l'IA
- Quando mi fornisci codice modificato, mantieni sempre intatte le classi Tailwind esistenti a meno che io non ti chieda di cambiarle.
- Sii sintetico e mostra solo le parti di codice che cambiano.