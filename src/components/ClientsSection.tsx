"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

const row1 = [
  { src: "/images/logos/logo--cocacola.svg", alt: "Coca-Cola" },
  { src: "/images/logos/logo--nvidia.svg", alt: "NVIDIA" },
  { src: "/images/logos/logo--google.svg", alt: "Google" },
  { src: "/images/logos/logo--sony.svg", alt: "Sony" },
  { src: "/images/logos/logo--porsche.svg", alt: "Porsche" },
  { src: "/images/logos/logo--apple.svg", alt: "Apple" },
];

const row2 = [
  { src: "/images/logos/logo--hyundai.svg", alt: "Hyundai" },
  { src: "/images/logos/logo--awwwards.svg", alt: "Awwwards" },
  { src: "/images/logos/logo--akqa.svg", alt: "AKQA" },
  { src: "/images/logos/logo--stanford.svg", alt: "Stanford" },
  { src: "/images/logos/logo--webby-awards.svg", alt: "Webby Awards" },
  { src: "/images/logos/logo--maxmara.svg", alt: "Max Mara" },
];

function MarqueeRow({ logos, direction, speed }: {
  logos: typeof row1;
  direction: "left" | "right";
  speed: number;
}) {
  const rowRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const row = rowRef.current;
    if (!row) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Each card set is 50% of the total width (since we duplicate)
    const xEnd = direction === "left" ? "-50%" : "50%";
    const xStart = direction === "left" ? "0%" : "-50%";

    gsap.set(row, { x: xStart });
    gsap.to(row, {
      x: xEnd,
      duration: speed,
      ease: "none",
      repeat: -1,
    });
  });

  // Duplicate logos for seamless loop
  const allLogos = [...logos, ...logos];

  return (
    <div className="overflow-hidden">
      <div ref={rowRef} className="flex w-max gap-4 md:gap-5">
        {allLogos.map((logo, i) => (
          <div
            key={`${logo.alt}-${i}`}
            className="logo-card group flex items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.02] w-[160px] h-[100px] md:w-[220px] md:h-[130px] shrink-0 hover:border-[#94fcff]/15 hover:bg-white/[0.04] transition-all duration-300 cursor-pointer"
          >
            <img
              src={logo.src}
              alt={`${logo.alt} logo`}
              className="max-h-[32px] md:max-h-[108px] w-auto opacity-60 group-hover:opacity-90 transition-opacity duration-300"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ClientsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;
    const scroller = document.querySelector("main");
    if (!scroller) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const heading = section.querySelector(".clients-heading");
    if (heading) {
      gsap.from(heading, {
        y: 40, autoAlpha: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: heading, scroller, start: "top 85%", toggleActions: "play none none reverse" },
      });
    }

    const desc = section.querySelector(".clients-desc");
    if (desc) {
      gsap.from(desc, {
        y: 30, autoAlpha: 0, duration: 0.6, delay: 0.15, ease: "power2.out",
        scrollTrigger: { trigger: heading, scroller, start: "top 85%", toggleActions: "play none none reverse" },
      });
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="bg-[#0e1418] py-16 md:py-24 overflow-hidden">
      {/* Header row */}
      <div className="mb-10 md:mb-16 flex flex-col gap-4 px-5 md:flex-row md:items-start md:justify-between md:px-[60px]">
        <h2
          className="clients-heading font-normal uppercase tracking-[2px] text-white font-[family-name:var(--font-display)]"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
        >
          Trusted by Companies
        </h2>
        <p className="clients-desc max-w-[280px] text-[10px] font-medium uppercase tracking-[1.5px] text-white/40 md:text-right leading-[1.8]">
          Powering AI solutions for global brands and forward-thinking teams.
        </p>
      </div>

      {/* Scrolling logo rows — GSAP-driven marquee */}
      <div className="flex flex-col gap-4 md:gap-5">
        <MarqueeRow logos={row1} direction="left" speed={30} />
        <MarqueeRow logos={row2} direction="right" speed={35} />
      </div>
    </section>
  );
}
