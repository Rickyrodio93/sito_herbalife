"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, BotMessageSquare } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
);

// Funzione di utilità per trasformare i link Markdown [Testo](URL) in elementi HTML cliccabili
const renderizzaTestoConLink = (testo) => {
  if (!testo) return "";

  // Regex per intercettare la struttura [testo](url)
  const regexLink = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parti = [];
  let ultimoIndice = 0;
  let match;

  while ((match = regexLink.exec(testo)) !== null) {
    // Aggiunge il testo normale prima del link
    if (match.index > ultimoIndice) {
      parti.push(testo.substring(ultimoIndice, match.index));
    }

    // Aggiunge il link come elemento React cliccabile che si apre in una nuova scheda
    const testoLink = match[1];
    const urlLink = match[2];
    parti.push(
      <a
        key={match.index}
        href={urlLink}
        target="_blank"
        rel="noopener noreferrer"
        className="underline font-semibold hover:text-opacity-80 transition-opacity break-all"
      >
        {testoLink}
      </a>,
    );

    ultimoIndice = regexLink.lastIndex;
  }

  // Aggiunge l'eventuale testo normale rimanente dopo l'ultimo link
  if (ultimoIndice < testo.length) {
    parti.push(testo.substring(ultimoIndice));
  }

  return parti.length > 0 ? parti : testo;
};

export default function AssistantChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Ciao! Sono l'assistente virtuale di Riccardo. Lasciami pure un messaggio qui, ti risponderò il prima possibile",
    },
  ]);
  const [input, setInput] = useState("");
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // 1. Generiamo o recuperiamo un ID Utente anonimo per tracciare la sessione
  useEffect(() => {
    let localId = localStorage.getItem("chat_user_id");
    if (!localId) {
      localId = "user_" + Math.random().toString(36).substring(2, 11);
      localStorage.setItem("chat_user_id", localId);
    }
    setUserId(localId);
  }, []);

  // 2. Controllo in tempo reale delle risposte da Supabase (Polling)
  useEffect(() => {
    if (!userId) return;

    const fetchMessaggi = async () => {
      const { data, error } = await supabase
        .from("chat_messages")
        .select("role, text")
        .eq("user_id", userId)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Errore nel recupero dei messaggi:", error);
        return;
      }

      if (data && data.length > 0) {
        // Aggiorniamo lo stato solo se il numero di messaggi sul DB
        // è cambiato rispetto a quelli attuali (escludendo i messaggi di errore locali)
        setMessages((prevMessages) => {
          // Contiamo quanti messaggi reali (non di errore) ci sono nello stato attuale
          const messaggiRealiAttuali = prevMessages.filter(
            (m) => !m.isError,
          ).length;

          // +1 tiene conto del messaggio di benvenuto fisso in cima
          if (data.length + 1 !== messaggiRealiAttuali) {
            // Se c'è un reale disallineamento, aggiorna la chat dal DB
            return [
              {
                role: "assistant",
                text: "Ciao! Sono l'assistente virtuale di Riccardo. Lasciami pure un messaggio qui, ti risponderò il prima possibile",
              },
              ...data,
            ];
          }
          // Altrimenti, mantieni lo stato attuale inalterato (preservando l'errore visivo)
          return prevMessages;
        });
      }
    };

    fetchMessaggi();
    const interval = setInterval(fetchMessaggi, 3000);

    return () => clearInterval(interval);
  }, [userId]);

  // MODIFICATO: Logica per gestire i caricamenti e intercettare l'errore di Google
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const currentInput = input;
    const userMessage = { role: "user", text: currentInput };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true); // Attiva i tre puntini provvisori

    try {
      const response = await fetch("/api/bot-sito", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: currentInput, userId: userId }),
      });

      const data = await response.json();

      // Controllo se l'endpoint ha risposto con un errore (es. High Demand)
      if (!response.ok || data.error) {
        const dettaglioErrore = data.dettagli || "";

        if (
          dettaglioErrore.includes("high demand") ||
          dettaglioErrore.includes("Spikes in demand")
        ) {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              text: "⚠️ Servizio momentaneamente sovraccarico. Il modello sta ricevendo troppe richieste simultanee. Vi invitiamo a riprovare tra qualche minuto.",
              isError: true,
            },
          ]);
        } else {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              text: "⚠️ Si è verificato un errore interno. La preghiamo di riprovare più tardi o di [contattare direttamente Riccardo](https://wa.me/393496635371).",
              isError: true,
            },
          ]);
        }
      }
    } catch (error) {
      console.error("Errore di rete:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "⚠️ Errore di invio della rete.",
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false); // Disattiva i tre puntini
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, isOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-49 font-sans flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-80 md:w-96 h-112.5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col overflow-hidden mb-4"
          >
            <div className="bg-herbalife-4 text-white p-4 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-sm">Ciao, sono Her-bot</h3>
                <p className="text-xs text-zinc-100">
                  rispondo 24 ore su 24, 7 giorni su 7
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-black/10 p-1 rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duation: 0.2 }}
              className="grow p-4 overflow-y-auto space-y-3 bg-zinc-200 dark:bg-zinc-950/40"
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm whitespace-pre-line ${
                      msg.role === "user"
                        ? "bg-herbalife-4 text-white rounded-br-none"
                        : msg.isError
                          ? "bg-red-50 border border-red-200 text-red-700 dark:bg-red-950/20 dark:border-red-900 dark:text-red-400 rounded-tl-none"
                          : "bg-herbalife-2 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-herbalife-2 dark:border-zinc-700/50 rounded-bl-none"
                    }`}
                  >
                    {renderizzaTestoConLink(msg.text)}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-zinc-800 border border-zinc-150 dark:border-zinc-700/50 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1.5 shadow-sm">
                    <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce"></span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </motion.div>

            <form
              onSubmit={handleSendMessage}
              className="p-3 border-t border-zinc-200 dark:border-zinc-800 flex gap-2 bg-white dark:bg-zinc-900"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Scrivi un messaggio..."
                className="grow bg-zinc-100 dark:bg-zinc-800 text-sm rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-herbalife-4/20 dark:text-white placeholder-zinc-400"
              />
              <button
                type="submit"
                className="bg-herbalife-4 hover:bg-herbalife-1 text-white p-2.5 rounded-xl transition-colors"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-herbalife-4 hover:bg-herbalife-1 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-colors"
      >
        {isOpen ? <X size={24} /> : <BotMessageSquare size={24} />}
      </motion.button>
    </div>
  );
}
