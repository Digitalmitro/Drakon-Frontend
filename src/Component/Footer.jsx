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

const Footer = ({ closeCart }) => {
  const isMobile = useMediaQuery("(max-width:900px)");
  return (
    <div
      onClick={closeCart}
      className="bg-black lg:h-[500px]"
      style={{ zoom: isMobile ? "0.7" : "" }}
    >
      <div className="container mx-auto py-10">
        <div className="flex items-center p-5 lg:p-0 h-full">
          <div className="lg:grid grid-cols-4 justify-items-center text-center lg:text-left">
            <div className="flex flex-col items-center lg:items-start gap-6 mb-5 lg:mb-0">
              <div>
                <img src={logoFooter} alt="" />
              </div>
              <p className="text-white text-xl leading-9">
                Explore our e-commerce site for a range of sports gear,
                including t-shirts, glasses, elbow guards, and hoodies. Shop
                now!
              </p>
              <div className="flex gap-6">
                <div>
                  <img src={fbFooter} alt="" />
                </div>
                <div>
                  <img src={twitterFooter} alt="" />
                </div>
                <div>
                  <img src={linkedFooter} alt="" />
                </div>
                <div>
                  <img src={igFooter} alt="" />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center lg:items-start gap-2 text-white mb-5 lg:mb-0">
              <h3 className="text-2xl font-bold">Services</h3>
              <hr className="border-red-500 w-36 mb-4" />
              <ul className="flex flex-col gap-7 text-xl">
                <li>Batting gloves</li>
                <li>Sliding mitt</li>
                <li>Elbow guard</li>
                <li>Headband</li>
              </ul>
            </div>
            <div className="flex flex-col items-center lg:items-start gap-2 text-white mb-5 lg:mb-0">
              <h3 className="text-2xl font-bold">Useful Links</h3>
              <hr className="border-red-500 w-36 mb-4" />
              <ul className="flex flex-col gap-7 text-xl">
                <li>Home</li>
                <li>About us</li>
                <li>Blog</li>
                <li>Contact Us</li>
              </ul>
            </div>
            <div className="flex flex-col items-center lg:items-start gap-2 text-white">
              <h3 className="text-2xl font-bold">Contact</h3>
              <hr className="border-red-500 w-36 mb-4" />
              <ul className="flex flex-col items-center lg:items-start gap-7 text-xl">
                <li className="flex items-center gap-5">
                  <img src={phone} alt="" className="object-cover w-10" />
                  <p>+1 405 638-5343</p>
                </li>
                <li className="flex items-center gap-5">
                  <img src={mail} alt="" className="object-cover w-8" />
                  <p>info@drakon-sports.com</p>
                </li>
                <li className="flex items-center gap-5">
                  <img
                    src={locationFooter}
                    alt=""
                    className="object-cover w-12"
                  />
                  <p>2919 nW Cache rd, lawton, oK 73505, United States</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-5" />
        <p className="text-white text-center">
          Copyright by SPORT APPAREL @ 2024. All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
