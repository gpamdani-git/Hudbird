"use client";

import React, { useRef, useEffect } from "react";
import { cn } from "../../utils/cn";

interface ParticleSphereProps {
  className?: string;
  particleCount?: number;
  particleColor?: string;
}

export const ParticleSphere: React.FC<ParticleSphereProps> = ({
  className,
  particleCount = 1200, // Reduced slightly for 60fps lock on all devices
  particleColor = "#f43f5e",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;

    // Use Float32Arrays for massive performance gains (Data-Oriented Design)
    // 0: bx, 1: by, 2: bz, 3: x, 4: y, 5: z
    const count = particleCount;
    const particles = new Float32Array(count * 6);

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;

      const x = Math.sin(phi) * Math.cos(theta);
      const y = Math.cos(phi);
      const z = Math.sin(phi) * Math.sin(theta);

      const offset = i * 6;
      particles[offset + 0] = x; // bx
      particles[offset + 1] = y; // by
      particles[offset + 2] = z; // bz
      particles[offset + 3] = x; // current x
      particles[offset + 4] = y; // current y
      particles[offset + 5] = z; // current z
    }

    let time = 0;
    let canvasWidth = 0;
    let canvasHeight = 0;
    let cssWidth = 0;
    let cssHeight = 0;

    // ResizeObserver ensures canvas always perfectly matches its CSS layout size
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const rect = entry.contentRect;
        cssWidth = rect.width;
        cssHeight = rect.height;
        const dpr = window.devicePixelRatio || 1;
        canvasWidth = rect.width * dpr;
        canvasHeight = rect.height * dpr;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        // We will do all manual scaling in the render loop, so no ctx.scale()
      }
    });
    resizeObserver.observe(canvas);

    const render = () => {
      time += 0.003;

      if (canvasWidth === 0 || canvasHeight === 0) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const dpr = window.devicePixelRatio || 1;
      const w = canvasWidth;
      const h = canvasHeight;
      const centerX = w / 2;
      const centerY = h / 2;

      // Radius perfectly sized to fit the container
      const radius = Math.min(w, h) * 0.35;

      ctx.clearRect(0, 0, w, h);

      // Additive blending looks beautiful for glowing particles and removes the need to Z-sort!
      ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle = particleColor;

      const rotY = time;
      const rotX = time * 0.3;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      for (let i = 0; i < count; i++) {
        const offset = i * 6;
        const bx = particles[offset + 0];
        const by = particles[offset + 1];
        const bz = particles[offset + 2];
        let cx = particles[offset + 3];
        let cy = particles[offset + 4];
        let cz = particles[offset + 5];

        // Base rotation
        const x1 = bx * cosY - bz * sinY;
        const z1 = bx * sinY + bz * cosY;
        const y1 = by;

        const x2 = x1;
        const y2 = y1 * cosX - z1 * sinX;
        const z2 = y1 * sinX + z1 * cosX;

        // Apply easing towards target position (no hover effect)
        cx += (x2 - cx) * 0.15;
        cy += (y2 - cy) * 0.15;
        cz += (z2 - cz) * 0.15;

        particles[offset + 3] = cx;
        particles[offset + 4] = cy;
        particles[offset + 5] = cz;

        // Projection
        const perspective = 0.35;
        const scale = 1 / (1 - cz * perspective);
        const finalX = centerX + cx * radius * scale;
        const finalY = centerY + cy * radius * scale;

        // Calculate size based on Z and DPR
        const baseSize = cssWidth < 400 ? 0.8 : 1.2;
        const size = Math.max(0.1, scale * baseSize * dpr);
        const alpha = Math.max(0.05, Math.min(1, (cz + 1) / 2));

        // Draw particle individually so globalAlpha applies correctly
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(finalX, finalY, size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [particleCount, particleColor]);

  return (
    <div className={cn("relative h-full w-full", className)}>
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />
    </div>
  );
};
