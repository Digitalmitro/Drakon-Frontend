import { Button } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

import glass1 from "../assets/glasses/glass1.jpg";
import glass2 from "../assets/glasses/glass2.jpg";
import glass3 from "../assets/glasses/glass3.jpg";
import glass4 from "../assets/glasses/glass4.jpg";
import { useEffect } from "react";
const glassesProduct = [
  {
    img: glass1,
    title: "Blue glasses",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    price: "99",
    id: 1,
  },
  {
    img: glass2,
    title: "Pink glasses",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    price: "150",
    id: 2,
  },
  {
    img: glass3,
    title: "Black glasses",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    price: "122",
    id: 3,
  },
];
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
          Featured Products
        </h2>

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
          className="mt-10 lg:ml-20"
        >
          {glass.map((e) => (
            <SwiperSlide key={e._id}>
              <Link to={`/productDetails/${e._id}`}>
                <div className="shadow-lg lg:h-[520px] rounded lg:w-[400px] flex flex-col justify-between items-center gap-6 bg-white p-2 ">
                  <div className="flex justify-center">
                    <img
                      src={e.image?.[0]}
                      className="object-contain w-1/2 lg:w-full lg:h-[250px]"
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
                    <div className="flex justify-center lg:w-[300px]">
                      <Button
                        sx={{
                          borderRadius: "100vw",
                          paddingY: "10px",
                          fontSize: "1rem",
                          width: "80%",
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
