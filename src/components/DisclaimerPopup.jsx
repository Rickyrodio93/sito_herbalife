"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function DisclaimerPopup() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem("disclaimer_accepted");

    if (!hasAccepted) {
      setShowPopup(true);
    }
  }, []);

  const handleAccepted = () => {
    localStorage.setItem("disclaimer_accepted", "true");
    setShowPopup(false);
  };
  return (
    <>
      <AnimatePresence>
        {showPopup && (
          <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] dark:bg-[rgba(0,0,0,0.65)] bg-opacity-60 flex items-center justify-center z-999999">
            <motion.div
              initial={{ y: "-10%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-[#2e2e2e] shadow-xl max-w-3xl w-full max-h-[80vh] p-4 text-center relative text-balance rounded-3xl text-sm overflow-y-auto"
            >
              <div className="sm:border-3 border-herbalife-4 dark:border-herbalife-1 p-4 text-gray-600 dark:text-white rounded-xl">
                <p className="mb-6">
                  Questo sito web è gestito dal distributore indipendente
                  Herbalife:
                  <strong> Riccardo Rodio</strong> ID:25800048.
                </p>
                <div className="mb-6 flex flex-col sm:flex-row">
                  <div className="w-full sm:w-1/2 px-5">
                    <h1 className="uppercase font-bold text-[0.95rem] mb-2.5">
                      sei già un cliente?
                    </h1>
                    <p>
                      Se Riccardo Rodio non è il Distributore che ti segue, ti
                      invitiamo ad acquistare i tuoi prodotti dal Distributore
                      con cui sei già in contatto. La relazione personale con il
                      tuo Distributore è la chiave per raggiungere i tuoi
                      obiettivi nutrizionali. Hai un obiettivo di benessere?{" "}
                      <a
                        href="https://riccardorodio.goherbalife.com/wellness/Home/Index/it-IT/#/WpTerms"
                        className="uppercase font-bold hover:underline underline sm:no-underline"
                        target="_blank"
                      >
                        crea qui
                      </a>{" "}
                      il tuo Profilo Benessere rispondendo ad alcune domande e
                      ricevi consigli su misura per te. È veloce e semplice.
                    </p>
                  </div>
                  <div className="w-full sm:w-1/2 px-5 mt-10 sm:mt-0 border-l-0 sm:border-l-2 border-(--color-herbalife-4) dark:border-(--color-herbalife-1)">
                    <h1 className="uppercase font-bold text-[0.95rem] mb-2.5">
                      vuoi diventare distributore?
                    </h1>
                    <p>
                      Se vuoi diventare distibutore o anche solo saperne di più
                      su come potersi costruire una entrata extra con questa
                      attività,{" "}
                      <a
                        href="https://accounts.myherbalife.com/Account/Create?appId=1&qrFlow=1&locale=it-IT&SponsorId=kQkJ2BXpUJ4=&cmp=m_it_it_wbs_dssignup_btn_nap_copylink_20250305"
                        className="uppercase font-bold hover:underline underline sm:no-underline"
                        target="_blank"
                      >
                        clicca qui
                      </a>{" "}
                      e compila il modulo per metterti in contatto con me.
                    </p>
                  </div>
                </div>
                <div>
                  <p className="mb-4">
                    Continua con la navigazione nel sito cliccando qui sotto
                  </p>
                  <button
                    onClick={handleAccepted}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium shadow-md cursor-pointer"
                  >
                    Ho capito
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
