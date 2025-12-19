import { createContext, useContext, useState } from "react";
import API_BASE_URL from "../config/api";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const getCategory = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/top-category`
      );

      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch category banners:", error);
      return null;
    }
  };
  const getAllCategoryBanner = async (arg) => {
    try {
      let response;
      if (!arg) {
        response = await fetch(
          `${API_BASE_URL}/api/category`
        );
      }
      response = await fetch(
        `${API_BASE_URL}/api/category/?categoryName=${arg}`
      );

      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch category banners:", error);
      return null;
    }
  };

  const getAllProductsByCategories = async (arg) => {
    try {
      let response;
      response = await fetch(
        `${API_BASE_URL}/products/?category=${arg}`
      );

      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      // console.log("all category banners", data);
      return data;
    } catch (error) {
      console.error("Failed to fetch category banners:", error);
      return null;
    }
  };

  const getAllTopProducts = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/top-products`
      );

      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      // console.log("all category banners", data);
      return data;
    } catch (error) {
      console.error("Failed to fetch category banners:", error);
      return null;
    }
  };
  const getAllShopProduct = async () =>{
    try {
      const response = await fetch(
        `${API_BASE_URL}/feature-products`
      );

      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      // console.log("all category banners", data);
      return data;
    } catch (error) {
      console.error("Failed to fetch category banners:", error);
      return null;
    }
  }

  return (
    <ProductContext.Provider
      value={{
        getAllCategoryBanner,
        getAllProductsByCategories,
        getAllTopProducts,
        getCategory,
        getAllShopProduct
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  return useContext(ProductContext);
};
