import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Button, useMediaQuery } from "@mui/material";
import "./App.css";
import Footer from "./Component/Footer";
import Navbar from "./Component/Navbar";
import { useDispatch } from "react-redux";
import { cartModal } from "./Redux/CartSlice";
import Home from "./Page/Home";
// import Cart from "./Component/Cart";
import Tab from "./Component/Tab";
import Productdetails from "./Component/Productdetails";
import Profile from "./Page/Profile";
import Account from "./Page/Account";
import Contact from "./Page/Contact";
import About from "./Page/About";
import Checkout from "./Page/Checkout";
import CheckoutWithId from "./Page/checkoutWithId";
import Category from "./Page/Category";
import Orders from "./Page/Orders";
import EqpProduct from "./Component/EqpProduct";
import Faq from "./Page/NavPolicies/Faq";
import ShippingPolicy from "./Page/NavPolicies/ShippingPolicy";
import PrivacyPolicy from "./Page/NavPolicies/PrivacyPolicy";
import ReturnAndRefund from "./Page/NavPolicies/ReturnAndRefund";
import TermsAndCondition from "./Page/NavPolicies/TermsAndCondition";
import axios from "axios";
import AllProductByCategory from "./Page/AllProductByCategory";
import Shop from "./Page/Shop"
import Cart from "./Page/Cart"
import ScrollToTop from "./Component/ScrollToTop";

function App() {
  const isMobile = useMediaQuery("(max-width:900px)");
  const dispatch = useDispatch();
  const hideCartModal = () => {
    dispatch(cartModal(false));
  };
  const [email, setEmail] = useState();

  const getSubscribed = async (e) => {
    e.preventDefault();
    try {
      const emailPayload = {
        to: email,
        subject: "Thank you for  Subscription",
        text: `Thank you for Subscribing Us. We will update you with latest collection amazing discounts. \nStay tuned with us.\n\nBest regards,\nDrakon`,
      };
      await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/send-email`,
        emailPayload
      );
    } catch {
      console.error(error);
    }

    try {
      const payload = {
        email : email
      }
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/subscribe`,
        payload
      );

      if (response.status === 200) {
        message.success("subscribed successfully");

        // Send email after message is successfully sent

        // navigate(`/cart`);
      } else {
        message.error("Error : Not Subscribed");
      }
    } catch (error) {
      console.error(error);
      message.error("internal server error");
    }
  };

  return (
    <Router>
      <ScrollToTop/>
      <div className="" style={{ zoom: "0.8" }}>
        <Navbar closeCart={hideCartModal} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/account" element={<Account />} />
          <Route path="/productdetails/:id" element={<Productdetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/:id" element={<CheckoutWithId />} />
          {/* <Route path="/cart" element={<Cart />} /> */}
          <Route path="/tab" element={<Tab />} />
          <Route path="/product" element={<EqpProduct />} />
          <Route path="/shippingpolicy" element={<ShippingPolicy />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/returnrefund" element={<ReturnAndRefund />} />
          <Route path="/:sunglasses" element={<AllProductByCategory />} />
          <Route path="/:batting-gloves" element={<AllProductByCategory />} />
          <Route path="/:equipment" element={<AllProductByCategory />} />
          <Route path="/:accessories" element={<AllProductByCategory />} />
          <Route path="/:apparel" element={<AllProductByCategory />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/category" element={<Category />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/termscondition" element={<TermsAndCondition />} />
          <Route path="/shop" element={<Shop/>}/>
          <Route path="/cart" element={<Cart/>}/>

        </Routes>
        <Footer closeCart={hideCartModal} />
      </div>
    </Router>
  );
}

export default App;
