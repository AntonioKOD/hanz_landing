import type { Metadata } from "next";
import "./globals.css";
import { Quicksand } from "next/font/google";

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Hanz – Dein Chat-Partner für Dienstleistungen",
  description:
    "Hanz ist die erste Chat-Plattform in Deutschland, die dich direkt mit geprüften lokalen Dienstleistern verbindet. Einfach beschreiben, was du brauchst – den Rest erledigt Hanz.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${quicksand.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
