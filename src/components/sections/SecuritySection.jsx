import React, { useState } from "react";
import SecurityParticles from "../ui/SecurityParticles";
import { ArrowUpRight, Shield } from "lucide-react";

const SecuritySection = () => {
  const [activeShape, setActiveShape] = useState("random");

  return (
    <section className="relative w-full h-screen bg-white text-neutral-900 font-body overflow-hidden flex items-center justify-center rounded-b-[48px]">
      {/* Background Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <SecurityParticles activeShape={activeShape} focusSide="center" />
      </div>

      {/* Center Card - Dyson Sphere */}
      <div
        onMouseEnter={() => setActiveShape("sphere")}
        onMouseLeave={() => setActiveShape("random")}
        className="relative z-10 max-w-2xl w-full p-12 flex flex-col items-center justify-center text-center  transition-colors duration-500 rounded-3xl  group"
      >
        <div className="w-24 h-24 mb-8 rounded-full  flex items-center justify-center group-hover:scale-110 transition-transform duration-500 backdrop-blur-sm border border-neutral-200">
          <Shield className="w-12 h-12" />
        </div>

        <h3 className="text-6xl font-bold mb-6 tracking-tighter text-neutral-900">
          Dyson Sphere
        </h3>

        <p className="text-xl text-neutral-500 font-bold  leading-tight max-w-lg mx-auto">
          A multi-layered security engine that wraps your infrastructure in
          adaptive, concentric shields. Zero egress, absolute privacy.
        </p>

        <a
          href="https://github.com/Najaf6e/NovaOS/blob/main/docs/DYSON_SPHERE.md"
          target="_blank"
          className="flex items-center justify-center gap-3 mt-7 bg-neutral-950/80 text-white rounded-full backdrop-blur-sm p-3 px-5"
        >
          See More on GitHub Docs
          <ArrowUpRight size={22} />
        </a>
      </div>
    </section>
  );
};

export default SecuritySection;
