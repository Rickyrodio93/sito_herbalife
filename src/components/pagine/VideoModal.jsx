"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export default function VideoModal({ open, onClose, src, poster, titolo }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={titolo}
          className="fixed inset-0 z-999999 flex items-center justify-center bg-zinc-950/80 p-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.95, y: 12 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 12 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-black shadow-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="chiudi video"
              className="absolute right-3 top-3 z-10 cursor-pointer rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/80"
            >
              <X size={20} />
            </button>
            <video
              src={src}
              poster={poster}
              controls
              autoPlay
              playsInline
              className="aspect-video w-full"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
