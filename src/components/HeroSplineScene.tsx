"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import type { Locale } from "@/content/portfolio";

const CUSTOM_SPLINE_EMBED_URL = "";

export type SceneFormation = "cluster" | "orbit" | "tower";

interface HeroSplineSceneProps {
  locale: Locale;
}

function createSoftShadowTexture(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const grad = ctx.createRadialGradient(
      size / 2,
      size / 2,
      size * 0.05,
      size / 2,
      size / 2,
      size * 0.48
    );
    grad.addColorStop(0, "rgba(22, 38, 33, 0.34)");
    grad.addColorStop(0.55, "rgba(22, 38, 33, 0.12)");
    grad.addColorStop(1, "rgba(22, 38, 33, 0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export function HeroSplineScene({ locale }: HeroSplineSceneProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const formationRef = useRef<SceneFormation>("cluster");
  const [formation, setFormation] = useState<SceneFormation>("cluster");
  const [isDragging, setIsDragging] = useState(false);

  const selectFormation = (next: SceneFormation) => {
    formationRef.current = next;
    setFormation(next);
  };

  useEffect(() => {
    if (CUSTOM_SPLINE_EMBED_URL) return;
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      36,
      container.clientWidth / Math.max(container.clientHeight, 1),
      0.1,
      100
    );
    camera.position.set(0, 0.25, 7.9);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    container.appendChild(renderer.domElement);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;

    // Warm studio 3-point lighting
    const keyLight = new THREE.DirectionalLight(0xfff4e2, 2.2);
    keyLight.position.set(5, 7, 6);
    scene.add(keyLight);

    const sageRimLight = new THREE.DirectionalLight(0xb8dfd0, 1.35);
    sageRimLight.position.set(-6, -3, 4);
    scene.add(sageRimLight);

    const warmClayFill = new THREE.PointLight(0xd9794e, 1.8, 12);
    warmClayFill.position.set(2.4, -1.8, 3.2);
    scene.add(warmClayFill);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    const coreCluster = new THREE.Group();
    rootGroup.add(coreCluster);

    // Studio PBR Materials
    const cypressMat = new THREE.MeshPhysicalMaterial({
      color: 0x172b24,
      roughness: 0.22,
      metalness: 0.1,
      clearcoat: 0.75,
      clearcoatRoughness: 0.16,
      envMapIntensity: 1.15,
    });

    const ceramicMat = new THREE.MeshPhysicalMaterial({
      color: 0xf4eee3,
      roughness: 0.24,
      metalness: 0.04,
      clearcoat: 0.6,
      clearcoatRoughness: 0.2,
      envMapIntensity: 0.95,
    });

    const terracottaMat = new THREE.MeshPhysicalMaterial({
      color: 0xc56136,
      roughness: 0.2,
      metalness: 0.08,
      clearcoat: 0.85,
      clearcoatRoughness: 0.14,
      envMapIntensity: 1.1,
    });

    const sageGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0xc2ddd2,
      roughness: 0.12,
      metalness: 0.02,
      transmission: 0.62,
      thickness: 1.1,
      ior: 1.45,
      transparent: true,
      opacity: 0.94,
      envMapIntensity: 1.25,
    });

    const bronzeRingMat = new THREE.MeshPhysicalMaterial({
      color: 0xb59572,
      roughness: 0.28,
      metalness: 0.78,
      clearcoat: 0.4,
      envMapIntensity: 1.3,
    });

    const sageMetalMat = new THREE.MeshPhysicalMaterial({
      color: 0x5c8275,
      roughness: 0.3,
      metalness: 0.65,
      clearcoat: 0.4,
      envMapIntensity: 1.2,
    });

    // 8 Kinetic Rounded Cubes with multi-formation target coordinates
    const blockGeo = new RoundedBoxGeometry(0.92, 0.92, 0.92, 5, 0.18);
    const modules: Array<{
      mesh: THREE.Mesh;
      clusterPos: THREE.Vector3;
      orbitPos: THREE.Vector3;
      towerPos: THREE.Vector3;
      clusterScale: THREE.Vector3;
      orbitScale: THREE.Vector3;
      towerScale: THREE.Vector3;
      isHeroClay: boolean;
      phase: number;
      index: number;
    }> = [];

    const coords = [-0.52, 0.52];
    let idx = 0;
    for (const x of coords) {
      for (const y of coords) {
        for (const z of coords) {
          const isHeroClay = x > 0 && y > 0 && z > 0;
          let mat = cypressMat;
          if (isHeroClay) {
            mat = terracottaMat;
          } else if (idx === 1 || idx === 6) {
            mat = sageGlassMat;
          } else if (idx === 2 || idx === 5) {
            mat = ceramicMat;
          }

          const mesh = new THREE.Mesh(blockGeo, mat);
          const clusterPos = new THREE.Vector3(x, y, z);
          mesh.position.copy(clusterPos);
          coreCluster.add(mesh);

          // Orbit (Hub & Spoke) target: Terracotta block becomes Central Hub; other 7 form orbital spoke nodes!
          let orbitPos: THREE.Vector3;
          let orbitScale: THREE.Vector3;
          if (isHeroClay) {
            orbitPos = new THREE.Vector3(0, 0, 0);
            orbitScale = new THREE.Vector3(1.12, 1.12, 1.12);
          } else {
            const spokeIndex = idx < 7 ? idx : 0;
            const angle = (spokeIndex / 7) * Math.PI * 2;
            orbitPos = new THREE.Vector3(
              Math.cos(angle) * 1.65,
              Math.sin(angle * 2) * 0.34,
              Math.sin(angle) * 1.65
            );
            orbitScale = new THREE.Vector3(0.62, 0.62, 0.62);
          }

          // Tower (Full-Stack Layers) target: Sleek helical architectural slabs stacked vertically
          const layerY = (idx - 3.5) * 0.42;
          const towerPos = new THREE.Vector3(0, layerY, 0);
          const towerScale = new THREE.Vector3(1.42, 0.34, 1.42);

          modules.push({
            mesh,
            clusterPos,
            orbitPos,
            towerPos,
            clusterScale: new THREE.Vector3(1, 1, 1),
            orbitScale,
            towerScale,
            isHeroClay,
            phase: idx * 0.75,
            index: idx,
          });
          idx++;
        }
      }
    }

    coreCluster.rotation.set(0.45, -0.62, 0.18);

    // Gyroscopic orbital rings
    const outerRingGeo = new THREE.TorusGeometry(1.96, 0.032, 24, 128);
    const outerRing = new THREE.Mesh(outerRingGeo, bronzeRingMat);
    outerRing.rotation.set(1.12, 0.32, 0);
    rootGroup.add(outerRing);

    const innerRingGeo = new THREE.TorusGeometry(1.58, 0.022, 20, 110);
    const innerRing = new THREE.Mesh(innerRingGeo, sageMetalMat);
    innerRing.rotation.set(-0.78, 0.55, 0.4);
    rootGroup.add(innerRing);

    // Satellite spheres
    const satGeoLarge = new THREE.SphereGeometry(0.15, 32, 32);
    const satGeoMed = new THREE.SphereGeometry(0.115, 28, 28);

    const satClay = new THREE.Mesh(satGeoLarge, terracottaMat);
    const satCypress = new THREE.Mesh(satGeoMed, cypressMat);
    const satCeramic = new THREE.Mesh(satGeoMed, ceramicMat);
    rootGroup.add(satClay, satCypress, satCeramic);

    // Soft ground contact shadow
    const shadowTex = createSoftShadowTexture();
    const shadowGeo = new THREE.PlaneGeometry(4.4, 4.4);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -2.22;
    scene.add(shadowPlane);

    let pointerX = 0;
    let pointerY = 0;
    let dragging = false;
    let prevClientX = 0;
    let prevClientY = 0;
    let dragRotX = 0;
    let dragRotY = 0;
    let velX = 0;
    let velY = 0;
    let pulseImpulse = 0;
    let pointerDownTime = 0;

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointerX = ((e.clientX - rect.left) / Math.max(rect.width, 1)) * 2 - 1;
      pointerY = -(((e.clientY - rect.top) / Math.max(rect.height, 1)) * 2 - 1);

      if (dragging) {
        const dx = e.clientX - prevClientX;
        const dy = e.clientY - prevClientY;
        velY = dx * 0.0085;
        velX = dy * 0.0085;
        dragRotY += velY;
        dragRotX = Math.max(-1.1, Math.min(1.1, dragRotX + velX));
        prevClientX = e.clientX;
        prevClientY = e.clientY;
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      setIsDragging(true);
      pointerDownTime = performance.now();
      prevClientX = e.clientX;
      prevClientY = e.clientY;
      container.setPointerCapture?.(e.pointerId);
    };

    const onPointerUp = (e: PointerEvent) => {
      if (performance.now() - pointerDownTime < 220) {
        pulseImpulse = 0.22;
      }
      dragging = false;
      setIsDragging(false);
      container.releasePointerCapture?.(e.pointerId);
    };

    const onPointerLeave = () => {
      if (!dragging) {
        pointerX = 0;
        pointerY = 0;
      }
    };

    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointercancel", onPointerUp);
    container.addEventListener("pointerleave", onPointerLeave);

    let isVisible = true;
    const io = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.05 }
    );
    io.observe(container);

    const ro = new ResizeObserver(() => {
      if (!container) return;
      const w = container.clientWidth;
      const h = Math.max(container.clientHeight, 1);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    ro.observe(container);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let rafId = 0;
    const clock = new THREE.Clock();
    const targetVec = new THREE.Vector3();

    const animate = () => {
      rafId = window.requestAnimationFrame(animate);
      if (!isVisible) return;

      const t = clock.getElapsedTime();
      const motionScale = prefersReducedMotion ? 0.15 : 1;
      const mode = formationRef.current;

      if (!dragging) {
        dragRotY += velY;
        dragRotX = Math.max(-1.1, Math.min(1.1, dragRotX + velX));
        velX *= 0.93;
        velY *= 0.93;
      }

      pulseImpulse *= 0.9;

      const floatY = Math.sin(t * 1.35) * 0.11 * motionScale;
      rootGroup.position.y = floatY + 0.12;

      const targetRotY = dragRotY + pointerX * 0.35 + t * 0.22 * motionScale;
      const targetRotX =
        dragRotX - pointerY * 0.25 + Math.sin(t * 0.6) * 0.06 * motionScale;

      rootGroup.rotation.y += (targetRotY - rootGroup.rotation.y) * 0.08;
      rootGroup.rotation.x += (targetRotX - rootGroup.rotation.x) * 0.08;

      // Smooth core orientation per formation
      const desiredCoreRotX = mode === "cluster" ? 0.45 : mode === "orbit" ? 0.28 : 0.12;
      const desiredCoreRotZ = mode === "cluster" ? 0.18 : 0;
      coreCluster.rotation.x += (desiredCoreRotX - coreCluster.rotation.x) * 0.06;
      coreCluster.rotation.z += (desiredCoreRotZ - coreCluster.rotation.z) * 0.06;

      // Morph modules smoothly toward active formation
      for (const mod of modules) {
        if (mode === "cluster") {
          const wave =
            1 +
            (Math.sin(t * 1.9 + mod.phase) * 0.055 + 0.045) * motionScale +
            pulseImpulse;
          targetVec.copy(mod.clusterPos).multiplyScalar(wave);
          mod.mesh.position.lerp(targetVec, 0.09);
          mod.mesh.scale.lerp(mod.clusterScale, 0.09);
          mod.mesh.rotation.y += (0 - mod.mesh.rotation.y) * 0.08;
        } else if (mode === "orbit") {
          if (mod.isHeroClay) {
            targetVec.set(0, Math.sin(t * 2) * 0.06 * motionScale, 0);
            mod.mesh.rotation.y = t * 0.4 * motionScale;
          } else {
            const angle =
              (mod.index / 7) * Math.PI * 2 + t * 0.35 * motionScale;
            const r = 1.65 + pulseImpulse * 0.7;
            targetVec.set(
              Math.cos(angle) * r,
              Math.sin(angle * 2 + t) * 0.26 * motionScale,
              Math.sin(angle) * r
            );
            mod.mesh.rotation.y = -angle;
          }
          mod.mesh.position.lerp(targetVec, 0.08);
          mod.mesh.scale.lerp(mod.orbitScale, 0.08);
        } else {
          // "tower" helical full-stack formation
          const spread = 1 + pulseImpulse * 0.8;
          targetVec.set(
            Math.sin(t * 1.5 + mod.index * 0.5) * 0.06 * motionScale,
            mod.towerPos.y * spread,
            Math.cos(t * 1.5 + mod.index * 0.5) * 0.06 * motionScale
          );
          mod.mesh.position.lerp(targetVec, 0.08);
          mod.mesh.scale.lerp(mod.towerScale, 0.08);
          const targetTwist = mod.index * 0.24 + Math.sin(t * 0.9 + mod.index * 0.3) * 0.18 * motionScale;
          mod.mesh.rotation.y += (targetTwist - mod.mesh.rotation.y) * 0.08;
        }
      }

      // Rings adapt subtly to formation
      if (mode === "orbit") {
        outerRing.rotation.x += (1.45 - outerRing.rotation.x) * 0.06;
        innerRing.rotation.x += (1.35 - innerRing.rotation.x) * 0.06;
      } else if (mode === "tower") {
        outerRing.rotation.x += (1.57 - outerRing.rotation.x) * 0.06;
        innerRing.rotation.x += (-1.57 - innerRing.rotation.x) * 0.06;
      } else {
        outerRing.rotation.x = 1.12 + Math.sin(t * 0.7) * 0.12 * motionScale;
        innerRing.rotation.y = 0.55 + Math.cos(t * 0.8) * 0.16 * motionScale;
      }
      outerRing.rotation.z = t * 0.32 * motionScale;
      innerRing.rotation.z = -t * 0.44 * motionScale;

      // Orbiting satellite spheres
      const a1 = t * 0.78 * motionScale;
      satClay.position.set(
        Math.cos(a1) * 2.18,
        Math.sin(a1 * 1.2) * 0.68,
        Math.sin(a1) * 1.65
      );

      const a2 = -t * 0.62 * motionScale + 2.1;
      satCypress.position.set(
        Math.cos(a2) * 1.75,
        Math.sin(a2) * 1.35,
        Math.sin(a2 * 0.9) * 1.2
      );

      const a3 = t * 0.52 * motionScale + 4.2;
      satCeramic.position.set(
        Math.sin(a3) * 2.0,
        Math.cos(a3 * 1.1) * -0.95,
        Math.cos(a3) * 1.55
      );

      const shadowScale = 1 - floatY * 0.45;
      shadowPlane.scale.setScalar(shadowScale);
      shadowMat.opacity = 0.85 - floatY * 0.6;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(rafId);
      io.disconnect();
      ro.disconnect();
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointercancel", onPointerUp);
      container.removeEventListener("pointerleave", onPointerLeave);

      blockGeo.dispose();
      outerRingGeo.dispose();
      innerRingGeo.dispose();
      satGeoLarge.dispose();
      satGeoMed.dispose();
      shadowGeo.dispose();
      shadowTex.dispose();
      cypressMat.dispose();
      ceramicMat.dispose();
      terracottaMat.dispose();
      sageGlassMat.dispose();
      bronzeRingMat.dispose();
      sageMetalMat.dispose();
      shadowMat.dispose();
      envTexture.dispose();
      pmremGenerator.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (CUSTOM_SPLINE_EMBED_URL) {
    return (
      <div className="relative aspect-square w-full overflow-hidden rounded-[28px] border border-line bg-[#E9E2D4] shadow-[0_24px_54px_-20px_rgba(22,38,33,0.22)]">
        <iframe
          src={CUSTOM_SPLINE_EMBED_URL}
          title="Interactive 3D Scene"
          className="h-full w-full border-0"
          loading="lazy"
        />
      </div>
    );
  }

  const modes: Array<{ id: SceneFormation; label: string }> =
    locale === "tr"
      ? [
          { id: "cluster", label: "Modüler Küp" },
          { id: "orbit", label: "Hub & Ağ" },
          { id: "tower", label: "Katmanlı Kule" },
        ]
      : [
          { id: "cluster", label: "Modular" },
          { id: "orbit", label: "Hub & Orbit" },
          { id: "tower", label: "Full-Stack" },
        ];

  return (
    <div className="relative w-full">
      <div className="relative aspect-[10/10] w-full overflow-hidden rounded-[30px] border border-line/90 bg-gradient-to-br from-[#F3EDE2] via-[#E5DEC9] to-[#CFDCD5] shadow-[0_26px_56px_-22px_rgba(22,38,33,0.22)] sm:aspect-[11/10]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,252,245,0.75),transparent_64%)]"
        />

        {/* Top subtle hint */}
        <div className="pointer-events-none absolute right-4 top-4 z-20">
          <span className="rounded-full border border-cypress/12 bg-parchment/75 px-3 py-1 font-mono text-[10.5px] text-ink-muted backdrop-blur-md">
            {locale === "tr" ? "Sürükle · Döndür" : "Drag to Rotate"}
          </span>
        </div>

        {/* Interactive WebGL Viewport */}
        <div
          ref={containerRef}
          role="img"
          aria-label={
            locale === "tr"
              ? "Fare ile döndürülebilen interaktif 3D modüler sistem heykeli"
              : "Interactive 3D modular kinetic sculpture — drag to rotate"
          }
          className={`relative z-10 h-full w-full touch-none select-none ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        />

        {/* Interactive Formation Mode Switcher */}
        <div className="absolute inset-x-0 bottom-4 z-20 flex justify-center px-4">
          <div
            role="group"
            aria-label={locale === "tr" ? "3D Sahne Modu" : "3D Scene Formation"}
            className="inline-flex items-center gap-1 rounded-full border border-cypress/15 bg-parchment/85 p-1 shadow-[0_8px_24px_-10px_rgba(22,38,33,0.28)] backdrop-blur-md"
          >
            {modes.map((m) => {
              const active = formation === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => selectFormation(m.id)}
                  aria-pressed={active}
                  className={`rounded-full px-3 py-1 font-mono text-[11px] font-medium transition-all ${
                    active
                      ? "bg-cypress text-parchment shadow-xs"
                      : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {m.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
