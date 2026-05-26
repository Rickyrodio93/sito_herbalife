import { Store, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function ModalProdotti({
  id,
  titolo,
  descrizione,
  open,
  closeModal,
}) {
  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2 } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="fixed inset-0 overflow-x-hidden hoverflow-y-auto bg-zinc-950/75 z-99999 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            id={`modal-${id}`}
            tabIndex="-1"
            aria-labelledby={`modal-${id}-label`}
            aria-hidden={!open}
            onClick={closeModal}
          >
            <motion.div
              initial={{ y: "20px", opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                transition: { duration: 0.25, ease: "easeOut" },
              }}
              exit={{ y: "20px", opacity: 0, transition: { duration: 0.2 } }}
              className="relative w-full max-w-lg pointer-events-none my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex flex-col w-full max-h-[85vh] overflow-hidden pointer-events-auto bg-white dark:bg-zinc-900 border border-gray-400 dark:border-gray-600 rounded-2xl shadow-2xl bg-clip-padding">
                <div className="flex shrink-0 items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">
                  <h1 className="text-xl leading-6 capitalize text-herbalife-1 dark:text-green-500 font-bold pr-3">
                    {titolo}
                  </h1>
                  <button
                    type="button"
                    aria-label="Chiudi finestra"
                    onClick={closeModal}
                    className="cursor-pointer flex items-center justify-center w-8 h-8 text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 border-0 rounded-full transition-colors p-0"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="relative flex-auto p-6 overflow-y-auto scrollbar text-zinc-700 dark:text-zinc-300">
                  <p className="text-base leading-relaxed text-left whitespace-pre-line">
                    {descrizione}
                  </p>
                </div>

                <div className="flex shrink-0 flex-col sm:flex-row items-center justify-end gap-3 p-5 border-t border-gray-200 dark-border-bray-700 bg-gray-50/50 dark:bg-zinc-800/20">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="w-full sm:w-auto cursor-pointer inline-flex items-center justify-center py-2.5 px-5 text-sm font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition-colors rounded-xl"
                  >
                    chiudi
                  </button>
                  <Link
                    href={`https://riccardorodio.goherbalife.com/Catalog/Product/Details/it-IT/${id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto text-white dark:text-zinc-950 bg-zinc-950 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white font-semibold py-2.5 px-5 text-sm uppercase tracking-wider transition-colors rounded-xl shadow-md"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Store size={18}/>
                      <span>vai all'e-commerce</span>
                    </div>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
