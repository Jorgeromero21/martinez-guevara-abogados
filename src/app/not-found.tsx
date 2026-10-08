import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[80dvh] flex-col items-start justify-center pt-28">
      <p className="label text-muted">Error 404</p>
      <h1 className="serif mt-8 max-w-3xl text-5xl md:text-7xl">
        Esta página no existe. <i>Su caso, sí.</i>
      </h1>
      <div className="mt-12">
        <ButtonLink href="/">Volver al inicio</ButtonLink>
      </div>
    </section>
  );
}
