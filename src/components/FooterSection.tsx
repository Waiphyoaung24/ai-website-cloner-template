"use client";

import { ArrowRight, ArrowUp } from "lucide-react";

export function FooterSection() {
  const scrollToTop = () => {
    const main = document.querySelector("main");
    main?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#dfe4dc] text-[#0e1418] py-16 px-5 md:py-24 md:px-[60px]">
      {/* Main grid */}
      <div className="grid grid-cols-1 gap-10 mb-14 sm:grid-cols-2 md:grid-cols-3 md:gap-10 md:mb-20">
        {/* Column 1: Address */}
        <div>
          <address className="not-italic text-[14px] leading-relaxed">
            NexApex HQ
            <br />
            Yangon, Myanmar
          </address>
        </div>

        {/* Column 2: Social + Contact */}
        <div>
          <div className="mb-8 md:mb-10">
            <a
              href="https://twitter.com/nexapex"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-[14px] leading-loose hover:opacity-60 transition-opacity"
            >
              Twitter / X
            </a>
            <a
              href="https://instagram.com/nexapex.co"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-[14px] leading-loose hover:opacity-60 transition-opacity"
            >
              Instagram
            </a>
            <a
              href="https://linkedin.com/company/nexapex"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-[14px] leading-loose hover:opacity-60 transition-opacity"
            >
              Linkedin
            </a>
          </div>
          <div className="mb-8 md:mb-10">
            <p className="text-[12px] font-medium text-[#0e1418]/50 mb-1">
              General enquiries
            </p>
            <a
              href="mailto:hello@nexapex.co"
              className="text-[14px] hover:opacity-60 transition-opacity"
            >
              hello@nexapex.co
            </a>
          </div>
          <div>
            <p className="text-[12px] font-medium text-[#0e1418]/50 mb-1">
              New business
            </p>
            <a
              href="mailto:business@nexapex.co"
              className="text-[14px] hover:opacity-60 transition-opacity"
            >
              business@nexapex.co
            </a>
          </div>
        </div>

        {/* Column 3: Newsletter */}
        <div className="sm:col-span-2 md:col-span-1">
          <h3 className="text-[28px] md:text-[36px] font-normal font-[family-name:var(--font-display)] leading-tight mb-6 md:mb-8">
            Subscribe to our newsletter
          </h3>
          <div className="relative">
            <input
              type="email"
              placeholder="Your email"
              className="w-full py-4 px-5 bg-[#1a2630] text-[#f0f1ef] rounded-lg border-none text-[14px] placeholder:text-[#6e7a84] outline-none"
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
              aria-label="Subscribe"
            >
              <ArrowRight size={20} className="text-[#94fcff]" />
            </button>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="flex flex-col gap-2 pt-8 border-t border-[#0e1418]/10 text-[12px] text-[#0e1418]/50 sm:flex-row sm:justify-between sm:items-center sm:pt-10">
        <span>&copy;2026 NEX APEX</span>
        <span>
          AI Lab:{" "}
          <a
            href="https://labs.nexapex.co"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-60 transition-opacity"
          >
            labs.nexapex.co
          </a>
        </span>
        <span>Built by NexApex with love</span>
      </div>

      {/* Back-to-top Button */}
      <button
        type="button"
        onClick={scrollToTop}
        className="absolute bottom-6 right-5 w-12 h-12 rounded-full bg-[#0e1418] text-white flex items-center justify-center hover:bg-[#0e1418]/80 transition-colors cursor-pointer md:right-10"
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
}
