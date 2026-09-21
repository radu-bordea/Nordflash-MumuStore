import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Container from "@/components/global/Container";
import Providers from "./providers";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "MuMu Store",
  description: "Your one-stop shop for all skin routine via MuMu Store!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="nb" suppressHydrationWarning>
        <body className={`${inter.variable} ${cormorant.variable} antialiased`}>
          <Providers>
            <Navbar />
            <Container className="py-6">{children}</Container>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}