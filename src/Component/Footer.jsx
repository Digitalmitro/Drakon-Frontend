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
              <div className="flex py-3 gap-6">
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
            <div className="flex py-5 flex-col banner items-center lg:items-start gap-2 text-white mb-5 lg:mb-0">
              <h3 className="text-2xl font-bold">Services</h3>
              <hr className="border-red-500 w-36 mb-4" />
              <ul className="flex flex-col gap-7 text-xl">
                <li>Batting gloves</li>
                <li>Sliding mitt</li>
                <li>Elbow guard</li>
                <li>Headband</li>
              </ul>
            </div>
            <div className="flex flex-col items-center lg:items-start gap-2 py-5 text-white mb-5 lg:mb-0">
              <h3 className="text-2xl font-bold">Useful Links</h3>
              <hr className="border-red-500 w-36 mb-4" />
              <ul className="flex flex-col gap-7 text-xl">
                <li>Home</li>
                <li>About us</li>
                <li>Blog</li>
                <li>Contact Us</li>
              </ul>
            </div>
            <div className="flex flex-col contact items-center lg:items-start gap-2 py-5 text-white">
              <h3 className="text-2xl  font-bold">Contact</h3>
              <hr className="border-red-500 w-36 mb-4" />
              <ul className="flex flex-col  contact items-center lg:items-start gap-7 text-xl">
                <li className="flex items-center gap-5">
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
