import React, { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Footer = () => {
  const footerRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered reveal for top content
      gsap.fromTo(
        ".footer-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
          },
        }
      );

      // Massive text reveal
      gsap.fromTo(
        titleRef.current,
        { y: 100, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 90%",
            scrub: 1, // Subtle parallax effect
            end: "bottom 80%",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const links = {
    product: [
      { name: "Download", url: "#" },
      { name: "Features", url: "#" },
      { name: "Security", url: "#" },
      { name: "Changelog", url: "#" },
    ],
    resources: [
      { name: "Documentation", url: "#" },
      { name: "Community", url: "#" },
      { name: "Help Center", url: "#" },
      { name: "Privacy", url: "#" },
    ],
  };

  return (
    <footer ref={footerRef} className="relative mt-24 w-full">
      <div className="bg-white text-black rounded-t-[3rem] px-6 md:px-12 py-12 md:py-20 overflow-hidden min-h-screen flex flex-col justify-between">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
          <div className="footer-item">
            <h3 className="text-2xl md:text-3xl font-medium tracking-tight">
              Experience the future
            </h3>
          </div>

          <div className="flex flex-col md:flex-row gap-8 md:gap-32 w-full md:w-auto">
            {Object.entries(links).map(([category, items]) => (
              <div key={category} className="footer-item flex flex-col gap-6">
                <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-400">
                  {category}
                </h4>
                <ul className="space-y-3">
                  {items.map((link, idx) => (
                    <li key={idx}>
                      <a
                        href={link.url}
                        target="_blank"
                        className="group flex items-center gap-1 text-base font-medium text-neutral-800 hover:text-black transition-colors"
                      >
                        {link.name}
                        <ArrowUpRight
                          size={14}
                          className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Massive Title */}
        <div className="flex-1 flex items-center justify-center my-12 md:my-24 overflow-hidden">
          <h1
            ref={titleRef}
            className="text-[16vw] leading-[0.8] font-bold tracking-tighter text-black select-none text-center font-display"
          >
            NOVA OS
          </h1>
        </div>

        {/* Bottom Bar */}
        <div className="footer-item flex flex-col md:flex-row justify-between items-start md:items-end pt-8 border-t border-neutral-200 gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-xl font-bold font-display tracking-tight">
              Nova
            </span>
            <span className="text-sm text-neutral-500">
              © 2024 Nova Systems Inc.
            </span>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-sm font-medium text-neutral-600">
            <a href="#" className="hover:text-black transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-black transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-black transition-colors">
              Cookie Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
