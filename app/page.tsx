import Landing from "@/components/hero";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="flex justify-center items-center p-6">
        <Image src="/logo (h).svg" alt="Hanz Logo" width={80} height={80} />
      </div>
      <Landing/>
    </div>
  );
}
