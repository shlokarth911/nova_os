import React from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import HeroSection from "./components/sections/HeroSection";
import LoopSection from "./components/sections/LoopSection";
import ExclusiveFeatures from "./components/sections/ExclusiveFeatures";
import DisplaySection from "./components/sections/DisplaySection";
import SecuritySection from "./components/sections/SecuritySection";

const App = () => {
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  return (
    <div>
      <HeroSection />
      <LoopSection />
      <ExclusiveFeatures />
      <DisplaySection />
      <SecuritySection />
    </div>
  );
};

export default App;
