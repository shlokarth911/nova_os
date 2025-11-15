import React from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import FloatingLines from "./components/FloatingLines";
import SplitText from "./components/SplitText";

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

      <div className="min-h-screen relative font-body">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[98%] w-[98%] bg-black rounded-[50px] overflow-hidden ">
          <div className="absolute bottom-[10%] left-[3%] ">
            <SplitText
              text="Nova OS"
              className="text-[9vw] text-white bottom-[10%] left-[3%] font-semibold text-center font-display"
              delay={100}
              duration={2}
              ease="elastic.out(1, 0.3)"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
            />
          </div>

          <div
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: -1,
            }}
          >
            <FloatingLines
              enabledWaves={["middle"]}
              lineCount={[9]}
              bendRadius={30}
              bendStrength={-15}
              interactive={true}
              parallax={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
