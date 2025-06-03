import React, { useEffect, useState } from "react";
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
import { useCart } from "../context/CartContext";
import { cartModal } from "../Redux/CartSlice";

const Home = () => {
  const isMobile = useMediaQuery("(max-width:900px)");
  const dispatch = useDispatch();
  const hideCartModal = () => {
    dispatch(cartModal(false));
  };
  const [loading, setLoading] = useState(true)


  // const guestCart=JSON.parse(localStorage.getItem("guest_cart") || "[]")

  // console.log(guestCart);

  // useEffect(())

  const { cart } = useCart();

  console.log(cart);


  return (
    <div>
      <Hero closeCart={hideCartModal} loading={loading} setLoading={setLoading} />
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
