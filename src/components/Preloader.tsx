"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

function DigitRoller({ value }: { value: number }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const colRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!colRef.current || !wrapRef.current) return;
    const digitH = wrapRef.current.offsetHeight;
    gsap.to(colRef.current, {
      y: -(value * digitH),
      duration: 0.5,
      ease: "power2.out",
    });
  }, [value]);

  return (
    <div
      ref={wrapRef}
      className="relative overflow-hidden"
      style={{ width: "1ch", height: "0.75em", lineHeight: "0.75em" }}
    >
      <div ref={colRef} style={{ transform: "translateY(-0.03em)" }}>
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={i}
            className="text-center"
            style={{ height: "0.75em", lineHeight: "0.75em" }}
          >
            {i}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Preloader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const digitsRef = useRef<HTMLDivElement>(null);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const exitTriggered = useRef(false);
  const progressObj = useRef({ value: 0 });

  /* Smooth GSAP tween from 0 → 100 over ~2.5s */
  useEffect(() => {
    gsap.to(progressObj.current, {
      value: 100,
      duration: 2.5,
      ease: "power2.inOut",
      onUpdate: () => {
        const v = Math.round(progressObj.current.value);
        setDisplayProgress(v);
      },
    });
  }, []);

  /* Exit animation — fires once when displayProgress reaches 100 */
  useEffect(() => {
    if (displayProgress < 100 || exitTriggered.current) return;
    exitTriggered.current = true;

    const tl = gsap.timeline({
      delay: 0.4,
      onComplete: () => setIsDone(true),
    });

    tl.to(digitsRef.current, {
      y: -80,
      autoAlpha: 0,
      duration: 0.7,
      ease: "power3.inOut",
    });

    tl.to(
      overlayRef.current,
      { autoAlpha: 0, duration: 1, ease: "power2.inOut" },
      "-=0.3",
    );
  }, [displayProgress]);

  if (isDone) return null;

  const hundreds = Math.floor(displayProgress / 100);
  const tens = Math.floor((displayProgress % 100) / 10);
  const ones = displayProgress % 10;

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[200] bg-[#0e1418]">
      <div
        ref={digitsRef}
        className="absolute bottom-0 left-0 flex pl-2 md:pl-0 font-sans font-light tracking-[-0.02em] text-white"
        style={{
          fontSize: "clamp(4rem, 15vw, 20rem)",
          height: "0.75em",
          lineHeight: "0.75em",
          overflow: "hidden",
        }}
      >
        <DigitRoller value={hundreds} />
        <DigitRoller value={tens} />
        <DigitRoller value={ones} />
      </div>
    </div>
  );
}
