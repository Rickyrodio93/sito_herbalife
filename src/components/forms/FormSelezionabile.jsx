"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  Apple,
  ArrowRight,
  BriefcaseBusiness,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Droplet,
  Mail,
  Phone,
  User,
  Weight,
} from "lucide-react";

import { DayPicker } from "@daypicker/react";
import { format, isBefore, startOfToday } from "date-fns";
import { it } from "@daypicker/react/locale";
import Input from "../Inputs/Input";
import "@daypicker/react/style.css";

export default function FormSelezionabile({ defaultScelta = null }) {
  const [step, setStep] = useState(defaultScelta ? 1 : 0);
  const [scelta, setScelta] = useState(defaultScelta);
  const [dataCalendario, setDataCalendario] = useState(null);
  const [month, setMonth] = useState(new Date());

  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    sesso: "",
    email: "",
    telefono: "",
    maggiorenne: false,
    // Modulo Prodotti
    altezza: "",
    pesoAttuale: "",
    pesoObiettivo: "",
    IMC: "",
    allenamento: "",
    acqua: "",
    // Modulo Business
    esperienza: "",
    tempoDisponibile: "",
    motivazione: "",
    // Appuntamento comune
    dataSelezionata: "",
    oraSelezionata: "",
  });

  const calcolaIMC = () => {
    const alt = parseFloat(formData.altezza);
    const peso = parseFloat(formData.pesoAttuale);

    if (!alt || !peso || alt <= 0 || peso <= 0) return null;

    const altMetri = alt / 100;
    const altQuadrato = altMetri * altMetri;
    const imc = (peso / altQuadrato).toFixed(1);

    // Calcolo del range peso ideale (IMC 18.5 - 24.9)
    const pesoMin = (18.5 * altQuadrato).toFixed(1);
    const pesoMax = (24.9 * altQuadrato).toFixed(1);

    let categoria = "";
    let colore = "";

    if (imc < 18.5) {
      categoria = "Sottopeso";
      colore =
        "text-blue-500 bg-blue-500/10 border-blue-200 dark:border-blue-900/50";
    } else if (imc >= 18.5 && imc < 25) {
      categoria = "Normopeso";
      colore =
        "text-herbalife-1 dark:text-green-400 bg-green-500/10 border-green-200 dark:border-green-900/50";
    } else if (imc >= 25 && imc < 30) {
      categoria = "Sovrappeso";
      colore =
        "text-amber-500 bg-amber-500/10 border-amber-200 dark:border-amber-900/50";
    } else {
      categoria = "Obesità";
      colore =
        "text-rose-500 bg-rose-500/10 border-rose-200 dark:border-rose-900/50";
    }

    return {
      valore: imc,
      categoria,
      colore,
      pesoIdeale: `${pesoMin} kg - ${pesoMax} kg`,
    };
  };

  const infoIMC = calcolaIMC();

  const slotOrari = ["09:00", "11:00", "14:30", "16:00", "18:30"];

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleDataCalendarioChange = (date) => {
    setDataCalendario(date);
    if (date) {
      // Formatta la data in formato leggibile YYYY-MM-DD per il database
      setFormData({
        ...formData,
        dataSelezionata: format(date, "dd/MM/yyyy"),
        oraSelezionata: "",
      });
    } else {
      setFormData({ ...formData, dataSelezionata: "", oraSelezionata: "" });
    }
  };

  const handleSceltaIniziale = (tipo) => {
    setScelta(tipo);
    setStep(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const datiFinali = {
      ...formData,
      IMC: infoIMC ? infoIMC.valore : "",
    };

    let dataFormattataString = "";

    if (datiFinali.dataSelezionata) {
      try {
        const dataGrezza = format(
          new Date(datiFinali.dataSelezionata),
          "EEEE d MMMM yyyy",
          { locale: it },
        );
        dataFormattataString =
          dataGrezza.charAt(0).toUpperCase() + dataGrezza.slice(1);
      } catch (error) {
        console.error("errore nella formattazione data:", error);
        dataFormattataString = datiFinali.dataSelezionata;
      }
    }

    const testoMessaggio = `Ciao! Ecco i dati per la mia consulenza Herbalife:
*nome:* ${datiFinali.nome} ${datiFinali.cognome};
*Sesso:* ${datiFinali.sesso};
*Email:* ${datiFinali.email};
*Telefono:* ${datiFinali.telefono};
*Altezza:* ${datiFinali.altezza} cm;
*Peso Attuale:* ${datiFinali.pesoAttuale} kg;
*Peso Obiettivo:* ${datiFinali.pesoObiettivo} kg;
*IMC Calcolato:* ${datiFinali.IMC} (${infoIMC?.categoria || ""});
*Allenamento:* ${datiFinali.allenamento};
*Acqua:* ${datiFinali.acqua};
*Appuntamento il:* ${dataFormattataString} ore: ${datiFinali.oraSelezionata}`;

    const numeroTelefono = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
    if (!numeroTelefono) {
      console.error(
        "Errore: NEXT_PUBLIC_WHATSAPP_NUMBER non configurato nell'env!",
      );
      alert("Errore di configurazione del sistema. Riprova più tardi.");
      return;
    }
    const encodeMessaggio = encodeURIComponent(testoMessaggio);
    const urlWhatsApp = `https://wa.me/${numeroTelefono}?text=${encodeMessaggio}`;

    // Controllo di sicurezza se 'scelta' è disponibile nello scope superiore, altrimenti usiamo un fallback
    const canaleInfo =
      typeof scelta !== "undefined" ? scelta : "Non specificato";
    console.log("Dati finali da inviare:", datiFinali, "Canale:", canaleInfo);

    // 4. APERTURA LINK
    window.open(urlWhatsApp, "_blank");
  };

  const getTitoli = () => {
    if (step === 0)
      return {
        // t: "benvenuto",
        p: "Seleziona l'opzione più adatta alle tue esigenze per iniziare il tuo percorso personalizzato.",
      };
    if (scelta === "business")
      return {
        t: "Candidatura Business",
        p: "Compila i passaggi sottostanti per inviare il tuo profilo e prenotare la chiamata aziendale.",
      };
    return {
      t: "Valutazione Benessere",
      p: "Inserisci i tuoi parametri per permettermi di strutturare la tua consulenza nutrizionale integrata.",
    };
  };

  const infoTitolo = getTitoli();
  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* header dinamico */}
      <div className="w-full max-w-xl mx-auto mb-10 text-center px-4">
        {/* <h1 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white uppercase tracking-wide mb-3 transition-all duration-300">
          {infoTitolo.t}
        </h1> */}
        <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 font-medium">
          {infoTitolo.p}
        </p>
      </div>

      {/* progress bar */}
      {step > 0 && (
        <div className="mb-8 flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          <span
            className={step >= 1 ? "text-herbalife-1 dark:text-green-500" : ""}
          >
            Anagrafica
          </span>
          <ChevronRight size={14} />
          <span
            className={step >= 2 ? "text-herbalife-1 dark:text-green-500" : ""}
          >
            {scelta === "prodotti" ? "Parametri" : "Profilo"}
          </span>
          <ChevronRight size={14} />
          <span
            className={step >= 3 ? "text-herbalife-1 dark:text-green-500" : ""}
          >
            Contatto
          </span>
        </div>
      )}

      <AnimatePresence mode="await">
        {/* step 0: le due cart di partenza */}
        {step === 0 && (
          <motion.div
            key="cards"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto px-4"
          >
            {/* card prodotti */}
            <button
              onClick={() => handleSceltaIniziale("prodotti")}
              className="group p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/50 backdrop-blur-md text-left hover:border-herbalife-1 dark:hover:border-green-500 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between h-64"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-950/30 text-herbalife-1 dark:text-green-400 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform text-2xl">
                  <Apple size={24} />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                  prodotti e nutrizione
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                  Voglio rimettermi in forma, perdere peso, ottimizzare la mia
                  energia o ricevere una consulenza sui prodotti Herbalife.
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-herbalife-1 dark:text-green-400 mt-4">
                Inizia la valutazione{" "}
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </div>
            </button>

            {/* card business */}
            <button
              onClick={() => handleSceltaIniziale("business")}
              className="group p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/50 backdrop-blur-md text-left hover:border-herbalife-1 dark:hover:border-green-500 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between h-64"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-950/30 text-herbalife-1 dark:text-green-400 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform text-2xl">
                  <BriefcaseBusiness size={24} />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                  Opportunità di Attività
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                  Voglio capire come avviare la mia attività indipendente,
                  lavorare in smart working o integrare le mie entrate mensili.
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-herbalife-1 dark:text-green-400 mt-4">
                Invia candidatura business{" "}
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </div>
            </button>
          </motion.div>
        )}

        {/* STEP 1: dati anagrafici */}
        {step === 1 && (
          <motion.div
            key="anagrafica"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4 max-w-2xl mx-auto px-4"
          >
            <Input
              type="text"
              name="nome"
              placeholder="Nome"
              value={formData.nome}
              onChange={handleChange}
              iconaDestra={<User size={18} />}
            />
            <Input
              type="text"
              name="cognome"
              placeholder="Cognome"
              value={formData.cognome}
              onChange={handleChange}
              iconaDestra={<User size={18} />}
            />
            <Input
              as="select"
              name="sesso"
              value={formData.sesso}
              onChange={handleChange}
              iconaDestra={<ChevronDown size={18} />}
            >
              <option
                value=""
                className="dark:bg-zinc-900 text-zinc-400"
                disabled
              >
                Seleziona il tuo sesso biologico
              </option>
              <option value="donna" className="dark:bg-zinc-900">
                Donna
              </option>
              <option value="uomo" className="dark:bg-zinc-900">
                Uomo
              </option>
            </Input>
            <Input
              type="email"
              name="email"
              placeholder="Indirizzo Email"
              value={formData.email}
              onChange={handleChange}
              iconaDestra={<Mail size={18} />}
            />
            <Input
              type="tel"
              name="telefono"
              placeholder="Numero di Telefono / WhatsApp"
              value={formData.telefono}
              onChange={handleChange}
              iconaDestra={<Phone size={18} />}
            />

            <label className="flex items-start gap-3 cursor-pointer p-2 select-none group">
              <input
                type="checkbox"
                name="maggiorenne"
                checked={formData.maggiorenne}
                onChange={handleChange}
                className="w-5 h-5 rounded-md border-zinc-300 dark:border-zinc-700 text-herbalife-1 focus:ring-herbalife-1/20 accent-herbalife-1 dark:accent-herbalife-4 transition-all"
              />
              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200 transition-colors">
                Confermo di essere maggiorenne
              </span>
            </label>

            <div className="flex justify-between items-center pt-6 max-w-5xl mx-auto">
              {defaultScelta ? (
                <span />
              ) : (
                <button
                  onClick={() => setStep(0)}
                  className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 text-sm flex items-center gap-1 font-semibold transition-colors"
                >
                  <ChevronLeft size={16} /> Indietro
                </button>
              )}
              <button
                onClick={() => setStep(2)}
                disabled={
                  !formData.nome ||
                  !formData.sesso ||
                  !formData.email ||
                  !formData.telefono ||
                  formData.maggiorenne === false
                }
                className="bg-herbalife-1 dark:bg-green-600 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-1 shadow-md transition-all"
              >
                Continua <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        )}
        {/* STEP 2: moduli risposte */}
        {step === 2 && (
          <motion.div
            key="domande-specifiche"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4 max-w-2xl mx-auto px-4"
          >
            {scelta === "prodotti" ? (
              /* modulo prodotti */
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Input
                    type="number"
                    name="altezza"
                    placeholder="Altezza (cm)"
                    value={formData.altezza}
                    onChange={handleChange}
                    iconaDestra={<Activity size={18} />}
                  />
                  <Input
                    type="number"
                    name="pesoAttuale"
                    min="0"
                    placeholder="Peso attuale (kg)"
                    value={formData.pesoAttuale}
                    onChange={handleChange}
                    iconaDestra={<Weight size={18} />}
                  />
                  <Input
                    type="number"
                    name="pesoObiettivo"
                    placeholder="Peso target (kg)"
                    value={formData.pesoObiettivo}
                    onChange={handleChange}
                    iconaDestra={<Weight size={18} />}
                  />
                </div>

                {/* BOX CALCOLO AUTOMATICO IMC */}
                <AnimatePresence>
                  {infoIMC && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: -10 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className={`w-full p-5 rounded-xl border flex flex-col gap-3 overflow-hidden backdrop-blur-md font-medium ${infoIMC.colore}`}
                    >
                      {/* Prima Riga: Stato e Valore attuale */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-current/10 pb-2.5">
                        <div className="flex items-center gap-2 text-sm sm:text-base">
                          <span>
                            📊 Il tuo Indice di Massa Corporea (IMC) attuale è:
                          </span>
                          <span className="font-black text-lg">
                            {infoIMC.valore}
                          </span>
                        </div>
                        <div className="text-xs uppercase tracking-wider font-black px-3 py-1 rounded-full bg-white/40 dark:bg-black/20 shadow-sm border border-current/10 self-start sm:self-auto">
                          Stato: {infoIMC.categoria}
                        </div>
                      </div>

                      {/* Seconda Riga: Range Peso Ideale */}
                      <div className="text-xs sm:text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-1 opacity-90">
                        <div className="flex items-center gap-1.5">
                          <span>
                            🎯 Secondo i parametri scientifici, il tuo range di
                            peso ideale è:
                          </span>
                        </div>
                        <span className="font-black text-sm sm:text-base bg-white/30 dark:bg-black/10 px-2.5 py-0.5 rounded-lg whitespace-nowrap self-start sm:self-auto">
                          {infoIMC.pesoIdeale}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Input
                  as="select"
                  name="allenamento"
                  value={formData.allenamento}
                  onChange={handleChange}
                  iconaDestra={<ChevronDown size={18} />}
                >
                  <option value="" className="dark:bg-zinc-900 text-zinc-400">
                    Quanto ti alleni a settimana?
                  </option>
                  <option value="sedentario" className="dark:bg-zinc-900">
                    Sono sedentario / Non mi alleno
                  </option>
                  <option value="1-2" className="dark:bg-zinc-900">
                    1 o 2 volte a settimana
                  </option>
                  <option value="3-4" className="dark:bg-zinc-900">
                    3 o 4 volte a settimana
                  </option>
                  <option value="5+" className="dark:bg-zinc-900">
                    Più di 5 volte a settimana
                  </option>
                </Input>

                <Input
                  as="select"
                  name="acqua"
                  value={formData.acqua}
                  onChange={handleChange}
                  iconaDestra={<Droplet size={18} />}
                >
                  <option value="" className="dark:bg-zinc-900 text-zinc-400">
                    Quanta acqua bevi al giorno?
                  </option>
                  <option value="meno-1" className="dark:bg-zinc-900">
                    Meno di 1 Litro
                  </option>
                  <option value="1.5" className="dark:bg-zinc-900">
                    Circa 1.5 Litri
                  </option>
                  <option value="2" className="dark:bg-zinc-900">
                    Almeno 2 Litri
                  </option>
                  <option value="3+" className="dark:bg-zinc-900">
                    Più di 3 Litri
                  </option>
                </Input>
              </>
            ) : (
              /* modulo business */
              <>
                <Input
                  type="text"
                  name="esperienza"
                  placeholder="Hai già esperienze nel Network o Benessere?"
                  value={formData.esperienza}
                  onChange={handleChange}
                />

                <Input
                  as="select"
                  name="tempoDisponibile"
                  value={formData.tempoDisponibile}
                  onChange={handleChange}
                >
                  <option
                    value=""
                    disabled
                    className="dark:bg-zinc-900 text-zinc-400"
                  >
                    -- Tempo da dedicare all&apos;attività? --
                  </option>
                  <option value="part-time" className="dark:bg-zinc-900">
                    Part-Time (10-20 ore settimanali)
                  </option>
                  <option value="full-time" className="dark:bg-zinc-900">
                    Full-Time (40 ore settimanali)
                  </option>
                  <option value="ritagli" className="dark:bg-zinc-900">
                    Nei ritagli di tempo / Guadagno Extra
                  </option>
                </Input>

                <Input
                  as="textarea"
                  name="motivazione"
                  placeholder="Qual è la tua motivazione principale o il tuo obiettivo economico?"
                  value={formData.motivazione}
                  onChange={handleChange}
                  rows={4}
                />
              </>
            )}
            <div className="flex justify-between items-center pt-6 max-w-5xl mx-auto">
              <button
                onClick={() => setStep(1)}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 text-sm flex items-center gap-1 font-semibold transition-colors"
              >
                <ChevronLeft size={16} /> Indietro
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={
                  scelta === "prodotti"
                    ? !formData.altezza ||
                      !formData.pesoAttuale ||
                      !formData.pesoObiettivo
                    : !formData.esperienza ||
                      !formData.tempoDisponibile ||
                      !formData.motivazione
                }
                className="bg-herbalife-1 dark:bg-green-600 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-1 shadow-md transition-all"
              >
                Continua <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: calendario e orari */}
        {step === 3 && (
          <motion.div
            key="calendario"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-2xl mx-auto px-4 space-y-6"
          >
            <div className="bg-white/40 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 backdrop-blur-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Calendar size={14} /> 1. Scegli il giorno
                  </label>

                  <DayPicker
                    mode="single"
                    selected={dataCalendario}
                    onSelect={handleDataCalendarioChange}
                    locale={it}
                    disabled={(date) => isBefore(date, startOfToday())}
                    month={month}
                    onMonthChange={(nuovoMese) => {
                      console.log(
                        "Cambio mese intercettato! Nuovo mese:",
                        nuovoMese,
                      );
                      setMonth(nuovoMese);
                    }}
                    footer={
                      <div className="text-center text-xs font-semibold text-zinc-500 dark:text-zinc-400 mt-4">
                        {dataCalendario
                          ? `giorno selezionato: ${dataCalendario.toLocaleDateString()}`
                          : "scegli un giorno"}
                      </div>
                    }
                    className="mx-auto border-none p-2"
                    classNames={{
                      months: "w-full max-w-xs mx-auto flex flex-col",
                      month: "space-y-4 mx-auto",
                      month_caption:
                        "flex justify-center text-center h-10 relative items-center mb-4",
                      caption_label:
                        "text-sm font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mx-auto",
                      nav: "flex justify-between items-center w-full px-1 absolute top-1 left-0 right-0 z-50",
                      button_previous:
                        "h-7 w-7 bg-transparent p-0 opacity-60 hover:opacity-100 text-zinc-800 dark:text-zinc-200 flex items-center justify-center rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all z-50",
                      button_next:
                        "h-7 w-7 bg-transparent p-0 opacity-60 hover:opacity-100 text-zinc-800 dark:text-zinc-200 flex items-center justify-center rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all z-50",
                      chevron: "fill-herbalife-1",

                      weekdays: "grid  grid-cols-7",
                      weekday:
                        "text-zinc-400 dark:text-zinc-500 font-bold text-[0.75rem] uppercase h-9",

                      //   // Righe dei giorni del mese - Griglia rigida (Rimosso 'weeks' problematico)
                      week: "grid grid-cols-7 gap-1 w-full",
                      day: "h-9 w-9 p-0 text-center text-sm relative flex items-center justify-center focus-within:relative focus-within:z-20",

                      //   // Il singolo bottone del giorno (Stile Base)
                      day_button:
                        "h-9 w-9 p-0 font-medium dark:text-zinc-200 rounded-xl hover:bg-herbalife-1/10 dark:hover:bg-green-500/10 dark:hover:text-green-400 transition-colors flex items-center justify-center outline-none border-none bg-transparent",

                      //   // GIORNO SELEZIONATO (Forzato con ! per vincere i conflitti CSS della libreria)
                      selected:
                        "bg-herbalife-1! dark:!bg-green-500 text-white! font-black rounded-xl shadow-md focus:!bg-herbalife-1 focus:!text-white hover:!bg-herbalife-1 hover:!text-white",

                      //   // Oggi
                      today:
                        "border border-herbalife-1/40 dark:border-green-500/40 text-herbalife-1 dark:text-green-400 font-bold rounded-xl",

                      //   // Giorni disabilitati (Passati) e fuori dal mese corrente
                      disabled:
                        "text-zinc-300 dark:text-zinc-700 opacity-20 cursor-not-allowed hover:bg-transparent pointer-events-none",
                      // outside:
                      //   "text-zinc-300 dark:text-zinc-700 opacity-30 pointer-events-none",
                    }}
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Clock size={14} /> 2. Scegli l&apos;Orario
                  </label>

                  {formData.dataSelezionata ? (
                    <div className="grid grid-cols-3 gap-2 py-2">
                      {slotOrari.map((ora) => (
                        <button
                          key={ora}
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, oraSelezionata: ora })
                          }
                          className={`py-3 rounded-xl text-xs sm:text-sm font-bold border transition-all duration-200 ${
                            formData.oraSelezionata === ora
                              ? "bg-herbalife-1 border-herbalife-1 text-white shadow-md scale-[1.02]"
                              : "bg-white/80 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                          }`}
                        >
                          {ora}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="h-48 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl flex flex-col items-center justify-center text-xs text-zinc-400 dark:text-zinc-500 bg-zinc-50/50 dark:bg-zinc-950/20 p-4 text-center">
                      <Calendar
                        size={28}
                        className="mb-2 text-zinc-300 dark:text-zinc-700"
                      />
                      Seleziona una data sul calendario per sbloccare gli orari
                      disponibili.
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4">
              <button
                onClick={() => setStep(2)}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 text-sm flex items-center gap-1 font-semibold transition-colors"
              >
                <ChevronLeft size={16} /> Indietro
              </button>
              <button
                onClick={handleSubmit}
                disabled={!formData.dataSelezionata || !formData.oraSelezionata}
                className="bg-herbalife-1 dark:bg-green-600 text-white px-8 py-4 rounded-xl font-black text-sm uppercase tracking-wide shadow-lg hover:opacity-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Invia e Prenota Chiamata
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
