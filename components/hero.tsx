'use client'

import Image from "next/image"
import logo from '@/public/Logo hanz.svg'
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Check } from "lucide-react"
import { FeaturesSectionWithHoverEffects } from "./blocks/feature-section-with-hover-effects"
import Link from "next/link"
export default function Landing(){
    return(
        <div className="container mx-auto text-center py-20">
            <Image src={logo} alt="Hanz Logo" className="mx-auto mb-4 " />
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
                <FeaturesSectionWithHoverEffects />
            </div>
        </div>
    )
}