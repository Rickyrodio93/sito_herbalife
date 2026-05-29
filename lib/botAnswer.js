// lib/botAnswers.js

export function getBotResponse(inputText) {
  const message = String(inputText || "").toLowerCase().trim();

  // Mappa dei comandi / parole chiave
  if (["/prenota_evento", "evento", "prenota evento"].includes(message)) {
    return `Per prenotare un evento, scrivimi direttamente su WhatsApp: https://wa.me/393496635371\nSarà mia premura inviarti il link di accesso e la password.`;
  }

  if (["/catalogo_prodotti", "catalogo", "prodotti"].includes(message)) {
    return `Trovi il catalogo prodotti al seguente link:\nhttps://assets.herbalifenutrition.com/content/dam/regional/emea/it_it/consumable_content/marketing_materials/brochure/2022/03-Mar/product-brochure-it.pdf`;
  }

  if (["/contatto", "whatsapp", "contatti"].includes(message)) {
    return `Scrivimi direttamente su WhatsApp: https://wa.me/393496635371`;
  }

  if (["/sito_web", "sito web", "web", "sito"].includes(message)) {
    return `Visita il mio sito web ufficiale: https://www.riccardorodio.com`;
  }

  if (["/prezzi", "prezzi", "info prezzi", "prezzi?", "vorrei sapere i prezzi", "costo", "costi"].includes(message)) {
    return `Troverai tutti i prezzi sul mio e-commerce ufficiale cliccando qui:\nhttps://www.riccardorodio.goherbalife.com`;
  }

  if (["lavoro", "come funziona il lavoro?", "come funziona il lavoro", "guadagno extra", "/lavora_con_me", "business"].includes(message)) {
    // Qui puoi inserire il link alla NUOVA pagina /candidati che abbiamo creato prima!
    return `Compila il modulo ufficiale per candidarti ed accedere ai video informativi:\nhttps://www.riccardorodio.com/candidati`;
  }

  if (["/valutazione_benessere", "valutazione benessere", "vorrei creare un profilo benessere", "valutazione"].includes(message)) {
    return `Crea il tuo Profilo Benessere gratuito al seguente link:\nhttps://bit.ly/ValBenessereGratis`;
  }

  if (["/start", "/help", "help", "aiuto"].includes(message)) {
    return `Ciao! Sono l'Assistente Virtuale di Riccardo Rodio. Puoi scrivermi una domanda oppure usare i comandi rapidi:\n\n• /catalogo_prodotti\n• /prezzi\n• /lavora_con_me\n• /valutazione_benessere\n• /prenota_evento\n• /contatto`;
  }

  // Risposta di cortesia se non capisce la parola esatta
  return `Scusa, non ho capito la richiesta. Prova a digitare /help per vedere le opzioni disponibili o clicca su uno dei pulsanti rapido.`;
}