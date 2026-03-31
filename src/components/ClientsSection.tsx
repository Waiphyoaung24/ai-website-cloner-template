import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoItem {
  src: string;
  alt: string;
}

const row1Logos: LogoItem[] = [
  { src: "/images/logos/logo--cocacola.svg", alt: "Coca-Cola" },
  { src: "/images/logos/logo--maxmara.svg", alt: "Max Mara" },
  { src: "/images/logos/logo--calvin-klein.svg", alt: "Calvin Klein" },
  { src: "/images/logos/logo--porsche.svg", alt: "Porsche" },
  { src: "/images/logos/logo--wallpaper.svg", alt: "Wallpaper" },
];

const row2Logos: LogoItem[] = [
  { src: "/images/logos/logo--sony.svg", alt: "Sony" },
  { src: "/images/logos/logo--hyundai.svg", alt: "Hyundai" },
  { src: "/images/logos/logo--google.svg", alt: "Google" },
  { src: "/images/logos/logo--apple.svg", alt: "Apple" },
  { src: "/images/logos/logo--webby-awards.svg", alt: "Webby Awards" },
  { src: "/images/logos/logo--stanford.svg", alt: "Stanford" },
];

const row3Logos: LogoItem[] = [
  { src: "/images/logos/logo--akqa.svg", alt: "AKQA" },
  { src: "/images/logos/logo--nexus-studios.svg", alt: "Nexus Studios" },
  { src: "/images/logos/logo--cocacola.svg", alt: "Coca-Cola" },
  { src: "/images/logos/logo--awwwards.svg", alt: "Awwwards" },
  { src: "/images/logos/logo--nvidia.svg", alt: "NVIDIA" },
];

function MarqueeRow({
  logos,
  duration,
  logoHeight,
  className,
}: {
  logos: LogoItem[];
  duration: number;
  logoHeight: number;
  className?: string;
}) {
  return (
    <div className={cn("overflow-hidden", className)}>
      <div
        className="animate-marquee-left flex w-max items-center gap-20"
        style={{ animationDuration: `${duration}s` }}
      >
        {/* Render logos twice for seamless infinite scroll */}
        {[...logos, ...logos].map((logo, index) => (
          <Image
            key={`${logo.alt}-${index}`}
            src={logo.src}
            alt={logo.alt}
            width={0}
            height={logoHeight}
            className="h-auto w-auto opacity-80"
            style={{
              height: `${logoHeight}px`,
              width: "auto",
              filter: "brightness(0) invert(1)",
            }}
            unoptimized
          />
        ))}
      </div>
    </div>
  );
}

export function ClientsSection() {
  return (
    <section className="overflow-hidden bg-black py-20">
      <div className="mb-16 flex items-start justify-between px-[60px]">
        <h2 className="text-[32px] font-normal uppercase tracking-[2px] text-white">
          BRANDS WE WORK WITH
        </h2>
        <p className="max-w-[200px] text-right text-[10px] font-medium uppercase tracking-[1px] text-white">
          TRUSTED BY GLOBAL BRANDS, CULTURAL INSTITUTIONS, AND FORWARD THINKING
          TEAMS.
        </p>
      </div>

      <MarqueeRow logos={row1Logos} duration={30} logoHeight={30} />
      <MarqueeRow
        logos={row2Logos}
        duration={35}
        logoHeight={40}
        className="mt-12"
      />
      <MarqueeRow
        logos={row3Logos}
        duration={25}
        logoHeight={30}
        className="mt-12"
      />
    </section>
  );
}
