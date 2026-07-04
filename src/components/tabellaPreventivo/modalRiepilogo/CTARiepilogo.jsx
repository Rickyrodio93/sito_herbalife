import { Share, Store } from "lucide-react";

export default function CTARiepilogo({
  setShowModal,
  haProdottiBioniq,
  isCliente,
  ruolo,
  searchText,
  encodedMessage,
}) {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const linkBioniq = "https://shopbioniq.com/it-it/riccardorodio-bioniq";
  const linkEstoreCliente = `https://riccardorodio.goherbalife.com/Catalog/Product/Search/it-IT/${searchText}`;
  const linkMyHerbalifeBusiness = `https://www.myherbalife.com/it-IT/Shop/Catalog/Items/Search/${ruolo === "DS" ? "Ds" : "Mb"}?searchText=${searchText}`;

  return (
    <div className="flex flex-col sm:flex-row shrink-0 gap-3 items-center justify-end p-5 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-100 dark:border-zinc-900">
      <button
        type="button"
        onClick={() => setShowModal(false)}
        className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-200 font-medium transition-colors cursor-pointer text-center text-xs uppercase tracking-wider"
      >
        chiudi finestra
      </button>

      {isCliente ? (
        <>
          {haProdottiBioniq ? (
            <a
              target="_blank"
              href={linkBioniq}
              rel="noopener no referrer"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-wider shadow-sm transition-colors"
            >
              <Store size={16} /> Completa ordine Bioniq
            </a>
          ) : (
            <>
              <a
                href={linkEstoreCliente}
                className="w-full sm:w-auto bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-wider shadow-sm transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Store size={16} /> Completa sull&apos;e-store online
              </a>
              <a
                href={`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`}
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-wider shadow-sm transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Share size={16} /> invia ordine su whatsApp
              </a>
            </>
          )}
        </>
      ) : (
        <>
          <a
            href={linkMyHerbalifeBusiness}
            className="w-full sm:w-auto bg-herbalife-1 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-wider shadow-sm transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Store size={16} /> completa ordine su MyHerbalife
          </a>
        </>
      )}
    </div>
  );
}
