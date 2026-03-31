import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

const confettiPieces = Array.from({ length: 80 }, (_, i) => ({
  char: ["\u2715", "\u25C7", "\u25BD", "\u25B7", "\u2022", "\u2726", "+", "\u25B3"][i % 8],
  left: `${(i * 17 + 5) % 100}%`,
  top: `${(i * 23 + 10) % 100}%`,
  rotation: (i * 37) % 360,
  size: 8 + (i % 6) * 2,
  opacity: 0.5 + (i % 4) * 0.15,
}));

export function CTASection() {
  return (
    <section
      className={cn(
        "bg-[#0016ec] text-white min-h-screen",
        "flex flex-col items-center justify-center",
        "relative overflow-hidden"
      )}
    >
      {/* Cross markers */}
      <div
        className="absolute top-[120px] left-[20%] text-white/50 text-xl font-light select-none"
        aria-hidden="true"
      >
        +
      </div>
      <div
        className="absolute top-[120px] right-[20%] text-white/50 text-xl font-light select-none"
        aria-hidden="true"
      >
        +
      </div>

      {/* Tagline */}
      <p className="text-[12px] font-medium uppercase tracking-[2px] mb-6">
        IS YOUR BIG IDEA READY TO GO WILD?
      </p>

      {/* Main heading */}
      <h2 className="text-[min(8vw,100px)] font-light text-center leading-[1.1]">
        Let&apos;s work together!
      </h2>

      {/* Confetti pattern */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[50%] pointer-events-none"
        aria-hidden="true"
      >
        {confettiPieces.map((piece, i) => (
          <span
            key={i}
            className="absolute select-none"
            style={{
              left: piece.left,
              top: piece.top,
              transform: `rotate(${piece.rotation}deg)`,
              fontSize: `${piece.size}px`,
              opacity: piece.opacity,
            }}
          >
            {piece.char}
          </span>
        ))}
      </div>

      {/* Scroll button */}
      <div className="absolute bottom-16 z-10">
        <button
          type="button"
          className={cn(
            "flex items-center gap-3",
            "px-6 py-3 rounded-full",
            "bg-white/90 text-black",
            "text-[11px] font-medium uppercase tracking-[1px]"
          )}
        >
          <ArrowDown size={14} />
          CONTINUE TO SCROLL
          <ArrowDown size={14} />
        </button>
      </div>
    </section>
  );
}
