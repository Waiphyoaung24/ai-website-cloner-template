import { cn } from "@/lib/utils";

const CROSS_POSITIONS = [5, 25, 50, 72, 95] as const;

function CrossMarker({ xPercent }: { xPercent: number }) {
  return (
    <div
      className="absolute top-1/2 h-3 w-3 -translate-y-1/2 opacity-30"
      style={{ left: `${xPercent}%` }}
    >
      {/* Vertical line */}
      <div className="absolute left-1/2 h-full w-px -translate-x-1/2 bg-white" />
      {/* Horizontal line */}
      <div className="absolute top-1/2 h-px w-full -translate-y-1/2 bg-white" />
    </div>
  );
}

export function HeroSection({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "relative h-screen w-full overflow-hidden bg-black",
        className,
      )}
    >
      {/* Atmospheric background gradient (placeholder for 3D scene) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(100,110,130,0.25) 0%, rgba(30,30,40,0.1) 40%, black 70%)",
        }}
      />

      {/* Cross markers */}
      <div className="pointer-events-none absolute inset-0">
        {CROSS_POSITIONS.map((x) => (
          <CrossMarker key={x} xPercent={x} />
        ))}
      </div>

      {/* Left text block */}
      <div className="absolute bottom-[60px] left-[60px] z-10">
        <div
          className="text-[min(4vw,48px)] font-normal uppercase leading-[1.15] tracking-[2px] text-white"
        >
          <div>WE ARE</div>
          <div>LUSION</div>
          <div>A CREATIVE</div>
          <div className="italic">PRODUCTION STUDIO</div>
        </div>
      </div>

      {/* Right text block */}
      <div className="absolute bottom-[60px] right-[200px] z-10 text-right">
        <div
          className="text-[min(4vw,48px)] font-normal uppercase italic leading-[1.15] tracking-[2px] text-white"
        >
          <div>CRAFTING UNIQUE</div>
          <div>DIGITAL EXPERIENCES</div>
        </div>
      </div>

      {/* Scroll prompt */}
      <div className="absolute bottom-[60px] right-[60px] z-10">
        <span className="text-[10px] font-medium uppercase tracking-[2px] text-white/50">
          SCROLL TO EXPLORE
        </span>
      </div>
    </section>
  );
}
