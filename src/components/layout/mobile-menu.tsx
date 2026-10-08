"use client";

import { X } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import { BrandLockup } from "@/components/ui/logo";
import { contactCta, navigation, site } from "@/content/site";
import { telUrl, whatsappUrl } from "@/lib/contact";
import { twoDigits } from "@/lib/format";
import { easeOut } from "@/lib/motion";
import { useModal } from "@/lib/use-modal";

type MobileMenuProps = { open: boolean; onClose: () => void };

export const MOBILE_MENU_ID = "menu-movil";

/**
 * Menú a pantalla completa para móvil y tableta. Bloquea el scroll del fondo,
 * mantiene el foco dentro (Tab circula), Escape lo cierra y, al cerrar, el
 * foco vuelve al botón que lo abrió.
 */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const reduce = useReducedMotion();
  const panel = useRef<HTMLDivElement>(null);
  useModal(open, onClose, panel);

  const links = [...navigation, { href: contactCta.href, label: "Contacto" }];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panel}
          id={MOBILE_MENU_ID}
          role="dialog"
          aria-modal="true"
          aria-label="Menú"
          className="fixed inset-0 z-[var(--z-menu)] flex flex-col bg-night text-on-night lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          transition={{ duration: 0.35, ease: easeOut }}
        >
          <div className="shell flex h-20 items-center justify-between border-b border-on-night/15">
            <BrandLockup tone="paper" />
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar menú"
              autoFocus
              className="flex h-11 min-w-11 items-center justify-center gap-2 text-[0.75rem] uppercase tracking-[0.18em]"
            >
              Cerrar
              <X size={18} aria-hidden />
            </button>
          </div>

          <nav aria-label="Navegación móvil" className="shell flex flex-1 flex-col justify-center">
            {links.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: reduce ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.06 + i * 0.05, ease: easeOut }}
                className="border-b border-on-night/10"
              >
                <Link href={item.href} onClick={onClose} className="flex items-baseline gap-5 py-4">
                  <span className="w-6 text-xs tabular-nums text-on-night-muted">{twoDigits(i + 1)}</span>
                  <span className="serif text-[2.4rem]">{item.label}</span>
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="shell grid grid-cols-2 gap-px pb-8 text-[0.75rem] uppercase tracking-[0.16em]">
            <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="border border-on-night/25 py-4 text-center">
              WhatsApp
            </a>
            <a href={telUrl()} className="border border-on-night/25 py-4 text-center">
              Llamar
            </a>
            <p className="col-span-2 mt-4 text-center normal-case tracking-normal text-on-night-muted">
              {site.contact.email}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
