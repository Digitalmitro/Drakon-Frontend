import { Button, useMediaQuery } from "@mui/material";
import React from "react";
import gloves from "../assets/8.png";
import elbowGuard from "../assets/7.png";
import tshirt from "../assets/6.png";
import sunglass from "../assets/9.png";
import { useNavigate, Link } from "react-router-dom";
import { Carousel } from "antd";
import { motion } from "framer-motion";
import carousel1 from "../assets/carousel/crousal-1.jpg";
import carousel2 from "../assets/carousel/crousal-2.webp";
import carousel3 from "../assets/carousel/crousal-3.jpg";
// import carousel4 from "../assets/carousel/crousal-4.jpg";
const Hero = ({ closeCart }) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:900px)");

  const images = [carousel1, carousel2, carousel3];
  return (
    <>
      <div onClick={closeCart} className="bg-[#F3F3F3] lg:mt-16 ">
        <Carousel autoplay effect="fade">
          {images.map((img, index) => (
            <div key={index} className="relative w-full h-screen">
              <div
                className={`w-full h-full bg-cover bg-center flex items-center  ${
                  index == 0 ? " justify-end pb-32" : "justify-start"
                }`}
                style={{ backgroundImage: `url(${img})` }}
              >
                <div
                  className={`text-white text-start   ${
                    index == 1 ? "pt-80 px-4" : "px-16"
                  }`}
                >
                  <h3 className="uppercase text-xl lg:text-4xl font-semibold mb-10 w-[600px]">
                    <span className="text-amber-500 text-lg ">
                      NEW NEXT SERIES
                    </span>
                    <br />
                    <span>PERFECT GLOVES FOR TRAVEL BALL PLAYERS</span>
                  </h3>
                  <div>
                    <Button
                      sx={{
                        borderRadius: "100vw",
                        padding: "15px 40px",
                        fontSize: "1rem",
                        fontWeight: "bold",
                        backgroundColor: "#F5743B",

                        mr: "20px",
                        "&:hover": { backgroundColor: "#be410c" },
                      }}
                      variant="contained"
                      onClick={() => navigate("/product")}
                    >
                      Shop Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
        <div>
          {/* <img src={"carousel4"} alt="" /> */}
        </div>
      </div>
    </>
  );
};

export default Hero;
