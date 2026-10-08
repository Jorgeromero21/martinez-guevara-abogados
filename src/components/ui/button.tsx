import Link from "next/link";
import type { ComponentProps } from "react";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/cn";

type Variant = "solid" | "line";
type Tone = "ink" | "paper";

type ButtonLinkProps = Omit<ComponentProps<"a">, "href"> & {
  href: string;
  variant?: Variant;
  /** "paper" para usar sobre fondos oscuros o fotografías. */
  tone?: Tone;
  arrow?: "right" | "external" | false;
};

const base =
  "group inline-flex items-center justify-center gap-3 whitespace-nowrap text-[0.8125rem] font-medium uppercase tracking-[0.14em] " +
  "transition-[background-color,color,border-color] duration-300 ease-out";

const variants: Record<Variant, Record<Tone, string>> = {
  solid: {
    ink: "h-14 px-8 bg-ink text-paper hover:bg-slate",
    paper: "h-14 px-8 bg-paper text-ink hover:bg-white",
  },
  line: {
    ink: "tap pb-1.5 border-b border-ink/40 text-ink hover:border-ink",
    paper: "tap pb-1.5 border-b border-on-night/40 text-on-night hover:border-on-night",
  },
};

/** Botón-enlace del sitio. next/link para rutas internas; <a> para externas. */
export function ButtonLink({
  href,
  variant = "solid",
  tone = "ink",
  arrow = "right",
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  const isExternal = /^(https?:|mailto:|tel:)/.test(href);
  const Arrow = arrow === "external" ? ArrowUpRight : ArrowRight;
  const classes = cn(base, variants[variant][tone], className);

  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <Arrow
          aria-hidden
          size={15}
          className="transition-transform duration-300 ease-out group-hover:translate-x-1"
        />
      )}
    </>
  );

  if (isExternal) {
    const opensTab = href.startsWith("http");
    return (
      <a href={href} className={classes} {...(opensTab ? { target: "_blank", rel: "noreferrer" } : {})} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {content}
    </Link>
  );
}
