import React from "react";
import Hero from "../Component/Hero";
import Featured from "../Component/Featured";
import BatSection from "../Component/BatSection";
import GlassesSection from "../Component/GlassesSection";
import GlovesSection from "../Component/GlovesSection";
import Accessories from "../Component/Accessories";
import AllCategories from "../Component/AllCategories";
import Apparel from "../Component/Apparel";
import { useMediaQuery } from "@mui/material";
import { useDispatch } from "react-redux";

const Home = () => {
  const isMobile = useMediaQuery("(max-width:900px)");
  const dispatch = useDispatch();
  const hideCartModal = () => {
    dispatch(cartModal(false));
  };
  return (
    <div>
      <Hero closeCart={hideCartModal} />
      <Featured closeCart={hideCartModal} />
      <GlassesSection closeCart={hideCartModal} />
      <GlovesSection closeCart={hideCartModal} />
      <BatSection closeCart={hideCartModal} />
      <Accessories closeCart={hideCartModal} />
      <Apparel closeCart={hideCartModal} />
      <AllCategories closeCart={hideCartModal} />
    </div>
  );
};

export default Home;
