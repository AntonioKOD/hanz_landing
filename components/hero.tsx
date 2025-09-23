'use client'

import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { BellDotIcon, BriefcaseBusiness, CarIcon, Check, GraduationCap, HammerIcon, HeartIcon, Sparkles, TruckIcon, WrenchIcon } from "lucide-react";
import { FeaturesSectionWithHoverEffects } from "./blocks/feature-section-with-hover-effects";
import Link from "next/link";
import { NumberTicker } from "./ui/number-ticker";
import { StaggerTestimonials } from "./ui/stagger-testimonials";
import { HoverEffect } from "./ui/hover-effect";
import { IconBulb, IconConfetti } from "@tabler/icons-react";
import StarburstBadge from "./starburst-badge";

const categories = [
  { title: "Bau & Renovierung", description: "Umbau, Sanierung, Handwerk", icon: HammerIcon },
  { title: "Elektrik", description: "Installation, Reparatur, Smart Home", icon: IconBulb },
  { title: "Sanitär & Heizung", description: "Reparaturen, Installation, Wartung", icon: WrenchIcon },
  { title: "Garten & Außenbereich", description: "Gartenpflege, Landschaftsbau", icon: BellDotIcon },
  { title: "Transport & Umzug", description: "Umzüge, Lieferungen, Logistik", icon: TruckIcon },
  { title: "Auto & Motoring", description: "Reparatur, Wartung, Service", icon: CarIcon },
  { title: "Business-Services", description: "Beratung, IT-Services, Marketing", icon: BriefcaseBusiness },
  { title: "Gesundheit & Schönheit", description: "Pflege, Wellness, Therapie", icon: HeartIcon },
  { title: "Events & Kultur", description: "Veranstaltungen, Entertainment", icon: IconConfetti },
  { title: "Möbel & Tischlerarbeiten", description: "Maßanfertigungen, Reparaturen", icon: HammerIcon },
  { title: "Reinigung", description: "Hausreinigung, Büroreinigung", icon: Sparkles },
  { title: "Bildung", description: "Nachhilfe, Kurse, Training", icon: GraduationCap },
];

export default function Landing() {
  return (
    <div className="container mx-auto text-center py-8 sm:py-12 lg:py-20 font-quicksand px-4">
      {/* ===== HERO ===== */}
<section className="relative mx-auto max-w-3xl text-center pt-10">
 
  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
    Hand in Hand
  </h1>
  <h2 className="text-primary font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mt-1">
    mit Hanz
  </h2>

  <p className="text-base sm:text-lg text-muted-foreground mt-4 max-w-2xl mx-auto px-4">
   Hanz verbindet dich mit neuen Kunden. Deine smarte Plattform für mehr Geschäft –{" "}
    <span className="font-bold">Schnell, fair und unkompliziert.</span>
  </p>

  <Link href="/form">
    <Button
      size="lg"
      className="mt-6 sm:mt-8 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 h-auto w-full sm:w-auto"
    >
      Jetzt kostenlos voranmelden und Vorteile sichern!
    </Button>
  </Link>
    <p className="mt-6">Sei schnell! Melde Dich bis zum 15.10.25 an und zahle in den ersten 3 Monaten ab Start keinerlei Gebühren.</p>
  <div className="mt-6 sm:mt-10 px-4">
    <Badge className="bg-muted-foreground/20 gap-1 text-black text-xs sm:text-sm px-3 py-2">
      <Check className="text-black" size={14} /> Aufträge ohne Kostenrisiko •{" "}
      <Check className="text-black" size={14} /> Neue Kunden gewinnen •{" "}
      <Check className="text-black" size={14} /> Schnell & stressfrei
    </Badge>
  </div>
</section>

      {/* ===== WHY ===== */}
      <section className="mt-12 sm:mt-16 lg:mt-20 space-y-4 px-4">
        <h3 className="font-bold text-2xl sm:text-3xl">Warum hanz.com?</h3>
        <p className="text-muted-foreground text-lg sm:text-base">
          Keine teuren Leads, weniger Angebotsaufwand - zahle nur für echte Aufträge.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-10">
          <div className="text-center">
            <p className="text-3xl sm:text-4xl lg:text-5xl text-[#fbdf0e]">
              <NumberTicker value={100} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-warning" />%
            </p>
            <p className="text-muted-foreground text-lg sm:text-xl lg:text-2xl">Mehr Sichtbarkeit</p>
          </div>

          <div className="text-center">
            <p className="text-3xl sm:text-4xl lg:text-5xl text-[#fbdf0e]">
              <NumberTicker value={100} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-warning" />%
            </p>
            <p className="text-muted-foreground text-lg sm:text-xl lg:text-2xl">Weniger Aufwand</p>
          </div>

          <div className="text-center">
            <p className="text-3xl sm:text-4xl lg:text-5xl text-[#fbdf0e]">
              <NumberTicker value={100} direction="down" className="text-4xl sm:text-5xl lg:text-6xl font-bold text-warning" />%
            </p>
            <p className="text-muted-foreground text-lg sm:text-xl lg:text-2xl">Kosten-risiko</p>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="mt-8 sm:mt-12 bg-muted-foreground/10 p-4 sm:p-6 lg:p-10 rounded-lg mx-4 sm:mx-0">
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center">Kundenstimmen</h3>
        <StaggerTestimonials />
      </section>

      {/* ===== FEATURES ===== */}
      <section className="px-4 sm:px-0">
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-8 sm:mt-12 text-center">
          In 3 Schritten zu neuen Kunden
        </h3>
        <FeaturesSectionWithHoverEffects />
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="px-4 sm:px-0">
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-8 sm:mt-12 text-center">
          Dienstleistungs-Kategorien
        </h3>
        <p className="text-muted-foreground text-center text-sm sm:text-base">
          In welchem Bereich sind Sie tätig? Wir verbinden Sie mit den richtigen Kunden.
        </p>
        <HoverEffect items={categories} />
      </section>
    </div>
  );
}