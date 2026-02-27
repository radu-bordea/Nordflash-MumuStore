"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

import hero1 from "@/public/images/hero1.jpg";
import hero2 from "@/public/images/hero2.jpg";
import hero3 from "@/public/images/hero3.jpg";

const slides = [
  {
    image: hero1,
    title: "Naturlig Hudpleie",
    description:
      "Oppdag skånsomme og effektive ansiktsprodukter laget for å gi huden din en sunn og naturlig glød.",
  },
  {
    image: hero2,
    title: "Eksklusiv Skjønnhet",
    description:
      "Premium skjønnhetsprodukter utviklet for å fremheve din selvtillit og personlige stil.",
  },
  {
    image: hero3,
    title: "Moderne Mote",
    description:
      "Trendy og komfortable moteprodukter som kombinerer eleganse og kvalitet.",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full min-h-[52vh] flex items-center">
      <div className="max-w-7xl mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT SIDE */}
        <div className="relative min-h-65 flex flex-col justify-center">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === current ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
                {slide.title}
              </h1>

              <p className="mt-6 text-lg text-muted-foreground max-w-md">
                {slide.description}
              </p>

              <Button
                asChild
                size="lg"
                className="mt-8 rounded-xl px-8"
              >
                <Link href="/products">Våre produkter</Link>
              </Button>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE IMAGE (Hidden on Mobile) */}
        <div className="hidden lg:block relative h-96">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === current ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover rounded-3xl shadow-xl"
                priority
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}