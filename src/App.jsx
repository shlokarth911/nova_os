import React, { useState } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import HeroSection from "./components/sections/HeroSection";
import ExclusiveFeatures from "./components/sections/ExclusiveFeatures";
import DisplaySection from "./components/sections/DisplaySection";
import SecuritySection from "./components/sections/SecuritySection";
import StarCamSection from "./components/sections/StarCamSection";
import LoadingScreen from "./components/ui/LoadingScreen";

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  React.useEffect(() => {
    if (isLoaded) {
      // Refresh ScrollTrigger after layout changes
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }
  }, [isLoaded]);

  return (
    <>
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}
      {isLoaded && (
        <div className="animate-fade-in">
          <HeroSection />

          {/* TODO : Remove all related files */}
          {/* <LoopSection /> */}
          <ExclusiveFeatures />
          <DisplaySection />
          <SecuritySection />
          <StarCamSection />
        </div>
      )}
    </>
  );
};

export default App;
