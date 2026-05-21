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
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: { duration: 0.3 },
            }}
            exit={{
              opacity: 0,
              transition: { duration: 0.3 },
            }}
            className="fixed top-0 left-0 z-9999999999999 w-full h-full overflow-x-hidden overflow-y-auto transition-opacity duration-[0.15s] ease-linear bg-[rgba(0,0,0,0.75)]"
            id={`modal-${id}`}
            tabIndex="-1"
            aria-labelledby={`modal-${id}-Label`}
            aria-hidden={!open}
            onClick={closeModal}
          >
            <motion.div
              initial={{
                y: "-5%",
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
                transition: { duration: 0.3 },
              }}
              exit={{
                y: "-5%",
                opacity: 0,
                transition: { duration: 0.3 },
              }}
              className="relative w-auto m-7 pointer-events-none h-[calc(100%-1.75rem*2)] flex items-center min-h-[calc(100%-1.75rem*2)] min-[576px]:max-w-125 min-[576px]:mr-auto min-[576px]:ml-auto animate-fadeIn"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex flex-col w-full max-h-full overflow-hidden pointer-events-auto bg-white dark:bg-[#2e2e2e] bg-clip-padding border border-solid border-[rgba(0,0,0,0.175)] rounded-lg">
                {/* modal header */}
                <div className="flex shrink-0 items-center justify-between p-4 border-b-2 border-b-[#dee2e6] dark:border-b-gray-500 rounded-tl-[calc(0.5rem-(1px))] rounded-tr-[calc(0.5rem-(1px))]">
                  <h1 className="mb-0 text-xl leading-6 capitalize text-herbalife-1 pr-3 font-semibold">
                    {titolo}
                  </h1>
                  <button
                    type="button"
                    className="cursor-pointer box-content w-8 h-8 text-black dark:text-gray-200 bg-transparent border-0 rounded-md opacity-50 p-2 -m-2"
                    aria-label="close"
                    onClick={closeModal}
                  >
                    <X />
                  </button>
                </div>
                {/* modal body */}
                <div className="relative flex-auto p-4 min-h-12.5 overflow-y-auto scrollbar">
                  <p className="mx-7 sm:mx-14 mb-4 text-base dark:text-white text-left">
                    {descrizione}
                  </p>
                </div>
                {/* modal footer */}
                <div className="flex shrink-0 items-center justify-end p-[calc(1rem-0.5rem*0.5)] border-t-2 border-t-[#dee2e6] dark:border-t-gray-500 rounded-bl-calc[calc(0.5rem-(1px))] rounded-br-[calc(0.5rem-(1px))]">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="cursor-pointer inline-block m-1 py-1.5 px-3 text-base font-normal bg-slate-500 hover:bg-slate-600 text-white text-center align-middle transition-all rounded-md"
                  >
                    chiudi
                  </button>
                  <Link
                    href={`https://riccardorodio.goherbalife.com/Catalog/Product/Details/it-IT/${id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white bg-herbalife-1 hover:bg-green-900 transition-all rounded-md inline-block m-1 py-1.5 p-3 text-base font-normal"
                  >
                    <div className="flex gap-2.5">
                      <Store size={20} /> vai all'e-commerce
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
