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

const Accessories = ({ closeCart, navigate }) => {
  const { getAllCategoryBanner, getAllProductsByCategories } = useProduct();
  const [accessBanner, setAccessBanner] = useState([]);
  const [accessProducts, setAccessProducts] = useState([]);
  const fetchAllGlassesBanner = async () => {
    const response = await getAllCategoryBanner("Accessories");
    // console.log("all gloves banner", response);
    setAccessBanner(response);
  };

  const allProductsByCategory = async () => {
    const response = await getAllProductsByCategories("Accessories");
    console.log("show all glasses products", response);
    setAccessProducts(response);
  };

  useEffect(() => {
    fetchAllGlassesBanner();
    allProductsByCategory();
  }, []);

  return (
    <div className="bg-[#F3F3F3]" onClick={closeCart}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-28 text-center lg:text-left">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Who Do We Serve?
        </h2>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto mb-6 text-justify">
          At Drakon Sports Apparel, we proudly serve a diverse community of
          sports lovers, athletes, enthusiasts, and teams who demand
          performance, quality, and comfort. Whether you're a professional
          athlete or a weekend warrior, our products are built to gear you up
          for any sport you love. Our apparel and gear are designed to meet the
          needs of:
        </p>
        <ul className="list-disc text-left text-lg text-gray-800 max-w-3xl mx-auto pl-6 space-y-3">
          <li>
            <strong className="text-orange-600">Fitness enthusiasts and active individuals</strong> who
            value comfort and performance.
          </li>
          <li>
            <strong className="text-orange-600">Coaches and sports academies</strong> seeking durable,
            high-quality training equipment.
          </li>
          <li>
            <strong className="text-orange-600">Teams and schools</strong> looking for customized uniforms
            and branded sportswear.
          </li>
          <li>
            <strong className="text-orange-600">Customers across the United States</strong> in search of
            authentic and dependable sports gear.
          </li>
        </ul>
      </div>

      <div className=" mx-auto pb-10">
        <h2 className="font-bold text-4xl  uppercase text-center">
          SHOP THE GAME’S ACCESSORIES
        </h2>

        <Carousel autoplay effect="fade">
          {accessBanner.map((ban, i) => (
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
                      Shop premium game accessories for peak performance
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
          {accessProducts?.map((e) => (
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

export default Accessories;
