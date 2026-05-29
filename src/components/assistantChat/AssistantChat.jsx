"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X } from "lucide-react";
import { motion } from "framer-motion";

export default function AssistantChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Ciao! Sono il tuo assistente Herbalife. Come posso aiutarti oggi?",
    },
  ]);
  const [input, setInput] = useState("");

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     const userMessage = { role: "user", text: input };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");

//     try {
//       const res = await fetch("/api/bot-telegram", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: input }),
//       });
//       const data = await res.json();
//       setMessages((prev) => [...prev, { role: "assistant", text: data.reply }]);
//     } catch (error) {
//       setMessages((prev) => [
//         ...prev,
//         {
//           role: "assistant",
//           text: "Scusami, si è verificato un errore. Riprova più tardi.",
//         },
//       ]);
//     }
//   };

const handleSendMessage = async (e) => {
  e.preventDefault();
  if (!input.trim()) return;

  const userMessage = { role: "user", text: input };
  
  // 1. Mostra subito il messaggio dell'utente a schermo
  setMessages((prev) => [...prev, userMessage]);
  const currentInput = input; // Salva il testo prima di svuotarlo
  setInput("");

  try {
    // 2. Chiamata all'API del sito
    const res = await fetch("/api/bot-sito", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: currentInput }), // Invia la chiave "message"
    });
    
    const data = await res.json();
    
    // 3. Aggiunge la risposta dell'assistente usando data.reply
    setMessages((prev) => [...prev, { role: "assistant", text: data.reply }]);
  } catch (error) {
    console.error(error);
    setMessages((prev) => [...prev, { role: "assistant", text: "Si è verificato un errore di connessione." }]);
  }
};

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
            <div className="bg-herbalife-1 text-white p-4 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-sm">Assistente Virtuale</h3>
                <p className="text-xs text-green-100">
                  Risposte frequenti ed info prodotti
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-black/10 p-1 rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grow p-4 overflow-y-auto space-y-3 bg-zinc-50 dark:bg-zinc-950/40">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                      msg.role === "user"
                        ? "bg-herbalife-4 text-white rounded-br-none"
                        : "bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-150 dark:border-zinc-700/50 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <form
              onSubmit={handleSendMessage}
              className="p-3 border-t border-zinc-200 dark:border-zinc-800 flex gap-2 bg-white dark:bg-zinc-900"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Fai una domanda..."
                className="grow bg-zinc-100 dark:bg-zinc-800 text-sm rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-herbalife-1/20 dark:text-white placeholder-zinc-400"
              />
              <button className="bg-herbalife-4 hover:bg-herbalife-1 text-white p-2.5 rounded-xl transition-colors">
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
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>
    </div>
  );
}
