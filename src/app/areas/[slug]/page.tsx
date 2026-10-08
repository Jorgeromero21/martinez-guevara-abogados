import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { areaWhatsappMessage, getPracticeArea, practiceAreas } from "@/content/practice-areas";
import { contactCta, sectionIds } from "@/content/site";
import { whatsappUrl } from "@/lib/contact";

export function generateStaticParams() {
  return practiceAreas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata(props: PageProps<"/areas/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const area = getPracticeArea(slug);
  if (!area) return {};
  return {
    title: `Abogados en Derecho ${area.name}`,
    description: area.description.slice(0, 160),
    alternates: { canonical: `/areas/${area.slug}` },
    openGraph: { images: [{ url: area.image.src, alt: area.image.alt }] },
  };
}

export default async function AreaPage(props: PageProps<"/areas/[slug]">) {
  const { slug } = await props.params;
  const area = getPracticeArea(slug);
  if (!area) notFound();

  const index = practiceAreas.indexOf(area);
  const next = practiceAreas[(index + 1) % practiceAreas.length];

  return (
    <>
      <section className="pb-20 pt-36 md:pb-28 md:pt-44">
        <div className="shell">
          <Link
            href={`/#${sectionIds.areas}`}
            className="group inline-flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.2em] text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft size={14} aria-hidden className="transition-transform duration-300 group-hover:-translate-x-1" />
            Especialidades
          </Link>

          <div className="mt-14 grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="label text-muted">
                  0{index + 1} · Derecho {area.name}
                </p>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="serif mt-8 text-[2.6rem] sm:text-6xl lg:text-[4.75rem]">{area.headline}</h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-10 max-w-xl text-lg leading-relaxed text-ink-soft">{area.description}</p>
              </Reveal>
              <Reveal delay={0.15} className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5">
                <ButtonLink href={contactCta.href}>{contactCta.label}</ButtonLink>
                <ButtonLink
                  href={whatsappUrl(areaWhatsappMessage(area))}
                  variant="line"
                  arrow="external"
                >
                  Escribir por WhatsApp
                </ButtonLink>
              </Reveal>
            </div>

            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
              <div className="relative aspect-[3/4] overflow-hidden bg-paper-deep">
                <Image
                  src={area.image.src}
                  alt={area.image.alt}
                  fill
                  preload
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className="photo object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-paper-deep/60 py-24 md:py-32">
        <div className="shell grid grid-cols-1 gap-20 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="label text-muted">Servicios</p>
            <h2 className="serif mt-8 text-4xl md:text-5xl">
              En qué <i>intervenimos.</i>
            </h2>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <ol className="border-t border-ink">
              {area.services.map((service, i) => (
                <li key={service} className="flex items-baseline gap-6 border-b border-line py-5">
                  <span className="w-6 shrink-0 text-xs tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-lg text-ink">{service}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-night text-on-night">
        <Link href={`/areas/${next.slug}`} className="group shell flex items-center justify-between gap-8 py-20 md:py-28">
          <span>
            <span className="label text-on-night-muted">Siguiente especialidad</span>
            <span className="serif mt-6 block text-5xl transition-transform duration-500 ease-out group-hover:translate-x-3 md:text-7xl">
              {next.name}
            </span>
          </span>
          <ArrowRight
            size={36}
            aria-hidden
            className="shrink-0 transition-transform duration-500 ease-out group-hover:translate-x-2"
          />
        </Link>
      </section>
    </>
  );
}
