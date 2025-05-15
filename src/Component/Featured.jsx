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

const Featured = ({ closeCart, navigate }) => {
  const { getAllTopProducts } = useProduct();
  const [topProductBanner, setTopProductBanner] = useState([]);
  const fetchAllGlassesBanner = async () => {
    const response = await getAllTopProducts();
    console.log("all products", response);
    setTopProductBanner(response);
  };
  useEffect(() => {
    fetchAllGlassesBanner();
  }, []);

  return (
    <div className="bg-[#F3F3F3]" onClick={closeCart}>
      <div className="max-w-6xl mx-auto text-center px-4 py-12">
        <h2 className="text-4xl  font-bold text-gray-900 mb-6 leading-tight">
          Order Top-Quality Baseball Equipment
          <br />
          <span className="text-orange-600 mt-2">It's Time to Win</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          In search of quality baseball apparel and equipment? You are at the
          right baseball gear shop—
          <span className="font-semibold text-gray-900">
            buy baseball clothing online with Drakon Sports Apparel
          </span>
          . We’ve got everything for the sport you support.
        </p>
      </div>
      <div className=" mx-auto py-10">
        <h2 className="font-bold text-4xl lg:text-4xl uppercase text-center">
          Top Products
        </h2>

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
          className="mt-10 lg:pl-8 mx-6 lg:mx-0"
        >
          {topProductBanner?.map((e) => (
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

export default Featured;
