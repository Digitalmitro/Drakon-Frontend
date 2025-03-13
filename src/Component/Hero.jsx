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
                    </span><br />
                    <span>PERFECT GLOVES FOR TRAVEL BALL PLAYERS</span>
                  </h3>
                  <div >
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

                    {/* <Button
                      sx={{
                        borderRadius: "100vw",
                        padding: "15px 40px",
                        fontSize: "1rem",
                        fontWeight: "bold",
                        backgroundColor: "white",
                        color: "black",
                        "&:hover": { backgroundColor: "#cccccc" },
                      }}
                      variant="contained"
                      onClick={() => navigate("/product")}
                    >
                      Shop Women
                    </Button> */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
        <div
        // className="hero-bg-img flex items-center  bg-cover h-[700px]  lg:bg-cover"
        // style={{ zoom: isMobile ? "0.7" : "" }}
        >
          {/* <div className=" ml-[20px] lg:ml-[200px] text-center lg:text-left">
            <h3 className="uppercase text-3xl lg:text-5xl font-bold text-white mb-10">
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
                  backgroundColor: "#be410c", 
                },
                zoom: isMobile ? "0.7" : ""
              }}
              variant="contained"
              onClick={() => navigate('/product')}
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
                zoom: isMobile ? "0.7" : ""
              }}
              variant="contained"
              onClick={() => navigate('/product')}
            >
              shop women
            </Button>
          </div> */}
        </div>

        <div className="container mx-auto py-10 grid lg:grid-cols-2 gap-10">
          {/* <div className="w-full flex flex-col items-center justify-center">
            <img src={gloves} alt="" className="lg:w-64" />
            <h3 className="text-4xl lg:text-3xl font-bold">Cricket Gloves</h3>
            <h3 className="text-3xl lg:text-2xl font-bold my-5">$ 125</h3>
            <p className="text-xl lg:text-lg">Drakon Sports Apparel gloves...</p>
          </div> */}
          {/* <div className="w-full flex flex-col items-center justify-center">
            <img src={elbowGuard} alt="" className="lg:w-64" />
            <h3 className="text-4xl lg:text-3xl font-bold">Elbow Guard</h3>
            <h3 className="text-3xl lg:text-2xl font-bold my-5">$ 125</h3>
            <p className="text-xl lg:text-lg">Drakon Sports elbow guard...</p>
          </div> */}
          <Link to={"/product"}>
            <div className="w-full flex flex-col items-center justify-center">
              <img src={tshirt} alt="" className="lg:mb-[0px] lg:h-[400px]" />
              <h3 className="text-4xl lg:text-3xl font-bold">Drakon Hoodie</h3>
              <h3 className="text-3xl lg:text-2xl font-bold my-3">$ 125</h3>
              <p className="text-xl lg:text-lg">
                Drakon Sports Apparel hoodie...
              </p>
            </div>
          </Link>
          <Link to={"/product"}>
            <div className="w-full flex flex-col items-center justify-center">
              <img src={sunglass} alt="" className="lg:w-64" />
              <h3 className="text-4xl lg:text-3xl font-bold">Sunglass</h3>
              <h3 className="text-3xl lg:text-2xl font-bold my-5">$ 125</h3>
              <p className="text-xl lg:text-lg">Drakon Sports sunglass...</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Hero;
