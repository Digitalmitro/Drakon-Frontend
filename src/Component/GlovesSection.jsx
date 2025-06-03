import { Button } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Autoplay } from "swiper/modules";
import { Carousel, message } from "antd";

import { useEffect } from "react";
import { useProduct } from "../context/ProductContext";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { addItem } from "../Redux/CartSlice";
import axios from "axios";
import Cookies from "js-cookie";

const GlovesSection = ({ closeCart }) => {
  const { getAllCategoryBanner, getAllProductsByCategories } = useProduct();
  const [glovesBanner, setGlovesBanner] = useState([]);
  const [glovesProducts, setGlovesProducts] = useState([]);
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const decodedToken = token && jwtDecode(token);
  const user_id = decodedToken?._id;
  const navigate = useNavigate();
  const fetchAllGlovesBanner = async () => {
    const response = await getAllCategoryBanner("Batting Gloves");
    // console.log("all gloves banner", response);
    setGlovesBanner(response);
  };
  const allProductsByCategory = async () => {
    const response = await getAllProductsByCategories("Batting Gloves");
    console.log("show all gloves products", response);
    setGlovesProducts(response);
  };
  const [glass, setGlass] = useState([]);
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
    fetchAllGlovesBanner();
    allProductsByCategory();
  }, []);
  const handleCart = async (id) => {

    console.log("handleCart called");
    const topProduct = glovesProducts.find((item) => item._id === id);

    if (!topProduct) {
      console.error("Product not found");
      return;
    }

    // item shape for both guest & logged-in
    const cartItem = {
      productId: {
        _id: topProduct._id,
        title: topProduct.title,
        price: topProduct.price,
        image: topProduct.image,
        stock: topProduct.stock,
      },
      quantity: 1,
      total: topProduct.price * 1,
    };

    if (user_id) {
      // logged-in: hit server
      dispatch(addItem(topProduct));
      try {
        await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/add`, {
          image: topProduct.image,
          title: topProduct.title,
          price: topProduct.price,
          quantity: 1,
          productId: topProduct._id,
          userId: user_id,
        });
        message.success("Added to Cart");
        setTimeout(() => navigate("/cart"), 500);
      } catch (error) {
        console.error(error);
        message.error("Cart item not added");
      }
    } else {
      // guest: write to localStorage
      const guestCart = JSON.parse(localStorage.getItem("guest_cart") || "[]");
      const existing = guestCart.find((i) => i.productId._id === topProduct._id);
      if (existing) {
        existing.quantity += 1;
        existing.total = existing.quantity * topProduct.price;
      } else {
        guestCart.push(cartItem);
      }
      localStorage.setItem("guest_cart", JSON.stringify(guestCart));
      message.success("Added to Cart");
      setTimeout(() => navigate("/cart"), 500);
    }
  };
  return (
    <div className="bg-[#fcf7f7]" onClick={closeCart}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-center lg:text-left">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
          We Are Drakon Sports Apparel
        </h2>
        <p className="text-lg md:text-xl text-gray-900 leading-relaxed max-w-4xl mx-auto text-justify">
          Drakon Sports Apparel is more than just a sportswear brand—it's a team
          of experts driven by passion, performance, and purpose. Our vision is
          clear: we are here to empower sports enthusiasts at every level.
          Specializing in high-quality sports apparel, Drakon provides premium
          sports apparel and necessities. Trusted by athletes and baseball
          enthusiasts across the U.S., we serve products with premium quality,
          effective reliability, excellence, and an unwavering commitment to
          quality.
        </p>
      </div>

      <div className=" mx-auto pb-10">
        <h2 className="font-bold pb-2  text-3xl md:text-4xl uppercase text-center px-0.5">
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
                  <div className="lg:w-[600px] text-justify">
                    <p className="text-2xl ">
                      Grip with Power. Swing with Precision. Premium leather.
                      Maximum comfort. Game-changing contro
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
        <div className="mx-auto py-10">


          {glovesProducts?.length > 0 ? (
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
              {glovesProducts.map((e) => (
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
                        <button className="bg-[#0f172a] text-white text-lg font-medium py-2 px-2 rounded w-full hover:bg-[#1e293b] transition" onClick={() => handleCart(e._id)}>
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
            <div className="text-center py-10">Loading gloves...</div>
          )}
        </div>

      </div>
    </div>
  );
};

export default GlovesSection;
