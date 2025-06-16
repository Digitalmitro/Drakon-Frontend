import React from "react";
import logoFooter from "../assets/logo-footer.png";
import fbFooter from "../assets/fb-footer.png";
import twitterFooter from "../assets/twitter-footer.png";
import igFooter from "../assets/insta-footer.png";
import linkedFooter from "../assets/linkedin-footer.png";
import phone from "../assets/phone-telephone.png";
import mail from "../assets/mail.png";
import locationFooter from "../assets/location-footer.png";
import { useMediaQuery } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { IoLogoYoutube } from "react-icons/io5";
import { FaPinterest } from "react-icons/fa6";
const Footer = ({ closeCart }) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:900px)");
  return (
    <div
      onClick={closeCart}
      className="bg-black lg:h-[550px]"
      style={{ zoom: isMobile ? "0.7" : "" }}
    >
      <div className="footer container mx-auto py-10">
        <div className="flex wrapper lg:items-center sm:items-start  lg:p-0 h-full">
          <div className="lg:grid  wrapped grid-cols-4 justify-items-center lg:text-left">
            <div className="flex flex-col banner items-center lg:items-start gap-6 mb-5 lg:mb-0">
              <div className="logo">
                <img src={logoFooter} alt="" />
              </div>
              <p className="text-white text-xl leading-9">
                Explore our e-commerce site for a range of sports gear,
                including t-shirts, glasses, elbow guards, and hoodies. Shop
                now!
              </p>
              <div className="flex py-3 gap-3 text-[#ff5B00]">
                <Link to={"https://www.facebook.com/drakonsportsapparel/"}>
                  <img src={fbFooter} alt="" />
                </Link>
                <Link to={"https://x.com/drakonsports_a"}>
                  <img src={twitterFooter} alt="" />
                </Link>
                <Link
                  to={"https://www.linkedin.com/company/drakon-sports-apparel/"}
                >
                  <img src={linkedFooter} alt="" />
                </Link>
                <Link to={"https://www.instagram.com/drakon_sports_apparel/"}>
                  <img src={igFooter} alt="" />
                </Link>
                <Link to={"https://www.youtube.com/@drakonsportsapparel"}>
                  <div className="w-[32px] h-[30px] rounded bg-[#f5743b] flex items-center justify-center">
                    <IoLogoYoutube className="text-white text-[18px]" />
                  </div>
                </Link>
                <Link to={"https://www.pinterest.com/drakonsportsapparel/"}>
                <div className="w-[32px] h-[30px] rounded bg-[#f5743b] flex items-center justify-center">
                    <FaPinterest className="text-white text-[18px]" />
                  </div>
                </Link>
              </div>
            </div>
            <div className="flex py-5 px-10 flex-col banner items-center lg:items-start gap-2 text-white mb-5 lg:mb-0 ">
              <h3 className="text-2xl font-bold">Category</h3>
              <hr className="border-red-500 w-36 mb-4" />
              <ul className="flex flex-col gap-7 text-2xl lg:text-xl cursor-pointer">
                <li onClick={() => navigate("/sunglasses")}>Sunglasses</li>
                <li onClick={() => navigate("/batting-gloves")}>
                  Batting gloves
                </li>
                <li onClick={() => navigate("/equipment")}>Equipment</li>
                <li onClick={() => navigate("/accessories")}>Accessories</li>
                <li onClick={() => navigate("/apparel")}>Apparel</li>
              </ul>
            </div>
            <div className="flex flex-col px-10 items-center banner lg:items-start gap-2 py-5 text-white mb-5 lg:mb-0">
              <h3 className="text-2xl font-bold">Useful Links</h3>
              <hr className="border-red-500 w-36 mb-4" />
              <ul className="flex flex-col gap-7 text-xl cursor-pointer">
                <li onClick={() => navigate("/termscondition")}>
                  Terms and Conditions
                </li>
                <li onClick={() => navigate("/privacypolicy")}>
                  Privacy Policy
                </li>
                <li onClick={() => navigate("/shippingpolicy")}>
                  Shipping Policy
                </li>
                <li onClick={() => navigate("/returnrefund")}>
                  Return and Refund
                </li>
                <li onClick={() => navigate("/faq")}>FAQ</li>
              </ul>
            </div>
            <div className="flex flex-col contact px-10 lg:px-0 items-center lg:items-start gap-2 py-5 text-white">
              <h3 className="text-2xl font-bold">Contact</h3>
              <hr className="border-red-500 w-36 mb-4" />
              <ul className="flex flex-col  contact items-center lg:items-start gap-7 text-xl">
                <li className="flex items-center gap-6">
                  <img src={phone} alt="" className="object-cover w-10" />
                  <p>+1 858-997-3098</p>
                </li>
                <li className="flex  items-center gap-5">
                  <img src={mail} alt="" className="object-cover w-8" />
                  <p>info@drakon-sports.com</p>
                </li>
                <li className="flex items-center  gap-5">
                  <img
                    src={locationFooter}
                    alt=""
                    className="object-cover w-10 py-3"
                  />
                  <p className="">2001 Timberloch Pl The Woodlands TX 77380</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* <hr className="my-5" /> */}
        <p className="text-white text-center ">
          Designed and developed by{" "}
          <a
            href="https://digitalmitro.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-100 underline"
          >
            Digital Mitro
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
