"use client"
import {
  Check,
  ChevronDown,
  ChevronUp,
  ClipboardCopy,
  ShoppingBag,
} from "lucide-react";
import { AnimatePresence } from "motion/react";
import { motion } from "framer-motion";
import PreventivoDettaglio from "./preventivoDettaglio";
import PreventivoLista from "./preventivoLista";
import { createPortal } from "react-dom";

export default function riepilogoTelefono({
  prodotti,
  ruolo,
  preventivo,
  livelloMarketing,
  usoDistributore,
  setIsOpenMobile,
  isOpenMobile,
  onRimuoviProdotto,
  openModal,
}) {
  const content = (
    <>
      <div
        className="lg:hidden bg-white dark:bg-gray-900 h-[80px] fixed bottom-0 left-0 right-0 z-50 border-t-2 border-gray-400 shadow-lg p-2 sm:p-4 flex justify-between items-center pb-[env(safe-area-inset-bottom)]"
        style={{ transform: "translateZ(0)" }}
      >
        <div className="w-1/4">
          <p className="text-sm text-gray-600 dark:text-gray-400">totale:</p>
          <p className="text-lg font-bold dark:text-white">
            {ruolo === "cliente"
              ? `${preventivo.venditaCliente.toFixed(2)} €`
              : `${preventivo.totale.toFixed(2)} €`}
          </p>
        </div>
        <div
          className="w-1/2 flex justify-center"
          onClick={() => setIsOpenMobile(!isOpenMobile)}
        >
          <p className="dark:text-white relative cursor-pointer">
            <ShoppingBag size={30} />
            {preventivo.sommaProdotti > 0 && (
              <span className="absolute bottom-4 -right-3 w-6.5 bg-herbalife-1 text-herbalife-2 aspect-square rounded-full flex items-center justify-center">
                <span className="text-sm">
                  {preventivo.sommaProdotti < 100
                    ? preventivo.sommaProdotti
                    : "+99"}
                </span>
              </span>
            )}
          </p>
        </div>
        <button
          className="w-1/4 bg-herbalife-1 text-white font-bold px-2 py-1 sm:px-4 sm:py-2 rounded flex justify-between text-sm cursor-pointer"
          onClick={() => setIsOpenMobile(!isOpenMobile)}
        >
          dettagli {isOpenMobile ? <ChevronDown /> : <ChevronUp />}
        </button>
      </div>

      <AnimatePresence>
        {isOpenMobile && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-30 lg:hidden"
              style={{ height: "100dvh" }}
              onClick={() => setIsOpenMobile(false)}
            />

            <motion.div
              key="drawer"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="fixed bottom-[80px] left-0 right-0 z-40 max-h-[60dvh] overflow-y-auto scroll-smooth dark:text-white bg-[#e6e6e6] dark:bg-gray-800 p-4 border-t-2 border-gray-800 dark:border-gray-400 shadow-2xl lg:hidden"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold capitalize">
                  la tua lista prodotti:
                </h3>
                <button
                  className="text-sm text-gray-600 dark:text-gray-400 underline cursor-pointer capitalize"
                  onClick={() => setIsOpenMobile(false)}
                >
                  chiudi
                </button>
              </div>

              <PreventivoLista
                prodotti={prodotti}
                onRimuoviProdotto={onRimuoviProdotto}
              />

              <PreventivoDettaglio
                ruolo={ruolo}
                preventivo={preventivo}
                livelloMarketing={livelloMarketing}
                usoDistributore={usoDistributore}
                onRimuoviProdotto={onRimuoviProdotto}
              />

              {prodotti.length > 0 && (
                <button
                  onClick={() => {
                    setIsOpenMobile(false);
                    openModal(true);
                  }}
                  className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md transition-all text-sm font-bold uppercase tracking-wider shadow-md"
                >
                  <ClipboardCopy size={16} /> riepilogo ordine
                </button>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );

  return createPortal(content, document.body);
}
