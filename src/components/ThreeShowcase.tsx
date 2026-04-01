"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

/* Manual orbit control using useFrame — avoids OrbitControls' deprecated THREE.Clock */
function AutoOrbit() {
  const { camera } = useThree();
  const angle = useRef(0);
  const radius = 5;
  const height = 2;

  useFrame((_, delta) => {
    angle.current += delta * 0.15;
    camera.position.x = Math.sin(angle.current) * radius;
    camera.position.z = Math.cos(angle.current) * radius;
    camera.position.y = height;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* Rotating platform — visual anchor for future GLB model */
function RotatingPlatform() {
  const groupRef = useRef<THREE.Group>(null);

  // Stable particle positions (computed once)
  const particles = useMemo(() =>
    Array.from({ length: 40 }, (_, i) => {
      const a = (i / 40) * Math.PI * 2;
      const r = 1.5 + Math.random() * 1.0;
      const h = (Math.random() - 0.5) * 2;
      const s = 0.015 + Math.random() * 0.02;
      const o = 0.4 + Math.random() * 0.4;
      return { x: Math.cos(a) * r, y: h, z: Math.sin(a) * r, s, o };
    }), []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer ring */}
      <mesh rotation-x={-Math.PI / 2} position-y={-0.01}>
        <torusGeometry args={[1.8, 0.02, 16, 64]} />
        <meshStandardMaterial color="#94fcff" emissive="#94fcff" emissiveIntensity={0.3} transparent opacity={0.6} />
      </mesh>

      {/* Inner ring */}
      <mesh rotation-x={-Math.PI / 2} position-y={-0.01}>
        <torusGeometry args={[1.2, 0.015, 16, 64]} />
        <meshStandardMaterial color="#94fcff" emissive="#94fcff" emissiveIntensity={0.2} transparent opacity={0.3} />
      </mesh>

      {/* Center disc — the platform where a GLB will sit */}
      <mesh rotation-x={-Math.PI / 2} position-y={-0.02}>
        <circleGeometry args={[1.0, 64]} />
        <meshStandardMaterial
          color="#1a2630"
          emissive="#94fcff"
          emissiveIntensity={0.05}
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Floating particles */}
      {particles.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, p.z]}>
          <sphereGeometry args={[p.s, 8, 8]} />
          <meshStandardMaterial
            color="#94fcff"
            emissive="#94fcff"
            emissiveIntensity={0.8}
            transparent
            opacity={p.o}
          />
        </mesh>
      ))}
    </group>
  );
}

/* Grid floor for depth perception */
function GridFloor() {
  return (
    <gridHelper
      args={[20, 40, "#253a49", "#1a2630"]}
      position={[0, -0.5, 0]}
    />
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 8, 5]} intensity={0.6} color="#f0f1ef" />
      <pointLight position={[-3, 4, -3]} intensity={0.4} color="#94fcff" />

      <RotatingPlatform />
      <GridFloor />

      <ContactShadows
        position={[0, -0.49, 0]}
        opacity={0.4}
        scale={10}
        blur={2}
        far={4}
        color="#0e1418"
      />

      <Environment preset="night" />
      <AutoOrbit />
    </>
  );
}

export function ThreeShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const scroller = document.querySelector("main");
    if (!scroller) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    // Canvas entrance — scale up from 0.9 with fade
    if (canvasWrapRef.current) {
      gsap.from(canvasWrapRef.current, {
        scale: 0.9,
        autoAlpha: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          scroller,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    }

    // Label text reveal
    if (labelRef.current) {
      gsap.from(labelRef.current, {
        y: 30,
        autoAlpha: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          scroller,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    }
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0e1418] py-16 px-5 md:py-24 md:px-[60px] overflow-hidden"
    >
      {/* Section label */}
      <div ref={labelRef} className="mb-8 md:mb-12 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[3px] text-[#94fcff]/60 mb-2">
            3D Showcase
          </p>
          <h2 className="text-2xl md:text-[40px] font-normal uppercase tracking-[2px] text-white font-[family-name:var(--font-display)] leading-tight">
            Our Work in
            <br />
            <span className="text-[#94fcff]">Three Dimensions</span>
          </h2>
        </div>
        <p className="max-w-[280px] text-[11px] font-medium uppercase tracking-[1px] text-white/40 md:text-right">
          Drop a .glb model onto the platform to preview it in real-time
        </p>
      </div>

      {/* 3D Canvas container */}
      <div
        ref={canvasWrapRef}
        className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden border border-[#94fcff]/10"
        style={{
          background: "radial-gradient(ellipse at 50% 60%, rgba(148,252,255,0.03) 0%, #0e1418 70%)",
        }}
      >
        <Canvas
          camera={{ position: [0, 2, 5], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <Scene />
        </Canvas>

        {/* Corner decorations */}
        <div className="absolute top-4 left-4 text-[10px] font-mono text-[#94fcff]/30 uppercase tracking-wider">
          WebGL Viewport
        </div>
        <div className="absolute bottom-4 right-4 text-[10px] font-mono text-[#94fcff]/30 uppercase tracking-wider">
          R3F + Three.js
        </div>
      </div>
    </section>
  );
}
