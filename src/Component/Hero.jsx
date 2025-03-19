import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Carousel } from "antd";
const Hero = ({ closeCart }) => {
  const navigate = useNavigate();
  const [banner,setBanner]=useState([])
  const fetchAllBanners=async()=>{
    const response=await fetch(`${import.meta.env.VITE_BACKEND_API}/api/banners`);
    if(response.ok){
      const data=await response.json();
      setBanner(data)
    }
  }
  useEffect(()=>{
    fetchAllBanners()
  },[])
  return (
    <>
      <div onClick={closeCart} className="bg-[#F3F3F3] lg:mt-16 ">
        <Carousel autoplay effect="fade">
          {banner.map((img, index) => (
            <div key={index} className="relative w-full h-screen">
              <div
                className={`w-full h-full bg-cover bg-center flex items-center justify-start`}
                style={{ backgroundImage: `url(${
                  window.innerWidth < 1024 ? img.mobile_image : img.desktop_image
                })`, }}
              >
                <div
                  className={`text-white px-4`}
                >
                  <h3 className="uppercase  text-xl lg:text-4xl font-semibold mb-10 w-[600px]">
                    <span className="text-amber-500 text-lg ">
                      {img.title}
                    </span>
                    <br/>
                    <span>{img.description}</span>
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
