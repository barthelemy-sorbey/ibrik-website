import type { Metadata } from "next";
import { Bagel_Fat_One, Source_Serif_4, DM_Mono } from "next/font/google";
import "./globals.css";

const bagel = Bagel_Fat_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bagel",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif-body",
  display: "swap",
});

const dmMono = DM_Mono({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-mono-dm",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ibrik Kitchen — Romanian Kitchen, Bucharest",
  description:
    "A small Romanian kitchen in Bucharest's old town. Sarmale, mămăligă, papanași, țuică and ibrik coffee. Bun venit.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bagel.variable} ${sourceSerif.variable} ${dmMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
