import React, { useState, useEffect } from "react";
import "../Components/styles/home.css";

import AOS from "aos";
import "aos/dist/aos.css";

import crousal1 from "../assets/crousal-1.jpg";
import crousal2 from "../assets/crousal-2.webp";
import crousal3 from "../assets/crousal-3.jpg";

import crousal5 from "../assets/crousal5.jpg";
import crousal6 from "../assets/crousal6.jpg";
import crousal7 from "../assets/crousal7.jpg";

import logo4remove from "../assets/logo4-remove.png";
import image5 from "../assets/image5.webp";

import league2 from "../assets/league2.webp";

import offer1 from "../assets/offer1.jpg";
import offer2 from "../assets/offer2.jpg";
import offer3 from "../assets/offer3.jpg";

import { Carousel } from "antd";
import ImageSlider from "./ImageSlider";

import Carousels from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { productData, responsive } from "./data";
import Products from "./Products.jsx";

import {
  productData2,
  productData3,
  productData4,
  productData5,
  productData6,
} from "./data";

import cat1 from "../assets/cat-1.jpg";
import cat2 from "../assets/cat-2.jpg";
import cat3 from "../assets/cat-3.jpg";
import cat4 from "../assets/cat-4.jpg";

import majorleague from "../assets/major-league.jpg";

import img5 from "../assets/img5.jpg";
import img6 from "../assets/img6.jpg";
import img7 from "../assets/img7.jpg";
import img8 from "../assets/img8.jpg";

import demoimg from "../assets/demo-img.jpg";

import ProductBtn from "./ProductBtn.jsx";
import Footer from "./Footer.jsx";
import Layout from "./Layout.jsx";
import { Navigate, useNavigate } from "react-router-dom";

const contentStyle = {
  height: "105vh",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#222",
  width: "100%",
};

const Home = () => {

  const navigate = useNavigate()
  const product = productData.map((item) => (
    <Products
      name={item.name}
      url={item.imageurl}
      price={item.price}
      description={item.description}
      data-aos="fade-up"
      data-aos-delay="200"
      data-aos-duration="2000"
    />
  ));
  const product2 = productData2.map((item) => (
    <Products
      name={item.name}
      url={item.imageurl}
      price={item.price}
      description={item.description}
      data-aos="fade-up"
      data-aos-delay="400"
      data-aos-duration="2000"
    />
  ));

  const product3 = productData3.map((item) => (
    <Products
      name={item.name}
      url={item.imageurl}
      price={item.price}
      description={item.description}
      data-aos="fade-up"
      data-aos-delay="600"
      data-aos-duration="2000"
    />
  ));

  const product4 = productData4.map((item) => (
    <Products
      name={item.name}
      url={item.imageurl}
      price={item.price}
      description={item.description}
      data-aos="fade-up"
      data-aos-delay="800"
      data-aos-duration="2000"
    />
  ));

  const product5 = productData5.map((item) => (
    <ProductBtn
      name={item.name}
      url={item.imageurl}
      price={item.price}
      description={item.description}
      data-aos="fade-up"
      data-aos-delay="400"
      data-aos-duration="2000"
    />
  ));

  const product6 = productData6.map((item) => (
    <Products
      name={item.name}
      url={item.imageurl}
      price={item.price}
      description={item.description}
      data-aos="fade-up"
      data-aos-delay="400"
      data-aos-duration="2000"
    />
  ));

    AOS.init({
      delay:200,
      duration: 1000,
    });


  return (
    <Layout>
      <div className="home-container">
        <div className="crousal-container"
       
        >
          <Carousel autoplay>
            {/* <Carousel > */}

            <div className="carousel-item">
              <img src={crousal1} alt="" className="carousel-image" />

              <div className="overlay banner-Crousal">
                <p
                 data-aos="fade-right"
                 data-aos-delay="200"
                 data-aos-duration="1000"
                  style={{
                    fontSize: "1.2rem",
                    marginBottom:"2rem",
                    lineHeight:"1.3rem",
                    color: "#f0cd7d",
                    fontWeight: "500",
                  }}
                >
                  THE BALANCE OF POWER
                </p>
                <h5
                 data-aos="fade-left"
                 data-aos-delay="200"
                 data-aos-duration="1000"
                  style={{
                    // marginTop: "-12px",
                    fontSize: "2rem",
                    filter: "brightness(100%)",
                    textShadow: " 0 2px 5px #000",
                  }}
                >
                  ALL NEW USSSA ICON{" "}
                </h5>
                <p style={{ fontSize: "1rem", letterSpacing: "0.7px" }}
                 data-aos="fade-right"
                 data-aos-delay="200"
                 data-aos-duration="1000">
                  Now Available In All Drops{" "}
                </p>
                <button className="shop-now-button"
                style={{marginTop:"6px"}}
                 data-aos="fade-up"
                 data-aos-delay="200"
                 data-aos-duration="1000">
                  BUY NOW{" "}
                  <span>
                    <svg
                      width="25px"
                      height="25px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M6 12H18M18 12L13 7M18 12L13 17"
                          stroke="#fff"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>{" "}
                      </g>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
            <div className="carousel-item">
              <img src={crousal2} alt="" className="carousel-image" />

              <div className="overlay-2 banner-Crousal-2">
                <p
                  style={{
                    fontSize: "1.2rem",
                    color: "#f0cd7d",
                    fontWeight: "500",
                  }}
                  data-aos="fade-left"
                  data-aos-delay="200"
                  data-aos-duration="1000"
                >
                  NEW NEXT SERIES
                </p>
                <h5
                  style={{
                    marginTop: "-12px",
                    fontSize: "2rem",
                    filter: "brightness(100%)",
                    textShadow: " 0 2px 5px #000",
                  }}
                  data-aos="fade-right"
                  data-aos-delay="200"
                  data-aos-duration="1000"
                >
                  PERFECT GLOVES FOR TRAVEL BALL
                </h5>
                <h5
                  style={{
                    marginTop: "-12px",
                    fontSize: "2rem",
                    filter: "brightness(100%)",
                  }}
                  data-aos="fade-left"
                  data-aos-delay="200"
                  data-aos-duration="1000"
                >
                  PLAYERS{" "}
                </h5>
                <p style={{ fontSize: "1.1rem", letterSpacing: "0.7px" }}
                  data-aos="fade-left"
                  data-aos-delay="200"
                  data-aos-duration="1000">
                  contoUR Wrist, Pro Patterns
                </p>
                <button className="shop-now-button "
                  data-aos="fade-up"
                  data-aos-delay="200"
                  data-aos-duration="1000">
                  SHOP NOW{" "}
                  <span>
                    <svg
                      width="25px"
                      height="25px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M6 12H18M18 12L13 7M18 12L13 17"
                          stroke="#fff"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>{" "}
                      </g>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
            <div className="carousel-item">
              <img src={crousal3} alt="" className="carousel-image" />
              <div className="overlay-2 banner-Crousal-2">
                <p
                  style={{
                    fontSize: "1.2rem",
                    color: "#f0cd7d",
                    fontWeight: "500",
                  }}
                >
                  NEW NEXT SERIES
                </p>
                <h5
                  style={{
                    marginTop: "-12px",
                    fontSize: "2rem",
                    filter: "brightness(100%)",
                    textShadow: " 0 2px 5px #000",
                  }}
                >
                  PERFECT GLOVES FOR TRAVEL BALL
                </h5>
                <h5
                  style={{
                    marginTop: "-12px",
                    fontSize: "2rem",
                    filter: "brightness(100%)",
                  }}
                >
                  PLAYERS{" "}
                </h5>
                <p style={{ fontSize: "1.1rem", letterSpacing: "0.7px" }}>
                  contoUR Wrist, Pro Patterns
                </p>
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "180px",
                  }}
                  className="shop-now-button "
                  onClick={() => navigate('/products')}
                >
                  SHOP NOW{" "}
                  <span>
                    <svg
                      width="25px"
                      height="25px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M6 12H18M18 12L13 7M18 12L13 17"
                          stroke="#fff"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>{" "}
                      </g>
                    </svg>{" "}
                  </span>{" "}
                  <img
                    src={logo4remove}
                    style={{ width: "30px", paddingLeft: "5px" }}
                    alt=""
                  />
                </button>
              </div>
            </div>
          </Carousel>
        </div>

        <div className="little-league"
          data-aos="fade-up"
          data-aos-delay="400"
          data-aos-duration="3000">
          <img src={image5} style={{ width: "100%" }} alt="" />
          <div className="overlay-3">
            <h5
              data-aos="fade-up"
              data-aos-delay="400"
              data-aos-duration="1000"
              style={{
                marginTop: "-12px",
                fontSize: "2.2rem",
                filter: "brightness(100%)",
                textShadow: " 0 2px 5px #000",
              }}
            >
              LITTLE LEAGUE BASEBALL X RAWLINGS
            </h5>
            <p style={{ fontSize: "1rem", letterSpacing: "0.7px" }}
              data-aos="fade-up"
              data-aos-delay="400"
              data-aos-duration="1000">
              The Official Glove Of THe LLWS{" "}
            </p>
            <button className="shop-now-button"
              data-aos="fade-up"
              data-aos-delay="600"
              data-aos-duration="2000">
              BUY NOW{" "}
              <span>
                <svg
                  width="25px"
                  height="25px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M6 12H18M18 12L13 7M18 12L13 17"
                      stroke="#fff"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
              </span>
            </button>
          </div>
        </div>

        <div
          className="limitedAddition"
          style={{ marginTop: "7rem", margin: "4rem" }}
          data-aos="fade-up"
          data-aos-delay="400"
          data-aos-duration="2000"
        >
          <h1
            style={{
              fontWeight: "700px",
              fontSize: "3rem",

              textAlign: "center",
              marginBottom: "4rem",
              letterSpacing: "-1px",
              color: "rgb(70, 67, 67)",
              filter: "contrast(100%)",
            }}
            data-aos="zoom-in"
            data-aos-delay="400"
            data-aos-duration="2000"
          >
            LIMITED EDITION DROPS
          </h1>

          <Carousels className="pb-5" showDots={true} responsive={responsive}
            data-aos="fade-up"
            data-aos-delay="400"
            data-aos-duration="3000" autoplay>
            {product}
          </Carousels>
        </div>

        <div className="special-offers">
          <div className="offers-1"   
          data-aos="fade-right"
      data-aos-delay="400"
      data-aos-duration="2000"
      >
            <img src={offer1} alt="" />
            <p className="my-3 golden">NUMBERED LIMITED ADDITION</p>
            <h5>GAMEDAY '57 SERIES</h5>
            <p className="">Get Exclusive Gold Glover's Gamer</p>
          </div>
          <div className="offers-1"
            data-aos="fade-up"
            data-aos-delay="400"
            data-aos-duration="2000">
            <img src={offer2} alt="" />
            <p className="theme mt-3">EXCLUSIVE NEW BAT</p>
            <h5 className="">GAMEDAY '57 SERIES LUIS ROBERT JR</h5>
            <p>Get Exclusive GOld GLover's Gamer</p>
          </div>

          <div className="offers-1"
            data-aos="fade-left"
            data-aos-delay="400"
            data-aos-duration="2000">
            <img src={offer3} alt="" />
            <h5 className="my-3">GAMEDAY '57 SERIES LUIS ROBERT JR</h5>
            <p>Get Exclusive GOld GLover's Gamer</p>
          </div>
        </div>

        <div className="crousal-container"
          data-aos="zoom-in"
          data-aos-delay="400"
          data-aos-duration="2000">
          <h3
            style={{
              textAlign: "center",
              marginBottom: "3rem",
              fontWeight: "600",
              color: "rgb(46, 44, 44)",
            }}
          >
            '47 X RAWLINGS
          </h3>
          <Carousel autoplay>
            {/* <Carousel > */}

            <div className="carousel-item" >
              <img src={crousal5} alt="" className="carousel-image" />

              <div className="overlay-common">
                <p
                  style={{
                    fontSize: "1.2rem",
                    color: "#f0cd7d",
                    fontWeight: "500",
                  }}
                >
                  '47 X RAWLINGS
                </p>
                <h5
                  style={{
                    marginTop: "-12px",
                    fontSize: "2.2rem",
                    filter: "brightness(100%)",
                  }}
                >
                  The Perfect Collab
                </h5>

                <p style={{ fontSize: "1.1rem", letterSpacing: "0.7px" }}>
                  Get Yours While You Can
                </p>
                <button className="shop-now-button ">
                  SHOP NOW{" "}
                  <span>
                    <svg
                      width="25px"
                      height="25px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M6 12H18M18 12L13 7M18 12L13 17"
                          stroke="#fff"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>{" "}
                      </g>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
            <div className="carousel-item">
              <img src={crousal6} alt="" className="carousel-image" />

              <div className="overlay-common">
                <p
                  style={{
                    fontSize: "1.2rem",
                    color: "#f0cd7d",
                    fontWeight: "500",
                  }}
                >
                  '47 X RAWLINGS
                </p>
                <h5
                  style={{
                    marginTop: "-12px",
                    fontSize: "2rem",
                    filter: "brightness(100%)",
                  }}
                >
                  The Perfect Collab
                </h5>

                <p style={{ fontSize: "1.1rem", letterSpacing: "0.7px" }}>
                  Get Yours While You Can
                </p>
                <button className="shop-now-button ">
                  SHOP NOW{" "}
                  <span>
                    <svg
                      width="25px"
                      height="25px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M6 12H18M18 12L13 7M18 12L13 17"
                          stroke="#fff"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>{" "}
                      </g>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
            <div className="carousel-item ">
              <img src={crousal7} alt="" className="carousel-image" />
              <div className="overlay-common">
                <p
                  style={{
                    fontSize: "1.2rem",
                    color: "#f0cd7d",
                    fontWeight: "500",
                  }}
                >
                  '47 X RAWLINGS
                </p>
                <h5
                  style={{
                    marginTop: "-12px",
                    fontSize: "2rem",
                    filter: "brightness(100%)",
                    textShadow: " 0 2px 5px #000",
                  }}
                >
                  The Perfect Collab
                </h5>

                <p style={{ fontSize: "1.1rem", letterSpacing: "0.7px" }}>
                  Get Yours While You Can
                </p>
                <button className="shop-now-button ">
                  SHOP NOW{" "}
                  <span>
                    <svg
                      width="25px"
                      height="25px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M6 12H18M18 12L13 7M18 12L13 17"
                          stroke="#fff"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>{" "}
                      </g>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </Carousel>
        </div>

        <div style={{ marginTop: "7rem", margin: "4rem" }}   data-aos="fade-up"
            data-aos-delay="400"
            data-aos-duration="4000">
          <Carousels className="pb-5" showDots={true} responsive={responsive} data-aos="fade-up"
           data-aos-delay="200"
           data-aos-duration="3000">
            {product2}
          </Carousels>
        </div>

        <div className="little-league  banner" data-aos="fade-up"
            data-aos-delay="200"
            data-aos-duration="1000"
            >
          <h5
            style={{
              marginBottom: "3rem",
              filter: "brightness(100%)",
              textAlign: "center",
              fontWeight: "700",
            }}
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-duration="2000"
            >
          
            SHOP THE GAME’S HOTTEST BATS
          </h5>
          <img src={league2} style={{ width: "100%" }} alt="" data-aos="fade-up"
            data-aos-delay="200"
            data-aos-duration="1000"/>

          <div className="overlay-4 shoptheGames"   data-aos="fade-up"
            data-aos-delay="200"
            data-aos-duration="1000"
            >
              
            <h5
              style={{
                marginTop: "-12px",
                fontSize: "2.2rem",
                filter: "brightness(100%)",
                textShadow: " 0 2px 5px #000",
              }} data-aos="fade-up"
              data-aos-delay="200"
              data-aos-duration="2000"
            >
              LITTLE LEAGUE BASEBALL X RAWLINGS
            </h5>
            <p style={{ fontSize: "1rem", letterSpacing: "0.7px" }}
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-duration="2000">
              The Official Glove Of THe LLWS{" "}
            </p>
            <button className="shop-now-button"
            aata-aos="fade-up"
            data-aos-delay="400"
            data-aos-duration="2000">
              BUY NOW{" "}
              <span>
                <svg
                  width="25px"
                  height="25px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M6 12H18M18 12L13 7M18 12L13 17"
                      stroke="#fff"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
              </span>
            </button>
          </div>
        </div>

        <div style={{ marginTop: "7rem", margin: "4rem" }}
           data-aos="fade-up"
           data-aos-delay="200"
           data-aos-duration="2000" 
        >
          <Carousels className="pb-5" showDots={true} responsive={responsive} data-aos="fade-up"
           data-aos-delay="200"
           data-aos-duration="2000">
            {product3}
          </Carousels>
        </div>

        <div className="special-offers2" style={{ marginBottom: "0px" }}
          
        >
          <div className="offers-2"  data-aos="fade-up"
           data-aos-duration="1000">
            <img src={cat1} alt="" />
          </div>
          <div className="offers-2"  data-aos="fade-up"
           data-aos-delay="200"
           data-aos-duration="1000">
            <img src={cat2} alt="" />
          </div>

          <div className="offers-2"  data-aos="fade-up"
           data-aos-delay="200"
           data-aos-duration="2000">
            <img src={cat3} alt="" />
          </div>

          <div className="offers-2"  data-aos="fade-up"
           data-aos-delay="400"
           data-aos-duration="2000">
            <img src={cat4} alt="" />
          </div>
        </div>

        <div style={{ marginTop: "7rem", margin: "4rem" }}>
          <h1
            style={{
              textAlign: "center",
              marginBottom: "4rem",
              letterSpacing: "-1px",
              color: "rgb(70, 67, 67)",
              filter: "contrast(100%)",
            }}
            data-aos="flip-left"
            data-aos-delay="200"
            data-aos-duration="3000"
          >
            TOP PRODUCTS
          </h1>

          <Carousels className="pb-5" showDots={true} responsive={responsive}
             data-aos="fade-up"
             data-aos-delay="200"
             data-aos-duration="2000"
             >
            {product4}
          </Carousels>
        </div>

        <div className="little-league banner-3"  data-aos="fade-up"
           data-aos-delay="200"
           data-aos-duration="2000">
          <img src={majorleague} style={{ width: "100%" }} alt="" />

          <div className="overlay-4" style={{}}>
            <h5
              style={{
                marginTop: "-12px",
                fontSize: "2.2rem",
                filter: "brightness(100%)",
                textShadow: " 0 2px 5px #000",
              }}  data-aos="fade-left"
              data-aos-delay="200"
              data-aos-duration="2000"
            >
              The Official Baseball Glove of Major League Baseball
            </h5>
            <p style={{ fontSize: "1rem", letterSpacing: "0.7px" }}  data-aos="fade-right"
           data-aos-delay="200"
           data-aos-duration="2000">
              Fernando Tatis Jr - San Diego Padres
            </p>
            <button className="shop-now-button" style={{ width: "160px" }}  data-aos="fade-up"
           data-aos-delay="200"
           data-aos-duration="2000">
              SHOP NOW{" "}
              <span>
                <svg
                  width="25px"
                  height="25px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M6 12H18M18 12L13 7M18 12L13 17"
                      stroke="#fff"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
              </span>
            </button>
          </div>
        </div>

        <div className="special-offers2">
          <div className="offers-2"  data-aos="fade-up"
          
           data-aos-duration="1000">
            <img src={img5} alt="" />
            <h5 className="my-2">Custom Gloves</h5>

            <p style={{ color: "#222" }}>Customize Like A Pro</p>
          </div>
          <div className="offers-2"  data-aos="fade-up"
           data-aos-delay="200"
           data-aos-duration="2000">
            <img src={img6} alt="" />
            <h5 className="my-2">Heart Of The Hide</h5>

            <p style={{ color: "#222" }}>Legendary Performance</p>
          </div>

          <div className="offers-2"  data-aos="fade-up"
           data-aos-delay="400"
           data-aos-duration="2000">
            <img src={img7} alt="" />
            <h5 className="my-2">Pro Preferred</h5>

            <p style={{ color: "#222" }}>Flawless Craftsmanship</p>
          </div>

          <div className="offers-2"  data-aos="fade-up"
           data-aos-delay="400"
           data-aos-duration="3000">
            <img src={img8} alt="" />

            <h5 className="my-2">Exclusives</h5>

            <p style={{ color: "#222" }}>Only Available Here</p>
          </div>
        </div>

        <div style={{ marginTop: "7rem", margin: "4rem" }}  >
          <h1
            style={{
              textAlign: "center",
              marginBottom: "4rem",
              letterSpacing: "-1px",
              color: "#222",
              filter: "contrast(100%)",
              textTransform: "uppercase",
              fontSize: "2rem",
              letterSpacing: "0.7px",
              fontWeight: "700",
            }}
            data-aos="zoom-in"
           data-aos-delay="200"
           data-aos-duration="2000"
          >
            Featured Pro Gameday Models
            <p
              style={{
                color: "#222",
                fontSize: "1.3rem",
                fontWeight: "300",
                letterSpacing: "0.7px",
                marginTop: "1rem",
              }}
              data-aos="zoom-in"
           data-aos-delay="200"
           data-aos-duration="2000"
            >
              Choose a player and start customizing their gameday glove to make
              it your own
            </p>
          </h1>

          <Carousels className="pb-5" showDots={true} responsive={responsive} data-aos="fade-up"
           data-aos-delay="300"
           data-aos-duration="3000">
            {product5}
          </Carousels>
        </div>

        <div className=" banner-4 little-league">
          <h5
            style={{
              marginBottom: "3rem",
              fontSize: "2rem",
              filter: "brightness(100%)",
              textAlign: "center",
              fontWeight: "700",
            }}
            data-aos="zoom-in"
           data-aos-delay="200"
           data-aos-duration="2000"
          >
            SHOP THE GAME’S HOTTEST BATS
          </h5>
          <img src={demoimg} style={{ width: "100%" }} alt="" data-aos="zoom-in"
           data-aos-delay="200"
           data-aos-duration="2000"/>

          <div className="overlay-4">
            <h5 style={{}}
             data-aos="fade-left"
             data-aos-delay="200"
             data-aos-duration="2000"
             >Demo the Latest Rawlings Bats</h5>
            <p
              style={{
                fontSize: "1rem",
                color: "#fff",
              }}
              data-aos="fade-right"
           data-aos-delay="200"
           data-aos-duration="2000"
            >
              Find Your Local D-BAT Store Today{" "}
            </p>
            <button className="shop-now-button" style={{ width: "190px" }} data-aos="fade-up"
           data-aos-delay="200"
           data-aos-duration="2000">
              LEARN MORE{" "}
              <span>
                <svg
                  width="25px"
                  height="25px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M6 12H18M18 12L13 7M18 12L13 17"
                      stroke="#fff"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
              </span>
            </button>
          </div>
        </div>

        <div style={{ marginTop: "7rem", margin: "4rem" }}>
          <h1
            style={{
              textAlign: "center",
              marginBottom: "4rem",
              letterSpacing: "-1px",
              color: "#222",
              filter: "contrast(100%)",
              fontSize: "2rem",
              fontWeight: "700",
              letterSpacing: "0.7px",
              
            }}
            data-aos="zoom-in"
           data-aos-delay="200"
           data-aos-duration="2000"
          >
            PRODUCTS RECOMMENDED FOR YOU{" "}
          </h1>

          <Carousels className="pb-5" showDots={true} responsive={responsive} data-aos="fade-up"
           data-aos-delay="200"
           data-aos-duration="3000">
            {product6}
          </Carousels>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
