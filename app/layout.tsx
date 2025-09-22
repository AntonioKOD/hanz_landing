import type { Metadata } from "next";
import "./globals.css";
import { Quicksand } from "next/font/google";
import Script from "next/script";

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
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WHF8B72QV1"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WHF8B72QV1');
          `}
        </Script>
      </head>
      <body
        className={`${quicksand.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
