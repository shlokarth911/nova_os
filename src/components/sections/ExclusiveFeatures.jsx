import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ExclusiveFeatures = () => {
  const cardRefs = useRef([]);

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  useGSAP(() => {
    cardRefs.current.forEach((card, i) => {
      gsap.from(card, {
        y: 100,
        opacity: 0,
        duration: 1,
        delay: i * 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: card,
          start: "top 60%",
          toggleActions: "play none none none",
        },
      });
    });
  }, []);

  const features = [
    {
      title: "Faster",
      description: "Built on Linux, Nova Os Provides immense performance",
      image:
        "https://i.pinimg.com/736x/35/8f/58/358f5821cfc98120a208bdceda9c15de.jpg",
    },
    {
      title: "Usability",
      description:
        "Keeping asthetics and making the OS usable and coustomizable for everyone",
      image:
        "https://i.pinimg.com/736x/f8/dc/9a/f8dc9ac53d0fe48d2710c5c0057dc857.jpg",
    },
    {
      title: "Compatablity",
      description: "Compatible with many windows softwares",
      image:
        "https://i.pinimg.com/736x/b3/13/fd/b313fd6372d4e481c52c7feab4a8b4f3.jpg",
    },
  ];

  return (
    <div className="px-9 font-body">
      <h1 className="p-8 text-6xl border-b border-neutral-300 ">
        Exclusive Features
      </h1>

      <div className="flex items-center justify-evenly py-16 flex-wrap">
        {features.map((feature, idx) => (
          <div
            key={idx}
            ref={addToRefs}
            className="flex flex-col items-center p-5 pb-8 w-130 relative"
          >
            <img
              src={feature.image}
              alt=""
              className="mix-blend-lighten mb-7 w-75 "
            />

            <div className="w-full h-[72.5%] z-[-1] bottom-0 left-[50%] transform -translate-x-1/2 absolute bg-neutral-950 rounded-[35px]"></div>

            <h1 className="text-3xl pb-4 mb-4 border-b border-neutral-600 w-full text-center">
              {feature.title}
            </h1>

            <p className="max-w-[83%] text-center text-lg text-neutral-400">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExclusiveFeatures;

//TODO: Add custom images for each feature card
