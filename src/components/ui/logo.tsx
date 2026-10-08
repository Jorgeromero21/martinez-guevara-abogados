import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

type Tone = "ink" | "paper";

/** Monograma de la firma. "paper" es la versión clara para fondos oscuros. */
export function Monogram({ tone = "ink", className }: { tone?: Tone; className?: string }) {
  return (
    <span className={cn("relative inline-block aspect-[245/196]", className)} aria-hidden>
      <Image
        src={tone === "paper" ? "/images/brand/monogram-light.png" : "/images/brand/monogram.png"}
        alt=""
        fill
        sizes="64px"
        className="object-contain"
      />
    </span>
  );
}

/** Monograma + nombre compuesto en texto real (nítido y accesible). */
export function BrandLockup({ tone = "ink", className }: { tone?: Tone; className?: string }) {
  return (
    <Link href="/" aria-label={`${site.name}, inicio`} className={cn("flex min-h-11 items-center gap-2.5 min-[360px]:gap-3.5", className)}>
      <Monogram tone={tone} className="w-8" />
      <span className="flex flex-col whitespace-nowrap leading-none">
        <span className="serif text-[0.9rem] uppercase tracking-[0.1em] min-[360px]:text-[1.05rem] min-[360px]:tracking-[0.12em] sm:text-[1.15rem]">{site.name}</span>
        <span className="mt-1.5 text-[0.55rem] uppercase tracking-[0.3em] opacity-60 sm:text-[0.6rem]">
          {site.descriptor}
        </span>
      </span>
    </Link>
  );
}
