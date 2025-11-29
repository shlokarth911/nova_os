import React, { useState, Suspense, lazy } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import HeroSection from "./components/sections/HeroSection";
import LoadingScreen from "./components/ui/LoadingScreen";

// Lazy load below-the-fold sections
const ExclusiveFeatures = lazy(() =>
  import("./components/sections/ExclusiveFeatures")
);
const DisplaySection = lazy(() =>
  import("./components/sections/DisplaySection")
);
const SecuritySection = lazy(() =>
  import("./components/sections/SecuritySection")
);
const StarCamSection = lazy(() =>
  import("./components/sections/StarCamSection")
);
const DwonloadsSection = lazy(() =>
  import("./components/sections/DwonloadsSection")
);
const Footer = lazy(() => import("./components/sections/Footer"));

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

          <Suspense fallback={<div className="h-screen w-full bg-black" />}>
            <ExclusiveFeatures />
            <DisplaySection />
            <SecuritySection />
            <StarCamSection />
            <DwonloadsSection />
            <Footer />
          </Suspense>
        </div>
      )}
    </>
  );
};

export default App;
