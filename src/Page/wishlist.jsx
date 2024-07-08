import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeItem } from "../Redux/CartSlice";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import product1 from "../assets/pad.png";
import { message } from "antd";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";


const Cart = () => {
  const token = Cookies.get("token");
  const decodedToken = token && jwtDecode(token);
  const user = decodedToken?.email;
  const user_id = decodedToken?._id;
  const dispatch = useDispatch();

  const { id } = useParams();
  const navigate = useNavigate()
  const [data, setData] = useState();
  const [enableCurrency, setEnableCurrency] = useState();
 

  const handleProduct = async () => {
    try {

    
      setEnableCurrency(res.data[0].Currency)
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/wishlist/${user_id}`
      );
      console.log(response);

      setData(response.data.wishlist.reverse());
    } catch (error) {
      console.error(error);
    }
  };

  console.log("cartData", data)

  console.log("data", data);


  useEffect(() => {
    handleProduct();
  }, []);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 3; // You can adjust this value
  const totalPages = Math.ceil(data?.length / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = data?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  async function removedProductFromCart(wishlistId, productId) {
    console.log(productId)
    dispatch(removeItem(productId))
    try {
      const  data  = await axios.delete(
        `${import.meta.env.VITE_BACKEND_API}/wishlist/${wishlistId}`
      );
      handleProduct();
      window.location.reload()
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
      <div className="container mx-auto flex flex-col lg:flex-row lg:gap-10">
        <div className="flex-1 p-14 mt-2">
          <div className=" container p-2 pt-4 mb-5  border">
          <table className="table-auto w-full text-left p-2 m-2 ">
            <thead className="m-2" style={{padding: "12px"}}>
              <tr>
                <th></th>
                <th></th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts?.map((product) => (
                <tr key={product._id} className="border-b-2 ">
                  <td
                    className="cursor-pointer"
                    onClick={() => 
                      // dispatch(removeItem(product._id))
                      removedProductFromCart(product._id, product.product_id)
                    }
                  >
                    <svg
                      width={40}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M16 8L8 16M8.00001 8L16 16"
                          stroke="#000000"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>{" "}
                      </g>
                    </svg>
                  </td>
                  <td>
                    <img className="w-24 h-24" src={product.image} alt="" />
                  </td>
                  <td>{product.title}</td>
                  <td className="text-center"><p>{product.qty}</p></td>
                  <td>{enableCurrency}  {product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {(data?.length > 3)  && 
           <ul className="pagination mt-5 d-flex justify-content-center">
           {Array.from({ length: totalPages }, (_, index) => (
             <li
               key={index}
               className={`page-item ${
                 currentPage === index + 1 ? "active" : ""
               }`}
             >
               <button
                 className="page-link p-2 px-3 m-1 mx-2 rounded-circle"
                   style={{borderColor:"coral", 
                  backgroundColor: currentPage === index + 1 ? "coral" : "transparent",
                 color: currentPage === index + 1 ? "white" : "coral"
                   }}
                 onClick={() => paginate(index + 1)}
               >
                 {index + 1}
               </button>
             </li>
           ))}
         </ul>}
          </div>


        </div>
      
      </div>
      
    </>
  );
};

export default Cart;
