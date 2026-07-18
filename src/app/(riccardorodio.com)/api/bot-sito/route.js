import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || ""
);

// 1. Mappa delle pagine del tuo sito (Sostituisci con i tuoi URL reali)
const urlPrincipale = "https://www.riccardorodio.com"
const PAGINE_SITO = {
    home: `${urlPrincipale}`,
    controlloPeso: `${urlPrincipale}/controlloPeso`,
    ottimizza: `${urlPrincipale}/ottimizza`,
    sport: `${urlPrincipale}/sport`,
    curaDellaPelleEDelCorpo: `${urlPrincipale}/skin`,
    ricette: `${urlPrincipale}/ricette`,
    scienza: `${urlPrincipale}/scienza`,
    preventivo: `${urlPrincipale}/preventivo`,
    contatti: `${urlPrincipale}/contatti`,
    business: `${urlPrincipale}/business`,
    domandeFrequenti: `${urlPrincipale}/faq`,
};

// 2. Funzione nativa di estrazione testo (Scraper)
async function estraiTestoSito(url) {
    try {
        const res = await fetch(url, { next: { revalidate: 3600 } }); // Cache di 1 ora per non sovraccaricare il tuo sito
        if (!res.ok) return "";
        let html = await res.text();

        // Rimuoviamo i tag che non contengono testo utile usando le regex
        html = html
            .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
            .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
            .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, "")
            .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, "");

        // 2. TRASFORMAZIONE INTELLIGENTE: Converte i link HTML in testo leggibile dall'IA prima di cancellare i tag
        html = html.replace(/<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, (match, href, testoLink) => {
            const testoPulito = testoLink.replace(/<[^>]+>/g, "").trim();
            if (!testoPulito || href.startsWith("#") || href.startsWith("javascript:")) return testoPulito;
            return ` [${testoPulito}](${href}) `;
        });

        // 3. Rimuove tutti i restanti tag HTML e pulisce gli spazi
        let testoPulito = html
            .replace(/<[^>]+>/g, " ")
            .replace(/\s+/g, " ")
            .trim();

        return testoPulito.substring(0, 5000);
    } catch (e) {
        console.error("Errore scraping pagina:", e);
        return "";
    }
}

export async function POST(req) {
    try {
        const { message, userId } = await req.json();
        if (!message || !userId) return NextResponse.json({ error: "Dati mancanti" }, { status: 400 });

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) return NextResponse.json({ error: "Chiave mancante" }, { status: 500 });

        // 3. Capire quale pagina serve analizzare in base alla domanda
        const domanda = message.toLowerCase();
        let urlDaScansionare = PAGINE_SITO.home; // Di default parte dalla Home

        if (domanda.includes("prezz") || domanda.includes("cost") || domanda.includes("compr") || domanda.includes("acquist") || domanda.includes("ordin")) {
            urlDaScansionare = PAGINE_SITO.home; // O la pagina e-commerce esterna se presente
        } else if (domanda.includes("peso") || domanda.includes("dimagr") || domanda.includes("ingrass") || domanda.includes("calorie") || domanda.includes("pancia") || domanda.includes("forma")) {
            urlDaScansionare = PAGINE_SITO.controlloPeso;
        } else if (domanda.includes("ottimizz") || domanda.includes("benessere") || domanda.includes("integrazion") || domanda.includes("vitalit") || domanda.includes("vitamin")) {
            urlDaScansionare = PAGINE_SITO.ottimizza;
        } else if (domanda.includes("sport") || domanda.includes("palestra") || domanda.includes("allenam") || domanda.includes("muscol") || domanda.includes("energia")) {
            urlDaScansionare = PAGINE_SITO.sport;
        } else if (domanda.includes("skin") || domanda.includes("pelle") || domanda.includes("crema") || domanda.includes("viso") || domanda.includes("corpo")) {
            urlDaScansionare = PAGINE_SITO.curaDellaPelleEDelCorpo;
        } else if (domanda.includes("ricett") || domanda.includes("pancake") || domanda.includes("plumcake") || domanda.includes("shaker") || domanda.includes("cucin")) {
            urlDaScansionare = PAGINE_SITO.ricette;
        } else if (domanda.includes("scienza") || domanda.includes("medici") || domanda.includes("comitato") || domanda.includes("sicur")) {
            urlDaScansionare = PAGINE_SITO.scienza;
        } else if (domanda.includes("preventiv") || domanda.includes("quant") || domanda.includes("calcol")) {
            urlDaScansionare = PAGINE_SITO.preventivo;
        } else if (domanda.includes("contatt") || domanda.includes("whatsapp") || domanda.includes("telefon") || domanda.includes("scriv")) {
            urlDaScansionare = PAGINE_SITO.contatti;
        } else if (domanda.includes("lavor") || domanda.includes("candidat") || domanda.includes("guadagn") || domanda.includes("business") || domanda.includes("guadagn") || domanda.includes("fattur")) {
            urlDaScansionare = PAGINE_SITO.business;
        } else if (domanda.includes("domand") || domanda.includes("faq") || domanda.includes("funzion")) {
            urlDaScansionare = PAGINE_SITO.domandeFrequenti;
        }

        // 4. Esecuzione dello scraping in tempo reale
        const testoPagina = await estraiTestoSito(urlDaScansionare);

        // Salviamo il messaggio utente su Supabase
        await supabase.from("chat_messages").insert([{ user_id: userId, text: message, role: "user" }]);

        // Recupero cronologia
        const { data: history } = await supabase
            .from("chat_messages")
            .select("role, text")
            .eq("user_id", userId)
            .order("created_at", { ascending: true })
            .limit(6);

        // Prepariamo le istruzioni dinamiche con il testo appena estratto dal tuo sito
        const istruzioniSistema = `
            Sei l'Assistente Virtuale formale di Riccardo Rodio, Distributore Indipendente Herbalife.
            Il tuo compito è rispondere alla domanda dell'utente basandoti unicamente sulle informazioni estratte dal sito web fornite qui sotto.

            INFORMAZIONI ESTRATTE DALLA PAGINA (${urlDaScansionare}):
            ""
            ${testoPagina}
            ""

            REGOLE TASSATIVE DI RISPOSTA:
            1. TONO E STILE: Rispondi in modo formale, usando il "Lei". Sii estremamente stringato e conciso. Rispondi solo alla domanda e non aggiungere introduzioni o conclusioni di cortesia inutili.
            2. RIGIDO VINCOLO DEI LINK: Puoi mostrare all'utente SOLO ED ESCLUSIVAMENTE i link URL che sono chiaramente visibili e scritti nel testo sopra nel formato [Testo](URL). È severamente vietato inventare URL, ipotizzare percorsi o creare link non presenti nel testo.
            3. COERENZA SUL CONTROLLO PESO: Se l'utente chiede prodotti per perdere peso, controlla nel testo sopra i nomi esatti dei prodotti menzionati (es. Formula 1, Aloe, ecc.). Se nel testo sopra non sono presenti esplicitamente i nomi dei prodotti o i consigli specifici, NON inventarli.
            4. COMPORTAMENTO IN CASO DI MANCANZA DATI: Se nel testo fornito non trovi la risposta esatta alla domanda o mancano i dettagli specifici sui prodotti richiesti, non inventare nulla e non strutturare risposte elusive. Di' esattamente ed esclusivamente questo testo: 
            "Non dispongo di questa informazione specifica nel sito. La invito a parlare direttamente con Riccardo Rodio per ricevere una consulenza personalizzata." 
            e subito sotto mostra l'unico link di contatto sicuro: [Clicchi qui per parlare su WhatsApp](https://wa.me/393496635371).
            `;

        // Costruiamo la conversazione per Gemini
        const contents = [
            { role: "user", parts: [{ text: `ISTRUZIONI:\n${istruzioniSistema}\n\nRispondi alla domanda dell'utente.` }] },
            { role: "model", parts: [{ text: "Ricevuto. Risponderò in modo formale e sintetico basandomi solo sui dati estratti dal sito." }] }
        ];

        if (history) {
            history.forEach(msg => {
                contents.push({
                    role: msg.role === "assistant" ? "model" : "user",
                    parts: [{ text: msg.text }]
                });
            });
        }

        // 5. Chiamata a Gemini 3.5 Flash
        const urlGemini = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`;
        const response = await fetch(urlGemini, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error?.message || "Errore Gemini");

        const aiReply = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!aiReply) throw new Error("Risposta vuota");

        // Salviamo la risposta su Supabase
        await supabase.from("chat_messages").insert([{ user_id: userId, text: aiReply, role: "assistant" }]);

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("❌ ERRORE SERVER:", error.message);
        return NextResponse.json({ error: "Errore interno", dettagli: error.message }, { status: 500 });
    }
}