import Link from "next/link";
import { footerGrid } from "./footerUtils";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-900 px-6 sm:px-[10%] pt-16 pb-12 transition-colors duration-300">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14 text-center lg:text-left max-w-7xl mx-auto">
        {footerGrid.map((section, index) => (
          <div key={index} className="flex flex-col">
            <h4 className="font-bold text-lg text-herbalife-2 dark:text-green-400 tracking-wide capitalize mb-6">
              {section.title}
            </h4>

            {/* social */}
            {section.title === "Seguimi sui social" ? (
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                {section.items?.map((item, idx) => (
                  <a
                    key={idx}
                    rel="noopener noreferrer"
                    target="_blank"
                    className={`inline-flex items-center justify-center w-10 h-10 text-white bg-zinc-900 border border-zinc-800 hover:border-herbalife-1 dark:hover:border-green-500 rounded-full transition-all duration-300 hover:scale-110 shadow-sm ${item.style}`}
                    href={item.link}
                    aria-label={item.name}
                  >
                    <item.icon size={18} />
                  </a>
                ))}
              </div>
            ) : (
              <ul className="flex flex-col gap-3">
                {section.items?.map((item, idx) => {
                  const isExternal =
                    item.link.startsWith("http") || item.link.startsWith("tel");
                  const linkStyles =
                    "text-[15px] font-medium text-zinc-400 hover:text-white transition-all duration-200 inline-block hover:translate-x-1";

                  return (
                    <li key={idx}>
                      {isExternal ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={linkStyles}
                        >
                          {item.name}
                        </a>
                      ) : (
                        <Link href={item.link} className={linkStyles}>
                          {item.name}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ))}
      </div>
      <div className="border-t border-zinc-900 pt-8 max-w-7xl mx-auto flex flex-col gap-2.5 text-center text-xs text-zinc-500 tracking-wide">
        <p className="font-medium text-zinc-400">
          Sito creato da Riccardo Rodio | © {currentYear} Tutti i diritti
          Riservati
        </p>
        <p className="max-w-3xl mx-auto leading-relaxed px-4">
          Questo sito è interamente di proprietà ed è gestito dal distributore
          indipendente Herbalife Riccardo Rodio, ID: 25800048
        </p>
      </div>
    </footer>
  );
}
