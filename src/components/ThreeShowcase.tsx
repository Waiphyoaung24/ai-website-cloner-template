"use client";

import "@/lib/patch-three-clock";
import * as THREE from "three";
import { Suspense, useRef, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, OrbitControls, Html } from "@react-three/drei";
import { SpaceStationModel } from "./SpaceStation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
}

const scrollState = { progress: 0 };

/* ── Annotation hotspot on the 3D model ── */
function Annotation({ position, label, detail, active }: {
  position: [number, number, number];
  label: string;
  detail: string;
  active: boolean;
}) {
  return (
    <Html position={position} center distanceFactor={15} style={{ pointerEvents: "none" }}>
      <div className={`transition-all duration-500 ${active ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}>
        <div className="relative flex items-center gap-3">
          {/* Pulse dot */}
          <div className="relative">
            <div className="w-3 h-3 rounded-full bg-[#94fcff] shadow-[0_0_12px_rgba(148,252,255,0.6)]" />
            <div className="absolute inset-0 w-3 h-3 rounded-full bg-[#94fcff] animate-ping opacity-40" />
          </div>
          {/* Label card */}
          <div className="bg-[#0e1418]/90 backdrop-blur-sm border border-[#94fcff]/20 rounded-lg px-3 py-2 whitespace-nowrap">
            <p className="text-[10px] font-mono uppercase tracking-wider text-[#94fcff]">{label}</p>
            <p className="text-[9px] text-white/50 mt-0.5">{detail}</p>
          </div>
        </div>
      </div>
    </Html>
  );
}

/* ── Scroll-driven camera controller ── */
function CameraController() {
  const { camera } = useThree();
  const controlsRef = useRef<{ target: THREE.Vector3; update: () => void }>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const p = scrollState.progress;

    // 5 camera keyframes driven by scroll progress
    const views = [
      { pos: [8, 3, 8], target: [0, 0, 0], fov: 60 },      // 0%: wide establishing
      { pos: [3, 1, 5], target: [0, 1, 0], fov: 50 },       // 25%: close-up module
      { pos: [-5, 4, 3], target: [0, 0, -1], fov: 55 },     // 50%: side angle
      { pos: [0, 8, 0.1], target: [0, 0, 0], fov: 45 },     // 75%: top-down
      { pos: [12, 5, 12], target: [0, 0, 0], fov: 40 },     // 100%: pull-out
    ];

    // Determine which two keyframes we're between
    const segment = Math.min(p * (views.length - 1), views.length - 1.001);
    const i = Math.floor(segment);
    const f = segment - i;
    const from = views[i];
    const to = views[Math.min(i + 1, views.length - 1)];

    // Smooth interpolation between keyframes
    const ease = f * f * (3 - 2 * f); // smoothstep
    const px = from.pos[0] + (to.pos[0] - from.pos[0]) * ease;
    const py = from.pos[1] + (to.pos[1] - from.pos[1]) * ease;
    const pz = from.pos[2] + (to.pos[2] - from.pos[2]) * ease;

    // Add subtle float
    const fx = Math.sin(t * 0.3) * 0.3;
    const fy = Math.cos(t * 0.2) * 0.15;

    camera.position.set(px + fx, py + fy, pz);

    const tx = from.target[0] + (to.target[0] - from.target[0]) * ease;
    const ty = from.target[1] + (to.target[1] - from.target[1]) * ease;
    const tz = from.target[2] + (to.target[2] - from.target[2]) * ease;
    camera.lookAt(tx, ty, tz);

    const fov = from.fov + (to.fov - from.fov) * ease;
    (camera as THREE.PerspectiveCamera).fov = fov;
    (camera as THREE.PerspectiveCamera).updateProjectionMatrix();

    if (controlsRef.current) {
      controlsRef.current.target.set(tx, ty, tz);
      controlsRef.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef as React.Ref<never>}
      enableDamping
      dampingFactor={0.05}
      enableZoom={false}
      enablePan={false}
      minPolarAngle={Math.PI / 6}
      maxPolarAngle={Math.PI / 2}
    />
  );
}

/* ── Loading fallback ── */
function LoadingFallback() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, d) => { if (ref.current) ref.current.rotation.y += d; });
  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[0.5, 0]} />
      <meshStandardMaterial color="#94fcff" wireframe transparent opacity={0.4} />
    </mesh>
  );
}

/* ── Scene ── */
function Scene() {
  const p = scrollState.progress;
  // Show annotations at different scroll phases
  const phase = Math.floor(p * 4);

  return (
    <>
      <ambientLight intensity={3} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} color="#f0f1ef" castShadow />
      <pointLight position={[-5, 5, -5]} intensity={0.8} color="#94fcff" />
      <pointLight position={[5, 2, 5]} intensity={0.4} color="#c63518" />

      <Suspense fallback={<LoadingFallback />}>
        <group rotation-y={scrollState.progress * Math.PI * 0.5}>
          <SpaceStationModel />

          {/* Annotation hotspots on the model */}
          <Annotation position={[2, 2, 0]} label="AI Core" detail="Neural processing hub" active={phase >= 1} />
          <Annotation position={[-3, 1, 2]} label="Solar Array" detail="12kW power generation" active={phase >= 2} />
          <Annotation position={[0, 4, -2]} label="Comm Dish" detail="Deep space relay" active={phase >= 3} />
        </group>
      </Suspense>

      <Environment preset="night" />
      <fog attach="fog" args={[0x0e1418, 8, 40]} />
      <CameraController />
    </>
  );
}

/* ── Brand content panels — appear at different scroll phases ── */
const brandPanels = [
  {
    title: "Where AI Reaches\nIts Peak",
    subtitle: "NEX APEX",
    body: "We build AI systems that operate at the frontier of what's possible. From neural inference engines to orbital-class infrastructure.",
  },
  {
    title: "AI Core\nModule",
    subtitle: "NEURAL PROCESSING",
    body: "Sub-100ms inference latency. Multi-modal AI pipeline processing 10M+ requests daily across distributed edge nodes.",
  },
  {
    title: "Solar\nArray",
    subtitle: "POWER SYSTEMS",
    body: "Sustainable AI infrastructure powered by renewable energy. 12kW solar generation capacity with 99.97% uptime guarantee.",
  },
  {
    title: "Deep Space\nRelay",
    subtitle: "COMMUNICATIONS",
    body: "Global mesh network connecting AI endpoints across 6 continents. Real-time synchronization with zero-trust security architecture.",
  },
];

export function ThreeShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const fadeOverlayRef = useRef<HTMLDivElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const [activePanel, setActivePanel] = useState(0);

  const onScrollProgress = useCallback((p: number) => {
    scrollState.progress = p;
    setActivePanel(Math.min(Math.floor(p * 4), 3));
  }, []);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;
    const scroller = document.querySelector("main");
    if (!scroller) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        scroller,
        pin: true,
        start: "top top",
        end: "+=4000",
        scrub: 1,
        onUpdate: (self) => onScrollProgress(self.progress),
      },
    });

    // Cinematic reveal: horizontal split-open from center
    const canvasWrap = canvasWrapRef.current;
    if (canvasWrap) {
      gsap.set(canvasWrap, { clipPath: "inset(0% 50%)" });
      tl.to(canvasWrap, {
        clipPath: "inset(0% 0%)",
        duration: 0.12,
        ease: "power3.inOut",
      }, 0);
    }

    // Animate each brand panel in sequence
    panelRefs.current.forEach((panel, i) => {
      if (!panel) return;
      const subtitleEl = panel.querySelector(".panel-subtitle");
      const titleEl = panel.querySelector(".panel-title");
      const bodyEl = panel.querySelector(".panel-body");
      const startAt = i * 0.25;

      // Enter
      if (subtitleEl) {
        tl.from(subtitleEl, {
          y: 20, autoAlpha: 0, duration: 0.2, ease: "power2.out",
        }, startAt);
      }
      if (titleEl) {
        const split = SplitText.create(titleEl, { type: "lines, words" });
        tl.from(split.words, {
          y: 60, autoAlpha: 0, stagger: 0.02, duration: 0.3, ease: "power4.out",
        }, startAt);
      }
      if (bodyEl) {
        tl.from(bodyEl, {
          y: 30, autoAlpha: 0, duration: 0.25, ease: "power2.out",
        }, startAt + 0.05);
      }

      // Exit (except last panel)
      if (i < brandPanels.length - 1) {
        tl.to(panel, {
          autoAlpha: 0, y: -40, duration: 0.15,
        }, startAt + 0.2);
      }
    });

    // Final fade-out at end
    if (fadeOverlayRef.current) {
      tl.to(fadeOverlayRef.current, { autoAlpha: 1, duration: 0.15, ease: "power2.in" }, 0.88);
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative min-h-screen h-screen w-full overflow-hidden bg-[#0e1418]">
      {/* Full-bleed 3D Canvas */}
      <div ref={canvasWrapRef} className="absolute inset-0">
        <Canvas
          camera={{ position: [8, 3, 8], fov: 60 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.0 }}
        >
          <color attach="background" args={[0x0e1418]} />
          <Scene />
        </Canvas>
      </div>

      {/* Top / bottom gradient fades */}
      <div className="absolute top-0 left-0 right-0 h-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, #0e1418, transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to top, #0e1418, transparent)" }} />

      {/* Brand content panels — stacked, revealed by scroll */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {brandPanels.map((panel, i) => (
          <div
            key={i}
            ref={(el) => { panelRefs.current[i] = el; }}
            className="absolute bottom-16 left-5 md:left-[60px] max-w-[420px]"
          >
            <p className="panel-subtitle text-[11px] font-medium uppercase tracking-[3px] text-[#94fcff]/50 mb-2 font-mono">
              {panel.subtitle}
            </p>
            <h2 className="panel-title text-3xl md:text-[56px] font-normal uppercase tracking-[1px] text-white font-[family-name:var(--font-display)] leading-[0.9] mb-4 whitespace-pre-line">
              {panel.title}
            </h2>
            <p className="panel-body text-[13px] leading-relaxed text-white/40 max-w-[340px]">
              {panel.body}
            </p>
          </div>
        ))}
      </div>

      {/* Active phase indicator — right side */}
      <div className="absolute right-5 md:right-[60px] top-1/2 -translate-y-1/2 z-20 pointer-events-none">
        <div className="flex flex-col gap-2">
          {brandPanels.map((_, i) => (
            <div
              key={i}
              className="transition-all duration-500"
              style={{
                width: activePanel === i ? 24 : 8,
                height: 3,
                borderRadius: 2,
                backgroundColor: activePanel === i ? "#94fcff" : "rgba(148,252,255,0.15)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Fade-out overlay */}
      <div ref={fadeOverlayRef} className="absolute inset-0 z-30 bg-[#0e1418] pointer-events-none"
        style={{ visibility: "hidden", opacity: 0 }} />

    </section>
  );
}
