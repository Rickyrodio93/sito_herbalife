import Background from "@/components/background/background";
import ImpostazioniCookie from "@/components/footer/ImpostazioniCookie";
import Section from "@/components/Section/Section";

export const metadata = {
    title: "privacy policy",
    description:
        "Informativa sul trattamento dei dati personali e sui cookie del sito di Riccardo Rodio.",
    alternates: { canonical: "https://www.riccardorodio.com/privacy" },
    robots: { index: false, follow: false },
};

const AGGIORNAMENTO = "26 ottobre 2026";
const MAIL = "rodioriccardo@gmail.com";

const P = ({ children }) => <p>{children}</p>;
const Lista = ({ children }) => (
    <ul className="list-disc space-y-2 pl-6">{children}</ul>
);

const COOKIE = [
    ["theme", "Memorizzato nel browser", "Ricorda tema chiaro o scuro", "Finché non lo cancelli"],
    ["disclaimer_accepted", "Memorizzato nel browser", "Ricorda che hai letto l'avviso iniziale", "Finché non lo cancelli"],
    ["chat_user_id", "Memorizzato nel browser", "Identificativo anonimo per la conversazione con l'assistente virtuale", "Finché non lo cancelli"],
    ["Cookie di Google Tag Manager / Analytics", "Terze parti", "Statistiche di navigazione, secondo la configurazione attiva", "Variabile, vedi informative Google"],
    ["Cookie di YouTube", "Terze parti", "Riproduzione dei video incorporati", "Variabile, vedi informative Google"],
];

const SEZIONI = [
    {
        titolo: "titolare del trattamento",
        corpo: (
            <>
                <P>
                    Il titolare del trattamento è <strong>Riccardo Rodio</strong>,
                    Distributore Indipendente Herbalife (ID 25800048), [indirizzo / sede,
                    da completare].
                </P>
                <P>
                    Contatti: <a href={`mailto:${MAIL}`}>{MAIL}</a>, telefono +39 349 663 5371.
                </P>
                <P>
                    Questo sito non è gestito direttamente da Herbalife. Se acquisti
                    tramite il negozio online o MyHerbalife, i dati che inserisci in
                    quelle piattaforme sono trattati da Herbalife o dal fornitore
                    indicato, secondo le loro informative.
                </P>
            </>
        ),
    },
    {
        titolo: "quali dati raccolgo e perché",
        corpo: (
            <>
                <h3>Modulo contatti</h3>
                <P>
                    Nome e cognome, email, numero di telefono e testo del messaggio.
                    Li uso solo per risponderti. Il modulo è gestito dal servizio
                    FormSubmit, che inoltra il messaggio alla mia casella email.
                </P>

                <h3>Modulo di consulenza (&quot;come iniziare&quot;)</h3>
                <P>
                    Anagrafica (nome, cognome, sesso, email, telefono) e, per i
                    prodotti, altezza, peso attuale, peso obiettivo, frequenza di
                    allenamento e consumo di acqua; per l&apos;attività, esperienze,
                    tempo disponibile e motivazione. I dati non vengono salvati dal
                    sito: alla conferma si apre WhatsApp con un messaggio precompilato
                    che invii tu. Da quel momento li ricevo e li tratto per preparare la
                    consulenza richiesta. Il calcolo dell&apos;IMC avviene nel tuo
                    browser.
                </P>

                <h3>Assistente virtuale</h3>
                <P>
                    I messaggi che scrivi nella chat vengono salvati insieme a un
                    identificativo anonimo generato nel tuo browser, e inviati al
                    servizio di intelligenza artificiale Google Gemini per generare la
                    risposta. <strong>Non inserire dati sulla tua salute o altri dati
                        sensibili nella chat.</strong> Le risposte sono informative e non
                    sostituiscono il parere di un medico o di un nutrizionista.
                </P>

                <h3>Generatore di preventivo</h3>
                <P>
                    I calcoli avvengono nel tuo browser e il sito non salva i prodotti
                    che selezioni. Se scegli di inviare l&apos;ordine su WhatsApp, il
                    messaggio contiene l&apos;elenco dei prodotti e viene inviato da te.
                </P>

                <h3>Dati di navigazione</h3>
                <P>
                    Tramite Google Tag Manager possono essere raccolte informazioni
                    sulle pagine visitate e sull&apos;uso del sito (indirizzo IP,
                    dispositivo, browser, pagine viste), per statistiche e
                    miglioramento del sito. Vedi la sezione cookie.
                </P>
            </>
        ),
    },
    {
        titolo: "basi giuridiche",
        corpo: (
            <Lista>
                <li>
                    <strong>Richiesta dell&apos;utente</strong> (art. 6.1.b GDPR):
                    risposta ai messaggi e preparazione della consulenza che chiedi.
                </li>
                <li>
                    <strong>Consenso</strong> (art. 6.1.a e, per i dati sulla salute,
                    art. 9.2.a): dati su peso, altezza e abitudini, e cookie non
                    tecnici. Puoi revocarlo in qualsiasi momento, senza effetto sui
                    trattamenti già svolti.
                </li>
                <li>
                    <strong>Legittimo interesse</strong> (art. 6.1.f): sicurezza del
                    sito e prevenzione degli abusi.
                </li>
            </Lista>
        ),
    },
    {
        titolo: "dati relativi alla salute",
        corpo: (
            <P>
                Peso, altezza e abitudini alimentari o sportive possono essere
                considerati dati relativi alla salute. Li tratto solo con il tuo
                consenso esplicito, per fornirti la consulenza richiesta, e non li
                uso per altri scopi. Compilare il modulo è facoltativo: se non
                vuoi condividerli, puoi contattarmi direttamente.
            </P>
        ),
    },
    {
        titolo: "a chi comunico i dati",
        corpo: (
            <>
                <P>
                    Non vendo i tuoi dati. Per far funzionare il sito mi avvalgo di
                    fornitori che agiscono come responsabili del trattamento o come
                    titolari autonomi:
                </P>
                <Lista>
                    <li><strong>Vercel</strong>: hosting del sito.</li>
                    <li><strong>Supabase</strong>: archivio dei messaggi della chat.</li>
                    <li><strong>Google</strong> (Gemini, Tag Manager, YouTube): risposte dell&apos;assistente, statistiche e video.</li>
                    <li><strong>FormSubmit</strong>: inoltro dei messaggi del modulo contatti.</li>
                    <li><strong>Meta (WhatsApp)</strong>: quando scegli di scrivermi o inviare un ordine su WhatsApp.</li>
                </Lista>
                <P>
                    Posso comunicare i dati a chi li richiede per obbligo di legge.
                </P>
            </>
        ),
    },
    {
        titolo: "trasferimenti fuori dall'ue",
        corpo: (
            <P>
                Alcuni fornitori hanno sede o server fuori dallo Spazio Economico
                Europeo, in particolare negli Stati Uniti. Il trasferimento avviene
                sulla base delle garanzie previste dal GDPR, come le clausole
                contrattuali standard o la decisione di adeguatezza (EU-US Data
                Privacy Framework), dove i fornitori vi aderiscono.
            </P>
        ),
    },
    {
        titolo: "per quanto tempo conservo i dati",
        corpo: (
            <Lista>
                <li>Messaggi del modulo contatti e di WhatsApp: [12 mesi] dall&apos;ultimo contatto, salvo diverso obbligo di legge.</li>
                <li>Dati della consulenza (salute): [12 mesi] dall&apos;ultimo contatto, poi eliminati.</li>
                <li>Conversazioni con l&apos;assistente virtuale: [6 mesi].</li>
                <li>Dati di navigazione: secondo le impostazioni di Google Analytics ([14 mesi]).</li>
            </Lista>
        ),
    },
    {
        titolo: "cookie e archiviazione locale",
        corpo: (
            <>
                <P>
                    Il sito usa strumenti tecnici, necessari al funzionamento e che non
                    richiedono consenso, e strumenti di terze parti per statistiche e
                    video.
                </P>
                <div className="overflow-x-auto rounded-2xl border border-line">
                    <table className="w-full min-w-136 border-collapse text-sm">
                        <thead className="bg-raised text-left text-xs uppercase tracking-wider text-zinc-600 dark:text-zinc-300">
                            <tr>
                                {["Nome", "Tipo", "Finalità", "Durata"].map((h) => (
                                    <th key={h} className="px-4 py-3 font-bold">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-line">
                            {COOKIE.map((riga) => (
                                <tr key={riga[0]}>
                                    {riga.map((cella, i) => (
                                        <td key={i} className={`px-4 py-3 ${i === 0 ? "font-mono text-xs" : ""}`}>
                                            {cella}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <P>
                    Puoi eliminare i dati salvati dal sito dalle impostazioni del
                    browser. Per i cookie di Google puoi consultare{" "}
                    <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer">
                        l&apos;informativa di Google
                    </a>
                    .
                </P>
                <P>
                    Puoi cambiare o revocare le tue scelte in qualsiasi momento: <ImpostazioniCookie className="font-bold underline underline-offset-4" />
                </P>
            </>
        ),
    },
    {
        titolo: "i tuoi diritti",
        corpo: (
            <>
                <P>Puoi in qualsiasi momento chiedere:</P>
                <Lista>
                    <li>l&apos;accesso ai tuoi dati e una copia;</li>
                    <li>la rettifica dei dati inesatti;</li>
                    <li>la cancellazione dei dati;</li>
                    <li>la limitazione del trattamento;</li>
                    <li>la portabilità dei dati;</li>
                    <li>l&apos;opposizione al trattamento;</li>
                    <li>la revoca del consenso, senza pregiudizio per il trattamento già avvenuto.</li>
                </Lista>
                <P>
                    Per esercitarli scrivi a <a href={`mailto:${MAIL}`}>{MAIL}</a>.
                    Hai inoltre il diritto di presentare reclamo al{" "}
                    <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer">
                        Garante per la protezione dei dati personali
                    </a>
                    .
                </P>
            </>
        ),
    },
    {
        titolo: "minori",
        corpo: (
            <P>
                Il sito e i moduli sono rivolti a persone maggiorenni. Non raccolgo
                consapevolmente dati di minori di 18 anni.
            </P>
        ),
    },
    {
        titolo: "link esterni",
        corpo: (
            <P>
                Il sito rimanda a servizi di terzi (negozio Herbalife, MyHerbalife,
                Bioniq, Pro2Col, social network). Una volta lasciato il sito, valgono
                le informative di quei servizi, di cui non sono responsabile.
            </P>
        ),
    },
    {
        titolo: "modifiche a questa informativa",
        corpo: (
            <P>
                Posso aggiornare questa informativa quando cambiano il sito o la
                normativa. La data dell&apos;ultimo aggiornamento è indicata in alto.
            </P>
        ),
    },
];

export default function PrivacyPolicy() {
    return (
        <main>
            <Background
                titolo="privacy policy"
                sottotitolo={`Informativa sul trattamento dei dati personali. Ultimo aggiornamento: ${AGGIORNAMENTO}.`}
                src="/immagini/background/home_hero_3to1.webp"
                compatta
            />

            {SEZIONI.map(({ titolo, corpo }) => (
                <Section key={titolo}>
                    <div className="mx-auto flex max-w-4xl flex-col gap-6 text-left">
                        <h2>{titolo}</h2>
                        <div className="space-y-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300 [&_h3]:mt-2 [&_h3]:text-lg [&_h3]:font-black [&_h3]:text-zinc-900 dark:[&_h3]:text-zinc-100">
                            {corpo}
                        </div>
                    </div>
                </Section>
            ))}
        </main>
    );
}