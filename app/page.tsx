import Landing from "@/components/hero";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <nav className="flex justify-between items-center border-b border-gray-200">
        <Image src="/Logo hanz.svg" alt="Hanz Logo" width={60} height={60} className="m-4"/>
      <div className="flex gap-4 p-4 text-lg font-medium">
        <Link href="#">Vorteile</Link>
        <Link href="#">Preise</Link>
        <Link href="#">Kontakt</Link>
      </div>
      <div className="mx-4">
        <Button>Werde ein Hanzler</Button>
      </div>
      </nav>
    <Landing/>
    </div>
  );
}
