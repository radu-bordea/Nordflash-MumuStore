import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/utils/seo";

import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Container from "@/components/global/Container";
import Providers from "./providers";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "@/components/footer/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Lachi | Lachinova Beauty",
    template: "%s | Lachi",
  },
  description:
    "Lachi – skjønnhetsprodukter med rask levering i Norge. Handle trygt med kort, Klarna og Link. Alle priser inkl. MVA.",
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "nb_NO",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Lachi | Lachinova Beauty",
    description: "Skjønnhetsprodukter med rask levering i Norge.",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="nb" suppressHydrationWarning>
        <body
          className={`${inter.variable} ${cormorant.variable} antialiased flex min-h-screen flex-col`}
        >
          <Providers>
            <Navbar />
            <Container className="py-6 flex-1 w-full">{children}</Container>
            <Footer />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
