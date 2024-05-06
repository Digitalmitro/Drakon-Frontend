import { Button, useMediaQuery } from "@mui/material";
import React from "react";

const Hero = ({closeCart}) => {
  const isMobile = useMediaQuery("(max-width:900px)");
  return (
    <>
      <div onClick={closeCart} className="bg-[#F3F3F3]">
        <div className="hero-bg-img flex items-center" style={{zoom: isMobile ? "0.6" : ""}}>
          <div className=" ml-[50px] lg:ml-[200px] text-center lg:text-left">
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

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-10 justify-between items-center container mx-auto py-20">
          <div className="bg-men-running w-full lg:w-[480px] flex items-center justify-center">
            <p className="text-4xl lg:text-5xl  font-bold   lg:mx-32">
              Cricket Gloves
            </p>
          </div>
          <div className="bg-women-running w-full lg:w-[480px] flex items-center justify-center">
            <p className="text-4xl lg:text-5xl  font-bold   lg:mx-32">
              Elbow Guard
            </p>
          </div>
          <div className="h-[300px] w-full lg:w-[480px] bg-orange-600 flex items-center justify-center">
            <p className="text-4xl lg:text-5xl text-white font-bold w-64 ml-20 lg:ml-0">
              Sale! Upto 40% OFF
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
