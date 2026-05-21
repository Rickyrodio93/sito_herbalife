import { X } from "lucide-react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";

export default function ZoomImage({ src, onClose }) {
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.18 } },
    exit: { opacity: 0, transition: { duration: 0.15 } },
  };

  const imgVariants = {
    hidden: { scale: 0.85, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 25, delay: 0.06 },
    },
    exit: { scale: 0.9, opacity: 0, transition: { duration: 0.15 } },
  };

  return createPortal (
    <motion.div
      className="fixed inset-0 bg-[rgba(0,0,0,0.70)] z-[999999] flex items-center justify-center"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose}
    >
      <span
        className="absolute top-5 right-6 text-white font-bold cursor-pointer z-[1000000]"
        onClick={onClose}
        aria-label="Chiudi immagine ingrandita"
      >
        <X size={30} />
      </span>

      <motion.img
        src={src}
        alt="zoom"
        className="max-w-full max-h-full px-2.5 z-[100000]"
        variants={imgVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()} // evita che il click sull'immagine chiuda il modal
      />
    </motion.div>,
    document.body
  );
}
