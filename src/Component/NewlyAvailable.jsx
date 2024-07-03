import { Button, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import shoes from "../assets/shoes.png";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addItem } from "../Redux/CartSlice";
import { message } from "antd";
import inventory from "../inventory.json"
import { useNavigate } from "react-router-dom";



const NewlyAvailable = ({closeCart}) => {
  const navigate = useNavigate()
  const isMobile = useMediaQuery("(max-width:900px)");
  const [products, setProducts] = useState();

  useEffect(() => {
    getProducts();
  }, []);
  async function getProducts() {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/inv-products`
      );
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  }
  console.log("dhpro",products)

  const dispatch = useDispatch();
  return (
    <div className="newly-available h-full lg:h-[600px] py-10 lg:py-0 mb-[250px]" onClick={closeCart}>
      <div className="container mx-auto">
       {
        products &&  <div className="flex items-center flex-col lg:flex-row lg:gap-10 z-50 relative"
        >
          <div className="flex-1">
            <img
              src={products[products?.length - 1]?.image}
              alt="img..."
              style={{ zoom: isMobile ? "0.5" : "1.2" }}
            />
          </div>
          <div className="flex-1">
            <h3 className="text-xl text-center lg:text-left lg:text-3xl font-bold text-white">
              New available
            </h3>
            <h3 className="text-xl text-center lg:text-left lg:text-3xl font-bold text-white mt-2 mb-7">
              {products[products.length - 1]?.title}
            </h3>
            <p className="text-white text-center lg:text-left lg:text-xl leading-10 lg:w-[80%]">
              {products[products.length - 1]?.description}
            </p>
            <h4 className="text-[#F5743B] text-center lg:text-left text-2xl lg:text-3xl my-7 font-bold">
              $ {products[products.length - 1]?.price}
            </h4>
            <div
              className={`flex ${isMobile ? "justify-center" : ""} gap-7`}
              style={{ zoom: isMobile ? "0.7" : "" }}
            >
              <Button
                onClick={() => {
                  dispatch(addItem(products[products?.length - 1]))
                  message.success("Item added to cart")
                }}
                sx={{
                  borderRadius: "100vw",
                  padding: "15px 40px",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  backgroundColor: "#F5743B",
                  "&:hover": {
                    backgroundColor: "#be410c",
                  },
                }}
                variant="contained"
              >
                Add to cart
              </Button>
              <Button
                sx={{
                  borderRadius: "100vw",
                  padding: "15px 40px",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  backgroundColor: "white",
                  color: "black",
                  "&:hover": {
                    backgroundColor: "#cccccc",
                  },
                }}
                variant="contained"
        onClick={() => navigate(`/productDetails/${products[products?.length - 1]?._id}`)}

              >
                View product
              </Button>
            </div>
          </div>
        </div>
       }
      </div>
    </div>
  );
};

export default NewlyAvailable;
