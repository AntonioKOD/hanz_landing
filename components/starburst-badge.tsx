// components/starburst-badge.tsx
import { TiStarburst } from "react-icons/ti";
import clsx from "clsx";

type Props = {
  className?: string;
  sizeClasses?: string;   // control size from parent
  line1?: string;
  line2?: string;
  tilt?: number;          // degrees
  shadow?: boolean;       // sticker-style shadow
};

export default function StarburstBadge({
  className,
  sizeClasses = "w-24 sm:w-28 md:w-32 lg:w-36",
  line1 = "Hanz startet am",
  line2 = "10.03.26",
  tilt = -10,
  shadow = true,
}: Props) {
  return (
    <div className={clsx("relative aspect-square shrink-0", sizeClasses, className)}>
      <TiStarburst
        className={clsx(
          "absolute inset-0 h-full w-full text-[#fbdf0e]",
          "motion-safe:animate-[spin_12s_linear_infinite] motion-reduce:animate-none",
          shadow && "drop-shadow-[0_6px_12px_rgba(0,0,0,0.15)]"
        )}
        aria-hidden
      />
      <div className="absolute inset-0 grid place-items-center">
        <span
          style={{ transform: `rotate(${tilt}deg)` }}
          className="text-black text-center font-bold leading-tight text-[11px] sm:text-sm md:text-base lg:text-lg px-2"
        >
          {line1}
          <br />
          <span className="whitespace-nowrap">{line2}</span>
        </span>
      </div>
    </div>
  );
}