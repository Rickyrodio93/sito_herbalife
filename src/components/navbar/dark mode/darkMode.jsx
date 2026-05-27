import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function DarkMode() {
  // 1. Inizializziamo lo stato a false. Sul server sarà sempre "light" di default.
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 2. Questo useEffect gira SOLO sul client appena il componente viene montato nel browser
  useEffect(() => {
    setMounted(true);
    
    // Controlla in sicurezza la preferenza passata o quella del sistema operativo
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
    }
  }, []);

  // 3. Questo useEffect gestisce l'aggiornamento quando l'utente clicca l'interruttore
  useEffect(() => {
    if (!mounted) return; // Evita di sovrascrivere il localStorage al primissimo rendering

    // Aggiorna l'attributo data-theme sull'html
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "dark" : "light"
    );

    // Salva la scelta dell'utente in local storage
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");

    const metaThemeColor = document.querySelector("meta[name='theme-color']");
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        "content",
        isDarkMode ? "var(--color-herbalife-3)" : "var(--color-herbalife-1)"
      );
    }
  }, [isDarkMode, mounted]);

  // Se il componente non è ancora montato sul client, evitiamo di renderizzare icone instabili
  if (!mounted) {
    return <div className="w-14 h-8 bg-zinc-200 dark:bg-zinc-800 rounded-full opacity-50 animate-pulse" />; 
  }

  return (
    <label className="flex items-center cursor-pointer select-none">
      <input
        type="checkbox"
        id="darkmode"
        checked={isDarkMode}
        onChange={() => setIsDarkMode(!isDarkMode)}
        className="hidden"
      />
      <span className="w-14 h-8 bg-zinc-200 dark:bg-zinc-800 rounded-full flex items-center p-1 transition-colors duration-300">
        <span
          className={`w-6 h-6 flex justify-center items-center p-1 bg-white dark:bg-zinc-950 text-zinc-700 dark:text-zinc-200 rounded-full shadow-sm transition-transform duration-300 ${
            isDarkMode ? "translate-x-6 text-green-400" : ""
          }`}
        >
          {isDarkMode ? <Moon size={14}/> : <Sun size={14} />}
        </span>
      </span>
    </label>
  );
}