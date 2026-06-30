"use client";

import CalcoloPreventivo from "./calcoloPreventivo";
import RiepilogoTelefono from "./riepilogoTelefono";
import { useState } from "react";
import ModalRiepilogo from "./modalRiepilogo";
import { AnimatePresence } from "framer-motion";
import RiepilogoDesktop from "./riepilogoDesktop";

export default function Riepilogo({
  prodotti = [],
  onRimuoviProdotto,
  ruolo,
  usoDistributore,
  livelloMarketing,
  isAbbonato = false
}) {
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const preventivo = CalcoloPreventivo(
    prodotti,
    ruolo,
    usoDistributore,
    livelloMarketing,
    isAbbonato
  );

const {haBioniq} = preventivo;
// 🌟 Controlliamo se ci sono prodotti Bioniq
  const haBioniqReale = prodotti.some(p => p.categoria === "formulazioni personalizzate" && (Number(p.quantita) || 0) > 0)

  // 🌟 Controlliamo se ci sono prodotti "classici" (non Bioniq) oltre a quelli Bioniq
  const haProdottiClassici = prodotti.some(p => p.categoria !== "formulazioni personalizzate" && (Number(p.quantita) || 0) > 0);
  
  // Blocco attivo se l'utente sta mischiando Bioniq con i prodotti classici
  const haOrdineMisto = haBioniqReale && haProdottiClassici;

  const openModal = () => {
    setShowModal(true);
  };

  return (
    <>
      {/* VERSIONE DESKTOP */}
      <RiepilogoDesktop
        prodotti={prodotti}
        onRimuoviProdotto={onRimuoviProdotto}
        ruolo={ruolo}
        preventivo={preventivo}
        livelloMarketing={livelloMarketing}
        usoDistributore={usoDistributore}
        openModal={openModal}
        haBioniq={haBioniq}
        haOrdineMisto={haOrdineMisto}
        />

      {/* VERSIONE SMARTPHONE */}
      <RiepilogoTelefono
        prodotti={prodotti}
        ruolo={ruolo}
        preventivo={preventivo}
        livelloMarketing={livelloMarketing}
        usoDistributore={usoDistributore}
        setIsOpenMobile={setIsOpenMobile}
        isOpenMobile={isOpenMobile}
        onRimuoviProdotto={onRimuoviProdotto}
        openModal={openModal}
        haBioniq={haBioniq}
        haOrdineMisto={haOrdineMisto}
      />

      {/* MODALE DI CONFERMA */}
      <AnimatePresence mode="wait">
        {showModal && (
          <ModalRiepilogo
            key="modal-riepilogo"
            setShowModal={setShowModal}
            prodotti={prodotti}
            preventivo={preventivo}
            ruolo={ruolo}
            livelloMarketing={livelloMarketing}
            usoDistributore={usoDistributore}
          />
        )}
      </AnimatePresence>
    </>
  );
}
