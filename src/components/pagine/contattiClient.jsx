"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  Send,
  User,
} from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaTelegram,
  FaWhatsapp,
} from "react-icons/fa";
import Background from "@/components/background/background";
import Section from "@/components/Section/Section";
import Input from "@/components/Inputs/Input";

const FORM_ID = "33bded7bb2b0f311323c25d896b09823";

const CONTATTI_PRINCIPALI = [
  {
    icon: Phone,
    titolo: "chiamami",
    valore: "+39 349 663 5371",
    href: "tel:+393496635371",
  },
  {
    icon: FaWhatsapp,
    titolo: "whatsapp",
    valore: "scrivimi in chat",
    href: "https://wa.me/393496635371",
    esterno: true,
  },
  {
    icon: Mail,
    titolo: "email",
    valore: "rodioriccardo@gmail.com",
    href: "mailto:rodioriccardo@gmail.com?subject=Info%20Herbalife",
  },
];

const SOCIAL = [
  { icon: FaTelegram, nome: "telegram", href: "https://t.me/RickyCoach24" },
  {
    icon: FaInstagram,
    nome: "instagram",
    href: "https://www.instagram.com/riccardo_rodio_wellness_coach/",
  },
  {
    icon: FaFacebook,
    nome: "facebook",
    href: "https://www.facebook.com/Ricky.rh24coach/",
  },
  {
    icon: FaLinkedin,
    nome: "linkedin",
    href: "https://www.linkedin.com/in/riccardo-rodio-593517120/",
  },
  {
    icon: FaPinterest,
    nome: "pinterest",
    href: "https://www.pinterest.it/riccardorodio/_saved/",
  },
];

const PRIMA_DI_SCRIVERE = [
  { href: "/faq-prodotto", titolo: "Domande su prodotti e Bioniq" },
  { href: "/faq", titolo: "Domande sull'attività Herbalife" },
  { href: "/preventivo", titolo: "Genera un preventivo gratuito" },
];

function CardContatto({ icon: Icon, titolo, valore, href, esterno }) {
  return (
    <a
      href={href}
      target={esterno ? "_blank" : undefined}
      rel={esterno ? "noopener noreferrer" : undefined}
      className="group flex items-center gap-4 rounded-3xl border border-line bg-card p-5 text-left no-underline! shadow-sm transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-herbalife-1 hover:shadow-lg dark:hover:border-green-500 focus-visible:ring-2 focus-visible:ring-herbalife-1/50 outline-none"
    >
      <span className="shrink-0 rounded-full bg-raised p-4 text-herbalife-1 shadow-inner transition-colors duration-300 group-hover:bg-herbalife-1 group-hover:text-white dark:text-green-500 dark:group-hover:bg-green-500 dark:group-hover:text-zinc-950">
        <Icon size={26} />
      </span>
      <span className="min-w-0 grow">
        <span className="block text-xs font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          {titolo}
        </span>
        <span className="block truncate text-base font-bold text-zinc-900 dark:text-zinc-100">
          {valore}
        </span>
      </span>
      <ArrowUpRight
        size={18}
        className="shrink-0 text-zinc-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-herbalife-1 dark:group-hover:text-green-400"
      />
    </a>
  );
}

function FormMessaggio() {
  const [stato, setStato] = useState("idle"); // idle | invio | ok | errore

  const invia = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStato("invio");
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${FORM_ID}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (!res.ok) throw new Error("invio non riuscito");
      form.reset();
      setStato("ok");
    } catch {
      setStato("errore");
    }
  };

  if (stato === "ok") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-3xl border border-line bg-card p-8 text-center shadow-sm">
        <CheckCircle2
          size={48}
          className="text-herbalife-1 dark:text-green-400"
        />
        <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-100">
          Messaggio inviato
        </h3>
        <p className="max-w-sm text-sm text-zinc-600 dark:text-zinc-300">
          Grazie, ti rispondo appena possibile. Se hai fretta, scrivimi su
          WhatsApp.
        </p>
        <button
          type="button"
          onClick={() => setStato("idle")}
          className="mt-2 cursor-pointer text-sm font-bold text-herbalife-1 underline underline-offset-4 dark:text-green-400"
        >
          invia un altro messaggio
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={invia}
      className="flex flex-col gap-4 rounded-3xl border border-line bg-card p-5 text-left shadow-sm sm:p-8"
    >
      {/* impostazioni formsubmit */}
      <input type="hidden" name="_subject" value="Nuovo messaggio dal sito" />
      <input type="hidden" name="_captcha" value="false" />
      <input
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
      />

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
          Nome e cognome
        </span>
        <Input
          name="nome"
          type="text"
          placeholder="Mario Rossi"
          autoComplete="name"
          required
          iconaDestra={<User size={18} />}
        />
      </label>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
            Email
          </span>
          <Input
            name="email"
            type="email"
            placeholder="nome@email.it"
            autoComplete="email"
            required
            iconaDestra={<Mail size={18} />}
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
            WhatsApp
          </span>
          <Input
            name="telefono"
            type="tel"
            placeholder="+39 ..."
            autoComplete="tel"
            required
            iconaDestra={<Phone size={18} />}
          />
        </label>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
          Messaggio
        </span>
        <Input
          as="textarea"
          name="messaggio"
          rows={5}
          placeholder="Come posso aiutarti?"
          required
          iconaDestra={<MessageSquare size={18} />}
        />
      </label>

      <label className="flex cursor-pointer items-start gap-3 select-none">
        <input
          type="checkbox"
          name="privacy"
          required
          className="mt-0.5 size-5 shrink-0 rounded-md accent-herbalife-1 dark:accent-herbalife-4"
        />
        <span className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
          Acconsento al trattamento dei miei dati per ricevere risposta, come
          descritto nella{" "}
          <Link
            href="/privacy"
            className="font-bold underline underline-offset-4"
          >
            privacy policy
          </Link>
          .
        </span>
      </label>

      {stato === "errore" && (
        <p
          role="alert"
          className="rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400"
        >
          Non sono riuscito a inviare il messaggio. Riprova, oppure scrivimi su{" "}
          <a
            href="https://wa.me/393496635371"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold underline"
          >
            WhatsApp
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={stato === "invio"}
        className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-herbalife-4 px-6 py-4 text-sm font-black uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:bg-herbalife-1 hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {stato === "invio" ? (
          <>
            <Loader2 size={18} className="animate-spin" /> invio in corso...
          </>
        ) : (
          <>
            <Send size={18} /> invia messaggio
          </>
        )}
      </button>
    </form>
  );
}

export default function ContattiClient() {
  return (
    <main>
      <Background
        titolo="contattami"
        sottotitolo="Una domanda sui prodotti, su Bioniq o sull'attività? Scegli il canale che preferisci."
        src="/immagini/background/home_hero_3to1.webp"
        compatta
      />

      <Section>
        <div className="flex flex-col gap-8 text-left">
          <h2>come preferisci contattarmi?</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {CONTATTI_PRINCIPALI.map((c) => (
              <CardContatto key={c.titolo} {...c} />
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="flex flex-col gap-8 text-left">
          <h2>lasciami un messaggio</h2>
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.4fr_1fr]">
            <FormMessaggio />

            <aside className="flex flex-col gap-5 rounded-3xl border border-line bg-card p-6 shadow-sm">
              <div>
                <h3 className="text-lg font-black text-zinc-900 dark:text-zinc-100">
                  Prima di scrivermi
                </h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                  Forse la risposta che cerchi è già qui.
                </p>
              </div>
              <ul className="flex flex-col gap-2">
                {PRIMA_DI_SCRIVERE.map(({ href, titolo }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="group flex items-center justify-between gap-3 rounded-xl bg-raised px-4 py-3 text-sm font-bold text-zinc-800 no-underline! transition-colors hover:text-herbalife-1 dark:text-zinc-200 dark:hover:text-green-400"
                    >
                      {titolo}
                      <ArrowUpRight
                        size={16}
                        className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="border-t border-line pt-4 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                Riccardo Rodio, Distributore Indipendente Herbalife, ID
                25800048.
              </p>
            </aside>
          </div>
        </div>
      </Section>

      <Section>
        <div className="flex flex-col gap-8 text-left">
          <h2>seguimi sui social</h2>
          <ul className="flex flex-wrap gap-3">
            {SOCIAL.map(({ icon: Icon, nome, href }) => (
              <li key={nome}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 rounded-full border border-line bg-card px-5 py-3 text-sm font-bold capitalize text-zinc-800 no-underline! shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-herbalife-1 hover:text-herbalife-1 hover:shadow-md dark:text-zinc-200 dark:hover:border-green-500 dark:hover:text-green-400"
                >
                  <Icon size={18} />
                  {nome}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </main>
  );
}
