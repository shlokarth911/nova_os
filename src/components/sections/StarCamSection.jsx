import React from "react";
import webcam from "../../assets/webcam.jpg";

const StarCamSection = () => {
  return (
    <div>
      <section className="relative w-full font-body overflow-hidden mt-16">
        <div className="px-6 md:px-12 py-3">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight font-display border-b border-neutral-200 pb-5">
            StarCam
          </h1>
        </div>

        <div className="px-4 md:px-24 h-[50vh] md:h-[750px] relative">
          <img
            src={
              "https://cdn.mos.cms.futurecdn.net/oYErQq8ZUPJiXYCLMcQoNn.jpg" ||
              webcam
            }
            className="w-full h-full rounded-[24px] md:rounded-[40px] object-cover"
            alt=""
          />

          <div className="absolute bottom-[5%] md:bottom-[2%] left-[50%] md:left-[6%] transform -translate-x-1/2 md:translate-x-0 z-10 bg-black/60 backdrop-blur-md rounded-full w-[90%] md:w-auto">
            <p className="px-6 py-4 text-white text-base md:text-lg max-w-none md:max-w-[400px] text-center leading-tight">
              Use your smartphone camera as a webcam for NovaOS video calls.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StarCamSection;
