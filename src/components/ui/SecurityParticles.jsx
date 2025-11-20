import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const SecurityParticles = ({ activeShape = "sphere" }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const container = containerRef.current;

    let width = container.clientWidth;
    let height = container.clientHeight;

    // Handle High DPI
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Particle Configuration
    const particleCount = 1500; // High density for solid shapes

    // Generate Shapes
    const centerX = width / 2;
    const centerY = height / 2;
    const size = Math.min(width, height) * 0.35;

    // Initialize Particles
    if (particlesRef.current.length === 0) {
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z: 0,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          size: Math.random() * 2 + 1, // Larger base size
          color: `rgba(37, 99, 235, ${Math.random() * 0.6 + 0.4})`, // High opacity blue
          target: { x: centerX, y: centerY, z: 0 },
        });
      }
    }

    // Animation Loop
    let time = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.005;

      // Rotate the entire system slightly
      const cosT = Math.cos(time * 0.3);
      const sinT = Math.sin(time * 0.3);

      particlesRef.current.forEach((p, i) => {
        // 1. Update Target based on Shape
        let tx = p.target.x;
        let ty = p.target.y;
        let tz = p.target.z || 0;

        // Dynamic Shape Calculation
        if (activeShape === "sphere") {
          // Dyson Sphere: Rotating Sphere
          const theta = (i * 234.12) % (Math.PI * 2);
          const phi = Math.acos(2 * ((i * 123.45) % 1) - 1);
          const r = size;

          let sx = r * Math.sin(phi) * Math.cos(theta);
          let sy = r * Math.sin(phi) * Math.sin(theta);
          let sz = r * Math.cos(phi);

          // Rotate sphere
          let rx = sx * cosT - sz * sinT;
          let rz = sx * sinT + sz * cosT;

          tx = centerX + rx;
          ty = centerY + sy;
          tz = rz;
        } else if (activeShape === "cube") {
          // Performance Cube - Rotating Cube
          const side = size * 1.5;
          const face = i % 6;
          const pIdx = Math.floor(i / 6);
          const faceCount = Math.floor(particleCount / 6);
          const gridSize = Math.ceil(Math.sqrt(faceCount));

          const r = Math.floor(pIdx / gridSize) / gridSize - 0.5;
          const c = (pIdx % gridSize) / gridSize - 0.5;

          let x, y, z;

          if (face === 0) {
            x = 0.5;
            y = r;
            z = c;
          } // Right
          else if (face === 1) {
            x = -0.5;
            y = r;
            z = c;
          } // Left
          else if (face === 2) {
            x = r;
            y = 0.5;
            z = c;
          } // Top
          else if (face === 3) {
            x = r;
            y = -0.5;
            z = c;
          } // Bottom
          else if (face === 4) {
            x = r;
            y = c;
            z = 0.5;
          } // Front
          else if (face === 5) {
            x = r;
            y = c;
            z = -0.5;
          } // Back

          x *= side;
          y *= side;
          z *= side;

          // Rotate Cube
          let y1 = y * Math.cos(time) - z * Math.sin(time);
          let z1 = y * Math.sin(time) + z * Math.cos(time);
          let x2 = x * Math.cos(time * 0.5) - z1 * Math.sin(time * 0.5);
          let z2 = x * Math.sin(time * 0.5) + z1 * Math.cos(time * 0.5);

          tx = centerX + x2;
          ty = centerY + y1;
          tz = z2;
        } else if (activeShape === "grid") {
          // Scanner Grid
          const cols = 50;
          const r = Math.floor(i / cols);
          const c = i % cols;
          const step = (size * 2.5) / 50;

          const wave = Math.sin(c * 0.3 + time * 4) * 30;

          tx = centerX - size * 1.25 + c * step;
          ty = centerY - size * 0.8 + r * step * 0.6 + wave;
        } else if (activeShape === "chip") {
          // Hardware Chip
          const side = size * 1.2;
          const gridSize = Math.ceil(Math.sqrt(particleCount));
          const row = Math.floor(i / gridSize);
          const col = i % gridSize;

          const nx = col / gridSize - 0.5;
          const ny = row / gridSize - 0.5;

          tx = centerX + nx * side * 2;
          ty = centerY + ny * side * 2;
        } else if (activeShape === "random") {
          // Random Spread
          const rx = (i * 8273.1) % width;
          const ry = (i * 2831.9) % height;
          const rz = ((i * 4912.7) % 600) - 300;

          tx = rx;
          ty = ry;
          tz = rz;
        }

        // 2. Physics / Interpolation
        const dx = tx - p.x;
        const dy = ty - p.y;

        // Slower, smoother movement for the spread state
        const force = activeShape === "random" ? 0.01 : 0.08;
        p.x += dx * force;
        p.y += dy * force;

        // Add noise/float
        const noise = activeShape === "random" ? 0.5 : 0.1;
        p.x += Math.sin(time * 0.5 + i) * noise;
        p.y += Math.cos(time * 0.3 + i) * noise;

        // 3. Draw
        // Depth scaling
        const scale = (tz + size * 2) / (size * 3);
        const alpha = Math.max(0.1, Math.min(1, scale));

        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;

        const drawSize = Math.max(1, p.size * scale);

        ctx.beginPath();
        ctx.arc(p.x, p.y, drawSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Draw Connecting Lines for Dyson Sphere and Cube
      if (activeShape === "sphere" || activeShape === "cube") {
        ctx.strokeStyle = "rgba(37, 99, 235, 0.3)";
        ctx.lineWidth = 1;
        // Connect more points
        const limit = activeShape === "cube" ? 800 : 600;
        const range = activeShape === "cube" ? 50 : 80;

        for (let i = 0; i < limit; i++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[(i + 1) % limit];

          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < range) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [activeShape]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden bg-transparent pointer-events-none"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};

export default SecurityParticles;
