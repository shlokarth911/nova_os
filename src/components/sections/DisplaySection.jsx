import React, { useEffect, useRef } from "react";
import Screen from "../../assets/screen.svg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const DisplaySection = () => {
  const displayRef = useRef(null);
  const imageRef = useRef(null);
  const paraRef = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const el = displayRef.current;
    const img = imageRef.current;
    const para = paraRef.current;

    if (!el || !img || !para) return;

    gsap.set(img, {
      xPercent: -50,
      yPercent: -52,
      width: "108%",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 0",
        end: "+=110%",
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    tl.to(img, {
      xPercent: -50,
      yPercent: -69,
      width: "48%",
      duration: 1,
      ease: "none",
    });

    tl.to(para, {
      opacity: 1,
      duration: 1,
    });

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={displayRef}
      className="bg-white relative min-h-screen rounded-t-[48px] overflow-hidden"
    >
      <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2  w-full">
        <img
          src={Screen}
          alt=""
          className="w-[50%] object-cover absolute top-[0%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 "
        />
        <img
          src="https://i.pinimg.com/736x/fc/d6/99/fcd699e0cc41c3f549a34c43fa7fcfd8.jpg"
          alt=""
          className="object-cover absolute top-[50%] left-[50%] transform -translate-x-1/2  -translate-y-[50%] w-[108%]  rounded-3xl "
          ref={imageRef}
        />
      </div>

      <p
        ref={paraRef}
        className=" font-body absolute bottom-12 max-w-xl left-12 text-neutral-900 font-semibold text-lg leading-5  overflow-hidden display-box opacity-0"
      >
        NovaOS is a modular, Linux-based OS aiming for extreme speed,
        customization, and securitys. It includes a security core DysonSphere
        and modules for cross-device syncing, targeting a lightweight yet
        feature-rich experience.
      </p>
    </div>
  );
};

export default DisplaySection;
