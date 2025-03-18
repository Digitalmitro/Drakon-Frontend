import { Button } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { Carousel } from "antd";
import glassbanner from "../assets/carousel/glass_banner/SUNGLASS.jpg";
import glassbannerMobile from "../assets/carousel/glass_banner/Sunglass_Mobile.jpg";
import batBanner from "../assets/carousel/bat_banner/Baseball-Bat.jpg";
import batMobileBanner from "../assets/carousel/bat_banner/Baseball_Bat_Mobile.jpg";
import { useEffect } from "react";

const topCatBanner=[
  {
    desktop_image:glassbanner,
    mobile_image:glassbannerMobile,
  },
  {
    desktop_image:batBanner,
    mobile_image:batMobileBanner,
  }
]

const Featured = ({ closeCart, navigate }) => {
  const [glass, setGlass] = useState([]);
  const getAllProducts = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API}/products`
    );
    if (response.ok) {
      const data = await response.json();
      console.log("show all products", data);
      setGlass(data);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="bg-[#F3F3F3]" onClick={closeCart}>
      <div className=" mx-auto py-40">
        <h2 className="font-bold text-4xl lg:text-5xl uppercase text-center">
          Top Products
        </h2>

        <Carousel autoplay effect="fade">
        {
          topCatBanner.map((ban,i)=>(
            <div className="py-8 relative" key={i}>
          
          <div className="hidden sm:block relative">
            <img
              src={ban?.desktop_image}
              alt="Large Banner"
              className="w-full object-cover"
            />
           
            <div className="absolute inset-0 flex flex-col justify-center items-start px-6 text-white bg-black/10">
              <p className="text-2xl font-semibold">
                VIEW ALL TOP CATEGORY PRODUCTS
              </p>
              <button className="mt-4  bg-[#ff5B00] text-white px-6 py-2 rounded-full hover:bg-orange-600 transition">
                View
              </button>
            </div>
          </div>

      
          <div className="block sm:hidden relative ">
            <img
              src={ban?.mobile_image}
              alt="Small Banner"
              className="w-full h-[500px]"
            />
    
            <div className="absolute inset-0 flex flex-col pt-20 items-center text-white bg-black/50">
              <p className="text-lg font-semibold text-center">
                VIEW ALL TOP CATEGORY PRODUCTS
              </p>
              <button className="mt-2 bg-[#ff5B00] text-white px-4 py-2 rounded-full hover:bg-orange-600 transition">
                View
              </button>
            </div>
          </div>
        </div>
          ))
        }
        </Carousel>
        <Swiper
          slidesPerView={3}
          spaceBetween={20}
          loop={true}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Pagination, Navigation]}
          breakpoints={{
            1024: { slidesPerView: 3 },
            600: { slidesPerView: 2 },
            375: { slidesPerView: 1 },
          }}
          className="mt-10 lg:ml-20 mx-6 lg:mx-0"
        >
          {glass.map((e) => (
            <SwiperSlide key={e._id}>
              <Link to={`/productDetails/${e._id}`}>
                <div className="shadow-lg lg:h-[520px] rounded lg:w-[400px] flex flex-col justify-between items-center gap-6 bg-white p-2 ">
                  <div className="flex justify-center">
                    <img
                      src={e.image?.[0]}
                      className="object-cover lg:h-[250px]"
                      alt="Product"
                    />
                  </div>
                  <div className="p-10 h-full space-y-4">
                    <h3 className="font-semibold text-xl text-center lg:h-[60px]">
                      {e.description.length > 60
                        ? `${e.description.slice(0, 55)}...`
                        : e.description}
                    </h3>
                    <h4 className="text-[#959595] font-bold text-2xl text-center">
                      $ {e.price}
                    </h4>
                    <div className="flex justify-center items-center w-[300px] px-20 lg:px-0">
                      <Button
                        sx={{
                          borderRadius: "100vw",
                          paddingY: "10px",
                          fontSize: "1rem",
                          width: "100%",
                          backgroundColor: "#ff5B00",
                          "&:hover": { backgroundColor: "#ff0024" },
                        }}
                        variant="contained"
                        onClick={() => navigate(`/checkout/${e.id}`)}
                      >
                        Buy now
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Featured;
