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

const Apparel = ({ closeCart, navigate }) => {
  const [glass, setGlass] = useState([]);
  const { getAllCategoryBanner, getAllProductsByCategories } = useProduct();
  const [apparelBanner, setApparelBanner] = useState([]);
  const [apparelProducts, setApparelProducts] = useState([]);
  const fetchAllGlassesBanner = async () => {
    const response = await getAllCategoryBanner("Apparel");
    // console.log("all gloves banner", response);
    setApparelBanner(response);
  };
  const allProductsByCategory = async () => {
    const response = await getAllProductsByCategories("Apparel");
    setApparelProducts(response);
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="text-center lg:text-left mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Why Choose Us?
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto lg:mx-0 text-justify">
            Drakon Sports Apparel believes that your gear should work as hard as
            you do. Our mission is to go beyond making clothes—we create
            performance-driven apparel that supports your lifestyle, fuels your
            goals, and helps you stand out with confidence. Here's what sets us
            apart:
          </p>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-orange-600 mb-2">
              🇺🇸 U.S.-Based, Athlete-Focused
            </h3>
            <p className="text-gray-700 text-base leading-relaxed">
              Proudly based in the U.S., we deeply understand the needs of
              today’s athletes and fitness lovers—from gym-goers to pros. Our
              designs are inspired by real routines and real challenges.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-orange-600 mb-2">
              🧵 Premium-Quality Materials
            </h3>
            <p className="text-gray-700 text-base leading-relaxed">
              Each Drakon product is crafted with premium-grade, sweat-wicking,
              breathable, and quick-drying fabrics—built for endurance and
              high-intensity movement.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-orange-600 mb-2">
              🏃‍♂️ Built for Movement
            </h3>
            <p className="text-gray-700 text-base leading-relaxed">
              Functionality is at the core. Our apparel features ergonomic cuts
              and stretchable fabrics to provide unrestricted mobility so you
              stay focused on your performance.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-orange-600 mb-2">
              🎨 Sleek, Functional Design
            </h3>
            <p className="text-gray-700 text-base leading-relaxed">
              We merge athletic utility with minimalist aesthetics—bold
              branding, clean lines, and versatile color palettes to help you
              look sharp while you move with power.
            </p>
          </div>
        </div>
      </div>

      <div className=" mx-auto pb-10">
        <h2 className="font-bold text-4xl  uppercase text-center">
          SHOP THE GAME’S APPAREL
        </h2>

        <Carousel autoplay effect="fade">
          {apparelBanner.map((ban, i) => (
            <div className="py-8 relative" key={i}>
              <div className="hidden sm:block relative">
                <img
                  src={ban?.desktop_image}
                  alt="Large Banner"
                  className="w-full object-cover"
                />

                <div className="absolute inset-0 flex flex-col justify-center items-start px-6 text-white bg-black/30">
                  <div className="lg:w-[600px] text-justify">
                    <p className="text-2xl ">
                      Look Sharp. Play Hard. Live the Game. Performance wear
                      designed for true athletes — on and off the field.
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
          {apparelProducts?.map((e) => (
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

export default Apparel;
