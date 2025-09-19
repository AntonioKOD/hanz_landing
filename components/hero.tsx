'use client'

import Image from "next/image"
import logo from '@/public/Logo hanz.svg'
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { BellDotIcon, BriefcaseBusiness, CarIcon, Check, CheckCheck, GraduationCap, HammerIcon, HeartIcon, LuggageIcon, PersonStandingIcon, Sparkles, TruckIcon, WrenchIcon } from "lucide-react"
import { FeaturesSectionWithHoverEffects } from "./blocks/feature-section-with-hover-effects"
import Link from "next/link"
import { NumberTicker } from "./ui/number-ticker"
import { StaggerTestimonials } from "./ui/stagger-testimonials"
import { HoverEffect } from "./ui/hover-effect"
import { IconBulb, IconConfetti } from "@tabler/icons-react"


const categories = [
    {
        title: 'Bau & Renovierung',
        description: 'Umbau, Sanierung, Handwerk',
        icon: HammerIcon
    },
    {
        title: 'Elektrik',
        description: 'Installation, Reparatur, Smart Home',
        icon: IconBulb
    },
    {
        title: 'Sanitär & Heizung',
        description: 'Reparaturen, Installation, Wartung',
        icon: WrenchIcon
    },
    {
        title: 'Garten & Außenbereich',
        description: 'Gartenpflege, Landschaftsbau',
        icon: BellDotIcon
    },
    {
        title: "Transport & Umzug",
        description: 'Umzüge, Lieferungen, Logistik',
        icon: TruckIcon
    },
    {
        title: 'Auto & Motoring',
        description: 'Reparatur, Wartung, Service',
        icon: CarIcon
    },
    {
        title: 'Business-Services',
        description: 'Beratung, IT-Services, Marketing',
        icon: BriefcaseBusiness
    },
    {
        title: "Gesundheit & Schönheit",
        description: 'Pflege, Wellness, Therapie',
        icon: HeartIcon
        
    },
    {
        title: 'Events & Kultur',
        description: 'Veranstaltungen, Entertainment',
        icon: IconConfetti
    },
    {
        title: 'Möbel & Tischlerarbeiten',
        description: 'Maßanfertigungen, Reparaturen',
        icon: HammerIcon
    },
    {
        title: "Reinigung",
        description: "Hausreinigung, Büroreinigung",
        icon: Sparkles
    },
    {
        title: "Bildung",
        description: "Nachhilfe, Kurse, Training",
        icon: GraduationCap
    }

]

export default function Landing(){
    return(
        <div className="container mx-auto text-center py-20">
            <Image src={logo} alt="Hanz Logo"className="mx-auto mb-4 " />
            <h1 className="text-6xl font-bold">Dein digitaler Zugang</h1>
            <p className="text-primary font-bold text-6xl">zu neuen Kunden</p>
            <p className="text-lg text-muted-foreground mt-4">Registriere dich als Service-Dienstleister und gewinne mehr Aufträge - <span className="font-bold">schnell, sicher und unkompliziert.</span></p>
            <Link href='/form'><Button size="lg" className="mt-8">Jetzt kostenlos registrieren</Button></Link>
            
            <div>
                <Badge className="mt-10 bg-muted-foreground/20 gap-1 text-black"><Check className="text-black" size={16} /> Kostenlose Registrierung • <Check className="text-black " size={16} /> Keine versteckten Kosten</Badge>
            </div>

            <div className="mt-20 space-y-4">
                <h2 className="font-bold text-3xl">Warum hanz.io?</h2>
                <p className="text-muted-foreground">Profitieren Sie von unserer Plattform und wachsen Sie nachhaltig.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
                    <div>
                <p className="text-5xl text-[#fbdf0e]"><NumberTicker  value={100} className="text-6xl font-bold text-warning"/>%</p>
                <p className="text-muted-foreground text-3xl">Mehr Sichtbarkeit</p>
</div>
                <div>
                <p className="text-5xl text-[#fbdf0e]"><NumberTicker  value={100} className="text-6xl font-bold text-warning"/>%</p>
                <p className="text-muted-foreground text-3xl">Weniger Aufwand</p>
</div>
                <div>
                <p className="text-5xl text-[#fbdf0e]"><NumberTicker  value={100} direction="down" className="text-6xl font-bold text-warning"/>%</p>
                <p className="text-muted-foreground text-3xl">Kosten-risiko</p>
                </div>
            </div>
        </div>
        <div className="mt-12 bg-muted-foreground/10 p-10 rounded-lg">
            <h1 className="text-4xl font-bold">Kundenstimmen</h1>
            <StaggerTestimonials/>
        </div>

        <div>
            <h3 className="text-4xl  font-bold mt-4">
                In 3 Schritten zu neuen Kunden
            </h3>
            <FeaturesSectionWithHoverEffects/>
        
    </div>
    <div>
        <h3 className="text-4xl  font-bold mt-4">Dienstleistungs-Kategorien</h3>
        <p className="text-muted-foreground">In welchem Bereich sind Sie tätig? Wir verbinden Sie mit den richtigen Kunden.</p>
        <HoverEffect items={categories}/>
    </div>
        </div>

    )
}