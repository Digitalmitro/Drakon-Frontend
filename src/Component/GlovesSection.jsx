import { Button } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Autoplay } from "swiper/modules";
import { Carousel } from "antd";
import glassbanner from "../assets/carousel/glass_banner/SUNGLASS.jpg";
import glassbannerMobile from "../assets/carousel/glass_banner/Sunglass_Mobile.jpg";

import { useEffect } from "react";
import { useProduct } from "../context/ProductContext";

const topCatBanner = [
  {
    desktop_image: glassbanner,
    mobile_image: glassbannerMobile,
  },
];

const GlovesSection = ({ closeCart, navigate }) => {
  const { getAllCategoryBanner } = useProduct();
  const [glovesBanner, setGlovesBanner] = useState([]);
  const fetchAllGlovesBanner = async () => {
    const response = await getAllCategoryBanner("Batting Gloves");
      console.log("all gloves banner", response);
      setGlovesBanner(response);
    
  };
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
    fetchAllGlovesBanner();
  }, []);

  return (
    <div className="bg-[#F3F3F3]" onClick={closeCart}>
      <div className=" mx-auto pb-40">
        <h2 className="font-bold pb-4 text-4xl lg:text-5xl uppercase text-center px-0.5">
          Drakon Sports Leather Batting Gloves
        </h2>

        <Carousel autoplay effect="fade">
          {glovesBanner.map((ban, i) => (
            <div className="py-8 relative" key={i}>
              <div className="hidden sm:block relative">
                <img
                  src={ban?.desktop_image}
                  alt="Large Banner"
                  className="w-full object-cover"
                />

                <div className="absolute inset-0 flex flex-col justify-center items-start px-6 text-white bg-black/20">
                  <p className="text-2xl font-semibold">
                    VIEW ALL TOP CATEGORY PRODUCTS
                  </p>
                  <button className="mt-4 font-medium text-[18px] bg-[#ff5B00] text-white px-6 py-2 rounded-full hover:bg-orange-600 transition">
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
          ))}
        </Carousel>
        <Swiper
          slidesPerView={3}
          spaceBetween={20}
          loop={true}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Autoplay]}
          breakpoints={{
            1024: { slidesPerView: 3 },
            600: { slidesPerView: 2 },
            375: { slidesPerView: 1 },
          }}
          className="mt-10 lg:ml-20 mx-6 lg:mx-0"
        >
          {glass.map((e) => (
            <SwiperSlide key={e._id}>
              <div className="h-[420px]">
                <Link to={`/productDetails/${e._id}`}>
                  <div className="shadow-lg lg:h-[350px] rounded lg:w-[80%] flex flex-col justify-between gap-6 bg-white p-2 ">
                    <div className="flex justify-center lg:w-full bg-[#dddfe0]">
                      <img
                        src={e.image?.[0]}
                        className="object-contain h-[250px] w-[100%]"
                        alt="Product"
                      />
                    </div>
                    <div className=" h-full space-y-1 px-2">
                      <h3 className="font-semibold text-xl">{e.description.length > 25
                          ? `${e.description.slice(0, 35)}...`
                          : e.description}</h3>
                      <h4 className="text-[#959595] font-bold text-2xl">
                        $ {e.price}
                      </h4>
                    </div>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default GlovesSection;
