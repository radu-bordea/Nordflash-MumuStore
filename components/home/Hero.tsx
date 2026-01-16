import Link from "next/link";
import { Button } from "../ui/button";
import HeroCarousel from "./HeroCarousel";

const Hero = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 items-center gap-24">
      <div>
        <h1 className="max-w-2xl font-bold text-4xl tracking-tight sm:text-6xl">
          Find best products in Bodø, Norway
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground">
          Discover Bodø’s newest store offering natural, trustworthy skin, beauty, and fashion products designed to enhance your glow and confidence.
        </p>
        <Button asChild size="lg" className="mt-10">
          <Link href="/products">Our Products</Link>
        </Button>
      </div>
      <HeroCarousel />
    </section>
  );
};
export default Hero;
