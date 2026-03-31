"use client";

import { ArrowRight, ArrowUp } from "lucide-react";

export function FooterSection() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className="bg-white text-black py-24 px-[60px]">
        {/* Main 3-column grid */}
        <div className="grid grid-cols-3 gap-10 mb-20">
          {/* Column 1: Address */}
          <div>
            <address className="not-italic text-[14px] leading-relaxed">
              Suite 29
              <br />
              Marsh Street
              <br />
              Bristol, BS1 4AA
              <br />
              United Kingdom
            </address>
          </div>

          {/* Column 2: Social + Contact */}
          <div>
            <div className="mb-10">
              <a
                href="https://twitter.com/laboratoire_io"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[14px] leading-loose hover:opacity-60 transition"
              >
                Twitter / X
              </a>
              <a
                href="https://instagram.com/lusion.co"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[14px] leading-loose hover:opacity-60 transition"
              >
                Instagram
              </a>
              <a
                href="https://linkedin.com/company/lusion"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[14px] leading-loose hover:opacity-60 transition"
              >
                Linkedin
              </a>
            </div>
            <div className="mb-10">
              <p className="text-[12px] font-medium text-black/50 mb-1">
                General enquires
              </p>
              <a
                href="mailto:hello@lusion.co"
                className="text-[14px] hover:opacity-60 transition"
              >
                hello@lusion.co
              </a>
            </div>
            <div>
              <p className="text-[12px] font-medium text-black/50 mb-1">
                New business
              </p>
              <a
                href="mailto:business@lusion.co"
                className="text-[14px] hover:opacity-60 transition"
              >
                business@lusion.co
              </a>
            </div>
          </div>

          {/* Column 3: Newsletter */}
          <div>
            <h3 className="text-[36px] font-normal leading-tight mb-8">
              Subscribe to our newsletter
            </h3>
            <div className="relative">
              <input
                type="email"
                placeholder="Your email"
                className="w-full py-4 px-5 bg-[#e4e6ef] rounded-lg border-none text-[14px] placeholder:text-black/40 outline-none"
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                aria-label="Subscribe"
              >
                <ArrowRight size={20} className="text-black" />
              </button>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="flex justify-between items-center pt-10 border-t border-black/10 text-[12px] text-black/50">
          <span>&copy;2026 LUSION Creative Studio</span>
          <span>
            R&amp;D:{" "}
            <a
              href="https://labs.lusion.co"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-60 transition"
            >
              labs.lusion.co
            </a>
          </span>
          <span>Built by Lusion with ❤️</span>
        </div>
      </footer>

      {/* Back-to-top Button */}
      <button
        type="button"
        onClick={scrollToTop}
        className="fixed bottom-10 right-10 w-12 h-12 rounded-full bg-black text-white flex items-center justify-center z-50 hover:bg-black/80 transition cursor-pointer"
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </button>
    </>
  );
}
