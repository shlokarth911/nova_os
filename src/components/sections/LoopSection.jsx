import React from "react";
import CurvedLoop from "../ui/CurvedLoop";

const LoopSection = () => {
  return (
    <div className="py-20">
      <CurvedLoop
        marqueeText="Fast ✦ Responsive ✦ Creative ✦ Reliable ✦ Secure ✦ Innovative ✦ Open-Source ✦ Customizable ✦ Efficient ✦ Modern ✦ "
        speed={1.5}
        curveAmount={170}
        direction="right"
        interactive={true}
        className="custom-text-style font-body"
      />
    </div>
  );
};

export default LoopSection;
