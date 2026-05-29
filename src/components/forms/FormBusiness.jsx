"use client";

import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { motion } from "framer-motion";
import Input from "../Inputs/Input";
import { ArrowLeft, ArrowRight, CheckCircle2, Phone, User } from "lucide-react";

export default function FormBusiness() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    maggiorenne: false,
    telefono: 0,
    motivazione: "",
    dataAppuntamento: "",
    oraAppuntamento: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const nextStep = () => setStep((p) => p + 1);
  const prevStep = () => setStep((p) => p - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contatto-business", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStep(3); // Vai allo step finale di successo
      } else {
        alert("Si è verificato un errore, riprova.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-6 md:p-8 shadow-sm backdrop-blur-md">
      <div className="flex items-center justify-center gap-2 mb-8">
        <div
          className={`h-2 rounded-full transition-colors duration-300 ${step >= 1 ? "bg-herbalife-1" : "bg-zinc-200 dark:bg-zinc-800"}`}
        />
        <div
          className={`h-2 rounded-full transition-colors duration-300 ${step >= 2 ? "bg-herbalife-1" : "bg-zinc-200 dark:bg-zinc-800"}`}
        />
        <div
          className={`h-2 rounded-full transition-colors duration-300 ${step === 3 ? "bg-herbalife-1" : "bg-zinc-200 dark:bg-zinc-800"}`}
        />
      </div>

      <AnimatePresence>
        {/* step 1 */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex flex-col gap-5"
          >
            <h2 className="text-xl md:text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-2">
              Raccontami di te
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                placeholder="Nome"
                type="text"
                value={formData.nome}
                onChange={(e) =>
                  setFormData({ ...formData, nome: e.target.value })
                }
              >
                <User size={18} />
              </Input>
              <Input
                placeholder="Cognome"
                type="text"
                value={formData.cognome}
                onChange={(e) =>
                  setFormData({ ...formData, cognome: e.target.value })
                }
              >
                <User size={18} />
              </Input>
            </div>

            <Input
              placeholder="Numero di Telefono"
              type="tel"
              value={formData.telefono}
              onChange={(e) =>
                setFormData({ ...formData, telefono: e.target.value })
              }
            >
              <Phone size={18} />
            </Input>

            {/* Checkbox Maggiorenne */}
            <label className="flex items-center gap-3 cursor-pointer select-none group py-1">
              <input
                type="checkbox"
                name="maggiorenne"
                checked={formData.maggiorenne}
                onChange={handleInputChange}
                className="w-5 h-5 rounded-md border-zinc-300 dark:border-zinc-700 text-herbalife-1 focus:ring-herbalife-1/20 accent-herbalife-1 transition-all"
              />
              <span className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">
                Dichiaro di avere almeno 18 anni compiuti
              </span>
            </label>

            {/* Area di Testo Motivazione */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Che cosa ti motiva a volerti informare su questa attività?
              </label>
              <textarea
                name="motivazione"
                value={formData.motivazione}
                onChange={handleInputChange}
                rows={4}
                placeholder="Inserisci la tua risposta..."
                className="w-full p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:border-herbalife-1 dark:focus:border-green-500 focus:ring-2 focus:ring-herbalife-1/20 outline-none transition-all duration-300 text-base"
              />
            </div>

            <button
              onClick={nextStep}
              disabled={
                !formData.nome || !formData.telefono || !formData.maggiorenne
              }
              className="mt-4 w-full flex items-center justify-center gap-2 bg-herbalife-4 hover:bg-herbalife-1 text-white py-4 rounded-xl font-bold uppercase tracking-wider text-sm transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none active:scale-98"
            >
              Continua <ArrowRight size={16} />
            </button>
          </motion.div>
        )}

        {/* step 2 */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex flex-col gap-5"
          >
            <h2 className="text-xl md:text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-1">
              Scegli quando sentirci
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3">
              Seleziona il giorno e l'orario in cui preferisci ricevere la
              chiamata informativa.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Giorno
                </label>
                <input
                  type="date"
                  name="dataAppuntamento"
                  value={formData.dataAppuntamento}
                  onChange={handleInputChange}
                  className="w-full p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-900 dark:text-zinc-100 focus:border-herbalife-1 outline-none transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Orario
                </label>
                <input
                  type="time"
                  name="oraAppuntamento"
                  value={formData.oraAppuntamento}
                  onChange={handleInputChange}
                  className="w-full p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-900 dark:text-zinc-100 focus:border-herbalife-1 outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={prevStep}
                className="w-1/3 flex items-center justify-center gap-2 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 py-4 rounded-xl font-bold uppercase text-sm transition-all"
              >
                <ArrowLeft size={16} /> Indietro
              </button>
              <button
                onClick={handleSubmit}
                disabled={
                  loading ||
                  !formData.dataAppuntamento ||
                  !formData.oraAppuntamento
                }
                className="w-2/3 flex items-center justify-center gap-2 bg-herbalife-4 hover:bg-herbalife-1 text-white py-4 rounded-xl font-bold uppercase tracking-wider text-sm transition-all duration-300 disabled:opacity-50"
              >
                {loading ? "Invio in corso..." : "Conferma e Invia"}
              </button>
            </div>
          </motion.div>
        )}
        {/* step 3 */}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center py-8"
          >
            <div className="text-herbalife-1 dark:text-green-400 mb-4">
              <CheckCircle2 size={64} className="animate-bounce" />
            </div>
            <h2 className="text-2xl font-black text-zinc-800 dark:text-zinc-100 mb-3">
              Grazie {formData.nome}!
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-sm mb-6">
              Il modulo è stato inviato correttamente. Abbiamo fissato il nostro
              appuntamento per il giorno{" "}
              <strong>{formData.dataAppuntamento}</strong> alle ore{" "}
              <strong>{formData.oraAppuntamento}</strong>.
            </p>
            <div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800/60 rounded-xl p-4 text-xs text-zinc-500 dark:text-zinc-400 max-w-sm">
              ℹ️ Controlla la tua casella di posta: ti ho appena inviato una
              mail di conferma con i primi video informativi sull'attività.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
