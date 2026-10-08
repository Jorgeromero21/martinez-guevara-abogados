"use client";

import { WhatsappLogo } from "@phosphor-icons/react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { whatsappUrl } from "@/lib/contact";
import { easeOut } from "@/lib/motion";

/** Acceso directo a WhatsApp. Aparece después de la portada para no competir con su llamado. */
export function WhatsAppFab() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setVisible(y > 800));

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={whatsappUrl("Buen día, quisiera agendar una consulta.")}
          target="_blank"
          rel="noreferrer"
          aria-label="Escribir por WhatsApp"
          className="fixed bottom-5 right-5 z-[var(--z-fab)] grid size-14 place-items-center bg-ink text-paper shadow-[0_18px_40px_-16px_rgb(0_0_0/0.55)] transition-colors duration-300 hover:bg-slate md:bottom-8 md:right-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8, transition: { duration: 0.15 } }}
          transition={{ duration: 0.4, ease: easeOut }}
        >
          <WhatsappLogo size={24} weight="light" aria-hidden />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
