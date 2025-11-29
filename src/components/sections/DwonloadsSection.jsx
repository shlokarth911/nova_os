import React, { useEffect, useRef } from "react";
import StarBorder from "../ui/StarBorder";
import { Download, Disc, ShieldCheck } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const DwonloadsSection = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="mt-24 mb-24 md:mt-48 md:mb-48 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-12 tracking-tight font-display border-b border-neutral-800 pb-6 text-white">
          Downloads
        </h1>

        <div
          ref={cardRef}
          className="relative overflow-hidden rounded-3xl bg-neutral-900/50 border border-neutral-800 p-6 md:p-12 backdrop-blur-sm transition-all duration-500 hover:border-neutral-700 hover:bg-neutral-900/80"
        >
          {/* Background Gradient Glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            {/* File Info */}
            <div className="flex-1 space-y-6 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/30 border border-cyan-900/50 text-cyan-400 text-xs font-mono tracking-wider">
                <Disc size={14} />
                <span>OFFICIAL DISK IMAGE</span>
              </div>

              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 font-display">
                  Nova OS{" "}
                  <span className="text-neutral-500 text-2xl">v1.0</span>
                </h2>
                <p className="text-neutral-400 max-w-lg text-base md:text-lg font-body leading-relaxed mx-auto md:mx-0">
                  Experience the next generation of computing. Secure, fast, and
                  designed for the future.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm text-neutral-500 font-mono">
                <span className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-green-500" />
                  Verified Secure
                </span>
                <span>Size: 2.4 GB</span>
                <span>Format: .ISO</span>
              </div>
            </div>

            {/* Download Action */}
            <div
              onClick={() => {
                alert("This product is not available for download yet");
              }}
              className="flex flex-col items-center gap-4 w-full md:w-auto"
            >
              <StarBorder
                as="button"
                color="#00f0ff"
                speed="3s"
                className="group w-full md:w-auto"
              >
                <div className="flex items-center justify-center gap-3 px-8 py-2">
                  <Download className="w-5 h-5 text-cyan-400 group-hover:text-white transition-colors duration-300" />
                  <span className="text-lg md:text-xl font-body text-white group-hover:text-cyan-50 transition-colors duration-300">
                    Download Image File
                  </span>
                </div>
              </StarBorder>
              <p className="text-xs text-neutral-600 font-mono">
                SHA-256: 8f4a...e2b1
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DwonloadsSection;
