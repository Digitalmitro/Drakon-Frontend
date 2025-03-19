import { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const getAllCategoryBanner = async (arg) => {
    console.log("ahow the ags", arg);
    try {
      let response;
      if (!arg) {
        response = await fetch(
          `${import.meta.env.VITE_BACKEND_API}/api/category`
        );
      }
      response = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/api/category/?categoryName=${arg}`
      );

      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      console.log("all category banners", data);
      return data;
    } catch (error) {
      console.error("Failed to fetch category banners:", error);
      return null;
    }
  };

  return (
    <ProductContext.Provider value={{ getAllCategoryBanner }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  return useContext(ProductContext);
};
