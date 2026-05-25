"use client";

import PreventivoDettaglio from "./preventivoDettaglio";
import CalcoloPreventivo from "./calcoloPreventivo";
import RiepilogoTelefono from "./riepilogoTelefono";
import { useState } from "react";
import PreventivoLista from "./preventivoLista";
import { ClipboardCopy } from "lucide-react";
import ModalRiepilogo from "./modalRiepilogo";
import { AnimatePresence } from "framer-motion";
import RiepilogoDesktop from "./riepilogoDesktop";

export default function Riepilogo({
  prodotti = [],
  onRimuoviProdotto,
  ruolo,
  usoDistributore,
  livelloMarketing,
}) {
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const preventivo = CalcoloPreventivo(
    prodotti,
    ruolo,
    usoDistributore,
    livelloMarketing,
  );

  const openModal = () => {
    setShowModal(true);
  };
  console.log("Cliccato! Stato showModal prima:", showModal);

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
      />

      {/* MODALI DI CONFERMA / COPIA */}
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
