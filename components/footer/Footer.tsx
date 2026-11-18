import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaCcVisa,
  FaCcMastercard,
} from "react-icons/fa";
import { SiKlarna } from "react-icons/si";
import Container from "@/components/global/Container";
import { COMPANY } from "@/utils/company";
import { NorwayFlag, SwedenFlag, DenmarkFlag } from "./Flags";
import BackToTop from "./BackToTop";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from "@/utils/shipping";

const pill =
  "flex h-8 items-center justify-center rounded-md bg-nav-foreground/10 px-2 text-nav-foreground";

export default function Footer() {
  return (
    <footer className="mt-16 bg-nav text-nav-foreground">
      <Container className="grid w-full gap-10 py-10 px-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Company */}
        <div>
          <p className="font-serif text-2xl uppercase tracking-[0.2em]">
            {COMPANY.name}
          </p>
          <span className="mt-3 block h-0.5 w-12 rounded-full bg-gold" />
          <p className="mt-4 text-sm text-nav-foreground/80">
            Premium skjønnhetsprodukter for din naturlige glød.
          </p>
        </div>

        {/* Contact */}
        <div className="text-sm">
          <h3 className="mb-3 font-serif text-lg">Kontakt</h3>
          <ul className="space-y-1.5 text-nav-foreground/80">
            <li>
              <a href={`mailto:${COMPANY.email}`} className="hover:underline">
                {COMPANY.email}
              </a>
            </li>
            <li>{COMPANY.name}</li>
            <li>Org.nr: {COMPANY.orgNumber}</li>
            {/* <li>{COMPANY.address}</li> */}
          </ul>
        </div>

        {/* Links + social */}
        <div className="text-sm">
          <h3 className="mb-3 font-serif text-lg">Handle</h3>
          <ul className="space-y-1.5 text-nav-foreground/80">
            <li>
              <Link href="/products" className="hover:underline">
                Produkter
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:underline">
                Handlekurv
              </Link>
            </li>
            <li>
              <Link href="/orders" className="hover:underline">
                Mine bestillinger
              </Link>
            </li>
          </ul>
          <div className="mt-4 flex gap-3">
            <a
              href={COMPANY.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-nav-foreground/10 transition hover:bg-gold hover:text-gold-foreground"
            >
              <FaFacebookF />
            </a>
            <a
              href={COMPANY.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-nav-foreground/10 transition hover:bg-gold hover:text-gold-foreground"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Shipping + payment */}
        <div className="text-sm">
          <h3 className="mb-3 font-serif text-lg">Vi leverer til</h3>
          <div className="flex items-center gap-3">
            <NorwayFlag />
            {/* <SwedenFlag />
            <DenmarkFlag /> */}
          </div>

          <p className="mt-3 text-nav-foreground/80">
            Fri frakt over {FREE_SHIPPING_THRESHOLD} kr.
            <br />
            Ellers {SHIPPING_FEE} kr.
          </p>

          <h3 className="mb-3 mt-6 font-serif text-lg">Betaling</h3>
          <div className="flex flex-wrap gap-2">
            <span className={pill} aria-label="Visa">
              <FaCcVisa className="h-5 w-6" />
            </span>
            <span className={pill} aria-label="Mastercard">
              <FaCcMastercard className="h-5 w-6" />
            </span>
            <span className={pill} aria-label="Klarna">
              <SiKlarna className="h-4 w-8" />
            </span>
            <span className={`${pill} text-xs font-semibold`}>Link</span>
          </div>
        </div>
      </Container>

      <div className="border-t border-nav-foreground/20 py-4 text-center text-xs text-nav-foreground/70">
        © {new Date().getFullYear()} {COMPANY.name}. Alle priser er oppgitt i
        NOK inkl. MVA.
      </div>

      <BackToTop />
    </footer>
  );
}
