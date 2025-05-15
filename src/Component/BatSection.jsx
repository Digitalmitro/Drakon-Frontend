import { Button } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Autoplay } from "swiper/modules";
import { Carousel } from "antd";
import { useEffect } from "react";
import { useProduct } from "../context/ProductContext";

const BatSection = ({ closeCart, navigate }) => {
  const { getAllCategoryBanner, getAllProductsByCategories } = useProduct();
  const [eqBanner, setEqBanner] = useState([]);
  const [eqProducts, setEqProducts] = useState([]);
  const fetchAllGlassesBanner = async () => {
    const response = await getAllCategoryBanner("Equipment");
    setEqBanner(response);
  };

  const allProductsByCategory = async () => {
    const response = await getAllProductsByCategories("Equipment");
    setEqProducts(response);
  };
  const getAllProducts = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API}/products`
    );
    if (response.ok) {
      const data = await response.json();
      // console.log("show all products", data);
      setGlass(data);
    }
  };
  useEffect(() => {
    getAllProducts();
    fetchAllGlassesBanner();
    allProductsByCategory();
  }, []);

  return (
    <div className="bg-[#F3F3F3]" onClick={closeCart}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-center lg:text-left ">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Our Products: Get Set Shop
        </h2>
        <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto mb-6 text-justify">
          Drakon Sports Apparel is here to provide premium-quality athletic and
          lifestyle wear designed for durability, performance, and modern style.
          Our products are crafted for fitness enthusiasts, athletes, and
          everyday movers. Our apparel is built to help you feel, look, and
          perform your best—whether it is on or off the field. Here is our
          product list:
        </p>
        <ul className="list-disc text-left text-lg text-gray-800 max-w-2xl mx-auto pl-6">
          <li className="mb-2">Performance Apparel</li>
          <li className="mb-2">Athleisure & Accessories</li>
          <li className="mb-2">Custom Team Apparel</li>
        </ul>
      </div>

      <div className=" mx-auto pb-10">
        <h2 className="font-bold text-4xl  uppercase text-center">
          SHOP THE GAME’S EQUIPMENTS
        </h2>

        <Carousel autoplay effect="fade">
          {eqBanner.map((ban, i) => (
            <div className="py-8 relative" key={i}>
              <div className="hidden sm:block relative">
                <img
                  src={ban?.desktop_image}
                  alt="Large Banner"
                  className="w-full object-cover"
                />

                <div className="absolute inset-0 flex flex-col justify-center items-start px-6 text-white bg-black/20">
                  <div className="lg:w-[500px]">
                    <p className="text-2xl font-semibold">
                      Shop top-quality game equipment for peak performance
                    </p>
                  </div>
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
                </div>
              </div>
            </div>
          ))}
        </Carousel>
        <Swiper
          slidesPerView={4}
          loop={true}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Autoplay]}
          breakpoints={{
            1024: { slidesPerView: 4 },
            600: { slidesPerView: 2 },
            375: { slidesPerView: 1 },
          }}
          className="mt-10 lg:ml-8 mx-6 lg:mx-0"
        >
          {eqProducts?.map((e) => (
            <SwiperSlide key={e._id}>
              <div className="lg:h-[500px] h-[420px]">
                <Link to={`/productDetails/${e._id}`}>
                  <div className="shadow-lg lg:h-[410px] h-[370px] rounded w-full  lg:w-[380px] bg-white flex flex-col justify-between gap-6 p-1">
                    <div className="flex justify-center lg:w-full bg-[#dddfe0]">
                      <img
                        src={e.image?.[0]}
                        className="object-contain h-[280px] lg:h-[323px] w-[100%]"
                        alt="Product"
                      />
                    </div>
                    <div className=" h-full space-y-1 px-2">
                      <h3 className="font-semibold text-xl">
                        {/* {e.description.length > 30
                       ? `${e.description.slice(0, 30)}...`
                       : e.description} */}
                        {e.title}
                      </h3>
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

export default BatSection;
