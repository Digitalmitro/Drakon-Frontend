import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Autoplay } from "swiper/modules";
import { useEffect } from "react";
import { useProduct } from "../context/ProductContext";
import img1 from "../assets/carousel/free-shipping.png"
import img2 from "../assets/carousel/credit.png"
import img3 from "../assets/carousel/return.png"
import img4 from "../assets/carousel/secure-wallet.png"
const GlassesSection = ({ closeCart, navigate }) => {
  const { getCategory } = useProduct();
  const [glassesBanner, setGlassesBanner] = useState([]);
  const [glassesProducts, setGlassesProducts] = useState([]);


  const allProductsByCategory=async()=>{
    const response=await getCategory()
    console.log("show all glasses products",response)
    setGlassesProducts(response)
  }
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
    allProductsByCategory();
  }, []);

  return (
    <div className="bg-[#F3F3F3]" onClick={closeCart}>
      <div className=" mx-auto pb-10">
        <h2 className="font-bold pb-4 text-4xl lg:text-5xl uppercase text-center">
          All Categories
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
          className="mt-10 lg:ml-8 mx-6 lg:mx-0"
        >
          {glassesProducts.map((e) => (
            <SwiperSlide key={e._id}>
              <div className="h-[450px]">
                <Link to={`/${e.description.toLowerCase()}`}>
                  <div className="shadow-lg lg:h-[350px] rounded   lg:w-[90%] flex flex-col justify-between gap-6 bg-white p-2 ">
                    <div className="flex justify-center lg:w-full">
                      <img
                        src={e.image}
                        className="object-cover h-[300px] w-[100%]"
                        alt="Product"
                      />
                    </div>
                    <div className=" h-full space-y-1 px-2">
                      <h3 className="font-semibold text-xl">
                        {e.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="bg-[#cacaca] lg:[200px] p-4 flex flex-col lg:flex-row justify-around">
        <div className="flex flex-col justify-center items-center">
          <img src={img1} alt="FREE SHIIPING" />
          <h3 className="font-bold">FREE SHIIPING</h3>
        </div>
        <div className="flex flex-col justify-center items-center">
          <img src={img2} alt="SAFE AND SECURE CHECKOUT" />
          <p className="font-bold">SAFE AND SECURE CHECKOUT</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <img src={img3} alt="EASY RETURN"/>
          <p className="font-bold">EASY RETURN</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <img src={img4} alt="BUY NOW, PAY OVER TIME" />
          <p className="font-bold">BUY NOW, PAY OVER TIME</p>
        </div>

      </div>
    </div>
  );
};

export default GlassesSection;
