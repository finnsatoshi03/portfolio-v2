"use client";

import React, { useRef, useEffect, useCallback, useState } from "react";
import { cn } from "@/app/_lib/utils";

type GlobeParticle = {
  phi: number;
  theta: number;
  baseSize: number;
  size: number;
  color: string;
  speed: number;
  noiseOffset: number;
  currentPos: { x: number; y: number };
  char: string;
};

type RingParticle = {
  angle: number;
  radius: number;
  baseRadius: number;
  z: number;
  size: number;
  speed: number;
  char: string;
  opacity: number;
};

export function CodeGlobe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const animationFrameId = useRef<number | undefined>(undefined);
  const particles = useRef<GlobeParticle[]>([]);
  const ringParticles = useRef<RingParticle[]>([]);
  const hoverProgress = useRef(0);

  // Configuration
  const CONFIG = {
    GLOBE_RADIUS: 150,
    RING_RADIUS: 220,
    RING_THICKNESS: 50,
    PARTICLE_COUNT: 400,
    RING_PARTICLE_COUNT: 150,
    BASE_SPEED: 0.002,
    HOVER_SPEED: 0.005,
    NOISE_SPEED: 0.0003,
    COLOR_PALETTE: ["#00ff88", "#00ff00", "#00cc66", "#88ff00"],
    CODE_CHARACTERS:
      "0123456789{}()<>[];:/=+-,.*!?#@%^&|abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    REPULSION_FORCE: 0.8,
    LERP_SPEED: 0.1,
    SIZE_VARIATION: [4, 10],
    RING_TILT: Math.PI / 4.5,
  };

  const initParticles = useCallback(() => {
    // Initialize globe particles
    particles.current = Array.from({ length: CONFIG.PARTICLE_COUNT }, () => {
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.acos(Math.random() * 2 - 1);

      return {
        phi,
        theta,
        baseSize:
          Math.random() *
            (CONFIG.SIZE_VARIATION[1] - CONFIG.SIZE_VARIATION[0]) +
          CONFIG.SIZE_VARIATION[0],
        size: 0,
        color:
          CONFIG.COLOR_PALETTE[
            Math.floor(Math.random() * CONFIG.COLOR_PALETTE.length)
          ],
        speed: Math.random() * 0.002 + 0.001,
        noiseOffset: Math.random() * 1000,
        currentPos: { x: 0, y: 0 },
        char: CONFIG.CODE_CHARACTERS[
          Math.floor(Math.random() * CONFIG.CODE_CHARACTERS.length)
        ],
      };
    });

    // Initialize ring particles
    ringParticles.current = Array.from(
      { length: CONFIG.RING_PARTICLE_COUNT },
      () => {
        const angle = Math.random() * Math.PI * 2;
        return {
          angle,
          baseRadius: CONFIG.RING_RADIUS,
          radius:
            CONFIG.RING_RADIUS + (Math.random() - 0.5) * CONFIG.RING_THICKNESS,
          z: Math.cos(angle * 2),
          size: 3 + Math.random() * 4,
          speed:
            (Math.random() * 0.002 + 0.001) * (Math.random() > 0.5 ? 1 : -1),
          char: Math.random() > 0.5 ? "0" : "1",
          opacity: 0.7 + Math.random() * 0.3,
        };
      }
    );
  }, [CONFIG]);

  const project = (theta: number, phi: number, radius: number) => {
    const x = Math.cos(phi) * Math.sin(theta) * radius;
    const y = Math.cos(theta) * radius;
    return { x, y };
  };

  const updateParticles = useCallback(
    (centerX: number, centerY: number) => {
      // Smooth hover interpolation
      const targetHover = isHovering ? 1 : 0;
      hoverProgress.current += (targetHover - hoverProgress.current) * 0.08;
      hoverProgress.current = Math.max(0, Math.min(1, hoverProgress.current));

      const currentGlobeRadius =
        CONFIG.GLOBE_RADIUS * (1 + hoverProgress.current * 0.2);
      const currentRingRadius =
        CONFIG.RING_RADIUS * (1 + hoverProgress.current * 0.3);

      // Update globe particles
      particles.current.forEach((particle) => {
        // Maintain continuous base motion
        particle.phi +=
          particle.speed +
          Math.sin(Date.now() * CONFIG.NOISE_SPEED + particle.noiseOffset) *
            0.002;

        // Calculate base position (original globe)
        const basePos = project(
          particle.theta,
          particle.phi,
          CONFIG.GLOBE_RADIUS
        );

        // Calculate hover-affected position
        let hoverTheta = particle.theta;
        if (hoverProgress.current > 0) {
          const angleToMouse = Math.atan2(
            particle.currentPos.y - centerY,
            particle.currentPos.x - centerX
          );
          hoverTheta +=
            Math.sin(angleToMouse) *
            CONFIG.REPULSION_FORCE *
            hoverProgress.current;
        }

        const hoverPos = project(hoverTheta, particle.phi, currentGlobeRadius);

        // Blend between positions
        particle.currentPos.x =
          centerX +
          basePos.x +
          (hoverPos.x - basePos.x) * hoverProgress.current;
        particle.currentPos.y =
          centerY +
          basePos.y +
          (hoverPos.y - basePos.y) * hoverProgress.current;

        // Update size
        particle.size = particle.baseSize * (0.8 + hoverProgress.current * 0.4);
      });

      // Update ring particles
      ringParticles.current.forEach((particle) => {
        particle.angle += particle.speed * (isHovering ? 1.5 : 1);
        particle.z = Math.cos(particle.angle * 2 + Date.now() * 0.001);
        particle.radius =
          currentRingRadius + (Math.random() - 0.5) * CONFIG.RING_THICKNESS;
        particle.opacity = 0.6 + Math.sin(particle.angle) * 0.3;
      });
    },
    [CONFIG, isHovering]
  );

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    updateParticles(centerX, centerY);

    // Draw globe particles
    particles.current.forEach((particle) => {
      ctx.beginPath();
      ctx.font = `${particle.size}px monospace`;
      ctx.fillStyle = particle.color;
      ctx.globalAlpha = 0.9 - 0.4 * hoverProgress.current;
      ctx.fillText(particle.char, particle.currentPos.x, particle.currentPos.y);
    });

    // Draw ring particles
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(CONFIG.RING_TILT);
    ringParticles.current.forEach((particle) => {
      const depthScale = 1 - Math.abs(particle.z) * 0.3;
      const x = Math.cos(particle.angle) * particle.radius * depthScale;
      const y =
        Math.sin(particle.angle) * particle.radius * (0.6 + particle.z * 0.4);

      ctx.beginPath();
      ctx.font = `${particle.size}px monospace`;
      ctx.fillStyle = `rgba(0, 255, 136, ${particle.opacity * depthScale})`;
      ctx.fillText(particle.char, x, y);
    });
    ctx.restore();

    animationFrameId.current = requestAnimationFrame(draw);
  }, [updateParticles, CONFIG]);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }, []);

  useEffect(() => {
    initParticles();
    handleResize();
    window.addEventListener("resize", handleResize);
    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [draw, handleResize, initParticles]);

  return (
    <div
      className={cn("relative group h-full w-full overflow-hidden", className)}
    >
      <canvas
        ref={canvasRef}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="absolute w-full h-full cursor-pointer"
      />
    </div>
  );
}
