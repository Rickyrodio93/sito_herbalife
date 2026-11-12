# process.md — contesto e stato dei lavori

Sito di Riccardo Rodio (Distributore Indipendente Herbalife + Bioniq). Repo: `Rickyrodio93/sito_herbalife`.
Leggere questo file a inizio sessione, poi aprire solo i file che si toccano. Aggiornarlo alla fine di ogni passo.
Ultimo aggiornamento: 12 novembre 2026.

Legenda stato: **[C]** consegnato in chat, conferma di applicazione non verificata · **[OK]** confermato funzionante dall'utente · **[P]** proposto, non ancora consegnato in codice · **[TODO]** da fare.

---

## 1. Progetto e regole

- **Stack:** Next.js 16 (App Router, React 19, React Compiler attivo), Tailwind v4, Framer Motion, Lucide, react-icons, Swiper, Axios + PapaParse, Recharts, Supabase, Gemini, Resend, Vercel.
- **Dati prodotti:** mai hardcodati, arrivano da un CSV pubblico di Google Sheets (Axios + PapaParse).
- **Regole da AGENTS.md / CLAUDE.md:**
  - non installare pacchetti npm senza autorizzazione;
  - `page.js` resta Server Component (metadata lato server), la logica interattiva va in componenti `*Client.jsx` con `"use client"`;
  - `window`, `document`, `localStorage` solo in client component;
  - usare `next/image` con `sizes`;
  - non fare commit automatici;
  - `app/layout.js` (metadata globali + GTM) da toccare solo con supervisione;
  - mantenere intatte le classi Tailwind esistenti salvo richiesta;
  - spiegare cosa/perché prima di modificare, mostrare solo i blocchi modificati.
- **Tema:** light/dark con attributo `data-theme` su `<html>`; variante Tailwind `dark:` legata a quell'attributo.

## 2. Come lavoriamo

- Una cosa alla volta; l'utente indica la pagina o il componente.
- Risposte in italiano: cosa non va → cosa cambia → codice → "da verificare" → prossimo passo.
- File completi per componenti piccoli o riscritti, snippet per modifiche mirate.
- Non posso provare il browser: i punti incerti vanno elencati in "da verificare".
- L'utente applica il codice a mano; non sempre conferma.

## 3. Design system

### Token colore (in `globals.css`, definiti su `:root` e `[data-theme="dark"]`, esposti con `@theme inline`)

| Token (classe) | Light | Dark |
|---|---|---|
| `surface` | #ffffff | #1a201c |
| `surface-alt` | #f4f4f5 | #222923 |
| `card` | #ffffff | #2c342e |
| `raised` | #fafafa | #353e37 |
| `line` (bordi) | #e4e4e7 | #46514a |
| `paper` | #fffdf8 | #d9cdb2 (carta kraft) |
| `ink` / `ink-soft` | #1f1b16 / #6b645a | #262016 / #5e5543 |

- Classi: `bg-surface`, `bg-surface-alt`, `bg-card`, `bg-raised`, `border-line`, `bg-paper`, `text-ink`, supportano l'opacità (`bg-card/90`).
- Colori brand: `herbalife-1` #266431, `-2` #e5ffc5, `-3` #3b9187, `-4` #42a046. Bioniq: `bioniq-notte` #0B1F2A, `-panna` #EAF3F2, `-teal` #1C7C74, `-acqua` #4FD1C5, `-oro` #C9A24B.
- Pagina Bioniq **[P]**: `.bioniq-theme` ridefinisce i 5 token (light: surface #eaf3f2, alt #fff, card #fff, raised #dcebe9, line #c9dcd9; dark: surface #0b1f2a, alt #102b39, card #163645, raised #1d4354, line #2a5566).

### Regole di contrasto (calcolate)

- In dark, testo `herbalife-1` illeggibile (circa 2:1) → usare `green-400`.
- `green-500` su bianco circa 2,3:1 → `green-700` (sconti, testi).
- `zinc-500` su card dark circa 2,7:1 → `zinc-400` per testi da leggere.
- Bianco su `herbalife-4` circa 3,3:1 → per pulsanti con testo piccolo usare `herbalife-1` (dark: `green-700`).
- Etichette `bioniq-teal` su panna 4,45:1 → `#15635d` (6,25:1). Testo `white/80` su teal 3,8:1 → `text-white`.

### Convenzioni

- Regola globale `section a` (grassetto + sottolineato + colore): sui link-pulsante dentro `<section>` serve `no-underline!`.
- `h2` globale ha bordo sinistro verde: usarlo come titolo di sezione.
- Forma: card `rounded-3xl`, pulsanti `rounded-xl`, bordo `border-line`, hover bordo `herbalife-1` / `green-500`.
- `prefers-reduced-motion` rispettato nei componenti animati nuovi.

## 4. Componenti chiave

- **`Section`** [C]: `bg-surface border-t border-line first:border-t-0`, `sfondoAlternato` default `true` (`even:bg-surface-alt`). L'alternanza dipende dalla posizione nel DOM.
- **`Background`** (hero) [C]: props `src`, `titolo`, `sottotitolo`, `compatta`, `children`. Niente card, testo su immagine con gradiente, parallax ridimensionato, `sizes="100vw"`. Prop `video` [P] (con `useReducedMotion` come fallback a immagine). Prop `accent` per Bioniq [P].
- **Navbar desktop** [C]: pill flottante `max-w-6xl`, griglia `[1fr_auto_1fr]`. Dati in `Navbar.jsx` con campi `desktopHidden` e `group`; "Prodotti" è mega-menu a 3 colonne (Percorsi / Scopri / Acquista), "Business" dropdown piccolo. Fix hover: ponte `before:` sul pannello + `pointer-events-none` su `ProgressBar`. **Navbar mobile: non toccare.**
- **`cardHome.jsx` → `CardsHome`** [C]: riga di card elastiche (molla `damping 11`), desktop: icona, il titolo si apre sotto in altezza; sotto `lg` griglia con titolo sempre visibile. Niente effetto calamita. In `sections.jsx`: `<CardsHome cards={CARDSHOME} />`.
- **`SwiperCard`** [C]: vetrina "in evidenza" (card immagine + testo), `getImageProps` per una sola immagine scaricata, Autoplay + A11y, frecce in alto, pallini sotto, barra di avanzamento. Dati in `swiperSlide.js` con `eyebrow`. Posizione consigliata: dopo "i nostri prodotti" in `SECTIONHOME`. `swiperStyle.css` eliminabile.
- **`ProdottiConsigliati`** [C]: Swiper al posto di `react-multi-carousel`, cache del CSV a livello di modulo (una richiesta anche con 2 carousel), frecce disabilitate agli estremi o nascoste se tutto visibile, `h2` come titolo.
- **`CardProdotti`** [C]: token colore, fallback immagine `default.svg` con `onError`. Ritocchi [P]: `rounded-3xl`, badge prezzo `text-white bg-herbalife-1`, nasconderlo se manca il prezzo, `text-center` sul titolo.
- **`BarraDiRicerca`** [C]: generica. Props: `search`, `setSearch`, `prodotti` (formato preventivo) oppure `suggerimenti` (`[{id, nome}]`), `placeholders`, `mostraId`, `etichetta`. Ricerca normalizzata (accenti/maiuscole).
- **`Input`**: wrapper con `iconaDestra`; `as` = input | select | textarea.

## 5. Stato per pagina

### Home
Hero nuova [C] (l'utente ha corretto da solo il padding `main`/hero). Card elastiche [C]. Swiper [C]. Prodotti consigliati [C].

### /ricette [C]
- `ricetteClient.jsx` con `Background compatta` + `Section`; `TabellaRicette` cerca in titolo e prodotti; `CardRicette` con `next/image` + fallback icona.
- Immagini: `public/immagini/ricette/fotoRicette/{id 3 cifre}.webp`; PDF: `public/documenti/ricette/{id}.pdf`. Nel repo vedo solo 10 foto su 65 e nessuna cartella `documenti` → verificare.
- Refuso in `ricette.js` id 65: "rebuind strength" → "rebuild strength".

### /contatti [C]
- `contattiClient.jsx` riscritto: 3 card (tel, WhatsApp, mail), form con etichette e consenso privacy, invio via `https://formsubmit.co/ajax/<FORM_ID>` (FORM_ID `33bded7bb2b0f311323c25d896b09823`), colonna "Prima di scrivermi", pillole social.
- Corretti link mail (`mailto:`) e WhatsApp (`wa.me/39...` senza `+`).
- Da fare: fare un invio di prova; eliminare `ContattiData` e gli import inutili da `accordionData.jsx`.

### /privacy [C]
- Pagina scritta nel codice (`SEZIONI` + tabella `COOKIE`), niente ShareThis. Eliminare `SECTIONPOLICY` da `sections.jsx`.
- Componente `footer/ImpostazioniCookie.jsx` (chiama `googlefc.showRevocationMessage()`, nome del metodo da verificare in Funding Choices) da mettere nel footer e nella sezione cookie.
- **Da completare dall'utente:** indirizzo del titolare, tempi di conservazione (tra parentesi quadre), tag effettivi di GTM, eventuale AdSense, data `AGGIORNAMENTO`.
- **Da aggiornare:** la frase "il sito non salva i prodotti che selezioni" non è più vera (il preventivo si salva in `localStorage`, chiave `preventivo:v1`); aggiungere la riga alla tabella cookie.
- Non è consulenza legale: far rivedere.

### /bioniq
- Analisi e proposte consegnate [P/C]: token `.bioniq-theme`, sezioni a tutta larghezza con ritmo di sfondi, refuso `yext-center` → `text-center`, testi a contrasto, togliere `faqSchema` (risposte JSX non serializzate) e `Offer` senza prezzo, controllare esistenza di `Bioniq_phone.webp` e `Bioniq_Carosello.webp`.
- Video: file pronti `bioniq-hero.mp4` (1280×720, 5,7 MB, 51 s, con audio) e `bioniq-hero-poster.webp` (28 KB). Contiene titoli propri e audio, quindi **non** adatto come sfondo muto. Consigliato: pulsante "guarda il video" + `VideoModal` [C] in `public/video/` e `public/immagini/bioniq/`. **Scelta dell'utente ancora aperta** (modale / player in vista / clip muta in loop da ricavare). Verificare i termini d'uso della Herbalife Content Library.

### /preventivo
Vedi sezione 6.

## 6. Preventivo (architettura attuale)

**Flusso** [C]: un solo catalogo con selettore di linea "Herbalife | Bioniq"; un preventivo (carrello) per linea in `carrelli = { herbalife: [], bioniq: [] }`; lo scontrino mostra la linea attiva. Nessun "ordine misto".

**File:**
- `pagine/preventivoClient.jsx`: profilo (ruolo/livello/uso come pillole), linee, ricerca, `Catalogo`, `Riepilogo`.
- `tabellaPreventivo/catalogo.jsx`: nuovo; sostituisce `tabella.jsx` (da eliminare).
- `tabellaPreventivo/riga.jsx`: riga con container query (`@container` / `@md:`), `memo`.
- `scontrino.jsx`, `riepilogoDesktop.jsx`, `riepilogoTelefono.jsx`, `riepilogo.jsx`, `preventivoLista.jsx` (prop `mostraLista`), `modalRiepilogo/*`, `calcoloPrezzo.js`, `calcoloPreventivo.js` (logica invariata).
- `preventivoDettaglio.jsx`: eliminabile.

**Decisioni:**
- Categorie: via la fisarmonica, al suo posto barra di pillole sticky (`top-18`) con "Tutte" + conteggi; barra nascosta se c'è una sola categoria (Bioniq).
- Ricerca: per nome e ID; se la linea attiva non ha risultati ma l'altra sì, link per cambiare scheda.
- Profilo: parte da "Cliente"; passando a CP/DS il livello parte da 25; DS parte da "uso personale"; con "abituale" il livello è nascosto (il codice applica 50%).
- Persistenza: `localStorage` chiave `preventivo:v1` (ruolo, livello, uso, linea, carrelli, isAbbonato).
- Riga: "aggiungi" inserisce 1; poi `+`/`−`/digitazione cambiano solo la **bozza**; sotto il campo un pulsante "aggiorna" (o "rimuovi" se 0; Invio equivale) applica il valore al preventivo **una volta**. Fascia da 32px riservata per non spostare il layout. La bozza si azzera se la quantità nel preventivo cambia altrove. `imposta` in `preventivoClient` va in `useCallback([linea])`.
- Rimossi dalle voci `prezzoUnitario` e `totale` (non usati, diventavano obsoleti).

**Regole di business (da non rompere):**
- Bioniq: prodotto principale ID `628K`, categoria "formulazioni personalizzate". Si ordina separatamente, non rimborsabile. Un Distributore può acquistarlo **solo per uso personale**.
- Bioniq Cliente: abbonato → sconto 5% e spedizione gratuita; non abbonato → +7,50 € di spedizione (più IVA).
- Herbalife: spedizione cliente 3,5% sul listino; CP e DS uso personale: 3,50 € fissi se i PV totali sono < 100; DS uso commerciale: 3,5% sul listino.
- Tasse DS: ritenuta 17,94%; vendita abituale ≤ 6.410 €: ritenuta − 22%; oltre: + INPS 8,77%.
- Il cliente vede il prezzo finale (IVA e spese incluse); CP e DS vedono listino, sconto, spedizione, tasse, IVA.

**Scontrino** [C]: carta sempre chiara (kraft in dark), monospazio maiuscolo, righe con importi, totale tra tratteggi, codice a barre decorativo. Mobile: la barra in basso è una "stampante" con fessura (misurata con `ref` + `ResizeObserver`, il layer finisce sopra la fessura), display LCD verde, LED, tasto "Stampa/Chiudi"; la carta esce a scatti; il pulsante "riepilogo ordine" resta nel footer dello scontrino e apre il modale. Layer: `bottom` = distanza fessura − 6px. **[OK]** l'utente ha confermato che la versione con misurazione funziona.

**Modale riepilogo** [P/C]: sostituzioni di colore indicate (`bg-card`, `border-line`, `divide-line`, sconti `green-700`/`dark:green-400`), non ancora riscritto con lo stesso criterio visivo del resto.

**Fallback immagini prodotto:** `public/immagini/prodotti/default.svg` (barattolo grigio neutro) usato da `riga.jsx` e `cardProdotti.jsx` via `onError`.

## 7. Prossimi passi

1. **Preventivo, layout pieghevoli e tablet [TODO, prossimo].**
   - Due pannelli (catalogo a sinistra, scontrino sticky a destra, senza stampante) da circa 640px di larghezza invece che da `lg` (1024px).
   - Le righe usano già le container query.
   - Mezzo piegato (posizione da portatile): catalogo sopra, scontrino sotto, solo come miglioramento con `vertical-viewport-segments: 2` / `device-posture`.
   - **Supporto di queste API non confermato**: erano in origin trial Chrome 125-128 e MDN le dà come sperimentali; non basarci il layout.
   - Test con Chrome DevTools (Galaxy Z Fold 5, Asus Zenbook Fold).
2. Modale di riepilogo: stesso criterio visivo del resto.
3. Stacco hero/navbar: uniformare i `pt-*` dei `main` (oggi 17/20 e 28/30) e far scorrere l'immagine sotto la navbar flottante.
4. Metadata: URL OG con `riccardorodio/` senza `.com` in controlloPeso, ottimizza, skin, sport, scienza, business; `alternates.languages` sbagliato in ricette.
5. Consenso e cookie: banner con blocco di GTM fino al consenso (oggi GTM parte a ogni visita, `lazyOnload`); checkbox di consenso esplicito (dati salute) in `FormSelezionabile`; avviso privacy nella chat.
6. Bioniq: applicare la ristrutturazione, decidere il video.
7. `ModalProdotti.jsx`: refusi `hoverflow-y-auto`, `dark-border-bray-700` e colori `zinc` fissi.

## 8. Backlog tecnico e pulizia

- `vercel.json`: il rewrite verso `/index.html` è un residuo SPA, quasi certamente da rimuovere.
- `wallet-link/route.js`: nel `catch` si usa `error.message` ma la variabile è `e`.
- `FormBusiness.jsx`: i controlli `step === n` sono commentati; chiama `/api/contatto-business`, che non esiste nell'albero.
- `scienza/page.js`: `key={section}` (oggetto) → usare `index`.
- `darkMode.jsx`: il blocco `metaThemeColor` con `var(...)` non funziona (i meta non risolvono `var()`); il colore lo imposta già lo script in `layout.js` (dark `#1a201c` dopo il cambio token).
- Tema: breve lampo bianco al caricamento per chi usa dark; si risolve impostando `data-theme` nello script `beforeInteractive` (tocca `layout.js`, solo con via libera).
- `package.json`: `react-multi-carousel` non più usato.
- File eliminabili: `tabella.jsx`, `preventivoDettaglio.jsx`, `swiperStyle.css`, `ContattiData`, `SECTIONPOLICY`, `Layout.jsx`/`scrollToTop.jsx`/`PageTracking.jsx` (residui di react-router).
- `/biglietto` è in un altro route group: niente footer, niente link cookie.
- `robots.js` blocca `/faq` e `/privacy`; `sitemap.js` include `/faq` e `/privacy` con priorità bassa (incoerenza).
- Immagini non viste nel listing del repo: `profilo_1.webp`, `Bioniq_phone.webp`, `Bioniq_Carosello.webp`, `herbalife-bioniq.webp` in `background/`, `hl-skin.jpeg`, `CSB_ZOOM BACKGROUND 1.webp` (nome con spazi, da rinominare), foto prodotti oltre le 13 presenti.

## 9. Non rifare / decisioni già prese

- Navbar mobile e barra del totale mobile piacciono: non cambiare l'impostazione.
- Card home: niente calamita sull'icona, titolo sotto l'icona.
- Scontrino: sempre chiaro (kraft in dark), mobile con effetto stampante.
- Preventivo: niente fisarmonica per categorie, un solo catalogo con linea selezionabile, un preventivo per linea, aggiornamento quantità con pulsante "aggiorna".
- Dark mode: si regola cambiando solo i 5 token, non i singoli `dark:bg-zinc-*`.