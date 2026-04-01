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
        className="animate-marquee-left flex w-max items-center"
        style={{ animationDuration: `${duration}s`, gap: "clamp(40px, 6vw, 100px)" }}
      >
        {[...logos, ...logos].map((logo, index) => (
          <img
            key={`${logo.alt}-${index}`}
            src={logo.src}
            alt={logo.alt}
            className="opacity-90"
            style={{
              width: "auto",
              height: "auto",
              maxHeight: `${logoHeight}px`,
              filter: "brightness(0) invert(1)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function ClientsSection() {
  return (
    <section className="overflow-hidden bg-[#0e1418] py-16 md:py-24">
      {/* Heading row */}
      <div className="mb-10 flex flex-col gap-4 px-6 md:mb-16 md:flex-row md:items-start md:justify-between md:px-[60px]">
        <h2 className="text-xl font-normal uppercase tracking-[2px] text-white md:text-[32px]">
          TRUSTED PARTNERS
        </h2>
        <p className="max-w-[250px] text-[10px] font-medium uppercase tracking-[1px] text-white md:text-right">
          POWERING AI SOLUTIONS FOR GLOBAL BRANDS AND FORWARD-THINKING
          TEAMS.
        </p>
      </div>

      {/* Marquee rows — enlarged logos */}
      <MarqueeRow logos={row1Logos} duration={25} logoHeight={100} />
      <MarqueeRow
        logos={row2Logos}
        duration={30}
        logoHeight={110}
        className="mt-10 md:mt-14"
      />
      <MarqueeRow
        logos={row3Logos}
        duration={20}
        logoHeight={100}
        className="mt-10 md:mt-14"
      />
    </section>
  );
}
