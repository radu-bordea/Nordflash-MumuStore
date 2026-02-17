import Link from "next/link";
import { Button } from "../ui/button";
import HeroCarousel from "./HeroCarousel";

const Hero = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 items-center gap-24">
      <div>
        <h1 className="max-w-2xl font-bold text-4xl tracking-tight sm:text-6xl">
          Find de beste produktene i Bodø, Norge
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground">
          Oppdag Bodøs nyeste butikk som tilbyr naturlige og pålitelige hudpleie-, skjønnhets- og moteprodukter designet for å fremheve din glød og selvtillit.
        </p>
        <Button asChild size="lg" className="mt-10">
          <Link href="/products">Våre produkter</Link>
        </Button>
      </div>
      <HeroCarousel />
    </section>
  );
};
export default Hero;
