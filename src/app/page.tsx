import { Areas } from "@/components/sections/areas";
import { Contact } from "@/components/sections/contact";
import { Firm } from "@/components/sections/firm";
import { Hero } from "@/components/sections/hero";
import { Location } from "@/components/sections/location";
import { Method } from "@/components/sections/method";
import { Team } from "@/components/sections/team";

/** Página de inicio. El orden de las secciones se controla solo aquí. */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Firm />
      <Areas />
      <Method />
      <Team />
      <Contact />
      <Location />
    </>
  );
}
