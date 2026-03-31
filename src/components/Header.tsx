"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        "px-[60px] py-10",
        "flex items-center justify-between"
      )}
    >
      {/* Logo */}
      <Link
        href="/"
        className="text-[20px] font-bold uppercase tracking-[2px] text-white"
      >
        LUSION
      </Link>

      {/* Button group */}
      <div className="flex items-center gap-2">
        {/* Toggle / minus icon button */}
        <button
          type="button"
          aria-label="Toggle"
          className={cn(
            "flex h-[45px] w-[45px] items-center justify-center",
            "rounded-full bg-[#2b2e3a]",
            "transition-colors hover:bg-[#3a3d4a]"
          )}
        >
          {/* Horizontal line (minus) icon */}
          <span className="block h-[2px] w-[14px] rounded-full bg-white" />
        </button>

        {/* LET'S TALK button */}
        <button
          type="button"
          className={cn(
            "flex items-center gap-2",
            "rounded-full bg-[#2b2e3a] px-6 py-3",
            "font-mono text-[12px] font-medium uppercase tracking-[1px] text-white",
            "transition-colors hover:bg-[#3a3d4a]"
          )}
        >
          <span>LET&apos;S TALK</span>
          {/* Small white dot indicator */}
          <span className="block h-1 w-1 rounded-full bg-white" />
        </button>

        {/* MENU button */}
        <button
          type="button"
          className={cn(
            "flex items-center gap-2",
            "rounded-full bg-[#e4e6ef] px-6 py-3",
            "font-mono text-[12px] font-medium uppercase tracking-[1px] text-black",
            "transition-colors hover:bg-[#d4d6df]"
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
