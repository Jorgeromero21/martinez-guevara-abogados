"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandLockup } from "@/components/ui/logo";
import { contactCta, navigation } from "@/content/site";
import { cn } from "@/lib/cn";
import { MobileMenu } from "./mobile-menu";

/**
 * Cabecera fija.
 * En la portada empieza transparente y en claro sobre la fotografía;
 * al hacer scroll (o en cualquier otra página) pasa a fondo papel.
 */
export function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));

  const overlay = pathname === "/" && !scrolled;
  const tone = overlay ? "paper" : "ink";

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[var(--z-header)] transition-[background-color,border-color,color] duration-500 ease-out",
          overlay
            ? "border-b border-on-night/15 bg-transparent text-on-night"
            : "border-b border-line bg-paper/90 text-ink backdrop-blur-md",
        )}
      >
        <div className="shell flex h-20 items-center justify-between gap-8">
          <BrandLockup tone={tone} />

          <nav aria-label="Navegación principal" className="hidden items-center gap-10 lg:flex">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[0.75rem] uppercase tracking-[0.18em] opacity-75 transition-opacity duration-300 hover:opacity-100"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <Link
              href={contactCta.href}
              className={cn(
                "hidden h-11 items-center border px-5 text-[0.75rem] uppercase tracking-[0.18em] transition-colors duration-300 md:inline-flex",
                overlay
                  ? "border-on-night/40 hover:bg-on-night hover:text-ink"
                  : "border-ink/30 hover:border-ink hover:bg-ink hover:text-paper",
              )}
            >
              {contactCta.label}
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menú"
              aria-expanded={menuOpen}
              aria-controls="menu-movil"
              className="flex h-11 items-center gap-3 text-[0.75rem] uppercase tracking-[0.18em] lg:hidden"
            >
              Menú
              <span className="flex w-6 flex-col gap-[6px]" aria-hidden>
                <span className="h-px w-full bg-current" />
                <span className="h-px w-full bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
