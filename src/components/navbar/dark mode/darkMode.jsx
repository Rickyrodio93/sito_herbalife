import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function DarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // controlla il tema salvato in local storage o usa il tema di sistema
    return (
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  useEffect(() => {
    // aggiorna l'attributo data-theme sull'html
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "dark" : "light"
    );

    // salva la scelta dell'utente in local storage
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");

    const metaThemeColor = document.querySelector("meta[name='theme-color']");
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", isDarkMode ? "var(--color-herbalife-3)" : "var(--color-herbalife-1)")
    }
  }, [isDarkMode]);

  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        id="darkmode"
        checked={isDarkMode}
        onChange={() => setIsDarkMode(!isDarkMode)}
        className="hidden"
      />
      <span className="md:w-16 w-8 h-8 bg-gray-300 dark:bg-herbalife-1 rounded-full flex items-center p-1 transition">
        <span
          className={`w-6 h-6 flex justify-center items-center p-1 bg-white dark:bg-herbalife-2 rounded-full shadow-md transition-transform ${
            isDarkMode ? "md:translate-x-8" : ""
          }`}
        >
          {isDarkMode ? <Moon /> : <Sun />}
        </span>
      </span>
    </label>
  );
}
