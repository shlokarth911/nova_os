import React, { useState } from "react";
import SecurityParticles from "../ui/SecurityParticles";
import { Shield, Cpu, Activity, Eye, Lock, Cloud } from "lucide-react";

const SecuritySection = () => {
  const [activeShape, setActiveShape] = useState("random");

  return (
    <section className="relative font-body border-b rounded-b-[48px] w-full min-h-screen bg-white text-neutral-900 overflow-hidden flex flex-col items-center py-20">
      {/* Background Particles */}
      <div className="absolute inset-0 z-0">
        <SecurityParticles activeShape={activeShape} />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Header */}
        <div className="mb-24">
          <h2 className="text-6xl md:text-8xl font-bold mb-6 tracking-tighter text-neutral-900">
            DysonSphere
          </h2>
          <p className="text-xl md:text-2xl text-neutral-500 font-light tracking-wide max-w-2xl mx-auto">
            Security Engine of NovaOS
          </p>
        </div>

        {/* Core Goals Grid - Minimal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto mb-32">
          {[
            {
              icon: Activity,
              title: "Zero Cost",
              desc: "Adaptive background scanning.",
            },
            {
              icon: Lock,
              title: "Privacy First",
              desc: "Local logs, zero data egress.",
            },
            {
              icon: Cpu,
              title: "Adaptive",
              desc: "Scales with your hardware.",
            },
          ].map((item, i) => (
            <div
              key={i}
              onMouseEnter={() => setActiveShape("sphere")}
              onMouseLeave={() => setActiveShape("random")}
              className="group p-6 rounded-2xl hover:bg-white/50 transition-all duration-500 cursor-default"
            >
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-500">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-neutral-900 tracking-tight">
                {item.title}
              </h3>
              <p className="text-neutral-500 text-lg font-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Gradient Overlay for depth */}
      <div className="absolute bottom-0 left-0 w-full h-64 bg-linear-to-t from-white via-white/50 to-transparent z-20 pointer-events-none" />
    </section>
  );
};

// Simple Box Icon
const BoxIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

export default SecuritySection;
