// import axios from "axios";
// import { NextResponse } from "next/server";
// import { getBotResponse } from "@/lib/botAnswer";

// export async function POST(req) {
//     const token = process.env.TELEGRAM_BOT_TOKEN;
//     const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`

//     try {
//         const body = await req.json();

//         // Verifichiamo che l'evento contenga un messaggio testuale valido
//         if (body.message && body.message.text) {
//             const chatId = body.message.chat.id;
//             const userText = body.message.text.toLowerCase().trim();

//             let botReply = "";

//             // 1. GESTIONE COMANDI (Ex start_command e help_command del tuo main.py)
//             if (userText === "/start") {
//                 botReply = "Ciao e benvenuto/a! Sono l'assistente virtuale di Riccardo Rodio. Digita una parola chiave, usa i comandi o clicca sul menu per iniziare.";
//             } else if (userText === "/help") {
//                 botReply = "Hai bisogno di aiuto? Digita una parola chiave o usa uno dei comandi rapidi:\n\n• /catalogo_prodotti\n• /prezzi\n• /lavora_con_me\n• /valutazione_benessere\n• /prenota_evento\n• /contatto";
//             } else {
//                 // 2. GESTIONE MESSAGGI STANDARD (Ex handle_message + responses.py)
//                 botReply = getBotResponse(userText);
//             }

//             // 3. INVIO RISPOSTA A TELEGRAM
//             await axios.post(telegramUrl, {
//                 chat_id: chatId,
//                 text: botReply,
//                 parse_mode: "Markdown", // Rende i link e i testi formattati cliccabili e puliti
//                 reply_markup: {
//                     keyboard: [
//                         [{ text: "/catalogo_prodotti" }, { text: "/prezzi" }],
//                         [{ text: "/lavora_con_me" }, { text: "/valutazione_benessere" }],
//                         [{ text: "/prenota_evento" }, { text: "/contatto" }]
//                     ],
//                     resize_keyboard: true, // Ridimensiona i tasti per renderli eleganti
//                     one_time_keyboard: false // Lascia la tastiera visibile per selezioni multiple
//                 }
//             });
//         }

//         // Rispondiamo sempre 200 OK a Telegram per confermare la ricezione del messaggio
//         return NextResponse.json({ status: "success" }, { status: 200 });
//     } catch (error) {
//         // Gestione degli errori (Ex def error del tuo main.py)
//         console.error("Errore nell'elaborazione del Webhook di Telegram:", error.message);
//         return NextResponse.json({ status: "error_logged" }, { status: 200 });
//     }
// }

import { NextResponse } from "next/server";
import { getBotResponse } from "@/lib/botAnswers";

export async function POST(req) {
  try {
    const body = await req.json();
    
    // Log di controllo: lo vedrai nel terminale del PC quando invii un messaggio
    console.log("Messaggio ricevuto sul sito:", body.message);

    // Se body.message non esiste, passiamo una stringa vuota
    const userMessage = body.message || "";
    const reply = getBotResponse(userMessage);

    // Altro log per vedere cosa ha generato il file botAnswers
    console.log("Risposta generata dal bot:", reply);

    // Restituiamo l'oggetto JSON con la chiave "reply"
    return NextResponse.json({ reply: reply || "Nessuna risposta trovata." }, { status: 200 });
  } catch (error) {
    console.error("Errore API bot-sito:", error);
    return NextResponse.json({ reply: "Scusami, ho un piccolo problema tecnico." }, { status: 500 });
  }
}