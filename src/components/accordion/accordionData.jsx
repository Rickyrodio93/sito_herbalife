import { Mail, MessageSquare, Phone, User } from "lucide-react";
import Input from "../Inputs/Input";

export const AccordionData = [
  {
    id: 1,
    categoria: "business",
    title: "Quanto tempo bisogna dedicare all'attività Herbalife?",
    content: (
      <>
        <p>
          L'attività Herbalife può essere svolta sia part-time che full-time.
          Puoi dedicarci da 4 a 40 ore settimanali, in base ai tuoi obiettivi e
          alla tua disponibilità.
        </p>
        <p className="mt-2">
          Molte persone iniziano affiancandola al proprio lavoro principale e
          aumentano gradualmente il tempo dedicato man mano che crescono i
          risultati.
        </p>
      </>
    ),
  },

  {
    id: 2,
    categoria: "business",
    title: "Quanto si può guadagnare con l'attività Herbalife?",
    content: (
      <>
        <p>
          I guadagni dipendono dall'impegno, dal tempo dedicato e dalla capacità
          di sviluppare una rete clienti. Non esiste un guadagno fisso: i
          risultati variano da persona a persona.
        </p>
        <p className="mt-2">
          Prima di iniziare è importante leggere la{" "}
          <a
            className="text-blue-600 hover:text-blue-700 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
            href="https://assets.herbalifenutrition.com/content/dam/regional/emea/it_it/consumable_content/policy-and-compliance/2021/05-May/SAGC_it-IT.pdf/_jcr_content/renditions/original"
          >
            Dichiarazione dei compensi medi lordi
          </a>{" "}
          ufficiale.
        </p>
        <p className="mt-2">
          Con aspettative realistiche e costanza, è possibile costruire un
          reddito extra o un'attività principale nel tempo.
        </p>
      </>
    ),
  },

  {
    id: 3,
    categoria: "business",
    title: "Quali sono i vantaggi di diventare Distributore Herbalife?",
    content: (
      <>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Flessibilità:</strong> decidi tu orari e modalità di lavoro.
          </li>
          <li>
            <strong>Prodotti di qualità:</strong> formulati scientificamente e
            utilizzati ogni giorno da milioni di clienti nel mondo.
          </li>
          <li>
            <strong>Comunità e supporto:</strong> entri in un network globale
            con formazione e affiancamento continuo.
          </li>
          <li>
            <strong>Formazione costante:</strong> accesso a materiali, eventi,
            strumenti digitali e aggiornamenti professionali.
          </li>
        </ul>
      </>
    ),
  },

  {
    id: 4,
    categoria: "business",
    title: "Posso interrompere l'attività se cambio idea?",
    content: (
      <>
        <p>
          Sì. Puoi recedere dal contratto in qualsiasi momento, come previsto
          dalle Garanzie Gold Standard.
        </p>
        <p className="mt-2">
          Se interrompi l'attività entro 90 giorni, è prevista la possibilità di
          rimborso dell'intero costo dell'Herbalife Member Pack secondo le
          condizioni contrattuali.
        </p>
      </>
    ),
  },

  {
    id: 5,
    categoria: "business",
    title: "Serve una laurea in nutrizione per iniziare?",
    content: (
      <>
        <p>
          No, non è richiesta una laurea in nutrizione. Riceverai formazione
          specifica attraverso una piattaforma di e-learning, eventi dal vivo e
          training guidati da leader esperti.
        </p>
        <p className="mt-2">
          Il sistema è strutturato per permettere anche a chi parte da zero di
          apprendere gradualmente competenze su prodotti, benessere e vendita.
        </p>
      </>
    ),
  },

  {
    id: 6,
    categoria: "business",
    title: "Perché iniziare un'attività nel settore benessere oggi?",
    content: (
      <>
        <p>
          Il settore del benessere è in costante crescita e sempre più persone
          cercano soluzioni per migliorare alimentazione e stile di vita.
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Possibilità di creare un reddito extra</li>
          <li>Attività flessibile e gestibile online</li>
          <li>Supporto di un marchio globale</li>
          <li>Crescita personale e professionale</li>
        </ul>
      </>
    ),
  },

  {
    id: 7,
    categoria: "business",
    title: "Come si inizia concretamente l'attività Herbalife?",
    content: (
      <>
        <p>
          Per iniziare è necessario acquistare l'Herbalife Member Pack (HMP),
          che include materiali informativi e strumenti per avviare l'attività.
        </p>
        <p className="mt-2">
          Scrivimi su{" "}
          <a
            className="text-blue-600 hover:text-blue-700 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
            href="https://wa.me/+393496635371"
          >
            WhatsApp
          </a>{" "}
          per ricevere tutte le informazioni sui passaggi, i costi e le modalità
          di iscrizione.
        </p>
      </>
    ),
  },

  {
    id: 8,
    categoria: "business",
    title: "Qual è il costo iniziale per diventare Distributore Herbalife?",
    content: (
      <p>
        Il costo iniziale corrisponde all'acquisto dell'Herbalife Member Pack.
        Non sono richiesti costi fissi mensili obbligatori. Per dettagli
        aggiornati scrivimi direttamente su{" "}
        <a
          className="text-blue-600 hover:text-blue-700 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
          href="https://wa.me/+393496635371"
        >
          WhatsApp.
        </a>
      </p>
    ),
  },

  {
    id: 9,
    categoria: "business",
    title: "È un'attività adatta anche a chi lavora già?",
    content: (
      <p>
        Sì, molte persone iniziano questa attività come secondo lavoro. Può
        essere gestita in modo flessibile, adattandola ai propri impegni
        familiari e professionali.
      </p>
    ),
  },
  {
    id: 10,
    categoria: "business",
    title: "Come vengono controllati i prodotti Herbalife?",
    content: (
      <p>
        I prodotti vengono sottoposti a controlli durante tutte le fasi della
        produzione, dalla selezione degli ingredienti fino al prodotto finale.
      </p>
    ),
  },
  {
    id: 11,
    categoria: "business",
    title: "Gli ingredienti sono verificati?",
    content: (
      <p>
        Sì, gli ingredienti utilizzati vengono analizzati per garantire purezza,
        qualità nutrizionale e sicurezza.
      </p>
    ),
  },
  {
    id: 12,
    categoria: "business",
    title: "i prodotti sono testati?",
    content: (
      <p>
        I prodotti vengono monitorati e verificati per assicurare la conformità
        alle specifiche di qualità e alle informazioni presenti in etichetta.
      </p>
    ),
  },
];

export const AccordionDataProdotto=[
  {
    id: 101,
    categoria: "prodotto",
    title: "Che differenza c'è tra Bioniq e un multivitaminico generico?",
    content: (
      <>
        <p>
          Un multivitaminico generico contiene le stesse dosi per chiunque lo
          acquisti. Bioniq, invece, formula l'integrazione a partire
          dall'analisi dei tuoi biomarcatori ematici: la composizione è
          calcolata sulle reali carenze ed esigenze del tuo organismo.
        </p>
        <p className="mt-2">
          Il risultato è un&apos;integrazione mirata, non uno standard uguale
          per tutti.
        </p>
      </>
    ),
  },
  {
    id: 102,
    categoria: "prodotto",
    title: "Come funziona l'analisi dei biomarcatori?",
    content: (
      <p>
        Dopo la valutazione iniziale, i tuoi valori ematici vengono analizzati
        da un sistema di intelligenza artificiale che individua eventuali
        carenze o squilibri e costruisce una formula personalizzata sulla base
        di quei dati.
      </p>
    ),
  },
  {
    id: 103,
    categoria: "prodotto",
    title: "In quanto tempo ricevo la mia formula personalizzata?",
    content: (
      <p>
        I tempi variano in base alla disponibilità del laboratorio e alla fase
        di analisi. Durante la consulenza ti indico una stima precisa in base
        al tuo caso specifico.
      </p>
    ),
  },
  {
    id: 104,
    categoria: "prodotto",
    title: "I prodotti sono sicuri e controllati?",
    content: (
      <p>
        Sì. Le formulazioni seguono standard di controllo qualità rigorosi in
        ogni fase, dalla selezione degli ingredienti fino al prodotto finale,
        con verifiche di purezza e conformità.
      </p>
    ),
  },
  {
    id: 105,
    categoria: "prodotto",
    title: "Posso abbinare Bioniq ai prodotti Herbalife?",
    content: (
      <p>
        Sì, molte persone integrano il percorso Bioniq con la linea
        nutrizionale Herbalife. Durante la consulenza valutiamo insieme la
        combinazione più adatta ai tuoi obiettivi.
      </p>
    ),
  }
]

export const ContattiData = [
  {
    id: 1,
    title: "telefono",
    content: (
      <div className="flex justify-center">
        <a
          href={`tel:${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
          className="w-full sm:w-auto text-center bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 hover:bg-herbalife-1 hover:text-white dark:hover:bg-green-500 dark:hover:text-zinc-900 px-6 py-3 rounded-xl font-bold text-lg shadow-sm transition-all duration-300"
        >
          (+39)349-6635371
        </a>
      </div>
    ),
  },
  {
    id: 2,
    title: "mail",
    content: (
      <div className="flex justify-center">
        <a
          target="_blank"
          href="rodioriccardo@gmail.com&subject=info%20Herbalife"
          className="w-full sm:w-auto text-center bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 hover:bg-herbalife-1 hover:text-white dark:hover:bg-green-500 dark:hover:text-zinc-900 px-6 py-3 rounded-xl font-bold text-lg shadow-sm transition-all duration-300"
        >
          rodioriccardo@gmail.com
        </a>
      </div>
    ),
  },
  {
    id: 3,
    title: "whatsApp",
    content: (
      <div className="flex justify-center">
        <a
          target="_blank"
          className="w-full sm:w-auto text-center bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 hover:bg-herbalife-1 hover:text-white dark:hover:bg-green-500 dark:hover:text-zinc-900 px-6 py-3 rounded-xl font-bold text-lg shadow-sm transition-all duration-300"
          href="https://wa.me/+393496635371"
        >
          wa.me/+393496635371
        </a>
      </div>
    ),
  },
  {
    id: 4,
    title: "telegram",
    content: (
      <div className="flex justify-center">
        <a
          target="_blank"
          className="w-full sm:w-auto text-center bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 hover:bg-herbalife-1 hover:text-white dark:hover:bg-green-500 dark:hover:text-zinc-900 px-6 py-3 rounded-xl font-bold text-lg shadow-sm transition-all duration-300"
          href="https://t.me/RickyCoach24"
        >
          t.me/RickyCoach24
        </a>
      </div>
    ),
  },
  {
    id: 5,
    title: "facebook",
    content: (
      <div className="flex justify-center">
        <a
          target="_blank"
          className="w-full sm:w-auto text-center bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 hover:bg-herbalife-1 hover:text-white dark:hover:bg-green-500 dark:hover:text-zinc-900 px-6 py-3 rounded-xl font-bold text-lg shadow-sm transition-all duration-300"
          href="https://www.facebook.com/Ricky.rh24coach/"
        >
          Ricky.rh24coach
        </a>
      </div>
    ),
  },
  {
    id: 6,
    title: "instagram",
    content: (
      <div className="flex justify-center">
        <a
          target="_blank"
          className="w-full sm:w-auto text-center bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 hover:bg-herbalife-1 hover:text-white dark:hover:bg-green-500 dark:hover:text-zinc-900 px-6 py-3 rounded-xl font-bold text-lg shadow-sm transition-all duration-300"
          href="https://www.instagram.com/riccardo_rodio_wellness_coach/"
        >
          riccardo_rodio_wellness_coach
        </a>
      </div>
    ),
  },
  {
    id: 7,
    title: "linkedIn",
    content: (
      <div className="flex justify-center">
        <a
          target="_blank"
          className="w-full sm:w-auto text-center bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 hover:bg-herbalife-1 hover:text-white dark:hover:bg-green-500 dark:hover:text-zinc-900 px-6 py-3 rounded-xl font-bold text-lg shadow-sm transition-all duration-300"
          href="https://www.linkedin.com/in/riccardo-rodio-593517120/"
        >
          Riccardo Rodio
        </a>
      </div>
    ),
  },
  {
    id: 8,
    title: "pinterest",
    content: (
      <div className="flex justify-center">
        <a
          target="_blank"
          className="w-full sm:w-auto text-center bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 hover:bg-herbalife-1 hover:text-white dark:hover:bg-green-500 dark:hover:text-zinc-900 px-6 py-3 rounded-xl font-bold text-lg shadow-sm transition-all duration-300"
          href="https://www.pinterest.it/riccardorodio/_saved/"
        >
          riccardorodio
        </a>
      </div>
    ),
  },
  {
    id: 9,
    title: "lascia un messaggio",
    content: (
      <form
        action="https://formsubmit.co/33bded7bb2b0f311323c25d896b09823"
        method="POST"
        className="flex flex-col gap-3 pt-2"
      >
        <Input
          type="text"
          name="nome e cognome"
          placeholder="nome e cognome"
          iconaDestra={<User size={18} />}
          required
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          required
          iconaDestra={<Mail size={18} />}
        />
        <Input
          type="tel"
          name="numero di whatsapp"
          placeholder="numero di whatsapp"
          iconaDestra={<Phone size={18} />}
          required
        />
        <Input
          as="textarea"
          name="messaggio"
          placeholder="scrivi qui la tua richiesta"
          iconaDestra={<MessageSquare size={18} />}
          required
        />
        <div className="flex gap-3 pt-2">
          <button
            className="w-1/2 bg-herbalife-1 dark:bg-green-600 hover:opacity-90 text-white px-4 py-3 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer"
            type="submit"
          >
            Invia
          </button>
          <button
            className="w-1/2 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-700 px-4 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer"
            type="reset"
          >
            reset
          </button>
        </div>
      </form>
    ),
  },
];
