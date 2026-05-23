"use client";
import { Phone } from "lucide-react";
import { motion } from "framer-motion";

export default function FloatingCallCTA({isOpenMobile = false}) {
  const phoneNumber = "+393496635371";

  return (
    <>
      <motion.div 
    //   Se il riepilogo mobile è aperto, spostiamo il pulsante verso il basso (y: 100) e lo nascondiamo
      animate={{ 
        y: isOpenMobile ? 120 : 0,
        opacity: isOpenMobile ? 0 : 1 
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed bottom-6 left-6 z-999 pointer-events-none"
    >
        <motion.a
          href={`tel:${phoneNumber}`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="pointer-events-auto flex items-center gap-3 bg-herbalife-4 hover:bg-herbalife-1 text-white px-4 py-3 sm:px-5 sm:py-3.5 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.15)] hover:shadow-[0_8px_30px_rgba(34,197,94,0.4)] border border-white/10 transition-all duration-300 select-none group"
          aria-label="Chiamami direttamente"
        >
          <div className="relative flex h-5 w-5 items-center justify-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/40 opacity-75"></span>
            <Phone
              size={20}
              className="relative z-10 group-hover:rotate-12 transition-transform duration-300"
            />
          </div>

          <span className="text-xs sm:text-sm font-black uppercase tracking-wider">
            <span className="inline sm:hidden">Chiamami</span>
            <span className="hidden sm:inline">Chiamami ora</span>
          </span>
        </motion.a>
      </motion.div>
    </>
  );
}
