import { Button, useMediaQuery } from "@mui/material";
import React from "react";
import gloves from "../assets/8.png";
import elbowGuard from "../assets/7.png";
import tshirt from "../assets/6.png";
import sunglass from "../assets/9.png";

const Hero = ({ closeCart }) => {
  const isMobile = useMediaQuery("(max-width:900px)");
  return (
    <>
      <div onClick={closeCart} className="bg-[#F3F3F3]">
        <div
          className="hero-bg-img flex items-center"
          style={{ zoom: isMobile ? "0.7" : "" }}
        >
          <div className=" ml-[20px] lg:ml-[200px] text-center lg:text-left">
            <h3 className="uppercase text-5xl font-bold text-white mb-10">
              Always in motion
            </h3>
            <Button
              sx={{
                borderRadius: "100vw",
                padding: "15px 40px",
                fontSize: "1rem",
                fontWeight: "bold",
                backgroundColor: "#F5743B",
                ml: isMobile ? "" : "40px",
                mr: "20px",
                "&:hover": {
                  backgroundColor: "#be410c", // Adjust the brightness to darken the color
                },
              }}
              variant="contained"
            >
              shop men
            </Button>

            <Button
              sx={{
                borderRadius: "100vw",
                padding: "15px 40px",
                fontSize: "1rem",
                fontWeight: "bold",
                backgroundColor: "white",
                color: "black",
                "&:hover": {
                  backgroundColor: "#cccccc", // Adjust the brightness to darken the color
                },
              }}
              variant="contained"
            >
              shop women
            </Button>
          </div>
        </div>

        <div className="container mx-auto py-10 grid lg:grid-cols-4 gap-10">
          <div className="w-full flex flex-col items-center justify-center">
            <img src={gloves} alt="" className="lg:w-64" />
            <h3 className="text-4xl lg:text-3xl font-bold">Cricket Gloves</h3>
            <h3 className="text-3xl lg:text-2xl font-bold my-5">$ 125</h3>
            <p className="text-xl lg:text-lg">Drakon Sports Apparel gloves...</p>
          </div>
          <div className="w-full flex flex-col items-center justify-center">
            <img src={elbowGuard} alt="" className="lg:w-64" />
            <h3 className="text-4xl lg:text-3xl font-bold">Elbow Guard</h3>
            <h3 className="text-3xl lg:text-2xl font-bold my-5">$ 125</h3>
            <p className="text-xl lg:text-lg">Drakon Sports elbow guard...</p>
          </div>
          <div className="w-full flex flex-col items-center justify-center">
            <img src={tshirt} alt="" className="lg:mb-[0px] lg:h-[400px]" />
            <h3 className="text-4xl lg:text-3xl font-bold">Drakon Hoodie</h3>
            <h3 className="text-3xl lg:text-2xl font-bold my-3">$ 125</h3>
            <p className="text-xl lg:text-lg">
            Drakon Sports Apparel hoodie...
            </p>
          </div>
          <div className="w-full flex flex-col items-center justify-center">
            <img src={sunglass} alt="" className="lg:w-64" />
            <h3 className="text-4xl lg:text-3xl font-bold">Sunglass</h3>
            <h3 className="text-3xl lg:text-2xl font-bold my-5">$ 125</h3>
            <p className="text-xl lg:text-lg">Drakon Sports sunglass...</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
