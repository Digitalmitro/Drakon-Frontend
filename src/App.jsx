import React from "react";
// import Navbar from "./Pages/Navbar";
import './App.css'
import Home from "./Pages/Home";
import { Route,Routes} from "react-router-dom";
import Login from "./Pages/Login";
import AddToCart from "./Pages/AddToCart";
import ProductDetails from "./Pages/ProductDetails";
import CategoryPage from "./Pages/CategoryPage";
import ProductsPage from "./Pages/ProductsPage";
import Checkout from "./Pages/CheckoutPage";
import Profile from "./Pages/profile"
import TermsOfUse from "./Pages/TermsOfUSe"
import {SvgProvider} from "./Components/context/svgContext"
function App() {
  return (
    <>
     <SvgProvider>   
    <Routes>
      {/* <Navbar/> */}
    <Route path="/" element={<Home/>}/>

      <Route path="/login" element={<Login/>}/>
      <Route path="/termsofuse" element={<TermsOfUse/>}/>
      <Route path="/profile" element={<Profile/>}/>

      <Route path="/cart" element={<AddToCart/>}/>
      <Route path="/checkout" element={<Checkout/>}/>

      {/* <Route path="/product-details/:id" element={<ProductDetails/>}/> */}

      <Route path="/category/:categoryName" element={<CategoryPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/product-details/:id" element={<ProductDetails />} />
      
    </Routes>
    </SvgProvider>
    </>
    
  );
}

export default App;
