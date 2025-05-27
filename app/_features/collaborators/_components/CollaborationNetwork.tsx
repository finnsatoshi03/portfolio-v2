"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface CollaborationNetworkProps {
  className?: string;
}

export const CollaborationNetwork: React.FC<CollaborationNetworkProps> = ({
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Network nodes representing collaborators
    const nodes = [
      { x: 0.2, y: 0.3, size: 8, color: "#60A5FA", label: "Frontend" },
      { x: 0.8, y: 0.3, size: 8, color: "#34D399", label: "Backend" },
      { x: 0.5, y: 0.7, size: 8, color: "#F59E0B", label: "ML/AI" },
      { x: 0.5, y: 0.1, size: 8, color: "#EF4444", label: "IoT" },
      { x: 0.5, y: 0.5, size: 10, color: "#8B5CF6", label: "Core" },
    ];

    // Connections between nodes
    const connections = [
      [0, 4],
      [1, 4],
      [2, 4],
      [3, 4], // All connect to core
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0], // Ring connections
    ];

    let animationFrame: number;
    let time = 0;

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      time += 0.02;

      // Draw connections with animated opacity
      connections.forEach(([from, to], index) => {
        const fromNode = nodes[from];
        const toNode = nodes[to];

        const opacity = 0.3 + 0.3 * Math.sin(time + index * 0.5);

        ctx.beginPath();
        ctx.moveTo(fromNode.x * width, fromNode.y * height);
        ctx.lineTo(toNode.x * width, toNode.y * height);
        ctx.strokeStyle = `rgba(156, 163, 175, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw nodes with pulsing effect
      nodes.forEach((node, index) => {
        const pulseScale = 1 + 0.2 * Math.sin(time * 2 + index);
        const size = node.size * pulseScale;

        // Outer glow
        ctx.beginPath();
        ctx.arc(node.x * width, node.y * height, size + 4, 0, Math.PI * 2);
        ctx.fillStyle = node.color + "20";
        ctx.fill();

        // Main node
        ctx.beginPath();
        ctx.arc(node.x * width, node.y * height, size, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        // Inner highlight
        ctx.beginPath();
        ctx.arc(node.x * width, node.y * height, size * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = node.color + "80";
        ctx.fill();
      });

      // Draw floating particles
      for (let i = 0; i < 8; i++) {
        const particleTime = time + i * 0.8;
        const x = (0.5 + 0.3 * Math.cos(particleTime)) * width;
        const y = (0.5 + 0.3 * Math.sin(particleTime * 0.7)) * height;
        const opacity = 0.3 + 0.4 * Math.sin(particleTime * 2);

        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${opacity})`;
        ctx.fill();
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full rounded-lg"
        style={{ background: "transparent" }}
      />

      {/* Overlay labels */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute top-4 left-4 text-xs text-gray-400"
        >
          Collaboration Network
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-4 right-4 text-xs text-gray-500"
        >
          Real-time sync
        </motion.div>
      </div>
    </div>
  );
};
