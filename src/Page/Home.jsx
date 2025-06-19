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
import { Helmet } from "react-helmet";

const Home = () => {
  const isMobile = useMediaQuery("(max-width:900px)");
  const dispatch = useDispatch();
  const hideCartModal = () => {
    dispatch(cartModal(false));
  };
  const [loading, setLoading] = useState(true);

  // const guestCart=JSON.parse(localStorage.getItem("guest_cart") || "[]")

  // console.log(guestCart);

  // useEffect(())

  const { cart } = useCart();

  console.log(cart);

  return (
    <div>
      <Helmet>
        <title>Gear Up Like a Pro – Premium Baseball Apparel Online</title>
        <meta
          name="description"
          content="Drakon Sports- One-stop online store for baseball enthusiasts to gear up like a pro. Get access to game essentials and accessories online."
        />
      </Helmet>
      <Hero
        closeCart={hideCartModal}
        loading={loading}
        setLoading={setLoading}
      />
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
