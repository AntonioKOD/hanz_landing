
import logo from '@/public/logo (h).svg'
import Image from "next/image";
import { ProviderPreRegisterForm } from "../register-form";

function Form() {
  return (
    <div className="w-full py-8 sm:py-12 lg:py-20 xl:py-40">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-6 sm:gap-8 items-center lg:grid-cols-2">
          <div className="flex gap-4 flex-col text-center lg:text-left">
            <Image src={logo} alt="Hanz Logo" className="mx-auto lg:mx-0" />
            <div className="flex gap-4 flex-col">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-lg tracking-tighter font-regular">
                Hand in Hand mit Hanz
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed tracking-tight max-w-md text-primary">
                <span className="font-bold">Dein digitaler Zugang zu neuen Kunden</span>
              </p>
              <p className="text-sm sm:text-base">
                Registriere dich als Service-Dienstleister und gewinne mehr Aufträge - schnell, sicher und unkompliziert.
              </p>
            </div>
          </div>
          <div className="gap-8">
            <ProviderPreRegisterForm/>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Form };
