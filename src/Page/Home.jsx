import React from "react";
import Hero from "../Component/Hero";
import Featured from "../Component/Featured";
import WhyChooseUs from "../Component/WhyChooseUs";
import NewlyAvailable from "../Component/NewlyAvailable";
import ShoesDisplay from "../Component/ShoesDisplay";
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
      <WhyChooseUs closeCart={hideCartModal} />
      <NewlyAvailable closeCart={hideCartModal} />
      <ShoesDisplay closeCart={hideCartModal} />
    </div>
  );
};

export default Home;
