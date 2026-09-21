import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <span className="relative h-10 w-10 overflow-hidden rounded-full bg-card ring-2 ring-gold/70">
        <Image
          src="/images/logo.jpg"
          alt="Lachinova Beauty"
          fill
          sizes="40px"
          className="object-cover"
          priority
        />
      </span>
      <span className="hidden sm:flex flex-col leading-none font-serif text-nav-foreground">
        <span className="text-xl font-semibold uppercase tracking-[0.12em]">
          Lachinova
        </span>
        <span className="mt-1 text-[0.6rem] uppercase tracking-[0.35em] text-nav-foreground/80">
          Beauty
        </span>
      </span>
    </Link>
  );
}
export default Logo;