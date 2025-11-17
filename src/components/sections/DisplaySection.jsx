import React from "react";
import Screen from "../../assets/screen.svg";

const DisplaySection = () => {
  return (
    <div className="bg-white relative min-h-screen rounded-t-[48px] overflow-hidden">
      <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2  w-full">
        <img
          src={Screen}
          alt=""
          className="w-[50%] object-cover absolute top-[0%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 "
        />
        <img
          src="https://i.pinimg.com/736x/fc/d6/99/fcd699e0cc41c3f549a34c43fa7fcfd8.jpg"
          alt=""
          className="object-cover absolute top-[0%] left-[50%] transform -translate-x-1/2 -translate-y-[69%] w-[48%]  rounded-3xl "
        />
      </div>
    </div>
  );
};

export default DisplaySection;
