"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/* ------------------------------------------------------------------ */
/*  Digit roller — single column that rolls through 0-9               */
/*  Matches Lusion's preloader-percent-digit pattern:                  */
/*  overflow:hidden container with GSAP-driven translateY              */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/*  Preloader — Lusion-style rolling percentage on NexApex theme       */
/*                                                                     */
/*  Tracks real 3D model loading via drei's useProgress zustand store. */
/*  Drei is dynamically imported inside useEffect to avoid SSR issues  */
/*  (Three.js accesses browser globals).                               */
/*                                                                     */
/*  Simulates initial progress (0→20%) while JS bundles load,         */
/*  then blends to real progress (20→100%) once Three.js loading      */
/*  begins. Exit animation: digits slide up, overlay fades out.        */
/* ------------------------------------------------------------------ */

export function Preloader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const digitsRef = useRef<HTMLDivElement>(null);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const loadStarted = useRef(false);
  const mountTime = useRef(Date.now());
  const exitTriggered = useRef(false);

  /* Subscribe to drei's useProgress zustand store (dynamic import) */
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    import("@react-three/drei").then(({ useProgress }) => {
      // Check initial state in case loading already started
      const initial = useProgress.getState();
      if (initial.active) loadStarted.current = true;

      unsubscribe = useProgress.subscribe((state) => {
        if (state.active) loadStarted.current = true;

        if (loadStarted.current) {
          const mapped = Math.round(20 + state.progress * 0.8);
          setDisplayProgress((prev) => Math.max(prev, mapped));
        }
      });
    });

    return () => unsubscribe?.();
  }, []);

  /* Simulated progress (0→20%) while waiting for 3D load to begin */
  useEffect(() => {
    const id = setInterval(() => {
      if (!loadStarted.current) {
        setDisplayProgress((p) => (p < 20 ? p + 1 : p));
      } else {
        clearInterval(id);
      }
    }, 80);
    return () => clearInterval(id);
  }, []);

  /* Fallback: force-exit after 5s regardless of loading state */
  useEffect(() => {
    const id = setTimeout(() => {
      loadStarted.current = true;
      setDisplayProgress(100);
    }, 5000);
    return () => clearTimeout(id);
  }, []);

  /* Exit animation — fires once when displayProgress reaches 100 */
  useEffect(() => {
    if (displayProgress < 100 || exitTriggered.current) return;
    exitTriggered.current = true;

    // Ensure minimum display time so preloader doesn't flash
    const elapsed = Date.now() - mountTime.current;
    const holdDelay = Math.max(0, (2000 - elapsed) / 1000);

    const tl = gsap.timeline({
      delay: holdDelay + 0.4,
      onComplete: () => setIsDone(true),
    });

    // Digits slide up and fade
    tl.to(digitsRef.current, {
      y: -80,
      autoAlpha: 0,
      duration: 0.7,
      ease: "power3.inOut",
    });

    // Overlay fades out (overlaps slightly)
    tl.to(
      overlayRef.current,
      { autoAlpha: 0, duration: 1, ease: "power2.inOut" },
      "-=0.3",
    );
  }, [displayProgress]);

  if (isDone) return null;

  /* Split progress into individual digits */
  const hundreds = Math.floor(displayProgress / 100);
  const tens = Math.floor((displayProgress % 100) / 10);
  const ones = displayProgress % 10;

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[200] bg-black">
      {/* Rolling percentage at bottom-left — Lusion preloader style */}
      <div
        ref={digitsRef}
        className="absolute bottom-0 left-0 flex font-sans font-light tracking-[-0.02em] text-white"
        style={{
          fontSize: "clamp(7rem, 8vw, 20rem)",
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
