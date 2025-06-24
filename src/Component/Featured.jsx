import { Button } from "@mui/material";
import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";
import { Carousel, message } from "antd";
import { useProduct } from "../context/ProductContext";
import { addItem } from "../Redux/CartSlice";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import axios from "axios";

// Initialize Swiper modules
SwiperCore.use([Autoplay, Pagination]);

const Featured = ({ closeCart }) => {
  const { getAllTopProducts } = useProduct();
  const [topProductBanner, setTopProductBanner] = useState([]);
  const swiperRef = useRef(null);
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const decodedToken = token && jwtDecode(token);
  const user_id = decodedToken?._id;
  const navigate = useNavigate();

  const fetchAllGlassesBanner = async () => {
    const response = await getAllTopProducts();
    setTopProductBanner(response);
  };

  useEffect(() => {
    fetchAllGlassesBanner();
  }, []);

  useEffect(() => {
    // Start autoplay when topProductBanner is loaded and swiper is ready
    if (
      swiperRef.current &&
      swiperRef.current.swiper &&
      topProductBanner.length > 0
    ) {
      swiperRef.current.swiper.autoplay.start();
    }
  }, [topProductBanner]);

  const handleCart = async (id) => {

    console.log("handleCart called");
    const topProduct = topProductBanner.find((item) => item._id === id);

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
  console.log(topProductBanner);

  return (
    <div className="bg-[#fcf7f7]" onClick={closeCart}>
      <div className="max-w-6xl mx-auto text-center px-4 py-12">
        <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Order Top-Quality Baseball Equipment
          <br />
          <span className="text-orange-600 mt-2">It's Time to Win</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-800 max-w-3xl mx-auto leading-relaxed">
          In search of quality baseball apparel and equipment? You are at the
          right baseball gear shop—
          <span className="font-semibold text-gray-900">
            buy baseball clothing online with Drakon Sports Apparel
          </span>
          . We've got everything for the sport you support.
        </p>
      </div>
      <div className="mx-auto py-10">
        <h2 className="font-bold text-4xl md:text-6xl text-gray-900 lg:text-4xl uppercase text-center">
          Top Products
        </h2>

        {topProductBanner.length > 0 ? (
          <Swiper
            ref={swiperRef}
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
              200: { slidesPerView: 1 },
            }}
            className="mt-10 lg:pl-8 mx-6 lg:mx-0"
            onInit={(swiper) => {
              swiper.autoplay.start();
            }}
          >
            {topProductBanner.map((e) => (
              <SwiperSlide key={e._id}>
                <div className="lg:h-[500px] h-[440px]">
                  <div className="shadow-lg rounded-lg w-full lg:w-[360px] bg-white flex flex-col justify-between p-2 hover:shadow-xl transition-all duration-300">
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
                      <Link
                        to={`/productDetails/${e._id}`}
                        className=""
                      >
                        <h3 className="font-semibold text-black text-[1.3rem] leading-tight">
                          {e.title}
                        </h3>
                      </Link>
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
          <div className="text-center py-10">Loading products...</div>
        )}
      </div>
    </div>
  );
};

export default Featured;
