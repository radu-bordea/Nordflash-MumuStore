import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <Link
      href="/"
      className="relative flex h-14 items-center gap-2 sm:h-16"
    >
      {/* Butterfly on the left of the text */}
      <span className="relative h-12 w-12 shrink-0 -bottom-1 -right-2 sm:h-14 sm:w-14">
        <Image
          src="/images/butterfly1.png"
          alt=""
          fill
          sizes="40px"
          className="object-contain"
          priority
        />
      </span>

      {/* Wordmark */}
      <span className="font-serif uppercase leading-none tracking-[0.2em] text-nav-foreground text-2xl sm:text-3xl">
        Lachi
      </span>

      {/* Two butterflies scattered to the right, overlapping the top corner */}
      <span className="relative h-9 w-9 shrink-0 right-3 sm:h-10 sm:w-10">
        <Image
          src="/images/butterfly2.png"
          alt=""
          fill
          sizes="40px"
          className="object-contain -translate-y-2"
          priority
        />
        <span className="absolute -bottom-3 right-5 h-6 w-6 sm:h-7 sm:w-7">
          <Image
            src="/images/butterfly3.png"
            alt=""
            fill
            sizes="28px"
            className="object-contain"
          />
        </span>
      </span>
    </Link>
  );
}
export default Logo;