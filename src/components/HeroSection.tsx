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

      {/* Text overlay — two column layout at bottom */}
      <div className="absolute inset-x-[60px] bottom-[60px] z-10 flex items-end justify-between">
        {/* Left text block */}
        <div className="text-[min(3.5vw,44px)] font-normal uppercase leading-[1.2] tracking-[2px] text-white">
          <div>WE ARE</div>
          <div>LUSION</div>
          <div>A CREATIVE</div>
          <div className="italic">PRODUCTION STUDIO</div>
        </div>

        {/* Right text block + scroll prompt */}
        <div className="text-right">
          <div className="text-[min(3.5vw,44px)] font-normal uppercase italic leading-[1.2] tracking-[2px] text-white">
            <div>CRAFTING UNIQUE</div>
            <div>DIGITAL EXPERIENCES</div>
          </div>
          <span className="mt-4 inline-block text-[10px] font-medium uppercase tracking-[2px] text-white/50">
            SCROLL TO EXPLORE
          </span>
        </div>
      </div>
    </section>
  );
}
