import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import tshirt from "../assets/tshirt.png";
import cap from "../assets/cap.png";
import sunglassNew from "../assets/sunglass-new.png";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addItem } from "../Redux/CartSlice";
import { message } from "antd";
import feature from "../feature.json"
import { Link } from "react-router-dom";
const Featured = ({closeCart}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    getProducts();
  }, []);

  const [products, setProducts] = useState([]);
  async function getProducts() {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/feature-products`
      );
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="bg-[#F3F3F3]" onClick={closeCart}>
      <div className="container mx-auto" style={{}}>
        <h2 className="font-bold text-4xl lg:text-5xl uppercase text-center">
          Featured Products
        </h2>
        <div className="flex flex-col lg:flex-row gap-10 justify-between py-20">
          {feature?.map((e) => (
           <Link to={`/productDetails/${e._id}`}>
             <div className="shadow-lg lg:h-[600px] lg:w-[400px] lg:p-20 flex flex-col justify-between items-center gap-6 lg:gap-0 bg-white p-10">
              <div className="lg:w-[200px] h-[200px] flex justify-center">
                <img
                  src={e.image}
                  className="object-cover w-1/2 lg:w-full"
                  style={{}}
                />
              </div>
              <h3 className="font-bold text-3xl">{e.title}</h3>
              <h4 className="text-[#959595] font-bold text-2xl">$ {e.price}</h4>
              <Button
                // onClick={() => {
                //   dispatch(addItem(e))
                //   message.success("Item added to cart")
                // }}
                sx={{
                  borderRadius: "100vw",
                  paddingY: "10px",
                  fontSize: "1rem",
                  width: "80%",
                  backgroundColor: "#F5743B",
                  "&:hover": {
                    backgroundColor: "#be410c", // Adjust the brightness to darken the color
                  },
                }}
                variant="contained"
                onClick={() => navigate(`/checkout/${id}`)}
              >
                Buy now
              </Button>
            </div>
           </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Featured;
