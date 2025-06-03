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

const GlassesSection = ({ closeCart, navigate }) => {
  const { getAllCategoryBanner, getAllProductsByCategories } = useProduct();
  const [glassesBanner, setGlassesBanner] = useState([]);
  const [glassesProducts, setGlassesProducts] = useState([]);
  const fetchAllGlassesBanner = async () => {
    const response = await getAllCategoryBanner("Sunglasses");
    setGlassesBanner(response);
  };

  const allProductsByCategory = async () => {
    const response = await getAllProductsByCategories("Sunglasses");
    console.log("show all glasses products", response);
    setGlassesProducts(response);
  };
  const getAllProducts = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API}/products`
    );
    if (response.ok) {
      const data = await response.json();
      setGlass(data);
    }
  };
  useEffect(() => {
    getAllProducts();
    fetchAllGlassesBanner();
    allProductsByCategory();
  }, []);

  return (
    <div className="bg-[#fcf7f7]" onClick={closeCart}>
      <div className=" mx-auto pb-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:py-16 ">
          {/* Find Drakon */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Find Drakon
            </h2>
            <p className="text-lg md:text-xl text-gray-800 max-w-3xl mx-auto text-justify">
              We sell our products across the U.S. Regardless of your location,
              we are always here to help and get you the desired product. We
              have a team of expert and dedicated reps experienced in helping
              sports enthusiasts. With us, you will always stay a step ahead.
            </p>
          </div>
        </div>

        <h2 className="font-bold text-gray-800 pb-4 text-3xl uppercase text-center">
          Drakon Sports Performance Sunglasses
        </h2>

        <Carousel autoplay effect="fade">
          {glassesBanner.map((ban, i) => (
            <div className="py-8 relative" key={i}>
              <div className="hidden sm:block relative">
                <img
                  src={ban?.desktop_image}
                  alt="Large Banner"
                  className="w-full object-cover"
                />

                <div className="absolute inset-0 flex flex-col justify-center items-start px-6 text-white bg-black/20">
                  <div className="lg:w-[600px] text-justify">
                    <p className="text-2xl ">
                      Unleash Precision. Dominate Every Move. Engineered for
                      athletes. Built for endurance. Styled for winners.
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
                    Search for your go-to sports equipment and apparel. Browse
                    through Drakon’s catalogs and gear up your game.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
        <div className="mx-auto py-10">
          {glassesProducts?.length > 0 ? (
            <Swiper
              slidesPerView={4}
              loop={true}
              pagination={{ clickable: true }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                waitForTransition: true,
                pauseOnMouseEnter: true,
              }}
              modules={[Pagination, Autoplay]}
              breakpoints={{
                1024: { slidesPerView: 4 },
                600: { slidesPerView: 2 },
                375: { slidesPerView: 1 },
              }}
              className="mt-10 lg:pl-8 mx-6 lg:mx-0"
            >
              {glassesProducts.map((e) => (
                <SwiperSlide key={e._id}>
                  <div className="lg:h-[500px] h-[440px]">
                    <div className="shadow-lg rounded-lg w-full lg:w-[360px] bg-white flex flex-col justify-between p-2 hover:shadow-xl transition-all duration-300 relative">
                      {/* LIMITED Badge */}
                      <div className="absolute bg-zinc-800 text-white text-base font-bold px-2 py-1 rounded-md uppercase ml-4 mt-2 z-10">
                        LIMITED
                      </div>

                      {/* Product Image */}
                      <Link
                        to={`/productDetails/${e._id}`}
                        className="bg-[#dddfe0] rounded-md overflow-hidden flex justify-center items-center h-[240px] lg:h-[270px]"
                      >
                        <img
                          src={e.image?.[0]}
                          alt="Product"
                          className="object-contain h-full w-full"
                        />
                      </Link>

                      {/* Product Info */}
                      <div className="mt-4 px-1 flex flex-col gap-1">
                        <h3 className="font-semibold text-black text-[1.3rem] leading-tight">
                          {e.title}
                        </h3>
                        <h4 className="text-[#4b4b4b] font-bold text-[1.5rem]">
                          $ {e.price}
                        </h4>
                      </div>

                      {/* Buttons */}
                      <div className="flex mt-3 gap-2">
                        <button className="bg-[#0f172a] text-white text-lg font-medium py-2 px-2 rounded w-full hover:bg-[#1e293b] transition">
                          Add to cart
                        </button>
                        <Link
                          to={`/productDetails/${e._id}`}
                          className="bg-[#f97316] text-white text-lg font-medium py-2 lg:pl-8 pl-10 rounded w-full hover:bg-[#ea580c] transition"
                        >
                          QUICK VIEW
                        </Link>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="text-center py-10">Loading glasses...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GlassesSection;
