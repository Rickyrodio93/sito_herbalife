
import Link from "next/link";
import { footerGrid } from "./footerUtils";

export default function Footer() {
  return (
    <footer className="bg-black px-[10%] py-14">
      <div className="flex flex-wrap mt-auto">
        {footerGrid.map((section, index) => (
          <div
            key={index}
            className="w-full md:w-1/2 lg:w-1/4 mb-8 px-4 text-center lg:text-left"
          >
            <h4 className="font-normal text-2xl text-(--color-herbalife-2) capitalize mb-7">
              {section.title}
            </h4>
            {section.title === "Seguimi sui social" ? (
              <div>
                {section.items?.map((item, idx) => (
                  <a
                    key={idx}
                    rel="noopener noreferrer"
                    target="_blank"
                    className={`inline-block w-11 h-11 p-2.5 justify-center text-white bg-(--color-herbalife-1) rounded-full mr-2 mb-2 leading-11 ${item.style}`}
                    href={item.link}
                    aria-label={item.name}
                  >
                    <item.icon size={24}/>
                    
                  </a>
                ))}
              </div>
            ) : (
              <ul>
                {section.items?.map((item, idx) => {
                  const isExternal =
                    item.link.startsWith("http") || item.link.startsWith("tel");
                  return (
                    <li key={idx} className="not-last:mb-2">
                      {isExternal ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[16px] capitalize text-white duration-300 hover:pl-2"
                        >
                          {item.name}
                        </a>
                      ) : (
                        <Link
                          href={item.link}
                          className="text-[16px] capitalize text-white duration-300 hover:pl-2"
                        >
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
      <h4 className="text-center text-xs text-white">
        Sito creato da Riccardo Rodio | © 2025 Tutti i diritti Riservati
      </h4>
      <h4 className="text-center text-xs text-white">
        Questo sito è interamente di proprietà ed è gestito dal distributore
        indipendente Herbalife Riccardo Rodio, ID:25800048
      </h4>
    </footer>
  );
}
