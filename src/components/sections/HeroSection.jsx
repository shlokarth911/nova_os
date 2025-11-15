import React from "react";
import FloatingLines from "../ui/FloatingLines";
import CircularText from "../ui/CircularText";
import { Play } from "lucide-react";
import SplitText from "../ui/SplitText";

const HeroSection = () => {
  return (
    <div className="min-h-screen relative font-body">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[98%] w-[98%] bg-black rounded-[50px] overflow-hidden ">
        <div className="absolute bottom-[5%] left-[3%] ">
          <div className="border-b mb-9 border-neutral-600">
            <SplitText
              text="Nova OS"
              className="text-[9vw] text-white bottom-[10%] left-[3%]  text-center font-display"
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

          <p className="text-white text-xl max-w-lg   ">
            Built on a Linux base, NovaOS adapts to your hardware, learns your
            preferences, and puts YOU in control — from UI to security to apps.
          </p>

          <div className="mt-7 flex gap-2">
            <div className=" py-2 px-5 text-black bg-white rounded-full w-fit font-medium">
              Built on Linux
            </div>
            <div className=" py-2 px-5 text-black bg-white rounded-full w-fit font-medium">
              Built with ❤️
            </div>
          </div>
        </div>

        <div className="absolute right-[2.5%] bottom-[4.5%]">
          <div className="h-52 w-96 rounded-[40px] bg-neutral-600 "></div>
          <div className="absolute top-[-40%] left-[-20%]">
            <div className="backdrop-blur-sm h-18 w-18 absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-neutral-950/20 overflow-hidden flex items-center justify-center border   border-neutral-400 hover:scale-110 transition-transform duration-300">
              <Play />
            </div>

            <CircularText
              text="CLICK*TO*PLAY*CLICK*TO*PLAY*"
              onHover="speedUp"
              spinDuration={20}
              className="custom-class scale-77 font-body z-10 "
            />
          </div>
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
  );
};

export default HeroSection;
