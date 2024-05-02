import React from "react";
import whyChooseUsImg from "../assets/why-choose-us-img.png";
import { useMediaQuery } from "@mui/material";

const WhyChooseUs = ({closeCart}) => {
    const isMobile = useMediaQuery("(max-width:500px)");
    const isTablet = useMediaQuery("(min-width: 500px) and (max-width: 1000px)");
    console.log(isTablet);
    return (
    <div className="container mx-auto py-32 px-10 lg:px-0" onClick={closeCart}>
      <h2 className="text-center text-2xl lg:text-6xl font-bold mb-10 lg:mb-32">Why Choose Us</h2>
      <div className="grid grid-cols-3 gap-y-5" style={{zoom: isMobile ? "0.3": isTablet ? "0.5" : ""}}>
        <div>
          <h3 className="text-4xl font-bold">01</h3>
          <h3 className="text-2xl font-bold mb-5">High quality</h3>
          <p className="text-lg w-[60%] leading-9">
            Ipsa quae ab illo inventore veritatis et quasi architecto beatae
            vitae dicta
          </p>
        </div>
        <div className="w-[400px] h-[400px] lg-w-full lg:h-full lg:p-10 border-2 border-gray-400 rounded-[50%] flex justify-center items-center">
          <img
            src={whyChooseUsImg}
            alt=""
            className="rounded-[50%] p-10 border-2 border-gray-400 object-cover"
          />
        </div>
        <div className=" ml-32">
          <h3 className="text-4xl font-bold">03</h3>
          <h3 className="text-2xl font-bold mb-5">MONEY BACK GUARANTEE</h3>
          <p className="text-lg w-[90%] leading-9">
            Ipsa quae ab illo inventore veritatis et quasi architecto beatae
            vitae dicta
          </p>
        </div>
        <div>
          <h3 className="text-4xl font-bold">02</h3>
          <h3 className="text-2xl font-bold mb-5">FREE SHIPPING</h3>
          <p className="text-lg w-[60%] leading-9">
            Ipsa quae ab illo inventore veritatis et quasi architecto beatae
            vitae dicta
          </p>
        </div>
        <div></div>
        <div className=" ml-32">
          <h3 className="text-4xl font-bold">04</h3>
          <h3 className="text-2xl font-bold mb-5">PROFESSIONAL SUPPORT</h3>
          <p className="text-lg w-[90%] leading-9">
            Ipsa quae ab illo inventore veritatis et quasi architecto beatae
            vitae dicta
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
