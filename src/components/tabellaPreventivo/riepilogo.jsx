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
