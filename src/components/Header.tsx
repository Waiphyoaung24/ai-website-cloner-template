"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        "px-4 py-4 md:px-[60px] md:py-10",
        "flex items-center justify-between"
      )}
    >
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center gap-2 cursor-pointer"
      >
        {/* Use <img> instead of Next <Image> because the SVG is broken
            (contains only a white-filled rectangle). The PNG has the
            actual logomark on a transparent background. */}
        <img
          src="/images/Flat_white.png"
          alt="NexApex"
          width={36}
          height={36}
          className="h-7 w-7 md:h-9 md:w-9 object-contain"
        />
        <span className="text-[14px] md:text-[20px] whitespace-nowrap font-bold uppercase font-[family-name:var(--font-display)] tracking-[3px] text-white">
          NEX APEX
        </span>
      </Link>

      {/* Button group */}
      <div className="flex items-center gap-2">
        {/* Toggle / minus icon button */}
        <button
          type="button"
          aria-label="Toggle"
          className={cn(
            "hidden md:flex h-[45px] w-[45px] items-center justify-center",
            "rounded-full bg-[#1a2630]",
            "transition-colors hover:bg-[#253a49]"
          )}
        >
          {/* Horizontal line (minus) icon */}
          <span className="block h-[2px] w-[14px] rounded-full bg-white" />
        </button>

        {/* LET'S TALK button */}
        <button
          type="button"
          className={cn(
            "hidden md:flex items-center gap-2",
            "rounded-full bg-[#1a2630] px-6 py-3",
            "font-mono text-[12px] font-medium uppercase tracking-[1px] text-white",
            "transition-colors hover:bg-[#253a49]"
          )}
        >
          <span>CONTACT</span>
          {/* Small white dot indicator */}
          <span className="block h-1 w-1 rounded-full bg-white" />
        </button>

        {/* MENU button */}
        <button
          type="button"
          className={cn(
            "flex items-center gap-2",
            "rounded-full bg-[#dfe4dc] px-6 py-3",
            "font-mono text-[12px] font-medium uppercase tracking-[1px] text-black",
            "transition-colors hover:bg-[#c8ccc6]"
          )}
        >
          <span>MENU</span>
          {/* Two small black dots side by side */}
          <span className="flex items-center gap-[3px]">
            <span className="block h-1 w-1 rounded-full bg-black" />
            <span className="block h-1 w-1 rounded-full bg-black" />
          </span>
        </button>
      </div>
    </header>
  );
}
