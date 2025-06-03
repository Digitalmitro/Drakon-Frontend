import React from 'react'
import { useProduct } from '../context/ProductContext'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { addItem } from "../Redux/CartSlice";
import axios from "axios";
import Cookies from "js-cookie";
import { message } from 'antd';
function AllProductByCategory() {
    const urlname=useParams();
    console.log(urlname)
    const product=Object.values(urlname)[0]
    const {getAllProductsByCategories}=useProduct();
    const [sunglasses,setSunglasses]=useState([])
    const [filteredProducts, setFilteredProducts] = useState([]);
    const dispatch = useDispatch();
    const token = Cookies.get("token");
    const decodedToken = token && jwtDecode(token);
    const user_id = decodedToken?._id;
    const navigate = useNavigate();
    const handleCart = async (id) => {

      console.log("handleCart called");
      const topProduct = sunglasses.find((item) => item._id === id);
  
      if (!topProduct) {
        console.error("Product not found");
        return;
      }
  
      // item shape for both guest & logged-in
      const cartItem = {
        productId: {
          _id: topProduct._id,
          title: topProduct.title,
          price: topProduct.price,
          image: topProduct.image,
          stock: topProduct.stock,
        },
        quantity: 1,
        total: topProduct.price * 1,
      };
  
      if (user_id) {
        // logged-in: hit server
        dispatch(addItem(topProduct));
        try {
          await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/add`, {
            image: topProduct.image,
            title: topProduct.title,
            price: topProduct.price,
            quantity: 1,
            productId: topProduct._id,
            userId: user_id,
          });
          message.success("Added to Cart");
          setTimeout(() => navigate("/cart"), 500);
        } catch (error) {
          console.error(error);
          message.error("Cart item not added");
        }
      } else {
        // guest: write to localStorage
        const guestCart = JSON.parse(localStorage.getItem("guest_cart") || "[]");
        const existing = guestCart.find((i) => i.productId._id === topProduct._id);
        if (existing) {
          existing.quantity += 1;
          existing.total = existing.quantity * topProduct.price;
        } else {
          guestCart.push(cartItem);
        }
        localStorage.setItem("guest_cart", JSON.stringify(guestCart));
        message.success("Added to Cart");
        setTimeout(() => navigate("/cart"), 500);
      }
    };
    const fetchSunglasses=async()=>{
        let response
            if(product=="sunglasses"){
                response=await getAllProductsByCategories("Sunglasses");
            }
            if(product=="batting-gloves"){
                response=await getAllProductsByCategories("Batting Gloves");
            }
            if(product=="apparel"){
                response=await getAllProductsByCategories("Apparel");
            }
            if(product=="accessories"){
                response=await getAllProductsByCategories("Accessories");
            }
            if(product=="equipment"){
                response=await getAllProductsByCategories("Equipment");
            }
           
        setSunglasses(response);
        setFilteredProducts(response);
    }
    useEffect(()=>{
        fetchSunglasses();
    },[urlname]);

    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(500);
  
    const handleMinPriceChange = (e) => {
      const newMinPrice = parseInt(e.target.value);
      if (newMinPrice >= 0 && newMinPrice <= maxPrice - 10) {
        setMinPrice(newMinPrice);
      }
    };
  
    const handleMaxPriceChange = (e) => {
      const newMaxPrice = parseInt(e.target.value);
      if (newMaxPrice >= minPrice + 10 && newMaxPrice <= 500) {
        setMaxPrice(newMaxPrice);
      }
    };

    useEffect(() => {
      if (sunglasses.length > 0) {
        const filtered = sunglasses.filter(
          (item) => item.price >= minPrice && item.price <= maxPrice
        );
        setFilteredProducts(filtered);
      }
    }, [minPrice, maxPrice]);

  return (
    <div className='pt-20 flex flex-wrap lg:flex-row'>
  <div className='flex flex-wrap justify-center lg:gap-8 pt-4 w-full'>
    {filteredProducts.length > 0 ? (
      filteredProducts.map((e) => (
        <div key={e._id} className="lg:h-[500px] h-[440px]">
          <div className="shadow-lg rounded-lg w-full lg:w-[360px] bg-white flex flex-col justify-between p-2 hover:shadow-xl transition-all duration-300 relative">
            {/* LIMITED Badge */}
            <div className="absolute bg-zinc-800 text-white text-base font-bold px-2 py-1 rounded-md uppercase ml-4 mt-2 z-10">
              LIMITED
            </div>

            {/* Product Image */}
            <Link
              to={`/productDetails/${e._id}`}
              className="bg-[#dddfe0] rounded-md overflow-hidden flex justify-center items-center h-[240px] lg:h-[270px]"
            >
              <img
                src={e.image?.[0]}
                alt="Product"
                className="object-contain h-full w-full"
              />
            </Link>

            {/* Product Info */}
            <div className="mt-4 px-1 flex flex-col gap-1">
              <h3 className="font-semibold text-black text-[1.3rem] leading-tight">
                {e.description.length > 35
                  ? `${e.description.slice(0, 35)}...`
                  : e.description}
              </h3>
              <h4 className="text-[#4b4b4b] font-bold text-[1.5rem]">
                $ {e.price}
              </h4>
            </div>

            {/* Buttons */}
            <div className="flex mt-3 gap-2">
              <button className="bg-[#0f172a] text-white text-lg font-medium py-2 px-2 rounded w-full hover:bg-[#1e293b] transition" onClick={() => handleCart(e._id)}>
                Add to cart
              </button>
              <Link
                to={`/productDetails/${e._id}`}
                className="bg-[#f97316] text-white text-lg font-medium py-2 lg:pl-8 pl-10 rounded w-full hover:bg-[#ea580c] transition"
              >
                QUICK VIEW
              </Link>
            </div>
          </div>
        </div>
      ))
    ) : (
      <p className="text-xl text-gray-500">No products found in this price range.</p>
    )}
  </div>
</div>
  )
}

export default AllProductByCategory