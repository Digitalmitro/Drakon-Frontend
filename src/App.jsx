import React from "react";
import Navbar from "./Components/Pages/Navbar";
import './App.css'
import Home from "./Components/Pages/Home";
import { Routes, Route, Navigate } from 'react-router-dom'
import Shop from "./Components/Pages/Shop";
import ProductDetails from "./Components/Pages/ProductDetails";
function App() {
  return (
    <div className="App">
      
      <Routes>
      <Route path={"/"} element={<Home />} />
      <Route path={"/shop"} element={<Shop />} />
      <Route path={"/product/:id"} element={<ProductDetails />} />
      </Routes>

      
      {/* Your content here */}
    </div>
  );
}

export default App;
