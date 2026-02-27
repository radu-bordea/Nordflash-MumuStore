"use client";

import Image from "next/image";
import hero1 from "@/public/images/hero1.jpg";
import hero2 from "@/public/images/hero2.jpg";
import hero3 from "@/public/images/hero3.jpg";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

import Autoplay from "embla-carousel-autoplay";

const slides = [
  {
    image: hero1,
    title: "Naturlig Hudpleie",
    description:
      "Oppdag skånsomme og effektive ansiktsprodukter laget for å fremheve din naturlige skjønnhet og gi huden din en sunn glød.",
  },
  {
    image: hero2,
    title: "Eksklusiv Skjønnhet",
    description:
      "Utforsk premium skjønnhetsprodukter designet for å styrke din selvtillit og gi deg en luksuriøs følelse hver dag.",
  },
  {
    image: hero3,
    title: "Moderne Mote",
    description:
      "Finn stilrene og trendy moteprodukter som kombinerer komfort og eleganse – perfekt for enhver anledning.",
  },
];

const HeroCarousel = () => {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
      className="w-full"
    >
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={index}>
            <div className="relative w-full min-h-[60vh] flex items-center">
              {/* Background Image */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                className="object-cover"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/50" />

              {/* Text Content */}
              <div className="relative z-10 max-w-6xl mx-auto px-6 text-white">
                <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
                  {slide.title}
                </h1>
                <p className="mt-6 max-w-xl text-lg">
                  {slide.description}
                </p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Arrows */}
      <CarouselPrevious className="left-6" />
      <CarouselNext className="right-6" />
    </Carousel>
  );
};

export default HeroCarousel;