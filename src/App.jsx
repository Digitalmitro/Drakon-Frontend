import React from "react";
// import Navbar from "./Pages/Navbar";
import './App.css'
import Home from "./Pages/Home";
import { Route,Routes} from "react-router-dom";
import Login from "./Pages/Login";
import AddToCart from "./Pages/AddToCart";
import ProductDetails from "./Pages/ProductDetails";
import CategoryPage from "./Pages/CategoryPage";
function App() {
  return (
    <>
    <Routes>
      {/* <Navbar/> */}
    <Route path="/" element={<Home/>}/>

      <Route path="/login" element={<Login/>}/>

      <Route path="/cart" element={<AddToCart/>}/>

      {/* <Route path="/product-details/:id" element={<ProductDetails/>}/> */}

      <Route path="/category/:categoryName" element={<CategoryPage />} />
      <Route path="/product-details/:id" element={<ProductDetails />} />
      
    </Routes>
    
    </>
    
  );
}

export default App;
