
import logo from '@/public/logo (h).svg'
import Image from "next/image";
import { ProviderPreRegisterForm } from "../register-form";

function Form() {
  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 items-center md:grid-cols-2">
          <div className="flex gap-4 flex-col">
            <Image src={logo} alt="Hanz Logo" />
            <div className="flex gap-4 flex-col">
              <h1 className="text-5xl md:text-7xl max-w-lg tracking-tighter text-left font-regular">
                Hand in Hand mit Hanz
              </h1>
              <p className="text-2xl leading-relaxed tracking-tight max-w-md text-left text-primary ">
                <span className="font-bold">Dein digitaler Zugang zu neuen Kunden</span>
              </p>
              <p>
                Registriere dich als Service-Dienstleister und gewinne mehr Aufträge - schnell, sicher und unkompliziert.
              </p>
            </div>
          </div>
          <div className=" gap-8">
            <ProviderPreRegisterForm/>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Form };
