import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";

export default function ConfermaCopia({ setConferma, ruolo, prodotti }) {
  const ids = prodotti.map((p) => p.id); // seleziona gli ID dei prodotti selezionati

  const searchText = encodeURIComponent(ids.join(" "));

  // link per completare l'ordine sul myHerbalife
  const linkHL = `https://www.myherbalife.com/it-IT/Shop/Catalog/Items/Search/${
    ruolo === "DS" ? "Ds" : "Mb"
  }?searchText=${searchText}`;

  const content = (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, ease: "linear" }}
        exit={{ opacity: 0 }}
        onClick={() => setConferma(false)}
        className="fixed inset-0 z-[9999999999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-[#2e2e2e] p-6 rounded-2xl shadow-2xl max-w-sm w-full text-center border border-gray-200 dark:border-gray-700"
        >
          <div className="text-green-600 mb-4 flex justify-center">
            <motion.div
              initial={{ scale: 0, opacity: 0, rotate: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                rotate: [0, -20, 15, -10, 5, 0],
                x: [0, -5, 5, -5, 5, 0],
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: 0.1,
                rotate: { delay: 0.4, duration: 0.6, ease: "easeInOut" },
                x: { delay: 0.4, duration: 0.4 },
              }}
              className="bg-green-100 rounded-full p-2"
            >
              <Check size={48} />
            </motion.div>
          </div>
          <h3 className="text-xl font-bold mb-2 uppercase text-black dark:text-white">
            Codici salvati!
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
            Ci sei quasi. Adesso clicca qui sotto per completare l'ordine su
            MyHerbalife. Troverai i tuoi prodotti già pronti da inserire nel
            carrello.
          </p>

          <div className="flex flex-col gap-3">
            <a
              href={linkHL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setConferma(false)}
              className="bg-green-600 hover:bg-green-700 text-white font-bold p-3 rounded-lg transition-colors"
            >
              Completa l'ordine su MyHerbalife
            </a>
            <button
              onClick={() => setConferma(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white text-sm font-semibold py-2"
            >
              CHIUDI
            </button>
          </div>
        </motion.div>
      </motion.div>
    </>
  );

  return createPortal(content, document.body);
}
