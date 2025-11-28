import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import Counter from "./Counter";

const LoadingScreen = ({ onComplete }) => {
  const [percentage, setPercentage] = useState(0);
  const barRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    let interval;

    const checkLoad = () => {
      if (document.readyState === "complete") {
        return true;
      }
      return false;
    };

    // Simulate loading progress
    interval = setInterval(() => {
      setPercentage((prev) => {
        const isLoaded = checkLoad();
        let next = prev + Math.floor(Math.random() * 3) + 1;

        // Pause at 90% if not loaded
        if (!isLoaded && next > 90) {
          return 90;
        }

        if (next >= 100) {
          clearInterval(interval);
          return 100;
        }
        return next;
      });
    }, 30);

    const handleLoad = () => {
      // Ensure we don't get stuck if the interval is waiting at 90
    };

    window.addEventListener("load", handleLoad);

    return () => {
      clearInterval(interval);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  useEffect(() => {
    if (barRef.current) {
      gsap.to(barRef.current, {
        height: `${percentage}%`,
        duration: 0.5,
        ease: "power2.out",
      });
    }

    if (percentage === 100) {
      // Small delay before finishing to let user see 100%
      const timer = setTimeout(() => {
        // Animate out
        gsap.to(".loading-screen", {
          opacity: 0,
          duration: 0.5,
          delay: 1,
          onComplete: () => {
            if (onComplete) onComplete();
          },
        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [percentage, onComplete]);

  return (
    <div className="loading-screen fixed inset-0 z-50 flex items-end justify-start bg-[#111] text-white overflow-hidden">
      <div
        ref={barRef}
        className="absolute top-0 left-0 w-3 bg-white"
        style={{ height: "0%" }}
      ></div>
      <div className="absolute top-1/2  left-1/2 transform -translate-1/2">
        <p className="text-[3vw] font-bold font-body text-neutral-50/20 stroke-neutral-50 stroke-3">
          Welcome
        </p>
      </div>

      <div className="relative z-10 p-10 mix-blend-difference">
        <Counter
          value={percentage}
          fontSize={200}
          padding={0}
          gap={10}
          textColor="white"
          fontWeight="bold"
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
