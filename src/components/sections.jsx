import {
  Banana,
  Bath,
  Network,
  ScanLine,
  TrendingDown,
  Trophy,
} from "lucide-react";
import TableBrand from "../components/tableBrand/tableBrand";
import FatturatoChart from "../components/grafici/fatturatoChart";
import { Dati } from "../components/tableBrand/datiHL";

import Card from "../components/cards/cardHome";
import SwiperCard from "../components/swiper/swiperCard";
import Link from "next/link";

const phoneNumber = "+393496635371";

function calcolaEta(dataDiNascitaStringa) {
  const oggi = new Date();
  const dataDiNascita = new Date(dataDiNascitaStringa);

  let eta = oggi.getFullYear() - dataDiNascita.getFullYear();
  let mese = oggi.getMonth() - dataDiNascita.getMonth();

  if (mese < 0 || (mese === 0 && oggi.getDate() < dataDiNascita.getDate())) {
    eta--;
  }
  return eta;
}

const miaDataDiNascita = "1993-07-07";
const inizioAttivita = "2016-06-20";
const etaDinamica = calcolaEta(miaDataDiNascita);
const etaHerbalife = calcolaEta(inizioAttivita);

const message = "Salve, vorrei saperne di più sul piano marketing herbalife";
const messageContact =
  "Salve, vorrei unirmi al suo team Herbalife. Cosa devo fare?";

const encodeMessage = encodeURIComponent(message);
const encodeMessageContact = encodeURIComponent(messageContact);

const ProductsList =
  "https://riccardorodio.goherbalife.com/Catalog/Categories/ProductsList/it-IT/";

export const CARDSHOME = [
  {
    icon: TrendingDown,
    title: "controllo del peso",
    link: "/controlloPeso",
  },
  {
    icon: Banana,
    title: "alimentazione sana e bilanciata",
    link: "/ottimizza",
  },
  {
    icon: Trophy,
    title: "integrazione per sportivi",
    link: "/sport",
  },
  {
    icon: Bath,
    title: "cura della persona",
    link: "/skin",
  },
  {
    icon: ScanLine,
    title: "skin AI",
    link: "https://www.hlskin.ai/customer/68d8040a900d82b0b94c0c33",
  },
  {
    icon: Network,
    title: "opportunità di guadagno",
    link: "/business",
  },
];

export const SECTIONHOME = [
  {
    title: "i prodotti e le soluzioni herbalife offrono:",
    text: (
      <>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-5xl mx-auto mb-24 gap-6 sm:gap-8 px-4">
          {CARDSHOME.map((card) => (
            <Card key={card.link} {...card} />
          ))}
        </div>
        <p>
          Formulati scientificamente pensando al tuo successo, gli innovativi
          prodotti Herbalife sono stati ideati da ricercatori, medici e
          nutrizionisti in funzione dei tuoi obiettivi di benessere. Le
          formulazioni Herbalife, ispirate al mondo della natura, sono concepite
          per rendere migliore e più facile il tuo rapporto con
          l&apos;alimentazione. La nostra opportunità commerciale può inoltre
          permetterti di raggiungere il successo economico!
        </p>
      </>
    ),
  },
  {
    component: <SwiperCard />,
  },
  {
    title: "i nostri prodotti",
    video: "https://youtu.be/H5y4WnDoovY",
    text: (
      <>
        Siamo Leader mondiali nella nutrizione e da oltre 40 anni produciamo
        frullati, snack e integratori di qualità. I nostri prodotti sono stati
        formulati scientificamente con i migliori ingredienti per soddisfare le
        tue specifiche esigiente. E si, siamo tanto altro ancora. Siamo una
        comunità che vuole aiutarti a fare la differenza e metterti nella
        condizione di raggiungere i tuoi obiettivi. Dì il tuo sì, unisciti a
        milioni di persone in tutto il mondo che hanno già detto sì a Herbalife
        Nutrition.{" "}
        <span>
          <Link href="/panoramica" className="section-a">
            scopri di più
          </Link>
        </span>
      </>
    ),
  },
  {
    title: "l'azienda",
    video: "https://youtu.be/WsGz3fiLU6U",
    text: (
      <>
        azienda fondata nel 1980 a Los Angeles da Mark Hughes, oggi è presente
        in più di 90 paesi in tutto il mondo. E' l'unica azienda del settore ad
        essere quotata alla borsa di New York (NYSE). Siamo una community
        globale nell'ambito del benessere nata per supportarti nel vivere la tua
        vita al meglio.{" "}
        <span>
          <Link href="/business" className="section-a">
            scopri di più
          </Link>
        </span>
      </>
    ),
  },
  {
    title: "Herbalife e la Scienza del Futuro",
    text: (
      <>
        <strong>
          Non immaginiamo il futuro del benessere. Lo stiamo costruendo.
        </strong>{" "}
        Herbalife continua a rivoluzionare il mercato globale della nutrizione
        investendo nelle tecnologie scientifiche più avanzate. Le recenti
        collaborazioni e acquisizioni strategiche segnano una nuova era per la
        tua salute:
        <br />
        <ul className="list-disc list-inside">
          <li>
            <strong>BIONIQ | Integrazione su Misura:</strong> Grazie alla
            partnership con Bioniq, uniamo l'intelligenza artificiale e
            l'analisi dei biomarcatori ematici per offrirti, in futuro, una
            nutrizione personalizzata basata sulle reali ed esatte esigenze del
            tuo corpo.
          </li>
          <li>
            <strong>PRO2COL | Validazione Clinica:</strong> Con l'integrazione
            dei laboratori di ricerca Pro2Col, ogni formula viene testata
            secondo rigorosi standard scientifici per garantirti massima
            efficacia, sicurezza e assorbimento cellulare.
          </li>
        </ul>
        <br />
        <i>
          Scegliere Herbalife oggi significa affidarsi a un brand che unisce la
          natura alla scienza medica più avanzata.
        </i>{" "}
        <Link href="/scienza" className="section-a">
          scopri la nostra scienza
        </Link>
      </>
    ),
  },
  {
    title: "chi sono",
    image: "/immagini/profilo_1.webp",
    square: true,
    text: (
      <>
        Ciao, mi chiamo Riccardo, ho {etaDinamica} anni, e mi sono laureato
        presso la facoltà di scienze agrarie a Milano. Sono sempre stato uno
        sportivo a livello agonistico. Ho praticato molti sport come: basket,
        ginnastica artistica, nuoto, calcio. Ho conosciuto Herbalife{" "}
        {etaHerbalife} anni fa grazie a un'amica che mi ha invitato a un evento
        informativo di 2 giorni. All'inizio ero scettico, non pensavo di avere
        bisogno dei prodotti nè conoscevo il tipo di business, ma ho deciso lo
        stesso di informarmi. Dopo l'evento ho capito che non sapevo nulla su
        questa incredibile azienda, sui prodotti di altissima qualità e
        sull'opportunità economica. In Herbalife ho trovato una meravigliosa
        opportunità di crescita che mi ha permesso non solo di rimettermi in
        forma perdendo circa 8 kg*, ma anche di poter costruire la mia attività
        autonoma e indipendente condividendo con tante persone prodotti
        incredibili e un'opportunità davvero unica che può essere svolta anche
        part-time.
      </>
    ),
  },
];

export const SECTIONCONTROLLOPESO = [
  {
    title: "controllo del peso",
    image: "/immagini/controlloPeso/controllo_peso.webp",
    square: true,
    text: (
      <>
        I nostri prodotti per la perdita e il controllo del peso sono studiati
        scientificamente per aiutarti a raggiungere i tuoi obiettivi e
        raccogliere i benefici di una nutrizione equilibrata.
      </>
    ),
  },
  {
    title: "sostituti del pasto",
    image: "/immagini/controlloPeso/sostituti_pasto.webp",
    square: true,
    text: (
      <>
        Herbalife Formula 1 è un frullato sostitutivo del pasto nutrizionalmente
        bilanciato, realizzato con ingredienti al 100% adatti ai vegani.
        Fornisce proteine di alta qualità di origine vegetale e tutti i
        micronutrienti e macronutrienti di cui il tuo corpo ha bisogno in un
        pasto equilibrato. È un'alternativa salutare ai tuoi pasti ipercalorici.
        Prova il tuo frullato Formula 1 in 10 deliziosi gusti. Da oltre 40 anni
        Herbalife Nutrition promuove l'uso di frullati F1 come sostituti del
        pasto per la perdita e il controllo del peso. Scopri i principali studi
        scientifici sul Formula 1. Un'altra testimonianza della scienza dietro i
        prodotti Herbalife Nutrition e che la rende l'azienda n° 1 al mondo per
        i sostituti del pasto.{" "}
        <span>
          <a
            href="https://riccardorodio.goherbalife.com/Catalog/Categories/ProductsList/it-IT/1816"
            className="section-a"
          >
            scopri i prodotti
          </a>
        </span>
      </>
    ),
  },
  {
    title: "snack proteici",
    image: "/immagini/controlloPeso/snack_proteici.webp",
    square: true,
    text: (
      <>
        I nostri snack ad alto contenuto proteico sono un ottimo modo per
        soddisfare il tuo appetito, garantendo al tuo corpo proteine ed energia.
        Sia che tu stia cercando una maggiore energia a metà mattina, uno
        spuntino pomeridiano o un boccone in viaggio, la nostra gamma di
        barrette e snack ti aiuterà a raggiungere i tuoi obiettivi nutrizionali
        e a rimanere in linea con il tuo piano alimentare.{" "}
        <span>
          <a
            href="https://riccardorodio.goherbalife.com/Catalog/Categories/ProductsList/it-IT/1818"
            className="section-a"
          >
            scopri i prodotti
          </a>
        </span>
      </>
    ),
  },
  {
    title: "idratazione",
    image: "/immagini/controlloPeso/idratazione.webp",
    square: true,
    text: (
      <>
        Mantieniti idratato con la nostra gamma di deliziose bevande
        rinfrescanti. Dai nostri infusi al concentrato di Aloe Vera, i nostri
        prodotti sono formulati per supportare una dieta a basso contenuto
        calorico.{" "}
        <span>
          <a
            href="https://riccardorodio.goherbalife.com/Catalog/Categories/ProductsList/it-IT/1709"
            className="section-a"
          >
            scopri i prodotti
          </a>
        </span>
      </>
    ),
  },
];

export const SECTIONOTTIMIZZA = [
  {
    title: "l'importanza di vitamine e minerali",
    text: (
      <>
        Vitamine e minerali sono micronutrienti essenziali necessari in molte
        reazioni chimiche che avvengono ogni giorno nell’organismo. Molti
        minerali, come calcio e magnesio, svolgono anche un ruolo strutturale
        all’interno del corpo*. L’organismo però non è in grado di sintetizzare
        tutte le vitamine e i minerali di cui necessita per funzionare al meglio
        e per questo è così importante seguire una dieta sana. Una dieta
        equilibrata fornisce vitamine e minerali essenziali, ma a volte può
        essere difficile assumere tutti i nutrienti necessari solo attraverso
        l’alimentazione. L’integrazione quotidiana di vitamine e minerali può
        aiutare ad assumere le razioni giornaliere raccomandate.
      </>
    ),
  },
  {
    title: "cosa dovrei mangiare?",
    text: (
      <>
        In genere i cibi che mangi contengono alcune vitamine e minerali
        essenziali. Fonti particolarmente ricche di nutrienti sono la frutta, la
        verdura e i cereali. Ciascun nutriente svolge una diversa funzione
        nell’organismo, quindi ogni persona può trarre beneficio da un maggiore
        apporto di determinate vitamine o minerali. Gli spinaci sono ricchi di
        vitamine C ed E, che contribuiscono alla protezione delle cellule dallo
        stress ossidativo, mentre fosforo e calcio*, che si trovano in latte,
        yogurt e semi, contribuiscono al mantenimento di ossa normali. Le
        vitamine del gruppo B aiutano l’organismo a convertire il cibo in
        energia**, mentre la vitamina K contribuisce al mantenimento di ossa
        normali e alla normale coagulazione del sangue.
        <figcaption className="font-bold text-xs mt-2">
          * Il Calcio è necessario per il mantenimento di ossa e denti normali.
        </figcaption>
        <figcaption className="font-bold text-xs mt-2">
          ** Le vitamine B1, B2, B3, B5, B6, B12 contribuiscono al normale
          metabolismo energetico.
        </figcaption>
      </>
    ),
  },
  {
    title: "ottieni il meglio dal tuo corpo",
    text: (
      <>
        Avere cura del proprio corpo e assicurargli i nutrienti di cui ha
        bisogno è fondamentale indipendentemente dall’età, dalle condizioni di
        salute e dai livelli di attività fisica. Nonostante le migliori
        intenzioni, la tua alimentazione quotidiana potrebbe non contenere ogni
        nutriente nella giusta quantità. In questi casi l’uso di integratori può
        essere utile, perché ti aiuta a dare al tuo corpo il giusto carburante.
        Vitamine e minerali contribuiscono al benessere generale e alla vitalità
        e sono fondamentali per la crescita e lo sviluppo dell’organismo.
      </>
    ),
  },
  {
    title: "ottimizza la nutrizione",
    image: "/immagini/ottimizza/ottimizza_la_nutrizione.webp",
    square: true,
    text: (
      <>
        Noi di Herbalife Nutrition crediamo nell'importanza di dare al corpo i
        nutrienti di cui ha bisogno, indipendentemente dall'età, dagli obiettivi
        di benessere o dal livello di forma fisica. La nostra gamma di prodotti
        scientificamente formulati è stata sviluppata per fornire all'organismo
        una combinazione perfettamente equilibrata di tutti gli elementi
        essenziali necessari per una nutrizione ottimale che tenga conto delle
        tue esigenze. Formuliamo i nostri integratori pensando ai tuoi personali
        obiettivi di benessere. Se sei alla ricerca di un piano alimentare sano
        ed equilibrato, Herbalife Nutrition può darti una mano.{" "}
        <span>
          <a
            href="https://riccardorodio.goherbalife.com/Catalog/Categories/List/it-IT/1687"
            className="section-a"
          >
            scopri i prodotti
          </a>
        </span>
      </>
    ),
  },
  {
    title: "micronutrienti",
    image: "/immagini/ottimizza/vitamine_e_minerali.webp",
    square: true,
    text: (
      <>
        Vitamine e minerali sono una parte essenziale della nostra dieta. Sono
        necessari per il benessere del nostro organismo. Una dieta equilibrata
        può aiutare a fornire vitamine e minerali chiave ma può essere difficile
        consumare i nutrienti necessari semplicemente attraverso il cibo. Gli
        integratori alimentari possono aiutarti a raggiungere la quantità
        giornaliera raccomandata.{" "}
        <span>
          <a
            href="https://riccardorodio.goherbalife.com/Catalog/Categories/ProductsList/it-IT/1703"
            className="section-a"
          >
            scopri i prodotti
          </a>
        </span>
      </>
    ),
  },
  {
    title: "grassi buoni",
    image: "/immagini/ottimizza/grassi_buoni.webp",
    square: true,
    text: (
      <>
        Il nostro corpo richiede piccole quantità di grasso ed una buona
        funzionalità ma c’è differenza tra grassi buoni e grassi da evitare. Gli
        acidi grassi come gli Omega-3 sono considerati “buoni” perché possono
        aiutare a mantenere il colesterolo entro livelli accettabili*.
        *Sostituire i grassi saturi con grassi insaturi nella dieta contribuisce
        al mantenimento di normali livelli di colesterolo.{" "}
        <span>
          <a
            href="https://riccardorodio.goherbalife.com/Catalog/Categories/ProductsList/it-IT/1701"
            className="section-a"
          >
            scopri i prodotti
          </a>
        </span>
      </>
    ),
  },
  {
    title: "fibre",
    image: "/immagini/ottimizza/fibre.webp",
    square: true,
    text: (
      <>
        Per una nomale funzionalità gastrointestinale, un adulto dovrebbe
        assumere 25 g di fibre al giorno, ma in realtà sono in pochi a farlo.
        Per aiutarti a raggiungere la quantità giornaliera raccomandata, ti
        offriamo una serie di soluzioni ricche di fibre e integratori.{" "}
        <span>
          <a
            href="https://riccardorodio.goherbalife.com/Catalog/Categories/ProductsList/it-IT/1700"
            className="section-a"
          >
            scopri i prodotti
          </a>
        </span>
      </>
    ),
  },
  {
    title: "proteine",
    image: "/immagini/ottimizza/proteine.webp",
    square: true,
    text: (
      <>
        Le proteine contribuiscono alla crescita della massa muscolare, al
        mantenimento di ossa normali e sono una componente essenziale di ogni
        cellula del corpo. Con la nostra gamma di shake, barrette e integratori,
        i prodotti a base di proteine Herbalife Nutrition ti aiuteranno a
        migliorare l'assunzione proteica giornaliera e a soddisfare il tuo
        fabbisogno quotidiano.{" "}
        <span>
          <a
            href="https://riccardorodio.goherbalife.com/Catalog/Categories/ProductsList/it-IT/1705"
            className="section-a"
          >
            scopri i prodotti
          </a>
        </span>
      </>
    ),
  },
  {
    title: "idratazione",
    image: "/immagini/ottimizza/idratazione.webp",
    square: true,
    text: (
      <>
        Mantieniti idratato con la nostra gamma di deliziose bevande
        rinfrescanti. Dai nostri infusi al concentrato di Aloe Vera, i nostri
        prodotti sono formulati per supportare una dieta a basso contenuto
        calorico.{" "}
        <span>
          <a
            href="https://riccardorodio.goherbalife.com/Catalog/Categories/ProductsList/it-IT/1709"
            className="section-a"
          >
            scopri i prodotti
          </a>
        </span>
      </>
    ),
  },
];

export const SECTIONSKIN = [
  {
    title: "hl/skin",
    image: "/immagini/swiperImmagini/hl-skin.jpeg",

    text: (
      <>
        scopri l'eleganza della skincare evoluta. HL/Skin unisce l'avanzata
        scienza coreana a ingredienti clinicamente testati, offrendoti i
        risultati di cui hai bisogno, senza sforzo. Studiata per rispondere alle
        esigienze fondamentali della pelle - Luminosità e Radiosità, healthy
        Ageing e Idratazione e nutrimento - questa linea di prodotti non solo
        offre una piacevole sensazione, ma garantisce risultati visibili. Ogni
        prodotto contiene ingredienti supportati dalla scienza, presenti nelle
        concentrazioni ottimali, selezionati con cura dagli esperti coreani
        della skincare e sapientemente combinati in formule efficaci,
        meticolosamente testate per fornire alla tua pelle esattamente ciò di
        cui ha bisogno, quando ne ha bisogno.
      </>
    ),
  },
  {
    title: "analisi della pelle basata su IA",
    image: "/immagini/skin/HL_Skin_ai.png",
    text: (
      <>
        utilizza questo strumento basato su intelligienza artificiale per
        scansionare la tua pelle in meno di 60 secondi. Ottieni subito un
        punteggio complessivo della pelle da 0 a 100% e un'analisi dettagliata
        dei principali parametri cutanei per aiutarti a comprenderne lo stato.{" "}
        <span>
          <a
            href="http://www.hlskin.ai/customer/68d8040a900d82b0b94c0c33"
            target="_blank"
            className="section-a"
          >
            scansiona la tua pelle
          </a>
        </span>
      </>
    ),
    link: "https://www.hlskin.ai/customer/68d8040a900d82b0b94c0c33",
  },
  {
    title: "linea prodotti skin",
    image: "/immagini/skin/prodotti_skin.webp",
    square: true,
    text: (
      <>
        Dicendo "beauty routine" dite Herbalife SKIN®, la linea di prodotti di
        bellezza di Herbalife Nutrition pensata per offrire nutrimento alla
        vostra pelle. Ingredienti di qualità ed estratti in una gamma tutta da
        scoprire. Per gli amanti della cura del corpo, la linea Herbal Aloe con
        aloe vera naturale è l'ideale per migliorare l'aspetto di pelle e
        capelli. Scoprite tutti i prodotti e i benefici degli estratti botanici
        che contengono.
      </>
    ),
  },
  {
    title: "cura del corpo",
    image: "/immagini/skin/cura_corpo.webp",
    square: true,
    text: (
      <>
        I nostri prodotti di bellezza Herbalife SKIN® e Herbal Aloe sono
        dermatologicamente testati e donano il giusto nutrimento per la cura
        della pelle e dei capelli.{" "}
        <span>
          <a
            href="https://riccardorodio.goherbalife.com/Catalog/Categories/List/it-IT/1688"
            target="_blank"
            className="section-a"
          >
            scopri i prodotti
          </a>
        </span>
      </>
    ),
  },
  {
    title: "herbalife skin",
    image: "/immagini/skin/herbalife_skin.webp",
    square: true,
    text: (
      <>
        I prodotti di bellezza Herbalife SKIN® offrono nutrimento per la cura
        della pelle. Sono realizzati con ingredienti di qualità, prodotti
        botanici ed estratti per arricchire la tua pelle.{" "}
        <span>
          <a href={`${ProductsList}1660`} target="_blank" className="section-a">
            scopri i prodotti
          </a>
        </span>
      </>
    ),
  },
  {
    title: "herbal aloe",
    image: "/immagini/skin/aloe.webp",
    square: true,
    text: (
      <>
        Detergi, lenisci, rinfresca. Ricchi di benefici estratti botanici e
        arricchiti con aloe vera naturale, i prodotti della linea Herbal Aloe
        migliorano e idratano i capelli e la pelle.{" "}
        <span>
          <a href={`${ProductsList}1713`} target="_blank" className="section-a">
            scopri i prodotti
          </a>
        </span>
      </>
    ),
  },
  {
    title: "collagene skin",
    image: "/immagini/skin/collagene_skin.webp",
    square: true,
    text: (
      <>
        Quando si tratta di avere una pelle dall'aspetto sano, c'è molto da fare
        per ottenere una carnagione splendente. Ma cosa succederebbe se potessi
        avere una pelle dall'aspetto sano, usando una bevanda di bellezza? Prova
        Collagene Skin! È un integratore alimentare in polvere che contiene
        peptidi bioattivi del collagene di alta qualità, chiamati Verisol® P, la
        cui capacità di ridurre le rughe e migliorare l'elasticità della pelle è
        stata scientificamente provata con risultati dimostrati dopo 4
        settimane.{" "}
        <span>
          <a
            href="https://riccardorodio.goherbalife.com/Catalog/Product/Details/it-IT/076K"
            target="_blank"
            className="section-a"
          >
            scopri collagene skin
          </a>
        </span>
      </>
    ),
  },
];

export const SECTIONSPORT = [
  {
    title: "sicurezza al 100% nella competizione",
    image: "/immagini/sport/certificato.png",
    square: true,
    text: (
      <>
        I prodotti Herbalife24® vengono regolarmente testati e monitorati
        affinché soddisfino le numerose specifiche che garantiscono la stabilità
        del prodotto e la conformità di tutti gli ingredienti alle dichiarazioni
        in etichetta. Il nostro proposito è fare in modo che atleti, preparatori
        e allenatori si fidino dei nostri prodotti. Massimizza la performance e
        il recupero confidando al 100% nella tua nutrizione.
      </>
    ),
  },
  {
    title: "24 ore di supporto nella nutrizione sportiva",
    text: (
      <>
        Sprigiona il tuo potenziale con una nutrizione sportiva senza
        compromessi. Non importa se sei un semplice amante del jogging, un
        appassionato della vita all’aperto o un atleta professionista: con la
        linea per sportivi Herbalife24® le tue prestazioni faranno un salto di
        qualità. Da soluzioni proteiche di qualità a bevande con elettroliti e
        integratori nutrizionali per il recupero, la linea Herbalife24® offre
        prodotti ideati per le tue esigenze personali di prestazione,
        allenamento e recupero. Dai il meglio di te con la prima linea di
        nutrizione h24 per sportivi sul mercato.
      </>
    ),
  },
  {
    title: "sviluppati in laboratorio, verificati sul campo",
    image: "/immagini/sport/informed_sport.svg",

    text: (
      <>
        Tutti i prodotti Herbalife24 vengono sottoposti a test completi che
        verificano l’assenza di sostanze vietate. Il programma di qualità
        garantita Informed Sport certifica che un campione del lotto di origine
        del prodotto è stato testato dai prestigiosi laboratori di analisi
        antidoping LGC. La linea Herbalife24® offre supporto nel piano
        nutrizionale per tutti gli appassionati di sport (idratazione, proteine,
        carboidrati, vitamine e minerali chiave) che puoi personalizzare in base
        alle tue specifiche esigenze di allenamento. Allenati come un atleta con
        una nutrizione senza compromessi.{" "}
        <span>
          visita il sito{" "}
          <a
            href="https://sport.wetestyoutrust.com/"
            className="section-a"
            target="_blank"
          >
            informed sport
          </a>
        </span>
      </>
    ),
  },
  {
    title: "energia e sport",
    image: "/immagini/sport/energia_sport.webp",
    square: true,
    text: (
      <>
        Allenati come un atleta. Porta la tua forma fisica, le prestazioni e il
        recupero ad un livello superiore con i prodotti Herbalife24®. La nostra
        gamma nutrizionale per sportivi H24 è utilizzata da oltre 190 squadre
        sportive, atleti ed eventi in tutto il mondo per aiutarli a raggiungere
        una migliore prestazione.{" "}
        <span>
          <a
            href="https://riccardorodio.goherbalife.com/Catalog/Categories/List/it-IT/1684"
            target="_blank"
            className="section-a"
          >
            scopri i prodotti
          </a>
        </span>
      </>
    ),
  },
  {
    title: "pre-workout",
    image: "/immagini/sport/pre-workout.webp",
    square: true,
    text: (
      <>
        Preparare il corpo all'esercizio quotidiano è importante quanto
        ricaricarlo dopo l'allenamento. Ottieni il massimo dal tuo allenamento
        idratando ed energizzando il tuo corpo con il nostro integratore
        alimentare Lift Off®.{" "}
        <span>
          <a href={`${ProductsList}1699`} target="_blank" className="section-a">
            scopri i prodotti
          </a>
        </span>
      </>
    ),
  },
  {
    title: "durante il workout",
    image: "/immagini/sport/durante_workout.webp",
    square: true,
    text: (
      <>
        Mantieni elevati i tuoi livelli di energia durante l'allenamento. Per
        aiutarti a ottimizzare le tue prestazioni, abbiamo sviluppato
        Herbalife24® Prolong, ideale per supportare i tuoi allenamenti
        quotidiani e aiutarti a dare il meglio.{" "}
        <span>
          <a href={`${ProductsList}1696`} target="_blank" className="section-a">
            scopri i prodotti
          </a>
        </span>
      </>
    ),
  },
  {
    title: "post workout",
    image: "/immagini/sport/post-workout.webp",
    square: true,
    text: (
      <>
        Dopo un’intensa attività fisica o una sessione di allenamento, tu e i
        tuoi muscoli avete bisogno di riposare. Un efficace piano di recupero
        ristabilisce un equilibrio tra idratazione, proteine e carboidrati.
        Scopri la nostra gamma di prodotti realizzata per aiutarti a rigenerarti
        dopo gli allenamenti.{" "}
        <span>
          <a href={`${ProductsList}1698`} target="_blank" className="section-a">
            scopri i prodotti
          </a>
        </span>
      </>
    ),
  },
  {
    title: "all day",
    image: "/immagini/sport/all_day.webp",
    square: true,
    text: (
      <>
        Dopo un’intensa attività fisica o una sessione di allenamento, tu e i
        tuoi muscoli avete bisogno di riposare. Un efficace piano di recupero
        ristabilisce un equilibrio tra idratazione, proteine e carboidrati.
        Scopri la nostra gamma di prodotti realizzata per aiutarti a rigenerarti
        dopo gli allenamenti.{" "}
        <span>
          <a href={`${ProductsList}1708`} target="_blank" className="section-a">
            scopri i prodotti
          </a>
        </span>
      </>
    ),
  },
];

export const SECTIONSCIENZA = [
  {
    title:
      "Herbalife entra nell'era della nutrizione personalizzata con Bioniq",
    image: "/immagini/scienza/herbalife-bioniq.webp",
    text: (
      <>
        Negli ultimi anni, la scienza della nutrizione ha chiarito un concetto
        fondamentale: non esiste una dieta o un integratore che vada bene per
        tutti in modo universale. Ognuno di noi ha un metabolismo e carenze
        biochimiche uniche. È per rispondere a questa esigenza che l'azienda ha
        stretto una partnership e investito strategicamente in Bioniq, azienda
        leader globale nelle soluzioni di salute personalizzate basate
        sull'intelligenza artificiale.
        <br />
        <ul className="list-disc list-inside">
          <li>
            <strong>Che cos'è Bioniq?</strong> Bioniq è una piattaforma di
            salute d'avanguardia che analizza i biomarcatori (attraverso esami
            del sangue mirati e questionari approfonditi) e, grazie a un potente
            algoritmo proprietario, crea formule di integrazione personalizzate
            al 100%.
          </li>
          <li>
            <strong>Cosa significa per il futuro di Herbalife?</strong> Questa
            sinergia unisce la capillarità e la qualità dei prodotti Herbalife
            con la precisione scientifica di Bioniq. L'obiettivo è permettere ai
            consumatori e ai distributori di avere accesso a soluzioni
            nutrizionali guidate dai dati scientifici del proprio corpo. Non si
            tratta più di scegliere un integratore standard, ma di formulare il
            carburante esatto di cui le tue cellule hanno bisogno per
            ottimizzare energia, longevità e performance sportive.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "Più vicini alla scienza medica con l'acquisizione di Pro2Col",
    image: "/immagini/scienza/cristiano-ronaldo-pro2col.webp",
    text: (
      <>
        La credibilità di un brand nutrizionale si misura attraverso i fatti, i
        laboratori e le pubblicazioni scientifiche. Con l'acquisizione
        strategica di <strong>Pro2Col</strong>, l'azienda accelera il suo
        percorso di transizione verso una validazione scientifica di livello
        medico-farmaceutico.
        <ul className="list-disc list-inside">
          <li>
            <strong>Chi è Pro2Col e cosa fa?</strong> Pro2Col è una realtà
            d'eccellenza specializzata nella ricerca clinica, nello sviluppo di
            protocolli scientifici e nella gestione di studi traslazionali. In
            parole semplici, è il motore che permette di testare in laboratorio
            e su gruppi di studio reali l'efficacia biologica dei nutrienti.
          </li>
          <li>
            <strong>L'impatto sulla sicurezza e sull'efficacia:</strong>Grazie a
            questa acquisizione, lo sviluppo dei nuovi prodotti Herbalife
            beneficerà di test clinici interni ancora più rigorosi. Questo si
            traduce in tre vantaggi fondamentali per i clienti:
            <ul className="list-decimal list-inside">
              <li>
                <strong>Maggiore biodisponibilità:</strong> Certezza assoluta
                che i nutrienti vengano assorbiti dal corpo in modo ottimale.
              </li>
              <li>
                <strong>Standard di sicurezza elevatissimi:</strong> Controllo
                totale della filiera scientifica.
              </li>
              <li>
                <strong>Innovazione contro l'invecchiamento:</strong> Nuove
                formule mirate alla salute cellulare, supportate da dati clinici
                inattaccabili.
              </li>
            </ul>
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "ricerca e sviluppo",
    video: "https://youtu.be/j-SdPY9XSrs",
    text: (
      <>
        I prodotti Herbalife nascono da anni di ricerca nel campo della
        nutrizione e della scienza alimentare. Un team internazionale di
        scienziati, nutrizionisti e medici lavora costantemente per sviluppare
        formule efficaci, sicure e basate sulle più recenti evidenze
        scientifiche.
        <br />
        Ogni prodotto viene progettato per supportare specifiche esigenze
        nutrizionali, come il controllo del peso, l'energia durante l’attività
        fisica e il recupero muscolare.
      </>
    ),
  },
  {
    title: "controlli di qualità",
    video: "https://youtu.be/Bad9cExF8gA",
    text: (
      <>
        Durante la produzione dei prodotti Herbalife vengono effettuati numerosi
        controlli di qualità per garantire che ogni lotto sia conforme agli
        standard dichiarati.
        <br />
        Il processo include verifiche su:
        <ul>
          <li className="not-last:mb-8 font-bold">materie prime</li>
          <li className="not-last:mb-8 font-bold">fasi di lavorazione</li>
          <li className="not-last:mb-8 font-bold">composizione nutrizionale</li>
          <li className="not-last:mb-8 font-bold">
            stabilità del prodotto nel tempo
          </li>
        </ul>
        Questo sistema consente di mantenere elevati livelli di qualità e
        affidabilità.
      </>
    ),
  },
  {
    title: "selezione degli ingredienti",
    text: (
      <>
        La qualità di un integratore dipende in gran parte dagli ingredienti
        utilizzati. Per questo motivo Herbalife seleziona materie prime
        provenienti da fornitori qualificati e sottoposte a controlli rigorosi.
        <br />
        Ogni ingrediente viene analizzato per verificarne:
        <ul>
          <li className="not-last:mb-8 font-bold">purezza</li>
          <li className="not-last:mb-8 font-bold">sicurezza</li>
          <li className="not-last:mb-8 font-bold">qualità nutrizionale</li>
          <li className="not-last:mb-8 font-bold">
            conformità agli standard alimentari
          </li>
        </ul>
        Solo gli ingredienti che soddisfano questi criteri vengono utilizzati
        nelle formulazioni finali.
      </>
    ),
  },
  {
    title: "test sicurezza dei prodotti",
    text: (
      <>
        I prodotti Herbalife vengono regolarmente testati per verificare che
        soddisfino le specifiche di qualità e sicurezza.
        <br />
        le verifiche riguardano:
        <ul>
          <li className="not-last:mb-8 font-bold">stabilità del prodotto</li>
          <li className="not-last:mb-8 font-bold">
            conformità agli ingredienti dichiarati
          </li>
          <li className="not-last:mb-8 font-bold">
            valori nutrizionali indicati in etichetta
          </li>
        </ul>
        Questo processo contribuisce a garantire prodotti affidabili per chi
        desidera supportare il proprio benessere e la propria attività fisica.
      </>
    ),
  },
  {
    title: "Supporto alla performance e al recupero",
    text: (
      <>
        Una nutrizione adeguata è fondamentale per sostenere l'attività fisica e
        favorire il recupero dopo l'allenamento.
        <br />
        Alcuni prodotti Herbalife sono formulati per supportare:
        <ul>
          <li className="not-last:mb-8 font-bold">
            energia durante l'attività fisica
          </li>
          <li className="not-last:mb-8 font-bold">recupero muscolare</li>
          <li className="not-last:mb-8 font-bold">reintegro nutrizionale</li>
          <li className="not-last:mb-8 font-bold">
            mantenimento della massa muscolare
          </li>
        </ul>
        Integrati con uno stile di vita attivo e una dieta equilibrata, possono
        contribuire al raggiungimento degli obiettivi di benessere.
      </>
    ),
  },
];

export const SECTIONBUSINESS = [
  {
    title: "entra nel mio team",
    image: "/immagini/QR_code/QR_invitation.png",
    square: false,
    text: (
      <>
        scansiona il QR Code per poterti registrare e avviare il tuo business
        nel mio team Herbalife. Ti basterà seguire le istruzioni e potrai
        iniziare il tuo percorso. Se non riesci a scansionare, clicca
        direttamente{" "}
        <a
          href="https://accounts.myherbalife.com/Account/Create?appId=1&qrFlow=1&locale=it-IT&SponsorId=kQkJ2BXpUJ4=&cmp=m_it_it_wbs_dssignup_btn_nap_copylink_20250305"
          className="section-a"
          target="_blank"
        >
          qui.
        </a>
      </>
    ),
  },
  {
    title: "il tuo business del benessere, nel tuo modo",
    image: "/immagini/business/li-coach-client-tablet.webp",
    square: true,
    text: (
      <>
        ci sono molteplici ragioni per diventare un Distributore Indipendente
        Herbalife. Magari desideri un'opportunità lavorativa flessibile per
        goderti del tempo con amici e familiari. Oppure sei attratto dall'idea
        di avviare, ampliare e gestire la tua attività in qualsiasi parte del
        mondo. Lungo questo percorso, potrai sperimentare l'influenza positiva
        che eserciti nel migliorare la vita delle persone. Costruire un'attività
        con Herbalife ti offre la libertà di farlo secondo le tue preferenze,
        senza vincoli rigidi sul modo o sugli orari di lavoro. Ti supportiamo
        nello sviluppare la capacità di motivare e assistere i tuoi clienti e,
        se lo desideri, altri Distributori Herbalife che condividono il tuo
        impegno. Man mano che la tua attività cresce, avrai l'opportunità di
        esplorare nuove fonti di guadagno. Per conoscere le entrate medie
        mensili più comuni, consulta il nostro{" "}
        <a
          href="/documenti/guadagni/guadagni-tipici.pdf"
          className="section-a"
          target="_blank"
        >
          Prospetto dei Guadagni Tipici.
        </a>{" "}
        I risultati eccezionali dipendono dal duro lavoro, dall'abilità e
        dall'impegno. Entra a far parte di Herbalife oggi e preparati a un
        futuro in cui la tua creatività non conosce limiti. Realizza i tuoi
        obiettivi con determinazione.
      </>
    ),
  },
  {
    title: "la mia promessa",
    image: "/immagini/business/team.webp",
    text: (
      <>
        Avviare la tua attività di Distributore Indipendente Herbalife è facile
        e senza stress:
        <ul>
          <li className="not-last:mb-8">
            <strong>Piena trasparenza aziendale:</strong> Informazioni chiare e
            precise sul tuo guadagno potenziale.
          </li>
          <li className="not-last:mb-8">
            <strong>Garanzia di rimborso:</strong> Rimborso del 100%
            sull'Herbalife Member Pack se la tua iscrizione viene cancellata per
            qualsiasi motivo entro 90 giorni.
          </li>
          <li className="not-last:mb-8">
            <strong>Garanzia Gold Standard:</strong> Rimborso del 100% su tutti
            i prodotti invenduti acquistati entro 12 mesi in caso di
            cancellazione dell’iscrizione per qualsiasi motivo.
          </li>
          <li className="not-last:mb-8">
            <strong>Contenuti costi di avvio:</strong> Non ci sono ordini minimi
            mensili di prodotti o requisiti per l'acquisto di strumenti di
            vendita o commerciali.{" "}
            <a
              className="section-a"
              href={`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeMessageContact}`}
              target="_blank"
            >
              Unisciti al mio team Herbalife oggi.
            </a>
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "herbalife nel 2025",
    text: (
      <>
        <TableBrand dati={Dati} bg={"bg-herbalife-1"} />
        <FatturatoChart />
      </>
    ),
  },
  {
    title: "perchè scegliere l'attività herbalife?",
    image: "/immagini/business/li-coach-client-laptop.webp",
    square: true,
    text: (
      <>
        l'attività commerciale di Herbalife Nutrition offre numerosi vantaggi,
        eccone alcuni:
        <ol className="mt-10 list-decimal">
          <li className="not-last:mb-8">
            E' un'attività <strong>autonoma</strong> e{" "}
            <strong>indipendente</strong>;
          </li>
          <li className="not-last:mb-8">
            Garanzia <strong>soddisfatti</strong> o <strong>rimborsati</strong>;
          </li>
          <li className="not-last:mb-8">
            <strong>Nessun obbligo</strong> di magazzino;
          </li>
          <li className="not-last:mb-8">
            Tuo e-commerce <strong>gratuito</strong> e personalizzato;
          </li>
          <li className="not-last:mb-8">
            Attività <strong>cedibile</strong> ed <strong>ereditabile</strong>;
          </li>
          <li className="not-last:mb-8">
            <a
              href="https://assets.herbalifenutrition.com/content/dam/regional/emea/it_it/consumable_content/policy-and-compliance/2021/05-May/SAGC_it-IT.pdf/_jcr_content/renditions/original"
              className="section-a"
              target="_blank"
            >
              Piano compensi
            </a>{" "}
            più alto sul mercato;
          </li>
          <li className="not-last:mb-8">
            Formazione completa e gratuita step by step;
          </li>
          <li className="not-last:mb-8">Dedichi il tempo che desideri;</li>
          <li className="not-last:mb-8">
            Crei un'entrata slegata dal tuo tempo lavorato;
          </li>
          <li className="not-last:mb-8">
            Azienda solida con più di 40 anni di attività;
          </li>
          <li className="not-last:mb-8">
            Giro d'affari superiore ai <strong>9 miliardi</strong> di dollari
            l'anno;
          </li>
          <li className="not-last:mb-8">
            Prodotti <strong>n°1 al Mondo</strong> per il controllo del peso;
          </li>
          <li className="not-last:mb-8">
            Azienda presente in <strong>95 Paesi nel Mondo</strong>;
          </li>
          <li className="not-last:mb-8">
            Possibilità di lavorare <strong>fin da subito</strong> in ogni paese
            in cui l'azienda è presente.
          </li>
        </ol>
      </>
    ),
  },
  {
    title: "avvia oggi stesso la tua attività commerciale",
    video: "https://youtu.be/B3L5Hejcbao",
    text: (
      <>
        Costruisci un'attività commerciale indipendente con l’opportunità
        Herbalife Nutrition, uno dei marchi di vendita diretta leader a livello
        mondiale. Inizia oggi: approfitta del nostro comprovato successo come
        leader del settore con decenni di esperienza e getta le basi per la tua
        attività.
      </>
    ),
  },
  {
    title: "inizia oggi la tua scalata",
    image: "/immagini/business/piano-marketing.webp",
    text: (
      <>
        In Herbalife il successo non è questione di fortuna, ma di impegno e
        determinazione. Il nostro piano marketing è strutturato in modo chiaro e
        meritocratico: ogni livello rappresenta un obiettivo concreto da
        raggiungere, con traguardi ben definiti. Chiunque può avanzare nel
        percorso, partendo da Distributore fino ai più alti riconoscimenti
        aziendali, semplicemente lavorando con costanza e raggiungendo i
        requisiti previsti per ogni fase. Non ci sono limiti: il tuo successo
        dipende solo da te. Se sogni di costruire una carriera solida nel
        settore della nutrizione e del benessere, Herbalife ti offre un sistema
        di crescita che premia l'impegno, i risultati e la passione.{" "}
        <a
          href={`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeMessage}`}
          className="section-a"
          target="_blank"
        >
          Contattami per iniziare
        </a>
      </>
    ),
  },
  {
    title: "il tuo starter pack",
    image: "/immagini/business/herbalife-member-pack.webp",
    square: true,
    text: (
      <>
        Sottoscrivi il contratto da Incaricato alle vendite Herbalife Nutrition
        e acquista l’Herbalife Nutrition Member Pack, dove trovi gli strumenti
        essenziali per muovere i primi passi nella tua nuova attività.
        <ol className="mt-10 list-decimal">
          <li className="not-last:mb-8">
            <strong>Zaino</strong> herbalife;
          </li>
          <li className="not-last:mb-8">
            <strong>Shaker</strong> herbalife;
          </li>
          <li className="not-last:mb-8">
            <strong>Formula 1</strong>: sostituto del pasto;
          </li>
          <li className="not-last:mb-8">Materiale informativo;</li>
          <li className="not-last:mb-8">
            <strong>Cucchiaio dosatore</strong> Herbalife;
          </li>
          <li className="not-last:mb-8">
            GoHerbalife - il tuo <strong>negozio online gratuito</strong>{" "}
            Herbalife;
          </li>
          <li className="not-last:mb-8">Catalogo Prodotti Herbalife;</li>
          <li className="not-last:mb-8">
            Accesso a strumenti e formazione online gratuita
          </li>
        </ol>
      </>
    ),
  },
  {
    title: "garanzie gold standard",
    image: "/immagini/business/garanzie-gold-standard-herbalife.webp",
    text: (
      <>
        Gold Standard è il nostro impegno per aiutarti a crescere. Significa che
        lavorare con noi è semplice, che siamo assolutamente trasparenti e in
        grado di offrirti ottime condizioni per sostenere i tuoi obiettivi
        nell'attività. Bassi costi d’avviamento: non sono richiesti acquisti
        minimi e i costi iniziali sono ridotti Non esiste alcun obbligo di
        acquisto di “Strumenti per l’attività” per intraprendere o avere
        successo nell’attività Herbalife Nutrition. Forniamo informazioni
        chiare, precise e tempestive in relazione ai potenziali guadagni a
        coloro ai quali viene presentata l’opportunità commerciale. Garanzia
        "soddisfatti o rimborsati": in caso di cessazione, per qualsiasi motivo,
        del Contratto Herbalife Nutrition entro 90 giorni, è prevista una
        garanzia per il rimborso dell’intero costo dell’Herbalife Nutrition
        Member Pack. È prevista una garanzia per il rimborso dell’intero costo
        dei prodotti resi integri.
      </>
    ),
  },
];

export const SECTIONPOLICY = [
  {
    text: (
      <>
        {/* <!-- ShareThis BEGIN --> */}
        <div className="sharethis-privacy-policy"></div>
        {/* <!-- ShareThis END --> */}
      </>
    ),
  },
];
