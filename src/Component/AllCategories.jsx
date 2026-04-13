import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Autoplay } from "swiper/modules";
import { useProduct } from "../context/ProductContext";
import img1 from "../assets/carousel/free-shipping.png";
import img2 from "../assets/carousel/credit.png";
import img3 from "../assets/carousel/return.png";
import img4 from "../assets/carousel/secure-wallet.png";
import equipmentImage from "../assets/equipment.jpeg";
import { fetchFirstCmsEntry } from "../utils/cmsApi";
// Initialize Swiper modules
SwiperCore.use([Autoplay, Pagination]);
const equimpentImageWhichNeedsToBeReplaced = "https://res.cloudinary.com/dinitjlyf/image/upload/v1742466472/product-images/kro5rigxbt5lydkwmftm.jpg";

const GlassesSection = ({ closeCart, navigate }) => {
  const { getCategory } = useProduct();
  const [glassesProducts, setGlassesProducts] = useState([]);
  const [homeCms, setHomeCms] = useState({
    promoSection: {
      title: "",
      description1: "",
      description2: "",
      buttonText: "",
      buttonUrl: "",
    },
  });
  const swiperRef = useRef(null);

  const allProductsByCategory = async () => {
    const response = await getCategory();
    console.log("show all glasses products", response);
    setGlassesProducts(response);
  };
  const loadHomeCms = async () => {
    try {
      const homeEntry = await fetchFirstCmsEntry("home");
      if (homeEntry?.promoSection) {
        setHomeCms((prev) => ({
          ...prev,
          promoSection: {
            ...prev.promoSection,
            ...homeEntry.promoSection,
          },
        }));
      }
    } catch (error) {
      console.error("Failed to load Home CMS:", error);
    }
  };

  useEffect(() => {
    allProductsByCategory();
    loadHomeCms();
  }, []);

  useEffect(() => {
    // Start autoplay when glassesProducts is loaded and swiper is ready
    if (
      swiperRef.current &&
      swiperRef.current.swiper &&
      glassesProducts.length > 0
    ) {
      swiperRef.current.swiper.autoplay.start();
    }
  }, [glassesProducts]);

  const promoSection = homeCms.promoSection || {};
  const hasPromoContent = Boolean(
    promoSection.title ||
      promoSection.description1 ||
      promoSection.description2 ||
      promoSection.buttonText
  );

  return (
    <div className="bg-[#fcf7f7]" onClick={closeCart}>
      <div className=" mx-auto pb-10">
        <h2 className="font-bold pb-4 text-4xl lg:text-5xl uppercase text-center">
          All Categories
        </h2>

        {glassesProducts.length > 0 ? (
          <Swiper
            ref={swiperRef}
            slidesPerView={4}
            loop={true}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }}
            modules={[Pagination, Autoplay]}
            breakpoints={{
              1024: { slidesPerView: 4 },
              600: { slidesPerView: 2 },
              200: { slidesPerView: 1 },
            }}
            className="mt-10 lg:ml-8 mx-6 lg:mx-0"
            onInit={(swiper) => {
              swiper.autoplay.start();
            }}
          >
            {glassesProducts.map((e) => (
              <SwiperSlide key={e._id}>
                <div className="h-[450px]">
                  <Link to={`/${e.description.toLowerCase()}`}>
                    <div className="shadow-lg lg:h-[350px] rounded lg:w-[90%] flex flex-col justify-between gap-6 bg-white p-2 pb-4">
                      <div className="flex justify-center lg:w-full">
                        <img
                          src={e.image.trim() === equimpentImageWhichNeedsToBeReplaced.trim() ?  equipmentImage : e.image}
                          className="object-cover h-[300px] w-[100%]"
                          alt="Product"
                        />
                      </div>
                      <div className=" h-full space-y-1 px-2">
                        <h3 className="font-semibold text-xl">{e.title}</h3>
                      </div>
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="text-center py-10">Loading categories...</div>
        )}
      </div>
      {hasPromoContent ? (
        <div className="bg-[#fcf7f7] py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            {promoSection.title ? (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {promoSection.title}
              </h2>
            ) : null}

            {promoSection.description1 ? (
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-4 text-justify">
                {promoSection.description1}
              </p>
            ) : null}

            {promoSection.description2 ? (
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-4 text-justify">
                {promoSection.description2}
              </p>
            ) : null}

            {promoSection.buttonText ? (
              <div className="mt-8">
                <a
                  href={promoSection.buttonUrl || "/contact"}
                  className="inline-block bg-orange-600 text-white font-semibold text-base md:text-lg py-3 px-6 rounded-full shadow hover:bg-orange-700 transition duration-300"
                >
                  {promoSection.buttonText}
                </a>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

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
          <img src={img3} alt="EASY RETURN" />
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
