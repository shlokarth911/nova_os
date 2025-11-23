import React from "react";
import webcam from "../../assets/webcam.jpg";

const StarCamSection = () => {
  return (
    <div>
      <section className="relative w-full  font-body overflow-hidden mt-16">
        <div className="px-12 py-3">
          <h1 className="text-6xl font-bold mb-6 tracking-tight font-display border-b border-neutral-200 pb-5">
            StarCam
          </h1>
        </div>

        <div className="px-24 h-[750px] relative">
          <img
            src={
              "https://cdn.mos.cms.futurecdn.net/oYErQq8ZUPJiXYCLMcQoNn.jpg" ||
              webcam
            }
            className="w-full h-full rounded-[40px] object-cover"
            alt=""
          />

          <div className="absolute bottom-[2%] left-[6%] z-10 bg-black/60 backdrop-blur-md rounded-full">
            <p className="px-6 py-4 text-white text-lg max-w-[400px] text-center leading-tight">
              Use your smartphone camera as a webcam for NovaOS video calls.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StarCamSection;
