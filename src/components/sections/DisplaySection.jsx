import React, { useEffect, useRef } from "react";
import Screen from "../../assets/Screen.svg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const DisplaySection = () => {
  const displayRef = useRef(null);
  const movingImageRef = useRef(null);
  const paraRef = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const el = displayRef.current;
    const movingImg = movingImageRef.current;
    const para = paraRef.current;

    if (!el || !movingImg || !para) return;

    gsap.set(movingImg, {
      xPercent: -50,
      yPercent: -50,
      width: "108%",
      borderRadius: "24px",
    });

    gsap.set(para, {
      opacity: 0,
      y: 50,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 0",
        end: "+=100%",
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    tl.to(
      movingImg,
      {
        xPercent: -50,
        yPercent: -69,
        width: "48%",
        duration: 2,
        ease: "power1.inOut",
      },
      "start"
    );
    tl.to(
      para,
      {
        opacity: 1,
        y: 0, // Slide to final position
        duration: 1,
        ease: "power1.out",
      },
      "start-=1.2"
    ); // Staggered to start *after* the image starts zooming

    // Clean up
    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={displayRef}
      className="bg-white relative min-h-screen rounded-t-[48px] mt-30 overflow-hidden"
    >
      <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-full">
        <img
          src={Screen}
          alt="Display frame"
          id="screen-frame"
          className="w-[90%] md:w-[50%] object-cover absolute top-[0%] left-[50%] transform -translate-x-1/2 -translate-y-1/2"
        />
        <img
          src="https://i.pinimg.com/736x/fc/d6/99/fcd699e0cc41c3f549a34c43fa7fcfd8.jpg"
          alt="Content"
          className="object-cover absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[194%] md:w-[108%] rounded-3xl"
          ref={movingImageRef} // Referencing the moving image
        />
      </div>

      <p
        ref={paraRef}
        className="font-body absolute bottom-12 max-w-xl left-6 md:left-12 right-6 md:right-auto text-neutral-900 font-semibold text-base md:text-lg leading-5 overflow-hidden opacity-0 text-center md:text-left"
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
