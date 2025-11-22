import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const SecurityParticles = ({
  activeShape = "sphere",
  focusSide = "center",
}) => {
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
    const particleCount = 1500;

    // Generate Shapes
    // We calculate center dynamically in render, but size is constant
    const size = Math.min(width, height) * 0.25; // Slightly smaller to fit in half width

    // Initialize Particles
    if (particlesRef.current.length === 0) {
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z: 0,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          size: Math.random() * 2 + 1,
          color: `rgba(37, 99, 235, ${Math.random() * 0.6 + 0.4})`,
          target: { x: width / 2, y: height / 2, z: 0 },
        });
      }
    }

    // Animation Loop
    let time = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.005;

      // Determine Target Center based on focusSide
      let targetCenterX = width / 2;
      if (focusSide === "left") targetCenterX = width * 0.25;
      if (focusSide === "right") targetCenterX = width * 0.75;

      const centerY = height / 2;

      // Rotate the entire system slightly
      const cosT = Math.cos(time * 0.3);
      const sinT = Math.sin(time * 0.3);

      const interactionRadius = size * 2.5; // Radius within which particles are affected

      particlesRef.current.forEach((p, i) => {
        // 1. Determine if particle is "nearby" the target center
        // We use the particle's current position to decide if it should join the shape
        // This creates the effect of the shape "gathering" nearby particles
        const distToTargetCenter = Math.hypot(
          p.x - targetCenterX,
          p.y - centerY
        );
        const isNearby = distToTargetCenter < interactionRadius;

        let tx = p.target.x;
        let ty = p.target.y;
        let tz = p.target.z || 0;

        // Default to random float
        let shapeType = "random";

        // If active shape is set and particle is nearby, try to form shape
        if (activeShape !== "random" && isNearby) {
          shapeType = activeShape;
        }

        // Dynamic Shape Calculation
        if (shapeType === "sphere") {
          // Dyson Sphere - Two Concentric Shells
          const theta = (i * 234.12) % (Math.PI * 2);
          const phi = Math.acos(2 * ((i * 123.45) % 1) - 1);

          // 60% outer, 40% inner
          const isInner = i % 5 < 2;
          const r = isInner ? size * 0.5 : size;

          let sx = r * Math.sin(phi) * Math.cos(theta);
          let sy = r * Math.sin(phi) * Math.sin(theta);
          let sz = r * Math.cos(phi);

          // Rotate spheres in opposite directions
          const dir = isInner ? -1 : 1;
          const rotSpeed = isInner ? 1.5 : 1; // Inner spins faster

          const effectiveTime = time * dir * rotSpeed;
          const cosT2 = Math.cos(effectiveTime);
          const sinT2 = Math.sin(effectiveTime);

          let rx = sx * cosT2 - sz * sinT2;
          let rz = sx * sinT2 + sz * cosT2;

          tx = targetCenterX + rx;
          ty = centerY + sy;
          tz = rz;
        } else if (shapeType === "cube") {
          // Rotating Cube
          const side = size * 1.2; // Adjust size for cube

          // Map i to cube points.
          // Since we only use a subset of particles, using 'i' directly might result in gaps
          // if the nearby particles happen to have indices that cluster on one face.
          // However, with 1500 particles and random distribution, 'i' is effectively random.
          // So we can just use 'i' to determine the target position on the cube.

          const face = i % 6;
          const pIdx = Math.floor(i / 6);
          // We assume a virtual full set for mapping
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

          x *= side * 2;
          y *= side * 2;
          z *= side * 2;

          // Rotate Cube
          let y1 = y * Math.cos(time) - z * Math.sin(time);
          let z1 = y * Math.sin(time) + z * Math.cos(time);
          let x2 = x * Math.cos(time * 0.5) - z1 * Math.sin(time * 0.5);
          let z2 = x * Math.sin(time * 0.5) + z1 * Math.cos(time * 0.5);

          tx = targetCenterX + x2;
          ty = centerY + y1;
          tz = z2;
        } else {
          // Random / Floating
          // Continuous movement using velocity
          p.x += p.vx * 2; // Speed multiplier
          p.y += p.vy * 2;

          // Wrap around screen edges
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          // Update target to current position so physics interpolation doesn't fight it
          tx = p.x;
          ty = p.y;
          tz = p.z;
        }

        // 2. Physics / Interpolation
        const dx = tx - p.x;
        const dy = ty - p.y;

        // Slower, smoother movement for the spread state
        const force = shapeType === "random" ? 0.02 : 0.1; // Snappier for shape
        p.x += dx * force;
        p.y += dy * force;

        // Add noise/float
        const noise = shapeType === "random" ? 0.5 : 0.1;
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
      // Only connect particles that are part of the shape (i.e., nearby)
      if (activeShape === "sphere" || activeShape === "cube") {
        ctx.strokeStyle = "rgba(37, 99, 235, 0.3)";
        ctx.lineWidth = 1;
        const limit = activeShape === "cube" ? 800 : 600;
        const range = activeShape === "cube" ? 50 : 80;

        // We need to be careful: we only want to connect particles that are actually IN the shape.
        // We can check distance to center again.

        // Optimization: Only check a subset of particles
        for (let i = 0; i < limit; i++) {
          const p1 = particlesRef.current[i];
          // Check if p1 is part of the shape
          if (
            Math.hypot(p1.x - targetCenterX, p1.y - centerY) > interactionRadius
          )
            continue;

          const p2 = particlesRef.current[(i + 1) % limit];
          if (
            Math.hypot(p2.x - targetCenterX, p2.y - centerY) > interactionRadius
          )
            continue;

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
  }, [activeShape, focusSide]);

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
