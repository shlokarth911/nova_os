import React from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import FloatingLines from "./components/ui/FloatingLines";
import SplitText from "./components/ui/SplitText";
import CircularText from "./components/ui/CircularText";
import { Play } from "lucide-react";
import HeroSection from "./components/sections/HeroSection";
import LoopSection from "./components/sections/LoopSection";

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
      {/* //Hero Section */}

      <HeroSection />
      <LoopSection />
    </div>
  );
};

export default App;
